"use client";

import { contactLink, navigation } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";
import { Button } from "@/components/primitives/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuButton } from "./MenuButton";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  const { direction, scrolled } = useScrollDirection();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hidden = scrolled && direction === "down" && !open;
  const compact = scrolled && !hidden;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-water text-ink transition-transform duration-300 ease-standard",
        hidden && "-translate-y-full",
        compact && "border-b",
      )}
      style={{
        height: compact ? "var(--nav-h-compact)" : "var(--nav-h)",
        borderColor: compact ? "var(--rule-light)" : "transparent",
        transitionDuration: hidden ? "300ms" : "200ms",
      }}
    >
      <div className="mx-auto flex h-full w-full max-w-container items-center justify-between" style={{ paddingInline: "var(--margin)" }}>
        <Link href="/" aria-label="Logo" className="wordmark">
          Logo
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
          {navigation.map((item) => {
            const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn("t-nav", current && "underline decoration-2 underline-offset-8")}
                {...(item.meta.placeholder ? { "data-placeholder": "true" } : {})}
              >
                {item.label}
              </Link>
            );
          })}
          <Button href={contactLink.href} className="btn--compact">
            {contactLink.label}
          </Button>
        </nav>

        <MenuButton open={open} onClick={() => setOpen((value) => !value)} controlsId="mobile-menu" />
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
