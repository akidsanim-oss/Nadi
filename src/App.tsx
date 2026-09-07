import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { StoreProvider } from './lib/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Toasts from './components/Toasts';
import WhatsApp from './components/WhatsApp';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Compte from './pages/Compte';
import MonCompte from './pages/MonCompte';
import Panier from './pages/Panier';
import Commande from './pages/Commande';
import APropos from './pages/APropos';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="bg-jewel grain min-h-screen flex flex-col relative">
          <ScrollTop />
          <Header />
          <main className="flex-1 relative z-[2]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/compte" element={<Compte />} />
              <Route path="/mon-compte" element={<MonCompte />} />
              <Route path="/panier" element={<Panier />} />
              <Route path="/commande" element={<Commande />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <div className="relative z-[2]"><Footer /></div>
          <Toasts />
          <WhatsApp />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
