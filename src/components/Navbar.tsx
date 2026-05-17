import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV = [
  { href:'/', label:'Home' },
  { href:'/generator', label:'Generator' },
  { href:'/how-to', label:'How To' },
  { href:'/about', label:'About' },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#030810]/96 backdrop-blur-md border-b border-white/7 shadow-2xl shadow-black/30' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" fill="rgba(245,158,11,0.1)" rx="3"/>
              <path d="M8 24 C10 20 14 14 18 14 C22 14 26 20 28 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <ellipse cx="23" cy="21" rx="3.5" ry="2" fill="#f59e0b"/>
              <line x1="26" y1="20" x2="30" y2="16" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="30" cy="15.5" r="1" fill="#ef4444"/>
            </svg>
            <span className="font-display text-lg text-white tracking-wider group-hover:text-amber-400 transition-colors">
              BASSLAB <span className="text-amber-400">HQ</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                className={`px-3.5 py-2 text-[11px] font-mono tracking-[0.18em] uppercase transition-all duration-150 ${
                  location === n.href
                    ? 'text-amber-400 bg-amber-500/8'
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}>
                {n.label}
              </Link>
            ))}
            <Link href="/generator">
              <button className="ml-4 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-bold font-mono tracking-widest transition-colors duration-150">
                LAUNCH ▶
              </button>
            </Link>
          </div>

          {/* Mobile */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-slate-400 hover:text-white p-1">
            {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            className="md:hidden bg-[#030810] border-b border-white/7">
            <div className="px-6 py-4 space-y-1">
              {NAV.map(n => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 text-[11px] font-mono tracking-widest uppercase transition-colors ${
                    location===n.href ? 'text-amber-400' : 'text-slate-500 hover:text-white'
                  }`}>
                  {n.label}
                </Link>
              ))}
              <Link href="/generator" onClick={() => setOpen(false)}>
                <button className="w-full mt-3 py-3 bg-amber-500 text-black text-[11px] font-bold font-mono tracking-widest">
                  LAUNCH GENERATOR ▶
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
