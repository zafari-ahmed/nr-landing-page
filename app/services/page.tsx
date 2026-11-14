import type { Metadata } from "next";
import ServicesSection from "@/components/sections/ServicesSection";
import { siteConfig } from "@/lib/site-config";

const title = "Airport Construction & Civil Engineering Services";
const description =
  "Runway and taxiway construction, terminal buildings, navigation and communication systems, civil engineering, and airport maintenance services from NR & Associates.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
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
