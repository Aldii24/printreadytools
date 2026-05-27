import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Weekly Meal Planner for Families | Free Printable Guide",
  description:
    "Plan breakfast, lunch, dinner, snacks, and grocery notes with a free weekly meal planner printable for busy families.",
  alternates: { canonical: "/weekly-meal-planner-for-families" },
  openGraph: {
    title: "Weekly Meal Planner for Families | Free Printable Guide",
    description:
      "A practical guide to weekly meal planning for busy families, plus a free printable meal planner PDF.",
    url: "/weekly-meal-planner-for-families",
    type: "article",
  },
};

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-lora), Georgia, serif",
  fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
  color: "#2F2A25",
  lineHeight: 1.25,
  marginBottom: "0.625rem",
};

const subtitleStyle: React.CSSProperties = {
  color: "#6F665C",
  fontSize: "1rem",
  lineHeight: 1.65,
  marginBottom: "2rem",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E6DED3",
  borderRadius: "0.875rem",
  padding: "1.375rem 1.5rem",
};

const faqItems = [
  {
    question: "How do I start meal planning if I've never done it before?",
    answer:
      "Start small. Plan just dinners for the week — that's the hardest meal to decide on the spot. Once that feels easy, add lunches. Use a printed planner so you can see the whole week at a glance and adjust as needed.",
  },
  {
    question: "How much time does weekly meal planning actually save?",
    answer:
      "Most families save 30–60 minutes per day once they have a plan. You eliminate the daily \"what's for dinner?\" decision, reduce last-minute grocery runs, and waste less food because you're buying what you'll actually use.",
  },
  {
    question: "What should I do when the plan falls apart mid-week?",
    answer:
      "Keep one backup meal in your plan — something quick like pasta, eggs, or a frozen option. When life happens, swap to the backup without guilt and shift the missed meal to the following week.",
  },
  {
    question: "How do I get my family to actually eat what I plan?",
    answer:
      "Involve them in the planning. Ask each person to suggest one dinner for the week. Kids especially are more likely to eat a meal they helped choose. Keep a running list of family favorites to pull from.",
  },
  {
    question: "Is a printable meal planner better than an app?",
    answer:
      "For many families, yes. A printed planner on the fridge is visible to everyone, requires no login, and can be written on by anyone in the household. It also removes the friction of opening an app every time you need to check the plan.",
  },
  {
    question: "How do I use the free meal planner on this site?",
    answer:
      "Go to the Weekly Meal Planner Generator, fill in your meals for each day, add grocery notes, choose a theme, and click Download. You'll get a clean US Letter PDF ready to print. No account needed.",
  },
];

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

const relatedTools = [
  {
    title: "Weekly Meal Planner",
    description: "Plan breakfast, lunch, dinner, snacks, and grocery notes. Download a printable PDF in under a minute.",
    href: "/weekly-meal-planner",
    icon: <IconCalendar />,
    tag: "Meal Planning",
  },
  {
    title: "Chore Chart Generator",
    description: "Create a custom weekly chore chart for kids or the whole family.",
    href: "/chore-chart-generator",
    icon: <IconChecklist />,
    tag: "Kids & Chores",
  },
  {
    title: "Cleaning Schedule Generator",
    description: "Build a room-by-room cleaning schedule with tasks, frequency, and assignments.",
    href: "/cleaning-schedule-generator",
    icon: <IconBroom />,
    tag: "Family & Home",
  },
];

export default function WeeklyMealPlannerForFamiliesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
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
              <ol className="flex items-center gap-1.5" style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.8125rem", color: "#6F665C", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                <li><Link href="/" style={{ color: "#6F665C", textDecoration: "none" }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: "#E6DED3" }}>/</li>
                <li aria-current="page" style={{ color: "#2F2A25" }}>Weekly Meal Planner for Families</li>
              </ol>
            </nav>
            <h1 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "clamp(1.875rem, 4vw, 2.5rem)", color: "#2F2A25", lineHeight: 1.2, marginBottom: "1rem" }}>
              Weekly Meal Planner for Families: Free Printable Planning Guide
            </h1>
            <p style={{ color: "#6F665C", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "42rem" }}>
              Meal planning doesn&apos;t have to be complicated. A simple weekly plan — written
              down and posted on the fridge — can save your family hours of decision-making,
              reduce food waste, and make grocery shopping faster. This guide walks through
              how to build a routine that actually sticks.
            </p>
          </div>
        </section>

        {/* ── CTA card ─────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "0 1rem 2.5rem" }}>
          <div className="mx-auto max-w-3xl">
            <div style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #6F8F72", borderRadius: "0.875rem", padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "1.125rem", fontWeight: 600, color: "#2F2A25", marginBottom: "0.375rem" }}>
                  Ready to plan your week?
                </p>
                <p style={{ color: "#6F665C", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>
                  Use the free Weekly Meal Planner to fill in breakfast, lunch, dinner, and
                  snacks for every day. Add grocery notes, choose a style, and download a
                  printable PDF. No sign-up required.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/weekly-meal-planner" className="btn-primary">
                  Create a Free Meal Planner
                </Link>
                <span style={{ display: "inline-flex", alignItems: "center", fontSize: "0.8125rem", color: "#6F665C", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  Free · No sign-up · US Letter PDF
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why meal planning helps ───────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={h2Style}>Why weekly meal planning helps busy families</h2>
            <p style={subtitleStyle}>
              Most families don&apos;t struggle with cooking — they struggle with deciding what
              to cook. A weekly plan removes that daily friction.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { heading: "Fewer last-minute decisions", body: "When dinner is already decided, you skip the 5pm \"what should we eat?\" spiral. That alone reduces stress significantly on busy weeknights." },
                { heading: "Less food waste", body: "Buying ingredients with a plan means you actually use what you buy. Families who meal plan typically waste 30–50% less food than those who don't." },
                { heading: "Faster grocery shopping", body: "A meal plan turns your grocery list into a precise list. You get in and out faster, and you stop buying things you don't need." },
                { heading: "More variety over time", body: "Without a plan, most families rotate the same 4–5 meals. A written plan makes it easy to try something new once a week without disrupting the routine." },
                { heading: "Easier to involve kids", body: "When the plan is visible on the fridge, kids know what to expect. You can also let them pick one dinner per week, which reduces mealtime resistance." },
                { heading: "Budget-friendly", body: "Planned meals mean fewer takeout orders and impulse buys. Most families save noticeably on food costs within the first month of consistent planning." },
              ].map((item) => (
                <div key={item.heading} style={cardStyle}>
                  <p style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.375rem" }}>{item.heading}</p>
                  <p style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Simple weekly routine ─────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={h2Style}>A simple weekly meal planning routine</h2>
            <p style={subtitleStyle}>
              This five-step routine takes about 15 minutes once a week. Most families do it
              on Sunday morning or Saturday evening.
            </p>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { step: "1", heading: "Check your schedule", body: "Look at the week ahead. Which nights are busy? Which nights do you have time to cook? Plan quick meals for busy nights and save more involved recipes for when you have time." },
                { step: "2", heading: "Pick easy meals first", body: "Start with the meals you know by heart — the ones that take 20 minutes and everyone likes. Fill in the harder nights around those anchors." },
                { step: "3", heading: "Plan leftovers intentionally", body: "If Monday is a big batch of soup or roast chicken, plan Tuesday's lunch around those leftovers. It cuts prep time in half and reduces waste." },
                { step: "4", heading: "Make your grocery list as you plan", body: "Write down what you need for each meal as you fill in the planner. By the time you're done planning, your grocery list is already done." },
                { step: "5", heading: "Keep one backup meal", body: "Always have one easy fallback — pasta, eggs, or a frozen option. When the plan falls apart (and it will), you have something ready without resorting to takeout." },
              ].map((item) => (
                <li key={item.step} style={{ ...cardStyle, display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "2rem", height: "2rem", borderRadius: "9999px", backgroundColor: "#6F8F72", color: "#FFFFFF", fontFamily: "var(--font-lora), serif", fontSize: "0.875rem", fontWeight: 600, flexShrink: 0, marginTop: "0.125rem" }} aria-hidden="true">{item.step}</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>{item.heading}</p>
                    <p style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Family meal ideas ─────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-6xl">
            <h2 style={h2Style}>Family meal planning ideas</h2>
            <p style={subtitleStyle}>
              Not sure what to put in the planner? Here are practical ideas for every meal
              slot — focused on what actually works for busy families.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Quick breakfasts", color: "#6F8F72", items: ["Overnight oats (prep Sunday)", "Scrambled eggs and toast", "Yogurt with granola", "Banana and peanut butter", "Whole grain cereal with milk", "Smoothie with frozen fruit"] },
                { label: "Packed lunches", color: "#7E9CAF", items: ["Sandwich + fruit + veggie sticks", "Leftover pasta or rice bowl", "Hummus wrap with cucumber", "Cheese quesadilla + apple slices", "Soup in a thermos", "Grain salad with chickpeas"] },
                { label: "Easy weeknight dinners", color: "#C9825B", items: ["Sheet pan chicken and vegetables", "Pasta with marinara or pesto", "Tacos with ground beef or beans", "Stir-fry with rice", "Homemade pizza on naan", "Baked salmon with roasted potatoes"] },
                { label: "Snacks", color: "#D9A6A1", items: ["Apple slices with peanut butter", "Cheese and crackers", "Carrot sticks with hummus", "Trail mix", "Frozen fruit bars", "Rice cakes with avocado"] },
                { label: "Leftover ideas", color: "#6F8F72", items: ["Roast chicken → chicken wraps", "Cooked rice → fried rice", "Roasted vegetables → frittata", "Pasta → pasta salad", "Soup → freeze for next week", "Grilled meat → grain bowl"] },
              ].map((group) => (
                <div key={group.label} style={cardStyle}>
                  <p style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "1rem", fontWeight: 600, color: "#2F2A25", marginBottom: "0.875rem", paddingBottom: "0.625rem", borderBottom: `2px solid ${group.color}` }}>{group.label}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2" style={{ marginBottom: "0.375rem" }}>
                        <span aria-hidden="true" style={{ color: group.color, fontSize: "0.65rem", marginTop: "0.35rem", flexShrink: 0 }}>●</span>
                        <span style={{ color: "#2F2A25", fontSize: "0.875rem", lineHeight: 1.5 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center" style={{ marginTop: "2.5rem" }}>
              <Link href="/weekly-meal-planner" className="btn-primary">
                Fill in your meal planner →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Tips ─────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={h2Style}>Tips for using a printable meal planner</h2>
            <p style={subtitleStyle}>
              A printed planner works differently from an app — here&apos;s how to get the
              most out of it.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { heading: "Post it at eye level", body: "The fridge door at adult eye level is ideal. Everyone in the household can see the plan without asking, which reduces the \"what's for dinner?\" question." },
                { heading: "Fill in dinners first", body: "Dinners are the hardest to decide. Fill those in first, then work backward to lunches and breakfasts. It makes the whole plan feel less overwhelming." },
                { heading: "Leave some slots blank on purpose", body: "Don't plan every single meal. Leave 1–2 dinner slots open for leftovers, takeout, or whatever sounds good that day. Flexibility prevents the plan from feeling like a rigid schedule." },
                { heading: "Use the grocery notes section", body: "As you fill in meals, write down what you need to buy. By the time the planner is done, your grocery list is already written." },
                { heading: "Print a fresh copy each week", body: "A clean sheet each week keeps the plan readable and gives you a fresh start. It takes 30 seconds and makes the whole system feel more intentional." },
                { heading: "Keep a list of family favorites", body: "Write down meals your family loves as you discover them. When you sit down to plan, pull from that list instead of starting from scratch every week." },
              ].map((item) => (
                <div key={item.heading} style={cardStyle}>
                  <p style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.375rem" }}>{item.heading}</p>
                  <p style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={h2Style}>Frequently asked questions</h2>
            <p style={{ ...subtitleStyle, marginBottom: "1.75rem" }}>Common questions about meal planning for families.</p>
            <dl className="flex flex-col gap-4">
              {faqItems.map((item) => (
                <div key={item.question} style={cardStyle}>
                  <dt style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.5rem" }}>{item.question}</dt>
                  <dd style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", color: "#2F2A25", marginBottom: "0.75rem" }}>
              Plan your family&apos;s meals in under a minute
            </h2>
            <p style={{ color: "#6F665C", fontSize: "1rem", lineHeight: 1.65, maxWidth: "36rem", margin: "0 auto 1.5rem" }}>
              The free Weekly Meal Planner lets you fill in every meal, add grocery notes,
              and download a clean printable PDF. No account needed.
            </p>
            <Link href="/weekly-meal-planner" className="btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 1.75rem" }}>
              Create a Free Meal Planner
            </Link>
            <p style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "#6F665C", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
              Free · Printable US Letter PDF · No sign-up required
            </p>
          </div>
        </section>

        {/* ── Related tools ────────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-6xl">
            <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", color: "#2F2A25", marginBottom: "0.5rem" }}>
              Related printable tools
            </h2>
            <p style={{ color: "#6F665C", fontSize: "0.9rem", marginBottom: "1.5rem" }}>More free printables for everyday family life.</p>
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
