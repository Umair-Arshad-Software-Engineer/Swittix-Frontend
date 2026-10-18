import { useRef, useState } from 'react';
import { colors } from '../theme';

export function AnimatedButton({ label, icon, primary = false, onClick, className = '' }) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const idRef = useRef(0);

  const fire = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = idRef.current++;
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPressed(false); }}
      onMouseDown={(e) => { setPressed(true); fire(e); }}
      onMouseUp={() => setPressed(false)}
      onClick={onClick}
      className={[
        'relative inline-flex items-center gap-1.5 sm:gap-2 overflow-hidden rounded-[10px]',
        'px-3 sm:px-5 py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold transition-transform duration-150 ease-out',
        pressed ? 'scale-[0.96]' : hover ? 'scale-[1.045]' : 'scale-100',
        className,
      ].join(' ')}
      style={
        primary
          ? {
              color: colors.textOnAccent,
              background: colors.gradientPrimary,
              boxShadow: hover
                ? '0 8px 32px -2px rgba(47,111,237,0.4)'
                : '0 8px 15px -4px rgba(47,111,237,0.25)',
            }
          : {
              color: colors.textPrimary,
              backgroundColor: colors.surface,
              border: `1px solid ${hover ? colors.primaryBorderSoft : colors.border}`,
              boxShadow: hover ? '0 6px 20px -6px rgba(47,111,237,0.15)' : 'none',
            }
      }
    >
      {primary && (
        <span className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      )}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ripple"
          style={{
            left: rp.x,
            top: rp.y,
            background: primary ? 'rgba(255,255,255,0.35)' : 'rgba(47,111,237,0.35)',
          }}
        />
      ))}
      <span className="relative z-10">{label}</span>
      {icon && (
        <span
          className={`relative z-10 flex items-center transition-transform duration-200 ${
            hover ? 'translate-x-1' : ''
          }`}
        >
          {icon}
        </span>
      )}
    </button>
  );
}

export function PrimaryButton({ label, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className={`rounded-lg px-4 sm:px-[22px] py-2 sm:py-3 text-xs sm:text-sm font-semibold transition-transform duration-150 ${
        hover ? 'scale-[1.02]' : ''
      }`}
      style={{
        background: hover ? colors.gradientPrimaryHover : colors.gradientPrimary,
        color: colors.textOnAccent,
        boxShadow: `0 8px ${hover ? 28 : 14}px 0 rgba(47,111,237,${hover ? 0.45 : 0.25})`,
      }}
    >
      {label}
    </button>
  );
}

export function SecondaryButton({ label, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className="rounded-full px-4 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-300"
      style={{
        color: hover ? colors.primary : colors.textPrimary,
        border: `1px solid ${hover ? colors.primary : colors.borderStrong}`,
        backgroundColor: hover ? colors.primarySoft : 'transparent',
      }}
    >
      {label}
    </button>
  );
}