
import React, { useState, useEffect } from 'react';
import { X, Menu, Linkedin, Github } from 'lucide-react';

interface FullScreenNavigationProps {
  onNavigate: (sectionId: string) => void;
}

const FullScreenNavigation: React.FC<FullScreenNavigationProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    // { id: 'education', label: 'Education' },
    { id: 'awards', label: 'Awards' },
    // { id: 'contact', label: 'Contact' },
  ];

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  const handleClose = () => {
    console.log('Close button clicked'); // Debug log
    setIsOpen(false);
  };

  // Prevent body scroll when navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-theme-white/95 backdrop-blur-sm border-b border-theme-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo/Brand */}
          <div className="text-xl font-bold text-theme-black font-mono">
            ukaykhing.dev
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/ukay-khing-marma-29804b318"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-theme-black hover:text-accent-bronze transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>

            {/* GitHub Icon */}
            <a
              href="https://github.com/Ukaykhingmarma28"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-theme-black hover:text-accent-bronze transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-theme-black hover:text-accent-bronze transition-colors duration-200"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Navigation Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-700 ${
          isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Animated Background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-accent-charcoal via-accent-charcoal to-accent-charcoal/90 transition-all duration-700 ${
          isOpen ? 'scale-100' : 'scale-110'
        }`}>
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-8 right-8 p-4 text-theme-white hover:text-accent-bronze transition-all duration-300 hover:scale-110 z-[60] cursor-pointer"
          aria-label="Close navigation menu"
          style={{ pointerEvents: 'auto' }}
        >
          <X size={28} strokeWidth={2} />
        </button>

        {/* Navigation Content */}
        <div className="flex items-center justify-center h-full relative z-10">
          <nav className="text-center px-8">
            <ul className="space-y-4">
              {navigationItems.map((item, index) => (
                <li
                  key={item.id}
                  className={`transform transition-all duration-500 ${
                    isOpen 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 80 + 200}ms` : '0ms' 
                  }}
                >
                  <button
                    onClick={() => handleNavigate(item.id)}
                    className="group relative text-3xl md:text-4xl lg:text-5xl font-bold text-theme-white hover:text-accent-bronze transition-all duration-300 font-heading tracking-tight"
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Simple underline effect */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-bronze scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </li>
              ))}
            </ul>

            {/* Social Links at Bottom */}
            <div className={`mt-12 flex justify-center space-x-8 transform transition-all duration-700 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '800ms' : '0ms' }}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-theme-white/70 hover:text-accent-bronze transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-theme-white/70 hover:text-accent-bronze transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            </div>
          </nav>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute top-1/4 -left-32 w-64 h-64 bg-accent-bronze/10 rounded-full blur-3xl transition-all duration-1000 ${
            isOpen ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0'
          }`}></div>
          <div className={`absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-cream/10 rounded-full blur-3xl transition-all duration-1000 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'
          }`}></div>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-bronze/5 rounded-full blur-3xl transition-all duration-1000 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}></div>
        </div>
      </div>
    </>
  );
};

export default FullScreenNavigation;
