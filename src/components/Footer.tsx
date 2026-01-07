import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPlane, FaShip, FaTruck, FaWarehouse } from 'react-icons/fa';
import Icon from './icons/Icon';
import Logo from './Logo';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleNavClick = (to: string) => {
    if (to.startsWith('/#')) {
      const id = to.substring(2);
      if (window.location.pathname === '/') {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(to);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className={`${isDarkMode ? 'bg-eazypost-dark border-t border-gray-800' : 'bg-eazypost-blue'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Logo className="!bg-transparent" />
            <p className="text-gray-300 text-sm leading-relaxed">
              EazyPost LLC is your premier partner in global logistics and courier solutions.
              We provide professional shipping services with unmatched reliability and speed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-eazypost-red pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><button onClick={() => handleNavClick('/')} className="text-gray-300 hover:text-eazypost-red transition-colors text-sm">Home</button></li>
              <li><button onClick={() => handleNavClick('/#about')} className="text-gray-300 hover:text-eazypost-red transition-colors text-sm">About Us</button></li>
              <li><button onClick={() => handleNavClick('/#services')} className="text-gray-300 hover:text-eazypost-red transition-colors text-sm">Our Services</button></li>
              <li><button onClick={() => handleNavClick('/track')} className="text-gray-300 hover:text-eazypost-red transition-colors text-sm">Track Package</button></li>
              <li><button onClick={() => handleNavClick('/contact')} className="text-gray-300 hover:text-eazypost-red transition-colors text-sm">Contact</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-eazypost-red pb-2 inline-block">
              Support
            </h3>
            <ul className="space-y-3">
              <li><button onClick={() => handleNavClick('/faq')} className="text-gray-300 hover:text-eazypost-red transition-colors text-sm">FAQ</button></li>
              <li><button onClick={() => handleNavClick('/privacy')} className="text-gray-300 hover:text-eazypost-red transition-colors text-sm">Privacy Policy</button></li>
              <li><button onClick={() => handleNavClick('/terms')} className="text-gray-300 hover:text-eazypost-red transition-colors text-sm">Terms & Conditions</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-eazypost-red pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-300">
                <Icon icon={FaEnvelope} size={16} className="text-eazypost-red mt-1" />
                <a href="mailto:support@eazypost.com" className="hover:text-eazypost-red text-sm transition-colors">support@eazypost.com</a>
              </li>
              <li className="flex items-start space-x-3 text-gray-300">
                <Icon icon={FaMapMarkerAlt} size={16} className="text-eazypost-red mt-1" />
                <span className="text-sm">Global Operations Center, Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-400">
            <p>© 2026 EazyPost LLC. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 