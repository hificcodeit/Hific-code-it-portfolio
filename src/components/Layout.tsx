import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout Component
 * Wraps all pages with the standard Navbar and Footer.
 * Incorporates interactive 3D parallax glowing background layers and smooth page transitions.
 */
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Interactive 3D Parallax Tracking using Framer Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs filter raw inputs into extremely smooth continuous movements (prevents sudden jumps)
  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  // Layered translation distances to produce authentic 3D spatial depth
  const layer1X = useTransform(springX, (v) => `${v * 0.8}px`);
  const layer1Y = useTransform(springY, (v) => `${v * 0.8}px`);

  const layer2X = useTransform(springX, (v) => `${v * -0.6}px`);
  const layer2Y = useTransform(springY, (v) => `${v * -0.6}px`);

  const layer3X = useTransform(springX, (v) => `${v * 0.4}px`);
  const layer3Y = useTransform(springY, (v) => `${v * 0.4}px`);

  const layer4X = useTransform(springX, (v) => `${v * -0.2}px`);
  const layer4Y = useTransform(springY, (v) => `${v * -0.2}px`);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Calculate cursor offset from center of viewport in pixels
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;
      
      // Limit background drift within standard premium boundaries (max 50px offset)
      const limitX = (x / (window.innerWidth / 2)) * 50;
      const limitY = (y / (window.innerHeight / 2)) * 50;
      
      mouseX.set(limitX);
      mouseY.set(limitY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-purple-500/30 relative overflow-hidden">
      {/* Continuous Ambient Glowing Background Blobs (Changed & Enhanced with 3D Parallax) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1 - Indigo drift */}
        <motion.div 
          style={{ x: layer1X, y: layer1Y }}
          className="absolute -top-40 -left-40 w-[35rem] sm:w-[55rem] h-[35rem] sm:h-[55rem] bg-indigo-600/12 rounded-full blur-[130px] sm:blur-[170px] animate-blob-slow" 
        />
        {/* Layer 2 - Cyan drift (opposite direction parallax) */}
        <motion.div 
          style={{ x: layer2X, y: layer2Y }}
          className="absolute top-1/4 -right-40 w-[30rem] sm:w-[50rem] h-[30rem] sm:h-[50rem] bg-cyan-500/10 rounded-full blur-[130px] sm:blur-[170px] animate-blob-medium" 
        />
        {/* Layer 3 - Fuchsia drift */}
        <motion.div 
          style={{ x: layer3X, y: layer3Y }}
          className="absolute -bottom-40 left-1/3 w-[32rem] sm:w-[52rem] h-[32rem] sm:h-[52rem] bg-fuchsia-600/12 rounded-full blur-[130px] sm:blur-[170px] animate-blob-fast" 
        />
        {/* Layer 4 - Cosmic heartbeat central blur */}
        <motion.div 
          style={{ x: layer4X, y: layer4Y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] sm:w-[60rem] h-[40rem] sm:h-[60rem] bg-violet-950/10 rounded-full blur-[140px] sm:blur-[180px] animate-blob-heartbeat" 
        />
      </div>

      <Navbar />

      {/* Main content area with top padding to account for fixed navbar */}
      <main className="flex-grow pt-20 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* ─── WhatsApp Floating Button ─── */}
      <motion.a
        href="https://wa.me/919095614966"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
        whileHover={{ scale: 1.12, y: -4 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-[200] group"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400/40 animate-ping" />
        {/* Button */}
        <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 border border-green-400/30 transition-shadow duration-300 group-hover:shadow-green-500/60">
          {/* WhatsApp SVG Icon */}
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.004 2.667C8.641 2.667 2.667 8.641 2.667 16c0 2.365.641 4.672 1.859 6.683L2.667 29.333l6.816-1.789A13.28 13.28 0 0 0 16.004 29.333C23.365 29.333 29.333 23.36 29.333 16c0-7.36-5.968-13.333-13.329-13.333zm0 24.267a11.001 11.001 0 0 1-5.617-1.541l-.403-.24-4.043 1.061 1.08-3.937-.265-.412A10.978 10.978 0 0 1 5.04 16c0-6.052 4.92-10.973 10.964-10.973 6.045 0 10.965 4.921 10.965 10.973 0 6.053-4.92 10.974-10.965 10.974zm6.015-8.22c-.328-.164-1.945-.96-2.247-1.069-.3-.111-.52-.164-.737.164-.22.328-.848 1.069-1.04 1.291-.191.219-.383.246-.711.082-.328-.164-1.385-.511-2.638-1.627-.975-.869-1.633-1.943-1.824-2.271-.191-.328-.02-.505.144-.668.148-.148.328-.383.492-.575.164-.191.219-.328.328-.547.109-.219.055-.41-.027-.575-.082-.164-.737-1.777-1.01-2.435-.265-.637-.537-.55-.737-.56-.191-.009-.41-.011-.629-.011-.219 0-.575.082-.875.41-.3.328-1.147 1.12-1.147 2.732 0 1.613 1.174 3.172 1.338 3.39.164.22 2.309 3.527 5.598 4.945.782.337 1.394.539 1.87.69.786.249 1.503.214 2.069.13.631-.094 1.945-.795 2.22-1.563.274-.767.274-1.426.191-1.563-.082-.137-.3-.219-.629-.383z" />
          </svg>
        </div>
        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-800 text-white text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none shadow-xl">
          Chat on WhatsApp
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-zinc-800" />
        </div>
      </motion.a>
    </div>
  );
};

export default Layout;

