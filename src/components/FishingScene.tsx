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

const SPECIES_COLOR = {
  bass:  { body: '#2d5a3d', belly: '#8ab87a', fin: '#1a3d28', eye: '#0a1f14' },
  trout: { body: '#5c7a3d', belly: '#d4c87a', fin: '#3d5a28', eye: '#1a2a0a' },
  pike:  { body: '#3d5c2d', belly: '#a0b878', fin: '#283d1e', eye: '#0f1e0a' },
};

const SPECIES_NAMES = { bass: 'Largemouth Bass', trout: 'Rainbow Trout', pike: 'Northern Pike' };

function FishSVG({ species, size, facingRight, phase }: { species: 'bass'|'trout'|'pike'; size: number; facingRight: boolean; phase: number }) {
  const c = SPECIES_COLOR[species];
  const flip = facingRight ? 1 : -1;
  const tailAngle = Math.sin(phase) * 18;
  const bodyRoll = Math.sin(phase * 0.5) * 3;

  const bodyPath = species === 'pike'
    ? `M${7*flip},0 Q${3*flip},-${size*0.28} -${4*flip},-${size*0.22} L-${8*flip},-${size*0.1} L-${8*flip},${size*0.1} Q-${4*flip},${size*0.22} ${3*flip},${size*0.28} Z`
    : `M${size*0.52*flip},0 Q${size*0.2*flip},-${size*0.34} -${size*0.2*flip},-${size*0.36} Q-${size*0.5*flip},-${size*0.28} -${size*0.58*flip},-${size*0.1} L-${size*0.58*flip},${size*0.1} Q-${size*0.5*flip},${size*0.28} -${size*0.2*flip},${size*0.36} Q${size*0.2*flip},${size*0.34} ${size*0.52*flip},0 Z`;

  return (
    <g transform={`rotate(${bodyRoll})`}>
      {/* Body */}
      <path d={bodyPath} fill={c.body}/>
      {/* Belly highlight */}
      <ellipse cx={species==='pike'?`${1*flip}`:`${size*0.05*flip}`} cy="0" rx={species==='pike'?3:size*0.25} ry={species==='pike'?size*0.12:size*0.2} fill={c.belly} opacity="0.55"/>
      {/* Caudal tail */}
      <g transform={`translate(${-size*0.58*flip},0) rotate(${tailAngle})`}>
        <path d={`M0,0 L${-size*0.38*flip},-${size*0.38} L${-size*0.3*flip},0 L${-size*0.38*flip},${size*0.38} Z`} fill={c.fin} opacity="0.9"/>
      </g>
      {/* Dorsal fin */}
      {species !== 'pike' && (
        <path d={`M${-size*0.15*flip},-${size*0.36} Q0,-${size*0.62} ${size*0.15*flip},-${size*0.58} Q${size*0.28*flip},-${size*0.5} ${size*0.35*flip},-${size*0.36}`}
          fill={c.fin} opacity="0.75"/>
      )}
      {species === 'pike' && (
        <path d={`M-${3*flip},-${size*0.22} Q-${1*flip},-${size*0.45} ${2*flip},-${size*0.42} Q${4*flip},-${size*0.35} ${5*flip},-${size*0.22}`}
          fill={c.fin} opacity="0.75"/>
      )}
      {/* Pectoral fin */}
      <path d={`M${size*0.2*flip},${size*0.08} Q${size*0.3*flip},${size*0.32} ${size*0.12*flip},${size*0.3}`}
        fill={c.fin} opacity="0.6"/>
      {/* Lateral line */}
      <path d={`M${-size*0.4*flip},0 Q0,${size*0.05} ${size*0.35*flip},0`}
        stroke={c.belly} strokeWidth="0.4" fill="none" strokeDasharray="1.2,0.8" opacity="0.4"/>
      {/* Eye */}
      <circle cx={`${size*0.35*flip}`} cy={`-${size*0.1}`} r={size*0.11} fill="white" opacity="0.9"/>
      <circle cx={`${(size*0.35 + size*0.04)*flip}`} cy={`-${size*0.12}`} r={size*0.07} fill={c.eye}/>
      <circle cx={`${(size*0.35 + 0.06)*flip}`} cy={`-${size*0.14}`} r={size*0.025} fill="white"/>
      {/* Scale texture */}
      {species !== 'pike' && [0,1,2].map(i => (
        <ellipse key={i} cx={`${(size*0.15 - i*size*0.12)*flip}`} cy="0" rx={size*0.1} ry={size*0.26}
          fill="none" stroke={c.belly} strokeWidth="0.3" opacity="0.18"/>
      ))}
      {/* Spots for trout */}
      {species === 'trout' && [[-0.1,-0.15],[0.05,-0.2],[0.18,-0.1],[-0.2,0.08],[0.08,0.18]].map(([dx,dy],i) => (
        <circle key={i} cx={`${(size*dx)*flip}`} cy={`${size*dy}`} r={size*0.06} fill="rgba(0,0,0,0.28)" opacity="0.7"/>
      ))}
    </g>
  );
}

function WaterRipple({ x, y, age }: { x: number; y: number; age: number }) {
  const s = age * 4.5;
  const o = Math.max(0, 0.7 - age * 0.7);
  return (
    <g>
      <ellipse cx={x} cy={y} rx={s} ry={s*0.32} fill="none" stroke="rgba(34,211,238,0.6)" strokeWidth="0.28" opacity={o}/>
      <ellipse cx={x} cy={y} rx={s*0.55} ry={s*0.18} fill="none" stroke="rgba(34,211,238,0.4)" strokeWidth="0.2" opacity={o*0.7}/>
    </g>
  );
}

const INIT_FISH: Fish[] = [
  { id:1, x:15, y:62, vx:0.18, vy:0, tx:15, ty:62, phase:0, speed:0.18, size:4.2, species:'bass',  depth:0, targeting:false, facingRight:true },
  { id:2, x:65, y:70, vx:-0.12, vy:0, tx:65, ty:70, phase:2.1, speed:0.12, size:3.6, species:'trout', depth:1, targeting:false, facingRight:false },
  { id:3, x:40, y:78, vx:0.08, vy:0, tx:40, ty:78, phase:1.0, speed:0.08, size:5.8, species:'pike',  depth:2, targeting:false, facingRight:true },
  { id:4, x:82, y:64, vx:0.22, vy:0, tx:82, ty:64, phase:3.5, speed:0.22, size:3.2, species:'bass',  depth:0, targeting:false, facingRight:true },
  { id:5, x:28, y:74, vx:-0.15, vy:0, tx:28, ty:74, phase:0.8, speed:0.15, size:2.8, species:'trout', depth:1, targeting:false, facingRight:false },
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
    setRipples(prev => [...prev.slice(-4), { id: Date.now(), x, y, t: 0 }]);
  }, []);

  const addSplash = useCallback((x: number, y: number) => {
    setSplashes(prev => [...prev.slice(-2), { id: Date.now(), x, y, t: 0 }]);
  }, []);

  // Fish AI loop
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

        if ((gs === 'waiting' || gs === 'nibble' || gs === 'bite') && f.id === 1 && !targeting) {
          targeting = true;
        }

        if (targeting && (gs === 'waiting' || gs === 'nibble' || gs === 'bite')) {
          tx = bx; ty = by;
          const spd = speed * 3.5;
          const dx = tx - x; const dy = ty - y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist > 0.5) {
            vx += (dx / dist) * spd * dt * 4;
            vy += (dy / dist) * spd * dt * 4;
          }
          vx *= 0.92; vy *= 0.92;
          facingRight = vx >= 0;
        } else {
          // Patrol: sinusoidal drift
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

      if (changed) {
        setFishPositions([...fishRef.current]);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    lastFrameRef.current = performance.now();
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Ripple aging
  useEffect(() => {
    const id = setInterval(() => {
      setRipples(prev => prev.map(r => ({ ...r, t: r.t + 0.045 })).filter(r => r.t < 1));
    }, 40);
    return () => clearInterval(id);
  }, []);

  const doCast = useCallback(() => {
    if (gameState !== 'ready') return;
    setCasting(true);
    setRodBend(12);
    setLineSwing(-15);
    setGameState('casting');
    stateRef.current = 'casting';
    clearTimers();

    addTimer(() => {
      const bx = 68 + (Math.random() * 6 - 3);
      setBobberPos({ x: bx, y: 47.5 });
      bobberRef.current = { x: bx, y: 47.5 };
      setBobberDeployed(true);
      setCasting(false);
      setRodBend(3);
      setLineSwing(0);
      addSplash(bx, 47.5);
      addRipple(bx, 47.5);

      setGameState('waiting');
      stateRef.current = 'waiting';

      // Fish nibble sequence
      const nibbleDelay = 3000 + Math.random() * 4000;
      addTimer(() => {
        setGameState('nibble');
        stateRef.current = 'nibble';
        setBobberPos(prev => ({ ...prev, y: prev.y + 0.8 }));
        addRipple(bobberRef.current.x, 47.5);

        addTimer(() => {
          setGameState('bite');
          stateRef.current = 'bite';
          setBobberPos(prev => ({ ...prev, y: prev.y + 2 }));
          setRodBend(6);
          addRipple(bobberRef.current.x, 47.5);
          addSplash(bobberRef.current.x, 47.5);

          // Miss window: 2.5 seconds
          addTimer(() => {
            if (stateRef.current === 'bite') {
              setGameState('missed');
              stateRef.current = 'missed';
              setBobberDeployed(false);
              setRodBend(0);
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
    clearTimers();
    setGameState('reeling');
    stateRef.current = 'reeling';
    setRodBend(18);

    addTimer(() => {
      const caughtFish = fishRef.current.find(f => f.id === 1);
      const species = caughtFish?.species ?? 'bass';
      const name = SPECIES_NAMES[species];
      const time = new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
      const quip = CATCH_QUIPS[Math.floor(Math.random() * CATCH_QUIPS.length)];
      setCatchLog(prev => [{ species: name, time, quip }, ...prev.slice(0, 4)]);
      setCatchCount(n => n + 1);
      setBobberDeployed(false);
      setRodBend(0);
      setGameState('caught');
      stateRef.current = 'caught';
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
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#030810' }}>
      {/* === SVG SCENE === */}
      <svg ref={svgRef} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full" style={{ display:'block' }}>
        <defs>
          {/* Water turbulence filter */}
          <filter id="fsc-water" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.06" numOctaves="4" result="noise" seed="7">
              <animate attributeName="seed" values="7;14;7" dur="12s" repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          {/* Glow filter */}
          <filter id="fsc-glow">
            <feGaussianBlur stdDeviation="1.2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="fsc-softglow">
            <feGaussianBlur stdDeviation="0.8" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Gradients */}
          <linearGradient id="fsc-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#01060f"/>
            <stop offset="40%" stopColor="#030d1e"/>
            <stop offset="75%" stopColor="#061524"/>
            <stop offset="100%" stopColor="#091e2e"/>
          </linearGradient>
          <linearGradient id="fsc-water-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#061c2a"/>
            <stop offset="30%" stopColor="#041420"/>
            <stop offset="100%" stopColor="#010810"/>
          </linearGradient>
          <radialGradient id="fsc-moon-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(200,220,255,0.25)"/>
            <stop offset="60%" stopColor="rgba(100,150,255,0.06)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </radialGradient>
          <radialGradient id="fsc-caustic-1" cx="30%" cy="40%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.12)"/>
            <stop offset="100%" stopColor="rgba(34,211,238,0)"/>
          </radialGradient>
          <radialGradient id="fsc-caustic-2" cx="70%" cy="60%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.09)"/>
            <stop offset="100%" stopColor="rgba(34,211,238,0)"/>
          </radialGradient>
          <linearGradient id="fsc-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(220,220,220,0.7)"/>
            <stop offset="100%" stopColor="rgba(180,180,180,0.3)"/>
          </linearGradient>
          <clipPath id="fsc-water-clip">
            <rect x="0" y="46" width="100" height="54"/>
          </clipPath>
          <clipPath id="fsc-sky-clip">
            <rect x="0" y="0" width="100" height="47"/>
          </clipPath>
        </defs>

        {/* Sky */}
        <rect width="100" height="100" fill="url(#fsc-sky)"/>

        {/* Stars */}
        {[
          [4,3],[12,6],[22,4],[35,2],[48,7],[60,3],[74,5],[88,4],[94,8],
          [7,14],[19,10],[31,17],[44,12],[57,16],[69,11],[82,15],[96,13],
          [3,24],[15,28],[27,22],[39,26],[52,20],[65,25],[78,21],[91,27],
          [10,35],[23,33],[37,38],[50,31],[63,36],[77,32],[89,37],[97,34],
          [6,43],[18,40],[30,44],[43,41],[56,45],[68,42],[80,46],[93,43],
        ].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r={i%5===0?0.35:i%3===0?0.25:0.18}
            fill="white" opacity={i%7===0?0.95:i%4===0?0.75:0.5}>
            <animate attributeName="opacity"
              values={`${i%3===0?0.8:0.4};${i%3===0?0.15:0.08};${i%3===0?0.8:0.4}`}
              dur={`${2.5+(i%7)*0.9}s`} begin={`${(i*0.41)%5}s`} repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </circle>
        ))}

        {/* Moon aura */}
        <circle cx="80" cy="12" r="14" fill="url(#fsc-moon-glow)"/>
        {/* Moon */}
        <circle cx="80" cy="12" r="5.5" fill="#e8eef8" filter="url(#fsc-softglow)" opacity="0.95"/>
        <circle cx="82.2" cy="10.5" r="4.9" fill="#030d1e"/>
        {/* Moon craters */}
        <circle cx="78.5" cy="14" r="0.6" fill="rgba(0,0,0,0.15)"/>
        <circle cx="76.5" cy="11.5" r="0.4" fill="rgba(0,0,0,0.12)"/>

        {/* Milky way band */}
        <ellipse cx="50" cy="25" rx="60" ry="8" fill="rgba(120,140,200,0.035)" transform="rotate(-12,50,25)"/>

        {/* Distant mountains */}
        <path d="M0,46 L8,34 L16,40 L24,30 L34,42 L42,28 L52,38 L60,25 L70,36 L80,29 L90,38 L100,32 L100,47 Z"
          fill="#020a14" opacity="0.9"/>
        <path d="M0,47 L5,38 L12,43 L20,36 L30,44 L38,33 L48,42 L55,30 L64,40 L72,34 L82,43 L92,36 L100,41 L100,47 Z"
          fill="#030e1c" opacity="0.95"/>

        {/* Treeline detailed */}
        {Array.from({length:22},(_, i) => {
          const x = i*5; const h = 6+((i*7+3)%5); const w = 3+((i*3)%3);
          const lc = i%3===0?'#040e18':i%3===1?'#050f1a':'#040d17';
          return <polygon key={i} points={`${x},47 ${x+w/2},${47-h} ${x+w},47`} fill={lc}/>;
        })}

        {/* ==== WATER BODY ==== */}
        <rect x="0" y="46.5" width="100" height="53.5" fill="url(#fsc-water-body)"/>

        {/* Caustic light patterns (underwater light refraction) */}
        <g clipPath="url(#fsc-water-clip)" opacity="0.6">
          <ellipse cx="25" cy="82" rx="18" ry="6" fill="url(#fsc-caustic-1)">
            <animate attributeName="cx" values="20;32;20" dur="7s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="7s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </ellipse>
          <ellipse cx="72" cy="75" rx="14" ry="5" fill="url(#fsc-caustic-2)">
            <animate attributeName="cx" values="68;78;68" dur="9s" begin="-3s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </ellipse>
          {/* Caustic ray lines */}
          {[20,40,55,70,85].map((cx,i) => (
            <line key={cx} x1={cx} y1="47" x2={cx+(i%2?3:-3)} y2="95"
              stroke="rgba(34,211,238,0.04)" strokeWidth={1.5+i*0.3}/>
          ))}
        </g>

        {/* Water surface with turbulence filter */}
        <g filter="url(#fsc-water)">
          {/* Deep wave */}
          <path fill="rgba(6,28,42,0.6)">
            <animate attributeName="d"
              values="M0,47.5 Q25,46 50,47.5 Q75,49 100,47.5 L100,100 L0,100 Z;
                      M0,48.2 Q25,46.5 50,48.2 Q75,49.8 100,48.2 L100,100 L0,100 Z;
                      M0,47.5 Q25,46 50,47.5 Q75,49 100,47.5 L100,100 L0,100 Z"
              dur="6s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </path>
          {/* Surface wave highlight */}
          <path fill="rgba(34,211,238,0.08)">
            <animate attributeName="d"
              values="M0,47 Q12,45.8 25,47 Q38,48.2 50,47 Q62,45.8 75,47 Q88,48.2 100,47 L100,48.5 L0,48.5 Z;
                      M0,47.8 Q12,46.5 25,47.8 Q38,49.1 50,47.8 Q62,46.5 75,47.8 Q88,49.1 100,47.8 L100,49.2 L0,49.2 Z;
                      M0,47 Q12,45.8 25,47 Q38,48.2 50,47 Q62,45.8 75,47 Q88,48.2 100,47 L100,48.5 L0,48.5 Z"
              dur="4.2s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </path>
          {/* Surface line */}
          <path stroke="rgba(34,211,238,0.35)" strokeWidth="0.22" fill="none">
            <animate attributeName="d"
              values="M0,47 Q25,45.8 50,47 Q75,48.2 100,47;
                      M0,47.8 Q25,46.5 50,47.8 Q75,49.1 100,47.8;
                      M0,47 Q25,45.8 50,47 Q75,48.2 100,47"
              dur="4.2s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </path>
        </g>

        {/* Moon reflection on water */}
        <g clipPath="url(#fsc-water-clip)">
          <ellipse cx="80" cy="48" rx="3.5" ry="0.8" fill="rgba(220,235,255,0.12)" filter="url(#fsc-softglow)">
            <animate attributeName="rx" values="3;5;3" dur="3.5s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </ellipse>
          <ellipse cx="80" cy="50.5" rx="2" ry="0.5" fill="rgba(220,235,255,0.07)">
            <animate attributeName="rx" values="1.5;3.5;1.5" dur="4s" begin="-1s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          </ellipse>
        </g>

        {/* Moving shimmer strips */}
        <clipPath id="fsc-shimmer-clip"><rect x="0" y="46" width="100" height="54"/></clipPath>
        <g clipPath="url(#fsc-shimmer-clip)">
          <rect x="-25" y="47.5" width="30" height="1.5" rx="0.7"
            fill="rgba(34,211,238,0.12)" opacity="0.7">
            <animate attributeName="x" values="-30;110" dur="7s" repeatCount="indefinite" calcMode="linear"/>
            <animate attributeName="opacity" values="0;0.7;0.7;0" dur="7s" repeatCount="indefinite"/>
          </rect>
          <rect x="-60" y="53" width="45" height="0.8" rx="0.4"
            fill="rgba(34,211,238,0.07)" opacity="0.5">
            <animate attributeName="x" values="-60;110" dur="10s" begin="-4s" repeatCount="indefinite" calcMode="linear"/>
          </rect>
        </g>

        {/* Seabed / floor */}
        <g clipPath="url(#fsc-water-clip)">
          <ellipse cx="10"  cy="101" rx="14" ry="5"   fill="#020912"/>
          <ellipse cx="30"  cy="100" rx="18" ry="5.5" fill="#020810"/>
          <ellipse cx="55"  cy="101" rx="20" ry="6"   fill="#020912"/>
          <ellipse cx="78"  cy="100" rx="16" ry="5.5" fill="#020810"/>
          <ellipse cx="96"  cy="101" rx="10" ry="4.5" fill="#020912"/>

          {/* Seaweed clusters */}
          {[[8,12,'#1a5c35'],[9.5,8,'#145029'],[23,14,'#1f7045'],[42,11,'#1a5c35'],[58,13,'#1f7045'],[74,10,'#145029']].map(([x,h,col],i) => (
            <g key={i}>
              <path d={`M${x},100 Q${Number(x)-2},${100-Number(h)*0.6} ${Number(x)+0.8},${100-Number(h)}`}
                stroke={col as string} strokeWidth="0.85" fill="none" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate"
                  values={`-4,${x},100;4,${x},100;-4,${x},100`} dur={`${3.5+i*0.4}s`} repeatCount="indefinite"
                  calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
              </path>
            </g>
          ))}

          {/* Bubbles */}
          {[12,28,46,64,82].map((bx,i) => (
            <g key={bx}>
              <circle cx={bx} cy="95" r="0.5" fill="none" stroke="rgba(34,211,238,0.5)" strokeWidth="0.18">
                <animate attributeName="cy" values="95;47" dur={`${5+i*1.2}s`} begin={`-${i*1.1}s`} repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.7;0" dur={`${5+i*1.2}s`} begin={`-${i*1.1}s`} repeatCount="indefinite"/>
                <animate attributeName="r" values="0.4;0.85" dur={`${5+i*1.2}s`} begin={`-${i*1.1}s`} repeatCount="indefinite"/>
              </circle>
            </g>
          ))}
        </g>

        {/* ==== FISH (rendered at depth layers) ==== */}
        <g clipPath="url(#fsc-water-clip)">
          {[2,1,0].map(layer =>
            fishPositions.filter(f => f.depth === layer).map(f => (
              <g key={f.id} transform={`translate(${f.x},${f.y})`}
                opacity={layer===2?0.5:layer===1?0.72:0.92}>
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
              <circle key={i} cx={sp.x + dx} cy={47 - Math.abs(dx)*0.6}
                r="0.4" fill="rgba(34,211,238,0.7)">
                <animate attributeName="cy" values={`${47-Math.abs(dx)*0.6};${43-i}`} dur="0.6s" fill="freeze"
                  calcMode="spline" keyTimes="0;1" keySplines="0.25 0.1 0.25 1"/>
                <animate attributeName="opacity" values="0.8;0" dur="0.7s" fill="freeze"/>
              </circle>
            ))}
          </g>
        ))}

        {/* ==== ROD (foreground) ==== */}
        {/* Handle/grip */}
        <rect x="97" y="60" width="3" height="18" rx="1.5" fill="#1a0f08"/>
        <rect x="97.4" y="63" width="2.2" height="10" rx="1.1" fill="#2d1a0a"/>
        {/* Reel */}
        <ellipse cx="98.5" cy="68" rx="1.8" ry="2.2" fill="#252525"/>
        <ellipse cx="98.5" cy="68" rx="1" ry="1.4" fill="#3a3a3a"/>
        <line x1="98.5" y1="66.5" x2="98.5" y2="69.5" stroke="#555" strokeWidth="0.4"/>
        <line x1="97" y1="68" x2="100" y2="68" stroke="#555" strokeWidth="0.4"/>
        {/* Rod sections */}
        <line x1="98" y1="60" x2={92 + rodBend * 0.3} y2={48 + rodBend * 0.2}
          stroke="#3d2010" strokeWidth="2.5" strokeLinecap="round"
          style={{ transition: 'all 0.4s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        <line x1={92 + rodBend * 0.3} y1={48 + rodBend * 0.2}
              x2={84 + rodBend * 0.5} y2={34 + rodBend * 0.1}
          stroke="#5c3010" strokeWidth="1.6" strokeLinecap="round"
          style={{ transition: 'all 0.4s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        <line x1={84 + rodBend * 0.5} y1={34 + rodBend * 0.1}
              x2={74 + rodBend * 0.7} y2={18}
          stroke="#7a4018" strokeWidth="1.0" strokeLinecap="round"
          style={{ transition: 'all 0.4s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        <line x1={74 + rodBend * 0.7} y1={18} x2={68 + rodBend * 0.8} y2={8}
          stroke="#9b5825" strokeWidth="0.55" strokeLinecap="round"
          style={{ transition: 'all 0.4s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        {/* Line guides */}
        <circle cx={90 + rodBend * 0.35} cy={45 + rodBend * 0.15} r="1" fill="none" stroke="#666" strokeWidth="0.35"/>
        <circle cx={82 + rodBend * 0.55} cy={31 + rodBend * 0.05} r="0.8" fill="none" stroke="#666" strokeWidth="0.3"/>
        <circle cx={76 + rodBend * 0.65} cy={20} r="0.65" fill="none" stroke="#777" strokeWidth="0.25"/>

        {/* Fishing line */}
        {bobberDeployed ? (
          <path
            d={`M${68 + rodBend * 0.8},8 Q${(68+bx)/2 + lineSwing},${(8+by)/2 - 4} ${bx},${by}`}
            stroke="url(#fsc-line)" strokeWidth="0.18" fill="none"
            style={{ transition: 'all 0.5s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        ) : (
          <path
            d={`M${68 + rodBend * 0.8},8 Q${68 + rodBend * 0.6 + lineSwing},28 ${66 + lineSwing},46`}
            stroke="url(#fsc-line)" strokeWidth="0.18" fill="none"
            style={{ transition: 'all 0.4s cubic-bezier(0.25,0.1,0.25,1)' }}/>
        )}

        {/* ==== BOBBER ==== */}
        {bobberDeployed && (
          <g transform={`translate(${bx},${by})`}
            style={{ transition: 'transform 0.5s cubic-bezier(0.25,0.1,0.25,1)' }}>
            {/* Water ring at bobber base */}
            <ellipse cx="0" cy="0.2" rx="2.2" ry="0.7" fill="none"
              stroke="rgba(34,211,238,0.25)" strokeWidth="0.18"/>

            {/* Submerged bottom (white) */}
            <ellipse cx="0" cy="0.85" rx="1.35" ry="1.05" fill="white" opacity="0.92"/>
            {/* Above water top (red) */}
            <ellipse cx="0" cy="-0.2" rx="1.35" ry="1.05" fill="#c41e1e"/>
            {/* Cork texture ring */}
            <ellipse cx="0" cy="-0.2" rx="1.35" ry="1.05" fill="none"
              stroke="rgba(180,80,80,0.5)" strokeWidth="0.35"/>
            {/* Center divider */}
            <rect x="-1.38" y="-0.12" width="2.76" height="0.22" fill="rgba(0,0,0,0.3)"/>
            {/* Antenna */}
            <line x1="0" y1="-1.28" x2="0" y2="-0.25" stroke="#444" strokeWidth="0.22"/>
            <circle cx="0" cy="-1.38" r="0.2" fill="#f59e0b"/>
            {/* Antenna glow in bite state */}
            {inBite && (
              <circle cx="0" cy="-1.38" r="0.5" fill="#f59e0b" opacity="0.6">
                <animate attributeName="r" values="0.5;1.2;0.5" dur="0.4s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="0.4s" repeatCount="indefinite"/>
              </circle>
            )}
            {/* Idle bob */}
            {gameState === 'waiting' && (
              <animateTransform attributeName="transform" type="translate"
                values="0,0;0,0.55;0,0" dur="3s" repeatCount="indefinite" additive="sum"
                calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
            )}
            {/* Nibble bob */}
            {inNibble && (
              <animateTransform attributeName="transform" type="translate"
                values="0,0;0,1.2;0,-0.3;0,0" dur="0.7s" repeatCount="indefinite" additive="sum"
                calcMode="spline" keyTimes="0;0.35;0.7;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
            )}
            {/* Bite plunge */}
            {inBite && (
              <animateTransform attributeName="transform" type="translate"
                values="0,0;0,2;0,1.5;0,2" dur="0.5s" repeatCount="indefinite" additive="sum"
                calcMode="spline" keyTimes="0;0.3;0.6;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
            )}
          </g>
        )}

        {/* STRIKE! alert */}
        {inBite && (
          <g>
            <text x="50" y="32" fontSize="5.5" fontWeight="bold" fontFamily="monospace"
              fill="#f59e0b" textAnchor="middle" filter="url(#fsc-glow)">
              STRIKE!
              <animate attributeName="opacity" values="1;0.3;1" dur="0.35s" repeatCount="indefinite"/>
            </text>
            <text x="50" y="38" fontSize="2" fontFamily="monospace" fill="rgba(255,255,255,0.6)" textAnchor="middle">
              TAP STRIKE TO SET THE HOOK
            </text>
          </g>
        )}

        {/* Casting arc trace */}
        {casting && (
          <path d={`M${68},8 Q${50},20 ${68},47`}
            stroke="rgba(255,255,255,0.3)" strokeWidth="0.25" fill="none" strokeDasharray="2,1.5">
            <animate attributeName="opacity" values="0;0.5;0" dur="0.9s" fill="freeze"/>
          </path>
        )}

        {/* Reeling animation */}
        {gameState === 'reeling' && (
          <g>
            <text x="50" y="35" fontSize="3.5" fontFamily="monospace" fill="#22d3ee" textAnchor="middle">
              REELING...
              <animate attributeName="opacity" values="1;0.4;1" dur="0.25s" repeatCount="indefinite"/>
            </text>
          </g>
        )}

        {/* Caught animation */}
        {gameState === 'caught' && (
          <g>
            <text x="50" y="30" fontSize="4.5" fontWeight="bold" fontFamily="monospace"
              fill="#22d3ee" textAnchor="middle" filter="url(#fsc-glow)">
              CAUGHT!
              <animate attributeName="opacity" values="0;1;1;0" dur="2s" fill="freeze"
                calcMode="spline" keyTimes="0;0.1;0.8;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
            </text>
            {/* Celebration sparkles */}
            {[-8,-4,0,4,8].map((dx,i) => (
              <circle key={i} cx={50+dx} cy={34} r="0.6" fill="#f59e0b">
                <animate attributeName="cy" values="34;20" dur={`${0.6+i*0.1}s`} fill="freeze"
                  calcMode="spline" keyTimes="0;1" keySplines="0.25 0.1 0.25 1"/>
                <animate attributeName="opacity" values="0.9;0" dur={`${0.7+i*0.1}s`} fill="freeze"/>
              </circle>
            ))}
          </g>
        )}

        {/* Missed */}
        {gameState === 'missed' && (
          <text x="50" y="34" fontSize="3.5" fontFamily="monospace" fill="#ef4444" textAnchor="middle">
            MISSED
            <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" fill="freeze"
              calcMode="spline" keyTimes="0;0.1;0.7;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"/>
          </text>
        )}
      </svg>

      {/* === UI OVERLAY === */}
      {showUI && (
        <>
          {/* Depth finder (top left of scene) */}
          <div className="absolute top-4 left-4 font-mono text-[10px]"
            style={{ color:'rgba(34,211,238,0.6)' }}>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"/>
              <span className="tracking-widest">DEPTH FINDER</span>
            </div>
            <div className="border border-teal-400/20 p-1.5" style={{ background:'rgba(0,0,0,0.5)' }}>
              {fishPositions.slice(0,3).map(f => (
                <div key={f.id} className="flex items-center gap-2 leading-tight">
                  <span style={{ color: f.depth===0?'#22d3ee':f.depth===1?'#86efac':'#a78bfa', opacity: f.targeting?1:0.5 }}>
                    {f.targeting ? '▶' : '·'}
                  </span>
                  <span style={{ color: f.targeting?'rgba(34,211,238,0.9)':'rgba(34,211,238,0.4)' }}>
                    {SPECIES_NAMES[f.species]} {f.depth===0?'SHALLOW':f.depth===1?'MID':'DEEP'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Catch counter (top right) */}
          <div className="absolute top-4 right-4 text-right font-mono">
            <div className="text-[9px] tracking-widest text-slate-500">SESSION CATCH</div>
            <div className="text-3xl font-black" style={{ fontFamily:'Bebas Neue,sans-serif', color: catchCount>0?'#f59e0b':'rgba(255,255,255,0.15)' }}>
              {catchCount.toString().padStart(2,'0')}
            </div>
          </div>

          {/* Game controls (bottom center) */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            {/* State label */}
            <div className="text-[9px] font-mono tracking-[0.2em] text-slate-500 uppercase">
              {gameState === 'ready'   ? 'READY TO CAST' :
               gameState === 'casting' ? 'CASTING...' :
               gameState === 'waiting' ? 'WAITING FOR STRIKE' :
               gameState === 'nibble'  ? 'FISH APPROACHING' :
               gameState === 'bite'    ? 'FISH ON THE LINE' :
               gameState === 'reeling' ? 'REELING...' :
               gameState === 'caught'  ? 'FISH CAUGHT' : 'FISH ESCAPED'}
            </div>

            <div className="flex gap-3 items-center">
              <AnimatePresence mode="wait">
                {gameState === 'ready' && (
                  <motion.button key="cast"
                    initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }}
                    transition={{ duration:0.18, ease:[0.25,0.1,0.25,1] }}
                    onClick={doCast}
                    className="px-8 py-3 font-black font-mono tracking-[0.25em] text-xs border transition-all"
                    style={{ background:'#f59e0b', color:'#000', border:'none', cursor:'pointer' }}
                    whileHover={{ scale:1.04, backgroundColor:'#fbbf24' }}
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
                    style={{ background:'#22d3ee', color:'#000', border:'none', cursor:'pointer' }}
                    animate={{ scale:[1,1.04,1] }}
                    transition={{ duration:0.3, repeat:Infinity }}>
                    STRIKE!
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Waiting indicator */}
              {(gameState === 'waiting' || gameState === 'nibble' || gameState === 'casting' || gameState === 'reeling') && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex gap-1 items-center">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-400"
                      style={{ animation:`pulse 1s ${i*0.2}s infinite` }}/>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Catch log (bottom left) */}
          {catchLog.length > 0 && (
            <div className="absolute bottom-4 left-4 font-mono max-w-48">
              <div className="text-[8px] tracking-widest text-slate-600 mb-1">CATCH LOG</div>
              <div className="space-y-1">
                {catchLog.slice(0,3).map((entry, i) => (
                  <motion.div key={i}
                    initial={{ opacity:0, x:-8 }} animate={{ opacity:1-i*0.25, x:0 }}
                    transition={{ duration:0.3, ease:[0.25,0.1,0.25,1] }}
                    className="text-[9px] border-l-2 pl-1.5"
                    style={{ borderColor: i===0?'#f59e0b':'rgba(255,255,255,0.1)', color: i===0?'rgba(245,158,11,0.8)':'rgba(255,255,255,0.3)' }}>
                    <div>{entry.species}</div>
                    <div style={{ color: i===0?'rgba(34,211,238,0.6)':'rgba(255,255,255,0.18)', fontSize:8 }}>{entry.quip}</div>
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
