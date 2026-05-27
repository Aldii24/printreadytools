import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import ToolCard from "@/components/ToolCard";
import CleaningScheduleGenerator from "@/components/cleaning-schedule/CleaningScheduleGenerator";

export const metadata: Metadata = {
  title: "Free Cleaning Schedule Generator — Printable PDF | PrintReadyTools",
  description:
    "Create a custom cleaning schedule for your home. Add rooms, tasks, frequency, and assigned person, then download a printable US Letter PDF. No sign-up needed.",
};

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
function IconPill() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="10" height="14" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <line x1="5" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5" />
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

const relatedTools = [
  {
    title: "Chore Chart Generator",
    description: "Create a custom weekly chore chart for kids or the whole family.",
    href: "/chore-chart-generator",
    icon: <IconChecklist />,
    tag: "Kids & Chores",
  },
  {
    title: "Medication Tracker",
    description: "Track daily medications, doses, and times for any family member or caregiver.",
    href: "/medication-tracker-printable",
    icon: <IconPill />,
    tag: "Health",
  },
  {
    title: "Weekly Meal Planner",
    description: "Plan breakfast, lunch, dinner, snacks, and grocery notes for the week.",
    href: "/weekly-meal-planner",
    icon: <IconCalendar />,
    tag: "Meal Planning",
  },
];

const faqItems = [
  {
    question: "How do I decide what frequency to use?",
    answer:
      "Daily tasks are things that visibly need attention every day — like wiping kitchen counters. Weekly tasks are ones that can wait a few days but shouldn't go longer — like vacuuming. Monthly tasks are deeper jobs you can batch once a month, like cleaning the oven.",
  },
  {
    question: "Can I use this for a shared house or rental?",
    answer:
      "Yes. Use the 'Assigned to' column to divide tasks among housemates, and the 'Home name' field to label whose schedule it is.",
  },
  {
    question: "Can I print this in black and white?",
    answer:
      "Yes. The Minimal theme is designed for black-and-white printing. The other themes also print cleanly in B&W, though the color accents won't appear.",
  },
  {
    question: "How many tasks can I add?",
    answer:
      "Up to 15 tasks. For most homes, 6–10 tasks covers the essentials without making the chart feel crowded.",
  },
  {
    question: "Do I need to sign up?",
    answer: "No. PrintReadyTools is completely free with no account required.",
  },
  {
    question: "What paper size does this print on?",
    answer:
      "US Letter (8.5 × 11 inches), the standard size for home printers in the United States.",
  },
];

const tips = [
  {
    tip: "Start with a room list",
    detail:
      "Write down every room and area you want to keep clean before assigning tasks. It's easier to build your schedule from a complete list.",
  },
  {
    tip: "Separate daily from weekly",
    detail:
      "Daily tasks like wiping counters take two minutes. Weekly ones like vacuuming need time set aside. Mixing them up makes a schedule feel overwhelming.",
  },
  {
    tip: "Assign by ability, not just preference",
    detail:
      "Match tasks to who can realistically do them. Kids can handle simpler daily jobs; adults tackle deeper cleaning.",
  },
  {
    tip: "Post it somewhere visible",
    detail:
      "The fridge, a laundry room wall, or a shared family bulletin board. Out of sight usually means out of mind.",
  },
  {
    tip: "Print a fresh copy each month",
    detail:
      "Updating the schedule monthly lets you adjust for seasons, new routines, or changes in who lives at home.",
  },
  {
    tip: "Don't aim for perfect",
    detail:
      "A schedule that gets most things done most of the time is far better than a perfect plan that nobody follows.",
  },
];

export default function CleaningScheduleGeneratorPage() {
  return (
    <>
      <Header />

      <main id="main-content" style={{ flex: 1 }}>

        {/* ── Hero ────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "2.5rem 1rem 2rem" }}>
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" style={{ marginBottom: "1rem" }}>
              <ol
                className="flex items-center gap-1.5 text-sm"
                style={{ listStyle: "none", padding: 0, margin: 0, color: "#6F665C" }}
              >
                <li><Link href="/" style={{ color: "#6F665C", textDecoration: "none" }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: "#E6DED3" }}>/</li>
                <li aria-current="page" style={{ color: "#2F2A25" }}>Cleaning Schedule Generator</li>
              </ol>
            </nav>

            <h1
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#2F2A25",
                lineHeight: 1.2,
                marginBottom: "0.75rem",
              }}
            >
              Free Cleaning Schedule Generator
            </h1>
            <p
              style={{
                color: "#6F665C",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                maxWidth: "52rem",
              }}
            >
              Build a room-by-room cleaning schedule for your home. Add tasks, set the
              frequency, assign them to family members, and download a clean printable
              PDF — no account needed.
            </p>
          </div>
        </section>

        {/* ── Generator ───────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "0 1rem 2rem" }}>
          <div className="mx-auto max-w-6xl">
            <CleaningScheduleGenerator />
          </div>
        </section>

        {/* ── Ad slot ─────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-4" style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>
          <AdSlot size="responsive" />
        </div>

        {/* ── Tips ────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                color: "#2F2A25",
                marginBottom: "1.5rem",
              }}
            >
              Tips for keeping a cleaning schedule
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {tips.map((item) => (
                <div
                  key={item.tip}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E6DED3",
                    borderRadius: "0.75rem",
                    padding: "1.25rem 1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-lora), Georgia, serif",
                      color: "#2F2A25",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.tip}
                  </p>
                  <p style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                color: "#2F2A25",
                marginBottom: "2rem",
              }}
            >
              Frequently asked questions
            </h2>
            <dl className="flex flex-col gap-4">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E6DED3",
                    borderRadius: "0.75rem",
                    padding: "1.25rem 1.5rem",
                  }}
                >
                  <dt
                    style={{
                      fontFamily: "var(--font-lora), Georgia, serif",
                      color: "#2F2A25",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.question}
                  </dt>
                  <dd style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Related tools ───────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-6xl">
            <h2
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                color: "#2F2A25",
                marginBottom: "0.5rem",
              }}
            >
              Related printable tools
            </h2>
            <p style={{ color: "#6F665C", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              More free printables for everyday family life.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedTools.map((tool) => (
                <ToolCard key={tool.href} {...tool} />
              ))}
              {/* Pet Feeding Schedule — coming soon */}
              <article
                aria-label="Pet Feeding Schedule — coming soon"
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
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg shrink-0"
                  style={{ backgroundColor: "#F0ECE6", color: "#A8A29A" }}
                  aria-hidden="true"
                >
                  <IconPaw />
                </div>
                <span
                  className="mb-2 inline-block rounded px-2 py-0.5"
                  style={{ backgroundColor: "#F0ECE6", color: "#A8A29A", fontSize: "0.75rem", fontWeight: 500 }}
                >
                  Pets
                </span>
                <h3
                  className="mb-1 leading-snug"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#6F665C", fontSize: "1rem", fontWeight: 600 }}
                >
                  Pet Feeding Schedule
                </h3>
                <p
                  className="mb-4 flex-1 leading-relaxed"
                  style={{ color: "#A8A29A", fontSize: "0.875rem" }}
                >
                  Make a simple feeding and care log for dogs, cats, or any pet in the household.
                </p>
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
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M6 3.5v2.75l1.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Coming soon
                </span>
              </article>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
