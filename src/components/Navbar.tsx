import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Crown, Gem, Heart, Menu as MenuIcon, Search, ShoppingBag, User, X } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { useStore } from '../lib/store';
import { PRODUCTS } from '../lib/data';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className="relative grid place-items-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3b1163] via-[#2a0a4a] to-[#12041f] border border-[#e8b84a]/40 shadow-[0_0_25px_-5px_rgba(232,184,74,.6)]">
        <Gem className="w-6 h-6 text-[#f5d67b]" strokeWidth={1.8} />
        <span className="absolute -top-1 -end-1 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#c026d3] border border-white/40" />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-2xl font-black gold-text tracking-tight">جوهرة</span>
          <span className="block text-[10px] tracking-[.25em] uppercase text-white/60 -mt-0.5">Jawhara • Maroc</span>
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const { t, locale, setLocale, isAr } = useLang();
  const { cartCount, favs, user } = useStore();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', f);
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => setOpen(false), [loc.pathname]);

  const links = [
    { to: '/', k: 'nav.home' },
    { to: '/menu', k: 'nav.menu' },
    { to: '/loyalty', k: 'nav.loyalty' },
    { to: '/stores', k: 'nav.stores' },
    { to: '/orders', k: 'nav.orders' },
  ];

  const results = search.trim().length > 1
    ? PRODUCTS.filter(p =>
        p.nameAr.includes(search) || p.nameFr.toLowerCase().includes(search.toLowerCase()) ||
        p.shortAr.includes(search) || p.shortFr.toLowerCase().includes(search.toLowerCase())).slice(0, 5)
    : [];

  return (
    <>
      <div className="bg-gradient-to-l from-[#ff4d8d] via-[#e8b84a] to-[#ff4d8d] text-[#2a0a10] text-center text-[12px] sm:text-[13px] font-bold py-1.5 px-4">
        {t('mock.badge')} — JSON + localStorage
      </div>
      <header className={`sticky top-0 z-40 transition-all ${scrolled ? 'glass-strong shadow-[0_10px_40px_-10px_rgba(0,0,0,.7)]' : 'bg-[#12041f]/70 backdrop-blur-xl border-b border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 h-[72px]">
            <Logo />
            <nav className="hidden lg:flex items-center gap-1 text-[15px] font-bold">
              {links.map(l => (
                <NavLink key={l.to} to={l.to}
                  className={({ isActive }) => `px-4 py-2 rounded-full transition-all ${isActive ? 'bg-gradient-to-l from-[#ff4d8d]/20 to-[#e8b84a]/20 text-[#f5d67b] border border-[#e8b84a]/30' : 'text-white/75 hover:text-white hover:bg-white/5'}`}>
                  {t(l.k)}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowSearch(v => !v)} className="w-10 h-10 grid place-items-center rounded-full chip text-white/80 hover:text-[#f5d67b] transition" aria-label="search">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/favorites" className="relative w-10 h-10 hidden sm:grid place-items-center rounded-full chip text-white/80 hover:text-[#ff7ab8] transition" aria-label="favorites">
                <Heart className="w-5 h-5" />
                {favs.length > 0 && <span className="absolute -top-1 -end-1 min-w-5 h-5 px-1 rounded-full bg-[#ff4d8d] text-[11px] font-black grid place-items-center">{favs.length}</span>}
              </Link>
              <Link to="/cart" className="relative w-10 h-10 grid place-items-center rounded-full btn-gold font-black" aria-label="cart">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -end-1.5 min-w-5 h-5 px-1 rounded-full bg-[#2a0a4a] text-[#f5d67b] border border-[#e8b84a]/60 text-[11px] font-black grid place-items-center">{cartCount}</span>
                )}
              </Link>
              <button
                onClick={() => setLocale(locale === 'ar' ? 'fr' : 'ar')}
                className="h-10 px-3.5 rounded-full border border-[#e8b84a]/40 bg-white/5 hover:bg-[#e8b84a]/15 font-black text-sm text-[#f5d67b] transition flex items-center gap-1.5"
                title={t('nav.lang_label')}>
                <span className="text-base leading-none">{locale === 'ar' ? 'FR' : 'ع'}</span>
                <span className="hidden md:inline text-xs opacity-80">{t('nav.lang_label')}</span>
              </button>
              <Link to="/loyalty" className="hidden md:flex h-10 px-3 items-center gap-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white/85 hover:border-[#e8b84a]/40">
                <Crown className="w-4 h-4 text-[#e8b84a]" />
                {user ? `${user.points} ✨` : t('nav.login')}
              </Link>
              <button onClick={() => setOpen(v => !v)} className="lg:hidden w-10 h-10 grid place-items-center rounded-full chip" aria-label="menu">
                {open ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {showSearch && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="pb-4 relative">
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder={t('nav.search_ph')}
                    className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 px-5 text-[15px] placeholder:text-white/35" />
                  {results.length > 0 && (
                    <div className="absolute top-full inset-x-0 mt-1 glass-strong rounded-2xl overflow-hidden shadow-2xl z-50">
                      {results.map(p => (
                        <button key={p.id} onClick={() => { nav(`/product/${p.slug}`); setShowSearch(false); setSearch(''); }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-white/5 text-start">
                          <img src={p.image} alt="" className="w-11 h-11 rounded-xl object-cover" />
                          <span>
                            <span className="block font-bold text-sm">{isAr ? p.nameAr : p.nameFr}</span>
                            <span className="block text-xs text-[#f5d67b]">{p.price} {t('common.mad')}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-white/5">
              <div className="px-4 py-3 grid gap-1">
                {[...links, { to: '/favorites', k: 'nav.fav' }, { to: '/cart', k: 'cart.title' }].map(l => (
                  <NavLink key={l.to} to={l.to} className={({ isActive }) => `px-4 py-3 rounded-xl font-bold ${isActive ? 'bg-[#e8b84a]/15 text-[#f5d67b]' : 'text-white/80'}`}>
                    {t(l.k)}
                  </NavLink>
                ))}
                <div className="flex items-center gap-2 px-1 pt-2 text-sm text-white/60">
                  <User className="w-4 h-4" /> {user ? `${user.name} • ${user.points} ✨` : t('auth.title')}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
