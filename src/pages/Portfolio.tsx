import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * Portfolio Page Component
 * Showcase of hifi_codeit projects with dummy links for easy replacement.
 */
const Portfolio: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const projects = [
    {
      title: "Local Business Landing Page",
      category: "Web Development (Demo)",
      description: "A conversion-focused landing page for small local businesses. Designed for speed and lead generation.",
      image: "/images/portfolio/landing-demo.jpg", // REPLACE IN public/images/portfolio/
      link: "https://your-demo-link-here.com", // REPLACE WITH YOUR ACTUAL PROJECT LINK
      tags: ["React", "Tailwind", "Responsive"]
    },
    {
      title: "Sample Business Website",
      category: "Full Business Site (Demo)",
      description: "A multi-page corporate site with service listings, blog, and brand-aligned aesthetics.",
      image: "/images/portfolio/business-demo.jpg", // REPLACE IN public/images/portfolio/
      link: "https://your-business-demo-link.com", // REPLACE WITH YOUR ACTUAL PROJECT LINK
      tags: ["Modern UI", "Brand-Centric", "SEO Ready"]
    },
    {
      title: "Student Project Collaboration",
      category: "Software Side (Student)",
      description: "Helping fellow students implement complex software logic and clean UI for their college submissions.",
      image: "/images/portfolio/student-project.jpg", // REPLACE IN public/images/portfolio/
      link: "#", // REPLACE WITH YOUR ACTUAL PROJECT LINK
      tags: ["Mentorship", "Code Quality", "Architecture"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Portfolio | hifi_codeit</title>
        <meta name="description" content="Explore our work - from local business landing pages to student software projects." />
      </Helmet>

      {/* Header */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="max-w-3xl"
          >
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-5xl md:text-7xl font-black mb-8"
            >
              Our <span className="text-purple-500">Work</span>.
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-xl text-gray-400"
            >
              Check out our latest creations. We build with modern stacks and a focus on scalability.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: idx * 0.1 
                }}
                className="group flex flex-col cursor-pointer"
              >
                {/* Project Image Container */}
                <div className="relative overflow-hidden rounded-[40px] aspect-[16/10] bg-zinc-900 border border-zinc-800/80 transition-all duration-500 group-hover:border-purple-500/20 group-hover:shadow-xl group-hover:shadow-purple-500/5">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-${idx === 0 ? '1460925895917-afdab827c52f' : '1486312338219-ce68d2c6f44d'}?auto=format&fit=crop&q=80&w=1200`;
                    }}
                  />
                  {/* Overlay Link */}
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-white rounded-full text-black transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl"
                    >
                      <ExternalLink size={24} />
                    </motion.div>
                  </a>
                </div>

                {/* Project Content */}
                <div className="mt-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-black uppercase tracking-widest text-purple-500 border border-purple-500/30 px-3 py-1 rounded-full bg-purple-500/5 transition-all group-hover:border-purple-500/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <a 
                    href={project.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-bold text-white group-hover:text-purple-400 transition-colors"
                  >
                    Live Preview <ExternalLink className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={14} />
                  </a>
                </div>
              </motion.div>
            ))}

            {/* "Your Project Next" Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.015 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
              className="border-2 border-dashed border-zinc-800 rounded-[40px] aspect-[16/10] flex flex-col items-center justify-center p-12 text-center group hover:border-purple-500/40 transition-all bg-zinc-950/30 cursor-pointer"
            >
              <div className="p-6 bg-zinc-900 rounded-full mb-6 text-zinc-600 border border-zinc-800 group-hover:text-purple-500 group-hover:border-purple-500/20 group-hover:bg-purple-600/5 transition-all duration-300 relative">
                <Plus size={40} className="transition-transform duration-500 group-hover:rotate-90" />
                <div className="absolute inset-0 rounded-full bg-purple-500/10 blur opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">Build Your Vision?</h3>
              <p className="text-gray-500 max-w-xs mb-8">
                Whether you're a startup or a student, let's build your next digital experience.
              </p>
              <Link to="/contact" className="px-6 py-3 bg-white text-black font-bold rounded-full text-sm hover:bg-purple-600 hover:text-white transition-all shadow-md">
                Start Today
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

// Fixed unused imports for linting
import { Code as _Code, Layout as _Layout } from 'lucide-react';

export default Portfolio;
