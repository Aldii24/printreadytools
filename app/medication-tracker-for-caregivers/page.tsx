import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Medication Tracker for Caregivers | Free Printable Guide",
  description:
    "Use a free printable medication tracker to organize medicine names, dosages, times, notes, and weekly checkboxes for caregiving routines.",
  alternates: { canonical: "/medication-tracker-for-caregivers" },
  openGraph: {
    title: "Medication Tracker for Caregivers | Free Printable Guide",
    description:
      "A practical guide to tracking medications for caregivers, plus a free printable weekly medication log PDF.",
    url: "/medication-tracker-for-caregivers",
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
    question: "Who should use a medication tracker?",
    answer:
      "Anyone managing medications for another person — including parents of children with complex schedules, adult children caring for elderly parents, professional caregivers, and individuals managing their own chronic conditions. A tracker is especially useful when multiple medications are involved or when more than one person is responsible for giving doses.",
  },
  {
    question: "Is a printed tracker better than a phone app?",
    answer:
      "For many caregiving situations, yes. A printed tracker can be posted on the fridge or kept near the medication, visible to everyone in the household. It doesn't require a login, doesn't need charging, and can be handed to a substitute caregiver or brought to a doctor's appointment without any setup.",
  },
  {
    question: "How do I handle medications that are taken multiple times a day?",
    answer:
      "Add a separate row for each dose time. For example, if a medication is taken at 8 AM and 8 PM, create two rows — one labeled \"8:00 AM\" and one labeled \"8:00 PM\" — with the same medication name and dosage. This makes it easy to check off each dose independently.",
  },
  {
    question: "What should I do if a dose is missed?",
    answer:
      "Leave the checkbox unchecked and note it in the notes column. Do not double-dose without checking with a healthcare provider first. A printed tracker makes missed doses visible at a glance, which helps you report accurately to a doctor or pharmacist.",
  },
  {
    question: "How often should I update the tracker?",
    answer:
      "Print a fresh tracker each week. Review the medication list whenever a prescription changes — after a doctor's appointment, a hospital discharge, or any change in dosage or timing. Keep the previous week's tracker for at least a month in case you need to reference it.",
  },
  {
    question: "Is this tracker a substitute for medical advice?",
    answer:
      "No. The medication tracker is an organizational tool only. Always follow the instructions of a licensed healthcare provider for all medication decisions. If you have questions about dosages, interactions, or missed doses, contact a pharmacist or doctor.",
  },
];

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
    title: "Medication Tracker Printable",
    description: "Track daily medications, doses, times, and notes. Download a weekly log as a printable PDF.",
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
  {
    title: "Cleaning Schedule Generator",
    description: "Build a room-by-room cleaning schedule with tasks, frequency, and assignments.",
    href: "/cleaning-schedule-generator",
    icon: <IconBroom />,
    tag: "Family & Home",
  },
];

export default function MedicationTrackerForCaregiversPage() {
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
                <li aria-current="page" style={{ color: "#2F2A25" }}>Medication Tracker for Caregivers</li>
              </ol>
            </nav>
            <h1 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "clamp(1.875rem, 4vw, 2.5rem)", color: "#2F2A25", lineHeight: 1.2, marginBottom: "1rem" }}>
              Medication Tracker for Caregivers: Free Printable Guide
            </h1>
            <p style={{ color: "#6F665C", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "42rem", marginBottom: "0.75rem" }}>
              Managing medications for a family member or patient is one of the most
              detail-sensitive caregiving tasks. A clear, printed tracker — posted where
              everyone can see it — reduces errors, keeps caregivers aligned, and gives
              doctors an accurate picture of what&apos;s been taken.
            </p>
            <p style={{ fontSize: "0.8125rem", color: "#6F665C", fontFamily: "var(--font-inter), system-ui, sans-serif", lineHeight: 1.5, maxWidth: "42rem" }}>
              <strong style={{ color: "#2F2A25" }}>Note:</strong> This is an organizational tool only.
              Always follow the guidance of a licensed healthcare provider for all medication decisions.
            </p>
          </div>
        </section>

        {/* ── CTA card ─────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "0 1rem 2.5rem" }}>
          <div className="mx-auto max-w-3xl">
            <div style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #6F8F72", borderRadius: "0.875rem", padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "1.125rem", fontWeight: 600, color: "#2F2A25", marginBottom: "0.375rem" }}>
                  Create your medication tracker now
                </p>
                <p style={{ color: "#6F665C", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>
                  Use the free Medication Tracker to add up to 10 medications with dosage,
                  time, and notes. Download a clean weekly log as a printable US Letter PDF.
                  No sign-up required.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/medication-tracker-printable" className="btn-primary">
                  Create a Free Medication Tracker
                </Link>
                <span style={{ display: "inline-flex", alignItems: "center", fontSize: "0.8125rem", color: "#6F665C", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  Free · No sign-up · US Letter PDF
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why caregivers use a tracker ─────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={h2Style}>Why caregivers use a medication tracker</h2>
            <p style={subtitleStyle}>
              When multiple people are involved in someone&apos;s care, a shared written
              record prevents the most common and dangerous caregiving errors.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { heading: "Prevents double-dosing", body: "When two caregivers share responsibility, it's easy for both to give a dose thinking the other hasn't. A tracker with checkboxes makes it immediately clear whether a dose has been given." },
                { heading: "Catches missed doses early", body: "An unchecked box at the end of the day is a clear signal. Without a tracker, missed doses often go unnoticed until symptoms appear." },
                { heading: "Supports accurate doctor visits", body: "A completed weekly tracker gives a doctor or pharmacist a precise record of what was taken, when, and whether any doses were missed or caused side effects." },
                { heading: "Reduces caregiver stress", body: "Trying to remember whether a medication was given — especially across a long day or a handoff between caregivers — is mentally exhausting. A tracker removes that uncertainty." },
                { heading: "Helps with hospital discharge", body: "After a hospital stay, medication regimens often change significantly. A printed tracker helps caregivers implement new instructions clearly and consistently from day one." },
                { heading: "Useful for substitute caregivers", body: "When a regular caregiver is unavailable, a printed tracker gives a substitute everything they need to know without a lengthy verbal handoff." },
              ].map((item) => (
                <div key={item.heading} style={cardStyle}>
                  <p style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.375rem" }}>{item.heading}</p>
                  <p style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What to include ───────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={h2Style}>What to include in a medication tracker</h2>
            <p style={subtitleStyle}>
              A useful tracker captures the right information without becoming so complex
              that it&apos;s hard to maintain. These six fields cover most caregiving situations.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { num: "1", heading: "Medication name", body: "Use the full name as it appears on the prescription label — including whether it's a brand name or generic. This avoids confusion when multiple medications have similar names." },
                { num: "2", heading: "Dosage", body: "Record the exact dose: \"200mg\", \"1 tablet\", \"5ml\". Don't abbreviate in ways that could be misread. If the dose changes, update the tracker immediately and note the date of the change." },
                { num: "3", heading: "Time", body: "Write the specific time each dose should be given: \"8:00 AM\", \"with lunch\", \"at bedtime\". For medications that must be taken at precise intervals, exact times matter more than approximate ones." },
                { num: "4", heading: "Special instructions", body: "Note anything that affects how the medication is given: \"take with food\", \"avoid grapefruit\", \"refrigerate\", \"crush and mix with applesauce\". These details are easy to forget under pressure." },
                { num: "5", heading: "Weekly checkboxes", body: "A checkbox for each day of the week lets caregivers confirm each dose at the moment it's given. This is the most important field for preventing double-dosing and catching missed doses." },
                { num: "6", heading: "Notes for side effects or missed doses", body: "Use the notes column to record anything unusual: a missed dose, a side effect, a refusal to take the medication, or a change in the person's condition after taking it. This information is valuable at doctor's appointments." },
              ].map((item) => (
                <div key={item.num} style={{ ...cardStyle, display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "2rem", height: "2rem", borderRadius: "9999px", backgroundColor: "#7E9CAF", color: "#FFFFFF", fontFamily: "var(--font-lora), serif", fontSize: "0.875rem", fontWeight: 600, flexShrink: 0, marginTop: "0.125rem" }} aria-hidden="true">{item.num}</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>{item.heading}</p>
                    <p style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center" style={{ marginTop: "2.5rem" }}>
              <Link href="/medication-tracker-printable" className="btn-primary">
                Create your tracker now →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Tips for safe use ─────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={h2Style}>Tips for using a medication tracker safely</h2>
            <p style={subtitleStyle}>
              A tracker is only as reliable as the habits around it. These practices make
              the difference between a tracker that prevents errors and one that creates
              a false sense of security.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { heading: "Check off doses immediately", body: "Mark the checkbox the moment the medication is given — not later from memory. A 10-second habit prevents the most common tracking errors." },
                { heading: "Keep it where the medications are", body: "Post the tracker next to the medication storage area. If the tracker is in a different room from the medications, it won't get used consistently." },
                { heading: "Use one tracker per person", body: "If you're managing medications for multiple people, use a separate tracker for each. Combining them on one sheet increases the risk of confusion." },
                { heading: "Review it at every handoff", body: "When one caregiver hands off to another, go through the tracker together. Point out any missed doses, notes, or changes from the current week." },
                { heading: "Bring it to appointments", body: "A completed tracker is one of the most useful things you can bring to a doctor or pharmacist. It shows exactly what was taken, when, and any issues that came up." },
                { heading: "Store completed trackers for one month", body: "Keep the previous four weeks of trackers in a folder. If a question comes up about what was given during a specific period, you'll have the record." },
              ].map((item) => (
                <div key={item.heading} style={cardStyle}>
                  <p style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.375rem" }}>{item.heading}</p>
                  <p style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── When to update ────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAF7F2", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={h2Style}>When to update the tracker</h2>
            <p style={subtitleStyle}>
              An outdated tracker is worse than no tracker — it creates false confidence.
              Update it whenever any of these situations occur.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { trigger: "After a doctor's appointment", detail: "Any change in prescription — new medication, adjusted dose, discontinued medication — should be reflected on the tracker before the next dose is due." },
                { trigger: "After a hospital or ER discharge", detail: "Discharge paperwork often includes significant medication changes. Review it carefully and update the tracker the same day, before the first post-discharge dose." },
                { trigger: "When a medication is stopped", detail: "Remove discontinued medications from the tracker immediately. Leaving them on creates confusion and the risk of giving a medication that should no longer be taken." },
                { trigger: "When the dose or timing changes", detail: "Even a small change — from 10mg to 12.5mg, or from twice daily to three times daily — needs to be updated on the tracker right away." },
                { trigger: "When a new caregiver takes over", detail: "Before a new caregiver starts, review the tracker with them in person. Make sure they understand every medication, dose, and special instruction." },
                { trigger: "At the start of each week", detail: "Print a fresh tracker every week. A clean sheet is easier to read, prevents confusion from previous weeks' notes, and gives caregivers a clear starting point." },
              ].map((item) => (
                <div key={item.trigger} style={{ ...cardStyle, borderLeft: "4px solid #7E9CAF" }}>
                  <p style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#2F2A25", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>{item.trigger}</p>
                  <p style={{ color: "#6F665C", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#F3EEE7", padding: "3rem 1rem" }}>
          <div className="mx-auto max-w-3xl">
            <h2 style={h2Style}>Frequently asked questions</h2>
            <p style={{ ...subtitleStyle, marginBottom: "1.75rem" }}>Common questions from caregivers about medication tracking.</p>
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
              Create your medication tracker in under a minute
            </h2>
            <p style={{ color: "#6F665C", fontSize: "1rem", lineHeight: 1.65, maxWidth: "36rem", margin: "0 auto 1.5rem" }}>
              Add up to 10 medications with dosage, time, and notes. Download a clean
              weekly log as a printable US Letter PDF. No account needed.
            </p>
            <Link href="/medication-tracker-printable" className="btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 1.75rem" }}>
              Create a Free Medication Tracker
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
            <p style={{ color: "#6F665C", fontSize: "0.9rem", marginBottom: "1.5rem" }}>More free printables for everyday family and caregiving life.</p>
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
