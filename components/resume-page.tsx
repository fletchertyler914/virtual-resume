'use client';

import {
  useState,
  useRef,
  useEffect,
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from 'react';
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
  const [darkMode, setDarkMode] = useState(false);
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    certifications: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better trigger point

      for (const [section, ref] of Object.entries(sectionRefs)) {
        if (ref.current && scrollPosition >= ref.current.offsetTop) {
          setActiveSection(section);
        }
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
      className={`min-h-screen bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white transition-colors duration-300`}
    >
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-yellow-400 origin-left z-50'
        style={{ scaleX }}
      />

      <header className='fixed top-0 left-0 right-0 bg-white dark:bg-[#16213e] z-40 py-4 transition-colors duration-300'>
        <nav className='max-w-6xl mx-auto px-4 flex justify-between items-center'>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='text-2xl font-bold bg-yellow-400 px-4 py-2 rounded-lg text-white'
          >
            Tyler Fletcher
          </motion.h1>
          <div className='flex space-x-4'>
            {Object.keys(sectionRefs).map((section) => (
              <Button
                key={section}
                onClick={() =>
                  scrollToSection(section as keyof typeof sectionRefs)
                }
                variant='ghost'
                className={`text-sm ${
                  activeSection === section
                    ? 'text-yellow-400 font-bold'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </div>
        </nav>
      </header>

      <main className='pt-20 pb-12 max-w-6xl mx-auto px-4'>
        <section
          ref={sectionRefs.about}
          className='min-h-screen flex items-center justify-center'
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <h2 className='text-6xl font-bold mb-4 text-yellow-400'>
              Senior Software Engineer
            </h2>
            <p className='text-xl mb-8 max-w-2xl mx-auto'>
              Driven by an insatiable curiosity, I approach technology not just
              as a tool, but as a means to craft
              <span className='text-yellow-400'> impactful </span> solutions,
              <span className='text-yellow-400'> bridge gaps</span>, and
              <span className='text-yellow-400'> push boundaries</span>.
            </p>
            <Button
              onClick={() => scrollToSection('experience')}
              className='bg-yellow-400 hover:bg-yellow-500 text-gray-900'
            >
              Explore My Journey <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </motion.div>
        </section>

        <section ref={sectionRefs.experience} className='mb-20 pt-20'>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold mb-8 text-yellow-400'
          >
            Experience
          </motion.h3>
          <div className='space-y-8'>
            {experiences
              .slice(0, isExpanded ? experiences.length : 3)
              .map((exp, index) => (
                <ExperienceCard key={index} experience={exp} />
              ))}
          </div>
          {experiences.length > 3 && (
            <div className='text-center mt-8'>
              <Button
                onClick={toggleExpand}
                variant='outline'
                className='text-yellow-400 border-yellow-400'
              >
                {isExpanded ? (
                  <>
                    Show Less <ChevronUp className='ml-2 h-4 w-4' />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className='ml-2 h-4 w-4' />
                  </>
                )}
              </Button>
            </div>
          )}
        </section>

        <section ref={sectionRefs.skills} className='mb-20 pt-20'>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold mb-8 text-yellow-400'
          >
            Skills
          </motion.h3>
          <div className='flex flex-wrap gap-4'>
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Badge className='bg-gray-200 dark:bg-[#0f3460] text-gray-900 dark:text-white hover:bg-yellow-400 hover:text-gray-900 px-3 py-1 text-lg'>
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </section>

        <section ref={sectionRefs.education} className='mb-20 pt-20'>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold mb-8 text-yellow-400'
          >
            Education
          </motion.h3>
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-gray-100 dark:bg-[#0f3460] p-6 rounded-lg shadow-md mb-6'
            >
              <h4 className='text-xl font-semibold text-yellow-400'>
                {edu.degree}
              </h4>
              <p className='text-lg'>{edu.school}</p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {edu.year}
              </p>
            </motion.div>
          ))}
        </section>

        <section ref={sectionRefs.certifications} className='mb-20 pt-20'>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold mb-8 text-yellow-400'
          >
            Certifications
          </motion.h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-gray-100 dark:bg-[#0f3460] p-6 rounded-lg shadow-md'
              >
                <h4 className='text-xl font-semibold text-yellow-400'>
                  {cert.name}
                </h4>
                <p className='text-lg'>{cert.issuer}</p>
                <p className='text-sm text-gray-500 dark:text-gray-400 mb-2'>
                  {cert.year}
                </p>
                <p className='text-gray-700 dark:text-gray-300'>
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className='bg-gray-100 dark:bg-[#16213e] py-8 transition-colors duration-300'>
        <div className='max-w-6xl mx-auto px-4 flex flex-col items-center'>
          <div className='flex space-x-4 mb-4'>
            <Link href='https://github.com/fletchertyler914' passHref>
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-600 dark:text-gray-300 hover:text-yellow-400'
              >
                <Github className='h-6 w-6' />
              </Button>
            </Link>
            <Link href='https://www.linkedin.com/in/fletchertyler/' passHref>
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-600 dark:text-gray-300 hover:text-yellow-400'
              >
                <Linkedin className='h-6 w-6' />
              </Button>
            </Link>
            <Link href='mailto:fletchertyler914@gmail.com' passHref>
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-600 dark:text-gray-300 hover:text-yellow-400'
              >
                <Mail className='h-6 w-6' />
              </Button>
            </Link>
            <Link href='tel:+1234567890' passHref>
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-600 dark:text-gray-300 hover:text-yellow-400'
              >
                <Link href='tel:+6156913738' passHref>
                  <Phone className='h-6 w-6' />
                </Link>
              </Button>
            </Link>
            <Link href='/resume.pdf' passHref>
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-600 dark:text-gray-300 hover:text-yellow-400'
              >
                <Download className='h-6 w-6' />
              </Button>
            </Link>
          </div>
          <div className='flex items-center space-x-2 mb-4'>
            <Sun className='h-4 w-4 text-gray-600 dark:text-gray-300' />
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
              aria-label='Toggle dark mode'
            />
            <Moon className='h-4 w-4 text-gray-600 dark:text-gray-300' />
          </div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            © 2024 Tyler Fletcher. All rights reserved.
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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className='bg-gray-100 dark:bg-[#0f3460] p-6 rounded-lg shadow-md'
    >
      <h4 className='text-2xl font-bold text-yellow-400 mb-2'>
        {experience.title}
      </h4>
      <p className='text-lg mb-2'>{experience.company}</p>
      <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
        {experience.date}
      </p>
      <ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
        {experience.responsibilities.map(
          (
            resp:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<unknown, string | JSXElementConstructor<unknown>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined,
            idx: Key | null | undefined
          ) => (
            <li key={idx}>{resp}</li>
          )
        )}
      </ul>
    </motion.div>
  );
}

const experiences = [
  {
    title: 'LEAD AI/ML ENGINEER',
    company: 'Fishbowl, Inc.',
    date: 'February 2024 - October 2024',
    responsibilities: [
      "Created Fishbowl's AI/ML department to drive AI integrations and enhance GRM (Guest Relationship Management) features.",
      'Designed and implemented advanced AI tools, utilizing large language models (LLMs) and data-driven insights to improve client engagement and streamline internal processes.',
      'Leveraged AWS and Snowflake to deploy machine learning models, providing innovative solutions to improve operational workflows.',
    ],
  },
  {
    title: 'LEAD DATA ENGINEER',
    company: 'Fishbowl, Inc.',
    date: 'September 2023 - February 2024',
    responsibilities: [
      'Built and managed full-stack solutions with a Vue frontend and PHP/Python backend, supporting data architecture and frontend functionality.',
      "Laid the groundwork for Fishbowl's first AI integrations, setting the stage for enhanced customer insights and predictive capabilities.",
      'Developed robust data pipelines and managed data architecture in Snowflake to support complex analyses, facilitating data-driven decision-making.',
      'Partnered with cross-functional teams to support data needs, creating actionable insights and establishing a foundation for future AI-driven capabilities.',
    ],
  },
  {
    title: 'SOFTWARE ENGINEER (BLOCKCHAIN)',
    company: 'Nation Builders, Inc.',
    date: 'November 2022 - February 2024',
    responsibilities: [
      'Led development efforts on decentralized platforms: Nation (nation.io) and Vellum (onvellum.com).',
      'Collaborated on the Caro platform (caro.bid) with a team of engineers.',
      "Integrated OpenAI, enhancing Vellum's capabilities.",
      'Rearchitected codebases to an NX monorepo, enhancing scalability and maintainability.',
      'Tech Stack: NX, Next.js, Supabase, Stripe, Solana Blockchain',
    ],
  },
  {
    title: 'FRONTEND APPLICATION DEVELOPER',
    company: 'PolicyCo',
    date: 'April 2019 - November 2022',
    responsibilities: [
      'Served as a founding engineer, laying the foundation of PolicyCo.',
      'Built an extensive, modular WYSIWYG document editor for managing policies and procedures with collaborative editing capabilities.',
      "Onboarded and trained 3 engineers after 2.5 years, expanding the product's feature suite.",
    ],
  },
  {
    title: 'SOFTWARE ENGINEER',
    company: 'naviHealth',
    date: 'November 2018 - March 2019',
    responsibilities: [
      'Advanced team responsibilities, leading critical projects.',
      'Mentored and trained a team of 3 junior developers, focusing on building internal Angular applications.',
      'Collaborated closely with DevOps to establish a CI/CD pipeline for standalone Angular applications.',
    ],
  },
  {
    title: 'ASSOCIATE SOFTWARE ENGINEER',
    company: 'naviHealth',
    date: 'August 2017 - November 2018',
    responsibilities: [
      'Specialized in Angular development, contributing to a multi-hat feature team.',
      'Transitioned segments of a C#/.NET monolith to modular Angular components.',
      'Work with DevOps to formalize and build out the CI/CD pipeline for standalone Angular applications',
    ],
  },
  {
    title: 'APPLICATION DEVELOPER',
    company: 'Operation PAR, Inc.',
    date: 'November 2015 - July 2017',
    responsibilities: [
      'Played a pivotal role in digitizing outdated paper processes.',
      'Developed an onsite RFID attendance/traffic system for the main campus, enhancing operational efficiency.',
      'Managed financial reporting to the State of Florida using eRecord software.',
      'Created Angular applications tailored to the needs of patients and care providers.',
    ],
  },
  {
    title: 'TECHNICAL CARE PROFESSIONAL',
    company: 'Bright House Networks',
    date: 'January 2015 - November 2015',
    responsibilities: [
      'Managed escalated technical support calls, ensuring customer satisfaction.',
      'Diagnosed and debugged client hardware remotely.',
    ],
  },
  {
    title: 'OWNER/OPERATOR',
    company: 'iHelp Mobile Electronics Repair',
    date: 'September 2012 - January 2014',
    responsibilities: [
      'Founded and operated a mobile electronics repair service, offering drive-up repair services from a custom-built portable workbench.',
    ],
  },
];

const skills = [
  'Web Standards',
  'Javascript Stack',
  'Blockchain',
  'AI/ML Integration',
  'Event-Driven Systems',
  'Container Management',
  'Agile Methodologies',
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
    name: 'BUILD 2023: LLM BOOTCAMP BADGE',
    issuer: 'Snowflake',
    year: '2023',
    description:
      'The BUILD LLM Bootcamp badge covers the fundamentals of LLMs and teaches you how to build with generative AI on Snowflake. The assessment covers the model deployment process, Snowpark Dataframes, ML libraries, model fine-tuning, and more.',
  },
  {
    name: 'BUILD 2023: SNOWFLAKE BUILDER BADGE',
    issuer: 'Snowflake',
    year: '2023',
    description:
      'The BUILD 2023 Snowflake Builder Badge is for attendees of the annual BUILD Conference who joined ten (10) sessions, including one (1) lab between December 5th and 6th 2023.',
  },
  {
    name: 'DEVELOPER RELATIONS',
    issuer: 'DevRel Uni',
    year: '2023',
    description: 'Masterclass for Developer Relations professionals.',
  },
  {
    name: 'NIGHTS & WEEKENDS',
    issuer: 'Buildspace',
    year: '2023',
    description:
      'Community and e-learning platform for developers that want to introduce themselves to web3 and crypto projects.',
  },
];
