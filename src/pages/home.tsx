import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import FishingScene from '@/components/FishingScene';

const ROTATING_WORDS = ['PRECISION.', 'ADVANTAGE.', 'DOMINANCE.', 'VICTORY.'];

const FEATURES = [
  {
    icon: '⚡',
    tag: 'GENERATOR',
    title: 'Precision Coordinates',
    desc: 'X/Y hotspots computed by species, weather, time and season. Every variable modeled.',
    color: '#f59e0b',
  },
  {
    icon: '🎣',
    tag: 'LOADOUT',
    title: 'Optimal Rigs',
    desc: 'Primary and secondary bait combos tested across thousands of sim runs.',
    color: '#14b8a6',
  },
  {
    icon: '📊',
    tag: 'DATA',
    title: 'Catch Probability',
    desc: 'Honest probability score. Not a motivational guess. Real computed output.',
    color: '#f59e0b',
  },
  {
    icon: '🏆',
    tag: 'TOURNAMENT',
    title: 'Leaderboard Grade',
    desc: 'Built for competitive players. Advanced heuristics, tournament-level edge.',
    color: '#14b8a6',
  },
];

function FeatureCard({ f, i }: { f: typeof FEATURES[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-7 relative cursor-default transition-colors duration-300"
      style={{
        borderRight: i < 3 ? '1px solid rgba(80,160,200,0.12)' : 'none',
        borderBottom: '1px solid rgba(80,160,200,0.12)',
        background: hovered ? `${f.color}0a` : 'transparent',
      }}>
      <div className="absolute top-0 left-0 right-0 h-px transition-all duration-300" style={{
        background: hovered
          ? `linear-gradient(90deg, transparent 5%, ${f.color}90 50%, transparent 95%)`
          : 'transparent',
      }}/>
      <div className="w-9 h-9 flex items-center justify-center mb-5"
        style={{ border: `1px solid ${f.color}35`, background: `${f.color}08` }}>
        <span className="text-base">{f.icon}</span>
      </div>
      <p className="font-mono mb-3 uppercase tracking-[0.26em]"
        style={{ fontSize: '0.58rem', color: `${f.color}80` }}>
        {f.tag}
      </p>
      <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', color: '#d4e4f4' }}
        className="mb-3 leading-tight">
        {f.title}
      </h3>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(150,185,215,0.72)' }}>
        {f.desc}
      </p>
    </motion.div>
  );
}

function StepCard({ s, i }: { s: { n: string; t: string; d: string }; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-9 relative overflow-hidden transition-colors duration-300"
      style={{ background: hovered ? 'rgba(245,158,11,0.04)' : '#040d1e' }}>
      <div className="absolute top-0 left-0 right-0 h-px transition-all duration-300" style={{
        background: hovered
          ? 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)'
          : 'transparent',
      }}/>
      {/* Big ghost number */}
      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '5.5rem',
        lineHeight: 1,
        color: hovered ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.03)',
        transition: 'color 0.3s ease',
        position: 'absolute',
        top: 8,
        right: 20,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        {s.n}
      </div>
      <div className="relative z-10">
        <div className="w-10 h-10 flex items-center justify-center mb-6 transition-colors duration-300"
          style={{
            border: hovered ? '1px solid rgba(245,158,11,0.5)' : '1px solid rgba(245,158,11,0.25)',
            background: 'rgba(245,158,11,0.06)',
          }}>
          <span className="font-mono text-xs font-bold" style={{ color: '#f59e0b' }}>{s.n}</span>
        </div>
        <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.1rem', color: '#d4e4f4' }} className="mb-3">
          {s.t}
        </h3>
        <p className="text-xs leading-relaxed font-mono" style={{ color: 'rgba(150,185,215,0.68)' }}>
          {s.d}
        </p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [wordIdx, setWordIdx] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full">

      {/* ═══════════════════════════════════════════════════════════
          HERO — full viewport fishing simulation
      ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative" style={{ height: '100vh', minHeight: 640 }}>

        {/* The fishing scene — fills entire viewport, fully visible */}
        <motion.div className="absolute inset-0" style={{ opacity: sceneOpacity }}>
          <FishingScene showUI={true} />
        </motion.div>

        {/* Gradient only on left side — subtle, not the 0.97-opacity black wall */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            'linear-gradient(105deg,',
            'rgba(4,10,28,0.93) 0%,',
            'rgba(4,10,28,0.82) 22%,',
            'rgba(4,10,28,0.52) 42%,',
            'rgba(4,10,28,0.10) 62%,',
            'transparent 75%)',
          ].join(' '),
        }}/>
        {/* Bottom fade */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to top, rgba(4,10,28,0.88) 0%, rgba(4,10,28,0.28) 18%, transparent 36%)',
        }}/>

        {/* Hero content — left column only, scene fully visible on right */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center pointer-events-none z-20"
          style={{ y: textY, padding: '0 2rem 0 2.5rem', maxWidth: 620 } as React.CSSProperties}>

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.28em] uppercase"
              style={{
                border: '1px solid rgba(245,158,11,0.3)',
                background: 'rgba(245,158,11,0.08)',
                color: 'rgba(255,200,80,0.9)',
              }}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>
              Live Fishing Simulator Tools
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}>
            <h1 className="font-black tracking-wide mb-0" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              lineHeight: 0.88,
              fontSize: 'clamp(4.5rem, 12vw, 8rem)',
            }}>
              <span className="text-white">BASS</span>
              <span style={{ color: '#ffd040' }}>LAB</span>
            </h1>
            <h1 className="font-black tracking-wide mb-5" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              lineHeight: 0.88,
              fontSize: 'clamp(4.5rem, 12vw, 8rem)',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #ffd040 0%, #f59e0b 40%, #e8621a 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>HQ</span>
            </h1>

            {/* Rotating word */}
            <div style={{
              minHeight: '1.1em',
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            }} className="font-black text-white/80 mb-7 tracking-wider overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span key={wordIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block"
                  style={{ color: '#40d8e0' }}>
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
            className="font-sans mb-8 leading-relaxed"
            style={{ fontSize: '0.92rem', color: 'rgba(175,210,230,0.88)', maxWidth: 320 }}>
            Precision tools for fishing simulation players. Hotspot coordinates, optimal loadouts and catch probability from real game data.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap gap-3 mb-10 pointer-events-auto">
            <Link href="/generator">
              <button
                className="px-9 py-4 font-black text-xs uppercase transition-all duration-200 hover:-translate-y-1 hover:brightness-110 active:translate-y-0"
                style={{
                  background: '#f59e0b',
                  color: '#000',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.2em',
                  border: 'none',
                  boxShadow: '0 0 28px rgba(245,158,11,0.45), 0 4px 16px rgba(0,0,0,0.4)',
                }}>
                LAUNCH GENERATOR
              </button>
            </Link>
            <Link href="/how-to">
              <button
                className="px-9 py-4 font-bold text-xs uppercase transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
                style={{
                  background: 'rgba(4,14,36,0.6)',
                  color: 'rgba(150,215,240,0.9)',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.2em',
                  border: '1px solid rgba(80,180,220,0.28)',
                  backdropFilter: 'blur(8px)',
                }}>
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
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[['12+', 'Lakes'], ['500+', 'Loadouts'], ['97%', 'Accuracy'], ['Free', 'Forever']].map(([v, l], i) => (
              <motion.div key={l}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52 + i * 0.07, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}>
                <div
                  className="font-black leading-none mb-0.5"
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '1.75rem',
                    background: 'linear-gradient(135deg, #ffd040, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  {v}
                </div>
                <div className="text-[9.5px] font-mono uppercase tracking-widest"
                  style={{ color: 'rgba(140,190,220,0.55)' }}>
                  {l}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-mono tracking-[0.28em] uppercase"
            style={{ color: 'rgba(150,200,220,0.5)' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, rgba(80,200,220,0.5), transparent)' }}/>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURES GRID
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t"
        style={{ background: '#060f22', borderColor: 'rgba(80,160,200,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
              <p className="font-mono uppercase tracking-[0.32em] mb-3"
                style={{ fontSize: '0.6rem', color: 'rgba(64,216,224,0.65)' }}>
                CAPABILITIES
              </p>
              <h2 className="font-black" style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
                lineHeight: 1,
              }}>
                <span className="text-white">EVERY TOOL</span>
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #40d8e0, #14b8a6, #0891b2)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>YOU NEED.</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-sm max-w-xs leading-relaxed"
              style={{ color: 'rgba(150,185,215,0.68)' }}>
              Computed from simulation data. No forum guesses. No stale spreadsheets.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ border: '1px solid rgba(80,160,200,0.12)' }}>
            {FEATURES.map((f, i) => <FeatureCard key={i} f={f} i={i} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3-STEP PROCESS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t"
        style={{ background: '#040d1e', borderColor: 'rgba(80,160,200,0.08)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-16 text-center">
            <p className="font-mono uppercase tracking-[0.32em] mb-4"
              style={{ fontSize: '0.6rem', color: 'rgba(245,158,11,0.6)' }}>
              THE PROCESS
            </p>
            <h2 className="font-black" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
              lineHeight: 1,
            }}>
              <span className="text-white">THREE STEPS. </span>
              <span style={{
                background: 'linear-gradient(135deg, #ffd040, #f59e0b, #e8621a)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>ONE EDGE.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: '1px', background: 'rgba(80,160,200,0.1)' }}>
            {[
              { n: '01', t: 'Configure', d: 'Set your lake, species, weather and time. Every variable is factored into the output.' },
              { n: '02', t: 'Compute',   d: 'Engine runs heuristic simulations in under 2 seconds. Thousands of possible states evaluated.' },
              { n: '03', t: 'Execute',   d: 'Precise coordinates, optimal bait, depth zone, cast distance and tactical tips. All ready.' },
            ].map((s, i) => <StepCard key={i} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 border-t relative overflow-hidden"
        style={{ background: '#060f22', borderColor: 'rgba(80,160,200,0.08)' }}>
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 120%, rgba(20,184,166,0.12) 0%, transparent 60%)',
        }}/>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(245,158,11,0.06) 0%, transparent 50%)',
        }}/>
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(80,160,200,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(80,160,200,0.025) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}/>
        {/* Top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/5 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.45), transparent)' }}/>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative max-w-4xl mx-auto px-6 text-center">

          <p className="font-mono uppercase tracking-[0.36em] mb-7"
            style={{ fontSize: '0.6rem', color: 'rgba(245,158,11,0.6)' }}>
            GET YOUR EDGE
          </p>

          <h2 className="font-black mb-8" style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
            lineHeight: 0.9,
          }}>
            <span className="text-white">READY TO</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #ffd040, #f59e0b, #e8621a)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>OWN THE</span>
            <br />
            <span className="text-white">LEADERBOARD?</span>
          </h2>

          <p className="font-mono text-sm max-w-sm mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(150,185,215,0.68)' }}>
            Thousands of players already run BassLab HQ before every session. Free. Always.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/generator">
              <button
                className="px-12 py-5 font-black text-sm uppercase transition-all duration-200 hover:-translate-y-1 hover:brightness-110 active:translate-y-0"
                style={{
                  background: '#f59e0b',
                  color: '#000',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.2em',
                  border: 'none',
                  boxShadow: '0 0 32px rgba(245,158,11,0.4), 0 6px 20px rgba(0,0,0,0.4)',
                }}>
                LAUNCH GENERATOR
              </button>
            </Link>
            <Link href="/how-to">
              <button
                className="px-12 py-5 font-bold text-sm uppercase transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
                style={{
                  background: 'rgba(4,14,36,0.5)',
                  color: 'rgba(150,215,240,0.85)',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.18em',
                  border: '1px solid rgba(80,180,220,0.25)',
                  backdropFilter: 'blur(8px)',
                }}>
                READ THE DOCS
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
