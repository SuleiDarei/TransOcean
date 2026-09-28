import { homepage } from "@/content/homepage";

const stops = [
  { href: "#port-call", label: "The port call" },
  { href: "#services", label: homepage.services.heading },
  { href: "#vessels", label: "Vessel classes" },
  { href: "#coast", label: "Our coastline" },
];

export function VoyageNav() {
  return (
    <nav className="voyage-nav" aria-label="Explore this page">
      {stops.map((stop) => (
        <a key={stop.href} href={stop.href} className="t-nav voyage-nav__link">
          {stop.label}<span aria-hidden="true">↓</span>
        </a>
      ))}
    </nav>
  );
}
