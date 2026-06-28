import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, RadioTower, FileCheck, Plane, ShieldCheck, Workflow, Building, Cog, Mail, Phone } from "lucide-react";

const IMG_HERO = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2400&q=90";
const IMG_PROJECT_RUNWAY = "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=2000&q=85";
const IMG_NAVAID = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85";
const IMG_FLIGHT_OPS = "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1600&q=85";
const IMG_TOWER = "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=1600&q=85";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aerotech Global Services ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ Aviation Infrastructure" },
      {
        name: "description",
        content:
          "AGS delivers end-to-end airport infrastructure: navaid equipment supply, installation, certification, and flight operations support for multinationals and governments worldwide.",
      },
      { property: "og:title", content: "Aerotech Global Services ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ Aviation Infrastructure" },
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

// Editorial photography (Unsplash placeholders)







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
    { href: "#projects", label: "Projects" },
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
    <section
      id="top"
      className="relative bg-black text-white overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "64px" }}
    >
      <div className="absolute inset-0">
        <img
          src={IMG_HERO}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.30) 60%, rgba(0,0,0,0.10) 100%)",
          }}
        />
      </div>

      <div
        className="relative mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-center"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-6">
            Aerotech Global Services
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.0] max-w-2xl">
            Built for Aviation.
            <br />
            Trusted by Industry.
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
            AGS delivers end-to-end airport infrastructure ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ from precision navigation systems to
            operational support. Wherever airports need to be built, equipped, or certified, we make
            it happen.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-white text-black font-semibold px-7 py-4 text-sm hover:bg-white/90 transition-colors"
            >
              View Our Work <ArrowRight size={15} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/70 text-white font-semibold px-7 py-4 text-sm hover:bg-white hover:text-black transition-colors"
            >
              Contact Us
            </a>
          </div>
        </Reveal>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))" }}
        aria-hidden
      />
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
    <section id="about" className="relative bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-black/50 mb-6">01 ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ About</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              Who We Are
            </h2>
            <p className="mt-8 text-lg text-black/70 leading-relaxed">
              Aerotech Global Services is a specialized aviation infrastructure firm with over
              three decades of experience. We serve multinational corporations, local enterprises,
              and government bodies ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ providing turnkey solutions that span equipment supply,
              installation, commissioning, and full operational support, all built to international
              standards.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-black/55 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative w-full overflow-hidden aspect-[4/3]">
              <img
                src={IMG_FLIGHT_OPS}
                alt="Aircraft on tarmac at dusk"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Reveal>
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

function Projects() {
  return (
    <section id="projects" className="bg-white text-black border-t border-black/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-black/50 mb-4">Featured Project</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
            Our Work
          </h2>
          <p className="mt-4 text-lg text-black/60 max-w-2xl">
            Real projects. Real outcomes. Built to international standards.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-16 grid lg:grid-cols-2 gap-0 border border-black/10">
            <div className="relative overflow-hidden" style={{ minHeight: "500px" }}>
              <img
                src={IMG_PROJECT_RUNWAY}
                alt="AGS team conducting runway inspection in Balochistan"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1.5">
                  Turnkey Delivery
                </span>
              </div>
            </div>

            <div className="bg-white p-10 md:p-14 flex flex-col justify-between">
              <div className="grid grid-cols-3 gap-4 mb-10 pb-10 border-b border-black/10">
                <div>
                  <div className="text-3xl md:text-4xl font-black tracking-tight">3</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-black/50">
                    Navaids Installed
                  </div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black tracking-tight">1</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-black/50">
                    Airstrip Delivered
                  </div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black tracking-tight">100%</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-black/50">
                    Turnkey Scope
                  </div>
                </div>
              </div>

              <div className="space-y-1 mb-6 text-sm">
                <div className="flex gap-4">
                  <span className="w-20 text-black/40 uppercase tracking-[0.15em] text-xs shrink-0 pt-0.5">
                    Client
                  </span>
                  <span className="font-semibold">Multinational Mining Corporation</span>
                </div>
                <div className="flex gap-4">
                  <span className="w-20 text-black/40 uppercase tracking-[0.15em] text-xs shrink-0 pt-0.5">
                    Location
                  </span>
                  <span className="font-semibold">Balochistan, Pakistan</span>
                </div>
                <div className="flex gap-4">
                  <span className="w-20 text-black/40 uppercase tracking-[0.15em] text-xs shrink-0 pt-0.5">
                    Services
                  </span>
                  <span className="font-semibold">
                    Consulting, Design, ILS ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ· NDB ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ· PAPI Installation
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-4">
                  Turnkey Airstrip for a Major Mining Operation
                </h3>
                <p className="text-base text-black/65 leading-relaxed">
                  AGS delivered a complete greenfield airstrip solution for a leading multinational
                  mining company operating in Balochistan. From initial site consulting and
                  airstrip design through to the full installation and commissioning of ILS, NDB,
                  and PAPI navigation systems ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ AGS managed the entire scope, bringing the airstrip
                  from concept to fully certified and operational.
                </p>
              </div>

              <a
                href="#contact"
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold group"
              >
                Discuss a Similar Project{" "}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type Service = {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  image: string;
  tags: string[];
};

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const imageFirst = index % 2 === 0;
  const imageEl = (
    <div className="relative overflow-hidden min-h-[360px] lg:min-h-[520px]">
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
  const contentEl = (
    <div className="bg-white p-10 md:p-14 lg:p-16 flex flex-col justify-center">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono tracking-[0.25em] text-black/40">{service.number}</span>
        <span className="h-px flex-1 bg-black/10" />
        <span className="h-10 w-10 grid place-items-center border border-black/15 text-black">
          {service.icon}
        </span>
      </div>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
        {service.title}
      </h3>
      <p className="mt-5 text-base md:text-lg text-black/65 leading-relaxed max-w-xl">
        {service.description}
      </p>
      <div className="mt-7 flex flex-wrap gap-2">
        {service.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/70 border border-black/15 px-2.5 py-1.5"
          >
            {t}
          </span>
        ))}
      </div>
      <a
        href="#contact"
        className="mt-10 inline-flex items-center gap-2 text-sm font-semibold group w-fit"
      >
        Learn More{" "}
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );

  return (
    <Reveal>
      <div className="grid lg:grid-cols-2 border-t border-black/10">
        {imageFirst ? (
          <>
            {imageEl}
            {contentEl}
          </>
        ) : (
          <>
            <div className="order-2 lg:order-1">{contentEl}</div>
            <div className="order-1 lg:order-2">{imageEl}</div>
          </>
        )}
      </div>
    </Reveal>
  );
}

function Services() {
  const services: Service[] = [
    {
      number: "01",
      icon: <RadioTower size={18} />,
      title: "Navaid Equipment Supply & Installation",
      description:
        "We supply, install, and commission internationally certified navigation aids ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ILS, NDB, PAPI, and more ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ensuring every airport meets ICAO standards from day one.",
      image: IMG_NAVAID,
      tags: ["ILS", "NDB", "PAPI", "ICAO Certified"],
    },
    {
      number: "02",
      icon: <Building2 size={18} />,
      title: "Airport Design & Operational Consulting",
      description:
        "From initial feasibility and airfield design to full operational consulting, AGS guides airports through every phase of development ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ compliant with ICAO standards from the ground up.",
      image: IMG_PROJECT_RUNWAY,
      tags: ["Feasibility", "Airfield Design", "Operations"],
    },
    {
      number: "03",
      icon: <FileCheck size={18} />,
      title: "Airstrip Certification & Licensing",
      description:
        "We specialize in obtaining airstrip licenses, operational permits, and certifications from civil aviation authorities ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ handling documentation, inspections, and regulatory compliance end to end.",
      image: IMG_TOWER,
      tags: ["CAA Approvals", "Permits", "Compliance"],
    },
    {
      number: "04",
      icon: <Plane size={18} />,
      title: "Flight Operations & Airline Partnerships",
      description:
        "AGS facilitates partnerships between airport operators and airlines ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ from route structures and ground handling frameworks to operational procedures that enable commercial aviation activity.",
      image: IMG_FLIGHT_OPS,
      tags: ["Airline Partnerships", "Ground Ops", "Route Planning"],
    },
  ];
  return (
    <section id="services" className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-24 md:pt-32 pb-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-black/50 mb-4">02 ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ Services</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl">
            What We Do
          </h2>
          <p className="mt-4 text-lg text-black/60 max-w-2xl">
            Four core practices, engineered to bring airports online and keep them running at
            international standards.
          </p>
        </Reveal>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-12 pb-24 md:pb-32">
        <div className="border-b border-black/10">
          {services.map((s, i) => (
            <ServiceRow key={s.title} service={s} index={i} />
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
      desc: "All our equipment, installations, and services conform to ICAO standards ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ the globally recognized benchmark for safe and efficient civil aviation.",
    },
    {
      icon: <Workflow size={24} />,
      title: "End-to-End Delivery",
      desc: "From initial assessment and equipment procurement through installation, commissioning, certification, and ongoing support ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ we own every stage of the project so nothing falls through the cracks.",
    },
    {
      icon: <Building size={24} />,
      title: "Trusted by Multinationals",
      desc: "AGS has been the aviation infrastructure partner of choice for leading multinational corporations and industry bodies operating in complex, demanding environments.",
    },
    {
      icon: <Cog size={24} />,
      title: "Technical Excellence",
      desc: "Our team brings deep technical expertise in avionics, airfield systems, and regulatory compliance ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ensuring every project is delivered with precision, on spec, and on time.",
    },
  ];
  return (
    <section id="why" className="relative bg-white text-black overflow-hidden border-t border-black/10">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-black/50 mb-6">03 ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ Advantage</p>
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
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">04 ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ Contact</p>
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
          ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ© 2025 Aerotech Global Services. All rights reserved.
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
        <Projects />
        <Services />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
