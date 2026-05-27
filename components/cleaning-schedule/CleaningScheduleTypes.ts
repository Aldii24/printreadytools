// ── Shared types for Cleaning Schedule ─────────────────────

export type CleaningTheme = "minimal" | "soft-family" | "home-warm";

export const FREQ_OPTIONS = ["Daily", "Weekly", "Monthly", "As needed"] as const;
export type FrequencyOption = (typeof FREQ_OPTIONS)[number];

export interface CleaningTask {
  room:       string; // Room or area
  task:       string; // What to do
  frequency:  FrequencyOption | string;
  assignedTo: string;
  notes:      string;
}

export interface CleaningScheduleData {
  title:           string;
  homeName:        string; // optional home/family name
  weekOf:          string; // "YYYY-MM-DD" or ""
  tasks:           CleaningTask[];
  additionalNotes: string;
  theme:           CleaningTheme;
}

export function emptyTask(): CleaningTask {
  return { room: "", task: "", frequency: "Weekly", assignedTo: "", notes: "" };
}

export const DEFAULT_CLEANING_DATA: CleaningScheduleData = {
  title:    "Cleaning Schedule",
  homeName: "",
  weekOf:   "",
  tasks: [
    { room: "Kitchen",     task: "Wipe counters",         frequency: "Daily",   assignedTo: "", notes: "" },
    { room: "Bathroom",    task: "Clean sink and mirror",  frequency: "Weekly",  assignedTo: "", notes: "" },
    { room: "Living Room", task: "Vacuum floor",           frequency: "Weekly",  assignedTo: "", notes: "" },
    { room: "Bedroom",     task: "Change sheets",          frequency: "Weekly",  assignedTo: "", notes: "" },
  ],
  additionalNotes: "",
  theme: "soft-family",
};

export interface CleaningThemeTokens {
  accentColor:     string;
  headBg:          string;
  headText:        string;
  headBorder:      string;
  cellBorder:      string;
  pageBorder:      string;
  titleRuleBorder: string;
  notesBorder:     string;
  notesAccent:     string;
  freqBg:          string; // light tint for frequency cell
  freqText:        string;
}

export const CLEANING_THEME_TOKENS: Record<CleaningTheme, CleaningThemeTokens> = {
  minimal: {
    accentColor:     "#2F2A25",
    headBg:          "#F5F3F0",
    headText:        "#2F2A25",
    headBorder:      "#C8C4BE",
    cellBorder:      "#D8D4CE",
    pageBorder:      "#C8C4BE",
    titleRuleBorder: "#C8C4BE",
    notesBorder:     "#C8C4BE",
    notesAccent:     "#2F2A25",
    freqBg:          "#F5F3F0",
    freqText:        "#6F665C",
  },
  "soft-family": {
    accentColor:     "#6F8F72",
    headBg:          "#EDF4EE",
    headText:        "#2F2A25",
    headBorder:      "#B8D4BA",
    cellBorder:      "#C8DEC9",
    pageBorder:      "#B8D4BA",
    titleRuleBorder: "#6F8F72",
    notesBorder:     "#6F8F72",
    notesAccent:     "#6F8F72",
    freqBg:          "#F0F8F1",
    freqText:        "#4A6B4D",
  },
  "home-warm": {
    accentColor:     "#C9825B",
    headBg:          "#FDF2EC",
    headText:        "#2F2A25",
    headBorder:      "#E8C4A8",
    cellBorder:      "#EDD4C0",
    pageBorder:      "#E8C4A8",
    titleRuleBorder: "#C9825B",
    notesBorder:     "#C9825B",
    notesAccent:     "#C9825B",
    freqBg:          "#FEF7F3",
    freqText:        "#A05C38",
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
