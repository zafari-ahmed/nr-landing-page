import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  RadioTower,
  Plane,
  ShieldCheck,
  Workflow,
  Building,
  Building2,
  FileCheck,
  Cog,
  Menu,
  X,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aerotech Global Services — Aviation Infrastructure" },
      {
        name: "description",
        content:
          "AGS delivers end-to-end airport infrastructure: navaid equipment supply, installation, and flight operations support for multinationals, enterprises, and governments worldwide.",
      },
      { property: "og:title", content: "Aerotech Global Services — Aviation Infrastructure" },
      {
        property: "og:description",
        content:
          "Built for aviation. Trusted by industry. ICAO-compliant navaid systems and end-to-end airport infrastructure.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  component: Index,
});

// Background image URLs (Unsplash — free aviation imagery)
const BG_ABOUT =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80";
const BG_SERVICES =
  "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=2000&q=80";
const BG_WHY =
  "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=2000&q=80";
const HERO_VIDEO_PRIMARY =
  "https://assets.mixkit.co/videos/preview/mixkit-airplane-taking-off-at-night-1498-large.mp4";
const HERO_VIDEO_FALLBACK =
  "https://assets.mixkit.co/videos/preview/mixkit-view-of-a-plane-landing-on-a-runway-at-night-40523-large.mp4";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`ags-reveal ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3 group">
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center font-black tracking-tight text-sm ${
          dark ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        AGS
      </span>
      <span
        className={`hidden sm:inline text-base font-bold tracking-tight ${
          dark ? "text-white" : "text-black"
        }`}
      >
        Aerotech Global Services
      </span>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#why", label: "Why Us" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white transition-shadow ${
        scrolled
          ? "border-b border-black/10 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-black/70 hover:text-black transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#1a1a1a] transition-colors"
          >
            Get Started <ArrowRight size={14} />
          </a>
        </nav>
        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 -mr-2 text-black"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-black/80 border-b border-black/5"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative bg-black text-white overflow-hidden pt-16">
      {/* YouTube background video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <iframe
          src="https://www.youtube.com/embed/UEN3pBAbDT0?autoplay=1&mute=1&loop=1&playlist=UEN3pBAbDT0&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=0"
          allow="autoplay; encrypted-media"
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "177.78vh",
            minWidth: "100%",
            height: "56.25vw",
            minHeight: "100%",
            border: "none",
            pointerEvents: "none",
          }}
        />
      </div>
      {/* Dark gradient overlay (sits above the video) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.60) 100%)",
        }}
        aria-hidden
      />


      {/* subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 md:py-40">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-6">
            Aerotech Global Services
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] max-w-5xl">
            Built for Aviation. Trusted by Industry.
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-8 text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed">
            AGS delivers end-to-end airport infrastructure — from precision navigation systems to
            operational support. Wherever airports need to be built, equipped, or certified, we're
            the team that makes it happen.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-white text-black font-semibold px-7 py-4 text-sm hover:bg-white/90 transition-colors"
            >
              Explore Our Services <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/80 text-white font-semibold px-7 py-4 text-sm hover:bg-white hover:text-black transition-colors"
            >
              Contact Us
            </a>
          </div>
        </Reveal>
      </div>

      <div className="relative h-px bg-white/20" aria-hidden />
    </section>
  );
}

function About() {
  const stats = [
    { value: "35+", label: "Years of Experience" },
    { value: "10+", label: "Projects Delivered" },
    { value: "100%", label: "ICAO Standard Compliance" },
  ];
  return (
    <section id="about" className="relative bg-white text-black overflow-hidden">
      {/* Subtle background image */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url(${BG_ABOUT})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-black/50 mb-6">01 — About</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              Who We Are
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg text-black/70 leading-relaxed">
              Aerotech Global Services is a specialized aviation infrastructure firm with over
              three decades of experience. We serve multinational corporations, local enterprises,
              and government bodies — providing turnkey solutions that span equipment supply,
              installation, commissioning, and full operational support, all built to international
              standards.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid sm:grid-cols-3 gap-px bg-black">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="bg-black text-white p-10 md:p-12 h-full">
                <div className="text-5xl md:text-6xl font-black tracking-tight">{s.value}</div>
                <div className="mt-3 text-sm uppercase tracking-[0.2em] text-white/60">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clients() {
  const clients = [
    { name: "MCC", sub: "Overseas" },
    { name: "CAA", sub: "Pakistan" },
    { name: "ICAO", sub: "International" },
    { name: "Meraj Airlines", sub: "" },
    { name: "UCSI", sub: "" },
    { name: "Barrick Gold", sub: "" },
  ];
  const loop = [...clients, ...clients];
  return (
    <section className="bg-[#111111] text-white border-y border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">
              Trusted By Industry Leaders
            </h2>
            <p className="mt-4 text-sm md:text-base text-white/60 max-w-xl mx-auto">
              Working alongside leading organizations in aviation and infrastructure.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="ags-marquee-track flex items-center gap-16">
            {loop.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="flex items-baseline gap-2 px-8 py-4 border border-white/15 shrink-0"
                style={{ filter: "grayscale(100%) brightness(200%)" }}
              >
                <span className="text-2xl md:text-3xl font-black tracking-tight text-white">
                  {c.name}
                </span>
                {c.sub && (
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">{c.sub}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  number,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  number: string;
}) {
  return (
    <div className="group border border-white/20 bg-black/40 text-white p-10 md:p-12 transition-all duration-300 hover:bg-white hover:text-black hover:border-white cursor-default h-full flex flex-col">
      <div className="flex items-center justify-between mb-10">
        <div className="h-14 w-14 grid place-items-center border border-white/30 group-hover:border-black/30 transition-colors">
          {icon}
        </div>
        <span className="text-xs font-mono tracking-widest text-white/40 group-hover:text-black/40">
          {number}
        </span>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">{title}</h3>
      <p className="mt-6 text-base leading-relaxed text-white/70 group-hover:text-black/70 transition-colors flex-1">
        {description}
      </p>
      <div className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">
        Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}

function Services() {
  const services = [
    {
      number: "/ 01",
      icon: <RadioTower size={26} />,
      title: "Navaid Equipment Supply & Installation",
      description:
        "We supply, install, and commission internationally certified navigation aids including Instrument Landing Systems (ILS), Non-Directional Beacons (NDB), Precision Approach Path Indicators (PAPI), and more — ensuring airports meet ICAO standards.",
    },
    {
      number: "/ 02",
      icon: <Building2 size={26} />,
      title: "Airport Design & Operational Consulting",
      description:
        "From initial feasibility and airfield design to full operational consulting, AGS guides airports through every phase of development — ensuring every element, from taxiways to terminal infrastructure, is compliant with ICAO standards from day one.",
    },
    {
      number: "/ 03",
      icon: <FileCheck size={26} />,
      title: "Airstrip Certification & Licensing",
      description:
        "We specialize in navigating the regulatory process to obtain airstrip licenses, operational permits, and certifications from relevant civil aviation authorities. Our team handles documentation, inspections, and compliance so you can focus on operations.",
    },
    {
      number: "/ 04",
      icon: <Plane size={26} />,
      title: "Flight Operations & Airline Partnerships",
      description:
        "AGS supports air transfer operations by facilitating partnerships between airport operators and airlines. We assist in establishing route structures, ground handling frameworks, and operational procedures that meet regulatory requirements and enable commercial aviation activity.",
    },
  ];
  return (
    <section id="services" className="relative bg-[#111111] text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url(${BG_SERVICES})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#111111]/70" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">02 — Services</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl">
            Our Services
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-2xl">
            Four core practices, engineered to bring airports online and keep them running at
            international standards.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={100 + i * 100}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    {
      icon: <ShieldCheck size={24} />,
      title: "ICAO Compliant & Globally Recognized",
      desc: "All our equipment, installations, and services conform to ICAO standards — the globally recognized benchmark for safe and efficient civil aviation.",
    },
    {
      icon: <Workflow size={24} />,
      title: "End-to-End Delivery",
      desc: "From initial assessment and equipment procurement through installation, commissioning, certification, and ongoing support — we own every stage of the project so nothing falls through the cracks.",
    },
    {
      icon: <Building size={24} />,
      title: "Trusted by Multinationals",
      desc: "AGS has been the aviation infrastructure partner of choice for leading multinational corporations and industry bodies operating in complex, demanding environments.",
    },
    {
      icon: <Cog size={24} />,
      title: "Technical Excellence",
      desc: "Our team brings deep technical expertise in avionics, airfield systems, and regulatory compliance — ensuring every project is delivered with precision, on spec, and on time.",
    },
  ];
  return (
    <section id="why" className="relative bg-white text-black overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url(${BG_WHY})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-black/50 mb-6">03 — Advantage</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
            Why AGS?
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 gap-px bg-black/10">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <div className="bg-white p-10 md:p-12 h-full hover:bg-black hover:text-white transition-colors duration-300 group">
                <div className="h-12 w-12 grid place-items-center border border-black group-hover:border-white transition-colors">
                  {it.icon}
                </div>
                <h3 className="mt-8 text-xl md:text-2xl font-bold tracking-tight">{it.title}</h3>
                <p className="mt-3 text-base text-black/70 group-hover:text-white/70 leading-relaxed transition-colors">
                  {it.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  };
  return (
    <section id="contact" className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">04 — Contact</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              Get In Touch
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-md">
              Ready to discuss your airport infrastructure project? Reach out to our team and we'll
              respond within one business day.
            </p>

            <div className="mt-12 space-y-6">
              <a
                href="mailto:info@aerotechglobalservices.com"
                className="flex items-center gap-4 group"
              >
                <span className="h-12 w-12 grid place-items-center border border-white/30 group-hover:bg-white group-hover:text-black transition-colors">
                  <Mail size={18} />
                </span>
                <span>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/50">Email</div>
                  <div className="text-base font-semibold">info@aerotechglobalservices.com</div>
                </span>
              </a>
              <a href="tel:+923312326877" className="flex items-center gap-4 group">
                <span className="h-12 w-12 grid place-items-center border border-white/30 group-hover:bg-white group-hover:text-black transition-colors">
                  <Phone size={18} />
                </span>
                <span>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/50">Phone</div>
                  <div className="text-base font-semibold">+92 331 2326877</div>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form onSubmit={onSubmit} className="border border-white/20 p-8 md:p-10 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white text-base resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black font-semibold py-4 text-sm hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                {sent ? "Message Sent" : "Send Message"} <ArrowRight size={14} />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <Logo dark />
        <p className="text-sm text-white/50">
          © 2025 Aerotech Global Services. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm text-white/60">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="bg-white">
      <Nav />
      <main>
        <Hero />
        <About />
        <Clients />
        <Services />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
