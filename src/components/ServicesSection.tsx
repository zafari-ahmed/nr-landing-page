import { Plane, LandPlot, Satellite, Scan, MapPinned, Wrench, Compass, Ruler } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Plane,
      title: "Airport Construction",
      description: "Complete airport facility construction, including terminals, hangars, control towers, and support buildings, all designed and executed in line with modern aviation standards.",
      features: ["Terminal & Mini-Terminal Construction","Hangar Development","Control Towers","Passenger Facilities","Fire Crash Tender Supply","All regulatory correspondence with CAA/PAA"]
    },
    {
      icon: LandPlot,
      title: "Runway Development", 
      description: "Precision runway construction and maintenance for commercial and private aviation with strict compliance to ICAO and PCAA safety standards.",
      features: ["Runway & Taxiway Construction","Apron Development","Runway Markings & Strip Preparation","Runway Lighting Systems (PAPI Lights, Runway Edge Lights)","Weather Stations (Wind/Climate Monitoring)"]
    },
    {
      icon: Satellite,
      title: "Navigation & Communication Systems",
      description: "Procurement and installation of advanced navigation aids and communication systems to ensure safe and efficient flight operations.",
      features: ["NDB (Non-Directional Beacon)","RT Sets (Air-Ground Radio Transmitters)","Aviation Lighting & Signaling Systems","Meteorological & Weather Stations"]
    },
    {
      icon: Ruler,
      title: "Civil Engineering Solutions",
      description: "Comprehensive civil infrastructure services to support both aviation and non-aviation developments.",
      features: ["Site Preparation & Earthwork","Drainage Systems","Road Construction (within & around airports)","Utility Installation (Power, Water, Fuel)","Foundation & Structural Systems"]
    },
    {
      icon: MapPinned,
      title: "Infrastructure Planning & Training",
      description: "Strategic planning and certified training programs to build sustainable airport operations and skilled manpower.",
      features: ["Project Planning","Feasibility Studies","Design & Site Analysis","Certified Training Programs for Airport Operations Staff","Capacity Building & Knowledge Transfer"]
    },
    {
      icon: Wrench,
      title: "Maintenance & Suport Services",
      description: "End-to-end support for operational continuity and facility upgrades to ensure safety and compliance.",
      features: ["Preventive & Routine Maintenance","Emergency Repairs","Facility Upgrades & Renovations","Safety Inspections","Long-term O&M (Operations & Maintenance) Services"]
    },
    
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Our <span className="text-gradient-primary">Services</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive construction and engineering solutions for aviation infrastructure 
            and civil engineering projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-card rounded-xl p-8 shadow-card hover:shadow-construction transition-all duration-300 hover:-translate-y-2 border border-border/50"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;