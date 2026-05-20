import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { n: '01', title: 'Select Your Lake', desc: 'Choose from 12+ simulated lakes, each with distinct depth profiles, vegetation patterns, and fish populations that mirror real fishing simulation game mechanics.' },
  { n: '02', title: 'Define Your Target', desc: 'Pick your target species. Each species has unique behavioral profiles — feeding windows, depth preferences, bait triggers, and seasonal migration patterns.' },
  { n: '03', title: 'Set Conditions', desc: 'Input current weather, time of day, and season. These variables interact non-linearly — a rainy dawn in spring behaves very differently from a sunny summer midday.' },
  { n: '04', title: 'Initiate the Scan', desc: 'Hit the button. Our engine runs thousands of heuristic simulations, cross-references the species behavioral database, and computes your optimal parameters.' },
  { n: '05', title: 'Read Your Loadout', desc: 'You receive GPS coordinates, primary and secondary bait recommendations, depth zone, line weight, cast distance, and 4 tactical tips tailored to your exact conditions.' },
  { n: '06', title: 'Execute & Win', desc: 'Use the data in your game session. Track your results and refine your inputs over time. The more sessions you run, the sharper your instincts become.' },
];

const species = [
  { name: 'Largemouth Bass', season: 'Spring–Fall', depth: '3–12 ft', bait: 'Spinnerbaits, Frogs, Texas Rigs', tip: 'Ambush predators. Target structure edges, fallen timber, and weed lines.' },
  { name: 'Striped Bass', season: 'Year-round', depth: '8–30 ft', bait: 'Bucktail Jigs, Swimbaits', tip: 'Follow baitfish schools. They chase shad aggressively at dawn and dusk.' },
  { name: 'Rainbow Trout', season: 'Spring & Fall', depth: '2–10 ft', bait: 'Spinners, Spoons, Flies', tip: 'Cold-water species. Best action below 65°F. Match local insect hatches.' },
  { name: 'Catfish', season: 'Summer peak', depth: '5–20 ft', bait: 'Cut Bait, Stink Bait', tip: 'Bottom feeders. Target deep holes, river bends, and below dams.' },
  { name: 'Northern Pike', season: 'Spring & Fall', depth: '3–15 ft', bait: 'Large Spoons, Jerkbaits', tip: 'Explosive strikers. Cast large profiles near weed edges in cooler temps.' },
  { name: 'Walleye', season: 'Spring & Fall', depth: '8–25 ft', bait: 'Jig+Paddle Tail, Harness Rigs', tip: 'Light-sensitive. Most active at low light — dawn, dusk, and overcast days.' },
];

const tackleFAQ = [
  { q: 'What is a Texas Rig?', a: 'A weedless soft plastic setup using a bullet sinker and offset hook, threaded through the bait. Ideal for thick cover and bass.' },
  { q: 'Fluorocarbon vs Monofilament?', a: 'Fluorocarbon is nearly invisible underwater (~40% less visible) and sinks faster. Mono floats better and has more stretch for topwater applications.' },
  { q: 'What does "line weight" mean?', a: 'Line weight (e.g., 12 lb test) indicates the tensile strength before the line breaks. Heavier cover and larger fish require higher pound-test lines.' },
  { q: 'When should I use topwater lures?', a: 'Topwater is most effective during low-light hours (dawn, dusk) and when fish are actively feeding near the surface in warm water conditions.' },
  { q: 'What is a drop shot rig?', a: 'A finesse technique where the hook is tied mid-line with a weight below it, keeping the bait suspended at a precise depth. Deadly for pressured fish.' },
];

export default function HowTo() {
  const [activeSpecies, setActiveSpecies] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="w-full">

      {/* Hero */}
      <section className="relative py-24 md:py-32 border-b overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 58%)',
        }}/>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/5 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.35), transparent)' }}
        />
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="tag-pill mb-6 inline-flex">DOCUMENTATION</span>
            <h1
              className="font-black text-white leading-none mb-5"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem,8vw,5.5rem)' }}
            >
              HOW IT <span className="text-gradient-amber">WORKS</span>
            </h1>
            <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Everything you need to understand BassLab HQ — from the generator mechanics to species behavior and tackle selection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step-by-step */}
      <section className="py-20" id="steps" style={{ background: '#07111f' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono tracking-[0.28em] text-teal-400/65 uppercase mb-12 text-center"
          >
            STEP BY STEP
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="p-6 card-top-line relative"
                style={{
                  border: '1px solid rgba(255,255,255,0.065)',
                  background: 'rgba(255,255,255,0.022)',
                }}
              >
                <div
                  className="absolute top-2 right-4 font-black text-white/[0.04] leading-none select-none"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '4.5rem' }}
                >
                  {s.n}
                </div>
                <div className="relative z-10">
                  <div
                    className="w-8 h-8 border border-amber-500/30 flex items-center justify-center mb-5"
                    style={{ background: 'rgba(245,158,11,0.04)' }}
                  >
                    <span className="font-mono text-[10px] font-bold text-amber-400">{s.n}</span>
                  </div>
                  <h3
                    className="text-white mb-3"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.35rem' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Species guide */}
      <section className="py-20 border-t" id="species" style={{ background: '#060e1a', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono tracking-[0.28em] text-amber-400/65 uppercase mb-12 text-center"
          >
            SPECIES GUIDE
          </motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Species list */}
            <div className="space-y-1.5">
              {species.map((s, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveSpecies(i)}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full text-left px-4 py-3 transition-all duration-200 font-mono text-xs flex items-center gap-3"
                  style={{
                    border: `1px solid ${activeSpecies === i ? 'rgba(245,158,11,0.45)' : 'rgba(255,255,255,0.055)'}`,
                    background: activeSpecies === i ? 'rgba(245,158,11,0.07)' : 'rgba(255,255,255,0.018)',
                    color: activeSpecies === i ? '#f59e0b' : 'rgba(100,116,139,0.8)',
                  }}
                >
                  {activeSpecies === i && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"/>
                  )}
                  {s.name}
                </motion.button>
              ))}
            </div>

            {/* Species detail */}
            <div
              className="lg:col-span-2 relative overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(245,158,11,0.5) 50%, transparent 95%)' }}
              />
              <div className="p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSpecies}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <h2
                      className="text-white mb-5"
                      style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem' }}
                    >
                      {species[activeSpecies].name}
                    </h2>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        ['PEAK SEASON', species[activeSpecies].season],
                        ['DEPTH RANGE', species[activeSpecies].depth],
                        ['TOP BAIT', species[activeSpecies].bait],
                      ].map(([k, v]) => (
                        <div
                          key={k}
                          className="p-3"
                          style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}
                        >
                          <p className="text-[8.5px] font-mono text-slate-600 mb-1 tracking-widest">{k}</p>
                          <p className="text-xs font-mono text-slate-300 leading-snug">{v}</p>
                        </div>
                      ))}
                    </div>
                    <div
                      className="pl-4 py-1 mb-6"
                      style={{ borderLeft: '2px solid rgba(245,158,11,0.4)' }}
                    >
                      <p className="text-sm text-slate-300 leading-relaxed">{species[activeSpecies].tip}</p>
                    </div>
                    <Link href="/generator">
                      <button
                        className="btn-amber-glow px-6 py-2.5 font-bold font-mono text-xs tracking-widest uppercase"
                        style={{ background: '#f59e0b', color: '#000' }}
                      >
                        GENERATE LOADOUT →
                      </button>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tackle glossary */}
      <section className="py-20 border-t" id="tackle" style={{ background: '#07111f', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono tracking-[0.28em] text-teal-400/65 uppercase mb-12 text-center"
          >
            TACKLE GLOSSARY
          </motion.p>
          <div className="space-y-1.5">
            {tackleFAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.065)' }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left transition-colors duration-150"
                  style={{ background: openFAQ === i ? 'rgba(255,255,255,0.025)' : 'transparent' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.02)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = openFAQ === i ? 'rgba(255,255,255,0.025)' : 'transparent'; }}
                >
                  <span className="font-mono text-xs text-slate-300">{item.q}</span>
                  <motion.span
                    animate={{ rotate: openFAQ === i ? 45 : 0 }}
                    transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                    className="font-mono text-lg flex-shrink-0 ml-3"
                    style={{ color: '#f59e0b' }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFAQ === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        className="px-5 pb-4 pt-3 text-xs text-slate-400 leading-relaxed"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t" id="tips" style={{ background: '#060e1a', borderColor: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <h2
            className="font-black mb-5"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.2rem,5vw,3.2rem)' }}
          >
            <span className="text-white">READY TO </span>
            <span className="text-gradient-amber">TRY IT?</span>
          </h2>
          <p className="text-slate-400 mb-8 text-sm">Now that you know how it works, run your first scan and see the difference data makes.</p>
          <Link href="/generator">
            <button
              className="btn-amber-glow px-10 py-4 font-bold font-mono tracking-widest text-sm uppercase"
              style={{ background: '#f59e0b', color: '#000' }}
            >
              LAUNCH GENERATOR →
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
