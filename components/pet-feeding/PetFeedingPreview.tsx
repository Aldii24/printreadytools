"use client";

import { useRef, useEffect, useState } from "react";
import type { PetFeedingData } from "./PetFeedingTypes";
import { PET_THEME_TOKENS, formatWeekOf } from "./PetFeedingTypes";

const PDF_W = 816; // 8.5in @ 96 dpi

interface Props {
  data: PetFeedingData;
  forPrint?: boolean;
}

export default function PetFeedingPreview({ data, forPrint = false }: Props) {
  const tk = PET_THEME_TOKENS[data.theme as keyof typeof PET_THEME_TOKENS] ?? PET_THEME_TOKENS["soft-family"];
  const weekOfDisplay = formatWeekOf(data.weekOf);
  const visibleRows = data.feedingRows.filter((r) => r.time.trim() !== "" || r.food.trim() !== "");

  // Column widths: Time 16%, Food 30%, Portion 18%, Notes remaining 36%
  const timeColPct    = 16;
  const foodColPct    = 30;
  const portionColPct = 18;
  const notesColPct   = 100 - timeColPct - foodColPct - portionColPct;

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

  const petLabel = [data.petName.trim(), data.petType.trim()]
    .filter(Boolean)
    .join(" — ");

  const chart = (
    <div style={{ border: `1px solid ${tk.pageBorder}`, borderRadius: "6px", overflow: "hidden" }}>

      {/* ── Title block ────────────────────────────────── */}
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
          <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "20px", fontWeight: 700, lineHeight: 1.15, color: "#2f2a25", letterSpacing: "-0.01em" }}>
            {data.title || "Pet Feeding Schedule"}
          </div>
          {petLabel && (
            <div style={{ fontSize: "12px", color: "#6f665c", marginTop: "3px", fontStyle: "italic" }}>
              {petLabel}
            </div>
          )}
          <div style={{ fontSize: "11px", color: "#6f665c", marginTop: "8px" }}>
            Week of: <span style={{ color: "#2f2a25" }}>{weekOfDisplay}</span>
          </div>
        </div>
      </div>

      {/* ── Feeding table ──────────────────────────────── */}
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: `${timeColPct}%` }} />
          <col style={{ width: `${foodColPct}%` }} />
          <col style={{ width: `${portionColPct}%` }} />
          <col style={{ width: `${notesColPct}%` }} />
        </colgroup>
        <thead>
          <tr style={{ backgroundColor: tk.headBg }}>
            {[
              { label: "Time",    isLast: false },
              { label: "Food",    isLast: false },
              { label: "Portion", isLast: false },
              { label: "Notes",   isLast: true },
            ].map((col) => (
              <th
                key={col.label}
                style={{
                  textAlign: "left",
                  padding: "7px 5px 6px 8px",
                  fontSize: "9px",
                  fontWeight: 600,
                  fontFamily: "Arial, Helvetica, sans-serif",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: tk.headText,
                  borderBottom: `2px solid ${tk.headBorder}`,
                  borderRight: col.isLast ? "none" : `1px solid ${tk.headBorder}`,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.length > 0 ? (
            visibleRows.map((row, ri) => {
              const isLast = ri === visibleRows.length - 1;
              const bb = isLast ? "none" : `1px solid ${tk.cellBorder}`;
              return (
                <tr key={ri}>
                  {/* Time — tinted */}
                  <td style={{ padding: "8px 5px 8px 8px", fontSize: "11px", lineHeight: 1.4, fontStyle: "italic", color: tk.timeText, backgroundColor: tk.timeBg, borderBottom: bb, borderRight: `1px solid ${tk.cellBorder}`, verticalAlign: "top" }}>
                    {row.time}
                  </td>
                  {/* Food */}
                  <td style={{ padding: "8px 5px 8px 8px", fontSize: "11px", lineHeight: 1.4, color: "#2f2a25", borderBottom: bb, borderRight: `1px solid ${tk.cellBorder}`, verticalAlign: "top" }}>
                    {row.food}
                  </td>
                  {/* Portion */}
                  <td style={{ padding: "8px 5px 8px 8px", fontSize: "11px", lineHeight: 1.4, color: "#2f2a25", borderBottom: bb, borderRight: `1px solid ${tk.cellBorder}`, verticalAlign: "top" }}>
                    {row.portion}
                  </td>
                  {/* Notes */}
                  <td style={{ padding: "8px 5px 8px 8px", fontSize: "11px", lineHeight: 1.4, color: "#2f2a25", borderBottom: bb, borderRight: "none", verticalAlign: "top" }}>
                    {row.notes}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} style={{ padding: "16px", textAlign: "center", color: "#6f665c", fontSize: "11px" }}>
                Add feeding rows in the form to see them here.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ── Medication / supplement notes ──────────────── */}
      {data.medicationNotes.trim() && (
        <div style={{ margin: "14px 20px", padding: "9px 12px", border: `1px solid ${tk.notesBorder}`, borderLeft: `4px solid ${tk.notesAccent}`, borderRadius: "4px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, fontFamily: "Arial, Helvetica, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", color: tk.notesAccent, marginBottom: "4px" }}>
            Medications &amp; Supplements
          </div>
          <div style={{ fontSize: "11px", color: "#2f2a25", lineHeight: 1.5 }}>
            {data.medicationNotes}
          </div>
        </div>
      )}

      {/* ── Care notes ─────────────────────────────────── */}
      {data.careNotes.trim() && (
        <div style={{ margin: "14px 20px", padding: "9px 12px", border: `1px solid ${tk.notesBorder}`, borderLeft: `4px solid ${tk.notesAccent}`, borderRadius: "4px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, fontFamily: "Arial, Helvetica, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", color: tk.notesAccent, marginBottom: "4px" }}>
            Care Notes
          </div>
          <div style={{ fontSize: "11px", color: "#2f2a25", lineHeight: 1.5 }}>
            {data.careNotes}
          </div>
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────── */}
      <div style={{ padding: "8px 20px 10px", borderTop: `1px solid ${tk.cellBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "9px", fontFamily: "Arial, Helvetica, sans-serif", color: "#9a9590", letterSpacing: "0.02em" }}>
        <span>printreadytools.com</span>
        <span>Free printable — no sign-up required</span>
      </div>
    </div>
  );

  if (forPrint) return <div style={outerStyle}>{chart}</div>;

  return (
    <div style={outerStyle}>
      <PreviewScaler pdfWidth={PDF_W}>{chart}</PreviewScaler>
    </div>
  );
}

function PreviewScaler({ pdfWidth, children }: { pdfWidth: number; children: React.ReactNode }) {
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
      <div style={{ position: "absolute", top: 0, left: 0, width: `${pdfWidth}px`, transformOrigin: "top left", transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
