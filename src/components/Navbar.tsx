import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/generator', label: 'Generator' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#040c18]/95 backdrop-blur-md border-b border-white/8 shadow-xl shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" fill="rgba(245,158,11,0.1)" rx="3"/>
              <path d="M8 24 C10 20 14 14 18 14 C22 14 26 20 28 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <ellipse cx="23" cy="21" rx="3.5" ry="2" fill="#f59e0b"/>
              <line x1="26" y1="20" x2="30" y2="16" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="30" cy="15.5" r="1" fill="#ef4444"/>
            </svg>
            <span className="font-display text-xl text-white tracking-wider group-hover:text-amber-400 transition-colors duration-200">
              BASSLAB <span className="text-amber-400">HQ</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-mono tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/8'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label.toUpperCase()}
                </Link>
              );
            })}
            <Link href="/generator">
              <button className="ml-4 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold font-mono tracking-widest transition-colors duration-150">
                LAUNCH
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#040c18] border-b border-white/8"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 text-sm font-mono tracking-widest transition-colors ${
                      isActive ? 'text-amber-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                );
              })}
              <Link href="/generator" onClick={() => setIsOpen(false)}>
                <button className="w-full mt-3 py-2.5 bg-amber-500 text-black text-sm font-bold font-mono tracking-widest">
                  LAUNCH GENERATOR
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
