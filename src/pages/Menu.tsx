import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Package, Search, SearchX, SlidersHorizontal } from 'lucide-react';
import { COMBOS, PRODUCTS } from '../lib/data';
import type { Category, Product } from '../lib/types';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

type Sort = 'pop' | 'asc' | 'desc' | 'rating';

const TABS: { id: Category | 'all'; ar: string; fr: string }[] = [
  { id: 'all', ar: 'الكل', fr: 'Tout' },
  { id: 'milkshakes', ar: 'ميلك شيك', fr: 'Milkshakes' },
  { id: 'smoothies', ar: 'سموذي', fr: 'Smoothies' },
  { id: 'juices', ar: 'عصائر وزعزع', fr: 'Jus & ZaaZaa' },
];

export default function Menu() {
  const { tr, isAr, addToCart, toast } = useStore();
  const [cat, setCat] = useState<Category | 'all'>('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<Sort>('pop');
  const [custom, setCustom] = useState<Product | null>(null);

  const list = useMemo(() => {
    let l = [...PRODUCTS];
    if (cat !== 'all') l = l.filter((p) => p.category === cat);
    const needle = q.trim().toLowerCase();
    if (needle) l = l.filter((p) => `${p.name} ${p.name_fr} ${p.description} ${p.description_fr}`.toLowerCase().includes(needle));
    switch (sort) {
      case 'asc': l.sort((a, b) => a.price - b.price); break;
      case 'desc': l.sort((a, b) => b.price - a.price); break;
      case 'rating': l.sort((a, b) => b.rating - a.rating); break;
      default: l.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
    return l;
  }, [cat, q, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-black tracking-[.25em] text-[#ff2a85]">✦ LA CARTE</span>
        <h1 className="font-display font-black text-3xl sm:text-5xl mt-2">{tr('menu_title')}</h1>
        <p className="text-xs sm:text-sm text-white/55 mt-3">{tr('menu_sub')}</p>
      </div>

      {/* toolbar */}
      <div className="glass-panel rounded-3xl p-4 sm:p-5 mt-8 flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3">
          <label className="flex items-center gap-2 flex-1 bg-black/40 border border-white/15 rounded-2xl px-4 py-3 focus-within:border-[#ffd000]/60 transition">
            <Search size={17} className="text-[#ffd000] shrink-0" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr('search_ph')} className="bg-transparent outline-none w-full text-sm font-bold placeholder:text-white/30 placeholder:font-medium" />
          </label>
          <label className="flex items-center gap-2 bg-black/40 border border-white/15 rounded-2xl px-4 py-3 md:w-64 focus-within:border-[#ffd000]/60 transition">
            <SlidersHorizontal size={16} className="text-[#ffd000] shrink-0" />
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="bg-transparent outline-none w-full text-[13px] font-bold cursor-pointer">
              <option value="pop">{tr('sort_pop')}</option>
              <option value="asc">{tr('sort_price_asc')}</option>
              <option value="desc">{tr('sort_price_desc')}</option>
              <option value="rating">{tr('sort_rating')}</option>
            </select>
          </label>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setCat(t.id)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-[13px] font-black transition ${cat === t.id ? 'bg-gradient-to-l from-[#ff2a85] to-[#a4139e] text-white shadow-[0_0_16px_rgba(255,42,133,.5)]' : 'glass-soft text-white/70 hover:text-[#ffd000] hover:border-[#ffd000]/40'}`}
            >
              {isAr ? t.ar : t.fr}
            </button>
          ))}
          <span className="ms-auto self-center text-[11px] text-white/45 font-bold whitespace-nowrap hidden sm:block" dir="ltr">{list.length} / {PRODUCTS.length}</span>
        </div>
      </div>

      {/* grid */}
      {list.length ? (
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.25 }}>
                <ProductCard p={p} index={i} onCustomize={setCustom} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="glass-soft rounded-3xl p-12 mt-6 text-center">
          <SearchX size={40} className="mx-auto text-white/25" />
          <p className="mt-4 font-black text-white/70">{tr('no_result')}</p>
          <button onClick={() => { setQ(''); setCat('all'); }} className="mt-4 px-6 py-2.5 rounded-xl bg-[#ffd000] text-[#280645] text-sm font-black hover:bg-white transition">{isAr ? 'إعادة الضبط' : 'Réinitialiser'}</button>
        </div>
      )}

      {/* combos */}
      <div className="mt-14">
        <h2 className="font-display font-black text-xl sm:text-2xl flex items-center gap-2 mb-5"><Package size={22} className="text-[#ffd000]" />{tr('combos_in_menu')}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {COMBOS.map((c) => (
            <div key={c.id} className="card-lift glass-panel rounded-3xl overflow-hidden flex flex-col sm:flex-row">
              <div className="relative sm:w-40 h-40 sm:h-auto shrink-0"><img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" /></div>
              <div className="p-5 flex-1">
                <h3 className="font-display font-black">{isAr ? c.name : c.name_fr}</h3>
                <p className="text-xs text-white/60 mt-1">{isAr ? c.desc : c.desc_fr}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-display font-black text-xl text-[#ffd000]" dir="ltr">{c.price} <span className="text-xs line-through text-white/30 font-bold">{c.oldPrice}</span> <span className="text-[11px]">{tr('currency')}</span></span>
                  <button
                    onClick={() => { addToCart({ key: `${c.id}|pack|`, productId: c.id, name: c.name, name_fr: c.name_fr, image: c.image, size: isAr ? 'بوكس' : 'Pack', size_fr: 'Pack', extras: [], unitPrice: c.price, qty: 1 }); toast(`${isAr ? c.name : c.name_fr} — ${tr('added_toast')} ✨`, 'pink'); }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-l from-[#ff2a85] to-[#a4139e] text-xs font-black hover:scale-105 transition"
                  >
                    {tr('combo_add')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductModal product={custom} onClose={() => setCustom(null)} />
    </div>
  );
}
