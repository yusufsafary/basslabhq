import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const timeline = [
  { year:'2023', title:'Origin', desc:'Frustrated by scattered forum posts and outdated spreadsheets, two developers decided to build the tool they always wished existed.' },
  { year:'2024', title:'Alpha Launch', desc:'First generator shipped to the community Discord. 500 players in the first 48 hours. The feedback loop began.' },
  { year:'2025', title:'V2 — BassLab HQ', desc:'Full rebrand. New algorithm, 12+ locations, expanded species database, tournament-grade outputs. The platform keeps growing.' },
];

const values = [
  { n:'01', title:'Honest Data', desc:"No inflated numbers, no motivational padding. Every catch rate is the real computed output from our heuristic engine." },
  { n:'02', title:'Free Forever', desc:"BassLab HQ is free. No paywalls, no premium tiers for core tools. We believe information should be accessible to every player." },
  { n:'03', title:'Community Driven', desc:"Every feature was requested by real players. Your feedback directly shapes the roadmap. This platform is yours as much as ours." },
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
        <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 60%)' }}/>
        <div className="relative max-w-5xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease:[0.25,0.1,0.25,1] }}>
            <span className="inline-block text-[10px] font-mono tracking-[0.3em] text-amber-400/70 uppercase mb-5">WHO WE ARE</span>
            <h1 className="font-display text-6xl md:text-8xl font-black text-white leading-none mb-6">
              THE STORY<br /><span className="text-amber-400">OF BASSLAB</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Born from frustration. Built by developers who take virtual fishing far too seriously.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#07111f] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity:0, x:-20 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, amount:0.3 }}
              transition={{ duration:0.55, ease:[0.25,0.1,0.25,1] }}>
              <p className="text-[10px] font-mono tracking-[0.25em] text-teal-400/70 uppercase mb-4">OUR MISSION</p>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Remove the guesswork,<br />keep the <span className="text-amber-400">victory.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">Modern fishing simulators are complex — dynamic weather, intricate fish AI, thousands of tackle combinations. Truly mastering them requires more than instinct.</p>
              <p className="text-slate-400 leading-relaxed">BassLab HQ is the central hub: input your game state, get data-backed recommendations. Not a guarantee — a genuine probabilistic edge.</p>
            </motion.div>
            <div className="space-y-4">
              {metrics.map(([label, pct], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity:0, x:20 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true, amount:0.3 }}
                  transition={{ delay:i*0.1, duration:0.5, ease:[0.25,0.1,0.25,1] }}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-mono text-slate-400">{label}</span>
                    <span className="font-mono text-amber-400 font-bold">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 w-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-teal-400"
                      initial={{ width:0 }}
                      whileInView={{ width:`${pct}%` }}
                      viewport={{ once:true, amount:0.5 }}
                      transition={{ duration:1.1, delay:i*0.1 + 0.2, ease:[0.25,0.1,0.25,1] }}
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
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true, amount:0.5 }}
            transition={{ duration:0.5 }}
            className="text-[10px] font-mono tracking-[0.25em] text-amber-400/70 uppercase mb-10 text-center">
            OUR VALUES
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v,i)=>(
              <motion.div key={i}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ delay:i*0.1, duration:0.5, ease:[0.25,0.1,0.25,1] }}
                className="p-7 border border-white/7 bg-white/[0.02] hover:border-amber-500/25 transition-all duration-300 group hover:-translate-y-1">
                <div className="font-display text-5xl font-black text-white/5 group-hover:text-amber-500/12 transition-colors mb-4">{v.n}</div>
                <h3 className="font-display text-2xl text-white mb-3">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#07111f] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true, amount:0.5 }}
            transition={{ duration:0.5 }}
            className="text-[10px] font-mono tracking-[0.25em] text-teal-400/70 uppercase mb-10 text-center">
            TIMELINE
          </motion.p>
          <div className="relative">
            <div className="absolute left-14 top-0 bottom-0 w-px bg-white/7"/>
            {timeline.map((item,i)=>(
              <motion.div key={i}
                initial={{ opacity:0, x:-20 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true, amount:0.3 }}
                transition={{ delay:i*0.15, duration:0.5, ease:[0.25,0.1,0.25,1] }}
                className="flex gap-8 mb-12 last:mb-0">
                <div className="w-14 flex-shrink-0 text-right">
                  <span className="font-display text-lg text-amber-400">{item.year}</span>
                </div>
                <div className="relative pb-2">
                  <div className="absolute -left-[25px] top-1.5 w-3 h-3 border-2 border-amber-500 bg-[#07111f]"/>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <motion.div
          initial={{ opacity:0, y:16 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.3 }}
          transition={{ duration:0.5, ease:[0.25,0.1,0.25,1] }}
          className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
            WANT TO <span className="text-teal-400">CONTRIBUTE?</span>
          </h2>
          <p className="text-slate-400 mb-8">Have tournament data, rare species findings, or algorithm improvement ideas? We want to hear from you.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact">
              <button className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono tracking-widest text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                CONTACT US
              </button>
            </Link>
            <Link href="/generator">
              <button className="px-8 py-3.5 border border-white/15 hover:border-teal-400/40 text-slate-300 hover:text-teal-400 font-bold font-mono tracking-widest text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                TRY GENERATOR
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
