"use client";

import type { ChartData, Theme } from "./ChoreChartGenerator";

/* ── Theme tokens — mirrors handlePrint tokens exactly ───── */
interface PreviewTokens {
  accentColor:     string;
  headBg:          string;
  headText:        string;
  headBorder:      string;
  cellBorder:      string;
  cbBorder:        string;
  cbRadius:        string;
  rewardBorder:    string;
  rewardAccent:    string;
  pageBorder:      string;
  titleRuleBorder: string;
}

const tokens: Record<Theme, PreviewTokens> = {
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

interface ChoreChartPreviewProps {
  data: ChartData;
  forPrint?: boolean;
}

export default function ChoreChartPreview({
  data,
  forPrint = false,
}: ChoreChartPreviewProps) {
  const tk = tokens[data.theme];
  const visibleChores = data.chores.filter((c) => c.trim() !== "");
  const days = data.days;

  /* ── Week-of display string ──────────────────────────── */
  const weekOfDisplay = (() => {
    const raw = data.weekOf.trim();
    if (!raw) return null;
    const [y, m, d] = raw.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  })();

  /* ── Scale factor for the screen preview ────────────────
     The preview container is ~420 px wide.
     The PDF page content is 816 px wide (8.5 in @ 96 dpi).
     We use a CSS scale transform to shrink the full-size
     layout into the preview box so every detail matches. */
  const PDF_W = 816; // px equivalent of 8.5in @ 96dpi

  const outerStyle: React.CSSProperties = forPrint
    ? {
        width: `${PDF_W}px`,
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "13px",
        color: "#2f2a25",
        backgroundColor: "#fff",
      }
    : {
        /* Fill the preview container absolutely so the
           scaled inner div cannot escape its bounds */
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      };

  /* The inner div is always rendered at full PDF width and
     then CSS-scaled to fit the container. */
  /* Chorecolumn: 32%, day columns: equal share of remaining 68% */
  const choreColPct = 32;
  const dayColPct   = days.length > 0
    ? parseFloat(((100 - choreColPct) / days.length).toFixed(2))
    : 0;

  const chart = (
    <div
      style={{
        border: `1px solid ${tk.pageBorder}`,
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      {/* ── Title block ────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: "16px",
          padding: "18px 22px 16px",
          borderBottom: `2px solid ${tk.titleRuleBorder}`,
        }}
      >
        {/* Accent bar */}
        <div
          aria-hidden="true"
          style={{
            width: "4px",
            borderRadius: "2px",
            backgroundColor: tk.accentColor,
            flexShrink: 0,
            minHeight: "40px",
          }}
        />
        {/* Text */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "22px",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#2f2a25",
              letterSpacing: "-0.01em",
            }}
          >
            {data.title || "Weekly Chore Chart"}
          </div>
          {data.childName.trim() && (
            <div
              style={{
                fontSize: "13px",
                color: "#6f665c",
                marginTop: "4px",
                fontStyle: "italic",
              }}
            >
              {data.childName}
            </div>
          )}
          <div
            style={{
              fontSize: "12px",
              color: "#6f665c",
              marginTop: "10px",
            }}
          >
            Week of:{" "}
            <span style={{ color: "#2f2a25" }}>
              {weekOfDisplay ?? "__________"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────── */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <colgroup>
          <col style={{ width: `${choreColPct}%` }} />
          {days.map((d) => (
            <col key={d} style={{ width: `${dayColPct}%` }} />
          ))}
        </colgroup>
        <thead>
          <tr style={{ backgroundColor: tk.headBg }}>
            <th
              style={{
                textAlign: "left",
                paddingLeft: "22px",
                paddingTop: "9px",
                paddingBottom: "8px",
                fontSize: "11px",
                fontWeight: 600,
                fontFamily: "Arial, Helvetica, sans-serif",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: tk.headText,
                borderBottom: `2px solid ${tk.headBorder}`,
                borderRight: `1px solid ${tk.headBorder}`,
              }}
            >
              Chore
            </th>
            {days.map((day, i) => (
              <th
                key={day}
                style={{
                  textAlign: "center",
                  padding: "9px 6px 8px",
                  fontSize: "11px",
                  fontWeight: 600,
                  fontFamily: "Arial, Helvetica, sans-serif",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: tk.headText,
                  borderBottom: `2px solid ${tk.headBorder}`,
                  borderRight: i < days.length - 1 ? `1px solid ${tk.headBorder}` : "none",
                }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleChores.length > 0 ? (
            visibleChores.map((chore, ri) => (
              <tr key={ri}>
                <td
                  style={{
                    padding: "11px 10px 11px 22px",
                    fontSize: "13px",
                    lineHeight: 1.4,
                    color: "#2f2a25",
                    borderBottom:
                      ri < visibleChores.length - 1
                        ? `1px solid ${tk.cellBorder}`
                        : "none",
                    borderRight: `1px solid ${tk.cellBorder}`,
                    verticalAlign: "middle",
                  }}
                >
                  {chore}
                </td>
                {days.map((day, ci) => (
                  <td
                    key={day}
                    style={{
                      textAlign: "center",
                      padding: "11px 4px",
                      borderBottom:
                        ri < visibleChores.length - 1
                          ? `1px solid ${tk.cellBorder}`
                          : "none",
                      borderRight:
                        ci < days.length - 1
                          ? `1px solid ${tk.cellBorder}`
                          : "none",
                      verticalAlign: "middle",
                    }}
                    aria-label={`${chore} — ${day}`}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: `1.5px solid ${tk.cbBorder}`,
                        borderRadius: tk.cbRadius,
                        margin: "0 auto",
                        backgroundColor: "#fff",
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={days.length + 1}
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#6f665c",
                  fontSize: "12px",
                }}
              >
                Add chores in the form to see them here.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ── Reward block ───────────────────────────────── */}
      {data.reward.trim() && (
        <div
          style={{
            margin: "16px 22px",
            padding: "10px 14px",
            border: `1px solid ${tk.rewardBorder}`,
            borderLeft: `4px solid ${tk.rewardAccent}`,
            borderRadius: "4px",
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              fontFamily: "Arial, Helvetica, sans-serif",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: tk.rewardAccent,
              whiteSpace: "nowrap",
            }}
          >
            ★ Reward
          </span>
          <span style={{ fontSize: "13px", color: "#2f2a25" }}>
            {data.reward}
          </span>
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────── */}
      <div
        style={{
          padding: "10px 22px 12px",
          borderTop: `1px solid ${tk.cellBorder}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "10px",
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

  /* Screen preview: render full-width chart inside a scaling wrapper */
  return (
    <div style={outerStyle}>
      <PreviewScaler pdfWidth={PDF_W}>{chart}</PreviewScaler>
    </div>
  );
}

/* ── Scaling helper ──────────────────────────────────────── */
/* Measures the container, computes a CSS scale factor, and
   applies it so the full-size chart shrinks to fit. */
import { useRef, useEffect, useState } from "react";

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
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
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
