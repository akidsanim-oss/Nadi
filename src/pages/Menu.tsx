import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, CupSoda, Leaf, LayoutGrid, Milk, Search, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../lib/data';
import { useLang } from '../lib/i18n';
import ProductCard from '../components/ProductCard';

const FILTERS = [
  { id: 'all', icon: LayoutGrid },
  { id: 'milkshake', icon: Milk },
  { id: 'jus', icon: CupSoda },
  { id: 'signature', icon: Crown },
  { id: 'healthy', icon: Leaf },
] as const;

type Sort = 'pop' | 'asc' | 'desc' | 'rating';

export default function Menu() {
  const { t, isAr } = useLang();
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') ?? 'all';
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<Sort>('pop');

  const list = useMemo(() => {
    let l = [...PRODUCTS];
    if (cat !== 'all') l = l.filter(p => p.category === cat);
    if (q.trim().length > 0) {
      const s = q.trim().toLowerCase();
      l = l.filter(p => p.nameAr.includes(q.trim()) || p.nameFr.toLowerCase().includes(s) || p.shortAr.includes(q.trim()) || p.shortFr.toLowerCase().includes(s));
    }
    if (sort === 'asc') l.sort((a, b) => a.price - b.price);
    if (sort === 'desc') l.sort((a, b) => b.price - a.price);
    if (sort === 'rating') l.sort((a, b) => b.rating - a.rating);
    if (sort === 'pop') l.sort((a, b) => b.reviewsCount - a.reviewsCount);
    return l;
  }, [cat, q, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-4">
      <div className="text-center max-w-2xl mx-auto">
        <span className="chip rounded-full px-4 py-1.5 text-xs font-black text-[#f5d67b]">✦ JAWHARA MENU ✦</span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-black"><span className="gold-text">{t('menu.title')}</span></h1>
        <p className="mt-3 text-white/55">{t('menu.sub')}</p>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 flex-1">
          {FILTERS.map(f => (
            <button key={f.id} onClick={() => setParams(f.id === 'all' ? {} : { cat: f.id })}
              className={`shrink-0 h-12 px-5 rounded-full font-black text-sm flex items-center gap-2 border transition ${cat === f.id ? 'btn-gold border-transparent' : 'chip text-white/70 hover:border-[#e8b84a]/50'}`}>
              <f.icon className="w-4 h-4" />
              {f.id === 'all' ? t('menu.all') : t(`cat.${f.id}`)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <label className="relative flex-1 lg:w-64">
            <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-white/40" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder={t('menu.search')}
              className="w-full h-12 rounded-full bg-white/5 border border-white/10 ps-11 pe-4 text-sm placeholder:text-white/35" />
          </label>
          <label className="relative">
            <SlidersHorizontal className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-white/40 pointer-events-none" />
            <select value={sort} onChange={e => setSort(e.target.value as Sort)}
              className="h-12 rounded-full bg-white/5 border border-white/10 ps-11 pe-4 text-sm font-bold appearance-none cursor-pointer">
              <option value="pop">{t('menu.sort_pop')}</option>
              <option value="rating">{t('menu.sort_rating')}</option>
              <option value="asc">{t('menu.sort_price_asc')}</option>
              <option value="desc">{t('menu.sort_price_desc')}</option>
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-white/45 font-bold">{list.length} {t('menu.results')}</p>

      {list.length === 0 ? (
        <div className="mt-10 glass rounded-[28px] p-14 text-center">
          <div className="text-5xl">💎</div>
          <p className="mt-4 font-black text-lg">{t('menu.empty')}</p>
        </div>
      ) : (
        <motion.div layout className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </motion.div>
      )}
      <div className="hidden">{isAr ? '' : ''}</div>
    </div>
  );
}
