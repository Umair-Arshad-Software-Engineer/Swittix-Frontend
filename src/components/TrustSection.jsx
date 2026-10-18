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

// Tiles stay light so the company logos (mostly designed for white backgrounds)
// remain clearly visible against the dark section.
function LogoTile({ name, logo }) {
  return (
    <div
      className="flex h-[80px] w-[120px] sm:h-[100px] sm:w-[140px] lg:h-[120px] lg:w-[160px] flex-shrink-0 items-center justify-center rounded-xl p-2 sm:p-3"
      style={{
        border: '1px solid rgba(255,255,255,0.10)',
        backgroundColor: '#e9edf4',
        boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
      }}
    >
      {logo ? (
        <img
          src={logo}
          alt={name}
          decoding="async"
          draggable={false}
          className="h-[60px] w-[100px] sm:h-[80px] sm:w-[120px] lg:h-[100px] lg:w-[140px] object-contain"
        />
      ) : (
        <span
          className="text-[10px] sm:text-xs font-bold uppercase tracking-wide"
          style={{ color: '#45536B' }}
        >
          {name}
        </span>
      )}
    </div>
  );
}

export function TrustSection() {
  const doubled = [...COMPANIES, ...COMPANIES];

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
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 text-center">
        <h2
          className="text-lg sm:text-xl lg:text-[28px] font-extrabold tracking-tight"
          style={{ color: DARK.textPrimary }}
        >
          Trusted by Industry Leaders
        </h2>
        <p className="mt-1 text-xs sm:text-[13px] lg:text-[15px]" style={{ color: DARK.textMuted }}>
          Companies that rely on us to build their digital future
        </p>
        <div
          className="mx-auto mt-3 h-[2px] w-12 rounded-full"
          style={{ background: colors.gradientPrimary }}
        />
      </div>

      <div className="relative mt-4 sm:mt-6 overflow-hidden">
        <div className="flex w-max gap-3 sm:gap-4 lg:gap-6 animate-marquee">
          {doubled.map((c, i) => (
            <LogoTile key={`${c.name}-${i}`} name={c.name} logo={c.logo} />
          ))}
        </div>

        {/* edge fades so tiles glide in/out of the dark background */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24"
          style={{ background: `linear-gradient(to right, ${DARK.bg}, transparent)` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24"
          style={{ background: `linear-gradient(to left, ${DARK.bg}, transparent)` }}
        />
      </div>
    </section>
  );
}