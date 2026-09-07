import { AnimatePresence, motion } from 'framer-motion';
import { Check, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { EXTRAS, SIZES } from '../lib/data';
import type { Product } from '../lib/types';
import { useStore } from '../lib/store';
import { Stars } from './ProductCard';

export default function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { isAr, tr, addToCart, toast } = useStore();
  const [sizeId, setSizeId] = useState('classic');
  const [extras, setExtras] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  useEffect(() => { setSizeId('classic'); setExtras([]); setQty(1); }, [product?.id]);
  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  const unit = useMemo(() => {
    if (!product) return 0;
    const s = SIZES.find((x) => x.id === sizeId);
    const e = extras.reduce((sum, id) => sum + (EXTRAS.find((x) => x.id === id)?.price ?? 0), 0);
    return product.price + (s?.delta ?? 0) + e;
  }, [product, sizeId, extras]);

  if (!product) return null;
  const name = isAr ? product.name : product.name_fr;

  const toggleExtra = (id: string) => setExtras((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const confirm = () => {
    const s = SIZES.find((x) => x.id === sizeId)!;
    const exLabels = extras.map((id) => EXTRAS.find((x) => x.id === id)!).map((e) => (isAr ? e.ar : e.fr));
    addToCart({
      key: `${product.id}|${sizeId}|${[...extras].sort().join(',')}`,
      productId: product.id,
      name: product.name,
      name_fr: product.name_fr,
      image: product.image,
      size: s.ar,
      size_fr: s.fr,
      extras: exLabels,
      unitPrice: unit,
      qty,
    });
    toast(`${name} — ${tr('added_toast')} ✨`, 'pink');
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto no-scrollbar"
          >
            <div className="relative h-56 sm:h-64">
              <img src={product.image} alt={name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#22053a] via-[#22053a]/30 to-transparent" />
              <button onClick={onClose} className="absolute top-4 end-4 w-9 h-9 rounded-full bg-black/60 border border-white/25 flex items-center justify-center hover:border-[#ff2a85] transition" aria-label="close">
                <X size={17} />
              </button>
              <div className="absolute bottom-4 start-5 end-5">
                <h3 className="font-display font-black text-xl sm:text-2xl drop-shadow">{name}</h3>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-white/75">
                  <Stars value={product.rating} size={13} />
                  <span className="font-black text-[#ffd000]" dir="ltr">{product.rating.toFixed(1)} · {product.reviewsCount} {tr('based_on')}</span>
                  <span>·</span><span dir="ltr">{product.calories}</span>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6 space-y-5">
              <p className="text-[13px] leading-6 text-white/70">{isAr ? product.description : product.description_fr}</p>
              <div>
                <h4 className="font-black text-sm text-[#ffd000] mb-2.5">{tr('size')}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSizeId(s.id)}
                      className={`p-3 rounded-2xl border text-center transition ${sizeId === s.id ? 'border-[#ffd000] bg-[#ffd000]/12 text-[#ffd000]' : 'border-white/12 bg-white/5 text-white/75 hover:border-white/30'}`}
                    >
                      <span className="block text-[12px] font-black leading-4">{isAr ? s.ar : s.fr}</span>
                      <span className="block text-[11px] mt-1 opacity-80" dir="ltr">{s.delta === 0 ? '±0' : s.delta > 0 ? `+${s.delta}` : s.delta} {tr('currency')}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-black text-sm text-[#ffd000] mb-2.5">{tr('extras')}</h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {EXTRAS.map((e) => {
                    const on = extras.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        onClick={() => toggleExtra(e.id)}
                        className={`flex items-center justify-between gap-2 p-3 rounded-2xl border text-[12px] font-bold transition ${on ? 'border-[#ff2a85] bg-[#ff2a85]/15 text-white' : 'border-white/12 bg-white/5 text-white/75 hover:border-white/30'}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${on ? 'bg-[#ff2a85] border-[#ff2a85]' : 'border-white/30'}`}>
                            {on && <Check size={13} />}
                          </span>
                          {isAr ? e.ar : e.fr}
                        </span>
                        <span className="text-[#ffd000]" dir="ltr">+{e.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3 glass-soft rounded-2xl px-2 py-1.5">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#ff2a85] transition flex items-center justify-center" aria-label="minus"><Minus size={15} /></button>
                  <span className="font-black text-lg w-6 text-center" dir="ltr">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(20, q + 1))} className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#ffd000] hover:text-black transition flex items-center justify-center" aria-label="plus"><Plus size={15} /></button>
                </div>
                <div className="text-end">
                  <div className="text-[11px] text-white/55 font-bold">{tr('total')}</div>
                  <div className="font-display font-black text-2xl text-[#ffd000]" dir="ltr">{unit * qty} <span className="text-xs">{tr('currency')}</span></div>
                </div>
              </div>
              <button onClick={confirm} className="btn-shine w-full py-4 rounded-2xl bg-gradient-to-l from-[#ff2a85] via-[#a4139e] to-[#ffd000] font-black text-[15px] text-white shadow-[0_0_26px_rgba(255,42,133,.5)] hover:scale-[1.01] active:scale-[.99] transition flex items-center justify-center gap-2">
                <ShoppingBag size={18} />{tr('confirm_add')} · <span dir="ltr">{unit * qty} {tr('currency')}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
