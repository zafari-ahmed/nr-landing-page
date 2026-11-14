import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  ];

  const services = [
    "Airport Construction",
    "Runway Development",
    "Civil Engineering",
    "Infrastructure Planning",
    "Maintenance Services",
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <Image
                src="/assets/nr-logo-small.png"
                alt="NR & Associates logo"
                width={200}
                height={80}
                className="footerLogo"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="text-sm">{siteConfig.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="text-sm">{siteConfig.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-secondary flex-shrink-0 mt-1" />
                <span className="text-sm">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-display font-semibold mb-6">
              Quick Links
            </h2>
            <ul className="space-y-3">
              {siteConfig.navItems.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-lg font-display font-semibold mb-6">
              Our Services
            </h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-primary-foreground/80 text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-display font-semibold mb-6">
                Stay Connected
              </h2>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Follow us on social media for the latest updates on our
                projects and industry insights.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary-foreground/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-primary-foreground/80 group-hover:text-primary transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/70">
              &copy; {currentYear} NR & ASSOCIATES. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
