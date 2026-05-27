import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://printreadytools.com";

// Build date used as lastModified for all static pages.
// Generators are client-side tools so their content doesn't change server-side.
const BUILT_AT = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Homepage ──────────────────────────────────────────
    {
      url: `${BASE_URL}/`,
      lastModified: BUILT_AT,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ── Printable generators ──────────────────────────────
    {
      url: `${BASE_URL}/chore-chart-generator`,
      lastModified: BUILT_AT,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/weekly-meal-planner`,
      lastModified: BUILT_AT,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/medication-tracker-printable`,
      lastModified: BUILT_AT,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cleaning-schedule-generator`,
      lastModified: BUILT_AT,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pet-feeding-schedule-printable`,
      lastModified: BUILT_AT,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // ── Support / legal pages ─────────────────────────────
    {
      url: `${BASE_URL}/about`,
      lastModified: BUILT_AT,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: BUILT_AT,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: BUILT_AT,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: BUILT_AT,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
