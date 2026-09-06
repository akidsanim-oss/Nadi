import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, CheckCircle2, PartyPopper } from 'lucide-react';
import { useCart } from '../lib/cart';
import { useI18n } from '../lib/i18n';
import { byId } from '../lib/products';

const COUNTRIES = [
  'Morocco 🇲🇦',
  'France 🇫🇷',
  'Spain 🇪🇸',
  'Belgium 🇧🇪',
  'Netherlands 🇳🇱',
  'Germany 🇩🇪',
  'United Kingdom 🇬🇧',
  'United States 🇺🇸',
  'Canada 🇨🇦',
  'UAE 🇦🇪',
  'Qatar 🇶🇦',
  'Saudi Arabia 🇸🇦',
];

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const { t, lang, fmtPrice } = useI18n();
  const [placed, setPlaced] = useState(false);
  const [orderNo] = useState(() => `ATL-${Math.floor(100000 + Math.random() * 900000)}`);
  const [country, setCountry] = useState(COUNTRIES[0]);

  const shippingFree = subtotal >= 800;
  const shipping = shippingFree ? 0 : 79;
  const total = subtotal + (items.length ? shipping : 0);

  const inputCls =
    'w-full rounded-xl bg-panel border border-line px-4 py-3 text-sm text-sand placeholder:text-smoke/50 focus:outline-none focus:border-gold transition-colors';

  if (placed) {
    return (
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="mx-auto h-20 w-20 rounded-full bg-palm/20 border border-palm flex items-center justify-center">
            <PartyPopper className="h-9 w-9 text-fern" />
          </div>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl text-sand">{t('co.success.title')}</h1>
          <p className="mt-4 text-smoke leading-relaxed">{t('co.success.body')}</p>
          <div className="mt-6 inline-block rounded-xl bg-panel border border-line px-6 py-4">
            <p className="text-xs text-smoke uppercase tracking-widest">{t('co.success.order')}</p>
            <p className="mt-1 font-display text-2xl text-gold">{orderNo}</p>
          </div>
          <p className="mt-6 text-xs text-smoke/80 max-w-md mx-auto leading-relaxed">🇲🇦 {t('co.duties.note')}</p>
          <Link
            to="/"
            className="mt-8 inline-block rounded-full bg-crimson hover:bg-blood text-sand font-bold px-8 py-3.5 transition-colors"
          >
            {t('co.back')}
          </Link>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-sand">{t('cart.empty')}</h1>
        <p className="mt-3 text-smoke">{t('cart.empty.sub')}</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-crimson hover:bg-blood text-sand font-bold px-8 py-3.5 transition-colors"
        >
          {t('cart.continue')}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-smoke hover:text-gold transition-colors">
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t('cart.continue')}
      </Link>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl text-sand">{t('co.title')}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setPlaced(true);
          window.scrollTo(0, 0);
        }}
        className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-10 pb-10"
      >
        {/* Form */}
        <div className="lg:col-span-3 space-y-8">
          <section>
            <h2 className="font-cond uppercase tracking-widest text-gold text-sm mb-4">{t('co.contact')}</h2>
            <input type="email" required placeholder={t('co.email')} className={inputCls} />
          </section>

          <section>
            <h2 className="font-cond uppercase tracking-widest text-gold text-sm mb-4">{t('co.shipto')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required placeholder={t('co.fname')} className={inputCls} />
              <input required placeholder={t('co.lname')} className={inputCls} />
              <input required placeholder={t('co.address')} className={`${inputCls} sm:col-span-2`} />
              <input required placeholder={t('co.city')} className={inputCls} />
              <input required placeholder={t('co.zip')} className={inputCls} />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`${inputCls} sm:col-span-2 cursor-pointer`}
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c} className="bg-panel">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            {country !== COUNTRIES[0] && (
              <p className="mt-3 text-xs text-gold/90 leading-relaxed rounded-lg bg-gold/10 border border-gold/30 px-4 py-3">
                ⚠️ {t('co.duties.note')}
              </p>
            )}
          </section>

          <section>
            <h2 className="font-cond uppercase tracking-widest text-gold text-sm mb-4 flex items-center gap-2">
              <Lock className="h-3.5 w-3.5" /> {t('co.payment')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                required
                inputMode="numeric"
                placeholder={`${t('co.card')} · 4242 4242 4242 4242`}
                className={`${inputCls} sm:col-span-2`}
              />
              <input required placeholder={t('co.exp')} className={inputCls} />
              <input required placeholder={t('co.cvc')} className={inputCls} />
            </div>
          </section>

          <button
            type="submit"
            className="w-full rounded-full bg-crimson hover:bg-blood text-sand font-bold text-lg py-4 transition-colors cursor-pointer"
          >
            {t('co.place')} · {fmtPrice(total)}
          </button>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-2">
          <div className="rounded-2xl bg-panel border border-line p-6 sticky top-24">
            <h2 className="font-display text-2xl text-sand mb-5">{t('co.summary')}</h2>
            <div className="space-y-4 max-h-72 overflow-y-auto pe-1">
              {items.map((item) => {
                const p = byId(item.productId);
                if (!p) return null;
                return (
                  <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img src={p.image} alt="" className="h-14 w-12 rounded-lg object-cover" />
                      <span className="absolute -top-1.5 -end-1.5 h-5 min-w-5 rounded-full bg-crimson text-[10px] font-bold text-sand flex items-center justify-center px-1">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-sand line-clamp-1">{p.name[lang]}</p>
                      <p className="text-[11px] text-smoke">
                        {t('p.size')}: {item.size}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-gold">{fmtPrice(p.price * item.qty)}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-line space-y-2 text-sm">
              <div className="flex justify-between text-smoke">
                <span>{t('cart.subtotal')}</span>
                <span>{fmtPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-smoke">
                <span>{t('co.shipping')}</span>
                <span className={shippingFree ? 'text-fern font-bold' : ''}>
                  {shippingFree ? t('co.shipping.free') : fmtPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-line">
                <span className="font-bold text-sand">{t('co.total')}</span>
                <span className="font-display text-xl text-gold">{fmtPrice(total)}</span>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-smoke/80 leading-relaxed flex gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-fern shrink-0 mt-0.5" />
              {t('co.duties.note')}
            </p>
          </div>
        </aside>
      </form>

    </main>
  );
}
