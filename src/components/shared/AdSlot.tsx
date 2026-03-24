"use client";

/**
 * AdSlot — Google AdSense placement component.
 * Replace data-ad-client and data-ad-slot with your AdSense publisher ID
 * once approved. Renders a placeholder in development.
 */

interface AdSlotProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export default function AdSlot({
  slot = "XXXXXXXXXX",
  format = "auto",
  className = "",
}: AdSlotProps) {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-xs text-gray-400 ${
          format === "horizontal" ? "h-24 w-full" : "h-64 w-full"
        } ${className}`}
      >
        Ad Placement (AdSense — active in production)
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
