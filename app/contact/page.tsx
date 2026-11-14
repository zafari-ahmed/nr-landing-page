import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { siteConfig, keywordSets, ogDefaults } from "@/lib/site-config";

const title = "Contact Us | Airport & Airstrip Construction Quotes";
const description =
  "Contact NR & Associates in Karachi for airport, runway and private airstrip construction enquiries. Call +92-300-2252080 or send us a message.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    ...keywordSets.local,
    ...keywordSets.airstrip,
    ...keywordSets.core,
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    ...ogDefaults,
    url: `${siteConfig.url}/contact`,
    title,
    description,
  },
};

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-20">
      <ContactSection headingLevel="h1" />
    </div>
  );
}
