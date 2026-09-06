// src/components/About.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PrimaryButton, SecondaryButton } from './AnimatedButton';
import { HoverCard, useInView } from './Sections';

import umairImage from '../assets/images/umair.jpeg';
import aliImage from '../assets/images/ali.jpeg';
import maryamImage from '../assets/images/maryam.jpeg';
import sufyanImage from '../assets/images/sufyan.jpeg';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function TeamCard({ image, alt, name, role, revealDelay = 0 }) {
  const [hover, setHover] = useState(false);
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="rounded-2xl border bg-[#0A0E17] p-4 sm:p-8 text-center"
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
        borderColor: hover ? 'rgba(47,111,237,0.4)' : '#1A2233',
        boxShadow: hover ? '0 12px 30px -4px rgba(47,111,237,0.12)' : 'none',
      }}
    >
      <div
        className="relative mx-auto mb-4 sm:mb-5 h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full transition-all duration-300"
        style={{
          background: hover
            ? 'linear-gradient(to bottom right, rgba(111,160,255,0.2), rgba(167,139,250,0.2))'
            : 'linear-gradient(to bottom right, rgba(111,160,255,0.1), rgba(167,139,250,0.1))',
        }}
      >
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover object-[center_20%] transition-transform duration-300"
          style={{ transform: hover ? 'scale(1.1)' : 'scale(1)' }}
        />
        <div
          className="absolute inset-0 rounded-full ring-2 transition-all duration-300"
          style={{ borderColor: 'transparent', boxShadow: hover ? '0 0 0 2px rgba(111,160,255,0.3)' : '0 0 0 0 rgba(111,160,255,0)' }}
        />
      </div>
      <h4 className="text-base sm:text-lg font-semibold text-[#F3F6FB]">{name}</h4>
      <p className="text-xs sm:text-sm text-[#6FA0FF]">{role}</p>
    </div>
  );
}

export function About({ onNavigate }) {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
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
            className="mb-3 sm:mb-4 inline-block rounded-full border border-[#6FA0FF]/30 bg-[#6FA0FF]/10 px-3 sm:px-5 py-1 text-xs sm:text-sm font-medium text-[#6FA0FF]"
          >
            Who We Are
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-4 sm:mb-6 text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#F3F6FB]"
          >
            Building the Future of
            <span className="bg-gradient-to-r from-[#6FA0FF] to-[#A78BFA] bg-clip-text text-transparent">
              {' '}Digital Innovation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-2xl text-base sm:text-lg lg:text-xl text-[#93A0B8]"
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

      {/* Our Story Section */}
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
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#6FA0FF]">
                Our Story
              </span>
              <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl font-bold text-[#F3F6FB]">
                Innovation Meets
                <span className="bg-gradient-to-r from-[#6FA0FF] to-[#A78BFA] bg-clip-text text-transparent">
                  {' '}Excellence
                </span>
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#93A0B8]">
                Founded with a passion for technology and a vision to transform ideas into
                impactful digital solutions, Swittix Technologies has grown into a trusted
                partner for businesses worldwide.
              </p>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#93A0B8]">
                We believe in the power of technology to solve complex problems and create
                meaningful connections. Our team brings together diverse expertise in
                software development, design, and business strategy to deliver solutions
                that exceed expectations.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative rounded-2xl bg-gradient-to-br from-[#6FA0FF]/10 to-[#A78BFA]/10 p-6 sm:p-8"
            >
              <div className="absolute -right-4 -top-4 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-[#6FA0FF]/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-[#A78BFA]/20 blur-2xl" />
              <div className="relative grid grid-cols-2 gap-3 sm:gap-6">
                <div className="rounded-xl bg-[#0A0E17] p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#6FA0FF]">50+</div>
                  <div className="mt-1 text-xs sm:text-sm text-[#93A0B8]">Projects Delivered</div>
                </div>
                <div className="rounded-xl bg-[#0A0E17] p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#A78BFA]">4.9★</div>
                  <div className="mt-1 text-xs sm:text-sm text-[#93A0B8]">Client Rating</div>
                </div>
                <div className="rounded-xl bg-[#0A0E17] p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#6FA0FF]">30+</div>
                  <div className="mt-1 text-xs sm:text-sm text-[#93A0B8]">Team Members</div>
                </div>
                <div className="rounded-xl bg-[#0A0E17] p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#A78BFA]">5+</div>
                  <div className="mt-1 text-xs sm:text-sm text-[#93A0B8]">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Values */}
      <motion.section
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#6FA0FF]">
              What Drives Us
            </span>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl font-bold text-[#F3F6FB]">
              Our Mission & Values
            </h2>
          </motion.div>

          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🎯",
                title: "Purpose-Driven",
                description: "We build solutions with clear purpose, ensuring every line of code serves a meaningful goal.",
              },
              {
                icon: "💡",
                title: "Innovation First",
                description: "We embrace emerging technologies and push boundaries to create cutting-edge solutions.",
              },
              {
                icon: "🤝",
                title: "Client Partnership",
                description: "We treat our clients as partners, working alongside them to achieve shared success.",
              },
              {
                icon: "⚡",
                title: "Excellence Always",
                description: "We hold ourselves to the highest standards of quality, performance, and reliability.",
              },
              {
                icon: "🌍",
                title: "Global Mindset",
                description: "We think globally, bringing diverse perspectives and international best practices.",
              },
              {
                icon: "🚀",
                title: "Growth Oriented",
                description: "We're committed to continuous learning and helping our clients grow alongside us.",
              },
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

      {/* Team Section */}
      <motion.section
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#6FA0FF]">
              Our Team
            </span>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl font-bold text-[#F3F6FB]">
              Meet the People Behind
              <span className="bg-gradient-to-r from-[#6FA0FF] to-[#A78BFA] bg-clip-text text-transparent">
                {' '}the Magic
              </span>
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-[#93A0B8]">
              A passionate team of developers, designers, and strategists committed to
              bringing your vision to life.
            </p>
          </motion.div>

          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                name: "Umair Arshad", 
                role: "CEO & Founder", 
                image: umairImage,
                alt: "Umair Arshad - CEO & Founder"
              },
              { 
                name: "Maryam Arshad", 
                role: "Marketing Director", 
                image: maryamImage,
                alt: "Maryam Arshad - Marketing Director"
              },
              { 
                name: "Sufyan Butt", 
                role: "Senior Software Developer", 
                image: sufyanImage,
                alt: "Sufyan Butt - Senior Software Developer"
              },
              { 
                name: "Ali Haider", 
                role: "Junior Software Developer", 
                image: aliImage,
                alt: "Ali Haider - Junior Software Developer"
              },
            ].map((member, index) => (
              <TeamCard
                key={member.name}
                image={member.image}
                alt={member.alt}
                name={member.name}
                role={member.role}
                revealDelay={(index % 4) * 90}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20"
      >
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0A0E17] to-[#0F1623] p-6 sm:p-12 text-center">
          <div className="absolute -right-20 -top-20 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-[#6FA0FF]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-[#A78BFA]/10 blur-3xl" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#F3F6FB]">
              Ready to Build Something
              <span className="bg-gradient-to-r from-[#6FA0FF] to-[#A78BFA] bg-clip-text text-transparent">
                {' '}Amazing?
              </span>
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-[#93A0B8]">
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
    </div>
  );
}