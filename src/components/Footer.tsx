import { Link } from 'react-router-dom';
import { Clock, Facebook, Gem, Heart, Instagram, MapPin, Music2, Phone, Youtube } from 'lucide-react';
import { CITIES } from '../lib/data';
import { useStore } from '../lib/store';

export default function Footer() {
  const { tr, isAr } = useStore();
  return (
    <footer className="relative mt-20 border-t border-[#ffd000]/20 bg-[#0d0118]/90">
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-l from-transparent via-[#ff2a85] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff2a85] via-[#6b1182] to-[#ffd000] p-[2px]">
              <span className="w-full h-full rounded-2xl bg-[#18022b] flex items-center justify-center"><Gem size={18} className="text-[#ffd000]" /></span>
            </span>
            <span><span className="block font-display font-black text-xl gem-text">جوهرة</span><span className="block text-[9px] tracking-[.3em] text-[#ffd000]/80 font-bold">JAWHARA</span></span>
          </div>
          <p className="text-xs leading-6 text-white/60">{tr('footer_tagline')}</p>
          <div className="flex items-center gap-2 mt-4">
            {[
              { icon: Instagram, label: 'Instagram' },
              { icon: Music2, label: 'TikTok' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Youtube, label: 'YouTube' },
            ].map((s) => (
              <a key={s.label} href="#" onClick={(e) => e.preventDefault()} aria-label={s.label} className="w-9 h-9 rounded-full glass-soft flex items-center justify-center text-white/70 hover:text-[#ffd000] hover:border-[#ffd000]/50 hover:scale-110 transition">
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-black text-sm text-[#ffd000] mb-4">{tr('footer_links')}</h4>
          <ul className="space-y-2.5 text-sm text-white/65 font-bold">
            <li><Link className="hover:text-[#ffd000] transition" to="/menu">{tr('nav_menu')}</Link></li>
            <li><Link className="hover:text-[#ffd000] transition" to="/panier">{tr('cart')}</Link></li>
            <li><Link className="hover:text-[#ffd000] transition" to="/mon-compte">{tr('nav_account')}</Link></li>
            <li><Link className="hover:text-[#ffd000] transition" to="/a-propos">{tr('nav_about')}</Link></li>
            <li><Link className="hover:text-[#ffd000] transition" to="/contact">{tr('nav_contact')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-black text-sm text-[#ffd000] mb-4">{tr('footer_cities')}</h4>
          <ul className="space-y-2.5 text-sm text-white/65 font-bold">
            {CITIES.map((c) => (
              <li key={c.fr} className="flex items-center gap-2"><MapPin size={13} className="text-[#ff2a85]" />{isAr ? c.ar : c.fr}<span className="text-[10px] text-white/40">· {c.time}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-black text-sm text-[#ffd000] mb-4">{tr('footer_contact')}</h4>
          <ul className="space-y-3 text-sm text-white/65 font-bold">
            <li className="flex items-start gap-2"><MapPin size={15} className="text-[#ff2a85] mt-0.5 shrink-0" />{tr('ct_addr')}</li>
            <li className="flex items-center gap-2" dir="ltr"><Phone size={15} className="text-[#ff2a85]" />+212 6 61 23 45 67</li>
            <li className="flex items-center gap-2"><Clock size={15} className="text-[#ff2a85]" />{tr('footer_hours')}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/45 font-bold">
          <span>© 2026 Jawhara — {tr('footer_rights')}</span>
          <span className="flex items-center gap-1">{tr('made_in')} <Heart size={11} className="text-[#ff2a85] fill-[#ff2a85]" /> {isAr ? 'بالمغرب' : 'au Maroc'}</span>
        </div>
      </div>
    </footer>
  );
}
