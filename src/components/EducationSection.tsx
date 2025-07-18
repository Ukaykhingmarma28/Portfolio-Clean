
import React, { useEffect, useState, useRef } from 'react';
import { Award, BookOpen } from 'lucide-react';

const EducationSection: React.FC = () => {
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

  const certifications = [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023' },
    { name: 'Google Cloud Professional Developer', issuer: 'Google Cloud', year: '2023' },
    { name: 'Certified Kubernetes Administrator', issuer: 'CNCF', year: '2022' },
    { name: 'MongoDB Certified Developer', issuer: 'MongoDB Inc.', year: '2022' }
  ];

  const courses = [
    { name: 'Advanced React Patterns', provider: 'Epic React', year: '2023' },
    { name: 'System Design Interview', provider: 'Educative', year: '2023' },
    { name: 'Docker & Kubernetes', provider: 'Udemy', year: '2022' },
    { name: 'GraphQL with Node.js', provider: 'Pluralsight', year: '2022' }
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
            Education & Certifications
          </h2>
          <div className="w-16 h-px bg-accent-charcoal mx-auto mb-6" />
          <p className="font-body text-lg text-theme-gray-600 max-w-2xl mx-auto">
            Continuous learning and professional development in technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div 
            className={`transition-all duration-200 ${
              isVisible('certifications') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            data-animate="certifications"
          >
            <div className="bg-theme-white border border-theme-gray-200 p-8 h-full">
              <div className="flex items-center space-x-3 mb-8">
                <Award className="w-6 h-6 text-accent-charcoal" />
                <h3 className="font-heading text-xl font-bold text-theme-black">
                  Professional Certifications
                </h3>
              </div>

              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div
                    key={cert.name}
                    className="flex items-start justify-between py-4 border-b border-theme-gray-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <h5 className="font-body font-medium text-theme-black mb-1">
                        {cert.name}
                      </h5>
                      <p className="font-body text-sm text-theme-gray-600">{cert.issuer}</p>
                    </div>
                    <span className="font-mono text-sm text-theme-gray-500">
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Continuous Learning */}
          <div 
            className={`transition-all duration-200 ${
              isVisible('courses') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
            data-animate="courses"
          >
            <div className="bg-theme-white border border-theme-gray-200 p-8 h-full">
              <div className="flex items-center space-x-3 mb-8">
                <BookOpen className="w-6 h-6 text-accent-bronze" />
                <h3 className="font-heading text-xl font-bold text-theme-black">
                  Continuous Learning
                </h3>
              </div>

              <div className="space-y-6">
                {courses.map((course, index) => (
                  <div
                    key={course.name}
                    className="flex items-start justify-between py-4 border-b border-theme-gray-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <h5 className="font-body font-medium text-theme-black mb-1">
                        {course.name}
                      </h5>
                      <p className="font-body text-sm text-theme-gray-600">{course.provider}</p>
                    </div>
                    <span className="font-mono text-sm text-theme-gray-500">
                      {course.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
