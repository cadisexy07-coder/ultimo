
import React, { useState } from 'react';
import { Hotel } from '../types';
import { formatCurrency } from '../utils/formatter';

// Dados simulados enriquecidos
const mockHotels: Hotel[] = [
  { 
    id: 1, 
    name: 'EPIC SANA Luanda Hotel', 
    location: 'Rua da Missão, Luanda',
    rating: 5, 
    pricePerNight: 485000, 
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop', 
    description: 'O hotel mais cosmopolita de Luanda. Oferece elegância exclusiva, o renomado Sayanna Wellness & Spa, gastronomia requintada e vistas panorâmicas sobre a Baía.',
    amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant']
  },
  { 
    id: 2, 
    name: 'InterContinental Luanda Miramar', 
    location: 'Miramar, Luanda',
    rating: 5, 
    pricePerNight: 750000, 
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop', 
    description: 'O ícone arquitetónico de Luanda. Quartos com vista panorâmica para o mar, ideal para celebrar o fim de ano com exclusividade.',
    amenities: ['wifi', 'pool', 'gym', 'bar', 'meeting_room']
  },
  { 
    id: 3, 
    name: 'Hotel Trópico', 
    location: 'Maianga, Luanda',
    rating: 4, 
    pricePerNight: 395000, 
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop', 
    description: 'Um clássico no coração de Luanda. Ambiente sofisticado e renovado, excelente gastronomia e piscina relaxante.',
    amenities: ['wifi', 'pool', 'restaurant', 'breakfast']
  },
  { 
    id: 4, 
    name: 'Hotel Baía', 
    location: 'Nova Marginal, Luanda',
    rating: 4, 
    pricePerNight: 380000, 
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop', 
    description: 'Situado na nova marginal, acorde com a melhor vista da Baía de Luanda. Modernidade e localização privilegiada.',
    amenities: ['wifi', 'gym', 'restaurant', 'parking']
  },
  { 
    id: 5, 
    name: 'Palmeiras Suite Hotel', 
    location: 'Talatona, Luanda',
    rating: 4, 
    pricePerNight: 420000, 
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-6e53ce41be03?q=80&w=2070&auto=format&fit=crop', 
    description: 'O refúgio perfeito em Talatona. Suites espaçosas cercadas por jardins tropicais e piscinas, ideal para famílias.',
    amenities: ['wifi', 'pool', 'family', 'garden']
  },
   { 
    id: 6, 
    name: 'RK Suite Hotel', 
    location: 'Luanda, Centro',
    rating: 4, 
    pricePerNight: 290000, 
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop', 
    description: 'Conforto executivo e elegância no centro da cidade. Design contemporâneo e serviços personalizados.',
    amenities: ['wifi', 'gym', 'desk', 'breakfast']
  }
];

// Ícones de Comodidades
const AmenityIcon: React.FC<{ type: string }> = ({ type }) => {
    switch (type) {
        case 'wifi': return <span title="Wi-Fi Grátis" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg></span>;
        case 'pool': return <span title="Piscina" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></span>; // Simplified icon
        case 'gym': return <span title="Ginásio" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg></span>;
        case 'restaurant': return <span title="Restaurante" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg></span>;
        case 'spa': return <span title="Spa & Bem-estar" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span>;
        case 'bar': return <span title="Bar / Lounge" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></span>;
        case 'meeting_room': return <span title="Sala de Reuniões" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></span>;
        case 'family': return <span title="Familiar" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></span>;
        case 'garden': return <span title="Jardim" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span>;
        case 'desk': return <span title="Mesa de Trabalho" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"></path></svg></span>;
        case 'parking': return <span title="Estacionamento" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg></span>;
        case 'breakfast': return <span title="Pequeno-almoço" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></span>;
        default: return <span title="Comodidade" className="bg-gray-100 p-1.5 rounded text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></span>;
    }
}

const HotelBooking: React.FC = () => {
  const [checkIn, setCheckIn] = useState('2025-12-19');
  const [checkOut, setCheckOut] = useState('2025-12-20');
  
  const SERVICE_FEE_PERCENTAGE = 0.10;

  const calculateTotalPrice = (price: number) => {
    const serviceFee = price * SERVICE_FEE_PERCENTAGE;
    return price + serviceFee;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Search Hero Section - Estilo Travelgest/Agency */}
      <div className="relative bg-gray-900 pb-32">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1590447158019-883d8d5f8bc7?q=80&w=2832&auto=format&fit=crop" alt="Hotel Luxury" />
          <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Encontre a estadia perfeita.</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Dos hotéis mais luxuosos de Luanda aos refúgios em Talatona. Com a VICTÓRIA EXPRESS, sua acomodação é garantida com excelência.
          </p>
        </div>
      </div>

      {/* Search Box - Floating Overlap */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 z-10">
        <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                Pesquisar Disponibilidade (Dezembro 2025)
            </h2>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 relative">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Destino ou Hotel</label>
                    <input type="text" defaultValue="Luanda, Angola" className="block w-full border-b-2 border-gray-300 bg-white text-black focus:border-amber-500 focus:ring-0 sm:text-lg font-medium py-2 transition-colors placeholder-gray-500" placeholder="Para onde vai?" />
                </div>
                <div className="relative">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Check-in</label>
                    <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="block w-full border-b-2 border-gray-300 bg-white text-black focus:border-amber-500 focus:ring-0 sm:text-sm py-2.5" />
                </div>
                <div className="relative">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Check-out</label>
                    <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="block w-full border-b-2 border-gray-300 bg-white text-black focus:border-amber-500 focus:ring-0 sm:text-sm py-2.5" />
                </div>
                 <div className="flex items-end">
                    <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow-lg transform hover:scale-105">
                        Pesquisar
                    </button>
                </div>
            </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Pacotes Section - Inspired by Travelgest "Pacotes" */}
        <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pacotes Exclusivos VICTÓRIA EXPRESS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative rounded-xl overflow-hidden shadow-lg h-64 group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Resort" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8">
                        <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded uppercase mb-2 inline-block">Fim de Semana</span>
                        <h3 className="text-2xl font-bold text-white mb-1">Escapadinha em Mussulo</h3>
                        <p className="text-gray-200 text-sm mb-4">Inclui transporte de barco, estadia e pequeno-almoço.</p>
                        <p className="text-white font-bold text-xl">Desde 250.000 Kz</p>
                    </div>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-lg h-64 group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Business" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8">
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase mb-2 inline-block">Corporativo</span>
                        <h3 className="text-2xl font-bold text-white mb-1">Pacote Reunião Executiva</h3>
                        <p className="text-gray-200 text-sm mb-4">Sala de conferência + Coffee Break + Estadia.</p>
                        <p className="text-white font-bold text-xl">Sob Consulta</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Filters & Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 border-b border-gray-200 pb-4">
            <div>
                <h3 className="text-xl font-bold text-gray-900">Hotéis Recomendados em Luanda</h3>
                <p className="mt-1 text-sm text-gray-600">6 propriedades encontradas para suas datas.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
                 <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Preço</button>
                 <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Estrelas</button>
                 <select className="border-gray-300 rounded-md text-sm shadow-sm focus:ring-amber-500 focus:border-amber-500">
                    <option>Recomendado</option>
                    <option>Melhor Avaliação</option>
                 </select>
            </div>
        </div>
        
        {/* Hotel List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockHotels.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group">
                    <div className="relative h-56 overflow-hidden rounded-t-lg">
                        <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 left-3">
                             <span className="bg-gray-900/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                                {hotel.rating} <svg className="w-3 h-3 ml-1 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                             </span>
                        </div>
                         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            {hotel.location}
                         </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors">{hotel.name}</h3>
                        
                        {/* Amenities Icons */}
                        <div className="flex gap-2 mb-3">
                            {hotel.amenities.map(amenity => (
                                <AmenityIcon key={amenity} type={amenity} />
                            ))}
                        </div>

                        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{hotel.description}</p>
                        
                        <div className="pt-4 border-t border-gray-100 mt-auto">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">Preço por noite</p>
                                    <p className="text-xl font-bold text-gray-900">{formatCurrency(calculateTotalPrice(hotel.pricePerNight))}</p>
                                    <p className="text-[10px] text-green-600 font-medium bg-green-50 px-1 rounded inline-block">Taxas incluídas</p>
                                </div>
                                <button className="bg-gray-900 hover:bg-amber-600 text-white text-sm font-bold py-2 px-6 rounded-md transition-colors shadow">
                                    Ver Detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Why Choose Us */}
        <div className="mt-20 border-t border-gray-200 pt-12">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-10">Por que reservar com a VICTÓRIA EXPRESS?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Melhores Preços Garantidos</h4>
                    <p className="text-gray-600 text-sm mt-2">Trabalhamos diretamente com os hotéis para oferecer tarifas exclusivas em Luanda.</p>
                </div>
                <div className="p-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Suporte 24/7</h4>
                    <p className="text-gray-600 text-sm mt-2">Nossa equipe local está sempre disponível para ajudar com alterações ou emergências.</p>
                </div>
                 <div className="p-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Pagamento Seguro</h4>
                    <p className="text-gray-600 text-sm mt-2">Transações protegidas e várias opções de pagamento, incluindo Multicaixa Express.</p>
                </div>
            </div>
        </div>

        <p className="text-center mt-12 text-xs text-gray-400">
          Nota: Preços apresentados incluem taxa de serviço de {SERVICE_FEE_PERCENTAGE * 100}% da VICTÓRIA EXPRESS.
        </p>
      </div>
    </div>
  );
};

export default HotelBooking;
