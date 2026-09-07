import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingBag, ShoppingBasket, Ticket, Trash2, Truck } from 'lucide-react';
import { FREE_DELIVERY_THRESHOLD } from '../lib/data';
import { useStore } from '../lib/store';

export default function Panier() {
  const { tr, isAr, cart, updateQty, removeItem, clearCart, subtotal, cartCount, city, coupon, setCoupon, toast, user } = useStore();
  const nav = useNavigate();

  const discount = coupon ? Math.min(coupon.amount, subtotal) : 0;
  const freeShip = subtotal - discount >= FREE_DELIVERY_THRESHOLD;
  const fee = cart.length === 0 ? 0 : freeShip ? 0 : city.fee;
  const total = Math.max(0, subtotal - discount + fee);
  const missing = Math.max(0, FREE_DELIVERY_THRESHOLD - (subtotal - discount));

  if (cart.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-24 h-24 mx-auto rounded-3xl glass-panel flex items-center justify-center mb-6">
          <ShoppingBasket size={42} className="text-[#ffd000]" />
        </motion.div>
        <h1 className="font-display font-black text-2xl">{tr('cart_empty')}</h1>
        <Link to="/menu" className="btn-shine inline-flex items-center gap-2 mt-6 px-8 py-4 rounded-2xl bg-gradient-to-l from-[#ff2a85] to-[#a4139e] font-black text-sm hover:scale-105 transition">
          {tr('cart_empty_cta')}<ArrowLeft size={16} className={isAr ? '' : 'rotate-180'} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="font-display font-black text-2xl sm:text-4xl flex items-center gap-2.5">
          <ShoppingBag size={28} className="text-[#ffd000]" />{tr('cart_title')}
          <span className="text-sm font-black px-3 py-1 rounded-full bg-[#ff2a85]/20 border border-[#ff2a85]/40 text-[#ff9ecf]" dir="ltr">{cartCount}</span>
        </h1>
        <button onClick={() => { clearCart(); toast(tr('cleared_toast'), 'pink'); }} className="text-[12px] font-black text-white/50 hover:text-[#ff5c8a] flex items-center gap-1 transition">
          <Trash2 size={14} />{tr('clear_cart')}
        </button>
      </div>

      {/* free shipping bar */}
      <div className="glass-panel rounded-2xl px-5 py-3.5 mb-5 flex items-center gap-3 text-[13px] font-black">
        <Truck size={18} className="text-[#ffd000] shrink-0" />
        {freeShip ? (
          <span className="text-emerald-300">{tr('free_delivery_ok')} 🎉</span>
        ) : (
          <span className="text-white/75">{tr('free_delivery_more')} <span className="text-[#ffd000]" dir="ltr">{missing} {tr('currency')}</span> {tr('free_delivery_more2')}</span>
        )}
        <div className="ms-auto w-32 h-2 rounded-full bg-white/10 overflow-hidden hidden sm:block">
          <div className="h-full rounded-full bg-gradient-to-l from-[#ff2a85] to-[#ffd000] transition-all" style={{ width: `${Math.min(100, ((subtotal - discount) / FREE_DELIVERY_THRESHOLD) * 100)}%` }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          {cart.map((it) => (
            <motion.div key={it.key} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-2xl p-3.5 flex gap-3.5">
              <img src={it.image} alt={it.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 border border-white/10" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-black text-sm leading-5">{isAr ? it.name : it.name_fr}</h3>
                  <button onClick={() => { removeItem(it.key); toast(tr('removed_toast'), 'pink'); }} className="text-white/35 hover:text-[#ff5c8a] transition shrink-0" aria-label="remove"><Trash2 size={16} /></button>
                </div>
                <div className="text-[11px] text-white/50 font-bold mt-0.5">{isAr ? it.size : it.size_fr}{it.extras.length ? ` · +${it.extras.join('، ')}` : ''}</div>
                <div className="flex items-center justify-between mt-2.5">
                  <div className="flex items-center gap-2.5 bg-black/30 rounded-xl px-1.5 py-1">
                    <button onClick={() => updateQty(it.key, -1)} className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#ff2a85] transition flex items-center justify-center" aria-label="dec"><Minus size={13} /></button>
                    <span className="font-black text-sm w-5 text-center" dir="ltr">{it.qty}</span>
                    <button onClick={() => updateQty(it.key, 1)} className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#ffd000] hover:text-black transition flex items-center justify-center" aria-label="inc"><Plus size={13} /></button>
                  </div>
                  <div className="font-display font-black text-lg text-[#ffd000]" dir="ltr">{it.unitPrice * it.qty} <span className="text-[11px]">{tr('currency')}</span></div>
                </div>
              </div>
            </motion.div>
          ))}
          <Link to="/menu" className="inline-flex items-center gap-1.5 text-[13px] font-black text-[#ff9ecf] hover:text-[#ffd000] transition mt-1">
            + {tr('continue_shop')}
          </Link>
        </div>

        <div className="glass-panel rounded-3xl p-6 h-fit lg:sticky lg:top-32 space-y-3">
          <h2 className="font-display font-black text-lg pb-3 border-b border-white/10">{tr('cart_summary')}</h2>
          {coupon && (
            <div className="flex items-center gap-2 text-[12px] font-black px-3.5 py-2.5 rounded-xl bg-emerald-500/12 border border-emerald-400/40 text-emerald-200">
              <Ticket size={15} />{isAr ? coupon.labelAr : coupon.labelFr} (−{coupon.amount})
              <button onClick={() => setCoupon(null)} className="ms-auto underline opacity-80">{tr('coupon_remove')}</button>
            </div>
          )}
          <div className="text-[13px] font-bold text-white/70 space-y-2">
            <div className="flex justify-between"><span>{tr('subtotal')}</span><span dir="ltr">{subtotal} {tr('currency')}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-300"><span>{tr('discount')}</span><span dir="ltr">−{discount} {tr('currency')}</span></div>}
            <div className="flex justify-between"><span>{tr('delivery_fee')} ({isAr ? city.ar : city.fr})</span><span dir="ltr">{fee === 0 ? tr('free') : `${fee} ${tr('currency')}`}</span></div>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-[#ffd000]/25">
            <span className="font-black text-sm">{tr('total_pay')}</span>
            <span className="font-display font-black text-2xl text-[#ffd000]" dir="ltr">{total} {tr('currency')}</span>
          </div>
          {!user && <p className="text-[11px] text-center text-white/45">✦ {tr('login_first')} (+2 pts / 10 {tr('currency')})</p>}
          <button onClick={() => nav('/commande')} className="btn-shine w-full py-4 rounded-2xl bg-gradient-to-l from-[#ff2a85] via-[#a4139e] to-[#e0a800] font-black text-[15px] hover:scale-[1.02] active:scale-[.99] transition shadow-[0_0_22px_rgba(255,42,133,.5)]">
            {tr('checkout_btn')}
          </button>
        </div>
      </div>
    </div>
  );
}
