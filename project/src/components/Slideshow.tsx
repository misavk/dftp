import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Transporte Terrestre',
    description: 'Frota moderna e rastreada',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Transporte Aéreo',
    description: 'Agilidade nas entregas',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Transporte Marítimo',
    description: 'Soluções globais em logística',
  },
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const paginate = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] sm:h-screen overflow-hidden bg-black">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentIndex ? (
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.3, ease: 'easeInOut' },
              }}
            >
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.1 }}
                transition={{ duration: 6, ease: 'linear' }}
              />
              {/* Gradiente mais escuro */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
              {/* Sobreposição com cor adicional */}
              <div className="absolute inset-0 bg-[#003366]/40"></div>
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-center drop-shadow-md max-w-3xl mb-8">
                  {slide.description}
                </p>
                <Link to="/cotacao">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#003366] px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
                  >
                    Solicitar Cotação
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <button
        onClick={() => paginate((currentIndex - 1 + slides.length) % slides.length)}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/40 rounded-full p-2 sm:p-3 transition-colors z-10 backdrop-blur-sm"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      <button
        onClick={() => paginate((currentIndex + 1) % slides.length)}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/40 rounded-full p-2 sm:p-3 transition-colors z-10 backdrop-blur-sm"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index)}
            className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-6 sm:w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
