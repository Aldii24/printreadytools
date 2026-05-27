import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import ToolCard from "@/components/ToolCard";
import PetFeedingGenerator from "@/components/pet-feeding/PetFeedingGenerator";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Free Pet Feeding Schedule Printable",
  description: "Create a weekly feeding schedule for your dog, cat, or other pet. Add meals, portions, medications, and care notes. Download a printable US Letter PDF — free, no sign-up.",
  alternates: {
    canonical: "/pet-feeding-schedule-printable",
  },
  openGraph: {
    title: "Free Pet Feeding Schedule Printable",
    description: "Create a clear weekly feeding schedule for any pet. Download a printable PDF — great for daily routines or leaving with a sitter.",
    url: "/pet-feeding-schedule-printable",
    type: "website",
  },
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
    description: "Build a room-by-room cleaning schedule for your home.",
    href: "/cleaning-schedule-generator",
    icon: <IconBroom />,
    tag: "Family & Home",
  },
];

const faqItems = [
  {
    question: "What pets is this schedule designed for?",
    answer:
      "Any pet that needs a regular feeding routine. The form supports dogs, cats, birds, rabbits, fish, and other pets. The layout is flexible enough to work for any feeding schedule, from twice-a-day kibble to multiple small fish feedings.",
  },
  {
    question: "Can I include medications or supplements?",
    answer:
      "Yes. There's a dedicated Medication or Supplement Notes section at the bottom of the form. Use it to note which meals include medications, how much, and any special instructions.",
  },
  {
    question: "Can I use this when leaving my pet with a sitter?",
    answer:
      "Absolutely. That's one of the best uses for this printable. Print a clean copy and leave it with your pet sitter, dog walker, or family member. It gives them everything they need at a glance.",
  },
  {
    question: "Can I print it in black and white?",
    answer:
      "Yes. The Minimal theme is designed specifically for black-and-white printing. The other themes also print cleanly in B&W, though the color accents won't show.",
  },
  {
    question: "How many feedings can I add?",
    answer:
      "Up to 10. Most pets eat 2–4 times per day, so the default 3 rows covers most cases. You can add more for pets with complex schedules.",
  },
  {
    question: "Is this free?",
    answer:
      "Yes. All tools on PrintReadyTools are free to use. No account or subscription required.",
  },
];

const tips = [
  {
    tip: "Keep it in a visible spot",
    detail: "Post the schedule on the fridge or near the pet food. A visible reminder reduces missed feedings, especially with multiple people in the house.",
  },
  {
    tip: "Include water reminders",
    detail: "Use the notes column to remind whoever is feeding your pet to refresh the water bowl. It's easy to forget during a routine.",
  },
  {
    tip: "Note serving sizes precisely",
    detail: "\"A scoop\" means different things to different people. Use the portion column to be specific: \"1/2 cup dry kibble\" or \"one 3 oz can\".",
  },
  {
    tip: "Add medication details",
    detail: "If your pet takes medication with meals, note which feeding and how to administer it. Don't rely on verbal instructions.",
  },
  {
    tip: "Print a fresh copy weekly",
    detail: "A new sheet each week means no crossed-out corrections and a clear record if anything needs to be checked later.",
  },
  {
    tip: "Use the care notes for sitters",
    detail: "Add walking schedules, grooming reminders, or behavioral notes in the care notes field so a sitter has the full picture.",
  },
];

export default function PetFeedingSchedulePage() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://printreadytools.com";

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Pet Feeding Schedule Printable",
    url: `${BASE_URL}/pet-feeding-schedule-printable`,
    description:
      "Create a weekly feeding schedule for your dog, cat, or other pet. Add meals, portions, medications, and care notes. Download a printable US Letter PDF.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires a modern web browser",
  };

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
                <li aria-current="page" style={{ color: "#2F2A25" }}>Pet Feeding Schedule</li>
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
              Free Pet Feeding Schedule Printable
            </h1>
            <p style={{ color: "#6F665C", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "52rem" }}>
              Create a clear feeding schedule for your dog, cat, or any other pet. Add meals,
              portions, and care notes, then download a printable PDF. Useful for daily routines
              or leaving with a sitter. No account needed.
            </p>
          </div>
        </section>

        {/* ── Generator ───────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "0 1rem 2rem" }}>
          <div className="mx-auto max-w-6xl">
            <PetFeedingGenerator />
          </div>
        </section>

        {/* ── Ad slot ─────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-4" style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>
          <AdSlot size="responsive" />
        </div>

        {/* ── Tips ────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", color: "#2F2A25", marginBottom: "1.5rem" }}>
              Tips for using a pet feeding schedule
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {tips.map((item) => (
                <div
                  key={item.tip}
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6DED3", borderRadius: "0.75rem", padding: "1.25rem 1.5rem" }}
                >
                  <p style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.4rem" }}>
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
            <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", color: "#2F2A25", marginBottom: "2rem" }}>
              Frequently asked questions
            </h2>
            <dl className="flex flex-col gap-4">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6DED3", borderRadius: "0.75rem", padding: "1.25rem 1.5rem" }}
                >
                  <dt style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.5rem" }}>
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
            <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", color: "#2F2A25", marginBottom: "0.5rem" }}>
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

        <JsonLd data={webAppSchema} />
        <JsonLd data={faqSchema} />

      </main>

      <Footer />
    </>
  );
}
