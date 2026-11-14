import {
  Plane,
  LandPlot,
  Satellite,
  MapPinned,
  Wrench,
  Ruler,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

type ServicesSectionProps = {
  headingLevel?: "h1" | "h2";
};

const services = [
  {
    icon: Plane,
    title: "Airport Construction",
    description:
      "Complete airport facility construction, including terminals, hangars, control towers, and support buildings, all designed and executed in line with modern aviation standards.",
    features: [
      "Terminal & Mini-Terminal Construction",
      "Hangar Development",
      "Control Towers",
      "Passenger Facilities",
      "Fire Crash Tender Supply",
      "All regulatory correspondence with CAA/PAA",
    ],
  },
  {
    icon: LandPlot,
    title: "Runway Development",
    description:
      "Precision runway construction and maintenance for commercial and private aviation with strict compliance to ICAO and PCAA safety standards.",
    features: [
      "Runway & Taxiway Construction",
      "Apron Development",
      "Runway Markings & Strip Preparation",
      "Runway Lighting Systems (PAPI Lights, Runway Edge Lights)",
      "Weather Stations (Wind/Climate Monitoring)",
    ],
  },
  {
    icon: Satellite,
    title: "Navigation & Communication Systems",
    description:
      "Procurement and installation of advanced navigation aids and communication systems to ensure safe and efficient flight operations.",
    features: [
      "NDB (Non-Directional Beacon)",
      "RT Sets (Air-Ground Radio Transmitters)",
      "Aviation Lighting & Signaling Systems",
      "Meteorological & Weather Stations",
    ],
  },
  {
    icon: Ruler,
    title: "Civil Engineering Solutions",
    description:
      "Comprehensive civil infrastructure services to support both aviation and non-aviation developments.",
    features: [
      "Site Preparation & Earthwork",
      "Drainage Systems",
      "Road Construction (within & around airports)",
      "Utility Installation (Power, Water, Fuel)",
      "Foundation & Structural Systems",
    ],
  },
  {
    icon: MapPinned,
    title: "Infrastructure Planning & Training",
    description:
      "Strategic planning and certified training programs to build sustainable airport operations and skilled manpower.",
    features: [
      "Project Planning",
      "Feasibility Studies",
      "Design & Site Analysis",
      "Certified Training Programs for Airport Operations Staff",
      "Capacity Building & Knowledge Transfer",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance & Support Services",
    description:
      "End-to-end support for operational continuity and facility upgrades to ensure safety and compliance.",
    features: [
      "Preventive & Routine Maintenance",
      "Emergency Repairs",
      "Facility Upgrades & Renovations",
      "Safety Inspections",
      "Long-term O&M (Operations & Maintenance) Services",
    ],
  },
];

const ServicesSection = ({ headingLevel = "h2" }: ServicesSectionProps) => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <SectionHeading
            level={headingLevel}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Our <span className="text-gradient-primary">Services</span>
          </SectionHeading>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From airport construction to navigation systems, we deliver
            end-to-end aviation infrastructure solutions built to
            international standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card rounded-xl p-8 shadow-card hover:shadow-construction transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-6">
                <service.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-sm text-muted-foreground flex items-start"
                  >
                    <span className="text-secondary mr-2">&bull;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
