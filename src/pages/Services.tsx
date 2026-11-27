import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Share2, Search, Zap, Globe, Cpu } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

/**
 * Services Page Component
 * Detailed list of what hifi_codeit offers, including Custom Software Projects.
 */
const Services: React.FC = () => {
  const servicesList = [
    {
      title: "Web Design & Development",
      description: "We create stunning, responsive websites that look great on any device. From simple brochures to complex web apps, we use React and modern tools to build fast, scalable solutions.",
      icon: <Globe className="text-purple-500" size={32} />,
      features: ["Responsive Design", "React/Next.js", "Performance Optimization", "Custom Interactions"]
    },
    {
      title: "Custom Software Projects",
      description: "Need a tailored software solution? We offer specialized development support, focusing on clean architecture, documentation, and end-to-end implementation.",
      icon: <Cpu className="text-blue-500" size={32} />,
      features: ["Code Mentorship", "UI/UX for Projects", "Full-Stack Development", "Documentation Support"]
    },
    {
      title: "Logo & Brand Identity",
      description: "Your brand is your story. We help you tell it through custom logo design, color palettes, and typography that resonate with your target audience.",
      icon: <Palette className="text-purple-400" size={32} />,
      features: ["Custom Logo Design", "Brand Style Guides", "Typography Selection", "Visual Assets"]
    },
    {
      title: "Social Media Management",
      description: "Grow your online presence and engage with your community. We help manage your social channels so you can focus on running your business.",
      icon: <Share2 className="text-blue-400" size={32} />,
      features: ["Content Planning", "Profile Optimization", "Engagement Strategy", "Visual Content"]
    },
    {
      title: "Landing Page Creation",
      description: "Perfect for launches or specific marketing campaigns. We build high-converting landing pages designed to turn visitors into customers.",
      icon: <Zap className="text-yellow-500" size={32} />,
      features: ["A/B Ready Design", "Clear Call-to-Actions", "Fast Load Times", "Lead Capture"]
    },
    {
      title: "Basic SEO Optimization",
      description: "Get found on Google. We implement on-page SEO best practices to help your website rank better and attract more organic traffic.",
      icon: <Search className="text-purple-500" size={32} />,
      features: ["Meta Tag Strategy", "Keyword Research", "Image Optimization", "Sitemap Generation"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | hifi_codeit</title>
        <meta name="description" content="Explore digital services by hifi_codeit, including custom software development, web design, and branding by web experts." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-black/40 to-zinc-950/40">
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
            data-scroll-text="hero-parallax"
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-5xl md:text-6xl font-black mb-6"
            >
              Our <span className="text-purple-500">Services</span>
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-xl text-gray-400"
            >
              Tailored digital solutions designed to help your startup flourish and your vision shine.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {servicesList.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.015 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 22,
                  delay: idx * 0.08 
                }}
                className="p-10 bg-zinc-900/30 border border-zinc-800/80 rounded-[32px] transition-all duration-300 glass-card-glow group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="p-4 bg-zinc-800/80 rounded-2xl border border-zinc-700/50 group-hover:bg-purple-600/10 group-hover:border-purple-500/20 transition-all duration-500 shrink-0 w-fit">
                    <div className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                      {service.icon}
                    </div>
                  </div>
                  <div>
                    <h3 data-scroll-text="reveal" className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">{service.title}</h3>
                    <p data-scroll-text="reveal" className="text-gray-400 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, fIdx) => (
                        <span key={fIdx} className="px-4 py-1.5 bg-zinc-800/60 text-xs font-bold text-gray-300 rounded-full border border-zinc-700/80 transition-all duration-300 hover:bg-zinc-800 hover:border-purple-500/30">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty CTA Section */}
      <section className="py-24 bg-zinc-950/60">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-purple-600/10 border border-purple-500/20 rounded-[40px] py-16 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 data-scroll-text="split-words" className="text-3xl sm:text-4xl font-black mb-6">Ready to Start Your Project?</h2>
            <p data-scroll-text="reveal" className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
              Have a project in mind? Our web experts are ready to bring your vision to life with modern technology and precision craftsmanship.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-all cursor-pointer shadow-lg shadow-purple-600/20"
            >
              Inquire About Your Project
            </motion.div>
          </div>
          {/* Subtle glow backlights */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        </motion.div>
      </section>
    </>
  );
};

export default Services;
