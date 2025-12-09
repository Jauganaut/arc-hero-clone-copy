const HeroContent = () => {
  return (
    <div className="text-center md:text-left max-w-xl opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-nav-text mb-6 leading-tight">
        Files <span className="text-hero-accent">in flight.</span>
      </h1>
      
      <p className="text-lg sm:text-xl text-nav-text/80 mb-8">
        Lightning-fast sharing worldwide in seconds.
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
