import { Link } from 'react-router-dom';
import { Clock, Gem, Instagram, Facebook, MapPin, Phone, Truck } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { Logo } from './Navbar';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-20 border-t border-[#e8b84a]/15 bg-[#0c0218] relative overflow-hidden">
      <div className="absolute inset-0 pattern-zellige opacity-60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-7 text-white/60">{t('ft.desc')}</p>
          <div className="flex gap-2 mt-5">
            {[Instagram, Facebook, Gem].map((I, i) => (
              <a key={i} href="#" onClick={e => e.preventDefault()} className="w-10 h-10 grid place-items-center rounded-full chip hover:border-[#e8b84a]/60 hover:text-[#f5d67b] transition">
                <I className="w-4.5 h-4.5 w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-black text-[#f5d67b] mb-4">{t('ft.links')}</h4>
          <ul className="space-y-2.5 text-sm text-white/65">
            <li><Link to="/menu" className="hover:text-[#f5d67b]">{t('nav.menu')}</Link></li>
            <li><Link to="/loyalty" className="hover:text-[#f5d67b]">{t('nav.loyalty')}</Link></li>
            <li><Link to="/stores" className="hover:text-[#f5d67b]">{t('nav.stores')}</Link></li>
            <li><Link to="/orders" className="hover:text-[#f5d67b]">{t('nav.orders')}</Link></li>
            <li><Link to="/favorites" className="hover:text-[#f5d67b]">{t('nav.fav')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-[#f5d67b] mb-4">{t('ft.contact')}</h4>
          <ul className="space-y-3 text-sm text-white/65">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#ff7ab8]" /> Maârif, Casablanca — Maroc</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#ff7ab8]" /> <span dir="ltr">+212 6 61 00 00 00</span></li>
            <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#ff7ab8]" /> 10:00 — 23:00</li>
            <li className="flex items-center gap-2"><Truck className="w-4 h-4 text-[#ff7ab8]" /> 30 min</li>
          </ul>
        </div>
        <div className="glass rounded-3xl p-5">
          <h4 className="font-black gold-text text-lg">{t('loyal.title')}</h4>
          <p className="text-xs text-white/60 mt-2 leading-6">{t('loyal.desc')}</p>
          <Link to="/loyalty" className="btn-gold mt-4 inline-flex h-10 px-5 items-center rounded-full text-sm font-black">{t('loyal.cta')}</Link>
        </div>
      </div>
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-white/40">
          <span>{t('ft.rights')}</span>
          <span className="text-center">{t('ft.stack')}</span>
        </div>
      </div>
    </footer>
  );
}
