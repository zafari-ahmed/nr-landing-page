import type { Metadata } from "next";
import ServicesSection from "@/components/sections/ServicesSection";
import { siteConfig, keywordSets, mergeKeywords, ogDefaults } from "@/lib/site-config";

const title = "Runway, Taxiway & Airstrip Construction Services";
const description =
  "Runway, taxiway and airstrip construction, airport lighting, navigation and communication systems, civil engineering and airport maintenance services from NR & Associates.";

export const metadata: Metadata = {
  title,
  description,
  keywords: mergeKeywords(
    keywordSets.services,
    keywordSets.terminals,
    keywordSets.navigation,
    keywordSets.airport,
    keywordSets.airstrip,
    keywordSets.core,
    keywordSets.compliance
  ),
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    ...ogDefaults,
    url: `${siteConfig.url}/services`,
    title,
    description,
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-16 md:pt-20">
      <ServicesSection headingLevel="h1" />
    </div>
  );
}
