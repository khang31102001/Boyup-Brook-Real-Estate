import  { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/gallery';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/description', label: 'Description' },
    { to: '/gallery', label: 'Gallery'},
    { to: '/contact', label: 'Contact' },
    { to: '/summary', label: 'Summary' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-300 ${isScrolled || isMenuOpen ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <nav className={`flex justify-between items-center px-4 md:px-12 py-4 md:py-8 max-w-[2050px] mx-auto ${isScrolled || !isHome || isMenuOpen ? 'text-emerald-900' : 'text-white'}`}>
        <Link to="/" className="font-bold text-lg md:text-2xl z-[1000] ">
          Boyup Brook / Bridgetown
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-6 md:w-8 h-6 md:h-8 space-y-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 md:w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-5 md:w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-5 md:w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Desktop menu */}
        <ul className={`md:flex md:gap-10 font-medium text-normal transform transition-all duration-300 ${
          isMenuOpen 
            ? `absolute top-full left-0 w-full ${isScrolled || !isHome || isMenuOpen ? 'text-emerald-900 bg-white' : 'text-white bg-black/20'} shadow-lg py-4 flex flex-col items-end gap-4 px-4 opacity-100`
            : 'hidden md:flex opacity-0 md:opacity-100'
        }`}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link 
                to={to}
                onClick={() => scrollToTop()}
                className={`hover:border-b-2 pb-1 ${isScrolled || !isHome 
                  ? 'hover:border-emerald-900' 
                  : 'hover:border-white'} ${
                  (location.pathname === to || (location.pathname === '/' && to === '/')) 
                    ? `border-b-2 ${isScrolled || !isHome ? 'border-emerald-900' : 'border-white'}` 
                    : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;