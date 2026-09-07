import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gem, Snowflake, Truck, Users } from 'lucide-react';
import { useStore } from '../lib/store';
import type { TKey } from '../lib/i18n';

const TIMELINE = [
  { y: '2021', k: 'y21' },
  { y: '2022', k: 'y22' },
  { y: '2024', k: 'y24' },
  { y: '2026', k: 'y26' },
] as const;

export default function APropos() {
  const { tr, isAr } = useStore();
  const vals = [
    { icon: Gem, t: tr('val1_t'), d: tr('val1_d') },
    { icon: Truck, t: tr('val2_t'), d: tr('val2_d') },
    { icon: Users, t: tr('val3_t'), d: tr('val3_d') },
  ];
  const tk = (k: string): TKey => `${k}` as TKey;
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-black tracking-[.25em] text-[#ff2a85]">✦ {tr('about_kicker')}</span>
        <h1 className="font-display font-black text-3xl sm:text-5xl mt-2 leading-snug">{tr('about_title')}</h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel rounded-3xl p-6 sm:p-10 mt-8 relative overflow-hidden">
        <div className="absolute -top-20 end-10 w-64 h-64 bg-[#ff2a85]/20 blur-[100px] rounded-full" />
        <div className="grid md:grid-cols-2 gap-8 items-center relative">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-[#ffd000]/40 shadow-[0_0_30px_rgba(255,208,0,.25)]">
              <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80" alt="Jawhara" className="w-full h-72 object-cover" />
            </div>
            <div className="absolute -bottom-5 start-5 glass-panel rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-xl">
              <Snowflake size={20} className="text-sky-300" />
              <span className="text-[11px] font-black leading-4">{isAr ? 'طازج يومياً' : 'Frais quotidien'}<br /><span className="text-[#ffd000]">100% {isAr ? 'طبيعي' : 'naturel'}</span></span>
            </div>
          </div>
          <div className="space-y-4 text-sm sm:text-[15px] leading-7 sm:leading-8 text-white/75">
            <p>{tr('about_p1')}</p>
            <p>{tr('about_p2')}</p>
            <div className="font-display font-black text-2xl gem-text pt-1">“{tr('hero_title_1')} {tr('hero_title_2')}” ✦</div>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {vals.map((v, i) => (
          <motion.div key={v.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card-lift glass-soft rounded-3xl p-6 text-center">
            <span className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ffd000] to-[#ff2a85] items-center justify-center mb-4"><v.icon size={24} className="text-[#280645]" /></span>
            <h3 className="font-display font-black">{v.t}</h3>
            <p className="text-xs text-white/55 mt-1.5 leading-5">{v.d}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-display font-black text-xl sm:text-2xl text-center mb-6">{tr('timeline_t')}</h2>
        <div className="relative">
          <div className="absolute top-5 inset-x-8 h-0.5 bg-gradient-to-l from-[#ff2a85] via-[#ffd000] to-[#ff2a85] opacity-40 hidden sm:block" />
          <div className="grid sm:grid-cols-4 gap-4">
            {TIMELINE.map((s, i) => (
              <motion.div key={s.y} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-panel rounded-2xl p-5 text-center relative">
                <span className="inline-flex w-10 h-10 rounded-full bg-gradient-to-br from-[#ff2a85] to-[#ffd000] font-black text-[#280645] text-sm items-center justify-center relative z-10" dir="ltr">{s.y}</span>
                <h3 className="font-black text-sm mt-3">{tr(tk(`${s.k}_t`))}</h3>
                <p className="text-[11px] text-white/55 mt-1">{tr(tk(`${s.k}_d`))}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link to="/menu" className="btn-shine inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-l from-[#ff2a85] to-[#ffd000] font-black text-sm hover:scale-105 transition">
          {tr('about_cta')}<ArrowLeft size={16} className={isAr ? '' : 'rotate-180'} />
        </Link>
      </div>
    </div>
  );
}
