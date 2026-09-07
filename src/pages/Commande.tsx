import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Banknote, CheckCircle2, Clock, CreditCard, MapPin, PartyPopper, Phone, Ticket, UserRound } from 'lucide-react';
import { CITIES, FREE_DELIVERY_THRESHOLD } from '../lib/data';
import type { Order } from '../lib/types';
import { useStore } from '../lib/store';

export default function Commande() {
  const { tr, isAr, cart, subtotal, cityFr, setCityFr, city, coupon, user, placeOrder, toast, t } = useStore();
  const nav = useNavigate();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [district, setDistrict] = useState(user?.quartier ?? '');
  const [address, setAddress] = useState(user?.address ?? '');
  const [notes, setNotes] = useState('');
  const [done, setDone] = useState<Order | null>(null);

  const discount = coupon ? Math.min(coupon.amount, subtotal) : 0;
  const fee = cart.length === 0 ? 0 : subtotal - discount >= FREE_DELIVERY_THRESHOLD ? 0 : city.fee;
  const total = Math.max(0, subtotal - discount + fee);
  const earned = Math.floor(total / 10) * 2;

  const quartiers = useMemo(() => CITIES.find((c) => c.fr === cityFr)?.quartiers ?? [], [cityFr]);
  const input = 'w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/15 text-sm font-bold outline-none focus:border-[#ffd000] transition placeholder:text-white/30 placeholder:font-medium';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast(tr('co_err_name'), 'pink');
    if (!/^(0\d{9}|\+212\d{9})$/.test(phone.replace(/[\s-]/g, ''))) return toast(tr('co_err_phone'), 'pink');
    if (!district.trim() || !address.trim()) return toast(tr('co_err_addr'), 'pink');
    const order = placeOrder({ name, phone, cityFr, district, address, notes }, fee, discount);
    setDone(order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-14 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }} className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,.6)] mb-6">
          <CheckCircle2 size={48} className="text-white" />
        </motion.div>
        <h1 className="font-display font-black text-2xl sm:text-3xl">{tr('order_ok_title')} 🎉</h1>
        <p className="text-sm text-white/60 mt-2">{tr('order_ok_sub')}</p>
        <div className="glass-panel rounded-3xl p-6 mt-7 space-y-3 text-sm font-bold">
          <div className="flex justify-between"><span className="text-white/60">{tr('order_number')}</span><span className="text-[#ffd000]" dir="ltr">{done.id}</span></div>
          <div className="flex justify-between"><span className="text-white/60">{tr('total_pay')}</span><span dir="ltr">{done.total} {tr('currency')}</span></div>
          <div className="flex justify-between"><span className="text-white/60">{tr('points_won')}</span><span className="text-[#ff9ecf]" dir="ltr">+{done.earnedPoints} pts</span></div>
          <div className="flex justify-between"><span className="text-white/60">{tr('co_eta')}</span><span>{city.time}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Link to="/" className="py-3.5 rounded-2xl glass-soft font-black text-sm hover:border-[#ffd000]/60 transition">{tr('back_home')}</Link>
          <Link to="/mon-compte" className="py-3.5 rounded-2xl bg-[#ffd000] text-[#280645] font-black text-sm hover:bg-white transition">{tr('track_orders')}</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <PartyPopper size={44} className="mx-auto text-[#ffd000]" />
        <h1 className="font-display font-black text-2xl mt-4">{tr('co_empty')}</h1>
        <Link to="/menu" className="inline-block mt-6 px-8 py-3.5 rounded-2xl bg-gradient-to-l from-[#ff2a85] to-[#a4139e] font-black text-sm">{tr('co_go_menu')}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="font-display font-black text-2xl sm:text-4xl text-center mb-8">{tr('co_title')}</h1>
      <form onSubmit={submit} className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 glass-panel rounded-3xl p-5 sm:p-7 space-y-4">
          <h2 className="font-black text-[#ffd000] flex items-center gap-2"><MapPin size={17} />{tr('co_info')}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block"><span className="text-xs font-black text-white/70 flex items-center gap-1.5 mb-1.5"><UserRound size={12} />{tr('co_name')}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={tr('co_name_ph')} className={input} /></label>
            <label className="block"><span className="text-xs font-black text-white/70 flex items-center gap-1.5 mb-1.5"><Phone size={12} />{tr('co_phone')}</span>
              <input dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 XX XX XX XX" className={input} /></label>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block"><span className="text-xs font-black text-white/70 mb-1.5 block">{tr('co_city')}</span>
              <select value={cityFr} onChange={(e) => setCityFr(e.target.value)} className={`${input} cursor-pointer`}>
                {CITIES.map((c) => <option key={c.fr} value={c.fr}>{isAr ? c.ar : c.fr} — {c.fee} {tr('currency')}</option>)}
              </select></label>
            <label className="block"><span className="text-xs font-black text-white/70 mb-1.5 block">{tr('co_district')}</span>
              <input value={district} onChange={(e) => setDistrict(e.target.value)} list="dl-q" placeholder={tr('co_district_ph')} className={input} />
              <datalist id="dl-q">{quartiers.map((q) => <option key={q} value={q} />)}</datalist></label>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quartiers.slice(0, 6).map((q) => (
              <button type="button" key={q} onClick={() => setDistrict(q)} className={`text-[11px] font-black px-3 py-1.5 rounded-full border transition ${district === q ? 'border-[#ffd000] text-[#ffd000] bg-[#ffd000]/10' : 'border-white/15 text-white/60 hover:border-[#ffd000]/50'}`}>{t(q, q)}</button>
            ))}
          </div>
          <label className="block"><span className="text-xs font-black text-white/70 mb-1.5 block">{tr('co_address')}</span>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder={tr('co_address_ph')} className={input} /></label>
          <label className="block"><span className="text-xs font-black text-white/70 mb-1.5 block">{tr('co_notes')}</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder={tr('co_notes_ph')} className={`${input} resize-none`} /></label>

          <h2 className="font-black text-[#ffd000] pt-4 border-t border-white/10 flex items-center gap-2"><Banknote size={17} />{tr('co_pay')}</h2>
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <label className="flex items-center gap-2.5 p-3.5 rounded-2xl border border-[#ffd000]/60 bg-[#ffd000]/10 cursor-pointer font-black">
              <input type="radio" name="pay" defaultChecked className="accent-[#ff2a85] w-4 h-4" /><Banknote size={17} className="text-[#ffd000]" />{tr('co_cod')}
            </label>
            <label className="flex items-center gap-2.5 p-3.5 rounded-2xl border border-white/10 opacity-50 cursor-not-allowed font-black">
              <input type="radio" name="pay" disabled className="accent-[#ff2a85] w-4 h-4" /><CreditCard size={17} />{tr('co_card')}
            </label>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 h-fit md:sticky md:top-32 space-y-3">
          <h3 className="font-display font-black pb-3 border-b border-white/10">{tr('total_pay')}</h3>
          <div className="text-[13px] font-bold text-white/70 space-y-2 max-h-44 overflow-auto no-scrollbar">
            {cart.map((it) => (
              <div key={it.key} className="flex justify-between gap-2"><span className="truncate">{isAr ? it.name : it.name_fr} <span className="text-white/40" dir="ltr">×{it.qty}</span></span><span dir="ltr" className="shrink-0">{it.unitPrice * it.qty}</span></div>
            ))}
          </div>
          <div className="text-[13px] font-bold text-white/70 space-y-2 pt-2 border-t border-white/10">
            <div className="flex justify-between"><span>{tr('subtotal')}</span><span dir="ltr">{subtotal} {tr('currency')}</span></div>
            {coupon && <div className="flex justify-between text-emerald-300"><span className="flex items-center gap-1"><Ticket size={13} />{tr('discount')}</span><span dir="ltr">−{discount}</span></div>}
            <div className="flex justify-between"><span>{tr('delivery_fee')}</span><span dir="ltr">{fee === 0 ? tr('free') : `${fee} ${tr('currency')}`}</span></div>
            <div className="flex justify-between text-[12px] text-white/50"><span className="flex items-center gap-1"><Clock size={12} />{tr('co_eta')}</span><span>{city.time}</span></div>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-[#ffd000]/25">
            <span className="font-black text-sm">{tr('total_pay')}</span>
            <AnimatePresence mode="popLayout">
              <motion.span key={total} initial={{ scale: 1.25, color: '#ffe57f' }} animate={{ scale: 1, color: '#ffd000' }} className="font-display font-black text-2xl" dir="ltr">{total} {tr('currency')}</motion.span>
            </AnimatePresence>
          </div>
          {!user && <p className="text-[11px] text-center text-white/45">✦ {tr('login_first')}</p>}
          {user && <p className="text-[11px] text-center font-black text-[#ff9ecf]" dir="ltr">+{earned} pts 🎁</p>}
          <button className="btn-shine w-full py-4 rounded-2xl bg-gradient-to-l from-[#ff2a85] via-[#a4139e] to-[#e0a800] font-black text-[15px] hover:scale-[1.02] transition shadow-[0_0_22px_rgba(255,42,133,.5)]">
            {tr('co_place')} · <span dir="ltr">{total} {tr('currency')}</span>
          </button>
          <button type="button" onClick={() => nav('/panier')} className="w-full py-2.5 text-[12px] font-black text-white/50 hover:text-white transition">{tr('cart_title')} ←</button>
        </div>
      </form>
    </div>
  );
}
