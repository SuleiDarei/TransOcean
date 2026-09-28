import { CtaStrip } from "@/components/page/CtaStrip";
import { CoastNetwork } from "@/components/sections/CoastNetwork/CoastNetwork";
import { Container } from "@/components/layout/Container";
import { SeaBackground } from "@/components/ui/SeaBackground";
import { homepage } from "@/content/homepage";
import { locations, networkPage, waters } from "@/content/network";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata(networkPage.heading, homepage.network.intro, "/network");

export default function NetworkPage() {
  return (
    <>
      <section className="network-field relative isolate overflow-hidden bg-ink pt-[var(--nav-h)] text-water">
        <SeaBackground variant="deep" coast />
        <div className="relative pb-8 pt-16">
          <CoastNetwork embedded headingLevel="h1" heading={networkPage.heading} intro={homepage.network.intro} />
        </div>
        <Container className="relative pb-24">
          <div className="grid gap-10 md:grid-cols-3">
            {waters.map((water) => (
              <div key={water.id} data-placeholder="true">
                <h2 className="t-heading-s">{water.name}</h2>
                <p className="t-body mt-4 text-[color:var(--on-dark-2)]">{water.body}</p>
              </div>
            ))}
          </div>
          <table className="mt-20 w-full text-start">
            <caption className="t-label mb-4 text-start text-[color:var(--on-dark-2)]">{networkPage.tableCaption}</caption>
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--rule-dark)" }}>
                <th className="t-small py-3 text-start font-semibold">Name</th>
                <th className="t-small py-3 text-start font-semibold">Role</th>
                <th className="t-small hidden py-3 text-start font-semibold md:table-cell">Services</th>
                <th className="t-small py-3 text-start font-semibold">Contact</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id} id={`loc-${location.id}`} className="border-b" style={{ borderColor: "var(--rule-dark)" }} data-placeholder="true">
                  <td className="t-body py-4">{location.name}</td>
                  <td className="t-small py-4">{location.role}</td>
                  <td className="t-small hidden py-4 md:table-cell">
                    {location.serviceSlugs
                      .map((slug) => services.find((service) => service.slug === slug)?.name)
                      .filter(Boolean)
                      .join(", ")}
                  </td>
                  <td className="t-small nums py-4">{location.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </section>
      <CtaStrip />
    </>
  );
}
