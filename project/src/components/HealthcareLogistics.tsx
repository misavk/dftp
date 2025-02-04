import { motion } from 'framer-motion';
import { Thermometer, Beaker, Building2, Package, Shield, Truck, Microscope, Building } from 'lucide-react';

const HealthcareLogistics = () => {
  const features = [
    {
      icon: Building,
      title: "Logística Hospitalar",
      description: "Gerenciamento estratégico e racional da movimentação, armazenagem e distribuição de materiais médico-hospitalares, medicamentos e outros materiais essenciais.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Thermometer,
      title: "Armazém Refrigerado",
      description: "Controle preciso de temperatura para diferentes necessidades: +15°C/25°C, +2/8°C, -20°C, -70°C, garantindo a integridade dos produtos.",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Beaker,
      title: "Produtos Especializados",
      description: "Gerenciamento de produtos perigosos, químicos, reagentes, medicamentos, suplementos e materiais de risco biológico.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Building2,
      title: "Serviço In-House",
      description: "Gerenciamento de estoque nas próprias instalações do cliente, oferecendo maior controle e eficiência operacional.",
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Segmento Hospitalar
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Soluções personalizadas para a logística hospitalar, adaptadas às demandas específicas de cada cliente.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden relative group"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003366] to-[#002244] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 bg-[#003366] rounded-xl overflow-hidden shadow-xl"
        >
          <div className="relative h-64 overflow-hidden">
            <motion.img
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Armazenagem e Distribuição"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#003366]/60"></div>
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Armazenagem e Fluxo de Distribuição
            </h3>
            <p className="mb-6 text-gray-200">
              Garantimos que todos os produtos manipulados serão armazenados com licença e segurança, com localização monitorada, seguindo rigorosamente os padrões, regulamentos e as melhores práticas do setor.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-white">
                <Shield className="text-white/80" size={20} />
                <span>Segurança Total</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Truck className="text-white/80" size={20} />
                <span>Distribuição Eficiente</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Microscope className="text-white/80" size={20} />
                <span>Controle de Qualidade</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Package className="text-white/80" size={20} />
                <span>Rastreamento Total</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HealthcareLogistics;