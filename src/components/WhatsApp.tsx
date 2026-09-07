import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../lib/store';

export default function WhatsApp() {
  const { tr } = useStore();
  return (
    <motion.a
      href="https://wa.me/212661234567?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%AC%D9%88%D9%87%D8%B1%D8%A9%20%F0%9F%92%8E%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D9%86%D8%B7%D9%84%D8%A8"
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 16 }}
      whileHover={{ scale: 1.1, rotate: 6 }}
      className="group fixed bottom-5 end-5 z-[80] w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_8px_30px_rgba(16,185,129,.55)]"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
      <MessageCircle size={26} className="relative text-white fill-white/20" />
      <span className="pointer-events-none absolute bottom-full mb-2 end-0 whitespace-nowrap text-[11px] font-black px-3 py-1.5 rounded-full bg-[#18022b] border border-[#ffd000]/40 text-[#ffd000] opacity-0 group-hover:opacity-100 transition">
        {tr('wa_tooltip')}
      </span>
    </motion.a>
  );
}
