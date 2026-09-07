import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Award, Bike, Clock, Crown, CupSoda, Gem, Gift, Heart, Leaf, MapPin, Milk, Sparkles, Star, Truck } from 'lucide-react';
import { PRODUCTS } from '../lib/data';
import { mad, useLang } from '../lib/i18n';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';

function Marquee() {
  const { t } = useLang();
  const items = [t('marquee.1'), t('marquee.2'), t('marquee.3'), t('marquee.4'), t('marquee.5')];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[#e8b84a]/20 bg-[#0c0218]/80 py-3" dir="ltr">
      <div className="marquee-track gap-8">
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-2 text-sm font-bold text-[#f5d67b] whitespace-nowrap px-2">
            <Gem className="w-4 h-4 text-[#ff4d8d]" /> {m} <Gem className="w-4 h-4 text-[#ff4d8d]" />
          </span>
        ))}
      </div>
    </div>
  );
}

const CATS = [
  { id: 'milkshake', icon: Milk, grad: 'from-pink-500 to-fuchsia-600', img: '/images/shake-oreo.jpg' },
  { id: 'jus', icon: CupSoda, grad: 'from-amber-400 to-orange-600', img: '/images/shake-orange.jpg' },
  { id: 'signature', icon: Crown, grad: 'from-violet-600 to-purple-900', img: '/images/shake-pistachio.jpg' },
  { id: 'healthy', icon: Leaf, grad: 'from-emerald-500 to-lime-600', img: '/images/shake-avocado.jpg' },
] as const;

export default function Home() {
  const { t, locale, isAr } = useLang();
  const { addToCart, pushToast } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const best = [...PRODUCTS].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 4);
  const signature = PRODUCTS.find(p => p.id === 'p7')!;

  const testimonials = isAr ? [
    { n: 'سلمى من الدار البيضاء', x: 'باناشي جوهرة أجمل شيء ذقته! الطبقات الثلاث تحفة فنية والطعم خيال. التوصيل وصل في 25 دقيقة مثلجاً.', r: 5 },
    { n: 'يوسف من مراكش', x: 'الفستق بالذهب تجربة ملكية حقيقية. قدموه أمامي وزينوه برقائق الذهب — حسيت راسي سلطان.', r: 5 },
    { n: 'خديجة من الرباط', x: 'أخيراً مكان يستعمل فواكه حقيقية بدون سكر مضاف. عصير البرتقال السوسي صار إدماني الصباحي.', r: 5 },
  ] : [
    { n: 'Salma — Casablanca', x: 'Le panaché Jawhara est la plus belle chose que j’ai goûtée ! Trois couches magnifiques, livraison glacée en 25 minutes.', r: 5 },
    { n: 'Youssef — Marrakech', x: 'La pistache à l’or, une vraie expérience royale. Préparée devant moi, parée d’or — je me suis senti sultan.', r: 5 },
    { n: 'Khadija — Rabat', x: 'Enfin des fruits vrais sans sucre ajouté. Le jus d’orange du Souss est devenu ma routine du matin.', r: 5 },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-zellige opacity-70" />
        <div className="absolute -top-32 -start-32 w-[480px] h-[480px] rounded-full bg-[#7c3aed]/30 blur-[120px]" />
        <div className="absolute top-20 -end-24 w-[420px] h-[420px] rounded-full bg-[#ff4d8d]/25 blur-[120px]" />
        <div className="absolute bottom-0 start-1/3 w-[500px] h-[300px] rounded-full bg-[#e8b84a]/15 blur-[130px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 chip rounded-full px-4 py-2 text-[13px] font-bold text-[#f5d67b]">
              <Sparkles className="w-4 h-4" /> {t('hero.badge')}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}
              className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.15]">
              {t('hero.title1')}<br />
              <span className="gold-text">{t('hero.title2')}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}
              className="mt-6 text-lg text-white/65 leading-9 max-w-xl">{t('hero.sub')}</motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}
              className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu" className="btn-gold h-14 px-8 rounded-full font-black text-[16px] inline-flex items-center gap-2">
                {t('hero.cta1')} <Arrow className="w-5 h-5" />
              </Link>
              <Link to="/menu" className="btn-pink h-14 px-8 rounded-full font-black text-[16px] inline-flex items-center gap-2 text-white">
                <Bike className="w-5 h-5" /> {t('hero.cta2')}
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}
              className="mt-10 flex items-center gap-8">
              {[
                { n: t('hero.stat1_n'), l: t('hero.stat1_l') },
                { n: t('hero.stat2_n'), l: t('hero.stat2_l') },
                { n: t('hero.stat3_n'), l: t('hero.stat3_l') },
              ].map((s, i) => (
                <div key={i} className={i > 0 ? 'border-s border-white/10 ps-8' : ''}>
                  <div className="text-2xl sm:text-3xl font-black gold-text">{s.n}</div>
                  <div className="text-xs text-white/55 mt-1 font-bold">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }}
            className="relative">
            <div className="absolute inset-6 rounded-[40px] bg-gradient-to-br from-[#ff4d8d]/40 via-[#7c3aed]/30 to-[#e8b84a]/30 blur-2xl" />
            <div className="relative rounded-[36px] overflow-hidden border border-[#e8b84a]/30 shadow-[0_40px_100px_-20px_rgba(255,77,141,.4)]">
              <img src="/images/hero-shakes.png" alt="Jawhara" className="w-full h-[420px] sm:h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12041f]/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 inset-x-5 glass-strong rounded-3xl p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-black">{t('hero.card_title')}</div>
                  <div className="text-xs text-white/60 mt-0.5">{t('hero.card_sub')}</div>
                  <div className="text-sm mt-1.5"><span className="text-white/50 text-xs">{t('hero.price_from')} </span><span className="font-black text-[#f5d67b]">{mad(48, locale)}</span></div>
                </div>
                <button onClick={() => { addToCart({ productId: 'p9', sizeId: 'classic', extrasIds: [], qty: 1 }); pushToast(t('toast.added')); }}
                  className="btn-gold h-12 px-6 rounded-full font-black text-sm shrink-0">{t('prod.add')}</button>
              </div>
            </div>
            <div className="absolute -top-5 -end-3 sm:end-6 glass rounded-2xl px-4 py-3 flex items-center gap-2.5 float-slow shadow-xl">
              <span className="w-9 h-9 grid place-items-center rounded-full bg-gradient-to-br from-[#e8b84a] to-[#c9962b]"><Award className="w-5 h-5 text-[#2a0a10]" /></span>
              <span className="text-xs font-black leading-5">N°1<br /><span className="text-[#f5d67b]">Casablanca 2026</span></span>
            </div>
          </motion.div>
        </div>
      </section>

      <Marquee />

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="chip rounded-full px-4 py-1.5 text-xs font-black text-[#ff7ab8]">✦ {t('cat.title')} ✦</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black">{t('cat.title')}</h2>
          <p className="mt-2 text-white/55">{t('cat.sub')}</p>
        </div>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATS.map((c, i) => (
            <motion.button key={c.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
              onClick={() => navigate(`/menu?cat=${c.id}`)}
              className="group relative rounded-[26px] overflow-hidden h-56 sm:h-64 text-start border border-white/10 hover:border-[#e8b84a]/50 transition">
              <img src={c.img} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className={`absolute inset-0 bg-gradient-to-t from-[#12041f] via-[#12041f]/40 to-transparent`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${c.grad} opacity-20 group-hover:opacity-35 transition`} />
              <span className={`absolute top-4 start-4 w-11 h-11 grid place-items-center rounded-2xl bg-gradient-to-br ${c.grad} shadow-lg`}>
                <c.icon className="w-5 h-5 text-white" />
              </span>
              <span className="absolute bottom-4 start-4 end-4">
                <span className="block font-black text-lg">{t(`cat.${c.id}`)}</span>
                <span className="block text-xs text-white/60 mt-0.5">{t(`cat.${c.id}_d`)}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="chip rounded-full px-4 py-1.5 text-xs font-black text-[#f5d67b]">✦ {t('best.title')} ✦</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black">{t('best.title')}</h2>
            <p className="mt-2 text-white/55">{t('best.sub')}</p>
          </div>
          <Link to="/menu" className="hidden sm:inline-flex h-12 px-6 items-center gap-2 rounded-full border border-[#e8b84a]/40 font-black text-sm text-[#f5d67b] hover:bg-[#e8b84a]/10 transition shrink-0">
            {t('best.all')} <Arrow className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {best.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link to="/menu" className="inline-flex h-12 px-6 items-center gap-2 rounded-full border border-[#e8b84a]/40 font-black text-sm text-[#f5d67b]">{t('best.all')}</Link>
        </div>
      </section>

      {/* SIGNATURE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-[36px] overflow-hidden border border-[#e8b84a]/30">
          <img src={signature.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12041f]/95 via-[#2a0a4a]/80 to-[#12041f]/30" style={{ background: 'linear-gradient(to left, rgba(18,4,31,.96), rgba(42,10,74,.82) 55%, rgba(18,4,31,.35))' }} />
          <div className="absolute inset-0 pattern-zellige" />
          <div className="relative p-8 sm:p-14 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-[#ff4d8d] to-[#c026d3] px-4 py-2 text-xs font-black"><Crown className="w-4 h-4" /> {t('sig.badge')}</span>
            <h2 className="mt-5 text-3xl sm:text-5xl font-black leading-snug"><span className="gold-text">{t('sig.title')}</span></h2>
            <p className="mt-4 text-white/70 leading-8">{t('sig.desc')}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button onClick={() => navigate(`/product/${signature.slug}`)} className="btn-gold h-13 py-3.5 px-8 rounded-full font-black inline-flex items-center gap-2">
                {t('sig.cta')} <Arrow className="w-5 h-5" />
              </button>
              <span className="text-sm font-bold text-[#f5d67b] flex items-center gap-1.5"><Clock className="w-4 h-4" /> {t('sig.note')}</span>
            </div>
            <div className="mt-5 font-black text-2xl">{mad(signature.price, locale)} <span className="text-sm text-white/40 line-through font-normal">{mad(signature.oldPrice!, locale)}</span></div>
          </div>
        </motion.div>
      </section>

      {/* CRAFT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: isAr ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="relative order-2 lg:order-1">
          <div className="rounded-[36px] overflow-hidden border border-[#e8b84a]/25">
            <img src="/images/about-craft.jpg" alt="craft" className="w-full h-[440px] object-cover" />
          </div>
          <div className="absolute -bottom-6 start-6 end-6 sm:end-auto glass-strong rounded-3xl p-4 flex items-center gap-4 shadow-2xl">
            <span className="gem-spin w-12 h-12 grid place-items-center rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#ff4d8d]"><Gem className="w-6 h-6 text-white" /></span>
            <span><span className="block font-black gold-text text-lg">100% {isAr ? 'طبيعي' : 'Naturel'}</span><span className="text-xs text-white/55">{isAr ? 'بدون مواد حافظة أبداً' : 'Jamais de conservateurs'}</span></span>
          </div>
        </motion.div>
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl sm:text-4xl font-black">{t('craft.title')}</h2>
          <p className="mt-2 text-white/55">{t('craft.sub')}</p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { tt: t('craft.1t'), dd: t('craft.1d'), ic: Sparkles },
              { tt: t('craft.2t'), dd: t('craft.2d'), ic: Milk },
              { tt: t('craft.3t'), dd: t('craft.3d'), ic: CupSoda },
              { tt: t('craft.4t'), dd: t('craft.4d'), ic: Crown },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
                className="glass rounded-3xl p-5 hover:border-[#e8b84a]/40 transition">
                <span className="w-11 h-11 grid place-items-center rounded-2xl bg-gradient-to-br from-[#ff4d8d] to-[#7c3aed]"><c.ic className="w-5 h-5 text-white" /></span>
                <h3 className="mt-3 font-black">{c.tt}</h3>
                <p className="mt-1.5 text-[13px] text-white/55 leading-6">{c.dd}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <h2 className="text-center text-3xl sm:text-4xl font-black">{t('steps.title')}</h2>
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { tt: t('steps.1t'), dd: t('steps.1d'), ic: Heart, n: '1' },
            { tt: t('steps.2t'), dd: t('steps.2d'), ic: Star, n: '2' },
            { tt: t('steps.3t'), dd: t('steps.3d'), ic: Truck, n: '3' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}
              className="relative glass rounded-[28px] p-7 text-center overflow-hidden">
              <span className="absolute top-3 end-5 text-6xl font-black text-white/5">{s.n}</span>
              <span className="mx-auto w-14 h-14 grid place-items-center rounded-full btn-gold"><s.ic className="w-6 h-6" /></span>
              <h3 className="mt-4 font-black text-lg">{s.tt}</h3>
              <p className="mt-1.5 text-sm text-white/55">{s.dd}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <h2 className="text-center text-3xl sm:text-4xl font-black">{t('testi.title')}</h2>
        <p className="text-center mt-2 text-white/55">{t('testi.sub')}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {testimonials.map((r, i) => (
            <motion.figure key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}
              className="glass rounded-[28px] p-6 flex flex-col">
              <div className="flex gap-1" dir="ltr">{Array.from({ length: r.r }).map((_, k) => <Star key={k} className="w-4 h-4 fill-[#e8b84a] text-[#e8b84a]" />)}</div>
              <blockquote className="mt-3 text-[15px] leading-8 text-white/75 flex-1">“{r.x}”</blockquote>
              <figcaption className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                <span className="w-11 h-11 grid place-items-center rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#7c3aed] font-black">{r.n[0]}</span>
                <span className="font-bold text-sm">{r.n}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* LOYALTY TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-[36px] overflow-hidden bg-gradient-to-br from-[#3b1163] via-[#2a0a4a] to-[#12041f] border border-[#e8b84a]/30 p-8 sm:p-14 text-center">
          <div className="absolute inset-0 pattern-zellige" />
          <Crown className="relative mx-auto w-14 h-14 text-[#f5d67b]" />
          <h2 className="relative mt-4 text-3xl sm:text-4xl font-black gold-text">{t('loyal.title')}</h2>
          <p className="relative mt-3 max-w-2xl mx-auto text-white/65 leading-8">{t('loyal.desc')}</p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/loyalty" className="btn-gold h-13 py-3.5 px-8 rounded-full font-black inline-flex items-center gap-2"><Gift className="w-5 h-5" /> {t('loyal.cta')}</Link>
            <Link to="/loyalty" className="h-13 py-3.5 px-8 rounded-full font-black border border-white/20 hover:border-[#e8b84a]/50 inline-flex items-center gap-2">{t('loyal.cta2')}</Link>
          </div>
        </motion.div>
      </section>

      {/* STORES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-[32px] overflow-hidden border border-white/10 min-h-[300px] relative">
            <img src="/images/shop-interior.jpg" alt="store" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12041f]/90 to-transparent" />
            <div className="absolute bottom-5 start-5 end-5 flex items-center justify-between gap-3">
              <span className="font-black text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-[#ff7ab8]" /> Maârif, Casablanca</span>
              <Link to="/stores" className="btn-gold h-11 px-5 rounded-full text-sm font-black inline-flex items-center gap-1.5 shrink-0">{t('st.visit')} <Arrow className="w-4 h-4" /></Link>
            </div>
          </div>
          <div className="glass rounded-[32px] p-8 sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-black">{t('news.title')}</h3>
            <p className="mt-2 text-white/55 text-sm leading-7">{t('news.desc')}</p>
            {subscribed ? (
              <div className="mt-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-bold text-sm p-4">✦ {t('news.ok')}</div>
            ) : (
              <form className="mt-5 flex gap-2" onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSubscribed(true); }}>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder={t('news.ph')}
                  className="flex-1 h-13 py-3 px-5 rounded-full bg-white/5 border border-white/10 text-sm placeholder:text-white/35" />
                <button className="btn-gold h-13 py-3 px-7 rounded-full font-black text-sm shrink-0">{t('news.btn')}</button>
              </form>
            )}
            <div className="mt-6 flex items-center gap-5 text-xs text-white/50 font-bold">
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-[#e8b84a]" /> 30 min</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#e8b84a]" /> 10:00 — 23:00</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#e8b84a]" /> 4.9/5</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
