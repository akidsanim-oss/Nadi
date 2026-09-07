import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Gem, LogIn, Mail, Phone, Sparkles, UserPlus, UserRound } from 'lucide-react';
import { useStore } from '../lib/store';

export default function Compte() {
  const { tr, isAr, login, register, toast, useDemo, user } = useStore();
  const nav = useNavigate();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');

  if (user) return <Navigate to="/mon-compte" replace />;

  const input = 'w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/15 text-sm font-bold outline-none focus:border-[#ffd000] transition placeholder:text-white/30 placeholder:font-medium';

  const doLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !pass) return toast(tr('err_fill'), 'pink');
    if (!login(email, pass)) return toast(tr('err_login'), 'pink');
    toast(`${tr('welcome_back')} ✨`, 'gold');
    nav('/mon-compte');
  };
  const doRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !pass) return toast(tr('err_fill'), 'pink');
    const ok = register({ name: name.trim(), email: email.trim(), phone: phone.trim(), password: pass, city: 'الدار البيضاء', quartier: '', address: '', points: 0 });
    if (!ok) return toast(tr('err_exists'), 'pink');
    toast(`${tr('welcome_new')} 🎁`, 'gold');
    nav('/mon-compte');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-7">
        <span className="inline-flex w-16 h-16 rounded-3xl bg-gradient-to-br from-[#ffd000] to-[#ff2a85] items-center justify-center shadow-[0_0_30px_rgba(255,208,0,.45)] mb-4"><Crown size={30} className="text-[#280645]" /></span>
        <h1 className="font-display font-black text-2xl sm:text-3xl">{tr('acc_title')}</h1>
        <p className="text-xs sm:text-sm text-white/55 mt-2">{tr('acc_sub')}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel rounded-3xl p-6 sm:p-7">
        <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-black/40 mb-6">
          {(['login', 'register'] as const).map((id) => (
            <button key={id} onClick={() => setTab(id)} className={`py-2.5 rounded-xl text-[13px] font-black flex items-center justify-center gap-1.5 transition ${tab === id ? 'bg-gradient-to-l from-[#ff2a85] to-[#a4139e] text-white shadow' : 'text-white/55 hover:text-white'}`}>
              {id === 'login' ? <LogIn size={14} /> : <UserPlus size={14} />}{id === 'login' ? tr('tab_login') : tr('tab_register')}
            </button>
          ))}
        </div>

        {tab === 'login' ? (
          <form onSubmit={doLogin} className="space-y-3">
            <label className="block"><span className="text-xs font-black text-white/70 flex items-center gap-1.5 mb-1.5"><Mail size={13} className="text-[#ffd000]" />{tr('f_email')}</span>
              <input dir="ltr" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mail.com" className={input} /></label>
            <label className="block"><span className="text-xs font-black text-white/70 flex items-center gap-1.5 mb-1.5"><Gem size={13} className="text-[#ffd000]" />{tr('f_pass')}</span>
              <input dir="ltr" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" className={input} /></label>
            <button className="btn-shine w-full py-3.5 rounded-2xl bg-gradient-to-l from-[#ff2a85] to-[#a4139e] font-black text-sm hover:scale-[1.01] active:scale-[.99] transition">{tr('btn_login')}</button>
          </form>
        ) : (
          <form onSubmit={doRegister} className="space-y-3">
            <label className="block"><span className="text-xs font-black text-white/70 flex items-center gap-1.5 mb-1.5"><UserRound size={13} className="text-[#ffd000]" />{tr('f_name')}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={tr('f_name')} className={input} /></label>
            <label className="block"><span className="text-xs font-black text-white/70 flex items-center gap-1.5 mb-1.5"><Mail size={13} className="text-[#ffd000]" />{tr('f_email')}</span>
              <input dir="ltr" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mail.com" className={input} /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block"><span className="text-xs font-black text-white/70 flex items-center gap-1.5 mb-1.5"><Phone size={13} className="text-[#ffd000]" />{tr('f_phone')}</span>
                <input dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 XX XX XX XX" className={input} /></label>
              <label className="block"><span className="text-xs font-black text-white/70 flex items-center gap-1.5 mb-1.5"><Gem size={13} className="text-[#ffd000]" />{tr('f_pass')}</span>
                <input dir="ltr" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" className={input} /></label>
            </div>
            <button className="btn-shine w-full py-3.5 rounded-2xl bg-gradient-to-l from-[#ffd000] to-[#ff9d00] text-[#280645] font-black text-sm hover:scale-[1.01] active:scale-[.99] transition">{tr('btn_register')}</button>
          </form>
        )}

        <div className="mt-5 pt-5 border-t border-white/10">
          <p className="text-[11px] font-black text-white/50 mb-2.5 flex items-center gap-1.5"><Sparkles size={12} className="text-[#ffd000]" />{tr('demo_title')}</p>
          <button onClick={() => { useDemo(); toast(`${tr('welcome_back')} ✨`, 'gold'); nav('/mon-compte'); }} className="w-full py-3 rounded-2xl glass-soft text-[13px] font-black text-[#ffd000] hover:border-[#ffd000]/60 transition" dir="ltr">
            anouar@jawhara.ma · jawhara123 — {tr('demo_use')}
          </button>
          <p className="text-center text-[11px] text-white/40 mt-3">
            {isAr ? 'بالمتابعة أنت توافق على شروط جوهرة' : 'En continuant vous acceptez les CGU Jawhara'} · <Link to="/contact" className="text-[#ffd000] hover:underline">{tr('nav_contact')}</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
