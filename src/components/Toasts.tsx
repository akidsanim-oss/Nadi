import { AnimatePresence, motion } from 'framer-motion';
import { Gem } from 'lucide-react';
import { useStore } from '../lib/store';

export default function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-6 inset-x-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id} initial={{ y: 30, opacity: 0, scale: .95 }} animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: .95 }}
            className="glass-strong rounded-full px-5 py-3 flex items-center gap-2.5 text-sm font-bold shadow-2xl border-[#e8b84a]/30">
            <span className="w-7 h-7 grid place-items-center rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#7c3aed]">
              <Gem className="w-4 h-4 text-white" />
            </span>
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
