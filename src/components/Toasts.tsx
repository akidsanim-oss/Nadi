import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, Gift, PartyPopper } from 'lucide-react';
import { useStore } from '../lib/store';

export default function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-24 inset-x-0 z-[90] flex flex-col items-center gap-2 px-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className={`pointer-events-auto flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-black shadow-2xl border backdrop-blur-xl ${t.tone === 'gold' ? 'bg-[#2a0a45]/95 border-[#ffd000]/50 text-[#ffe57f]' : t.tone === 'pink' ? 'bg-[#3d0a2e]/95 border-[#ff2a85]/50 text-white' : 'bg-[#0a2e1c]/95 border-emerald-400/50 text-emerald-100'}`}
          >
            {t.tone === 'gold' ? <Gift size={16} className="text-[#ffd000]" /> : t.tone === 'pink' ? <PartyPopper size={16} className="text-[#ff2a85]" /> : <BadgeCheck size={16} className="text-emerald-300" />}
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
