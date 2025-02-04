
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#003366] transition-colors"
        aria-label="Mudar idioma"
      >
        <Globe size={20} />
        <span className="hidden lg:inline">Português</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;