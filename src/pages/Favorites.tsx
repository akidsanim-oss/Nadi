import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { productById } from '../lib/data';
import { useLang } from '../lib/i18n';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';

export default function Favorites() {
  const { t } = useLang();
  const { favs } = useStore();
  const list = favs.map(productById).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
      <h1 className="text-3xl sm:text-4xl font-black text-center"><span className="gold-text">{t('fav.title')}</span> <span className="text-lg text-white/40">({list.length})</span></h1>
      {list.length === 0 ? (
        <div className="max-w-xl mx-auto pt-12 text-center">
          <div className="mx-auto w-24 h-24 grid place-items-center rounded-full glass"><Heart className="w-10 h-10 text-[#ff7ab8]" /></div>
          <p className="mt-6 text-white/55 leading-8">{t('fav.empty')}</p>
          <Link to="/menu" className="btn-gold mt-6 inline-flex px-8 py-3.5 rounded-full font-black">{t('cart.empty_cta')}</Link>
        </div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((p, i) => p && <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
