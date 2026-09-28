"use client";

import { m, useReducedMotion } from "framer-motion";

const ease = [0.2, 0.7, 0.1, 1] as const;
const draw = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, ease } } };
const rise = { hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.7, ease } } };

type Item = string | { label: string; detail?: string };

export function IncludedList({ items }: { items: Item[] }) {
  const reduce = useReducedMotion() === true;
  const rows = items.map((item) => (typeof item === "string" ? { label: item } : item));

  return (
    <ul className="included" role="list">
      {rows.map((item, i) => (
        <m.li
          key={item.label}
          className="included__row"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          variants={{ hidden: {}, show: { transition: { delayChildren: reduce ? 0 : i * 0.09 } } }}
        >
          <m.span className="included__rule" variants={reduce ? undefined : draw} aria-hidden="true" />
          <span className="included__idx" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>
            <span className="included__mask">
              <m.span className="included__title" variants={reduce ? undefined : rise}>
                {item.label}
              </m.span>
            </span>
            {item.detail ? <span className="included__detail">{item.detail}</span> : null}
          </span>
          <span className="included__mark" aria-hidden="true" />
          {i === rows.length - 1 ? (
            <m.span className="included__rule included__rule--end" variants={reduce ? undefined : draw} aria-hidden="true" />
          ) : null}
        </m.li>
      ))}
    </ul>
  );
}
