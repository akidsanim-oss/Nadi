import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShieldCheck, Plane } from 'lucide-react';
import { byId, byCollection, SIZES } from '../lib/products';
import { useI18n } from '../lib/i18n';
import { useCart } from '../lib/cart';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { id = '' } = useParams();
  const { t, lang, fmtPrice } = useI18n();
  const { add } = useCart();
  const product = byId(id);
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-sand">{t('notfound')}</h1>
        <Link to="/" className="mt-6 inline-block rounded-full bg-crimson text-sand font-bold px-6 py-3">
          {t('co.back')}
        </Link>
      </main>
    );
  }

  const related = byCollection(product.collections[0])
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    add(product.id, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
      <Link
        to={`/collection/${product.collections[0]}`}
        className="inline-flex items-center gap-1.5 text-sm text-smoke hover:text-gold transition-colors"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t('cart.continue')}
      </Link>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden border border-line bg-panel"
        >
          <img src={product.image} alt={product.name[lang]} className="w-full aspect-[4/5] object-cover" />
          {product.number != null && (
            <span className="absolute top-5 end-5 font-display text-7xl text-sand/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              {product.number}
            </span>
          )}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {product.player && (
            <p className="font-cond uppercase tracking-[0.25em] text-gold text-sm">{product.player}</p>
          )}
          <h1 className="mt-1 font-display text-4xl sm:text-5xl text-sand leading-tight">
            {product.name[lang]}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gold">{fmtPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-lg text-smoke line-through">{fmtPrice(product.compareAt)}</span>
            )}
          </div>

          <p className="mt-5 text-smoke leading-relaxed">{product.desc[lang]}</p>

          {/* Size */}
          <div className="mt-7">
            <p className="font-cond uppercase tracking-widest text-sm text-sand mb-3">{t('p.size')}</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-11 w-14 rounded-xl border font-bold text-sm transition-colors cursor-pointer ${
                    size === s
                      ? 'border-crimson bg-crimson text-sand'
                      : 'border-line bg-panel text-smoke hover:border-gold hover:text-sand'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + add */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-line bg-panel px-2 py-1.5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-2 text-smoke hover:text-sand cursor-pointer"
                aria-label="-"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-bold text-sand">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="p-2 text-smoke hover:text-sand cursor-pointer"
                aria-label="+"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={`flex-1 min-w-[200px] rounded-full font-bold py-4 transition-colors cursor-pointer ${
                added ? 'bg-palm text-sand' : 'bg-crimson hover:bg-blood text-sand'
              }`}
            >
              {added ? t('p.added') : `${t('p.add')} · ${fmtPrice(product.price * qty)}`}
            </button>
          </div>

          {/* Shipping & authenticity */}
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-line bg-panel p-5 flex gap-3">
              <Plane className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sand text-sm">{t('p.shipping')}</p>
                <p className="mt-1 text-sm text-smoke leading-relaxed">{t('p.shipping.body')}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-panel p-5 flex gap-3">
              <ShieldCheck className="h-5 w-5 text-fern shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sand text-sm">{t('vp.authentic')}</p>
                <p className="mt-1 text-sm text-smoke leading-relaxed">{t('vp.authentic.sub')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="pt-16">
          <h2 className="font-display text-3xl sm:text-4xl text-sand mb-6">{t('p.related')}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
