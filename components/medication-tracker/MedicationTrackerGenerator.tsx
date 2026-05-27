"use client";

import { useState, useCallback } from "react";
import MedicationTrackerPreview from "./MedicationTrackerPreview";
import {
  DEFAULT_MED_TRACKER_DATA,
  MED_DAYS,
  MED_THEME_TOKENS,
  emptyMedRow,
  formatWeekOf,
  escHtml,
  type MedTrackerData,
  type MedTrackerTheme,
  type MedicationRow,
} from "./MedicationTrackerTypes";

const MAX_MEDS = 10;

const THEMES: { value: MedTrackerTheme; label: string; description: string }[] = [
  { value: "minimal",          label: "Minimal",          description: "Clean black text, great for B&W printing" },
  { value: "soft-family",      label: "Soft Family",      description: "Sage green headers, warm and readable" },
  { value: "caregiver-clean",  label: "Caregiver Clean",  description: "Calm dusty-blue accents, clinical clarity" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  color: "#2F2A25",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E6DED3",
  borderRadius: "0.5rem",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "#6F665C",
  marginBottom: "0.375rem",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
};

const subLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "#6F665C",
  marginBottom: "0.25rem",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
};

export default function MedicationTrackerGenerator() {
  const [data, setData] = useState<MedTrackerData>(DEFAULT_MED_TRACKER_DATA);

  const set = useCallback(<K extends keyof MedTrackerData>(key: K, value: MedTrackerData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateMed = useCallback((index: number, field: keyof MedicationRow, value: string) => {
    setData((prev) => {
      const updated = [...prev.medications];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, medications: updated };
    });
  }, []);

  const addMed = () => {
    if (data.medications.length < MAX_MEDS) {
      setData((prev) => ({ ...prev, medications: [...prev.medications, emptyMedRow()] }));
    }
  };

  const removeMed = (index: number) => {
    setData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }));
  };

  /* ── PDF generation ──────────────────────────────────── */
  const handlePrint = () => {
    const FALLBACK_MEDS: MedicationRow[] = [
      { name: "Medication", dosage: "Dose", time: "Time", notes: "" },
    ];

    const title       = data.title.trim()      || "Medication Tracker";
    const personName  = data.personName.trim();
    const weekOfDisplay = formatWeekOf(data.weekOf);
    const notes       = data.additionalNotes.trim();

    const slug = personName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const pdfTitle = slug ? `${slug}-medication-tracker` : "medication-tracker";

    const meds = data.medications.filter((m) => m.name.trim() !== "");
    const activeMeds = meds.length > 0 ? meds : FALLBACK_MEDS;

    const tk = MED_THEME_TOKENS[data.theme];

    const nameColPct   = 17;
    const dosageColPct = 9;
    const timeColPct   = 8;
    const notesColPct  = 11;
    const dayColPct    = parseFloat(((100 - nameColPct - dosageColPct - timeColPct - notesColPct) / MED_DAYS.length).toFixed(2));

    const metaHeaders = [
      { label: "Medication", pct: nameColPct },
      { label: "Dosage",     pct: dosageColPct },
      { label: "Time",       pct: timeColPct },
      { label: "Notes",      pct: notesColPct },
    ];

    const headerCols = metaHeaders
      .map((h) =>
        `<th style="text-align:left;padding:7px 5px 6px 8px;font-size:9px;font-weight:600;` +
        `font-family:Arial,Helvetica,sans-serif;letter-spacing:0.04em;text-transform:uppercase;` +
        `color:${tk.headText};border-bottom:2px solid ${tk.headBorder};border-right:1px solid ${tk.headBorder};">` +
        `${escHtml(h.label)}</th>`
      )
      .join("") +
      MED_DAYS.map((day, i) =>
        `<th style="text-align:center;padding:7px 2px 6px;font-size:9px;font-weight:600;` +
        `font-family:Arial,Helvetica,sans-serif;color:${tk.headText};` +
        `border-bottom:2px solid ${tk.headBorder};` +
        `border-right:${i < MED_DAYS.length - 1 ? `1px solid ${tk.headBorder}` : "none"};">` +
        `${escHtml(day)}</th>`
      ).join("");

    const rows = activeMeds.map((med, ri) => {
      const isLast = ri === activeMeds.length - 1;
      const bb = isLast ? "none" : `1px solid ${tk.cellBorder}`;
      const metaCells = [med.name, med.dosage, med.time, med.notes]
        .map((val) =>
          `<td style="padding:9px 5px 9px 8px;font-size:11px;line-height:1.4;color:#2f2a25;` +
          `border-bottom:${bb};border-right:1px solid ${tk.cellBorder};vertical-align:top;">` +
          `${escHtml(val)}</td>`
        )
        .join("");
      const dayCells = MED_DAYS.map((day, ci) =>
        `<td style="text-align:center;padding:9px 2px;` +
        `border-bottom:${bb};` +
        `border-right:${ci < MED_DAYS.length - 1 ? `1px solid ${tk.cellBorder}` : "none"};` +
        `vertical-align:middle;">` +
        `<div style="width:14px;height:14px;border:1.5px solid ${tk.cbBorder};` +
        `border-radius:${tk.cbRadius};margin:0 auto;background:#fff;"></div></td>`
      ).join("");
      return `<tr>${metaCells}${dayCells}</tr>`;
    }).join("\n");

    const notesBlock = notes
      ? `<div style="margin:14px 20px;padding:10px 12px;` +
        `border:1px solid ${tk.notesBorder};border-left:4px solid ${tk.notesAccent};border-radius:4px;">` +
        `<div style="font-size:10px;font-weight:700;font-family:Arial,Helvetica,sans-serif;` +
        `letter-spacing:0.06em;text-transform:uppercase;color:${tk.notesAccent};margin-bottom:5px;">` +
        `Additional Notes</div>` +
        `<div style="font-size:12px;color:#2f2a25;line-height:1.6;white-space:pre-wrap;">` +
        `${escHtml(notes)}</div></div>`
      : "";

    const colgroups = metaHeaders
      .map((h) => `<col style="width:${h.pct}%"/>`)
      .join("") +
      MED_DAYS.map(() => `<col style="width:${dayColPct}%"/>`).join("");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${escHtml(pdfTitle)}</title>
  <style>
    @page { size: letter portrait; margin: 0; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 12px;
      color: #2f2a25;
      background: #fff;
      padding: 0.5in 0.55in;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page { border: 1px solid ${tk.pageBorder}; border-radius: 6px; overflow: hidden; }
    .title-block {
      padding: 16px 20px 14px;
      border-bottom: 2px solid ${tk.titleRuleBorder};
      display: flex; align-items: flex-start; gap: 14px;
    }
    .accent-bar {
      width: 4px; min-height: 44px; background: ${tk.accentColor};
      border-radius: 2px; flex-shrink: 0; align-self: stretch;
    }
    .tracker-title { font-size: 20px; font-weight: 700; line-height: 1.15; color: #2f2a25; letter-spacing: -0.01em; }
    .person-name   { font-size: 12px; color: #6f665c; margin-top: 3px; font-style: italic; }
    .week-line     { font-size: 11px; color: #6f665c; margin-top: 8px; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    thead tr { background: ${tk.headBg}; }
    .footer {
      padding: 8px 20px 10px;
      border-top: 1px solid ${tk.cellBorder};
      display: flex; justify-content: space-between;
      font-size: 9px; font-family: Arial, Helvetica, sans-serif;
      color: #9a9590; letter-spacing: 0.02em;
    }
  </style>
</head>
<body>
<div class="page">
  <div class="title-block">
    <div class="accent-bar"></div>
    <div>
      <div class="tracker-title">${escHtml(title)}</div>
      ${personName ? `<div class="person-name">${escHtml(personName)}</div>` : ""}
      <div class="week-line">Week of: <strong style="color:#2f2a25;">${escHtml(weekOfDisplay)}</strong></div>
    </div>
  </div>
  <table>
    <colgroup>${colgroups}</colgroup>
    <thead><tr>${headerCols}</tr></thead>
    <tbody>${rows}</tbody>
  </table>
  ${notesBlock}
  <div class="footer">
    <span>printreadytools.com</span>
    <span>Free printable — no sign-up required</span>
  </div>
</div>
</body>
</html>`;

    const win = window.open("", "_blank", "width=960,height=720");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.onload = () => { win.focus(); win.print(); };
    setTimeout(() => {
      try { win.focus(); win.print(); } catch { /* already triggered */ }
    }, 350);
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div>
      <div
        className="grid gap-6 lg:grid-cols-2 lg:items-start"
        style={{ paddingTop: "0.5rem" }}
      >
        {/* ── Form — order:1, always first on mobile ── */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E6DED3",
            borderRadius: "0.875rem",
            padding: "1.5rem",
            order: 1,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-lora), Georgia, serif",
              color: "#2F2A25",
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: "1.25rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid #F3EEE7",
            }}
          >
            Customize your tracker
          </h2>

          <div className="flex flex-col gap-4">
            {/* Title */}
            <div>
              <label htmlFor="mt-title" style={labelStyle}>Tracker title</label>
              <input
                id="mt-title"
                type="text"
                value={data.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Medication Tracker"
                maxLength={60}
                style={inputStyle}
              />
            </div>

            {/* Person name */}
            <div>
              <label htmlFor="mt-person" style={labelStyle}>
                Person&apos;s name{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <input
                id="mt-person"
                type="text"
                value={data.personName}
                onChange={(e) => set("personName", e.target.value)}
                placeholder="Patient or family member"
                maxLength={40}
                style={inputStyle}
              />
            </div>

            {/* Week of */}
            <div>
              <label htmlFor="mt-week" style={labelStyle}>
                Week of{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <input
                id="mt-week"
                type="date"
                value={data.weekOf}
                onChange={(e) => set("weekOf", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Medications */}
            <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
              <legend style={{ ...labelStyle, display: "block", width: "100%", marginBottom: "0.75rem" }}>
                Medications{" "}
                <span style={{ fontWeight: 400 }}>(up to {MAX_MEDS})</span>
              </legend>

              <div className="flex flex-col gap-4">
                {data.medications.map((med, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "#FAF7F2",
                      border: "1px solid #E6DED3",
                      borderRadius: "0.625rem",
                      padding: "0.875rem",
                    }}
                  >
                    <div
                      className="flex items-center justify-between"
                      style={{ marginBottom: "0.625rem" }}
                    >
                      <span
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          color: "#2F2A25",
                          fontFamily: "var(--font-inter), system-ui, sans-serif",
                        }}
                      >
                        Medication {i + 1}
                      </span>
                      {data.medications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMed(i)}
                          aria-label={`Remove medication ${i + 1}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "1.75rem",
                            height: "1.75rem",
                            borderRadius: "0.375rem",
                            border: "1px solid #E6DED3",
                            backgroundColor: "#FFFFFF",
                            color: "#6F665C",
                            cursor: "pointer",
                            fontSize: "1rem",
                            lineHeight: 1,
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>

                    <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label htmlFor={`mt-name-${i}`} style={subLabelStyle}>Medication name</label>
                        <input
                          id={`mt-name-${i}`}
                          type="text"
                          value={med.name}
                          onChange={(e) => updateMed(i, "name", e.target.value)}
                          placeholder="e.g. Ibuprofen"
                          maxLength={50}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor={`mt-dosage-${i}`} style={subLabelStyle}>Dosage</label>
                        <input
                          id={`mt-dosage-${i}`}
                          type="text"
                          value={med.dosage}
                          onChange={(e) => updateMed(i, "dosage", e.target.value)}
                          placeholder="e.g. 200mg"
                          maxLength={20}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor={`mt-time-${i}`} style={subLabelStyle}>Time</label>
                        <input
                          id={`mt-time-${i}`}
                          type="text"
                          value={med.time}
                          onChange={(e) => updateMed(i, "time", e.target.value)}
                          placeholder="e.g. 8:00 AM"
                          maxLength={20}
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label htmlFor={`mt-notes-${i}`} style={subLabelStyle}>
                          Notes{" "}
                          <span style={{ fontWeight: 400 }}>(optional)</span>
                        </label>
                        <input
                          id={`mt-notes-${i}`}
                          type="text"
                          value={med.notes}
                          onChange={(e) => updateMed(i, "notes", e.target.value)}
                          placeholder="e.g. Take with food"
                          maxLength={60}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {data.medications.length < MAX_MEDS && (
                <button
                  type="button"
                  onClick={addMed}
                  style={{
                    marginTop: "0.625rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.8125rem",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    color: "#6F8F72",
                    background: "none",
                    border: "none",
                    padding: "0.25rem 0",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: "1rem", lineHeight: 1 }}>+</span>
                  Add another medication
                </button>
              )}
            </fieldset>

            {/* Additional notes */}
            <div>
              <label htmlFor="mt-addl-notes" style={labelStyle}>
                Additional notes{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <textarea
                id="mt-addl-notes"
                value={data.additionalNotes}
                onChange={(e) => set("additionalNotes", e.target.value)}
                placeholder="Any extra instructions or reminders…"
                maxLength={400}
                rows={3}
                style={{ ...inputStyle, resize: "vertical", minHeight: "4.5rem", lineHeight: 1.6 }}
              />
            </div>

            {/* Theme */}
            <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
              <legend style={labelStyle}>Theme</legend>
              <div className="flex flex-col gap-2">
                {THEMES.map((t) => {
                  const selected = data.theme === t.value;
                  return (
                    <label
                      key={t.value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.625rem 0.875rem",
                        borderRadius: "0.5rem",
                        border: `1px solid ${selected ? "#6F8F72" : "#E6DED3"}`,
                        backgroundColor: selected ? "#F6FAF6" : "#FFFFFF",
                        cursor: "pointer",
                        transition: "all 120ms ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="mt-theme"
                        value={t.value}
                        checked={selected}
                        onChange={() => set("theme", t.value)}
                        style={{ accentColor: "#6F8F72" }}
                      />
                      <span>
                        <span style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#2F2A25", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                          {t.label}
                        </span>
                        <span style={{ display: "block", fontSize: "0.78rem", color: "#6F665C", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                          {t.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </div>

        {/* ── Preview — order:2, below form on mobile ── */}
        <div className="flex flex-col gap-4" style={{ order: 2 }}>
          <div className="lg:sticky" style={{ top: "80px" }}>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E6DED3",
                borderRadius: "0.875rem",
                padding: "1.5rem",
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
                <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontSize: "1rem", fontWeight: 600, margin: 0 }}>
                  Preview
                </h2>
                <span style={{ fontSize: "0.75rem", color: "#6F665C", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  Updates as you type
                </span>
              </div>

              <div
                aria-label="Medication tracker preview"
                aria-hidden="true"
                style={{
                  overflow: "hidden",
                  borderRadius: "0.5rem",
                  border: "1px solid #E6DED3",
                  backgroundColor: "#F3EEE7",
                  padding: "0.75rem",
                  aspectRatio: "8.5 / 11",
                  position: "relative",
                  pointerEvents: "none",
                }}
              >
                <MedicationTrackerPreview data={data} forPrint={false} />
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.625rem",
                width: "100%",
                marginTop: "1rem",
                padding: "1rem 1.5rem",
                borderRadius: "0.625rem",
                border: "none",
                backgroundColor: "#6F8F72",
                color: "#FFFFFF",
                fontSize: "1rem",
                fontWeight: 600,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                cursor: "pointer",
                transition: "background-color 150ms ease",
                minHeight: "3.25rem",
                letterSpacing: "0.01em",
              }}
              aria-label="Download medication tracker as PDF"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M10 3v10m0 0L7 10m3 3l3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 14.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Download Tracker PDF
            </button>

            <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#6F665C", marginTop: "0.625rem", fontFamily: "var(--font-inter), system-ui, sans-serif", lineHeight: 1.5 }}>
              Prints on US Letter paper. No sign-up required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
