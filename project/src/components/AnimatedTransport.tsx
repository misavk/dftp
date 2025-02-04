import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TransportCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const AnimatedTransport = ({ icon: Icon, title, description }: TransportCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <Icon className="w-12 h-12 text-[#003366] mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default AnimatedTransport;