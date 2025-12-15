
import React from 'react';
import { View } from '../types';
import PlaneIcon from './icons/PlaneIcon';
import HotelIcon from './icons/HotelIcon';
import PassportIcon from './icons/PassportIcon';

interface HomeProps {
  setView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  const services = [
    {
      view: View.FLIGHTS,
      icon: <PlaneIcon className="h-10 w-10 text-white" />,
      title: 'Reservar Voos',
      description: 'Encontre as melhores tarifas para destinos nacionais e internacionais.'
    },
    {
      view: View.HOTELS,
      icon: <HotelIcon className="h-10 w-10 text-white" />,
      title: 'Reservar Hotéis',
      description: 'Acomodações de luxo e económicas em Luanda e arredores.'
    },
    {
      view: View.PASSPORT,
      icon: <PassportIcon className="h-10 w-10 text-white" />,
      title: 'Tratar Passaporte',
      description: 'Serviços de agendamento e emissão de passaportes de forma rápida.'
    }
  ];

  const destinations = [
    {
      city: 'Luanda',
      country: 'Angola',
      image: 'https://images.unsplash.com/photo-1628157579737-124b8969477e?q=80&w=1000&auto=format&fit=crop', // Luanda/Coast vibe
      price: 'AOA 45.000'
    },
    {
      city: 'Lisboa',
      country: 'Portugal',
      image: 'https://images.unsplash.com/photo-1548707304-441f8acd789f?q=80&w=1000&auto=format&fit=crop',
      price: 'AOA 450.000'
    },
    {
      city: 'Cidade do Cabo',
      country: 'África do Sul',
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000&auto=format&fit=crop',
      price: 'AOA 320.000'
    },
    {
      city: 'Cabinda',
      country: 'Angola',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000&auto=format&fit=crop', // Forest/Greenery representation
      price: 'AOA 35.000'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white max-w-2xl">
              <span className="bg-amber-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Novo Aeroporto AIAAN</span>
              <h1 className="mt-4 text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                Viaje com a <span className="text-amber-400">Excelência</span> que você merece.
              </h1>
              <p className="mt-6 text-xl text-gray-200">
                A VICTÓRIA EXPRESS conecta Angola ao mundo. Experimente o conforto, a segurança e a agilidade nas suas reservas.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setView(View.FLIGHTS)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 shadow-lg text-lg"
                >
                  Reservar Agora
                </button>
                <button
                  onClick={() => setView(View.CHECKIN)}
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-8 rounded-full transition-colors duration-300 text-lg"
                >
                  Check-in Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 relative -mt-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.view} className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border-b-4 border-amber-500">
                <div className="p-8">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gray-900 mx-auto shadow-lg mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">{service.description}</p>
                  <div className="text-center">
                    <button
                      onClick={() => setView(service.view)}
                      className="text-amber-600 hover:text-amber-800 font-bold uppercase text-sm tracking-wider"
                    >
                      Acessar Serviço &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Destinos Populares</h2>
            <p className="mt-4 text-lg text-gray-600">Explore as rotas mais procuradas saindo de Luanda.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <div key={idx} className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg aspect-[3/4]">
                <img 
                  src={dest.image} 
                  alt={dest.city} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                  <p className="text-sm font-medium uppercase tracking-wider text-amber-400">{dest.country}</p>
                  <h3 className="text-2xl font-bold">{dest.city}</h3>
                  <div className="mt-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-sm font-light">A partir de</p>
                    <p className="font-bold text-amber-400">{dest.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Gallery / Atmosphere */}
      <section className="py-16 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div className="max-w-xl">
                 <h2 className="text-3xl md:text-4xl font-bold">A Experiência VICTÓRIA EXPRESS</h2>
                 <p className="mt-4 text-gray-400 text-lg">
                   Do check-in online ao desembarque, cuidamos de cada detalhe. O novo Aeroporto Internacional Dr. António Agostinho Neto espera por si.
                 </p>
              </div>
              <button onClick={() => setView(View.PROFILE)} className="mt-6 md:mt-0 bg-white text-gray-900 hover:bg-amber-400 transition-colors font-bold py-3 px-8 rounded-full">
                Junte-se a Nós
              </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-96">
              <div className="lg:col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
                 <img src="https://images.unsplash.com/photo-1549637642-90187f64f420?q=80&w=2074&auto=format&fit=crop" alt="Passageiros felizes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg">
                    <p className="text-white font-medium">Momentos Inesquecíveis</p>
                 </div>
              </div>
              <div className="rounded-2xl overflow-hidden relative group">
                 <img src="https://images.unsplash.com/photo-1582234557997-6a7e089d81d4?q=80&w=2070&auto=format&fit=crop" alt="Aeroporto Moderno" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="rounded-2xl overflow-hidden relative group">
                 <img src="https://images.unsplash.com/photo-1570955986940-27c959728876?q=80&w=2070&auto=format&fit=crop" alt="Interior Aeroporto" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="lg:col-span-2 rounded-2xl overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" alt="Asa de avião" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   <div className="absolute bottom-4 right-4 bg-amber-500 px-4 py-2 rounded-lg">
                    <p className="text-gray-900 font-bold">Voe Mais Longe</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
