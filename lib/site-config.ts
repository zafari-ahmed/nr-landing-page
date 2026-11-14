export const siteConfig = {
  name: "NR & Associates",
  legalName: "NR & Associates",
  description:
    "Airport, runway and airstrip construction in Karachi, Pakistan. 30+ years building runways, taxiways, hangars, private airstrips and civil infrastructure.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nr-associates.com",
  phone: "+92-300-2252080",
  email: "admin@nr-associates.com",
  // Contact form endpoint. The site is a static export, so this is the PHP
  // handler in public/ (copied to out/submit.php), not a Next.js API route.
  contactEndpoint: "/submit.php",
  address: {
    line1: "Suite # 514, 5th Floor, Marina Executive Tower, ",
    line2: "4 B, Mohammad Ali Society (M.A.C.H.S.), Karachi, Pakistan",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/nr-and-associates",
  },
  navItems: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Clients", href: "/clients" },
    { name: "Contact Us", href: "/contact" },
  ],
} as const;

// --- Open Graph defaults ----------------------------------------------------
// A page's `openGraph` REPLACES the root layout's rather than merging with it,
// so spread these into every page's openGraph block to keep og:image, og:type,
// og:site_name and og:locale on all pages.
export const ogDefaults = {
  // `as const` on type only: Next's OpenGraph type needs the literal "website"
  // but a mutable images array, so the object itself must not be `as const`.
  type: "website" as const,
  locale: "en_PK",
  siteName: siteConfig.name,
  images: [
    {
      url: "/assets/hero-airport-construction.jpg",
      width: 1920,
      height: 1080,
      alt: "NR & Associates — airport, runway and airstrip construction in Pakistan",
    },
  ],
};

// --- SEO keyword sets -------------------------------------------------------
// Grouped by search intent so each page can pull the clusters that match its
// content. Note: <meta name="keywords"> is not a Google ranking factor — these
// are kept here as the single source of truth for the terms the site targets,
// and the same vocabulary is reused in titles, descriptions, headings, alt
// text and JSON-LD, which ARE read by search engines.
export const keywordSets = {
  // Core identity — what the company is.
  core: [
    "airport construction",
    "runway construction",
    "airstrip construction",
    "aviation construction",
    "civil engineering construction",
    "aviation infrastructure",
    "airfield construction",
  ],
  // Airstrip / private aviation cluster.
  airstrip: [
    "airstrip construction",
    "airstrips",
    "private airstrip",
    "private airstrips",
    "private airstrip construction",
    "private runway construction",
    "private runways",
    "airstrip design and construction",
    "airstrip maintenance",
    "airstrip lighting",
    "airstrip resurfacing",
    "unpaved airstrip construction",
    "gravel airstrip construction",
    "remote airstrip construction",
    "helipad construction",
  ],
  // Mining and remote-site aviation — matches the Reko Diq / Barrick work.
  mining: [
    "mining airstrip construction",
    "mine site airstrip",
    "industrial airstrip construction",
    "remote site aviation infrastructure",
    "fly-in fly-out airstrip",
  ],
  // Location / local search.
  local: [
    "airstrips in Karachi",
    "airstrip construction in Karachi",
    "airport construction company in Karachi",
    "runway construction Karachi",
    "civil engineering company in Karachi",
    "construction company in Karachi",
    "aviation construction Pakistan",
    "airport contractors Pakistan",
    "runway contractors Pakistan",
    "airport construction Sindh",
    "airport construction Balochistan",
  ],
  // Service-level terms.
  services: [
    "runway development",
    "runway resurfacing",
    "runway rehabilitation",
    "taxiway construction",
    "apron construction",
    "aircraft hangar construction",
    "hangar construction company",
    "control tower construction",
    "terminal building construction",
    "airport lighting installation",
    "PAPI lights installation",
    "runway edge lighting",
    "navigational aids installation",
    "NDB installation",
    "airport maintenance contractor",
    "airfield pavement",
    "earthwork and site grading",
  ],
  // Terminals and airport buildings.
  terminals: [
    "airport terminal construction",
    "terminal building construction",
    "mini terminal construction",
    "airport building construction",
    "aircraft hangar construction",
    "control tower construction",
    "ATC tower construction",
    "airport fire station construction",
  ],
  // Navigation aids, lighting and communication systems.
  navigation: [
    "airport navigation systems",
    "navigational aids installation",
    "navaid installation and commissioning",
    "NDB installation",
    "non-directional beacon installation",
    "PAPI lights installation",
    "runway edge lighting",
    "airfield ground lighting",
    "aviation lighting systems",
    "weather station installation",
    "AWOS installation",
    "RT sets installation",
    "air-ground radio installation",
    "airport communication systems",
  ],
  // Airport-wide / umbrella terms.
  airport: [
    "airport infrastructure construction",
    "aviation infrastructure development",
    "aerodrome construction",
    "airfield infrastructure",
    "airport civil works",
    "airside works",
    "airport rehabilitation",
  ],
  // Compliance and trust signals.
  compliance: [
    "ICAO compliant runway construction",
    "ICAO Annex 14 compliance",
    "PCAA approved airport contractor",
    "CAA approved construction company",
    "aerodrome licensing support",
    "airport feasibility study Pakistan",
    "aviation infrastructure consultant Pakistan",
  ],
} as const;

// Clusters overlap by design (e.g. "runway edge lighting" is both a service
// and a navigation term), so always compose page keywords through this helper
// rather than spreading the arrays directly — otherwise the rendered
// <meta name="keywords"> ends up with duplicate terms.
export const mergeKeywords = (
  ...sets: readonly (readonly string[])[]
): string[] => Array.from(new Set(sets.flat()));

// De-duplicated union of every cluster, for the home page.
export const allKeywords: string[] = mergeKeywords(
  ...Object.values(keywordSets)
);
