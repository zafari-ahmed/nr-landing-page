import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import nrLogo from '@/assets/nr-logo-small.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/nr-and-associates", label: "LinkedIn" },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    // { name: "Teams", href: "#teams" },
    { name: "Clients", href: "#clients" },
    { name: "Contact", href: "#contact" }
  ];

  const services = [
    "Airport Construction",
    "Runway Development", 
    "Civil Engineering",
    "Infrastructure Planning",
    "Maintenance Services",
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <img src={nrLogo} className="footerLogo"/>
              {/*<h3 className="text-2xl font-display font-bold text-secondary mb-4">NR & Associates</h3>*/}
              {/*<p className="text-primary-foreground/80 leading-relaxed">
                Leading the future of aviation construction and civil engineering 
                with expertise, innovation, and unwavering commitment to excellence.
              </p>*/}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="text-sm">+92-300-2252080</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="text-sm">admin@nr-asscoaites.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-secondary flex-shrink-0 mt-1" />
                <span className="text-sm">Suit No. 3, 116-C 4th Floor,
Al-Murtaza Commercial Line-03, <br/>Main Khayaban-e-Iqbal,
Phase VIII, <br/>DHA, Karachi, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-primary-foreground/80 text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-display font-semibold mb-6">Stay Connected</h4>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Follow us on social media for the latest updates on our projects and industry insights.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-primary-foreground/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-primary-foreground/80 group-hover:text-primary transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Certifications */}
            {/*<div>
              <h5 className="font-display font-semibold mb-3">Certifications</h5>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <div>✓ ISO 9001:2015 Certified</div>
                <div>✓ OSHA Safety Compliant</div>
                <div>✓ Green Building Certified</div>
              </div>
            </div>*/}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/70">
              © {currentYear} NR & ASSOCIATES. All rights reserved.
            </div>
            {/*<div className="flex space-x-6">
              <button className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors duration-200">
                Terms of Service
              </button>
              <button className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors duration-200">
                Cookie Policy
              </button>
            </div>*/}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;