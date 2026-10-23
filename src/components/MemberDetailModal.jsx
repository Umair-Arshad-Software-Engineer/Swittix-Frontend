import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { PrimaryButton } from './AnimatedButton';
import { colors } from '../theme';

const ICONS = {
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  close: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export function MemberDetailModal({ member, onClose, onNavigate }) {
  // ESC to close + scroll lock
  useEffect(() => {
    if (!member) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
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
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.surfaceAlt, color: colors.textSecondary }}
              aria-label="Close"
            >
              {ICONS.close}
            </button>

            {/* Header: icon badge + name + role + tag pill */}
            <div className="flex items-start gap-4 pr-10">
              <div
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl"
                style={{ background: colors.gradientPrimary, color: colors.textOnAccent }}
              >
                {/* Use the photo for a more personal touch, fall back to icon */}
                <img src={member.image} alt={member.alt} className="h-full w-full object-cover object-[center_20%]" />
              </div>
              <div>
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-medium"
                  style={{
                    border: `1px solid ${colors.primaryBorderSoft}`,
                    backgroundColor: colors.primarySoft,
                    color: colors.primary,
                  }}
                >
                  {member.tag || member.role}
                </span>
                <h2 className="mt-2 text-2xl font-bold sm:text-[26px]" style={{ color: colors.textPrimary }}>
                  {member.name}
                </h2>
                <p className="mt-1 text-sm" style={{ color: colors.primary }}>{member.role}</p>
              </div>
            </div>

            {/* Meta line: location + email */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              {member.location && (
                <span style={{ color: colors.textSecondary }}>📍 {member.location}</span>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  style={{ color: colors.primary }}
                  className="hover:underline"
                >
                  ✉️ {member.email}
                </a>
              )}
            </div>

            {/* About */}
            <div className="mt-7">
              <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary }}>
                About
              </h4>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                {member.bio}
              </p>
            </div>

            {/* Expertise */}
            {member.skills?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary }}>
                  Expertise
                </h4>
                {member.expertiseIntro && (
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                    {member.expertiseIntro}
                  </p>
                )}
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {member.skills.map((skill) => (
                    <div key={skill} className="flex items-start gap-2.5">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: colors.primarySoft, color: colors.primary }}
                      >
                        {ICONS.check}
                      </span>
                      <span className="text-sm" style={{ color: colors.textSecondary }}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {member.highlights?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary }}>
                  Highlights
                </h4>
                <div className="mt-2.5 flex flex-col gap-2.5">
                  {member.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: colors.successBg, color: colors.success }}
                      >
                        {ICONS.check}
                      </span>
                      <span className="text-sm" style={{ color: colors.textSecondary }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton
                label="Work With Us"
                onClick={() => {
                  onClose();
                  onNavigate?.('/start-project');
                }}
              />
              {/* {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
                  style={{
                    border: `1px solid ${colors.primaryBorderSoft}`,
                    color: colors.primary,
                    backgroundColor: colors.primarySoft,
                  }}
                >
                  Contact {member.name.split(' ')[0]}
                </a>
              )} */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}