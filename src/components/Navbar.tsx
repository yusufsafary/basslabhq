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
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled ? {
        background: 'rgba(3,8,20,0.88)',
        backdropFilter: 'blur(22px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
        borderBottom: '1px solid rgba(255,255,255,0.065)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(245,158,11,0.05)',
      } : {
        background: 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-[62px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none" className="transition-transform duration-300 group-hover:scale-105">
                <rect width="36" height="36" fill="rgba(245,158,11,0.12)" rx="4"/>
                <rect width="36" height="36" fill="none" stroke="rgba(245,158,11,0.25)" strokeWidth="0.75" rx="4"/>
                <path d="M8 24 C10 20 14 14 18 14 C22 14 26 20 28 24" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                <ellipse cx="23" cy="21" rx="3.5" ry="2" fill="#f59e0b"/>
                <line x1="26" y1="20" x2="30" y2="16" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="30" cy="15.5" r="1.1" fill="#ef4444"/>
              </svg>
              <div className="absolute -inset-1 rounded-md bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"/>
            </div>
            <div className="flex items-baseline gap-0">
              <span
                className="font-display text-[1.1rem] tracking-[0.12em] text-white/90 group-hover:text-white transition-colors duration-200"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                BASSLAB
              </span>
              <span
                className="font-display text-[1.1rem] tracking-[0.12em] ml-1.5"
                style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f59e0b' }}>
                HQ
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV.map(n => {
              const active = location === n.href;
              return (
                <Link key={n.href} href={n.href} className="relative group">
                  <span className={`block px-4 py-2.5 text-[10.5px] font-mono tracking-[0.18em] uppercase transition-all duration-200 ${
                    active
                      ? 'text-amber-400'
                      : 'text-slate-500 group-hover:text-slate-200'
                  }`}>
                    {n.label}
                  </span>
                  {active ? (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-4 bg-amber-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                    />
                  ) : (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-0 group-hover:w-4 bg-slate-500/40 rounded-full transition-all duration-200"/>
                  )}
                </Link>
              );
            })}

            <Link href="/generator" className="ml-5">
              <button
                className="btn-amber-glow px-5 py-2.5 font-mono font-bold text-[10.5px] tracking-[0.2em] uppercase"
                style={{ background: '#f59e0b', color: '#000' }}
              >
                LAUNCH ▶
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(3,8,20,0.96)',
              backdropFilter: 'blur(22px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="px-6 py-5 space-y-1">
              {NAV.map(n => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
                  <span className={`flex items-center gap-3 px-3 py-3 text-[11px] font-mono tracking-[0.2em] uppercase transition-colors duration-150 ${
                    location === n.href
                      ? 'text-amber-400'
                      : 'text-slate-500 hover:text-slate-200'
                  }`}>
                    {location === n.href && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"/>
                    )}
                    {n.label}
                  </span>
                </Link>
              ))}
              <div className="pt-3">
                <Link href="/generator" onClick={() => setOpen(false)}>
                  <button
                    className="w-full py-3.5 font-mono font-bold text-[11px] tracking-[0.22em] uppercase transition-all duration-200"
                    style={{ background: '#f59e0b', color: '#000' }}
                  >
                    LAUNCH GENERATOR ▶
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
