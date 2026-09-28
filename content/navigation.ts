import { ph } from "./placeholder";
import type { NavLink } from "./types";

export const navigation: NavLink[] = [
  { href: "/about", label: "About", meta: ph("Navigation label") },
  { href: "/services", label: "Services", meta: ph("Navigation label") },
  { href: "/network", label: "Network", meta: ph("Navigation label") },
];

export const contactLink: NavLink = {
  href: "/contact",
  label: "Contact",
  meta: ph("Navigation label"),
};

export const menuCopy = {
  open: "Menu",
  close: "Close",
  skip: "Skip to content",
  home: "Home",
  meta: ph("Navigation chrome copy"),
};
