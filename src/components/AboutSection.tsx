import { CheckCircle, Award, Clock, Shield } from 'lucide-react';
import aboutBg from '@/assets/about-background.jpg';

const AboutSection = () => {
  const features = [
    {
      icon: Award,
      title: "Excellence in Quality",
      description: "Delivering world-class construction standards with attention to every detail"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Maintaining the highest safety protocols on every project site"
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Completing projects on schedule without compromising quality"
    }
  ];

  const achievements = [
    "5+ Airport Projects Completed",
    "30+ Years of Experience", 
    "100% Safety Record",
    // "ISO 9001:2015 Certified"
    "100% Client Satisfaction"
  ];

  return (
    <section id="about" className="py-20 section-gradient relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutBg})` }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            About <span className="text-gradient-primary"> Us</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 items-center about-uss">
          {/* Left Content */}
          <div className="space-y-12">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                With decades of expertise in aviation and civil infrastructure, <b>NR & Associates</b> has become a trusted partner in the development of modern airports and runways. From concept planning to fully operational facilities, we deliver end-to-end solutions that meet the highest international aviation standards.
              </p>
              <p>
                Our core strengths include <b>runway and taxiway construction, terminal buildings, hangars, aprons, control towers, and support facilities</b>. Beyond construction, we specialize in <b>navigation and communication systems such as PAPI Lights, Runway Lighting, NDB (Non-Directional Beacon), RT Sets, and Weather Stations</b>, ensuring safe and reliable airport operations.
              </p>
              <p>
                We are also committed to long-term operational excellence, offering <b>runway markings, fire crash tenders, preventive maintenance, emergency repairs, and certified training programs through Civil Aviation Training Institute (CATI)</b> to build skilled aviation teams.
              </p>
              <p>
                At NR & Associates, we combine engineering precision, regulatory compliance, and innovative solutions to deliver infrastructure that supports both present and future aviation needs. Our dedication to <b>quality, safety, and timely delivery</b> continues to make us the preferred choice for critical aviation projects.
              </p>
            </div>

            {/* Achievements */}
            {/*<div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-smm font-medium text-foreground">{achievement}</span>
                </div>
              ))}
            </div>*/}
          </div>

          {/* Right Content - Features */}
          {/*<div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-construction transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>*/}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;