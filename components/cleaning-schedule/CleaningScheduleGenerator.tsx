"use client";

import { useState, useCallback } from "react";
import CleaningSchedulePreview from "./CleaningSchedulePreview";
import {
  DEFAULT_CLEANING_DATA,
  FREQ_OPTIONS,
  CLEANING_THEME_TOKENS,
  emptyTask,
  formatWeekOf,
  escHtml,
  type CleaningScheduleData,
  type CleaningTheme,
  type CleaningTask,
} from "./CleaningScheduleTypes";

const MAX_TASKS = 15;

const THEMES: { value: CleaningTheme; label: string; description: string }[] = [
  { value: "minimal",     label: "Minimal",     description: "Clean black text, great for B&W printing" },
  { value: "soft-family", label: "Soft Family",  description: "Sage green headers, warm and readable" },
  { value: "home-warm",   label: "Home Warm",    description: "Terracotta accents, cozy home feel" },
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

export default function CleaningScheduleGenerator() {
  const [data, setData] = useState<CleaningScheduleData>(DEFAULT_CLEANING_DATA);

  const set = useCallback(<K extends keyof CleaningScheduleData>(key: K, value: CleaningScheduleData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateTask = useCallback((index: number, field: keyof CleaningTask, value: string) => {
    setData((prev) => {
      const updated = [...prev.tasks];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, tasks: updated };
    });
  }, []);

  const addTask = () => {
    if (data.tasks.length < MAX_TASKS) {
      setData((prev) => ({ ...prev, tasks: [...prev.tasks, emptyTask()] }));
    }
  };

  const removeTask = (index: number) => {
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  /* ── PDF generation ──────────────────────────────────── */
  const handlePrint = () => {
    const FALLBACK_TASKS: CleaningTask[] = DEFAULT_CLEANING_DATA.tasks;

    const title       = data.title.trim()    || "Cleaning Schedule";
    const homeName    = data.homeName.trim();
    const weekOfDisplay = formatWeekOf(data.weekOf);
    const notes       = data.additionalNotes.trim();

    const slug = homeName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const pdfTitle = slug ? `${slug}-cleaning-schedule` : "cleaning-schedule";

    const activeTasks = data.tasks.filter((t) => t.room.trim() !== "" || t.task.trim() !== "");
    const tasks = activeTasks.length > 0 ? activeTasks : FALLBACK_TASKS;

    const tk = CLEANING_THEME_TOKENS[data.theme];

    // Column widths
    const roomColPct     = 18;
    const taskColPct     = 22;
    const freqColPct     = 12;
    const assignedColPct = 15;
    const notesColPct    = 100 - roomColPct - taskColPct - freqColPct - assignedColPct;

    const colgroups =
      `<col style="width:${roomColPct}%"/>` +
      `<col style="width:${taskColPct}%"/>` +
      `<col style="width:${freqColPct}%"/>` +
      `<col style="width:${assignedColPct}%"/>` +
      `<col style="width:${notesColPct}%"/>`;

    const headerCells = [
      { label: "Room",        isLast: false },
      { label: "Task",        isLast: false },
      { label: "Frequency",   isLast: false },
      { label: "Assigned To", isLast: false },
      { label: "Notes",       isLast: true  },
    ]
      .map((h) =>
        `<th style="text-align:left;padding:7px 5px 6px 8px;font-size:9px;font-weight:600;` +
        `font-family:Arial,Helvetica,sans-serif;letter-spacing:0.04em;text-transform:uppercase;` +
        `color:${tk.headText};border-bottom:2px solid ${tk.headBorder};` +
        `border-right:${h.isLast ? "none" : `1px solid ${tk.headBorder}`};">` +
        `${escHtml(h.label)}</th>`
      )
      .join("");

    const rows = tasks
      .map((task, ri) => {
        const isLast = ri === tasks.length - 1;
        const bb = isLast ? "none" : `1px solid ${tk.cellBorder}`;
        const baseCell = (val: string, isLastCol = false) =>
          `<td style="padding:9px 5px 9px 8px;font-size:11px;line-height:1.4;color:#2f2a25;` +
          `border-bottom:${bb};border-right:${isLastCol ? "none" : `1px solid ${tk.cellBorder}`};vertical-align:top;">` +
          `${escHtml(val)}</td>`;
        const freqCell =
          `<td style="padding:9px 5px 9px 8px;font-size:11px;line-height:1.4;` +
          `color:${tk.freqText};background:${tk.freqBg};font-style:italic;` +
          `border-bottom:${bb};border-right:1px solid ${tk.cellBorder};vertical-align:top;">` +
          `${escHtml(task.frequency)}</td>`;
        return (
          `<tr>` +
          baseCell(task.room) +
          baseCell(task.task) +
          freqCell +
          baseCell(task.assignedTo) +
          baseCell(task.notes, true) +
          `</tr>`
        );
      })
      .join("\n");

    const notesBlock = notes
      ? `<div style="margin:14px 20px;padding:10px 12px;` +
        `border:1px solid ${tk.notesBorder};border-left:4px solid ${tk.notesAccent};border-radius:4px;">` +
        `<div style="font-size:10px;font-weight:700;font-family:Arial,Helvetica,sans-serif;` +
        `letter-spacing:0.06em;text-transform:uppercase;color:${tk.notesAccent};margin-bottom:5px;">` +
        `Additional Notes</div>` +
        `<div style="font-size:12px;color:#2f2a25;line-height:1.6;white-space:pre-wrap;">` +
        `${escHtml(notes)}</div></div>`
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
    .home-name      { font-size: 12px; color: #6f665c; margin-top: 3px; font-style: italic; }
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
      ${homeName ? `<div class="home-name">${escHtml(homeName)}</div>` : ""}
      <div class="week-line">Week of: <strong style="color:#2f2a25;">${escHtml(weekOfDisplay)}</strong></div>
    </div>
  </div>
  <table>
    <colgroup>${colgroups}</colgroup>
    <thead><tr>${headerCells}</tr></thead>
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
            Customize your schedule
          </h2>

          <div className="flex flex-col gap-4">
            {/* Schedule title */}
            <div>
              <label htmlFor="cs-title" style={labelStyle}>Schedule title</label>
              <input
                id="cs-title"
                type="text"
                value={data.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Cleaning Schedule"
                maxLength={60}
                style={inputStyle}
              />
            </div>

            {/* Home / family name */}
            <div>
              <label htmlFor="cs-home" style={labelStyle}>
                Home / family name{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <input
                id="cs-home"
                type="text"
                value={data.homeName}
                onChange={(e) => set("homeName", e.target.value)}
                placeholder="e.g. The Johnson Home"
                maxLength={40}
                style={inputStyle}
              />
            </div>

            {/* Week of */}
            <div>
              <label htmlFor="cs-week" style={labelStyle}>
                Week of{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <input
                id="cs-week"
                type="date"
                value={data.weekOf}
                onChange={(e) => set("weekOf", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Cleaning tasks */}
            <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
              <legend style={{ ...labelStyle, display: "block", width: "100%", marginBottom: "0.75rem" }}>
                Cleaning tasks{" "}
                <span style={{ fontWeight: 400 }}>(up to {MAX_TASKS})</span>
              </legend>

              <div className="flex flex-col gap-4">
                {data.tasks.map((task, i) => (
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
                        Task {i + 1}
                      </span>
                      {data.tasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTask(i)}
                          aria-label={`Remove task ${i + 1}`}
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

                    <div className="flex flex-col gap-2">
                      {/* Room */}
                      <div>
                        <label htmlFor={`cs-room-${i}`} style={subLabelStyle}>Room or area</label>
                        <input
                          id={`cs-room-${i}`}
                          type="text"
                          value={task.room}
                          onChange={(e) => updateTask(i, "room", e.target.value)}
                          placeholder="e.g. Kitchen"
                          maxLength={40}
                          style={inputStyle}
                        />
                      </div>

                      {/* Task */}
                      <div>
                        <label htmlFor={`cs-task-${i}`} style={subLabelStyle}>Task</label>
                        <input
                          id={`cs-task-${i}`}
                          type="text"
                          value={task.task}
                          onChange={(e) => updateTask(i, "task", e.target.value)}
                          placeholder="e.g. Wipe counters"
                          maxLength={60}
                          style={inputStyle}
                        />
                      </div>

                      {/* Frequency */}
                      <div>
                        <label htmlFor={`cs-freq-${i}`} style={subLabelStyle}>Frequency</label>
                        <select
                          id={`cs-freq-${i}`}
                          value={task.frequency}
                          onChange={(e) => updateTask(i, "frequency", e.target.value)}
                          style={{ ...inputStyle, appearance: "auto" }}
                        >
                          {FREQ_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Assigned to */}
                      <div>
                        <label htmlFor={`cs-assigned-${i}`} style={subLabelStyle}>
                          Assigned to{" "}
                          <span style={{ fontWeight: 400 }}>(optional)</span>
                        </label>
                        <input
                          id={`cs-assigned-${i}`}
                          type="text"
                          value={task.assignedTo}
                          onChange={(e) => updateTask(i, "assignedTo", e.target.value)}
                          placeholder="e.g. Mom"
                          maxLength={30}
                          style={inputStyle}
                        />
                      </div>

                      {/* Notes */}
                      <div>
                        <label htmlFor={`cs-notes-${i}`} style={subLabelStyle}>
                          Notes{" "}
                          <span style={{ fontWeight: 400 }}>(optional)</span>
                        </label>
                        <input
                          id={`cs-notes-${i}`}
                          type="text"
                          value={task.notes}
                          onChange={(e) => updateTask(i, "notes", e.target.value)}
                          placeholder="e.g. Use eco cleaner"
                          maxLength={60}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {data.tasks.length < MAX_TASKS && (
                <button
                  type="button"
                  onClick={addTask}
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
                  Add another task
                </button>
              )}
            </fieldset>

            {/* Additional notes */}
            <div>
              <label htmlFor="cs-addl-notes" style={labelStyle}>
                Additional notes{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <textarea
                id="cs-addl-notes"
                value={data.additionalNotes}
                onChange={(e) => set("additionalNotes", e.target.value)}
                placeholder="Any extra instructions or reminders…"
                maxLength={400}
                rows={4}
                style={{ ...inputStyle, resize: "vertical", minHeight: "5rem", lineHeight: 1.6 }}
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
                        name="cs-theme"
                        value={t.value}
                        checked={selected}
                        onChange={() => set("theme", t.value)}
                        style={{ accentColor: "#6F8F72" }}
                      />
                      <span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "#2F2A25",
                            fontFamily: "var(--font-inter), system-ui, sans-serif",
                          }}
                        >
                          {t.label}
                        </span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "0.78rem",
                            color: "#6F665C",
                            fontFamily: "var(--font-inter), system-ui, sans-serif",
                          }}
                        >
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
                <h2
                  style={{
                    fontFamily: "var(--font-lora), Georgia, serif",
                    color: "#2F2A25",
                    fontSize: "1rem",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  Preview
                </h2>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#6F665C",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                >
                  Updates as you type
                </span>
              </div>

              <div
                aria-label="Cleaning schedule preview"
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
                <CleaningSchedulePreview data={data} forPrint={false} />
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
              aria-label="Download cleaning schedule as PDF"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M10 3v10m0 0L7 10m3 3l3-3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 14.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              Download Cleaning Schedule PDF
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                color: "#6F665C",
                marginTop: "0.625rem",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                lineHeight: 1.5,
              }}
            >
              Prints on US Letter paper. No sign-up required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
