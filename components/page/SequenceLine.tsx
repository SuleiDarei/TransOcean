import type { ServiceStep } from "@/content/types";

export function SequenceLine({ steps }: { steps: ServiceStep[] }) {
  return (
    <div>
      <ol className="hidden gap-8 lg:grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((step, index) => (
          <li key={step.title} className="relative pt-8">
            <span className="absolute left-0 top-0 h-2 w-2 bg-night" />
            {index < steps.length - 1 ? (
              <span className="absolute left-2 right-0 top-[3px] h-px bg-night" />
            ) : null}
            <p className="t-heading-s">{step.title}</p>
            {step.text ? <p className="t-small mt-3 text-slate">{step.text}</p> : null}
          </li>
        ))}
      </ol>
      <ol className="grid gap-8 border-s ps-6 lg:hidden" style={{ borderColor: "var(--rule-light)" }}>
        {steps.map((step) => (
          <li key={step.title}>
            <p className="t-heading-s">{step.title}</p>
            {step.text ? <p className="t-small mt-3 text-slate">{step.text}</p> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
