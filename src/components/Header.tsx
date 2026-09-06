import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useI18n, LANGS } from '../lib/i18n';
import { useCart } from '../lib/cart';

const star = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
    <path
      d="M12 2 L14.4 8.6 L21.5 8.9 L15.9 13.2 L17.9 20 L12 16 L6.1 20 L8.1 13.2 L2.5 8.9 L9.6 8.6 Z"
      fill="#006233"
      stroke="#d4a24c"
      strokeWidth="0.8"
    />
  </svg>
);

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { to: '/collection/official', label: t('nav.official') },
    { to: '/collection/players', label: t('nav.players') },
    { to: '/collection/training', label: t('nav.training') },
    { to: '/collection/lifestyle', label: t('nav.lifestyle') },
  ];

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-palm text-sand text-center text-[11px] sm:text-xs font-medium tracking-wide py-2 px-3">
        {t('ship.banner')} · <span className="text-gold">{t('ship.free')}</span>
      </div>

      <header className="sticky top-0 z-40 bg-night/90 backdrop-blur-md border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            {star}
            <span className="font-display text-xl sm:text-2xl tracking-wide text-sand group-hover:text-gold transition-colors">
              ATLAS<span className="text-crimson"> ELEVEN</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `font-cond uppercase text-sm tracking-widest transition-colors ${
                    isActive ? 'text-gold' : 'text-sand/80 hover:text-gold'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language switcher */}
            <div className="flex items-center gap-1 rounded-full border border-line bg-coal px-2 py-1">
              <Globe className="h-3.5 w-3.5 text-smoke" />
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                    lang === l.code ? 'bg-crimson text-sand' : 'text-smoke hover:text-sand'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Cart */}
            <button
              onClick={openCart}
              aria-label={t('nav.cart')}
              className="relative p-2 rounded-full hover:bg-panel transition-colors cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5 text-sand" />
              {count > 0 && (
                <span className="absolute -top-0.5 -end-0.5 h-5 min-w-5 px-1 rounded-full bg-crimson text-sand text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-full hover:bg-panel transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-line bg-coal px-4 py-3 flex flex-col gap-1">
            {[{ to: '/', label: t('nav.home') }, ...nav].map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `py-2.5 px-2 rounded-lg font-cond uppercase tracking-widest text-sm ${
                    isActive ? 'text-gold bg-panel' : 'text-sand/80'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
