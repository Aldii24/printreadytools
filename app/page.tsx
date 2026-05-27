import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import ToolCard from "@/components/ToolCard";

/* ── Inline SVG icons (Lucide-inspired line style) ───────── */
function IconChecklist() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 7l1.5 1.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="7" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="14" x2="11" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <line x1="3" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="7" y1="2" x2="7" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="13" y1="2" x2="13" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconPill() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="10" height="14" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <line x1="5" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconBroom() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <line x1="10" y1="3" x2="10" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 13 Q10 17 15 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}
function IconPaw() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="11" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="5" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="15" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7" cy="4" r="1.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="13" cy="4" r="1.2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="8" fill="#6F8F72" />
      <path d="M5 9l3 3 5-5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Tool list ───────────────────────────────────────────── */
const liveTools = [
  {
    title: "Chore Chart Generator",
    description: "Create a custom weekly chore chart for kids or the whole family.",
    href: "/chore-chart-generator",
    icon: <IconChecklist />,
    tag: "Kids & Chores",
  },
  {
    title: "Weekly Meal Planner",
    description: "Plan breakfast, lunch, dinner, snacks, and grocery notes for the week.",
    href: "/weekly-meal-planner",
    icon: <IconCalendar />,
    tag: "Meal Planning",
  },
];

const comingTools = [
  {
    title: "Medication Tracker",
    description: "Track daily medications, doses, and times for any family member or caregiver.",
    icon: <IconPill />,
    tag: "Health",
  },
  {
    title: "Cleaning Schedule",
    description: "Create a daily, weekly, or monthly cleaning schedule tailored to your home.",
    icon: <IconBroom />,
    tag: "Family & Home",
  },
  {
    title: "Pet Feeding Schedule",
    description: "Make a simple feeding and care log for dogs, cats, or any pet in the household.",
    icon: <IconPaw />,
    tag: "Pets",
  },
];

const benefits = [
  "No sign-up required",
  "Fully customizable",
  "US Letter PDF format",
  "Mobile friendly",
  "Free to use",
  "Designed for home, school & family life",
];

const categories = [
  { label: "Family & Home", href: "/printables/family-home" },
  { label: "Kids & Chores",  href: "/printables/kids-chores" },
  { label: "Meal Planning",  href: "/printables/meal-planning" },
  { label: "Health & Meds",  href: "/printables/health" },
  { label: "Pets",           href: "/printables/pets" },
  { label: "School",         href: "/printables/school" },
];

const steps = [
  {
    step: "1",
    heading: "Fill out a simple form",
    body: "Enter names, tasks, days, or whatever the tool needs. Everything is optional.",
  },
  {
    step: "2",
    heading: "Preview your printable",
    body: "See exactly how your chart or planner will look before you download.",
  },
  {
    step: "3",
    heading: "Download your PDF",
    body: "Get a clean US Letter PDF ready to print at home or at a print shop.",
  },
];

/* ── Page ────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Header />

      <main id="main-content" style={{ flex: 1 }}>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "4rem 1rem" }}>
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Copy */}
              <div style={{ maxWidth: "36rem" }}>
                <p
                  style={{
                    color: "#6F8F72",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  Free printable generators
                </p>
                <h1
                  style={{
                    fontFamily: "var(--font-lora), Georgia, serif",
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    color: "#2F2A25",
                    lineHeight: 1.2,
                    marginBottom: "1rem",
                  }}
                >
                  Printable tools for busy families
                </h1>
                <p
                  style={{
                    color: "#6F665C",
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                  }}
                >
                  Create chore charts, meal planners, cleaning schedules, pet care logs, and more —
                  customized and ready to download as PDFs. No sign-up needed.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/#tools" className="btn-primary">
                    Browse Printable Tools
                  </Link>
                  <Link href="/chore-chart-generator" className="btn-secondary">
                    Make a Chore Chart
                  </Link>
                </div>
              </div>

              {/* Printable preview stack — decorative, hidden on mobile */}
              <div
                className="hidden lg:flex items-center justify-center"
                aria-hidden="true"
              >
                <PrintablePreviewStack />
              </div>
            </div>
          </div>
        </section>

        {/* ── Ad slot — below hero ──────────────────────────── */}
        <div
          className="mx-auto max-w-6xl px-4"
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          <AdSlot size="responsive" />
        </div>

        {/* ── Popular Tools ─────────────────────────────────── */}
        <section id="tools" style={{ backgroundColor: "#FAF7F2", padding: "3.5rem 1rem" }}>
          <div className="mx-auto max-w-6xl">
            <h2
              className="text-center"
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                color: "#2F2A25",
                marginBottom: "0.5rem",
              }}
            >
              Popular printable tools
            </h2>
            <p
              className="text-center"
              style={{ color: "#6F665C", fontSize: "1rem", marginBottom: "2.5rem" }}
            >
              Pick a tool, fill in a few fields, download your PDF.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Live tools */}
              {liveTools.map((tool) => (
                <ToolCard key={tool.href} {...tool} />
              ))}
              {/* Coming-soon placeholders */}
              {comingTools.map((tool) => (
                <ComingSoonCard key={tool.title} {...tool} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Use PrintReadyTools ───────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3.5rem 1rem" }}>
          <div className="mx-auto max-w-6xl">
            <h2
              className="text-center"
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                color: "#2F2A25",
                marginBottom: "0.5rem",
              }}
            >
              Why families use PrintReadyTools
            </h2>
            <p
              className="text-center"
              style={{ color: "#6F665C", fontSize: "1rem", marginBottom: "2.5rem" }}
            >
              Simple, fast, and made for real households.
            </p>
            <ul
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {benefits.map((benefit) => (
                <li key={benefit} className="why-item">
                  <IconCheck />
                  <span
                    style={{
                      color: "#2F2A25",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Categories ────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "3.5rem 1rem" }}>
          <div className="mx-auto max-w-6xl">
            <h2
              className="text-center"
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                color: "#2F2A25",
                marginBottom: "0.5rem",
              }}
            >
              Browse by category
            </h2>
            <p
              className="text-center"
              style={{ color: "#6F665C", fontSize: "1rem", marginBottom: "2.5rem" }}
            >
              Find the right printable for every part of family life.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <Link key={cat.href} href={cat.href} className="category-pill">
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3.5rem 1rem" }}>
          <div className="mx-auto max-w-4xl text-center">
            <h2
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                color: "#2F2A25",
                marginBottom: "0.5rem",
              }}
            >
              Ready in under a minute
            </h2>
            <p
              style={{ color: "#6F665C", fontSize: "1rem", marginBottom: "3rem" }}
            >
              No accounts. No complicated setup. Just a clean printable PDF.
            </p>
            <ol
              className="grid gap-6 sm:grid-cols-3"
              style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem" }}
            >
              {steps.map((item) => (
                <li key={item.step} className="how-step">
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "9999px",
                      backgroundColor: "#6F8F72",
                      color: "#FFFFFF",
                      fontFamily: "var(--font-lora), serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      marginBottom: "1rem",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {item.step}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-lora), Georgia, serif",
                      color: "#2F2A25",
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.heading}
                  </h3>
                  <p style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>

            <Link href="/#tools" className="btn-primary">
              See all printable tools
            </Link>
          </div>
        </section>

        {/* ── Ad slot — bottom ─────────────────────────────── */}
        <div
          className="mx-auto max-w-6xl px-4"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          <AdSlot size="responsive" />
        </div>

      </main>

      <Footer />
    </>
  );
}

/* ── Coming-soon card ────────────────────────────────────── */
interface ComingSoonCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
}

function ComingSoonCard({ title, description, icon, tag }: ComingSoonCardProps) {
  return (
    <article
      aria-label={`${title} — coming soon`}
      style={{
        backgroundColor: "#FDFCFA",
        border: "1px dashed #D8D2CA",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        opacity: 0.82,
      }}
    >
      {/* Icon */}
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg shrink-0"
        style={{ backgroundColor: "#F0ECE6", color: "#A8A29A" }}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Tag */}
      {tag && (
        <span
          className="mb-2 inline-block rounded px-2 py-0.5"
          style={{
            backgroundColor: "#F0ECE6",
            color: "#A8A29A",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          {tag}
        </span>
      )}

      {/* Title */}
      <h3
        className="mb-1 leading-snug"
        style={{
          fontFamily: "var(--font-lora), Georgia, serif",
          color: "#6F665C",
          fontSize: "1rem",
          fontWeight: 600,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="mb-4 flex-1 leading-relaxed"
        style={{ color: "#A8A29A", fontSize: "0.875rem" }}
      >
        {description}
      </p>

      {/* Coming-soon badge */}
      <span
        className="mt-auto self-start inline-flex items-center gap-1.5 rounded-md px-3 py-1.5"
        style={{
          backgroundColor: "#F0ECE6",
          color: "#A8A29A",
          fontSize: "0.8125rem",
          fontWeight: 500,
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          border: "1px solid #D8D2CA",
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6 3.5v2.75l1.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Coming soon
      </span>
    </article>
  );
}

/* ── Decorative printable preview stack ──────────────────── */
function PrintablePreviewStack() {
  return (
    <div
      style={{ position: "relative", width: "280px", height: "300px" }}
      aria-label="Preview of printable templates"
    >
      {/* Back card */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "1rem",
          width: "176px",
          height: "240px",
          transform: "rotate(3deg)",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E6DED3",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(47,42,37,0.08)",
          padding: "1rem",
        }}
      >
        <div style={{ height: "10px", width: "112px", borderRadius: "4px", backgroundColor: "#E6DED3", marginBottom: "12px" }} />
        {[80, 60, 75, 55, 70, 45].map((w, i) => (
          <div key={i} style={{ height: "6px", width: `${w}%`, borderRadius: "3px", backgroundColor: "#F3EEE7", marginBottom: "8px" }} />
        ))}
      </div>

      {/* Middle card */}
      <div
        style={{
          position: "absolute",
          left: "1rem",
          top: "2rem",
          width: "176px",
          height: "240px",
          transform: "rotate(-1deg)",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E6DED3",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(47,42,37,0.08)",
          padding: "1rem",
        }}
      >
        <div style={{ height: "10px", width: "96px", borderRadius: "4px", backgroundColor: "#E6DED3", marginBottom: "12px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "12px" }}>
          {["S","M","T","W","T","F","S"].map((d, i) => (
            <div key={i} style={{ height: "22px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", backgroundColor: "#F3EEE7", color: "#6F665C", fontSize: "8px", fontWeight: 500 }}>{d}</div>
          ))}
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#F3EEE7", flexShrink: 0 }} />
            <div style={{ flex: 1, height: "6px", borderRadius: "3px", backgroundColor: "#F3EEE7" }} />
          </div>
        ))}
      </div>

      {/* Front card */}
      <div
        style={{
          position: "absolute",
          left: "2rem",
          top: "0.5rem",
          width: "176px",
          height: "240px",
          transform: "rotate(1deg)",
          backgroundColor: "#FFFFFF",
          border: "1.5px solid #6F8F72",
          borderRadius: "10px",
          boxShadow: "0 4px 18px rgba(47,42,37,0.13)",
          overflow: "hidden",
        }}
      >
        {/* Card header */}
        <div style={{ backgroundColor: "#6F8F72", padding: "0.75rem 1rem" }}>
          <div style={{ height: "8px", width: "80px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.55)" }} />
        </div>
        <div style={{ padding: "1rem" }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: i < 3 ? "#6F8F72" : "#F3EEE7", flexShrink: 0 }} />
              <div style={{ height: "6px", borderRadius: "3px", backgroundColor: "#F3EEE7", width: `${[90,70,80,60,75,65,50][i]}%` }} />
            </div>
          ))}
          <div style={{ marginTop: "1rem", borderRadius: "6px", padding: "0.4rem 0.75rem", backgroundColor: "#6F8F72", color: "#FFFFFF", fontSize: "9px", fontWeight: 600, textAlign: "center", letterSpacing: "0.04em" }}>
            Download PDF
          </div>
        </div>
      </div>
    </div>
  );
}
