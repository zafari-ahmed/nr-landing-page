import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/clients", "/contact"];
  // next.config.mjs sets trailingSlash: true, so the canonical URL of every
  // page ends in "/". Sitemap entries must match the canonical exactly,
  // otherwise Search Console reports them as redirects / alternate pages.
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}