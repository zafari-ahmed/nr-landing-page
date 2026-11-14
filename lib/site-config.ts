export const siteConfig = {
  name: "NR & Associates",
  legalName: "NR & Associates",
  description:
    "Leading construction company specializing in civil engineering, airport construction, and runway development. Building the future of aviation infrastructure with quality and expertise.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nr-associates.com",
  phone: "+92-300-2252080",
  email: "admin@nr-associates.com",
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
