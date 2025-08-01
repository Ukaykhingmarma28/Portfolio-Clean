
import React, { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const FooterSection: React.FC = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-animate');
            if (elementId) {
              setVisibleElements(prev => new Set([...prev, elementId]));
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    const elementsToObserve = sectionRef.current?.querySelectorAll('[data-animate]');
    elementsToObserve?.forEach(el => observer.observe(el));

    return () => {
      elementsToObserve?.forEach(el => observer.unobserve(el));
    };
  }, []);

  const isVisible = (elementId: string) => visibleElements.has(elementId);

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Ukaykhingmarma28', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ukay-khing-marma-29804b318/', icon: Linkedin },
    { name: 'Email', url: 'mailto:ukaykhing25@gmail.com', icon: Mail }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    // { name: 'Education', href: '#education' },
    { name: 'Awards', href: '#awards' }
  ];

  return (
    <footer className="bg-theme-white border-t border-theme-gray-200 py-16" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div 
              className={`transition-all duration-200 ${
                isVisible('brand') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              data-animate="brand"
            >
              <h3 className="font-heading text-xl font-bold text-theme-black mb-4">
                Ukay Khing Marma
              </h3>
              <p className="font-body text-theme-gray-600 mb-6 leading-relaxed">
                Crafting digital experiences with clean code and thoughtful design.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-theme-gray-100 hover:bg-accent-charcoal hover:text-theme-white transition-all duration-200 flex items-center justify-center group"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div 
              className={`transition-all duration-200 ${
                isVisible('quick-links') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
              data-animate="quick-links"
            >
              <h4 className="font-heading text-lg font-bold text-theme-black mb-6">
                Quick Links
              </h4>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block font-body text-theme-gray-600 hover:text-theme-black transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div 
              className={`transition-all duration-200 ${
                isVisible('contact-info') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
              data-animate="contact-info"
            >
              <h4 className="font-heading text-lg font-bold text-theme-black mb-6">
                Get In Touch
              </h4>
              <div className="space-y-3">
                <div className="font-body text-theme-gray-600">
                  Cyberjaya, Malaysia
                </div>
                <a 
                  href="mailto:ukaykhing25@gmail.com"
                  className="font-body text-theme-gray-600 hover:text-theme-black transition-colors duration-200"
                >
                  ukaykhing25@gmail.com
                </a>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-bronze rounded-full animate-pulse" />
                  <span className="font-body text-sm text-theme-gray-600">Available for ideas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div 
            className={`pt-8 border-t border-theme-gray-200 flex flex-col md:flex-row justify-between items-center transition-all duration-200 ${
              isVisible('bottom-footer') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
            data-animate="bottom-footer"
          >
            <div className="font-body text-sm text-theme-gray-500 mb-4 md:mb-0">
              © 2025 Ukay Khing Marma. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
