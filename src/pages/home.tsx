import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import FishingScene from '@/components/FishingScene';

const ROTATING_WORDS = ['PRECISION.', 'ADVANTAGE.', 'DOMINANCE.', 'VICTORY.'];

/* ── Species data for the animated showcase ── */
const SPECIES = [
  { name: 'Largemouth Bass', emoji: '🐟', depth: '3–12 ft', season: 'Spring–Fall', bait: 'Spinnerbait · Frog', color: '#5a8a2a', glow: 'rgba(90,138,42,0.3)' },
  { name: 'Northern Pike',   emoji: '🐠', depth: '3–15 ft', season: 'Spring & Fall', bait: 'Large Spoon · Jerkbait', color: '#7a9a38', glow: 'rgba(122,154,56,0.3)' },
  { name: 'Rainbow Trout',   emoji: '🐡', depth: '2–10 ft', season: 'Spring & Fall', bait: 'Spinner · Fly', color: '#6aaa78', glow: 'rgba(106,170,120,0.3)' },
  { name: 'Walleye',         emoji: '🐟', depth: '8–25 ft', season: 'Spring & Fall', bait: 'Jig + Paddle Tail', color: '#a07838', glow: 'rgba(160,120,56,0.3)' },
  { name: 'Catfish',         emoji: '🐠', depth: '5–20 ft', season: 'Summer Peak', bait: 'Cut Bait · Stink Bait', color: '#7a6850', glow: 'rgba(122,104,80,0.3)' },
  { name: 'Striped Bass',    emoji: '🐟', depth: '8–30 ft', season: 'Year-round', bait: 'Bucktail Jig · Swimbait', color: '#5888a0', glow: 'rgba(88,136,160,0.3)' },
];

/* Animated SVG fish that swims in place */
function SwimmingFish({ color, size = 60 }: { color: string; size?: number }) {
  return (
    <motion.svg
      width={size} height={size * 0.55} viewBox="0 0 100 55"
      animate={{ x: [0, 8, 0, -8, 0], y: [0, -3, 0, 3, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Body */}
      <motion.ellipse
        cx="52" cy="27" rx="30" ry="18"
        fill={color}
        animate={{ ry: [18, 17, 18, 19, 18] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Belly */}
      <ellipse cx="52" cy="30" rx="20" ry="10" fill="rgba(255,255,255,0.18)"/>
      {/* Tail */}
      <motion.path
        d="M22,27 L5,12 L10,27 L5,42 Z"
        fill={color}
        style={{ opacity: 0.85 }}
        animate={{ d: ['M22,27 L5,12 L10,27 L5,42 Z', 'M22,27 L8,14 L12,27 L8,40 Z', 'M22,27 L5,12 L10,27 L5,42 Z'] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Dorsal fin */}
      <path d="M45,9 Q52,2 65,5 Q72,9 75,9" stroke={color} strokeWidth="2" fill="none" opacity="0.7"/>
      {/* Eye */}
      <circle cx="76" cy="23" r="4.5" fill="white"/>
      <circle cx="77" cy="22" r="2.8" fill="#111"/>
      <circle cx="78" cy="21" r="1" fill="white"/>
      {/* Lateral line */}
      <path d="M30,27 Q52,24 72,27" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" strokeDasharray="3,2"/>
      {/* Scales */}
      {[40,52,63].map(x => (
        <ellipse key={x} cx={x} cy="27" rx="8" ry="14" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8"/>
      ))}
    </motion.svg>
  );
}

function SpeciesCard({ s, i }: { s: typeof SPECIES[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: i * 0.09, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden cursor-default"
      style={{
        background: hovered ? `${s.color}12` : 'rgba(4,12,30,0.7)',
        border: `1px solid ${hovered ? s.color + '40' : 'rgba(80,140,180,0.12)'}`,
        transition: 'all 0.35s ease',
        boxShadow: hovered ? `0 0 28px ${s.glow}, 0 8px 32px rgba(0,0,0,0.4)` : '0 4px 16px rgba(0,0,0,0.2)',
      }}
    >
      {/* Animated water ripple bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '45%',
          background: `linear-gradient(to top, ${s.color}10, transparent)`,
          borderRadius: '50% 50% 0 0 / 20px 20px 0 0',
          animation: `waterRipple ${2.8 + i * 0.3}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }}/>
      </div>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px transition-all duration-300" style={{
        background: hovered
          ? `linear-gradient(90deg, transparent 5%, ${s.color} 50%, transparent 95%)`
          : 'transparent',
      }}/>

      <div className="p-6 relative z-10">
        {/* Fish animation */}
        <div className="flex justify-center mb-4" style={{
          filter: hovered ? `drop-shadow(0 0 12px ${s.color})` : 'none',
          transition: 'filter 0.3s ease',
        }}>
          <SwimmingFish color={s.color} size={72}/>
        </div>

        {/* Name */}
        <h3 className="font-black text-center mb-3"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: hovered ? '#ffffff' : 'rgba(200,220,235,0.9)' }}>
          {s.name}
        </h3>

        {/* Metrics */}
        <div className="space-y-1.5">
          {[
            { label: 'DEPTH', value: s.depth },
            { label: 'SEASON', value: s.season },
            { label: 'BAIT', value: s.bait },
          ].map(m => (
            <div key={m.label} className="flex justify-between items-center">
              <span className="text-[8.5px] font-mono tracking-[0.2em] uppercase"
                style={{ color: `${s.color}80` }}>{m.label}</span>
              <span className="text-[10px] font-mono" style={{ color: 'rgba(160,195,220,0.8)' }}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* CTA on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-3"
              style={{ borderTop: `1px solid ${s.color}25` }}>
              <Link href="/generator">
                <div className="text-center text-[9px] font-mono tracking-[0.22em] uppercase py-1.5"
                  style={{ color: s.color, cursor: 'pointer' }}>
                  SCAN THIS SPECIES →
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* Floating bubble particle */
function Bubble({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute rounded-full pointer-events-none"
      style={{
        ...style,
        animation: `bubbleRise ${3 + Math.random() * 4}s ease-in infinite`,
        animationDelay: `${Math.random() * 5}s`,
      }}/>
  );
}

export default function Home() {
  const [wordIdx, setWordIdx] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.18]);

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full">

      {/* ═══════════════════════════════════════════════════════════
          HERO — full-viewport fishing simulation, NO generic text
      ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative" style={{ height: '100vh', minHeight: 640 }}>

        {/* Fishing scene fills the ENTIRE viewport */}
        <motion.div className="absolute inset-0" style={{ opacity: sceneOpacity }}>
          <FishingScene showUI={true} />
        </motion.div>

        {/* Soft left gradient only — scene visible on right 55%+ */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(108deg, rgba(4,10,28,0.92) 0%, rgba(4,10,28,0.78) 20%, rgba(4,10,28,0.48) 40%, rgba(4,10,28,0.08) 58%, transparent 72%)',
        }}/>
        {/* Bottom vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to top, rgba(4,10,28,0.9) 0%, rgba(4,10,28,0.25) 16%, transparent 34%)',
        }}/>

        {/* Hero text — anchored left, everything else is fish */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center pointer-events-none z-20"
          style={{ y: textY, padding: '0 2rem 0 2.5rem', maxWidth: 580 } as React.CSSProperties}
        >
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} className="mb-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.28em] uppercase"
              style={{ border: '1px solid rgba(245,158,11,0.32)', background: 'rgba(245,158,11,0.08)', color: 'rgba(255,200,80,0.9)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>
              Live Fishing Simulator Tools
            </span>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}>
            <h1 className="font-black tracking-wide leading-none mb-1"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(4.5rem, 12vw, 8rem)' }}>
              <span className="text-white">BASS</span>
              <span style={{ color: '#ffd040' }}>LAB</span>
              <span style={{
                background: 'linear-gradient(135deg, #ffd040, #f59e0b, #e8621a)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}> HQ</span>
            </h1>

            {/* Rotating word */}
            <div className="font-black tracking-wider overflow-hidden mb-7"
              style={{ minHeight: '1.1em', fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              <AnimatePresence mode="wait">
                <motion.span key={wordIdx}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block" style={{ color: '#40d8e0' }}>
                  {ROTATING_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="font-sans mb-8 leading-relaxed"
            style={{ fontSize: '0.9rem', color: 'rgba(175,210,230,0.88)', maxWidth: 310 }}>
            Precision tools for fishing simulation players. Hotspot coordinates, optimal loadouts, catch probability.
          </motion.p>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-3 mb-10 pointer-events-auto">
            <Link href="/generator">
              <button className="px-9 py-4 font-black text-xs uppercase transition-all duration-200 hover:-translate-y-1 hover:brightness-110 active:translate-y-0"
                style={{
                  background: '#f59e0b', color: '#000',
                  fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.2em', border: 'none',
                  boxShadow: '0 0 28px rgba(245,158,11,0.45), 0 4px 16px rgba(0,0,0,0.4)',
                }}>
                LAUNCH GENERATOR
              </button>
            </Link>
            <a
              href="https://store.steampowered.com/app/872990/Stream_Games/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-9 py-3.5 font-bold text-xs uppercase transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(4,14,36,0.6)', color: 'rgba(140,210,255,0.88)',
                fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.18em',
                border: '1px solid rgba(80,180,220,0.28)', backdropFilter: 'blur(8px)',
                width: 'fit-content',
              }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0z"/>
              </svg>
              PLAY ON STEAM · PREMIUM FEATURES AVAILABLE
            </a>
            <div className="flex items-center gap-2.5 px-4 py-2" style={{ maxWidth: 'fit-content' }}>
              <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #9945ff, #14f195)' }}>
                <span className="text-[7px] font-black text-white">$B</span>
              </div>
              <span className="text-[9.5px] font-mono tracking-[0.16em]" style={{ color: 'rgba(180,150,255,0.8)' }}>
                $BASS TOKEN · LAUNCHING ON SOLANA
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.48 }}
            className="flex gap-7 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[['12+', 'Lakes'], ['7', 'Species'], ['97%', 'Accuracy'], ['Free', 'Forever']].map(([v, l], i) => (
              <motion.div key={l}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.54 + i * 0.07, duration: 0.35 }}>
                <div className="font-black leading-none mb-0.5"
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.75rem',
                    background: 'linear-gradient(135deg, #ffd040, #f59e0b)',
                    WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>{v}</div>
                <div className="text-[9.5px] font-mono uppercase tracking-widest"
                  style={{ color: 'rgba(140,190,220,0.52)' }}>{l}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} transition={{ delay: 1.8 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-mono tracking-[0.28em] uppercase" style={{ color: 'rgba(150,200,220,0.5)' }}>
            Scroll
          </span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, rgba(80,200,220,0.5), transparent)' }}/>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SPECIES SHOWCASE — animated fish cards, full interactive
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #040d1e 0%, #060f22 100%)', borderTop: '1px solid rgba(80,140,180,0.1)' }}>

        {/* Ambient underwater light */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 30% 80%, rgba(20,184,166,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.05) 0%, transparent 50%)',
        }}/>

        {/* Floating bubbles */}
        {[...Array(8)].map((_, i) => (
          <Bubble key={i} style={{
            left: `${10 + i * 11}%`,
            bottom: `${-10 + (i % 3) * 8}%`,
            width: `${4 + (i % 3) * 3}px`,
            height: `${4 + (i % 3) * 3}px`,
            background: 'rgba(80,200,220,0.12)',
            border: '1px solid rgba(80,200,220,0.2)',
          }}/>
        ))}

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          {/* Section header */}
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
            className="text-center mb-14">
            <p className="font-mono uppercase tracking-[0.32em] mb-4"
              style={{ fontSize: '0.6rem', color: 'rgba(64,216,224,0.65)' }}>
              LIVE TARGET DATABASE
            </p>
            <h2 className="font-black"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
              <span className="text-white">SELECT YOUR </span>
              <span style={{
                background: 'linear-gradient(135deg, #40d8e0, #14b8a6)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>TARGET SPECIES</span>
            </h2>
          </motion.div>

          {/* 6-card animated grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SPECIES.map((s, i) => <SpeciesCard key={i} s={s} i={i}/>)}
          </div>

          {/* Dive CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12">
            <Link href="/generator">
              <button className="px-10 py-4 font-black text-sm uppercase transition-all duration-200 hover:-translate-y-1 hover:brightness-110"
                style={{
                  background: '#f59e0b', color: '#000',
                  fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.2em',
                  boxShadow: '0 0 28px rgba(245,158,11,0.35), 0 4px 16px rgba(0,0,0,0.3)',
                }}>
                SCAN ALL SPECIES ▶
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          $BASS TOKEN + STEAM LAUNCH — full width, animated
      ═══════════════════════════════════════════════════════════ */}
      <section id="bass-token" className="py-0 relative overflow-hidden">
        {/* Split: left Solana purple, right Steam blue */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #0a0520 0%, #120838 35%, #0a1628 55%, #050e20 100%)',
        }}/>
        {/* Solana gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: 'absolute', top: '10%', left: '5%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(153,69,255,0.15) 0%, transparent 70%)',
          }}/>
          <div style={{
            position: 'absolute', bottom: '10%', right: '5%',
            width: 350, height: 350, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20,241,149,0.08) 0%, transparent 70%)',
          }}/>
          <div style={{
            position: 'absolute', top: '30%', right: '30%',
            width: 250, height: 250, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100,160,255,0.07) 0%, transparent 70%)',
          }}/>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — $BASS token */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}>
              {/* Token coin animation */}
              <div className="flex items-center gap-5 mb-8">
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="flex-shrink-0"
                  style={{ perspective: 200 }}
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center relative"
                    style={{
                      background: 'linear-gradient(135deg, #9945ff, #8752f3, #5497d5, #43b4ca, #28e0b9, #14f195)',
                      boxShadow: '0 0 40px rgba(153,69,255,0.5), 0 0 80px rgba(20,241,149,0.2)',
                    }}>
                    <span className="text-white font-black text-2xl" style={{ fontFamily: 'Bebas Neue' }}>$B</span>
                  </div>
                </motion.div>
                <div>
                  <div className="font-black mb-1"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.8rem', lineHeight: 0.9,
                      background: 'linear-gradient(135deg, #9945ff, #14f195)',
                      WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    $BASS
                  </div>
                  <div className="text-sm font-mono tracking-[0.2em] uppercase" style={{ color: 'rgba(180,150,255,0.7)' }}>
                    Token on Solana
                  </div>
                </div>
              </div>

              <h2 className="font-black mb-5"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1, color: '#e8e0ff' }}>
                COMING TO THE
                <br/>
                <span style={{
                  background: 'linear-gradient(135deg, #9945ff, #14f195)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>SOLANA NETWORK</span>
              </h2>

              <p className="text-sm leading-relaxed mb-7 font-mono" style={{ color: 'rgba(180,160,230,0.7)', maxWidth: 380 }}>
                $BASS token holders unlock premium features, exclusive loadouts, and early access to new tools — free forever for the community.
              </p>

              {/* Feature bullets */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: '🔓', text: 'Premium generator features — free for holders' },
                  { icon: '🎯', text: 'Early access to advanced coordinates & hidden lakes' },
                  { icon: '🏆', text: 'Tournament loadout packs, exclusive to $BASS holders' },
                  { icon: '⚡', text: 'Community governance — vote on new features' },
                ].map((b, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3">
                    <span className="text-sm flex-shrink-0">{b.icon}</span>
                    <span className="text-xs font-mono" style={{ color: 'rgba(200,185,255,0.75)' }}>{b.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-3 px-4 py-2.5 w-fit"
                style={{ border: '1px solid rgba(153,69,255,0.3)', background: 'rgba(153,69,255,0.06)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#9945ff', boxShadow: '0 0 8px rgba(153,69,255,0.8)' }}/>
                <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase" style={{ color: 'rgba(200,170,255,0.8)' }}>
                  Launch date TBA · Stay tuned
                </span>
              </div>
            </motion.div>

            {/* Right — Steam Premium */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}>

              <div className="relative p-8"
                style={{
                  border: '1px solid rgba(100,180,255,0.18)',
                  background: 'rgba(4,16,40,0.8)',
                  backdropFilter: 'blur(16px)',
                }}>
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(100,180,255,0.6), transparent)' }}/>

                {/* Steam header */}
                <div className="flex items-center gap-4 mb-6 pb-6"
                  style={{ borderBottom: '1px solid rgba(100,180,255,0.12)' }}>
                  <div className="w-14 h-14 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1b2838, #2a475e)', border: '1px solid rgba(100,180,255,0.25)' }}>
                    <svg viewBox="0 0 24 24" fill="#66c0f4" className="w-7 h-7">
                      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-black mb-0.5"
                      style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem', color: '#66c0f4' }}>
                      STEAM GAMES
                    </div>
                    <div className="text-[9.5px] font-mono tracking-[0.2em] uppercase"
                      style={{ color: 'rgba(100,180,255,0.55)' }}>
                      Premium features available now
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-6 font-mono" style={{ color: 'rgba(140,190,230,0.72)' }}>
                  BassLab HQ premium tools are integrated with Steam Games. Launch the game, activate BassLab, and fish with full data precision.
                </p>

                {/* Feature list */}
                <div className="space-y-2.5 mb-8">
                  {[
                    'Advanced coordinate overlays in-game',
                    'Real-time weather sync with game engine',
                    'Premium species AI behavior models',
                    'Tournament leaderboard integration',
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: '#66c0f4', boxShadow: '0 0 6px rgba(102,192,244,0.5)' }}/>
                      <span className="text-xs font-mono" style={{ color: 'rgba(150,200,235,0.72)' }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://store.steampowered.com/app/872990/Stream_Games/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 font-black text-sm uppercase transition-all duration-200 hover:-translate-y-1 hover:brightness-110"
                  style={{
                    background: 'linear-gradient(135deg, #1b2838, #2a475e)',
                    color: '#66c0f4',
                    fontFamily: 'JetBrains Mono, monospace',
                    letterSpacing: '0.18em',
                    border: '1px solid rgba(102,192,244,0.3)',
                    boxShadow: '0 0 20px rgba(102,192,244,0.12)',
                  }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0z"/>
                  </svg>
                  VIEW ON STEAM GAMES
                </a>

                {/* $BASS integration note */}
                <div className="mt-4 flex items-center gap-2 text-center justify-center">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #9945ff, #14f195)' }}>
                    <span className="text-[7px] font-black text-white">$B</span>
                  </div>
                  <span className="text-[9px] font-mono tracking-[0.15em]" style={{ color: 'rgba(180,150,255,0.65)' }}>
                    Hold $BASS → unlock premium for free
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LIVE ACTIVITY STRIP — animated, no generic text
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-0 relative overflow-hidden"
        style={{ background: '#040d1e', borderTop: '1px solid rgba(80,140,180,0.08)', borderBottom: '1px solid rgba(80,140,180,0.08)' }}>
        <div className="flex items-stretch">
          {/* Live label */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center px-6 py-6"
            style={{ background: 'rgba(20,184,166,0.08)', borderRight: '1px solid rgba(20,184,166,0.12)' }}>
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2.5 h-2.5 rounded-full mb-2"
              style={{ background: '#14b8a6', boxShadow: '0 0 12px rgba(20,184,166,0.7)' }}/>
            <span className="text-[8px] font-mono tracking-[0.28em] uppercase"
              style={{ color: 'rgba(20,184,166,0.7)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              LIVE
            </span>
          </div>

          {/* Scrolling live events */}
          <div className="flex-1 overflow-hidden py-5">
            <div className="flex items-center gap-8"
              style={{ animation: 'ticker-scroll 28s linear infinite', width: 'max-content' }}>
              {[
                '🎣 Player caught Largemouth Bass — Shadow Creek · 3 min ago',
                '⚡ 127 scans run today',
                '🏆 Tournament Mode activated — Iron Ridge Reservoir',
                '🎣 New species data loaded — Walleye behavioral model updated',
                '🪙 $BASS token · Launching on Solana — stay tuned',
                '🎮 Premium features available on Steam Games',
                '🎣 Player caught Rainbow Trout — Mirror Lake · 8 min ago',
                '⚡ 1,400+ loadouts generated this week',
                '🎣 Player caught Largemouth Bass — Shadow Creek · 3 min ago',
                '⚡ 127 scans run today',
                '🏆 Tournament Mode activated — Iron Ridge Reservoir',
                '🎣 New species data loaded — Walleye behavioral model updated',
                '🪙 $BASS token · Launching on Solana — stay tuned',
                '🎮 Premium features available on Steam Games',
                '🎣 Player caught Rainbow Trout — Mirror Lake · 8 min ago',
                '⚡ 1,400+ loadouts generated this week',
              ].map((ev, i) => (
                <span key={i} className="flex-shrink-0 text-[10.5px] font-mono whitespace-nowrap"
                  style={{ color: ev.includes('$BASS') ? 'rgba(180,150,255,0.8)' : ev.includes('Steam') ? 'rgba(102,192,244,0.8)' : 'rgba(140,185,215,0.6)' }}>
                  {ev}
                  <span className="mx-4" style={{ color: 'rgba(80,140,180,0.3)' }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA — minimal, visual
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: '#060f22' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(20,184,166,0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(245,158,11,0.05) 0%, transparent 50%)',
        }}/>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(80,160,200,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(80,160,200,0.022) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/3"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.45), transparent)' }}/>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto px-6 text-center">

          <h2 className="font-black mb-8"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9 }}>
            <span className="text-white">OWN THE</span>
            <br/>
            <span style={{
              background: 'linear-gradient(135deg, #ffd040, #f59e0b, #e8621a)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>LEADERBOARD</span>
          </h2>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/generator">
              <button className="px-12 py-5 font-black text-sm uppercase transition-all duration-200 hover:-translate-y-1 hover:brightness-110"
                style={{
                  background: '#f59e0b', color: '#000',
                  fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.2em',
                  boxShadow: '0 0 32px rgba(245,158,11,0.4), 0 6px 20px rgba(0,0,0,0.4)',
                }}>
                LAUNCH GENERATOR
              </button>
            </Link>
            <a href="https://store.steampowered.com/app/872990/Stream_Games/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-12 py-5 font-bold text-sm uppercase transition-all duration-200 hover:-translate-y-1"
              style={{
                background: 'rgba(4,20,50,0.6)', color: 'rgba(102,192,244,0.9)',
                fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.18em',
                border: '1px solid rgba(102,192,244,0.25)', backdropFilter: 'blur(8px)',
              }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0z"/>
              </svg>
              STEAM GAMES
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
