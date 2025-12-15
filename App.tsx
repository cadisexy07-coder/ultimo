
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import FlightBooking from './components/FlightBooking';
import HotelBooking from './components/HotelBooking';
import PassportServices from './components/PassportServices';
import Profile from './components/Profile';
import CheckIn from './components/CheckIn';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Home setView={setCurrentView} />;
      case View.FLIGHTS:
        return <FlightBooking />;
      case View.HOTELS:
        return <HotelBooking />;
      case View.PASSPORT:
        return <PassportServices />;
      case View.CHECKIN:
        return <CheckIn />;
      case View.PROFILE:
        return <Profile />;
      default:
        return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
