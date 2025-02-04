// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home'; // Página inicial
import Services from './pages/Services';
import Tracking from './pages/Tracking';
import Fleet from './pages/Fleet';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage'; // Página de login
import SignupPage from './pages/SignupPage'; // Página de cadastro
import About from './pages/About';
import Quote from './pages/Quote';
import ScrollToTop from './components/ScrollToTop';
import Toast from './components/Toast';
import WhatsAppButton from './components/WhatsAppButton';
import GoogleTranslate from './components/GoogleTranslate';
import TrackingPage from './pages/Tracking'; // Página para exibir os dados de rastreamento

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />  {/* Página inicial */}
            <Route path="/login" element={<LoginPage />} />  {/* Página de login */}
            <Route path="/signup" element={<SignupPage />} />  {/* Página de cadastro */}
            <Route path="/servicos" element={<Services />} />
            <Route path="/rastreamento" element={<Tracking />} /> {/* Página com formulário de rastreamento */}
            <Route path="/tracking" element={<TrackingPage />} /> {/* Página de resultados do rastreamento */}
            <Route path="/frota" element={<Fleet />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/cotacao" element={<Quote />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
        <GoogleTranslate />
        <Toast />
      </div>
    </BrowserRouter>
  );
}

export default App;
