import umairImage from '../assets/images/umair.jpeg';
import aliImage from '../assets/images/ali.jpeg';
import maryamImage from '../assets/images/maryam.jpg';
import sufyanImage from '../assets/images/sufyan.jpeg';
import shahmeerImage from '../assets/images/shahmeer.jpg';

// Simple inline icons (match the style of your portfolio ICONS)
const ICONS = {
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  megaphone: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 11v2a1 1 0 001 1h2l4 3V7L6 10H4a1 1 0 00-1 1zM14 8a4 4 0 010 8M17 5a8 8 0 010 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  layers: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  mobile: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 18h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  spark: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
};

export const teamMembers = [
  {
    id: 'umair-arshad',
    name: 'Umair Arshad',
    role: 'CEO & Founder',
    tag: 'Leadership',
    icon: ICONS.code,
    image: umairImage,
    alt: 'Umair Arshad - CEO & Founder',
    shortBio:
      'Visionary leader driving Swittix Technologies forward with a passion for building scalable digital products.',
    bio: `Umair Arshad is the CEO and Founder of Swittix Technologies — and he's a hands-on developer, not just a manager. He builds real products day-to-day: Flutter on the front end, PHP Laravel where it fits, Node.js on the back end, MySQL as his primary database, and Firebase with Flutter for real-time and mobile-first applications. That technical depth is what lets him lead the team with practical, architectural insight rather than theory.`,
    expertiseIntro:
      'A full-stack builder across mobile, web, and backend — from UI to database schema.',
    skills: [
      'Flutter (Front End)',
      'PHP Laravel',
      'Node.js (Back End)',
      'MySQL Database',
      'Firebase with Flutter',
      'Team Leadership',
      'Product Strategy',
    ],
    highlights: [
      'Founded Swittix Technologies',
      'Led 50+ successful project deliveries',
      'Hands-on developer across mobile and web',
      'Architects end-to-end product builds',
    ],
    email: 'swittixtechnologies@gmail.com',
    location: 'Pakistan',
  },
  {
    id: 'maryam-arshad',
    name: 'Maryam Arshad',
    role: 'Marketing Director',
    tag: 'Marketing',
    icon: ICONS.megaphone,
    image: maryamImage,
    alt: 'Maryam Arshad - Marketing Director',
    shortBio:
      'Drives brand growth and client engagement through strategic marketing and communication.',
    bio: `Maryam Arshad leads marketing and brand strategy at Swittix Technologies. She shapes how the company communicates its value — building meaningful connections with clients and partners through digital marketing, content strategy, and relationship management.`,
    expertiseIntro:
      'Focuses on brand voice, audience growth, and keeping client relationships genuine.',
    skills: [
      'Digital Marketing',
      'Brand Strategy',
      'Content Marketing',
      'Client Relations',
      'Social Media Strategy',
    ],
    highlights: [
      'Built the Swittix brand identity',
      'Grew client engagement across channels',
      'Leads strategic partnerships',
    ],
    // email: 'maryam@swittix.com',
    location: 'Pakistan',
  },
  {
    id: 'sufyan-butt',
    name: 'Sufyan Butt',
    role: 'Senior Software Developer',
    tag: 'Engineering',
    icon: ICONS.layers,
    image: sufyanImage,
    alt: 'Sufyan Butt - Senior Software Developer',
    shortBio:
      'Senior developer architecting robust, scalable software solutions across the stack.',
    bio: `Sufyan Butt is a Senior Software Developer at Swittix Technologies. He architects and builds complex software systems, reviews code, and mentors junior developers. His expertise spans backend architecture, API design, and full-stack development.`,
    expertiseIntro:
      'Owns system architecture and makes sure code quality stays high across every project.',
    skills: [
      'Backend Architecture',
      'API Design',
      'Full-Stack Development',
      'Code Review & Mentoring',
      'Database Design',
    ],
    highlights: [
      'Leads complex system architecture',
      'Mentors the development team',
      'Delivers production-grade software',
    ],
    // email: 'sufyan@swittix.com',
    location: 'Pakistan',
  },
  {
    id: 'shahmeer-akhtar',
    name: 'Shahmeer Akhtar',
    role: 'Flutter Developer & Core Python Developer',
    tag: 'Engineering',
    icon: ICONS.mobile,
    image: shahmeerImage,
    alt: 'Shahmeer Akhtar - Flutter Developer & Core Python Developer',
    shortBio:
      'Builds cross-platform mobile apps with Flutter and powerful backend tooling with core Python.',
    bio: `Shahmeer Akhtar specializes in Flutter development and core Python development. He builds smooth, cross-platform mobile experiences with Flutter and develops robust Python-based tools and services on the backend — bridging polished mobile front ends and reliable backend logic.`,
    expertiseIntro:
      'Splits his time between Flutter UI and Python-powered backend tooling.',
    skills: [
      'Flutter',
      'Dart',
      'Core Python',
      'Mobile App Development',
      'Backend Scripting',
      'Cross-Platform Development',
    ],
    highlights: [
      'Delivers cross-platform Flutter apps',
      'Builds Python-based backend tooling',
      'Focus on performance and clean UI',
    ],
    // email: 'shahmeer@swittix.com',
    location: 'Pakistan',
  },
  {
    id: 'ali-haider',
    name: 'Ali Haider',
    role: 'Junior Software Developer',
    tag: 'Engineering',
    icon: ICONS.spark,
    image: aliImage,
    alt: 'Ali Haider - Junior Software Developer',
    shortBio:
      'Eager developer building experience across the stack while shipping real features.',
    bio: `Ali Haider is a Junior Software Developer at Swittix Technologies. He is actively growing his skills across the stack, contributing to real projects, and learning from the senior team. His enthusiasm and willingness to take on challenges make him a valuable part of the team.`,
    expertiseIntro:
      'Growing fast across the stack — already contributing to live client projects.',
    skills: [
      'JavaScript',
      'React',
      'Frontend Development',
      'Learning Backend Development',
      'Problem Solving',
    ],
    highlights: [
      'Contributing to live client projects',
      'Growing across the full stack',
      'Fast learner with strong fundamentals',
    ],
    // email: 'ali@swittix.com',
    location: 'Pakistan',
  },
];

export const getMemberById = (id) => teamMembers.find((m) => m.id === id);