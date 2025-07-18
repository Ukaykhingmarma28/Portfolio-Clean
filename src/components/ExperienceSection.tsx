
import React, { useEffect, useState, useRef } from 'react';

const ExperienceSection: React.FC = () => {
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

  const experiences = [
    {
      title: 'Software, IoT & R&D Engineer',
      company: 'JaduPc',
      period: '2024 - Present',
      location: 'Dhaka, BD',
      description: [
        'Led development of Shopno OS, a Debian-based desktop operating system optimized for Bangladeshi users.',
        'Engineered a CAN Bus Simulator software for automotive testing and diagnostics.',
        'Integrated real-time data communication protocols for industrial and automotive environments.',
        'Collaborated with a cross-functional team to ensure product scalability and robustness.'
      ],
      tech: ['C++', 'Python', 'Linux', 'Qt', 'CAN Protocol']
    },
    {
      title: 'Full-Stack Developer',
      company: 'Self-Employed',
      period: '2019 - 2023',
      location: 'Remote',
      description: [
        'Developed custom web applications for local businesses and startups.',
        'Designed and deployed full-stack solutions using modern frameworks and cloud services.',
        'Built responsive and accessible user interfaces with seamless backend integrations.',
        'Handled end-to-end project lifecycle including client communication, scoping, and delivery.'
      ],
      tech: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'AWS']
    },
    {
      title: 'WordPress Developer',
      company: 'Artshala',
      period: '2017 - 2018',
      location: 'Dhaka, Bangladesh',
      description: [
        'Developed and customized WordPress themes and plugins for client websites.',
        'Optimized website performance and improved SEO rankings for multiple projects.',
        'Collaborated with designers to translate mockups into responsive websites.',
        'Provided ongoing maintenance and support to ensure site stability and uptime.'
      ],
      tech: ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript']
    }
  ];

  return (
    <div className="container mx-auto px-6 py-20" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-200 ${
            isVisible('header') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
          data-animate="header"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-theme-black">
            Experience
          </h2>
          <div className="w-16 h-px bg-accent-charcoal mx-auto mb-6" />
          <p className="font-body text-lg text-theme-gray-600 max-w-2xl mx-auto">
            Professional journey building scalable solutions across various industries.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line - moved closer to left */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-theme-gray-200" />
          
          {/* Experience List */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.company + exp.period}
                className={`relative transition-all duration-200 ${
                  isVisible(`exp-${index}`) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                data-animate={`exp-${index}`}
              >
                {/* Timeline Marker - adjusted position */}
                <div className="absolute left-2 w-4 h-4 bg-accent-charcoal rounded-full border-4 border-theme-white shadow-sm" />
                
                {/* Content - reduced left margin */}
                <div className="ml-12">
                  <div className="bg-theme-white border border-theme-gray-200 p-8 hover:border-accent-charcoal transition-all duration-200 shadow-sm hover:shadow-md">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-theme-black mb-1">
                          {exp.title}
                        </h3>
                        <div className="font-body text-accent-charcoal font-medium">
                          {exp.company}
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <div className="font-mono text-sm text-theme-gray-600">
                          {exp.period}
                        </div>
                        <div className="font-body text-sm text-theme-gray-500">
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 mb-6">
                      {exp.description.map((item, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-1 h-1 bg-accent-charcoal rounded-full mt-3 flex-shrink-0" />
                          <span className="font-body text-theme-gray-600 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs text-theme-gray-600 border border-theme-gray-200 px-2 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
