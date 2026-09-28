"use client";

import { company } from "@/content/company";
import { contactLink, menuCopy, navigation } from "@/content/navigation";
import { m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MenuButton } from "./MenuButton";

const links = [
  { href: "/", label: menuCopy.home },
  ...navigation,
  contactLink,
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.show();
    if (!open && dialog.open) dialog.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      className="m-0 h-[100svh] max-h-none w-full max-w-none bg-limestone p-0 text-night backdrop:bg-transparent"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="fixed inset-0 z-40 flex h-full flex-col bg-limestone" style={{ paddingInline: "var(--margin)", paddingTop: "var(--nav-h)" }}>
        <div className="absolute end-[var(--margin)] top-0 flex h-[var(--nav-h)] items-center">
          <MenuButton open onClick={onClose} controlsId="mobile-menu" />
        </div>
        <nav aria-label="Main" className="mt-8 flex flex-col items-start gap-2">
          {links.map((item, index) => (
            <m.div
              key={item.href}
              initial={false}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={item.href} className="t-display-m inline-flex min-h-14 items-center" onClick={onClose}>
                {item.label}
              </Link>
            </m.div>
          ))}
        </nav>
        <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--rule-light)" }}>
          <p className="t-body" data-placeholder="true">
            <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
          </p>
          <p className="t-body mt-2" data-placeholder="true">
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </div>
      </div>
    </dialog>
  );
}
