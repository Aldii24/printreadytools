"use client";

import { useState, useCallback } from "react";
import ChoreChartPreview from "./ChoreChartPreview";

/* ── Types ───────────────────────────────────────────────── */
export type Theme = "minimal" | "soft-family" | "kid-friendly";

export interface ChartData {
  title: string;
  childName: string;
  chores: string[];
  days: string[];
  reward: string;
  theme: Theme;
  weekOf: string; // ISO date string "YYYY-MM-DD" or ""
}

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DEFAULT_CHORES = [
  "Make the bed",
  "Brush teeth",
  "Put away toys",
  "Help with dinner",
];

const DEFAULT_DATA: ChartData = {
  title: "Weekly Chore Chart",
  childName: "",
  chores: DEFAULT_CHORES,
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  reward: "",
  theme: "soft-family",
  weekOf: "",
};

const THEMES: { value: Theme; label: string; description: string }[] = [
  { value: "minimal", label: "Minimal", description: "Clean black text, great for B&W printing" },
  { value: "soft-family", label: "Soft Family", description: "Sage green headers with soft accents" },
  { value: "kid-friendly", label: "Kid Friendly", description: "Warm yellow highlights, fun but neat" },
];

/* ── Field styles ────────────────────────────────────────── */
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

/* ── Component ───────────────────────────────────────────── */
export default function ChoreChartGenerator() {
  const [data, setData] = useState<ChartData>(DEFAULT_DATA);

  /* helpers */
  const set = useCallback(<K extends keyof ChartData>(key: K, value: ChartData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateChore = (index: number, value: string) => {
    const updated = [...data.chores];
    updated[index] = value;
    setData((prev) => ({ ...prev, chores: updated }));
  };

  const addChore = () => {
    if (data.chores.length < 12) {
      setData((prev) => ({ ...prev, chores: [...prev.chores, ""] }));
    }
  };

  const removeChore = (index: number) => {
    setData((prev) => ({
      ...prev,
      chores: prev.chores.filter((_, i) => i !== index),
    }));
  };

  const toggleDay = (day: string) => {
    setData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...ALL_DAYS.filter((d) => prev.days.includes(d) || d === day)],
    }));
  };

  const handlePrint = () => {
    // ── Fallbacks ────────────────────────────────────────
    const FALLBACK_CHORES = ["Make the bed", "Put away toys", "Help with dinner"];
    const FALLBACK_DAYS   = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const title        = data.title.trim()     || "Weekly Chore Chart";
    const childName    = data.childName.trim(); // empty string = omit from PDF
    const days         = data.days.length > 0  ? data.days : FALLBACK_DAYS;
    const chores       = data.chores.filter((c) => c.trim() !== "");
    const activeChores = chores.length > 0     ? chores    : FALLBACK_CHORES;
    const reward       = data.reward.trim();

    // ── PDF suggested filename ────────────────────────────
    // Browsers use the window title as the default save name.
    // "emma-chore-chart" or "chore-chart"
    const slugName = childName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const pdfTitle = slugName ? `${slugName}-chore-chart` : "chore-chart";

    // ── Sanitise user values written into raw HTML ────────
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;");

    // ── Format "Week of" date ─────────────────────────────
    // Input is "YYYY-MM-DD" from <input type="date">.
    // Output: "January 12, 2026" or fallback underline.
    const weekOfDisplay = (() => {
      const raw = data.weekOf.trim();
      if (!raw) return "__________";
      // Parse as local date by splitting to avoid UTC-offset shift
      const [y, m, d] = raw.split("-").map(Number);
      if (!y || !m || !d) return "__________";
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    })();

    // ── Per-theme design tokens ───────────────────────────
    // All themes avoid large filled backgrounds so they
    // print cleanly even with "background graphics" off.
    const themeTokens: Record<Theme, {
      // Accent stripe in the title block
      accentColor: string;
      // Column-header row
      headBg: string; headText: string; headBorder: string;
      // Table body borders
      cellBorder: string;
      // Checkbox
      cbBorder: string; cbRadius: string;
      // Reward block
      rewardBorder: string; rewardAccent: string;
      // Outer page border
      pageBorder: string;
      // Title-block bottom rule
      titleRuleBorder: string;
    }> = {
      minimal: {
        accentColor:      "#2F2A25",
        headBg:           "#F5F3F0",
        headText:         "#2F2A25",
        headBorder:       "#C8C4BE",
        cellBorder:       "#D8D4CE",
        cbBorder:         "#888580",
        cbRadius:         "2px",
        rewardBorder:     "#C8C4BE",
        rewardAccent:     "#2F2A25",
        pageBorder:       "#C8C4BE",
        titleRuleBorder:  "#C8C4BE",
      },
      "soft-family": {
        accentColor:      "#6F8F72",
        headBg:           "#EDF4EE",
        headText:         "#2F2A25",
        headBorder:       "#B8D4BA",
        cellBorder:       "#C8DEC9",
        cbBorder:         "#6F8F72",
        cbRadius:         "3px",
        rewardBorder:     "#6F8F72",
        rewardAccent:     "#6F8F72",
        pageBorder:       "#B8D4BA",
        titleRuleBorder:  "#6F8F72",
      },
      "kid-friendly": {
        accentColor:      "#C9825B",
        headBg:           "#FDF6E8",
        headText:         "#2F2A25",
        headBorder:       "#E0C97A",
        cellBorder:       "#E8D99A",
        cbBorder:         "#C9825B",
        cbRadius:         "50%",
        rewardBorder:     "#E8C872",
        rewardAccent:     "#C9825B",
        pageBorder:       "#E0C97A",
        titleRuleBorder:  "#E8C872",
      },
    };
    const tk = themeTokens[data.theme];

    // ── Proportional column widths ────────────────────────
    // Chore label takes 32 %, remaining 68 % shared across days
    const choreColPct = 32;
    const dayColPct   = parseFloat(((100 - choreColPct) / days.length).toFixed(2));

    // ── Day header cells ──────────────────────────────────
    const dayHeaders = days
      .map((d) =>
        `<th class="day-col">${esc(d)}</th>`
      )
      .join("");

    // ── Chore rows ────────────────────────────────────────
    const rows = activeChores
      .map((chore) => {
        const dayCells = days
          .map(() =>
            `<td class="checkbox-cell">` +
            `<div class="cb"></div>` +
            `</td>`
          )
          .join("");
        return `<tr><td class="chore-cell">${esc(chore)}</td>${dayCells}</tr>`;
      })
      .join("\n");

    // ── Reward block ──────────────────────────────────────
    const rewardBlock = reward
      ? `<div class="reward-block">` +
        `<span class="reward-label">★ Reward</span>` +
        `<span class="reward-text">${esc(reward)}</span>` +
        `</div>`
      : "";

    // ── Full HTML document ────────────────────────────────
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${esc(pdfTitle)}</title>
  <style>
    /* ── Page setup ─────────────────────────────────── */
    @page {
      size: letter portrait;
      /* Zero @page margin removes the browser's
         auto-generated header (URL/timestamp) and
         footer (page number). We handle margins on
         the body element instead. */
      margin: 0;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 13px;
      color: #2f2a25;
      background: #fff;
      /* Page margins live here, not in @page */
      padding: 0.55in 0.6in;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ── Outer wrapper ───────────────────────────────── */
    .page {
      border: 1px solid ${tk.pageBorder};
      border-radius: 6px;
      overflow: hidden;
    }

    /* ── Title block ─────────────────────────────────── */
    .title-block {
      padding: 18px 22px 16px 22px;
      border-bottom: 2px solid ${tk.titleRuleBorder};
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }
    .accent-bar {
      width: 4px;
      min-height: 48px;
      background: ${tk.accentColor};
      border-radius: 2px;
      flex-shrink: 0;
      align-self: stretch;
    }
    .title-content {
      flex: 1;
    }
    .chart-title {
      font-size: 22px;
      font-weight: 700;
      line-height: 1.15;
      color: #2f2a25;
      letter-spacing: -0.01em;
    }
    .child-name {
      font-size: 13px;
      color: #6f665c;
      margin-top: 4px;
      font-style: italic;
    }
    .week-line {
      font-size: 12px;
      color: #6f665c;
      margin-top: 10px;
    }
    .week-value {
      font-style: normal;
      color: #2f2a25;
    }

    /* ── Chore table ─────────────────────────────────── */
    .table-wrap {
      padding: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    col.chore-col { width: ${choreColPct}%; }
    col.day-col   { width: ${dayColPct}%; }

    thead tr {
      background: ${tk.headBg};
    }
    th {
      font-size: 11px;
      font-weight: 600;
      font-family: Arial, Helvetica, sans-serif;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: ${tk.headText};
      padding: 9px 6px 8px;
      text-align: center;
      border-bottom: 2px solid ${tk.headBorder};
      border-right: 1px solid ${tk.headBorder};
    }
    th:last-child { border-right: none; }
    th.th-chore {
      text-align: left;
      padding-left: 22px;
    }

    td {
      border-bottom: 1px solid ${tk.cellBorder};
      border-right: 1px solid ${tk.cellBorder};
      vertical-align: middle;
    }
    td:last-child { border-right: none; }

    .chore-cell {
      padding: 11px 10px 11px 22px;
      font-size: 13px;
      line-height: 1.4;
      color: #2f2a25;
    }
    .checkbox-cell {
      text-align: center;
      padding: 11px 4px;
    }
    .cb {
      width: 16px;
      height: 16px;
      border: 1.5px solid ${tk.cbBorder};
      border-radius: ${tk.cbRadius};
      margin: 0 auto;
      background: #fff;
    }

    /* Last row — no bottom border */
    tbody tr:last-child td {
      border-bottom: none;
    }

    /* ── Reward block ────────────────────────────────── */
    .reward-block {
      margin: 16px 22px;
      padding: 10px 14px;
      border: 1px solid ${tk.rewardBorder};
      border-left: 4px solid ${tk.rewardAccent};
      border-radius: 4px;
      display: flex;
      align-items: baseline;
      gap: 10px;
    }
    .reward-label {
      font-size: 11px;
      font-weight: 700;
      font-family: Arial, Helvetica, sans-serif;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: ${tk.rewardAccent};
      white-space: nowrap;
    }
    .reward-text {
      font-size: 13px;
      color: #2f2a25;
    }

    /* ── Footer ──────────────────────────────────────── */
    .footer {
      padding: 10px 22px 12px;
      border-top: 1px solid ${tk.cellBorder};
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      font-family: Arial, Helvetica, sans-serif;
      color: #9a9590;
      letter-spacing: 0.02em;
    }
  </style>
</head>
<body>
<div class="page">

  <!-- Title block -->
  <div class="title-block">
    <div class="accent-bar"></div>
    <div class="title-content">
      <div class="chart-title">${esc(title)}</div>
      ${childName ? `<div class="child-name">${esc(childName)}</div>` : ""}
      <div class="week-line">
        Week of: <span class="week-value">${esc(weekOfDisplay)}</span>
      </div>
    </div>
  </div>

  <!-- Chore table -->
  <div class="table-wrap">
    <table>
      <colgroup>
        <col class="chore-col" />
        ${days.map(() => `<col class="day-col" />`).join("")}
      </colgroup>
      <thead>
        <tr>
          <th class="th-chore">Chore</th>
          ${dayHeaders}
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>

  <!-- Reward -->
  ${rewardBlock}

  <!-- Footer -->
  <div class="footer">
    <span>printreadytools.com</span>
    <span>Free printable — no sign-up required</span>
  </div>

</div>
</body>
</html>`;

    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.onload = () => { win.focus(); win.print(); };
    setTimeout(() => {
      try { win.focus(); win.print(); } catch { /* already triggered */ }
    }, 350);
  };

  return (
    <div>
      {/* Two-column layout on desktop, stacked on mobile */}
      <div
        className="grid gap-6 lg:grid-cols-2 lg:items-start"
        style={{ paddingTop: "0.5rem" }}
      >
        {/* ── LEFT: Form — always renders first in DOM and on screen ── */}
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
            Customize your chart
          </h2>

          <div className="flex flex-col gap-4">
            {/* Chart title */}
            <div>
              <label htmlFor="chart-title" style={labelStyle}>
                Chart title
              </label>
              <input
                id="chart-title"
                type="text"
                value={data.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Weekly Chore Chart"
                maxLength={60}
                style={inputStyle}
              />
            </div>

            {/* Child name */}
            <div>
              <label htmlFor="child-name" style={labelStyle}>
                Child&apos;s name{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <input
                id="child-name"
                type="text"
                value={data.childName}
                onChange={(e) => set("childName", e.target.value)}
                placeholder="Child's name"
                maxLength={40}
                style={inputStyle}
              />
            </div>

            {/* Week of */}
            <div>
              <label htmlFor="week-of" style={labelStyle}>
                Week of{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <input
                id="week-of"
                type="date"
                value={data.weekOf}
                onChange={(e) => set("weekOf", e.target.value)}
                style={inputStyle}
              />
              <p style={{ fontSize: "0.75rem", color: "#6F665C", marginTop: "0.25rem", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                Shown on the printed chart as the week start date.
              </p>
            </div>

            {/* Chores */}
            <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
              <legend style={{ ...labelStyle, float: "left", marginBottom: "0.5rem" }}>
                Chores <span style={{ fontWeight: 400 }}>(up to 12)</span>
              </legend>
              <div style={{ clear: "both" }} />
              <div className="flex flex-col gap-2">
                {data.chores.map((chore, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={chore}
                      onChange={(e) => updateChore(i, e.target.value)}
                      placeholder={`Chore ${i + 1}`}
                      maxLength={50}
                      aria-label={`Chore ${i + 1}`}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    {data.chores.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChore(i)}
                        aria-label={`Remove chore ${i + 1}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "0.375rem",
                          border: "1px solid #E6DED3",
                          backgroundColor: "#FFFFFF",
                          color: "#6F665C",
                          cursor: "pointer",
                          flexShrink: 0,
                          fontSize: "1rem",
                          lineHeight: 1,
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {data.chores.length < 12 && (
                <button
                  type="button"
                  onClick={addChore}
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
                  Add another chore
                </button>
              )}
            </fieldset>

            {/* Days */}
            <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
              <legend style={labelStyle}>Days of the week</legend>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Select days">
                {ALL_DAYS.map((day) => {
                  const checked = data.days.includes(day);
                  return (
                    <label
                      key={day}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2.75rem",
                        height: "2.25rem",
                        borderRadius: "0.375rem",
                        border: `1px solid ${checked ? "#6F8F72" : "#E6DED3"}`,
                        backgroundColor: checked ? "#6F8F72" : "#FFFFFF",
                        color: checked ? "#FFFFFF" : "#6F665C",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        cursor: "pointer",
                        userSelect: "none",
                        transition: "all 120ms ease",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDay(day)}
                        aria-label={day}
                        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                      />
                      {day}
                    </label>
                  );
                })}
              </div>
              {data.days.length === 0 && (
                <p
                  role="alert"
                  style={{ color: "#C9825B", fontSize: "0.78rem", marginTop: "0.375rem" }}
                >
                  Select at least one day.
                </p>
              )}
            </fieldset>

            {/* Reward */}
            <div>
              <label htmlFor="reward-text" style={labelStyle}>
                Reward or note{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <input
                id="reward-text"
                type="text"
                value={data.reward}
                onChange={(e) => set("reward", e.target.value)}
                placeholder="e.g. Extra screen time on Saturday!"
                maxLength={80}
                style={inputStyle}
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
                        name="theme"
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

        {/* ── RIGHT: Preview — order:2 keeps it below form on mobile ── */}
        <div className="flex flex-col gap-4" style={{ order: 2 }}>
          {/* Sticky only on large screens where layout is side-by-side */}
          <div className="lg:sticky" style={{ top: "80px" }}>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E6DED3",
                borderRadius: "0.875rem",
                padding: "1.5rem",
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: "1rem" }}
              >
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

              {/* Preview panel — scaled to fit.
                  pointer-events:none prevents the scaled 816px
                  inner div from intercepting taps on mobile. */}
              <div
                aria-label="Printable preview"
                aria-hidden="true"
                style={{
                  overflow: "hidden",
                  borderRadius: "0.5rem",
                  border: "1px solid #E6DED3",
                  backgroundColor: "#F3EEE7",
                  padding: "0.75rem",
                  /* Fixed aspect ratio so the container has real height
                     and the absolute child cannot overflow it */
                  aspectRatio: "8.5 / 11",
                  position: "relative",
                  pointerEvents: "none",
                }}
              >
                <ChoreChartPreview data={data} forPrint={false} />
              </div>
            </div>

            {/* Download button */}
            <button
              type="button"
              onClick={handlePrint}
              disabled={data.days.length === 0}
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
                backgroundColor: data.days.length === 0 ? "#D1C9C2" : "#6F8F72",
                color: "#FFFFFF",
                fontSize: "1rem",
                fontWeight: 600,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                cursor: data.days.length === 0 ? "not-allowed" : "pointer",
                transition: "background-color 150ms ease",
                minHeight: "3.25rem",
                letterSpacing: "0.01em",
              }}
              aria-label="Download chore chart as PDF"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
              Download Chore Chart PDF
            </button>

            {/* Sub-note */}
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
