import type { Metadata } from "next";
import Link from "next/link";
import ProseLayout from "@/components/ProseLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for PrintReadyTools. Simple rules for using this free printable generator website.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Use — PrintReadyTools",
    description: "Simple terms of use for PrintReadyTools.",
    url: "/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <ProseLayout
      title="Terms of Use"
      subtitle="Simple rules for using PrintReadyTools."
      lastUpdated="May 2026"
    >
      <div className="prose-note">
        <strong>Short version:</strong> Use the tools for personal, family, or classroom purposes.
        Do not misuse the site. The printables you create are yours to use freely.
      </div>

      <h2>Acceptance of terms</h2>
      <p>
        By using PrintReadyTools (<strong>printreadytools.com</strong>), you agree to these Terms
        of Use. If you do not agree, please do not use this site.
      </p>

      <h2>What PrintReadyTools is</h2>
      <p>
        PrintReadyTools is a free web-based service that lets you generate and download printable
        PDFs for personal, family, educational, and household use. No account or subscription
        is required.
      </p>

      <h2>Permitted use</h2>
      <p>You are welcome to:</p>
      <ul>
        <li>Use our tools to create printables for personal or household use</li>
        <li>Print or download PDFs for use at home, school, or in a caregiving setting</li>
        <li>Share printed copies with your family, students, or household members</li>
      </ul>

      <h2>Prohibited use</h2>
      <p>You may not:</p>
      <ul>
        <li>Resell, relicense, or commercially distribute printables from this site without permission</li>
        <li>Use automated tools (bots, scrapers) to access our site at scale</li>
        <li>Attempt to reverse-engineer, copy, or reproduce our tools or PDF generation code</li>
        <li>Use the site for any unlawful purpose</li>
        <li>Interfere with the normal operation of the website</li>
      </ul>

      <h2>Advertising</h2>
      <p>
        PrintReadyTools is free to use and supported by display advertising. By using this site,
        you acknowledge that advertisements may appear on our pages. We are not responsible for
        the content of third-party ads.
      </p>

      <h2>No user data stored</h2>
      <p>
        Information you enter into our printable generators (such as names, chores, or meal
        plans) is processed in your browser to produce your PDF. We do not store this data on
        our servers. See our <Link href="/privacy">Privacy Policy</Link> for more details.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The design, code, and content of PrintReadyTools are owned by PrintReadyTools. The
        printable PDFs you generate using your own input are yours to use freely for personal
        and non-commercial purposes.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        PrintReadyTools is provided &quot;as is&quot; without any warranty, express or implied.
        We do not guarantee that the site will be error-free, uninterrupted, or that the
        printables will meet every specific need. Use the site at your own discretion.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, PrintReadyTools shall not be liable for any
        indirect, incidental, or consequential damages arising from your use of the site or
        the printables you create with it.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these Terms of Use from time to time. Updates will be posted on this page
        with a revised "last updated" date. Continued use of the site constitutes acceptance of
        any updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about these terms, please{" "}
        <Link href="/contact">contact us</Link>.
      </p>
    </ProseLayout>
  );
}
