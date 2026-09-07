import { Link } from 'react-router-dom';
import { Gem } from 'lucide-react';
import { useStore } from '../lib/store';

export default function NotFound() {
  const { isAr } = useStore();
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <Gem size={56} className="mx-auto text-[#ffd000]" />
      <h1 className="font-display font-black text-6xl mt-4 gem-text" dir="ltr">404</h1>
      <p className="text-white/60 mt-2 font-bold">{isAr ? 'هذه الصفحة ضاعت بين الجواهر…' : 'Cette page s’est perdue parmi les joyaux…'}</p>
      <Link to="/" className="inline-block mt-6 px-8 py-3.5 rounded-2xl bg-gradient-to-l from-[#ff2a85] to-[#a4139e] font-black text-sm">{isAr ? 'العودة للرئيسية' : 'Retour à l’accueil'}</Link>
    </div>
  );
}
