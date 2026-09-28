import { contactContent } from "@/content/contact";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/layout/Container";
import { Col, Grid } from "@/components/layout/Grid";
import { Display, Text } from "@/components/primitives/Type";
import { ContactForm } from "./ContactForm";

export function ContactSection({ urgent = false, heading = "h2" }: { urgent?: boolean; heading?: "h1" | "h2" }) {
  return (
    <section id="contact" className="contact-seam bg-water pt-40 text-ink" aria-labelledby="contact-title">
      <Container>
        <Grid>
          <Col span={4} lg={6}>
            <Display id="contact-title" as={heading} lines={homepage.contact.lines} variant="l" meta={homepage.contact.meta} />
            <Text variant="lead" className="mt-8 text-slate" meta={homepage.contact.meta}>
              {homepage.contact.sub}
            </Text>
            {urgent ? (
              <p className="t-body mt-8" data-placeholder="true">
                {contactContent.urgent}
              </p>
            ) : null}
            <dl className="mt-16 hidden grid-cols-2 gap-8 lg:grid">
              {contactContent.details.map((detail) => (
                <ContactDetail key={detail.label} {...detail} />
              ))}
            </dl>
          </Col>
          <Col span={4} lg={5} lgStart={8} className="mt-12 lg:mt-0">
            <ContactForm />
          </Col>
          <Col span={4} className="mt-16 lg:hidden">
            <dl className="grid gap-8">
              {contactContent.details.map((detail) => (
                <ContactDetail key={detail.label} {...detail} />
              ))}
            </dl>
          </Col>
        </Grid>
      </Container>
    </section>
  );
}

function ContactDetail({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div data-placeholder="true">
      <dt className="t-label">{label}</dt>
      <dd className="t-body mt-2">{href ? <a href={href}>{value}</a> : value}</dd>
    </div>
  );
}
