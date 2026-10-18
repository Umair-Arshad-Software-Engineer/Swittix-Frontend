import { useId } from 'react';

// Swittix Technologies logo drawn entirely in code (SVG).
// - Letters use `currentColor`, so set the text color to switch themes:
//     light backgrounds -> className="text-black" (default)
//     dark backgrounds  -> className="text-white"
//   (or set `style={{ color }}` / color on a parent element)
// - Size it with height/width classes, e.g. className="h-10 w-auto text-black"

const BLUE = '#1565FF';

export function SwittixLogo({ className = 'h-10 w-auto text-black', showTagline = true, title = 'Swittix Technologies' }) {
  // Unique gradient id so multiple logos on one page don't clash.
  const gradId = `swx-swoosh-${useId().replace(/:/g, '')}`;

  const viewBox = showTagline ? '0 0 2378 620' : '0 0 2378 450';
  const T = (dx) => `translate(${dx} 0)`;

  const tPath =
    'M1217 120 Q1217 106 1230 92 L1272 50 V170 H1397 L1355 218 H1272 L1270 330 Q1272 362 1290 377 L1360 382 V432 H1320 Q1245 432 1217 380 V218 H1127 L1170 170 H1217 Z';

  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <linearGradient id={gradId} x1="1990" y1="270" x2="2330" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="currentColor" />
          <stop offset="0.35" stopColor="#2A4FB0" />
          <stop offset="1" stopColor={BLUE} />
        </linearGradient>
      </defs>

      {/* pixel squares */}
      <g fill={BLUE}>
        <rect x="104" y="62" width="25" height="26" />
        <rect x="45" y="90" width="33" height="34" />
        <rect x="148" y="91" width="30" height="30" />
        <rect x="100" y="123" width="40" height="33" />
        <rect x="55" y="166" width="43" height="43" />
        <path d="M112 210 L128 214 L140 230 L116 226 Z" />
      </g>

      {/* S + blue slash */}
      <g fill="currentColor">
        <path d="M255 72 H585 L507 153 H270 Q232 153 232 190 Q236 217 262 217 H440 Q540 222 540 300 Q536 345 520 370 Q482 430 425 432 H97 L187 345 L190 362 H412 Q446 355 445 322 Q440 297 425 297 H225 Q150 285 145 225 Q145 175 185 150 L186 105 Q205 80 255 72 Z" />
      </g>
      <polygon points="528,152 600,72 656,72 578,152" fill={BLUE} />

      {/* w */}
      <path fill="currentColor" d="M555 177 H628 L706 322 L780 208 L858 322 L935 177 H1002 L862 432 H858 L780 300 L698 432 H694 Z" />

      {/* i  t  t  i */}
      <g fill="currentColor">
        <rect x="1033" y="76" width="56" height="62" />
        <path d="M1033 215 L1085 172 H1090 V432 H1033 Z" />
        <path d={tPath} />
        <path d={tPath} transform={T(265)} />
        <rect x="1697" y="76" width="58" height="62" />
        <path d="M1697 215 L1750 172 H1755 V432 H1697 Z" />
      </g>

      {/* x */}
      <path fill="currentColor" d="M1830 197 H1932 L1996 265 L1932 313 L1882 432 H1797 L1930 315 Z" />
      <polygon points="1978,365 2050,322 2142,432 2042,432" fill={BLUE} />
      <path d="M1995 265 Q2150 130 2330 78 Q2150 172 2000 272 Z" fill={`url(#${gradId})`} />
      <path d="M1978 362 Q2085 250 2212 175 Q2130 232 2052 322 Z" fill={BLUE} />

      {/* tagline */}
      {showTagline && (
        <g>
          <rect x="97" y="540" width="268" height="7" fill={BLUE} />
          <rect x="1876" y="540" width="268" height="7" fill={BLUE} />
          <text
            x="415"
            y="570"
            fill="currentColor"
            fontFamily="'Montserrat','Segoe UI',Arial,sans-serif"
            fontSize="110"
            fontWeight="500"
            textLength="1410"
            lengthAdjust="spacing"
          >
            TECHNOLOGIES
          </text>
        </g>
      )}
    </svg>
  );
}

export default SwittixLogo;