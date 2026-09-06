import { AnimatedButton } from './AnimatedButton';

export function CtaBand({ onNavigate }) {
  return (
    <section className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-16">
      <div
        className="rounded-2xl sm:rounded-[28px] px-4 sm:px-6 lg:px-16 py-8 sm:py-11 lg:py-16 text-center"
        style={{
          background: 'linear-gradient(to bottom right,#2F6FED,#3B82F6)',
          boxShadow: '0 20px 40px -8px rgba(47,111,237,0.18)',
        }}
      >
        <p className="text-[10px] sm:text-sm font-bold tracking-[1.5px] sm:tracking-[2px] text-white/70">HAVE AN IDEA?</p>
        <h2 className="mt-2 sm:mt-2.5 text-2xl sm:text-[32px] lg:text-[48px] font-extrabold text-white">Let's Build It.</h2>
        <p className="mx-auto mt-2 sm:mt-3.5 max-w-[600px] text-sm sm:text-[15px] leading-[1.6] text-white/70 px-2">
          Partner with Swittix Technologies to transform your idea into a powerful digital product.
        </p>
        <div className="mt-5 sm:mt-[30px] flex justify-center">
          <button
            onClick={() => onNavigate('/contact')}
            className="group relative overflow-hidden rounded-[10px] bg-white px-4 sm:px-6 py-3 sm:py-[15px] text-sm sm:text-base font-extrabold text-[#2F6FED] shadow-lg transition-transform duration-150 hover:scale-[1.03] active:scale-[0.96]"
          >
            <span className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-[#2F6FED]/10 to-transparent" />
            <span className="relative z-10 inline-flex items-center gap-1.5 sm:gap-2">
              Start the Conversation
              <svg
                width="15" height="15" sm:width="17" sm:height="17"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}