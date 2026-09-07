import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Gem, Languages, MapPin, Menu, ShoppingBag, Sparkles, UserRound, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CITIES } from '../lib/data';
import { useStore } from '../lib/store';

export default function Header() {
  const { lang, isAr, tr, toggleLang, cartCount, user, cityFr, setCityFr, toast, t } = useStore();
  const [open, setOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [distOpen, setDistOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => { setOpen(false); }, [lang]);

  const links = [
    { to: '/', label: tr('nav_home') },
    { to: '/menu', label: tr('nav_menu') },
    { to: '/a-propos', label: tr('nav_about') },
    { to: '/contact', label: tr('nav_contact') },
  ];

  const activeQuartiers = CITIES.find((c) => c.fr === cityFr)?.quartiers ?? [];
  const cityLabel = CITIES.find((c) => c.fr === cityFr);

  return (
    <>
      {/* top ribbon */}
      <div className="relative z-40 bg-gradient-to-l from-[#3d0a5e] via-[#6b1182] to-[#3d0a5e] border-b border-[#ffd000]/25 text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin size={13} className="text-[#ffd000] shrink-0" />
            <span className="text-white/85 hidden sm:inline">{tr('deliver_to')}:</span>
            <button onClick={() => setCityOpen(true)} className="font-bold text-[#ffd000] hover:text-white transition truncate">
              {isAr ? cityLabel?.ar : cityLabel?.fr} · {cityLabel?.time}
            </button>
            <button
              onClick={() => setDistOpen(true)}
              className="hidden md:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/80 hover:border-[#ffd000]/50 transition"
            >
              {isAr ? 'اختر الحي' : 'Choisir quartier'}
            </button>
          </div>
          <div className="flex items-center gap-2 text-white/80 whitespace-nowrap">
            <Sparkles size={13} className="text-[#ffd000]" />
            <span>{tr('hero_note')}</span>
          </div>
        </div>
      </div>

      {/* main header */}
      <header className="sticky top-0 z-40">
        <div className="glass-panel border-x-0 border-t-0" style={{ background: 'rgba(20,2,34,.88)', borderBottomColor: 'rgba(255,208,0,.2)' }}>
          <div className="max-w-7xl mx-auto px-4 h-16 sm:h-[72px] flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <span className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#ff2a85] via-[#6b1182] to-[#ffd000] p-[2px] shadow-[0_0_22px_rgba(255,42,133,.5)]">
                <span className="w-full h-full rounded-2xl bg-[#18022b] flex items-center justify-center">
                  <Gem size={20} className="text-[#ffd000] group-hover:rotate-12 transition-transform" />
                </span>
              </span>
              <span className="leading-none">
                <span className="block font-display font-black text-2xl gem-text">جوهرة</span>
                <span className="block text-[9px] tracking-[.3em] text-[#ffd000]/90 font-bold mt-0.5">JAWHARA · MAROC</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 text-sm font-bold">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full transition ${isActive ? 'bg-gradient-to-l from-[#ff2a85] to-[#6b1182] text-white shadow-[0_0_18px_rgba(255,42,133,.45)]' : 'text-white/75 hover:text-[#ffd000] hover:bg-white/5'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {user && (
                <button
                  onClick={() => nav('/mon-compte')}
                  className="hidden sm:flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-full bg-[#ffd000]/15 border border-[#ffd000]/40 text-[#ffd000] hover:bg-[#ffd000] hover:text-[#280645] transition"
                >
                  <Sparkles size={12} />
                  {user.points} {tr('loyalty_pts')}
                </button>
              )}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 text-xs font-black px-3 py-2 rounded-full glass-soft text-white hover:border-[#ffd000]/60 hover:text-[#ffd000] transition"
                aria-label="language"
              >
                <Languages size={14} />
                {isAr ? 'FR' : 'عربية'}
              </button>
              <button
                onClick={() => nav(user ? '/mon-compte' : '/compte')}
                className="hidden sm:flex w-10 h-10 rounded-full glass-soft items-center justify-center text-white/85 hover:text-[#ffd000] hover:border-[#ffd000]/60 transition"
                aria-label="account"
              >
                <UserRound size={18} />
              </button>
              <button
                onClick={() => nav('/panier')}
                className="relative flex items-center gap-1.5 h-10 px-3 sm:px-4 rounded-full bg-gradient-to-l from-[#ff2a85] to-[#a4139e] font-black text-sm text-white shadow-[0_0_20px_rgba(255,42,133,.5)] hover:scale-105 active:scale-95 transition"
              >
                <ShoppingBag size={17} />
                <span className="hidden sm:inline">{tr('cart')}</span>
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.4 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -end-1.5 min-w-5 h-5 px-1 rounded-full bg-[#ffd000] text-[#280645] text-[11px] font-black flex items-center justify-center gold-ring"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden w-10 h-10 rounded-full glass-soft flex items-center justify-center text-white"
                aria-label="menu"
              >
                {open ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden border-t border-white/10"
              >
                <div className="px-4 py-3 flex flex-col gap-1 text-sm font-bold">
                  {links.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) => `px-4 py-3 rounded-2xl transition ${isActive ? 'bg-gradient-to-l from-[#ff2a85]/30 to-[#ffd000]/15 text-[#ffd000]' : 'text-white/80 hover:bg-white/5'}`}
                    >
                      {l.label}
                    </NavLink>
                  ))}
                  <NavLink
                    to={user ? '/mon-compte' : '/compte'}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-2xl text-white/80 hover:bg-white/5"
                  >
                    {user ? tr('nav_account') : tr('nav_login')}
                  </NavLink>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* city modal */}
      <AnimatePresence>
        {cityOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setCityOpen(false)}>
            <motion.div
              initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-3xl p-6 w-full max-w-md"
            >
              <h3 className="font-display font-black text-xl mb-1">{isAr ? 'اختر مدينة التوصيل' : 'Choisissez votre ville'}</h3>
              <p className="text-xs text-white/60 mb-4">{isAr ? 'رسوم ووقت التوصيل يختلفان حسب المدينة' : 'Frais et délais selon la ville'}</p>
              <div className="grid gap-2 max-h-[50vh] overflow-auto">
                {CITIES.map((c) => (
                  <button
                    key={c.fr}
                    onClick={() => { setCityFr(c.fr); setCityOpen(false); toast(isAr ? `التوصيل إلى ${c.ar} — ${c.fee} د.م.` : `Livraison vers ${c.fr} — ${c.fee} DH`, 'green'); }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-sm font-bold transition ${cityFr === c.fr ? 'border-[#ffd000] bg-[#ffd000]/10 text-[#ffd000]' : 'border-white/10 bg-white/5 text-white/85 hover:border-[#ffd000]/40'}`}
                  >
                    <span className="flex items-center gap-2"><MapPin size={15} />{t(c.ar, c.fr)}</span>
                    <span className="text-[11px] opacity-80">{c.fee} {isAr ? 'د.م.' : 'DH'} · {c.time}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {distOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setDistOpen(false)}>
            <motion.div
              initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-3xl p-6 w-full max-w-md"
            >
              <h3 className="font-display font-black text-xl mb-1">{isAr ? `أحياء ${cityLabel?.ar}` : `Quartiers — ${cityLabel?.fr}`}</h3>
              <p className="text-xs text-white/60 mb-4">{isAr ? 'اختر حيّك وسنحفظه لطلبك' : 'Choisissez votre quartier pour la commande'}</p>
              <div className="flex flex-wrap gap-2">
                {activeQuartiers.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setDistOpen(false); nav('/commande'); toast(t(q, q), 'pink'); }}
                    className="px-4 py-2 rounded-full bg-white/8 border border-white/15 text-xs font-bold text-white/85 hover:border-[#ffd000] hover:text-[#ffd000] transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
