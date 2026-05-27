import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "All Tools", href: "/printables" },
];

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{
        backgroundColor: "#F3EEE7",
        borderTop: "1px solid #E6DED3",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                color: "#2F2A25",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              PrintReadyTools
            </p>
            <p style={{ color: "#6F665C", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              Simple printable tools for busy families.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul
              className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-end"
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p
          className="mt-8 text-center"
          style={{ color: "#6F665C", fontSize: "0.75rem" }}
        >
          &copy; {new Date().getFullYear()} PrintReadyTools. Free to use. No sign-up required.
        </p>
      </div>
    </footer>
  );
}
