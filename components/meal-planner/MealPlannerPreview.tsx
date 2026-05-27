"use client";

import { useRef, useEffect, useState } from "react";
import type { MealPlannerData } from "./MealPlannerTypes";
import {
  MEAL_DAYS,
  MEAL_SLOTS,
  MEAL_THEME_TOKENS,
  formatWeekOf,
} from "./MealPlannerTypes";

const PDF_W = 816; // 8.5in @ 96 dpi

interface Props {
  data: MealPlannerData;
  forPrint?: boolean;
}

export default function MealPlannerPreview({ data, forPrint = false }: Props) {
  const tk = MEAL_THEME_TOKENS[data.theme];
  const weekOfDisplay = formatWeekOf(data.weekOf);

  // Day columns: equal width across 7 days
  // Label column: fixed ~15%; remaining 85% shared
  const labelColPct = 13;
  const dayColPct = parseFloat(((100 - labelColPct) / MEAL_DAYS.length).toFixed(2));

  const outerStyle: React.CSSProperties = forPrint
    ? {
        width: `${PDF_W}px`,
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "12px",
        color: "#2f2a25",
        backgroundColor: "#fff",
      }
    : {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      };

  const chart = (
    <div
      style={{
        border: `1px solid ${tk.pageBorder}`,
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      {/* ── Title block ──────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: "14px",
          padding: "16px 20px 14px",
          borderBottom: `2px solid ${tk.titleRuleBorder}`,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: "4px",
            borderRadius: "2px",
            backgroundColor: tk.accentColor,
            flexShrink: 0,
            minHeight: "36px",
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#2f2a25",
              letterSpacing: "-0.01em",
            }}
          >
            {data.title || "Weekly Meal Planner"}
          </div>
          {data.familyName.trim() && (
            <div
              style={{
                fontSize: "12px",
                color: "#6f665c",
                marginTop: "3px",
                fontStyle: "italic",
              }}
            >
              {data.familyName}
            </div>
          )}
          <div style={{ fontSize: "11px", color: "#6f665c", marginTop: "8px" }}>
            Week of:{" "}
            <span style={{ color: "#2f2a25" }}>{weekOfDisplay}</span>
          </div>
        </div>
      </div>

      {/* ── Meal grid ────────────────────────────────── */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <colgroup>
          <col style={{ width: `${labelColPct}%` }} />
          {MEAL_DAYS.map((d) => (
            <col key={d} style={{ width: `${dayColPct}%` }} />
          ))}
        </colgroup>

        {/* Day header row */}
        <thead>
          <tr style={{ backgroundColor: tk.headBg }}>
            <th
              style={{
                padding: "7px 6px 6px 10px",
                fontSize: "10px",
                fontWeight: 600,
                fontFamily: "Arial, Helvetica, sans-serif",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: tk.headText,
                textAlign: "left",
                borderBottom: `2px solid ${tk.headBorder}`,
                borderRight: `1px solid ${tk.headBorder}`,
              }}
            >
              Meal
            </th>
            {MEAL_DAYS.map((day, i) => (
              <th
                key={day}
                style={{
                  padding: "7px 4px 6px",
                  fontSize: "10px",
                  fontWeight: 600,
                  fontFamily: "Arial, Helvetica, sans-serif",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  color: tk.headText,
                  textAlign: "center",
                  borderBottom: `2px solid ${tk.headBorder}`,
                  borderRight: i < MEAL_DAYS.length - 1 ? `1px solid ${tk.headBorder}` : "none",
                }}
              >
                {/* Abbreviate to 3 chars to fit */}
                {day.slice(0, 3)}
              </th>
            ))}
          </tr>
        </thead>

        {/* Meal slot rows */}
        <tbody>
          {MEAL_SLOTS.map((slot, si) => (
            <tr key={slot.key}>
              {/* Slot label */}
              <td
                style={{
                  padding: "8px 6px 8px 10px",
                  fontSize: "10px",
                  fontWeight: 600,
                  fontFamily: "Arial, Helvetica, sans-serif",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  color: tk.slotLabelText,
                  backgroundColor: tk.slotLabelBg,
                  borderBottom: si < MEAL_SLOTS.length - 1 ? `1px solid ${tk.cellBorder}` : "none",
                  borderRight: `1px solid ${tk.cellBorder}`,
                  verticalAlign: "top",
                  lineHeight: 1.3,
                }}
              >
                {slot.label}
              </td>
              {/* Day cells */}
              {MEAL_DAYS.map((day, ci) => {
                const text = data.meals[day][slot.key];
                return (
                  <td
                    key={day}
                    style={{
                      padding: "6px 5px",
                      fontSize: "11px",
                      lineHeight: 1.4,
                      color: text ? "#2f2a25" : "#bbb",
                      borderBottom: si < MEAL_SLOTS.length - 1 ? `1px solid ${tk.cellBorder}` : "none",
                      borderRight: ci < MEAL_DAYS.length - 1 ? `1px solid ${tk.cellBorder}` : "none",
                      verticalAlign: "top",
                      minHeight: "36px",
                    }}
                  >
                    {text || ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Grocery notes ────────────────────────────── */}
      {data.groceryNotes.trim() && (
        <div
          style={{
            margin: "14px 20px",
            padding: "9px 12px",
            border: `1px solid ${tk.notesBorder}`,
            borderLeft: `4px solid ${tk.notesAccent}`,
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "Arial, Helvetica, sans-serif",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: tk.notesAccent,
              marginBottom: "4px",
            }}
          >
            Grocery Notes
          </div>
          <div style={{ fontSize: "11px", color: "#2f2a25", lineHeight: 1.5 }}>
            {data.groceryNotes}
          </div>
        </div>
      )}

      {/* ── Footer ───────────────────────────────────── */}
      <div
        style={{
          padding: "8px 20px 10px",
          borderTop: `1px solid ${tk.cellBorder}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "9px",
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#9a9590",
          letterSpacing: "0.02em",
        }}
      >
        <span>printreadytools.com</span>
        <span>Free printable — no sign-up required</span>
      </div>
    </div>
  );

  if (forPrint) {
    return <div style={outerStyle}>{chart}</div>;
  }

  return (
    <div style={outerStyle}>
      <PreviewScaler pdfWidth={PDF_W}>{chart}</PreviewScaler>
    </div>
  );
}

/* ── ResizeObserver scaler — same pattern as ChoreChartPreview ── */
function PreviewScaler({
  pdfWidth,
  children,
}: {
  pdfWidth: number;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth || el.offsetWidth;
      if (w > 0) setScale(w / pdfWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pdfWidth]);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${pdfWidth}px`,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
