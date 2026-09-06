// src/components/Footer.jsx
const COLUMNS = [
  ['COMPANY', [['About Us', '/about'], ['Our Portfolio', '/portfolio']]],
  ['WHAT WE BUILD', [['Services', '/services'], ['Solutions', '/solutions'], ['Products', '/products']]],
  ['GET STARTED', [['Start a Project', '/start-project'], ['Contact Us', '/contact']]],
];

function FooterColumn({ heading, links, onNavigate }) {
  return (
    <div className="text-center sm:text-left">
      <p className="text-xs font-bold tracking-wide text-[#5B677E]">{heading}</p>
      <div className="mt-3 flex flex-col gap-2.5 items-center sm:items-start">
        {links.map(([label, path]) => (
          <button
            key={label}
            onClick={() => onNavigate(path)}
            className="text-left text-[13px] sm:text-[13.5px] text-[#93A0B8] transition-colors hover:text-[#F3F6FB]"
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
    <footer className="bg-[#0D1220] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-14">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col items-center gap-6 sm:hidden">
          <div className="text-center">
            <p className="text-xl font-extrabold leading-tight text-[#F3F6FB]">
              SWITTIX
              <br />
              TECHNOLOGIES
            </p>
            <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed text-[#5B677E]">
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

        <div className="mt-8 sm:mt-10 border-t border-[#1A2233] pt-4 sm:pt-5">
          <p className="text-center text-xs text-[#5B677E]">
            © {new Date().getFullYear()} Swittix Technologies. Precision in Every Pixel.
          </p>
        </div>
      </div>
    </footer>
  );
}