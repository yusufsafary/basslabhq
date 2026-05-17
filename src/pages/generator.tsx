import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const LAKES = ['Mirror Lake','Thunder Bay','Crystal Cove','Deep Haven','Shadow Creek','Iron Ridge Reservoir','Pale Moon Pond'];
const SPECIES = ['Largemouth Bass','Striped Bass','Rainbow Trout','Catfish','Northern Pike','Walleye','Bluegill'];
const DIFFICULTIES = ['Novice','Intermediate','Expert','Tournament'];
const WEATHER = ['Sunny','Partly Cloudy','Overcast','Light Rain','Heavy Rain','Storm Front'];
const TIME_OF_DAY = ['Pre-Dawn','Dawn','Morning','Midday','Afternoon','Dusk','Night'];
const SEASONS = ['Early Spring','Late Spring','Summer','Early Fall','Late Fall','Winter'];
const ROD_TYPES = ['Spinning','Baitcaster','Fly Rod','Ice Rod','Surf Rod'];

const BAIT_DB: Record<string,string[]> = {
  'Largemouth Bass':['Texas Rig Worm','Spinnerbait','Chatterbait','Frog — Topwater','Swimbait','Drop Shot'],
  'Striped Bass':['Bucktail Jig','Swimbaits','Topwater Plug','Cut Bait','Umbrella Rig'],
  'Rainbow Trout':['Inline Spinner','Small Spoon','Fly — Elk Hair Caddis','Powerbait','Trout Worm'],
  'Catfish':['Chicken Liver','Stink Bait','Nightcrawler','Cut Shad','Dip Bait'],
  'Northern Pike':['Large Spoon','Jerkbait','Buzzbait','Sucker Bait','Musky Glide'],
  'Walleye':['Jig + Paddle Tail','Harness Rig','Crankbait','Nightcrawler Spinner','Blade Bait'],
  'Bluegill':['Waxworm','Cricket','Small Jig','Red Worm','Dough Bait'],
};

const TIPS_DB = [
  "Cast parallel to the bank — fish hold tight to structure edges.",
  "Slow your retrieve by 40% when barometric pressure is dropping.",
  "Focus on shaded areas and submerged timber within the first two hours of light.",
  "Vary your retrieve speed every 5–6 cranks to trigger reaction strikes.",
  "If surface temperature exceeds 82°F, fish will drop to thermoclines below 12ft.",
  "After a cold front passes, finesse tactics outperform power fishing by ~3×.",
  "Prime feeding window: 20–45 minutes before sunrise and after sunset.",
  "Use fluorocarbon leader — it's 40% less visible than monofilament in clear water.",
  "Look for where a hard bottom meets a soft bottom — transition zones concentrate bait.",
  "Downsize your lure profile in high fishing pressure areas.",
  "Wind direction matters: fish feed upwind where baitfish are pushed against cover.",
  "Match the hatch — observe what's hatching on the surface and mirror it.",
];

function pick<T>(arr: T[], n = 3): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function scoreCalc(data: Record<string,string>): number {
  let s = 50;
  if (data.difficulty === 'Novice') s += 22;
  if (data.difficulty === 'Intermediate') s += 10;
  if (data.difficulty === 'Expert') s -= 5;
  if (data.difficulty === 'Tournament') s -= 18;
  if (['Light Rain','Overcast','Partly Cloudy'].includes(data.weather)) s += 14;
  if (data.weather === 'Storm Front') s -= 20;
  if (['Pre-Dawn','Dawn','Dusk'].includes(data.timeOfDay)) s += 16;
  if (data.timeOfDay === 'Midday' && data.season === 'Summer') s -= 10;
  if (['Early Spring','Late Spring'].includes(data.season)) s += 8;
  return Math.min(99, Math.max(12, s + Math.floor(Math.random()*14 - 7)));
}

const schema = z.object({
  lake: z.string().min(1),
  species: z.string().min(1),
  difficulty: z.string().min(1),
  weather: z.string().min(1),
  timeOfDay: z.string().min(1),
  season: z.string().min(1),
  rodType: z.string().min(1),
});
type FV = z.infer<typeof schema>;

interface Result {
  lake: string; species: string; bait: string; coords: string;
  depth: string; catchRate: number; lineWeight: string;
  castDistance: string; tips: string[]; secondaryBait: string;
  moonPhase: string; waterTemp: string;
}

function Sonar({ progress }: { progress: number }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ background: '#020c0a' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        {[60,80,100,120,140].map((r,i) => (
          <div key={r} className="absolute rounded-full border" style={{
            width: r+'%', height: r+'%',
            borderColor: `rgba(34,197,94,${0.08+i*0.015})`,
            maxWidth: 280, maxHeight: 280,
          }}/>
        ))}
        {/* Sweep line */}
        <div className="absolute" style={{
          width: 1, height: '40%',
          background: 'linear-gradient(to bottom, rgba(34,197,94,0.9), transparent)',
          transformOrigin: 'bottom center',
          transform: `rotate(${progress * 3.6}deg)`,
          bottom: '50%', left: '50%',
          transition: 'transform 0.1s linear',
        }}/>
        {/* Center dot */}
        <div className="w-3 h-3 rounded-full bg-green-400 z-10 shadow-lg shadow-green-400/60"/>
        {/* Echoes */}
        {progress > 30 && <div className="absolute w-1.5 h-1.5 rounded-full bg-green-400/70" style={{ top:'35%', left:'62%' }}/>}
        {progress > 55 && <div className="absolute w-2 h-2 rounded-full bg-green-300/80" style={{ top:'58%', left:'38%' }}/>}
        {progress > 70 && <div className="absolute w-1 h-1 rounded-full bg-green-400/60" style={{ top:'28%', left:'45%' }}/>}
        {progress > 80 && <div className="absolute w-2.5 h-2.5 rounded-full bg-green-400/90" style={{ top:'65%', left:'58%' }}/>}
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="text-[10px] font-mono text-green-400/60 tracking-widest">SCANNING — {progress}%</span>
      </div>
    </div>
  );
}

function RateBar({ value }: { value: number }) {
  const color = value >= 75 ? '#22c55e' : value >= 50 ? '#f59e0b' : '#ef4444';
  const label = value >= 80 ? 'EXCELLENT' : value >= 65 ? 'GOOD' : value >= 45 ? 'FAIR' : 'DIFFICULT';
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-mono text-slate-400">CATCH PROBABILITY</span>
        <span className="text-xs font-mono font-bold" style={{ color }}>{label}</span>
      </div>
      <div className="h-2 bg-white/5 w-full relative overflow-hidden">
        <motion.div initial={{ width:0 }} animate={{ width:`${value}%` }}
          transition={{ duration:1.2, ease:'easeOut' }}
          className="h-full absolute left-0 top-0" style={{ background: color }}/>
      </div>
      <div className="text-right mt-1">
        <span className="font-display text-4xl font-black" style={{ color }}>{value}<span className="text-xl text-slate-500">%</span></span>
      </div>
    </div>
  );
}

const LOG_MESSAGES = [
  'Initializing scan engine...',
  'Loading hydrodynamic models...',
  'Cross-referencing species behavior DB...',
  'Applying weather modifiers...',
  'Calculating thermocline depth...',
  'Running 10,000 Monte Carlo simulations...',
  'Optimizing bait selection matrix...',
  'Generating GPS coordinates...',
  'Compiling tactical report...',
  'Scan complete. Results locked.',
];

export default function Generator() {
  const { toast } = useToast();
  const [phase, setPhase] = useState<'idle'|'scanning'|'done'>('idle');
  const [scanPct, setScanPct] = useState(0);
  const [result, setResult] = useState<Result|null>(null);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'loadout'|'coords'|'tips'>('loadout');
  const logRef = useRef<HTMLDivElement>(null);

  const form = useForm<FV>({
    resolver: zodResolver(schema),
    defaultValues: {
      lake: LAKES[0], species: SPECIES[0], difficulty: DIFFICULTIES[1],
      weather: WEATHER[0], timeOfDay: TIME_OF_DAY[2], season: SEASONS[0], rodType: ROD_TYPES[0],
    },
  });

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logLines]);

  function onSubmit(data: FV) {
    setPhase('scanning');
    setScanPct(0);
    setLogLines([]);
    setResult(null);

    let pct = 0;
    let logIdx = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 4 + 2;
      if (pct > 100) pct = 100;
      setScanPct(Math.floor(pct));
      if (logIdx < LOG_MESSAGES.length && pct >= (logIdx + 1) * (100 / LOG_MESSAGES.length)) {
        setLogLines(l => [...l, `[${new Date().toLocaleTimeString()}] ${LOG_MESSAGES[logIdx]}`]);
        logIdx++;
      }
      if (pct >= 100) {
        clearInterval(interval);
        const baits = BAIT_DB[data.species] || ['Standard Jig'];
        const [bait, ...rest] = pick(baits, 2);
        const rate = scoreCalc(data as Record<string,string>);
        const lat = (20 + data.lake.length * 1.7 + Math.random()*5).toFixed(4);
        const lng = (10 + data.species.length * 1.3 + Math.random()*5).toFixed(4);
        const depth = data.timeOfDay === 'Midday' || data.timeOfDay === 'Afternoon' ? '15–28 ft' : '3–9 ft';
        const lineWt = data.species === 'Northern Pike' || data.species === 'Striped Bass' ? '20–30 lb braid' : '8–15 lb fluorocarbon';
        const cast = ['Short (20–40 ft)','Medium (40–70 ft)','Long (70–120 ft)'][Math.floor(Math.random()*3)];
        const moons = ['🌑 New','🌒 Waxing Crescent','🌓 First Quarter','🌔 Waxing Gibbous','🌕 Full','🌖 Waning Gibbous'];
        const wTemp = data.season === 'Summer' ? `${72+Math.floor(Math.random()*10)}°F` : data.season === 'Winter' ? `${38+Math.floor(Math.random()*8)}°F` : `${58+Math.floor(Math.random()*10)}°F`;
        setResult({
          lake: data.lake, species: data.species, bait,
          secondaryBait: rest[0] || baits[0],
          coords: `${lat}N, ${lng}W`, depth, catchRate: rate,
          lineWeight: lineWt, castDistance: cast,
          tips: pick(TIPS_DB, 4),
          moonPhase: moons[Math.floor(Math.random()*moons.length)],
          waterTemp: wTemp,
        });
        setPhase('done');
        toast({ title:'Scan complete', description:'Your tactical loadout is ready.' });
      }
    }, 80);
  }

  return (
    <div className="min-h-screen bg-[#060e1a] text-slate-200">
      {/* Header */}
      <div className="border-b border-white/6 bg-[#04090f] px-6 md:px-12 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-black text-white tracking-wide">TACTICAL GENERATOR</h1>
            <p className="text-xs font-mono text-slate-500 mt-0.5">Configure parameters · Run scan · Get your edge</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-green-500/25 bg-green-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
            <span className="text-xs font-mono text-green-400">ENGINE ONLINE</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ── LEFT PANEL: Parameters ── */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="border border-white/8 bg-[#04090f] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent"/>
              <div className="px-5 py-4 border-b border-white/6">
                <p className="text-[10px] font-mono tracking-[0.22em] text-amber-400/80 uppercase">PARAMETERS</p>
              </div>
              <div className="p-5">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {([
                      { name:'lake', label:'Location / Lake', opts:LAKES },
                      { name:'species', label:'Target Species', opts:SPECIES },
                      { name:'rodType', label:'Rod Type', opts:ROD_TYPES },
                      { name:'difficulty', label:'Session Difficulty', opts:DIFFICULTIES },
                      { name:'weather', label:'Current Weather', opts:WEATHER },
                      { name:'timeOfDay', label:'Time of Day', opts:TIME_OF_DAY },
                      { name:'season', label:'Season', opts:SEASONS },
                    ] as const).map(({ name, label, opts }) => (
                      <FormField key={name} control={form.control} name={name as keyof FV}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">{label}</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="rounded-none border-white/10 bg-black/30 text-slate-200 text-sm font-mono h-9 focus:ring-amber-500/40 focus:border-amber-500/40">
                                  <SelectValue/>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-none border-white/10 bg-[#07111f]">
                                {(opts as readonly string[]).map(o => (
                                  <SelectItem key={o} value={o} className="font-mono text-sm text-slate-300 focus:bg-amber-500/15 focus:text-amber-300">{o}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}/>
                    ))}

                    <button type="submit" disabled={phase==='scanning'}
                      className="w-full mt-3 py-4 font-bold font-mono tracking-widest text-sm transition-all duration-200 relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: phase==='scanning' ? '#1a1a1a' : '#f59e0b', color: phase==='scanning'?'#888':'#000' }}>
                      {phase === 'scanning' ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                          </svg>
                          SCANNING...
                        </span>
                      ) : 'INITIATE SCAN ▶'}
                    </button>
                  </form>
                </Form>
              </div>
            </div>
          </div>

          {/* ── CENTER / RIGHT PANEL ── */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-5">
            {/* Sonar / Result header row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Sonar display */}
              <div className="border border-white/8 bg-[#04090f] relative overflow-hidden" style={{ minHeight:220 }}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"/>
                <div className="px-5 py-3 border-b border-white/6">
                  <p className="text-[10px] font-mono tracking-[0.22em] text-green-400/80 uppercase">SONAR DISPLAY</p>
                </div>
                <div style={{ height:180 }}>
                  {phase === 'idle' && (
                    <div className="h-full flex items-center justify-center" style={{ background:'#020c0a' }}>
                      <div className="text-center">
                        <div className="text-3xl mb-2 opacity-20">🎯</div>
                        <p className="text-[10px] font-mono text-green-800 tracking-widest">AWAITING SCAN</p>
                      </div>
                    </div>
                  )}
                  {phase === 'scanning' && <Sonar progress={scanPct}/>}
                  {phase === 'done' && result && (
                    <div className="h-full flex items-center justify-center" style={{ background:'#020c0a' }}>
                      <div className="text-center">
                        <div className="text-4xl mb-2 animate-bounce">🎣</div>
                        <p className="text-[10px] font-mono text-green-400 tracking-widest">TARGET ACQUIRED</p>
                        <p className="text-xs font-mono text-green-300/60 mt-1">{result.species.toUpperCase()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Catch rate gauge */}
              <div className="border border-white/8 bg-[#04090f] relative overflow-hidden" style={{ minHeight:220 }}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"/>
                <div className="px-5 py-3 border-b border-white/6">
                  <p className="text-[10px] font-mono tracking-[0.22em] text-amber-400/80 uppercase">CATCH PROBABILITY</p>
                </div>
                <div className="p-5">
                  {phase === 'idle' && (
                    <div className="flex items-center justify-center h-32 opacity-30">
                      <p className="text-xs font-mono text-slate-500 tracking-widest">— NO DATA —</p>
                    </div>
                  )}
                  {phase === 'scanning' && (
                    <div className="flex items-center justify-center h-32">
                      <div className="w-16 h-16 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin"/>
                    </div>
                  )}
                  {phase === 'done' && result && (
                    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="pt-3">
                      <RateBar value={result.catchRate}/>
                      <div className="grid grid-cols-2 gap-3 mt-5">
                        {[['DEPTH ZONE',result.depth],['WATER TEMP',result.waterTemp],['MOON',result.moonPhase],['CAST',result.castDistance]].map(([k,v])=>(
                          <div key={k} className="border border-white/6 px-3 py-2 bg-black/20">
                            <p className="text-[9px] font-mono text-slate-600 tracking-widest mb-0.5">{k}</p>
                            <p className="text-xs font-mono text-slate-300">{v}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Scan log */}
            <div className="border border-white/8 bg-[#04090f]">
              <div className="px-5 py-3 border-b border-white/6 flex items-center justify-between">
                <p className="text-[10px] font-mono tracking-[0.22em] text-slate-500 uppercase">SCAN LOG</p>
                {phase === 'scanning' && <span className="text-[9px] font-mono text-green-400/60 animate-pulse">● ACTIVE</span>}
                {phase === 'done' && <span className="text-[9px] font-mono text-amber-400/60">● COMPLETE</span>}
              </div>
              <div ref={logRef} className="p-4 font-mono text-xs text-green-400/70 space-y-1 overflow-y-auto" style={{ height:96, background:'#020c0a' }}>
                {logLines.length === 0 && <p className="text-slate-700">// Awaiting parameters...</p>}
                {logLines.map((l,i) => <p key={i}>{l}</p>)}
              </div>
            </div>

            {/* Results panel */}
            <AnimatePresence>
              {phase === 'done' && result && (
                <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  className="border border-amber-500/25 bg-[#04090f] relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/80 to-transparent"/>

                  {/* Tabs */}
                  <div className="flex border-b border-white/6">
                    {(['loadout','coords','tips'] as const).map(tab => (
                      <button key={tab} onClick={()=>setActiveTab(tab)}
                        className={`px-6 py-3 text-[10px] font-mono tracking-[0.2em] uppercase transition-colors ${
                          activeTab===tab ? 'text-amber-400 border-b border-amber-500 -mb-px bg-amber-500/5' : 'text-slate-600 hover:text-slate-400'
                        }`}>
                        {tab==='loadout'?'LOADOUT':tab==='coords'?'COORDINATES':'TACTICS'}
                      </button>
                    ))}
                    <div className="flex-1"/>
                    <button onClick={() => {
                      if (!result) return;
                      navigator.clipboard.writeText(
                        `BassLab HQ Report\n---\nLake: ${result.lake}\nSpecies: ${result.species}\nCoordinates: ${result.coords}\nPrimary Bait: ${result.bait}\nSecondary Bait: ${result.secondaryBait}\nDepth Zone: ${result.depth}\nCatch Rate: ${result.catchRate}%\nLine: ${result.lineWeight}\n---\nTips:\n${result.tips.map(t=>'• '+t).join('\n')}\n---\nbasslabhq.com`
                      );
                      toast({ title:'Copied to clipboard', description:'Data ready to share.' });
                    }} className="px-4 text-[10px] font-mono text-slate-600 hover:text-amber-400 transition-colors">
                      COPY ALL
                    </button>
                  </div>

                  <div className="p-6">
                    {activeTab === 'loadout' && (
                      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="border border-white/6 p-4 bg-black/20">
                            <p className="text-[9px] font-mono text-slate-600 mb-1 tracking-widest">PRIMARY BAIT</p>
                            <p className="font-display text-2xl text-amber-400">{result.bait}</p>
                          </div>
                          <div className="border border-white/6 p-4 bg-black/20">
                            <p className="text-[9px] font-mono text-slate-600 mb-1 tracking-widest">SECONDARY BAIT</p>
                            <p className="font-display text-2xl text-teal-400">{result.secondaryBait}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[['LINE WEIGHT',result.lineWeight],['DEPTH ZONE',result.depth],['CAST RANGE',result.castDistance],['WATER TEMP',result.waterTemp]].map(([k,v])=>(
                            <div key={k} className="border border-white/5 p-3 bg-black/15">
                              <p className="text-[9px] font-mono text-slate-600 mb-1 tracking-widest">{k}</p>
                              <p className="text-sm font-mono text-slate-200">{v}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'coords' && (
                      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
                        <div className="border border-teal-500/20 p-5 bg-teal-500/4 mb-4">
                          <p className="text-[9px] font-mono text-teal-400/60 mb-1 tracking-widest">GPS COORDINATES — {result.lake.toUpperCase()}</p>
                          <p className="font-display text-3xl text-teal-400">{result.coords}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {[['TARGET',result.species],['MOON PHASE',result.moonPhase],['DEPTH',result.depth]].map(([k,v])=>(
                            <div key={k} className="border border-white/5 p-3 bg-black/15">
                              <p className="text-[9px] font-mono text-slate-600 mb-1 tracking-widest">{k}</p>
                              <p className="text-sm font-mono text-slate-200">{v}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 border border-white/5 p-4 bg-black/20">
                          <p className="text-[9px] font-mono text-slate-600 mb-2 tracking-widest">SHAREABLE REPORT</p>
                          <code className="text-xs text-green-400/70 font-mono leading-relaxed block">
                            {`basslabhq.com/report?lake=${result.lake.replace(/ /g,'+')}&species=${result.species.replace(/ /g,'+')}&rate=${result.catchRate}`}
                          </code>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'tips' && (
                      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-3">
                        {result.tips.map((tip,i)=>(
                          <div key={i} className="flex gap-4 border border-white/5 p-4 bg-black/15 group hover:border-amber-500/20 transition-colors">
                            <span className="font-display text-xl text-amber-400/30 group-hover:text-amber-400/60 transition-colors flex-shrink-0">{String(i+1).padStart(2,'0')}</span>
                            <p className="text-sm text-slate-300 leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Idle placeholder */}
            {phase === 'idle' && (
              <div className="border border-dashed border-white/8 p-12 text-center">
                <div className="text-5xl mb-4 opacity-20">🎣</div>
                <p className="text-xs font-mono text-slate-600 tracking-[0.25em] uppercase">Configure parameters and initiate scan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
