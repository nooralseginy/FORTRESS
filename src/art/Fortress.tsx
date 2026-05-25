import React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
  Ellipse,
  Path,
  Polygon,
  Polyline,
  Line,
  G,
} from 'react-native-svg';
import { palette } from './palette';

type Props = { size?: number };

const VB = 800;

// Octagon centered at (cx, cy) with circumradius r. Returns SVG points string.
function octagon(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const a = -Math.PI / 2 + (Math.PI / 4) * i + Math.PI / 8;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
}

// Pre-baked star field so the layout is stable across renders.
const STARS: ReadonlyArray<{ x: number; y: number; r: number; o: number }> = [
  { x: 80, y: 70, r: 1.4, o: 0.9 },
  { x: 140, y: 130, r: 1.0, o: 0.7 },
  { x: 230, y: 60, r: 1.6, o: 1.0 },
  { x: 320, y: 110, r: 1.0, o: 0.6 },
  { x: 430, y: 70, r: 1.8, o: 1.0 },
  { x: 510, y: 130, r: 1.0, o: 0.7 },
  { x: 600, y: 60, r: 1.3, o: 0.9 },
  { x: 690, y: 110, r: 1.1, o: 0.7 },
  { x: 740, y: 180, r: 1.4, o: 0.8 },
  { x: 60, y: 200, r: 1.0, o: 0.6 },
  { x: 380, y: 30, r: 1.2, o: 0.8 },
  { x: 660, y: 200, r: 1.0, o: 0.6 },
];

// 5-point star polygon for the throne.
function starPoints(cx: number, cy: number, rOuter: number, rInner: number, pts = 5) {
  const out: string[] = [];
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = -Math.PI / 2 + (Math.PI / pts) * i;
    out.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return out.join(' ');
}

// Corner tower at logical (anchorX, anchorY) — the foot of the tower.
function Tower({
  x,
  y,
  pennantColor,
}: {
  x: number;
  y: number;
  pennantColor: string;
}) {
  const w = 56;
  const h = 130;
  const left = x - w / 2;
  const top = y - h;
  return (
    <G>
      {/* Tower body */}
      <Rect x={left} y={top} width={w} height={h} fill={palette.stoneMid} />
      {/* Tower right face (slight 3D) */}
      <Polygon
        points={`${left + w},${top} ${left + w + 6},${top + 6} ${left + w + 6},${top + h} ${left + w},${top + h}`}
        fill={palette.stoneDark}
      />
      {/* Crenellations */}
      <Rect x={left} y={top - 8} width={10} height={8} fill={palette.stoneMid} />
      <Rect x={left + 14} y={top - 8} width={10} height={8} fill={palette.stoneMid} />
      <Rect x={left + 28} y={top - 8} width={10} height={8} fill={palette.stoneMid} />
      <Rect x={left + 42} y={top - 8} width={10} height={8} fill={palette.stoneMid} />
      {/* Conical roof */}
      <Polygon
        points={`${left - 4},${top - 8} ${left + w + 4},${top - 8} ${left + w / 2},${top - 70}`}
        fill={palette.roof}
      />
      <Polygon
        points={`${left + w / 2},${top - 8} ${left + w + 4},${top - 8} ${left + w / 2},${top - 70}`}
        fill={palette.roofShade}
      />
      {/* Pennant pole */}
      <Line
        x1={left + w / 2}
        y1={top - 70}
        x2={left + w / 2}
        y2={top - 95}
        stroke={palette.ink}
        strokeWidth={1.5}
      />
      {/* Pennant flag */}
      <Polygon
        points={`${left + w / 2},${top - 92} ${left + w / 2 + 14},${top - 88} ${left + w / 2},${top - 84}`}
        fill={pennantColor}
      />
      {/* Arrow slit */}
      <Rect x={left + w / 2 - 2} y={top + 20} width={4} height={14} fill={palette.mortar} />
      {/* Door */}
      <Path
        d={`M ${left + w / 2 - 8},${top + h} L ${left + w / 2 - 8},${top + h - 18} Q ${left + w / 2},${top + h - 28} ${left + w / 2 + 8},${top + h - 18} L ${left + w / 2 + 8},${top + h} Z`}
        fill={palette.mortar}
      />
    </G>
  );
}

// District buildings — each a recognizable silhouette in 4 distinct styles.

function GranaryBuilding({ cx, cy }: { cx: number; cy: number }) {
  // A barn + silo
  const barnL = cx - 60;
  const barnT = cy - 30;
  return (
    <G>
      {/* Barn body */}
      <Rect x={barnL} y={barnT} width={90} height={50} fill={palette.granary} />
      {/* Barn roof */}
      <Polygon
        points={`${barnL - 6},${barnT} ${barnL + 96},${barnT} ${barnL + 45},${barnT - 32}`}
        fill={palette.granaryDark}
      />
      {/* Barn doors */}
      <Rect x={barnL + 35} y={barnT + 22} width={20} height={28} fill={palette.granaryDark} />
      <Line
        x1={barnL + 45}
        y1={barnT + 22}
        x2={barnL + 45}
        y2={barnT + 50}
        stroke={palette.ink}
        strokeWidth={1}
      />
      {/* Cross-beams on roof */}
      <Polyline
        points={`${barnL + 20},${barnT - 10} ${barnL + 45},${barnT - 32} ${barnL + 70},${barnT - 10}`}
        fill="none"
        stroke={palette.ink}
        strokeWidth={1}
        opacity={0.6}
      />
      {/* Silo */}
      <Rect x={cx + 32} y={cy - 50} width={28} height={70} fill={palette.granary} />
      <Ellipse cx={cx + 46} cy={cy - 50} rx={14} ry={6} fill={palette.granaryDark} />
      <Ellipse cx={cx + 46} cy={cy + 20} rx={14} ry={5} fill={palette.granaryDark} />
      <Rect x={cx + 38} y={cy - 28} width={16} height={3} fill={palette.granaryDark} opacity={0.6} />
      <Rect x={cx + 38} y={cy - 12} width={16} height={3} fill={palette.granaryDark} opacity={0.6} />
      <Rect x={cx + 38} y={cy + 4} width={16} height={3} fill={palette.granaryDark} opacity={0.6} />
      {/* Wheat sheaves */}
      <G transform={`translate(${cx - 70}, ${cy + 22})`}>
        <Line x1={0} y1={0} x2={-4} y2={-12} stroke={palette.granaryDark} strokeWidth={1.2} />
        <Line x1={0} y1={0} x2={0} y2={-14} stroke={palette.granaryDark} strokeWidth={1.2} />
        <Line x1={0} y1={0} x2={4} y2={-12} stroke={palette.granaryDark} strokeWidth={1.2} />
      </G>
    </G>
  );
}

function BarracksBuilding({ cx, cy }: { cx: number; cy: number }) {
  // Square keep with crenellations + crossed-swords banner
  const l = cx - 45;
  const t = cy - 60;
  return (
    <G>
      {/* Keep body */}
      <Rect x={l} y={t} width={90} height={90} fill={palette.barracks} />
      <Rect x={l + 80} y={t} width={10} height={90} fill={palette.barracksDark} />
      {/* Crenellations */}
      {[0, 1, 2, 3].map(i => (
        <Rect
          key={i}
          x={l + i * 24}
          y={t - 10}
          width={16}
          height={10}
          fill={palette.barracks}
        />
      ))}
      {/* Door */}
      <Path
        d={`M ${cx - 12},${t + 90} L ${cx - 12},${t + 60} Q ${cx},${t + 50} ${cx + 12},${t + 60} L ${cx + 12},${t + 90} Z`}
        fill={palette.barracksDark}
      />
      {/* Banner with crossed swords */}
      <Rect x={cx - 16} y={t + 20} width={32} height={36} fill={palette.parchment} />
      <Line
        x1={cx - 10}
        y1={t + 26}
        x2={cx + 10}
        y2={t + 50}
        stroke={palette.ink}
        strokeWidth={2}
      />
      <Line
        x1={cx + 10}
        y1={t + 26}
        x2={cx - 10}
        y2={t + 50}
        stroke={palette.ink}
        strokeWidth={2}
      />
      <Polygon
        points={`${cx - 16},${t + 56} ${cx},${t + 64} ${cx + 16},${t + 56}`}
        fill={palette.parchment}
      />
      {/* Arrow slits */}
      <Rect x={l + 10} y={t + 20} width={3} height={12} fill={palette.barracksDark} />
      <Rect x={l + 77} y={t + 20} width={3} height={12} fill={palette.barracksDark} />
    </G>
  );
}

function AcademyBuilding({ cx, cy }: { cx: number; cy: number }) {
  // Tower with observatory dome
  const l = cx - 30;
  const t = cy - 60;
  return (
    <G>
      {/* Tower */}
      <Rect x={l} y={t} width={60} height={100} fill={palette.academy} />
      <Rect x={l + 50} y={t} width={10} height={100} fill={palette.academyDark} />
      {/* Dome */}
      <Path
        d={`M ${l - 8},${t} Q ${cx},${t - 40} ${l + 68},${t} Z`}
        fill={palette.academyDark}
      />
      {/* Dome highlight */}
      <Path
        d={`M ${l - 4},${t - 4} Q ${cx - 8},${t - 32} ${cx + 4},${t - 30}`}
        fill="none"
        stroke={palette.parchment}
        strokeWidth={1.2}
        opacity={0.5}
      />
      {/* Antenna / scope */}
      <Line x1={cx} y1={t - 40} x2={cx} y2={t - 56} stroke={palette.gold} strokeWidth={1.5} />
      <Circle cx={cx} cy={t - 58} r={2} fill={palette.gold} />
      {/* Big arched window */}
      <Path
        d={`M ${cx - 14},${t + 70} L ${cx - 14},${t + 40} Q ${cx},${t + 28} ${cx + 14},${t + 40} L ${cx + 14},${t + 70} Z`}
        fill={palette.academyDark}
      />
      <Line
        x1={cx}
        y1={t + 28}
        x2={cx}
        y2={t + 70}
        stroke={palette.parchment}
        strokeWidth={0.8}
        opacity={0.7}
      />
      {/* Door */}
      <Rect x={cx - 8} y={t + 78} width={16} height={22} fill={palette.academyDark} />
      {/* Scrolls at base */}
      <Rect x={l - 14} y={cy + 32} width={14} height={6} fill={palette.parchment} />
      <Rect x={l - 12} y={cy + 33} width={2} height={4} fill={palette.ink} />
      <Rect x={l - 4} y={cy + 33} width={2} height={4} fill={palette.ink} />
    </G>
  );
}

function EmbassyBuilding({ cx, cy }: { cx: number; cy: number }) {
  // Pavilion with multiple pennants
  const l = cx - 50;
  const t = cy - 30;
  return (
    <G>
      {/* Pavilion base */}
      <Rect x={l} y={t} width={100} height={50} fill={palette.embassy} />
      <Rect x={l + 90} y={t} width={10} height={50} fill={palette.embassyDark} />
      {/* Curved roof (3 humps) */}
      <Path
        d={`M ${l},${t} Q ${l + 16},${t - 22} ${l + 33},${t} Q ${l + 50},${t - 22} ${l + 67},${t} Q ${l + 84},${t - 22} ${l + 100},${t} Z`}
        fill={palette.embassyDark}
      />
      {/* Pennants atop each hump */}
      <Line x1={l + 16} y1={t - 22} x2={l + 16} y2={t - 38} stroke={palette.ink} strokeWidth={1} />
      <Polygon
        points={`${l + 16},${t - 38} ${l + 28},${t - 34} ${l + 16},${t - 30}`}
        fill={palette.gold}
      />
      <Line x1={l + 50} y1={t - 22} x2={l + 50} y2={t - 42} stroke={palette.ink} strokeWidth={1} />
      <Polygon
        points={`${l + 50},${t - 42} ${l + 62},${t - 38} ${l + 50},${t - 34}`}
        fill={palette.parchment}
      />
      <Line x1={l + 84} y1={t - 22} x2={l + 84} y2={t - 38} stroke={palette.ink} strokeWidth={1} />
      <Polygon
        points={`${l + 84},${t - 38} ${l + 96},${t - 34} ${l + 84},${t - 30}`}
        fill={palette.gold}
      />
      {/* Open archway */}
      <Path
        d={`M ${cx - 14},${t + 50} L ${cx - 14},${t + 26} Q ${cx},${t + 14} ${cx + 14},${t + 26} L ${cx + 14},${t + 50} Z`}
        fill={palette.embassyDark}
      />
      {/* Lanterns hanging at sides */}
      <Line x1={l + 8} y1={t} x2={l + 8} y2={t + 8} stroke={palette.ink} strokeWidth={0.8} />
      <Circle cx={l + 8} cy={t + 11} r={3} fill={palette.gold} />
      <Line x1={l + 92} y1={t} x2={l + 92} y2={t + 8} stroke={palette.ink} strokeWidth={0.8} />
      <Circle cx={l + 92} cy={t + 11} r={3} fill={palette.gold} />
    </G>
  );
}

export function Fortress({ size = 360 }: Props) {
  const cx = 400;
  const cy = 470;
  const rampartR = 270;

  const octPts = octagon(cx, cy, rampartR);
  const octPtsInner = octagon(cx, cy, rampartR - 18);

  // Tower anchor points: the 4 diagonal corners of the octagon
  // (matching i = 1, 3, 5, 7 from the octagon helper).
  const towerAnchors = [
    { x: cx + (rampartR - 4) * Math.cos(-Math.PI / 8), y: cy + (rampartR - 4) * Math.sin(-Math.PI / 8), pennant: palette.barracks },         // NE
    { x: cx + (rampartR - 4) * Math.cos(Math.PI / 8),  y: cy + (rampartR - 4) * Math.sin(Math.PI / 8),  pennant: palette.embassy },          // SE
    { x: cx + (rampartR - 4) * Math.cos(Math.PI - Math.PI / 8), y: cy + (rampartR - 4) * Math.sin(Math.PI - Math.PI / 8), pennant: palette.academy }, // SW
    { x: cx + (rampartR - 4) * Math.cos(-Math.PI + Math.PI / 8), y: cy + (rampartR - 4) * Math.sin(-Math.PI + Math.PI / 8), pennant: palette.granary }, // NW
  ];

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${VB} ${VB}`}>
      <Defs>
        <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={palette.skyTop} />
          <Stop offset="0.55" stopColor={palette.skyMid} />
          <Stop offset="1" stopColor={palette.skyLow} />
        </LinearGradient>
        <RadialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor={palette.sun} stopOpacity="0.95" />
          <Stop offset="0.5" stopColor={palette.sun} stopOpacity="0.35" />
          <Stop offset="1" stopColor={palette.sun} stopOpacity="0" />
        </RadialGradient>
        <LinearGradient id="rampart" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={palette.stoneLight} />
          <Stop offset="1" stopColor={palette.stoneDark} />
        </LinearGradient>
        <RadialGradient id="throneGlow" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor={palette.gold} stopOpacity="0.7" />
          <Stop offset="1" stopColor={palette.gold} stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* Sky */}
      <Rect x={0} y={0} width={VB} height={VB} fill="url(#sky)" />

      {/* Sun glow at low horizon */}
      <Circle cx={140} cy={580} r={220} fill="url(#sun)" />
      <Circle cx={140} cy={580} r={50} fill={palette.sun} opacity={0.85} />

      {/* Stars */}
      <G>
        {STARS.map((s, i) => (
          <Circle key={i} cx={s.x} cy={s.y} r={s.r} fill={palette.star} opacity={s.o} />
        ))}
      </G>

      {/* Distant fortress silhouettes on horizon (the "other fortresses") */}
      <G opacity={0.35}>
        <Polygon points="40,610 60,610 60,580 80,580 80,610 110,610 110,560 130,560 130,610 40,610" fill={palette.skyTop} />
        <Polygon points="680,610 700,610 700,580 720,580 720,610 760,610 760,570 780,570 780,610 680,610" fill={palette.skyTop} />
      </G>

      {/* Island shadow */}
      <Ellipse cx={cx} cy={cy + 280} rx={310} ry={20} fill={palette.islandShadow} opacity={0.5} />

      {/* Floating island (organic blob) */}
      <Path
        d={`M ${cx - 290},${cy + 200}
            Q ${cx - 320},${cy + 110} ${cx - 220},${cy + 90}
            Q ${cx - 120},${cy + 70}  ${cx},${cy + 80}
            Q ${cx + 140},${cy + 70}  ${cx + 240},${cy + 95}
            Q ${cx + 320},${cy + 115} ${cx + 290},${cy + 200}
            Q ${cx + 220},${cy + 270} ${cx + 80},${cy + 285}
            Q ${cx - 80},${cy + 285}  ${cx - 220},${cy + 270}
            Q ${cx - 300},${cy + 250} ${cx - 290},${cy + 200} Z`}
        fill={palette.islandDirt}
      />
      <Path
        d={`M ${cx - 280},${cy + 130}
            Q ${cx - 200},${cy + 80} ${cx - 80},${cy + 78}
            Q ${cx + 80},${cy + 75} ${cx + 200},${cy + 90}
            Q ${cx + 290},${cy + 110} ${cx + 280},${cy + 160}
            Q ${cx + 200},${cy + 200} ${cx},${cy + 205}
            Q ${cx - 180},${cy + 205} ${cx - 270},${cy + 175} Z`}
        fill={palette.islandTop}
      />

      {/* Ramparts — outer wall, octagonal */}
      <Polygon points={octPts} fill="url(#rampart)" />
      {/* Inner courtyard (slightly lighter) */}
      <Polygon points={octPtsInner} fill={palette.islandTop} opacity={0.5} />
      {/* Battlement crenels along front-facing edges */}
      <G>
        {[-90, -60, -30, 0, 30, 60, 90].map((dx, i) => (
          <Rect
            key={i}
            x={cx + dx - 6}
            y={cy + 197}
            width={10}
            height={8}
            fill={palette.stoneMid}
          />
        ))}
      </G>

      {/* Corner towers */}
      {towerAnchors.map((t, i) => (
        <Tower key={i} x={t.x} y={t.y} pennantColor={t.pennant} />
      ))}

      {/* District buildings in 4 quadrants */}
      <GranaryBuilding cx={cx - 130} cy={cy - 80} />
      <BarracksBuilding cx={cx + 130} cy={cy - 80} />
      <AcademyBuilding cx={cx - 130} cy={cy + 100} />
      <EmbassyBuilding cx={cx + 130} cy={cy + 100} />

      {/* Central throne dais + star */}
      <Ellipse cx={cx} cy={cy + 50} rx={56} ry={16} fill={palette.stoneDark} />
      <Ellipse cx={cx} cy={cy + 44} rx={50} ry={14} fill={palette.stoneMid} />
      <Circle cx={cx} cy={cy + 30} r={42} fill="url(#throneGlow)" />
      <Polygon
        points={starPoints(cx, cy + 28, 22, 9)}
        fill={palette.gold}
        stroke={palette.goldDark}
        strokeWidth={1}
      />

      {/* Top banner (house name) */}
      <G>
        <Rect x={cx - 110} y={50} width={220} height={42} rx={6} fill={palette.parchment} />
        <Rect x={cx - 110} y={88} width={220} height={4} fill={palette.goldDark} opacity={0.4} />
        <Polygon
          points={`${cx - 110},92 ${cx - 120},108 ${cx - 110},108`}
          fill={palette.parchment}
        />
        <Polygon
          points={`${cx + 110},92 ${cx + 120},108 ${cx + 110},108`}
          fill={palette.parchment}
        />
      </G>
    </Svg>
  );
}
