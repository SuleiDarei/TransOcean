import { cn } from "@/lib/cn";

const directional = new Set(["arrow"]);

const paths = {
  arrow: "M4 10h12M12 5l5 5-5 5",
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
