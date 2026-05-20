import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type GameState = 'ready' | 'casting' | 'waiting' | 'nibble' | 'bite' | 'reeling' | 'caught' | 'missed';

interface Fish {
  id: number;
  x: number; y: number;
  vx: number; vy: number;
  tx: number; ty: number;
  phase: number;
  speed: number;
  size: number;
  species: 'bass' | 'trout' | 'pike';
  depth: number;
  targeting: boolean;
  facingRight: boolean;
}

interface Ripple { id: number; x: number; y: number; t: number; }
interface Splash { id: number; x: number; y: number; t: number; }

/* ── Vibrant golden-hour fish colors ── */
const SPECIES_COLOR = {
  bass:  { body: '#5a8a2a', belly: '#d4c060', fin: '#3a6010', eye: '#1a2808' },
  trout: { body: '#6aaa78', belly: '#f0e098', fin: '#3a7048', eye: '#1a3018' },
  pike:  { body: '#7a9a38', belly: '#d8e888', fin: '#4a6828', eye: '#1e2810' },
};

const SPECIES_NAMES = { bass: 'Largemouth Bass', trout: 'Rainbow Trout', pike: 'Northern Pike' };

function FishSVG({ species, size, facingRight, phase }: {
  species: 'bass' | 'trout' | 'pike'; size: number; facingRight: boolean; phase: number;
}) {
  const c = SPECIES_COLOR[species];
  const flip = facingRight ? 1 : -1;
  const tailAngle = Math.sin(phase) * 20;
  const bodyRoll = Math.sin(phase * 0.5) * 3;

  const bodyPath = species === 'pike'
    ? `M${7*flip},0 Q${3*flip},-${size*0.28} -${4*flip},-${size*0.22} L-${8*flip},-${size*0.1} L-${8*flip},${size*0.1} Q-${4*flip},${size*0.22} ${3*flip},${size*0.28} Z`
    : `M${size*0.52*flip},0 Q${size*0.2*flip},-${size*0.34} -${size*0.2*flip},-${size*0.36} Q-${size*0.5*flip},-${size*0.28} -${size*0.58*flip},-${size*0.1} L-${size*0.58*flip},${size*0.1} Q-${size*0.5*flip},${size*0.28} -${size*0.2*flip},${size*0.36} Q${size*0.2*flip},${size*0.34} ${size*0.52*flip},0 Z`;

  return (
    <g transform={`rotate(${bodyRoll})`}>
      <path d={bodyPath} fill={c.body}/>
      <ellipse cx={species==='pike'?`${1*flip}`:`${size*0.05*flip}`} cy="0"
        rx={species==='pike'?3:size*0.25} ry={species==='pike'?size*0.12:size*0.2}
        fill={c.belly} opacity="0.7"/>
      <g transform={`translate(${-size*0.58*flip},0) rotate(${tailAngle})`}>
        <path d={`M0,0 L${-size*0.38*flip},-${size*0.38} L${-size*0.3*flip},0 L${-size*0.38*flip},${size*0.38} Z`}
          fill={c.fin} opacity="0.9"/>
      </g>
      {species !== 'pike' && (
        <path d={`M${-size*0.15*flip},-${size*0.36} Q0,-${size*0.62} ${size*0.15*flip},-${size*0.58} Q${size*0.28*flip},-${size*0.5} ${size*0.35*flip},-${size*0.36}`}
          fill={c.fin} opacity="0.8"/>
      )}
      {species === 'pike' && (
        <path d={`M-${3*flip},-${size*0.22} Q-${1*flip},-${size*0.45} ${2*flip},-${size*0.42} Q${4*flip},-${size*0.35} ${5*flip},-${size*0.22}`}
          fill={c.fin} opacity="0.8"/>
      )}
      <path d={`M${size*0.2*flip},${size*0.08} Q${size*0.3*flip},${size*0.32} ${size*0.12*flip},${size*0.3}`}
        fill={c.fin} opacity="0.65"/>
      <path d={`M${-size*0.4*flip},0 Q0,${size*0.05} ${size*0.35*flip},0`}
        stroke={c.belly} strokeWidth="0.5" fill="none" strokeDasharray="1.2,0.8" opacity="0.55"/>
      <circle cx={`${size*0.35*flip}`} cy={`-${size*0.1}`} r={size*0.12} fill="white" opacity="0.95"/>
      <circle cx={`${(size*0.35 + size*0.04)*flip}`} cy={`-${size*0.12}`} r={size*0.075} fill={c.eye}/>
      <circle cx={`${(size*0.35 + 0.06)*flip}`} cy={`-${size*0.14}`} r={size*0.03} fill="white"/>
      {species !== 'pike' && [0,1,2].map(i => (
        <ellipse key={i} cx={`${(size*0.15 - i*size*0.12)*flip}`} cy="0" rx={size*0.1} ry={size*0.26}
          fill="none" stroke={c.belly} strokeWidth="0.4" opacity="0.22"/>
      ))}
      {species === 'trout' && [[-0.1,-0.15],[0.05,-0.2],[0.18,-0.1],[-0.2,0.08],[0.08,0.18]].map(([dx,dy],i) => (
        <circle key={i} cx={`${(size*dx)*flip}`} cy={`${size*dy}`} r={size*0.065}
          fill="rgba(180,50,50,0.55)" opacity="0.8"/>
      ))}
    </g>
  );
}

function WaterRipple({ x, y, age }: { x: number; y: number; age: number }) {
  const s = age * 5;
  const o = Math.max(0, 0.8 - age * 0.8);
  return (
    <g>
      <ellipse cx={x} cy={y} rx={s} ry={s*0.3} fill="none"
        stroke="rgba(255,200,80,0.7)" strokeWidth="0.3" opacity={o}/>
      <ellipse cx={x} cy={y} rx={s*0.5} ry={s*0.16} fill="none"
        stroke="rgba(255,220,120,0.5)" strokeWidth="0.22" opacity={o*0.7}/>
    </g>
  );
}

const INIT_FISH: Fish[] = [
  { id:1, x:15, y:62, vx:0.18, vy:0, tx:15, ty:62, phase:0,   speed:0.18, size:4.5, species:'bass',  depth:0, targeting:false, facingRight:true },
  { id:2, x:65, y:68, vx:-0.14, vy:0, tx:65, ty:68, phase:2.1, speed:0.14, size:3.8, species:'trout', depth:1, targeting:false, facingRight:false },
  { id:3, x:40, y:76, vx:0.09, vy:0, tx:40, ty:76, phase:1.0, speed:0.09, size:6.2, species:'pike',  depth:2, targeting:false, facingRight:true },
  { id:4, x:82, y:62, vx:0.22, vy:0, tx:82, ty:62, phase:3.5, speed:0.22, size:3.4, species:'bass',  depth:0, targeting:false, facingRight:true },
  { id:5, x:28, y:72, vx:-0.16, vy:0, tx:28, ty:72, phase:0.8, speed:0.16, size:3.0, species:'trout', depth:1, targeting:false, facingRight:false },
  { id:6, x:55, y:80, vx:0.11, vy:0, tx:55, ty:80, phase:4.2, speed:0.11, size:4.0, species:'bass',  depth:2, targeting:false, facingRight:true },
  { id:7, x:72, y:65, vx:-0.19, vy:0, tx:72, ty:65, phase:1.6, speed:0.19, size:2.8, species:'trout', depth:0, targeting:false, facingRight:false },
];

const CATCH_QUIPS = [
  'CLEAN HOOK SET', 'DEAD WEIGHT STRIKE', 'TEXTBOOK RETRIEVE',
  'TROPHY GRADE', 'PRIME SPECIMEN', 'PERFECT PRESENTATION',
];

export default function FishingScene({ showUI = true }: { showUI?: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const fishRef = useRef<Fish[]>(JSON.parse(JSON.stringify(INIT_FISH)));
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const stateRef = useRef<GameState>('ready');
  const bobberRef = useRef({ x: 68, y: 47.5 });
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [gameState, setGameState] = useState<GameState>('ready');
  const [fishPositions, setFishPositions] = useState<Fish[]>(fishRef.current);
  const [bobberPos, setBobberPos] = useState({ x: 68, y: 47.5 });
  const [bobberDeployed, setBobberDeployed] = useState(false);
  const [casting, setCasting] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const [catchLog, setCatchLog] = useState<Array<{ species: string; time: string; quip: string }>>([]);
  const [catchCount, setCatchCount] = useState(0);
  const [rodBend, setRodBend] = useState(0);
  const [lineSwing, setLineSwing] = useState(0);

  const clearTimers = useCallback(() => {
    timerRef.current.forEach(t => clearTimeout(t));
    timerRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timerRef.current.push(t);
    return t;
  }, []);

  const addRipple = useCallback((x: number, y: number) => {
    setRipples(prev => [...prev.slice(-5), { id: Date.now(), x, y, t: 0 }]);
  }, []);

  const addSplash = useCallback((x: number, y: number) => {
    setSplashes(prev => [...prev.slice(-3), { id: Date.now(), x, y, t: 0 }]);
  }, []);

  /* ── Fish AI loop ── */
  useEffect(() => {
    const W = 100; const WATER_TOP = 47; const WATER_BOT = 95;
    const loop = (now: number) => {
      const dt = Math.min((now - lastFrameRef.current) / 1000, 0.05);
      lastFrameRef.current = now;
      const gs = stateRef.current;
      const bx = bobberRef.current.x;
      const by = bobberRef.current.y + 3;
      let changed = false;

      fishRef.current = fishRef.current.map(f => {
        let { x, y, vx, vy, tx, ty, phase, speed, targeting, facingRight } = f;
        phase = (phase + dt * (speed * 4.5 + 1.5)) % (Math.PI * 2);

        if ((gs === 'waiting' || gs === 'nibble' || gs === 'bite') && f.id === 1 && !targeting) targeting = true;

        if (targeting && (gs === 'waiting' || gs === 'nibble' || gs === 'bite')) {
          tx = bx; ty = by;
          const spd = speed * 3.5;
          const dx = tx - x; const dy = ty - y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist > 0.5) { vx += (dx/dist)*spd*dt*4; vy += (dy/dist)*spd*dt*4; }
          vx *= 0.92; vy *= 0.92;
          facingRight = vx >= 0;
        } else {
          const targetVX = speed * (Math.sin(phase * 0.18 + f.id) > 0 ? 1 : -1);
          const targetVY = Math.sin(phase * 0.3 + f.id * 1.3) * 0.04;
          vx += (targetVX - vx) * dt * 2;
          vy += (targetVY - vy) * dt * 2;
          facingRight = vx >= 0;
          targeting = false;
          const depthY = 62 + f.depth * 8;
          vy += (depthY - y) * dt * 0.8;
        }

        if ((gs === 'caught' || gs === 'missed' || gs === 'ready') && f.id === 1) {
          targeting = false;
          const homeX = 15; const homeY = 62;
          vx += (homeX - x) * dt * 1.5;
          vy += (homeY - y) * dt * 1.5;
          vx *= 0.85; vy *= 0.85;
        }

        x = Math.max(3, Math.min(97, x + vx * dt * 60));
        y = Math.max(WATER_TOP + 4, Math.min(WATER_BOT, y + vy * dt * 60));
        if (x < 3 || x > 97) vx *= -1;
        changed = true;
        return { ...f, x, y, vx, vy, tx, ty, phase, targeting, facingRight };
      });

      if (changed) setFishPositions([...fishRef.current]);
      rafRef.current = requestAnimationFrame(loop);
    };
    lastFrameRef.current = performance.now();
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Ripple aging ── */
  useEffect(() => {
    const id = setInterval(() => {
      setRipples(prev => prev.map(r => ({ ...r, t: r.t + 0.04 })).filter(r => r.t < 1));
    }, 40);
    return () => clearInterval(id);
  }, []);

  const doCast = useCallback(() => {
    if (gameState !== 'ready') return;
    setCasting(true); setRodBend(12); setLineSwing(-15);
    setGameState('casting'); stateRef.current = 'casting'; clearTimers();

    addTimer(() => {
      const bx = 68 + (Math.random() * 6 - 3);
      setBobberPos({ x: bx, y: 47.5 }); bobberRef.current = { x: bx, y: 47.5 };
      setBobberDeployed(true); setCasting(false); setRodBend(3); setLineSwing(0);
      addSplash(bx, 47.5); addRipple(bx, 47.5);
      setGameState('waiting'); stateRef.current = 'waiting';

      const nibbleDelay = 3000 + Math.random() * 4000;
      addTimer(() => {
        setGameState('nibble'); stateRef.current = 'nibble';
        setBobberPos(prev => ({ ...prev, y: prev.y + 0.8 }));
        addRipple(bobberRef.current.x, 47.5);
        addTimer(() => {
          setGameState('bite'); stateRef.current = 'bite';
          setBobberPos(prev => ({ ...prev, y: prev.y + 2 })); setRodBend(6);
          addRipple(bobberRef.current.x, 47.5); addSplash(bobberRef.current.x, 47.5);
          addTimer(() => {
            if (stateRef.current === 'bite') {
              setGameState('missed'); stateRef.current = 'missed';
              setBobberDeployed(false); setRodBend(0);
              fishRef.current = fishRef.current.map(f => ({ ...f, targeting: false }));
              addTimer(() => { setGameState('ready'); stateRef.current = 'ready'; }, 1200);
            }
          }, 2500);
        }, 800 + Math.random() * 600);
      }, nibbleDelay);
    }, 900);
  }, [gameState, clearTimers, addTimer, addRipple, addSplash]);

  const doStrike = useCallback(() => {
    if (gameState !== 'bite') return;
    clearTimers(); setGameState('reeling'); stateRef.current = 'reeling'; setRodBend(18);
    addTimer(() => {
      const caughtFish = fishRef.current.find(f => f.id === 1);
      const species = caughtFish?.species ?? 'bass';
      const name = SPECIES_NAMES[species];
      const time = new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
      const quip = CATCH_QUIPS[Math.floor(Math.random() * CATCH_QUIPS.length)];
      setCatchLog(prev => [{ species: name, time, quip }, ...prev.slice(0, 4)]);
      setCatchCount(n => n + 1); setBobberDeployed(false); setRodBend(0);
      setGameState('caught'); stateRef.current = 'caught';
      fishRef.current = fishRef.current.map(f => ({ ...f, targeting: false }));
      addSplash(bobberRef.current.x, 47.5);
      addTimer(() => { setGameState('ready'); stateRef.current = 'ready'; }, 2000);
    }, 800);
  }, [gameState, clearTimers, addTimer, addSplash]);

  useEffect(() => () => { clearTimers(); cancelAnimationFrame(rafRef.current); }, [clearTimers]);

  const bx = bobberPos.x;
  const by = bobberPos.y;
  const inBite = gameState === 'bite';
  const inNibble = gameState === 'nibble';

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0a1e3d' }}>
      {/* ═══════════════════════════════════════════════
          SVG SCENE — Golden Hour / Sunset Atmosphere
      ═══════════════════════════════════════════════ */}
      <svg ref={svgRef} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full" style={{ display:'block' }}>
        <defs>
          {/* Water displacement */}
          <filter id="fsc-water" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.055" numOctaves="4" result="noise" seed="3">
              <animate attributeName="seed" values="3;11;3" dur="14s" repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          {/* Glow */}
          <filter id="fsc-glow">
            <feGaussianBlur stdDeviation="1.4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="fsc-softglow">
            <feGaussianBlur stdDeviation="1.0" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="fsc-sunglow">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* ── SUNSET SKY gradient ── */}
          <linearGradient id="fsc-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#0d1a40"/>
            <stop offset="18%" stopColor="#1a2a6c"/>
            <stop offset="38%" stopColor="#6b2d8a"/>
            <stop offset="58%" stopColor="#c4511a"/>
            <stop offset="78%" stopColor="#e87820"/>
            <stop offset="92%" stopColor="#f5a830"/>
            <stop offset="100%" stopColor="#d96010"/>
          </linearGradient>

          {/* ── VIBRANT WATER gradient ── */}
          <linearGradient id="fsc-water-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#1a6a8a"/>
            <stop offset="20%" stopColor="#0e4a6e"/>
            <stop offset="60%" stopColor="#08304e"/>
            <stop offset="100%" stopColor="#041828"/>
          </linearGradient>

          {/* ── SUN glow radial ── */}
          <radialGradient id="fsc-sun-glow" cx="50%" cy="50%">
            <stop offset="0%"   stopColor="rgba(255,200,60,0.9)"/>
            <stop offset="35%"  stopColor="rgba(255,140,20,0.45)"/>
            <stop offset="65%"  stopColor="rgba(240,80,10,0.18)"/>
            <stop offset="100%" stopColor="rgba(200,60,0,0)"/>
          </radialGradient>

          {/* ── GOLDEN caustics ── */}
          <radialGradient id="fsc-caustic-1" cx="30%" cy="40%">
            <stop offset="0%"   stopColor="rgba(255,180,40,0.22)"/>
            <stop offset="100%" stopColor="rgba(255,160,20,0)"/>
          </radialGradient>
          <radialGradient id="fsc-caustic-2" cx="70%" cy="60%">
            <stop offset="0%"   stopColor="rgba(255,200,60,0.18)"/>
            <stop offset="100%" stopColor="rgba(255,180,40,0)"/>
          </radialGradient>
          <radialGradient id="fsc-caustic-3" cx="55%" cy="50%">
            <stop offset="0%"   stopColor="rgba(20,180,180,0.15)"/>
            <stop offset="100%" stopColor="rgba(20,180,180,0)"/>
          </radialGradient>

          {/* Fishing line gradient */}
          <linearGradient id="fsc-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(240,230,200,0.8)"/>
            <stop offset="100%" stopColor="rgba(200,190,160,0.35)"/>
          </linearGradient>

          <clipPath id="fsc-water-clip"><rect x="0" y="46" width="100" height="54"/></clipPath>
          <clipPath id="fsc-sky-clip"><rect x="0" y="0" width="100" height="47"/></clipPath>
          <clipPath id="fsc-shimmer-clip"><rect x="0" y="46" width="100" height="54"/></clipPath>
        </defs>

        {/* ── SKY ── */}
        <rect width="100" height="100" fill="url(#fsc-sky)"/>

        {/* Atmospheric haze near horizon */}
        <rect x="0" y="38" width="100" height="10"
          fill="rgba(240,120,30,0.12)"/>

        {/* A few stars in upper sky (faint, as dusk) */}
        {[[6,4],[18,7],[32,3],[50,8],[67,5],[80,2],[92,6],[10,14],[28,10],[55,12],[78,9]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r={0.2} fill="white"
            opacity={i%3===0?0.7:0.4}>
            <animate attributeName="opacity"
              values={`${i%3===0?0.7:0.4};0.08;${i%3===0?0.7:0.4}`}
              dur={`${3+i*0.8}s`} begin={`${(i*0.5)%4}s`} repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </circle>
        ))}

        {/* ── SUN — large golden disc just above horizon ── */}
        {/* Outer glow */}
        <circle cx="72" cy="44" r="18" fill="url(#fsc-sun-glow)" filter="url(#fsc-sunglow)" opacity="0.7"/>
        {/* Inner glow ring */}
        <circle cx="72" cy="44" r="8"  fill="rgba(255,200,80,0.35)" filter="url(#fsc-softglow)"/>
        {/* Sun disc */}
        <circle cx="72" cy="44" r="4.8" fill="#ffe080" filter="url(#fsc-softglow)"/>
        <circle cx="72" cy="44" r="4.0" fill="#ffd040"/>
        {/* Sun rays */}
        {[0,30,60,90,120,150,210,240,270,300,330].map((deg,i) => {
          const rad = deg * Math.PI / 180;
          const r1 = 5.2; const r2 = 6.5 + (i%3)*1.2;
          return (
            <line key={deg}
              x1={72 + Math.cos(rad)*r1} y1={44 + Math.sin(rad)*r1}
              x2={72 + Math.cos(rad)*r2} y2={44 + Math.sin(rad)*r2}
              stroke="rgba(255,220,80,0.6)" strokeWidth={i%3===0?0.4:0.25}/>
          );
        })}

        {/* ── Horizon glow band ── */}
        <rect x="0" y="42" width="100" height="5"
          fill="rgba(255,120,20,0.18)"/>

        {/* ── Birds silhouettes ── */}
        {[[20,18],[35,14],[38,15.5],[60,20],[63,21.5]].map(([bx,by],i) => (
          <g key={i} transform={`translate(${bx},${by})`}>
            <path d={`M-2,0 Q-1,-1 0,-0.5 Q1,-1 2,0`}
              stroke="rgba(20,10,5,0.7)" strokeWidth="0.45" fill="none"/>
          </g>
        ))}

        {/* ── Mountain silhouettes (sunset-lit) ── */}
        <path d="M0,47 L8,34 L16,40 L24,30 L34,42 L42,28 L52,38 L60,25 L70,36 L80,29 L90,38 L100,32 L100,47 Z"
          fill="#12243c" opacity="0.95"/>
        <path d="M0,47 L5,38 L12,43 L20,36 L30,44 L38,33 L48,42 L55,30 L64,40 L72,34 L82,43 L92,36 L100,41 L100,47 Z"
          fill="#0e1e30" opacity="0.98"/>

        {/* Treeline */}
        {Array.from({length:22},(_,i) => {
          const x = i*5; const h = 6+((i*7+3)%5); const w = 3+((i*3)%3);
          const col = i%3===0?'#0a1a2a':i%3===1?'#0c1e32':'#0b1c2e';
          return <polygon key={i} points={`${x},47 ${x+w/2},${47-h} ${x+w},47`} fill={col}/>;
        })}

        {/* ══════════ WATER BODY ══════════ */}
        <rect x="0" y="46.5" width="100" height="53.5" fill="url(#fsc-water-body)"/>

        {/* Golden caustics — warm underwater light */}
        <g clipPath="url(#fsc-water-clip)" opacity="0.8">
          <ellipse cx="25" cy="80" rx="20" ry="7" fill="url(#fsc-caustic-1)">
            <animate attributeName="cx" values="18;34;18" dur="8s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="8s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </ellipse>
          <ellipse cx="68" cy="73" rx="16" ry="6" fill="url(#fsc-caustic-2)">
            <animate attributeName="cx" values="62;76;62" dur="10s" begin="-3s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </ellipse>
          <ellipse cx="45" cy="85" rx="14" ry="5" fill="url(#fsc-caustic-3)">
            <animate attributeName="cx" values="40;52;40" dur="7s" begin="-2s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </ellipse>
          {/* God rays from sun into water */}
          {[30,45,60,72,85].map((cx,i) => (
            <line key={cx} x1={cx} y1="47" x2={cx+(i%2?5:-5)} y2="98"
              stroke="rgba(255,160,40,0.06)" strokeWidth={1.8+i*0.4}/>
          ))}
        </g>

        {/* ── Water surface with turbulence ── */}
        <g filter="url(#fsc-water)">
          {/* Deep wave */}
          <path fill="rgba(10,70,100,0.5)">
            <animate attributeName="d"
              values="M0,47.5 Q25,46 50,47.5 Q75,49 100,47.5 L100,100 L0,100 Z;
                      M0,48.2 Q25,46.5 50,48.2 Q75,49.8 100,48.2 L100,100 L0,100 Z;
                      M0,47.5 Q25,46 50,47.5 Q75,49 100,47.5 L100,100 L0,100 Z"
              dur="6s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </path>
          {/* Surface highlight — warm golden reflection */}
          <path fill="rgba(255,160,40,0.12)">
            <animate attributeName="d"
              values="M0,47 Q12,45.8 25,47 Q38,48.2 50,47 Q62,45.8 75,47 Q88,48.2 100,47 L100,48.5 L0,48.5 Z;
                      M0,47.8 Q12,46.5 25,47.8 Q38,49.1 50,47.8 Q62,46.5 75,47.8 Q88,49.1 100,47.8 L100,49.2 L0,49.2 Z;
                      M0,47 Q12,45.8 25,47 Q38,48.2 50,47 Q62,45.8 75,47 Q88,48.2 100,47 L100,48.5 L0,48.5 Z"
              dur="4.2s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </path>
          {/* Surface line — teal-gold */}
          <path stroke="rgba(80,200,210,0.55)" strokeWidth="0.25" fill="none">
            <animate attributeName="d"
              values="M0,47 Q25,45.8 50,47 Q75,48.2 100,47;
                      M0,47.8 Q25,46.5 50,47.8 Q75,49.1 100,47.8;
                      M0,47 Q25,45.8 50,47 Q75,48.2 100,47"
              dur="4.2s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </path>
        </g>

        {/* Sun reflection on water */}
        <g clipPath="url(#fsc-water-clip)">
          <ellipse cx="72" cy="48" rx="5" ry="1.2" fill="rgba(255,210,80,0.55)" filter="url(#fsc-softglow)">
            <animate attributeName="rx" values="4;7;4" dur="3s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </ellipse>
          <ellipse cx="72" cy="51" rx="3" ry="0.7" fill="rgba(255,190,60,0.3)">
            <animate attributeName="rx" values="2;5;2" dur="4s" begin="-1.2s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </ellipse>
          <ellipse cx="72" cy="54" rx="1.8" ry="0.5" fill="rgba(255,170,40,0.2)">
            <animate attributeName="rx" values="1.2;3.5;1.2" dur="5s" begin="-2s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </ellipse>
        </g>

        {/* Moving golden shimmer on water surface */}
        <g clipPath="url(#fsc-shimmer-clip)">
          <rect x="-25" y="48" width="35" height="1.8" rx="0.9" fill="rgba(255,180,50,0.22)" opacity="0.8">
            <animate attributeName="x" values="-35;110" dur="7s" repeatCount="indefinite" calcMode="linear"/>
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur="7s" repeatCount="indefinite"/>
          </rect>
          <rect x="-60" y="52" width="50" height="1" rx="0.5" fill="rgba(80,200,220,0.18)" opacity="0.6">
            <animate attributeName="x" values="-60;110" dur="11s" begin="-4s" repeatCount="indefinite" calcMode="linear"/>
          </rect>
          <rect x="-40" y="56" width="28" height="0.8" rx="0.4" fill="rgba(255,160,40,0.12)">
            <animate attributeName="x" values="-40;110" dur="9s" begin="-6s" repeatCount="indefinite" calcMode="linear"/>
          </rect>
        </g>

        {/* ── Seabed ── */}
        <g clipPath="url(#fsc-water-clip)">
          <ellipse cx="10"  cy="101" rx="14" ry="5"   fill="#051428"/>
          <ellipse cx="30"  cy="100" rx="18" ry="5.5" fill="#041220"/>
          <ellipse cx="55"  cy="101" rx="20" ry="6"   fill="#051428"/>
          <ellipse cx="78"  cy="100" rx="16" ry="5.5" fill="#041220"/>
          <ellipse cx="96"  cy="101" rx="10" ry="4.5" fill="#051428"/>

          {/* Seaweed — vivid green */}
          {([[8,12,'#1a7a40'],[9.5,8,'#167035'],[23,14,'#1e8848'],[42,11,'#1a7a40'],[58,13,'#1e8848'],[74,10,'#167035']] as [number,number,string][]).map(([x,h,col],i) => (
            <g key={i}>
              <path d={`M${x},100 Q${x-2},${100-h*0.6} ${x+0.8},${100-h}`}
                stroke={col} strokeWidth="0.9" fill="none" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate"
                  values={`-4,${x},100;4,${x},100;-4,${x},100`}
                  dur={`${3.5+i*0.4}s`} repeatCount="indefinite"
                  calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
              </path>
            </g>
          ))}

          {/* Bubbles — warm teal */}
          {[12,28,46,64,82].map((bxp,i) => (
            <g key={bxp}>
              <circle cx={bxp} cy="95" r="0.55" fill="none"
                stroke="rgba(80,200,220,0.65)" strokeWidth="0.2">
                <animate attributeName="cy" values="95;47" dur={`${5+i*1.2}s`} begin={`-${i*1.1}s`} repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0" dur={`${5+i*1.2}s`} begin={`-${i*1.1}s`} repeatCount="indefinite"/>
                <animate attributeName="r" values="0.45;0.9" dur={`${5+i*1.2}s`} begin={`-${i*1.1}s`} repeatCount="indefinite"/>
              </circle>
            </g>
          ))}
        </g>

        {/* ══════════ FISH ══════════ */}
        <g clipPath="url(#fsc-water-clip)">
          {[2,1,0].map(layer =>
            fishPositions.filter(f => f.depth === layer).map(f => (
              <g key={f.id} transform={`translate(${f.x},${f.y})`}
                opacity={layer===2?0.72:layer===1?0.88:1.0}>
                <FishSVG species={f.species} size={f.size} facingRight={f.facingRight} phase={f.phase}/>
              </g>
            ))
          )}
        </g>

        {/* Water ripples */}
        {ripples.map(r => <WaterRipple key={r.id} x={r.x} y={r.y} age={r.t}/>)}

        {/* Splash particles */}
        {splashes.map(sp => (
          <g key={sp.id}>
            {[-1.8,-0.9,0,0.9,1.8].map((dx,i) => (
              <circle key={i} cx={sp.x+dx} cy={47-Math.abs(dx)*0.6} r="0.45"
                fill="rgba(255,200,80,0.8)">
                <animate attributeName="cy" values={`${47-Math.abs(dx)*0.6};${43-i}`}
                  dur="0.6s" fill="freeze"
                  calcMode="spline" keyTimes="0;1" keySplines="0.25 0.1 0.25 1"/>
                <animate attributeName="opacity" values="0.9;0" dur="0.7s" fill="freeze"/>
              </circle>
            ))}
          </g>
        ))}

        {/* ══════════ FISHING ROD ══════════ */}
        {/* Handle */}
        <rect x="97" y="60" width="3" height="18" rx="1.5" fill="#2a1508"/>
        <rect x="97.4" y="63" width="2.2" height="10" rx="1.1" fill="#3d2010"/>
        {/* Reel */}
        <ellipse cx="98.5" cy="68" rx="1.8" ry="2.2" fill="#303030"/>
        <ellipse cx="98.5" cy="68" rx="1" ry="1.4" fill="#484848"/>
        <line x1="98.5" y1="66.5" x2="98.5" y2="69.5" stroke="#666" strokeWidth="0.4"/>
        <line x1="97" y1="68" x2="100" y2="68" stroke="#666" strokeWidth="0.4"/>
        {/* Rod sections */}
        <line x1="98" y1="60" x2={92+rodBend*0.3} y2={48+rodBend*0.2}
          stroke="#5a3018" strokeWidth="2.5" strokeLinecap="round"
          style={{ transition:'all 0.4s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        <line x1={92+rodBend*0.3} y1={48+rodBend*0.2}
              x2={84+rodBend*0.5} y2={34+rodBend*0.1}
          stroke="#7a4820" strokeWidth="1.6" strokeLinecap="round"
          style={{ transition:'all 0.4s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        <line x1={84+rodBend*0.5} y1={34+rodBend*0.1}
              x2={74+rodBend*0.7} y2={18}
          stroke="#9a5828" strokeWidth="1.0" strokeLinecap="round"
          style={{ transition:'all 0.4s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        <line x1={74+rodBend*0.7} y1={18} x2={68+rodBend*0.8} y2={8}
          stroke="#ba7030" strokeWidth="0.55" strokeLinecap="round"
          style={{ transition:'all 0.4s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        {/* Line guides */}
        <circle cx={90+rodBend*0.35} cy={45+rodBend*0.15} r="1" fill="none" stroke="#888" strokeWidth="0.35"/>
        <circle cx={82+rodBend*0.55} cy={31+rodBend*0.05} r="0.8" fill="none" stroke="#888" strokeWidth="0.3"/>
        <circle cx={76+rodBend*0.65} cy={20} r="0.65" fill="none" stroke="#999" strokeWidth="0.25"/>

        {/* Fishing line */}
        {bobberDeployed ? (
          <path d={`M${68+rodBend*0.8},8 Q${(68+bx)/2+lineSwing},${(8+by)/2-4} ${bx},${by}`}
            stroke="url(#fsc-line)" strokeWidth="0.2" fill="none"
            style={{ transition:'all 0.5s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        ) : (
          <path d={`M${68+rodBend*0.8},8 Q${68+rodBend*0.6+lineSwing},28 ${66+lineSwing},46`}
            stroke="url(#fsc-line)" strokeWidth="0.2" fill="none"
            style={{ transition:'all 0.4s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        )}

        {/* ══════════ BOBBER ══════════ */}
        {bobberDeployed && (
          <g transform={`translate(${bx},${by})`}
            style={{ transition:'transform 0.5s cubic-bezier(0.25,0.1,0.25,1)' }}>
            <ellipse cx="0" cy="0.2" rx="2.4" ry="0.75" fill="none"
              stroke="rgba(255,200,80,0.35)" strokeWidth="0.2"/>
            <ellipse cx="0" cy="0.85" rx="1.35" ry="1.05" fill="white" opacity="0.95"/>
            <ellipse cx="0" cy="-0.2" rx="1.35" ry="1.05" fill="#cc2020"/>
            <ellipse cx="0" cy="-0.2" rx="1.35" ry="1.05" fill="none"
              stroke="rgba(180,60,60,0.5)" strokeWidth="0.35"/>
            <rect x="-1.38" y="-0.12" width="2.76" height="0.22" fill="rgba(0,0,0,0.28)"/>
            <line x1="0" y1="-1.28" x2="0" y2="-0.25" stroke="#555" strokeWidth="0.22"/>
            <circle cx="0" cy="-1.38" r="0.22" fill="#f59e0b"/>
            {inBite && (
              <circle cx="0" cy="-1.38" r="0.55" fill="#f59e0b" opacity="0.7">
                <animate attributeName="r"       values="0.55;1.4;0.55" dur="0.4s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.7;0.1;0.7"   dur="0.4s" repeatCount="indefinite"/>
              </circle>
            )}
            {gameState === 'waiting' && (
              <animateTransform attributeName="transform" type="translate"
                values="0,0;0,0.6;0,0" dur="3s" repeatCount="indefinite" additive="sum"
                calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
            )}
            {inNibble && (
              <animateTransform attributeName="transform" type="translate"
                values="0,0;0,1.2;0,-0.3;0,0" dur="0.7s" repeatCount="indefinite" additive="sum"
                calcMode="spline" keyTimes="0;0.35;0.7;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
            )}
            {inBite && (
              <animateTransform attributeName="transform" type="translate"
                values="0,0;0,2;0,1.5;0,2" dur="0.5s" repeatCount="indefinite" additive="sum"
                calcMode="spline" keyTimes="0;0.3;0.6;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
            )}
          </g>
        )}

        {/* STRIKE text */}
        {inBite && (
          <g>
            <text x="50" y="32" fontSize="6" fontWeight="bold" fontFamily="monospace"
              fill="#f59e0b" textAnchor="middle" filter="url(#fsc-glow)">
              STRIKE!
              <animate attributeName="opacity" values="1;0.3;1" dur="0.35s" repeatCount="indefinite"/>
            </text>
            <text x="50" y="38" fontSize="2.2" fontFamily="monospace"
              fill="rgba(255,255,255,0.75)" textAnchor="middle">
              TAP STRIKE TO SET THE HOOK
            </text>
          </g>
        )}

        {/* Casting arc */}
        {casting && (
          <path d={`M${68},8 Q${50},20 ${68},47`}
            stroke="rgba(255,220,100,0.4)" strokeWidth="0.3" fill="none" strokeDasharray="2,1.5">
            <animate attributeName="opacity" values="0;0.6;0" dur="0.9s" fill="freeze"/>
          </path>
        )}

        {/* Reeling */}
        {gameState === 'reeling' && (
          <text x="50" y="35" fontSize="4" fontFamily="monospace"
            fill="#40d0e8" textAnchor="middle">
            REELING...
            <animate attributeName="opacity" values="1;0.4;1" dur="0.25s" repeatCount="indefinite"/>
          </text>
        )}

        {/* Caught */}
        {gameState === 'caught' && (
          <g>
            <text x="50" y="30" fontSize="5.5" fontWeight="bold" fontFamily="monospace"
              fill="#ffd040" textAnchor="middle" filter="url(#fsc-glow)">
              CAUGHT!
              <animate attributeName="opacity" values="0;1;1;0" dur="2s" fill="freeze"
                calcMode="spline" keyTimes="0;0.1;0.8;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
            </text>
            {[-8,-4,0,4,8].map((dx,i) => (
              <circle key={i} cx={50+dx} cy={34} r="0.7" fill="#ffd040">
                <animate attributeName="cy"      values="34;18"   dur={`${0.6+i*0.1}s`} fill="freeze"
                  calcMode="spline" keyTimes="0;1" keySplines="0.25 0.1 0.25 1"/>
                <animate attributeName="opacity" values="0.9;0"  dur={`${0.7+i*0.1}s`} fill="freeze"/>
              </circle>
            ))}
          </g>
        )}

        {/* Missed */}
        {gameState === 'missed' && (
          <text x="50" y="34" fontSize="3.8" fontFamily="monospace"
            fill="#ef4444" textAnchor="middle">
            MISSED
            <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" fill="freeze"
              calcMode="spline" keyTimes="0;0.1;0.7;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
          </text>
        )}
      </svg>

      {/* ══════════ HUD OVERLAY ══════════ */}
      {showUI && (
        <>
          {/* Depth finder — top left */}
          <div className="absolute top-4 left-4 font-mono text-[10px]"
            style={{ color:'rgba(80,220,230,0.85)' }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse"/>
              <span className="tracking-widest text-teal-200/70">DEPTH FINDER</span>
            </div>
            <div className="px-2 py-1.5"
              style={{ background:'rgba(2,12,28,0.72)', border:'1px solid rgba(80,200,220,0.2)', backdropFilter:'blur(8px)' }}>
              {fishPositions.slice(0,3).map(f => (
                <div key={f.id} className="flex items-center gap-2 leading-snug">
                  <span style={{ color: f.depth===0?'#60e8f0':f.depth===1?'#86efac':'#c4b5fd', opacity: f.targeting?1:0.55 }}>
                    {f.targeting ? '▶' : '·'}
                  </span>
                  <span style={{ color: f.targeting?'rgba(100,240,240,0.95)':'rgba(80,200,220,0.5)' }}>
                    {SPECIES_NAMES[f.species]} {f.depth===0?'SHALLOW':f.depth===1?'MID':'DEEP'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Catch counter — top right */}
          <div className="absolute top-4 right-4 text-right font-mono">
            <div className="text-[9px] tracking-widest" style={{ color:'rgba(255,200,100,0.5)' }}>SESSION CATCH</div>
            <div className="text-3xl font-black leading-none"
              style={{ fontFamily:'Bebas Neue,sans-serif', color: catchCount>0?'#ffd040':'rgba(255,255,255,0.18)' }}>
              {catchCount.toString().padStart(2,'0')}
            </div>
          </div>

          {/* Game controls — bottom center */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="text-[9.5px] font-mono tracking-[0.2em] uppercase"
              style={{ color:'rgba(200,230,240,0.6)' }}>
              {gameState === 'ready'   ? 'READY TO CAST' :
               gameState === 'casting' ? 'CASTING...' :
               gameState === 'waiting' ? 'WAITING FOR STRIKE' :
               gameState === 'nibble'  ? 'FISH APPROACHING' :
               gameState === 'bite'    ? 'FISH ON THE LINE!' :
               gameState === 'reeling' ? 'REELING IN...' :
               gameState === 'caught'  ? '🎣 FISH CAUGHT!' : 'FISH ESCAPED'}
            </div>

            <div className="flex gap-3 items-center">
              <AnimatePresence mode="wait">
                {gameState === 'ready' && (
                  <motion.button key="cast"
                    initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }}
                    transition={{ duration:0.18, ease:[0.25,0.1,0.25,1] }}
                    onClick={doCast}
                    className="px-8 py-3 font-black font-mono tracking-[0.25em] text-xs"
                    style={{ background:'#f59e0b', color:'#000', border:'none', cursor:'pointer',
                      boxShadow:'0 0 24px rgba(245,158,11,0.4), 0 4px 12px rgba(0,0,0,0.3)' }}
                    whileHover={{ scale:1.05, backgroundColor:'#fbbf24' }}
                    whileTap={{ scale:0.97 }}>
                    CAST LINE
                  </motion.button>
                )}
                {gameState === 'bite' && (
                  <motion.button key="strike"
                    initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                    transition={{ duration:0.12, ease:[0.25,0.1,0.25,1] }}
                    onClick={doStrike}
                    className="px-10 py-3.5 font-black font-mono tracking-[0.25em] text-sm"
                    style={{ background:'#40d8f0', color:'#000', border:'none', cursor:'pointer',
                      boxShadow:'0 0 28px rgba(64,216,240,0.5), 0 4px 12px rgba(0,0,0,0.3)' }}
                    animate={{ scale:[1,1.06,1] }}
                    transition={{ duration:0.28, repeat:Infinity }}>
                    STRIKE!
                  </motion.button>
                )}
              </AnimatePresence>

              {(gameState === 'waiting' || gameState === 'nibble' || gameState === 'casting' || gameState === 'reeling') && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex gap-1.5 items-center">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full"
                      style={{ background:'#40d8e0', animation:`pulse 1s ${i*0.2}s infinite`,
                        boxShadow:'0 0 6px rgba(64,216,224,0.6)' }}/>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Catch log — bottom left */}
          {catchLog.length > 0 && (
            <div className="absolute bottom-4 left-4 font-mono max-w-52">
              <div className="text-[8px] tracking-widest mb-1" style={{ color:'rgba(255,200,100,0.45)' }}>
                CATCH LOG
              </div>
              <div className="space-y-1">
                {catchLog.slice(0,3).map((entry,i) => (
                  <motion.div key={i}
                    initial={{ opacity:0, x:-8 }} animate={{ opacity:1-i*0.28, x:0 }}
                    transition={{ duration:0.3, ease:[0.25,0.1,0.25,1] }}
                    className="text-[9px] pl-1.5"
                    style={{ borderLeft: `2px solid ${i===0?'#ffd040':'rgba(255,255,255,0.12)'}`,
                      color: i===0?'rgba(255,210,64,0.9)':'rgba(255,255,255,0.35)' }}>
                    <div>{entry.species}</div>
                    <div style={{ color: i===0?'rgba(64,216,240,0.7)':'rgba(255,255,255,0.2)', fontSize:8 }}>
                      {entry.quip}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
