import { legal } from "@/content/legal";
import { contentMode, hasUnapprovedContent } from "@/content/meta";
import { Container } from "@/components/layout/Container";

export function LegalDocument({ title, sections }: { title: string; sections: { heading: string; body: string }[] }) {
  const pending = contentMode() !== "strict" || hasUnapprovedContent();
  return (
    <article className="bg-water text-ink">
      <Container className="pb-24 pt-[calc(var(--nav-h)+64px)]">
        {pending ? (
          <p className="t-small mb-10 max-w-legal border px-4 py-3" data-placeholder="true" style={{ borderColor: "var(--rule-light)" }}>
            {legal.banner}
          </p>
        ) : null}
        <div className="lg:grid lg:grid-cols-12" style={{ columnGap: "var(--gutter)" }}>
          <div className="max-w-legal lg:col-span-7 lg:col-start-3">
            <h1 className="t-display-l">{title}</h1>
            <div className="mt-12 grid gap-10" data-placeholder="true">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="t-heading-s">{section.heading}</h2>
                  <p className="t-body mt-4">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
