import React from 'react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-eazypost-blue py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Privacy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Privacy <span className="text-eazypost-red">Policy</span>
          </h1>
          <div className="w-20 h-1 bg-eazypost-red mx-auto mt-6"></div>
          <p className="mt-8 text-xl text-gray-200 max-w-3xl mx-auto">
            Ensuring the highest standards of data protection and client confidentiality.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">Data Collection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At EazyPost LLC, we secure vital information required to facilitate global logistics:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center font-medium"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Full legal contact identification</li>
              <li className="flex items-center font-medium"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Precise geo-spatial shipping coordinates</li>
              <li className="flex items-center font-medium"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Secure transactional data protocols</li>
              <li className="flex items-center font-medium"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Shipment manifest history</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">Operational Usage</h2>
            <p className="text-gray-700 leading-relaxed">
              Your data is utilized strictly for the execution of logistics services, route optimization, customs compliance, and real-time security monitoring. EazyPost LLC does not sell client data to third-party marketing entities.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">Global Security Protocol</h2>
            <p className="text-gray-700 leading-relaxed">
              We employ enterprise-grade encryption for all data-at-rest and data-in-transit. Our servers are monitored 24/7 to prevent unauthorized access and ensure total operational continuity.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">Client Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You retain the right to audit your personal data held by EazyPost LLC, request corrections, or mandate the deletion of non-essential records in accordance with GDPR and international privacy standards.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Official Policy 2026
            </p>
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-eazypost-blue font-black uppercase text-xs tracking-widest border-2 border-eazypost-blue hover:bg-eazypost-blue hover:text-white transition-all shadow-lg"
            >
              Privacy Officer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;