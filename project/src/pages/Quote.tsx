import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Package, Ruler, MapPin, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

interface QuoteFormData {
  weight: string;
  volume: string;
  distance: string;
  weightRate: string;
  volumeRate: string;
  distanceRate: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface QuoteResult {
  weightCost: number;
  volumeCost: number;
  distanceCost: number;
  totalCost: number;
}

const Quote = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    weight: '',
    volume: '',
    distance: '',
    weightRate: '0.80',
    volumeRate: '150.00',
    distanceRate: '100.00',
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    try {
      const weight = parseFloat(formData.weight);
      const volume = parseFloat(formData.volume);
      const distance = parseFloat(formData.distance);
      const weightRate = parseFloat(formData.weightRate);
      const volumeRate = parseFloat(formData.volumeRate);
      const distanceRate = parseFloat(formData.distanceRate);

      const weightCost = weight * weightRate;
      const volumeCost = volume * volumeRate;
      const distanceCost = (distance / 100) * distanceRate;
      const totalCost = Math.max(weightCost, volumeCost) + distanceCost;

      const result = {
        weightCost,
        volumeCost,
        distanceCost,
        totalCost
      };

      setQuoteResult(result);
      toast.success('Cotação calculada com sucesso!');
    } catch (error) {
      console.error('Error processing quote:', error);
      toast.error('Erro ao processar cotação. Por favor, tente novamente.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Calculadora de Frete</h1>
          <p className="text-gray-600">
            Calcule o valor do seu frete de forma rápida e precisa
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <form onSubmit={calculateQuote} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366]"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366]"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Package className="inline-block mr-2" size={16} />
                  Peso da Carga (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Ruler className="inline-block mr-2" size={16} />
                  Volume da Carga (m³)
                </label>
                <input
                  type="number"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline-block mr-2" size={16} />
                  Distância (km)
                </label>
                <input
                  type="number"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003366]"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isCalculating}
              className="w-full bg-[#003366] text-white py-3 rounded-md hover:bg-[#002244] transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Calculando...</span>
                </>
              ) : (
                <>
                  <Calculator size={20} />
                  <span>Calcular Cotação</span>
                </>
              )}
            </motion.button>
          </form>

          {quoteResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="text-[#003366]" />
                Resultado da Cotação
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Custo por Peso:</span>
                  <span className="font-semibold">R$ {quoteResult.weightCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Custo por Volume:</span>
                  <span className="font-semibold">R$ {quoteResult.volumeCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Custo por Distância:</span>
                  <span className="font-semibold">R$ {quoteResult.distanceCost.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold text-[#003366]">Custo Total do Frete:</span>
                    <span className="font-bold text-[#003366]">
                      R$ {quoteResult.totalCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Quote;
