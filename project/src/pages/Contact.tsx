import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';

// Initialize EmailJS
emailjs.init("p2tqrVwf40q5js795");

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_j9p1jmr",
        "template_xm9yumg",
        {
          ...formData,
          to_name: "DF Transportes"
        }
      );

      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({
        from_name: '',
        from_email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Entre em Contato
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#003366] p-3 rounded-full text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Endereço</h3>
                  <p className="text-gray-600">Terminal de Cargas do Aeroporto Internacional de Brasília - Lago Sul, Brasília - DF, 71608-900</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-[#003366] p-3 rounded-full text-white">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-gray-600">(11) 3000-0000</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-[#003366] p-3 rounded-full text-white">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">comercial@dftransportes.com.br</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.7103063007635!2d-47.92467812462802!3d-15.871815984779467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a259de270fdd5%3A0x5643f83772d8c17a!2sDF%20Transportes%20-%20Aeroporto%20Internacional%20de%20Bras%C3%ADlia!5e0!3m2!1spt-BR!2sbr!4v1732656271553!5m2!1spt-BR!2sbr"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="from_email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                  required
                >
                  <option value="">Selecione um assunto</option>
                  <option value="orcamento">Solicitar Orçamento</option>
                  <option value="duvida">Dúvidas</option>
                  <option value="suporte">Suporte</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#003366] text-white px-6 py-3 rounded-md hover:bg-[#002244] transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
              >
                {isSubmitting ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;