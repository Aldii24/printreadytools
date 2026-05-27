type AdSlotSize = "banner" | "rectangle" | "responsive";

interface AdSlotProps {
  size?: AdSlotSize;
  className?: string;
  label?: string;
}

const sizeMap: Record<AdSlotSize, { minHeight: string; maxWidth: string }> = {
  banner:      { minHeight: "90px",  maxWidth: "728px" },
  rectangle:   { minHeight: "250px", maxWidth: "300px" },
  responsive:  { minHeight: "90px",  maxWidth: "100%" },
};

/**
 * AdSlot — a calm, fixed-height placeholder for ad units.
 * Prevents layout shift and labels the region clearly for users.
 */
export default function AdSlot({
  size = "responsive",
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const { minHeight, maxWidth } = sizeMap[size];

  return (
    <div
      className={`mx-auto w-full ${className}`}
      style={{ maxWidth }}
      aria-label={label}
    >
      <div
        className="flex items-center justify-center rounded"
        style={{
          minHeight,
          border: "1.5px dashed #E6DED3",
          backgroundColor: "#F3EEE7",
        }}
        role="complementary"
        aria-label={label}
      >
        <span
          className="text-xs font-medium tracking-widest uppercase select-none"
          style={{ color: "#6F665C", letterSpacing: "0.12em" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
