import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bike, CheckCircle2, ClipboardList, CookingPot, Hourglass, PackageX, RotateCcw } from 'lucide-react';
import { mad, useLang } from '../lib/i18n';
import { useStore } from '../lib/store';
import type { OrderStatus } from '../lib/types';

const FLOW: OrderStatus[] = ['pending', 'preparing', 'onway', 'delivered'];

export default function Orders() {
  const { t, locale, isAr } = useLang();
  const { orders, reorder, advanceOrder, pushToast } = useStore();
  const navigate = useNavigate();

  const iconFor = (s: OrderStatus) =>
    s === 'pending' ? Hourglass : s === 'preparing' ? CookingPot : s === 'onway' ? Bike : s === 'delivered' ? CheckCircle2 : PackageX;

  if (orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 pt-16 text-center">
        <div className="mx-auto w-24 h-24 grid place-items-center rounded-full glass"><ClipboardList className="w-10 h-10 text-[#e8b84a]" /></div>
        <h1 className="mt-6 text-3xl font-black">{t('ord.title')}</h1>
        <p className="mt-2 text-white/55">{t('ord.empty')}</p>
        <Link to="/menu" className="btn-gold mt-6 inline-flex px-8 py-3.5 rounded-full font-black">{t('cart.empty_cta')}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
      <h1 className="text-3xl sm:text-4xl font-black text-center"><span className="gold-text">{t('ord.title')}</span></h1>
      <p className="text-center mt-2 text-white/55">{t('ord.sub')}</p>
      <div className="mt-8 space-y-5">
        {orders.map((o, idx) => {
          const stepIdx = FLOW.indexOf(o.status);
          const Icon = iconFor(o.status);
          return (
            <motion.div key={o.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * .06 }}
              className="glass-strong rounded-[28px] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-black text-lg" dir="ltr">{o.code}</div>
                  <div className="text-xs text-white/45 mt-0.5">{new Date(o.date).toLocaleString(locale === 'ar' ? 'ar-MA' : 'fr-MA')}</div>
                </div>
                <span className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black ${
                  o.status === 'delivered' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30' :
                  o.status === 'cancelled' ? 'bg-red-500/15 text-red-300 border border-red-400/30' :
                  'bg-[#e8b84a]/10 text-[#f5d67b] border border-[#e8b84a]/30'}`}>
                  <Icon className="w-4 h-4" /> {t(`ord.status_${o.status}`)}
                </span>
              </div>

              {o.status !== 'cancelled' && o.status !== 'delivered' && (
                <div className="mt-5">
                  <div className="flex items-center">
                    {FLOW.map((f, i) => (
                      <div key={f} className="flex-1 flex items-center last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className={`w-9 h-9 grid place-items-center rounded-full border text-xs font-black ${i <= stepIdx ? 'bg-gradient-to-br from-[#e8b84a] to-[#c9962b] text-[#2a0a10] border-transparent' : 'chip text-white/35'}`}>
                            {i + 1}
                          </span>
                          <span className={`text-[10px] font-bold whitespace-nowrap ${i <= stepIdx ? 'text-[#f5d67b]' : 'text-white/35'}`}>{t(`ord.status_${f}`)}</span>
                        </div>
                        {i < FLOW.length - 1 && <span className={`flex-1 h-0.5 mx-1 mb-6 rounded ${i < stepIdx ? 'bg-[#e8b84a]' : 'bg-white/10'}`} />}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => advanceOrder(o.id)}
                    className="mt-3 text-[11px] font-bold text-white/35 hover:text-[#f5d67b] underline underline-offset-4">
                    {isAr ? 'محاكاة: تقديم المرحلة (Mock)' : 'Simuler : avancer l’étape (Mock)'} →
                  </button>
                </div>
              )}

              <div className="mt-5 space-y-2.5">
                {o.items.map(it => (
                  <div key={it.key} className="flex items-center gap-3">
                    <img src={it.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-black truncate">{isAr ? it.nameAr : it.nameFr}</div>
                      <div className="text-[11px] text-white/45">× {it.qty}</div>
                    </div>
                    <div className="text-sm font-black text-[#f5d67b]">{mad(it.unitPrice * it.qty, locale)}</div>
                  </div>
                ))}
              </div>
              <div className="dotted-line my-4" />
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-white/60">{o.city} • {o.payment === 'cod' ? t('co.cod') : o.payment === 'card' ? t('co.card') : t('co.mobile')}</div>
                <div className="font-black text-xl gold-text">{mad(o.total, locale)}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => { reorder(o); pushToast(t('toast.added')); navigate('/cart'); }}
                  className="h-11 px-5 rounded-full border border-[#e8b84a]/40 text-sm font-black text-[#f5d67b] hover:bg-[#e8b84a]/10 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4" /> {t('ord.reorder')}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
