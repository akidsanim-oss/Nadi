import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Clock, Flame, Heart, Minus, Plus, ShoppingBag, StickyNote } from 'lucide-react';
import { PRODUCTS, priceOf } from '../lib/data';
import { mad, useLang } from '../lib/i18n';
import { useStore } from '../lib/store';
import ProductCard, { Stars } from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const { t, locale, isAr } = useLang();
  const { addToCart, pushToast, favs, toggleFav } = useStore();
  const navigate = useNavigate();
  const p = PRODUCTS.find(x => x.slug === slug) ?? PRODUCTS[0];
  const Arrow = isAr ? ArrowRight : ArrowLeft;

  const [sizeId, setSizeId] = useState('classic');
  const [extras, setExtras] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState('');

  const unit = priceOf(p, sizeId, extras);
  const isFav = favs.includes(p.id);
  const related = useMemo(() => PRODUCTS.filter(x => x.id !== p.id && (x.category === p.category || x.tags.some(tg => p.tags.includes(tg)))).slice(0, 4), [p]);
  const ingredients = isAr ? p.ingredientsAr : p.ingredientsFr;

  const toggleEx = (id: string) => setExtras(prev => (prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]));

  const submit = () => {
    addToCart({ productId: p.id, sizeId, extrasIds: extras, qty, note: note.trim() || undefined });
    pushToast(t('prod.added'));
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-[#f5d67b]">
        <Arrow className="w-4 h-4" /> {t('prod.back')}
      </button>

      <div className="mt-5 grid lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="relative">
          <div className="absolute -inset-3 rounded-[40px] opacity-50 blur-2xl" style={{ background: `radial-gradient(60% 60% at 50% 40%, ${p.glow}, transparent)` }} />
          <div className="relative rounded-[36px] overflow-hidden border border-[#e8b84a]/30">
            <img src={p.image} alt={isAr ? p.nameAr : p.nameFr} className="w-full h-[380px] sm:h-[480px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12041f]/70 via-transparent to-transparent" />
            {(isAr ? p.badgeAr : p.badgeFr) && (
              <span className="absolute top-4 start-4 text-xs font-black px-4 py-2 rounded-full bg-gradient-to-l from-[#ff4d8d] to-[#c026d3] shadow-xl">
                {isAr ? p.badgeAr : p.badgeFr}
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { v: `${p.kcal}`, l: t('prod.kcal'), ic: Flame },
              { v: `${p.prepMin}`, l: t('prod.min'), ic: Clock },
              { v: `${p.rating.toFixed(1)}`, l: t('prod.reviews'), ic: null },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-3 text-center">
                <div className="font-black text-lg text-[#f5d67b] flex items-center justify-center gap-1.5">
                  {s.ic && <s.ic className="w-4 h-4" />}{s.v}
                </div>
                <div className="text-[11px] text-white/50 font-bold mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>
          <div className="flex items-center gap-2 text-sm text-white/55">
            <Stars rating={p.rating} size={16} />
            <span className="font-black text-white">{p.rating.toFixed(1)}</span>
            <span>• {p.reviewsCount} {t('prod.reviews')}</span>
          </div>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black leading-tight">{isAr ? p.nameAr : p.nameFr}</h1>
          <p className="mt-2 text-[#f5d67b] font-bold">{isAr ? p.shortAr : p.shortFr}</p>
          <p className="mt-4 text-white/65 leading-8">{isAr ? p.descAr : p.descFr}</p>

          <div className="mt-5">
            <h3 className="font-black text-sm text-white/80 mb-2.5">{t('prod.ingredients')}</h3>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((g, i) => (
                <span key={i} className="chip rounded-full px-3.5 py-1.5 text-xs font-bold text-white/75 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> {g}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-black mb-3">{t('prod.size')}</h3>
            <div className="grid grid-cols-3 gap-2.5">
              {p.sizes.map(s => (
                <button key={s.id} onClick={() => setSizeId(s.id)}
                  className={`rounded-2xl border p-3 text-center transition ${sizeId === s.id ? 'border-[#e8b84a] bg-[#e8b84a]/10 shadow-[0_0_20px_-5px_rgba(232,184,74,.5)]' : 'chip hover:border-white/30'}`}>
                  <span className="block font-black text-sm">{isAr ? s.labelAr : s.labelFr}</span>
                  <span className="block text-xs mt-1 text-[#f5d67b] font-bold">{s.delta === 0 ? (isAr ? 'السعر الأساسي' : 'Prix de base') : `+${mad(s.delta, locale)}`}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-black mb-3">{t('prod.extras')}</h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {p.extras.map(e => {
                const on = extras.includes(e.id);
                return (
                  <button key={e.id} onClick={() => toggleEx(e.id)}
                    className={`rounded-2xl border p-3.5 flex items-center justify-between gap-2 transition text-start ${on ? 'border-[#ff4d8d] bg-[#ff4d8d]/10' : 'chip hover:border-white/30'}`}>
                    <span className="font-bold text-sm">{isAr ? e.labelAr : e.labelFr}</span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-black text-[#f5d67b]">+{mad(e.price, locale)}</span>
                      <span className={`w-6 h-6 grid place-items-center rounded-full border ${on ? 'bg-[#ff4d8d] border-[#ff4d8d]' : 'border-white/25'}`}>
                        {on && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <label className="mt-6 relative block">
            <StickyNote className="absolute top-3.5 start-4 w-4 h-4 text-white/35" />
            <input value={note} onChange={e => setNote(e.target.value)} placeholder={t('prod.note_ph')}
              className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 ps-11 pe-4 text-sm placeholder:text-white/35" />
          </label>

          <div className="mt-6 glass-strong rounded-3xl p-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white/60">{t('prod.qty')}</span>
              <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/10"><Minus className="w-4 h-4" /></button>
                <span className="w-8 text-center font-black text-lg">{qty}</span>
                <button onClick={() => setQty(q => Math.min(9, q + 1))} className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/10"><Plus className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="ms-auto text-end">
              <div className="text-[11px] text-white/45">{t('cart.grand')}</div>
              <div className="text-2xl font-black gold-text">{mad(unit * qty, locale)}</div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={() => { const a = toggleFav(p.id); pushToast(a ? t('toast.fav_add') : t('toast.fav_rm')); }}
                className={`w-13 h-13 p-3.5 grid place-items-center rounded-full border transition shrink-0 ${isFav ? 'bg-[#ff4d8d] border-[#ff4d8d]' : 'chip'}`}>
                <Heart className={`w-5 h-5 ${isFav ? 'fill-white text-white' : ''}`} />
              </button>
              <button onClick={submit} className="btn-gold flex-1 sm:flex-none h-13 py-3.5 px-8 rounded-full font-black inline-flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" /> {t('prod.add')} • {mad(unit * qty, locale)}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl sm:text-3xl font-black">{t('prod.related')}</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((r, i) => <ProductCard key={r.id} p={r} index={i} />)}
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/menu" className="inline-flex h-12 px-6 items-center gap-2 rounded-full border border-[#e8b84a]/40 font-black text-sm text-[#f5d67b]">{t('common.more')}</Link>
      </div>
    </div>
  );
}
