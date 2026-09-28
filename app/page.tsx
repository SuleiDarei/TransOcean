import { ContactSection } from "@/components/sections/ContactSection/ContactSection";
import { HeroWaterline } from "@/components/sections/HeroWaterline";
import { PeopleInterlude } from "@/components/sections/PeopleInterlude";
import { Statement } from "@/components/sections/Statement";
import { seo } from "@/content/seo";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PortCallSequence = dynamic(() =>
  import("@/components/sections/PortCallSequence/PortCallSequence").then((mod) => mod.PortCallSequence),
);
const ServicesIndex = dynamic(() =>
  import("@/components/sections/ServicesIndex/ServicesIndex").then((mod) => mod.ServicesIndex),
);
const DuskBand = dynamic(() => import("@/components/sections/DuskBand").then((mod) => mod.DuskBand));

const LazyNetwork = dynamic(() => import("@/components/sections/CoastNetwork/CoastNetwork").then((mod) => mod.CoastNetwork));
const LazyVessels = dynamic(() => import("@/components/sections/VesselScale/VesselScale").then((mod) => mod.VesselScale));

export const metadata: Metadata = {
  title: { absolute: seo.homeTitle },
  description: seo.homeDescription,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroWaterline />
      <Statement />
      <PortCallSequence />
      <ServicesIndex />
      <LazyVessels />
      <LazyNetwork />
      <PeopleInterlude />
      <ContactSection />
      <DuskBand />
    </>
  );
}
