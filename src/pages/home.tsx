import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import FishingScene from '@/components/FishingScene';

const ROTATING_WORDS = ['PRECISION.', 'ADVANTAGE.', 'DOMINANCE.', 'VICTORY.'];

const FEATURES = [
  {
    tag: 'GENERATOR',
    title: 'Precision Coordinates',
    desc: 'X/Y hotspots computed by species, weather, time and season. Every variable modeled.',
    accent: '#f59e0b',
  },
  {
    tag: 'LOADOUT',
    title: 'Optimal Rigs',
    desc: 'Primary and secondary bait combos tested across thousands of sim runs.',
    accent: '#14b8a6',
  },
  {
    tag: 'DATA',
    title: 'Catch Probability',
    desc: 'Honest probability score. Not a motivational guess. Real computed output.',
    accent: '#f59e0b',
  },
  {
    tag: 'TOURNAMENT',
    title: 'Leaderboard Grade',
    desc: 'Built for competitive players. Advanced heuristics, tournament-level edge.',
    accent: '#14b8a6',
  },
];

export default function Home() {
  const [wordIdx, setWordIdx] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.35]);

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full">

      {/* ────────────────────────────────────────────────────────
          HERO
      ──────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative" style={{ height: '100vh', minHeight: 620 }}>

        {/* Interactive fishing scene */}
        <motion.div className="absolute inset-0" style={{ opacity: sceneOpacity }}>
          <FishingScene showUI={true} />
        </motion.div>

        {/* Multi-layer gradient vignette — more cinematic */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(108deg, rgba(2,6,18,0.97) 0%, rgba(2,6,18,0.93) 30%, rgba(2,6,18,0.60) 52%, rgba(2,6,18,0.06) 78%, transparent 100%)',
        }}/>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to top, rgba(2,6,18,0.85) 0%, rgba(2,6,18,0.30) 22%, transparent 42%)',
        }}/>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 15% 60%, rgba(245,158,11,0.04) 0%, transparent 55%)',
        }}/>

        {/* Hero text */}
        <motion.div
          style={{ y: textY }}
          className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 lg:px-20 max-w-[680px] pointer-events-none z-20"
        >
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-7"
          >
            <span className="tag-pill">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0"/>
              Live Fishing Simulator Tools
            </span>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1
              className="font-black text-white mb-2 tracking-wide leading-[0.9]"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(4rem,11vw,7.5rem)' }}
            >
              BASSLAB
            </h1>
            <h1
              className="font-black mb-5 tracking-wide leading-[0.9] text-gradient-amber"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(4rem,11vw,7.5rem)' }}
            >
              HQ
            </h1>

            {/* Rotating word */}
            <div
              style={{ minHeight: '1.15em', fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(1.6rem,4vw,2.5rem)' }}
              className="font-black text-slate-300 mb-7 tracking-wider overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block"
                  style={{ color: '#f59e0b' }}
                >
                  {ROTATING_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.22, ease: 'easeOut' }}
            className="text-sm md:text-base text-slate-400 max-w-[340px] mb-8 leading-relaxed"
          >
            Precision tools for fishing simulation players. Hotspot coordinates, optimal loadouts and catch probability computed from real game data.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap gap-3 mb-10 pointer-events-auto"
          >
            <Link href="/generator">
              <button
                className="btn-amber-glow px-9 py-4 font-black text-xs uppercase tracking-[0.2em]"
                style={{ background: '#f59e0b', color: '#000', fontFamily: 'JetBrains Mono, monospace' }}
              >
                LAUNCH GENERATOR
              </button>
            </Link>
            <Link href="/how-to">
              <button
                className="px-9 py-4 font-bold text-xs uppercase tracking-[0.2em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: 'transparent',
                  color: 'rgba(148,163,184,0.85)',
                  fontFamily: 'JetBrains Mono, monospace',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(245,158,11,0.35)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#f59e0b';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(148,163,184,0.85)';
                }}
              >
                HOW IT WORKS
              </button>
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex gap-7 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {[['12+', 'Lakes'], ['500+', 'Loadouts'], ['97%', 'Accuracy'], ['Free', 'Forever']].map(([v, l], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div
                  className="text-gradient-amber font-black leading-none mb-0.5"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem' }}
                >
                  {v}
                </div>
                <div className="text-[9.5px] font-mono text-slate-600 uppercase tracking-widest">{l}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1.5"
        >
          <span className="text-[9px] font-mono text-slate-600 tracking-[0.28em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, rgba(148,163,184,0.45), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ────────────────────────────────────────────────────────
          FEATURES GRID
      ──────────────────────────────────────────────────────── */}
      <section className="py-24 border-t" style={{ background: '#030c18', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="text-[10px] font-mono tracking-[0.3em] text-teal-400/55 uppercase mb-3">CAPABILITIES</p>
              <h2
                className="font-black leading-tight"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem,5.5vw,4rem)' }}
              >
                <span className="text-white">EVERY TOOL</span>
                <br />
                <span className="text-gradient-teal">YOU NEED.</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-500 text-sm max-w-xs leading-relaxed font-mono"
            >
              Computed from simulation data. No forum guesses. No stale spreadsheets.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ border: '1px solid rgba(255,255,255,0.055)' }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="card-top-line p-7 relative group cursor-default"
                style={{
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.055)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.055)',
                  background: 'transparent',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = `rgba(${f.accent === '#f59e0b' ? '245,158,11' : '20,184,166'},0.025)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                }}
              >
                <div className="relative z-10">
                  <div className="mb-5">
                    <span
                      className="inline-block w-8 h-8 border flex items-center justify-center text-sm font-mono font-bold transition-colors duration-300"
                      style={{
                        borderColor: `${f.accent}40`,
                        color: f.accent,
                        background: `${f.accent}08`,
                      }}
                    >
                      {['⚡', '🎣', '📊', '🏆'][i]}
                    </span>
                  </div>
                  <p className="text-[9px] font-mono tracking-[0.24em] mb-3 uppercase" style={{ color: `${f.accent}60` }}>
                    {f.tag}
                  </p>
                  <h3
                    className="text-white mb-3 leading-tight"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem' }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          3-STEP PROCESS
      ──────────────────────────────────────────────────────── */}
      <section className="py-24 border-t" style={{ background: '#020910', borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-16 text-center"
          >
            <p className="text-[10px] font-mono tracking-[0.3em] text-amber-400/55 uppercase mb-4">THE PROCESS</p>
            <h2
              className="font-black text-white"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem,5.5vw,4rem)' }}
            >
              THREE STEPS.{' '}
              <span className="text-gradient-amber">ONE EDGE.</span>
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: '1px', background: 'rgba(255,255,255,0.04)' }}
          >
            {[
              { n: '01', t: 'Configure', d: 'Set your lake, species, weather and time. Every variable is factored into the output.' },
              { n: '02', t: 'Compute',   d: 'Engine runs heuristic simulations in under 2 seconds. Thousands of possible states evaluated.' },
              { n: '03', t: 'Execute',   d: 'Precise coordinates, optimal bait, depth zone, cast distance and tactical tips. All ready.' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="p-8 md:p-10 relative group card-top-line"
                style={{ background: '#020910' }}
              >
                <div
                  className="font-black text-white/[0.035] group-hover:text-amber-500/[0.08] absolute top-3 right-5 leading-none transition-colors duration-300 select-none"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '5.5rem' }}
                >
                  {s.n}
                </div>
                <div className="relative z-10">
                  <div
                    className="w-10 h-10 border border-amber-500/28 flex items-center justify-center mb-6 group-hover:border-amber-500/55 transition-colors duration-300"
                    style={{ background: 'rgba(245,158,11,0.04)' }}
                  >
                    <span className="font-mono text-xs font-bold text-amber-400">{s.n}</span>
                  </div>
                  <h3
                    className="text-white mb-3"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem' }}
                  >
                    {s.t}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-mono">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          CTA
      ──────────────────────────────────────────────────────── */}
      <section
        className="py-28 border-t relative overflow-hidden"
        style={{ background: '#030c18', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 110%, rgba(245,158,11,0.09) 0%, transparent 60%)',
        }}/>
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none grid-bg"/>

        {/* Horizontal amber line accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <p className="text-[10px] font-mono tracking-[0.34em] text-amber-400/55 uppercase mb-7">GET YOUR EDGE</p>

          <h2
            className="font-black mb-8 leading-[0.9]"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3.2rem,8vw,6rem)' }}
          >
            <span className="text-white">READY TO</span>
            <br />
            <span className="text-gradient-amber">OWN THE</span>
            <br />
            <span className="text-white">LEADERBOARD?</span>
          </h2>

          <p className="text-slate-500 text-sm max-w-sm mx-auto mb-10 leading-relaxed font-mono">
            Thousands of players already run BassLab HQ before every session. Free. Always.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/generator">
              <button
                className="btn-amber-glow px-12 py-5 font-black text-sm uppercase tracking-[0.2em]"
                style={{ background: '#f59e0b', color: '#000', fontFamily: 'JetBrains Mono, monospace' }}
              >
                LAUNCH GENERATOR
              </button>
            </Link>
            <Link href="/how-to">
              <button
                className="px-12 py-5 font-bold text-sm uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: 'transparent',
                  fontFamily: 'JetBrains Mono, monospace',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(148,163,184,0.7)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(20,184,166,0.35)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#2dd4bf';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(148,163,184,0.7)';
                }}
              >
                READ THE DOCS
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
