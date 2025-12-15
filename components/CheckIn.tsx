
import React, { useState } from 'react';

const CheckIn: React.FC = () => {
    const [bookingRef, setBookingRef] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkedIn, setCheckedIn] = useState(false);
    const [error, setError] = useState('');

    const handleCheckIn = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (bookingRef.trim() === '' || lastName.trim() === '') {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        setCheckedIn(true);
    };

    if (checkedIn) {
        return (
            <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
                 <div className="md:w-1/2 bg-amber-500 flex items-center justify-center p-8">
                     <div className="text-white text-center">
                         <h2 className="text-4xl font-bold mb-4">Boa Viagem!</h2>
                         <p className="text-xl">Estamos ansiosos para vê-lo a bordo.</p>
                     </div>
                 </div>
                <div className="md:w-1/2 bg-white flex items-center justify-center p-8">
                    <div className="max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Check-in Concluído!</h2>
                        <p className="text-gray-600 mb-6">
                            Seu check-in para a viagem a <span className="font-semibold text-gray-900">Lisboa (LIS)</span> foi realizado com sucesso.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8 text-left">
                            <p className="text-sm text-gray-500">Passageiro</p>
                            <p className="font-bold text-lg mb-2">{lastName}, {bookingRef}</p>
                            <p className="text-sm text-gray-500">Assento</p>
                            <p className="font-bold text-lg">12A</p>
                        </div>
                        <button 
                            onClick={() => setCheckedIn(false)}
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-md transition-colors"
                        >
                            Voltar ao Início
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
            {/* Image Side */}
            <div className="md:w-1/2 relative hidden md:block">
                <img 
                    src="https://images.unsplash.com/photo-1556388169-db19adc96088?q=80&w=1976&auto=format&fit=crop" 
                    alt="Passageiro no aeroporto" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                        <h2 className="text-4xl font-bold mb-4">Check-in Online</h2>
                        <p className="text-lg max-w-md">Evite filas e poupe tempo. Faça o seu check-in antecipado e desfrute de mais tempo no novo aeroporto de Luanda.</p>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
                <div className="max-w-md w-full">
                    <div className="md:hidden mb-8 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Check-in Online</h2>
                        <p className="mt-2 text-sm text-gray-600">Fácil, rápido e cómodo.</p>
                    </div>

                    <div className="mb-8">
                         <h3 className="text-xl font-bold text-gray-800">Identifique a sua reserva</h3>
                         <p className="text-gray-500 text-sm mt-1">Insira os dados conforme constam no seu bilhete.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleCheckIn}>
                        <div>
                            <label htmlFor="booking-ref" className="block text-sm font-medium text-gray-700">Referência da Reserva</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="booking-ref"
                                    name="booking-ref"
                                    type="text"
                                    value={bookingRef}
                                    onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
                                    required
                                    className="block w-full border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 py-3 px-4 sm:text-sm border"
                                    placeholder="Ex: XYZ123"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Último Nome</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="block w-full border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 py-3 px-4 sm:text-sm border"
                                    placeholder="Ex: Silva"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4">
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-md font-bold rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors shadow-lg"
                            >
                                Continuar para o Check-in
                            </button>
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-4">
                            Ao continuar, você concorda com os termos de transporte da VICTÓRIA EXPRESS.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckIn;
