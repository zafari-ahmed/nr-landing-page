import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import { siteConfig, keywordSets, mergeKeywords, ogDefaults } from "@/lib/site-config";

const title = "About Us | Airport & Airstrip Construction Experts";
const description =
  "30+ years delivering airport terminals, runways, airstrips, hangars and navigation systems across Pakistan. Learn about NR & Associates' aviation and civil engineering expertise.";

export const metadata: Metadata = {
  title,
  description,
  keywords: mergeKeywords(
    keywordSets.core,
    keywordSets.airstrip,
    keywordSets.terminals,
    keywordSets.navigation,
    keywordSets.airport,
    keywordSets.local,
    keywordSets.compliance
  ),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    ...ogDefaults,
    url: `${siteConfig.url}/about`,
    title,
    description,
  },
};

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      <AboutSection headingLevel="h1" />
    </div>
  );
}
