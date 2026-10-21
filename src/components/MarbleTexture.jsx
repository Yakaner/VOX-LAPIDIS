import { useId } from 'react';

// 석재 이름으로부터 항상 같은 텍스처가 나오도록 시드를 만든다.
function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h % 1000) + 1;
}

function random(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// 대각선으로 흐르는 직선들을 만든 뒤, 필터에서 노이즈로 휘게 해 결을 표현한다.
function makeVeins(seed) {
  const rand = random(seed * 7919);
  const angle = -0.9 + rand() * 0.5;
  const dx = Math.cos(angle) * 900;
  const dy = Math.sin(angle) * 900;
  const line = (width, opacity) => {
    const cx = -100 + rand() * 500;
    const cy = -50 + rand() * 500;
    return { d: `M${cx - dx} ${cy - dy} L${cx + dx} ${cy + dy}`, width, opacity };
  };
  return {
    main: Array.from({ length: 4 }, () => line(1 + rand() * 2.2, 0.75 + rand() * 0.25)),
    minor: Array.from({ length: 9 }, () => line(0.4 + rand() * 0.8, 0.35 + rand() * 0.35)),
    wide: Array.from({ length: 3 }, () => line(14 + rand() * 20, 0.18 + rand() * 0.15)),
  };
}

export default function MarbleTexture({ name, colors, className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [base, vein, vein2] = colors;
  const seed = hashSeed(name);
  const veins = makeVeins(seed);

  const group = (lines, color, filter) => (
    <g filter={`url(#${filter}${uid})`} fill="none" stroke={color} strokeLinecap="round">
      {lines.map((l, i) => (
        <path key={i} d={l.d} strokeWidth={l.width} strokeOpacity={l.opacity} />
      ))}
    </g>
  );

  return (
    <svg
      className={`marble-texture ${className}`}
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id={`warp${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves="5" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="110" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="0.35" />
        </filter>
        <filter id={`haze${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="4" seed={seed + 11} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="160" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <linearGradient id={`sheen${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="300" height="400" fill={base} />
      {group(veins.wide, vein2, 'haze')}
      {group(veins.minor, vein2, 'warp')}
      {group(veins.main, vein, 'warp')}
      <rect width="300" height="400" fill={`url(#sheen${uid})`} />
    </svg>
  );
}
