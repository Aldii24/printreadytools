import type { ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ProseLayoutProps {
  /** Page title shown as the H1 */
  title: string;
  /** Optional short subtitle shown below the H1 */
  subtitle?: string;
  /** Last-updated date string, e.g. "May 2026" */
  lastUpdated?: string;
  children: ReactNode;
}

/**
 * Shared layout for plain prose pages: About, Contact,
 * Privacy Policy, Terms. Provides consistent header, footer,
 * warm background, readable max-width column, and
 * heading/paragraph spacing via CSS classes.
 */
export default function ProseLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: ProseLayoutProps) {
  return (
    <>
      <Header />
      <main id="main-content" style={{ flex: 1 }}>
        {/* ── Page hero ─────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "2.5rem 1rem 2rem" }}>
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "1rem" }}>
              <ol
                className="flex items-center gap-1.5"
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "0.8125rem",
                  color: "#6F665C",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                }}
              >
                <li>
                  <Link
                    href="/"
                    style={{ color: "#6F665C", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" style={{ color: "#E6DED3" }}>/</li>
                <li aria-current="page" style={{ color: "#2F2A25" }}>
                  {title}
                </li>
              </ol>
            </nav>

            <h1
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                color: "#2F2A25",
                lineHeight: 1.2,
                marginBottom: subtitle ? "0.5rem" : 0,
              }}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                style={{
                  color: "#6F665C",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  maxWidth: "42rem",
                }}
              >
                {subtitle}
              </p>
            )}

            {lastUpdated && (
              <p
                style={{
                  color: "#6F665C",
                  fontSize: "0.8rem",
                  marginTop: "0.75rem",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                }}
              >
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
        </section>

        {/* ── Prose content ─────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "2rem 1rem 4rem" }}>
          <div className="mx-auto max-w-3xl prose-page">
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
