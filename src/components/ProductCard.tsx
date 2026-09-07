import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Plus, Star } from 'lucide-react';
import type { Product } from '../lib/types';
import { mad, useLang } from '../lib/i18n';
import { useStore } from '../lib/store';

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} style={{ width: size, height: size }}
          className={i <= Math.round(rating) ? 'fill-[#e8b84a] text-[#e8b84a]' : 'text-white/25'} />
      ))}
    </span>
  );
}

export default function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const { t, locale, isAr } = useLang();
  const { addToCart, pushToast, favs, toggleFav } = useStore();
  const isFav = favs.includes(p.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: .5, delay: (index % 4) * .07 }}
      className="group relative glass rounded-[26px] overflow-hidden card-shine hover:border-[#e8b84a]/45 transition-colors flex flex-col">
      <Link to={`/product/${p.slug}`} className="relative block h-56 overflow-hidden">
        <img src={p.image} alt={isAr ? p.nameAr : p.nameFr} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12041f] via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-[#ff4d8d]/25 to-transparent" />
        {(isAr ? p.badgeAr : p.badgeFr) && (
          <span className="absolute top-3 start-3 text-[11px] font-black px-3 py-1.5 rounded-full bg-gradient-to-l from-[#ff4d8d] to-[#c026d3] shadow-lg">
            {isAr ? p.badgeAr : p.badgeFr}
          </span>
        )}
        <button
          onClick={e => {
            e.preventDefault();
            const added = toggleFav(p.id);
            pushToast(added ? t('toast.fav_add') : t('toast.fav_rm'));
          }}
          aria-label="favorite"
          className={`absolute top-3 end-3 w-9 h-9 grid place-items-center rounded-full backdrop-blur-md border transition ${isFav ? 'bg-[#ff4d8d] border-[#ff4d8d] text-white' : 'bg-black/30 border-white/20 text-white/80 hover:text-[#ff7ab8]'}`}>
          <Heart className={`w-4.5 h-4.5 w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
        </button>
        {p.oldPrice && (
          <span className="absolute bottom-3 end-3 text-[11px] font-black px-2.5 py-1 rounded-full bg-[#e8b84a] text-[#2a0a10]">
            -{Math.round((1 - p.price / p.oldPrice) * 100)}%
          </span>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-white/55">
          <Stars rating={p.rating} />
          <span className="font-bold text-white/80">{p.rating.toFixed(1)}</span>
          <span>({p.reviewsCount} {t('prod.reviews')})</span>
        </div>
        <Link to={`/product/${p.slug}`}>
          <h3 className="mt-2 font-black text-[17px] leading-7 group-hover:text-[#f5d67b] transition-colors">
            {isAr ? p.nameAr : p.nameFr}
          </h3>
        </Link>
        <p className="text-[13px] text-white/55 leading-6 mt-1 line-clamp-1">{isAr ? p.shortAr : p.shortFr}</p>
        <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between border-t border-white/10">
          <div>
            <div className="text-[11px] text-white/45">{t('prod.from')}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-[#f5d67b]">{mad(p.price, locale)}</span>
              {p.oldPrice && <span className="text-xs text-white/35 line-through">{mad(p.oldPrice, locale)}</span>}
            </div>
          </div>
          <button
            onClick={() => { addToCart({ productId: p.id, sizeId: 'classic', extrasIds: [], qty: 1 }); pushToast(t('toast.added')); }}
            className="btn-gold h-11 px-4 rounded-full font-black text-sm flex items-center gap-1.5">
            <Plus className="w-4 h-4" strokeWidth={3} /> {t('prod.add')}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
