import { motion } from 'framer-motion';
import { Flame, Plus, Settings2, Star } from 'lucide-react';
import type { Product } from '../lib/types';
import { useStore } from '../lib/store';

export function Stars({ value, size = 12 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= Math.round(value) ? 'text-[#ffd000] fill-[#ffd000]' : 'text-white/25'} />
      ))}
    </span>
  );
}

export default function ProductCard({ p, index = 0, onCustomize }: { p: Product; index?: number; onCustomize: (p: Product) => void }) {
  const { isAr, tr, addToCart, toast } = useStore();
  const name = isAr ? p.name : p.name_fr;
  const desc = isAr ? p.description : p.description_fr;

  const quickAdd = () => {
    addToCart({
      key: `${p.id}|classic|`,
      productId: p.id,
      name: p.name,
      name_fr: p.name_fr,
      image: p.image,
      size: 'كلاسيك (500 مل)',
      size_fr: 'Classique (500 ml)',
      extras: [],
      unitPrice: p.price,
      qty: 1,
    });
    toast(`${name} — ${tr('added_toast')} ✨`, 'pink');
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
      className="card-lift glass-panel rounded-3xl overflow-hidden flex flex-col"
    >
      <div className="relative h-52 overflow-hidden group">
        <img src={p.image} alt={name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18022b] via-transparent to-transparent" />
        <span className="absolute top-3 start-3 text-[10px] font-black px-3 py-1.5 rounded-full bg-black/55 backdrop-blur border border-[#ffd000]/40 text-[#ffd000] flex items-center gap-1">
          <Flame size={11} className="text-[#ff2a85]" />{isAr ? p.tag : p.tag_fr}
        </span>
        <span className="absolute top-3 end-3 text-[10px] font-black px-2.5 py-1.5 rounded-full bg-black/55 backdrop-blur border border-white/20 text-white/90" dir="ltr">{p.calories}</span>
        <span className="absolute bottom-3 start-3 flex items-center gap-1.5 text-[11px] font-black px-2.5 py-1 rounded-full bg-black/55 backdrop-blur border border-white/15">
          <Stars value={p.rating} />
          <span className="text-[#ffd000]" dir="ltr">{p.rating.toFixed(1)}</span>
          <span className="text-white/55 font-bold">({p.reviewsCount})</span>
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-display font-black text-[15px] leading-6">{name}</h3>
          <span className="w-3.5 h-3.5 mt-1 rounded-full shrink-0 border border-white/40" style={{ background: p.jewelColor, boxShadow: `0 0 12px ${p.jewelColor}` }} />
        </div>
        <p className="text-[12px] leading-5 text-white/60 line-clamp-2 mb-4">{desc}</p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-black text-xl text-[#ffd000]" dir="ltr">{p.price}</span>
            <span className="text-[11px] font-bold text-white/55">{tr('currency')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {p.customizable && (
              <button onClick={() => onCustomize(p)} className="h-9 px-3 rounded-xl glass-soft text-[12px] font-black text-white/85 hover:text-[#ffd000] hover:border-[#ffd000]/50 transition flex items-center gap-1">
                <Settings2 size={13} />{tr('customize')}
              </button>
            )}
            <button onClick={quickAdd} className="h-9 px-3.5 rounded-xl bg-gradient-to-l from-[#ff2a85] to-[#a4139e] text-[12px] font-black text-white shadow-[0_0_16px_rgba(255,42,133,.45)] hover:scale-105 active:scale-95 transition flex items-center gap-1">
              <Plus size={14} />{tr('add_to_cart')}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
