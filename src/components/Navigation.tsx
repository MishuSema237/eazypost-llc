import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { FaBars, FaTimes } from 'react-icons/fa';
import Icon from './icons/Icon';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const linkClass = (path: string) => `
    ${isDarkMode
      ? 'text-gray-300 hover:text-eazypost-red hover:bg-eazypost-dark'
      : 'text-eazypost-blue hover:text-eazypost-red hover:bg-gray-50'
    } px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300
  `;

  const activeLinkClass = `
    bg-eazypost-blue text-white hover:bg-eazypost-dark
    px-4 py-2 rounded-md text-sm font-bold shadow-md transition-all duration-300
  `;

  return (
    <nav ref={menuRef} className={`${isDarkMode ? 'bg-eazypost-dark border-gray-800' : 'bg-white border-gray-100'} border-b sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div onClick={() => handleNavigation('/')} className="flex-shrink-0 cursor-pointer">
              <Logo />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-center space-x-6">
              <button onClick={() => handleNavigation('/')} className={linkClass('/')}>Home</button>
              <button onClick={() => handleNavigation('/#about')} className={linkClass('/#about')}>About</button>
              <button onClick={() => handleNavigation('/#services')} className={linkClass('/#services')}>Services</button>
              <button onClick={() => handleNavigation('/contact')} className={linkClass('/contact')}>Contact</button>
              <button onClick={() => handleNavigation('/track')} className={activeLinkClass}>Track Package</button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${isDarkMode
                  ? 'text-gray-400 hover:text-eazypost-red hover:bg-eazypost-dark'
                  : 'text-eazypost-blue hover:text-eazypost-red hover:bg-gray-100'
                }`}
            >
              <span className="sr-only">Open main menu</span>
              <Icon icon={isOpen ? FaTimes : FaBars} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full drop-shadow-2xl">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${isDarkMode
              ? 'bg-eazypost-dark border-t border-gray-800'
              : 'bg-white border-t border-gray-100'
            }`}>
            <button onClick={() => handleNavigation('/')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium">Home</button>
            <button onClick={() => handleNavigation('/#about')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium">About</button>
            <button onClick={() => handleNavigation('/#services')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium">Services</button>
            <button onClick={() => handleNavigation('/contact')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium">Contact</button>
            <button onClick={() => handleNavigation('/track')} className="block w-full text-left px-3 py-2 bg-eazypost-blue text-white rounded-md text-base font-bold">Track Package</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 