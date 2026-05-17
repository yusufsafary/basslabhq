import React from 'react';
import { Link } from 'wouter';

const sections = [
  {
    title: 'Tools',
    links: [
      { label: 'Loadout Generator', href: '/generator' },
      { label: 'Koordinat Optimizer', href: '/generator' },
      { label: 'Species Selector', href: '/generator' },
      { label: 'Weather Modifier', href: '/generator' },
    ],
  },
  {
    title: 'BassLab',
    links: [
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Mission Statement', href: '/about' },
      { label: 'Hubungi Kami', href: '/contact' },
      { label: 'Kontribusi Data', href: '/contact' },
    ],
  },
  {
    title: 'Komunitas',
    links: [
      { label: 'Discord Server', href: '#' },
      { label: 'X / Twitter', href: '#' },
      { label: 'YouTube Channel', href: '#' },
      { label: 'Forum Diskusi', href: '#' },
    ],
  },
];

const SPECIES_TAGS = ['Largemouth Bass', 'Striped Bass', 'Northern Pike', 'Catfish', 'Trout', 'Walleye', 'Carp'];

export default function Footer() {
  return (
    <footer className="bg-[#040c18] border-t border-white/6 mt-auto">
      {/* Top band */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect width="36" height="36" fill="rgba(245,158,11,0.12)" rx="4"/>
                  <path d="M8 24 C10 20 14 14 18 14 C22 14 26 20 28 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <ellipse cx="23" cy="21" rx="3.5" ry="2" fill="#f59e0b" opacity="0.9"/>
                  <ellipse cx="23" cy="21" rx="3.5" ry="2" fill="#f59e0b"/>
                  <line x1="26" y1="20" x2="30" y2="16" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="30" cy="15.5" r="1" fill="#ef4444"/>
                  <path d="M19 20.5 L20.5 19 L22 20.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none"/>
                </svg>
                <div>
                  <span className="font-display text-2xl text-white tracking-wide">BASSLAB HQ</span>
                  <div className="text-[10px] font-mono text-amber-400/60 tracking-[0.2em]">FISHING SIM TOOLS</div>
                </div>
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {SPECIES_TAGS.map(tag => (
                <span key={tag} className="text-[10px] font-mono px-2.5 py-1 border border-white/10 text-slate-500 hover:border-amber-500/30 hover:text-amber-400/70 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="lg:pr-8">
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Platform tools analitik untuk pemain simulasi pancing yang serius. Kami mengubah data game menjadi keunggulan taktis nyata.
            </p>
            <div className="flex gap-3">
              {/* Discord */}
              <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-slate-500 hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-200">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
                </svg>
              </a>
              {/* X/Twitter */}
              <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-slate-500 hover:border-slate-400/50 hover:text-slate-300 transition-all duration-200">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.95H5.078z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-slate-500 hover:border-red-500/50 hover:text-red-400 transition-all duration-200">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-slate-500 hover:border-white/30 hover:text-slate-300 transition-all duration-200">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[11px] font-mono tracking-[0.2em] text-amber-400/70 uppercase mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-150 flex items-center gap-2 group"
                    >
                      <span className="w-3 h-px bg-amber-500/0 group-hover:bg-amber-500/60 transition-all duration-200"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter teaser */}
        <div className="mt-14 pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1 max-w-md">
              <p className="text-xs font-mono text-amber-400/60 uppercase tracking-widest mb-2">Update & Patch Notes</p>
              <p className="text-sm text-slate-500">Dapatkan notifikasi saat kami menambah lokasi baru, spesies baru, atau update algoritma generator.</p>
            </div>
            <div className="flex gap-0 flex-shrink-0">
              <input
                type="email"
                placeholder="email@kamu.com"
                className="bg-white/4 border border-white/10 px-4 py-2.5 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-amber-500/40 font-mono w-56"
              />
              <button className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-5 py-2.5 tracking-widest transition-colors duration-150 font-mono">
                DAFTAR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs font-mono text-slate-600">
            &copy; {new Date().getFullYear()} BassLab HQ — basslabhq.com — Tidak terafiliasi dengan game apapun
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-mono text-slate-600 hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="text-xs font-mono text-slate-600 hover:text-slate-400 transition-colors">Terms</a>
            <span className="text-xs font-mono text-slate-700">v2.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
