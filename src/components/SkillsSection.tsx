import React, { useEffect, useState, useRef } from 'react';
import { Code, Zap } from 'lucide-react';
import { 
  SiReact,
  SiC,
  SiCplusplus,
  SiFlutter, 
  SiTypescript, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiPython, 
  SiLinux, 
  SiGnubash, 
  SiAngular,
  SiGtk,
  SiQt,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiExpress,
  SiNestjs,
  SiGraphql,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGooglecloud,
  SiGit,
  SiGithub,
  SiFigma,
  SiGo,
} from 'react-icons/si';
const SkillsSection: React.FC = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(1);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        rootMargin: '100px 0px -50px 0px'
      }
    );

    const elementsToObserve = sectionRef.current?.querySelectorAll('[data-animate]');
    elementsToObserve?.forEach(el => observer.observe(el));

    return () => {
      elementsToObserve?.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Calculate scroll-based speed
  useEffect(() => {
    if (!sectionRef.current) return;

    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    const windowHeight = window.innerHeight;

    // Check if section is in viewport
    const isInViewport = scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight;

    if (isInViewport) {
      // Calculate scroll progress through the section (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, (scrollY + windowHeight - sectionTop) / (sectionHeight + windowHeight)));

      // Speed increases as user scrolls through section (1x to 4x speed)
      const newSpeed = 1 + scrollProgress * 3;
      setScrollSpeed(newSpeed);
    } else {
      setScrollSpeed(2); // Default speed when not in viewport
    }
  }, [scrollY]);

  const isVisible = (elementId: string) => visibleElements.has(elementId);

  const skills = [
    // Frontend
    { 
      name: 'Flutter', 
      icon: SiFlutter,
    },
    {
      name: 'React',
      icon: SiReact,
    },
    {
      name: 'Go',
      icon: SiGo,
    },
    { 
      name: 'TypeScript', 
      icon: SiTypescript, 
    },
    { 
      name: 'Linux', 
      icon: SiLinux, 
    },
    { 
      name: 'Next.js', 
      icon: SiNextdotjs, 
    },
    { 
      name: 'Bash', 
      icon: SiGnubash, 
    },
    {
      name: 'C',
      icon: SiC,
    },
    { 
      name: 'C++',
      icon: SiCplusplus,
    },
    {
      name: 'Angular', 
      icon: SiAngular, 
    },
    { 
      name: 'GTK', 
      icon: SiGtk, 
    },
    { 
      name: 'QT', 
      icon: SiQt, 
    },
    { 
      name: 'Tailwind', 
      icon: SiTailwindcss, 
    },

    // Backend
    { 
      name: 'Node.js', 
      icon: SiNodedotjs, 
    },
    { 
      name: 'Python', 
      icon: SiPython, 
    },
    { 
      name: 'CPP', 
      icon: SiExpress, 
    },
    { 
      name: 'NestJS', 
      icon: SiNestjs, 
    },
    { 
      name: 'GraphQL', 
      icon: SiGraphql, 
    },

    // Database
    { 
      name: 'MongoDB', 
      icon: SiMongodb, 
    },
    { 
      name: 'PostgreSQL', 
      icon: SiPostgresql, 
    },
    { 
      name: 'MySQL', 
      icon: SiMysql, 
    },
    { 
      name: 'Redis', 
      icon: SiRedis, 
    },

    // DevOps & Cloud
    { 
      name: 'Docker', 
      icon: SiDocker, 
    },
    { 
      name: 'Kubernetes', 
      icon: SiKubernetes, 
    },
    { 
      name: 'AWS', 
      icon: SiAmazon, 
    },
    { 
      name: 'Google Cloud', 
      icon: SiGooglecloud, 
    },

    // Tools
    { 
      name: 'Git', 
      icon: SiGit, 
    },
    { 
      name: 'GitHub', 
      icon: SiGithub, 
    },
    { 
      name: 'Figma', 
      icon: SiFigma, 
    }
  ];

  // Split skills into two halves
  const firstHalfSkills = skills.slice(0, Math.ceil(skills.length / 2));
  const secondHalfSkills = skills.slice(Math.ceil(skills.length / 2));

  const renderSkillIcon = (skill: typeof skills[0], index: number) => {
    const IconComponent = skill.icon;
    return (
      <div
        key={`${skill.name}-${index}`}
        className="flex-shrink-0 mx-6"
      >
        <IconComponent className="w-10 h-10 text-gray-600" />
      </div>
    );
  };

  const renderMarquee = (skillsArray: typeof skills, direction: 'left' | 'right') => (
    <div className="relative overflow-hidden py-8">
      {/* Left fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />

      {/* Right fade effect */}
      <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

      <div 
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-${direction} ${40 / scrollSpeed}s linear infinite`,
        }}
      >
        {/* First set */}
        {skillsArray.map((skill, index) => renderSkillIcon(skill, index))}
        {/* Duplicate set for seamless loop */}
        {skillsArray.map((skill, index) => renderSkillIcon(skill, index + skillsArray.length))}
      </div>
    </div>
  );

  return (
    <div>
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="min-h-screen  py-5 relative overflow-hidden" ref={sectionRef}>
        {/* Floating Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-bronze/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-charcoal/3 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-cream/10 rounded-full blur-2xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div 
              className={`text-center mb-20 transition-all duration-100 ${
                isVisible('header') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
              data-animate="header"
            >
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-5 py-2.5 mb-8 border border-gray-200/50 shadow-sm">
                <Code className="w-4 h-4 text-accent-charcoal" />
                <span className="font-body text-sm font-medium text-accent-charcoal tracking-wide">technical expertise</span>
              </div>

              <h2 className="font-heading text-5xl lg:text-7xl font-bold mb-6 text-theme-black tracking-tight">
                Skills & Technologies
                <div className="w-24 h-1 bg-accent-charcoal mx-auto mt-4 rounded-full"></div>
              </h2>

              <p className="text-theme-gray-600 font-body text-xl leading-relaxed max-w-3xl mx-auto font-light tracking-wide">
                A comprehensive toolkit of modern technologies and frameworks I use to build exceptional digital experiences
              </p>
            </div>

            {/* First Marquee */}
            <div 
              className={` transition-all duration-1000 delay-300 ${
                isVisible('skills1') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              data-animate="skills1"
            >
              {renderMarquee(firstHalfSkills, 'left')}
            </div>

            {/* Second Marquee */}
            <div 
              className={`mb-16 transition-all duration-1000 delay-500 ${
                isVisible('skills2') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              data-animate="skills2"
            >
              {renderMarquee(secondHalfSkills, 'right')}
            </div>

            {/* Call to Action */}
            <div 
              className={`text-center transition-all duration-1000 delay-700 ${
                isVisible('cta') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              data-animate="cta"
            >
              <div className="mb-5 inline-flex items-center space-x-3 text-accent-charcoal bg-white/60 backdrop-blur-sm px-8 py-4 rounded-full border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                <Zap className="w-5 h-5 animate-pulse" />
                <span className="font-body text-lg font-medium tracking-wide">ready to build something amazing together?</span>
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
