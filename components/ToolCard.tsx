import Link from "next/link";
import type { ReactNode } from "react";

export interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  /** Optional category tag */
  tag?: string;
}

/**
 * ToolCard — a paper-feel card linking to a printable generator.
 * Server Component — hover states handled via CSS class.
 */
export default function ToolCard({ title, description, href, icon, tag }: ToolCardProps) {
  return (
    <article className="tool-card">
      {/* Icon */}
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg shrink-0"
        style={{ backgroundColor: "#F3EEE7", color: "#6F8F72" }}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Tag */}
      {tag && (
        <span
          className="mb-2 inline-block rounded px-2 py-0.5"
          style={{
            backgroundColor: "#F3EEE7",
            color: "#6F665C",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          {tag}
        </span>
      )}

      {/* Title */}
      <h3
        className="mb-1 leading-snug"
        style={{
          fontFamily: "var(--font-lora), Georgia, serif",
          color: "#2F2A25",
          fontSize: "1rem",
          fontWeight: 600,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="mb-4 flex-1 leading-relaxed"
        style={{ color: "#6F665C", fontSize: "0.875rem" }}
      >
        {description}
      </p>

      {/* CTA */}
      <Link
        href={href}
        className="btn-primary mt-auto self-start"
        aria-label={`Create ${title}`}
      >
        Create
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M3 7h8M7.5 4l3.5 3-3.5 3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </article>
  );
}
