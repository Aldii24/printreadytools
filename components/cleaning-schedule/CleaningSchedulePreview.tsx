"use client";

import { useRef, useEffect, useState } from "react";
import type { CleaningScheduleData } from "./CleaningScheduleTypes";
import {
  CLEANING_THEME_TOKENS,
  formatWeekOf,
} from "./CleaningScheduleTypes";

const PDF_W = 816; // 8.5in @ 96 dpi

interface Props {
  data: CleaningScheduleData;
  forPrint?: boolean;
}

export default function CleaningSchedulePreview({ data, forPrint = false }: Props) {
  const tk = CLEANING_THEME_TOKENS[data.theme];
  const weekOfDisplay = formatWeekOf(data.weekOf);
  const visibleTasks = data.tasks.filter((t) => t.room.trim() !== "" || t.task.trim() !== "");

  // Column widths: Room 18%, Task 22%, Freq 12%, Assigned 15%, Notes remaining ~33%
  const roomColPct     = 18;
  const taskColPct     = 22;
  const freqColPct     = 12;
  const assignedColPct = 15;
  const notesColPct    = 100 - roomColPct - taskColPct - freqColPct - assignedColPct;

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
            {data.title || "Cleaning Schedule"}
          </div>
          {data.homeName.trim() && (
            <div style={{ fontSize: "12px", color: "#6f665c", marginTop: "3px", fontStyle: "italic" }}>
              {data.homeName}
            </div>
          )}
          <div style={{ fontSize: "11px", color: "#6f665c", marginTop: "8px" }}>
            Week of: <span style={{ color: "#2f2a25" }}>{weekOfDisplay}</span>
          </div>
        </div>
      </div>

      {/* ── Tasks table ──────────────────────────────── */}
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: `${roomColPct}%` }} />
          <col style={{ width: `${taskColPct}%` }} />
          <col style={{ width: `${freqColPct}%` }} />
          <col style={{ width: `${assignedColPct}%` }} />
          <col style={{ width: `${notesColPct}%` }} />
        </colgroup>

        <thead>
          <tr style={{ backgroundColor: tk.headBg }}>
            {[
              { label: "Room" },
              { label: "Task" },
              { label: "Frequency" },
              { label: "Assigned To" },
              { label: "Notes", isLast: true },
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
          {visibleTasks.length > 0 ? (
            visibleTasks.map((task, ri) => {
              const isLast = ri === visibleTasks.length - 1;
              const bb = isLast ? "none" : `1px solid ${tk.cellBorder}`;
              return (
                <tr key={ri}>
                  {/* Room */}
                  <td
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
                    {task.room}
                  </td>
                  {/* Task */}
                  <td
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
                    {task.task}
                  </td>
                  {/* Frequency — tinted */}
                  <td
                    style={{
                      padding: "8px 5px 8px 8px",
                      fontSize: "11px",
                      lineHeight: 1.4,
                      color: tk.freqText,
                      backgroundColor: tk.freqBg,
                      fontStyle: "italic",
                      borderBottom: bb,
                      borderRight: `1px solid ${tk.cellBorder}`,
                      verticalAlign: "top",
                    }}
                  >
                    {task.frequency}
                  </td>
                  {/* Assigned To */}
                  <td
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
                    {task.assignedTo}
                  </td>
                  {/* Notes */}
                  <td
                    style={{
                      padding: "8px 5px 8px 8px",
                      fontSize: "11px",
                      lineHeight: 1.4,
                      color: "#2f2a25",
                      borderBottom: bb,
                      borderRight: "none",
                      verticalAlign: "top",
                    }}
                  >
                    {task.notes}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={5}
                style={{
                  padding: "16px",
                  textAlign: "center",
                  color: "#6f665c",
                  fontSize: "11px",
                }}
              >
                Add cleaning tasks in the form to see them here.
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
