import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrimaryButton, SecondaryButton } from './AnimatedButton';
import { ProcessSection } from './Sections';
import { colors } from '../theme';

const fadeInUp = { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };
const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 } };
const staggerChildren = { animate: { transition: { staggerChildren: 0.12 } } };

const ICONS = {
  globe: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z" stroke="currentColor" strokeWidth="1.7" /></svg>),
  phone: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M11 18h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>),
  gear: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" /><path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 11-4 0v-.09A1.7 1.7 0 009 19.4a1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.7 1.7 0 004.6 15a1.7 1.7 0 00-1.55-1H3a2 2 0 110-4h.09A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06A1.7 1.7 0 009 4.6a1.7 1.7 0 001-1.55V3a2 2 0 114 0v.09a1.7 1.7 0 001 1.55 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06A1.7 1.7 0 0019.4 9a1.7 1.7 0 001.55 1H21a2 2 0 110 4h-.09a1.7 1.7 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.3" /></svg>),
  cloud: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M6 19a4 4 0 010-8 5 5 0 019.9-1H16a3.5 3.5 0 010 7H6z" stroke="currentColor" strokeWidth="1.7" /></svg>),
  trend: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 17l6-6 4 4 8-8M15 7h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  design: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="1.7" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="1.7" /><path d="M2 2l7.5 7.5" stroke="currentColor" strokeWidth="1.7" /></svg>),
  cart: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="21" r="1" fill="currentColor" /><circle cx="19" cy="21" r="1" fill="currentColor" /><path d="M1 1h4l2.6 13.4a2 2 0 002 1.6h9.8a2 2 0 002-1.6L23 6H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  support: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.7" /></svg>),
  check: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  chevron: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>),
};

const SERVICES = [
  { icon: ICONS.globe, title: 'Web Applications', tagline: 'Fast, responsive and scalable digital experiences.', description: 'We design and build custom web applications from the ground up — from marketing sites to complex, data-driven dashboards. Every build is optimized for speed, accessibility, and long-term maintainability.', features: ['Custom front-end builds (React, Next.js)', 'Responsive, mobile-first design', 'API integration & data-driven interfaces', 'Performance & SEO optimization'] },
  { icon: ICONS.phone, title: 'Mobile Solutions', tagline: 'Modern Flutter applications built for real businesses.', description: 'Native-feeling mobile apps built on Flutter for a single codebase across iOS and Android, without compromising on performance or design polish.', features: ['Cross-platform iOS & Android apps', 'Native device feature integration', 'Offline-first architecture', 'App Store & Play Store deployment support'] },
  { icon: ICONS.gear, title: 'Business Automation', tagline: 'Automate repetitive processes and improve productivity.', description: 'We identify manual, repetitive workflows across your operations and replace them with automated systems — freeing your team to focus on higher-value work.', features: ['Workflow & process automation', 'Custom internal tools & dashboards', 'Third-party system integrations', 'Notification & reporting automation'] },
  { icon: ICONS.cloud, title: 'Cloud & Backend', tagline: 'Reliable APIs, databases and cloud-ready infrastructure.', description: 'Robust backend architecture designed to scale with your business — from database design to secure APIs and cloud deployment pipelines.', features: ['REST & GraphQL API development', 'Database design & optimization', 'Cloud infrastructure (AWS, GCP, Azure)', 'CI/CD pipelines & DevOps setup'] },
  { icon: ICONS.trend, title: 'SEO & Digital Marketing', tagline: 'Rank higher, reach further and grow your online presence.', description: 'We combine technical SEO with content and performance strategy to help your business get found — and convert once it is.', features: ['Technical SEO audits & fixes', 'On-page & content optimization', 'Analytics & conversion tracking setup', 'Ongoing performance reporting'] },
  { icon: ICONS.design, title: 'UI/UX Design', tagline: 'Intuitive, on-brand interfaces that convert visitors into customers.', description: 'From wireframes to polished, pixel-perfect interfaces — we design experiences that are as intuitive as they are visually distinctive.', features: ['User research & wireframing', 'High-fidelity UI design', 'Interactive prototyping', 'Design systems & style guides'] },
  { icon: ICONS.cart, title: 'E-Commerce Solutions', tagline: 'Secure, high-converting online stores built to scale with you.', description: 'Custom-built or platform-based online stores with secure payments, inventory management, and a shopping experience built to convert.', features: ['Custom storefronts & checkout flows', 'Payment gateway integration', 'Inventory & order management', 'Performance & conversion optimization'] },
  { icon: ICONS.support, title: 'Maintenance & Support', tagline: 'Ongoing updates, monitoring and support to keep you running smoothly.', description: 'Software is never really "done." We provide ongoing monitoring, updates, and support so your product stays secure, fast, and reliable long after launch.', features: ['24/7 uptime monitoring', 'Security patches & dependency updates', 'Bug fixes & performance tuning', 'Dedicated support channel'] },
];

const FAQS = [
  { q: 'How long does a typical project take?', a: 'Timelines vary by scope — a focused web app or landing page can take 3-5 weeks, while larger platforms or ERP-style systems typically run 2-4 months. We give you a concrete timeline after the discovery phase, not before.' },
  { q: 'Do you work with startups or only established businesses?', a: "Both. We've built MVPs for early-stage startups and scaled systems for established companies with existing infrastructure. Our process adapts to where you are." },
  { q: 'What happens after the project launches?', a: 'Every project can roll into our Maintenance & Support service — monitoring, updates, and a direct line to the team that built it. Nothing gets handed off and forgotten.' },
  { q: 'Can you work with our existing codebase or team?', a: "Yes. We regularly join existing codebases and work alongside in-house teams, whether that's for a specific feature, an audit, or ongoing collaborative development." },
  { q: 'How do you price projects?', a: "Most projects are scoped and quoted individually based on complexity, since a landing page and an ERP system aren't comparable. We provide a clear, itemized quote after understanding your requirements — no surprise costs." },
];

function ServiceCard({ service, isOpen, onToggle }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="overflow-hidden rounded-2xl transition-colors duration-300"
      style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surface }}
    >
      <button onClick={onToggle} className="flex w-full items-start justify-between gap-4 p-6 text-left sm:p-8">
        <div className="flex gap-5">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-300"
            style={{
              background: isOpen ? colors.gradientPrimary : colors.primarySoft,
              color: isOpen ? colors.textOnAccent : colors.primary,
            }}
          >
            {service.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold sm:text-xl" style={{ color: colors.textPrimary }}>{service.title}</h3>
            <p className="mt-1 text-sm" style={{ color: colors.textSecondary }}>{service.tagline}</p>
          </div>
        </div>
        <span className="mt-1 flex-shrink-0 transition-transform duration-300" style={{ color: colors.primary, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          {ICONS.chevron}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-7 pt-6 sm:px-8" style={{ borderTop: `1px solid ${colors.border}` }}>
              <p className="text-sm leading-relaxed sm:text-[15px]" style={{ color: colors.textSecondary }}>{service.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: colors.primarySoft, color: colors.primary }}>
                      {ICONS.check}
                    </span>
                    <span className="text-sm" style={{ color: colors.textSecondary }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl transition-colors duration-300" style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surface }}>
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 p-6 text-left">
        <span className="font-semibold" style={{ color: colors.textPrimary }}>{item.q}</span>
        <span className="flex-shrink-0 transition-transform duration-300" style={{ color: colors.primary, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          {ICONS.chevron}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Services({ onNavigate }) {
  const [openService, setOpenService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="relative overflow-hidden">
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative px-5 pt-20 pb-16 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-4 inline-block rounded-full px-5 py-1.5 text-sm font-medium"
            style={{ border: `1px solid ${colors.primaryBorderSoft}`, backgroundColor: colors.primarySoft, color: colors.primary }}
          >
            What We Do
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            style={{ color: colors.textPrimary }}
          >
            Full-Stack Software
            <span style={{ background: colors.gradientText, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              {' '}Services, End to End
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-2xl text-lg sm:text-xl"
            style={{ color: colors.textSecondary }}
          >
            From web and mobile products to backend infrastructure, automation,
            and long-term support — we cover every layer your business needs to move faster.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton label="Start a Project" onClick={() => onNavigate('/start-project')} />
            <SecondaryButton label="View Our Work" onClick={() => onNavigate('/portfolio')} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 gap-6 pt-8 sm:grid-cols-4"
            style={{ borderTop: `1px solid ${colors.border}` }}
          >
            {[['8', 'Core Services'], ['50+', 'Projects Delivered'], ['5+', 'Years of Excellence'], ['24/7', 'Support Available']].map(([value, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold sm:text-3xl" style={{ color: colors.primary }}>{value}</div>
                <div className="mt-1 text-xs sm:text-sm" style={{ color: colors.textSecondary }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.15 }}
        className="px-5 py-16 sm:px-10 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>Our Services</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ color: colors.textPrimary }}>Everything You Need, Under One Roof</h2>
            <p className="mx-auto mt-4 max-w-2xl" style={{ color: colors.textSecondary }}>
              Tap into any service on its own, or combine them into a single end-to-end engagement. Click a service to see what's included.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.title} service={service} isOpen={openService === index} onToggle={() => setOpenService(openService === index ? -1 : index)} />
            ))}
          </div>
        </div>
      </motion.section>

      <ProcessSection />

      <motion.section variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.15 }} className="px-5 py-16 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>Questions</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ color: colors.textPrimary }}>Frequently Asked Questions</h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-10 flex flex-col gap-4">
            {FAQS.map((item, index) => (
              <FaqItem key={item.q} item={item} isOpen={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? -1 : index)} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} className="px-5 py-20 sm:px-10 lg:px-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl p-12 text-center" style={{ background: `linear-gradient(135deg, ${colors.surfaceAlt}, ${colors.surface})` }}>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl" style={{ backgroundColor: colors.primarySoftHover }} />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-3xl" style={{ backgroundColor: colors.purpleSoftHover }} />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: colors.textPrimary }}>
              Not Sure Which Service
              <span style={{ background: colors.gradientText, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}> You Need?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl" style={{ color: colors.textSecondary }}>
              Tell us about your project and we'll map out the right combination of services — no obligation, just a clear plan.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PrimaryButton label="Start a Project" onClick={() => onNavigate('/start-project')} />
              <SecondaryButton label="Let's Talk" onClick={() => onNavigate('/contact')} />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}