import type { ContentMeta } from "@/content/types";
import { cn } from "@/lib/cn";
import { phProps } from "@/lib/phProps";

export function Display({
  lines,
  variant = "l",
  as: Tag = "h2",
  className,
  meta,
  id,
}: {
  lines: string[];
  variant?: "xxl" | "xl" | "l" | "m";
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  meta?: ContentMeta;
  id?: string;
}) {
  const style = {
    xxl: "t-display-xxl",
    xl: "t-display-xl",
    l: "t-display-l",
    m: "t-display-m",
  }[variant];
  return (
    <Tag id={id} className={cn(style, className)} {...phProps(meta)}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block">
          {line}
        </span>
      ))}
    </Tag>
  );
}

export function Text({
  children,
  variant = "body",
  className,
  meta,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  variant?: "lead" | "body" | "small" | "statement";
  className?: string;
  meta?: ContentMeta;
  as?: "p" | "span" | "div";
}) {
  const style = {
    lead: "t-lead",
    body: "t-body max-w-measure",
    small: "t-small",
    statement: "t-statement",
  }[variant];
  return (
    <Tag className={cn(style, className)} {...phProps(meta)}>
      {children}
    </Tag>
  );
}

export function Label({ children, className, meta }: { children: React.ReactNode; className?: string; meta?: ContentMeta }) {
  return (
    <p className={cn("t-label", className)} {...phProps(meta)}>
      {children}
    </p>
  );
}
