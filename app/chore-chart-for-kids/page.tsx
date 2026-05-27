import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Chore Chart for Kids: Free Printable Ideas by Age",
  description:
    "Find age-appropriate chore chart ideas for kids and create a free personalized printable chore chart for your family.",
  alternates: {
    canonical: "/chore-chart-for-kids",
  },
  openGraph: {
    title: "Chore Chart for Kids: Free Printable Ideas by Age",
    description:
      "Age-appropriate chore ideas for kids 3–16, plus tips for making chore charts actually work. Create a free printable PDF in under a minute.",
    url: "/chore-chart-for-kids",
    type: "article",
  },
};

/* ── Shared section heading style ────────────────────────── */
const sectionH2: React.CSSProperties = {
  fontFamily: "var(--font-lora), Georgia, serif",
  fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
  color: "#2F2A25",
  lineHeight: 1.25,
  marginBottom: "0.625rem",
};

const sectionSubtitle: React.CSSProperties = {
  color: "#6F665C",
  fontSize: "1rem",
  lineHeight: 1.6,
  marginBottom: "2rem",
};

/* ── Age group data ──────────────────────────────────────── */
const ageGroups = [
  {
    label: "Ages 3–5",
    intro:
      "Toddlers and preschoolers can handle simple, concrete tasks. Keep the list to 2–3 items and use pictures alongside words if possible.",
    chores: [
      "Put toys in the toy box",
      "Put dirty clothes in the hamper",
      "Help set the table (napkins, spoons)",
      "Feed the pet with supervision",
      "Wipe up small spills",
      "Put books back on the shelf",
    ],
    note: "Focus on building the habit, not perfection. Praise the effort.",
  },
  {
    label: "Ages 6–8",
    intro:
      "Early school-age kids can follow multi-step routines and take on more responsibility. 3–5 chores is a good range.",
    chores: [
      "Make the bed (doesn't need to be perfect)",
      "Clear and wipe the dinner table",
      "Unload the dishwasher (lower rack)",
      "Take out small trash cans",
      "Water indoor plants",
      "Fold and put away their own laundry",
      "Sweep the kitchen floor",
    ],
    note: "Let them choose the order they do their chores — it builds ownership.",
  },
  {
    label: "Ages 9–12",
    intro:
      "Tweens can handle real household tasks with minimal supervision. They're ready for weekly deep-clean jobs.",
    chores: [
      "Vacuum living room and bedrooms",
      "Load and run the dishwasher",
      "Clean the bathroom sink and mirror",
      "Mop the kitchen floor",
      "Take out all trash and recycling",
      "Help with grocery unpacking",
      "Prepare simple meals or snacks",
      "Rake leaves or shovel snow",
    ],
    note: "Tie chores to privileges rather than allowance for better long-term results.",
  },
  {
    label: "Teens",
    intro:
      "Teenagers can take on adult-level household tasks. The goal is preparing them for independent living.",
    chores: [
      "Do their own laundry start to finish",
      "Cook one family dinner per week",
      "Deep-clean the bathroom",
      "Mow the lawn or maintain the yard",
      "Grocery shop from a list",
      "Wash the car",
      "Manage their own schedule and deadlines",
      "Help with younger siblings' routines",
    ],
    note: "Give teens autonomy over when they complete tasks, not just what they do.",
  },
];

/* ── Tips data ───────────────────────────────────────────── */
const tips = [
  {
    heading: "Start with 3 chores, not 10",
    body: "A short list that gets done consistently beats a long list that gets ignored. Add more chores gradually once the habit is established.",
  },
  {
    heading: "Make it visual",
    body: "A printed chart on the fridge is far more effective than a verbal reminder. Kids can see what's expected and check things off themselves.",
  },
  {
    heading: "Be specific about the standard",
    body: "\"Clean your room\" means different things to different people. \"Put all toys in the bin and dirty clothes in the hamper\" is clear and checkable.",
  },
  {
    heading: "Do it together at first",
    body: "For new chores, work alongside your child for the first week. Show them exactly what done looks like before expecting them to do it alone.",
  },
  {
    heading: "Tie rewards to the chart",
    body: "Whether it's screen time, a small allowance, or a family activity — a visible reward on the chart gives kids something concrete to work toward.",
  },
  {
    heading: "Reset weekly with a fresh chart",
    body: "Printing a new chart each week keeps things clean and gives kids a fresh start. It also lets you adjust chores as routines change.",
  },
];

/* ── Mistakes data ───────────────────────────────────────── */
const mistakes = [
  {
    heading: "Assigning age-inappropriate tasks",
    body: "Asking a 4-year-old to vacuum or a 14-year-old to only put toys away sets everyone up for frustration. Match the task to the child's actual ability.",
  },
  {
    heading: "Redoing the chore in front of them",
    body: "If you immediately redo what your child just did, they learn their effort doesn't matter. Accept \"good enough\" and coach improvement over time.",
  },
  {
    heading: "Using chores as punishment",
    body: "\"Go clean your room because you misbehaved\" teaches kids that chores are a negative consequence, not a normal part of family life.",
  },
  {
    heading: "Inconsistent follow-through",
    body: "Chore charts only work if they're used consistently. Skipping weeks or forgetting to check in sends the message that the chart doesn't really matter.",
  },
  {
    heading: "Too many chores at once",
    body: "Overwhelming kids with a long list leads to avoidance. Start small, build success, then add more responsibilities gradually.",
  },
  {
    heading: "No acknowledgment when chores are done",
    body: "Kids need to know their contribution is noticed. A simple \"thank you for doing that\" goes a long way toward keeping the habit going.",
  },
];

/* ── FAQ data ────────────────────────────────────────────── */
const faqItems = [
  {
    question: "What age should kids start doing chores?",
    answer:
      "Children as young as 2–3 can start with very simple tasks like putting toys away or handing you items. By age 4–5, most kids are ready for a basic chore chart with 2–3 regular responsibilities.",
  },
  {
    question: "How many chores should a child have?",
    answer:
      "A good starting point is 1 chore per year of age, up to about 5–6 chores for school-age kids. Teens can handle more. The key is consistency — a short list done reliably is better than a long list that gets ignored.",
  },
  {
    question: "Should I pay kids for doing chores?",
    answer:
      "This is a personal family decision. Many parents separate basic household chores (expected as part of family life) from extra tasks that earn allowance. Either approach can work — the important thing is being consistent about the system you choose.",
  },
  {
    question: "What if my child refuses to do their chores?",
    answer:
      "Stay calm and consistent. Make sure the chores are age-appropriate and clearly explained. Connect chores to something they care about — screen time, outings, or allowance. Avoid power struggles; instead, give choices within the structure (\"Do you want to do the dishes before or after dinner?\").",
  },
  {
    question: "How do I make a chore chart?",
    answer:
      "The easiest way is to use the free Chore Chart Generator on this site. Choose your child's name, add the chores, select the days, and download a printable PDF in under a minute. No sign-up required.",
  },
  {
    question: "How often should I update the chore chart?",
    answer:
      "Print a fresh chart each week so kids can check off completed chores. Review and update the chore list every month or two as your child grows and their abilities change.",
  },
];

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
    description: "Create a custom weekly chore chart for kids or the whole family. Download a printable PDF in under a minute.",
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
    title: "Cleaning Schedule Generator",
    description: "Build a room-by-room cleaning schedule for your home with tasks, frequency, and assignments.",
    href: "/cleaning-schedule-generator",
    icon: <IconBroom />,
    tag: "Family & Home",
  },
];

/* ── Page ────────────────────────────────────────────────── */
export default function ChoreChartForKidsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Header />

      <main id="main-content" style={{ flex: 1 }}>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "2.5rem 1rem 2rem" }}>
          <div className="mx-auto max-w-3xl">
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
                  <Link href="/" style={{ color: "#6F665C", textDecoration: "none" }}>Home</Link>
                </li>
                <li aria-hidden="true" style={{ color: "#E6DED3" }}>/</li>
                <li aria-current="page" style={{ color: "#2F2A25" }}>Chore Chart for Kids</li>
              </ol>
            </nav>

            <h1
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.875rem, 4vw, 2.5rem)",
                color: "#2F2A25",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              Chore Chart for Kids: Free Printable Ideas by Age
            </h1>
            <p
              style={{
                color: "#6F665C",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                maxWidth: "42rem",
                marginBottom: "0",
              }}
            >
              Getting kids to help around the house is easier when the expectations are clear,
              age-appropriate, and written down. This guide covers what chores work at each age,
              how to make a chart that actually gets used, and common mistakes to avoid.
            </p>
          </div>
        </section>

        {/* ── CTA card ─────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "0 1rem 2.5rem" }}>
          <div className="mx-auto max-w-3xl">
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1.5px solid #6F8F72",
                borderRadius: "0.875rem",
                padding: "1.5rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-lora), Georgia, serif",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "#2F2A25",
                    marginBottom: "0.375rem",
                  }}
                >
                  Ready to make your chore chart?
                </p>
                <p style={{ color: "#6F665C", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>
                  Use the free Chore Chart Generator to build a personalized printable PDF for
                  your child or family. Choose the chores, days, and a reward — then download
                  in under a minute. No sign-up required.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/chore-chart-generator" className="btn-primary">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    style={{ flexShrink: 0 }}
                  >
                    <rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M10 1 L12 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M10 1 L10 3 L12 3" stroke="currentColor" strokeWidth="1.3" fill="none" />
                    <line x1="5" y1="7" x2="9" y2="7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <line x1="5" y1="9.5" x2="9" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Create a Free Chore Chart
                </Link>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "0.8125rem",
                    color: "#6F665C",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                >
                  Free · No sign-up · US Letter PDF
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Chore ideas by age ────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-6xl">
            <h2 style={sectionH2}>Age-appropriate chore ideas</h2>
            <p style={sectionSubtitle}>
              The right chores depend on your child&apos;s age, maturity, and what they&apos;ve
              been taught. Use these lists as a starting point — every child is different.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {ageGroups.map((group) => (
                <div
                  key={group.label}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E6DED3",
                    borderRadius: "0.875rem",
                    padding: "1.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-lora), Georgia, serif",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      color: "#2F2A25",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {group.label}
                  </h3>
                  <p
                    style={{
                      color: "#6F665C",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      marginBottom: "1rem",
                    }}
                  >
                    {group.intro}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 1rem",
                    }}
                  >
                    {group.chores.map((chore) => (
                      <li
                        key={chore}
                        className="flex items-start gap-2"
                        style={{ marginBottom: "0.375rem" }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            color: "#6F8F72",
                            fontSize: "0.65rem",
                            marginTop: "0.35rem",
                            flexShrink: 0,
                          }}
                        >
                          ●
                        </span>
                        <span style={{ color: "#2F2A25", fontSize: "0.875rem", lineHeight: 1.5 }}>
                          {chore}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "#6F8F72",
                      fontStyle: "italic",
                      lineHeight: 1.5,
                      margin: 0,
                      paddingTop: "0.75rem",
                      borderTop: "1px solid #F3EEE7",
                    }}
                  >
                    {group.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Mid-page CTA */}
            <div
              className="text-center"
              style={{ marginTop: "2.5rem" }}
            >
              <Link href="/chore-chart-generator" className="btn-primary">
                Build a printable chore chart →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Tips ─────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={sectionH2}>Tips for making chore charts work</h2>
            <p style={sectionSubtitle}>
              A chore chart is only as good as the system around it. These habits make the
              difference between a chart that sticks and one that ends up in a drawer.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {tips.map((item) => (
                <div
                  key={item.heading}
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
                      fontSize: "0.9375rem",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {item.heading}
                  </p>
                  <p style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Common mistakes ───────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={sectionH2}>Common mistakes parents make with chore charts</h2>
            <p style={sectionSubtitle}>
              Even well-intentioned chore systems can backfire. Here are the patterns that
              most often derail a chore chart — and how to avoid them.
            </p>
            <div className="flex flex-col gap-4">
              {mistakes.map((item) => (
                <div
                  key={item.heading}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E6DED3",
                    borderLeft: "4px solid #C9825B",
                    borderRadius: "0.75rem",
                    padding: "1.125rem 1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-lora), Georgia, serif",
                      color: "#2F2A25",
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {item.heading}
                  </p>
                  <p style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={sectionH2}>Frequently asked questions</h2>
            <p style={{ ...sectionSubtitle, marginBottom: "1.75rem" }}>
              Common questions from parents about chore charts and kids&apos; responsibilities.
            </p>
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
                      fontSize: "0.9375rem",
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

        {/* ── Bottom CTA ───────────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                color: "#2F2A25",
                marginBottom: "0.75rem",
              }}
            >
              Make your chore chart in under a minute
            </h2>
            <p
              style={{
                color: "#6F665C",
                fontSize: "1rem",
                lineHeight: 1.65,
                maxWidth: "36rem",
                margin: "0 auto 1.5rem",
              }}
            >
              The free Chore Chart Generator lets you add your child&apos;s name, pick the
              chores, choose the days, and download a clean printable PDF. No account needed.
            </p>
            <Link href="/chore-chart-generator" className="btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 1.75rem" }}>
              Create a Free Chore Chart
            </Link>
            <p
              style={{
                marginTop: "0.75rem",
                fontSize: "0.8125rem",
                color: "#6F665C",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
              }}
            >
              Free · Printable US Letter PDF · No sign-up required
            </p>
          </div>
        </section>

        {/* ── Related tools ────────────────────────────────── */}
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
              More free printables for everyday family life.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((tool) => (
                <ToolCard key={tool.href} {...tool} />
              ))}
            </div>
          </div>
        </section>

        <JsonLd data={faqSchema} />

      </main>

      <Footer />
    </>
  );
}
