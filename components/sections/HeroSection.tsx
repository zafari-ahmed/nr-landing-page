"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "/assets/hero-airport-construction.jpg",
    title: "Building the Future of Aviation",
    subtitle:
      "Expert airport construction and runway development with precision and excellence",
    cta: "Explore Our Services",
    href: "/services",
  },
  {
    image: "/assets/hero-civil-engineering.jpg",
    title: "Leaders in Civil Engineering",
    subtitle:
      "Delivering world-class infrastructure solutions for modern construction challenges",
    cta: "Get in Touch",
    href: "/contact",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Slider Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 hero-gradient" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto construction-animate">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary-light shadow-hero text-lg px-8 py-4 h-auto"
              >
                <Link href={slides[currentSlide].href}>
                  <Play className="mr-2 h-5 w-5" />
                  {slides[currentSlide].cta}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={48} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={48} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? "bg-secondary" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
