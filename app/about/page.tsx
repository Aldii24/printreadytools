import type { Metadata } from "next";
import Link from "next/link";
import ProseLayout from "@/components/ProseLayout";

export const metadata: Metadata = {
  title: "About PrintReadyTools — Free Printable Generators for Families",
  description:
    "PrintReadyTools is a free website where families, parents, and teachers can create and download printable PDFs — chore charts, meal planners, and more.",
};

export default function AboutPage() {
  return (
    <ProseLayout
      title="About PrintReadyTools"
      subtitle="A simple, free tool for busy families who love a good printable."
    >
      <div className="prose-note">
        PrintReadyTools is completely free to use. No account required. No subscription. Just fill in a form and download your PDF.
      </div>

      <h2>What is PrintReadyTools?</h2>
      <p>
        PrintReadyTools is a free website that helps parents, families, caregivers, and teachers
        create printable PDFs for everyday life. Think chore charts, weekly meal planners,
        cleaning schedules, homework planners, and pet care logs — all designed to look good on
        paper and easy to customize in under a minute.
      </p>
      <p>
        We built this site because finding a good, clean, printable template often means
        digging through cluttered Pinterest boards or paying for a subscription you don&apos;t need.
        We wanted something simpler: pick a tool, fill in a few fields, download a PDF.
      </p>

      <h2>Who is it for?</h2>
      <ul>
        <li>Parents managing household chores and family routines</li>
        <li>Homeschool families who need customizable planning sheets</li>
        <li>Teachers looking for ready-to-print classroom tools</li>
        <li>Caregivers who need medication trackers or care logs</li>
        <li>Pet owners who want a simple feeding and care schedule</li>
        <li>Anyone who prefers a printed page over an app</li>
      </ul>

      <h2>How does it work?</h2>
      <p>
        Each tool on PrintReadyTools has a short form. You fill in the details that matter to
        you — names, tasks, days, notes — and a live preview updates as you type. When you&apos;re
        happy with it, click the download button and you get a clean US Letter PDF, ready to
        print at home or at any print shop.
      </p>
      <p>
        Most of the PDF generation happens directly in your browser. Your form data is used
        to build the printable on your device — we do not store it on our servers.
      </p>

      <h2>Is it really free?</h2>
      <p>
        Yes. All tools on PrintReadyTools are free to use. You do not need to create an account
        or provide any personal information. The site is supported by display advertising, which
        you may see on some pages.
      </p>

      <h2>Where are the printables designed for?</h2>
      <p>
        All printables are designed for US Letter paper (8.5 × 11 inches), the standard paper
        size for home and office printers in the United States. The PDFs are ink-friendly and
        designed to look clean in both color and black-and-white printing.
      </p>

      <hr />

      <p>
        Have a question or suggestion?{" "}
        <Link href="/contact">Get in touch with us.</Link>
      </p>
    </ProseLayout>
  );
}
