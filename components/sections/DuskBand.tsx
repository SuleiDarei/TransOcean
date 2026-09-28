"use client";

import { homepage } from "@/content/homepage";
import { Button } from "@/components/primitives/Button";
import Image from "next/image";

export function DuskBand() {
  return (
    <section className="cta-ship" aria-label={homepage.hero.cta}>
      <div className="cta-ship__field" aria-hidden="true">
        <Image
          src="/media/bands/gm-cta.jpg"
          alt=""
          fill
          sizes="100vw"
          className="cta-ship__img object-cover"
          style={{ objectPosition: "center 100%" }}
        />
      </div>
      <div className="cta-ship__bar">
        <p className="cta-ship__line">{homepage.contact.lines.join(" ")}</p>
        <Button href="/contact" surface="dark">
          {homepage.hero.cta}
        </Button>
      </div>
    </section>
  );
}
