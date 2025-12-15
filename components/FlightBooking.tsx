
import React, { useState } from 'react';
import { Flight } from '../types';
import { formatCurrency } from '../utils/formatter';

// Dados simulados baseados em operações reais a partir de Luanda (LAD) - Atualizado com base na oferta TAAG
const mockFlights: Flight[] = [
    // Rota: Lisboa (LIS) - Preço atualizado conforme imagem
    { 
        id: 'DT 650', 
        airline: 'TAAG Angola Airlines', 
        logoUrl: '', 
        origin: 'Luanda (LAD)', 
        destination: 'Lisboa (LIS)', 
        departureTime: '23:50', 
        arrivalTime: '06:25', 
        duration: '7h 35m', 
        price: 702130 
    },
    // Rota: Cidade do Cabo (CPT)
    { 
        id: 'DT 579', 
        airline: 'TAAG Angola Airlines', 
        logoUrl: '', 
        origin: 'Luanda (LAD)', 
        destination: 'Cidade do Cabo (CPT)', 
        departureTime: '09:00', 
        arrivalTime: '14:00', 
        duration: '4h 00m', 
        price: 574745 
    },
    // Rota: Joanesburgo (JNB)
    { 
        id: 'DT 577', 
        airline: 'TAAG Angola Airlines', 
        logoUrl: '', 
        origin: 'Luanda (LAD)', 
        destination: 'Joanesburgo (JNB)', 
        departureTime: '10:00', 
        arrivalTime: '14:20', 
        duration: '3h 20m', 
        price: 530168 
    },
    // Rota: São Tomé (TMS)
    { 
        id: 'DT 502', 
        airline: 'TAAG Angola Airlines', 
        logoUrl: '', 
        origin: 'Luanda (LAD)', 
        destination: 'São Tomé (TMS)', 
        departureTime: '11:00', 
        arrivalTime: '13:00', 
        duration: '2h 00m', 
        price: 491199 
    },
     // Rota: Rio de Janeiro (GIG)
    { 
        id: 'DT 741', 
        airline: 'TAAG Angola Airlines', 
        logoUrl: '', 
        origin: 'Luanda (LAD)', 
        destination: 'Rio de Janeiro (GIG)', 
        departureTime: '13:30', 
        arrivalTime: '18:30', 
        duration: '9h 00m', 
        price: 1717854 
    },
    // Rota: Frankfurt (FRA)
    { 
        id: 'LH 561', 
        airline: 'Lufthansa', // Mantendo LH como opção, mas preço alinhado
        logoUrl: '', 
        origin: 'Luanda (LAD)', 
        destination: 'Frankfurt (FRA)', 
        departureTime: '22:45', 
        arrivalTime: '07:20', 
        duration: '8h 35m', 
        price: 1143032 
    },
    
    // Outras rotas (mantidas para variedade)
    { 
        id: 'EK 794', 
        airline: 'Emirates', 
        logoUrl: '', 
        origin: 'Luanda (LAD)', 
        destination: 'Dubai (DXB)', 
        departureTime: '18:15', 
        arrivalTime: '05:05', 
        duration: '8h 50m', 
        price: 1350000 
    },
    { 
        id: 'AF 929', 
        airline: 'Air France', 
        logoUrl: '', 
        origin: 'Luanda (LAD)', 
        destination: 'Paris (CDG)', 
        departureTime: '21:30', 
        arrivalTime: '06:20', 
        duration: '8h 50m', 
        price: 1280000 
    },
];

const promoFlights = [
    {
        city: 'LISBOA',
        price: 702130,
        image: 'https://images.unsplash.com/photo-1513366853604-56c4af638697?q=80&w=2070&auto=format&fit=crop' // Lisboa
    },
    {
        city: 'CIDADE DO CABO',
        price: 574745,
        image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2070&auto=format&fit=crop' // Cape Town
    },
    {
        city: 'JOANESBURGO',
        price: 530168,
        image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=2070&auto=format&fit=crop' // Johannesburg
    },
    {
        city: 'SÃO TOMÉ',
        price: 491199,
        image: 'https://images.unsplash.com/photo-1596485078044-846114eb1a4f?q=80&w=2070&auto=format&fit=crop' // Tropical/Island representation
    },
    {
        city: 'RIO DE JANEIRO',
        price: 1717854,
        image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop' // Rio
    },
    {
        city: 'FRANKFURT',
        price: 1143032,
        image: 'https://images.unsplash.com/photo-1563278271-e7a83d7cb45d?q=80&w=2070&auto=format&fit=crop' // Frankfurt
    }
];

type BookingStep = 'search' | 'details' | 'processing' | 'success';

const FlightBooking: React.FC = () => {
    const [tripType, setTripType] = useState('round-trip');
    const [showResults, setShowResults] = useState(false);
    
    // Booking Flow State
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const [bookingStep, setBookingStep] = useState<BookingStep>('search');
    const [passengerName, setPassengerName] = useState('');
    const [passportNumber, setPassportNumber] = useState('');

    const SERVICE_FEE_PERCENTAGE = 0.10;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setShowResults(true);
        setBookingStep('search');
    };

    const handleSelectFlight = (flight: Flight) => {
        setSelectedFlight(flight);
        setBookingStep('details');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePromoSelect = (cityName: string) => {
        // Encontra um voo correspondente ou apenas abre os resultados
        const cityMap: Record<string, string> = {
            'LISBOA': 'Lisboa (LIS)',
            'CIDADE DO CABO': 'Cidade do Cabo (CPT)',
            'JOANESBURGO': 'Joanesburgo (JNB)',
            'SÃO TOMÉ': 'São Tomé (TMS)',
            'RIO DE JANEIRO': 'Rio de Janeiro (GIG)',
            'FRANKFURT': 'Frankfurt (FRA)'
        };
        
        const destination = cityMap[cityName];
        if (destination) {
             const input = document.getElementById('destination') as HTMLInputElement;
             if(input) input.value = destination;
             setShowResults(true);
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleConfirmBooking = (e: React.FormEvent) => {
        e.preventDefault();
        setBookingStep('processing');
        // Simular processamento
        setTimeout(() => {
            setBookingStep('success');
        }, 2000);
    };

    const resetBooking = () => {
        setBookingStep('search');
        setSelectedFlight(null);
        setPassengerName('');
        setPassportNumber('');
    };

    const generateTicketPDF = () => {
        if (!selectedFlight) return;

        const totalPrice = selectedFlight.price + (selectedFlight.price * SERVICE_FEE_PERCENTAGE);
        const ticketDate = new Date().toLocaleDateString('pt-AO');
        const ticketRef = `TKT-${Math.floor(Math.random() * 1000000)}`;

        const ticketHTML = `
            <html>
            <head>
                <title>Bilhete Eletrónico - VICTÓRIA EXPRESS</title>
                <style>
                    body { font-family: 'Courier New', Courier, monospace; background-color: #f3f4f6; padding: 40px; -webkit-print-color-adjust: exact; }
                    .ticket { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e5e7eb; }
                    .header { background: #111827; color: white; padding: 20px; display: flex; justify-content: space-between; items-items: center; }
                    .header h1 { margin: 0; font-size: 24px; letter-spacing: 2px; }
                    .header span { color: #f59e0b; font-weight: bold; }
                    .content { padding: 30px; }
                    .row { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 15px; }
                    .col { flex: 1; }
                    .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
                    .value { font-size: 18px; font-weight: bold; color: #111827; }
                    .flight-route { display: flex; align-items: center; justify-content: center; margin: 30px 0; background: #fef3c7; padding: 15px; border-radius: 8px; }
                    .flight-route .city { font-size: 24px; font-weight: 800; color: #111827; }
                    .flight-route .arrow { margin: 0 20px; font-size: 24px; color: #f59e0b; }
                    .footer { background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; }
                    .footer p { font-size: 12px; color: #9ca3af; margin: 0; }
                    .barcode { margin-top: 20px; height: 50px; background: repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px); width: 80%; margin-left: auto; margin-right: auto; }
                    .status { color: green; border: 2px solid green; padding: 5px 10px; border-radius: 4px; display: inline-block; font-weight: bold; transform: rotate(-10deg); float: right; }
                </style>
            </head>
            <body>
                <div class="ticket">
                    <div class="header">
                        <h1>VICTÓRIA <span>EXPRESS</span></h1>
                        <div style="text-align: right;">
                            <div style="font-size: 12px; opacity: 0.8;">BOARDING PASS</div>
                            <div>${selectedFlight.airline}</div>
                        </div>
                    </div>
                    <div class="content">
                        <div style="text-align: right; margin-bottom: 20px;">
                            <span class="status">EMITIDO / CONFIRMADO</span>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="label">Passageiro</div>
                                <div class="value">${passengerName.toUpperCase()}</div>
                            </div>
                            <div class="col">
                                <div class="label">Referência</div>
                                <div class="value">${ticketRef}</div>
                            </div>
                            <div class="col" style="text-align: right;">
                                <div class="label">Data de Emissão</div>
                                <div class="value">${ticketDate}</div>
                            </div>
                        </div>

                        <div class="flight-route">
                            <div class="city">${selectedFlight.origin.split('(')[1].replace(')', '')}</div>
                            <div class="arrow">✈</div>
                            <div class="city">${selectedFlight.destination.split('(')[1].replace(')', '')}</div>
                        </div>

                        <div class="row" style="border-bottom: none;">
                            <div class="col">
                                <div class="label">Voo</div>
                                <div class="value">${selectedFlight.id}</div>
                            </div>
                             <div class="col">
                                <div class="label">Embarque</div>
                                <div class="value">${selectedFlight.departureTime}</div>
                            </div>
                             <div class="col">
                                <div class="label">Classe</div>
                                <div class="value">Económica</div>
                            </div>
                            <div class="col" style="text-align: right;">
                                <div class="label">Assento</div>
                                <div class="value">ANY</div>
                            </div>
                        </div>
                         <div class="row">
                            <div class="col">
                                <div class="label">Partida</div>
                                <div class="value">${selectedFlight.origin}</div>
                            </div>
                             <div class="col" style="text-align: right;">
                                <div class="label">Chegada</div>
                                <div class="value">${selectedFlight.destination}</div>
                            </div>
                        </div>
                         <div class="row" style="border: none; background: #f3f4f6; padding: 10px; border-radius: 6px;">
                            <div class="col">
                                <div class="label">Total Pago</div>
                                <div class="value" style="color: #059669;">${formatCurrency(totalPrice)}</div>
                            </div>
                        </div>
                        
                        <div class="barcode"></div>
                        <div style="text-align: center; margin-top: 5px; font-size: 10px; letter-spacing: 5px;">${ticketRef}99283712</div>
                    </div>
                    <div class="footer">
                        <p>Por favor, apresente este documento no balcão de check-in. O check-in fecha 60 minutos antes da partida.</p>
                        <p>Aeroporto Internacional Dr. António Agostinho Neto (AIAAN)</p>
                    </div>
                </div>
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(ticketHTML);
            printWindow.document.close();
        }
    };

    const renderPrice = (price: number) => {
        const serviceFee = price * SERVICE_FEE_PERCENTAGE;
        const totalPrice = price + serviceFee;
        return (
            <div className="text-right">
                <p className="text-xl font-bold text-gray-800">{formatCurrency(totalPrice)}</p>
                <p className="text-xs text-gray-500">
                    Tarifa: {formatCurrency(price)} <br/>
                    + Taxa Serviço ({SERVICE_FEE_PERCENTAGE * 100}%): {formatCurrency(serviceFee)}
                </p>
            </div>
        )
    }

    // Render Booking Confirmation View
    if (bookingStep === 'details' && selectedFlight) {
        return (
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-3xl mx-auto px-4">
                    <button onClick={resetBooking} className="text-gray-500 hover:text-amber-500 mb-6 flex items-center">
                        ← Voltar aos resultados
                    </button>
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className="bg-gray-900 px-6 py-4 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">Confirmar Reserva de Voo</h2>
                        </div>
                        <div className="p-6">
                            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start gap-4">
                                <div className="p-2 bg-amber-100 rounded-full">
                                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{selectedFlight.airline} - {selectedFlight.id}</h3>
                                    <p className="text-sm text-gray-600">{selectedFlight.origin} &rarr; {selectedFlight.destination}</p>
                                    <p className="text-sm text-gray-600">Horário: {selectedFlight.departureTime} - {selectedFlight.arrivalTime}</p>
                                </div>
                            </div>

                            <form onSubmit={handleConfirmBooking} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nome Completo do Passageiro</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={passengerName}
                                        onChange={(e) => setPassengerName(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                        placeholder="Como consta no passaporte"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Número do Passaporte / BI</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={passportNumber}
                                        onChange={(e) => setPassportNumber(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                    />
                                </div>

                                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total a Pagar:</span>
                                    <span className="text-2xl font-bold text-amber-600">
                                        {formatCurrency(selectedFlight.price * (1 + SERVICE_FEE_PERCENTAGE))}
                                    </span>
                                </div>

                                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Confirmar e Emitir Bilhete
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (bookingStep === 'processing') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-700">Processando sua reserva...</h2>
                    <p className="text-gray-500">Por favor, aguarde um momento.</p>
                </div>
            </div>
        );
    }

    if (bookingStep === 'success' && selectedFlight) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center border-t-8 border-green-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Reserva Confirmada!</h2>
                    <p className="text-gray-600 mb-8">
                        Seu voo para <span className="font-bold">{selectedFlight.destination}</span> foi agendado com sucesso.
                    </p>
                    
                    <div className="space-y-4">
                        <button 
                            onClick={generateTicketPDF}
                            className="w-full flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-lg"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Baixar Bilhete (PDF)
                        </button>
                        
                        <button 
                            onClick={resetBooking}
                            className="w-full text-amber-600 font-semibold hover:text-amber-700"
                        >
                            Fazer Nova Reserva
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Banner Header */}
            <div className="relative h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520105072000-f44fc083e508?q=80&w=2890&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                     <div className="text-center text-white px-4">
                        <h1 className="text-3xl md:text-5xl font-bold">Reserve o Seu Voo</h1>
                        <p className="mt-2 text-lg opacity-90">Descubra novos horizontes com a VICTÓRIA EXPRESS</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-16 relative z-10">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    
                    <form onSubmit={handleSearch}>
                        <div className="mb-6 border-b border-gray-200">
                            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                                <button type="button" onClick={() => setTripType('round-trip')} className={`${tripType === 'round-trip' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Ida e volta</button>
                                <button type="button" onClick={() => setTripType('one-way')} className={`${tripType === 'one-way' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Só ida</button>
                                <button type="button" onClick={() => setTripType('multi-city')} className={`${tripType === 'multi-city' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Multi-Destino</button>
                            </nav>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origem</label>
                                <div className="relative rounded-md shadow-sm mt-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    </div>
                                    <input type="text" id="origin" defaultValue="Luanda (LAD)" className="block w-full pl-10 border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2" />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destino</label>
                                <div className="relative rounded-md shadow-sm mt-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    </div>
                                    <input type="text" id="destination" placeholder="Para onde?" className="block w-full pl-10 border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="departure-date" className="block text-sm font-medium text-gray-700">Data de ida</label>
                                <input type="date" id="departure-date" defaultValue="2025-12-15" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2" />
                            </div>
                            <div>
                                <label htmlFor="return-date" className="block text-sm font-medium text-gray-700">Data de volta</label>
                                <input type="date" id="return-date" defaultValue="2025-12-22" disabled={tripType === 'one-way'} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2 disabled:bg-gray-100" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                            <div>
                                <label htmlFor="class" className="block text-sm font-medium text-gray-700">Classe</label>
                                <select id="class" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2">
                                    <option>Económica</option>
                                    <option>Executiva</option>
                                    <option>1ª Classe</option>
                                </select>
                            </div>
                             <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label htmlFor="adults" className="block text-sm font-medium text-gray-700">Adultos</label>
                                    <input type="number" id="adults" min="1" defaultValue="1" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2" />
                                </div>
                                <div>
                                    <label htmlFor="children" className="block text-sm font-medium text-gray-700">Crianças</label>
                                    <input type="number" id="children" min="0" defaultValue="0" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2" />
                                </div>
                                <div>
                                    <label htmlFor="infants" className="block text-sm font-medium text-gray-700">Bebés</label>
                                    <input type="number" id="infants" min="0" defaultValue="0" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2" />
                                </div>
                            </div>
                            <div className="lg:col-span-2 flex items-end">
                                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 duration-300">
                                    Procurar Voos Disponíveis
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                
                {/* Secção de Ofertas Especiais - Semelhante à imagem fornecida */}
                <div className="mt-12">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-amber-500 pl-4">Destinos em Destaque</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promoFlights.map((promo, idx) => (
                            <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group cursor-pointer" onClick={() => handlePromoSelect(promo.city)}>
                                <div className="h-48 overflow-hidden relative">
                                    <img src={promo.image} alt={promo.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-white text-xl font-bold uppercase tracking-wider">{promo.city}</h3>
                                        <p className="text-amber-300 text-xs uppercase font-semibold">Ida e Volta Económica</p>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="mt-auto">
                                        <p className="text-xs text-gray-500">A partir de</p>
                                        <div className="flex justify-between items-end">
                                            <p className="text-2xl font-bold text-red-600">Kz{new Intl.NumberFormat('pt-AO').format(promo.price)}</p>
                                            <button className="bg-orangered-600 bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded-full transition-colors">
                                                Reservar já
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>

                {showResults && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                         <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-between">
                            <span className="flex items-center">
                                <span className="bg-amber-100 text-amber-600 p-2 rounded-full mr-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                </span>
                                Disponibilidade em Tempo Real (Simulação)
                            </span>
                         </h3>
                         <div className="space-y-4">
                            {mockFlights.map((flight) => (
                                <div key={flight.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-shadow border-l-4 border-amber-500">
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                                            {/* Simplified logo placeholder */}
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg text-gray-800">{flight.airline}</p>
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600 mr-2">{flight.id}</span>
                                                <span>{flight.origin} &rarr; {flight.destination}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 flex justify-center items-center gap-8 w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                                        <div className="text-center">
                                            <p className="font-bold text-xl text-gray-900">{flight.departureTime}</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Partida</p>
                                        </div>
                                        <div className="flex flex-col items-center w-32">
                                            <p className="text-xs text-gray-400 mb-1">{flight.duration}</p>
                                            <div className="w-full h-px bg-amber-300 relative">
                                                 <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-amber-500"></div>
                                                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <svg className="w-4 h-4 text-amber-500 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                                                 </div>
                                                 <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-amber-500"></div>
                                            </div>
                                            <p className="text-xs text-green-600 mt-1 font-medium">Voo Direto</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-xl text-gray-900">{flight.arrivalTime}</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Chegada</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-end gap-3 w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                                        {renderPrice(flight.price)}
                                        <button 
                                            onClick={() => handleSelectFlight(flight)}
                                            className="w-full md:w-auto bg-gray-900 hover:bg-amber-500 hover:text-gray-900 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 shadow-md"
                                        >
                                            Selecionar Voo
                                        </button>
                                        <p className="text-xs text-red-500 font-medium">
                                            {Math.random() > 0.5 ? 'Últimos lugares!' : ''}
                                        </p>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightBooking;
