import { useEffect, useRef, useState } from 'react';

/**
 * Measures a specific element's height/width directly (NOT a shared parent
 * that also contains the canvases). This breaks the feedback loop where an
 * absolutely-positioned canvas sized to `size.h` would itself inflate the
 * parent's scrollHeight on the next measurement, causing the canvas to
 * "stick" at the tallest page ever visited (e.g. Home) and leaving blank
 * space under the Footer on shorter pages (e.g. About).
 *
 * Debounced on top of that: accordions / framer-motion height:auto
 * transitions fire ResizeObserver on nearly every frame. We don't want the
 * canvas pixel buffer reallocating (canvas.width/height = ...) on every one
 * of those frames — that's expensive and can visibly stutter — so the
 * committed size only updates once the content's size has been stable for
 * a short beat.
 */
function useElementSize(ref, resetKey) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let debounceId = null;
    let rafId1 = null;
    let rafId2 = null;

    const commit = () => setSize({ w: el.scrollWidth, h: el.scrollHeight });

    // Small, continuous changes (accordions, framer-motion height:auto,
    // fonts settling) fire ResizeObserver on nearly every frame — those
    // still get coalesced, but over ~2 animation frames instead of a
    // fixed 250ms, so the canvas resolution catches up to the CSS box
    // almost immediately instead of visibly lagging behind it.
    const measure = () => {
      clearTimeout(debounceId);
      debounceId = setTimeout(commit, 60);
    };

    commit(); // immediate first measurement, no need to wait
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(debounceId);
      cancelAnimationFrame(rafId1);
      cancelAnimationFrame(rafId2);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [ref]);

  // resetKey (e.g. the current route) changes the instant navigation
  // happens, which is exactly when the CSS box can jump to a very
  // different height in one frame (no in-between animation to debounce
  // for). Skip the debounce entirely here and re-measure on the next two
  // animation frames — first to catch the new page's layout once it has
  // painted, second as a safety net for any late image/font reflow —
  // so the canvas bitmap resolution never trails the CSS box long enough
  // to visibly stretch/squish the animation.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const raf1 = requestAnimationFrame(() => {
      setSize({ w: el.scrollWidth, h: el.scrollHeight });
      const raf2 = requestAnimationFrame(() => {
        setSize({ w: el.scrollWidth, h: el.scrollHeight });
      });
      el.__raf2 = raf2;
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (el.__raf2) cancelAnimationFrame(el.__raf2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  return size;
}

// Deterministic pseudo-random generator (matches Dart's fixed-seed Random(42))
function makeRng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Network of glowing nodes connected by thin light-lines — the "circuit board" backdrop. */
export function NetworkBackground({ size, densityPer900 = 60, maxDistance = 220 }) {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    if (!size.w || !size.h) return;
    const count = Math.min(500, Math.max(18, Math.round((size.h / 900) * densityPer900)));
    const rand = makeRng(42);
    nodesRef.current = Array.from({ length: count }, () => ({
      bx: rand() * size.w,
      by: rand() * size.h,
      dr: 14 + rand() * 22,
      ds: 0.4 + rand() * 0.6,
      ph: rand() * Math.PI * 2,
      sz: 1.6 + rand() * 2.2,
      pp: rand() * Math.PI * 2,
    }));
  }, [size.w, size.h, densityPer900]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.w || !size.h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let raf;
    const start = performance.now();

    function frame(now) {
      const angle = (((now - start) / 40000) % 1) * Math.PI * 2; // 40s loop
      ctx.clearRect(0, 0, size.w, size.h);
      const nodes = nodesRef.current;
      const pos = nodes.map((n) => {
        const a = n.ph + angle * n.ds;
        return [n.bx + Math.cos(a) * n.dr, n.by + Math.sin(a) * n.dr * 0.6];
      });

      ctx.lineWidth = 1.1;
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const dx = pos[i][0] - pos[j][0];
          const dy = pos[i][1] - pos[j][1];
          const dist = Math.hypot(dx, dy);
          if (dist > maxDistance) continue;
          const strength = 1 - dist / maxDistance;
          const shimmer = 0.85 + 0.15 * Math.sin(angle + i * 0.7 + j * 1.3);
          const op = Math.min(0.4, strength * 0.4 * shimmer);
          ctx.strokeStyle = `rgba(59,130,246,${op})`;
          ctx.beginPath();
          ctx.moveTo(pos[i][0], pos[i][1]);
          ctx.lineTo(pos[j][0], pos[j][1]);
          ctx.stroke();
        }
      }

      nodes.forEach((n, i) => {
        const pulse = 0.6 + 0.4 * Math.sin(angle * 1.4 + n.pp);
        const [x, y] = pos[i];
        ctx.fillStyle = `rgba(111,160,255,${0.32 * pulse})`;
        ctx.beginPath();
        ctx.arc(x, y, n.sz * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(147,197,253,${0.9 * pulse})`;
        ctx.beginPath();
        ctx.arc(x, y, n.sz * 0.9, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [size.w, size.h, maxDistance]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}

/** Soft floating bubbles drifting slowly upward — the ambient "particle system". */
export function BubbleField({ size, count = 36 }) {
  const canvasRef = useRef(null);
  const bubblesRef = useRef([]);

  useEffect(() => {
    const rand = Math.random;
    bubblesRef.current = Array.from({ length: count }, () => ({
      x: rand(),
      y: rand(),
      size: 6 + rand() * 30,
      speed: 0.2 + rand() * 0.3,
      hSpeed: -0.1 + rand() * 0.2,
      opacity: 0.25 + rand() * 0.35,
    }));
  }, [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.w || !size.h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let raf;
    const start = performance.now();
    const pi2 = Math.PI * 2;

    function frame(now) {
      const t = ((now - start) / 60000) % 1; // 60s loop
      ctx.clearRect(0, 0, size.w, size.h);

      bubblesRef.current.forEach((b) => {
        let yOff = ((t * b.speed + b.y) % 1.2) - 0.1;
        if (yOff < -0.1) yOff += 1.2;
        let xOff = (t * b.hSpeed + b.x) % 1;
        if (xOff < 0) xOff += 1;
        const floatOff = Math.sin(t * pi2 * b.speed + b.x * 10) * 0.02;

        const x = xOff * size.w;
        const y = (yOff + floatOff) * size.h;
        const s = b.size;
        const op = b.opacity;

        ctx.fillStyle = `rgba(59,130,246,${op * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, s, 0, pi2);
        ctx.fill();

        ctx.fillStyle = `rgba(34,211,238,${op * 0.35})`;
        ctx.beginPath();
        ctx.arc(x - s * 0.2, y - s * 0.2, s * 0.45, 0, pi2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,255,255,${op * 0.35})`;
        ctx.beginPath();
        ctx.arc(x - s * 0.25, y - s * 0.3, s * 0.22, 0, pi2);
        ctx.fill();

        ctx.strokeStyle = `rgba(147,197,253,${op * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, s, 0, pi2);
        ctx.stroke();
      });

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [size.w, size.h]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}

/**
 * Wraps the whole page. The content lives in its own ref'd wrapper
 * (`contentRef`) which is what gets measured — the canvases are absolutely
 * positioned siblings and are explicitly excluded from the measurement, so
 * they can never inflate the size they're being sized from. That feedback
 * loop was the cause of leftover blank space under the Footer on any page
 * shorter than the tallest page previously visited (Home).
 */
export function PageBackgrounds({ children, routeKey }) {
  const contentRef = useRef(null);
  const size = useElementSize(contentRef, routeKey);

  return (
    <div className="relative">
      <NetworkBackground size={size} />
      <BubbleField size={size} />
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </div>
  );
}