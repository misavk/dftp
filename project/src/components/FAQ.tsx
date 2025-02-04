import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Qual é o tempo de envio?',
      answer: 'O tempo de envio varia conforme a localização e o serviço escolhido.',
    },
    {
      question: 'Como posso rastrear meu pedido?',
      answer: 'Você pode rastrear seu pedido usando nosso sistema de rastreamento online.',
    },
    {
      question: 'Vocês oferecem transporte internacional?',
      answer: 'Sim, oferecemos serviços de transporte para destinos internacionais.',
    },
    {
      question: 'Há seguro para envios?',
      answer: 'Sim, todos os envios podem incluir seguro opcional.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden dark:border-gray-700">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium">{faq.question}</span>
              <ChevronDown
                className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
