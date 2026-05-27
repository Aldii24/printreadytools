"use client";

import { useState } from "react";
import Link from "next/link";

const desktopLinks = [
  { label: "All Tools",    href: "/#tools" },
  { label: "Chore Chart",  href: "/chore-chart-generator" },
  { label: "Meal Planner", href: "/weekly-meal-planner" },
  { label: "About",        href: "/about" },
];

const mobileLinks = [
  { label: "All Tools",         href: "/#tools" },
  { label: "Chore Chart Generator", href: "/chore-chart-generator" },
  { label: "Weekly Meal Planner",   href: "/weekly-meal-planner" },
  { label: "About",             href: "/about" },
  { label: "Contact",           href: "/contact" },
  { label: "Privacy Policy",    href: "/privacy" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E6DED3",
      }}
    >
      {/* ── Main bar ─────────────────────────────────────── */}
      <div
        className="mx-auto flex max-w-6xl items-center justify-between px-4"
        style={{ minHeight: "64px" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ textDecoration: "none" }}
          aria-label="PrintReadyTools home"
          onClick={() => setOpen(false)}
        >
          <span aria-hidden="true" className="shrink-0" style={{ color: "#6F8F72" }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
              <path d="M16 2 L20 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M16 2 L16 6 L20 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="8" y1="15" x2="16" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="8" y1="19" x2="13" y2="19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <span
            style={{
              fontFamily: "var(--font-lora), Georgia, serif",
              color: "#2F2A25",
              fontSize: "1.1rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            PrintReadyTools
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-0.5">
          {desktopLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="flex md:hidden items-center justify-center rounded-md p-2"
          style={{
            color: "#6F665C",
            background: "none",
            border: "none",
            cursor: "pointer",
            /* Generous tap target */
            minWidth: "44px",
            minHeight: "44px",
          }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            /* × close icon */
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="18" y1="4" x2="4"  y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            /* hamburger icon */
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line x1="3" y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile nav drawer ────────────────────────────── */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          style={{
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #F3EEE7",
            padding: "0.5rem 0 1rem",
          }}
        >
          <ul
            style={{ listStyle: "none", margin: 0, padding: 0 }}
            role="list"
          >
            {mobileLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.75rem 1.25rem",
                    fontSize: "1rem",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    color: "#2F2A25",
                    textDecoration: "none",
                    /* Comfortable 44px+ touch target via padding */
                    minHeight: "44px",
                    lineHeight: "1.4",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Quick-action button in mobile menu */}
          <div style={{ padding: "0.5rem 1.25rem 0" }}>
            <Link
              href="/chore-chart-generator"
              onClick={() => setOpen(false)}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Make a Chore Chart
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
