
import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {authType === 'login' ? 'Aceda à sua conta' : 'Crie uma nova conta'}
          </h2>
        </div>

        <div className="flex justify-center rounded-md shadow-sm">
          <button
            onClick={() => setAuthType('login')}
            className={`py-2 px-4 w-1/2 rounded-l-md text-sm font-medium ${authType === 'login' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Entrar
          </button>
          <button
            onClick={() => setAuthType('register')}
            className={`py-2 px-4 w-1/2 rounded-r-md text-sm font-medium ${authType === 'register' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Cadastrar
          </button>
        </div>

        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Número de telefone ou Email</label>
              <input
                id="email-address"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Número de telefone ou Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Palavra-passe</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Palavra-passe (8 caracteres)"
              />
            </div>
          </div>

          {authType === 'login' && (
             <div className="flex items-center justify-between">
                <div className="text-sm">
                    <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                        Esqueceu-se da palavra-passe?
                    </a>
                </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              {authType === 'login' ? 'Entrar' : 'Criar Conta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
