import React from 'react';
import { Link } from 'react-router-dom';

const Legal: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-eazypost-blue py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Legal"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Legal <span className="text-eazypost-red">Notices</span>
          </h1>
          <div className="w-20 h-1 bg-eazypost-red mx-auto mt-6"></div>
          <p className="mt-8 text-xl text-gray-200 max-w-3xl mx-auto">
            Important legal information and regulatory compliance for EazyPost LLC.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">1. Company Registration</h2>
            <p className="text-gray-700 leading-relaxed">
              EazyPost LLC is a registered logistics company operating in full compliance with international trade laws and federal transportation regulations. All business activities are conducted under the applicable jurisdictions governing global freight and courier services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">2. Regulatory Compliance</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              EazyPost LLC adheres to all applicable international, federal, and local regulations including:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> International Air Transport Association (IATA) regulations</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Customs-Trade Partnership Against Terrorism (C-TPAT)</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> General Data Protection Regulation (GDPR) standards</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-eazypost-red mr-3"></span> Federal Motor Carrier Safety Administration (FMCSA) guidelines</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">3. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All trademarks, service marks, logos, and content displayed on this platform are the exclusive property of EazyPost LLC. Unauthorized use, reproduction, or distribution of any intellectual property is strictly prohibited and may result in legal action.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">4. Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">
              Any disputes arising from services provided by EazyPost LLC shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. Clients agree to submit to the jurisdiction of the designated arbitration forum.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight mb-6 border-l-4 border-eazypost-red pl-4">5. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These legal notices and all service agreements shall be governed by and construed in accordance with the laws of the United States and the State of Delaware, without regard to its conflict of law provisions.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Official Notice 2026
            </p>
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-eazypost-blue font-black uppercase text-xs tracking-widest border-2 border-eazypost-blue hover:bg-eazypost-blue hover:text-white transition-all shadow-lg"
            >
              Legal Inquiries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
