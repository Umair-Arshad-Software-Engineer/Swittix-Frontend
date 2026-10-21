import { colors } from '../theme';

// Section-scoped dark palette (values taken from the [data-theme="dark"] block in theme.css).
// This section stays dark in both light and dark site themes, like the footer.
const DARK = {
  bg: '#0a0f1a',
  border: '#33415e',
  textPrimary: '#f3f6fb',
  textMuted: '#7484a0',
  glow: 'rgba(47,111,237,0.18)',
};

// Load logo URLs only (not modules). `query: '?url'` + `import: 'default'` gives plain URL strings.
// Optimized copies (made by scripts/optimize-logos.mjs) take priority over the originals,
// so this works both before and after you run the script.
const originalLogos = import.meta.glob('../assets/Companylogos/*', {
  eager: true,
  query: '?url',
  import: 'default',
});
const optimizedLogos = import.meta.glob('../assets/Companylogos-opt/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

const logoByKey = {};
for (const group of [originalLogos, optimizedLogos]) {
  for (const path in group) {
    const filename = path.split('/').pop();
    const key = filename.replace(/\.[^.]+$/, '').toLowerCase();
    logoByKey[key] = group[path]; // optimized group is added last, so it wins
  }
}

const COMPANIES = [
  ['AL KARAM Hosiery', 'aklogo'],
  ['Al-Saeed Sweets & Bakers', 'alsaeedlogo'],
  ['AU', 'aulogo'],
  ['Asad', 'asadlogo'],
  ['Brainy Buddies', 'brainylogo'],
  ['Dairy Farm', 'dairylogo'],
  ['Family', 'familylogo'],
  ['Fast Colour', 'fastlogo'],
  ['FN', 'fnlogo'],
  ['Graphics Lab', 'graphicslogo'],
  ['Nova', 'novalogo'],
  ['Onex', 'onexlogo'],
  ['Sabir Tailor', 'sabirlogo'],
  ['Saloon', 'saloonlogo'],
  ['SKMS', 'skmslogo'],
  ['Tech Soft', 'techsoftlogo'],
  ['Waheed Foods', 'waheedfoodslogo'],
  ['Govt', 'govtlogo'],
].map(([name, key]) => ({ name, logo: logoByKey[key] }));

// Self-contained marquee styles (no dependency on a global `animate-marquee` class).
// The track holds two identical groups, each with its own trailing padding, so
// translating by exactly -50% loops with no jump on any screen size.
const MARQUEE_CSS = `
.trust-track {
  animation: trust-marquee var(--trust-dur, 50s) linear infinite;
  will-change: transform;
}
@keyframes trust-marquee {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
/* Phones: tiles are smaller, so a shorter duration keeps the same on-screen speed */
@media (max-width: 639px) { .trust-track { --trust-dur: 30s; } }
@media (min-width: 640px) and (max-width: 1023px) { .trust-track { --trust-dur: 42s; } }
/* Hover-capable devices only: pause so people can read a logo */
@media (hover: hover) {
  .trust-viewport:hover .trust-track { animation-play-state: paused; }
}
@media (prefers-reduced-motion: reduce) {
  .trust-track { animation: none; }
  .trust-viewport { overflow-x: auto; }
}
`;

// Tiles stay light so the company logos (mostly designed for white backgrounds)
// remain clearly visible against the dark section.
function LogoTile({ name, logo, decorative = false }) {
  return (
    <div
      className="flex h-[72px] w-[108px] sm:h-[100px] sm:w-[140px] lg:h-[120px] lg:w-[160px] flex-shrink-0 items-center justify-center rounded-xl p-2 sm:p-3"
      style={{
        border: '1px solid rgba(255,255,255,0.10)',
        backgroundColor: '#e9edf4',
        boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
      }}
    >
      {logo ? (
        <img
          src={logo}
          alt={decorative ? '' : name}
          decoding="async"
          draggable={false}
          className="h-[52px] w-[88px] sm:h-[80px] sm:w-[120px] lg:h-[100px] lg:w-[140px] object-contain"
        />
      ) : (
        <span
          className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-wide"
          style={{ color: '#45536B' }}
        >
          {name}
        </span>
      )}
    </div>
  );
}

function LogoGroup({ decorative = false }) {
  return (
    <div
      className="flex flex-shrink-0 gap-2.5 pr-2.5 sm:gap-4 sm:pr-4 lg:gap-6 lg:pr-6"
      aria-hidden={decorative || undefined}
    >
      {COMPANIES.map((c) => (
        <LogoTile key={c.name} name={c.name} logo={c.logo} decorative={decorative} />
      ))}
    </div>
  );
}

export function TrustSection() {
  return (
    <section
      className="relative overflow-hidden py-6 sm:py-10"
      style={{
        borderTop: `1px solid ${DARK.border}`,
        borderBottom: `1px solid ${DARK.border}`,
        backgroundColor: DARK.bg,
        backgroundImage: `radial-gradient(ellipse 60% 120% at 50% 0%, ${DARK.glow}, transparent 70%)`,
      }}
    >
      <style>{MARQUEE_CSS}</style>

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 text-center">
        <h2
          className="text-xl sm:text-xl lg:text-[28px] font-extrabold tracking-tight"
          style={{ color: DARK.textPrimary }}
        >
          Trusted by Industry Leaders
        </h2>
        <p
          className="mx-auto mt-1 max-w-[280px] sm:max-w-none text-[13px] sm:text-[13px] lg:text-[15px] leading-snug"
          style={{ color: DARK.textMuted }}
        >
          Companies that rely on us to build their digital future
        </p>
        <div
          className="mx-auto mt-3 h-[2px] w-12 rounded-full"
          style={{ background: colors.gradientPrimary }}
        />
      </div>

      <div className="trust-viewport relative mt-4 sm:mt-6 overflow-hidden">
        <div className="trust-track flex w-max">
          <LogoGroup />
          <LogoGroup decorative />
        </div>

        {/* edge fades so tiles glide in/out of the dark background */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-24"
          style={{ background: `linear-gradient(to right, ${DARK.bg}, transparent)` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-24"
          style={{ background: `linear-gradient(to left, ${DARK.bg}, transparent)` }}
        />
      </div>
    </section>
  );
}