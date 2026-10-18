import { useEffect, useState } from 'react';
import { AnimatedButton } from './AnimatedButton';
import { colors } from '../theme';

const LINE1 = 'Building Digital\nSolutions That';
const LINE2 = 'Move Businesses\nForward.';
const DESCRIPTION =
  'We architect high-performance custom software, web applications, ' +
  'and business automation platforms designed to scale, ' +
  'streamline operations, and create measurable impact.';

function useTypewriter() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [description, setDescription] = useState('');
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timers = [];

    const typeString = (full, setter, speedMs, onDone) => {
      let i = 0;
      const id = setInterval(() => {
        if (cancelled) return;
        i += 1;
        setter(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(id);
          onDone?.();
        }
      }, speedMs);
      timers.push(id);
    };

    const startId = setTimeout(() => {
      typeString(LINE1, setLine1, 25, () => {
        setPhase(1);
        timers.push(
          setTimeout(() => {
            typeString(LINE2, setLine2, 25, () => {
              setPhase(2);
              timers.push(
                setTimeout(() => {
                  typeString(DESCRIPTION, setDescription, 10, () => setPhase(3));
                }, 300)
              );
            });
          }, 300)
        );
      });
    }, 300);
    timers.push(startId);

    return () => {
      cancelled = true;
      timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
    };
  }, []);

  return { line1, line2, description, phase };
}

function MiniStat({ value, label }) {
  return (
    <div className="flex items-center gap-2 sm:gap-[7px]">
      <span className="text-sm sm:text-[17px] font-extrabold" style={{ color: colors.textPrimary }}>
        {value}
      </span>
      <span className="text-[10px] sm:text-xs" style={{ color: colors.textMuted }}>{label}</span>
    </div>
  );
}

function FloatingCard({ icon, title, value, className = '' }) {
  return (
    <div
      className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-2 py-1.5 sm:px-3 sm:py-2.5 shadow-lg ${className}`}
      style={{
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.surface,
        boxShadow: '0 8px 24px -6px rgba(15,27,45,0.12)',
      }}
    >
      <span className="text-sm sm:text-base" style={{ color: colors.primary }}>{icon}</span>
      <div className="flex flex-col leading-tight">
        <span className="text-[7px] sm:text-[9px]" style={{ color: colors.textMuted }}>{title}</span>
        <span className="text-[10px] sm:text-xs font-extrabold" style={{ color: colors.textPrimary }}>{value}</span>
      </div>
    </div>
  );
}

function HeroVisual() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardHeight = isMobile ? 280 : 370;
  const iconSize = isMobile ? 70 : 115;

  return (
    <div className="relative mx-auto w-full max-w-[430px] sm:max-w-full h-[300px] sm:h-[470px]">
      <div
        className="absolute left-1/2 top-1/2 h-[200px] w-[200px] sm:h-[350px] sm:w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(47,111,237,0.20) 0%, rgba(59,130,246,0.10) 40%, transparent 70%)',
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 w-full max-w-[340px] sm:max-w-[430px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl"
        style={{
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.surface,
        }}
      >
        <div className="grid-pattern absolute inset-0" />
        <div
          className="relative flex h-[40px] sm:h-[52px] items-center gap-1.5 px-3 sm:px-[18px] border-b"
          style={{ borderColor: colors.border, backgroundColor: colors.surfaceAlt }}
        >
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full" style={{ backgroundColor: colors.error }} />
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full" style={{ backgroundColor: colors.accent }} />
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="flex-1" />
          <span className="text-[9px] sm:text-[11px] font-semibold" style={{ color: colors.textMuted }}>
            swittix.com
          </span>
        </div>

        <div className="relative flex items-center justify-center" style={{ height: cardHeight - 40 }}>
          <div
            className="flex items-center justify-center rounded-2xl sm:rounded-[28px]"
            style={{
              width: iconSize,
              height: iconSize,
              background: colors.gradientPrimary,
              boxShadow: '0 0 35px 2px rgba(47,111,237,0.35)',
            }}
          >
            <svg width={isMobile ? 32 : 48} height={isMobile ? 32 : 48} viewBox="0 0 24 24" fill="none">
              <path d="M9 17l-5-5 5-5M15 7l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <FloatingCard
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" fill="currentColor" />
            </svg>
          }
          title="Performance"
          value="98%"
          className="absolute bottom-3 left-2 sm:bottom-[25px] sm:left-[18px]"
        />
        <FloatingCard
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 19a4 4 0 010-8 5 5 0 019.9-1H16a3.5 3.5 0 010 7H6z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M9 15l2 2 4-4" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          }
          title="Cloud Ready"
          value="100%"
          className="absolute right-2 top-14 sm:right-[18px] sm:top-[85px]"
        />
      </div>
    </div>
  );
}

export function Hero({ onNavigate }) {
  const { line1, line2, description, phase } = useTypewriter();

  return (
    <div className="relative mx-auto max-w-[1432px] overflow-hidden px-4 sm:px-6 lg:px-10 pb-8 sm:pb-16 pt-2 sm:pt-3">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[200px] w-[200px] sm:h-[420px] sm:w-[420px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(47,111,237,0.14) 0%, rgba(59,130,246,0.06) 30%, transparent 70%)',
        }}
      />

      <div className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-[6fr_5fr] lg:gap-16">
        <div>
          <div
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 py-1 sm:px-[13px] sm:py-2"
            style={{
              border: `1px solid ${colors.primaryBorderSoft}`,
              backgroundColor: colors.primarySoft,
            }}
          >
            <span className="animate-pulse-dot h-1.5 w-1.5 sm:h-[7px] sm:w-[7px] rounded-full" style={{ backgroundColor: colors.accent }} />
            <span
              className="text-[8px] sm:text-[10.5px] font-bold tracking-wider"
              style={{ color: colors.textSecondary }}
            >
              DIGITAL PRODUCT & SOFTWARE STUDIO
            </span>
          </div>

          <div className="relative mt-4 sm:mt-6" aria-label={LINE1.replace(/\n/g, ' ')}>
            <h1
              aria-hidden="true"
              className="invisible whitespace-pre-line text-[28px] sm:text-[52px] lg:text-[64px] font-extrabold leading-[1.08] tracking-tight"
            >
              {LINE1}
            </h1>
            <h1
              aria-hidden="true"
              className="absolute inset-0 whitespace-pre-line text-[28px] sm:text-[52px] lg:text-[64px] font-extrabold leading-[1.08] tracking-tight"
              style={{ color: colors.textPrimary }}
            >
              {line1}
              {phase === 0 && <span className="cursor-blink" style={{ color: colors.primary }}>|</span>}
            </h1>
          </div>

          <div className="relative" aria-label={LINE2.replace(/\n/g, ' ')}>
            <h1
              aria-hidden="true"
              className="invisible whitespace-pre-line text-[28px] sm:text-[52px] lg:text-[64px] font-extrabold leading-[1.08] tracking-tight"
            >
              {LINE2}
            </h1>
            <h1
              aria-hidden="true"
              className="absolute inset-0 whitespace-pre-line text-[28px] sm:text-[52px] lg:text-[64px] font-extrabold leading-[1.08] tracking-tight"
              style={{
                background: colors.gradientText,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {line2}
              {phase === 1 && <span className="cursor-blink" style={{ color: colors.primary }}>|</span>}
            </h1>
          </div>

          <div className="relative mt-4 sm:mt-6 max-w-xl" aria-label={DESCRIPTION}>
            <p aria-hidden="true" className="invisible text-sm sm:text-[16.5px] leading-[1.65]">
              {DESCRIPTION}
            </p>
            <p
              aria-hidden="true"
              className="absolute inset-0 text-sm sm:text-[16.5px] leading-[1.65]"
              style={{ color: colors.textSecondary }}
            >
              {description}
              {phase === 2 && <span className="cursor-blink" style={{ color: colors.primary }}>|</span>}
            </p>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3.5">
            <AnimatedButton
              label="Start a Project"
              primary
              onClick={() => onNavigate('/start-project')}
              className="text-xs sm:text-sm px-3 sm:px-5 py-2.5 sm:py-3.5"
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <AnimatedButton
              label="Explore Services"
              onClick={() => onNavigate('/services')}
              className="text-xs sm:text-sm px-3 sm:px-5 py-2.5 sm:py-3.5"
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              }
            />
          </div>

          <div className="mt-6 sm:mt-9 flex flex-wrap gap-4 sm:gap-7">
            <MiniStat value="50+" label="Projects" />
            <MiniStat value="20+" label="Businesses" />
            <MiniStat value="24/7" label="Support" />
          </div>
        </div>

        <HeroVisual />
      </div>
    </div>
  );
}