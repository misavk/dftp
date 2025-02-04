import { Truck, Ship, Plane, Navigation2, Wrench, Leaf, Cpu, BarChart3, Wifi, Battery, Radio } from 'lucide-react'; 
import { motion } from 'framer-motion';

const Fleet = () => {
  const vehicles = [
    {
      type: 'Caminhão Baú',
      icon: Truck,
      specs: {
        capacidade: '12 toneladas',
        comprimento: '7,5 metros',
        altura: '3,2 metros',
        largura: '2,6 metros'
      },
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      type: 'Navio Porta-Contêiner',
      icon: Ship,
      specs: {
        capacidade: '10.000 TEUs',
        comprimento: '300 metros',
        calado: '15 metros',
        velocidade: '25 nós'
      },
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
    },
    {
      type: 'Aeronave Cargueira',
      icon: Plane,
      specs: {
        capacidade: '100 toneladas',
        alcance: '8.000 km',
        velocidade: '850 km/h',
        altitude: '35.000 pés'
      },
      image: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const techFeatures = [
    {
      icon: Navigation2,
      title: 'Rastreamento GPS',
      description: 'Sistema de rastreamento em tempo real com precisão de localização e histórico completo de rotas',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Wrench,
      title: 'Manutenção Preventiva',
      description: 'Sistema inteligente de prevenção de falhas com análise preditiva e alertas automáticos',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Leaf,
      title: 'Eficiência Energética',
      description: 'Tecnologia eco-friendly com monitoramento de consumo e redução de emissões',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Cpu,
      title: 'Telemetria Avançada',
      description: 'Monitoramento em tempo real de todos os sistemas do veículo',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Análise de dados para otimização de rotas e consumo de combustível',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Wifi,
      title: 'Conectividade',
      description: 'Comunicação em tempo real entre veículos e central de operações',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Battery,
      title: 'Gestão de Energia',
      description: 'Monitoramento e otimização do consumo energético da frota',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Radio,
      title: 'Comunicação Integrada',
      description: 'Sistema de comunicação digital com motoristas e equipe operacional',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Nossa Frota</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.type}
                  className="w-full h-full object-cover"
                />
              </div>
              
            
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <vehicle.icon className="text-[#003366]" size={24} />
                  <h3 className="text-xl font-semibold">{vehicle.type}</h3>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(vehicle.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Tecnologia de Ponta</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003366] to-[#002244] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Fleet;
