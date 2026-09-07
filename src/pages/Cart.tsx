import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2, Truck, X } from 'lucide-react';
import { CITIES, PROMOS, priceOf, productById } from '../lib/data';
import { mad, useLang } from '../lib/i18n';
import { useStore } from '../lib/store';

const FREE_DELIVERY = 120;

export default function Cart() {
  const { t, locale, isAr } = useLang();
  const { cart, updateQty, removeItem, clearCart, subtotal, promo, setPromo, promoPct, pushToast } = useStore();
  const navigate = useNavigate();
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const discount = Math.round((subtotal * promoPct) / 100);
  const delivery = subtotal === 0 ? 0 : subtotal - discount >= FREE_DELIVERY ? 0 : 15;
  const total = subtotal - discount + delivery;
  const missing = Math.max(0, FREE_DELIVERY - (subtotal - discount));
  const promoValid = promo ? !!PROMOS[promo.toUpperCase()] : true;

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-16 pb-10 text-center">
        <div className="mx-auto w-24 h-24 grid place-items-center rounded-full glass"><ShoppingBag className="w-10 h-10 text-[#e8b84a]" /></div>
        <h1 className="mt-6 text-3xl font-black">{t('cart.empty')}</h1>
        <Link to="/menu" className="btn-gold mt-6 inline-flex h-13 py-3.5 px-8 rounded-full font-black">{t('cart.empty_cta')}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl sm:text-4xl font-black"><span className="gold-text">{t('cart.title')}</span> <span className="text-lg text-white/40">({cart.length})</span></h1>
        <button onClick={() => { clearCart(); pushToast(t('toast.cleared')); }} className="text-xs font-bold text-white/45 hover:text-red-400 flex items-center gap-1.5">
          <Trash2 className="w-4 h-4" /> {t('cart.clear')}
        </button>
      </div>

      {missing > 0 ? (
        <div className="mt-5 glass rounded-2xl p-4">
          <p className="text-sm font-bold text-white/75 flex items-center gap-2"><Truck className="w-4 h-4 text-[#e8b84a]" /> {t('cart.freedel')} <span className="text-[#f5d67b]">{mad(missing, locale)}</span> {t('cart.freedel2')}</p>
          <div className="mt-2.5 h-2.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-l from-[#ff4d8d] to-[#e8b84a] transition-all" style={{ width: `${Math.min(100, ((subtotal - discount) / FREE_DELIVERY) * 100)}%` }} />
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-bold text-sm p-4 flex items-center gap-2">
          <Truck className="w-4 h-4" /> {t('cart.delivery')}: {t('cart.free')} ✦
        </div>
      )}

      <div className="mt-6 grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        <div className="space-y-4">
          {cart.map(item => {
            const p = productById(item.productId);
            if (!p) return null;
            const unit = priceOf(p, item.sizeId, item.extrasIds);
            const size = p.sizes.find(s => s.id === item.sizeId);
            const exNames = p.extras.filter(e => item.extrasIds.includes(e.id)).map(e => (isAr ? e.labelAr : e.labelFr));
            return (
              <motion.div key={item.key} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="glass rounded-[24px] p-4 flex gap-4">
                <Link to={`/product/${p.slug}`}><img src={p.image} alt="" className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0" /></Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/product/${p.slug}`} className="font-black leading-6 hover:text-[#f5d67b]">{isAr ? p.nameAr : p.nameFr}</Link>
                    <button onClick={() => removeItem(item.key)} className="text-white/35 hover:text-red-400 shrink-0"><X className="w-4.5 h-4.5 w-5 h-5" /></button>
                  </div>
                  <div className="mt-1 text-xs text-white/50 font-bold">{isAr ? size?.labelAr : size?.labelFr}{exNames.length > 0 && ` • ${exNames.join('، ')}`}</div>
                  {item.note && <div className="mt-1 text-[11px] text-[#f5d67b]/80">“{item.note}”</div>}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                      <button onClick={() => updateQty(item.key, item.qty - 1)} className="w-8 h-8 grid place-items-center rounded-full hover:bg-white/10"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="w-7 text-center font-black">{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} className="w-8 h-8 grid place-items-center rounded-full hover:bg-white/10"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="font-black text-[#f5d67b]">{mad(unit * item.qty, locale)}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <button onClick={() => navigate('/menu')} className="text-sm font-bold text-white/55 hover:text-[#f5d67b]">{t('cart.continue')} ←</button>
        </div>

        <div className="glass-strong rounded-[28px] p-6 lg:sticky lg:top-24">
          <div className="flex gap-2">
            <label className="relative flex-1">
              <Tag className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-white/35" />
              <input value={promo} onChange={e => setPromo(e.target.value.toUpperCase())} placeholder={t('cart.promo_ph')}
                className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 ps-10 pe-3 text-sm font-bold placeholder:font-normal placeholder:text-white/30 uppercase" />
            </label>
          </div>
          {promo && (
            <p className={`mt-2 text-xs font-bold ${promoValid ? 'text-emerald-300' : 'text-red-400'}`}>
              {promoValid ? `✦ ${t('cart.promo_ok')} −${promoPct}%` : t('cart.promo_bad')}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {Object.keys(PROMOS).map(c => (
              <button key={c} onClick={() => setPromo(c)} className="text-[11px] font-black chip rounded-full px-3 py-1.5 text-[#f5d67b] hover:border-[#e8b84a]/60">{c}</button>
            ))}
          </div>
          <div className="mt-5 space-y-2.5 text-sm font-bold">
            <div className="flex justify-between text-white/65"><span>{t('cart.total')}</span><span>{mad(subtotal, locale)}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-300"><span>{t('cart.discount')} ({promo} −{promoPct}%)</span><span>−{mad(discount, locale)}</span></div>}
            <div className="flex justify-between text-white/65"><span>{t('cart.delivery')}</span><span>{delivery === 0 ? t('cart.free') : mad(delivery, locale)}</span></div>
            <div className="dotted-line my-1" />
            <div className="flex justify-between text-lg font-black"><span>{t('cart.grand')}</span><span className="gold-text text-2xl">{mad(total, locale)}</span></div>
          </div>
          <button onClick={() => navigate('/checkout')} className="btn-gold mt-5 w-full h-14 rounded-full font-black text-[16px] flex items-center justify-center gap-2">
            {t('cart.checkout')} <Arrow className="w-5 h-5" />
          </button>
          <p className="mt-3 text-center text-[11px] text-white/40">{CITIES.slice(0, 4).map(c => (isAr ? c.ar : c.fr)).join(' • ')}…</p>
        </div>
      </div>
    </div>
  );
}
