import { motion } from 'framer-motion';
import { SwittixIcon } from './SwittixIcon'; // adjust path to wherever you saved it
import { colors } from '../theme';

// variant="full"  -> first page load: icon plays its entrance animation, then calls onComplete
// variant="route" -> quick route change: static icon, no animation, no waiting
export function Loader({ variant = 'full', onComplete }) {
  const isFull = variant === 'full';
  const logoWidth = isFull ? 140 : 100;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ backgroundColor: colors.bg }}
    >
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <div style={{ width: logoWidth }}>
          <SwittixIcon
            className="w-full h-auto"
            color={colors.textPrimary}
            animate={isFull}
            onComplete={isFull ? onComplete : undefined}
          />
        </div>

        {isFull && (
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <span className="text-base sm:text-lg font-bold tracking-[3px] sm:tracking-[4px]" style={{ color: colors.textPrimary }}>
              SWITTIX
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-[2px] sm:tracking-[3px]" style={{ color: colors.textMuted }}>
              TECHNOLOGIES
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Loader;