import { seo } from "@/content/seo";
import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/primitives/TextLink";

export default function NotFound() {
  return (
    <section className="bg-limestone text-night">
      <Container className="pb-32 pt-[calc(var(--nav-h)+96px)]">
        <h1 className="t-display-xl">{seo.notFound.title}</h1>
        <p className="t-lead mt-8 max-w-measure text-slate">{seo.notFound.body}</p>
        <div className="mt-10 flex flex-col items-start gap-4">
          {seo.notFound.links.map((link) => (
            <TextLink key={link.href} href={link.href}>
              {link.label}
            </TextLink>
          ))}
        </div>
      </Container>
    </section>
  );
}
