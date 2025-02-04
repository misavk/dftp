import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-lg shadow-xl z-40"
          >
            <div className="bg-[#003366] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Chat ao Vivo</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
                aria-label="Fechar chat"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-80 p-4 overflow-y-auto">
              <div className="text-center text-gray-500 text-sm">
                Inicie uma conversa com nossa equipe
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
                <button
                  type="submit"
                  className="bg-[#003366] text-white p-2 rounded-md hover:bg-[#002244] transition-colors"
                  aria-label="Enviar mensagem"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 sm:right-8 bg-[#003366] text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-[#002244] transition-colors z-40"
        aria-label="Abrir chat"
      >
        <MessageCircle size={24} />
      </motion.button>
    </>
  );
};

export default LiveChat;