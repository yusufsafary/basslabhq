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
    head: 'Platform',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Steam Games ↗', href: 'https://store.steampowered.com/app/872990/Stream_Games/', external: true },
      { label: '$BASS on Solana', href: '#bass-token', external: false },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
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
    color: 'hover:border-indigo-500/50 hover:text-indigo-300',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>,
  },
  {
    label: 'X',
    color: 'hover:border-slate-400/50 hover:text-slate-200',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.95H5.078z"/></svg>,
  },
  {
    label: 'YouTube',
    color: 'hover:border-red-500/50 hover:text-red-300',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
  {
    label: 'Steam',
    href: 'https://store.steampowered.com/app/872990/Stream_Games/',
    color: 'hover:border-sky-500/50 hover:text-sky-300',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/></svg>,
  },
];

const SPECIES = ['Largemouth Bass', 'Striped Bass', 'Northern Pike', 'Catfish', 'Rainbow Trout', 'Walleye', 'Bluegill', 'Carp'];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  return (
    <footer style={{ background: '#040c1e', borderTop: '1px solid rgba(80,160,200,0.12)' }} className="mt-auto">

      {/* $BASS + Steam announcement strip */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(88,40,200,0.18) 0%, rgba(4,12,30,0.9) 40%, rgba(245,158,11,0.08) 100%)',
        borderBottom: '1px solid rgba(80,160,200,0.1)',
      }} className="py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* $BASS token */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #9945ff, #14f195)', boxShadow: '0 0 14px rgba(153,69,255,0.35)' }}>
              <span className="text-xs font-black text-white" style={{ fontFamily: 'Bebas Neue' }}>$B</span>
            </div>
            <div>
              <div className="text-[9px] font-mono tracking-[0.22em] uppercase mb-0.5" style={{ color: 'rgba(153,69,255,0.8)' }}>
                SOLANA NETWORK
              </div>
              <div className="text-xs font-bold" style={{ color: 'rgba(210,190,255,0.9)' }}>
                $BASS token — launching soon · Premium features for holders
              </div>
            </div>
          </div>
          {/* Steam CTA */}
          <a
            href="https://store.steampowered.com/app/872990/Stream_Games/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 flex-shrink-0 font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-200 hover:-translate-y-0.5"
            style={{
              border: '1px solid rgba(100,180,255,0.3)',
              background: 'rgba(100,180,255,0.06)',
              color: 'rgba(140,210,255,0.9)',
              boxShadow: '0 0 14px rgba(100,180,255,0.08)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0z"/>
            </svg>
            Play on Steam Games →
          </a>
        </div>
      </div>

      {/* Species strip */}
      <div style={{ borderBottom: '1px solid rgba(80,160,200,0.07)' }} className="py-3 overflow-hidden">
        <div className="flex items-center gap-3 px-6 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <span className="text-[9px] font-mono tracking-[0.28em] uppercase flex-shrink-0"
            style={{ color: 'rgba(100,160,200,0.55)' }}>
            SUPPORTED SPECIES
          </span>
          {SPECIES.map(s => (
            <Link key={s} href="/generator">
              <span
                className="flex-shrink-0 text-[9.5px] font-mono px-2.5 py-1 cursor-pointer whitespace-nowrap transition-all duration-150"
                style={{ border: '1px solid rgba(80,140,180,0.18)', color: 'rgba(140,185,215,0.65)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(245,158,11,0.35)';
                  (e.currentTarget as HTMLSpanElement).style.color = 'rgba(245,158,11,0.85)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(80,140,180,0.18)';
                  (e.currentTarget as HTMLSpanElement).style.color = 'rgba(140,185,215,0.65)';
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
                <div className="tracking-[0.12em] text-white"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.25rem' }}>
                  BASSLAB <span style={{ color: '#f59e0b' }}>HQ</span>
                </div>
                <div className="text-[9px] font-mono tracking-[0.22em]" style={{ color: 'rgba(245,158,11,0.5)' }}>
                  FISHING SIM TOOLS
                </div>
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'rgba(150,185,215,0.7)' }}>
              The precision analytics platform for serious fishing simulation players. Data-driven coordinates, optimized loadouts, tournament-grade tactics.
            </p>

            <div className="flex gap-2 mb-7">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={(s as typeof SOCIALS[0] & { href?: string }).href || '#'}
                  target={(s as typeof SOCIALS[0] & { href?: string }).href ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`w-8 h-8 border flex items-center justify-center transition-all duration-200 ${s.color}`}
                  style={{ borderColor: 'rgba(80,140,180,0.2)', color: 'rgba(140,180,210,0.6)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 px-3 py-2 w-fit"
              style={{ border: '1px solid rgba(34,197,94,0.22)', background: 'rgba(34,197,94,0.05)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0"/>
              <span className="text-[9.5px] font-mono tracking-widest" style={{ color: 'rgba(74,222,128,0.75)' }}>
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>

          {/* Nav columns */}
          {COLS.map(col => (
            <div key={col.head} className="lg:col-span-1">
              <h4 className="text-[9.5px] font-mono tracking-[0.24em] uppercase mb-5"
                style={{ color: 'rgba(245,158,11,0.65)' }}>
                {col.head}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(link => {
                  const ext = (link as typeof col.links[0] & { external?: boolean }).external;
                  return (
                    <li key={link.label}>
                      {ext ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm transition-colors duration-150 flex items-center gap-2 group"
                          style={{ color: 'rgba(140,185,215,0.65)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,225,240,0.9)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(140,185,215,0.65)'; }}
                        >
                          <span className="w-0 group-hover:w-3 h-px bg-amber-500/50 transition-all duration-200 overflow-hidden flex-shrink-0"/>
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href}
                          className="text-sm transition-colors duration-150 flex items-center gap-2 group"
                          style={{ color: 'rgba(140,185,215,0.65)' }}
                          onMouseEnter={(e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.color = 'rgba(200,225,240,0.9)'; }}
                          onMouseLeave={(e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.color = 'rgba(140,185,215,0.65)'; }}
                        >
                          <span className="w-0 group-hover:w-3 h-px bg-amber-500/50 transition-all duration-200 overflow-hidden flex-shrink-0"/>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-10" style={{ borderTop: '1px solid rgba(80,140,180,0.1)' }}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <p className="text-[9.5px] font-mono tracking-[0.24em] uppercase mb-2"
                style={{ color: 'rgba(245,158,11,0.65)' }}>
                PATCH NOTES & UPDATES
              </p>
              <p className="text-sm" style={{ color: 'rgba(150,185,215,0.65)' }}>
                New lakes, species, algorithm upgrades — straight to your inbox. No spam.
              </p>
            </div>
            {subbed ? (
              <div className="flex items-center gap-2 px-5 py-3"
                style={{ border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.05)' }}>
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
                  className="w-52 px-4 py-2.5 text-sm font-mono focus:outline-none transition-colors duration-150"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(80,140,180,0.2)',
                    borderRight: 'none',
                    color: 'rgba(190,215,235,0.9)',
                  }}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(245,158,11,0.4)'; }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(80,140,180,0.2)'; }}
                />
                <button type="submit"
                  className="px-5 py-2.5 text-black text-xs font-bold font-mono tracking-widest flex-shrink-0 transition-all duration-150 hover:brightness-110"
                  style={{ background: '#f59e0b' }}>
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(80,140,180,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10.5px] font-mono" style={{ color: 'rgba(120,165,200,0.5)' }}>
            © {new Date().getFullYear()} BassLab HQ · basslabhq.fun · Not affiliated with any game studio
          </p>
          <div className="flex gap-5 items-center">
            <Link href="/privacy" className="text-[10.5px] font-mono transition-colors"
              style={{ color: 'rgba(120,165,200,0.5)' }}
              onMouseEnter={(e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,210,230,0.8)'; }}
              onMouseLeave={(e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.color = 'rgba(120,165,200,0.5)'; }}>
              Privacy
            </Link>
            <Link href="/terms" className="text-[10.5px] font-mono transition-colors"
              style={{ color: 'rgba(120,165,200,0.5)' }}
              onMouseEnter={(e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.color = 'rgba(180,210,230,0.8)'; }}
              onMouseLeave={(e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.color = 'rgba(120,165,200,0.5)'; }}>
              Terms
            </Link>
            <a href="https://store.steampowered.com/app/872990/Stream_Games/" target="_blank" rel="noopener noreferrer"
              className="text-[10.5px] font-mono transition-colors"
              style={{ color: 'rgba(100,180,255,0.5)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(140,210,255,0.85)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(100,180,255,0.5)'; }}>
              Steam Games
            </a>
            <span className="text-[10.5px] font-mono" style={{ color: 'rgba(120,165,200,0.3)' }}>v2.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
