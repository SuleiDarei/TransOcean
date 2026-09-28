import { cn } from "@/lib/cn";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-container", className)} style={{ paddingInline: "var(--margin)" }}>
      {children}
    </div>
  );
}
