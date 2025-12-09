import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <img 
          src={logo} 
          alt="WeTransfer Logo" 
          className="h-10 sm:h-12 w-auto rounded-md hover:scale-105 transition-transform duration-200"
        />
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
            <a href="#" className="nav-link px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
              Features
            </a>
            <a href="#" className="nav-link px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
              Pricing
            </a>
            <a href="#" className="nav-link px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
              Use cases
            </a>
            <a href="#" className="nav-link px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
              Resources
            </a>
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            <a href="#" className="nav-link">
              Log in
            </a>
            <button className="btn-nav">
              Sign up
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-nav-text p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
