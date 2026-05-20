import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { n:'01', title:'Select Your Lake', desc:'Choose from 12+ simulated lakes, each with distinct depth profiles, vegetation patterns, and fish populations that mirror real fishing simulation game mechanics.', icon:'🗺️' },
  { n:'02', title:'Define Your Target', desc:'Pick your target species. Each species has unique behavioral profiles — feeding windows, depth preferences, bait triggers, and seasonal migration patterns.', icon:'🐟' },
  { n:'03', title:'Set Conditions', desc:'Input current weather, time of day, and season. These variables interact non-linearly — a rainy dawn in spring behaves very differently from a sunny summer midday.', icon:'🌤️' },
  { n:'04', title:'Initiate the Scan', desc:'Hit the button. Our engine runs thousands of heuristic simulations, cross-references the species behavioral database, and computes your optimal parameters.', icon:'⚡' },
  { n:'05', title:'Read Your Loadout', desc:'You receive GPS coordinates, primary and secondary bait recommendations, depth zone, line weight, cast distance, and 4 tactical tips tailored to your exact conditions.', icon:'📋' },
  { n:'06', title:'Execute & Win', desc:'Use the data in your game session. Track your results and refine your inputs over time. The more sessions you run, the sharper your instincts become.', icon:'🏆' },
];

const species = [
  { name:'Largemouth Bass', season:'Spring–Fall', depth:'3–12 ft', bait:'Spinnerbaits, Frogs, Texas Rigs', tip:'Ambush predators. Target structure edges, fallen timber, and weed lines.' },
  { name:'Striped Bass', season:'Year-round', depth:'8–30 ft', bait:'Bucktail Jigs, Swimbaits', tip:'Follow baitfish schools. They chase shad aggressively at dawn and dusk.' },
  { name:'Rainbow Trout', season:'Spring & Fall', depth:'2–10 ft', bait:'Spinners, Spoons, Flies', tip:'Cold-water species. Best action below 65°F. Match local insect hatches.' },
  { name:'Catfish', season:'Summer peak', depth:'5–20 ft', bait:'Cut Bait, Stink Bait', tip:'Bottom feeders. Target deep holes, river bends, and below dams.' },
  { name:'Northern Pike', season:'Spring & Fall', depth:'3–15 ft', bait:'Large Spoons, Jerkbaits', tip:'Explosive strikers. Cast large profiles near weed edges in cooler temps.' },
  { name:'Walleye', season:'Spring & Fall', depth:'8–25 ft', bait:'Jig+Paddle Tail, Harness Rigs', tip:'Light-sensitive. Most active at low light — dawn, dusk, and overcast days.' },
];

const tackleFAQ = [
  { q:'What is a Texas Rig?', a:'A weedless soft plastic setup using a bullet sinker and offset hook, threaded through the bait. Ideal for thick cover and bass.' },
  { q:'Fluorocarbon vs Monofilament?', a:'Fluorocarbon is nearly invisible underwater (~40% less visible) and sinks faster. Mono floats better and has more stretch for topwater applications.' },
  { q:'What does "line weight" mean?', a:'Line weight (e.g., 12 lb test) indicates the tensile strength before the line breaks. Heavier cover and larger fish require higher pound-test lines.' },
  { q:'When should I use topwater lures?', a:'Topwater is most effective during low-light hours (dawn, dusk) and when fish are actively feeding near the surface in warm water conditions.' },
  { q:'What is a drop shot rig?', a:'A finesse technique where the hook is tied mid-line with a weight below it, keeping the bait suspended at a precise depth. Deadly for pressured fish.' },
];

export default function HowTo() {
  const [activeSpecies, setActiveSpecies] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number|null>(null);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-24 md:py-32 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 60%)'
        }}/>
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity:0, y:14 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease:[0.25,0.1,0.25,1] }}>
            <span className="text-[10px] font-mono tracking-[0.28em] text-amber-400/70 uppercase inline-block mb-5">DOCUMENTATION</span>
            <h1 className="font-display text-6xl md:text-7xl font-black text-white leading-none mb-5">
              HOW IT <span className="text-amber-400">WORKS</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Everything you need to understand BassLab HQ — from the generator mechanics to species behavior and tackle selection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step-by-step */}
      <section className="py-20 bg-[#07111f]" id="steps">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true, amount:0.5 }}
            transition={{ duration:0.5 }}
            className="text-[10px] font-mono tracking-[0.28em] text-teal-400/70 uppercase mb-12 text-center">
            STEP BY STEP
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s,i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ delay:i*0.08, duration:0.5, ease:[0.25,0.1,0.25,1] }}
                className="border border-white/7 bg-white/[0.025] p-6 group hover:border-amber-500/25 transition-all duration-300 relative hover:-translate-y-1">
                <div className="absolute top-0 right-0 font-display text-7xl font-black text-white/3 leading-none pr-3 pt-2">{s.n}</div>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-display text-xl font-black text-white mb-3">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Species guide */}
      <section className="py-20 bg-[#060e1a] border-t border-white/5" id="species">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true, amount:0.5 }}
            transition={{ duration:0.5 }}
            className="text-[10px] font-mono tracking-[0.28em] text-amber-400/70 uppercase mb-12 text-center">
            SPECIES GUIDE
          </motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="space-y-2">
              {species.map((s,i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveSpecies(i)}
                  initial={{ opacity:0, x:-12 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true, amount:0.2 }}
                  transition={{ delay:i*0.06, duration:0.4, ease:[0.25,0.1,0.25,1] }}
                  className={`w-full text-left px-4 py-3 border transition-all duration-200 font-mono text-sm ${
                    activeSpecies===i
                      ? 'border-amber-500/50 bg-amber-500/8 text-amber-400'
                      : 'border-white/6 text-slate-500 hover:border-white/15 hover:text-slate-300 bg-white/[0.02]'
                  }`}>
                  {s.name}
                </motion.button>
              ))}
            </div>
            <div className="lg:col-span-2 border border-white/7 bg-white/[0.025] p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"/>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpecies}
                  initial={{ opacity:0, x:16 }}
                  animate={{ opacity:1, x:0 }}
                  exit={{ opacity:0, x:-16 }}
                  transition={{ duration:0.25, ease:[0.25,0.1,0.25,1] }}>
                  <h2 className="font-display text-3xl font-black text-white mb-5">{species[activeSpecies].name}</h2>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[['PEAK SEASON',species[activeSpecies].season],['DEPTH RANGE',species[activeSpecies].depth],['TOP BAIT',species[activeSpecies].bait]].map(([k,v])=>(
                      <div key={k} className="border border-white/6 p-3 bg-black/20">
                        <p className="text-[9px] font-mono text-slate-600 mb-1 tracking-widest">{k}</p>
                        <p className="text-xs font-mono text-slate-300 leading-snug">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-l-2 border-amber-500/40 pl-4">
                    <p className="text-sm text-slate-300 leading-relaxed">{species[activeSpecies].tip}</p>
                  </div>
                  <div className="mt-6">
                    <Link href="/generator">
                      <button className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs tracking-widest transition-colors hover:-translate-y-0.5 active:translate-y-0">
                        GENERATE LOADOUT →
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Tackle glossary FAQ */}
      <section className="py-20 bg-[#07111f] border-t border-white/5" id="tackle">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true, amount:0.5 }}
            transition={{ duration:0.5 }}
            className="text-[10px] font-mono tracking-[0.28em] text-teal-400/70 uppercase mb-12 text-center">
            TACKLE GLOSSARY
          </motion.p>
          <div className="space-y-2">
            {tackleFAQ.map((item,i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, y:12 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ delay:i*0.06, duration:0.4, ease:[0.25,0.1,0.25,1] }}
                className="border border-white/7 overflow-hidden">
                <button onClick={() => setOpenFAQ(openFAQ===i?null:i)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/3 transition-colors">
                  <span className="font-mono text-sm text-slate-300">{item.q}</span>
                  <motion.span
                    animate={{ rotate: openFAQ===i ? 45 : 0 }}
                    transition={{ duration:0.2, ease:[0.25,0.1,0.25,1] }}
                    className="text-amber-400 font-mono text-lg flex-shrink-0 ml-3">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFAQ === i && (
                    <motion.div
                      key="content"
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:'auto', opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.25, ease:[0.25,0.1,0.25,1] }}
                      style={{ overflow:'hidden' }}>
                      <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5 bg-[#060e1a]" id="tips">
        <motion.div
          initial={{ opacity:0, y:16 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.3 }}
          transition={{ duration:0.5, ease:[0.25,0.1,0.25,1] }}
          className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-5">
            READY TO <span className="text-amber-400">TRY IT?</span>
          </h2>
          <p className="text-slate-400 mb-8">Now that you know how it works, run your first scan and see the difference data makes.</p>
          <Link href="/generator">
            <button className="px-10 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono tracking-widest text-sm transition-all duration-200 shadow-xl shadow-amber-500/15 hover:-translate-y-0.5 active:translate-y-0">
              LAUNCH GENERATOR →
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
