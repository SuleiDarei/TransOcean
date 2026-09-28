"use client";

import { services, servicesPage } from "@/content/services";
import { useEffect, useState } from "react";

export function ServicesStickyIndex() {
  const [active, setActive] = useState(services[0]?.slug ?? "");

  useEffect(() => {
    const nodes = services
      .map((service) => document.getElementById(`service-${service.slug}`))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (!hit) return;
        setActive(hit.target.id.replace("service-", ""));
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0.1 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav aria-label="Services" className="sticky top-32 hidden flex-col gap-3 lg:flex">
        {services.map((service) => (
          <a key={service.slug} href={`#service-${service.slug}`} className={active === service.slug ? "t-body text-ink" : "t-body text-slate"}>
            {service.name}
          </a>
        ))}
      </nav>
      <details className="mb-10 border px-4 py-3 lg:hidden" style={{ borderColor: "var(--rule-light)" }}>
        <summary className="t-body cursor-pointer">{servicesPage.jump}</summary>
        <div className="mt-4 grid gap-3">
          {services.map((service) => (
            <a key={service.slug} href={`#service-${service.slug}`} className="t-body inline-flex min-h-11 items-center">
              {service.name}
            </a>
          ))}
        </div>
      </details>
    </>
  );
}
