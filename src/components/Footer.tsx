import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';

/**
 * Footer Component
 * Brand: hifi_codeit
 * Simpler footer as requested with company name and social links.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          
          {/* Brand & Tagline - hifi_codeit */}
          <div className="text-center md:text-left animate-fade-in">
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-3 group mb-2">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-purple-500/30 bg-zinc-950/80 overflow-hidden shadow-lg shadow-purple-500/10 transition-all duration-500 group-hover:border-purple-500/80 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src={logo} 
                  alt="hifi_codeit logo" 
                  className="h-7 w-7 object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                hifi<span className="text-purple-500">_</span>codeit
              </span>
            </Link>
            <p className="text-sm font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 animate-gradient-text-flow w-fit mx-auto md:mx-0">
              We Design. We Code. You Grow.
            </p>
          </div>

          {/* Social Links - Simple and professional style */}
          <div className="flex space-x-8">
            <a 
              href="https://www.instagram.com/hifi_codeit" // REPLACE IF NEEDED
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-500 transition-all flex items-center text-sm font-bold uppercase tracking-widest"
            >
              Instagram
            </a>
            <a 
              href="https://www.linkedin.com/in/sarvothyan-s-a61786291/" // LINKEDIN UPDATED
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-500 transition-all flex items-center text-sm font-bold uppercase tracking-widest"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:hificodeitinfotech@gmail.com" // EMAIL UPDATED
              className="text-gray-400 hover:text-purple-500 transition-all flex items-center text-sm font-bold uppercase tracking-widest"
            >
              Email
            </a>
          </div>

          {/* Copyright Section */}
          <div className="text-gray-600 text-xs font-medium">
            © {currentYear} hifi_codeit.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
