import { cn } from "@/lib/cn";

const surfaces = {
  limestone: "surface-limestone bg-limestone text-night",
  night: "surface-night bg-night text-limestone",
  deep: "surface-deep bg-deep text-limestone",
} as const;

export function Section({
  children,
  surface = "limestone",
  className,
  pad = true,
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  surface?: keyof typeof surfaces;
  className?: string;
  pad?: boolean;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(surfaces[surface], className)}
      style={pad ? { paddingBlock: "var(--space-section)" } : undefined}
    >
      {children}
    </section>
  );
}
