import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const QuoteCalculator = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    dimensions: '',
    service: 'standard',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate quote calculation
    toast.success('Cálculo realizado com sucesso!');
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Calculadora de Orçamento</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Origem</label>
            <input
              type="text"
              value={formData.origin}
              onChange={(e) =>
                setFormData({ ...formData, origin: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366] dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Destino</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366] dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Peso</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366] dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Dimensões</label>
            <input
              type="text"
              value={formData.dimensions}
              onChange={(e) =>
                setFormData({ ...formData, dimensions: e.target.value })
              }
              placeholder="CxLxA (cm)"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366] dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Serviço</label>
          <select
            value={formData.service}
            onChange={(e) =>
              setFormData({ ...formData, service: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366] dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="standard">Padrão</option>
            <option value="express">Expresso</option>
            <option value="same-day">Mesmo Dia</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-[#003366] text-white py-3 rounded-md hover:bg-[#002244] transition-colors"
        >
          Calcular
        </motion.button>
      </form>
    </div>
  );
};

export default QuoteCalculator;
