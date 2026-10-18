import { colors } from '../theme';

const COLUMNS = [
  ['COMPANY', [['About Us', '/about'], ['Our Portfolio', '/portfolio']]],
  ['WHAT WE BUILD', [['Services', '/services'], ['Solutions', '/solutions'], ['Products', '/products']]],
  ['GET STARTED', [['Start a Project', '/start-project'], ['Contact Us', '/contact']]],
];

// Footer stays dark for visual grounding (standard pattern — Vercel/Stripe/Linear).
// To make it light: change surface → colors.surfaceAlt and swap text tokens.
const FOOTER = {
  bg: '#0F1623',
  heading: '#7D8CA6',
  link: '#A8B4CC',
  linkHover: '#FFFFFF',
  body: '#8B97AC',
  border: '#263049',
  title: '#F3F6FB',
};

function FooterColumn({ heading, links, onNavigate }) {
  return (
    <div className="text-center sm:text-left">
      <p className="text-xs font-bold tracking-wide" style={{ color: FOOTER.heading }}>{heading}</p>
      <div className="mt-3 flex flex-col gap-2.5 items-center sm:items-start">
        {links.map(([label, path]) => (
          <button
            key={label}
            onClick={() => onNavigate(path)}
            className="text-left text-[13px] sm:text-[13.5px] transition-colors"
            style={{ color: FOOTER.link }}
            onMouseEnter={(e) => (e.currentTarget.style.color = FOOTER.linkHover)}
            onMouseLeave={(e) => (e.currentTarget.style.color = FOOTER.link)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Footer({ onNavigate = () => {} }) {
  return (
    <footer className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-14" style={{ backgroundColor: FOOTER.bg }}>
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col items-center gap-6 sm:hidden">
          <div className="text-center">
            <p className="text-xl font-extrabold leading-tight" style={{ color: FOOTER.title }}>
              SWITTIX<br />TECHNOLOGIES
            </p>
            <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed" style={{ color: FOOTER.body }}>
              Custom software, web, and business systems built around how you actually work.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {COLUMNS.map(([heading, links]) => (
              <FooterColumn key={heading} heading={heading} links={links} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        <div className="hidden sm:grid sm:grid-cols-[2fr_1.5fr_1.5fr_1.5fr] lg:grid-cols-[3fr_2fr_2fr_2fr] gap-6 lg:gap-8">
          <div>
            <p className="text-xl font-extrabold leading-tight" style={{ color: FOOTER.title }}>
              SWITTIX<br />TECHNOLOGIES
            </p>
            <p className="mt-3 max-w-[260px] text-[13.5px] leading-relaxed" style={{ color: FOOTER.body }}>
              Custom software, web, and business systems built around how you actually work.
            </p>
          </div>
          {COLUMNS.map(([heading, links]) => (
            <FooterColumn key={heading} heading={heading} links={links} onNavigate={onNavigate} />
          ))}
        </div>

        <div className="mt-8 sm:mt-10 pt-4 sm:pt-5" style={{ borderTop: `1px solid ${FOOTER.border}` }}>
          <p className="text-center text-xs" style={{ color: FOOTER.body }}>
            © {new Date().getFullYear()} Swittix Technologies. Precision in Every Pixel.
          </p>
        </div>
      </div>
    </footer>
  );
}