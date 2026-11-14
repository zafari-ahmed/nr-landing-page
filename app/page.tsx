import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ClientsSection from "@/components/sections/ClientsSection";
import ContactSection from "@/components/sections/ContactSection";
import { siteConfig, allKeywords, ogDefaults } from "@/lib/site-config";

const title = `Airport, Terminal & Airstrip Construction | ${siteConfig.name}`;

export const metadata: Metadata = {
  title,
  description: siteConfig.description,
  keywords: allKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...ogDefaults,
    url: siteConfig.url,
    title,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ClientsSection />
      <ContactSection />
    </div>
  );
}
