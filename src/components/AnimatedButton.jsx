import { useRef, useState } from 'react';

/**
 * Mirrors Dart's _AnimatedButton / _CtaButton: hover scale-up, idle shimmer
 * sweep on primary buttons, and a tap ripple that bursts from the click point.
 */
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
      onMouseLeave={() => {
        setHover(false);
        setPressed(false);
      }}
      onMouseDown={(e) => {
        setPressed(true);
        fire(e);
      }}
      onMouseUp={() => setPressed(false)}
      onClick={onClick}
      className={[
        'relative inline-flex items-center gap-2 overflow-hidden rounded-[10px]',
        'px-5 py-3.5 text-sm font-bold transition-transform duration-150 ease-out',
        pressed ? 'scale-[0.96]' : hover ? 'scale-[1.045]' : 'scale-100',
        primary
          ? 'text-white bg-gradient-to-br from-[#2F6FED] to-[#3B82F6]'
          : 'text-[#F3F6FB] bg-[#0A0E17] border',
        primary ? '' : hover ? 'border-[#2F6FED]/50' : 'border-[#1A2233]',
        className,
      ].join(' ')}
      style={
        primary
          ? {
              boxShadow: hover
                ? '0 8px 32px -2px rgba(47,111,237,0.4)'
                : '0 8px 15px -4px rgba(47,111,237,0.25)',
            }
          : hover
          ? { boxShadow: '0 6px 20px -6px rgba(47,111,237,0.15)' }
          : undefined
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

/** Solid nav "Let's Talk" pill — mirrors theme.dart's PrimaryButton. */
export function PrimaryButton({ label, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className={`rounded-lg px-[22px] py-3 text-sm font-semibold text-white transition-transform duration-150 ${
        hover ? 'scale-[1.02]' : ''
      }`}
      style={{
        background: hover
          ? 'linear-gradient(to bottom right,#4C86FF,#22D3EE)'
          : 'linear-gradient(to bottom right,#2F6FED,#1B3E99)',
        boxShadow: `0 8px ${hover ? 28 : 14}px 0 rgba(47,111,237,${hover ? 0.45 : 0.25})`,
      }}
    >
      {label}
    </button>
  );
}

// In AnimatedButton.jsx or create it:
export function SecondaryButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-[#6FA0FF]/30 px-8 py-3.5 font-semibold text-[#F3F6FB] transition-all duration-300 hover:border-[#6FA0FF] hover:bg-[#6FA0FF]/10"
    >
      {label}
    </button>
  );
}