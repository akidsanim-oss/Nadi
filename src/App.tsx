import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { I18nProvider } from './lib/i18n';
import { CartProvider } from './lib/cart';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <I18nProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-night">
            <Header />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection/:slug" element={<Collection />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
            <Footer />
            <CartDrawer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </I18nProvider>
  );
}
