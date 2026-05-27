// ── Shared types for Meal Planner ────────────────────────────

export type MealPlannerTheme = "minimal" | "soft-family" | "kitchen-warm";

export const MEAL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type MealDay = (typeof MEAL_DAYS)[number];

export type MealSlot = "breakfast" | "lunch" | "dinner" | "snacks";

export const MEAL_SLOTS: { key: MealSlot; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch",     label: "Lunch"     },
  { key: "dinner",    label: "Dinner"    },
  { key: "snacks",    label: "Snacks"    },
];

/** One day's four meal fields */
export type DayMeals = Record<MealSlot, string>;

/** Full planner data — one entry per day */
export type WeekMeals = Record<MealDay, DayMeals>;

export interface MealPlannerData {
  title:       string;
  familyName:  string;
  weekOf:      string; // "YYYY-MM-DD" or ""
  meals:       WeekMeals;
  groceryNotes: string;
  theme:       MealPlannerTheme;
}

/** Build the default empty meals object */
export function emptyWeekMeals(): WeekMeals {
  const result = {} as WeekMeals;
  for (const day of MEAL_DAYS) {
    result[day] = { breakfast: "", lunch: "", dinner: "", snacks: "" };
  }
  return result;
}

export const DEFAULT_MEAL_PLANNER_DATA: MealPlannerData = {
  title:        "Weekly Meal Planner",
  familyName:   "",
  weekOf:       "",
  meals:        emptyWeekMeals(),
  groceryNotes: "",
  theme:        "soft-family",
};

/** Per-theme colour tokens — same approach as chore chart */
export interface MealThemeTokens {
  accentColor:     string;
  headBg:          string;
  headText:        string;
  headBorder:      string;
  slotLabelBg:     string;
  slotLabelText:   string;
  cellBorder:      string;
  pageBorder:      string;
  titleRuleBorder: string;
  notesBorder:     string;
  notesAccent:     string;
}

export const MEAL_THEME_TOKENS: Record<MealPlannerTheme, MealThemeTokens> = {
  minimal: {
    accentColor:     "#2F2A25",
    headBg:          "#F5F3F0",
    headText:        "#2F2A25",
    headBorder:      "#C8C4BE",
    slotLabelBg:     "#FAF9F7",
    slotLabelText:   "#6F665C",
    cellBorder:      "#D8D4CE",
    pageBorder:      "#C8C4BE",
    titleRuleBorder: "#C8C4BE",
    notesBorder:     "#C8C4BE",
    notesAccent:     "#2F2A25",
  },
  "soft-family": {
    accentColor:     "#6F8F72",
    headBg:          "#EDF4EE",
    headText:        "#2F2A25",
    headBorder:      "#B8D4BA",
    slotLabelBg:     "#F6FAF6",
    slotLabelText:   "#4A6B4D",
    cellBorder:      "#C8DEC9",
    pageBorder:      "#B8D4BA",
    titleRuleBorder: "#6F8F72",
    notesBorder:     "#6F8F72",
    notesAccent:     "#6F8F72",
  },
  "kitchen-warm": {
    accentColor:     "#C9825B",
    headBg:          "#FDF2EC",
    headText:        "#2F2A25",
    headBorder:      "#E8C4A8",
    slotLabelBg:     "#FEF7F3",
    slotLabelText:   "#A05C38",
    cellBorder:      "#EDD4C0",
    pageBorder:      "#E8C4A8",
    titleRuleBorder: "#C9825B",
    notesBorder:     "#C9825B",
    notesAccent:     "#C9825B",
  },
};

/** Format a YYYY-MM-DD string to "January 12, 2026" or return fallback */
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

/** Escape user input for safe insertion into an HTML string */
export function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
