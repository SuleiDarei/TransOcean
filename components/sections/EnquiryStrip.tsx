import { contactContent } from "@/content/contact";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";
import { Field } from "@/components/ui/Field";
import { phProps } from "@/lib/phProps";

/**
 * The three facts an agent needs first, asked on every page's end.
 * A plain GET form: the values land in the full contact form's query string,
 * so nothing is typed twice and no JavaScript is required here.
 */
export function EnquiryStrip({ service }: { service?: string }) {
  return (
    <section className="enquiry" aria-labelledby="enquiry-title">
      <Container>
        <div className="enquiry__panel">
          <h2 id="enquiry-title" className="t-display-m max-w-[18ch]" {...phProps(homepage.contact.meta)}>
            {homepage.contact.lines.join(" ")}
          </h2>
          <form action="/contact" method="get" className="enquiry__form">
            {service ? <input type="hidden" name="service" value={service} /> : null}
            <Field id="strip-vessel" label={contactContent.fields.vessel}>
              <input id="strip-vessel" name="vessel" type="text" autoComplete="off" className="field__input" />
            </Field>
            <Field id="strip-port" label={contactContent.fields.port} chevron>
              <select id="strip-port" name="port" className="field__input" defaultValue="">
                <option value="">Select a port</option>
                {contactContent.ports.map((port) => (
                  <option key={port} value={port}>
                    {port}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="strip-arrival" label={contactContent.fields.arrival}>
              <input id="strip-arrival" name="arrival" type="date" className="field__input" />
            </Field>
            <Button type="submit" variant="primary" className="enquiry__submit">
              {homepage.hero.cta}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
