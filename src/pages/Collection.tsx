import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getCollection, byCollection } from '../lib/products';
import { useI18n } from '../lib/i18n';
import ProductCard from '../components/ProductCard';

export default function Collection() {
  const { slug = '' } = useParams();
  const { t, lang } = useI18n();
  const collection = getCollection(slug);
  const items = byCollection(slug);

  if (!collection) {
    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-sand">{t('notfound')}</h1>
        <Link to="/" className="mt-6 inline-block rounded-full bg-crimson text-sand font-bold px-6 py-3">
          {t('co.back')}
        </Link>
      </main>
    );
  }

  return (
    <main>
      {/* Collection hero */}
      <section className="relative h-[300px] sm:h-[380px] overflow-hidden">
        <img src={collection.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
        <div className="absolute inset-0 zellige-dense opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 h-full flex flex-col justify-end pb-10">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-smoke hover:text-gold transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t('nav.home')}
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl sm:text-7xl text-sand"
          >
            {collection.name[lang]}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-xl text-smoke"
          >
            {collection.blurb[lang]}
          </motion.p>
          <p className="mt-2 text-xs text-gold font-cond uppercase tracking-widest">
            {items.length} {t('products.count')}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
