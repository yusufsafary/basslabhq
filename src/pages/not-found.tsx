import React from 'react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-display text-[9rem] font-black text-white/5 leading-none mb-2 select-none">404</div>
        <div className="text-5xl mb-6">🎣</div>
        <h1 className="font-display text-4xl font-black text-white mb-4">NOTHING BITING HERE</h1>
        <p className="text-slate-500 font-mono text-sm mb-8 leading-relaxed">
          The page you're looking for swam away. It might have been moved, renamed, or just never existed.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <button className="px-7 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-sm tracking-widest transition-colors">
              GO HOME
            </button>
          </Link>
          <Link href="/generator">
            <button className="px-7 py-3 border border-white/15 hover:border-white/30 text-slate-400 hover:text-white font-bold font-mono text-sm tracking-widest transition-colors">
              GENERATOR
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
