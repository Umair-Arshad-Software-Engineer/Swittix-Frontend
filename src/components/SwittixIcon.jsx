import { useEffect, useId } from 'react';

// Swittix "S" icon (pixel squares + S + blue slash) drawn in SVG, with an entrance animation.
// Black parts use `currentColor`. Size with className, e.g. "h-10 w-auto".
// Props:
//   animate     (default true)  play the entrance animation
//   color       (default white) colour of the "S"
//   className   sizing classes
//   title       accessible label
//   onComplete  called once the animation has finished (immediately if animate=false
//               or the user prefers reduced motion)

const BLUE = '#1E6BB8';

const SQUARES = [
  { x: 8, y: 211, w: 44, h: 47 },
  { x: 87, y: 171, w: 34, h: 37 },
  { x: 148, y: 210, w: 40, h: 42 },
  { x: 82, y: 256, w: 55, h: 55 },
  { x: 22, y: 314, w: 57, h: 58 },
];

const CSS = `
.sx-anim .sx-sq {
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: sx-pop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: calc(var(--i) * 90ms);
}
.sx-anim .sx-wipe-rect {
  transform-box: fill-box;
  transform-origin: left center;
  transform: scaleX(0);
  animation: sx-wipe 900ms cubic-bezier(0.65, 0, 0.35, 1) 450ms forwards;
}
.sx-anim .sx-slash {
  opacity: 0;
  animation: sx-slash 700ms cubic-bezier(0.22, 1, 0.36, 1) 1100ms forwards;
}

@keyframes sx-pop {
  0%   { opacity: 0; transform: scale(0.2); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes sx-wipe {
  to { transform: scaleX(1); }
}
@keyframes sx-slash {
  0%   { opacity: 0; transform: translate(60px, -60px); }
  100% { opacity: 1; transform: translate(0, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .sx-anim .sx-sq,
  .sx-anim .sx-slash { animation: none; opacity: 1; transform: none; }
  .sx-anim .sx-wipe-rect { animation: none; transform: scaleX(1); }
}
`;

export function SwittixIcon({
  className = 'h-10 w-auto',
  title = 'Swittix Technologies',
  color = '#ffffff',
  animate = true,
  onComplete,
}) {
  // Unique clip-path id so multiple icons on one page don't share a clip.
  const clipId = `sx-wipe-${useId().replace(/:/g, '')}`;

  // Nothing to wait for when there's no animation (or reduced motion is on).
  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animate || reduced) onComplete?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg
      viewBox="0 160 855 540"
      className={`${className}${animate ? ' sx-anim' : ''}`}
      style={{ color }}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {animate && <style>{CSS}</style>}

      {animate && (
        <defs>
          <clipPath id={clipId}>
            <rect className="sx-wipe-rect" x="60" y="160" width="660" height="540" />
          </clipPath>
        </defs>
      )}

      {/* pixel squares */}
      <g fill={BLUE}>
        {SQUARES.map((d, i) => (
          <rect
            key={i}
            className="sx-sq"
            style={{ '--i': i }}
            x={d.x}
            y={d.y}
            width={d.w}
            height={d.h}
          />
        ))}
        <path
          className="sx-sq"
          style={{ '--i': 5 }}
          d="M98 373 L136 374 L137 406 L122 406 Q115 395 98 385 Z"
        />
      </g>

      {/* S */}
      <path
        fill="currentColor"
        style={animate ? { clipPath: `url(#${clipId})` } : undefined}
        d="M296 185 H748 L640 295 H318 Q300 296 285 305 Q262 325 264 350 Q270 380 292 385 L540 384 Q600 388 640 420 Q682 460 683 510 Q682 560 662 585 Q640 625 590 658 Q560 675 527 682 H78 L200 562 L203 583 H505 Q530 580 548 560 Q560 540 552 510 Q540 495 525 492 H270 Q235 492 210 482 Q170 460 150 420 Q143 405 145 396 L160 392 L168 378 L163 370 L160 358 L145 355 Q148 320 160 302 L197 297 L198 238 Q220 205 296 185 Z"
      />

      {/* slash: the last element to animate, so its end = animation complete */}
      <polygon
        className="sx-slash"
        points="663,295 773,182 846,182 736,295"
        fill={BLUE}
        onAnimationEnd={animate ? onComplete : undefined}
      />
    </svg>
  );
}

export default SwittixIcon;