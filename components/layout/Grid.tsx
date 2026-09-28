import { cn } from "@/lib/cn";

const spanBase: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};
const spanMd: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
};
const spanLg: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};
const startLg: Record<number, string> = {
  1: "lg:col-start-1",
  2: "lg:col-start-2",
  3: "lg:col-start-3",
  4: "lg:col-start-4",
  5: "lg:col-start-5",
  6: "lg:col-start-6",
  7: "lg:col-start-7",
  8: "lg:col-start-8",
  9: "lg:col-start-9",
  10: "lg:col-start-10",
  11: "lg:col-start-11",
  12: "lg:col-start-12",
};
const startMd: Record<number, string> = {
  1: "md:col-start-1",
  2: "md:col-start-2",
  3: "md:col-start-3",
  4: "md:col-start-4",
  5: "md:col-start-5",
  6: "md:col-start-6",
  7: "md:col-start-7",
  8: "md:col-start-8",
};

export function Grid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn("grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12", className)}
      style={{ columnGap: "var(--gutter)" }}
    >
      {children}
    </div>
  );
}

export function Col({
  children,
  className,
  span = 4,
  md,
  lg,
  mdStart,
  lgStart,
}: {
  children: React.ReactNode;
  className?: string;
  span?: number;
  md?: number;
  lg?: number;
  mdStart?: number;
  lgStart?: number;
}) {
  return (
    <div
      className={cn(
        spanBase[span],
        md ? spanMd[md] : undefined,
        lg ? spanLg[lg] : undefined,
        mdStart ? startMd[mdStart] : undefined,
        lgStart ? startLg[lgStart] : undefined,
        className,
      )}
    >
      {children}
    </div>
  );
}
