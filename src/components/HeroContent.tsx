interface HeroContentProps {
  headline: string;
  accent: string;
  subtitle: string;
  isTransitioning: boolean;
}

const HeroContent = ({ headline, accent, subtitle, isTransitioning }: HeroContentProps) => {
  return (
    <div 
      className={`text-center md:text-left max-w-xl transition-all duration-500 ${
        isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-nav-text mb-6 leading-tight">
        {headline} <span className="text-hero-accent">{accent}</span>
      </h1>
      
      <p className="text-lg sm:text-xl text-nav-text/80 mb-8">
        {subtitle}
      </p>
      
      <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-6">
        <button className="btn-cta">
          Try it now
        </button>
        <a 
          href="#" 
          className="text-nav-text/70 hover:text-nav-text underline underline-offset-4 transition-colors text-sm"
        >
          Learn more about our free trial
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
