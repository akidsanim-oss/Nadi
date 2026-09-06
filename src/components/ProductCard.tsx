import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../lib/products';
import { useI18n } from '../lib/i18n';
import { useCart } from '../lib/cart';

const badgeStyles: Record<string, string> = {
  new: 'bg-palm text-sand',
  promo: 'bg-gold text-night',
  wc: 'bg-crimson text-sand',
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { t, lang, fmtPrice } = useI18n();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const badgeKey = product.badge ? `p.${product.badge}` : null;

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product.id, 'M');
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.4) }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block rounded-2xl overflow-hidden bg-panel border border-line hover:border-gold/60 transition-colors"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-sand/5">
          <img
            src={product.image}
            alt={product.name[lang]}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {badgeKey && (
            <span
              className={`absolute top-3 start-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase ${badgeStyles[product.badge!]}`}
            >
              {t(badgeKey)}
            </span>
          )}
          {product.number != null && (
            <span className="absolute bottom-3 end-3 font-display text-4xl text-sand/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
              {product.number}
            </span>
          )}
          <button
            onClick={quickAdd}
            aria-label={t('p.add')}
            className={`absolute bottom-3 start-3 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
              added
                ? 'bg-palm text-sand'
                : 'bg-night/80 backdrop-blur text-sand opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-crimson'
            }`}
          >
            <Plus className="h-3.5 w-3.5" />
            {added ? t('p.added') : t('p.add')}
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-sand leading-snug line-clamp-2">{product.name[lang]}</h3>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-gold font-bold">{fmtPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-xs text-smoke line-through">{fmtPrice(product.compareAt)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
