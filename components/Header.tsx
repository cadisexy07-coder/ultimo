
import React, { useState } from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navItems = [
    { view: View.HOME, label: 'Menu Inicial' },
    { view: View.FLIGHTS, label: 'Voos' },
    { view: View.CHECKIN, label: 'Check-in' },
    { view: View.PROFILE, label: 'Perfil' },
  ];
  
  const servicesItems = [
    { view: View.HOTELS, label: 'Reservas Hoteleiras' },
    { view: View.PASSPORT, label: 'Emissão de Passaporte' },
  ];

  const NavLink: React.FC<{ view: View; label: string; isMobile?: boolean }> = ({ view, label, isMobile = false }) => (
    <button
      onClick={() => {
        setView(view);
        if (isMobile) setIsMenuOpen(false);
      }}
      className="text-white hover:text-amber-300 transition-colors duration-300 py-2 px-3 rounded-md text-sm font-bold uppercase tracking-wide"
    >
      {label}
    </button>
  );
  
  const ServicesDropdown: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
    <div className="relative" onMouseEnter={() => !isMobile && setIsServicesOpen(true)} onMouseLeave={() => !isMobile && setIsServicesOpen(false)}>
      <button onClick={() => isMobile && setIsServicesOpen(!isServicesOpen)} className="text-white hover:text-amber-300 transition-colors duration-300 py-2 px-3 rounded-md text-sm font-bold uppercase tracking-wide flex items-center">
        Serviços
        <svg className={`w-4 h-4 ml-1 transform transition-transform ${isServicesOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      {isServicesOpen && (
        <div className={`${isMobile ? 'static' : 'absolute'} z-20 ${isMobile ? 'pl-4' : 'bg-gray-800 rounded-md shadow-lg mt-1 w-56'}`}>
          {servicesItems.map(item => (
            <button
              key={item.view}
              onClick={() => {
                setView(item.view);
                if (isMobile) {
                  setIsServicesOpen(false);
                  setIsMenuOpen(false);
                }
              }}
              className="block w-full text-left px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-300 hover:bg-gray-700 hover:text-white border-b border-gray-700 last:border-0"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );


  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <button onClick={() => setView(View.HOME)} className="flex items-center gap-4 group">
              <div className="flex flex-col items-start">
                <div className="flex items-baseline leading-none">
                  <span className="text-white font-serif font-bold text-2xl tracking-wide group-hover:text-gray-200 transition-colors">VICTÓRIA</span>
                  <span className="text-white font-serif font-bold text-2xl tracking-wide ml-2 group-hover:text-gray-200 transition-colors">EXPRESS</span>
                </div>
                <span className="text-[10px] text-amber-500 font-medium tracking-[0.2em] uppercase mt-1 group-hover:text-amber-400 transition-colors">Agência de Viagens Internacionais</span>
              </div>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => <NavLink key={item.view} {...item} />)}
              <ServicesDropdown />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isMenuOpen ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => <NavLink key={item.view} {...item} isMobile={true}/>)}
             <ServicesDropdown isMobile={true} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
