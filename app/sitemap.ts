import type { MetadataRoute } from "next";

// Force dynamic evaluation so NEXT_PUBLIC_SITE_URL is read at
// request time rather than being baked in at build time.
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "") ||
    "https://printreadytools.vercel.app";

  // lastModified is computed here (inside the function) for the same reason.
  const builtAt = new Date();

  return [
    // ── Homepage ──────────────────────────────────────────
    {
      url: `${baseUrl}/`,
      lastModified: builtAt,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ── Printable generators ──────────────────────────────
    {
      url: `${baseUrl}/chore-chart-generator`,
      lastModified: builtAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/weekly-meal-planner`,
      lastModified: builtAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/medication-tracker-printable`,
      lastModified: builtAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cleaning-schedule-generator`,
      lastModified: builtAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pet-feeding-schedule-printable`,
      lastModified: builtAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // ── SEO content pages ─────────────────────────────────
    {
      url: `${baseUrl}/chore-chart-for-kids`,
      lastModified: builtAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/weekly-meal-planner-for-families`,
      lastModified: builtAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/medication-tracker-for-caregivers`,
      lastModified: builtAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ── Support / legal pages ─────────────────────────────
    {
      url: `${baseUrl}/about`,
      lastModified: builtAt,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: builtAt,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: builtAt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: builtAt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
