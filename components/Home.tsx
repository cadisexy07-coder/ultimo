
import React, { useState } from 'react';
import { View } from '../types';
import PlaneIcon from './icons/PlaneIcon';
import HotelIcon from './icons/HotelIcon';
import PassportIcon from './icons/PassportIcon';

interface HomeProps {
  setView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  const [selectedService, setSelectedService] = useState<any>(null);

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

  const airportServices = [
    {
      title: 'LOUNGES',
      description: 'Relaxe antes do voo com conforto exclusivo, Wi-Fi e buffet variado.',
      image: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=2070&auto=format&fit=crop',
      details: {
        subtitle: 'O seu oásis no aeroporto',
        content: 'Os nossos lounges no Aeroporto Internacional Dr. António Agostinho Neto oferecem um ambiente tranquilo longe da agitação do terminal. Desfrute de poltronas confortáveis, chuveiros, jornais internacionais, bebidas premium e uma seleção gastronómica cuidada. Acesso gratuito para passageiros de Classe Executiva e Primeira Classe.',
        features: ['Wi-Fi de Alta Velocidade', 'Buffet Quente e Frio', 'Bar Aberto', 'Área de Trabalho', 'Chuveiros']
      }
    },
    {
      title: 'LOJAS TAAG',
      description: 'Compre bilhetes, faça alterações e obtenha suporte presencial.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
      details: {
        subtitle: 'Atendimento Personalizado',
        content: 'As lojas TAAG no aeroporto estão situadas estrategicamente nas áreas de Partidas e Chegadas. A nossa equipa está pronta para ajudar com reservas de última hora, excesso de bagagem, atualizações de classe (upgrades) e informações sobre o programa de fidelidade Umbi Umbi.',
        features: ['Emissão de Bilhetes', 'Alteração de Datas', 'Pagamento de Excesso de Bagagem', 'Informações de Voo']
      }
    },
    {
      title: 'ASSISTÊNCIA EM TERRA',
      description: 'Suporte dedicado para passageiros com necessidades especiais e mobilidade reduzida.',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop',
      details: {
        subtitle: 'Cuidamos de Si',
        content: 'A VICTÓRIA EXPRESS, em parceria com os serviços aeroportuários, garante que todos os passageiros tenham uma viagem segura e confortável. Oferecemos cadeiras de rodas, acompanhamento para menores não acompanhados e assistência prioritária no check-in e embarque.',
        features: ['Cadeiras de Rodas', 'Acompanhamento de Menores', 'Embarque Prioritário', 'Assistência Médica']
      }
    },
    {
      title: 'TRANSFERS',
      description: 'Ligações rápidas entre terminais e transporte para o centro da cidade.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
      details: {
        subtitle: 'Mobilidade Eficiente',
        content: 'Para passageiros em trânsito ou a chegar ao destino, dispomos de informações sobre autocarros de ligação, táxis licenciados e serviços de rent-a-car. Se tiver uma conexão longa, consulte-nos sobre opções de transporte para hotéis próximos.',
        features: ['Shuttle entre Terminais', 'Táxis Oficiais', 'Aluguer de Viaturas', 'Estacionamento']
      }
    },
    {
      title: 'BAGAGEM',
      description: 'Localização de perdidos e achados e proteção de malas.',
      image: 'https://images.unsplash.com/photo-1565514020176-888941549419?q=80&w=2070&auto=format&fit=crop',
      details: {
        subtitle: 'Segurança dos seus bens',
        content: 'Se a sua bagagem não chegou ao destino ou foi danificada, dirija-se imediatamente ao balcão de "Lost & Found" na área de recolha de bagagens. Também oferecemos serviços de plastificação de malas no átrio de partidas para maior proteção.',
        features: ['Rastreamento de Bagagem', 'Declaração de Irregularidade', 'Plastificação Protetora', 'Depósito de Bagagem']
      }
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

      {/* NO AEROPORTO Section - Interactive */}
      <section className="bg-gray-100 pb-20">
        {/* Banner */}
        <div className="relative h-[400px] bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
             <h2 className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-widest mb-6">NO AEROPORTO</h2>
             <div className="w-24 h-1 bg-white mb-6"></div>
             <p className="text-xl md:text-2xl text-white font-light max-w-3xl">
               A sua viagem começa no aeroporto! Conheça os serviços e comodidades disponíveis.
             </p>
             <p className="mt-4 text-amber-400 text-sm font-medium tracking-wider uppercase">
                Selecione uma opção abaixo para saber mais
             </p>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {airportServices.map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedService(item)}
                  className="bg-white group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full rounded-lg overflow-hidden text-left"
                >
                    <div className="h-64 overflow-hidden relative w-full">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        
                        {/* Overlay Icon on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <div className="bg-white/90 p-3 rounded-full shadow-lg">
                                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                             </div>
                        </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col justify-between w-full">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide group-hover:text-amber-600 transition-colors">{item.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-100">
                             <span className="text-amber-600 font-bold text-xs uppercase tracking-wider flex items-center">
                                Ver Detalhes <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                             </span>
                        </div>
                    </div>
                </button>
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

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setSelectedService(null)}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="relative h-48 sm:h-64">
                        <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">{selectedService.title}</h3>
                            <p className="text-amber-400 font-medium text-sm">{selectedService.details.subtitle}</p>
                        </div>
                        <button 
                            onClick={() => setSelectedService(null)}
                            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    
                    <div className="px-6 py-8 sm:px-10">
                        <div className="prose prose-amber max-w-none">
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                {selectedService.details.content}
                            </p>
                            
                            <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
                                <span className="bg-amber-100 text-amber-600 p-1 rounded mr-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </span>
                                O que incluímos:
                            </h4>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {selectedService.details.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-center text-gray-700 bg-gray-50 px-3 py-2 rounded border border-gray-100">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => setSelectedService(null)}
                                className="bg-gray-100 text-gray-700 font-bold py-2 px-6 rounded hover:bg-gray-200 transition-colors mr-3"
                            >
                                Fechar
                            </button>
                            <a 
                                href="https://flytaag.com/pt/Viajar-com-TAAG/No-aeroporto"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-amber-500 text-white font-bold py-2 px-6 rounded hover:bg-amber-600 transition-colors shadow-md"
                            >
                                Visitar Site Oficial
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Home;
