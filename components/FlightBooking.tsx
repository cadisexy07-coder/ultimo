
import React, { useState, useEffect } from 'react';
import { Flight } from '../types';
import { formatCurrency } from '../utils/formatter';

// --- DADOS DO PAINEL DE VOOS (SIMULAÇÃO BASEADA NO FLIGHTERA) ---
interface LiveFlight {
    time: string;
    flightNumber: string;
    airline: string;
    location: string;
    status: string;
    gate?: string;
    logo?: string;
}

const liveDepartures: LiveFlight[] = [
    { time: '12:30', flightNumber: 'DT 577', airline: 'TAAG', location: 'Joanesburgo (JNB)', status: 'Embarque', gate: 'B2' },
    { time: '14:15', flightNumber: '4Z 045', airline: 'Airlink', location: 'Joanesburgo (JNB)', status: 'Programado', gate: 'A1' },
    { time: '16:00', flightNumber: 'DT 122', airline: 'TAAG', location: 'Cabinda (CAB)', status: 'Atrasado (16:45)', gate: 'D4' },
    { time: '18:15', flightNumber: 'EK 794', airline: 'Emirates', location: 'Dubai (DXB)', status: 'Programado', gate: 'C3' },
    { time: '21:30', flightNumber: 'TP 288', airline: 'TAP Air Portugal', location: 'Lisboa (LIS)', status: 'Programado', gate: 'B5' },
    { time: '22:45', flightNumber: 'LH 561', airline: 'Lufthansa', location: 'Frankfurt (FRA)', status: 'Programado', gate: 'C1' },
    { time: '23:50', flightNumber: 'DT 650', airline: 'TAAG', location: 'Lisboa (LIS)', status: 'Programado', gate: 'B1' },
];

const liveArrivals: LiveFlight[] = [
    { time: '11:45', flightNumber: 'DT 579', airline: 'TAAG', location: 'Cidade do Cabo (CPT)', status: 'Aterrou' },
    { time: '12:10', flightNumber: 'DT 231', airline: 'TAAG', location: 'Lubango (SDD)', status: 'Aterrou' },
    { time: '13:50', flightNumber: 'AF 928', airline: 'Air France', location: 'Paris (CDG)', status: 'Confirmado' },
    { time: '14:30', flightNumber: 'DT 121', airline: 'TAAG', location: 'Cabinda (CAB)', status: 'No Horário' },
    { time: '19:00', flightNumber: 'QR 1489', airline: 'Qatar Airways', location: 'Doha (DOH)', status: 'Atrasado' },
];

// Dados para reservas com dias de operação (0=Dom, 1=Seg, ..., 6=Sab)
const mockFlights: Flight[] = [
    // LISBOA: DT opera Seg, Qua, Sex. TP opera Ter, Qui, Sab.
    { id: 'DT 650', airline: 'TAAG Angola Airlines', logoUrl: '', origin: 'Luanda (LAD)', destination: 'Lisboa (LIS)', departureTime: '23:50', arrivalTime: '06:25', duration: '7h 35m', price: 702130, status: 'On Time', availableDays: [1, 3, 5] },
    { id: 'TP 288', airline: 'TAP Air Portugal', logoUrl: '', origin: 'Luanda (LAD)', destination: 'Lisboa (LIS)', departureTime: '22:45', arrivalTime: '06:20', duration: '7h 35m', price: 680500, status: 'Delayed', availableDays: [2, 4, 6] },
    
    // CIDADE DO CABO: Seg, Qui
    { id: 'DT 579', airline: 'TAAG Angola Airlines', logoUrl: '', origin: 'Luanda (LAD)', destination: 'Cidade do Cabo (CPT)', departureTime: '09:00', arrivalTime: '14:00', duration: '4h 00m', price: 574745, status: 'On Time', availableDays: [1, 4] },
    
    // JOANESBURGO: Diário exceto Domingo
    { id: '4Z 045', airline: 'Airlink', logoUrl: '', origin: 'Luanda (LAD)', destination: 'Joanesburgo (JNB)', departureTime: '14:15', arrivalTime: '18:40', duration: '3h 25m', price: 495000, status: 'On Time', availableDays: [1, 2, 3, 4, 5, 6] },
    { id: 'DT 577', airline: 'TAAG Angola Airlines', logoUrl: '', origin: 'Luanda (LAD)', destination: 'Joanesburgo (JNB)', departureTime: '10:00', arrivalTime: '14:20', duration: '3h 20m', price: 530168, status: 'Cancelled', availableDays: [0, 2, 4] },
    
    // CABINDA: Todos os dias
    { id: 'DT 120', airline: 'TAAG Angola Airlines', logoUrl: '', origin: 'Luanda (LAD)', destination: 'Cabinda (CAB)', departureTime: '06:00', arrivalTime: '07:00', duration: '1h 00m', price: 45000, status: 'On Time', availableDays: [0, 1, 2, 3, 4, 5, 6] }
];

const promoFlights = [
    { city: 'LISBOA', price: 702130, image: 'https://images.unsplash.com/photo-1513366853604-56c4af638697?q=80&w=2070&auto=format&fit=crop' },
    { city: 'CIDADE DO CABO', price: 574745, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2070&auto=format&fit=crop' },
    { city: 'JOANESBURGO', price: 530168, image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=2070&auto=format&fit=crop' },
    { city: 'CABINDA', price: 45000, image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000&auto=format&fit=crop' },
];

// Interface para as sugestões de datas
interface DateSuggestion {
    date: string;
    displayDate: string;
    dayName: string;
}

// Interface detalhada do Passageiro
interface PassengerDetails {
    title: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | '';
    birthDate: string;
    
    // Frequent Flyer
    ffProgram: string;
    ffNumber: string;

    // Advanced Info (Passport)
    nationality: string;
    docNumber: string;
    docExpiry: string;
    issuingCountry: string;

    // Contact
    email: string;
    confirmEmail: string;
    phoneType: string;
    countryCode: string;
    phoneNumber: string;

    consent: boolean;
}

type BookingStep = 'search' | 'details' | 'processing' | 'success';
type ViewMode = 'booking' | 'live-board';
type BoardTab = 'departures' | 'arrivals';

const FlightBooking: React.FC = () => {
    // State para Alternar Vistas
    const [viewMode, setViewMode] = useState<ViewMode>('booking');
    const [boardTab, setBoardTab] = useState<BoardTab>('departures');
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' }));

    // Booking State
    const [tripType, setTripType] = useState('round-trip');
    const [searchOrigin, setSearchOrigin] = useState('Luanda (LAD)');
    const [searchDestination, setSearchDestination] = useState('');
    const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0]);
    const [showResults, setShowResults] = useState(false);
    
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
    const [suggestedDates, setSuggestedDates] = useState<DateSuggestion[]>([]);
    
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const [bookingStep, setBookingStep] = useState<BookingStep>('search');
    
    // Detailed Passenger Form State
    const [passengerData, setPassengerData] = useState<PassengerDetails>({
        title: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        ffProgram: 'Umbi Umbi',
        ffNumber: '',
        nationality: 'Angola',
        docNumber: '',
        docExpiry: '',
        issuingCountry: 'Angola',
        email: '',
        confirmEmail: '',
        phoneType: 'Pessoal',
        countryCode: '+244',
        phoneNumber: '',
        consent: false
    });

    // Reference number generator for consistency in view
    const [bookingRef, setBookingRef] = useState('');

    const SERVICE_FEE_PERCENTAGE = 0.10;

    // Relógio para o Painel Ao Vivo
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' }));
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const getDayOfWeek = (dateString: string): number => {
        const date = new Date(dateString);
        return date.getDay();
    };

    const formatDateDisplay = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-AO', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    const getWeekDayName = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-AO', { weekday: 'long' });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setBookingStep('search');
        setSuggestedDates([]);

        const routeMatches = mockFlights.filter(flight => {
            const originMatch = flight.origin.toLowerCase().includes(searchOrigin.toLowerCase());
            const destMatch = flight.destination.toLowerCase().includes(searchDestination.toLowerCase());
            return originMatch && destMatch;
        });

        const searchDay = getDayOfWeek(searchDate);
        const exactMatches = routeMatches.filter(flight => 
            flight.availableDays.includes(searchDay)
        );

        if (exactMatches.length > 0) {
            setFilteredFlights(exactMatches);
            setSuggestedDates([]);
        } else {
            setFilteredFlights([]);
            if (routeMatches.length > 0) {
                const suggestions: DateSuggestion[] = [];
                const baseDate = new Date(searchDate);
                for (let i = 1; i <= 5; i++) {
                    const nextDate = new Date(baseDate);
                    nextDate.setDate(baseDate.getDate() + i);
                    const nextDayIndex = nextDate.getDay();
                    const hasFlightOnThisDay = routeMatches.some(f => f.availableDays.includes(nextDayIndex));
                    if (hasFlightOnThisDay) {
                        const isoDate = nextDate.toISOString().split('T')[0];
                        suggestions.push({
                            date: isoDate,
                            displayDate: formatDateDisplay(isoDate),
                            dayName: getWeekDayName(isoDate)
                        });
                    }
                    if (suggestions.length >= 3) break;
                }
                setSuggestedDates(suggestions);
            }
        }
        setShowResults(true);
        setTimeout(() => {
            const resultsElement = document.getElementById('search-results');
            if (resultsElement) resultsElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleSelectSuggestion = (newDate: string) => {
        setSearchDate(newDate);
        setTimeout(() => {
            const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
            handleSearch(syntheticEvent);
        }, 100);
    };

    const handleSelectFlight = (flight: Flight) => {
        if (flight.status === 'Cancelled') return;
        setSelectedFlight(flight);
        setBookingStep('details');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePassengerChange = (field: keyof PassengerDetails, value: any) => {
        setPassengerData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleConfirmBooking = (e: React.FormEvent) => {
        e.preventDefault();

        // Validations
        if (passengerData.email !== passengerData.confirmEmail) {
            alert("Os endereços de email não coincidem.");
            return;
        }
        if (!passengerData.consent) {
            alert("Por favor, aceite a política de privacidade.");
            return;
        }

        setBookingStep('processing');
        const pnr = Math.random().toString(36).substring(2, 8).toUpperCase();
        setBookingRef(pnr);
        
        setTimeout(() => {
            setBookingStep('success');
        }, 2000);
    };

    const resetBooking = () => {
        setBookingStep('search');
        setSelectedFlight(null);
        setPassengerData({
            title: '', firstName: '', lastName: '', gender: '', birthDate: '',
            ffProgram: 'Umbi Umbi', ffNumber: '',
            nationality: 'Angola', docNumber: '', docExpiry: '', issuingCountry: 'Angola',
            email: '', confirmEmail: '', phoneType: 'Pessoal', countryCode: '+244', phoneNumber: '',
            consent: false
        });
        setShowResults(false);
        setFilteredFlights([]);
        setSuggestedDates([]);
        setSearchDestination('');
    };

    const renderStatusBadge = (status: string) => {
        if (status.includes('Cancelado') || status === 'Cancelled') return <span className="text-red-600 font-bold uppercase text-xs px-2 py-1 bg-red-100 rounded">Cancelado</span>;
        if (status.includes('Atrasado') || status === 'Delayed') return <span className="text-orange-600 font-bold uppercase text-xs px-2 py-1 bg-orange-100 rounded animate-pulse">Atrasado</span>;
        if (status === 'Embarque') return <span className="text-green-600 font-bold uppercase text-xs px-2 py-1 bg-green-100 rounded animate-pulse">Embarque</span>;
        if (status === 'Aterrou') return <span className="text-blue-600 font-bold uppercase text-xs px-2 py-1 bg-blue-100 rounded">Aterrou</span>;
        return <span className="text-gray-600 font-bold uppercase text-xs px-2 py-1 bg-gray-100 rounded">{status}</span>;
    };

    const generateTicketPDF = () => {
        if (!selectedFlight) return;

        // @ts-ignore
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const totalPrice = selectedFlight.price * (1 + SERVICE_FEE_PERCENTAGE);
        const formattedPrice = formatCurrency(totalPrice);
        const fullName = `${passengerData.firstName} ${passengerData.lastName}`;

        // --- CABEÇALHO ---
        doc.setFillColor(17, 24, 39); 
        doc.rect(0, 0, 210, 45, 'F');
        
        doc.setTextColor(245, 158, 11); 
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text("VICTÓRIA EXPRESS", 105, 20, { align: "center" });
        
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255); 
        doc.setFont("helvetica", "normal");
        doc.text("Agência de Viagens Internacionais", 105, 28, { align: "center" });
        doc.text("Novo Aeroporto Internacional de Luanda (AIAAN)", 105, 34, { align: "center" });

        // --- TÍTULO DO BILHETE ---
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("CONFIRMAÇÃO DE RESERVA / E-TICKET", 105, 60, { align: "center" });

        // --- INFO PRINCIPAL (CAIXA) ---
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.rect(15, 70, 180, 40);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("REFERÊNCIA (PNR):", 20, 80);
        doc.text("PASSAGEIRO:", 20, 95);
        doc.text("DOCUMENTO:", 110, 95);

        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(bookingRef, 20, 86);
        doc.text(fullName.toUpperCase(), 20, 101);
        doc.text(passengerData.docNumber.toUpperCase(), 110, 101);

        // --- DETALHES DO VOO ---
        let yPos = 125;
        doc.setFontSize(12);
        doc.setFillColor(245, 158, 11); 
        doc.rect(15, yPos - 5, 180, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.text("DETALHES DO VOO / FLIGHT DETAILS", 20, yPos + 1);

        yPos += 15;
        doc.setTextColor(0, 0, 0);
        
        doc.setFontSize(16);
        doc.text(selectedFlight.origin.split('(')[0].trim(), 20, yPos);
        doc.text("→", 95, yPos);
        doc.text(selectedFlight.destination.split('(')[0].trim(), 120, yPos);

        yPos += 8;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont("helvetica", "normal");
        doc.text(selectedFlight.origin, 20, yPos);
        doc.text(selectedFlight.destination, 120, yPos);

        yPos += 15;
        
        const col1 = 20;
        const col2 = 70;
        const col3 = 120;
        const col4 = 160;

        doc.text("DATA", col1, yPos);
        doc.text("PARTIDA", col2, yPos);
        doc.text("CHEGADA", col3, yPos);
        doc.text("VOO", col4, yPos);

        yPos += 6;
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        
        doc.text(formatDateDisplay(searchDate), col1, yPos);
        doc.text(selectedFlight.departureTime, col2, yPos);
        doc.text(selectedFlight.arrivalTime, col3, yPos);
        doc.text(selectedFlight.id, col4, yPos);

        yPos += 10;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80, 80, 80);
        doc.text(`Operado por: ${selectedFlight.airline}`, col1, yPos);
        doc.text(`Classe: Económica`, col3, yPos);

        // --- PREÇO ---
        yPos += 20;
        doc.setDrawColor(200, 200, 200);
        doc.line(15, yPos, 195, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.text("TOTAL:", 120, yPos);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(formattedPrice, 195, yPos, { align: "right" });

        const fileName = `Bilhete_${bookingRef}.pdf`;
        doc.save(fileName);
    };

    const renderLiveBoard = () => {
         const data = boardTab === 'departures' ? liveDepartures : liveArrivals;
        
        return (
            <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden min-h-[500px]">
                <div className="bg-black p-6 border-b border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-mono text-amber-500 tracking-wider font-bold uppercase">
                            {boardTab === 'departures' ? 'PARTIDAS' : 'CHEGADAS'}
                        </h2>
                        <p className="text-gray-400 text-sm font-mono mt-1">AIAAN - Luanda (NBJ)</p>
                    </div>
                    <div className="flex items-center gap-6">
                         <div className="text-right">
                             <p className="text-xs text-gray-500 uppercase">Hora Local</p>
                             <p className="text-2xl text-white font-mono font-bold">{currentTime}</p>
                         </div>
                         <div className="flex bg-gray-800 rounded p-1">
                             <button 
                                onClick={() => setBoardTab('departures')}
                                className={`px-4 py-2 rounded text-sm font-bold transition-colors ${boardTab === 'departures' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}
                             >
                                 Partidas
                             </button>
                             <button 
                                onClick={() => setBoardTab('arrivals')}
                                className={`px-4 py-2 rounded text-sm font-bold transition-colors ${boardTab === 'arrivals' ? 'bg-green-500 text-black' : 'text-gray-400 hover:text-white'}`}
                             >
                                 Chegadas
                             </button>
                         </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800 text-gray-400 text-xs uppercase tracking-wider font-mono">
                            <tr>
                                <th className="px-6 py-4">Hora</th>
                                <th className="px-6 py-4">Voo</th>
                                <th className="px-6 py-4">Companhia</th>
                                <th className="px-6 py-4">{boardTab === 'departures' ? 'Destino' : 'Origem'}</th>
                                {boardTab === 'departures' && <th className="px-6 py-4">Porta</th>}
                                <th className="px-6 py-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {data.map((flight, idx) => (
                                <tr key={idx} className="hover:bg-gray-800/50 transition-colors font-mono text-sm">
                                    <td className="px-6 py-4 text-amber-400 font-bold">{flight.time}</td>
                                    <td className="px-6 py-4 text-white">{flight.flightNumber}</td>
                                    <td className="px-6 py-4 text-gray-300">{flight.airline}</td>
                                    <td className="px-6 py-4 text-white font-semibold">{flight.location}</td>
                                    {boardTab === 'departures' && (
                                        <td className="px-6 py-4 text-amber-500">{flight.gate || '-'}</td>
                                    )}
                                    <td className="px-6 py-4">
                                        {renderStatusBadge(flight.status)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-black p-4 flex justify-between items-center text-xs text-gray-500 border-t border-gray-800">
                    <span>* Atualizado em tempo real</span>
                    <a 
                        href="https://www.flightera.net/pb/airport/Luanda/NBJ/departure" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-amber-500 transition-colors flex items-center"
                    >
                        Fonte de dados: Flightera <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                </div>
            </div>
        );
    };

    // --- RENDERIZAR ECRÃS DE RESERVA ---
    if (bookingStep === 'details' && selectedFlight) {
        return (
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <button onClick={resetBooking} className="text-gray-500 hover:text-amber-500 mb-6 flex items-center font-bold">← Voltar</button>
                    
                    {/* Sumário do Voo (Header) */}
                    <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden mb-8">
                         <div className="p-6 text-white flex flex-col md:flex-row justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedFlight.origin} &rarr; {selectedFlight.destination}</h2>
                                <p className="text-gray-400">{formatDateDisplay(searchDate)} • {selectedFlight.id}</p>
                            </div>
                            <div className="mt-4 md:mt-0 text-right">
                                <p className="text-sm text-gray-400">Total a Pagar</p>
                                <p className="text-3xl font-bold text-amber-500">{formatCurrency(selectedFlight.price * (1 + SERVICE_FEE_PERCENTAGE))}</p>
                            </div>
                         </div>
                    </div>

                    <form onSubmit={handleConfirmBooking} className="space-y-6">
                        
                        {/* 1. Informações Pessoais */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <h3 className="text-lg font-bold text-gray-900">Informações pessoais</h3>
                                <p className="text-xs text-gray-500">* = campos obrigatórios</p>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <select 
                                        value={passengerData.title}
                                        onChange={(e) => handlePassengerChange('title', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900"
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="Mr">Sr. (Homem)</option>
                                        <option value="Ms">Sra. (Mulher)</option>
                                        <option value="Miss">Menina</option>
                                        <option value="Mstr">Menino</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-amber-600 mb-1">Nome próprio*</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={passengerData.firstName}
                                        onChange={(e) => handlePassengerChange('firstName', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900 placeholder-gray-500"
                                        placeholder="Introduza um nome próprio"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Indique o seu nome próprio</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-amber-600 mb-1">Apelido*</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={passengerData.lastName}
                                        onChange={(e) => handlePassengerChange('lastName', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900 placeholder-gray-500"
                                        placeholder="Introduza um apelido"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Indique o seu apelido</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Género*</label>
                                    <div className="flex space-x-0 border border-gray-300 rounded-md overflow-hidden bg-white">
                                        <button 
                                            type="button"
                                            onClick={() => handlePassengerChange('gender', 'male')}
                                            className={`flex-1 py-3 text-sm font-bold ${passengerData.gender === 'male' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            Homem
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => handlePassengerChange('gender', 'female')}
                                            className={`flex-1 py-3 text-sm font-bold ${passengerData.gender === 'female' ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            Mulher
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-amber-600 mb-1">Data de nascimento*</label>
                                    <input 
                                        type="date" 
                                        required
                                        value={passengerData.birthDate}
                                        onChange={(e) => handlePassengerChange('birthDate', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Cartões de Passageiro Frequente */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <h3 className="text-lg font-bold text-gray-900">Cartões de passageiro frequente</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Programa de Passageiro Frequente</label>
                                    <select 
                                        value={passengerData.ffProgram}
                                        onChange={(e) => handlePassengerChange('ffProgram', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900"
                                    >
                                        <option value="Umbi Umbi">Umbi Umbi (TAAG)</option>
                                        <option value="TAP Miles&Go">TAP Miles&Go</option>
                                        <option value="Flying Blue">Flying Blue</option>
                                        <option value="Star Alliance">Star Alliance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de passageiro frequente</label>
                                    <input 
                                        type="text" 
                                        value={passengerData.ffNumber}
                                        onChange={(e) => handlePassengerChange('ffNumber', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900 placeholder-gray-500"
                                        placeholder="Introduza um número de passageiro frequente"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Informações Avançadas (Passaporte) */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <h3 className="text-lg font-bold text-gray-900">Informações avançadas</h3>
                                <p className="text-xs text-gray-500 mt-1">Pode fornecer informações avançadas sobre o seu documento de viagem agora.</p>
                            </div>
                            <div className="p-6">
                                <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">Detalhes do passaporte</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-amber-600 mb-1">Nacionalidade*</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={passengerData.nationality}
                                            onChange={(e) => handlePassengerChange('nationality', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900 placeholder-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-amber-600 mb-1">Número do documento*</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={passengerData.docNumber}
                                            onChange={(e) => handlePassengerChange('docNumber', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900 placeholder-gray-500"
                                            placeholder="O número do seu documento"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-amber-600 mb-1">Data de expiração*</label>
                                        <input 
                                            type="date" 
                                            required
                                            value={passengerData.docExpiry}
                                            onChange={(e) => handlePassengerChange('docExpiry', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-amber-600 mb-1">Governo que emitiu o documento*</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={passengerData.issuingCountry}
                                            onChange={(e) => handlePassengerChange('issuingCountry', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900 placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Informações de Contacto */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <h3 className="text-lg font-bold text-gray-900">Informações de contacto</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-amber-600 mb-1">E-mail*</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={passengerData.email}
                                        onChange={(e) => handlePassengerChange('email', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900 placeholder-gray-500"
                                        placeholder="Introduza um endereço de e-mail"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-amber-600 mb-1">Confirme o e-mail*</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={passengerData.confirmEmail}
                                        onChange={(e) => handlePassengerChange('confirmEmail', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900 placeholder-gray-500"
                                        placeholder="Confirme um endereço de e-mail"
                                    />
                                </div>
                                
                                <button type="button" className="bg-black text-white text-sm font-bold py-2 px-4 rounded hover:bg-gray-800">
                                    Adicione outro endereço de e-mail
                                </button>

                                <div className="pt-4 border-t border-gray-100 mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Indicativo telefónico*</label>
                                            <input 
                                                type="text" 
                                                value={passengerData.countryCode}
                                                onChange={(e) => handlePassengerChange('countryCode', e.target.value)}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-amber-600 mb-1">Número de telefone*</label>
                                            <input 
                                                type="tel" 
                                                required
                                                value={passengerData.phoneNumber}
                                                onChange={(e) => handlePassengerChange('phoneNumber', e.target.value)}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 px-3 border bg-white text-gray-900 placeholder-gray-500"
                                                placeholder="Introduza um telemóvel"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="bg-black text-white text-sm font-bold py-2 px-4 rounded hover:bg-gray-800">
                                    Adicione outro número de telefone
                                </button>
                            </div>
                        </div>

                        {/* Footer / Confirmação */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-start mb-6">
                                <div className="flex items-center h-5">
                                    <input
                                        id="consent"
                                        name="consent"
                                        type="checkbox"
                                        required
                                        checked={passengerData.consent}
                                        onChange={(e) => handlePassengerChange('consent', e.target.checked)}
                                        className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded bg-white"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="consent" className="font-medium text-gray-700">Compreendo e aceito que os meus dados pessoais sejam processados de acordo com a política de privacidade da VICTÓRIA EXPRESS.</label>
                                </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row gap-4 justify-end">
                                <button type="button" onClick={resetBooking} className="bg-black text-white font-bold py-3 px-8 rounded hover:bg-gray-800 transition-colors">
                                    Regressar
                                </button>
                                <button type="submit" className="bg-amber-600 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded shadow-lg transition-transform transform hover:scale-105">
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    if (bookingStep === 'processing') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto mb-4"></div>
                    <p className="text-gray-700 font-bold">A processar a sua reserva com a VICTÓRIA EXPRESS...</p>
                </div>
            </div>
        );
    }

    if (bookingStep === 'success' && selectedFlight) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center border-t-8 border-green-500">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Reserva Confirmada!</h2>
                    <p className="text-gray-600 mb-8">Voo para {selectedFlight.destination} agendado para {formatDateDisplay(searchDate)}.</p>
                    <button 
                        onClick={generateTicketPDF} 
                        className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-md mb-4 hover:bg-gray-800 transition-colors flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Baixar Bilhete
                    </button>
                    <button onClick={resetBooking} className="text-amber-600 font-bold hover:text-amber-700">Nova Reserva</button>
                </div>
            </div>
        );
    }

    // --- VISTA PRINCIPAL (TOGGLE ENTRE BOOKING E LIVE BOARD) ---
    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Header Banner */}
            <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520105072000-f44fc083e508?q=80&w=2890&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 shadow-text">Central de Voos</h1>
                    <p className="text-gray-100 font-medium">VICTÓRIA EXPRESS - Conectando você ao mundo</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                
                {/* Navigation Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-full shadow-lg flex">
                        <button
                            onClick={() => setViewMode('booking')}
                            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${viewMode === 'booking' ? 'bg-amber-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Reservar Voo
                        </button>
                        <button
                            onClick={() => setViewMode('live-board')}
                            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${viewMode === 'live-board' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Painel Ao Vivo
                        </button>
                    </div>
                </div>

                {viewMode === 'live-board' ? (
                    renderLiveBoard()
                ) : (
                    // --- VISTA DE RESERVA (BOOKING) ---
                    <div className="space-y-12">
                        {/* Formulário de Pesquisa */}
                        <div className="bg-white rounded-lg shadow-xl p-8">
                            <form onSubmit={handleSearch}>
                                <div className="mb-6 border-b border-gray-200">
                                    <nav className="-mb-px flex space-x-6">
                                        <button type="button" onClick={() => setTripType('round-trip')} className={`${tripType === 'round-trip' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Ida e volta</button>
                                        <button type="button" onClick={() => setTripType('one-way')} className={`${tripType === 'one-way' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Só ida</button>
                                    </nav>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="relative">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Origem</label>
                                        <input 
                                            type="text" 
                                            value={searchOrigin} 
                                            onChange={e => setSearchOrigin(e.target.value)} 
                                            className="block w-full border border-gray-300 rounded-md p-3 bg-white text-gray-900 shadow-sm focus:ring-amber-500 focus:border-amber-500" 
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Destino</label>
                                        <input 
                                            type="text" 
                                            value={searchDestination} 
                                            onChange={e => setSearchDestination(e.target.value)} 
                                            placeholder="Ex: Lisboa" 
                                            className="block w-full border border-gray-300 rounded-md p-3 bg-white text-gray-900 shadow-sm focus:ring-amber-500 focus:border-amber-500" 
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Data de Ida</label>
                                        <input 
                                            type="date" 
                                            value={searchDate} 
                                            onChange={e => setSearchDate(e.target.value)} 
                                            className="block w-full border border-gray-300 rounded-md p-3 bg-white text-gray-900 shadow-sm focus:ring-amber-500 focus:border-amber-500" 
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-md shadow-md transition-all">
                                            Pesquisar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Promoções */}
                        {!showResults && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-amber-500 pl-4">Ofertas da Semana</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {promoFlights.map((promo, idx) => (
                                        <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer" onClick={() => { setSearchDestination(promo.city); setSearchOrigin('Luanda (LAD)'); }}>
                                            <div className="h-48 relative overflow-hidden">
                                                <img src={promo.image} alt={promo.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
                                                    <h3 className="text-white font-bold text-lg">{promo.city}</h3>
                                                </div>
                                            </div>
                                            <div className="p-4 flex justify-between items-center">
                                                <span className="text-red-600 font-bold text-lg">{formatCurrency(promo.price)}</span>
                                                <span className="text-xs font-bold text-amber-600 uppercase">Ver Oferta</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Resultados da Pesquisa */}
                        {showResults && (
                            <div id="search-results">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Voos Encontrados</h3>
                                
                                {/* Se houver voos exatos */}
                                {filteredFlights.length > 0 ? (
                                    <div className="space-y-4">
                                        {filteredFlights.map(flight => (
                                            <div key={flight.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-amber-500">
                                                <div>
                                                    <p className="font-bold text-lg text-gray-900">{flight.airline}</p>
                                                    <p className="text-sm text-gray-600">{flight.origin} &rarr; {flight.destination}</p>
                                                    <div className="mt-1">{renderStatusBadge(flight.status)}</div>
                                                </div>
                                                <div className="text-center flex-1">
                                                    <div className="flex justify-center items-center gap-4">
                                                        <span className="font-bold text-xl text-gray-900">{flight.departureTime}</span>
                                                        <span className="text-xs text-gray-400">----------- ✈ -----------</span>
                                                        <span className="font-bold text-xl text-gray-900">{flight.arrivalTime}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">{flight.duration} • Direto</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-gray-900">{formatCurrency(flight.price)}</p>
                                                    <button 
                                                        onClick={() => handleSelectFlight(flight)}
                                                        disabled={flight.status === 'Cancelled'}
                                                        className={`mt-2 px-6 py-2 rounded font-bold text-white transition-colors ${flight.status === 'Cancelled' ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-900 hover:bg-amber-600'}`}
                                                    >
                                                        {flight.status === 'Cancelled' ? 'Indisponível' : 'Selecionar'}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // Se NÃO houver voos exatos
                                    <div className="space-y-6">
                                        <div className="bg-white p-8 rounded-lg shadow text-center border-t-4 border-red-500">
                                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            </div>
                                            <p className="text-gray-800 font-bold text-lg">Não encontramos voos para {getWeekDayName(searchDate)}, {formatDateDisplay(searchDate)}.</p>
                                            <p className="text-gray-500 mt-2">Esta rota pode não ser operada no dia selecionado.</p>
                                        </div>

                                        {/* SUGESTÕES DE DATAS */}
                                        {suggestedDates.length > 0 && (
                                            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                                                <h4 className="text-amber-800 font-bold mb-4 flex items-center">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    Temos voos disponíveis nestas datas próximas:
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    {suggestedDates.map((suggestion, idx) => (
                                                        <button 
                                                            key={idx}
                                                            onClick={() => handleSelectSuggestion(suggestion.date)}
                                                            className="bg-white hover:bg-amber-500 hover:text-white group border border-amber-200 rounded-lg p-4 shadow-sm transition-all duration-300 flex flex-col items-center"
                                                        >
                                                            <span className="text-xs font-bold uppercase tracking-wide text-gray-500 group-hover:text-amber-100">{suggestion.dayName}</span>
                                                            <span className="text-lg font-bold text-gray-900 group-hover:text-white mt-1">{suggestion.displayDate}</span>
                                                            <span className="mt-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold group-hover:bg-white group-hover:text-amber-600">Disponível</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {suggestedDates.length === 0 && (
                                            <div className="text-center text-gray-500 italic">
                                                Não encontrámos disponibilidade próxima para esta rota. Tente alterar a origem ou destino.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightBooking;
