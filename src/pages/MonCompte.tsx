import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BadgeCheck, Crown, Gift, History, LogOut, MapPin, Package, Save, Sparkles, Ticket, UserRound } from 'lucide-react';
import { CITIES, nextTierAt, tierFor } from '../lib/data';
import { useStore } from '../lib/store';

export default function MonCompte() {
  const { tr, isAr, user, logout, toast, orders, updateUser, setCoupon, coupon } = useStore();
  const nav = useNavigate();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [city, setCity] = useState(user?.city ?? 'الدار البيضاء');
  const [quartier, setQuartier] = useState(user?.quartier ?? '');
  const [address, setAddress] = useState(user?.address ?? '');

  if (!user) return <Navigate to="/compte" replace />;

  const tier = tierFor(user.points);
  const nextAt = nextTierAt(user.points);
  const pct = nextAt ? Math.min(100, Math.round((user.points / nextAt) * 100)) : 100;
  const tierLabel = tier === 'ruby' ? tr('tier_ruby') : tier === 'gold' ? tr('tier_gold') : tr('tier_rose');
  const tierColor = tier === 'ruby' ? 'from-[#ff2a85] to-[#7b2ff7]' : tier === 'gold' ? 'from-[#ffd000] to-[#ff9d00]' : 'from-[#ff9ecf] to-[#ff2a85]';

  const redeem = (need: number, amount: number, labelAr: string, labelFr: string) => {
    if (user.points < need) return toast(tr('not_enough'), 'pink');
    updateUser({ points: user.points - need });
    setCoupon({ labelAr, labelFr, amount });
    toast(`${tr('redeemed')} (−${amount} ${tr('currency')}) 🎉`, 'gold');
    nav('/panier');
  };

  const input = 'w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/15 text-sm font-bold outline-none focus:border-[#ffd000] transition placeholder:text-white/30';
  const myQuartiers = (CITIES.find((c) => c.ar === city)?.quartiers ?? CITIES.flatMap((c) => c.quartiers));
  const cityOptions = ['الدار البيضاء', 'الرباط', 'مراكش', 'طنجة', 'أكادير', 'فاس'];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-4xl">{tr('ma_title')}</h1>
          <p className="text-sm text-white/55 mt-1">{tr('ma_hello')} <span className="font-black text-[#ffd000]">{user.name}</span> ✦</p>
        </div>
        <button onClick={() => { logout(); toast(tr('logout_toast'), 'gold'); nav('/'); }} className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl glass-soft text-[13px] font-black text-white/75 hover:text-[#ff5c8a] hover:border-[#ff2a85]/50 transition">
          <LogOut size={15} />{tr('logout')}
        </button>
      </div>

      {/* tier card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`relative rounded-3xl p-6 sm:p-8 overflow-hidden bg-gradient-to-l ${tierColor} text-[#280645]`}>
        <Crown size={120} className="absolute -end-6 -bottom-8 opacity-15 rotate-12" />
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 relative">
          <span className="w-16 h-16 rounded-2xl bg-[#280645] flex items-center justify-center shrink-0 shadow-xl"><UserRound size={28} className="text-[#ffd000]" /></span>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-black text-xl">{user.name}</span>
              <span className="text-[11px] font-black px-3 py-1 rounded-full bg-[#280645] text-[#ffd000]">{tierLabel}</span>
            </div>
            <div className="text-xs font-bold opacity-75 mt-1" dir="ltr">{user.email} · {user.phone}</div>
            <div className="mt-4 h-3 rounded-full bg-black/20 overflow-hidden max-w-md">
              <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }} className="h-full rounded-full bg-[#280645]" />
            </div>
            <div className="text-[11px] font-black mt-1.5">
              {nextAt ? <>{nextAt - user.points} {tr('next_tier')}</> : tr('max_tier')}
            </div>
          </div>
          <div className="text-center bg-[#280645] text-white rounded-2xl px-6 py-4 shrink-0">
            <div className="font-display font-black text-3xl text-[#ffd000]" dir="ltr">{user.points}</div>
            <div className="text-[11px] font-black text-white/70 flex items-center gap-1 justify-center"><Sparkles size={11} />{tr('my_points')}</div>
          </div>
        </div>
      </motion.div>

      {coupon && (
        <div className="mt-4 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-emerald-500/12 border border-emerald-400/40 text-sm font-black text-emerald-200">
          <Ticket size={17} />{tr('coupon_active')}: {isAr ? coupon.labelAr : coupon.labelFr} (−{coupon.amount} {tr('currency')})
          <button onClick={() => setCoupon(null)} className="ms-auto text-[11px] underline opacity-80">{tr('coupon_remove')}</button>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-4 mt-6">
        {/* rewards */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6">
          <h2 className="font-display font-black flex items-center gap-2 mb-1"><Gift size={19} className="text-[#ffd000]" />{tr('rewards')}</h2>
          <p className="text-[11px] text-white/50 mb-4">{tr('how_points_txt')}</p>
          <div className="space-y-3">
            {[
              { need: 100, amount: 20, ar: 'خصم 20 درهم', fr: '−20 DH' },
              { need: 250, amount: 55, ar: 'ميلك شيك مجاني (≈55 درهم)', fr: 'Milkshake offert (≈55 DH)' },
            ].map((r) => (
              <div key={r.need} className="glass-soft rounded-2xl p-4 flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#ffd000]/15 border border-[#ffd000]/40 flex items-center justify-center shrink-0"><Ticket size={19} className="text-[#ffd000]" /></span>
                <div className="flex-1">
                  <div className="text-[13px] font-black">{isAr ? r.ar : r.fr}</div>
                  <div className="text-[11px] text-white/50 font-bold" dir="ltr">{r.need} pts</div>
                </div>
                <button
                  disabled={user.points < r.need}
                  onClick={() => redeem(r.need, r.amount, r.ar, r.fr)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition ${user.points >= r.need ? 'bg-[#ffd000] text-[#280645] hover:bg-white' : 'bg-white/10 text-white/35 cursor-not-allowed'}`}
                >
                  {tr('redeem')}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[11px] text-white/45 leading-5 bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <span className="font-black text-[#ffd000]">{tr('how_points')}</span><br />{tr('how_points_txt')}
          </div>
        </div>

        {/* info */}
        <div className="lg:col-span-3 glass-panel rounded-3xl p-6">
          <h2 className="font-display font-black flex items-center gap-2 mb-4"><UserRound size={19} className="text-[#ffd000]" />{tr('my_info')}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block"><span className="text-[11px] font-black text-white/60">{tr('f_name')}</span><input value={name} onChange={(e) => setName(e.target.value)} className={`${input} mt-1`} /></label>
            <label className="block"><span className="text-[11px] font-black text-white/60">{tr('f_phone')}</span><input dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} className={`${input} mt-1`} /></label>
            <label className="block"><span className="text-[11px] font-black text-white/60 flex items-center gap-1"><MapPin size={11} />{tr('co_city')}</span>
              <select value={city} onChange={(e) => setCity(e.target.value)} className={`${input} mt-1 cursor-pointer`}>{cityOptions.map((c) => <option key={c}>{c}</option>)}</select></label>
            <label className="block"><span className="text-[11px] font-black text-white/60">{tr('co_district')}</span>
              <input value={quartier} onChange={(e) => setQuartier(e.target.value)} list="quartiers" placeholder={tr('co_district_ph')} className={`${input} mt-1`} />
              <datalist id="quartiers">{myQuartiers.map((q) => <option key={q} value={q} />)}</datalist></label>
            <label className="block sm:col-span-2"><span className="text-[11px] font-black text-white/60">{tr('co_address')}</span><input value={address} onChange={(e) => setAddress(e.target.value)} className={`${input} mt-1`} /></label>
          </div>
          <button onClick={() => { updateUser({ name, phone, city, quartier, address }); toast(tr('saved_toast'), 'green'); }} className="mt-4 flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-l from-[#ff2a85] to-[#a4139e] text-sm font-black hover:scale-[1.02] transition">
            <Save size={16} />{tr('save_info')}
          </button>
        </div>
      </div>

      {/* history */}
      <div className="glass-panel rounded-3xl p-6 mt-4">
        <h2 className="font-display font-black flex items-center gap-2 mb-4"><History size={19} className="text-[#ffd000]" />{tr('history')} <span className="text-xs text-white/40 font-bold" dir="ltr">({orders.length})</span></h2>
        {orders.length === 0 ? (
          <p className="text-sm text-white/50 text-center py-8">{tr('no_history')}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {orders.map((o) => (
              <div key={o.id} className="glass-soft rounded-2xl p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-black text-sm flex items-center gap-1.5" dir="ltr"><Package size={14} className="text-[#ffd000]" />{o.id}</span>
                  <span className="text-[11px] text-white/45" dir="ltr">{o.date}</span>
                </div>
                <ul className="text-xs text-white/65 mt-2 space-y-1">{o.items.map((it, i) => <li key={i}>• {it}</li>)}</ul>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                  <span className="text-[11px] font-black text-emerald-300 flex items-center gap-1"><BadgeCheck size={13} />{isAr ? o.status : o.status_fr}</span>
                  <span className="text-sm font-black"><span className="text-[#ffd000]" dir="ltr">{o.total}</span> <span className="text-[11px] text-white/50">{tr('currency')}</span> <span className="text-[10px] text-[#ff9ecf]" dir="ltr">+{o.earnedPoints} pts</span></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
