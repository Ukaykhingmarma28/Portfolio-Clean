import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Sitemap = () => {
  const sections = [
    {
      id: 'hero',
      title: 'Home',
      description: 'Welcome page and introduction',
      path: '/#hero'
    },
    {
      id: 'about',
      title: 'About',
      description: 'Learn more about my background and story',
      path: '/#about'
    },
    {
      id: 'skills',
      title: 'Skills',
      description: 'Technical skills and expertise',
      path: '/#skills'
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Portfolio of work and personal projects',
      path: '/#projects'
    },
    {
      id: 'experience',
      title: 'Experience',
      description: 'Professional work experience and roles',
      path: '/#experience'
    },
    {
      id: 'awards',
      title: 'Awards',
      description: 'Recognition and achievements',
      path: '/#awards'
    }
  ];

  const pages = [
    {
      title: 'Home',
      description: 'Main portfolio page',
      path: '/'
    },
    {
      title: 'Sitemap',
      description: 'This page - navigation overview',
      path: '/sitemap'
    }
  ];

  return (
    <div className="min-h-screen bg-theme-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-theme-black mb-4">Site Map</h1>
          <p className="text-lg text-accent-charcoal">
            Navigate through all sections of my portfolio
          </p>
        </header>

        <div className="grid gap-8">
          {/* Main Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Pages</CardTitle>
              <CardDescription>Main navigation pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {pages.map((page) => (
                  <div key={page.path} className="border-l-4 border-accent-bronze pl-4">
                    <Link 
                      to={page.path}
                      className="text-lg font-semibold text-theme-black hover:text-accent-bronze transition-colors"
                    >
                      {page.title}
                    </Link>
                    <p className="text-accent-charcoal mt-1">{page.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Sections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Portfolio Sections</CardTitle>
              <CardDescription>Different sections of the main portfolio page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {sections.map((section) => (
                  <div key={section.id} className="border-l-4 border-accent-bronze pl-4">
                    <a 
                      href={section.path}
                      className="text-lg font-semibold text-theme-black hover:text-accent-bronze transition-colors"
                    >
                      {section.title}
                    </a>
                    <p className="text-accent-charcoal mt-1">{section.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="text-center mt-8">
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-accent-bronze text-white rounded-lg hover:bg-accent-bronze/90 transition-colors"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap; 