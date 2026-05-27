// ── Shared types for Pet Feeding Schedule ───────────────────

export type PetFeedingTheme = "minimal" | "soft-family" | "pet-friendly";

export const PET_TYPES = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"] as const;
export type PetType = (typeof PET_TYPES)[number];

export interface FeedingRow {
  time:    string; // e.g. "7:00 AM"
  food:    string; // e.g. "Dry kibble"
  portion: string; // e.g. "1 cup"
  notes:   string; // e.g. "Fresh water"
}

export interface PetFeedingData {
  title:            string;
  petName:          string;
  petType:          PetType | string;
  weekOf:           string; // "YYYY-MM-DD" or ""
  feedingRows:      FeedingRow[];
  medicationNotes:  string;
  careNotes:        string;
  theme:            PetFeedingTheme;
}

export function emptyFeedingRow(): FeedingRow {
  return { time: "", food: "", portion: "", notes: "" };
}

export const DEFAULT_PET_FEEDING_DATA: PetFeedingData = {
  title:   "Pet Feeding Schedule",
  petName: "",
  petType: "Dog",
  weekOf:  "",
  feedingRows: [
    { time: "Morning",   food: "Dry food",        portion: "1 cup",        notes: "Fresh water" },
    { time: "Afternoon", food: "Treat or snack",  portion: "Small amount", notes: "" },
    { time: "Evening",   food: "Wet food",         portion: "1 serving",   notes: "" },
  ],
  medicationNotes: "",
  careNotes:       "",
  theme: "soft-family",
};

export interface PetThemeTokens {
  accentColor:     string;
  headBg:          string;
  headText:        string;
  headBorder:      string;
  cellBorder:      string;
  pageBorder:      string;
  titleRuleBorder: string;
  notesBorder:     string;
  notesAccent:     string;
  timeBg:          string; // light tint for the time column
  timeText:        string;
}

export const PET_THEME_TOKENS: Record<PetFeedingTheme, PetThemeTokens> = {
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
    timeBg:          "#F5F3F0",
    timeText:        "#6F665C",
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
    timeBg:          "#F0F8F1",
    timeText:        "#4A6B4D",
  },
  "pet-friendly": {
    accentColor:     "#D9A6A1",   // soft blush
    headBg:          "#FDF1F0",
    headText:        "#2F2A25",
    headBorder:      "#E8C4C0",
    cellBorder:      "#EDD0CC",
    pageBorder:      "#E8C4C0",
    titleRuleBorder: "#D9A6A1",
    notesBorder:     "#D9A6A1",
    notesAccent:     "#C9825B",   // terracotta accent for labels
    timeBg:          "#FEF5F4",
    timeText:        "#A05050",
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
