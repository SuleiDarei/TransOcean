import { aboutContent } from "@/content/about";
import { Container } from "@/components/layout/Container";
import Link from "next/link";

export function CtaStrip() {
  return (
    <div className="bg-water">
      <Container>
        <Link href="/contact" className="block border-t py-10 t-heading-s underline-offset-[8px] hover:underline" style={{ borderColor: "var(--rule-light)" }}>
          {aboutContent.cta}
        </Link>
      </Container>
    </div>
  );
}
