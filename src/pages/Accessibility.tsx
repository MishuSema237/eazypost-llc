import React from 'react';
import { Link } from 'react-router-dom';

const Accessibility: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-eazypost-blue py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Accessibility"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            <span className="text-eazypost-red">Accessibility</span>
          </h1>
          <div className="w-20 h-1 bg-eazypost-red mx-auto mt-6"></div>
          <p className="mt-8 text-xl text-gray-200 max-w-3xl mx-auto">
            EazyPost LLC is committed to ensuring digital accessibility for all users.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed">
              EazyPost LLC is dedicated to providing an accessible online experience for all visitors, including those with disabilities. We continuously work to improve our digital platform to meet the highest standards of accessibility and usability.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">Accessibility Standards</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website is designed to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines outline best practices for making web content more accessible to people with a wide range of disabilities:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Perceivable: Information and user interface components must be presentable to users</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Operable: User interface components and navigation must be operable</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Understandable: Information and operation of the interface must be understandable</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Robust: Content must be robust enough to be interpreted by assistive technologies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">Accessibility Features</h2>
            <p className="text-gray-700 leading-relaxed">
              Our platform includes a range of accessibility features including keyboard navigation, screen reader compatibility, high contrast visual elements, and scalable text options to accommodate diverse user needs.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">Ongoing Improvements</h2>
            <p className="text-gray-700 leading-relaxed">
              Accessibility is an ongoing effort. EazyPost LLC regularly reviews and updates our digital properties to ensure compliance with evolving accessibility standards and to incorporate user feedback for continuous improvement.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Last Reviewed: June 2026
            </p>
            <Link
              to="/contact"
              className="px-8 py-3 bg-eazypost-blue text-white font-black uppercase text-xs tracking-widest border-b-4 border-eazypost-red hover:translate-y-[-2px] transition-all"
            >
              Accessibility Feedback
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
