import { menuCopy } from "@/content/navigation";

export function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:bg-night focus:px-4 focus:py-3 focus:text-limestone"
    >
      {menuCopy.skip}
    </a>
  );
}
