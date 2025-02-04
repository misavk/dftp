import { useEffect } from 'react';
import './GoogleTranslate.css';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void; // Tornar a propriedade opcional
    google: any;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    const addScript = () => {
      const script = document.createElement('script');
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'pt',
          includedLanguages: 'en,pt',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    }

    return () => {
      delete window.googleTranslateElementInit; // Agora o TypeScript aceita
    };
  }, []);

  return <div id="google_translate_element" className="google-translate-fixed" />;
};

export default GoogleTranslate;
