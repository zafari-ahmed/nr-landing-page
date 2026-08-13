import { Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import teamImage from '@/assets/team-construction.jpg';

const TeamsSection = () => {
  const teamMembers = [
    {
      name: "David Chen",
      position: "Chief Executive Officer", 
      bio: "25+ years leading major aviation construction projects worldwide. Expert in strategic planning and project management.",
      image: teamImage,
      email: "david.chen@skywayConstruct.com",
      linkedin: "#"
    },
    {
      name: "Sarah Mitchell",
      position: "Head of Civil Engineering",
      bio: "Renowned civil engineer with extensive experience in airport infrastructure and runway development projects.",
      image: teamImage,
      email: "sarah.mitchell@skywayConstruct.com", 
      linkedin: "#"
    },
    {
      name: "Michael Rodriguez",
      position: "Project Director",
      bio: "Expert project director specializing in complex aviation construction with a focus on safety and quality delivery.",
      image: teamImage,
      email: "michael.rodriguez@skywayConstruct.com",
      linkedin: "#"
    },
    // {
    //   name: "Dr. Emily Watson",
    //   position: "Senior Design Engineer",
    //   bio: "PhD in Structural Engineering with expertise in innovative construction techniques and sustainable building practices.",
    //   image: teamImage,
    //   email: "emily.watson@skywayConstruct.com",
    //   linkedin: "#"
    // },
    // {
    //   name: "James Thompson",
    //   position: "Safety Director",
    //   bio: "Certified safety professional ensuring the highest standards of workplace safety across all construction sites.",
    //   image: teamImage,
    //   email: "james.thompson@skywayConstruct.com",
    //   linkedin: "#"
    // },
    // {
    //   name: "Lisa Anderson",
    //   position: "Operations Manager",
    //   bio: "Streamlining operations and logistics to ensure efficient project delivery and resource management.",
    //   image: teamImage,
    //   email: "lisa.anderson@skywayConstruct.com",
    //   linkedin: "#"
    // }
  ];

  return (
    <section id="teams" className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Our Expert <span className="text-gradient-primary">Team</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet the experienced professionals who make SkyWay Construct a leader 
            in aviation construction and civil engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-construction transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Social Links Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-medium">
                    {member.position}
                  </p>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Contact Info */}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;