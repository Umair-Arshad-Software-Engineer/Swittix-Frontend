import { useEffect, useState } from 'react';
import { AnimatedButton } from './AnimatedButton';

const LINE1 = 'Building Digital\nSolutions That';
const LINE2 = 'Move Businesses\nForward.';
const DESCRIPTION =
  'We architect high-performance custom software, web applications, ' +
  'and business automation platforms designed to scale, ' +
  'streamline operations, and create measurable impact.';

/** Types out line1 -> line2 -> description in sequence , char by char. */
function useTypewriter() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [description, setDescription] = useState('');
  const [phase, setPhase] = useState(0); // 0 line1, 1 line2, 2 desc, 3 done

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
      typeString(LINE1, setLine1, 30, () => {
        setPhase(1);
        timers.push(
          setTimeout(() => {
            typeString(LINE2, setLine2, 30, () => {
              setPhase(2);
              timers.push(
                setTimeout(() => {
                  typeString(DESCRIPTION, setDescription, 12, () => setPhase(3));
                }, 400)
              );
            });
          }, 400)
        );
      });
    }, 300);
    timers.push(startId);

    return () => {
      cancelled = true;
      timers.forEach((t) => {
        clearTimeout(t);
        clearInterval(t);
      });
    };
  }, []);

  return { line1, line2, description, phase };
}

function MiniStat({ value, label }) {
  return (
    <div className="flex items-center gap-[7px]">
      <span className="text-[17px] font-extrabold text-[#F3F6FB]">{value}</span>
      <span className="text-xs text-[#5B677E]">{label}</span>
    </div>
  );
}

function FloatingCard({ icon, title, value, delay = '0s', className = '' }) {
  return (
    <div
      className={`animate-float-bob flex items-center gap-2 rounded-xl border border-[#1A2233] bg-[#05070C]/90 px-3 py-2.5 shadow-lg ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="text-[#6FA0FF]">{icon}</span>
      <div className="flex flex-col leading-tight">
        <span className="text-[9px] text-[#5B677E]">{title}</span>
        <span className="text-xs font-extrabold text-[#F3F6FB]">{value}</span>
      </div>
    </div>
  );
}

function OrbitDot({ radius, dotSize, offsetDeg = 0, duration = '10s' }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 h-0 w-0"
      style={{ transform: `translate(-50%, -50%) rotate(${offsetDeg}deg)` }}
    >
      <div
        className="animate-spin-slow"
        style={{ animationDuration: duration, transformOrigin: 'center center' }}
      >
        <div
          className="rounded-full bg-[#3B82F6]"
          style={{
            width: dotSize,
            height: dotSize,
            transform: `translate(${radius}px, -${dotSize / 2}px)`,
            boxShadow: '0 0 12px #3B82F6',
          }}
        />
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto h-[350px] w-full max-w-[430px] sm:h-[470px]">
      {/* Pulsing outer glow */}
      <div
        className="animate-glow-pulse absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[350px] sm:w-[350px]"
        style={{
          background: 'radial-gradient(circle, #2F6FED 0%, #3B82F6 40%, transparent 70%)',
        }}
      />

      {/* Browser-style card */}
      <div className="absolute left-1/2 top-1/2 h-[300px] w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-[#1A2233] bg-[#0A0E17] shadow-2xl sm:h-[370px] sm:w-[430px]">
        <div className="grid-pattern absolute inset-0" />
        <div className="relative flex h-[52px] items-center gap-1.5 border-b border-[#1A2233] bg-[#0D1220]/60 px-[18px]">
          <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
          <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
          <span className="h-2 w-2 rounded-full bg-[#2F6FED]" />
          <div className="flex-1" />
          <span className="text-[11px] font-semibold text-[#5B677E]">swittix.com</span>
        </div>

        <div className="relative flex h-[calc(100%-52px)] items-center justify-center">
          <div className="animate-icon-wobble flex h-[90px] w-[90px] items-center justify-center rounded-[28px] bg-gradient-to-br from-[#2F6FED] to-[#3B82F6] shadow-[0_0_35px_2px_rgba(47,111,237,0.6)] sm:h-[115px] sm:w-[115px]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 17l-5-5 5-5M15 7l5 5-5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <FloatingCard
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" fill="currentColor" />
            </svg>
          }
          title="Performance"
          value="98%"
          className="absolute bottom-[25px] left-[18px]"
        />
        <FloatingCard
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 19a4 4 0 010-8 5 5 0 019.9-1H16a3.5 3.5 0 010 7H6z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path d="M9 15l2 2 4-4" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          }
          title="Cloud Ready"
          value="100%"
          delay="1.8s"
          className="absolute right-[18px] top-[85px]"
        />
      </div>

      {/* Same radius, size, and duration on both dots so they share one
          circular path, look identical, and always sit diametrically
          opposite (crossed) as they orbit */}
      <OrbitDot radius={140} dotSize={10} offsetDeg={0} duration="11s" />
      <OrbitDot radius={140} dotSize={10} offsetDeg={180} duration="11s" />
    </div>
  );
}

export function Hero({ onNavigate }) {
  const { line1, line2, description, phase } = useTypewriter();

  return (
    <div className="relative mx-auto max-w-[1432px] overflow-hidden px-5 pb-10 pt-2 sm:px-10 sm:pb-16 sm:pt-3 lg:px-24">
      {/* Ambient drifting glow behind the headline */}
      <div
        className="animate-glow-drift pointer-events-none absolute -right-24 -top-24 h-[260px] w-[260px] rounded-full sm:-right-44 sm:h-[420px] sm:w-[420px]"
        style={{
          background: 'radial-gradient(circle, #2F6FED 0%, #3B82F6 30%, transparent 70%)',
        }}
      />

      {/* items-start (was items-center) so HeroVisual doesn't re-center vertically
          every time the typewriter changes the left column's height */}
      <div className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
        {/* min-h reserves space for the fully-typed text so the layout
            doesn't grow/shift as the typewriter animation plays */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2F6FED]/20 bg-[#2F6FED]/[0.08] px-[13px] py-2">
            <span className="animate-pulse-dot h-[7px] w-[7px] rounded-full bg-[#3B82F6]" />
            <span className="text-[10.5px] font-bold tracking-wider text-[#93A0B8]">
              DIGITAL PRODUCT & SOFTWARE STUDIO
            </span>
          </div>

          {/* Each block below reserves its space with an invisible twin that
              always holds the FULL final string (so wrapping/height match
              reality exactly, not a guessed min-h), then overlays the
              animated typed text absolutely on top of it. This is what
              stops everything below the Hero from creeping down line-by-
              line as the typewriter fills in. */}
          <div className="relative mt-6" aria-label={LINE1.replace(/\n/g, ' ')}>
            <h1 aria-hidden="true" className="invisible whitespace-pre-line text-[38px] font-extrabold leading-[1.08] tracking-tight sm:text-[52px] lg:text-[64px]">
              {LINE1}
            </h1>
            <h1 aria-hidden="true" className="absolute inset-0 whitespace-pre-line text-[38px] font-extrabold leading-[1.08] tracking-tight text-[#F3F6FB] sm:text-[52px] lg:text-[64px]">
              {line1}
              {phase === 0 && <span className="cursor-blink text-[#6FA0FF]">|</span>}
            </h1>
          </div>

          <div className="relative" aria-label={LINE2.replace(/\n/g, ' ')}>
            <h1 aria-hidden="true" className="invisible whitespace-pre-line text-[38px] font-extrabold leading-[1.08] tracking-tight sm:text-[52px] lg:text-[64px]">
              {LINE2}
            </h1>
            <h1 aria-hidden="true" className="absolute inset-0 whitespace-pre-line bg-gradient-to-br from-[#3B82F6] to-[#2F6FED] bg-clip-text text-[38px] font-extrabold leading-[1.08] tracking-tight text-transparent sm:text-[52px] lg:text-[64px]">
              {line2}
              {phase === 1 && <span className="cursor-blink text-white">|</span>}
            </h1>
          </div>

          <div className="relative mt-6 max-w-xl" aria-label={DESCRIPTION}>
            <p aria-hidden="true" className="invisible text-base leading-[1.65] sm:text-[16.5px]">
              {DESCRIPTION}
            </p>
            <p aria-hidden="true" className="absolute inset-0 text-base leading-[1.65] text-[#93A0B8] sm:text-[16.5px]">
              {description}
              {phase === 2 && <span className="cursor-blink text-[#6FA0FF]">|</span>}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <AnimatedButton
              label="Start a Project"
              primary
              onClick={() => onNavigate('/start-project')}
              icon={
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <AnimatedButton
              label="Explore Services"
              onClick={() => onNavigate('/services')}
              icon={
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              }
            />
          </div>

          <div className="mt-9 flex flex-wrap gap-7">
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