import React, { useState, useCallback, useEffect, useRef } from 'react';

const FISH = [
  { id:1, y:63, dur:'16s', size:1.4, color:'#22d3ee', begin:'0s', dir:1 },
  { id:2, y:75, dur:'26s', size:0.9, color:'#34d399', begin:'-8s', dir:-1 },
  { id:3, y:57, dur:'20s', size:1.1, color:'#f59e0b', begin:'-4s', dir:1 },
  { id:4, y:84, dur:'36s', size:0.65, color:'#60a5fa', begin:'-14s', dir:-1 },
  { id:5, y:70, dur:'13s', size:1.7, color:'#fb923c', begin:'-2s', dir:1 },
  { id:6, y:91, dur:'30s', size:0.5, color:'#a78bfa', begin:'-20s', dir:-1 },
  { id:7, y:67, dur:'22s', size:0.8, color:'#86efac', begin:'-10s', dir:1 },
];

function Fish({ y, dur, size, color, begin, dir }: { y:number; dur:string; size:number; color:string; begin:string; dir:number }) {
  const sx = dir === 1 ? size*2.8 : -size*2.8;
  const sy = size*2.8;
  const startX = dir === 1 ? -18 : 118;
  const endX   = dir === 1 ? 118 : -18;
  return (
    <g style={{ animation: `none` }}>
      <animateTransform attributeName="transform" type="translate"
        values={`${startX},0 ${endX},0`} dur={dur} begin={begin} repeatCount="indefinite"
        calcMode="linear" additive="replace"
      />
      <g transform={`translate(0,${y}) scale(${sx},${sy})`}>
        <ellipse cx="0" cy="0" rx="1" ry="0.38" fill={color} opacity="0.92"/>
        <polygon points="-1.2,-0.3 -1.2,0.3 -1.85,0" fill={color} opacity="0.72"/>
        <polygon points="-0.05,-0.38 0.35,-0.38 0.22,-0.65" fill={color} opacity="0.55"/>
        <polygon points="0.1,0 0.38,0.34 0.04,0.34" fill={color} opacity="0.45"/>
        <circle cx="0.65" cy="-0.05" r="0.1" fill="rgba(0,0,0,0.65)"/>
        <circle cx="0.67" cy="-0.07" r="0.035" fill="white"/>
      </g>
    </g>
  );
}

function Weed({ x, h, color, delay }: { x:number; h:number; color:string; delay:string }) {
  return (
    <g>
      <path d={`M${x},100 Q${x-2},${100-h*0.55} ${x+0.8},${100-h}`}
        stroke={color} strokeWidth="0.9" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate"
          values={`-5,${x},100;5,${x},100;-5,${x},100`} dur="3.5s" begin={delay} repeatCount="indefinite"/>
      </path>
      <path d={`M${x},100 Q${x+2.2},${100-h*0.4} ${x-0.6},${100-h*0.85}`}
        stroke={color} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.65">
        <animateTransform attributeName="transform" type="rotate"
          values={`4,${x},100;-4,${x},100;4,${x},100`} dur="4.2s" begin={delay} repeatCount="indefinite"/>
      </path>
    </g>
  );
}

export default function FishingScene({ compact = false }: { compact?: boolean }) {
  const [bobber, setBobber] = useState<'idle'|'dip'|'strike'>('idle');
  const [strikes, setStrikes] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>|null>(null);

  const doBobberClick = useCallback(() => {
    if (bobber !== 'idle') return;
    setBobber('dip');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setBobber('strike');
      timerRef.current = setTimeout(() => {
        setBobber('idle');
        setStrikes(s => s + 1);
      }, 950);
    }, 1100);
  }, [bobber]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const bobY = bobber === 'dip' ? 50 : 47.2;

  return (
    <div className="w-full h-full select-none overflow-hidden" style={{ background: '#050d1a', cursor: 'default' }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="w-full h-full" style={{ display:'block' }}>
        <defs>
          <linearGradient id="fssky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#030811"/>
            <stop offset="55%" stopColor="#051525"/>
            <stop offset="100%" stopColor="#071e30"/>
          </linearGradient>
          <linearGradient id="fswater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#061d2c"/>
            <stop offset="100%" stopColor="#020c14"/>
          </linearGradient>
          <linearGradient id="fsglow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(34,211,238,0)"/>
            <stop offset="50%" stopColor="rgba(34,211,238,0.13)"/>
            <stop offset="100%" stopColor="rgba(34,211,238,0)"/>
          </linearGradient>
          <radialGradient id="moonglow">
            <stop offset="0%" stopColor="rgba(200,220,255,0.18)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </radialGradient>
          <clipPath id="wclip"><rect x="0" y="46" width="100" height="54"/></clipPath>
        </defs>

        {/* Sky */}
        <rect width="100" height="100" fill="url(#fssky)"/>

        {/* Moon aura */}
        <circle cx="82" cy="13" r="12" fill="url(#moonglow)"/>
        {/* Moon */}
        <circle cx="82" cy="13" r="5" fill="#dde8f5" opacity="0.92"/>
        <circle cx="84.2" cy="11.5" r="4.3" fill="#051525"/>

        {/* Stars */}
        {[
          [6,4,.28],[18,7,.22],[30,3,.3],[45,8,.2],[58,5,.28],[70,9,.22],[88,6,.3],
          [12,18,.2],[26,13,.25],[40,20,.18],[55,15,.22],[68,22,.2],[80,17,.28],[94,20,.22],
          [5,30,.18],[35,32,.22],[60,28,.2],[85,33,.25],[22,37,.18],[72,35,.2]
        ].map(([cx,cy,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity="0.55">
            <animate attributeName="opacity" values="0.25;0.85;0.25"
              dur={`${2.2+(i%5)*0.8}s`} begin={`${(i*0.37)%4}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        {/* Distant horizon glow */}
        <ellipse cx="50" cy="46" rx="45" ry="4" fill="rgba(34,211,238,0.04)"/>

        {/* Treeline */}
        {[0,6,12,18,24,30,36,42,48,54,60,66,72,78,84,90,96].map((x,i) => {
          const h = 5 + (i*7)%5;
          const w = 4+(i*3)%3;
          return <polygon key={x} points={`${x},46.5 ${x+w/2},${46.5-h} ${x+w},46.5`}
            fill={i%2===0?'#061726':'#050f1e'}/>;
        })}

        {/* Water body */}
        <rect x="0" y="46" width="100" height="54" fill="url(#fswater)"/>

        {/* Surface shimmer */}
        <rect x="-30" y="46.8" width="45" height="1.8" fill="url(#fsglow)" opacity="0.65">
          <animate attributeName="x" values="-30;110" dur="5.5s" repeatCount="indefinite"/>
        </rect>
        <rect x="-70" y="53" width="55" height="1.2" fill="url(#fsglow)" opacity="0.35">
          <animate attributeName="x" values="-70;110" dur="8s" begin="-3s" repeatCount="indefinite"/>
        </rect>

        {/* Water surface wave */}
        <path fill="rgba(34,211,238,0.07)">
          <animate attributeName="d"
            values="M0,47 Q13,45.3 26,47 Q39,48.7 52,47 Q65,45.3 78,47 Q91,48.7 100,47 L100,46 L0,46Z;
                    M0,47.7 Q13,46 26,47.7 Q39,49.3 52,47.7 Q65,46 78,47.7 Q91,49.3 100,47.7 L100,46 L0,46Z;
                    M0,47 Q13,45.3 26,47 Q39,48.7 52,47 Q65,45.3 78,47 Q91,48.7 100,47 L100,46 L0,46Z"
            dur="4.5s" repeatCount="indefinite"/>
        </path>
        <path stroke="rgba(34,211,238,0.32)" strokeWidth="0.28" fill="none">
          <animate attributeName="d"
            values="M0,47 Q13,45.5 26,47 Q39,48.5 52,47 Q65,45.5 78,47 Q91,48.5 100,47;
                    M0,47.8 Q13,46.2 26,47.8 Q39,49.3 52,47.8 Q65,46.2 78,47.8 Q91,49.3 100,47.8;
                    M0,47 Q13,45.5 26,47 Q39,48.5 52,47 Q65,45.5 78,47 Q91,48.5 100,47"
            dur="4.5s" repeatCount="indefinite"/>
        </path>

        {/* Moon reflection on water */}
        <ellipse cx="82" cy="47.8" rx="4" ry="0.7" fill="rgba(210,225,255,0.07)">
          <animate attributeName="rx" values="3.5;5.5;3.5" dur="4s" repeatCount="indefinite"/>
        </ellipse>

        {/* Underwater water light rays */}
        <g clipPath="url(#wclip)" opacity="0.06">
          <polygon points="75,46 78,46 88,100 72,100" fill="#22d3ee"/>
          <polygon points="82,46 85,46 95,100 79,100" fill="#22d3ee"/>
        </g>

        {/* Fish */}
        <g clipPath="url(#wclip)">
          {FISH.map(f => <Fish key={f.id} {...f}/>)}
        </g>

        {/* Seaweed clusters */}
        <Weed x={8}  h={9}  color="#1a5c3a" delay="0s"/>
        <Weed x={9.5} h={6} color="#165232" delay="-1.2s"/>
        <Weed x={22} h={12} color="#1f7a4a" delay="-0.7s"/>
        <Weed x={23.5} h={8} color="#1a5c3a" delay="-2s"/>
        <Weed x={42} h={11} color="#196840" delay="-1.5s"/>
        <Weed x={43.5} h={7} color="#1f7a4a" delay="-0.3s"/>
        <Weed x={60} h={13} color="#1a5c3a" delay="-0.9s"/>
        <Weed x={61.5} h={8} color="#165232" delay="-2.5s"/>

        {/* Floor */}
        <ellipse cx="5"  cy="100" rx="8"  ry="3.5" fill="#040c1a"/>
        <ellipse cx="20" cy="101" rx="12" ry="4.5" fill="#030a16"/>
        <ellipse cx="40" cy="100" rx="9"  ry="3.5" fill="#040c1a"/>
        <ellipse cx="62" cy="101" rx="13" ry="5"   fill="#030a16"/>
        <ellipse cx="82" cy="100" rx="10" ry="4"   fill="#040c1a"/>
        <ellipse cx="97" cy="101" rx="7"  ry="3"   fill="#030a16"/>

        {/* Bubbles */}
        {[10,28,50,72,90].map((bx,i)=>(
          <circle key={bx} cx={bx} cy="95" r="0.55" fill="none"
            stroke="rgba(34,211,238,0.38)" strokeWidth="0.18">
            <animate attributeName="cy" values="95;47" dur={`${4.5+i}s`} begin={`${i*0.9}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;0" dur={`${4.5+i}s`} begin={`${i*0.9}s`} repeatCount="indefinite"/>
            <animate attributeName="r" values="0.4;0.9" dur={`${4.5+i}s`} begin={`${i*0.9}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        {/* === FISHING ROD === */}
        {/* Arm/grip */}
        <line x1="100" y1="58" x2="93" y2="46" stroke="#3b2010" strokeWidth="3" strokeLinecap="round"/>
        {/* Cork grip */}
        <ellipse cx="93" cy="46" rx="2.2" ry="1.4" fill="#c8a070" transform="rotate(-38,93,46)"/>
        {/* Rod lower */}
        <line x1="93" y1="46" x2="81" y2="28" stroke="#7a4f25" strokeWidth="2" strokeLinecap="round"/>
        {/* Rod mid */}
        <line x1="81" y1="28" x2="71" y2="14" stroke="#9b6835" strokeWidth="1.3" strokeLinecap="round"/>
        {/* Rod tip */}
        <line x1="71" y1="14" x2="68.5" y2="9" stroke="#b48c5a" strokeWidth="0.75" strokeLinecap="round"/>
        {/* Reel */}
        <circle cx="89" cy="39" r="2.2" fill="#252525"/>
        <circle cx="89" cy="39" r="1.3" fill="#3a3a3a"/>
        <line x1="89" y1="37.8" x2="89" y2="40.2" stroke="#555" strokeWidth="0.45"/>
        <line x1="87.8" y1="39" x2="90.2" y2="39" stroke="#555" strokeWidth="0.45"/>
        {/* Guide rings */}
        <circle cx="84" cy="33" r="1.1" fill="none" stroke="#888" strokeWidth="0.42"/>
        <circle cx="77" cy="22" r="0.85" fill="none" stroke="#888" strokeWidth="0.36"/>
        <circle cx="73" cy="16" r="0.65" fill="none" stroke="#999" strokeWidth="0.3"/>
        <circle cx="70" cy="11" r="0.5"  fill="none" stroke="#999" strokeWidth="0.26"/>

        {/* Fishing line */}
        <path d={`M68.5,9 Q68,28 68,${bobY}`}
          stroke="rgba(230,230,230,0.6)" strokeWidth="0.18" fill="none"/>

        {/* Bobber */}
        <g transform={`translate(68,${bobY})`}
          onClick={doBobberClick}
          style={{ cursor: bobber==='idle'?'pointer':'default' }}>

          {/* Water line on bobber */}
          <line x1="-1.5" y1="0" x2="1.5" y2="0" stroke="rgba(34,211,238,0.4)" strokeWidth="0.25"/>

          {/* Submerged white half */}
          <ellipse cx="0" cy="0.75" rx="1.2" ry="0.95" fill="white" opacity="0.95"/>
          {/* Above water red half */}
          <ellipse cx="0" cy="-0.18" rx="1.2" ry="0.95" fill="#dc2626"/>
          {/* Center stripe */}
          <rect x="-1.22" y="-0.12" width="2.44" height="0.22" fill="rgba(0,0,0,0.22)"/>
          {/* Antenna */}
          <line x1="0" y1="-1.15" x2="0" y2="-0.2" stroke="#555" strokeWidth="0.22"/>
          <circle cx="0" cy="-1.22" r="0.17" fill="#dc2626"/>

          {/* Bobber idle bob */}
          {bobber === 'idle' && (
            <animateTransform attributeName="transform" type="translate"
              values="0,0;0,0.55;0,0" dur="3s" repeatCount="indefinite" additive="sum"/>
          )}

          {/* Hint ripple ring */}
          {bobber === 'idle' && (
            <circle cx="0" cy="0" r="2" fill="none" stroke="rgba(34,211,238,0.22)" strokeWidth="0.28">
              <animate attributeName="r" values="1.4;4" dur="2.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.55;0" dur="2.2s" repeatCount="indefinite"/>
            </circle>
          )}

          {/* Strike flash */}
          {bobber === 'strike' && (
            <circle cx="0" cy="0" r="3" fill="rgba(245,158,11,0.3)">
              <animate attributeName="r" values="2;7" dur="0.9s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;0" dur="0.9s" fill="freeze"/>
            </circle>
          )}
        </g>

        {/* Dip ripples */}
        {(bobber==='dip'||bobber==='strike') && <>
          <ellipse cx="68" cy="47.2" rx="1" ry="0.4" fill="none" stroke="rgba(34,211,238,0.55)" strokeWidth="0.32">
            <animate attributeName="rx" values="0.8;6" dur="1.4s" fill="freeze"/>
            <animate attributeName="ry" values="0.3;1.4" dur="1.4s" fill="freeze"/>
            <animate attributeName="opacity" values="0.7;0" dur="1.4s" fill="freeze"/>
          </ellipse>
          <ellipse cx="68" cy="47.2" rx="0.5" ry="0.25" fill="none" stroke="rgba(34,211,238,0.38)" strokeWidth="0.22">
            <animate attributeName="rx" values="0.5;4" dur="1.8s" begin="0.3s" fill="freeze"/>
            <animate attributeName="ry" values="0.2;0.9" dur="1.8s" begin="0.3s" fill="freeze"/>
            <animate attributeName="opacity" values="0.5;0" dur="1.8s" begin="0.3s" fill="freeze"/>
          </ellipse>
        </>}

        {/* Strike label */}
        {bobber === 'strike' && (
          <text x="60" y="38" fontSize="3.5" fill="#f59e0b" textAnchor="middle"
            fontFamily="monospace" fontWeight="bold">
            🎣 STRIKE!
            <animate attributeName="opacity" values="0;1;1;0" dur="0.9s" fill="freeze"/>
          </text>
        )}

        {/* Tap hint */}
        {bobber === 'idle' && (
          <text x="57" y="43.5" fontSize="1.65" fill="rgba(34,211,238,0.45)"
            textAnchor="middle" fontFamily="monospace">click bobber</text>
        )}

        {/* Strike counter */}
        {strikes > 0 && (
          <text x="4" y="52" fontSize="1.6" fill="rgba(245,158,11,0.6)" fontFamily="monospace">
            🐟 ×{strikes}
          </text>
        )}
      </svg>
    </div>
  );
}
