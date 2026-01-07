import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import Icon from '../components/icons/Icon';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center">
        <div className="relative mb-12">
          <div className="text-[12rem] font-black text-gray-100 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center mt-8">
            <Icon icon={FaExclamationTriangle} className="text-6xl text-eazypost-red animate-pulse" />
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-eazypost-blue uppercase tracking-tight mb-4">
          ROUTE <span className="text-eazypost-red">MISPLACED</span>
        </h1>
        <div className="w-16 h-1 bg-eazypost-red mx-auto mb-8"></div>

        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          The requested resource is currently unavailable or has been rerouted within our global network. Please return to the command center or track an existing manifest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/"
            className="flex items-center justify-center px-8 py-4 bg-eazypost-blue text-white font-black uppercase text-sm tracking-widest rounded-sm hover:translate-y-[-2px] transition-all"
          >
            <Icon icon={FaHome} className="mr-3" /> Dashboard
          </Link>
          <Link
            to="/track"
            className="flex items-center justify-center px-8 py-4 border-2 border-eazypost-blue text-eazypost-blue font-black uppercase text-sm tracking-widest rounded-sm hover:bg-eazypost-blue hover:text-white transition-all shadow-lg"
          >
            <Icon icon={FaSearch} className="mr-3" /> Track Manifest
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link to="/contact" className="text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-eazypost-red transition-colors">
            Contact Support Operations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;