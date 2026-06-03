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
    </div>
  );
};

export default Layout;

