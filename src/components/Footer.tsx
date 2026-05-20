import React, { useState } from 'react';
import { Link } from 'wouter';

const COLS = [
  {
    head: 'Tools',
    links: [
      { label: 'Loadout Generator', href: '/generator' },
      { label: 'Coordinate Optimizer', href: '/generator' },
      { label: 'Species Selector', href: '/generator' },
      { label: 'Weather Modifier', href: '/generator' },
      { label: 'Season Planner', href: '/generator' },
    ],
  },
  {
    head: 'Learn',
    links: [
      { label: 'How It Works', href: '/how-to' },
      { label: 'About BassLab', href: '/about' },
      { label: 'Fish Species Guide', href: '/how-to#species' },
      { label: 'Tackle Glossary', href: '/how-to#tackle' },
      { label: 'Game Tips', href: '/how-to#tips' },
    ],
  },
  {
    head: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
  {
    head: 'Community',
    links: [
      { label: 'Discord Server', href: '#' },
      { label: 'X / Twitter', href: '#' },
      { label: 'YouTube Channel', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Submit Data', href: '/contact' },
    ],
  },
];

const SOCIALS = [
  {
    label: 'Discord',
    color: 'hover:border-indigo-500/50 hover:text-indigo-400',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>,
  },
  {
    label: 'X',
    color: 'hover:border-slate-400/50 hover:text-slate-300',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.95H5.078z"/></svg>,
  },
  {
    label: 'YouTube',
    color: 'hover:border-red-500/50 hover:text-red-400',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
  {
    label: 'GitHub',
    color: 'hover:border-white/30 hover:text-slate-200',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  },
];

const SPECIES = ['Largemouth Bass', 'Striped Bass', 'Northern Pike', 'Catfish', 'Rainbow Trout', 'Walleye', 'Bluegill', 'Carp'];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  return (
    <footer style={{ background: '#020810', borderTop: '1px solid rgba(255,255,255,0.05)' }} className="mt-auto">

      {/* Species strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }} className="py-3 overflow-hidden">
        <div className="flex items-center gap-3 px-6 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <span className="text-[9px] font-mono text-slate-700 tracking-[0.28em] uppercase flex-shrink-0">
            SUPPORTED SPECIES
          </span>
          {SPECIES.map(s => (
            <Link key={s} href="/generator">
              <span
                className="flex-shrink-0 text-[9.5px] font-mono px-2.5 py-1 cursor-pointer whitespace-nowrap transition-all duration-150"
                style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(100,116,139,0.7)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(245,158,11,0.3)';
                  (e.currentTarget as HTMLSpanElement).style.color = 'rgba(245,158,11,0.8)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLSpanElement).style.color = 'rgba(100,116,139,0.7)';
                }}
              >
                {s}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 md:gap-6">

          {/* Brand column */}
          <div className="lg:col-span-2 md:pr-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative">
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                  <rect width="36" height="36" fill="rgba(245,158,11,0.1)" rx="4"/>
                  <rect width="36" height="36" fill="none" stroke="rgba(245,158,11,0.2)" strokeWidth="0.75" rx="4"/>
                  <path d="M8 24 C10 20 14 14 18 14 C22 14 26 20 28 24" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                  <ellipse cx="23" cy="21" rx="3.5" ry="2" fill="#f59e0b"/>
                  <line x1="26" y1="20" x2="30" y2="16" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="30" cy="15.5" r="1.1" fill="#ef4444"/>
                </svg>
              </div>
              <div>
                <div
                  className="tracking-[0.12em] text-white"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.25rem' }}
                >
                  BASSLAB <span style={{ color: '#f59e0b' }}>HQ</span>
                </div>
                <div className="text-[9px] font-mono tracking-[0.22em]" style={{ color: 'rgba(245,158,11,0.45)' }}>
                  FISHING SIM TOOLS
                </div>
              </div>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
              The precision analytics platform for serious fishing simulation players. Data-driven coordinates, optimized loadouts, tournament-grade tactics.
            </p>

            <div className="flex gap-2 mb-7">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href="#"
                  className={`w-8 h-8 border flex items-center justify-center text-slate-600 transition-all duration-200 ${s.color}`}
                  style={{ borderColor: 'rgba(255,255,255,0.09)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div
              className="flex items-center gap-2 px-3 py-2 w-fit"
              style={{ border: '1px solid rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.04)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0"/>
              <span className="text-[9.5px] font-mono text-green-400/70 tracking-widest">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Nav columns */}
          {COLS.map(col => (
            <div key={col.head} className="lg:col-span-1">
              <h4 className="text-[9.5px] font-mono tracking-[0.24em] uppercase mb-5" style={{ color: 'rgba(245,158,11,0.6)' }}>
                {col.head}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-600 hover:text-slate-300 transition-colors duration-150 flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-3 h-px bg-amber-500/50 transition-all duration-200 overflow-hidden flex-shrink-0"/>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <p className="text-[9.5px] font-mono tracking-[0.24em] uppercase mb-2" style={{ color: 'rgba(245,158,11,0.6)' }}>
                PATCH NOTES & UPDATES
              </p>
              <p className="text-sm text-slate-500">New lakes, species, algorithm upgrades — straight to your inbox. No spam.</p>
            </div>
            {subbed ? (
              <div
                className="flex items-center gap-2 px-5 py-3"
                style={{ border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.05)' }}
              >
                <span className="text-green-400 text-sm">✓</span>
                <span className="text-sm font-mono text-green-400">You're on the list.</span>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email) setSubbed(true); }} className="flex flex-shrink-0">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-52 px-4 py-2.5 text-sm text-slate-300 placeholder-slate-700 font-mono focus:outline-none transition-colors duration-150"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRight: 'none',
                  }}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(245,158,11,0.35)'; }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.09)'; }}
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-black text-xs font-bold font-mono tracking-widest flex-shrink-0 transition-all duration-150 hover:brightness-110"
                  style={{ background: '#f59e0b' }}
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10.5px] font-mono text-slate-700">
            © {new Date().getFullYear()} BassLab HQ · basslabhq.com · Not affiliated with any game studio
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-[10.5px] font-mono text-slate-700 hover:text-slate-500 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10.5px] font-mono text-slate-700 hover:text-slate-500 transition-colors">Terms</Link>
            <Link href="/cookies" className="text-[10.5px] font-mono text-slate-700 hover:text-slate-500 transition-colors">Cookies</Link>
            <span className="text-[10.5px] font-mono text-slate-800">v2.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
