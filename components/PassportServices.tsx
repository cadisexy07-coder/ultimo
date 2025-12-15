
import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatter';

const PassportServices: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'initial' | 'processing' | 'confirmed'>('initial');
  const [selectedPlan, setSelectedPlan] = useState<'normal' | 'urgent'>('normal');
  const [fileAttached, setFileAttached] = useState(false);
  const [urgencyReason, setUrgencyReason] = useState('');

  const PLANS = {
    normal: {
      title: 'Processo Normal',
      price: 85500,
      description: 'Emissão padrão dentro dos prazos estipulados pelo SME.',
      features: ['Agendamento Online', 'Preenchimento Assistido', 'Prazo Regular']
    },
    urgent: {
      title: 'Processo Urgente',
      price: 180500,
      description: 'Prioridade na emissão para casos devidamente justificados.',
      features: ['Prioridade no Agendamento', 'Tramitação Acelerada', 'Suporte Dedicado']
    }
  };

  const handleOpenModal = (plan: 'normal' | 'urgent') => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
    setPaymentStatus('initial');
    setFileAttached(false);
    setUrgencyReason('');
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  const handleConfirmPayment = () => {
    if (selectedPlan === 'urgent') {
        if (!urgencyReason) {
            alert("Por favor, selecione o motivo da urgência.");
            return;
        }
        if (!fileAttached) {
            alert("Para processos urgentes, é obrigatório anexar o documento justificativo.");
            return;
        }
    }
    setPaymentStatus('processing');
    // Simulação de verificação de pagamento com backend
    setTimeout(() => {
      setPaymentStatus('confirmed');
    }, 3000);
  };

  const isConfirmDisabled = () => {
      if (selectedPlan === 'urgent') {
          return !fileAttached || !urgencyReason;
      }
      return false;
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Serviços de Emissão de Passaporte
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha a modalidade que melhor se adapta às suas necessidades. Garantimos celeridade e transparência junto ao SME.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* PLANO NORMAL */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative">
                <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900">{PLANS.normal.title}</h3>
                    <p className="mt-2 text-gray-500">{PLANS.normal.description}</p>
                    <div className="mt-6">
                        <span className="text-4xl font-extrabold text-gray-900">{formatCurrency(PLANS.normal.price)}</span>
                        <span className="text-base font-medium text-gray-500"> / serviço</span>
                    </div>
                    <ul className="mt-6 space-y-4">
                        {PLANS.normal.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                                <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="ml-3 text-base text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={() => handleOpenModal('normal')}
                        className="mt-8 w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-md"
                    >
                        Solicitar Processo Normal
                    </button>
                </div>
            </div>

            {/* PLANO URGENTE */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-amber-500 overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative">
                 <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-wide rounded-bl-lg">
                    Recomendado para Emergências
                </div>
                <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900">{PLANS.urgent.title}</h3>
                    <p className="mt-2 text-gray-500">{PLANS.urgent.description}</p>
                    <div className="mt-6">
                        <span className="text-4xl font-extrabold text-amber-600">{formatCurrency(PLANS.urgent.price)}</span>
                        <span className="text-base font-medium text-gray-500"> / serviço</span>
                    </div>
                    <ul className="mt-6 space-y-4">
                        {PLANS.urgent.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                                <svg className="flex-shrink-0 h-6 w-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="ml-3 text-base text-gray-700">{feature}</span>
                            </li>
                        ))}
                        <li className="flex items-start bg-red-50 p-2 rounded">
                            <svg className="flex-shrink-0 h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            <span className="ml-3 text-sm text-red-700 font-medium">Requer comprovativo documental (Médico ou Viagem) conforme <a href="https://www.sme.gov.ao/" target="_blank" className="underline hover:text-red-900">regras do SME</a>.</span>
                        </li>
                    </ul>
                    <button 
                        onClick={() => handleOpenModal('urgent')}
                        className="mt-8 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-md"
                    >
                        Solicitar Processo Urgente
                    </button>
                </div>
            </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Como funciona o processo na VICTÓRIA EXPRESS:</h4>
            <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="p-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-600 font-bold">1</div>
                    <p className="text-sm text-gray-600">Selecione o tipo de processo</p>
                </div>
                <div className="p-4">
                     <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-600 font-bold">2</div>
                    <p className="text-sm text-gray-600">Realize o pagamento da taxa</p>
                </div>
                <div className="p-4">
                     <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-600 font-bold">3</div>
                    <p className="text-sm text-gray-600">Envie os documentos (e justificativa se urgente)</p>
                </div>
                <div className="p-4">
                     <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-600 font-bold">4</div>
                    <p className="text-sm text-gray-600">Receba o agendamento no SME</p>
                </div>
            </div>
        </div>
      </div>

      {/* Modal de Pagamento */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={handleCloseModal}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              
              {/* Conteúdo do Modal */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                
                {/* Passo 1: Instruções de Pagamento */}
                {paymentStatus === 'initial' && (
                    <div>
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10 mb-4">
                            <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                            Detalhes para Pagamento - {PLANS[selectedPlan].title}
                        </h3>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 mb-4">
                                Para prosseguir com o agendamento no portal do SME, é necessário regularizar a taxa de serviço.
                            </p>

                            {/* Alerta e Formulário para Urgência */}
                            {selectedPlan === 'urgent' && (
                                <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
                                    <h4 className="text-sm font-bold text-red-800 flex items-center mb-2">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        Justificação de Urgência Obrigatória
                                    </h4>
                                    
                                    <div className="mb-3">
                                        <label className="block text-xs font-bold text-gray-700 mb-1">Motivo da Urgência</label>
                                        <select 
                                            value={urgencyReason}
                                            onChange={(e) => setUrgencyReason(e.target.value)}
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 bg-white border text-black font-medium"
                                        >
                                            <option value="" className="text-gray-500 bg-white">Selecione uma opção...</option>
                                            <option value="medical" className="text-black bg-white font-medium">Documento Médico</option>
                                            <option value="interview" className="text-black bg-white font-medium">Carta de Convocatória (Emprego/Entrevista)</option>
                                            <option value="family_assistance" className="text-black bg-white font-medium">Família com necessidade de assistência médica</option>
                                        </select>
                                    </div>

                                    <div className="mt-3">
                                        <label className="block text-xs font-bold text-gray-700 mb-1">Anexar Comprovativo (PDF/IMG)</label>
                                        <input 
                                            type="file" 
                                            className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-red-200"
                                            onChange={(e) => setFileAttached(e.target.files && e.target.files.length > 0 ? true : false)}
                                        />
                                        <p className="text-[10px] text-red-600 mt-1">
                                            * O documento deve comprovar o motivo selecionado acima conforme <a href="https://www.sme.gov.ao/" target="_blank" className="underline font-bold">termos do SME</a>.
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Valor a Pagar</p>
                                <p className="text-3xl font-bold text-gray-900">{formatCurrency(PLANS[selectedPlan].price)}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="border rounded-md p-3">
                                    <p className="font-bold text-gray-800 text-sm">Opção 1: Transferência Express</p>
                                    <p className="text-gray-600 text-sm">Telefone: <span className="font-mono font-bold text-black select-all">928 893 827</span></p>
                                </div>
                                
                                <div className="border rounded-md p-3">
                                    <p className="font-bold text-gray-800 text-sm">Opção 2: Pagamento por Referência</p>
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                        <div>
                                            <p className="text-xs text-gray-500">Entidade</p>
                                            <p className="font-mono font-bold text-black select-all">10116</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Referência ID</p>
                                            <p className="font-mono font-bold text-black select-all">928 893 827</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-xs text-red-500 mt-4">
                                * O acesso ao portal do SME só será liberado após a confirmação do pagamento e validação dos documentos (se aplicável).
                            </p>
                        </div>
                    </div>
                )}

                {/* Passo 2: Processando */}
                {paymentStatus === 'processing' && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto mb-4"></div>
                        <h3 className="text-lg font-medium text-gray-900">Verificando Pagamento e Documentos...</h3>
                        <p className="text-sm text-gray-500 mt-2">Por favor, aguarde enquanto confirmamos a transação.</p>
                    </div>
                )}

                {/* Passo 3: Confirmado */}
                {paymentStatus === 'confirmed' && (
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-lg leading-6 font-bold text-gray-900">
                            Pagamento Confirmado!
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                            A sua transação foi verificada com sucesso. Você agora tem acesso autorizado ao portal do SME.
                        </p>
                        
                        <div className="mt-6 bg-amber-50 p-4 rounded-md border border-amber-200">
                             <p className="text-sm font-medium text-amber-800 mb-2">Próximo Passo:</p>
                             <p className="text-sm text-gray-600 mb-4">Aceda ao link abaixo para concluir seus dados biométricos ou agendamento.</p>
                             <a 
                                href="https://www.sme.gov.ao/ao/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full px-4 py-3 border border-transparent text-sm font-bold rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                             >
                                Aceder ao Portal SME Oficial
                                <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                             </a>
                        </div>
                    </div>
                )}

              </div>
              
              {/* Footer do Modal */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {paymentStatus === 'initial' && (
                    <button 
                        type="button" 
                        onClick={handleConfirmPayment}
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${isConfirmDisabled() ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'}`}
                        disabled={isConfirmDisabled()}
                    >
                        {isConfirmDisabled() ? 'Preencha os dados de urgência' : 'Já realizei o Pagamento'}
                    </button>
                )}
                <button 
                    type="button" 
                    onClick={handleCloseModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    {paymentStatus === 'confirmed' ? 'Fechar' : 'Cancelar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassportServices;
