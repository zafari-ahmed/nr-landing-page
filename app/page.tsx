import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ClientsSection from "@/components/sections/ClientsSection";
import ContactSection from "@/components/sections/ContactSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Aviation & Civil Engineering Construction`,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: siteConfig.url,
    title: `${siteConfig.name} | Aviation & Civil Engineering Construction`,
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
