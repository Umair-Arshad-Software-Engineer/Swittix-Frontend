import { useState } from 'react';
import { PrimaryButton } from './AnimatedButton';
// Adjust this relative path if NavBar.jsx lives somewhere other than src/components
import swittixLogo from '../assets/images/swittixlogo.png';

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
  const color = active ? '#6FA0FF' : hover ? '#F3F6FB' : '#93A0B8';

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
        className="mt-[5px] h-[2px] rounded-full bg-[#6FA0FF] transition-all duration-200"
        style={{ width: active ? 22 : hover ? 15 : 0 }}
      />
    </button>
  );
}

export function NavBar({ currentRoute = '/', onNavigate = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-20 bg-[#05070C]/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1432px] items-center px-5 sm:px-10 lg:px-24">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center bg-transparent"
          aria-label="Swittix Technologies home"
        >
          <img
            src={swittixLogo}
            alt="Swittix Technologies"
            className="h-9 w-auto sm:h-10"
          />
        </button>

        <div className="flex-1" />

        <nav className="hidden items-center gap-[26px] md:flex">
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
          className="text-[#F3F6FB] md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-[#0A0E17] pb-6 pt-3">
            <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#1A2233]" />
            {LINKS.map(([label, path]) => (
              <button
                key={path}
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate(path);
                }}
                className="block w-full px-6 py-3 text-left font-semibold"
                style={{ color: currentRoute === path ? '#6FA0FF' : '#F3F6FB' }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                onNavigate('/contact');
              }}
              className="block w-full px-6 py-3 text-left font-bold text-[#6FA0FF]"
            >
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </header>
  );
}