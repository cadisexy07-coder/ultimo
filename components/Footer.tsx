
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-amber-400">Sobre a VICTÓRIA EXPRESS</h3>
          <p className="mt-4 text-sm text-gray-400">
            A VICTÓRIA EXPRESS é uma Agência de Viagens sediada em Angola, que oferece excelência no serviço prestado aos clientes. Nossa equipe está sempre ponta a ajudar, para que você tenha total tranquilidade e proveito tornando sua viagem única, desde o planejamento até o retorno. Comprove já e viaje tranquilamente, fiabilidade com VICTÓRIA EXPRESS.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-400">Contactos</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              Serviço ao Cliente: 928 893 827
            </li>
            <li className="flex items-center text-gray-400">
             <svg className="w-5 h-5 mr-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 2.833a1.667 1.667 0 00-2.357 0L2.833 13.143A1.667 1.667 0 002.5 14.31v1.857a.833.833 0 00.833.833h1.857c.45 0 .88-.175 1.19-.483l10.31-10.31a1.667 1.667 0 000-2.357zM5.833 14.167a.833.833 0 11-1.666 0 .833.833 0 011.666 0zM17.5 4.5a.833.833 0 00-.833-.833H15a.833.833 0 000 1.666h1.667A.833.833 0 0017.5 4.5zM12.5 7.833a.833.833 0 00-.833-.833H10a.833.833 0 000 1.666h1.667a.833.833 0 00.833-.833z"></path></svg>
              Suporte Técnico (WhatsApp): 956 067 215
            </li>
          </ul>
        </div>
        <div>
           <h3 className="text-lg font-semibold text-amber-400">Navegação</h3>
           <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-amber-300">Termos e Condições</a></li>
            <li><a href="#" className="hover:text-amber-300">Política de Privacidade</a></li>
           </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 pb-8">
        <p className="text-center text-sm text-gray-400">&copy; {new Date().getFullYear()} VICTÓRIA EXPRESS. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
