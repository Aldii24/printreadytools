"use client";

import { useRef, useEffect, useState } from "react";
import type { MedTrackerData } from "./MedicationTrackerTypes";
import {
  MED_DAYS,
  MED_THEME_TOKENS,
  formatWeekOf,
} from "./MedicationTrackerTypes";

const PDF_W = 816; // 8.5in @ 96 dpi

interface Props {
  data: MedTrackerData;
  forPrint?: boolean;
}

export default function MedicationTrackerPreview({ data, forPrint = false }: Props) {
  const tk = MED_THEME_TOKENS[data.theme];
  const weekOfDisplay = formatWeekOf(data.weekOf);
  const visibleMeds = data.medications.filter((m) => m.name.trim() !== "");

  // Column layout: meta columns (name/dosage/time/notes) + 7 day checkboxes
  // Meta: 38% total, Days: 62% / 7
  const metaWidths = { name: "16%", dosage: "9%", time: "8%", notes: "14%" }; // ~47% adjusted below
  // Actually use fixed layout so use col %:
  const nameColPct    = 17;
  const dosageColPct  = 9;
  const timeColPct    = 8;
  const notesColPct   = 11;
  const dayColPct     = parseFloat(((100 - nameColPct - dosageColPct - timeColPct - notesColPct) / MED_DAYS.length).toFixed(2));

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
            {data.title || "Medication Tracker"}
          </div>
          {data.personName.trim() && (
            <div style={{ fontSize: "12px", color: "#6f665c", marginTop: "3px", fontStyle: "italic" }}>
              {data.personName}
            </div>
          )}
          <div style={{ fontSize: "11px", color: "#6f665c", marginTop: "8px" }}>
            Week of: <span style={{ color: "#2f2a25" }}>{weekOfDisplay}</span>
          </div>
        </div>
      </div>

      {/* ── Medication table ─────────────────────────── */}
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: `${nameColPct}%` }} />
          <col style={{ width: `${dosageColPct}%` }} />
          <col style={{ width: `${timeColPct}%` }} />
          <col style={{ width: `${notesColPct}%` }} />
          {MED_DAYS.map((d) => <col key={d} style={{ width: `${dayColPct}%` }} />)}
        </colgroup>

        <thead>
          <tr style={{ backgroundColor: tk.headBg }}>
            {[
              { label: "Medication", w: metaWidths.name },
              { label: "Dosage",     w: metaWidths.dosage },
              { label: "Time",       w: metaWidths.time },
              { label: "Notes",      w: metaWidths.notes },
            ].map((col, i) => (
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
                  borderRight: `1px solid ${tk.headBorder}`,
                }}
              >
                {col.label}
              </th>
            ))}
            {MED_DAYS.map((day, i) => (
              <th
                key={day}
                style={{
                  textAlign: "center",
                  padding: "7px 2px 6px",
                  fontSize: "9px",
                  fontWeight: 600,
                  fontFamily: "Arial, Helvetica, sans-serif",
                  letterSpacing: "0.02em",
                  color: tk.headText,
                  borderBottom: `2px solid ${tk.headBorder}`,
                  borderRight: i < MED_DAYS.length - 1 ? `1px solid ${tk.headBorder}` : "none",
                }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {visibleMeds.length > 0 ? (
            visibleMeds.map((med, ri) => {
              const isLast = ri === visibleMeds.length - 1;
              const bb = isLast ? "none" : `1px solid ${tk.cellBorder}`;
              return (
                <tr key={ri}>
                  {[med.name, med.dosage, med.time, med.notes].map((val, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: "8px 5px 8px 8px",
                        fontSize: "11px",
                        lineHeight: 1.4,
                        color: "#2f2a25",
                        borderBottom: bb,
                        borderRight: `1px solid ${tk.cellBorder}`,
                        verticalAlign: "top",
                      }}
                    >
                      {val}
                    </td>
                  ))}
                  {MED_DAYS.map((day, ci) => (
                    <td
                      key={day}
                      style={{
                        textAlign: "center",
                        padding: "8px 2px",
                        borderBottom: bb,
                        borderRight: ci < MED_DAYS.length - 1 ? `1px solid ${tk.cellBorder}` : "none",
                        verticalAlign: "middle",
                      }}
                      aria-label={`${med.name} — ${day}`}
                    >
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          border: `1.5px solid ${tk.cbBorder}`,
                          borderRadius: tk.cbRadius,
                          margin: "0 auto",
                          backgroundColor: "#fff",
                        }}
                      />
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={4 + MED_DAYS.length}
                style={{
                  padding: "16px",
                  textAlign: "center",
                  color: "#6f665c",
                  fontSize: "11px",
                }}
              >
                Add medications in the form to see them here.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ── Additional notes ─────────────────────────── */}
      {data.additionalNotes.trim() && (
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
            Additional Notes
          </div>
          <div style={{ fontSize: "11px", color: "#2f2a25", lineHeight: 1.5 }}>
            {data.additionalNotes}
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
