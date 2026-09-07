import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './lib/i18n';
import { StoreProvider } from './lib/store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toasts from './components/Toasts';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import Loyalty from './pages/Loyalty';
import Stores from './pages/Stores';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0 }), [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <BrowserRouter>
          <div className="min-h-screen jewel-bg text-[#fff7ec]">
            <ScrollTop />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/loyalty" element={<Loyalty />} />
                <Route path="/stores" element={<Stores />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
            <Toasts />
          </div>
        </BrowserRouter>
      </StoreProvider>
    </LanguageProvider>
  );
}
