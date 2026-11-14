import type { Metadata } from "next";
import ClientsSection from "@/components/sections/ClientsSection";
import { siteConfig, keywordSets, ogDefaults } from "@/lib/site-config";

const title = "Our Clients | Trusted Aviation & Mining Partners";
const description =
  "NR & Associates is trusted by leading aviation authorities and mining organizations including PAA, MCC, KMC, Barrick Gold, and Reko Diq.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    ...keywordSets.mining,
    ...keywordSets.core,
    ...keywordSets.local,
  ],
  alternates: {
    canonical: "/clients",
  },
  openGraph: {
    ...ogDefaults,
    url: `${siteConfig.url}/clients`,
    title,
    description,
  },
};

export default function ClientsPage() {
  return (
    <div className="pt-16 md:pt-20">
      <ClientsSection headingLevel="h1" />
    </div>
  );
}
