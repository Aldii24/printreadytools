import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import ToolCard from "@/components/ToolCard";
import MealPlannerGenerator from "@/components/meal-planner/MealPlannerGenerator";

export const metadata: Metadata = {
  title: "Free Weekly Meal Planner — Printable PDF | PrintReadyTools",
  description:
    "Plan your family's meals for the week and download a clean printable PDF. Includes breakfast, lunch, dinner, and snacks for every day. No sign-up needed.",
};

/* ── Related tool icons ──────────────────────────────────── */
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
function IconBroom() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <line x1="10" y1="3" x2="10" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 13 Q10 17 15 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
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

const relatedTools = [
  {
    title: "Chore Chart Generator",
    description: "Build a weekly chore chart for kids or the whole family.",
    href: "/chore-chart-generator",
    icon: <IconChecklist />,
    tag: "Kids & Chores",
  },
  {
    title: "Cleaning Schedule",
    description: "Create a room-by-room cleaning schedule for your home.",
    href: "/cleaning-schedule-generator",
    icon: <IconBroom />,
    tag: "Family & Home",
  },
  {
    title: "Medication Tracker",
    description: "Track daily medications, doses, and times for any family member or caregiver.",
    href: "/medication-tracker-printable",
    icon: <IconPill />,
    tag: "Health",
  },
];

const faqItems = [
  {
    question: "What does this meal planner include?",
    answer:
      "The planner has a row for every meal type — Breakfast, Lunch, Dinner, and Snacks — for each day of the week, Monday through Sunday. There's also an optional grocery notes section at the bottom.",
  },
  {
    question: "Can I print this as a PDF?",
    answer:
      "Yes. Click the Download button to open your browser's print dialog. Choose 'Save as PDF' to save a clean file, or print directly to paper. The layout is designed for US Letter (8.5 × 11 inches) and works well in both color and black-and-white.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. The planner is completely free and requires no sign-up. Fill in the form, preview the result, and download your PDF in under a minute.",
  },
  {
    question: "Can I plan meals for just part of the week?",
    answer:
      "Yes — just leave the days you don't need blank. The planner will still include all seven days in the layout, so you can write in any remaining meals by hand after printing.",
  },
  {
    question: "What are the theme options?",
    answer:
      "Minimal uses clean black text and works great for printing on any printer. Soft Family uses sage green column headers with a warm feel. Kitchen Warm uses terracotta accents for a cozy kitchen-inspired look.",
  },
  {
    question: "Can I use this every week?",
    answer:
      "Absolutely. Come back each week, update the meals and the 'Week of' date, and download a fresh copy. You can also leave the date blank and fill it in by hand.",
  },
];

export default function WeeklyMealPlannerPage() {
  return (
    <>
      <Header />

      <main id="main-content" style={{ flex: 1 }}>

        {/* ── Tool hero ────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "2.5rem 1rem 2rem" }}>
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" style={{ marginBottom: "1rem" }}>
              <ol
                className="flex items-center gap-1.5 text-sm"
                style={{ listStyle: "none", padding: 0, margin: 0, color: "#6F665C" }}
              >
                <li>
                  <Link href="/" style={{ color: "#6F665C", textDecoration: "none" }}>Home</Link>
                </li>
                <li aria-hidden="true" style={{ color: "#E6DED3" }}>/</li>
                <li>
                  <Link href="/printables" style={{ color: "#6F665C", textDecoration: "none" }}>Printables</Link>
                </li>
                <li aria-hidden="true" style={{ color: "#E6DED3" }}>/</li>
                <li aria-current="page" style={{ color: "#2F2A25" }}>Weekly Meal Planner</li>
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
              Free Weekly Meal Planner
            </h1>
            <p
              style={{
                color: "#6F665C",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                maxWidth: "52rem",
              }}
            >
              Plan breakfast, lunch, dinner, and snacks for the whole week. Add your grocery
              notes, choose a style, and download a clean printable PDF — no account needed.
            </p>
          </div>
        </section>

        {/* ── Generator ───────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "0 1rem 2rem" }}>
          <div className="mx-auto max-w-6xl">
            <MealPlannerGenerator />
          </div>
        </section>

        {/* ── Ad slot ─────────────────────────────────────── */}
        <div
          className="mx-auto max-w-6xl px-4"
          style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
        >
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
              Tips for easy meal planning
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  tip: "Plan dinners first",
                  detail: "Dinner usually takes the most thought. Lock those in first, then fill in the easier meals around them.",
                },
                {
                  tip: "Use leftovers intentionally",
                  detail: "If Monday is roast chicken, plan Tuesday's lunch as chicken wraps. It saves time and cuts waste.",
                },
                {
                  tip: "Keep breakfast simple",
                  detail: "Rotate 3–4 easy options for weekday breakfasts so there's nothing to decide in the morning.",
                },
                {
                  tip: "Write the grocery list while planning",
                  detail: "Use the grocery notes field to jot down items you'll need as you fill in the meals.",
                },
              ].map((item) => (
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
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((tool) => (
                <ToolCard key={tool.href} {...tool} />
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
