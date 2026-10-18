import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrimaryButton, SecondaryButton } from './AnimatedButton';
import { HoverCard } from './Sections';
import { colors } from '../theme';

const fadeInUp = { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.6 } };
const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 } };
const staggerChildren = { animate: { transition: { staggerChildren: 0.1 } } };

const ICONS = {
  chevron: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  check: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  arrow: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  store: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 9l1-5h16l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>),
  factory: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 21V10l6 4v-4l6 4V6l6 4v11H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>),
  school: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M2 9l10-5 10 5-10 5-10-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6 11.5V17c0 1.1 2.7 3 6 3s6-1.9 6-3v-5.5" stroke="currentColor" strokeWidth="1.6" /></svg>),
  building: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 21V4a1 1 0 011-1h9a1 1 0 011 1v17M14 21v-6a1 1 0 011-1h5a1 1 0 011 1v6M7 6h2M7 10h2M7 14h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  team: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15.5 8.8a3 3 0 100-5.6M21 20c0-2.8-1.9-5.1-4.5-5.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>),
  globe: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z" stroke="currentColor" strokeWidth="1.7" /></svg>),
  close: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>),
  scissors: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" /><circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" /><path d="M8.5 8L19 19M8.5 16L19 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>),
  wallet: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M16 13.5h.01M2 10h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>),
  cart: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="21" r="1" fill="currentColor" /><circle cx="19" cy="21" r="1" fill="currentColor" /><path d="M1 1h4l2.6 13.4a2 2 0 002 1.6h9.8a2 2 0 002-1.6L23 6H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  cow: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="14" rx="8" ry="6" stroke="currentColor" strokeWidth="1.5" /><path d="M6 9L4 5M18 9l2-4M9 20v2M15 20v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="12" r="0.8" fill="currentColor" /><circle cx="15" cy="12" r="0.8" fill="currentColor" /></svg>),
  puzzle: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7h4a1 1 0 001-1V5a1.5 1.5 0 013 0v1a1 1 0 001 1h4v4a1 1 0 001 1h1a1.5 1.5 0 010 3h-1a1 1 0 00-1 1v4H13a1 1 0 00-1-1v-1a1.5 1.5 0 00-3 0v1a1 1 0 00-1 1H4v-4a1 1 0 00-1-1H2a1.5 1.5 0 010-3h1a1 1 0 001-1V7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>),
  scale: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M7 7l-4 8a4 4 0 008 0l-4-8zM17 7l-4 8a4 4 0 008 0l-4-8zM5 7h14M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>),
};

const CATEGORIES = ['All', 'POS & Retail', 'Business Systems', 'Education', 'E-Commerce', 'Civic & Government'];

const PROJECTS = [
  { id: 'alsaeed-suite', category: 'POS & Retail', icon: ICONS.store, title: 'Alsaeed Sweets & Bakers — Full Digital Suite', subtitle: 'Website, POS, Salary Software & Inventory System', client: 'Bakery & confectionery retail chain', stack: ['Flutter Web', 'Firebase Realtime DB', 'Dart', 'Node.js', 'Sequelize', 'MySQL'], summary: 'Not a single app but a full digital operation for one client — a customer-facing website, a tax-compliant POS, a salary system, and an internal billing/inventory system, all built and maintained together.', problem: 'The bakery ran on paper billing and manual salary calculation, with no online presence, no tax-compliant invoicing, and no unified way to track stock across categories or pay staff accurately and on time.', solution: 'Delivered four connected systems for the same client: a Flutter web storefront with a live product grid, cart, and hero carousel for customers; a POS with FBR digital invoicing and barcode/QR thermal receipts for the counter; a dedicated salary software to calculate and track staff pay; and an internal billing and inventory management system so stock and purchasing stay accurate behind the scenes.', results: ['Customers can browse and order without visiting in person', 'Every counter sale is now FBR-compliant with digital invoicing', 'Staff salaries are calculated and tracked in dedicated software', 'Internal stock and billing no longer rely on paper records'], features: ['Customer storefront with cart & hero carousel', 'POS with FBR digital invoicing & QR receipts', 'Dedicated salary/payroll software', 'Internal billing & inventory management', 'Admin dashboard for products & categories', 'Cash / Bank / Cheque cashbook'] },
  { id: 'inventory-ledger', category: 'Business Systems', icon: ICONS.factory, title: 'Inventory & Ledger Management System', subtitle: 'Vendors, Customers, Banking & Cashbook in One System', client: 'Graphics Lab, Onex Gas Appliances, Irfan Iron Merchant, Waheed Foods, Arslan Usman Mughal, Fast Color Printer & FN Solutions', stack: ['Flutter','Firebase Realtime DB', 'Node.js', 'Sequelize', 'MySQL'], summary: 'A complete financial operations system — inventory, vendor and customer ledgers, in-app banking and cheque tracking, and a full cashbook with reporting — deployed across seven different trading and manufacturing businesses.', problem: 'Each business tracked vendor bills, customer dues, bank transactions, and cheques across separate registers and spreadsheets, making it nearly impossible to get an accurate financial picture at any given moment.', solution: 'Built a unified system covering complete inventory management alongside full ledger handling for both vendors and customers. Added in-app banking so bank transactions are recorded alongside cash, dedicated cheque tracking so post-dated and pending cheques are never lost, a structured cashbook, and a reporting layer that pulls all of it together — then rolled it out to Graphics Lab, Onex Gas Appliances, Irfan Iron Merchant, Waheed Foods, Arslan Usman Mughal, Fast Color Printer, and FN Solutions, each with their own data.', results: ['Seven businesses now see vendor, customer, and bank position at a glance', 'Cheque tracking eliminated missed or forgotten post-dated cheques', 'Reporting replaced manual spreadsheet reconciliation across all clients'], features: ['Complete inventory management', 'Vendor & customer ledger handling', 'In-app banking transaction tracking', 'Cheque management (post-dated & pending)', 'Full cashbook', 'Consolidated financial reports'] },
  { id: 'hostelhub', category: 'Education', icon: ICONS.school, title: 'HostelHub', subtitle: 'Hostel Management & Billing System', client: 'Student hostel operator', stack: ['Laravel 12', 'MySQL', 'Blade'], summary: 'A Laravel-based system purpose-built for hostel billing complexity — partial payments, per-student ledgers, and outstanding-bill tracking baked directly into the billing flow.', problem: 'Hostel billing rarely fits a simple "pay in full" model — students pay in installments, carry balances across months, and staff needed a clear per-student financial picture without manually cross-checking spreadsheets.', solution: 'Built on Laravel 12 with a bill generation flow that natively supports partial payments and maintains a running per-student financial ledger. An outstanding-bill panel surfaces unpaid balances directly during bill generation, so staff can see a student\'s full payment history and current dues in one view before issuing a new bill.', results: ['Staff can see full payment history before generating a new bill', 'Partial payments no longer require manual balance tracking', 'Outstanding dues are surfaced automatically, not discovered later'], features: ['Partial payment support on bill generation', 'Per-student financial ledger', 'Outstanding-bill panel integrated into billing', 'Payment history view per student', 'Laravel 12 admin panel'] },
  { id: 'educore', category: 'Education', icon: ICONS.school, title: 'EduCoreSystem', subtitle: 'School Management Application', client: 'School & academy administration', stack: ['Flutter','Firebase Realtime DB','Provider', 'PDF/Printing'], summary: 'A day-to-day academic operations app covering staff attendance, class-level reporting, and student promotion — all with proper PDF exports for official records.', problem: 'School admin staff were tracking attendance and promotion decisions manually across registers, with no easy way to generate official PDF reports or manage bulk staff records.', solution: 'Delivered a Flutter application with staff attendance that correctly accounts for Sunday holidays, class-level attendance reports exportable to PDF, and structured student promotion/demotion dialogs. Added employee ledger screens and bulk staff management tools so administrators can manage the whole institution from one app.', results: ['Attendance reporting reduced from a manual to a one-tap PDF export', 'Promotion/demotion decisions are now tracked with a clear audit trail', 'Bulk staff management replaced individual manual record updates'], features: ['Staff attendance with Sunday holiday logic', 'Class attendance reports with PDF export', 'Student promotion/demotion workflows', 'Employee ledger screens', 'Bulk staff management'] },
  { id: 'saloon-billing', category: 'Business Systems', icon: ICONS.scissors, title: 'Saloon Billing System', subtitle: 'Service Billing with Employee Commission', client: 'Modern Cut', stack: ['Flutter', 'Firebase'], summary: 'A billing system built for Modern Cut salon that also handles the part most off-the-shelf POS software ignores — calculating staff commission on every service performed.', problem: 'Modern Cut needed to bill customers per service, but also had to manually calculate each stylist\'s commission at the end of the month by cross-referencing service records — a slow, error-prone process.', solution: 'Built a Flutter billing system for Modern Cut where every service billed to a customer is automatically attributed to the staff member who performed it, so commission is calculated in real time rather than reconstructed later from paper tickets.', results: ['Staff commission is calculated automatically per service, not monthly by hand', 'Billing and commission tracking now live in one system', 'Reduced end-of-month payout disputes with staff'], features: ['Per-service billing', 'Automatic employee commission calculation', 'Staff performance & earnings tracking', 'Service history per customer'] },
  { id: 'bizpay', category: 'Business Systems', icon: ICONS.wallet, title: 'BizPay', subtitle: 'Web & Mobile Credit Management App', client: 'Alsaeed Sweets & Bakers (current customer)', stack: ['Flutter', 'Web', 'Node.js', 'MySQL'], summary: 'A web and mobile app that lets any company track and manage the credit it extends to customers — who owes what, since when, and what\'s been paid. Currently in use by Alsaeed Sweets & Bakers.', problem: 'Businesses extending credit to customers had no standardized way to track balances, payment history, or outstanding dues across web and mobile — most relied on notebooks or disconnected spreadsheets.', solution: 'Built BizPay as a cross-platform app (web + mobile) so any business can onboard, record credit extended to customers, log repayments, and see outstanding balances in real time from either platform, keeping the two in sync. Alsaeed Sweets & Bakers is the current active customer running their credit operations through it.', results: ['Alsaeed Sweets & Bakers tracks customer credit from web or mobile interchangeably', 'Outstanding balances are visible instantly instead of reconstructed from notebooks', 'Payment history is now searchable per customer'], features: ['Cross-platform: web & mobile', 'Customer credit ledger', 'Repayment logging & history', 'Real-time balance tracking', 'Multi-business support'] },
  { id: 'brainy-buddies', category: 'Education', icon: ICONS.puzzle, title: 'Brainy Buddies', subtitle: 'Children\'s Learning App — Live on Play Store', client: 'Early childhood education', stack: ['Flutter', 'Audio Playback'], summary: 'A learning app for young children that teaches alphabets and counting with audio pronunciation, published and live on the Google Play Store.', problem: 'Parents and early-learning centers needed an engaging, child-friendly way to teach basic alphabets and counting that didn\'t rely on passive video content.', solution: 'Built a Flutter app that pairs visual alphabets and numbers with sound — each letter and number plays its correct pronunciation when tapped, turning a static lesson into an interactive one aimed at pre-school-age learners. Published to the Google Play Store for public download.', results: ['Children learn alphabets and counting through interactive audio-visual feedback', 'Live and publicly available on the Play Store', 'Simple, distraction-free interface built for young users'], features: ['Alphabet learning with audio pronunciation', 'Counting/numbers module with sound', 'Child-friendly, simplified UI', 'Published on Google Play Store'] },
  { id: 'dairy-farm', category: 'Business Systems', icon: ICONS.cow, title: 'Dairy Farm App', subtitle: 'Livestock & Milk Data Tracking', client: 'Dairy farm operator', stack: ['Flutter', 'Firebase', 'Image Upload'], summary: 'An app for tracking individual cows — milk yield, pregnancy status, and photo records — replacing a farm\'s handwritten logbooks.', problem: 'The farm tracked each cow\'s milk output and pregnancy status in handwritten logs, making it hard to spot trends, verify a cow\'s history, or confirm pregnancy status with visual records.', solution: 'Built a Flutter app to log milk details per cow over time, track pregnancy status per animal, and attach photos as visual records — giving the farm a searchable, per-cow history instead of a paper logbook.', results: ['Milk yield per cow is now tracked digitally over time', 'Pregnancy status is recorded with photo evidence per animal', 'Farm records are searchable instead of buried in logbooks'], features: ['Per-cow milk yield logging', 'Pregnancy status tracking', 'Photo attachment per record', 'Historical data per animal'] },
  { id: 'nova-mart', category: 'E-Commerce', icon: ICONS.cart, title: 'Nova Mart', subtitle: 'Multivendor E-Commerce Marketplace', client: 'Online marketplace operator', stack: ['Flutter', 'Node.js', 'MySQL'], summary: 'A Daraz-style multivendor marketplace where multiple sellers list and manage their own products under one shopping app.', problem: 'The client wanted a marketplace model — multiple independent vendors selling through one platform — rather than a single-store e-commerce app, which required vendor-level product and order isolation.', solution: 'Built a multivendor e-commerce platform where each vendor manages their own product catalog and orders, while customers browse and buy across all vendors in a single, unified shopping experience — modeled on marketplaces like Daraz.', results: ['Multiple vendors can operate independently on one shared platform', 'Customers get a single marketplace experience across all sellers'], features: ['Multivendor product & order management', 'Unified customer shopping experience', 'Vendor-level dashboards', 'Cart, checkout & order tracking'] },
  { id: 'sabir-tailor', category: 'Business Systems', icon: ICONS.scale, title: 'Tailor Software', subtitle: 'Measurements, Orders & Worker Wages', client: 'Sabir Tailors Rawalpindi', stack: ['Flutter', 'Firebase'], summary: 'A tailoring management system built for Sabir Tailors in Rawalpindi that stores customer measurements, tracks orders, and calculates worker wages for cutting (katai) and stitching (silai) separately.', problem: 'Sabir Tailors needed a reliable way to store customer measurements for repeat orders, track order status, and pay cutting and stitching workers based on their actual piece-work — all previously tracked on paper.', solution: 'Built a system for Sabir Tailors that stores each customer\'s measurements for future orders, tracks orders through their lifecycle, and separately logs the katai (cutting) and silai (stitching) work each worker completes, automatically calculating their salary from that piece-work.', results: ['Customer measurements are saved and reused across future orders', 'Worker salaries are calculated directly from tracked piece-work', 'Order status is visible without checking with tailors individually'], features: ['Customer measurement records', 'Order tracking & status', 'Katai (cutting) work logging per worker', 'Silai (stitching) work logging per worker', 'Automatic worker salary calculation'] },
  { id: 'family-wear', category: 'E-Commerce', icon: ICONS.cart, title: 'Family Wear App', subtitle: 'E-Commerce Clothing Platform', client: 'Family clothing retail brand', stack: ['Flutter', 'Node.js', 'MySQL'], summary: 'A dedicated e-commerce app for a family clothing brand, giving customers a branded shopping experience separate from a generic marketplace.', problem: 'The brand wanted its own dedicated shopping app rather than relying solely on third-party marketplaces, to build direct customer relationships and control the full buying experience.', solution: 'Built a standalone Flutter e-commerce app with product browsing, cart, and checkout tailored specifically to the Family Wear catalog and brand experience.', results: ['The brand now has a direct-to-customer sales channel', 'Full control over product presentation and customer experience'], features: ['Product catalog & browsing', 'Cart & checkout flow', 'Branded shopping experience', 'Order history for customers'] },
  { id: 'constituency-management', category: 'Civic & Government', icon: ICONS.building, title: 'Constituency Management System', subtitle: 'Voter Registry, Polling Results & Civic Issue Resolution', client: 'MPA Constituency Office', stack: ['Flutter', 'Firebase Realtime DB', 'Node.js', 'Sequelize', 'MySQL'], summary: 'A system for an MPA\'s constituency office to register residents with demographic data, review polling station results across election years, and track local infrastructure complaints through to resolution.', problem: 'The constituency office had no central record of registered residents or their demographics, no structured way to compare polling station results year over year, and civic complaints like broken roads or sewerage issues were reported informally with no tracking of whether or how they were resolved.', solution: 'Built a system where residents register with core demographic details — gender, age, and location — giving the MPA and constituency managers an accurate, searchable picture of the population. Added a polling station module where managers record results per station for the current election and keep prior years\' results alongside them, with report generation for year-over-year comparison. Layered on a civic issue module where residents\' problems (broken roads, sewerage, and similar) are logged by area, assigned a status, and tracked through to resolution, with managers able to generate reports on open vs. resolved issues.', results: ['MPA and managers can view registered population broken down by gender and age', 'Polling station results are compared across current and previous years without manual paperwork', 'Civic issues move from reported to resolved with a visible status and audit trail', 'Managers can generate demographic, election, and issue-resolution reports on demand'], features: ['Resident registration with gender/age demographics', 'MPA & manager dashboard with demographic reports', 'Polling station management (current + historical results)', 'Year-over-year election results comparison reports', 'Civic issue reporting by area (roads, sewerage, etc.)', 'Issue status tracking & resolution workflow', 'Admin/manager role-based access'] },
];

function FilterPill({ label, active, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
      style={{
        border: `1px solid ${active || hover ? colors.accent : colors.border}`,
        backgroundColor: active ? colors.primarySoft : (hover ? colors.surfaceAlt : 'transparent'),
        color: active ? colors.primary : (hover ? colors.textPrimary : colors.textSecondary),
      }}
    >
      {label}
    </button>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      className="group flex flex-col overflow-hidden rounded-2xl transition-colors duration-300"
      style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surface }}
    >
      <div className="flex items-start justify-between gap-4 p-6">
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: colors.primarySoft, color: colors.primary }}
        >
          {project.icon}
        </div>
        <span
          className="rounded-full px-3 py-1 text-[11px] font-medium"
          style={{ border: `1px solid ${colors.primaryBorderSoft}`, backgroundColor: colors.primarySoft, color: colors.primary }}
        >
          {project.category}
        </span>
      </div>

      <div className="flex-1 px-6">
        <h3 className="text-lg font-bold" style={{ color: colors.textPrimary }}>{project.title}</h3>
        <p className="mt-1 text-sm" style={{ color: colors.primary }}>{project.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="rounded-md px-2 py-1 text-[11px]" style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surfaceAlt, color: colors.textMuted }}>
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="rounded-md px-2 py-1 text-[11px]" style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surfaceAlt, color: colors.textMuted }}>
              +{project.stack.length - 3} more
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onOpen(project)}
        className="mt-6 flex items-center gap-1.5 px-6 py-4 text-sm font-semibold transition-colors"
        style={{ borderTop: `1px solid ${colors.border}`, color: colors.primary }}
      >
        View Case Study
        <span className="transition-transform duration-200 group-hover:translate-x-1">{ICONS.arrow}</span>
      </button>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
        style={{ backgroundColor: colors.overlay }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 sm:p-9"
          style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surface }}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.surfaceAlt, color: colors.textSecondary }}
            aria-label="Close"
          >
            {ICONS.close}
          </button>

          <div className="flex items-start gap-4 pr-10">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl" style={{ background: colors.gradientPrimary, color: colors.textOnAccent }}>
              {project.icon}
            </div>
            <div>
              <span className="rounded-full px-3 py-1 text-[11px] font-medium" style={{ border: `1px solid ${colors.primaryBorderSoft}`, backgroundColor: colors.primarySoft, color: colors.primary }}>
                {project.category}
              </span>
              <h2 className="mt-2 text-2xl font-bold sm:text-[26px]" style={{ color: colors.textPrimary }}>{project.title}</h2>
              <p className="mt-1 text-sm" style={{ color: colors.primary }}>{project.subtitle}</p>
            </div>
          </div>

          <p className="mt-5 text-xs uppercase tracking-wider" style={{ color: colors.textMuted }}>Client</p>
          <p className="mt-1 text-sm" style={{ color: colors.textSecondary }}>{project.client}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-md px-2.5 py-1 text-xs" style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surfaceAlt, color: colors.textSecondary }}>
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 grid gap-6">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary }}>The Problem</h4>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{project.problem}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary }}>The Solution</h4>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{project.solution}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary }}>Results</h4>
              <div className="mt-2.5 flex flex-col gap-2.5">
                {project.results.map((r) => (
                  <div key={r} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: colors.successBg, color: colors.success }}>
                      {ICONS.check}
                    </span>
                    <span className="text-sm" style={{ color: colors.textSecondary }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary }}>Key Features</h4>
              <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                {project.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: colors.primarySoft, color: colors.primary }}>
                      {ICONS.check}
                    </span>
                    <span className="text-sm" style={{ color: colors.textSecondary }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Portfolio({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="relative overflow-hidden">
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
            className="mb-4 inline-block rounded-full px-5 py-1.5 text-sm font-medium"
            style={{ border: `1px solid ${colors.primaryBorderSoft}`, backgroundColor: colors.primarySoft, color: colors.primary }}
          >
            Our Portfolio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            style={{ color: colors.textPrimary }}
          >
            Projects We've
            <span style={{ background: colors.gradientText, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              {' '}Actually Shipped
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-2xl text-lg sm:text-xl"
            style={{ color: colors.textSecondary }}
          >
            Every project below is a real system in production for a real
            client — the problem we were solving, what we built, and the
            outcome. Click any project for the full case study.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <PrimaryButton label="Start a Project" onClick={() => onNavigate('/start-project')} />
            <SecondaryButton label="Our Solutions" onClick={() => onNavigate('/solutions')} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 gap-6 pt-8 sm:grid-cols-4"
            style={{ borderTop: `1px solid ${colors.border}` }}
          >
            {[
              [String(PROJECTS.length), 'Featured Projects'],
              [String(CATEGORIES.length - 1), 'Categories Covered'],
              ['50+', 'Projects Delivered'],
              ['4.9★', 'Client Rating'],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold sm:text-3xl" style={{ color: colors.primary }}>{value}</div>
                <div className="mt-1 text-xs sm:text-sm" style={{ color: colors.textSecondary }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="px-5 py-10 sm:px-10 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <FilterPill key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
            ))}
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center" style={{ color: colors.textSecondary }}>
              No projects in this category yet — check back soon.
            </p>
          )}
        </div>
      </motion.section>

      <motion.section
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="px-5 py-16 sm:px-10 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>What Ties These Together</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ color: colors.textPrimary }}>Same Approach, Every Project</h2>
            <p className="mx-auto mt-4 max-w-2xl" style={{ color: colors.textSecondary }}>
              Different industries, same underlying discipline — understand
              the real workflow first, then build software around it.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            <HoverCard icon={ICONS.factory} title="Full Financial Pictures" description="Ledgers, cashbooks, banking, and cheques come together in one system instead of scattered registers and spreadsheets." revealDelay={0} />
            <HoverCard icon={ICONS.store} title="Compliance Built In" description="Tax invoicing, receipt formats, and record-keeping follow local requirements from day one, not as an afterthought." revealDelay={90} />
            <HoverCard icon={ICONS.scale} title="Real Workflow, Not a Template" description="Katai/silai piece-work, salon commission, partial hostel payments — every system mirrors how the business actually operates." revealDelay={180} />
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="px-5 py-20 sm:px-10 lg:px-24"
      >
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl p-12 text-center"
          style={{ background: `linear-gradient(135deg, ${colors.surfaceAlt}, ${colors.surface})` }}
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl" style={{ backgroundColor: colors.primarySoftHover }} />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-3xl" style={{ backgroundColor: colors.purpleSoftHover }} />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: colors.textPrimary }}>
              Want Something
              <span style={{ background: colors.gradientText, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                {' '}Like This?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl" style={{ color: colors.textSecondary }}>
              Tell us about your business and we'll show you exactly how we'd
              approach it — grounded in projects we've already delivered.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PrimaryButton label="Start a Project" onClick={() => onNavigate('/start-project')} />
              <SecondaryButton label="Let's Talk" onClick={() => onNavigate('/contact')} />
            </div>
          </div>
        </div>
      </motion.section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}