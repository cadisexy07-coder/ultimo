
import React, { useState } from 'react';

const CheckIn: React.FC = () => {
    // Estados
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    
    // Estados do Formulário
    const [idType, setIdType] = useState<'booking_ref' | 'ticket_no'>('booking_ref');
    const [reference, setReference] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    // Estado para FAQ
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Estado para Modal de Recuperação
    const [showRetrievalModal, setShowRetrievalModal] = useState(false);
    const [retrievalEmail, setRetrievalEmail] = useState('');
    const [retrievalDate, setRetrievalDate] = useState('');
    const [isRetrieving, setIsRetrieving] = useState(false);
    const [retrievedData, setRetrievedData] = useState<{ref: string, name: string} | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleCheckInSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (reference.trim() === '' || lastName.trim() === '') {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        // Simulação de sucesso
        setIsCheckedIn(true);
        window.scrollTo(0, 0);
    };

    const handleRetrieveSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsRetrieving(true);
        
        // Simulação de busca API
        setTimeout(() => {
            setIsRetrieving(false);
            // Simula encontrar uma reserva
            setRetrievedData({
                ref: '027415445LA059',
                name: 'Oliveira Soares'
            });
        }, 1500);
    };

    const handleAutoFill = () => {
        if (retrievedData) {
            setIdType('ticket_no');
            setReference(retrievedData.ref);
            setLastName(retrievedData.name);
            setShowRetrievalModal(false);
            setRetrievedData(null);
            setRetrievalEmail('');
            setRetrievalDate('');
        }
    };

    const downloadTicket = () => {
        // @ts-ignore
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Header - Marca
        doc.setFillColor(23, 23, 23); // Dark Gray / Black
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setFontSize(22);
        doc.setTextColor(245, 158, 11); // Amber-500
        doc.setFont("helvetica", "bold");
        doc.text("VICTÓRIA EXPRESS", 105, 20, { align: "center" });
        
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "normal");
        doc.text("Agência de Viagens Internacionais", 105, 28, { align: "center" });

        // Título
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text("TALÃO DE EMBARQUE", 105, 60, { align: "center" });

        // Linha Divisória
        doc.setLineWidth(0.5);
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 70, 190, 70);

        let yPos = 90;

        // Passageiro
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("PASSAGEIRO", 20, yPos);
        
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(lastName.toUpperCase(), 20, yPos + 8);

        yPos += 25;

        // Grid de info
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont("helvetica", "normal");
        doc.text("REFERÊNCIA", 20, yPos);
        doc.text("VOO", 80, yPos);
        doc.text("DATA", 120, yPos);
        doc.text("LUGAR", 170, yPos);

        yPos += 8;
        
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(reference.toUpperCase(), 20, yPos);
        doc.text("DT 650", 80, yPos);
        
        const today = new Date().toLocaleDateString('pt-AO');
        doc.text(today, 120, yPos);
        
        doc.setTextColor(234, 88, 12); // Orange color for seat
        doc.setFontSize(20);
        doc.text("14F", 170, yPos);

        yPos += 30;

        // Box de info adicional
        doc.setDrawColor(245, 158, 11); // Amber border
        doc.setLineWidth(1);
        doc.rect(20, yPos, 170, 40);
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text("INFORMAÇÕES DE EMBARQUE", 105, yPos + 10, { align: "center" });
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Porta: A Confirmar", 30, yPos + 25);
        doc.text("Início do Embarque: 22:15", 110, yPos + 25);

        // Footer
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text("Apresente este documento (digital ou impresso) juntamente com o seu documento de identificação.", 105, 280, { align: "center" });

        doc.save(`Talao_Embarque_${reference}.pdf`);
    };

    // --- VISTA DE SUCESSO ---
    if (isCheckedIn) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                 <div className="max-w-md w-full bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Header Verde */}
                    <div className="bg-[#10B981] pt-10 pb-8 text-center px-4">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-400/50 mb-4 shadow-sm backdrop-blur-sm">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-1">Boa Viagem!</h2>
                        <p className="text-green-50 text-sm font-medium">Check-in realizado com sucesso.</p>
                    </div>
                    
                    <div className="p-8">
                        {/* Detalhes do Passageiro */}
                        <div className="mb-8">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Passageiro</p>
                            <p className="text-xl font-bold text-gray-900 leading-tight">{lastName || "Passageiro Exemplo"}</p>
                        </div>

                        <div className="flex justify-between items-end border-b border-gray-100 pb-8 mb-8">
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Referência</p>
                                <p className="font-mono text-lg font-bold text-gray-900">{reference.toUpperCase() || "REF123"}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Lugar</p>
                                <p className="text-3xl font-bold text-amber-500 leading-none">14F</p>
                            </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="space-y-3">
                            <button 
                                onClick={downloadTicket}
                                className="w-full flex justify-center items-center px-4 py-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                Baixar Talão de Embarque
                            </button>
                            <button 
                                onClick={() => { setIsCheckedIn(false); setReference(''); setLastName(''); }}
                                className="w-full flex justify-center items-center px-4 py-4 border-2 border-gray-200 text-sm font-bold rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Voltar ao Início
                            </button>
                        </div>
                    </div>
                 </div>
            </div>
        );
    }

    // --- VISTA PRINCIPAL (FORMULÁRIO + INSTRUÇÕES) ---
    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            
            {/* HERO SECTION COM FORMULÁRIO FLUTUANTE */}
            <div className="relative bg-gray-900 pb-32 lg:pb-40 overflow-hidden">
                {/* Imagem de Fundo */}
                <div className="absolute inset-0">
                    <img 
                        className="w-full h-full object-cover opacity-60" 
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
                        alt="Asa de avião no céu" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/90"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
                        
                        {/* Texto de Boas-vindas (Esquerda) */}
                        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left pt-10">
                            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                Check-in <span className="text-amber-500">Online</span>
                            </h1>
                            <p className="mt-4 text-lg text-gray-300">
                                Evite filas no aeroporto. Faça o seu check-in online a partir de 36 horas antes do seu voo internacional ou 24 horas para voos domésticos.
                            </p>
                            
                            {/* Steps Icons Mini (Visible on Desktop) */}
                            <div className="hidden lg:flex mt-10 space-x-8 text-gray-300">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-500 font-bold text-xl mb-2">1</div>
                                    <span className="text-sm font-medium">Dados</span>
                                </div>
                                <div className="w-12 border-t-2 border-gray-600 mt-6"></div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-400 font-bold text-xl mb-2">2</div>
                                    <span className="text-sm font-medium">Lugares</span>
                                </div>
                                <div className="w-12 border-t-2 border-gray-600 mt-6"></div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-400 font-bold text-xl mb-2">3</div>
                                    <span className="text-sm font-medium">Bilhete</span>
                                </div>
                            </div>
                        </div>

                        {/* CARTÃO DE FORMULÁRIO (Direita) */}
                        <div className="mt-12 lg:mt-0 lg:col-span-6 lg:flex lg:justify-end">
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full mx-auto lg:mr-0 transform transition-all hover:scale-[1.01] duration-300 relative">
                                <div className="px-8 py-8">
                                    <h2 className="text-2xl font-bold text-amber-600 mb-6 text-center">
                                        Efetuar o check-in agora
                                    </h2>

                                    {/* Tabs para Tipo de Identificação */}
                                    <div className="flex border-b border-gray-200 mb-6">
                                        <button 
                                            onClick={() => setIdType('booking_ref')}
                                            className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${idType === 'booking_ref' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                        >
                                            Referência
                                        </button>
                                        <button 
                                            onClick={() => setIdType('ticket_no')}
                                            className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${idType === 'ticket_no' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                        >
                                            Bilhete Eletrónico
                                        </button>
                                    </div>

                                    <form onSubmit={handleCheckInSubmit} className="space-y-5">
                                        
                                        {/* Reference Input */}
                                        <div className="relative">
                                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1 ml-1">
                                                {idType === 'booking_ref' ? 'Código da Reserva' : 'Número do Bilhete'} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={reference}
                                                onChange={(e) => setReference(e.target.value.toUpperCase())}
                                                className="block w-full border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-medium bg-white shadow-sm"
                                                placeholder={idType === 'booking_ref' ? 'Ex: X7Y8Z9' : 'Ex: 027415445LA059'}
                                            />
                                            {idType === 'ticket_no' && (
                                                <button 
                                                    type="button" 
                                                    onClick={() => setShowRetrievalModal(true)}
                                                    className="absolute right-2 top-9 text-xs font-bold text-amber-600 hover:text-amber-800 bg-amber-50 px-2 py-1 rounded"
                                                >
                                                    Esqueceu?
                                                </button>
                                            )}
                                            <p className="mt-1 text-xs text-gray-400 px-2">
                                                {idType === 'booking_ref' ? 'Código alfanumérico de 6 dígitos.' : 'Número de 13 dígitos no seu recibo.'}
                                            </p>
                                        </div>

                                        {/* Last Name Input */}
                                        <div className="relative">
                                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1 ml-1">
                                                Apelido do Passageiro <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="block w-full border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-medium bg-white shadow-sm"
                                                placeholder="Como consta no bilhete"
                                            />
                                        </div>

                                        {/* Retrieval Link - Se não souber os dados */}
                                        <div className="text-center pt-1">
                                            <button 
                                                type="button" 
                                                onClick={() => setShowRetrievalModal(true)}
                                                className="text-sm text-gray-500 hover:text-amber-600 underline"
                                            >
                                                Não encontra o seu bilhete? Pesquise aqui.
                                            </button>
                                        </div>

                                        {error && (
                                            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg font-bold text-center border border-red-100">
                                                {error}
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg py-4 px-4 rounded-xl shadow-lg transition-transform transform hover:scale-[1.02] active:scale-95"
                                            >
                                                Iniciar Check-in
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL DE RECUPERAÇÃO DE DADOS */}
            {showRetrievalModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowRetrievalModal(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Encontrar a sua Reserva
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 mb-4">
                                                Introduza o email utilizado na compra e a data aproximada da viagem para localizarmos o seu bilhete eletrónico.
                                            </p>

                                            {!retrievedData ? (
                                                <form onSubmit={handleRetrieveSearch} className="space-y-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Email de Contacto</label>
                                                        <input 
                                                            type="email" 
                                                            required
                                                            value={retrievalEmail}
                                                            onChange={e => setRetrievalEmail(e.target.value)}
                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2 border bg-white text-black"
                                                            placeholder="seu.email@exemplo.com"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Data da Viagem</label>
                                                        <input 
                                                            type="date" 
                                                            required
                                                            value={retrievalDate}
                                                            onChange={e => setRetrievalDate(e.target.value)}
                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2 border bg-white text-black"
                                                        />
                                                    </div>
                                                    <div className="pt-2">
                                                        <button 
                                                            type="submit" 
                                                            disabled={isRetrieving}
                                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:text-sm"
                                                        >
                                                            {isRetrieving ? 'Pesquisando...' : 'Pesquisar Reserva'}
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                                                    <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-green-100 mb-2">
                                                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                    </div>
                                                    <p className="text-sm font-bold text-green-800">Reserva Encontrada!</p>
                                                    <p className="text-xs text-green-600 mt-1">Passageiro: {retrievedData.name}</p>
                                                    <p className="text-lg font-mono font-bold text-gray-900 mt-2">{retrievedData.ref}</p>
                                                    
                                                    <button 
                                                        onClick={handleAutoFill}
                                                        className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:text-sm"
                                                    >
                                                        Usar este Bilhete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button 
                                    type="button" 
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowRetrievalModal(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SECÇÃO INFORMATIVA (Abaixo da dobra) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Título */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-wide">
                        Como funciona o processo?
                    </h2>
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                        É simples, rápido e seguro. Siga estes três passos para garantir o seu lugar e evitar filas no aeroporto.
                    </p>
                </div>

                {/* 3 Passos (Estilo Imagem 1) */}
                <div className="grid md:grid-cols-3 gap-10">
                    {/* Passo 1 */}
                    <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-amber-200 transition-all duration-300">
                        <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                            <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt="Dados" />
                            <div className="absolute top-0 left-0 bg-amber-500 text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-br-xl shadow-md">1</div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase">Introduza os Dados</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Identifique a sua reserva utilizando o seu apelido e o código de referência ou número do bilhete eletrónico no formulário acima.
                        </p>
                    </div>

                    {/* Passo 2 */}
                    <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-amber-200 transition-all duration-300">
                        <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                            <img src="https://images.unsplash.com/photo-1542296332-2e44a99cfef0?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt="Lugares" />
                            <div className="absolute top-0 left-0 bg-gray-900 text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-br-xl shadow-md">2</div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase">Escolha os Lugares</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Janela ou coxia? Visualize o mapa do avião e selecione o seu lugar favorito para garantir o máximo conforto na VICTÓRIA EXPRESS.
                        </p>
                    </div>

                    {/* Passo 3 */}
                    <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-amber-200 transition-all duration-300">
                        <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                            <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt="Bilhete" />
                            <div className="absolute top-0 left-0 bg-green-600 text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-br-xl shadow-md">3</div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase">Obtenha o Bilhete</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Receba o seu talão de embarque digital (QR Code) ou imprima-o. Apresente-o diretamente no portão de embarque.
                        </p>
                    </div>
                </div>

                {/* Info Baggage + FAQ */}
                <div className="mt-20 grid lg:grid-cols-2 gap-12">
                    
                    {/* Baggage Info */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                        <h3 className="flex items-center text-xl font-bold text-gray-900 mb-6">
                            <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            Bagagem de Porão
                        </h3>
                        <div className="prose prose-sm text-gray-600">
                            <p className="mb-4">
                                Mesmo fazendo o check-in online, pode despachar a sua bagagem.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                                    Dirija-se aos balcões "Drop-off".
                                </li>
                                <li className="flex items-start">
                                    <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                                    Prazo limite: 90 min antes da partida (Internacional).
                                </li>
                                <li className="flex items-start">
                                    <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                                    Passageiros Business têm prioridade.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h3>
                        <div className="space-y-4">
                            {[
                                { q: "Quando abre o check-in online?", a: "36 horas antes para voos internacionais e 24 horas para domésticos." },
                                { q: "Preciso imprimir o bilhete?", a: "Não necessariamente. Pode usar a versão digital no telemóvel na maioria dos aeroportos, incluindo Luanda." },
                                { q: "Posso mudar de lugar depois?", a: "Sim, pode reentrar no check-in online para alterar o lugar até ao fecho do voo." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => toggleFaq(idx)}>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-800 text-sm">{item.q}</span>
                                        <span className={`transform transition-transform ${openFaq === idx ? 'rotate-180 text-amber-500' : 'text-gray-400'}`}>▼</span>
                                    </div>
                                    {openFaq === idx && <p className="mt-3 text-sm text-gray-600 pt-2 border-t border-gray-100">{item.a}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckIn;
