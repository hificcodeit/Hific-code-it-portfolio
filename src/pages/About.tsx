import React from 'react';
import { motion } from 'framer-motion';
import { Target, Rocket, Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

/**
 * About Page Component
 * Tells the story of hifi_codeit and introduces the web expert team.
 */
const About: React.FC = () => {
  // Animation variants for sections
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

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
        <title>About Us | hifi_codeit</title>
        <meta name="description" content="Meet the expert team behind hifi_codeit - a dynamic startup building high-quality digital solutions." />
      </Helmet>

      {/* Hero / Header Section */}
      <section className="py-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.h1 
              variants={textFadeVariants}
              className="text-5xl md:text-7xl font-black mb-8"
            >
              We're <span className="text-purple-500">hifi_codeit</span>.
            </motion.h1>
            <motion.p 
              variants={textFadeVariants}
              className="text-2xl text-gray-400 font-medium leading-relaxed"
            >
              A dynamic startup on a mission to bring high-fidelity digital solutions to emerging businesses. We believe every great idea deserves a great website.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team Introduction Section - NEW */}
      <section className="py-24 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Meet the Minds</h2>
            <p className="text-gray-400 max-w-2xl mx-auto italic text-lg">
              "We're a team of web experts who decided to stop waiting for opportunities and start building them."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarvothyan S",
                role: "Lead Developer",
                bio: "Passionate about clean code and modern web architectures.",
                img: "/images/team/member1.jpg"
              },
              {
                name: "Yukeshwaran VK",
                role: "Design Lead",
                bio: "Turning complex problems into beautiful, simple user interfaces.",
                img: "/images/team/member2.jpg"
              },
              {
                name: "Joshwa",
                role: "Full Stack Developer",
                bio: "Passionate about building seamless digital experiences through clean code and modern technologies.",
                img: "/images/team/member3.jpg"
              }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 22, delay: idx * 0.1 }}
                className="group relative bg-zinc-900/40 border border-zinc-800/80 rounded-[32px] p-8 glass-card-glow cursor-pointer transition-all duration-300"
              >
                <div className="w-24 h-24 bg-zinc-800 rounded-2xl mb-6 overflow-hidden border border-zinc-700/50 group-hover:border-purple-500/30 transition-colors duration-500">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + member.name + "&background=8b5cf6&color=fff";
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-1 group-hover:text-purple-400 transition-colors">{member.name}</h3>
                <p className="text-purple-500 text-sm font-bold uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-purple-600/20 rounded-2xl text-purple-500">
                  <Rocket size={24} />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We empower startups and small business owners by removing the technical barriers to entry. Our goal is to provide professional-grade web and brand services that were previously only accessible to big corporations.
              </p>

              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-blue-600/20 rounded-2xl text-blue-500">
                  <Target size={24} />
                </div>
                <h2 className="text-2xl font-bold">Who We Serve</h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Whether you're launching a local bakery, starting a tech venture, or building a personal brand, we are your digital partner. We specialize in working with individuals who are just starting out.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-600 to-blue-700 rounded-[40px] rotate-3 overflow-hidden">
                <img
                  src="/images/about-vibe.jpg" // REPLACE THIS in public/images/
                  alt="Our Team Vibe"
                  className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl max-w-[240px]">
                <Heart className="text-red-500 mb-2" size={24} fill="currentColor" />
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Built with passion by Web Experts</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
