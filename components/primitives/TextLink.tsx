import { cn } from "@/lib/cn";
import Link from "next/link";

export function TextLink({
  href,
  children,
  surface = "light",
  className,
}: {
  href: string;
  children: React.ReactNode;
  surface?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block underline decoration-1 underline-offset-[6px] transition-colors duration-quick ease-standard hover:decoration-2",
        surface === "light" ? "text-ink hover:text-steel" : "text-water",
        className,
      )}
    >
      {children}
    </Link>
  );
}
