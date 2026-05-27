"use client";

import { useState, useCallback } from "react";
import PetFeedingPreview from "./PetFeedingPreview";
import {
  DEFAULT_PET_FEEDING_DATA,
  PET_TYPES,
  PET_THEME_TOKENS,
  emptyFeedingRow,
  formatWeekOf,
  escHtml,
  type PetFeedingData,
  type PetFeedingTheme,
  type FeedingRow,
} from "./PetFeedingTypes";

const MAX_ROWS = 10;

const THEMES: { value: PetFeedingTheme; label: string; description: string }[] = [
  { value: "minimal",      label: "Minimal",      description: "Clean black text, great for B&W printing" },
  { value: "soft-family",  label: "Soft Family",  description: "Sage green headers, warm and readable" },
  { value: "pet-friendly", label: "Pet Friendly",  description: "Soft blush accents, cozy and fun" },
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

export default function PetFeedingGenerator() {
  const [data, setData] = useState<PetFeedingData>(DEFAULT_PET_FEEDING_DATA);

  const set = useCallback(<K extends keyof PetFeedingData>(key: K, value: PetFeedingData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateRow = useCallback((index: number, field: keyof FeedingRow, value: string) => {
    setData((prev) => {
      const updated = [...prev.feedingRows];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, feedingRows: updated };
    });
  }, []);

  const addRow = () => {
    if (data.feedingRows.length < MAX_ROWS) {
      setData((prev) => ({ ...prev, feedingRows: [...prev.feedingRows, emptyFeedingRow()] }));
    }
  };

  const removeRow = (index: number) => {
    setData((prev) => ({
      ...prev,
      feedingRows: prev.feedingRows.filter((_, i) => i !== index),
    }));
  };

  /* ── PDF generation ──────────────────────────────────── */
  const handlePrint = () => {
    const FALLBACK_ROWS: FeedingRow[] = DEFAULT_PET_FEEDING_DATA.feedingRows;

    const title      = data.title.trim()    || "Pet Feeding Schedule";
    const petName    = data.petName.trim();
    const petType    = data.petType.trim();
    const weekOfDisplay = formatWeekOf(data.weekOf);
    const medNotes   = data.medicationNotes.trim();
    const careNotes  = data.careNotes.trim();

    const petLabel = [petName, petType].filter(Boolean).join(" — ");

    const slug = petName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const pdfTitle = slug ? `${slug}-feeding-schedule` : "pet-feeding-schedule";

    const activeRows = data.feedingRows.filter((r) => r.time.trim() !== "" || r.food.trim() !== "");
    const rows = activeRows.length > 0 ? activeRows : FALLBACK_ROWS;

    const tk = PET_THEME_TOKENS[data.theme];

    const timeColPct    = 16;
    const foodColPct    = 30;
    const portionColPct = 18;
    const notesColPct   = 100 - timeColPct - foodColPct - portionColPct;

    const colgroups =
      `<col style="width:${timeColPct}%"/>` +
      `<col style="width:${foodColPct}%"/>` +
      `<col style="width:${portionColPct}%"/>` +
      `<col style="width:${notesColPct}%"/>`;

    const headerCells = [
      { label: "Time",    isLast: false },
      { label: "Food",    isLast: false },
      { label: "Portion", isLast: false },
      { label: "Notes",   isLast: true },
    ]
      .map((h) =>
        `<th style="text-align:left;padding:7px 5px 6px 8px;font-size:9px;font-weight:600;` +
        `font-family:Arial,Helvetica,sans-serif;letter-spacing:0.04em;text-transform:uppercase;` +
        `color:${tk.headText};border-bottom:2px solid ${tk.headBorder};` +
        `border-right:${h.isLast ? "none" : `1px solid ${tk.headBorder}`};">` +
        `${escHtml(h.label)}</th>`
      )
      .join("");

    const tableRows = rows
      .map((row, ri) => {
        const isLast = ri === rows.length - 1;
        const bb = isLast ? "none" : `1px solid ${tk.cellBorder}`;
        const timeCell =
          `<td style="padding:9px 5px 9px 8px;font-size:11px;line-height:1.4;` +
          `color:${tk.timeText};background:${tk.timeBg};font-style:italic;` +
          `border-bottom:${bb};border-right:1px solid ${tk.cellBorder};vertical-align:top;">` +
          `${escHtml(row.time)}</td>`;
        const baseCell = (val: string, isLastCol = false) =>
          `<td style="padding:9px 5px 9px 8px;font-size:11px;line-height:1.4;color:#2f2a25;` +
          `border-bottom:${bb};border-right:${isLastCol ? "none" : `1px solid ${tk.cellBorder}`};vertical-align:top;">` +
          `${escHtml(val)}</td>`;
        return `<tr>${timeCell}${baseCell(row.food)}${baseCell(row.portion)}${baseCell(row.notes, true)}</tr>`;
      })
      .join("\n");

    const noteBlock = (label: string, content: string) =>
      content
        ? `<div style="margin:14px 20px;padding:10px 12px;` +
          `border:1px solid ${tk.notesBorder};border-left:4px solid ${tk.notesAccent};border-radius:4px;">` +
          `<div style="font-size:10px;font-weight:700;font-family:Arial,Helvetica,sans-serif;` +
          `letter-spacing:0.06em;text-transform:uppercase;color:${tk.notesAccent};margin-bottom:5px;">` +
          `${label}</div>` +
          `<div style="font-size:12px;color:#2f2a25;line-height:1.6;white-space:pre-wrap;">${escHtml(content)}</div></div>`
        : "";

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
    .schedule-title { font-size: 20px; font-weight: 700; line-height: 1.15; color: #2f2a25; letter-spacing: -0.01em; }
    .pet-label      { font-size: 12px; color: #6f665c; margin-top: 3px; font-style: italic; }
    .week-line      { font-size: 11px; color: #6f665c; margin-top: 8px; }
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
      <div class="schedule-title">${escHtml(title)}</div>
      ${petLabel ? `<div class="pet-label">${escHtml(petLabel)}</div>` : ""}
      <div class="week-line">Week of: <strong style="color:#2f2a25;">${escHtml(weekOfDisplay)}</strong></div>
    </div>
  </div>
  <table>
    <colgroup>${colgroups}</colgroup>
    <thead><tr>${headerCells}</tr></thead>
    <tbody>${tableRows}</tbody>
  </table>
  ${noteBlock("Medications &amp; Supplements", medNotes)}
  ${noteBlock("Care Notes", careNotes)}
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
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start" style={{ paddingTop: "0.5rem" }}>

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
          <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontSize: "1rem", fontWeight: 600, marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid #F3EEE7" }}>
            Customize your schedule
          </h2>

          <div className="flex flex-col gap-4">

            {/* Title */}
            <div>
              <label htmlFor="pf-title" style={labelStyle}>Schedule title</label>
              <input
                id="pf-title"
                type="text"
                value={data.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Pet Feeding Schedule"
                maxLength={60}
                style={inputStyle}
              />
            </div>

            {/* Pet name + type in a 2-col grid */}
            <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <label htmlFor="pf-petname" style={labelStyle}>
                  Pet&apos;s name{" "}
                  <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
                </label>
                <input
                  id="pf-petname"
                  type="text"
                  value={data.petName}
                  onChange={(e) => set("petName", e.target.value)}
                  placeholder="Pet's name"
                  maxLength={30}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="pf-pettype" style={labelStyle}>Pet type</label>
                <select
                  id="pf-pettype"
                  value={data.petType}
                  onChange={(e) => set("petType", e.target.value)}
                  style={{ ...inputStyle, appearance: "auto" }}
                >
                  {PET_TYPES.map((pt) => (
                    <option key={pt} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Week of */}
            <div>
              <label htmlFor="pf-week" style={labelStyle}>
                Week of{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <input
                id="pf-week"
                type="date"
                value={data.weekOf}
                onChange={(e) => set("weekOf", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Feeding rows */}
            <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
              <legend style={{ ...labelStyle, display: "block", width: "100%", marginBottom: "0.75rem" }}>
                Feeding schedule{" "}
                <span style={{ fontWeight: 400 }}>(up to {MAX_ROWS})</span>
              </legend>

              <div className="flex flex-col gap-4">
                {data.feedingRows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "#FAF7F2",
                      border: "1px solid #E6DED3",
                      borderRadius: "0.625rem",
                      padding: "0.875rem",
                    }}
                  >
                    <div className="flex items-center justify-between" style={{ marginBottom: "0.625rem" }}>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#2F2A25", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                        Feeding {i + 1}
                      </span>
                      {data.feedingRows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRow(i)}
                          aria-label={`Remove feeding ${i + 1}`}
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
                      <div>
                        <label htmlFor={`pf-time-${i}`} style={subLabelStyle}>Time</label>
                        <input
                          id={`pf-time-${i}`}
                          type="text"
                          value={row.time}
                          onChange={(e) => updateRow(i, "time", e.target.value)}
                          placeholder="e.g. 7:00 AM"
                          maxLength={30}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor={`pf-portion-${i}`} style={subLabelStyle}>Portion</label>
                        <input
                          id={`pf-portion-${i}`}
                          type="text"
                          value={row.portion}
                          onChange={(e) => updateRow(i, "portion", e.target.value)}
                          placeholder="e.g. 1 cup"
                          maxLength={30}
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label htmlFor={`pf-food-${i}`} style={subLabelStyle}>Food</label>
                        <input
                          id={`pf-food-${i}`}
                          type="text"
                          value={row.food}
                          onChange={(e) => updateRow(i, "food", e.target.value)}
                          placeholder="e.g. Dry kibble"
                          maxLength={60}
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label htmlFor={`pf-notes-${i}`} style={subLabelStyle}>
                          Notes{" "}
                          <span style={{ fontWeight: 400 }}>(optional)</span>
                        </label>
                        <input
                          id={`pf-notes-${i}`}
                          type="text"
                          value={row.notes}
                          onChange={(e) => updateRow(i, "notes", e.target.value)}
                          placeholder="e.g. Fresh water alongside"
                          maxLength={60}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {data.feedingRows.length < MAX_ROWS && (
                <button
                  type="button"
                  onClick={addRow}
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
                  Add another feeding
                </button>
              )}
            </fieldset>

            {/* Medication / supplement notes */}
            <div>
              <label htmlFor="pf-med-notes" style={labelStyle}>
                Medication or supplement notes{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <textarea
                id="pf-med-notes"
                value={data.medicationNotes}
                onChange={(e) => set("medicationNotes", e.target.value)}
                placeholder="e.g. Arthritis tablet with morning meal"
                maxLength={300}
                rows={3}
                style={{ ...inputStyle, resize: "vertical", minHeight: "4rem", lineHeight: 1.6 }}
              />
            </div>

            {/* Care notes */}
            <div>
              <label htmlFor="pf-care-notes" style={labelStyle}>
                Care notes{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <textarea
                id="pf-care-notes"
                value={data.careNotes}
                onChange={(e) => set("careNotes", e.target.value)}
                placeholder="e.g. Walk after dinner, brushing twice a week"
                maxLength={300}
                rows={3}
                style={{ ...inputStyle, resize: "vertical", minHeight: "4rem", lineHeight: 1.6 }}
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
                        name="pf-theme"
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
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6DED3", borderRadius: "0.875rem", padding: "1.5rem" }}>
              <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
                <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontSize: "1rem", fontWeight: 600, margin: 0 }}>
                  Preview
                </h2>
                <span style={{ fontSize: "0.75rem", color: "#6F665C", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  Updates as you type
                </span>
              </div>
              <div
                aria-label="Pet feeding schedule preview"
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
                <PetFeedingPreview data={data} forPrint={false} />
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
              aria-label="Download pet feeding schedule as PDF"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M10 3v10m0 0L7 10m3 3l3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 14.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Download Feeding Schedule PDF
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
