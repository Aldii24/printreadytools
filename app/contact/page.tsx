import type { Metadata } from "next";
import Link from "next/link";
import ProseLayout from "@/components/ProseLayout";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the PrintReadyTools team. We read every message and reply within a few business days.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact PrintReadyTools",
    description: "Get in touch with the PrintReadyTools team.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <ProseLayout
      title="Contact Us"
      subtitle="We'd love to hear from you."
    >
      <div className="prose-note">
        We are a small team. We read every message and will do our best to reply within a few business days.
      </div>

      <h2>How to reach us</h2>
      <p>
        The best way to contact us is by email. You can reach us at:
      </p>
      <p>
        <strong>
          <a href="mailto:hello@printreadytools.com">hello@printreadytools.com</a>
        </strong>
      </p>

      <h2>What to include in your message</h2>
      <p>
        To help us respond quickly, please include:
      </p>
      <ul>
        <li>A short description of what you need help with</li>
        <li>The name of the tool or page you were using (e.g., Chore Chart Generator)</li>
        <li>Your browser and device if you ran into a technical issue</li>
      </ul>

      <h2>What we can help with</h2>
      <ul>
        <li>Questions about how a tool works</li>
        <li>Suggestions for new printable templates</li>
        <li>Reporting a bug or display issue</li>
        <li>Feedback on an existing printable design</li>
        <li>Advertising or partnership inquiries</li>
        <li>Privacy or data questions</li>
      </ul>

      <h2>What we cannot help with</h2>
      <p>
        We are not able to create custom printable designs on request, recover saved data
        (we do not store your form inputs), or provide refunds (all tools are free).
      </p>

      <hr />

      <p>
        You can also read our{" "}
        <Link href="/privacy">Privacy Policy</Link>{" "}
        or{" "}
        <Link href="/terms">Terms of Use</Link>{" "}
        if you have questions about how we handle data.
      </p>
    </ProseLayout>
  );
}
