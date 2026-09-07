import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BadgeCheck, Bike, ChevronLeft, ChevronRight, Facebook, Flame, Instagram, Music2, Sparkles, Star, Truck, Youtube } from 'lucide-react';
import { COMBOS, PRODUCTS, REVIEWS } from '../lib/data';
import type { Product } from '../lib/types';
import { useStore } from '../lib/store';
import ProductCard, { Stars } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import LoyaltyBanner from '../components/LoyaltyBanner';

function Marquee() {
  const { tr } = useStore();
  const items = [tr('marquee_1'), tr('marquee_2'), tr('marquee_3'), tr('marquee_4'), tr('marquee_5')];
  const row = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-[#ffd000]/25 bg-[#1d0333]/80 py-3" dir="ltr">
      <div className="marquee-track gap-0">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {row.map((it, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-2 px-6 text-xs font-black text-[#ffe57f] whitespace-nowrap">
                <Sparkles size={13} className="text-[#ff2a85]" />{it}<span className="text-[#ff2a85]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const { tr, isAr } = useStore();
  const heroImg = PRODUCTS[0].image;
  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-[-140px] start-[10%] w-[420px] h-[420px] rounded-full bg-[#6b1182]/40 blur-[120px]" />
      <div className="absolute top-[20%] end-[-120px] w-[380px] h-[380px] rounded-full bg-[#ff2a85]/25 blur-[110px]" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-14 sm:pt-16 sm:pb-20 grid lg:grid-cols-2 gap-10 items-center relative">
        <div className="text-center lg:text-start">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[11px] sm:text-xs font-black text-[#ffe57f] mb-5">
            <Sparkles size={14} className="text-[#ffd000]" />{tr('hero_badge')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="font-display font-black leading-[1.15] text-4xl sm:text-6xl xl:text-7xl"
          >
            {tr('hero_title_1')}{' '}<span className="gem-text">{tr('hero_title_2')}</span>
            <span className="text-[#ff2a85]"> ✦</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-5 text-sm sm:text-lg leading-7 sm:leading-8 text-white/70 max-w-xl mx-auto lg:mx-0">
            {tr('hero_sub')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-7 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <Link to="/menu" className="btn-shine w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-l from-[#ff2a85] via-[#a4139e] to-[#e0a800] font-black text-[15px] text-white shadow-[0_0_28px_rgba(255,42,133,.55)] hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2">
              <Flame size={17} className="text-[#ffd000]" />{tr('hero_cta_menu')}
              <ArrowLeft size={16} className={isAr ? '' : 'rotate-180'} />
            </Link>
            <Link to="/a-propos" className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel font-black text-[15px] text-[#ffd000] hover:bg-[#ffd000] hover:text-[#280645] transition text-center">
              {tr('hero_cta_story')}
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-9 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
            {[
              { n: '+50K', l: tr('stat_customers') },
              { n: '+28', l: tr('stat_flavors') },
              { n: '25′', l: tr('stat_delivery') },
            ].map((s) => (
              <div key={s.l} className="glass-soft rounded-2xl py-3 px-2 text-center">
                <div className="font-display font-black text-xl sm:text-2xl text-[#ffd000]" dir="ltr">{s.n}</div>
                <div className="text-[10px] sm:text-[11px] text-white/60 font-bold mt-0.5">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* visual */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.7 }} className="relative flex justify-center lg:justify-center">
          <div className="relative w-[280px] sm:w-[360px]">
            <div className="absolute inset-0 -m-8 rounded-full bg-[conic-gradient(from_0deg,#ff2a85,#ffd000,#6b1182,#ff2a85)] opacity-30 blur-2xl animate-spin-slow" />
            <div className="absolute inset-0 -m-4 rounded-[3rem] border border-dashed border-[#ffd000]/40 animate-spin-slow" />
            <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-[#ffd000]/50 shadow-[0_20px_80px_rgba(255,42,133,.4)] gold-ring">
              <img src={heroImg} alt="Jawhara" className="w-full h-[380px] sm:h-[460px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18022b]/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-4 glass-panel rounded-2xl px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-black text-[#ffd000]">{isAr ? PRODUCTS[0].name : PRODUCTS[0].name_fr}</div>
                  <div className="flex items-center gap-1 mt-1"><Stars value={5} /><span className="text-[10px] text-white/60 font-bold">5.0 · 312</span></div>
                </div>
                <div className="font-display font-black text-xl text-white" dir="ltr">48 <span className="text-[10px] text-[#ffd000]">{tr('currency')}</span></div>
              </div>
            </div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 3.4 }} className="absolute -top-4 -start-6 glass-panel rounded-2xl px-3.5 py-2.5 flex items-center gap-2 shadow-xl">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ffd000] to-[#ff2a85] flex items-center justify-center"><Bike size={16} className="text-[#280645]" /></span>
              <span className="text-[11px] font-black leading-4">{isAr ? 'توصيل مبرد' : 'Livraison fraîche'}<br /><span className="text-[#ffd000]">25 min</span></span>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -bottom-5 -end-4 glass-panel rounded-2xl px-3.5 py-2.5 flex items-center gap-2 shadow-xl">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff2a85] to-[#6b1182] flex items-center justify-center"><BadgeCheck size={16} className="text-white" /></span>
              <span className="text-[11px] font-black leading-4">{isAr ? 'فواكه طازجة' : 'Fruits frais'}<br /><span className="text-[#ffd000]">100%</span></span>
            </motion.div>
            <motion.div animate={{ rotate: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-1/3 -end-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ffd000] via-[#ffe57f] to-[#ff2a85] flex items-center justify-center shadow-[0_0_24px_rgba(255,208,0,.6)] rotate-12">
              <span className="font-black text-[#280645] text-lg">✦</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Signature() {
  const { tr } = useStore();
  const [custom, setCustom] = useState<Product | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const sig = PRODUCTS.filter((p) => p.category === 'milkshakes');
  const scrollBy = (d: number) => scroller.current?.scrollBy({ left: d, behavior: 'smooth' });
  return (
    <section className="max-w-7xl mx-auto px-4 mt-14 sm:mt-20">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-black tracking-[.25em] text-[#ff2a85]">✦ SIGNATURE</span>
          <h2 className="font-display font-black text-2xl sm:text-4xl mt-1">{tr('sig_title')}</h2>
          <p className="text-xs sm:text-sm text-white/55 mt-2">{tr('sig_sub')}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => scrollBy(320)} className="w-10 h-10 rounded-full glass-soft hidden sm:flex items-center justify-center hover:border-[#ffd000]/60 hover:text-[#ffd000] transition" aria-label="prev"><ChevronRight size={18} /></button>
          <button onClick={() => scrollBy(-320)} className="w-10 h-10 rounded-full glass-soft hidden sm:flex items-center justify-center hover:border-[#ffd000]/60 hover:text-[#ffd000] transition" aria-label="next"><ChevronLeft size={18} /></button>
          <Link to="/menu" className="text-xs sm:text-sm font-black text-[#ff2a85] hover:text-[#ffd000] transition flex items-center gap-1 whitespace-nowrap">{tr('view_all')}<ChevronLeft size={15} className="rtl:rotate-0 ltr:rotate-180" /></Link>
        </div>
      </div>
      <div ref={scroller} className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {sig.map((p, i) => (
          <div key={p.id} className="min-w-[78%] sm:min-w-0 snap-center">
            <ProductCard p={p} index={i} onCustomize={setCustom} />
          </div>
        ))}
      </div>
      <ProductModal product={custom} onClose={() => setCustom(null)} />
    </section>
  );
}

function Combos() {
  const { tr, isAr, addToCart, toast } = useStore();
  return (
    <section className="max-w-7xl mx-auto px-4 mt-14 sm:mt-20">
      <div className="text-center mb-7">
        <span className="text-[11px] font-black tracking-[.25em] text-[#ffd000]">✦ PACKS</span>
        <h2 className="font-display font-black text-2xl sm:text-4xl mt-1">{tr('combo_title')}</h2>
        <p className="text-xs sm:text-sm text-white/55 mt-2">{tr('combo_sub')}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {COMBOS.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="card-lift glass-panel rounded-3xl overflow-hidden flex flex-col sm:flex-row"
          >
            <div className="relative sm:w-44 h-44 sm:h-auto shrink-0 overflow-hidden">
              <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
              <span className="absolute top-3 start-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-[#ffd000] text-[#280645]">{isAr ? c.save : c.save_fr}</span>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-display font-black text-lg">{isAr ? c.name : c.name_fr}</h3>
              <p className="text-xs text-white/60 leading-5 mt-1 flex-1">{isAr ? c.desc : c.desc_fr}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-2xl text-[#ffd000]" dir="ltr">{c.price}</span>
                  <span className="text-xs line-through text-white/35" dir="ltr">{c.oldPrice}</span>
                  <span className="text-[11px] text-white/55 font-bold">{tr('currency')}</span>
                </div>
                <button
                  onClick={() => {
                    addToCart({ key: `${c.id}|pack|`, productId: c.id, name: c.name, name_fr: c.name_fr, image: c.image, size: isAr ? 'بوكس' : 'Pack', size_fr: 'Pack', extras: [], unitPrice: c.price, qty: 1 });
                    toast(`${isAr ? c.name : c.name_fr} — ${tr('added_toast')} ✨`, 'pink');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-l from-[#ff2a85] to-[#a4139e] text-xs font-black hover:scale-105 active:scale-95 transition shadow-[0_0_16px_rgba(255,42,133,.45)]"
                >
                  {tr('combo_add')}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const { tr, isAr } = useStore();
  return (
    <section className="max-w-7xl mx-auto px-4 mt-14 sm:mt-20">
      <div className="text-center mb-7">
        <span className="text-[11px] font-black tracking-[.25em] text-[#ff2a85]">✦ AVIS</span>
        <h2 className="font-display font-black text-2xl sm:text-4xl mt-1">{tr('rev_title')}</h2>
        <p className="text-xs sm:text-sm text-white/55 mt-2 flex items-center justify-center gap-1.5">
          <Star size={13} className="text-[#ffd000] fill-[#ffd000]" />
          <span dir="ltr" className="font-black text-[#ffd000]">4.9</span> · 1,745 {tr('based_on')} · {tr('rev_sub')}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVIEWS.map((r, i) => (
          <motion.figure
            key={r.id}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}
            className="card-lift glass-soft rounded-3xl p-5 flex flex-col"
          >
            <div className="flex items-center gap-1 mb-3"><Stars value={r.rating} size={14} /></div>
            <blockquote className="text-[13px] leading-6 text-white/75 flex-1">“{isAr ? r.text : r.text_fr}”</blockquote>
            <figcaption className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff2a85] to-[#ffd000] flex items-center justify-center font-black text-[#280645] text-sm shrink-0">
                {(isAr ? r.name : r.name).charAt(0)}
              </span>
              <span>
                <span className="block text-[13px] font-black">{r.name}</span>
                <span className="block text-[11px] text-white/50">{r.city} · {r.product}</span>
              </span>
              <BadgeCheck size={16} className="ms-auto text-emerald-300 shrink-0" />
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function Social() {
  const { tr } = useStore();
  const socials = [
    { icon: Instagram, n: '128K', l: 'Instagram', c: 'from-[#ff2a85] to-[#a4139e]' },
    { icon: Music2, n: '86K', l: 'TikTok', c: 'from-[#25F4EE] to-[#010101]' },
    { icon: Facebook, n: '64K', l: 'Facebook', c: 'from-[#1877F2] to-[#0d3b8a]' },
    { icon: Youtube, n: '32K', l: 'YouTube', c: 'from-[#FF0000] to-[#7a0000]' },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 mt-14 sm:mt-20">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden">
        <div className="absolute -top-24 start-1/3 w-72 h-72 bg-[#ff2a85]/20 blur-[100px] rounded-full" />
        <h2 className="font-display font-black text-2xl sm:text-3xl relative">{tr('social_title')}</h2>
        <p className="text-xs sm:text-sm text-white/55 mt-2 relative">{tr('social_sub')}</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-7 relative">
          {socials.map((s) => (
            <a key={s.l} href="#" onClick={(e) => e.preventDefault()} className="card-lift glass-soft rounded-2xl p-5 flex flex-col items-center gap-2 group">
              <span className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.c} flex items-center justify-center group-hover:scale-110 transition`}><s.icon size={22} className="text-white" /></span>
              <span className="font-display font-black text-lg" dir="ltr">{s.n}</span>
              <span className="text-[11px] text-white/55 font-bold">{s.l}</span>
            </a>
          ))}
        </div>
        <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3 relative">
          <Link to="/menu" className="btn-shine px-8 py-3.5 rounded-2xl bg-gradient-to-l from-[#ff2a85] to-[#ffd000] font-black text-sm text-white hover:scale-105 transition inline-flex items-center justify-center gap-2">
            <Truck size={16} />{tr('hero_cta_menu')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Marquee />
      <Signature />
      <div className="max-w-7xl mx-auto px-4 mt-10"><LoyaltyBanner /></div>
      <Combos />
      <Reviews />
      <Social />
    </div>
  );
}
