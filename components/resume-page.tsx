'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Download,
  Moon,
  Sun,
} from 'lucide-react';

export function ResumePage() {
  const [activeSection, setActiveSection] = useState('about');
  const [darkMode, setDarkMode] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    certifications: useRef<HTMLDivElement>(null),
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const [section, ref] of Object.entries(sectionRefs)) {
        if (ref.current && scrollPosition >= ref.current.offsetTop)
          setActiveSection(section);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen text-foreground transition-colors duration-300`}
    >
      <motion.div
        className='fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-50'
        style={{ scaleX }}
      />

      <header className='fixed top-0 left-0 right-0 z-40 py-4'>
        <nav className='max-w-6xl mx-auto px-4 flex justify-between items-center glass rounded-xl px-6 py-3'>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='text-xl md:text-2xl font-bold font-display tracking-tight'
          >
            Tyler Fletcher
          </motion.h1>
          <div className='hidden md:flex items-center gap-1'>
            {Object.keys(sectionRefs).map((section) => (
              <Button
                key={section}
                onClick={() =>
                  scrollToSection(section as keyof typeof sectionRefs)
                }
                variant='glass'
                className={`text-sm rounded-full px-3 py-2 ${
                  activeSection === section
                    ? 'text-primary font-semibold'
                    : 'text-foreground/80'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </div>
          <div className='flex items-center gap-2'>
            <Sun className='h-4 w-4 text-foreground/70' />
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
              aria-label='Toggle dark mode'
            />
            <Moon className='h-4 w-4 text-foreground/70' />
          </div>
        </nav>
      </header>

      <main className='pt-24 pb-16 max-w-6xl mx-auto px-4'>
        <section
          ref={sectionRefs.about}
          className='min-h-[70vh] flex items-center justify-center'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <div className='inline-block glass rounded-2xl px-6 py-3 mb-5'>
              <span className='text-xs tracking-widest uppercase text-foreground/80'>
                Senior Software Engineer
              </span>
            </div>
            <h2 className='font-display text-5xl md:text-6xl font-bold mb-5 tracking-tight'>
              Building delightful, scalable products
            </h2>
            <p className='text-lg md:text-xl max-w-2xl mx-auto text-foreground/80'>
              10+ years shipping full‑stack software, leading teams, and taking
              products from 0→1. Strong in Full-Stack web, cloud, data, and
              pragmatic AI integrations.
            </p>
            <div className='mt-8 flex items-center justify-center gap-3'>
              <Button
                onClick={() => scrollToSection('experience')}
                className='rounded-full px-5 py-2.5'
              >
                Explore experience <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
              <Link href='/resume.pdf' passHref>
                <Button variant='glass' className='rounded-full px-5 py-2.5'>
                  Download resume <Download className='ml-2 h-4 w-4' />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        <section ref={sectionRefs.experience} className='mb-20 pt-10'>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-2xl md:text-3xl font-display font-bold mb-6'
          >
            Experience
          </motion.h3>
          <div className='space-y-6'>
            {experiences
              .slice(0, isExpanded ? experiences.length : 4)
              .map((exp, index) => (
                <ExperienceCard key={index} experience={exp} />
              ))}
          </div>
          {experiences.length > 4 && (
            <div className='text-center mt-8'>
              <Button
                onClick={toggleExpand}
                variant='outline'
                className='rounded-full glass'
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp className='ml-2 h-4 w-4' />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className='ml-2 h-4 w-4' />
                  </>
                )}
              </Button>
            </div>
          )}
        </section>

        <section ref={sectionRefs.skills} className='mb-20 pt-10'>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-2xl md:text-3xl font-display font-bold mb-6'
          >
            Skills
          </motion.h3>
          <div className='flex flex-wrap gap-3'>
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
              >
                <Badge
                  variant='glass'
                  className='text-sm md:text-base px-3 py-1.5 rounded-full'
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </section>

        <section ref={sectionRefs.education} className='mb-20 pt-10'>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-2xl md:text-3xl font-display font-bold mb-6'
          >
            Education
          </motion.h3>
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className='glass rounded-2xl p-6 mb-4'
            >
              <h4 className='text-xl font-semibold font-display'>
                {edu.degree}
              </h4>
              <p className='text-foreground/90'>{edu.school}</p>
              <p className='text-sm text-foreground/70'>{edu.year}</p>
            </motion.div>
          ))}
        </section>

        <section ref={sectionRefs.certifications} className='mb-20 pt-10'>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-2xl md:text-3xl font-display font-bold mb-6'
          >
            Certifications
          </motion.h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className='glass rounded-2xl p-6'
              >
                <h4 className='text-lg md:text-xl font-semibold font-display'>
                  {cert.name}
                </h4>
                <p className='text-foreground/90'>{cert.issuer}</p>
                <p className='text-sm text-foreground/70 mb-2'>{cert.year}</p>
                <p className='text-foreground/80'>{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className='py-8'>
        <div className='max-w-6xl mx-auto px-4 flex flex-col items-center'>
          <div className='flex gap-2 mb-4'>
            <Link href='https://github.com/fletchertyler914' passHref>
              <Button
                variant='ghost'
                size='icon'
                className='glass rounded-full'
              >
                <Github className='h-5 w-5' />
              </Button>
            </Link>
            <Link href='https://www.linkedin.com/in/tyler-fletcher' passHref>
              <Button
                variant='ghost'
                size='icon'
                className='glass rounded-full'
              >
                <Linkedin className='h-5 w-5' />
              </Button>
            </Link>
            <Link href='mailto:hello@tylerjfletcher.xyz' passHref>
              <Button
                variant='ghost'
                size='icon'
                className='glass rounded-full'
              >
                <Mail className='h-5 w-5' />
              </Button>
            </Link>
            <Link href='tel:+16156913738' passHref>
              <Button
                variant='ghost'
                size='icon'
                className='glass rounded-full'
              >
                <Phone className='h-5 w-5' />
              </Button>
            </Link>
            <Link href='/resume.pdf' passHref>
              <Button
                variant='ghost'
                size='icon'
                className='glass rounded-full'
              >
                <Download className='h-5 w-5' />
              </Button>
            </Link>
          </div>
          <p className='text-sm text-foreground/70'>
            © 2025 Tyler Fletcher. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface Experience {
  title: string;
  company: string;
  date: string;
  responsibilities: string[];
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.45 }}
      className='glass rounded-2xl p-6'
    >
      <h4 className='text-xl md:text-2xl font-bold font-display mb-1'>
        {experience.title}
      </h4>
      <p className='text-foreground/90 mb-1'>{experience.company}</p>
      <p className='text-sm text-foreground/70 mb-3'>{experience.date}</p>
      <ul className='list-disc list-inside space-y-2 text-foreground/85'>
        {experience.responsibilities.map((resp, idx) => (
          <li key={idx}>{resp}</li>
        ))}
      </ul>
    </motion.div>
  );
}

const experiences = [
  {
    title: 'SENIOR SOFTWARE ENGINEER',
    company: 'Asurion (uBreakiFix NextGen)',
    date: 'May 2025 – Present',
    responsibilities: [
      'Contributing to enterprise modernization of uBreakiFix store operations across 500+ locations with React on AWS-native architecture.',
      'Delivering feature parity with legacy systems while improving performance and UX for store teams.',
      'Designing cloud-first solutions for compute and storage to support nationwide retail scale.',
      'Collaborating across specialized NextGen teams on shared technical strategy and delivery.',
    ],
  },
  {
    title: 'FOUNDER & BUILDER',
    company: 'Good Enough Studio',
    date: 'April 2025 – Present',
    responsibilities: [
      'Partner with founders to ship MVPs fast—cutting scope responsibly, emphasizing learning velocity, and launching to real users.',
      'Provide product/engineering leadership from ideation through launch: UX, React/Next.js, APIs, data, and cloud.',
    ],
  },
  {
    title: 'LEAD AI/ML ENGINEER',
    company: 'Fishbowl, Inc.',
    date: 'February 2024 – October 2024',
    responsibilities: [
      'Helped stand up the AI/ML function and technical strategy for the GRM platform.',
      'Integrated production LLM features using OpenAI, Anthropic, and open‑source models.',
      'Used Snowflake for real‑time analytics and model training data to power AI experiences.',
      'Partnered with product, sales, and CS to deliver AI features and streamline internal workflows.',
    ],
  },
  {
    title: 'LEAD DATA ENGINEER',
    company: 'Fishbowl, Inc.',
    date: 'September 2023 – February 2024',
    responsibilities: [
      'Built and maintained full‑stack solutions (Vue frontends, PHP/Python services) supporting data workflows.',
      'Developed data pipelines and Snowflake architecture enabling complex analyses and insights.',
      'Prepared foundations for future AI integrations and predictive capabilities.',
      'Worked cross‑functionally to meet data needs and turn analysis into action.',
    ],
  },
  {
    title: 'SOFTWARE ENGINEER',
    company: 'Nation Builders, Inc.',
    date: 'November 2022 – July 2023',
    responsibilities: [
      'Contributed to governance and document platforms (nation.io, onvellum.com) with React/Next.js frontends and Supabase backends.',
      'Implemented on‑chain workflows and multisig transactions via Squads integration (Solana).',
      'Shipped wallet integrations and collaborative features; integrated OpenAI for content generation.',
      'Improved maintainability with NX monorepo refactors and shared libraries.',
    ],
  },
  {
    title: 'FRONTEND APPLICATION DEVELOPER',
    company: 'PolicyCo',
    date: 'April 2019 – November 2022',
    responsibilities: [
      'Founding engineer taking the product from MVP to enterprise deployments.',
      'Architected a modular WYSIWYG editor with real‑time collaborative editing (websockets).',
      'Drove migration from REST to GraphQL (NestJS), simplifying frontend data fetching and improving load times.',
      'Owned AWS production infrastructure across EC2, S3, Lambda/API Gateway, and Elasticsearch.',
      'Hired and mentored 3 engineers; established code standards and review practices.',
    ],
  },
  {
    title: 'SOFTWARE ENGINEER',
    company: 'naviHealth',
    date: 'November 2018 – March 2019',
    responsibilities: [
      'Led development on internal Angular apps; mentored three junior developers.',
      'Partnered with DevOps to establish automated CI/CD pipelines.',
      'Built tools supporting Medicare/Medicaid care coordination workflows.',
    ],
  },
  {
    title: 'ASSOCIATE SOFTWARE ENGINEER',
    company: 'naviHealth',
    date: 'August 2017 – November 2018',
    responsibilities: [
      'Migrated critical functionality from a C#/.NET monolith to modular Angular apps.',
      'Maintained on‑prem SQL Server systems with HIPAA requirements.',
      'Contributed on cross‑functional teams delivering patient care coordination features.',
    ],
  },
];

const skills = [
  'React / Next.js',
  'TypeScript / JavaScript',
  'Node.js / NestJS',
  'Python',
  'GraphQL / REST APIs',
  'AWS (EC2, S3, Lambda, API Gateway)',
  'Docker & CI/CD',
  'PostgreSQL / Snowflake',
  'Data Pipelines',
  'Real-time Collaboration',
  'WYSIWYG Editors',
  'AI/ML Integration',
  'System Design',
];

const education = [
  {
    degree: 'COMPUTER SCIENCE',
    school: 'Motlow State Community College',
    year: '2011-2013',
  },
  {
    degree: 'HIGH SCHOOL',
    school: 'Cannon County High School',
    year: '2008 - 2011',
  },
];

const certifications = [
  {
    name: 'BUILD 2023: LLM Bootcamp Badge',
    issuer: 'Snowflake',
    year: '2023',
    description:
      'Covers LLM fundamentals and building generative AI on Snowflake: deployment, Snowpark DataFrames, ML libraries, and fine‑tuning.',
  },
  {
    name: 'Developer Relations',
    issuer: 'DevRel Uni',
    year: '2023',
    description: 'Masterclass for Developer Relations professionals.',
  },
  {
    name: 'Nights & Weekends',
    issuer: 'Buildspace',
    year: '2023',
    description:
      'Community and program for builders launching projects; focus on web, product, and pragmatic shipping.',
  },
];
