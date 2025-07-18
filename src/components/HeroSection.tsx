import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onScrollDown: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollDown }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-theme-white"
    >
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-1">
        <div 
          className="absolute w-96 h-96 bg-accent-charcoal/5 rounded-full blur-3xl"
          style={{ 
            top: '20%',
            right: '10%',
            transform: `translateY(${scrollY * 0.1}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-16">
        <div className="max-w-5xl mx-auto">
          
          {/* Status Bar */}
          <div className={`flex justify-between items-center mb-20 transition-all duration-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-accent-bronze rounded-full animate-pulse" />
              <span className="text-sm font-body text-theme-gray-600">Available for ideas</span>
            </div>
            <div className="flex items-center space-x-2 text-sm font-mono text-theme-gray-500">
              <Calendar className="w-4 h-4" />
              <span>2025</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center space-y-12">
            {/* Name and Title */}
            <div className={`transition-all duration-200 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6 text-theme-black">
                Ukay Khing<br />
                <span className="text-accent-charcoal">Marma</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-theme-gray-600 mb-8">
              Software, IoT & R&D Engineer
              </p>
              <div className="w-16 h-px bg-accent-charcoal mx-auto" />
            </div>

            {/* Description */}
            <div className={`max-w-2xl mx-auto transition-all duration-200 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <p className="font-body text-lg text-theme-gray-600 leading-relaxed">
              Designing seamless experiences and intelligent systems with a global mindset proudly rooted in Malaysia.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 items-center justify-center transition-all duration-200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <a 
                href="#projects"
                className="group flex items-center space-x-3 bg-theme-black text-theme-white px-8 py-4 rounded-none hover:bg-accent-charcoal transition-all duration-200 font-body font-medium"
              >
                <span>View Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <a 
                href="/resumes.pdf"
                download
                className="flex items-center space-x-3 border border-theme-gray-300 text-theme-gray-700 px-8 py-4 rounded-none hover:border-theme-black hover:text-theme-black transition-all duration-200 font-body font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-theme-gray-200 transition-all duration-200 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[
                { number: '20+', label: 'Projects' },
                { number: '5+', label: 'Years' },
                { number: '10+', label: 'Contribute' },
                { number: '95%', label: 'Success' },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center space-y-2">
                  <div className="font-heading text-2xl font-bold text-theme-black">{stat.number}</div>
                  <div className="font-body text-sm text-theme-gray-600 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div 
              className="flex flex-col items-center space-y-2 cursor-pointer group"
              onClick={onScrollDown}
            >
              <span className="font-mono text-xs text-theme-gray-500 tracking-wider">SCROLL</span>
              <div className="w-px h-12 bg-theme-gray-300 group-hover:bg-theme-gray-600 transition-colors duration-200">
                <div className="w-px h-3 bg-theme-gray-600 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
