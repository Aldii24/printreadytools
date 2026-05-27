/**
 * JsonLd — injects a JSON-LD <script> tag.
 * Server Component — no "use client" needed.
 * Usage: <JsonLd data={schemaObject} />
 *
 * Uses unicode escaping for "<" to prevent XSS, per the official Next.js JSON-LD guide.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
