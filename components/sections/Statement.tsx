"use client";

import { useMotionSafe } from "@/lib/hooks/useMotionSafe";

import { homepage } from "@/content/homepage";
import { SeaBackground } from "@/components/ui/SeaBackground";
import { phProps } from "@/lib/phProps";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const easeOut = [0.2, 0.7, 0.1, 1] as const;
const easeDraw = [0.65, 0, 0.35, 1] as const;

function Word({ p, i, n, children }: { p: MotionValue<number>; i: number; n: number; children: string }) {
  const start = i / (n + 4);
  const end = Math.min(1, (i + 5) / (n + 4));
  const opacity = useTransform(p, [start, end], [0.16, 1]);
  return (
    <m.span style={{ opacity }} className="order__word">
      {children}{" "}
    </m.span>
  );
}

function OrderStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = !useMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className="order__text">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) =>
          reduce ? (
            <span key={i}>{word} </span>
          ) : (
            <Word key={i} p={scrollYProgress} i={i} n={words.length}>
              {word}
            </Word>
          ),
        )}
      </span>
    </p>
  );
}

export function Statement() {
  const reduced = !useMotionSafe();
  const [statement, caption] = homepage.statement.paragraphs;

  return (
    <section className="order text-water" aria-labelledby="statement-title">
      <SeaBackground variant="night" />
      <div className="order__content" {...phProps(homepage.statement.meta)}>
        <h2 id="statement-title" className="sr-only">
          What an agent does
        </h2>
        <m.div
          className="order__line"
          aria-hidden="true"
          initial={reduced ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: reduced ? 0 : 0.9, ease: easeDraw }}
        />
        <OrderStatement text={statement} />
        <m.p
          className="order__caption"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.2, ease: easeOut }}
        >
          {caption}
        </m.p>
      </div>
    </section>
  );
}
