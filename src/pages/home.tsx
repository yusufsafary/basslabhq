import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import FishingScene from '@/components/FishingScene';

const WORDS = ['Precision.', 'Advantage.', 'Victory.'];

const features = [
  { icon:'🎯', tag:'COORDINATES', title:'Precision Hotspots', desc:'X/Y coordinates optimized by species, weather, time of day and season — no more guesswork on the water.' },
  { icon:'🎣', tag:'LOADOUT', title:'High-Probability Rigs', desc:'Bait, line and hook combos field-tested for specific conditions — from finesse jigs to topwater frogs.' },
  { icon:'📊', tag:'ANALYTICS', title:'Live Catch Rate', desc:'Probability score computed from all input variables. An honest number, not a motivational guess.' },
  { icon:'🏆', tag:'TOURNAMENT', title:'Tournament Grade', desc:'Built for players who want the leaderboard. Advanced heuristics modeled on real simulation datasets.' },
];

const STATS = [['12+','Lakes'],['500+','Loadouts'],['97%','Accuracy'],['Free','Forever']];

export default function Home() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full">
      {/* ── HERO ── */}
      <section className="relative w-full" style={{ height: '100vh', minHeight: 600 }}>
        <div className="absolute inset-0">
          <FishingScene />
        </div>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(5,13,26,0.92) 0%, rgba(5,13,26,0.75) 45%, rgba(5,13,26,0.15) 100%)'
        }}/>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(5,13,26,0.6) 0%, transparent 35%)'
        }}/>

        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-20 max-w-3xl">
          <motion.div
            initial={{ opacity:0, y:14 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.55, ease:[0.25,0.1,0.25,1] }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 border border-amber-500/40 bg-amber-500/8 text-amber-400 text-xs font-mono tracking-widest uppercase mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>
              LIVE — Fishing Sim Tools v2.1
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:22 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.1, ease:[0.25,0.1,0.25,1] }}>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-none text-white mb-2">
              BASSLAB HQ
            </h1>
            <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-none mb-6" style={{ minHeight:'1.2em' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ opacity:0, y:14 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-14 }}
                  transition={{ duration:0.3, ease:[0.25,0.1,0.25,1] }}
                  className="text-amber-400 block"
                >
                  {WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.7, delay:0.25, ease:'easeOut' }}
            className="text-lg text-slate-300 max-w-xl mb-10 leading-relaxed">
            Precision tools for fishing simulation players. Generate optimal coordinates, loadouts and catch strategies — powered by real game data.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:14 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.35, ease:[0.25,0.1,0.25,1] }}
            className="flex flex-wrap gap-3 mb-14">
            <Link href="/generator">
              <button className="px-9 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono tracking-widest text-sm transition-all duration-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-400/35 hover:-translate-y-0.5 active:translate-y-0">
                LAUNCH GENERATOR →
              </button>
            </Link>
            <Link href="/how-to">
              <button className="px-9 py-4 border border-white/20 hover:border-teal-400/50 text-slate-300 hover:text-teal-400 font-bold font-mono tracking-widest text-sm transition-all duration-200 bg-black/20 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0">
                HOW IT WORKS
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.6, delay:0.5 }}
            className="flex gap-8 pt-6 border-t border-white/10">
            {STATS.map(([v,l], i) => (
              <motion.div key={l}
                initial={{ opacity:0, y:8 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.4, delay:0.55 + i*0.07, ease:[0.25,0.1,0.25,1] }}>
                <div className="font-display text-2xl font-black text-amber-400">{v}</div>
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">{l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:0.4 }}
          transition={{ duration:1, delay:1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y:[0,4,0] }}
            transition={{ duration:1.5, repeat:Infinity, ease:'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-slate-400 to-transparent"/>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-28 bg-[#07111f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity:0, y:16 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.3 }}
            transition={{ duration:0.5, ease:[0.25,0.1,0.25,1] }}
            className="text-center mb-16">
            <p className="text-[11px] font-mono tracking-[0.28em] text-amber-400/70 uppercase mb-3">WHAT WE PROVIDE</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white">
              Everything you need<br/><span className="text-teal-400">to land the big one.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:28 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ delay:i*0.1, duration:0.5, ease:[0.25,0.1,0.25,1] }}
                className="group p-7 bg-white/[0.028] border border-white/[0.07] hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-px bg-amber-500/0 group-hover:bg-amber-500/50 transition-all duration-300"/>
                <div className="text-3xl mb-5">{f.icon}</div>
                <p className="text-[10px] font-mono tracking-[0.22em] text-slate-500 mb-2">{f.tag}</p>
                <h3 className="font-display text-xl font-black text-white mb-3 leading-tight">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-[#060e1a] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity:0, y:16 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.3 }}
            transition={{ duration:0.5, ease:[0.25,0.1,0.25,1] }}
            className="text-center mb-14">
            <p className="text-[11px] font-mono tracking-[0.28em] text-teal-400/70 uppercase mb-3">THE PROCESS</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white">Three steps to your next catch.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step:'01', title:'Set Parameters', desc:'Choose your lake, target species, weather conditions, time of day and season modifier.' },
              { step:'02', title:'Initiate Scan', desc:'Our engine processes all variables through thousands of heuristic simulations in under 2 seconds.' },
              { step:'03', title:'Execute Loadout', desc:'Get precise coordinates, optimal bait selection and tactical tips tailored to your exact conditions.' },
            ].map((s,i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ delay:i*0.12, duration:0.5, ease:[0.25,0.1,0.25,1] }}
                className="text-center p-8 border border-white/6 bg-white/[0.02] relative hover:border-amber-500/20 transition-colors duration-300">
                <div className="font-display text-7xl font-black text-white/5 absolute top-4 left-1/2 -translate-x-1/2">{s.step}</div>
                <div className="relative z-10">
                  <div className="w-10 h-10 border border-amber-500/40 flex items-center justify-center mx-auto mb-5">
                    <span className="font-mono text-sm font-bold text-amber-400">{s.step}</span>
                  </div>
                  <h3 className="font-display text-2xl text-white mb-3">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#07111f] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(245,158,11,0.06) 0%, transparent 65%)'
        }}/>
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.3 }}
          transition={{ duration:0.6, ease:[0.25,0.1,0.25,1] }}
          className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] font-mono tracking-[0.28em] text-amber-400/70 uppercase mb-5">GET STARTED NOW</p>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white leading-none mb-6">
            READY TO <span className="text-amber-400">DOMINATE</span><br/>THE LEADERBOARD?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
            Thousands of players already use BassLab HQ to sharpen their edge. 100% free. Always will be.
          </p>
          <Link href="/generator">
            <button className="px-14 py-5 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono tracking-widest text-base transition-all duration-200 shadow-2xl shadow-amber-500/20 hover:shadow-amber-400/30 hover:-translate-y-0.5 active:translate-y-0">
              LAUNCH GENERATOR →
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
