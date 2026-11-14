"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/lib/site-config";
import SectionHeading from "./SectionHeading";

type ContactSectionProps = {
  headingLevel?: "h1" | "h2";
};

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: [siteConfig.phone],
    href: `tel:${siteConfig.phone.replace(/-/g, "")}`,
  },
  {
    icon: Mail,
    title: "Email",
    details: [siteConfig.email],
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    title: "Office Location",
    details: [siteConfig.address.line1, siteConfig.address.line2],
    href: "#map",
  },
];

const ContactSection = ({ headingLevel = "h2" }: ContactSectionProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      toast({
        title: "Message Sent Successfully!",
        description:
          data.message ||
          "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description:
          err instanceof Error
            ? err.message
            : "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <SectionHeading
            level={headingLevel}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Get in <span className="text-gradient-primary">Touch</span>
          </SectionHeading>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to start your next aviation construction project? Contact
            us today to discuss your requirements and get a personalized
            consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Email Address"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full h-32 resize-none"
                    placeholder="Please describe your requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground shadow-construction"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <info.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-2">
                        {info.title}
                      </h4>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detail} className="text-muted-foreground">
                            {info.href && detailIndex === 0 ? (
                              <a
                                href={info.href}
                                className="hover:text-primary transition-colors duration-200"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map */}
            <div id="map" className="rounded-xl overflow-hidden h-64">
              <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.650257501884!2d67.08880479999999!3d24.875792000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33fee94366eaf%3A0xdcfdd009c6a90d4a!2sMarina%20executive%20tower!5e0!3m2!1sen!2s!4v1794481083892!5m2!1sen!2s" 
                  width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NR & Associates Office"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
