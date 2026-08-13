import { useEffect, useState } from 'react';

const ClientsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4); // default desktop

  // Mock client logos - in a real project, these would be actual client logos
  const clients = [
    {
      name: "PAA",
      logo: "PAA.svg"
    },
    {
      name: "MCC",
      logo: "MCC.png"
    },
    {
      name: "KMC",
      logo: "KMC.png"
    },
    {
      name: "BARRICK",
      logo: "BARRICK-GOLD-logo.svg"
    },
    {
      name: "REKO DIQ",
      logo: "reko_diq_mining_company.png"
    },
    // {
    //   name: "Global Airways",
    //   logo: "nr-logo.png"
    // }
  ];

  useEffect(() => {
    const maxIndex = Math.max(0, clients.length - itemsPerSlide);

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [clients.length, itemsPerSlide]);

  // detect screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1); // mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2); // tablet
      } else {
        setItemsPerSlide(4); // desktop
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
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Trusted by Our <span className="text-gradient-primary">Clients</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're proud to work with leading aviation organizations and airport authorities 
            worldwide, delivering exceptional results on every project.
          </p>
        </div>

        {/* Client Logos Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              // transform: `translateX(-${(currentIndex / 4) * 100 }%)`,
              // width: `${(clients.length / 4) * 100}%`
              transform: `translateX(-${(currentIndex) * 20}%)`,
              width: `${(clients.length / itemsPerSlide) * 100}%`,
            }}
          >
            {clients.map((client, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-1/8 px-2"
                style={{ width: `${100 / clients.length}%` }}
              >
                <div className="bg-card rounded-xl p-8 shadow-card transition-all duration-300 group cursor-pointer">
                  {/* Logo Placeholder */}
                    <div className="w-h-15 mx-auto mb-4 bg-muted flex items-center justify-center transition-colors duration-300 overflow-hidden">
                      <img 
                        src={`assets/${client.logo}`} 
                        alt={client.name}
                        className="max-w-full max-h-full object-contain p-2"
                      />
                    </div>

                  
                  {/* Client Name */}
                  {/*<h3 className="text-center font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {client.name}
                  </h3>*/}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        {/*<div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: Math.max(1, clients.length - 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-secondary' : 'bg-muted'
              }`}
              aria-label={`Go to client group ${index + 1}`}
            />
          ))}
        </div>*/}

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16">
          {[
            { number: "5+", label: "Projects Completed" },
            { number: "30+", label: "Years Experience" }, 
            { number: "100%", label: "Client Satisfaction" },
            // { number: "15+", label: "Countries Served" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
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