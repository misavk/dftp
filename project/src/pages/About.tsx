
import { motion } from 'framer-motion';
import { Award, Users, Target, TrendingUp, Warehouse, Truck, Building2, Network, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">Nossa História</h1>
          <div className="max-w-4xl mx-auto">
            <Star className="w-12 h-12 text-[#003366] mx-auto mb-6" />
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-[#003366] mb-4"
            >
              DF TRANSPORTES
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg max-w-none text-gray-600 space-y-6"
            >
              <p>
                Fundada em 2009 por Deivisson Fabiano Silva de Matos, a DF TRANSPORTES é uma empresa de transporte e logística que preza por eficiência, segurança e atendimento de qualidade. Com uma frota moderna e investimentos contínuos em tecnologia, comunicação e capacitação, a empresa se destaca pela oferta de serviços personalizados e de alto padrão.
              </p>
              <p>
                Especializada em transporte nacional e internacional, a DF TRANSPORTES abrange armazenamento, gerenciamento de transporte, entregas domiciliares, estoque consignado e serviços de valor agregado na cadeia de suprimentos.
              </p>
              <p>
                Com foco no setor da saúde, a empresa oferece soluções sob medida, ajudando clientes a otimizar seus negócios de forma ágil e confiável. O compromisso com um atendimento personalizado e econômico faz da DF TRANSPORTES um parceiro estratégico para seus clientes.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#003366]"></div>
          
          {[
            {
              year: '2009',
              title: 'Fundação',
              description: 'Início das operações com foco em transporte terrestre'
            },
            {
              year: '2012',
              title: 'Expansão Nacional',
              description: 'Abertura de filiais em todas as regiões do Brasil'
            },
            {
              year: '2015',
              title: 'Internacional',
              description: 'Início das operações de comércio exterior'
            },
            {
              year: '2018',
              title: 'Tecnologia',
              description: 'Implementação de sistema próprio de gestão logística'
            },
            {
              year: '2024',
              title: 'Presente',
              description: 'Referência em soluções logísticas integradas'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative ${
                index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
              } mb-8`}
            >
              <div className={`bg-white p-6 rounded-lg shadow-lg ${
                index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
              }`}>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#003366] rounded-full"></div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">{item.year}</h3>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="bg-[#003366] text-white rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Nossos Valores</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Excelência',
                description: 'Comprometimento com a qualidade em todos os processos'
              },
              {
                icon: Users,
                title: 'Pessoas',
                description: 'Valorização e desenvolvimento de nossa equipe'
              },
              {
                icon: Target,
                title: 'Inovação',
                description: 'Busca constante por soluções tecnológicas'
              },
              {
                icon: TrendingUp,
                title: 'Resultados',
                description: 'Foco em entregar valor para nossos clientes'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <value.icon size={40} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Infrastructure Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Nossa Estrutura</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Warehouse,
                title: 'Centros de Distribuição',
                description: '3 CDs estrategicamente localizados',
                
              },
              {
                icon: Truck,
                title: 'Frota Própria',
                description: 'Veículos modernos e rastreados',
                stats: '500+ veículos'
              },
              {
                icon: Building2,
                title: 'Filiais',
                description: 'Presença em todo território nacional',
                stats: '3 unidades'
              },
              {
                icon: Network,
                title: 'Tecnologia',
                description: 'Sistema integrado de gestão',
                stats: '99.9% uptime'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <item.icon size={40} className="mx-auto mb-4 text-[#003366]" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-2xl font-bold text-[#003366]">{item.stats}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;