import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_j9p1jmr",
        "template_xm9yumg",
        {
          from_email: email,
          subject: "Nova Inscrição Newsletter",
          message: `Novo cadastro na newsletter: ${email}`,
          to_name: "DF Transportes"
        }
      );

      toast.success('Inscrição realizada com sucesso!');
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Erro ao realizar inscrição. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = {
    facebook: 'https://facebook.com/dftransportes',
    instagram: 'https://instagram.com/dftransportes',
    linkedin: 'https://linkedin.com/company/dftransportes'
  };

  return (
    <footer className="bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] text-white placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Inscrever-se na newsletter"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Receba novidades e atualizações sobre nossos serviços
              </p>
            </form>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/servicos" className="text-gray-400 hover:text-white transition-colors">Serviços</Link></li>
              <li><Link to="/rastreamento" className="text-gray-400 hover:text-white transition-colors">Rastreamento</Link></li>
              <li><Link to="/frota" className="text-gray-400 hover:text-white transition-colors">Nossa Frota</Link></li>
              <li><Link to="/sobre" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link to="/cotacao" className="text-gray-400 hover:text-white transition-colors">Solicitar Cotação</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin size={18} className="flex-shrink-0" />
                <span className="text-gray-400">Terminal de Cargas do Aeroporto Internacional de Brasília 71608-900</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-gray-400">(11) 3000-0000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-gray-400 break-all">comercial@dftransportes.com.br</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a 
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#003366] transition-colors"
                aria-label="Siga-nos no Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#003366] transition-colors"
                aria-label="Siga-nos no Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#003366] transition-colors"
                aria-label="Siga-nos no LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} DF Transportes. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;