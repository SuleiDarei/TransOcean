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
      <nav aria-label="Services" className="svc-index sticky top-32 hidden flex-col gap-1 lg:flex">
        {services.map((service) => (
          <a key={service.slug} href={`#service-${service.slug}`} className="t-body" aria-current={active === service.slug ? "true" : undefined}>
            {service.name}
          </a>
        ))}
      </nav>
      <details className="svc-jump mb-10 lg:hidden">
        <summary className="t-body">{servicesPage.jump}</summary>
        <div className="svc-jump__list">
          {services.map((service) => (
            <a key={service.slug} href={`#service-${service.slug}`} className="t-body">
              {service.name}
            </a>
          ))}
        </div>
      </details>
    </>
  );
}
