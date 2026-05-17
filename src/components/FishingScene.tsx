import React, { useState, useCallback } from 'react';

const FISH_DATA = [
  { id: 1, yPct: 62, animDur: '18s', size: 1.3, fillColor: '#22d3ee', delay: '0s', dir: 1 },
  { id: 2, yPct: 74, animDur: '28s', size: 0.85, fillColor: '#34d399', delay: '-7s', dir: -1 },
  { id: 3, yPct: 55, animDur: '22s', size: 1.05, fillColor: '#f59e0b', delay: '-3s', dir: 1 },
  { id: 4, yPct: 83, animDur: '38s', size: 0.65, fillColor: '#38bdf8', delay: '-12s', dir: -1 },
  { id: 5, yPct: 68, animDur: '14s', size: 1.6, fillColor: '#fb923c', delay: '-5s', dir: 1 },
  { id: 6, yPct: 90, animDur: '32s', size: 0.5, fillColor: '#a78bfa', delay: '-18s', dir: -1 },
];

function FishShape({ x, y, size, fill, flipped }: { x: number; y: number; size: number; fill: string; flipped: boolean }) {
  const scale = size * 2.5;
  const sx = flipped ? -scale : scale;
  return (
    <g transform={`translate(${x},${y}) scale(${sx},${scale})`}>
      {/* Body */}
      <ellipse cx="0" cy="0" rx="1" ry="0.4" fill={fill} opacity="0.9" />
      {/* Tail */}
      <polygon points="-1.2,-0.35 -1.2,0.35 -1.8,0" fill={fill} opacity="0.75" />
      {/* Dorsal fin */}
      <polygon points="-0.1,-0.4 0.3,-0.4 0.2,-0.7" fill={fill} opacity="0.6" />
      {/* Eye */}
      <circle cx="0.65" cy="-0.05" r="0.1" fill="rgba(0,0,0,0.6)" />
      <circle cx="0.68" cy="-0.07" r="0.04" fill="white" />
      {/* Pectoral fin */}
      <polygon points="0.1,0 0.4,0.35 0.0,0.35" fill={fill} opacity="0.5" />
    </g>
  );
}

function SeaweedBlade({ x, baseY, height, color, delay }: { x: number; baseY: number; height: number; color: string; delay: string }) {
  const animId = `sw-${x}-${baseY}`;
  return (
    <g>
      <path
        d={`M${x},${baseY} Q${x - 1.5},${baseY - height * 0.5} ${x + 0.5},${baseY - height}`}
        stroke={color}
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform attributeName="transform" type="rotate"
          values={`-4,${x},${baseY};4,${x},${baseY};-4,${x},${baseY}`}
          dur="3s"
          begin={delay}
          repeatCount="indefinite"
        />
      </path>
      <path
        d={`M${x},${baseY} Q${x + 2},${baseY - height * 0.4} ${x - 0.5},${baseY - height * 0.8}`}
        stroke={color}
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      >
        <animateTransform attributeName="transform" type="rotate"
          values={`3,${x},${baseY};-3,${x},${baseY};3,${x},${baseY}`}
          dur="4s"
          begin={delay}
          repeatCount="indefinite"
        />
      </path>
    </g>
  );
}

export default function FishingScene() {
  const [bobberState, setBobberState] = useState<'float' | 'dip' | 'catch'>('float');
  const [ripples, setRipples] = useState<number[]>([]);

  const handleBobberClick = useCallback(() => {
    if (bobberState !== 'float') return;
    setBobberState('dip');
    setRipples(prev => [...prev, Date.now()]);
    setTimeout(() => {
      setBobberState('catch');
      setTimeout(() => {
        setBobberState('float');
        setRipples([]);
      }, 900);
    }, 1100);
  }, [bobberState]);

  const bobberY = bobberState === 'dip' ? 49.5 : bobberState === 'catch' ? 47.5 : 47;
  const lineEndY = bobberY;

  return (
    <div className="w-full h-full relative select-none overflow-hidden rounded-none" style={{ background: '#060e1a' }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050d1a" />
            <stop offset="60%" stopColor="#061728" />
            <stop offset="100%" stopColor="#082036" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#062030" />
            <stop offset="100%" stopColor="#020d18" />
          </linearGradient>
          <linearGradient id="waterShimmer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(34,211,238,0)" />
            <stop offset="50%" stopColor="rgba(34,211,238,0.12)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
          <radialGradient id="moonGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(226,232,240,0.15)" />
            <stop offset="100%" stopColor="rgba(226,232,240,0)" />
          </radialGradient>
          <clipPath id="underwaterClip">
            <rect x="0" y="46.5" width="100" height="53.5" />
          </clipPath>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* SKY */}
        <rect width="100" height="100" fill="url(#skyGrad)" />

        {/* Moon glow */}
        <circle cx="18" cy="14" r="10" fill="url(#moonGlow)" />
        {/* Moon crescent */}
        <circle cx="18" cy="14" r="5" fill="#dde5f0" opacity="0.9" />
        <circle cx="20.5" cy="12.5" r="4.2" fill="#061728" />

        {/* Stars */}
        {[
          [8,5,0.35],[25,8,0.25],[38,4,0.3],[52,7,0.2],[65,3,0.3],[78,9,0.25],[90,5,0.3],
          [5,20,0.2],[32,16,0.3],[48,22,0.2],[60,14,0.25],[82,18,0.2],[95,22,0.3],
          [15,30,0.2],[42,28,0.25],[70,32,0.2],[88,26,0.3],[55,35,0.2],[28,36,0.25]
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity="0.6">
            <animate attributeName="opacity"
              values={`0.3;0.9;0.3`}
              dur={`${2.5 + (i % 5) * 0.7}s`}
              begin={`${(i * 0.4) % 3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Distant trees silhouette */}
        {[0,8,16,24,32,40,48,56,64,72,80,88,96].map((x, i) => {
          const h = 6 + (i % 3) * 2;
          const w = 3 + (i % 2);
          return (
            <g key={x}>
              <polygon
                points={`${x},46 ${x + w / 2},${46 - h} ${x + w},46`}
                fill={i % 2 === 0 ? '#07192a' : '#061525'}
              />
            </g>
          );
        })}

        {/* WATER */}
        <rect x="0" y="46.5" width="100" height="53.5" fill="url(#waterGrad)" />

        {/* Water surface waveline */}
        <path fill="rgba(34,211,238,0.08)">
          <animate attributeName="d"
            values="M0,47 Q12,45.5 25,47 Q38,48.5 50,47 Q62,45.5 75,47 Q88,48.5 100,47 L100,46.5 L0,46.5 Z;
                    M0,47.5 Q12,46 25,47.5 Q38,49 50,47.5 Q62,46 75,47.5 Q88,49 100,47.5 L100,46.5 L0,46.5 Z;
                    M0,47 Q12,45.5 25,47 Q38,48.5 50,47 Q62,45.5 75,47 Q88,48.5 100,47 L100,46.5 L0,46.5 Z"
            dur="4s" repeatCount="indefinite"
          />
        </path>
        <path stroke="rgba(34,211,238,0.35)" strokeWidth="0.3" fill="none">
          <animate attributeName="d"
            values="M0,47 Q12,45.8 25,47 Q38,48.2 50,47 Q62,45.8 75,47 Q88,48.2 100,47;
                    M0,47.8 Q12,46.5 25,47.8 Q38,49 50,47.8 Q62,46.5 75,47.8 Q88,49 100,47.8;
                    M0,47 Q12,45.8 25,47 Q38,48.2 50,47 Q62,45.8 75,47 Q88,48.2 100,47"
            dur="4s" repeatCount="indefinite"
          />
        </path>

        {/* Water shimmer streaks */}
        <g clipPath="url(#underwaterClip)">
          <rect x="-20" y="50" width="30" height="1.5" fill="url(#waterShimmer)" opacity="0.7">
            <animate attributeName="x" values="-20;110" dur="6s" repeatCount="indefinite" />
          </rect>
          <rect x="-60" y="57" width="50" height="1" fill="url(#waterShimmer)" opacity="0.4">
            <animate attributeName="x" values="-60;110" dur="9s" repeatCount="indefinite" begin="-3s" />
          </rect>
        </g>

        {/* FISH */}
        {FISH_DATA.map(fish => {
          const startX = fish.dir === 1 ? -15 : 115;
          const endX = fish.dir === 1 ? 115 : -15;
          const midX = fish.dir === 1 ? 50 : 50;
          return (
            <g key={fish.id} clipPath="url(#underwaterClip)">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`${startX},0;${endX},0`}
                  dur={fish.animDur}
                  begin={fish.delay}
                  repeatCount="indefinite"
                />
                <FishShape
                  x={0}
                  y={fish.yPct}
                  size={fish.size}
                  fill={fish.fillColor}
                  flipped={fish.dir === -1}
                />
              </g>
            </g>
          );
        })}

        {/* SEAWEED */}
        <SeaweedBlade x={12} baseY={100} height={10} color="#1a5c3a" delay="0s" />
        <SeaweedBlade x={13.5} baseY={100} height={7} color="#165233" delay="-1s" />
        <SeaweedBlade x={28} baseY={100} height={13} color="#1f7a4a" delay="-0.5s" />
        <SeaweedBlade x={29.5} baseY={100} height={9} color="#196840" delay="-2s" />
        <SeaweedBlade x={50} baseY={100} height={11} color="#1a5c3a" delay="-1.5s" />
        <SeaweedBlade x={51.5} baseY={100} height={7} color="#1f7a4a" delay="-0.3s" />
        <SeaweedBlade x={72} baseY={100} height={12} color="#165232" delay="-0.8s" />
        <SeaweedBlade x={73.5} baseY={100} height={8} color="#1a5c3a" delay="-2.5s" />

        {/* Rocks/floor */}
        <ellipse cx="5" cy="100" rx="7" ry="3.5" fill="#051020" />
        <ellipse cx="22" cy="101" rx="10" ry="4" fill="#040e1c" />
        <ellipse cx="42" cy="100" rx="8" ry="3" fill="#051020" />
        <ellipse cx="62" cy="101" rx="11" ry="4.5" fill="#040e1c" />
        <ellipse cx="82" cy="100" rx="9" ry="3.5" fill="#051020" />
        <ellipse cx="96" cy="101" rx="6" ry="3" fill="#040e1c" />

        {/* Bottom sand */}
        <rect x="0" y="99" width="100" height="1" fill="#071828" />

        {/* Bubbles */}
        {[14, 29, 52, 74, 88].map((bx, i) => (
          <g key={bx}>
            <circle cx={bx} cy="95" r="0.5" fill="none" stroke="rgba(34,211,238,0.35)" strokeWidth="0.15">
              <animate attributeName="cy" values="95;48" dur={`${4 + i * 0.9}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} />
              <animate attributeName="opacity" values="0.7;0.1" dur={`${4 + i * 0.9}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} />
              <animate attributeName="r" values="0.4;0.8" dur={`${4 + i * 0.9}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} />
            </circle>
          </g>
        ))}

        {/* MOON REFLECTION on water */}
        <ellipse cx="18" cy="48" rx="3" ry="0.6" fill="rgba(220,230,255,0.08)">
          <animate attributeName="rx" values="3;4;3" dur="3s" repeatCount="indefinite" />
        </ellipse>

        {/* FISHING ROD */}
        {/* Arm holding rod */}
        <line x1="100" y1="55" x2="92" y2="45" stroke="#4B3621" strokeWidth="2.5" strokeLinecap="round" />
        {/* Rod body lower */}
        <line x1="92" y1="45" x2="82" y2="30" stroke="#6B4423" strokeWidth="1.8" strokeLinecap="round" />
        {/* Rod body upper (thinner) */}
        <line x1="82" y1="30" x2="72" y2="15" stroke="#8B6543" strokeWidth="1.2" strokeLinecap="round" />
        {/* Rod tip section */}
        <line x1="72" y1="15" x2="69" y2="10" stroke="#A88060" strokeWidth="0.7" strokeLinecap="round" />
        {/* Cork handle */}
        <ellipse cx="93" cy="44" rx="2" ry="1.2" fill="#C8A882" transform="rotate(-40,93,44)" />
        {/* Reel */}
        <circle cx="90" cy="40" r="2" fill="#2a2a2a" />
        <circle cx="90" cy="40" r="1.2" fill="#444" />
        <line x1="90" y1="39" x2="90" y2="41" stroke="#666" strokeWidth="0.4" />
        <line x1="89" y1="40" x2="91" y2="40" stroke="#666" strokeWidth="0.4" />
        {/* Guide rings */}
        <circle cx="85" cy="35" r="1" fill="none" stroke="#888" strokeWidth="0.4" />
        <circle cx="78" cy="24" r="0.8" fill="none" stroke="#888" strokeWidth="0.35" />
        <circle cx="73" cy="17" r="0.6" fill="none" stroke="#888" strokeWidth="0.3" />
        <circle cx="70" cy="12" r="0.45" fill="none" stroke="#999" strokeWidth="0.25" />

        {/* FISHING LINE */}
        <path
          d={`M 69,10 Q 68.5,30 68,${lineEndY}`}
          stroke="rgba(220,220,220,0.65)"
          strokeWidth="0.18"
          fill="none"
        />

        {/* Bobber */}
        <g
          transform={`translate(68,${bobberY})`}
          onClick={handleBobberClick}
          style={{ cursor: bobberState === 'float' ? 'pointer' : 'default' }}
        >
          {/* Float body bottom (white) */}
          <ellipse cx="0" cy="0.6" rx="1.1" ry="0.85" fill="white" opacity="0.95" />
          {/* Float body top (red) */}
          <ellipse cx="0" cy="-0.2" rx="1.1" ry="0.85" fill="#dc2626" />
          {/* Dividing stripe */}
          <rect x="-1.1" y="-0.05" width="2.2" height="0.25" fill="rgba(0,0,0,0.25)" />
          {/* Antenna top */}
          <line x1="0" y1="-1.05" x2="0" y2="-0.2" stroke="#555" strokeWidth="0.2" />
          <circle cx="0" cy="-1.1" r="0.15" fill="#dc2626" />

          {/* Idle bob animation */}
          {bobberState === 'float' && (
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;0,0.5;0,0"
              dur="2.8s"
              repeatCount="indefinite"
            />
          )}

          {/* Hint ring */}
          {bobberState === 'float' && (
            <>
              <circle cx="0" cy="0.2" r="2" fill="none" stroke="rgba(34,211,238,0.25)" strokeWidth="0.25">
                <animate attributeName="r" values="1.5;3.5" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {/* Catch flash */}
          {bobberState === 'catch' && (
            <circle cx="0" cy="0" r="4" fill="rgba(245,158,11,0.25)">
              <animate attributeName="r" values="2;6" dur="0.8s" fill="freeze" />
              <animate attributeName="opacity" values="0.5;0" dur="0.8s" fill="freeze" />
            </circle>
          )}
        </g>

        {/* Ripple when bobber dips */}
        {(bobberState === 'dip' || bobberState === 'catch') && (
          <>
            <ellipse cx="68" cy="47.2" rx="2" ry="0.6" fill="none" stroke="rgba(34,211,238,0.5)" strokeWidth="0.3">
              <animate attributeName="rx" values="1;5" dur="1.2s" fill="freeze" />
              <animate attributeName="ry" values="0.3;1.2" dur="1.2s" fill="freeze" />
              <animate attributeName="opacity" values="0.7;0" dur="1.2s" fill="freeze" />
            </ellipse>
            <ellipse cx="68" cy="47.2" rx="1" ry="0.4" fill="none" stroke="rgba(34,211,238,0.35)" strokeWidth="0.2">
              <animate attributeName="rx" values="0.5;3.5" dur="1.5s" begin="0.3s" fill="freeze" />
              <animate attributeName="ry" values="0.2;0.8" dur="1.5s" begin="0.3s" fill="freeze" />
              <animate attributeName="opacity" values="0.5;0" dur="1.5s" begin="0.3s" fill="freeze" />
            </ellipse>
          </>
        )}

        {/* Click to interact label */}
        {bobberState === 'float' && (
          <g>
            <text x="60" y="43" fontSize="1.6" fill="rgba(34,211,238,0.5)" textAnchor="middle" fontFamily="monospace">
              klik pelampung
            </text>
          </g>
        )}

        {bobberState === 'catch' && (
          <text x="50" y="35" fontSize="3" fill="#f59e0b" textAnchor="middle" fontFamily="monospace" fontWeight="bold" opacity="0.9">
            🎣 STRIKE!
            <animate attributeName="opacity" values="0;1;1;0" dur="0.9s" fill="freeze" />
          </text>
        )}
      </svg>
    </div>
  );
}
