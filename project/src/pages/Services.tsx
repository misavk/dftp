import { motion } from 'framer-motion';
import { Truck, Ship, Plane, Package, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Nossos Serviços</h1>

        {/* Main Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Truck,
              title: 'Transporte Terrestre',
              description: 'Entregas em todo território nacional com rastreamento em tempo real.',
              features: [
                'Carga completa e fracionada',
                'Distribuição urbana',
                'Transporte dedicado',
                'Cross-docking'
              ]
            },
            {
              icon: Ship,
              title: 'Transporte Marítimo',
              description: 'Soluções completas para importação e exportação via modal marítimo.',
              features: [
                'FCL e LCL',
                'Break bulk',
                'Projeto especial',
                'Seguro internacional'
              ]
            },
            {
              icon: Plane,
              title: 'Transporte Aéreo',
              description: 'Entregas expressas para cargas urgentes em todo o mundo.',
              features: [
                'Door-to-door',
                'Cargas perecíveis',
                'Carga valorada',
                'Charter'
              ]
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="bg-[#003366] w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Package size={16} className="text-[#003366]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-[#003366] text-white rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Diferenciais</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Pontualidade',
                description: 'Compromisso com prazos e entregas no tempo acordado'
              },
              {
                icon: Shield,
                title: 'Segurança',
                description: 'Monitoramento 24/7 e seguro para todas as cargas'
              },
              {
                icon: Package,
                title: 'Customização',
                description: 'Soluções personalizadas para cada necessidade'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon size={40} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Precisa de um orçamento?</h2>
          <p className="text-gray-600 mb-6">
            Entre em contato conosco e receba uma proposta personalizada para sua empresa
          </p>
          <Link to="/cotacao">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#003366] text-white px-8 py-3 rounded-md hover:bg-[#002244] transition-colors"
            >
              Solicitar Cotação
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;