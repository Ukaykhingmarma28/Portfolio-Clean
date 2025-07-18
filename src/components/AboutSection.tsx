
import React, { useEffect, useState, useRef } from 'react';
import { User, Camera, Code } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for animations
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

    // Observe all elements with data-animate attribute
    const elementsToObserve = sectionRef.current?.querySelectorAll('[data-animate]');
    elementsToObserve?.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      elementsToObserve?.forEach(el => observer.unobserve(el));
    };
  }, []);

  const isVisible = (elementId: string) => visibleElements.has(elementId);

  return (
    <div className="container mx-auto px-4 md:px-6 relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('header') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
          data-animate="header"
        >
          <div className="inline-flex items-center space-x-2 bg-accent-ivory/50 rounded-full px-4 py-2 mb-6">
            <User className="w-4 h-4 text-accent-charcoal" />
            <span className="font-body text-sm font-medium text-accent-charcoal">Get to know me</span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 text-theme-black">
            About Me
          </h2>
          <div className="w-20 h-1 bg-accent-charcoal mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Column - Photo */}
          <div className="lg:col-span-2">
            <div 
              className={`text-center transition-all duration-1000 delay-200 ${
                isVisible('photo') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              data-animate="photo"
            >
              <div className="w-64 md:w-96 h-64 md:h-96 mx-auto mb-8 bg-accent-ivory rounded-2xl flex items-center justify-center border-2 border-dashed border-accent-cream hover:border-accent-charcoal transition-all duration-300 group">
                <img src="/images/profile.jpg" alt="Ukay Khing Marma" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="text-center">
                <h3 className="font-heading text-2xl font-bold text-theme-black mb-2">Ukay Khing Marma</h3>
                <p className="text-theme-gray-600 font-body text-lg">Full-Stack Developer</p>
              </div>
            </div>
          </div>

          {/* Right Column - About Text */}
          <div className="lg:col-span-3">
            <div 
              className={`clean-card p-8 transition-all duration-1000 delay-400 ${
                isVisible('about-text') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8'
              }`}
              data-animate="about-text"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-accent-bronze rounded-full"></div>
                <div className="w-3 h-3 bg-accent-charcoal rounded-full"></div>
                <div className="w-3 h-3 bg-accent-bronze rounded-full"></div>
                <span className="font-mono text-sm text-theme-gray-500 ml-4">about.md</span>
              </div>
              
              <div className="space-y-6 text-theme-gray-700">
                <div className="font-mono text-sm text-accent-charcoal mb-4">
                  <span className="text-theme-gray-500"># </span>Hello World! 👋
                </div>
                
                <p className="font-body leading-relaxed">
                I'm Ukay Khing Marma — a passionate Software, IoT, and R&D Engineer based in Malaysia. My journey into technology has been driven by a deep curiosity and a desire to solve real-world problems through innovation. I thrive at the intersection of hardware and software, building intelligent systems that make a meaningful impact.
                </p>
                
                <p className="font-body leading-relaxed">
                I specialize in creating solutions that go beyond typical web development. My work spans embedded IoT systems, research-driven prototypes, and scalable software applications. Whether developing independently or collaborating with cross-functional teams, I bring a mix of deep technical skills, creativity, and hands-on problem-solving to every project.
                </p>

                <p className="font-body leading-relaxed">
                I'm an active open-source contributor and a believer in the power of community. I love sharing knowledge, collaborating with teammates from around the globe, and mentoring aspiring developers. I stay engaged with the latest trends in tech, always exploring, experimenting, and pushing boundaries.


                </p>

                <div className="flex items-center space-x-2 pt-4">
                  <Code className="w-4 h-4 text-accent-charcoal" />
                  <span className="font-mono text-sm text-theme-gray-500">Always learning, always building</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16">
          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
              isVisible('stats') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            data-animate="stats"
          >
            <div className="text-center p-8 bg-accent-ivory rounded-2xl border border-accent-cream transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="text-4xl font-bold text-accent-charcoal mb-2">5+</div>
              <div className="text-theme-gray-600 font-medium">Years Experience</div>
            </div>
            
            <div className="text-center p-8 bg-accent-cream rounded-2xl border border-accent-cream transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="text-4xl font-bold text-accent-bronze mb-2">50+</div>
              <div className="text-theme-gray-600 font-medium">Projects Built</div>
            </div>
            
            <div className="text-center p-8 bg-accent-ivory rounded-2xl border border-accent-cream transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="text-4xl font-bold text-accent-charcoal mb-2">∞</div>
              <div className="text-theme-gray-600 font-medium">Learning Mode</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
