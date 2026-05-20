import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import FishingScene from '@/components/FishingScene';

const ROTATING_WORDS = ['PRECISION.', 'ADVANTAGE.', 'DOMINANCE.', 'VICTORY.'];

const FEATURES = [
  { icon:'⚡', tag:'GENERATOR', title:'Precision Coordinates', desc:'X/Y hotspots computed by species, weather, time and season. Every variable modeled.' },
  { icon:'🎣', tag:'LOADOUT',   title:'Optimal Rigs', desc:'Primary and secondary bait combos tested across thousands of sim runs.' },
  { icon:'📊', tag:'DATA',      title:'Catch Probability', desc:'Honest probability score. Not a motivational guess. Real computed output.' },
  { icon:'🏆', tag:'TOURNAMENT', title:'Leaderboard Grade', desc:'Built for competitive players. Advanced heuristics, tournament-level edge.' },
];

export default function Home() {
  const [wordIdx, setWordIdx] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0,1], [0, -40]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i+1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full">

      {/* ============================================================
          HERO: Full-viewport interactive fishing emulator
      ============================================================ */}
      <section ref={heroRef} className="relative" style={{ height:'100vh', minHeight:620 }}>

        {/* Fishing scene takes the full right portion */}
        <motion.div className="absolute inset-0" style={{ opacity: sceneOpacity }}>
          <FishingScene showUI={true}/>
        </motion.div>

        {/* Left overlay gradient for text legibility */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(105deg, rgba(3,8,16,0.97) 0%, rgba(3,8,16,0.92) 32%, rgba(3,8,16,0.65) 55%, rgba(3,8,16,0.08) 80%, transparent 100%)'
        }}/>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to top, rgba(3,8,16,0.7) 0%, transparent 30%)'
        }}/>

        {/* Text content (left side, z-20 to be above scene UI) */}
        <motion.div
          style={{ y: textY }}
          className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 lg:px-20 max-w-2xl pointer-events-none z-20">

          <motion.div
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.55, ease:[0.25,0.1,0.25,1] }}>
            <div className="inline-flex items-center gap-2.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>
              <span className="text-[10px] font-mono tracking-[0.28em] text-amber-400/80 uppercase">Live Fishing Simulator Tools</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:24 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.08, ease:[0.25,0.1,0.25,1] }}>
            <h1 style={{ fontFamily:'Bebas Neue, sans-serif', lineHeight:0.92 }}
              className="text-7xl sm:text-8xl lg:text-9xl font-black text-white mb-3 tracking-wide">
              BASSLAB<br/>
              <span className="text-amber-400">HQ</span>
            </h1>
            <div style={{ minHeight:'1.1em', fontFamily:'Bebas Neue, sans-serif' }}
              className="text-3xl sm:text-4xl font-black text-slate-300 mb-7 tracking-wider overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span key={wordIdx}
                  initial={{ opacity:0, y:20 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-20 }}
                  transition={{ duration:0.28, ease:[0.25,0.1,0.25,1] }}
                  className="block text-amber-400">
                  {ROTATING_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.7, delay:0.22, ease:'easeOut' }}
            className="text-base text-slate-400 max-w-sm mb-8 leading-relaxed">
            Precision tools for fishing simulation players. Hotspot coordinates, optimal loadouts and catch probability computed from real game data.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.32, ease:[0.25,0.1,0.25,1] }}
            className="flex flex-wrap gap-3 mb-10 pointer-events-auto">
            <Link href="/generator">
              <button style={{ background:'#f59e0b', color:'#000', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.2em', border:'none' }}
                className="px-9 py-4 font-black text-xs uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:brightness-110 shadow-xl shadow-amber-500/20">
                LAUNCH GENERATOR
              </button>
            </Link>
            <Link href="/how-to">
              <button style={{ background:'transparent', color:'rgba(148,163,184,0.85)', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.2em', border:'1px solid rgba(255,255,255,0.12)' }}
                className="px-9 py-4 font-bold text-xs uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/30 hover:text-amber-400 active:translate-y-0">
                HOW IT WORKS
              </button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.6, delay:0.45 }}
            className="flex gap-7 border-t pt-6"
            style={{ borderColor:'rgba(255,255,255,0.07)' }}>
            {[['12+','Lakes'],['500+','Loadouts'],['97%','Accuracy'],['Free','Forever']].map(([v,l],i) => (
              <motion.div key={l}
                initial={{ opacity:0, y:8 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.5+i*0.07, duration:0.35, ease:[0.25,0.1,0.25,1] }}>
                <div style={{ fontFamily:'Bebas Neue, sans-serif' }} className="text-2xl font-black text-amber-400">{v}</div>
                <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">{l}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:0.45 }}
          transition={{ delay:1.4 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-mono text-slate-500 tracking-[0.25em] uppercase">Scroll</span>
          <motion.div
            animate={{ y:[0,5,0] }}
            transition={{ duration:1.4, repeat:Infinity, ease:'easeInOut' }}
            className="w-px h-9"
            style={{ background:'linear-gradient(to bottom, rgba(148,163,184,0.5), transparent)' }}/>
        </motion.div>
      </section>

      {/* ============================================================
          FEATURES GRID
      ============================================================ */}
      <section className="py-24 border-t" style={{ background:'#040c17', borderColor:'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <motion.div
              initial={{ opacity:0, y:14 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.3 }}
              transition={{ duration:0.5, ease:[0.25,0.1,0.25,1] }}>
              <p className="text-[10px] font-mono tracking-[0.28em] text-teal-400/60 uppercase mb-3">CAPABILITIES</p>
              <h2 style={{ fontFamily:'Bebas Neue, sans-serif' }}
                className="text-5xl md:text-6xl font-black text-white leading-tight">
                EVERY TOOL<br/><span className="text-teal-400">YOU NEED.</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true, amount:0.3 }}
              transition={{ duration:0.6, delay:0.1 }}
              className="text-slate-500 text-sm max-w-xs leading-relaxed font-mono">
              Computed from simulation data. No forum guesses. No stale spreadsheets.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5">
            {FEATURES.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ delay:i*0.1, duration:0.5, ease:[0.25,0.1,0.25,1] }}
                className="p-7 relative group cursor-default transition-all duration-300"
                style={{
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                <div className="absolute top-0 left-0 right-0 h-px bg-amber-500/0 group-hover:bg-amber-500/60 transition-all duration-400"/>
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/[0.03] transition-all duration-400"/>
                <div className="relative">
                  <span className="text-2xl block mb-5">{f.icon}</span>
                  <p className="text-[9px] font-mono tracking-[0.22em] text-slate-600 mb-3 uppercase">{f.tag}</p>
                  <h3 style={{ fontFamily:'Bebas Neue, sans-serif' }} className="text-2xl text-white mb-3 leading-tight">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3-STEP PROCESS
      ============================================================ */}
      <section className="py-24 border-t" style={{ background:'#030911', borderColor:'rgba(255,255,255,0.04)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity:0, y:14 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.3 }}
            transition={{ duration:0.5, ease:[0.25,0.1,0.25,1] }}
            className="mb-16 text-center">
            <p className="text-[10px] font-mono tracking-[0.28em] text-amber-400/60 uppercase mb-4">THE PROCESS</p>
            <h2 style={{ fontFamily:'Bebas Neue, sans-serif' }} className="text-5xl md:text-6xl font-black text-white">
              THREE STEPS. ONE EDGE.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background:'rgba(255,255,255,0.04)' }}>
            {[
              { n:'01', t:'Configure', d:'Set your lake, species, weather and time. Every variable is factored into the output.' },
              { n:'02', t:'Compute',   d:'Engine runs heuristic simulations in under 2 seconds. Thousands of possible states evaluated.' },
              { n:'03', t:'Execute',   d:'Precise coordinates, optimal bait, depth zone, cast distance and tactical tips. All ready.' },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ delay:i*0.12, duration:0.5, ease:[0.25,0.1,0.25,1] }}
                className="p-8 relative group hover:-translate-y-1 transition-transform duration-300"
                style={{ background:'#030911' }}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/0 group-hover:via-amber-500/40 to-transparent transition-all duration-400"/>
                <div style={{ fontFamily:'Bebas Neue, sans-serif' }}
                  className="text-8xl font-black text-white/4 group-hover:text-amber-500/10 transition-colors duration-300 absolute top-3 right-4 leading-none">
                  {s.n}
                </div>
                <div className="relative">
                  <div className="w-9 h-9 border border-amber-500/30 flex items-center justify-center mb-5 group-hover:border-amber-500/60 transition-colors">
                    <span className="font-mono text-xs font-bold text-amber-400">{s.n}</span>
                  </div>
                  <h3 style={{ fontFamily:'Bebas Neue, sans-serif' }} className="text-3xl text-white mb-3">{s.t}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-mono">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA BLOCK
      ============================================================ */}
      <section className="py-28 border-t relative overflow-hidden" style={{ background:'#040c17', borderColor:'rgba(255,255,255,0.05)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background:'radial-gradient(ellipse at 50% 100%, rgba(245,158,11,0.07) 0%, transparent 65%)'
        }}/>
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}/>

        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.3 }}
          transition={{ duration:0.6, ease:[0.25,0.1,0.25,1] }}
          className="relative max-w-4xl mx-auto px-6 text-center">

          <p className="text-[10px] font-mono tracking-[0.32em] text-amber-400/60 uppercase mb-6">GET YOUR EDGE</p>

          <h2 style={{ fontFamily:'Bebas Neue, sans-serif', lineHeight:0.92 }}
            className="text-6xl sm:text-7xl md:text-8xl font-black text-white mb-8">
            READY TO<br/><span className="text-amber-400">OWN THE</span><br/>LEADERBOARD?
          </h2>

          <p className="text-slate-500 text-sm max-w-sm mx-auto mb-10 leading-relaxed font-mono">
            Thousands of players already run BassLab HQ before every session. Free. Always.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/generator">
              <button style={{ background:'#f59e0b', color:'#000', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.2em', border:'none' }}
                className="px-12 py-5 font-black text-sm uppercase transition-all duration-200 shadow-2xl shadow-amber-500/20 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0">
                LAUNCH GENERATOR
              </button>
            </Link>
            <Link href="/how-to">
              <button style={{ background:'transparent', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.18em', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(148,163,184,0.7)' }}
                className="px-12 py-5 font-bold text-sm uppercase transition-all duration-200 hover:border-teal-400/30 hover:text-teal-400 hover:-translate-y-0.5">
                READ THE DOCS
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
