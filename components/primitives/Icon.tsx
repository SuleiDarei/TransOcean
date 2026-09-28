import { cn } from "@/lib/cn";

const directional = new Set(["arrow", "arrow-up-right"]);

const paths = {
  arrow: "M4 10h12M12 5l5 5-5 5",
  "arrow-up-right": "M6 14 14 6M8 6h6v6",
  plus: "M10 4v12M4 10h12",
  minus: "M4 10h12",
  close: "M5 5l10 10M15 5 5 15",
  play: "M7 4.5v11L15.5 10 7 4.5z",
  pause: "M6.5 4.5v11M13.5 4.5v11",
  "chevron-down": "M4 7l6 6 6-6",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={cn("h-5 w-5 shrink-0", directional.has(name) && "rtl:-scale-x-100", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
