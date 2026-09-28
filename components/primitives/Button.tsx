import { cn } from "@/lib/cn";
import Link from "next/link";
import { Icon } from "./Icon";

type Props = {
  children: React.ReactNode;
  href?: string;
  surface?: "light" | "dark";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

const pieces = [
  "polygon(0 0, 44% 0, 36% 34%, 14% 62%, 0 48%)",
  "polygon(42% 0, 70% 0, 76% 40%, 50% 54%, 34% 32%)",
  "polygon(68% 0, 100% 0, 100% 46%, 80% 36%, 74% 38%)",
  "polygon(0 46%, 16% 60%, 12% 100%, 0 100%)",
  "polygon(14% 58%, 52% 52%, 56% 100%, 10% 100%)",
  "polygon(50% 50%, 78% 36%, 100% 44%, 100% 100%, 54% 100%)",
];

const cracks = [
  "M50 52 L36 34 L44 0",
  "M50 52 L76 40 L70 0",
  "M50 52 L16 60 L0 48",
  "M50 52 L56 100",
  "M50 52 L100 46",
  "M36 34 L14 62",
];

export function Button({
  children,
  href,
  surface = "light",
  type = "button",
  disabled,
  className,
  onClick,
  ariaLabel,
}: Props) {
  const classes = cn("btn group t-button", surface === "light" ? "btn--light" : "btn--dark", className);
  const inner = (
    <>
      <span className="btn__plate" aria-hidden="true">
        {pieces.map((clip, index) => (
          <span key={clip} className={`btn__piece btn__piece--${index + 1}`} style={{ clipPath: clip }} />
        ))}
        <span className="btn__cover" />
        <svg className="btn__cracks" viewBox="0 0 100 100" preserveAspectRatio="none">
          {cracks.map((d, index) => (
            <path key={d} d={d} pathLength={1} style={{ transitionDelay: `${0.04 + index * 0.045}s` }} />
          ))}
        </svg>
      </span>
      <span className="relative z-[2]">{children}</span>
      <Icon
        name="arrow"
        className="relative z-[2] transition-transform duration-quick ease-standard group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
      />
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
