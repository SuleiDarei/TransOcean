"use client";

import { homepage } from "@/content/homepage";
import { locations } from "@/content/network";
import { services } from "@/content/services";
import { Container } from "@/components/layout/Container";
import { Col, Grid } from "@/components/layout/Grid";
import { Display, Text } from "@/components/primitives/Type";
import { SeaBackground } from "@/components/ui/SeaBackground";
import { phProps } from "@/lib/phProps";
import { omanMap } from "@/lib/network/oman";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

function serviceNames(slugs: string[]): string[] {
  return slugs.map((slug) => services.find((service) => service.slug === slug)?.name).filter((name): name is string => Boolean(name));
}

export function CoastNetwork({
  heading = homepage.network.heading,
  headingLevel = "h2",
  intro = homepage.network.intro,
  embedded = false,
}: {
  heading?: string;
  headingLevel?: "h1" | "h2";
  intro?: string;
  embedded?: boolean;
}) {
  const [selectedId, setSelectedId] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const reduced = useReducedMotion() === true;
  const selected = locations.find((location) => location.id === selectedId) ?? null;
  const showFootnote = locations.some((location) => location.meta.placeholder);

  useEffect(() => {
    const id = window.location.hash.replace("#loc-", "");
    if (locations.some((location) => location.id === id)) setSelectedId(id);
  }, []);

  function select(id: string) {
    const next = selectedId === id ? "" : id;
    setSelectedId(next);
    const hash = next ? `#loc-${next}` : "";
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
  }

  return (
    <section
      className={embedded ? "relative text-water" : "surface-ink relative isolate overflow-hidden bg-ink text-water"}
      style={embedded ? undefined : { paddingBlock: 160 }}
      aria-labelledby="coast-title"
    >
      {embedded ? null : <SeaBackground variant="deep" coast />}
      <Container className="relative">
        <Grid className="items-end">
          <Col span={4} md={8} lg={7}>
            <Display id="coast-title" as={headingLevel} lines={[heading]} variant="l" meta={homepage.network.meta} />
          </Col>
          <Col span={4} lg={4} lgStart={9} className="mt-8 lg:mt-0">
            <Text variant="lead" className="text-[color:var(--on-dark-2)]" meta={homepage.network.meta}>
              {intro}
            </Text>
          </Col>
        </Grid>

        <div className="mt-16 lg:grid lg:grid-cols-12" style={{ columnGap: "var(--gutter)" }}>
          <div className="lg:col-span-8">
            {/* role="group", not "img": the markers inside are interactive. */}
            <svg viewBox={omanMap.viewBox} className="h-auto max-h-[70svh] w-full lg:max-h-[80svh]" role="group" aria-labelledby="coast-map-title">
              <title id="coast-map-title">Map of Oman&apos;s coastline with sample operating locations</title>
              <defs>
                <linearGradient id="land-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8DFC4" />
                  <stop offset="100%" stopColor="#D9CFAE" />
                </linearGradient>
              </defs>
              <mask id="coast-water">
                <rect width="1000" height="1254.9" fill="#fff" />
                <path d={omanMap.land} fill="#000" />
              </mask>
              <g mask="url(#coast-water)" fill="none" stroke="var(--water)" strokeLinejoin="round">
                <path d={omanMap.land} strokeWidth="22" strokeOpacity="0.07" />
                <path d={omanMap.land} strokeWidth="54" strokeOpacity="0.045" />
                <path
                  className="coast-bath--move"
                  d="M980 160 C 930 380, 1010 640, 860 900 S 640 1180, 280 1120"
                  strokeWidth="1.4"
                  strokeOpacity="0.12"
                />
              </g>
              <path d={omanMap.land} fill="url(#land-fill)" />
              <path
                d={omanMap.land}
                fill="none"
                stroke="rgba(243, 245, 242,0.35)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
              />
              {selected ? (
                <path
                  key={selected.id}
                  d={omanMap.segments[selected.id as keyof typeof omanMap.segments]}
                  fill="none"
                  stroke="var(--light-on-dark)"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={reduced ? 0 : 1}
                  style={reduced ? undefined : { animation: "coast-draw 600ms var(--ease-move) forwards" }}
                />
              ) : null}
              {omanMap.labels.map((label) => {
                const gulf = label.id === "gulf";
                return (
                  <text
                    key={label.id}
                    x={gulf ? label.x - 10 : label.x}
                    y={gulf ? label.y - 14 : label.y}
                    fill="rgba(243, 245, 242,0.72)"
                    className="map-label t-label"
                    textAnchor={label.x > 750 ? "end" : "start"}
                  >
                    {label.text}
                  </text>
                );
              })}
              <g>
                {locations.map((location) => {
                  const marker = omanMap.markers[location.id as keyof typeof omanMap.markers];
                  if (!marker) return null;
                  const on = location.id === selected?.id;
                  const preview = previewId === location.id && !on;
                  return (
                    <g
                      key={location.id}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={location.name}
                      aria-pressed={on}
                      onClick={() => select(location.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          select(location.id);
                        }
                      }}
                    >
                      <rect x={marker.x - 18} y={marker.y - 18} width="36" height="36" fill="transparent" />
                      {on && !reduced ? (
                        <rect
                          key={selectedId}
                          className="pin-ring"
                          x={marker.x - 5}
                          y={marker.y - 5}
                          width="10"
                          height="10"
                          fill="none"
                          stroke="var(--light-on-dark)"
                          strokeWidth="1.5"
                        />
                      ) : null}
                      {preview && !reduced ? (
                        <rect
                          className="pin-ring--hold"
                          x={marker.x - 5}
                          y={marker.y - 5}
                          width="10"
                          height="10"
                          fill="none"
                          stroke="var(--light-on-dark)"
                          strokeWidth="1.5"
                        />
                      ) : null}
                      {on ? (
                        <rect x={marker.x - 5} y={marker.y - 5} width="10" height="10" fill="var(--water)" />
                      ) : (
                        <rect x={marker.x - 3} y={marker.y - 3} width="6" height="6" fill="var(--light-on-dark)" />
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
            {showFootnote ? (
              <p className="t-small mt-6 max-w-measure text-[color:var(--on-dark-2)]" data-placeholder="true">
                {homepage.network.footnote}
              </p>
            ) : null}
          </div>

          <div className="mt-10 lg:col-span-4 lg:mt-0">
            <ul className="loc-list">
              {locations.map((location) => {
                const on = location.id === selected?.id;
                return (
                  <li key={location.id}>
                    <button
                      type="button"
                      className="loc"
                      aria-expanded={on}
                      onClick={() => select(location.id)}
                      onMouseEnter={() => setPreviewId(location.id)}
                      onMouseLeave={() => setPreviewId(null)}
                      onFocus={() => setPreviewId(location.id)}
                      onBlur={() => setPreviewId(null)}
                    >
                      <span className="loc__name">{location.name}</span>
                    </button>
                    <div className="loc__drop" data-open={on ? "true" : "false"}>
                      <div className="loc__drop-inner" {...phProps(location.meta)}>
                        {location.meta.placeholder ? (
                          <p className="t-label" style={{ color: "var(--light-on-dark)" }}>
                            {homepage.network.sampleLabel}
                          </p>
                        ) : null}
                        <p className="t-heading-s mt-4 text-[color:var(--on-dark-2)]">{location.role}</p>
                        <p className="t-body mt-6">{location.description}</p>
                        <p className="t-label mt-8">Services here</p>
                        <ul className="mt-3 space-y-2">
                          {serviceNames(location.serviceSlugs).map((name) => (
                            <li key={name} className="t-small">
                              {name}
                            </li>
                          ))}
                        </ul>
                        <p className="t-body mt-6 nums">{location.contact}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
