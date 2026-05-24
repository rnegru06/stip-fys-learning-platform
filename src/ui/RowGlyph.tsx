// Hand-authored mini-diagram glyphs, one per row when biologically iconic.
// Cuts text density in the explainer callout by giving students a visual
// anchor next to the prose. Each glyph is a small (96×96) SVG built from
// neutral shapes — chromosomes, gonads, ducts, hormones — colored with the
// paper/amber/ink palette already in the design system.

interface RowGlyphProps {
  rowId: string;
  pathway?: "female" | "male";
  size?: number;
}

const INK = "#1a1d22";
const INK_2 = "#3a3d44";
const AMBER = "#c08418";
const AMBER_FILL = "#fbedc6";
const PAPER = "#fbfaf5";
const RULE = "#c8c3b1";

export function RowGlyph({ rowId, pathway = "male", size = 96 }: RowGlyphProps) {
  const glyph = GLYPHS[rowId];
  if (!glyph) return null;
  return (
    <div
      className="shrink-0 grid place-items-center bg-paper rounded-lg border border-rule"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 96 96" width={size - 8} height={size - 8}>
        {glyph(pathway)}
      </svg>
    </div>
  );
}

type GlyphFn = (pathway: "female" | "male") => JSX.Element;

// ─── Glyphs ──────────────────────────────────────────────────────────

const Chromosomes: GlyphFn = (pathway) => (
  <g>
    {/* Two X-shapes for XX, or one X and one shorter Y for XY */}
    <Chromosome x={32} kind="X" />
    {pathway === "female" ? (
      <Chromosome x={64} kind="X" />
    ) : (
      <Chromosome x={64} kind="Y" />
    )}
    <text
      x={32} y={84} textAnchor="middle"
      fontSize={11} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace" fill={INK}
    >
      X
    </text>
    <text
      x={64} y={84} textAnchor="middle"
      fontSize={11} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace" fill={INK}
    >
      {pathway === "female" ? "X" : "Y"}
    </text>
  </g>
);

function Chromosome({ x, kind }: { x: number; kind: "X" | "Y" }) {
  const top = 18;
  const mid = 38;
  const bot = kind === "X" ? 64 : 52;
  return (
    <g stroke={INK} strokeWidth={3.5} strokeLinecap="round" fill="none">
      <line x1={x - 7} y1={top} x2={x + 7} y2={bot} />
      <line x1={x + 7} y1={top} x2={x - 7} y2={bot} />
      <circle cx={x} cy={mid} r={2.4} fill={INK} stroke="none" />
    </g>
  );
}

const SRY: GlyphFn = (pathway) => (
  <g>
    {/* Single Y chromosome with a highlighted SRY locus near the top */}
    <g stroke={INK} strokeWidth={3.5} strokeLinecap="round" fill="none">
      <line x1={34} y1={18} x2={48} y2={42} />
      <line x1={62} y1={18} x2={48} y2={42} />
      <line x1={48} y1={42} x2={40} y2={62} />
      <line x1={48} y1={42} x2={56} y2={62} />
    </g>
    {/* SRY locus highlight */}
    {pathway === "male" && (
      <circle cx={42} cy={26} r={6} fill={AMBER_FILL} stroke={AMBER} strokeWidth={2} />
    )}
    <text x={48} y={80} textAnchor="middle" fontSize={10} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace" fill={INK}>
      {pathway === "male" ? "SRY +" : "no SRY"}
    </text>
  </g>
);

const Gonad: GlyphFn = (pathway) => (
  <g>
    {/* Bean-shaped gonad. Male = testis (round, internal "tubules"); Female = ovary (oval, follicles). */}
    {pathway === "male" ? (
      <g>
        <ellipse cx={48} cy={44} rx={22} ry={26} fill={AMBER_FILL} stroke={AMBER} strokeWidth={2} />
        {/* Seminiferous-tubule swirls */}
        <path d="M 36 32 Q 48 40 60 32" fill="none" stroke={AMBER} strokeWidth={1.5} />
        <path d="M 34 44 Q 48 52 62 44" fill="none" stroke={AMBER} strokeWidth={1.5} />
        <path d="M 36 56 Q 48 62 60 56" fill="none" stroke={AMBER} strokeWidth={1.5} />
        <text x={48} y={86} textAnchor="middle" fontSize={10} fontWeight={600}
          fontFamily="IBM Plex Mono, monospace" fill={INK}>Testis</text>
      </g>
    ) : (
      <g>
        <ellipse cx={48} cy={44} rx={26} ry={20} fill={PAPER} stroke={INK_2} strokeWidth={2} />
        {/* Follicles */}
        <circle cx={38} cy={42} r={4} fill="none" stroke={INK_2} strokeWidth={1.5} />
        <circle cx={50} cy={38} r={3} fill="none" stroke={INK_2} strokeWidth={1.5} />
        <circle cx={56} cy={48} r={3.5} fill="none" stroke={INK_2} strokeWidth={1.5} />
        <circle cx={42} cy={50} r={2.5} fill="none" stroke={INK_2} strokeWidth={1.5} />
        <text x={48} y={86} textAnchor="middle" fontSize={10} fontWeight={600}
          fontFamily="IBM Plex Mono, monospace" fill={INK}>Ovary</text>
      </g>
    )}
  </g>
);

const Testosterone: GlyphFn = (pathway) => (
  <g>
    {/* Testis on left, hormone "T" molecules diffusing right */}
    <ellipse cx={26} cy={42} rx={14} ry={18}
      fill={pathway === "male" ? AMBER_FILL : PAPER}
      stroke={pathway === "male" ? AMBER : RULE} strokeWidth={2} />
    {pathway === "male" ? (
      <g>
        <HormoneDot cx={50} cy={32} label="T" />
        <HormoneDot cx={64} cy={44} label="T" />
        <HormoneDot cx={54} cy={56} label="T" />
        <ArrowRight x1={42} y1={42} x2={48} y2={42} />
      </g>
    ) : (
      <text x={62} y={48} textAnchor="middle" fontSize={11}
        fontFamily="IBM Plex Mono, monospace" fill={INK_2}>—</text>
    )}
    <text x={48} y={82} textAnchor="middle" fontSize={10} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace" fill={INK}>
      {pathway === "male" ? "T secreted" : "no T"}
    </text>
  </g>
);

const Wolffian: GlyphFn = (pathway) => (
  <g>
    {/* Duct shape: two parallel curves running top→bottom */}
    {pathway === "male" ? (
      <g stroke={AMBER} strokeWidth={3} fill="none">
        <path d="M 32 12 C 28 30, 36 50, 32 78" />
        <path d="M 64 12 C 68 30, 60 50, 64 78" />
        {/* Bulges = seminal vesicles */}
        <circle cx={32} cy={62} r={5} fill={AMBER_FILL} />
        <circle cx={64} cy={62} r={5} fill={AMBER_FILL} />
      </g>
    ) : (
      <g stroke={RULE} strokeWidth={2} fill="none" strokeDasharray="3 3">
        <path d="M 32 12 C 28 30, 36 50, 32 78" />
        <path d="M 64 12 C 68 30, 60 50, 64 78" />
      </g>
    )}
    <text x={48} y={90} textAnchor="middle" fontSize={9} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace" fill={INK}>
      {pathway === "male" ? "Wolffian ✓" : "regresses"}
    </text>
  </g>
);

const AMH: GlyphFn = (pathway) => (
  <g>
    {/* Sertoli "cell" emitting AMH dots, OR no emission */}
    <circle cx={48} cy={36} r={14}
      fill={pathway === "male" ? AMBER_FILL : PAPER}
      stroke={pathway === "male" ? AMBER : RULE} strokeWidth={2} />
    <text x={48} y={40} textAnchor="middle" fontSize={9} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace"
      fill={pathway === "male" ? INK : INK_2}>Sertoli</text>
    {pathway === "male" ? (
      <g>
        <HormoneDot cx={22} cy={64} label="AMH" small />
        <HormoneDot cx={48} cy={68} label="AMH" small />
        <HormoneDot cx={74} cy={64} label="AMH" small />
      </g>
    ) : (
      <text x={48} y={68} textAnchor="middle" fontSize={10}
        fontFamily="IBM Plex Mono, monospace" fill={INK_2}>no AMH</text>
    )}
    <text x={48} y={88} textAnchor="middle" fontSize={10} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace" fill={INK}>
      {pathway === "male" ? "AMH +" : "AMH −"}
    </text>
  </g>
);

const Mullerian: GlyphFn = (pathway) => (
  <g>
    {/* Müllerian ducts persist (female) or regress (male) */}
    {pathway === "female" ? (
      <g stroke={INK} strokeWidth={2.5} fill="none">
        <path d="M 28 14 C 32 32, 40 50, 48 60" />
        <path d="M 68 14 C 64 32, 56 50, 48 60" />
        {/* Uterus bulb */}
        <ellipse cx={48} cy={68} rx={10} ry={8} fill={PAPER} stroke={INK} strokeWidth={2.5} />
        {/* Vagina */}
        <line x1={48} y1={76} x2={48} y2={84} />
      </g>
    ) : (
      <g stroke={RULE} strokeWidth={2} fill="none" strokeDasharray="3 3">
        <path d="M 28 14 C 32 32, 40 50, 48 60" />
        <path d="M 68 14 C 64 32, 56 50, 48 60" />
      </g>
    )}
    <text x={48} y={90} textAnchor="middle" fontSize={9} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace" fill={INK}>
      {pathway === "female" ? "uterus, tubes" : "regresses"}
    </text>
  </g>
);

const FiveAlphaReductase: GlyphFn = (pathway) => (
  <g>
    {/* T → DHT conversion arrow with enzyme label */}
    <text x={20} y={48} textAnchor="middle" fontSize={14} fontWeight={700}
      fontFamily="IBM Plex Mono, monospace" fill={INK}>T</text>
    <ArrowRight x1={32} y1={44} x2={60} y2={44} thick />
    <text x={76} y={48} textAnchor="middle" fontSize={13} fontWeight={700}
      fontFamily="IBM Plex Mono, monospace"
      fill={pathway === "male" ? INK : INK_2}>DHT</text>
    <text x={46} y={32} textAnchor="middle" fontSize={9}
      fontFamily="IBM Plex Mono, monospace" fill={AMBER}>5α-R</text>
    {pathway === "female" && (
      <line x1={36} y1={52} x2={56} y2={36} stroke="#b04c34" strokeWidth={2.5} />
    )}
    <text x={48} y={80} textAnchor="middle" fontSize={10} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace" fill={INK}>
      {pathway === "male" ? "DHT formed" : "no DHT"}
    </text>
  </g>
);

const ExternalGenitalia: GlyphFn = (pathway) => (
  <g>
    {/* Simplified silhouette: male = phallus + scrotum, female = clitoris + labia */}
    {pathway === "male" ? (
      <g fill={AMBER_FILL} stroke={AMBER} strokeWidth={2}>
        <rect x={42} y={22} width={12} height={28} rx={5} />
        <ellipse cx={40} cy={58} rx={8} ry={10} />
        <ellipse cx={56} cy={58} rx={8} ry={10} />
      </g>
    ) : (
      <g fill={PAPER} stroke={INK_2} strokeWidth={2}>
        <ellipse cx={48} cy={32} rx={4} ry={5} />
        <path d="M 36 38 C 32 50, 36 62, 48 70 C 60 62, 64 50, 60 38" fill={PAPER} />
      </g>
    )}
    <text x={48} y={88} textAnchor="middle" fontSize={9} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace" fill={INK}>
      {pathway === "male" ? "penis, scrotum" : "clitoris, labia"}
    </text>
  </g>
);

const Brain: GlyphFn = (pathway) => (
  <g>
    {/* Brain silhouette with masculinized vs default annotation */}
    <path
      d="M 24 44 C 24 28, 40 16, 52 20 C 64 14, 78 26, 76 42 C 80 52, 70 62, 56 60 C 48 70, 32 66, 28 56 C 20 54, 22 48, 24 44 Z"
      fill={pathway === "male" ? AMBER_FILL : PAPER}
      stroke={pathway === "male" ? AMBER : INK_2}
      strokeWidth={2}
    />
    {/* Sulci hint */}
    <path d="M 36 30 C 42 36, 50 32, 58 38" fill="none"
      stroke={pathway === "male" ? AMBER : INK_2} strokeWidth={1.5} />
    <path d="M 32 48 C 40 52, 52 50, 64 52" fill="none"
      stroke={pathway === "male" ? AMBER : INK_2} strokeWidth={1.5} />
    <text x={48} y={86} textAnchor="middle" fontSize={9} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace" fill={INK}>
      {pathway === "male" ? "masculinized" : "default"}
    </text>
  </g>
);

const GnRH: GlyphFn = (pathway) => (
  <g>
    {/* Pulse pattern: female = cyclical waves, male = tonic flat-ish line */}
    {pathway === "female" ? (
      <path d="M 12 60 Q 22 26 32 60 T 52 60 T 72 60 T 92 60" fill="none"
        stroke={INK} strokeWidth={2.5} />
    ) : (
      <path d="M 12 50 L 32 50 L 36 32 L 40 50 L 60 50 L 64 32 L 68 50 L 92 50" fill="none"
        stroke={AMBER} strokeWidth={2.5} />
    )}
    {/* Axis */}
    <line x1={8} y1={72} x2={92} y2={72} stroke={RULE} strokeWidth={1} />
    <text x={48} y={88} textAnchor="middle" fontSize={9} fontWeight={600}
      fontFamily="IBM Plex Mono, monospace" fill={INK}>
      {pathway === "female" ? "cyclical GnRH" : "tonic GnRH"}
    </text>
  </g>
);

// ─── Helpers ─────────────────────────────────────────────────────────

function HormoneDot({
  cx, cy, label, small,
}: { cx: number; cy: number; label: string; small?: boolean }) {
  const r = small ? 7 : 8;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={AMBER_FILL} stroke={AMBER} strokeWidth={1.5} />
      <text x={cx} y={cy + 3} textAnchor="middle" fontSize={small ? 7 : 9} fontWeight={700}
        fontFamily="IBM Plex Mono, monospace" fill={INK}>
        {label}
      </text>
    </g>
  );
}

function ArrowRight({
  x1, y1, x2, y2, thick,
}: { x1: number; y1: number; x2: number; y2: number; thick?: boolean }) {
  const w = thick ? 2.5 : 1.8;
  return (
    <g stroke={INK} strokeWidth={w} fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} markerEnd="url(#glyph-arrow)" />
      <defs>
        <marker id="glyph-arrow" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={INK} stroke="none" />
        </marker>
      </defs>
    </g>
  );
}

// ─── Registry ────────────────────────────────────────────────────────

const GLYPHS: Record<string, GlyphFn> = {
  chromosomal_sex: Chromosomes,
  sry: SRY,
  gonadal_dev: Gonad,
  local_testosterone: Testosterone,
  wolffian: Wolffian,
  amh: AMH,
  mullerian: Mullerian,
  five_alpha_reductase: FiveAlphaReductase,
  external_genitalia: ExternalGenitalia,
  sexual_behavior: Brain,
  gnrh_pattern: GnRH,
};
