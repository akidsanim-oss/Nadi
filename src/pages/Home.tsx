import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Plane, RefreshCcw, Star } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { collections, newArrivals, players, byId } from '../lib/products';
import ProductCard from '../components/ProductCard';

function BuyNowButton({ small = false }: { small?: boolean }) {
  const { t } = useI18n();
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-crimson group-hover:bg-gold group-hover:text-night text-sand font-bold transition-colors ${
        small ? 'px-4 py-2 text-xs' : 'px-5 py-2.5 text-sm'
      }`}
    >
      {t('buy.now')}
      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
    </span>
  );
}

export default function Home() {
  const { t, lang, fmtPrice } = useI18n();
  const arrivals = newArrivals();

  const marqueeItems = ['DIMA MAGHRIB', 'ديما مغرب', 'ATLAS LIONS', 'أسود الأطلس', 'WORLD CUP 2026', 'كأس العالم 2026'];

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="relative min-h-[82vh] flex items-end overflow-hidden">
        <img
          src="/images/hero.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/20" />
        <div className="absolute inset-0 zellige-dense opacity-60" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-16 pt-40 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-cond uppercase tracking-[0.3em] text-gold text-sm mb-4 flex items-center gap-2"
          >
            <Star className="h-4 w-4 fill-gold" /> {t('hero.kicker')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-6xl sm:text-8xl lg:text-9xl leading-[0.95] text-sand"
          >
            {t('hero.title1')}{' '}
            <span className="text-crimson drop-shadow-[0_0_30px_rgba(193,39,45,0.5)]">{t('hero.title2')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 max-w-xl text-smoke text-base sm:text-lg leading-relaxed"
          >
            {t('hero.sub')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/collection/official"
              className="rounded-full bg-crimson hover:bg-blood text-sand font-bold px-7 py-3.5 transition-colors"
            >
              {t('hero.cta1')}
            </Link>
            <Link
              to="/collection/players"
              className="rounded-full border-2 border-sand/40 hover:border-gold hover:text-gold text-sand font-bold px-7 py-3.5 transition-colors"
            >
              {t('hero.cta2')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="bg-crimson py-3 overflow-hidden border-y-2 border-gold/60" dir="ltr">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex shrink-0">
              {marqueeItems.map((m, i) => (
                <span key={`${rep}-${i}`} className="font-display text-sand text-lg px-8 flex items-center gap-8 whitespace-nowrap">
                  {m} <Star className="h-4 w-4 fill-gold text-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ COLLECTIONS ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl text-sand">{t('sec.collections')}</h2>
            <p className="mt-2 text-smoke">{t('sec.collections.sub')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.5) }}
              className={i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
            >
              <Link
                to={`/collection/${c.slug}`}
                className="group relative block h-full min-h-[260px] rounded-2xl overflow-hidden border border-line hover:border-gold/60 transition-colors"
              >
                <img
                  src={c.image}
                  alt={c.name[lang]}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/30 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-5 min-h-[260px]">
                  <h3 className={`font-display text-sand ${i === 0 ? 'text-4xl sm:text-5xl' : 'text-2xl'}`}>
                    {c.name[lang]}
                  </h3>
                  <p className="mt-1.5 text-sm text-smoke max-w-xs line-clamp-2">{c.blurb[lang]}</p>
                  <div className="mt-4">
                    <BuyNowButton small={i !== 0} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ WORLD CUP 2026 BANNER ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-gold/40"
        >
          <img src="/images/wc2026.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/70 to-night/20 rtl:bg-gradient-to-l" />
          <div className="relative px-6 sm:px-12 py-14 sm:py-20 max-w-2xl">
            <span className="inline-block rounded-full bg-gold text-night text-xs font-bold tracking-widest uppercase px-3 py-1.5">
              {t('wc.kicker')}
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl text-sand leading-tight">{t('wc.title')}</h2>
            <p className="mt-4 text-smoke leading-relaxed">{t('wc.sub')}</p>
            <p className="mt-3 text-gold text-sm font-bold">✦ {t('promo.code')}</p>
            <Link to="/collection/players" className="group inline-block mt-6">
              <BuyNowButton />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ============ SHOP BY PLAYER ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-16">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl text-sand">{t('sec.players')}</h2>
            <p className="mt-2 text-smoke">{t('sec.players.sub')}</p>
          </div>
          <Link
            to="/collection/players"
            className="shrink-0 font-cond uppercase tracking-widest text-sm text-gold hover:text-sand transition-colors flex items-center gap-1"
          >
            {t('sec.viewall')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {players.map((pl, i) => {
            const product = byId(pl.productId)!;
            return (
              <motion.div
                key={pl.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="group relative block rounded-2xl overflow-hidden border border-line hover:border-crimson transition-colors bg-panel"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={product.image}
                      alt={pl.name}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/90 to-transparent" />
                    <span className="absolute top-3 end-3 font-display text-6xl text-sand/20 group-hover:text-crimson/60 transition-colors">
                      {pl.number}
                    </span>
                    <div className="absolute bottom-0 inset-x-0 p-4">
                      <p className="font-display text-xl sm:text-2xl text-sand leading-tight">{pl.name}</p>
                      <p className="text-xs text-gold mt-1">{pl.role[lang]}</p>
                      <p className="text-sm text-smoke mt-1.5 font-bold">{fmtPrice(product.price)}</p>
                      <div className="mt-3">
                        <BuyNowButton small />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ============ NEW ARRIVALS ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-16">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl text-sand">{t('sec.new')}</h2>
            <p className="mt-2 text-smoke">{t('sec.new.sub')}</p>
          </div>
          <Link
            to="/collection/official"
            className="shrink-0 font-cond uppercase tracking-widest text-sm text-gold hover:text-sand transition-colors flex items-center gap-1"
          >
            {t('sec.viewall')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {arrivals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ============ VALUE PROPS ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, title: t('vp.authentic'), sub: t('vp.authentic.sub') },
            { icon: Plane, title: t('vp.ship'), sub: t('vp.ship.sub') },
            { icon: RefreshCcw, title: t('vp.returns'), sub: t('vp.returns.sub') },
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-panel border border-line p-6 zellige"
            >
              <v.icon className="h-7 w-7 text-gold" />
              <h3 className="mt-3 font-display text-xl text-sand">{v.title}</h3>
              <p className="mt-1.5 text-sm text-smoke leading-relaxed">{v.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
