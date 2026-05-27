import type { MetadataRoute } from "next";

// Force dynamic evaluation so NEXT_PUBLIC_SITE_URL is read at
// request time rather than being baked in at build time.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "") ||
    "https://printreadytools.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
