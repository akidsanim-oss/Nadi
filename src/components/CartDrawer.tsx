import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../lib/cart';
import { useI18n } from '../lib/i18n';
import { byId } from '../lib/products';

export default function CartDrawer() {
  const { items, isOpen, closeCart, remove, setQty, subtotal } = useCart();
  const { t, lang, dir, fmtPrice } = useI18n();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-night/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-y-0 end-0 z-50 w-full max-w-md bg-coal border-s border-line flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <h2 className="font-display text-xl text-sand tracking-wide">{t('cart.title')}</h2>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-panel transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-sand" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag className="h-12 w-12 text-smoke/40" />
                <p className="text-sand font-semibold">{t('cart.empty')}</p>
                <p className="text-sm text-smoke">{t('cart.empty.sub')}</p>
                <button
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-crimson hover:bg-blood text-sand text-sm font-bold px-6 py-2.5 transition-colors cursor-pointer"
                >
                  {t('cart.continue')}
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {items.map((item) => {
                    const p = byId(item.productId);
                    if (!p) return null;
                    return (
                      <div key={`${item.productId}-${item.size}`} className="flex gap-3 rounded-xl bg-panel border border-line p-3">
                        <img
                          src={p.image}
                          alt={p.name[lang]}
                          className="h-20 w-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${p.id}`}
                            onClick={closeCart}
                            className="text-sm font-semibold text-sand hover:text-gold line-clamp-1"
                          >
                            {p.name[lang]}
                          </Link>
                          <p className="text-xs text-smoke mt-0.5">
                            {t('p.size')}: {item.size}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-line">
                              <button
                                onClick={() => setQty(item.productId, item.size, item.qty - 1)}
                                className="p-1.5 text-smoke hover:text-sand cursor-pointer"
                                aria-label="-"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-bold w-5 text-center text-sand">{item.qty}</span>
                              <button
                                onClick={() => setQty(item.productId, item.size, item.qty + 1)}
                                className="p-1.5 text-smoke hover:text-sand cursor-pointer"
                                aria-label="+"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-gold">{fmtPrice(p.price * item.qty)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => remove(item.productId, item.size)}
                          className="self-start p-1.5 text-smoke hover:text-crimson transition-colors cursor-pointer"
                          aria-label={t('cart.remove')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-line px-5 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-smoke">{t('cart.subtotal')}</span>
                    <span className="font-display text-xl text-sand">{fmtPrice(subtotal)}</span>
                  </div>
                  <p className="text-[11px] text-smoke/80 leading-relaxed">🇲🇦 {t('cart.duties')}</p>
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="block w-full rounded-full bg-crimson hover:bg-blood text-center text-sand font-bold py-3.5 transition-colors"
                  >
                    {t('cart.checkout')}
                  </Link>
                  <button
                    onClick={closeCart}
                    className="block w-full text-center text-sm text-smoke hover:text-sand transition-colors cursor-pointer"
                  >
                    {t('cart.continue')}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
