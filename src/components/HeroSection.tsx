import heroBg from "@/assets/hero-bg.jpg";
import Navbar from "./Navbar";
import FileCard from "./FileCard";
import HeroContent from "./HeroContent";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

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
              <HeroContent />
            </div>
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-10">
        <p className="text-nav-text/50 text-sm">
          Built with ❤️ at Cloudflare
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
