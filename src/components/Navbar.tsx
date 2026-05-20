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

const TICKER_ITEMS = [
  { icon: '🎮', text: 'PREMIUM FEATURES AVAILABLE ON STEAM GAMES', link: 'https://store.steampowered.com/app/872990/Stream_Games/', linkLabel: 'VIEW ON STEAM' },
  { icon: '🪙', text: '$BASS TOKEN LAUNCHING ON SOLANA NETWORK', link: null, linkLabel: null },
  { icon: '🎣', text: 'BASSLAB HQ — FREE TOOLS FOR FISHING SIM PLAYERS', link: null, linkLabel: null },
  { icon: '⚡', text: 'PREMIUM FEATURES UNLOCKED FOR $BASS HOLDERS', link: 'https://store.steampowered.com/app/872990/Stream_Games/', linkLabel: 'PLAY NOW' },
  { icon: '🌊', text: '$BASS ON SOLANA · EARLY ACCESS FOR TOKEN HOLDERS', link: null, linkLabel: null },
  { icon: '🎮', text: 'PREMIUM FEATURES AVAILABLE ON STEAM GAMES', link: 'https://store.steampowered.com/app/872990/Stream_Games/', linkLabel: 'VIEW ON STEAM' },
  { icon: '🪙', text: '$BASS TOKEN LAUNCHING ON SOLANA NETWORK', link: null, linkLabel: null },
  { icon: '🎣', text: 'BASSLAB HQ — FREE TOOLS FOR FISHING SIM PLAYERS', link: null, linkLabel: null },
  { icon: '⚡', text: 'PREMIUM FEATURES UNLOCKED FOR $BASS HOLDERS', link: 'https://store.steampowered.com/app/872990/Stream_Games/', linkLabel: 'PLAY NOW' },
  { icon: '🌊', text: '$BASS ON SOLANA · EARLY ACCESS FOR TOKEN HOLDERS', link: null, linkLabel: null },
];

function Ticker() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] overflow-hidden flex items-center"
      style={{
        height: 30,
        background: 'linear-gradient(90deg, #0a0e20 0%, #0d1530 40%, #0a0e20 100%)',
        borderBottom: '1px solid rgba(245,158,11,0.22)',
      }}
    >
      {/* Left badge */}
      <div
        className="flex-shrink-0 flex items-center gap-1.5 px-3 h-full z-10"
        style={{ background: '#f59e0b', minWidth: 90 }}
      >
        <span style={{ fontSize: 10 }}>📡</span>
        <span className="text-[9px] font-black font-mono tracking-[0.18em] text-black">LIVE</span>
      </div>

      {/* Scrolling content */}
      <div className="flex-1 overflow-hidden h-full relative">
        <div
          className="flex items-center h-full gap-0"
          style={{ animation: 'ticker-scroll 55s linear infinite', width: 'max-content' }}
        >
          {TICKER_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center flex-shrink-0">
              <span className="flex items-center gap-2 px-5 h-full font-mono text-[9.5px] tracking-[0.18em] whitespace-nowrap"
                style={{ color: item.text.includes('$BASS') ? 'rgba(147,100,255,0.9)' : item.text.includes('STEAM') ? 'rgba(100,200,255,0.9)' : 'rgba(180,200,220,0.7)' }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer"
                    className="pointer-events-auto"
                    onClick={e => e.stopPropagation()}
                    style={{
                      color: '#f59e0b',
                      border: '1px solid rgba(245,158,11,0.35)',
                      padding: '1px 7px',
                      fontSize: 8,
                      letterSpacing: '0.2em',
                      fontWeight: 700,
                    }}>
                    {item.linkLabel} →
                  </a>
                )}
              </span>
              <span style={{ color: 'rgba(245,158,11,0.3)', fontSize: 10, flexShrink: 0 }}>·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <>
      <Ticker />

      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: 30,
          ...(scrolled ? {
            background: 'rgba(3,8,20,0.92)',
            backdropFilter: 'blur(22px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
            borderBottom: '1px solid rgba(255,255,255,0.065)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(245,158,11,0.05)',
          } : {
            background: 'transparent',
          }),
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-[62px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none"
                  className="transition-transform duration-300 group-hover:scale-105">
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
                <span className="font-display text-[1.1rem] tracking-[0.12em] text-white/90 group-hover:text-white transition-colors duration-200"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  BASSLAB
                </span>
                <span className="font-display text-[1.1rem] tracking-[0.12em] ml-1.5"
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
                      active ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-100'
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
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-0 group-hover:w-4 bg-slate-400/40 rounded-full transition-all duration-200"/>
                    )}
                  </Link>
                );
              })}

              {/* Steam CTA */}
              <a
                href="https://store.steampowered.com/app/872990/Stream_Games/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 flex items-center gap-1.5 px-3 py-2 font-mono text-[9px] tracking-[0.16em] uppercase transition-all duration-200 hover:opacity-80"
                style={{
                  border: '1px solid rgba(100,180,255,0.25)',
                  background: 'rgba(100,180,255,0.06)',
                  color: 'rgba(120,190,255,0.85)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/>
                </svg>
                STEAM
              </a>

              <Link href="/generator" className="ml-2">
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
                background: 'rgba(3,8,20,0.97)',
                backdropFilter: 'blur(22px)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="px-6 py-5 space-y-1">
                {NAV.map(n => (
                  <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
                    <span className={`flex items-center gap-3 px-3 py-3 text-[11px] font-mono tracking-[0.2em] uppercase transition-colors duration-150 ${
                      location === n.href ? 'text-amber-400' : 'text-slate-400 hover:text-slate-100'
                    }`}>
                      {location === n.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"/>
                      )}
                      {n.label}
                    </span>
                  </Link>
                ))}
                <div className="pt-2 pb-1 space-y-2">
                  <a href="https://store.steampowered.com/app/872990/Stream_Games/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 text-[10px] font-mono tracking-[0.2em] uppercase"
                    style={{ border: '1px solid rgba(100,180,255,0.22)', color: 'rgba(120,190,255,0.85)' }}>
                    🎮 PLAY ON STEAM GAMES
                  </a>
                  <Link href="/generator" onClick={() => setOpen(false)}>
                    <button className="w-full py-3.5 font-mono font-bold text-[11px] tracking-[0.22em] uppercase"
                      style={{ background: '#f59e0b', color: '#000' }}>
                      LAUNCH GENERATOR ▶
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
