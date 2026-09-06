// src/components/Footer.jsx
// Columns rebuilt to reflect the site's real pages (confirmed against
// NavBar.jsx and each page's onNavigate calls) instead of placeholder
// links (Careers, Documentation, Blog, Twitter, LinkedIn) that pointed
// to unrelated routes.
const COLUMNS = [
  ['COMPANY', [['About Us', '/about'], ['Our Portfolio', '/portfolio']]],
  ['WHAT WE BUILD', [['Services', '/services'], ['Solutions', '/solutions'], ['Products', '/products']]],
  ['GET STARTED', [['Start a Project', '/start-project'], ['Contact Us', '/contact']]],
];

function FooterColumn({ heading, links, onNavigate }) {
  return (
    <div>
      <p className="text-xs font-bold tracking-wide text-[#5B677E]">{heading}</p>
      <div className="mt-3.5 flex flex-col gap-2.5">
        {links.map(([label, path]) => (
          <button
            key={label}
            onClick={() => onNavigate(path)}
            className="text-left text-[13.5px] text-[#93A0B8] transition-colors hover:text-[#F3F6FB]"
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
    <footer className="bg-[#0D1220] px-5 py-8 sm:px-10 sm:py-14 lg:px-24">
      <div className="mx-auto max-w-[1240px]">
        {/* Mobile: logo + tagline, then columns wrap centered */}
        <div className="flex flex-col items-center gap-7 text-center sm:hidden">
          <div>
            <p className="text-xl font-extrabold leading-tight text-[#F3F6FB]">
              SWITTIX
              <br />
              TECHNOLOGIES
            </p>
            <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed text-[#5B677E]">
              Custom software, web, and business systems built around how you actually work.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {COLUMNS.map(([heading, links]) => (
              <FooterColumn key={heading} heading={heading} links={links} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        {/* Desktop: logo/tagline column + 3 link columns */}
        <div className="hidden sm:grid sm:grid-cols-[3fr_2fr_2fr_2fr] sm:gap-8">
          <div>
            <p className="text-xl font-extrabold leading-tight text-[#F3F6FB]">
              SWITTIX
              <br />
              TECHNOLOGIES
            </p>
            <p className="mt-3 max-w-[260px] text-[13.5px] leading-relaxed text-[#5B677E]">
              Custom software, web, and business systems built around how you actually work.
            </p>
          </div>
          {COLUMNS.map(([heading, links]) => (
            <FooterColumn key={heading} heading={heading} links={links} onNavigate={onNavigate} />
          ))}
        </div>

        <div className="mt-10 border-t border-[#1A2233] pt-5">
          <p className="text-center text-xs text-[#5B677E] sm:text-left">
            © {new Date().getFullYear()} Swittix Technologies. Precision in Every Pixel.
          </p>
        </div>
      </div>
    </footer>
  );
}