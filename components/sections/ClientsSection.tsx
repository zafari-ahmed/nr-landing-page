"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

type ClientsSectionProps = {
  headingLevel?: "h1" | "h2";
};

const clients = [
  { name: "PAA", logo: "PAA.svg" },
  { name: "MCC", logo: "MCC.png" },
  { name: "KMC", logo: "KMC.png" },
  { name: "BARRICK", logo: "BARRICK-GOLD-logo.svg" },
  { name: "REKO DIQ", logo: "reko_diq_mining_company.png" },
];

const stats = [
  { number: "5+", label: "Projects Completed" },
  { number: "30+", label: "Years Experience" },
  { number: "100%", label: "Client Satisfaction" },
];

const ClientsSection = ({ headingLevel = "h2" }: ClientsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  useEffect(() => {
    const maxIndex = Math.max(0, clients.length - itemsPerSlide);

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [itemsPerSlide]);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(4);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  return (
    <section id="clients" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <SectionHeading
            level={headingLevel}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Trusted by Our <span className="text-gradient-primary">Clients</span>
          </SectionHeading>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We&apos;re proud to work with leading aviation organizations and
            airport authorities worldwide, delivering exceptional results on
            every project.
          </p>
        </div>

        {/* Client Logos Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 20}%)`,
              width: `${(clients.length / itemsPerSlide) * 100}%`,
            }}
          >
            {clients.map((client) => (
              <div
                key={client.name}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / clients.length}%` }}
              >
                <div className="bg-card rounded-xl p-8 shadow-card transition-all duration-300 group cursor-pointer">
                  <div className="w-h-15 mx-auto mb-4 bg-muted flex items-center justify-center transition-colors duration-300 overflow-hidden relative">
                    <Image
                      src={`/assets/${client.logo}`}
                      alt={`${client.name} — airport and airstrip construction client of NR & Associates`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
