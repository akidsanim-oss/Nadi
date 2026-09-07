import { Link } from 'react-router-dom';
import { Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../lib/store';

export default function LoyaltyBanner() {
  const { tr, user } = useStore();
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative glass-panel rounded-3xl p-6 sm:p-8 overflow-hidden"
    >
      <div className="absolute -top-20 -end-20 w-64 h-64 rounded-full bg-[#ff2a85]/25 blur-3xl" />
      <div className="absolute -bottom-24 -start-16 w-72 h-72 rounded-full bg-[#ffd000]/15 blur-3xl" />
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ffd000] to-[#ff2a85] flex items-center justify-center shadow-[0_0_26px_rgba(255,208,0,.5)] shrink-0 animate-floaty">
            <Crown size={30} className="text-[#280645]" />
          </div>
          <div>
            <h3 className="font-display font-black text-lg sm:text-2xl">{tr('loyalty_title')}</h3>
            <p className="text-xs sm:text-sm text-white/65 mt-1 leading-6">{tr('loyalty_desc')}</p>
            {user && (
              <p className="text-xs font-black text-[#ffd000] mt-2 flex items-center gap-1.5">
                <Sparkles size={13} />{tr('loyalty_have')}: {user.points} {tr('loyalty_pts')}
              </p>
            )}
          </div>
        </div>
        <Link to={user ? '/mon-compte' : '/compte'} className="btn-shine shrink-0 px-7 py-3.5 rounded-2xl bg-[#ffd000] text-[#280645] font-black text-sm hover:bg-white hover:scale-105 transition shadow-[0_0_22px_rgba(255,208,0,.45)]">
          {tr('loyalty_cta')}
        </Link>
      </div>
    </motion.section>
  );
}
