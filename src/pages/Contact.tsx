import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

/**
 * Contact Page Component
 * Focused on social links and email as requested.
 * No form or pricing list included.
 */
const Contact: React.FC = () => {
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

  const textFadeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | hifi_codeit</title>
        <meta name="description" content="Get in touch with hifi_codeit for your web development and design needs. Contact us via email or social media." />
      </Helmet>

      <section className="py-24 min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Side: Messaging */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.h1 
                variants={textFadeVariants}
                className="text-5xl md:text-7xl font-black mb-8 leading-tight"
              >
                Let's Make <br />
                It <span className="text-purple-500 italic">Official</span>.
              </motion.h1>
              <motion.p 
                variants={textFadeVariants}
                className="text-2xl text-gray-400 mb-10 leading-relaxed"
              >
                We're excited to hear about your project and see how we can help you grow. 
                Whether you have a fully-formed idea or just a spark of inspiration, let's talk.
              </motion.p>
              
              <motion.div 
                variants={textFadeVariants}
                className="p-8 bg-zinc-900/50 rounded-[32px] border border-zinc-800/80 glass-card-glow"
              >
                <p className="text-xl font-bold text-white mb-2 leading-relaxed">
                  "For more queries related contact us on social links or mail us"
                </p>
                <p className="text-gray-500 italic text-sm">
                  We usually respond within 24 hours.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Side: Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Email Card */}
              <motion.a 
                href="mailto:hificodeitinfotech@gmail.com"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex items-center p-8 bg-zinc-900/30 border border-zinc-800/80 rounded-[32px] hover:border-purple-500/30 hover:bg-zinc-900/40 transition-all duration-300 glass-card-glow cursor-pointer"
              >
                <div className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-2xl text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition-all mr-6 duration-300 shrink-0">
                  <Mail size={32} className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-sm sm:text-lg font-bold text-white break-all group-hover:text-purple-400 transition-colors">hificodeitinfotech@gmail.com</p>
                </div>
                <ArrowRight className="text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-2 transition-all duration-300 shrink-0 ml-4" size={24} />
              </motion.a>

              {/* Socials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.a 
                  href="https://www.instagram.com/hifi_codeit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex flex-col p-8 bg-zinc-900/30 border border-zinc-800/80 rounded-[32px] hover:border-pink-500/30 hover:bg-zinc-900/40 transition-all duration-300 glass-card-glow cursor-pointer"
                >
                  <div className="p-4 bg-pink-600/10 border border-pink-500/20 rounded-2xl text-pink-500 group-hover:bg-pink-600 group-hover:text-white transition-all w-fit mb-6 duration-300">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Instagram</p>
                  <p className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">@hifi_codeit</p>
                </motion.a>

                <motion.a 
                  href="https://www.linkedin.com/in/hi-ficodeit-infotech-b4b45b412/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex flex-col p-8 bg-zinc-900/30 border border-zinc-800/80 rounded-[32px] hover:border-blue-500/30 hover:bg-zinc-900/40 transition-all duration-300 glass-card-glow cursor-pointer"
                >
                  <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all w-fit mb-6 duration-300">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">LinkedIn</p>
                  <p className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Let's Connect</p>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
