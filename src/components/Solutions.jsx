import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrimaryButton, SecondaryButton } from './AnimatedButton';
import { HoverCard } from './Sections';
import { colors } from '../theme';

const fadeInUp = { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };
const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 } };
const staggerChildren = { animate: { transition: { staggerChildren: 0.12 } } };

const ICONS = {
  rocket: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" stroke="currentColor" strokeWidth="1.6" /><path d="M12 15l-3-3a22 22 0 013-8c2-2 8-3 8-3s-1 6-3 8a22 22 0 01-8 3z" stroke="currentColor" strokeWidth="1.6" /></svg>),
  building: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 21V4a1 1 0 011-1h9a1 1 0 011 1v17M14 21v-6a1 1 0 011-1h5a1 1 0 011 1v6M7 6h2M7 10h2M7 14h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  trend: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 17l6-6 4 4 8-8M15 7h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  layers: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>),
  check: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  chevron: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  store: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9l1-5h16l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>),
  hospital: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" /></svg>),
  restaurant: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 2v8M4 2v4a2 2 0 004 0V2M18 2v20M18 2a3 3 0 00-3 3v4a3 3 0 003 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  factory2: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 21V10l6 4v-4l6 4V6l6 4v11H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>),
  school: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M2 9l10-5 10 5-10 5-10-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6 11.5V17c0 1.1 2.7 3 6 3s6-1.9 6-3v-5.5" stroke="currentColor" strokeWidth="1.6" /></svg>),
  badge: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" /><path d="M6 21v-2a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="1.6" /></svg>),
};

const SOLUTIONS = [
  { icon: ICONS.store, title: 'Retail & Bakery POS + Storefront', tagline: 'Full point-of-sale, inventory, and a customer-facing online store in one system.', bestFor: 'Bakeries, sweet shops & multi-item retail counters', description: "Built and shipped for Alsaeed Sweets & Bakers: a Flutter web storefront on Firebase Realtime Database with a live product grid, cart drawer, and hero carousel for customers, paired with an admin dashboard for product and category management. On the counter side, POS handles Cash/Bank/Cheque tabs, FBR digital invoicing for Pakistan tax compliance, and thermal receipt printing with barcode/QR codes on 80mm paper.", features: ['Customer-facing storefront with live cart', 'Admin dashboard for products & categories', 'FBR digital invoicing integration', 'Thermal receipt printing (80mm, barcode/QR)', 'Cash / Bank / Cheque cashbook tabs', 'Customer ledger with consolidated & itemized views'] },
  { icon: ICONS.factory2, title: 'Business & Trading Ledger Systems', tagline: 'Offline-first sales, customer ledgers, and PDF invoicing that never lose data.', bestFor: 'Traders, merchants & distribution businesses', description: "Delivered for iron/steel and general trading clients as a Flutter + Node.js/Sequelize system with offline-first SQLite that syncs to MySQL — so sales keep recording even without internet. Includes sale idempotency to prevent duplicate entries, customer ledgers with last-payment tracking, and PDF invoice generation with proper Urdu text rendering.", features: ['Offline-first SQLite → MySQL sync', 'Sale idempotency & duplicate prevention', 'Customer ledger with last-payment data', 'PDF invoices with Urdu text support', 'Sale creation/editing with smart prefill', 'Petty cash & supplier payment tracking'] },
  { icon: ICONS.school, title: 'School & Hostel Management', tagline: 'Attendance, grading, fee ledgers, and hostel billing in one administrative system.', bestFor: 'Schools, academies & student hostels', description: "Two systems built for education operators: EducoreSystem (Flutter) covers staff attendance with holiday logic, class attendance reports with PDF export, and student promotion/demotion workflows. HostelHub (Laravel 12) handles hostel-specific needs — partial payment support, a per-student financial ledger, and outstanding-bill panels wired directly into the bill generation flow.", features: ['Staff attendance with holiday logic', 'Class attendance reports with PDF export', 'Student promotion/demotion workflows', 'Per-student financial ledger (HostelHub)', 'Partial payment support on hostel bills', 'Employee ledger & bulk staff management'] },
  { icon: ICONS.building, title: 'Construction & Billing Estimators', tagline: 'Room-based billing and estimate-to-invoice conversion for project-based work.', bestFor: 'Painting, construction & project-billing businesses', description: "Built on Flutter + Firebase for a painting/construction business that bills per room rather than a flat rate. The system validates fields inline as estimates are built, then converts an approved estimate directly into a final bill — removing the manual re-entry step that used to cause pricing mismatches.", features: ['Room-based billing structure', 'Inline field validation while quoting', 'Estimate-to-bill conversion, no re-entry', 'Firebase-backed real-time data', 'Multi-platform: mobile, web & desktop', 'Bilingual English/Urdu interface'] },
  { icon: ICONS.trend, title: 'Team & Field-Force Management', tagline: 'Role-based dashboards for coordinating distributed teams and area assignments.', bestFor: 'Organizations managing field staff across zones', description: "A Flutter + Firebase SuperAdmin system built for coordinating employees across PP/UC area assignments, with structured employee-transfer workflows between teams and granular role management — so a change in the field is reflected in the dashboard immediately, not after a phone call.", features: ['PP/UC area-based assignment tracking', 'Employee transfer between teams', 'Role-based access & permissions', 'Real-time Firebase sync across devices', 'SuperAdmin oversight dashboard', 'Audit-friendly change history'] },
  { icon: ICONS.layers, title: 'Corporate Web Presence & Client Intake', tagline: 'A modern, animated marketing site with a structured project-intake pipeline.', bestFor: 'Service businesses & software studios', description: "The Swittix Technologies site itself is a live example: React + Vite + Tailwind with scroll-triggered animations, a full React Router upgrade, and a 'Start a Project' form with file upload that feeds directly into a JWT-authenticated admin dashboard backed by Node.js, Express, Sequelize, and MySQL.", features: ['React Router-based multi-page site', 'Scroll-triggered animation system', 'Project intake form with file upload', 'JWT-authenticated admin dashboard', 'Node.js / Express / Sequelize / MySQL backend', 'Fully responsive, mobile-first layout'] },
];

const INDUSTRIES = [
  { icon: ICONS.store, title: 'Bakeries & Retail', description: 'Storefront + POS + FBR invoicing, shipped for Alsaeed Sweets & Bakers.' },
  { icon: ICONS.factory2, title: 'Trading & Merchants', description: 'Offline-first sales and ledgers for iron/steel and general trading clients.' },
  { icon: ICONS.school, title: 'Schools & Hostels', description: 'EducoreSystem for academics, HostelHub for hostel billing and ledgers.' },
  { icon: ICONS.building, title: 'Construction & Painting', description: 'Room-based billing with estimate-to-invoice conversion, built on Firebase.' },
  { icon: ICONS.hospital, title: 'Field-Force Operations', description: 'Area-based team assignment and transfer workflows for distributed staff.' },
  { icon: ICONS.badge, title: 'HR & Payroll', description: 'Employee ledgers, attendance, and bulk staff management across projects.' },
];

const FAQS = [
  { q: "Are these actual systems you've built, or examples?", a: "These are systems we've actually designed and shipped — Alsaeed Sweets & Bakers' storefront and POS, HostelHub for hostel billing, EducoreSystem for schools, and the trading/ledger systems are all live or delivered projects, not hypothetical templates." },
  { q: "My business doesn't match any of these exactly — can you still help?", a: "Almost certainly. These six solutions represent recurring patterns across dozens of projects — offline-first ledgers, POS + invoicing, attendance and billing systems. If your operations are different, we adapt the same underlying architecture rather than starting from zero." },
  { q: 'Do these systems work without a stable internet connection?', a: "Several do by design. Our trading and ledger systems use offline-first SQLite that syncs to MySQL once connectivity returns, which matters a lot for retail counters and field operations where the internet isn't always reliable." },
  { q: 'Can you integrate with Pakistan-specific requirements like FBR invoicing?', a: "Yes — FBR digital invoicing and barcode/QR receipt printing are already built into our POS solutions, based on real compliance requirements we've implemented for retail clients." },
  { q: 'Do you support both mobile and web for the same business?', a: 'Yes. Most of these solutions are built with Flutter for true mobile/web/desktop coverage from one codebase, backed by either Firebase or a Node.js/Sequelize/MySQL stack depending on offline and reporting needs.' },
];

function SolutionCard({ solution, isOpen, onToggle }) {
  return (
    <motion.div variants={fadeInUp} className="overflow-hidden rounded-2xl transition-colors duration-300" style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surface }}>
      <button onClick={onToggle} className="flex w-full items-start justify-between gap-4 p-6 text-left sm:p-8">
        <div className="flex gap-5">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-300"
            style={{
              background: isOpen ? colors.gradientPrimary : colors.primarySoft,
              color: isOpen ? colors.textOnAccent : colors.primary,
            }}
          >
            {solution.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold sm:text-xl" style={{ color: colors.textPrimary }}>{solution.title}</h3>
            <p className="mt-1 text-sm" style={{ color: colors.textSecondary }}>{solution.tagline}</p>
            <span className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium" style={{ border: `1px solid ${colors.primaryBorderSoft}`, backgroundColor: colors.primarySoft, color: colors.primary }}>
              {solution.bestFor}
            </span>
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
              <p className="text-sm leading-relaxed sm:text-[15px]" style={{ color: colors.textSecondary }}>{solution.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {solution.features.map((feature) => (
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

export function Solutions({ onNavigate }) {
  const [openSolution, setOpenSolution] = useState(0);
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
            Our Solutions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            style={{ color: colors.textPrimary }}
          >
            Real Solutions,
            <span style={{ background: colors.gradientText, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}> Already Delivered</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-2xl text-lg sm:text-xl" style={{ color: colors.textSecondary }}
          >
            Not hypothetical case studies — these are the systems we've actually designed and shipped, from bakery storefronts to hostel billing ledgers to offline-first trading systems.
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
            {[['6', 'Real Solutions'], ['6+', 'Industries Served'], ['50+', 'Projects Delivered'], ['24/7', 'Support Available']].map(([value, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold sm:text-3xl" style={{ color: colors.primary }}>{value}</div>
                <div className="mt-1 text-xs sm:text-sm" style={{ color: colors.textSecondary }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.15 }} className="px-5 py-16 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>Shipped Solutions</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ color: colors.textPrimary }}>Systems We've Actually Built</h2>
            <p className="mx-auto mt-4 max-w-2xl" style={{ color: colors.textSecondary }}>
              Each one below is grounded in a real project we've delivered. Click a solution to see what went into it.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-5">
            {SOLUTIONS.map((solution, index) => (
              <SolutionCard key={solution.title} solution={solution} isOpen={openSolution === index} onToggle={() => setOpenSolution(openSolution === index ? -1 : index)} />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.15 }} className="px-5 py-16 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>Where We Fit</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ color: colors.textPrimary }}>Proven Across These Industries</h2>
            <p className="mx-auto mt-4 max-w-2xl" style={{ color: colors.textSecondary }}>
              Real deployments, not theoretical coverage — here's where we've actually put these systems to work.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry, i) => (
              <HoverCard key={industry.title} icon={industry.icon} title={industry.title} description={industry.description} revealDelay={(i % 3) * 90} />
            ))}
          </div>
        </div>
      </motion.section>

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
              Not Sure Which Track
              <span style={{ background: colors.gradientText, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}> Fits You?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl" style={{ color: colors.textSecondary }}>
              Tell us about your business — its stage, size, and industry — and we'll map out the solution that actually fits.
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