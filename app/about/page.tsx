import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import { siteConfig } from "@/lib/site-config";

const title = "About Us | Aviation Construction Experts in Pakistan";
const description =
  "30+ years of experience delivering airport terminals, runways, hangars, and navigation systems across Pakistan. Learn about NR & Associates' expertise in aviation and civil infrastructure.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
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
