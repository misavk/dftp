import { motion } from 'framer-motion';

interface AnimatedHeaderProps {
  title: string;
  subtitle?: string;
}

const AnimatedHeader = ({ title, subtitle }: AnimatedHeaderProps) => {
  return (
    <div className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold mb-6"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedHeader;