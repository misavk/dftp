import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    alert('Você saiu com sucesso!');
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/servicos', label: 'Serviços' },
    { path: '/rastreamento', label: 'Rastreamento' },
    { path: '/frota', label: 'Frota' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/contato', label: 'Contato' },
    { path: '/cotacao', label: 'Cotação' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 shadow-lg backdrop-blur-sm' : 'bg-black'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img
              src="/df-transportes-logo.png"
              alt="DF Transportes Logo"
              className="h-8 w-auto sm:h-10"
            />
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2 lg:px-3 py-2 text-sm lg:text-base text-white transition-colors hover:text-[#003366] ${
                  location.pathname === link.path ? 'text-[#003366]' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate('/login')}
                    className="text-white hover:text-[#003366] transition-colors flex items-center gap-2"
                  >
                    <UserCircle size={20} />
                    <span className="hidden lg:inline">Entrar</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate('/signup')}
                    className="bg-[#003366] px-4 py-2 rounded-md text-white hover:bg-[#002244] transition-colors whitespace-nowrap text-sm lg:text-base"
                  >
                    Criar Conta
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleLogout}
                  className="text-white hover:text-[#003366] transition-colors flex items-center gap-2"
                >
                  <LogOut size={20} />
                  <span className="hidden lg:inline">Sair</span>
                </motion.button>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:text-[#003366] transition-colors"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 overflow-hidden backdrop-blur-sm"
          >
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-white hover:bg-[#003366]/20 transition-colors ${
                    location.pathname === link.path ? 'bg-[#003366] text-white' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-700">
                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full text-left px-3 py-2 text-white hover:bg-[#003366]/20 transition-colors"
                    >
                      Entrar
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="w-full text-left px-3 py-2 text-white bg-[#003366] rounded-md hover:bg-[#002244] transition-colors"
                    >
                      Criar Conta
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-white hover:bg-[#003366]/20 transition-colors"
                  >
                    Sair
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
