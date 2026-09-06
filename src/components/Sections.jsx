import { useEffect, useRef, useState } from 'react';

/**
 * Observes when the wrapped element enters the viewport and flips a flag
 * once (stays true afterwards, so the reveal doesn't replay on re-scroll).
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);

    // Safety net: right after a route change, layout can settle a beat
    // after this effect runs (fonts, images, the background canvas
    // resizing, etc.), which can make IntersectionObserver's very first
    // callback report a false negative for elements that are actually
    // on-screen. A short recheck against the element's real bounding box
    // catches that case without waiting on a second scroll/resize event.
    const recheckId = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (visible) setInView(true);
    }, 150);

    return () => {
      clearTimeout(recheckId);
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, inView];
}

export function HoverCard({ icon, number, title, description, learnMore = false, revealDelay = 0 }) {
  const [hover, setHover] = useState(false);
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="rounded-[18px] border bg-[#0A0E17] p-6 transition-all duration-200 ease-out"
      style={{
        // Center-origin fade + scale reveal on scroll-into-view, combined
        // with the existing hover lift via a single transform property.
        opacity: inView ? 1 : 0,
        transform: inView
          ? hover
            ? 'translateY(-6px) scale(1)'
            : 'translateY(0) scale(1)'
          : 'translateY(0) scale(0.82)',
        transformOrigin: 'center center',
        transitionProperty: 'opacity, transform, border-color, box-shadow',
        transitionDuration: inView && !hover ? '600ms' : '200ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: inView ? `${revealDelay}ms` : '0ms',
        borderColor: hover ? 'rgba(47,111,237,0.4)' : '#1A2233',
        boxShadow: hover ? '0 12px 30px -4px rgba(47,111,237,0.12)' : 'none',
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-[50px] w-[50px] items-center justify-center rounded-2xl transition-all duration-200"
          style={{
            background: hover
              ? 'linear-gradient(to bottom right,#2F6FED,#3B82F6)'
              : 'rgba(47,111,237,0.08)',
            color: hover ? '#fff' : '#6FA0FF',
          }}
        >
          {icon}
        </div>
        {number && <span className="text-[28px] font-extrabold text-[#1A2233]">{number}</span>}
      </div>

      <h3 className="mt-[22px] text-[17px] font-extrabold text-[#F3F6FB]">{title}</h3>
      <p className="mt-2.5 text-[13.5px] leading-[1.6] text-[#93A0B8]">{description}</p>

      {learnMore && (
        <div
          className="mt-[18px] flex items-center gap-1.5 text-xs font-bold text-[#6FA0FF] transition-opacity duration-200"
          style={{ opacity: hover ? 1 : 0.55 }}
        >
          Learn more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-[28px] font-extrabold tracking-tight text-[#F3F6FB] sm:text-[42px]">
        {title}
      </h2>
      <p className="mt-3.5 text-[15px] leading-[1.6] text-[#93A0B8]">{subtitle}</p>
    </div>
  );
}

const ICONS = {
  chat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  design: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="1.7" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="1.7" /><path d="M2 2l7.5 7.5" stroke="currentColor" strokeWidth="1.7" /></svg>
  ),
  code: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  rocket: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" stroke="currentColor" strokeWidth="1.6" /><path d="M12 15l-3-3a22 22 0 013-8c2-2 8-3 8-3s-1 6-3 8a22 22 0 01-8 3z" stroke="currentColor" strokeWidth="1.6" /></svg>
  ),
  globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z" stroke="currentColor" strokeWidth="1.7" /></svg>
  ),
  phone: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M11 18h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
  ),
  gear: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" /><path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 11-4 0v-.09A1.7 1.7 0 009 19.4a1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.7 1.7 0 004.6 15a1.7 1.7 0 00-1.55-1H3a2 2 0 110-4h.09A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06A1.7 1.7 0 009 4.6a1.7 1.7 0 001-1.55V3a2 2 0 114 0v.09a1.7 1.7 0 001 1.55 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06A1.7 1.7 0 0019.4 9a1.7 1.7 0 001.55 1H21a2 2 0 110 4h-.09a1.7 1.7 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  cloud: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 19a4 4 0 010-8 5 5 0 019.9-1H16a3.5 3.5 0 010 7H6z" stroke="currentColor" strokeWidth="1.7" /></svg>
  ),
  trend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 17l6-6 4 4 8-8M15 7h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="21" r="1" fill="currentColor" /><circle cx="19" cy="21" r="1" fill="currentColor" /><path d="M1 1h4l2.6 13.4a2 2 0 002 1.6h9.8a2 2 0 002-1.6L23 6H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  support: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.7" /></svg>
  ),
  factory: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 21V10l6 4v-4l6 4V6l6 4v11H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
  ),
  pos: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  school: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M2 9l10-5 10 5-10 5-10-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6 11.5V17c0 1.1 2.7 3 6 3s6-1.9 6-3v-5.5" stroke="currentColor" strokeWidth="1.6" /></svg>
  ),
  badge: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" /><path d="M6 21v-2a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="1.6" /></svg>
  ),
};

const STEPS = [
  ['01', ICONS.chat, 'Discover', 'We start with a deep dive into your goals, workflows and pain points.'],
  ['02', ICONS.design, 'Design', 'Wireframes and prototypes that map the experience before a line of code is written.'],
  ['03', ICONS.code, 'Build', 'Agile development with regular check-ins so you always know where things stand.'],
  ['04', ICONS.rocket, 'Launch & Support', 'We ship, monitor and continue improving your product long after go-live.'],
];

const SERVICES = [
  [ICONS.globe, 'Web Applications', 'Fast, responsive and scalable digital experiences.'],
  [ICONS.phone, 'Mobile Solutions', 'Modern Flutter applications built for real businesses.'],
  [ICONS.gear, 'Business Automation', 'Automate repetitive processes and improve productivity.'],
  [ICONS.cloud, 'Cloud & Backend', 'Reliable APIs, databases and cloud-ready infrastructure.'],
  [ICONS.trend, 'SEO & Digital Marketing', 'Rank higher, reach further and grow your online presence.'],
  [ICONS.design, 'UI/UX Design', 'Intuitive, on-brand interfaces that convert visitors into customers.'],
  [ICONS.cart, 'E-Commerce Solutions', 'Secure, high-converting online stores built to scale with you.'],
  [ICONS.support, 'Maintenance & Support', 'Ongoing updates, monitoring and support to keep you running smoothly.'],
];

const SOFTWARE_TYPES = [
  [ICONS.factory, 'ERP Systems', 'Unified platforms to manage operations, inventory and finance.'],
  [ICONS.pos, 'POS Systems', 'Fast, reliable point-of-sale solutions for retail and hospitality.'],
  [ICONS.school, 'School Management', 'Manage admissions, attendance, grading and communication.'],
  [ICONS.badge, 'HRM', 'Streamline hiring, payroll and employee management end-to-end.'],
];

// Small stagger so cards in the same row don't all pop in at once.
const STAGGER_MS = 90;

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-10 sm:py-16 lg:px-24">
      <SectionHeading
        title="How We Work"
        subtitle="A clear, collaborative process from first conversation to launch day."
      />
      <div className="mt-9 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(([number, icon, title, description], i) => (
          <HoverCard
            key={title}
            number={number}
            icon={icon}
            title={title}
            description={description}
            revealDelay={i * STAGGER_MS}
          />
        ))}
      </div>
    </section>
  );
}

export function ServicesPreview() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-10 sm:py-16 lg:px-24">
      <SectionHeading
        title="Technology That Solves Real Problems"
        subtitle="From idea to production, we build digital systems around your business goals."
      />
      <div className="mt-9 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(([icon, title, description], i) => (
          <HoverCard
            key={title}
            icon={icon}
            title={title}
            description={description}
            learnMore
            revealDelay={(i % 4) * STAGGER_MS}
          />
        ))}
      </div>
    </section>
  );
}

export function SoftwareTypesPreview() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-10 sm:py-16 lg:px-24">
      <SectionHeading
        title="Custom Software Built for Your Industry"
        subtitle="Purpose-built systems designed around how your business actually operates."
      />
      <div className="mt-9 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {SOFTWARE_TYPES.map(([icon, title, description], i) => (
          <HoverCard
            key={title}
            icon={icon}
            title={title}
            description={description}
            learnMore
            revealDelay={i * STAGGER_MS}
          />
        ))}
      </div>
    </section>
  );
}