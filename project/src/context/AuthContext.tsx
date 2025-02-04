import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
  nome: string;
  cnpj: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | undefined;
  isLoading: boolean;
  login: (usuario: string, senha: string) => Promise<void>;
  logout: () => void;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Função para login com a API da Brudam
  const login = async (usuario: string, senha: string) => {
    setIsLoading(true);
    try {
      // Enviar dados de usuário e senha para o backend
      const response = await axios.post('http://localhost:8000/login', { usuario, senha });
      const { token } = response.data;

      // Salvar o token JWT no localStorage para persistência
      localStorage.setItem('auth_token', token);
      setToken(token);
      setIsAuthenticated(true);

      // Buscar dados do usuário
      const userData = await axios.get('http://localhost:8000/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(userData.data);

      toast.success('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      toast.error('Erro ao realizar login');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(undefined);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');  // Remover o token do localStorage
    toast.success('Logout realizado com sucesso!');
  };

  const getAccessToken = (): string | null => {
    return token;
  };

  useEffect(() => {
    // Verificar se o usuário já está autenticado ao carregar a aplicação
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // Aqui você pode fazer uma requisição para obter os dados do usuário, se necessário
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
