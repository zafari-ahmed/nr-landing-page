import Image from "next/image";
import SectionHeading from "./SectionHeading";

type AboutSectionProps = {
  headingLevel?: "h1" | "h2";
};

const AboutSection = ({ headingLevel = "h2" }: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/assets/about-background.jpg"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <SectionHeading
            level={headingLevel}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            About <span className="text-gradient-primary"> Us</span>
          </SectionHeading>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 items-center about-uss">
          <div className="space-y-12">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                With decades of expertise in aviation and civil
                infrastructure, <b>NR & Associates</b> has become a trusted
                partner in the development of modern airports and runways.
                From concept planning to fully operational facilities, we
                deliver end-to-end solutions that meet the highest
                international aviation standards.
              </p>
              <p>
                Our core strengths include{" "}
                <b>
                  runway and taxiway construction, terminal buildings,
                  hangars, aprons, control towers, and support facilities
                </b>
                . Beyond construction, we specialize in{" "}
                <b>
                  navigation and communication systems such as PAPI Lights,
                  Runway Lighting, NDB (Non-Directional Beacon), RT Sets, and
                  Weather Stations
                </b>
                , ensuring safe and reliable airport operations.
              </p>
              <p>
                We are also committed to long-term operational excellence,
                offering{" "}
                <b>
                  runway markings, fire crash tenders, preventive
                  maintenance, emergency repairs, and certified training
                  programs through Civil Aviation Training Institute (CATI)
                </b>{" "}
                to build skilled aviation teams.
              </p>
              <p>
                At NR & Associates, we combine engineering precision,
                regulatory compliance, and innovative solutions to deliver
                infrastructure that supports both present and future aviation
                needs. Our dedication to{" "}
                <b>quality, safety, and timely delivery</b> continues to make
                us the preferred choice for critical aviation projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
