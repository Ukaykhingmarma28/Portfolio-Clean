
import React, { useEffect, useState, useRef } from 'react';
import { Award } from 'lucide-react';

const AwardsSection: React.FC = () => {
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

  const awards = [
    {
      title: 'Revaluation Award',
      organization: 'BDRO',
      year: '2020',
      description: 'Build an automated harvesting robot.',
      category: '4th Place'
    },
    {
      title: 'Physics Olympiad Bangladesh National Round',
      organization: 'BdPHO',
      year: '2018, 2020',
      description: 'Participated in the Physics Olympiad Bangladesh National Round.',
      category: '15th, 10th Place'
    },
    {
      title: 'Best Innovation Award',
      organization: 'Rajuk Uttara Model college, Dhaka, Bangladesh',
      year: '2022',
      description: 'Built an automated monitoring hydroponic farming system.',
      category: '1st Place'
    },
    {
      title: 'Best research and innovation award',
      organization: 'Independent University, Bangladesh',
      year: '2025',
      description: 'built an app for students of Independent University to manage their academic life and communication with their teachers.',
      category: '1st Runner Up'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-20" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
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
            Awards & Recognition
          </h2>
          <div className="w-16 h-px bg-accent-charcoal mx-auto mb-6" />
          <p className="font-body text-lg text-theme-gray-600 max-w-2xl mx-auto">
            Recognition for excellence in software development and innovation.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {awards.map((award, index) => (
            <div
              key={award.title + award.year}
              className={`transition-all duration-200 ${
                isVisible(`award-${index}`) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-animate={`award-${index}`}
            >
              <div className="bg-theme-white border border-theme-gray-200 p-8 h-full hover:border-accent-charcoal transition-all duration-200">
                {/* Award Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent-cream rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent-charcoal" />
                    </div>
                    <span className="font-mono text-xs text-theme-gray-500 uppercase tracking-wide">
                      {award.category}
                    </span>
                  </div>
                  <div className="font-mono text-lg font-bold text-accent-charcoal">
                    {award.year}
                  </div>
                </div>

                {/* Award Details */}
                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-bold text-theme-black">
                    {award.title}
                  </h3>
                  
                  <div className="font-body text-accent-bronze font-medium">
                    {award.organization}
                  </div>

                  <p className="font-body text-theme-gray-600 leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recognition Summary */}
        <div 
          className={`mt-16 transition-all duration-200 ${
            isVisible('stats') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          data-animate="stats"
        >
          <div className="bg-theme-white border border-theme-gray-200 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '4', label: 'Major Awards' },
                { value: '2', label: 'Competition Wins' },
                { value: '50+', label: 'Projects' },
                { value: 'Top 20%', label: 'Academic Ranking' }
              ].map((stat, index) => (
                <div key={stat.label} className="space-y-2">
                  <div className="font-heading text-2xl font-bold text-theme-black">
                    {stat.value}
                  </div>
                  <div className="font-body text-sm text-theme-gray-600 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;
