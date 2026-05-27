"use client";

import { useState, useCallback } from "react";
import MealPlannerPreview from "./MealPlannerPreview";
import {
  DEFAULT_MEAL_PLANNER_DATA,
  MEAL_DAYS,
  MEAL_SLOTS,
  MEAL_THEME_TOKENS,
  formatWeekOf,
  escHtml,
  type MealPlannerData,
  type MealPlannerTheme,
  type MealDay,
  type MealSlot,
} from "./MealPlannerTypes";

/* ── Theme selector options ──────────────────────────────── */
const THEMES: { value: MealPlannerTheme; label: string; description: string }[] = [
  { value: "minimal",      label: "Minimal",      description: "Clean black text, great for B&W printing" },
  { value: "soft-family",  label: "Soft Family",  description: "Sage green headers, warm and readable" },
  { value: "kitchen-warm", label: "Kitchen Warm", description: "Terracotta accents, cozy kitchen feel" },
];

/* ── Shared inline styles ────────────────────────────────── */
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

const sectionHeadStyle: React.CSSProperties = {
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "#2F2A25",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  marginBottom: "0.5rem",
  marginTop: "0.25rem",
};

/* ── Component ───────────────────────────────────────────── */
export default function MealPlannerGenerator() {
  const [data, setData] = useState<MealPlannerData>(DEFAULT_MEAL_PLANNER_DATA);

  const set = useCallback(<K extends keyof MealPlannerData>(
    key: K,
    value: MealPlannerData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setMeal = useCallback((day: MealDay, slot: MealSlot, value: string) => {
    setData((prev) => ({
      ...prev,
      meals: {
        ...prev.meals,
        [day]: { ...prev.meals[day], [slot]: value },
      },
    }));
  }, []);

  /* ── PDF generation ────────────────────────────────────── */
  const handlePrint = () => {
    const title       = data.title.trim()      || "Weekly Meal Planner";
    const familyName  = data.familyName.trim();
    const weekOfDisplay = formatWeekOf(data.weekOf);
    const groceryNotes  = data.groceryNotes.trim();

    // Suggested filename
    const slug = familyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const pdfTitle = slug ? `${slug}-meal-planner` : "meal-planner";

    const tk = MEAL_THEME_TOKENS[data.theme];
    const labelColPct = 13;
    const dayColPct = parseFloat(((100 - labelColPct) / MEAL_DAYS.length).toFixed(2));

    // Day header cells
    const dayHeaders = MEAL_DAYS
      .map((day, i) =>
        `<th class="day-col" style="border-right:${i < MEAL_DAYS.length - 1 ? `1px solid ${tk.headBorder}` : "none"}">${escHtml(day.slice(0, 3))}</th>`
      )
      .join("");

    // Meal rows
    const mealRows = MEAL_SLOTS.map((slot, si) => {
      const isLast = si === MEAL_SLOTS.length - 1;
      const bottomBorder = isLast ? "none" : `1px solid ${tk.cellBorder}`;

      const dayCells = MEAL_DAYS.map((day, ci) => {
        const isLastDay = ci === MEAL_DAYS.length - 1;
        const text = data.meals[day][slot.key];
        return (
          `<td style="padding:8px 6px;font-size:11px;line-height:1.5;color:${text ? "#2f2a25" : "#ccc"};` +
          `border-bottom:${bottomBorder};border-right:${isLastDay ? "none" : `1px solid ${tk.cellBorder}`};` +
          `vertical-align:top;min-height:40px;">` +
          `${escHtml(text)}</td>`
        );
      }).join("");

      return (
        `<tr>` +
        `<td style="padding:8px 6px 8px 10px;font-size:10px;font-weight:600;` +
        `font-family:Arial,Helvetica,sans-serif;letter-spacing:0.03em;text-transform:uppercase;` +
        `color:${tk.slotLabelText};background:${tk.slotLabelBg};` +
        `border-bottom:${bottomBorder};border-right:1px solid ${tk.cellBorder};` +
        `vertical-align:top;line-height:1.3;">` +
        `${escHtml(slot.label)}</td>` +
        dayCells +
        `</tr>`
      );
    }).join("\n");

    // Grocery notes block
    const notesBlock = groceryNotes
      ? `<div style="margin:14px 20px;padding:10px 12px;` +
        `border:1px solid ${tk.notesBorder};border-left:4px solid ${tk.notesAccent};border-radius:4px;">` +
        `<div style="font-size:10px;font-weight:700;font-family:Arial,Helvetica,sans-serif;` +
        `letter-spacing:0.06em;text-transform:uppercase;color:${tk.notesAccent};margin-bottom:5px;">` +
        `Grocery Notes</div>` +
        `<div style="font-size:12px;color:#2f2a25;line-height:1.6;white-space:pre-wrap;">` +
        `${escHtml(groceryNotes)}</div>` +
        `</div>`
      : "";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
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
    .page {
      border: 1px solid ${tk.pageBorder};
      border-radius: 6px;
      overflow: hidden;
    }
    .title-block {
      padding: 16px 20px 14px;
      border-bottom: 2px solid ${tk.titleRuleBorder};
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }
    .accent-bar {
      width: 4px;
      min-height: 44px;
      background: ${tk.accentColor};
      border-radius: 2px;
      flex-shrink: 0;
      align-self: stretch;
    }
    .plan-title {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.15;
      color: #2f2a25;
      letter-spacing: -0.01em;
    }
    .family-name {
      font-size: 12px;
      color: #6f665c;
      margin-top: 3px;
      font-style: italic;
    }
    .week-line {
      font-size: 11px;
      color: #6f665c;
      margin-top: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    col.label-col { width: ${labelColPct}%; }
    col.day-col   { width: ${dayColPct}%; }
    thead tr { background: ${tk.headBg}; }
    th {
      font-size: 10px;
      font-weight: 600;
      font-family: Arial, Helvetica, sans-serif;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: ${tk.headText};
      padding: 7px 5px 6px;
      text-align: center;
      border-bottom: 2px solid ${tk.headBorder};
    }
    th.label-th { text-align: left; padding-left: 10px; }
    .footer {
      padding: 8px 20px 10px;
      border-top: 1px solid ${tk.cellBorder};
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      font-family: Arial, Helvetica, sans-serif;
      color: #9a9590;
      letter-spacing: 0.02em;
    }
  </style>
</head>
<body>
<div class="page">
  <div class="title-block">
    <div class="accent-bar"></div>
    <div>
      <div class="plan-title">${escHtml(title)}</div>
      ${familyName ? `<div class="family-name">${escHtml(familyName)}</div>` : ""}
      <div class="week-line">Week of: <strong style="color:#2f2a25;">${escHtml(weekOfDisplay)}</strong></div>
    </div>
  </div>
  <table>
    <colgroup>
      <col class="label-col" />
      ${MEAL_DAYS.map(() => `<col class="day-col" />`).join("")}
    </colgroup>
    <thead>
      <tr>
        <th class="label-th">Meal</th>
        ${dayHeaders}
      </tr>
    </thead>
    <tbody>
      ${mealRows}
    </tbody>
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

  /* ── Render ────────────────────────────────────────────── */
  return (
    <div>
      <div
        className="grid gap-6 lg:grid-cols-2 lg:items-start"
        style={{ paddingTop: "0.5rem" }}
      >
        {/* ── Form — order:1, always above preview on mobile ── */}
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
            Customize your planner
          </h2>

          <div className="flex flex-col gap-5">

            {/* Planner title */}
            <div>
              <label htmlFor="mp-title" style={labelStyle}>Planner title</label>
              <input
                id="mp-title"
                type="text"
                value={data.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Weekly Meal Planner"
                maxLength={60}
                style={inputStyle}
              />
            </div>

            {/* Family name */}
            <div>
              <label htmlFor="mp-family" style={labelStyle}>
                Family name{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <input
                id="mp-family"
                type="text"
                value={data.familyName}
                onChange={(e) => set("familyName", e.target.value)}
                placeholder="The Johnsons"
                maxLength={40}
                style={inputStyle}
              />
            </div>

            {/* Week of */}
            <div>
              <label htmlFor="mp-week" style={labelStyle}>
                Week of{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <input
                id="mp-week"
                type="date"
                value={data.weekOf}
                onChange={(e) => set("weekOf", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Meals per day */}
            <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
              <legend
                style={{
                  ...labelStyle,
                  marginBottom: "0.875rem",
                  display: "block",
                  width: "100%",
                }}
              >
                Meals for each day
              </legend>

              <div className="flex flex-col gap-5">
                {MEAL_DAYS.map((day) => (
                  <div key={day}>
                    <p style={sectionHeadStyle}>{day}</p>
                    <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
                      {MEAL_SLOTS.map((slot) => (
                        <div key={slot.key}>
                          <label
                            htmlFor={`mp-${day}-${slot.key}`}
                            style={{ ...labelStyle, marginBottom: "0.2rem" }}
                          >
                            {slot.label}
                          </label>
                          <input
                            id={`mp-${day}-${slot.key}`}
                            type="text"
                            value={data.meals[day][slot.key]}
                            onChange={(e) => setMeal(day, slot.key, e.target.value)}
                            placeholder={slot.label}
                            maxLength={60}
                            style={inputStyle}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Grocery notes */}
            <div>
              <label htmlFor="mp-grocery" style={labelStyle}>
                Grocery notes{" "}
                <span style={{ fontWeight: 400, color: "#6F665C" }}>(optional)</span>
              </label>
              <textarea
                id="mp-grocery"
                value={data.groceryNotes}
                onChange={(e) => set("groceryNotes", e.target.value)}
                placeholder="Items to pick up this week…"
                maxLength={400}
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "5rem",
                  lineHeight: 1.6,
                }}
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
                        name="mp-theme"
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

              {/* Aspect-ratio container prevents overflow on mobile */}
              <div
                aria-label="Meal planner preview"
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
                <MealPlannerPreview data={data} forPrint={false} />
              </div>
            </div>

            {/* Download button */}
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
              aria-label="Download meal planner as PDF"
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
              Download Meal Planner PDF
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
