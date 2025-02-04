import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://dftransportes.brudam.com.br/api/v1/acesso/auth/login',
        {
          usuario,
          senha: password,
        }
      );

      if (response.data.status === 1) {
        const token = response.data.data.access_key;
        localStorage.setItem('access_token', token);
        navigate('/');
      } else {
        alert('Erro: ' + response.data.message);
      }
    } catch (error) {
      console.error('Erro de autenticação:', error);
      alert('Erro ao autenticar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
            Usuário
          </label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 ${
            loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
          } text-white rounded-md transition-all`}
        >
          {loading ? 'Entrando...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
