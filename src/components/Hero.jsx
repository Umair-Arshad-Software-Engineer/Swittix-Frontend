import { useEffect, useRef, useState } from 'react';
import { AnimatedButton } from './AnimatedButton';
import { colors } from '../theme';
import './hero-visual.css';

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
    <div className="flex flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-[7px]">
      <span className="text-lg sm:text-[17px] font-extrabold leading-none" style={{ color: colors.textPrimary }}>
        {value}
      </span>
      <span className="text-[11px] sm:text-xs" style={{ color: colors.textMuted }}>{label}</span>
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
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  // Pause every animation while the visual is off-screen (saves battery / CPU on phones).
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative mx-auto w-full max-w-[430px] sm:max-w-full h-[310px] sm:h-[470px] hero-visual${visible ? '' : ' is-paused'}`}
    >
      {/* Ambient glow */}
      <div className="hero-ambient absolute left-1/2 top-1/2 h-[220px] w-[220px] sm:h-[370px] sm:w-[370px] rounded-full" />

      {/* Floating browser window */}
      <div
        className="hero-browser absolute left-1/2 top-1/2 w-full max-w-[340px] sm:max-w-[430px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl"
        style={{
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.surface,
        }}
      >
        {/* Browser header */}
        <div
          className="relative z-10 flex h-[40px] sm:h-[52px] items-center gap-1.5 px-3 sm:px-[18px] border-b"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.surfaceAlt,
          }}
        >
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          <span className="h-2 w-2 rounded-full bg-blue-600" />

          <div className="flex-1" />

          <span
            className="text-[9px] sm:text-[11px] font-semibold"
            style={{ color: colors.textMuted }}
          >
            swittix.com
          </span>
        </div>

        {/* Animated technology scene */}
        <div className="hero-scene relative flex items-center justify-center h-[250px] sm:h-[418px] overflow-hidden">
          {/* Background grid */}
          <div className="grid-pattern absolute inset-0 opacity-70" />

          {/* Orbit rings */}
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-orbit hero-orbit-three" />

          {/* Orbiting technology nodes */}
          <div className="hero-node hero-node-one">
            <span>JS</span>
          </div>

          <div className="hero-node hero-node-two">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L4 7.5V16.5L12 21L20 16.5V7.5L12 3Z"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M8 9.5L12 12L16 9.5M12 12V17"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="hero-node hero-node-three">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M7 8L3 12L7 16M17 8L21 12L17 16M14 5L10 19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="hero-node hero-node-four">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 17L9 12L13 15L20 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 7H20V12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Central animated core */}
          <div className="hero-core-wrap relative z-[2] flex items-center justify-center">
            <div className="hero-core-ring" />

            <div className="hero-core">
              <svg
                className="hero-code-icon"
                width="54"
                height="54"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 17L4 12L9 7M15 7L20 12L15 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="hero-core-dot" />
          </div>

          {/* Floating information cards */}
          <div className="hero-info-card hero-info-top">
            <span className="hero-live-dot" />
            <div>
              <p>System Status</p>
              <strong>All Systems Go</strong>
            </div>
          </div>

          <div className="hero-info-card hero-info-bottom">
            <span className="hero-sparkle">✦</span>
            <div>
              <p>Digital Innovation</p>
              <strong>Ideas → Reality</strong>
            </div>
          </div>

          {/* Small ambient particles */}
          <span className="hero-particle hero-particle-one" />
          <span className="hero-particle hero-particle-two" />
          <span className="hero-particle hero-particle-three" />
          <span className="hero-particle hero-particle-four" />
        </div>
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
              className="text-[10px] sm:text-[10.5px] font-bold tracking-wide sm:tracking-wider"
              style={{ color: colors.textSecondary }}
            >
              DIGITAL PRODUCT & SOFTWARE STUDIO
            </span>
          </div>

          <div className="relative mt-4 sm:mt-6" aria-label={LINE1.replace(/\n/g, ' ')}>
            <h1
              aria-hidden="true"
              className="invisible whitespace-pre-line text-[length:clamp(1.75rem,8.4vw,2.25rem)] sm:text-[52px] lg:text-[64px] font-extrabold leading-[1.08] tracking-tight"
            >
              {LINE1}
            </h1>
            <h1
              aria-hidden="true"
              className="absolute inset-0 whitespace-pre-line text-[length:clamp(1.75rem,8.4vw,2.25rem)] sm:text-[52px] lg:text-[64px] font-extrabold leading-[1.08] tracking-tight"
              style={{ color: colors.textPrimary }}
            >
              {line1}
              {phase === 0 && <span className="cursor-blink" style={{ color: colors.primary }}>|</span>}
            </h1>
          </div>

          <div className="relative" aria-label={LINE2.replace(/\n/g, ' ')}>
            <h1
              aria-hidden="true"
              className="invisible whitespace-pre-line text-[length:clamp(1.75rem,8.4vw,2.25rem)] sm:text-[52px] lg:text-[64px] font-extrabold leading-[1.08] tracking-tight"
            >
              {LINE2}
            </h1>
            <h1
              aria-hidden="true"
              className="absolute inset-0 whitespace-pre-line text-[length:clamp(1.75rem,8.4vw,2.25rem)] sm:text-[52px] lg:text-[64px] font-extrabold leading-[1.08] tracking-tight"
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
            <p aria-hidden="true" className="invisible text-[15px] sm:text-[16.5px] leading-[1.65]">
              {DESCRIPTION}
            </p>
            <p
              aria-hidden="true"
              className="absolute inset-0 text-[15px] sm:text-[16.5px] leading-[1.65]"
              style={{ color: colors.textSecondary }}
            >
              {description}
              {phase === 2 && <span className="cursor-blink" style={{ color: colors.primary }}>|</span>}
            </p>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3.5">
            <AnimatedButton
              label="Start a Project"
              primary
              onClick={() => onNavigate('/start-project')}
              className="w-full sm:w-auto justify-center text-sm px-4 sm:px-5 py-3 sm:py-3.5"
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <AnimatedButton
              label="Explore Services"
              onClick={() => onNavigate('/services')}
              className="w-full sm:w-auto justify-center text-sm px-4 sm:px-5 py-3 sm:py-3.5"
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

          <div className="mt-7 sm:mt-9 grid grid-cols-3 gap-4 border-t pt-5 sm:flex sm:flex-wrap sm:gap-7 sm:border-t-0 sm:pt-0" style={{ borderColor: colors.border }}>
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