import { motion } from 'framer-motion';
import swittixLogo from '../assets/images/swittixlogo.png';

export function Loader({ variant = 'full' }) {
  const isFull = variant === 'full';
  const ringSize = isFull ? 140 : 100;
  const glowSize = isFull ? 320 : 220;
  const logoSize = isFull ? 96 : 68;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#05070C]"
    >
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <div
          className="relative flex items-center justify-center"
          style={{ width: ringSize, height: ringSize }}
        >
          <div
            className="animate-glow-pulse pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: glowSize,
              height: glowSize,
              background:
                'radial-gradient(circle, #2F6FED 0%, #3B82F6 40%, transparent 70%)',
            }}
          />

          <div
            className="absolute inset-0 animate-spin rounded-full"
            style={{
              border: '3px solid rgba(59,130,246,0.15)',
              borderTopColor: '#3B82F6',
              borderRightColor: '#6FA0FF',
              animationDuration: '900ms',
            }}
          />

          <div
            className="relative flex items-center justify-center rounded-full bg-[#05070C]"
            style={{ width: logoSize, height: logoSize }}
          >
            <img
              src={swittixLogo}
              alt="Swittix Technologies"
              className="animate-pulse-dot w-full object-contain"
              style={{ animationDuration: '1600ms' }}
            />
          </div>
        </div>

        {isFull && (
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <span className="text-base sm:text-lg font-bold tracking-[3px] sm:tracking-[4px] text-[#F3F6FB]">
              SWITTIX
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-[2px] sm:tracking-[3px] text-[#5B677E]">
              TECHNOLOGIES
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}