import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * Home Page Component
 * Main landing page for hifi_codeit — a team of web experts.
 */
const Home: React.FC = () => {
  // Animation for sections
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  // Staggered Container for Fade-In Text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  // Text Fade Transition
  const textFadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <>
      <Helmet>
        <title>hifi_codeit | We Design. We Code. You Grow.</title>
        <meta name="description" content="A team of web experts offering web development, design, and SEO services for businesses and growing brands." />
      </Helmet>

      {/* Hero Section - The First Impression */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Visual elements for the modern feel */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/15 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.span 
                variants={textFadeVariants}
                className="inline-block px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-black uppercase tracking-widest text-purple-500 mb-2"
              >
                Web Experts
              </motion.span>
              
              <motion.h1 
                variants={textFadeVariants}
                className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-4"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient-text-flow">We Design.</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-text-flow">We Code.</span> <br />
                <span className="italic font-extrabold underline decoration-amber-500 decoration-8 underline-offset-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-500 to-pink-500 animate-gradient-text-flow inline-block pr-4 pb-2">You Grow.</span>
              </motion.h1>

              <motion.p 
                variants={textFadeVariants}
                className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl"
              >
                From Idea to Online — We Build It. hifi_codeit is a team of passionate web experts helping small businesses and growing brands launch their digital dreams.
              </motion.p>
              
              <motion.div 
                variants={textFadeVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link 
                  to="/portfolio" 
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center"
                >
                  View Our Work <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
                </Link>
                <Link 
                  to="/contact" 
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 transition-all flex items-center justify-center hover:scale-105"
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section - Meet the Startup */}
      <section className="py-24 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Fresh Eyes. <br />Modern Solutions.</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We combine modern technology, creative thinking, and user-focused design to build impactful digital experiences. Every project is approached with innovation, precision, and a commitment to quality.
              </p>
              <Link to="/about" className="text-purple-400 font-bold flex items-center group">
                Meet the Web Experts <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </Link>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="relative">
              <div className="aspect-video bg-zinc-900 rounded-[40px] border border-zinc-800 overflow-hidden">
                {/* PLACEHOLDER FOR TEAM PHOTO: Replace /images/home-team.jpg later */}
                <img 
                  src="/images/home-team.jpg" 
                  alt="hifi_codeit Team" 
                  className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-black mb-4">Our Expertise</motion.h2>
          <motion.p {...fadeInUp} className="text-gray-400 text-lg">Professional quality delivered by experienced web experts.</motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Web Design & Dev",
              desc: "From landing pages to complex web apps. We build with performance in mind.",
              icon: <Code className="text-purple-500 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" size={32} />
            },
            {
              title: "Custom Web Apps",
              desc: "Specialized full-stack development for businesses that need tailored digital solutions.",
              icon: <Users className="text-blue-500 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" size={32} />
            },
            {
              title: "Brand & SEO",
              desc: "Identity design and ranking strategies to make sure your brand is seen and remembered.",
              icon: <Zap className="text-purple-400 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" size={32} />
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: idx * 0.1
              }}
              className="p-10 bg-zinc-900/40 border border-zinc-800/80 rounded-[40px] transition-all duration-300 glass-card-glow group cursor-pointer"
            >
              <div className="mb-6 p-4 bg-zinc-900/50 rounded-2xl w-fit border border-zinc-800/50 group-hover:bg-purple-600/10 group-hover:border-purple-500/20 transition-all duration-300">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Redesigned Premium CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-zinc-950/80 border border-zinc-800/80 rounded-[50px] p-12 md:p-20 text-center overflow-hidden glass-card-glow shadow-2xl"
          >
            {/* Ambient Background Glowing Spheres and Tech Dot Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] animate-blob-slow" />
              <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] animate-blob-medium" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-300% animate-gradient-text-flow">
                Ready to grow your vision?
              </h2>
              <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Partner with us to create digital experiences that set your brand apart. Let's make it happen together.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link 
                  to="/contact" 
                  className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-black rounded-full transition-all inline-flex items-center text-xl shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 group"
                >
                  Let's Work Together 
                  <ArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-2" size={24} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
