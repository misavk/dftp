import { motion } from 'framer-motion';
import { Truck, Plane, Ship, Package, MapPin, Heart, Home as HomeIcon } from 'lucide-react';
import AnimatedTransport from '../components/AnimatedTransport';
import Slideshow from '../components/Slideshow';
import HealthcareLogistics from '../components/HealthcareLogistics';

const HomePage = () => {
  const statistics = [
    {
      icon: Package,
      value: '140k+',
      label: 'Entregas Realizadas',
      delay: 0
    },
    {
      icon: MapPin,
      value: '700+',
      label: 'Cidades Atendidas',
      delay: 0.1
    },
    {
      icon: Heart,
      value: '1600+',
      label: 'Clientes Satisfeitos',
      delay: 0.2
    },
    {
      icon: HomeIcon,
      value: '3',
      label: 'Filiais',
      delay: 0.3
    }
  ];

  const transportServices = [
    {
      icon: Truck,
      title: 'Transporte Terrestre',
      description: 'Entregas em todo território nacional com rastreamento em tempo real'
    },
    {
      icon: Plane,
      title: 'Transporte Aéreo',
      description: 'Entregas expressas para cargas urgentes em todo o mundo'
    },
    {
      icon: Ship,
      title: 'Transporte Marítimo',
      description: 'Soluções completas para importação e exportação'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section with Slideshow */}
      <section className="relative h-[calc(100vh-4rem)] sm:h-screen">
        <Slideshow />
      </section>

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#003366] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.delay }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon size={32} className="text-white/90" />
                </div>
                <motion.h3
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
                >
                  {stat.value}
                </motion.h3>
                <p className="text-white/80 text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            Nossos Serviços
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {transportServices.map((service, index) => (
              <AnimatedTransport
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Logistics Section */}
      <HealthcareLogistics />
    </div>
  );
};

export default HomePage;