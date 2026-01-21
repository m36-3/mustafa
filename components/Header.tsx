
import React from 'react';
import { PageType } from '../types';
import { WEBSITE_LOGO_URL } from '../assets';

interface HeaderProps {
  onLogout: () => void;
  onNav: (page: PageType) => void;
  currentPage: PageType;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onNav, currentPage }) => {
  return (
    <header className="bg-white text-medicalBlue shadow-md sticky top-0 z-40 border-b-2 border-medicalBlue/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Right side: Logo and Title */}
        <div className="flex items-center gap-4">
          <img 
            src={WEBSITE_LOGO_URL} 
            alt="Ministry of Health Logo" 
            className="h-16 w-auto object-contain pl-4"
          />
          <div className="border-r-2 border-gray-200 pr-4">
            <h1 className="text-xl font-black text-medicalBlue leading-none">وزارة الصحة العراقية</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">National Digital Medical Registry</p>
          </div>
        </div>

        {/* Left side: Navigation and Logout */}
        <nav className="flex items-center gap-6">
          <button 
            onClick={() => onNav('DASHBOARD')}
            className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${currentPage === 'DASHBOARD' ? 'bg-medicalBlue text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            لوحة التحكم
          </button>
          
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
          >
            <span>خروج</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
