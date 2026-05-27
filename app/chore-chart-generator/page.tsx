import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import ToolCard from "@/components/ToolCard";
import ChoreChartGenerator from "@/components/chore-chart/ChoreChartGenerator";

export const metadata: Metadata = {
  title: "Free Chore Chart Generator — Printable PDF | PrintReadyTools",
  description:
    "Create a custom chore chart for kids, teens, or the whole family. Choose chores, days, and rewards, then download a printable US Letter PDF. No sign-up needed.",
};

/* ── Related tool icons ──────────────────────────────────── */
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
    title: "Cleaning Schedule",
    description: "Build a weekly or monthly cleaning plan for any room in your home.",
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
  {
    title: "Weekly Meal Planner",
    description: "Plan seven days of meals with a printable weekly planner.",
    href: "/weekly-meal-planner",
    icon: <IconCalendar />,
    tag: "Meal Planning",
  },
];

const faqItems = [
  {
    question: "What age is this chore chart best for?",
    answer:
      "The generator works for any age. For young kids (4–6) keep the chore list short and use simple task names. For older kids and teens, you can add more chores and use the reward field to set expectations. There's a preset for each age group below the generator.",
  },
  {
    question: "Can I print this chore chart?",
    answer:
      "Yes — that's the whole point. Click the Download PDF button to print a clean US Letter page (8.5 × 11 inches). The chart is designed to use minimal ink and look great in both color and black-and-white.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. PrintReadyTools is completely free with no sign-up required. Fill in the form, preview the chart, and download your PDF in under a minute.",
  },
  {
    question: "Can I use this for the whole family?",
    answer:
      "Absolutely. Use the chart title to name it \"Family Chore Chart\" and list chores for everyone. If you need separate charts for each child, just fill out the generator again for each one.",
  },
  {
    question: "What do the themes look like?",
    answer:
      "Minimal uses clean black text and thin borders — great for black-and-white printing. Soft Family uses sage green headers with soft beige accents. Kid Friendly uses warm yellow highlights with slightly playful styling, but still looks neat on paper.",
  },
  {
    question: "Can I change the days of the week?",
    answer:
      "Yes. Check or uncheck any day in the generator. You can show all seven days or just the school week (Mon–Fri), for example.",
  },
];

export default function ChoreChartGeneratorPage() {
  return (
    <>
      <Header />

      <main id="main-content" style={{ flex: 1 }}>

        {/* ── Tool hero ─────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "2.5rem 1rem 2rem" }}>
          <div className="mx-auto max-w-6xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "1rem" }}>
              <ol
                className="flex items-center gap-1.5 text-sm"
                style={{ listStyle: "none", padding: 0, margin: 0, color: "#6F665C" }}
              >
                <li>
                  <Link href="/" style={{ color: "#6F665C", textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" style={{ color: "#E6DED3" }}>/</li>
                <li>
                  <Link href="/printables" style={{ color: "#6F665C", textDecoration: "none" }}>
                    Printables
                  </Link>
                </li>
                <li aria-hidden="true" style={{ color: "#E6DED3" }}>/</li>
                <li aria-current="page" style={{ color: "#2F2A25" }}>
                  Chore Chart Generator
                </li>
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
              Free Chore Chart Generator
            </h1>
            <p
              style={{
                color: "#6F665C",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                maxWidth: "52rem",
              }}
            >
              Create a personalized chore chart for kids, teens, or the whole family. Choose the
              chores, days, rewards, and style, then download a printable PDF. No sign-up needed.
            </p>
          </div>
        </section>

        {/* ── Generator (Client Component) ─────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "0 1rem 2rem" }}>
          <div className="mx-auto max-w-6xl">
            <ChoreChartGenerator />
          </div>
        </section>

        {/* ── Ad slot — after generator ─────────────────────── */}
        <div
          className="mx-auto max-w-6xl px-4"
          style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
        >
          <AdSlot size="responsive" />
        </div>

        {/* ── Presets / age suggestions ─────────────────────── */}
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
              Age-based suggestions
            </h2>
            <p style={{ color: "#6F665C", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Not sure where to start? Here are chore ideas by age group.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "Ages 4–6",
                  chores: ["Put toys away", "Feed the pet", "Help set the table", "Put dirty clothes in the hamper"],
                },
                {
                  label: "Ages 7–9",
                  chores: ["Make the bed", "Clear the dinner table", "Take out trash", "Water plants"],
                },
                {
                  label: "Ages 10–12",
                  chores: ["Vacuum living room", "Load the dishwasher", "Fold laundry", "Wipe down counters"],
                },
                {
                  label: "Teens",
                  chores: ["Cook one meal a week", "Do own laundry", "Mow the lawn", "Deep-clean bathroom"],
                },
              ].map((group) => (
                <div
                  key={group.label}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E6DED3",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-lora), Georgia, serif",
                      color: "#2F2A25",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {group.label}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {group.chores.map((chore) => (
                      <li
                        key={chore}
                        className="flex items-start gap-2"
                        style={{ marginBottom: "0.4rem" }}
                      >
                        <span style={{ color: "#6F8F72", marginTop: "2px", fontSize: "0.7rem" }}>●</span>
                        <span style={{ color: "#6F665C", fontSize: "0.85rem", lineHeight: 1.5 }}>
                          {chore}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tips ─────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                color: "#2F2A25",
                marginBottom: "1.5rem",
              }}
            >
              Tips for making chore charts work
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  tip: "Keep the list short",
                  detail: "3–5 chores per child is plenty. A shorter list is easier to follow and less overwhelming.",
                },
                {
                  tip: "Post it somewhere visible",
                  detail: "The fridge, a bedroom door, or a family bulletin board all work well.",
                },
                {
                  tip: "Let kids check it off",
                  detail: "Printing a fresh chart each week gives kids the satisfaction of physically checking off chores.",
                },
                {
                  tip: "Make rewards specific",
                  detail: "\"Extra screen time on Saturday\" is clearer and more motivating than a vague reward.",
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

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
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

        {/* ── Related tools ─────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "3rem 1rem" }}>
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
              More free printables for home, school, and family routines.
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
