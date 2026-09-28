import { contactContent } from "@/content/contact";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/layout/Container";
import { Col, Grid } from "@/components/layout/Grid";
import { Display, Label, Text } from "@/components/primitives/Type";
import { ContactForm } from "./ContactForm";

export function ContactSection({ urgent = false }: { urgent?: boolean }) {
  const startedAt = String(Date.now());
  return (
    <section id="contact" className="contact-seam bg-limestone pt-40 text-night" aria-labelledby="contact-title">
      <Container>
        <Grid>
          <Col span={4} lg={6}>
            <Display id="contact-title" lines={homepage.contact.lines} variant="l" meta={homepage.contact.meta} />
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
                <div key={detail.label} data-placeholder="true">
                  <Label>{detail.label}</Label>
                  <dd className="t-body mt-2">
                    {detail.href ? <a href={detail.href}>{detail.value}</a> : detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Col>
          <Col span={4} lg={5} lgStart={8} className="mt-12 lg:mt-0">
            <ContactForm startedAt={startedAt} />
          </Col>
          <Col span={4} className="mt-16 lg:hidden">
            <dl className="grid gap-8">
              {contactContent.details.map((detail) => (
                <div key={detail.label} data-placeholder="true">
                  <Label>{detail.label}</Label>
                  <dd className="t-body mt-2">
                    {detail.href ? <a href={detail.href}>{detail.value}</a> : detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Col>
        </Grid>
      </Container>
    </section>
  );
}
