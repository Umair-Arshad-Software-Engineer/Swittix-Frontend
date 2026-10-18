import { useState, useEffect } from 'react';
import { PrimaryButton } from './AnimatedButton';
import { SwittixLogo } from './SwittixLogo';
import { colors } from '../theme';

const LINKS = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Solutions', '/solutions'],
  ['Products', '/products'],
  ['Portfolio', '/portfolio'],
];

function NavLink({ label, active, onClick }) {
  const [hover, setHover] = useState(false);
  const color = active ? colors.primary : hover ? colors.textPrimary : colors.textSecondary;

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className="flex flex-col items-center bg-transparent"
    >
      <span
        className="transition-all duration-150"
        style={{
          color,
          fontSize: hover ? 15 : 14.5,
          fontWeight: hover ? 700 : 500,
        }}
      >
        {label}
      </span>
      <span
        className="mt-[5px] h-[2px] rounded-full transition-all duration-200"
        style={{ backgroundColor: colors.primary, width: active ? 22 : hover ? 15 : 0 }}
      />
    </button>
  );
}

export function NavBar({ currentRoute = '/', onNavigate = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [currentRoute]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full h-[56px] sm:h-20 backdrop-blur-md"
        style={{
          backgroundColor: 'var(--header-bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="flex h-full w-full max-w-[1432px] items-center justify-between px-4 sm:px-6 lg:px-10 mx-auto">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center bg-transparent flex-shrink-0"
            style={{ color: colors.textPrimary }} // logo letters use currentColor
            aria-label="Swittix Technologies home"
          >
            <SwittixLogo className="h-6 w-auto sm:h-9 lg:h-10" showTagline={false} />
          </button>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {LINKS.map(([label, path]) => (
              <NavLink
                key={path}
                label={label}
                active={currentRoute === path}
                onClick={() => onNavigate(path)}
              />
            ))}
            <PrimaryButton label="Let's Talk" onClick={() => onNavigate('/contact')} />
          </nav>

          <button
            className="flex md:hidden items-center justify-center p-1.5 -mr-2 tap-target"
            style={{ color: colors.textPrimary }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: colors.overlay }}
            onClick={() => setMenuOpen(false)}
          />

          <div
            className="absolute top-0 right-0 h-full w-[240px] sm:w-[280px] overflow-y-auto border-l"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              animation: 'slideInRight 0.25s ease-out',
            }}
          >
            <div
              className="flex justify-between items-center px-4 py-3 border-b"
              style={{ borderColor: colors.border }}
            >
              <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 tap-target"
                style={{ color: colors.textSecondary }}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="px-3 py-3">
              {LINKS.map(([label, path]) => (
                <button
                  key={path}
                  onClick={() => { setMenuOpen(false); onNavigate(path); }}
                  className="block w-full px-3 py-2.5 text-left text-sm font-medium rounded-lg transition-colors tap-target"
                  style={{
                    color: currentRoute === path ? colors.primary : colors.textPrimary,
                    backgroundColor: currentRoute === path ? colors.primarySoft : 'transparent',
                  }}
                >
                  {label}
                </button>
              ))}

              <div className="my-3 border-t" style={{ borderColor: colors.border }} />

              <div className="px-2">
                <button
                  onClick={() => { setMenuOpen(false); onNavigate('/contact'); }}
                  className="w-full rounded-lg px-4 py-2.5 text-sm font-bold transition-transform active:scale-[0.98] tap-target"
                  style={{
                    background: colors.gradientPrimary,
                    color: colors.textOnAccent,
                  }}
                >
                  Let's Talk
                </button>
              </div>

              <div className="mt-4 px-3">
                <p className="text-[10px] text-center" style={{ color: colors.textMuted }}>
                  © {new Date().getFullYear()} Swittix Technologies
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}