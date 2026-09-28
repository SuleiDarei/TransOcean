import { cn } from "@/lib/cn";
import Link from "next/link";
import { Icon } from "./Icon";

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
        "group inline-flex items-center gap-2 underline decoration-1 underline-offset-[6px] transition-colors duration-quick ease-standard hover:decoration-2",
        surface === "light" ? "text-night hover:text-steel" : "text-limestone",
        className,
      )}
    >
      <span>{children}</span>
      <Icon
        name="arrow"
        className="transition-transform duration-quick ease-standard group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5"
      />
    </Link>
  );
}
