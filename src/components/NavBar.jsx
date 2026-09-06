import { useState, useEffect } from 'react';
import { PrimaryButton } from './AnimatedButton';
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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [currentRoute]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-[56px] sm:h-20 bg-[#05070C]/95 backdrop-blur-md border-b border-[#1A2233]/50">
        <div className="flex h-full w-full max-w-[1432px] items-center justify-between px-4 sm:px-6 lg:px-10 mx-auto">
          {/* Logo - always visible */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center bg-transparent flex-shrink-0"
            aria-label="Swittix Technologies home"
          >
            <img
              src={swittixLogo}
              alt="Swittix Technologies"
              className="h-6 w-auto sm:h-9 lg:h-10"
            />
          </button>

          {/* Desktop Navigation - hidden on mobile, visible on md+ */}
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

          {/* Mobile Menu Button - visible on mobile only */}
          <button
            className="flex md:hidden items-center justify-center text-[#F3F6FB] p-1.5 -mr-2 tap-target"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu - slides in from right */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setMenuOpen(false)} 
          />
          
          {/* Drawer Panel - slides from right, smaller size */}
          <div 
            className="absolute top-0 right-0 h-full w-[240px] sm:w-[280px] bg-[#0A0E17] border-l border-[#1A2233] overflow-y-auto"
            style={{
              animation: 'slideInRight 0.25s ease-out'
            }}
          >
            {/* Header with close button - smaller */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-[#1A2233]">
              <span className="text-sm font-bold text-[#F3F6FB]">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 text-[#93A0B8] hover:text-[#F3F6FB] tap-target"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links - smaller */}
            <div className="px-3 py-3">
              {LINKS.map(([label, path]) => (
                <button
                  key={path}
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate(path);
                  }}
                  className="block w-full px-3 py-2.5 text-left text-sm font-medium rounded-lg transition-colors tap-target"
                  style={{ 
                    color: currentRoute === path ? '#6FA0FF' : '#F3F6FB',
                    backgroundColor: currentRoute === path ? 'rgba(47,111,237,0.1)' : 'transparent'
                  }}
                >
                  {label}
                </button>
              ))}
              
              {/* Divider - thinner */}
              <div className="my-3 border-t border-[#1A2233]" />
              
              {/* CTA Button - smaller */}
              <div className="px-2">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate('/contact');
                  }}
                  className="w-full rounded-lg bg-gradient-to-br from-[#2F6FED] to-[#3B82F6] px-4 py-2.5 text-sm font-bold text-white transition-transform active:scale-[0.98] tap-target"
                >
                  Let's Talk
                </button>
              </div>

              {/* Footer - smaller */}
              <div className="mt-4 px-3">
                <p className="text-[10px] text-[#5B677E] text-center">
                  © {new Date().getFullYear()} Swittix Technologies
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add animation keyframes */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}