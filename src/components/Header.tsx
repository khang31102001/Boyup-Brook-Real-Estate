import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);

      // Check which section is in view
      const sections = ['home', 'description', 'Property Gallery','contact', 'summary']; // , 'discover' ,'places'
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#description', label: 'Description' },
    { href: '#Property Gallery', label: 'Property Gallery'},
    { href: '#contact', label: 'Contact' },
    { href: '#summary', label: 'Summary' },
   
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[20] transition-colors duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <nav className={`flex justify-between items-center px-4 md:px-12 py-4 md:py-8 max-w-[2050px] mx-auto ${
        scrolled ? 'text-emerald-900 bg-white' : 'text-white bg-transparent'
      }`}>
        <a className="font-bold text-h3 cursor-pointer"
        onClick={() => {
          const homeSection = document.getElementById('home');
          if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        >Boyup Brook</a>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Desktop menu */}
        <ul className={`md:flex md:gap-10 font-medium text-normal transform transition-all duration-300 ${
          isMenuOpen 
            ? `absolute top-full left-0 w-full ${ scrolled ? 'text-emerald-900 bg-white shadow-lg' : 'text-white bg-transparent'} py-4 flex flex-col items-end gap-4 px-4 opacity-100`
            : 'hidden md:flex opacity-0 md:opacity-100'
        }`}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a 
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`${activeSection === href.substring(1) ? 'border-b-2' : 'hover:border-b-2'} pb-1 ${
                  (scrolled || isMenuOpen) 
                    ? (activeSection === href.substring(1) ? 'border-emerald-900' : 'hover:border-emerald-900') 
                    : (activeSection === href.substring(1) ? 'border-white' : 'hover:border-white')
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

       
      </nav>
    </header>
  );
};

export default Header;