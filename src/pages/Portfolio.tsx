import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Plus, Play, X, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import kalaAgalyaImg from '../assets/First client.webp';

/**
 * Portfolio Page Component
 * Showcase of hifi_codeit projects with a Customer Reviews section.
 */
const Portfolio: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const projects = [
    {
      title: "Kala Agalya Herbals",
      category: "E-Commerce & Brand Website",
      description: "A full-fledged e-commerce platform for a premium herbal hair oil brand — built with seamless shopping, brand storytelling, and a clean mobile-first design.",
      image: kalaAgalyaImg,
      link: "https://www.kalaagalyaherbals.in/",
      tags: ["E-Commerce", "React", "Mobile-First"],
      isLive: true
    },
    {
      title: "Agazh Avaiyam",
      category: "Cultural & Archaeological NGO Website",
      description: "A bilingual (Tamil & English) digital platform for a premier archaeological excellence centre in Tamil Nadu. Built with SEO-first architecture, hero LCP optimisation, and an immersive design that makes archaeology engaging and accessible to all audiences.",
      image: "https://images.unsplash.com/photo-1608734265656-f035d3e7bcbf?auto=format&fit=crop&q=80&w=1200",
      link: "https://agazh-avaiyam.vercel.app/",
      tags: ["React", "Tamil Cultural", "SEO Optimised"],
      isDemo: true
    },
    {
      title: "Eternal Moments Studio",
      category: "Luxury Wedding Photography Portfolio",
      description: "A high-end wedding photography & planning portfolio website with cinematic aesthetics. Features rich Playfair Display typography, curated gallery layouts, and a seamless booking-inquiry experience designed to convert high-value clients.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
      link: "https://wedding-protfolio.netlify.app/",
      tags: ["Wedding", "Luxury UI", "Portfolio"],
      isDemo: true
    },
    {
      title: "Arena Web Dev — Store",
      category: "E-Commerce Demo Application",
      description: "A full-featured e-commerce store demo showcasing product listings, cart functionality, and a polished checkout flow. Demonstrates scalable React architecture with modern UI patterns built for real-world retail businesses.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
      link: "https://store-protfolio.netlify.app/",
      tags: ["E-Commerce", "React", "Full-Stack"],
      isDemo: true
    }
  ];

  // Customer Reviews — add/edit entries here
  // For video reviews: set `type: 'video'` and provide a `videoUrl` (YouTube embed or direct .mp4)
  // For text reviews: set `type: 'text'`
  const reviews = [
    {
      type: "text" as const,
      name: "Arun Kumar",
      role: "Owner, Arun's Bakery",
      rating: 5,
      review: "hifi_codeit transformed our online presence completely. The website they built for us is stunning and our orders have increased significantly. Professional, fast, and incredibly talented team!",
      avatar: "AK"
    },
    {
      type: "video" as const,
      name: "Priya Sharma",
      role: "Founder, StyleNest",
      rating: 5,
      review: "Watch my full experience with hifi_codeit",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // REPLACE WITH ACTUAL VIDEO URL
      thumbnail: "/images/reviews/priya-thumbnail.jpg", // REPLACE WITH ACTUAL THUMBNAIL
      avatar: "PS"
    },
    {
      type: "text" as const,
      name: "Ravi Venkat",
      role: "CEO, TechVenture",
      rating: 5,
      review: "Exceptional quality and attention to detail. The team understood our vision perfectly and delivered beyond expectations. Their commitment to modern design and clean code is unmatched.",
      avatar: "RV"
    },
    {
      type: "text" as const,
      name: "Meena Devi",
      role: "Director, Blooms Florist",
      rating: 5,
      review: "Working with hifi_codeit was a breeze. They were responsive, creative, and delivered our e-commerce site on time. Highly recommend them for any business looking to grow digitally.",
      avatar: "MD"
    },
    {
      type: "video" as const,
      name: "Karthik Raja",
      role: "Co-Founder, FoodieHub",
      rating: 5,
      review: "See how hifi_codeit helped us launch our food platform",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // REPLACE WITH ACTUAL VIDEO URL
      thumbnail: "/images/reviews/karthik-thumbnail.jpg", // REPLACE WITH ACTUAL THUMBNAIL
      avatar: "KR"
    },
    {
      type: "text" as const,
      name: "Divya Nair",
      role: "Therapist & Brand Owner",
      rating: 5,
      review: "I was blown away by the professionalism. They created a calming, elegant website that truly reflects my brand. Every detail was thoughtfully crafted. Absolutely worth it!",
      avatar: "DN"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Portfolio | hifi_codeit</title>
        <meta name="description" content="Explore our work — from local business landing pages to full-stack web applications built by web experts." />
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
                whileHover={{ y: -8 }}
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
                <div className={`relative overflow-hidden rounded-[40px] aspect-[16/10] bg-zinc-900 border transition-all duration-500 ${
                  (project as any).isLive
                    ? 'border-amber-500/40 shadow-xl shadow-amber-500/10 group-hover:border-amber-400/70 group-hover:shadow-2xl group-hover:shadow-amber-500/20'
                    : (project as any).isDemo
                      ? 'border-purple-500/40 shadow-xl shadow-purple-500/10 group-hover:border-purple-400/70 group-hover:shadow-2xl group-hover:shadow-purple-500/20'
                      : 'border-zinc-800/80 group-hover:border-purple-500/20 group-hover:shadow-xl group-hover:shadow-purple-500/5'
                }`}>

                  {/* LIVE CLIENT Badge */}
                  {(project as any).isLive && (
                    <div className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-amber-500/40 rounded-full shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Live Client</span>
                    </div>
                  )}

                  {/* DEMO PROJECT Badge */}
                  {(project as any).isDemo && (
                    <div className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-purple-500/40 rounded-full shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-sm shadow-purple-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Demo Project</span>
                    </div>
                  )}

                  {/* Gold shimmer overlay for live card */}
                  {(project as any).isLive && (
                    <div className="absolute inset-0 z-10 bg-gradient-to-tr from-amber-600/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  )}

                  {/* Purple shimmer overlay for demo card */}
                  {(project as any).isDemo && (
                    <div className="absolute inset-0 z-10 bg-gradient-to-tr from-purple-600/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  )}

                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${
                      (project as any).isLive || (project as any).isDemo
                        ? 'opacity-90 group-hover:opacity-100'
                        : 'grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100'
                    }`}
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
                      className={`p-4 rounded-full text-black transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl ${
                        (project as any).isLive ? 'bg-amber-400' : (project as any).isDemo ? 'bg-purple-500 text-white' : 'bg-white'
                      }`}
                    >
                      <ExternalLink size={24} />
                    </motion.div>
                  </a>
                </div>

                {/* Project Content */}
                <div className="mt-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full transition-all ${
                        (project as any).isLive
                          ? 'text-amber-400 border border-amber-500/30 bg-amber-500/5 group-hover:border-amber-400/60'
                          : 'text-purple-500 border border-purple-500/30 bg-purple-500/5 group-hover:border-purple-500/50'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className={`text-3xl font-bold mb-3 transition-colors ${
                    (project as any).isLive ? 'group-hover:text-amber-400' : 'group-hover:text-purple-400'
                  }`}>{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <a 
                    href={project.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center text-sm font-bold text-white transition-colors ${
                      (project as any).isLive ? 'group-hover:text-amber-400' : 'group-hover:text-purple-400'
                    }`}
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
                Whether you're a startup or a growing brand, let's build your next digital experience.
              </p>
              <Link to="/contact" className="px-6 py-3 bg-white text-black font-bold rounded-full text-sm hover:bg-purple-600 hover:text-white transition-all shadow-md">
                Start Today
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Customer Reviews Section ─── */}
      <section className="py-32 bg-zinc-950/60 border-t border-zinc-900 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div {...fadeInUp} className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-black uppercase tracking-widest text-purple-500 mb-6">
              Client Stories
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              What Our <span className="text-purple-500">Clients</span> Say.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Real feedback from real businesses we've helped grow. Don't take our word for it.
            </p>
          </motion.div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.01 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 22, delay: idx * 0.08 }}
                className="group relative bg-zinc-900/40 border border-zinc-800/80 rounded-[32px] p-8 glass-card-glow cursor-pointer transition-all duration-300 hover:border-purple-500/20 hover:shadow-xl hover:shadow-purple-500/5"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-8 text-purple-500/20 group-hover:text-purple-500/40 transition-colors duration-500">
                  <Quote size={40} />
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Video Review */}
                {review.type === "video" ? (
                  <div className="mb-6">
                    <div
                      className="relative rounded-2xl overflow-hidden aspect-video bg-zinc-800 border border-zinc-700/50 group-hover:border-purple-500/20 transition-colors cursor-pointer"
                      onClick={() => setActiveVideo(review.videoUrl!)}
                    >
                      <img
                        src={review.thumbnail}
                        alt={`${review.name} review`}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600`;
                        }}
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-16 h-16 bg-purple-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl shadow-purple-600/30 border border-purple-500/30"
                        >
                          <Play size={24} className="text-white ml-1" fill="white" />
                        </motion.div>
                      </div>
                      {/* Video Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs font-bold text-white border border-purple-500/30">
                        Video Review
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-4 italic">"{review.review}"</p>
                  </div>
                ) : (
                  /* Text Review */
                  <p className="text-gray-300 leading-relaxed mb-6 text-[15px]">
                    "{review.review}"
                  </p>
                )}

                {/* Reviewer Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/60">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg shadow-purple-600/20">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{review.name}</p>
                    <p className="text-purple-400 text-xs font-semibold">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl aspect-video rounded-[32px] overflow-hidden border border-zinc-800 shadow-2xl shadow-purple-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Customer Review Video"
              />
            </motion.div>
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/40 transition-all"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;
