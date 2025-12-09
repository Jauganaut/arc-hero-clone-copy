import { useState, useEffect } from "react";
import heroBg1 from "@/assets/hero-bg.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";
import heroBg4 from "@/assets/hero-bg-4.jpg";
import heroBg5 from "@/assets/hero-bg-5.jpg";
import heroBg6 from "@/assets/hero-bg-6.jpg";
import heroBg7 from "@/assets/hero-bg-7.jpg";
import Navbar from "./Navbar";
import FileCard from "./FileCard";
import HeroContent from "./HeroContent";

const heroSlides = [
  {
    background: heroBg1,
    headline: "Files",
    accent: "in flight.",
    subtitle: "Lightning-fast sharing worldwide in seconds."
  },
  {
    background: heroBg2,
    headline: "Scale",
    accent: "new heights.",
    subtitle: "Enterprise-grade infrastructure at your fingertips."
  },
  {
    background: heroBg3,
    headline: "Build",
    accent: "the future.",
    subtitle: "Modern tools for modern developers."
  },
  {
    background: heroBg4,
    headline: "Share",
    accent: "seamlessly.",
    subtitle: "Collaborate with anyone, anywhere, anytime."
  },
  {
    background: heroBg5,
    headline: "Secure",
    accent: "by design.",
    subtitle: "End-to-end encryption for peace of mind."
  },
  {
    background: heroBg6,
    headline: "Deploy",
    accent: "instantly.",
    subtitle: "From code to production in seconds."
  },
  {
    background: heroBg7,
    headline: "Connect",
    accent: "globally.",
    subtitle: "Edge network spanning 300+ cities worldwide."
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Images with Crossfade */}
      {heroSlides.map((s, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${s.background})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* File Card - Left Side */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <FileCard />
            </div>

            {/* Hero Content - Right Side */}
            <div className="flex justify-center lg:justify-start order-1 lg:order-2">
              <HeroContent
                headline={slide.headline}
                accent={slide.accent}
                subtitle={slide.subtitle}
                isTransitioning={isTransitioning}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
              }, 300);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-nav-text w-6"
                : "bg-nav-text/40 hover:bg-nav-text/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
