import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useStore } from '../lib/store';

export default function Contact() {
  const { tr, isAr, toast, user } = useStore();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');

  const subjects = isAr
    ? ['استفسار عن طلب', 'اقتراح نكهة', 'طلبية مناسبة', 'شراكة', 'أخرى']
    : ['Question commande', 'Proposer un parfum', 'Commande événement', 'Partenariat', 'Autre'];

  const input = 'w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/15 text-sm font-bold outline-none focus:border-[#ffd000] transition placeholder:text-white/30 placeholder:font-medium';

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return toast(tr('err_fill'), 'pink');
    toast(`${tr('ct_sent')} 💎`, 'green');
    setSubject(''); setMsg('');
  };

  const cards = [
    { icon: MapPin, t: tr('ct_visit'), d: tr('ct_addr') },
    { icon: Phone, t: tr('ct_call'), d: '+212 6 61 23 45 67', ltr: true },
    { icon: Clock, t: tr('ct_hours_t'), d: tr('ct_hours_d') },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-xl mx-auto">
        <span className="text-[11px] font-black tracking-[.25em] text-[#ff2a85]">✦ CONTACT</span>
        <h1 className="font-display font-black text-3xl sm:text-5xl mt-2">{tr('ct_title')}</h1>
        <p className="text-xs sm:text-sm text-white/55 mt-3">{tr('ct_sub')}</p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-4 mt-9">
        <div className="md:col-span-2 space-y-3">
          {cards.map((c, i) => (
            <motion.div key={c.t} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass-panel rounded-2xl p-5 flex gap-3.5">
              <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ffd000] to-[#ff2a85] flex items-center justify-center shrink-0"><c.icon size={19} className="text-[#280645]" /></span>
              <span><span className="block font-black text-sm text-[#ffd000]">{c.t}</span><span className="block text-[13px] text-white/70 mt-1 leading-5" dir={c.ltr ? 'ltr' : undefined}>{c.d}</span></span>
            </motion.div>
          ))}
          <a href="https://wa.me/212661234567" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-5 rounded-2xl bg-gradient-to-l from-emerald-500 to-emerald-600 font-black text-sm hover:scale-[1.02] transition shadow-[0_0_24px_rgba(16,185,129,.4)]">
            <MessageCircle size={22} />{tr('ct_wa')}
            <span className="ms-auto text-[11px] opacity-80" dir="ltr">+212 661-234567</span>
          </a>
          <div className="rounded-2xl overflow-hidden border border-white/10 h-44">
            <iframe title="map" src="https://www.openstreetmap.org/export/embed.html?bbox=-7.65%2C33.57%2C-7.60%2C33.60&layer=mapnik&marker=33.585%2C-7.627" className="w-full h-full grayscale invert-[.9] contrast-[.9]" loading="lazy" />
          </div>
        </div>

        <motion.form onSubmit={send} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="md:col-span-3 glass-panel rounded-3xl p-6 sm:p-7 space-y-3.5">
          <h2 className="font-display font-black text-lg flex items-center gap-2"><Mail size={18} className="text-[#ffd000]" />{tr('ct_form_t')}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block"><span className="text-xs font-black text-white/70 mb-1.5 block">{tr('f_name')}</span><input value={name} onChange={(e) => setName(e.target.value)} className={input} placeholder={tr('co_name_ph')} /></label>
            <label className="block"><span className="text-xs font-black text-white/70 mb-1.5 block">{tr('f_phone')}</span><input dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} className={input} placeholder="06 XX XX XX XX" /></label>
          </div>
          <label className="block"><span className="text-xs font-black text-white/70 mb-1.5 block">{tr('ct_subject')}</span>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className={`${input} cursor-pointer`}>
              <option value="">{isAr ? '— اختر الموضوع —' : '— Choisir —'}</option>
              {subjects.map((s) => <option key={s}>{s}</option>)}
            </select></label>
          <label className="block"><span className="text-xs font-black text-white/70 mb-1.5 block">{tr('ct_msg')}</span>
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={5} placeholder={tr('ct_msg_ph')} className={`${input} resize-none`} /></label>
          <button className="btn-shine w-full py-4 rounded-2xl bg-gradient-to-l from-[#ff2a85] to-[#ffd000] font-black text-sm hover:scale-[1.01] transition flex items-center justify-center gap-2">
            <Send size={16} />{tr('ct_send')}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
