import { useState } from 'react';
import { motion } from 'framer-motion';
import { PrimaryButton, SecondaryButton } from './AnimatedButton';
import { HoverCard, useInView } from './Sections';
import { colors } from '../theme';
import { teamMembers } from '../data/teamMembers';
import { MemberDetailModal } from './MemberDetailModal';

const fadeInUp = { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };
const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 } };
const staggerChildren = { animate: { transition: { staggerChildren: 0.15 } } };

function TeamCard({ image, alt, name, role, revealDelay = 0, onClick }) {
  const [hover, setHover] = useState(false);
  const [ref, inView] = useInView();

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full rounded-2xl p-4 text-center sm:p-8"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? hover
            ? 'translateY(-6px) scale(1)'
            : 'translateY(0) scale(1)'
          : 'translateY(0) scale(0.82)',
        transformOrigin: 'center center',
        transitionProperty: 'opacity, transform, border-color, box-shadow',
        transitionDuration: inView && !hover ? '600ms' : '200ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: inView ? `${revealDelay}ms` : '0ms',
        backgroundColor: colors.surface,
        border: `1px solid ${hover ? colors.primaryBorderSoft : colors.border}`,
        boxShadow: hover ? '0 12px 30px -4px rgba(15,27,45,0.10)' : 'none',
        cursor: 'pointer',
      }}
    >
      <div
        className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full transition-all duration-300 sm:mb-5 sm:h-32 sm:w-32"
        style={{ background: hover ? colors.primarySoftHover : colors.primarySoft }}
      >
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover object-[center_20%] transition-transform duration-300"
          style={{ transform: hover ? 'scale(1.1)' : 'scale(1)' }}
        />
        <div
          className="absolute inset-0 rounded-full ring-2 transition-all duration-300"
          style={{
            borderColor: 'transparent',
            boxShadow: hover ? `0 0 0 2px ${colors.primaryBorderSoft}` : 'none',
          }}
        />
      </div>
      <h4 className="text-base font-semibold sm:text-lg" style={{ color: colors.textPrimary }}>{name}</h4>
      <p className="text-xs sm:text-sm" style={{ color: colors.primary }}>{role}</p>
      <span
        className="mt-2 inline-block text-[11px] font-medium transition-opacity duration-200 sm:text-xs"
        style={{ color: colors.primary, opacity: hover ? 1 : 0.6 }}
      >
        View details →
      </span>
    </button>
  );
}

export function About({ onNavigate }) {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="relative overflow-hidden">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 pb-12 sm:pb-16"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-3 sm:mb-4 inline-block rounded-full px-3 sm:px-5 py-1 text-xs sm:text-sm font-medium"
            style={{
              border: `1px solid ${colors.primaryBorderSoft}`,
              backgroundColor: colors.primarySoft,
              color: colors.primary,
            }}
          >
            Who We Are
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-4 sm:mb-6 text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ color: colors.textPrimary }}
          >
            Building the Future of
            <span
              style={{
                background: colors.gradientText,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {' '}Digital Innovation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-2xl text-base sm:text-lg lg:text-xl"
            style={{ color: colors.textSecondary }}
          >
            Swittix Technologies is a forward-thinking software development company
            dedicated to crafting exceptional digital experiences that drive business
            growth and technological advancement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4"
          >
            <PrimaryButton label="Start a Project" onClick={() => onNavigate('/start-project')} />
            <SecondaryButton label="View Our Work" onClick={() => onNavigate('/portfolio')} />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div variants={fadeInUp}>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>
                Our Story
              </span>
              <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl font-bold" style={{ color: colors.textPrimary }}>
                Innovation Meets
                <span
                  style={{
                    background: colors.gradientText,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {' '}Excellence
                </span>
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base" style={{ color: colors.textSecondary }}>
                Founded with a passion for technology and a vision to transform ideas into
                impactful digital solutions, Swittix Technologies has grown into a trusted
                partner for businesses worldwide.
              </p>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base" style={{ color: colors.textSecondary }}>
                We believe in the power of technology to solve complex problems and create
                meaningful connections. Our team brings together diverse expertise in
                software development, design, and business strategy to deliver solutions
                that exceed expectations.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative rounded-2xl p-6 sm:p-8"
              style={{ background: `linear-gradient(135deg, ${colors.primarySoft}, ${colors.purpleSoft})` }}
            >
              <div className="absolute -right-4 -top-4 h-16 w-16 sm:h-24 sm:w-24 rounded-full blur-2xl" style={{ backgroundColor: colors.primarySoftHover }} />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 sm:h-24 sm:w-24 rounded-full blur-2xl" style={{ backgroundColor: colors.purpleSoftHover }} />
              <div className="relative grid grid-cols-2 gap-3 sm:gap-6">
                {[
                  { value: '50+', label: 'Projects Delivered', accent: colors.primary },
                  { value: '4.9★', label: 'Client Rating', accent: colors.purple },
                  { value: '30+', label: 'Team Members', accent: colors.primary },
                  { value: '5+', label: 'Years of Excellence', accent: colors.purple },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl p-4 sm:p-6 text-center" style={{ backgroundColor: colors.surface }}>
                    <div className="text-2xl sm:text-3xl font-bold" style={{ color: stat.accent }}>{stat.value}</div>
                    <div className="mt-1 text-xs sm:text-sm" style={{ color: colors.textSecondary }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>
              What Drives Us
            </span>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl font-bold" style={{ color: colors.textPrimary }}>
              Our Mission & Values
            </h2>
          </motion.div>

          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🎯", title: "Purpose-Driven", description: "We build solutions with clear purpose, ensuring every line of code serves a meaningful goal." },
              { icon: "💡", title: "Innovation First", description: "We embrace emerging technologies and push boundaries to create cutting-edge solutions." },
              { icon: "🤝", title: "Client Partnership", description: "We treat our clients as partners, working alongside them to achieve shared success." },
              { icon: "⚡", title: "Excellence Always", description: "We hold ourselves to the highest standards of quality, performance, and reliability." },
              { icon: "🌍", title: "Global Mindset", description: "We think globally, bringing diverse perspectives and international best practices." },
              { icon: "🚀", title: "Growth Oriented", description: "We're committed to continuous learning and helping our clients grow alongside us." },
            ].map((item, index) => (
              <HoverCard
                key={item.title}
                icon={<span className="text-xl sm:text-2xl leading-none">{item.icon}</span>}
                title={item.title}
                description={item.description}
                revealDelay={(index % 3) * 90}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>
              Our Team
            </span>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl font-bold" style={{ color: colors.textPrimary }}>
              Meet the People Behind
              <span
                style={{
                  background: colors.gradientText,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {' '}the Magic
              </span>
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base" style={{ color: colors.textSecondary }}>
              A passionate team of developers, designers, and strategists committed to
              bringing your vision to life.
            </p>
          </motion.div>

          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-5">
            {teamMembers.map((member, index) => (
              <TeamCard
                key={member.id}
                image={member.image}
                alt={member.alt}
                name={member.name}
                role={member.role}
                revealDelay={(index % 5) * 90}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20"
      >
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center"
          style={{ background: `linear-gradient(135deg, ${colors.surfaceAlt}, ${colors.surface})` }}
        >
          <div className="absolute -right-20 -top-20 h-48 w-48 sm:h-64 sm:w-64 rounded-full blur-3xl" style={{ backgroundColor: colors.primarySoftHover }} />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 sm:h-64 sm:w-64 rounded-full blur-3xl" style={{ backgroundColor: colors.purpleSoftHover }} />
          <div className="relative">
            <h2 className="text-2xl sm:text-4xl font-bold" style={{ color: colors.textPrimary }}>
              Ready to Build Something
              <span
                style={{
                  background: colors.gradientText,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {' '}Amazing?
              </span>
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base" style={{ color: colors.textSecondary }}>
              Let's turn your ideas into reality. Whether you're starting from scratch or
              looking to scale, we're here to help.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <PrimaryButton label="Start a Project" onClick={() => onNavigate('/start-project')} />
              <SecondaryButton label="Let's Talk" onClick={() => onNavigate('/contact')} />
            </div>
          </div>
        </div>
      </motion.section>

      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onNavigate={onNavigate}
      />
    </div>
  );
}