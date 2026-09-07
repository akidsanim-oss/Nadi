import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, Banknote, Check, ChevronLeft, ChevronRight, Crown, MapPin, PartyPopper, Phone, Smartphone, User, Wallet } from 'lucide-react';
import { CITIES, priceOf, productById } from '../lib/data';
import { mad, useLang } from '../lib/i18n';
import { useStore } from '../lib/store';
import type { Order } from '../lib/types';

const FREE = 120;

export default function Checkout() {
  const { t, locale, isAr } = useLang();
  const { cart, subtotal, promo, promoPct, user, setUser, placeOrder, pushToast } = useStore();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<Order | null>(null);
  const [usePoints, setUsePoints] = useState(false);

  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [city, setCity] = useState(user?.city ?? CITIES[0].ar);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [pay, setPay] = useState<'cod' | 'card' | 'mobile'>('cod');

  const discount = Math.round((subtotal * promoPct) / 100);
  const cityEntry = CITIES.find(c => c.ar === city || c.fr === city);
  const cityFee = cityEntry?.fee ?? 15;
  const delivery = subtotal === 0 ? 0 : subtotal - discount >= FREE ? 0 : cityFee;
  const ptsValue = usePoints && user ? Math.min(user.points, Math.floor((subtotal - discount + delivery) / 2)) : 0;
  const total = Math.max(0, subtotal - discount + delivery - ptsValue);

  const phoneOk = /^0[67]\d{8}$/.test(phone.replace(/[\s-]/g, ''));
  const stepOk = [name.trim().length >= 3 && phoneOk, address.trim().length >= 6, true][step];

  if (cart.length === 0 && !done) {
    return (
      <div className="max-w-xl mx-auto px-4 pt-16 text-center">
        <h1 className="text-3xl font-black">{t('cart.empty')}</h1>
        <Link to="/menu" className="btn-gold mt-6 inline-flex px-8 py-3.5 rounded-full font-black">{t('cart.empty_cta')}</Link>
      </div>
    );
  }

  const confirm = () => {
    const items = cart.map(c => {
      const p = productById(c.productId)!;
      return { ...c, nameAr: p.nameAr, nameFr: p.nameFr, unitPrice: priceOf(p, c.sizeId, c.extrasIds), image: p.image };
    });
    const o = placeOrder({ items, subtotal, delivery, discount: discount + ptsValue, total, name, phone, city, address, payment: pay, notes });
    if (usePoints && user && ptsValue > 0) {
      const bal = user.points - ptsValue + o.pointsEarned;
      setUser({ ...user, name: name || user.name, phone: phone || user.phone, city, points: bal });
      pushToast(`−${ptsValue} ✨ | +${o.pointsEarned} ✨`);
    } else if (user) {
      setUser({ ...user, name: name || user.name, phone: phone || user.phone, city, points: user.points + o.pointsEarned });
    } else if (name && phoneOk) {
      setUser({ name, phone, city, points: o.pointsEarned });
    }
    setDone(o);
    window.scrollTo({ top: 0 });
  };

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-12 text-center">
        <motion.div initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}
          className="mx-auto w-24 h-24 grid place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-[0_0_60px_-10px_rgba(52,211,153,.7)]">
          <PartyPopper className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="mt-6 text-3xl sm:text-4xl font-black">{t('co.success_t')}</h1>
        <p className="mt-2 text-white/55">{t('co.success_d')}</p>
        <div className="mt-6 glass-strong rounded-3xl p-6 text-start">
          <div className="flex items-center justify-between">
            <span className="font-black text-lg" dir="ltr">{done.code}</span>
            <span className="chip rounded-full px-3 py-1 text-xs font-black text-[#f5d67b]">{t('ord.status_pending')}</span>
          </div>
          <div className="dotted-line my-4" />
          <div className="space-y-2 text-sm font-bold text-white/70">
            <div className="flex justify-between"><span>{done.items.reduce((a, i) => a + i.qty, 0)} × {isAr ? 'مشروب' : 'boissons'}</span><span className="gold-text text-lg">{mad(done.total, locale)}</span></div>
            <div className="flex justify-between"><span>{isAr ? 'نقاط مكتسبة' : 'Points gagnés'}</span><span className="text-[#f5d67b]">+{done.pointsEarned} ✨</span></div>
            <div className="flex justify-between gap-4"><span className="shrink-0">{t('co.address')}</span><span className="text-end">{done.address} — {done.city}</span></div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/orders" className="btn-gold px-8 py-3.5 rounded-full font-black">{t('co.track')}</Link>
          <Link to="/" className="px-8 py-3.5 rounded-full font-black border border-white/20">{t('co.home')}</Link>
        </div>
      </div>
    );
  }

  const steps = [t('co.step1'), t('co.step2'), t('co.step3')];
  const Next = isAr ? ChevronLeft : ChevronRight;
  const Back = isAr ? ChevronRight : ChevronLeft;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
      <h1 className="text-3xl sm:text-4xl font-black text-center"><span className="gold-text">{t('co.title')}</span></h1>
      <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black border ${i <= step ? 'border-[#e8b84a] bg-[#e8b84a]/10 text-[#f5d67b]' : 'chip text-white/45'}`}>
              <span className={`w-6 h-6 grid place-items-center rounded-full ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-[#e8b84a] text-[#2a0a10]' : 'bg-white/10'}`}>
                {i < step ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
              </span>
              {s}
            </div>
            {i < steps.length - 1 && <span className="w-6 h-px bg-white/15" />}
          </div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-[1fr_340px] gap-6 items-start">
        <div className="glass rounded-[28px] p-6 sm:p-8 min-h-[380px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: isAr ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <Field icon={User} label={t('co.name')} value={name} set={setName} ph={isAr ? 'مثال: سلمى بنعيسى' : 'Ex : Salma Benaissa'} />
                <Field icon={Phone} label={t('co.phone')} value={phone} set={setPhone} ph="06 XX XX XX XX" ltr />
                {!phoneOk && phone.length > 0 && <p className="text-xs font-bold text-red-400">{isAr ? 'رقم الهاتف يجب أن يبدأ بـ 06 أو 07 ويتكون من 10 أرقام' : 'Le numéro doit commencer par 06/07 et contenir 10 chiffres'}</p>}
                {phoneOk && <p className="text-xs font-bold text-emerald-300 flex items-center gap-1"><BadgeCheck className="w-3.5 h-3.5" /> {isAr ? 'رقم صالح' : 'Numéro valide'}</p>}
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: isAr ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div>
                  <label className="text-sm font-black text-white/70">{t('co.city')}</label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CITIES.map(c => {
                      const lbl = isAr ? c.ar : c.fr;
                      const on = city === c.ar || city === c.fr;
                      return (
                        <button key={c.fr} onClick={() => setCity(lbl)}
                          className={`rounded-2xl border p-3 text-center transition ${on ? 'border-[#e8b84a] bg-[#e8b84a]/10' : 'chip'}`}>
                          <span className="block font-black text-sm">{lbl}</span>
                          <span className="text-[11px] text-[#f5d67b] font-bold">{c.fee} {t('common.mad')}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-black text-white/70 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {t('co.address')}</label>
                  <textarea value={address} onChange={e => setAddress(e.target.value)} rows={2}
                    placeholder={isAr ? 'الشارع، رقم العمارة، الشقة، الحي…' : 'Rue, immeuble, appart, quartier…'}
                    className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-sm placeholder:text-white/30" />
                </div>
                <div>
                  <label className="text-sm font-black text-white/70">{t('co.notes')}</label>
                  <input value={notes} onChange={e => setNotes(e.target.value)}
                    placeholder={isAr ? 'مثال: الاتصال عند الوصول…' : 'Ex : appeler à l’arrivée…'}
                    className="mt-2 w-full h-12 rounded-2xl bg-white/5 border border-white/10 px-4 text-sm placeholder:text-white/30" />
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: isAr ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                {[
                  { id: 'cod' as const, icon: Banknote, tt: t('co.cod'), dd: t('co.cod_d') },
                  { id: 'card' as const, icon: Wallet, tt: t('co.card'), dd: t('co.card_d') },
                  { id: 'mobile' as const, icon: Smartphone, tt: t('co.mobile'), dd: t('co.mobile_d') },
                ].map(m => (
                  <button key={m.id} onClick={() => setPay(m.id)}
                    className={`w-full rounded-2xl border p-4 flex items-center gap-4 text-start transition ${pay === m.id ? 'border-[#e8b84a] bg-[#e8b84a]/10' : 'chip'}`}>
                    <span className={`w-12 h-12 grid place-items-center rounded-2xl shrink-0 ${pay === m.id ? 'btn-gold' : 'bg-white/10'}`}><m.icon className="w-5 h-5" /></span>
                    <span className="flex-1"><span className="block font-black">{m.tt}</span><span className="block text-xs text-white/50 mt-0.5">{m.dd}</span></span>
                    <span className={`w-6 h-6 rounded-full border grid place-items-center ${pay === m.id ? 'border-[#e8b84a] bg-[#e8b84a]' : 'border-white/25'}`}>
                      {pay === m.id && <Check className="w-3.5 h-3.5 text-[#2a0a10]" strokeWidth={3} />}
                    </span>
                  </button>
                ))}
                {user && user.points > 0 && (
                  <button onClick={() => setUsePoints(v => !v)}
                    className={`w-full rounded-2xl border p-4 flex items-center gap-4 text-start transition ${usePoints ? 'border-[#ff4d8d] bg-[#ff4d8d]/10' : 'chip'}`}>
                    <span className="w-12 h-12 grid place-items-center rounded-2xl bg-gradient-to-br from-[#ff4d8d] to-[#7c3aed] shrink-0"><Crown className="w-5 h-5 text-white" /></span>
                    <span className="flex-1">
                      <span className="block font-black">{t('co.points')} ({t('co.pts_have')}: {user.points} ✨)</span>
                      <span className="block text-xs text-white/50 mt-0.5">−{mad(ptsValue, locale)}</span>
                    </span>
                    <span className={`w-6 h-6 rounded-full border grid place-items-center ${usePoints ? 'border-[#ff4d8d] bg-[#ff4d8d]' : 'border-white/25'}`}>
                      {usePoints && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                    </span>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="px-6 py-3 rounded-full border border-white/15 font-black flex items-center gap-1.5">
                <Back className="w-4 h-4" /> {t('co.back')}
              </button>
            )}
            {step < 2 ? (
              <button disabled={!stepOk} onClick={() => stepOk && setStep(s => s + 1)}
                className={`flex-1 py-3 rounded-full font-black flex items-center justify-center gap-1.5 ${stepOk ? 'btn-gold' : 'bg-white/10 text-white/35 cursor-not-allowed'}`}>
                {t('co.next')} <Next className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={confirm} className="btn-pink text-white flex-1 py-3 rounded-full font-black text-[16px]">
                {t('co.confirm')} • {mad(total, locale)}
              </button>
            )}
          </div>
          <div className="hidden" />
        </div>

        <div className="glass-strong rounded-[28px] p-6 lg:sticky lg:top-24">
          <h3 className="font-black">{t('cart.title')} ({cart.reduce((a, c) => a + c.qty, 0)})</h3>
          <div className="mt-4 space-y-3 max-h-64 overflow-y-auto no-scrollbar">
            {cart.map(c => {
              const p = productById(c.productId)!;
              return (
                <div key={c.key} className="flex gap-3 items-center">
                  <img src={p.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-black truncate">{isAr ? p.nameAr : p.nameFr}</div>
                    <div className="text-[11px] text-white/45">× {c.qty}</div>
                  </div>
                  <div className="text-sm font-black text-[#f5d67b]">{mad(priceOf(p, c.sizeId, c.extrasIds) * c.qty, locale)}</div>
                </div>
              );
            })}
          </div>
          <div className="dotted-line my-4" />
          <div className="space-y-2 text-sm font-bold">
            <div className="flex justify-between text-white/65"><span>{t('cart.total')}</span><span>{mad(subtotal, locale)}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-300"><span>{t('cart.discount')} {promo && `(${promo})`}</span><span>−{mad(discount, locale)}</span></div>}
            {ptsValue > 0 && <div className="flex justify-between text-[#ff7ab8]"><span>✨ {t('co.points')}</span><span>−{mad(ptsValue, locale)}</span></div>}
            <div className="flex justify-between text-white/65"><span>{t('cart.delivery')} ({isAr ? cityEntry?.ar ?? city : cityEntry?.fr ?? city})</span><span>{delivery === 0 ? t('cart.free') : mad(delivery, locale)}</span></div>
            <div className="flex justify-between text-lg font-black pt-1"><span>{t('cart.grand')}</span><span className="gold-text text-2xl">{mad(total, locale)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, set, ph, ltr = false }: { icon: typeof User; label: string; value: string; set: (v: string) => void; ph: string; ltr?: boolean }) {
  return (
    <div>
      <label className="text-sm font-black text-white/70 flex items-center gap-1.5"><Icon className="w-4 h-4" /> {label}</label>
      <input value={value} onChange={e => set(e.target.value)} placeholder={ph} dir={ltr ? 'ltr' : undefined}
        className="mt-2 w-full py-3 px-5 rounded-2xl bg-white/5 border border-white/10 text-[15px] placeholder:text-white/30" />
    </div>
  );
}
