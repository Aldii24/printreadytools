// ── Shared types for Medication Tracker ─────────────────────

export type MedTrackerTheme = "minimal" | "soft-family" | "caregiver-clean";

export const MED_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type MedDay = (typeof MED_DAYS)[number];

export interface MedicationRow {
  name:    string; // medication name
  dosage:  string; // e.g. "10mg"
  time:    string; // e.g. "8:00 AM"
  notes:   string; // e.g. "take with food"
}

export interface MedTrackerData {
  title:        string;
  personName:   string; // optional patient/family member
  weekOf:       string; // "YYYY-MM-DD" or ""
  medications:  MedicationRow[];
  additionalNotes: string;
  theme:        MedTrackerTheme;
}

export function emptyMedRow(): MedicationRow {
  return { name: "", dosage: "", time: "", notes: "" };
}

export const DEFAULT_MED_TRACKER_DATA: MedTrackerData = {
  title:       "Medication Tracker",
  personName:  "",
  weekOf:      "",
  medications: [
    emptyMedRow(),
    emptyMedRow(),
    emptyMedRow(),
  ],
  additionalNotes: "",
  theme:       "soft-family",
};

export interface MedThemeTokens {
  accentColor:     string;
  headBg:          string;
  headText:        string;
  headBorder:      string;
  cellBorder:      string;
  cbBorder:        string;
  cbRadius:        string;
  pageBorder:      string;
  titleRuleBorder: string;
  notesBorder:     string;
  notesAccent:     string;
  metaBg:          string;
  metaText:        string;
}

export const MED_THEME_TOKENS: Record<MedTrackerTheme, MedThemeTokens> = {
  minimal: {
    accentColor:     "#2F2A25",
    headBg:          "#F5F3F0",
    headText:        "#2F2A25",
    headBorder:      "#C8C4BE",
    cellBorder:      "#D8D4CE",
    cbBorder:        "#888580",
    cbRadius:        "2px",
    pageBorder:      "#C8C4BE",
    titleRuleBorder: "#C8C4BE",
    notesBorder:     "#C8C4BE",
    notesAccent:     "#2F2A25",
    metaBg:          "#FAF9F7",
    metaText:        "#6F665C",
  },
  "soft-family": {
    accentColor:     "#6F8F72",
    headBg:          "#EDF4EE",
    headText:        "#2F2A25",
    headBorder:      "#B8D4BA",
    cellBorder:      "#C8DEC9",
    cbBorder:        "#6F8F72",
    cbRadius:        "3px",
    pageBorder:      "#B8D4BA",
    titleRuleBorder: "#6F8F72",
    notesBorder:     "#6F8F72",
    notesAccent:     "#6F8F72",
    metaBg:          "#F6FAF6",
    metaText:        "#4A6B4D",
  },
  "caregiver-clean": {
    accentColor:     "#7E9CAF",
    headBg:          "#EEF4F8",
    headText:        "#2F2A25",
    headBorder:      "#B0CADA",
    cellBorder:      "#C4D8E4",
    cbBorder:        "#7E9CAF",
    cbRadius:        "3px",
    pageBorder:      "#B0CADA",
    titleRuleBorder: "#7E9CAF",
    notesBorder:     "#7E9CAF",
    notesAccent:     "#7E9CAF",
    metaBg:          "#F2F7FA",
    metaText:        "#4A6B7E",
  },
};

export function formatWeekOf(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "__________";
  const [y, m, d] = trimmed.split("-").map(Number);
  if (!y || !m || !d) return "__________";
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
