import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bike, Clock, MapPin, Phone } from 'lucide-react';
import { useLang } from '../lib/i18n';

const STORES = [
  { city_ar: 'الدار البيضاء — المعاريف', city_fr: 'Casablanca — Maârif', addr_ar: 'شارع يعقوب المنصور، رقم 12', addr_fr: '12, Bd Yacoub El Mansour', phone: '+212 6 61 11 22 33', img: '/images/shop-interior.jpg' },
  { city_ar: 'الرباط — أكدال', city_fr: 'Rabat — Agdal', addr_ar: 'شارع الأمم المتحدة، رقم 45', addr_fr: '45, Av. des Nations Unies', phone: '+212 6 61 44 55 66', img: '/images/shake-strawberry.jpg' },
  { city_ar: 'مراكش — جيليز', city_fr: 'Marrakech — Guéliz', addr_ar: 'شارع محمد الخامس، رقم 8', addr_fr: '8, Av. Mohammed V', phone: '+212 6 61 77 88 99', img: '/images/shake-mango.jpg' },
  { city_ar: 'أكادير — الحي السويسري', city_fr: 'Agadir — Quartier Suisse', addr_ar: 'شارع الحسن الثاني', addr_fr: 'Av. Hassan II', phone: '+212 6 62 00 11 22', img: '/images/shake-orange.jpg' },
  { city_ar: 'طنجة — بوليفار', city_fr: 'Tanger — Boulevard', addr_ar: 'بوليفار باستور، رقم 21', addr_fr: '21, Bd Pasteur', phone: '+212 6 62 33 44 55', img: '/images/shake-oreo.jpg' },
  { city_ar: 'فاس — أكدال', city_fr: 'Fès — Agdal', addr_ar: 'طريق إيموزار، المركب التجاري', addr_fr: 'Rte d’Imouzzer, Centre commercial', phone: '+212 6 62 66 77 88', img: '/images/shake-avocado.jpg' },
];

export default function Stores() {
  const { t, isAr } = useLang();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
      <h1 className="text-3xl sm:text-4xl font-black text-center"><span className="gold-text">{t('stores.title')}</span></h1>
      <p className="text-center mt-2 text-white/55">{t('stores.sub')}</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {STORES.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * .08 }}
            className="glass rounded-[28px] overflow-hidden card-shine group">
            <div className="relative h-48 overflow-hidden">
              <img src={s.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12041f] to-transparent" />
              <span className="absolute bottom-3 start-4 flex items-center gap-1.5 text-xs font-black bg-black/45 backdrop-blur px-3 py-1.5 rounded-full border border-white/15">
                <Clock className="w-3.5 h-3.5 text-[#f5d67b]" /> {t('st.hours')}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-black text-lg">{isAr ? s.city_ar : s.city_fr}</h3>
              <p className="mt-1 text-sm text-white/55 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#ff7ab8]" /> {isAr ? s.addr_ar : s.addr_fr}</p>
              <p className="mt-1 text-sm text-white/55 flex items-center gap-1.5"><Phone className="w-4 h-4 text-[#ff7ab8]" /> <span dir="ltr">{s.phone}</span></p>
              <Link to="/menu" className="btn-gold mt-4 w-full h-11 rounded-full font-black text-sm flex items-center justify-center gap-1.5">
                <Bike className="w-4 h-4" /> {t('st.order_here')}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
