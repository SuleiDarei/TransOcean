import { cn } from "@/lib/cn";
import Link from "next/link";
import { Icon } from "./Icon";

type Props = {
  children: React.ReactNode;
  href?: string;
  /** `primary` is the single magenta action on a page. `surface` picks the neutral fill for light or dark backgrounds. */
  variant?: "primary" | "neutral";
  surface?: "light" | "dark";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  variant = "neutral",
  surface = "light",
  type = "button",
  disabled,
  className,
  onClick,
  ariaLabel,
}: Props) {
  const tone = variant === "primary" ? "btn--primary" : surface === "light" ? "btn--ink" : "btn--water";
  const classes = cn("btn t-button", tone, className);
  const inner = (
    <>
      <span>{children}</span>
      <Icon name="arrow" />
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
