import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import AwardsSection from '../components/AwardsSection';
import ContactSection from '../components/ContactSection';
import FooterSection from '../components/FooterSection';
import FullScreenNavigation from '../components/FullScreenNavigation';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 20;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen bg-theme-white text-theme-black transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'} relative overflow-x-hidden`}>
      {/* Full Screen Navigation */}
      <FullScreenNavigation onNavigate={scrollToSection} />

      {/* Minimal Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-96 h-96 bg-accent-charcoal/3 rounded-full blur-3xl"
          style={{ 
            top: '20%',
            right: '10%',
            transform: `translateY(${scrollY * 0.05}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-accent-bronze/3 rounded-full blur-3xl"
          style={{ 
            bottom: '30%',
            left: '15%',
            transform: `translateY(${scrollY * -0.03}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      </div>

      <div className="relative z-10 pt-10">
        <section id="hero" className="min-h-screen">
          <HeroSection onScrollDown={() => scrollToSection('about')} />
        </section>

        <section id="about" className="min-h-screen py-20 bg-accent-ivory relative">
          <AboutSection />
        </section>

        <section id="skills" className="min-h-screen py-20 bg-theme-white relative">
          <SkillsSection />
        </section>

        <section id="projects" className="min-h-screen py-20 bg-accent-ivory relative">
          <ProjectsSection />
        </section>

        <section id="experience" className="min-h-screen py-20 bg-theme-white relative">
          <ExperienceSection />
        </section>

        {/* <section id="education" className="min-h-screen py-20 bg-accent-ivory relative">
          <EducationSection />
        </section> */}

        <section id="awards" className="min-h-screen py-20 bg-theme-white relative">
          <AwardsSection />
        </section>

        {/* <section id="contact" className="min-h-screen py-20 bg-accent-ivory relative">
          <ContactSection />
        </section> */}

        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
