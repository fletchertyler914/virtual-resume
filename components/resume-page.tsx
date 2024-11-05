'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export function ResumePage() {
  const [activeSection, setActiveSection] = useState('summary');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const sectionRefs: {
    [key in
      | 'summary'
      | 'experience'
      | 'skills'
      | 'education'
      | 'certifications']: React.MutableRefObject<HTMLDivElement | null>;
  } = {
    summary: useRef(null),
    experience: useRef(null),
    skills: useRef(null),
    education: useRef(null),
    certifications: useRef(null),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (
    section:
      | 'summary'
      | 'experience'
      | 'skills'
      | 'education'
      | 'certifications'
  ) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 0.3, 0.3, 1]
  );

  return (
    <div
      ref={containerRef}
      className='min-h-screen bg-gray-50 text-gray-900 overflow-hidden'
    >
      <motion.div
        className='fixed inset-0 z-0'
        style={{
          backgroundImage:
            'linear-gradient(to bottom right, #f3e7d3, #d6ae7b, #d69e49)',
          y: backgroundY,
          opacity,
        }}
      />

      <main className='relative z-10 pt-20 pb-12 max-w-6xl mx-auto px-4'>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='text-6xl font-bold mb-4 text-center  text-[#4a4a4a]'
        >
          TYLER FLETCHER
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className='text-3xl text-center mb-12 text-[#6a6a6a]'
        >
          SENIOR SOFTWARE ENGINEER
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className='flex justify-center space-x-4 mb-16'
        >
          {Object.keys(sectionRefs).map((section) => (
            <Button
              key={section}
              onClick={() =>
                scrollToSection(
                  section as
                    | 'summary'
                    | 'experience'
                    | 'skills'
                    | 'education'
                    | 'certifications'
                )
              }
              variant='ghost'
              className={`text-lg ${
                activeSection === section
                  ? 'text-[#d69e49] font-bold'
                  : 'text-gray-600'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Button>
          ))}
        </motion.div>

        <section ref={sectionRefs.summary} className='mb-20'>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold mb-8 text-[#d69e49] '
          >
            Summary
          </motion.h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {Object.entries(summary).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-white p-6 rounded-lg shadow-md'
              >
                <h4 className='text-xl font-semibold text-[#d69e49] mb-2 '>
                  {key}
                </h4>
                <p className='text-gray-600'>{value}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section ref={sectionRefs.experience} className='mb-20'>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold mb-8 text-[#d69e49] '
          >
            Experience
          </motion.h3>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-white p-6 rounded-lg shadow-md mb-6'
            >
              <h4 className='text-2xl font-bold text-[#d69e49] mb-2 '>
                {exp.title}
              </h4>
              <p className='text-lg mb-2 text-gray-700'>{exp.company}</p>
              <p className='text-sm text-gray-500 mb-4'>{exp.date}</p>
              <ul className='list-disc list-inside space-y-2 text-gray-600'>
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>

        <section ref={sectionRefs.skills} className='mb-20'>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold mb-8 text-[#d69e49] '
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
                <Badge className='bg-[#d69e49] text-white hover:bg-[#c48d38] px-3 py-1 text-lg'>
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </section>

        <section ref={sectionRefs.education} className='mb-20'>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold mb-8 text-[#d69e49] '
          >
            Education
          </motion.h3>
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-white p-6 rounded-lg shadow-md mb-6'
            >
              <h4 className='text-xl font-semibold text-[#d69e49] '>
                {edu.degree}
              </h4>
              <p className='text-lg text-gray-700'>{edu.school}</p>
              <p className='text-sm text-gray-500'>{edu.year}</p>
            </motion.div>
          ))}
        </section>

        <section ref={sectionRefs.certifications} className='mb-20'>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold mb-8 text-[#d69e49] '
          >
            Certifications
          </motion.h3>
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-white p-6 rounded-lg shadow-md mb-6'
            >
              <h4 className='text-xl font-semibold text-[#d69e49] '>
                {cert.name}
              </h4>
              <p className='text-lg text-gray-700'>{cert.issuer}</p>
              <p className='text-sm text-gray-500 mb-2'>{cert.year}</p>
              <p className='text-gray-600'>{cert.description}</p>
            </motion.div>
          ))}
        </section>
      </main>

      <footer className='bg-[#4a4a4a] text-white py-8'>
        <div className='max-w-6xl mx-auto px-4 flex flex-col items-center'>
          <div className='flex space-x-4 mb-4'>
            <Button
              variant='ghost'
              size='icon'
              className='text-white hover:text-[#d69e49]'
            >
              <Link href='https://github.com/fletchertyler914' passHref>
                <Github className='h-6 w-6' />
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='text-white hover:text-[#d69e49]'
            >
              <Link href='https://www.linkedin.com/in/fletchertyler/' passHref>
                <Linkedin className='h-6 w-6' />
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='text-white hover:text-[#d69e49]'
            >
              <Link href='mailto:fletchertyler914@gmail.com' passHref>
                <Mail className='h-6 w-6' />
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='text-white hover:text-[#d69e49]'
            >
              <Link href='tel:+6156913738' passHref>
                <Phone className='h-6 w-6' />
              </Link>
            </Button>
          </div>
          <p className='text-sm text-gray-300'>
            © 2024 Tyler J. Fletcher. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

const summary = {
  'Strategic Vision':
    'Spearheading full-scale products and guiding teams, aligning every line of code with overarching objectives.',
  'Precision & Craftsmanship':
    "Crafting code that synergize's functionality and finesse, rigorously tested and optimized.",
  'Team Leadership':
    'Harmonizing product narratives and team dynamics to achieve unified goals.',
  'Forward-Thinking':
    'Perpetually scouting for transformative tools, frameworks, and methodologies in the tech realm.',
};

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
      "Onboarded and trained 3 engineers after 2.5 years, expanding the product's  feature suite.",
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
