import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import ToolCard from "@/components/ToolCard";
import MedicationTrackerGenerator from "@/components/medication-tracker/MedicationTrackerGenerator";

export const metadata: Metadata = {
  title: "Free Medication Tracker Printable — Weekly PDF | PrintReadyTools",
  description:
    "Track daily medications, doses, and times for any family member or caregiver. Download a clean weekly medication log in US Letter PDF. No sign-up needed.",
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
function IconBroom() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <line x1="10" y1="3" x2="10" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 13 Q10 17 15 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
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
    title: "Weekly Meal Planner",
    description: "Plan breakfast, lunch, dinner, snacks, and grocery notes for the week.",
    href: "/weekly-meal-planner",
    icon: <IconCalendar />,
    tag: "Meal Planning",
  },
  {
    title: "Cleaning Schedule",
    description: "Build a daily, weekly, or monthly cleaning plan for your home.",
    href: "/cleaning-schedule-generator",
    icon: <IconBroom />,
    tag: "Family & Home",
  },
];

const faqItems = [
  {
    question: "Who is this medication tracker for?",
    answer:
      "It's designed for caregivers, parents, and individuals who need to track multiple medications across the week. It works well for elderly parents, children with complex schedules, or anyone managing chronic conditions.",
  },
  {
    question: "How many medications can I add?",
    answer:
      "You can add up to 10 medications. Each one has its own row with a name, dosage, time, and optional notes field, plus a checkbox for each day of the week.",
  },
  {
    question: "Can I print this in black and white?",
    answer:
      "Yes. The Minimal theme is designed specifically for black-and-white printing and uses very little ink. The Soft Family and Caregiver Clean themes also print clearly in B&W, though they look best in color.",
  },
  {
    question: "Do I need to sign up or pay?",
    answer:
      "No. The tracker is completely free and requires no account. Fill in the form, preview the chart, and download your PDF in under a minute.",
  },
  {
    question: "What paper size does this print on?",
    answer:
      "US Letter (8.5 × 11 inches), the standard size for home and office printers in the United States.",
  },
  {
    question: "Is this a substitute for medical advice?",
    answer:
      "No. This is a printable organization tool only. Always follow the instructions of a licensed healthcare provider when managing medications.",
  },
];

export default function MedicationTrackerPage() {
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
                <li aria-current="page" style={{ color: "#2F2A25" }}>Medication Tracker</li>
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
              Free Medication Tracker Printable
            </h1>
            <p
              style={{
                color: "#6F665C",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                maxWidth: "52rem",
              }}
            >
              Keep track of medications, doses, and schedules for any family member or
              caregiver. Add up to 10 medications, choose a theme, and download a weekly
              log as a printable PDF. No account needed.
            </p>

            {/* Medical disclaimer */}
            <p
              style={{
                marginTop: "0.875rem",
                fontSize: "0.8rem",
                color: "#6F665C",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                lineHeight: 1.5,
                maxWidth: "48rem",
              }}
            >
              <strong style={{ color: "#2F2A25" }}>Note:</strong> This is an organization tool
              only. Always follow the guidance of a licensed healthcare provider for medication
              management.
            </p>
          </div>
        </section>

        {/* ── Generator ───────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "0 1rem 2rem" }}>
          <div className="mx-auto max-w-6xl">
            <MedicationTrackerGenerator />
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
              Tips for using a medication tracker
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  tip: "Check it off right away",
                  detail: "Mark each dose as soon as you take it. Don't rely on memory, especially when managing multiple medications.",
                },
                {
                  tip: "Include the time of day",
                  detail: "Writing \"8 AM\" in the time column helps you spot missed doses at a glance and keeps schedules consistent.",
                },
                {
                  tip: "Note special instructions",
                  detail: "Use the notes column for reminders like \"take with food\", \"avoid grapefruit\", or \"refrigerate\".",
                },
                {
                  tip: "Print a fresh copy each week",
                  detail: "A clean weekly sheet is easier to read than a crumpled month-old one. Keep a stack in a visible spot.",
                },
                {
                  tip: "Share with caregivers",
                  detail: "If multiple people care for the same person, a printed tracker ensures everyone is working from the same information.",
                },
                {
                  tip: "Bring it to appointments",
                  detail: "A completed tracker gives your doctor or pharmacist a clear picture of the past week's medication adherence.",
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
