import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Gem, Gift, Medal, Sparkles, Star, Trophy, Users } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { useStore } from '../lib/store';

export default function Loyalty() {
  const { t, isAr } = useLang();
  const { user, setUser, pushToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const join = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 3 || !/^0[67]\d{8}$/.test(phone.replace(/[\s-]/g, ''))) {
      pushToast(isAr ? 'المرجو إدخال اسم ورقم هاتف صحيحين' : 'Nom et téléphone valides requis');
      return;
    }
    setUser({ name: name.trim(), phone: phone.replace(/[\s-]/g, ''), city: isAr ? 'الدار البيضاء' : 'Casablanca', points: user?.points ?? 50 });
    pushToast(isAr ? '+50 نقطة هدية الترحيب! ✨' : '+50 points de bienvenue ! ✨');
  };

  const pts = user?.points ?? 0;
  const tier = pts >= 1000 ? 2 : pts >= 300 ? 1 : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
      <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-br from-[#3b1163] via-[#2a0a4a] to-[#12041f] border border-[#e8b84a]/30 p-8 sm:p-14 text-center">
        <div className="absolute inset-0 pattern-zellige" />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <Crown className="mx-auto w-16 h-16 text-[#f5d67b]" />
          <h1 className="mt-4 text-4xl sm:text-5xl font-black gold-text">{t('loyal.title')}</h1>
          <p className="mt-2 text-xl font-black text-white/85">{t('loy.hero_t')}</p>
          <p className="mt-3 max-w-2xl mx-auto text-white/60 leading-8">{t('loy.hero_d')}</p>
          {user && (
            <div className="mt-6 inline-flex items-center gap-3 glass-strong rounded-full ps-2 pe-6 py-2">
              <span className="w-12 h-12 grid place-items-center rounded-full bg-gradient-to-br from-[#e8b84a] to-[#c9962b] font-black text-[#2a0a10] text-lg">{user.name[0]}</span>
              <span className="text-start"><span className="block font-black">{user.name}</span><span className="block text-sm text-[#f5d67b] font-black">{pts} ✨ {t('auth.have')}</span></span>
            </div>
          )}
        </motion.div>
      </div>

      <h2 className="mt-14 text-2xl sm:text-3xl font-black text-center">{t('loy.how')}</h2>
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        {[
          { ic: Gift, tt: t('loy.r1'), dd: t('loy.r1d'), v: '1pt / 10DH' },
          { ic: Users, tt: t('loy.r2'), dd: t('loy.r2d'), v: '+50 ✨' },
          { ic: Star, tt: t('loy.r3'), dd: t('loy.r3d'), v: '+10 ✨' },
        ].map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
            className="glass rounded-[28px] p-6 text-center">
            <span className="mx-auto w-14 h-14 grid place-items-center rounded-full btn-gold"><r.ic className="w-6 h-6" /></span>
            <div className="mt-3 text-xs font-black text-[#ff7ab8] tracking-wide" dir="ltr">{r.v}</div>
            <h3 className="mt-1 font-black text-lg">{r.tt}</h3>
            <p className="mt-1 text-sm text-white/55">{r.dd}</p>
          </motion.div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl sm:text-3xl font-black text-center">{t('loy.tiers')}</h2>
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        {[
          { ic: Medal, n: t('loy.silver'), c: '0 – 299 ✨', d: isAr ? 'خصم 5% دائم + هدية عيد الميلاد' : '−5% permanent + cadeau d’anniversaire', g: 'from-slate-400 to-slate-600', on: tier === 0 },
          { ic: Crown, n: t('loy.gold'), c: '300 – 999 ✨', d: isAr ? 'خصم 10% + توصيل مجاني + إصدارات حصرية' : '−10% + livraison offerte + éditions exclusives', g: 'from-[#e8b84a] to-[#c9962b]', on: tier === 1 },
          { ic: Trophy, n: t('loy.diamond'), c: '1000+ ✨', d: isAr ? 'خصم 15% + كأس مجاني شهرياً + دعوات VIP' : '−15% + verre offert mensuel + invitations VIP', g: 'from-[#7dd3fc] to-[#7c3aed]', on: tier === 2 },
        ].map((tierItem, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
            className={`rounded-[28px] p-6 text-center border transition ${tierItem.on ? 'border-[#e8b84a] bg-[#e8b84a]/8 shadow-[0_0_40px_-10px_rgba(232,184,74,.5)]' : 'glass'}`}>
            <span className={`mx-auto w-14 h-14 grid place-items-center rounded-full bg-gradient-to-br ${tierItem.g}`}><tierItem.ic className="w-6 h-6 text-white" /></span>
            <h3 className="mt-3 font-black text-xl">{tierItem.n}</h3>
            <div className="text-sm font-black text-[#f5d67b]" dir="ltr">{tierItem.c}</div>
            <p className="mt-2 text-sm text-white/55 leading-7">{tierItem.d}</p>
            {tierItem.on && <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-emerald-300"><Sparkles className="w-3.5 h-3.5" /> {isAr ? 'مستواك الحالي' : 'Ton niveau actuel'}</span>}
          </motion.div>
        ))}
      </div>

      {!user && (
        <div className="mt-14 glass-strong rounded-[32px] p-8 sm:p-10 max-w-2xl mx-auto">
          <h3 className="text-2xl font-black text-center flex items-center justify-center gap-2"><Gem className="w-6 h-6 text-[#f5d67b]" /> {t('loy.join')}</h3>
          <p className="text-center text-sm text-white/55 mt-2">{t('auth.desc')}</p>
          <form onSubmit={join} className="mt-6 space-y-3">
            <input value={name} onChange={e => setName(e.target.value)} placeholder={t('auth.name')} className="w-full h-13 py-3 px-5 rounded-2xl bg-white/5 border border-white/10 placeholder:text-white/30" />
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder={t('auth.phone_ph')} dir="ltr" className="w-full h-13 py-3 px-5 rounded-2xl bg-white/5 border border-white/10 placeholder:text-white/30 text-left" />
            <button className="btn-gold w-full py-3.5 rounded-full font-black">{t('auth.join_btn')} — +50 ✨</button>
          </form>
        </div>
      )}
    </div>
  );
}
