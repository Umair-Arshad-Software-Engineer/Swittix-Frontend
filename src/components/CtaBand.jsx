import { AnimatedButton } from './AnimatedButton';

export function CtaBand({ onNavigate }) {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-10 sm:py-16 lg:px-24">
      <div
        className="rounded-[28px] px-6 py-11 text-center sm:px-16 sm:py-16"
        style={{
          background: 'linear-gradient(to bottom right,#2F6FED,#3B82F6)',
          boxShadow: '0 20px 40px -8px rgba(47,111,237,0.18)',
        }}
      >
        <p className="text-sm font-bold tracking-[2px] text-white/70">HAVE AN IDEA?</p>
        <h2 className="mt-2.5 text-[32px] font-extrabold text-white sm:text-[48px]">Let's Build It.</h2>
        <p className="mx-auto mt-3.5 max-w-[600px] text-[15px] leading-[1.6] text-white/70">
          Partner with Swittix Technologies to transform your idea into a powerful digital product.
        </p>
        <div className="mt-[30px] flex justify-center">
          <button
            onClick={() => onNavigate('/contact')}
            className="group relative overflow-hidden rounded-[10px] bg-white px-6 py-[15px] font-extrabold text-[#2F6FED] shadow-lg transition-transform duration-150 hover:scale-[1.03] active:scale-[0.96]"
          >
            <span className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-[#2F6FED]/10 to-transparent" />
            <span className="relative z-10 inline-flex items-center gap-2">
              Start the Conversation
              <svg
                width="17"
                height="17"
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
