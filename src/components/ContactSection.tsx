
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ukaykhingmarma@gmail.com',
      href: 'mailto:ukaykhingmarma@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com'
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
            Get In Touch
          </h2>
          <div className="w-16 h-px bg-accent-charcoal mx-auto mb-6" />
          <p className="font-body text-lg text-theme-gray-600 max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div 
              className={`transition-all duration-200 ${
                isVisible('contact-info') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}
              data-animate="contact-info"
            >
              <h3 className="font-heading text-xl font-bold text-theme-black mb-8">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-4 p-4 bg-theme-white border border-theme-gray-200 hover:border-accent-charcoal transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-accent-cream rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-accent-charcoal" />
                    </div>
                    <div>
                      <h4 className="font-body font-medium text-theme-black mb-1">
                        {item.label}
                      </h4>
                      <p className="font-body text-theme-gray-600 group-hover:text-accent-charcoal transition-colors duration-200">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div 
              className={`bg-theme-white border border-theme-gray-200 p-6 transition-all duration-200 ${
                isVisible('availability') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}
              data-animate="availability"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-2 h-2 bg-accent-bronze rounded-full animate-pulse" />
                <h4 className="font-body font-medium text-theme-black">
                  Currently Available
                </h4>
              </div>
              <p className="font-body text-sm text-theme-gray-600">
                Response time: Within 24 hours
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className={`transition-all duration-200 ${
              isVisible('contact-form') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
            data-animate="contact-form"
          >
            <div className="bg-theme-white border border-theme-gray-200 p-8">
              <h3 className="font-heading text-xl font-bold text-theme-black mb-6">
                Send a Message
              </h3>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-accent-bronze mx-auto mb-4" />
                  <h4 className="font-heading text-lg font-bold text-theme-black mb-2">
                    Message Sent!
                  </h4>
                  <p className="font-body text-theme-gray-600">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block font-body text-sm font-medium text-theme-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-theme-gray-300 focus:border-accent-charcoal focus:outline-none transition-all duration-200 font-body"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-body text-sm font-medium text-theme-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-theme-gray-300 focus:border-accent-charcoal focus:outline-none transition-all duration-200 font-body"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-body text-sm font-medium text-theme-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-theme-gray-300 focus:border-accent-charcoal focus:outline-none transition-all duration-200 font-body"
                      placeholder="Project Discussion"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-body text-sm font-medium text-theme-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-theme-gray-300 focus:border-accent-charcoal focus:outline-none transition-all duration-200 resize-none font-body"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-theme-black text-theme-white py-4 hover:bg-accent-charcoal transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-body font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-theme-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
