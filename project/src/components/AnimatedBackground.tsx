
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366] via-transparent to-[#003366] opacity-20"></div>
      </motion.div>
    </div>
  );
};

export default AnimatedBackground;