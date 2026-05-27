import Link from "next/link";

const navLinks = [
  { label: "Printables", href: "/printables" },
  { label: "For Parents", href: "/for-parents" },
  { label: "For Teachers", href: "/for-teachers" },
  { label: "Pet Tools", href: "/pet-tools" },
  { label: "Guides", href: "/guides" },
];

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E6DED3",
      }}
    >
      <div
        className="mx-auto flex max-w-6xl items-center justify-between px-4"
        style={{ minHeight: "64px" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ textDecoration: "none" }}
          aria-label="PrintReadyTools home"
        >
          <span aria-hidden="true" className="shrink-0" style={{ color: "#6F8F72" }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
              <path d="M16 2 L20 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M16 2 L16 6 L20 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="8" y1="15" x2="16" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="8" y1="19" x2="13" y2="19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <span
            style={{
              fontFamily: "var(--font-lora), Georgia, serif",
              color: "#2F2A25",
              fontSize: "1.1rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            PrintReadyTools
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex md:hidden items-center justify-center rounded-md p-2"
          style={{ color: "#6F665C", background: "none", border: "none", cursor: "pointer" }}
          aria-label="Open menu"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
