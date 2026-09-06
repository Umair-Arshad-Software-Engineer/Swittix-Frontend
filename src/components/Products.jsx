// src/components/Products.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrimaryButton, SecondaryButton } from './AnimatedButton';
import { HoverCard } from './Sections';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const ICONS = {
  factory: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 21V10l6 4v-4l6 4V6l6 4v11H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
  ),
  pos: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  school: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M2 9l10-5 10 5-10 5-10-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6 11.5V17c0 1.1 2.7 3 6 3s6-1.9 6-3v-5.5" stroke="currentColor" strokeWidth="1.6" /></svg>
  ),
  badge: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" /><path d="M6 21v-2a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="1.6" /></svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chevron: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  store: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9l1-5h16l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
  ),
  hospital: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" /></svg>
  ),
  restaurant: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 2v8M4 2v4a2 2 0 004 0V2M18 2v20M18 2a3 3 0 00-3 3v4a3 3 0 003 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  factory2: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 21V10l6 4v-4l6 4V6l6 4v11H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
};

// Expanded from the 4 software types in Sections.jsx's SoftwareTypesPreview,
// each with a longer description, a concrete feature list, and a "best for" tag.
const PRODUCTS = [
  {
    icon: ICONS.factory,
    title: 'ERP Systems',
    tagline: 'Unified platforms to manage operations, inventory and finance.',
    bestFor: 'Manufacturing, distribution & multi-branch businesses',
    description:
      'A single system that connects inventory, procurement, finance, and operations so your teams stop reconciling numbers across five different spreadsheets. Built around your actual workflows, not a rigid template.',
    features: [
      'Real-time inventory & stock tracking',
      'Purchase, sales & finance modules',
      'Multi-branch / multi-warehouse support',
      'Custom reporting & analytics dashboards',
      'Role-based access & audit trails',
      'Integration with accounting tools',
    ],
  },
  {
    icon: ICONS.pos,
    title: 'POS Systems',
    tagline: 'Fast, reliable point-of-sale solutions for retail and hospitality.',
    bestFor: 'Retail stores, restaurants & service counters',
    description:
      "Point-of-sale software that keeps checkout fast even during peak hours, works offline when the internet doesn't, and gives you a clear view of sales the moment they happen.",
    features: [
      'Fast, touch-optimized checkout flow',
      'Offline mode with auto-sync',
      'Inventory sync across registers',
      'Receipt printing & barcode scanning',
      'Daily sales & shift reports',
      'Multi-location support',
    ],
  },
  {
    icon: ICONS.school,
    title: 'School Management',
    tagline: 'Manage admissions, attendance, grading and communication.',
    bestFor: 'Schools, academies & training institutes',
    description:
      'One platform for the entire academic lifecycle — from the first admission inquiry to report cards — so staff spend less time on paperwork and parents stay informed automatically.',
    features: [
      'Admissions & enrollment tracking',
      'Attendance & timetable management',
      'Grading, report cards & transcripts',
      'Parent-teacher communication portal',
      'Fee collection & invoicing',
      'Staff & HR records',
    ],
  },
  {
    icon: ICONS.badge,
    title: 'HRM',
    tagline: 'Streamline hiring, payroll and employee management end-to-end.',
    bestFor: 'Growing teams & multi-department companies',
    description:
      'From the first job posting to the final payslip — an HR system that keeps hiring, attendance, performance, and payroll in one place instead of scattered across email threads and spreadsheets.',
    features: [
      'Applicant tracking & onboarding',
      'Attendance & leave management',
      'Automated payroll processing',
      'Performance review workflows',
      'Employee self-service portal',
      'Compliance & document storage',
    ],
  },
];

const USE_CASES = [
  {
    icon: ICONS.store,
    title: 'Retail Chains',
    description: 'POS + inventory ERP working together across multiple store locations, synced in real time.',
  },
  {
    icon: ICONS.school,
    title: 'Educational Institutes',
    description: 'School Management handling admissions, grading, and parent communication in one portal.',
  },
  {
    icon: ICONS.hospital,
    title: 'Clinics & Healthcare',
    description: 'ERP-driven inventory and billing paired with HRM for staff scheduling and payroll.',
  },
  {
    icon: ICONS.restaurant,
    title: 'Restaurants & Cafes',
    description: 'POS built for fast checkout during rush hours, with offline resilience baked in.',
  },
  {
    icon: ICONS.factory2,
    title: 'Manufacturers',
    description: 'Full ERP coverage from raw material procurement to finished goods and finance.',
  },
  {
    icon: ICONS.badge,
    title: 'Growing Companies',
    description: 'HRM systems that scale hiring, payroll, and performance tracking as your team grows.',
  },
];

const FAQS = [
  {
    q: 'Are these off-the-shelf products or custom builds?',
    a: "Each product starts from a proven core (ERP, POS, School Management, or HRM) that we customize to your specific workflows, branding, and integrations — you're not stuck adapting your business to fit generic software.",
  },
  {
    q: 'Can two products work together, like ERP and POS?',
    a: 'Yes — most of our clients running retail or manufacturing operations use ERP and POS together, sharing the same inventory and finance data in real time so nothing gets out of sync.',
  },
  {
    q: 'Do these systems work offline?',
    a: 'POS is built with offline-first checkout that syncs automatically once connectivity returns. ERP, School Management, and HRM are primarily cloud-based, with offline support available depending on your requirements.',
  },
  {
    q: 'How long does implementation take?',
    a: 'A focused single-module deployment (e.g. POS for one location) can go live in 3-4 weeks. Multi-module ERP or School Management systems with data migration typically take 6-10 weeks depending on complexity.',
  },
  {
    q: 'Is training and onboarding included?',
    a: 'Yes. Every product deployment includes staff onboarding and documentation, and rolls into our Maintenance & Support service afterward so your team always has someone to call.',
  },
];

function ProductCard({ product, isOpen, onToggle }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="overflow-hidden rounded-2xl border border-[#1A2233] bg-[#0A0E17] transition-colors duration-300 hover:border-[#6FA0FF]/30"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 p-6 text-left sm:p-8"
      >
        <div className="flex gap-5">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-300"
            style={{
              background: isOpen
                ? 'linear-gradient(to bottom right,#2F6FED,#3B82F6)'
                : 'rgba(47,111,237,0.08)',
              color: isOpen ? '#fff' : '#6FA0FF',
            }}
          >
            {product.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#F3F6FB] sm:text-xl">{product.title}</h3>
            <p className="mt-1 text-sm text-[#93A0B8]">{product.tagline}</p>
            <span className="mt-2 inline-block rounded-full border border-[#6FA0FF]/20 bg-[#6FA0FF]/5 px-3 py-1 text-xs font-medium text-[#6FA0FF]">
              {product.bestFor}
            </span>
          </div>
        </div>
        <span
          className="mt-1 flex-shrink-0 text-[#6FA0FF] transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
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
            <div className="border-t border-[#1A2233] px-6 pb-7 pt-6 sm:px-8">
              <p className="text-sm leading-relaxed text-[#93A0B8] sm:text-[15px]">
                {product.description}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#6FA0FF]/15 text-[#6FA0FF]">
                      {ICONS.check}
                    </span>
                    <span className="text-sm text-[#93A0B8]">{feature}</span>
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
    <div className="overflow-hidden rounded-2xl border border-[#1A2233] bg-[#0A0E17] transition-colors duration-300 hover:border-[#6FA0FF]/30">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-semibold text-[#F3F6FB]">{item.q}</span>
        <span
          className="flex-shrink-0 text-[#6FA0FF] transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
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
            <p className="px-6 pb-6 text-sm leading-relaxed text-[#93A0B8]">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Products({ onNavigate }) {
  const [openProduct, setOpenProduct] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative px-5 pt-20 pb-16 sm:px-10 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-4 inline-block rounded-full border border-[#6FA0FF]/30 bg-[#6FA0FF]/10 px-5 py-1.5 text-sm font-medium text-[#6FA0FF]"
          >
            Our Products
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-[#F3F6FB] sm:text-5xl lg:text-6xl"
          >
            Purpose-Built Software
            <span className="bg-gradient-to-r from-[#6FA0FF] to-[#A78BFA] bg-clip-text text-transparent">
              {' '}for Real Operations
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-2xl text-lg text-[#93A0B8] sm:text-xl"
          >
            Four core platforms — ERP, POS, School Management, and HRM — each
            customized to how your business actually runs, not the other way
            around.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <PrimaryButton label="Start a Project" onClick={() => onNavigate('/start-project')} />
            <SecondaryButton label="Talk to Us" onClick={() => onNavigate('/contact')} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 gap-6 border-t border-[#1A2233] pt-8 sm:grid-cols-4"
          >
            {[
              ['4', 'Core Products'],
              ['50+', 'Projects Delivered'],
              ['6+', 'Industries Served'],
              ['24/7', 'Support Available'],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-[#6FA0FF] sm:text-3xl">{value}</div>
                <div className="mt-1 text-xs text-[#93A0B8] sm:text-sm">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Detailed Products Grid */}
      <motion.section
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="px-5 py-16 sm:px-10 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#6FA0FF]">
              Our Products
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#F3F6FB] sm:text-4xl">
              Software Built Around Your Industry
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#93A0B8]">
              Each product is a starting point, not a fixed package — every
              deployment is tailored to your workflows. Click a product to
              see what's included.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5">
            {PRODUCTS.map((product, index) => (
              <ProductCard
                key={product.title}
                product={product}
                isOpen={openProduct === index}
                onToggle={() => setOpenProduct(openProduct === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Use Cases / Industries Served */}
      <motion.section
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="px-5 py-16 sm:px-10 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#6FA0FF]">
              Where They Fit
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#F3F6FB] sm:text-4xl">
              Built for Real Industries
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#93A0B8]">
              From single-location shops to multi-branch operations, our
              products adapt to how different industries actually work.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((useCase, i) => (
              <HoverCard
                key={useCase.title}
                icon={useCase.icon}
                title={useCase.title}
                description={useCase.description}
                revealDelay={(i % 3) * 90}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="px-5 py-16 sm:px-10 lg:px-24"
      >
        <div className="mx-auto max-w-3xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#6FA0FF]">
              Questions
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#F3F6FB] sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-10 flex flex-col gap-4">
            {FAQS.map((item, index) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="px-5 py-20 sm:px-10 lg:px-24"
      >
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A0E17] to-[#0F1623] p-12 text-center">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#6FA0FF]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#A78BFA]/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold text-[#F3F6FB] sm:text-4xl">
              Not Sure Which Product
              <span className="bg-gradient-to-r from-[#6FA0FF] to-[#A78BFA] bg-clip-text text-transparent">
                {' '}Fits Your Business?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#93A0B8]">
              Tell us how your operations run today and we'll recommend the
              right product — or combination of products — for you.
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