
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const ProjectsSection: React.FC = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Memoize projects data to prevent re-creation on every render
  const projects = useMemo(() => [
    {
      title: 'Shopno OS',
      description: 'Shopno OS is a modern, lightweight Linux-based operating system built on top of Debian 12, designed to deliver a fast, secure, and user-friendly computing experience. As a core developer at JaduPC, I am part of the team involved in the development, customization, and optimization of the OS, with a focus on both performance and usability.',
      tech: ['Debian 12', 'Bash', 'systemd', 'APT', 'GTK', 'GNOME', 'Shell Scripting', 'ISO building tools', 'Linux Kernel'],
      status: 'Live',
      liveUrl: 'https://jadupc.com/shopno-os/',
      githubUrl: 'http://git.jadupc.com/',
      year: '2024'
    },
    {
      title: 'XENO OS',
      description: 'XENO OS is a custom automotive Linux system based on AGL, built for in-vehicle infotainment and smart dashboards. I contributed to hardware integration, system service development, and performance optimization. The OS supports CAN bus, GPS, multimedia, and OTA updates, providing a secure and responsive platform for connected automotive environments.',
      tech: ['Automotive Grade Linux (AGL)', 'Flutter', 'Yocto Project', 'SystemD', 'Wayland', 'CAN Bus', 'C/C++', 'Shell Scripting'],
      status: 'Beta',
      liveUrl: 'https://xenoev.com/',
      githubUrl: '#',
      year: '2025'
    },
    {
      title: 'CAN Bus Simulator',
      description: 'CAN Bus Simulator is a software-based tool that emulates CAN bus communication for automotive and industrial systems. It supports virtual nodes, message transmission, error simulation, and real-time visualization. Ideal for development, testing, and education, it enables robust CAN protocol prototyping without needing physical hardware.',
      tech: ['Python', 'CANBUS', 'Tkinter (for GUI)', 'SocketCAN (Linux CAN interface)', 'asyncio'],
      status: 'Live',
      liveUrl: 'https://github.com/Ukaykhingmarma28/canbus-simulator',
      githubUrl: 'https://github.com/Ukaykhingmarma28/canbus-simulator',
      year: '2025'
    },
    {
      title: 'IUB Nest',
      description: 'IUB Nest is a mobile companion app for students of Independent University, Bangladesh (IUB). Built by CSE students, it combines IRAS, Google Classroom, and Calendar into one secure, user-friendly platform. Designed for both iOS and Android, it streamlines academic life with centralized access to essential tools.',
      tech: ['NextJS', 'Google API', 'Typescript', 'PWA'],
      status: 'Live',
      liveUrl: 'https://iubnest.vercel.app/',
      githubUrl: '#',
      year: '2024'
    }
  ], []);

  // Memoize intersection observer to prevent recreation
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const elementId = entry.target.getAttribute('data-animate');
        if (elementId) {
          setVisibleElements(prev => new Set([...prev, elementId]));
        }
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { 
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'
    });

    const elementsToObserve = sectionRef.current?.querySelectorAll('[data-animate]');
    elementsToObserve?.forEach(el => observer.observe(el));

    return () => {
      elementsToObserve?.forEach(el => observer.unobserve(el));
    };
  }, [observerCallback]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);
    
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const isVisible = useCallback((elementId: string) => visibleElements.has(elementId), [visibleElements]);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'Live': return 'bg-accent-bronze text-theme-white';
      case 'Beta': return 'bg-accent-charcoal text-theme-white';
      case 'Development': return 'bg-theme-gray-200 text-theme-gray-700';
      default: return 'bg-theme-gray-200 text-theme-gray-700';
    }
  }, []);

  const handleScrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const handleScrollNext = useCallback(() => api?.scrollNext(), [api]);
  const handleScrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    <div className="container mx-auto px-4 py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`mb-8 transition-all duration-200 ${
            isVisible('header') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
          data-animate="header"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-theme-black">
              Selected Work
            </h2>
            <div className="w-16 h-px bg-accent-charcoal mx-auto mb-6" />
            <p className="font-body text-lg text-theme-gray-600">
              A collection of projects showcasing technical expertise and design thinking.
            </p>
          </div>
        </div>

        {/* Navigation Arrows in Header */}
        <div className="flex justify-center mb-8 relative">
          <div className="flex items-center space-x-8">
            <button
              onClick={handleScrollPrev}
              className="h-12 w-12 border-2 border-theme-gray-300 bg-theme-white hover:bg-theme-gray-50 hover:border-accent-charcoal rounded-full flex items-center justify-center transition-all duration-200"
              aria-label="Previous project"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={handleScrollNext}
              className="h-12 w-12 border-2 border-theme-gray-300 bg-theme-white hover:bg-theme-gray-50 hover:border-accent-charcoal rounded-full flex items-center justify-center transition-all duration-200"
              aria-label="Next project"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Projects Carousel */}
        <div 
          className={`transition-all duration-200 ${
            isVisible('carousel') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          data-animate="carousel"
        >
          <div className="relative">
            <Carousel 
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {projects.map((project, index) => (
                  <CarouselItem key={`${project.title}-${index}`} className="md:basis-1/2 lg:basis-1/2 pl-2">
                    <div className="p-2">
                      <div className="bg-theme-white border border-theme-gray-200 p-8 md:h-[450px] h-[700px] flex flex-col hover:border-accent-charcoal transition-all duration-200">
                        {/* Project Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="font-mono text-xs text-theme-gray-500">
                                {project.year}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(project.status)}`}>
                                {project.status}
                              </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-theme-black mb-3">
                              {project.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="font-body text-theme-gray-600 mb-6 leading-relaxed flex-1">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-xs text-theme-gray-600 border border-theme-gray-200 px-2 py-1"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4 mt-auto">
                          <button className="flex items-center space-x-2 text-theme-black hover:text-accent-charcoal transition-colors duration-200 font-body text-sm">
                            <ExternalLink size={16} />
                            <span>View Live</span>
                          </button>
                          <button className="flex items-center space-x-2 text-theme-gray-600 hover:text-theme-black transition-colors duration-200 font-body text-sm">
                            <Github size={16} />
                            <span>Code</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index + 1 === current
                    ? 'bg-accent-charcoal w-6'
                    : 'bg-theme-gray-300 hover:bg-theme-gray-400'
                }`}
                onClick={() => handleScrollTo(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Projects Link */}
        {/* <div 
          className={`text-center mt-16 transition-all duration-200 ${
            isVisible('view-all') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          data-animate="view-all"
        >
          <button className="group inline-flex items-center space-x-2 text-theme-black hover:text-accent-charcoal transition-colors duration-200 font-body">
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProjectsSection;
