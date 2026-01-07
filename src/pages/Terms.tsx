import React from 'react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-eazypost-blue py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Terms and Conditions"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Terms & <span className="text-eazypost-red">Conditions</span>
          </h1>
          <div className="w-20 h-1 bg-eazypost-red mx-auto mt-6"></div>
          <p className="mt-8 text-xl text-gray-200 max-w-3xl mx-auto">
            Professional service guidelines and legal framework for EazyPost LLC operations.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using EazyPost LLC services, you agree to be bound by these Terms and Conditions, our Privacy Policy, and all applicable international trade regulations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">2. Service Scope</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              EazyPost LLC provides high-level logistics and courier solutions including:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Precision tracking and cargo monitoring</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Multi-modal international shipping (Air, Sea, Ground)</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Secure industrial warehousing</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Customs brokerage and documentation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">3. Client Obligations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All clients and partners using EazyPost LLC infrastructure must:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Disclose accurate manifest information</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Adhere to dangerous goods safety declarations</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Maintain compliance with destination country laws</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Settle all service invoices within agreed timeframes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">4. Liability & Insurance</h2>
            <p className="text-gray-700 leading-relaxed">
              Standard liability is governed by international conventions (Montreal/Warsaw). EazyPost LLC provides secondary cargo insurance options for high-value assets. We are not liable for delays caused by government intervention or force majeure events.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">5. Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              EazyPost LLC reserves the right to adjust service rates and terms to reflect market volatility or regulatory changes. Continued usage of the platform confirms acceptance of revised terms.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Last Updated: January 2026
            </p>
            <Link
              to="/contact"
              className="px-8 py-3 bg-eazypost-blue text-white font-black uppercase text-xs tracking-widest border-b-4 border-eazypost-red hover:translate-y-[-2px] transition-all"
            >
              Legal Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;