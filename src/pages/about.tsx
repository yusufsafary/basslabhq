import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const timeline = [
  { year: '2023', title: 'Origin', desc: 'Frustrated by scattered forum posts and outdated spreadsheets, two developers decided to build the tool they always wished existed.' },
  { year: '2024', title: 'Alpha Launch', desc: 'First generator shipped to the community Discord. 500 players in the first 48 hours. The feedback loop began.' },
  { year: '2025', title: 'V2 — BassLab HQ', desc: 'Full rebrand. New algorithm, 12+ locations, expanded species database, tournament-grade outputs. The platform keeps growing.' },
];

const values = [
  { n: '01', title: 'Honest Data', desc: "No inflated numbers, no motivational padding. Every catch rate is the real computed output from our heuristic engine." },
  { n: '02', title: 'Free Forever', desc: "BassLab HQ is free. No paywalls, no premium tiers for core tools. We believe information should be accessible to every player." },
  { n: '03', title: 'Community Driven', desc: "Every feature was requested by real players. Your feedback directly shapes the roadmap. This platform is yours as much as ours." },
];

const metrics: [string, number][] = [
  ['Coordinate Accuracy', 94],
  ['Catch Rate Improvement', 78],
  ['User Satisfaction', 97],
  ['Tournament Win Rate', 62],
];

export default function About() {
  return (
    <div className="w-full">

      {/* Hero */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 58%)',
        }}/>
        {/* Horizontal accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/5 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.35), transparent)' }}
        />
        <div className="relative max-w-5xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="tag-pill mb-6 inline-flex">WHO WE ARE</span>
            <h1
              className="font-black text-white leading-none mb-5"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3.2rem,9vw,6rem)' }}
            >
              THE STORY
              <br />
              <span className="text-gradient-amber">OF BASSLAB</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Born from frustration. Built by developers who take virtual fishing far too seriously.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 border-y" style={{ background: '#07111f', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="text-[10px] font-mono tracking-[0.26em] text-teal-400/65 uppercase mb-4">OUR MISSION</p>
              <h2
                className="font-black leading-tight mb-6"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2rem,4.5vw,3rem)' }}
              >
                <span className="text-white">Remove the guesswork,</span>
                <br />
                <span className="text-white">keep the </span>
                <span className="text-gradient-amber">victory.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                Modern fishing simulators are complex — dynamic weather, intricate fish AI, thousands of tackle combinations. Truly mastering them requires more than instinct.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                BassLab HQ is the central hub: input your game state, get data-backed recommendations. Not a guarantee — a genuine probabilistic edge.
              </p>
            </motion.div>

            {/* Metrics */}
            <div className="space-y-5">
              {metrics.map(([label, pct], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-mono text-slate-400 text-xs">{label}</span>
                    <span className="font-mono font-bold text-xs text-gradient-amber">{pct}%</span>
                  </div>
                  <div className="h-1 w-full relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div
                      className="h-full absolute left-0 top-0"
                      style={{ background: 'linear-gradient(90deg, #f59e0b, #14b8a6)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 1.1, delay: i * 0.1 + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono tracking-[0.28em] text-amber-400/65 uppercase mb-12 text-center"
          >
            OUR VALUES
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="p-7 card-top-line group"
                style={{ border: '1px solid rgba(255,255,255,0.065)', background: 'rgba(255,255,255,0.016)' }}
              >
                <div
                  className="font-black text-white/[0.04] group-hover:text-amber-500/[0.1] transition-colors duration-300 mb-4 leading-none"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3.5rem' }}
                >
                  {v.n}
                </div>
                <h3
                  className="text-white mb-3"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem' }}
                >
                  {v.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 border-t" style={{ background: '#07111f', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono tracking-[0.28em] text-teal-400/65 uppercase mb-12 text-center"
          >
            TIMELINE
          </motion.p>
          <div className="relative">
            <div className="absolute left-14 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.07)' }}/>
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex gap-8 mb-12 last:mb-0"
              >
                <div className="w-14 flex-shrink-0 text-right pt-0.5">
                  <span
                    className="font-black text-gradient-amber"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem' }}
                  >
                    {item.year}
                  </span>
                </div>
                <div className="relative pb-2">
                  <div
                    className="absolute -left-[25px] top-2 w-3 h-3 border-2 border-amber-500/70"
                    style={{ background: '#07111f' }}
                  />
                  <h3 className="font-bold text-white mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(20,184,166,0.05) 0%, transparent 60%)',
        }}/>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative max-w-3xl mx-auto px-6 md:px-10 text-center"
        >
          <h2
            className="font-black mb-6"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.2rem,5vw,3.2rem)' }}
          >
            <span className="text-white">WANT TO </span>
            <span className="text-gradient-teal">CONTRIBUTE?</span>
          </h2>
          <p className="text-slate-400 mb-8 text-sm">Have tournament data, rare species findings, or algorithm improvement ideas? We want to hear from you.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact">
              <button
                className="btn-amber-glow px-8 py-3.5 font-bold font-mono tracking-widest text-xs uppercase"
                style={{ background: '#f59e0b', color: '#000' }}
              >
                CONTACT US
              </button>
            </Link>
            <Link href="/generator">
              <button
                className="px-8 py-3.5 font-bold font-mono tracking-widest text-xs uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(148,163,184,0.8)',
                  background: 'transparent',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(20,184,166,0.38)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#2dd4bf';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(148,163,184,0.8)';
                }}
              >
                TRY GENERATOR
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
