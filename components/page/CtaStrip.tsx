import { aboutContent } from "@/content/about";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/primitives/Icon";
import Link from "next/link";

export function CtaStrip() {
  return (
    <div className="bg-limestone">
      <Container>
        <Link href="/contact" className="group flex items-center justify-between gap-6 border-t py-10" style={{ borderColor: "var(--rule-light)" }}>
          <span className="t-heading-s">{aboutContent.cta}</span>
          <Icon name="arrow" className="transition-transform duration-quick ease-standard group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </Container>
    </div>
  );
}
