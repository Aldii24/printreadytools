import type { Metadata } from "next";
import Link from "next/link";
import ProseLayout from "@/components/ProseLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — PrintReadyTools",
  description:
    "PrintReadyTools privacy policy. Learn how we handle your information when you use our free printable generator tools.",
};

export default function PrivacyPage() {
  return (
    <ProseLayout
      title="Privacy Policy"
      subtitle="Plain-English explanation of how PrintReadyTools handles your information."
      lastUpdated="May 2026"
    >
      <div className="prose-note">
        <strong>Short version:</strong> We do not require an account, we do not sell your data,
        and the information you type into our printable generators stays in your browser.
      </div>

      <h2>Who we are</h2>
      <p>
        PrintReadyTools (<strong>printreadytools.com</strong>) is a free website that lets you
        create and download printable PDFs — chore charts, meal planners, cleaning schedules,
        and more. References to "we," "us," or "our" in this policy refer to PrintReadyTools.
      </p>

      <h2>Information we collect</h2>

      <h3>Information you type into our tools</h3>
      <p>
        When you use a printable generator, you may enter information such as a child&apos;s name,
        a list of chores, or a meal plan. This data is used entirely within your browser to build
        your printable. We do not transmit this information to our servers, and we do not store it.
      </p>

      <h3>Usage data</h3>
      <p>
        Like most websites, we may collect basic technical information when you visit our pages —
        such as your browser type, operating system, referring URL, and pages visited. This is
        collected through standard web analytics tools and is used to understand how people use
        the site so we can improve it.
      </p>

      <h3>Cookies</h3>
      <p>
        We may use cookies for analytics and advertising purposes. Advertising partners may set
        their own cookies when ads are displayed on our site. You can control cookies through
        your browser settings.
      </p>

      <h2>Advertising</h2>
      <p>
        PrintReadyTools is a free service supported by display advertising. We may work with
        third-party advertising networks who display ads on our pages. These ad partners may use
        cookies and similar technologies to show you relevant ads based on your browsing activity.
        We do not share personally identifiable information with advertisers.
      </p>

      <h2>No user accounts</h2>
      <p>
        We do not require you to create an account to use any tool on PrintReadyTools. We do not
        collect your name, email address, or any other personal information unless you choose to
        contact us directly.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        PrintReadyTools is intended for use by adults, including parents and teachers who create
        printables for children. We do not knowingly collect personal information from children
        under 13. If you believe a child has provided us with personal information, please
        contact us and we will delete it promptly.
      </p>

      <h2>Third-party links</h2>
      <p>
        Our site may contain links to external websites. We are not responsible for the privacy
        practices of those sites and encourage you to read their privacy policies.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will update the
        "last updated" date at the top of this page. Continued use of the site after any changes
        means you accept the updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this Privacy Policy, please{" "}
        <Link href="/contact">contact us</Link>.
      </p>
    </ProseLayout>
  );
}
