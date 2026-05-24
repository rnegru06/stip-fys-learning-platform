// Per-row "perturbation arrow" diagrams shown next to the consequence prose.
// Each is a small 3-node visual: signal → block → outcome. Hand-authored for
// the rows where the broken-signal picture is pedagogically iconic; absent
// for rows where prose is enough. Returns null when no diagram is registered
// for the row, so the callout falls back to text-only.

import { HormoneIcon, type HormoneKind } from "./HormoneIcon";

interface ConsequenceDiagramProps {
  rowId: string;
}

const PALETTE = {
  INK: "#1a1d22",
  INK_2: "#3a3d44",
  INK_3: "#6b6e75",
  RULE: "#c8c3b1",
  PAPER: "#fbfaf5",
  BRICK: "#b04c34",
  BRICK_BG: "#fadfd3",
};

export function ConsequenceDiagram({ rowId }: ConsequenceDiagramProps) {
  const Diagram = DIAGRAMS[rowId];
  if (!Diagram) return null;
  return (
    <div className="bg-paper rounded-lg border border-brick-border/60 px-3.5 py-3">
      <svg viewBox="0 0 260 80" className="w-full h-[80px] max-w-[280px]">
        <Diagram />
      </svg>
    </div>
  );
}

// ─── Diagram primitives ───────────────────────────────────────────────

function Arrow({ x1, y1, x2, y2, broken }: {
  x1: number; y1: number; x2: number; y2: number; broken?: boolean;
}) {
  return (
    <g>
      <defs>
        <marker
          id={broken ? "cd-arrow-broken" : "cd-arrow"}
          viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="5" markerHeight="5" orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={broken ? PALETTE.BRICK : PALETTE.INK_2} />
        </marker>
      </defs>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={broken ? PALETTE.BRICK : PALETTE.INK_2}
        strokeWidth={broken ? 2 : 1.5}
        strokeDasharray={broken ? "4 3" : undefined}
        markerEnd={`url(#${broken ? "cd-arrow-broken" : "cd-arrow"})`}
      />
    </g>
  );
}

function Block({ x, y, label, dim }: {
  x: number; y: number; label: string; dim?: boolean;
}) {
  return (
    <g>
      <rect
        x={x - 32} y={y - 16}
        width={64} height={32}
        rx={6} ry={6}
        fill={dim ? PALETTE.PAPER : "#faf8f3"}
        stroke={dim ? PALETTE.RULE : PALETTE.INK_2}
        strokeWidth={1.2}
        strokeDasharray={dim ? "3 3" : undefined}
      />
      <text
        x={x} y={y + 3}
        textAnchor="middle"
        fontSize={10}
        fontWeight={600}
        fontFamily="IBM Plex Mono, monospace"
        fill={dim ? PALETTE.INK_3 : PALETTE.INK}
      >
        {label}
      </text>
    </g>
  );
}

function Receptor({ x, y, label, broken }: {
  x: number; y: number; label: string; broken?: boolean;
}) {
  return (
    <g>
      <path
        d={`M ${x - 14} ${y - 14} L ${x} ${y} L ${x - 14} ${y + 14}`}
        fill="none"
        stroke={broken ? PALETTE.BRICK : PALETTE.INK_2}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {broken && (
        <>
          <line
            x1={x - 18} y1={y - 18}
            x2={x + 6} y2={y + 6}
            stroke={PALETTE.BRICK}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <line
            x1={x - 18} y1={y + 18}
            x2={x + 6} y2={y - 6}
            stroke={PALETTE.BRICK}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </>
      )}
      <text
        x={x - 2} y={y + 28}
        textAnchor="middle"
        fontSize={9}
        fontWeight={600}
        fontFamily="IBM Plex Mono, monospace"
        fill={broken ? PALETTE.BRICK : PALETTE.INK_2}
      >
        {label}
      </text>
    </g>
  );
}

function HormoneAt({ cx, cy, hormone, absent }: {
  cx: number; cy: number; hormone: HormoneKind; absent?: boolean;
}) {
  return <HormoneIcon hormone={hormone} inline cx={cx} cy={cy} size={28} absent={absent} />;
}

// ─── Per-row diagrams ─────────────────────────────────────────────────

function WolffianDiagram() {
  // T present → ✗ AR → no Wolffian development
  return (
    <g>
      <HormoneAt cx={30} cy={40} hormone="T" />
      <Arrow x1={48} y1={40} x2={110} y2={40} broken />
      <Receptor x={130} y={40} label="AR" broken />
      <Arrow x1={158} y1={40} x2={210} y2={40} broken />
      <Block x={232} y={40} label="no duct" dim />
    </g>
  );
}

function ExternalGenitaliaDiagram() {
  // DHT (or T → DHT) → ✗ AR → external defaults to female
  return (
    <g>
      <HormoneAt cx={30} cy={40} hormone="DHT" />
      <Arrow x1={50} y1={40} x2={110} y2={40} broken />
      <Receptor x={130} y={40} label="AR" broken />
      <Arrow x1={158} y1={40} x2={200} y2={40} broken />
      <Block x={228} y={40} label="default" dim />
    </g>
  );
}

function FiveAlphaReductaseDiagram() {
  // T → ✗ 5α-R → no DHT (so external defaults to female)
  return (
    <g>
      <HormoneAt cx={30} cy={40} hormone="T" />
      <Arrow x1={48} y1={40} x2={106} y2={40} broken />
      <Block x={132} y={40} label="5α-R ✗" />
      <Arrow x1={160} y1={40} x2={200} y2={40} broken />
      <HormoneAt cx={222} cy={40} hormone="DHT" absent />
    </g>
  );
}

function AMHDiagram() {
  // No AMH → Müllerian ducts persist (with male testes)
  return (
    <g>
      <Block x={32} y={40} label="Testis" />
      <Arrow x1={66} y1={40} x2={108} y2={40} broken />
      <HormoneAt cx={128} cy={40} hormone="AMH" absent />
      <Arrow x1={150} y1={40} x2={190} y2={40} broken />
      <Block x={218} y={40} label="Müllerian persists" />
    </g>
  );
}

function MullerianDiagram() {
  // AMH present → Müllerian regresses (so no uterus in male)
  return (
    <g>
      <HormoneAt cx={32} cy={40} hormone="AMH" />
      <Arrow x1={50} y1={40} x2={110} y2={40} />
      <Block x={138} y={40} label="Müllerian" />
      <Arrow x1={170} y1={40} x2={208} y2={40} broken />
      <Block x={232} y={40} label="regress" dim />
    </g>
  );
}

function LocalTestosteroneDiagram() {
  // Testes → local T → Wolffian
  return (
    <g>
      <Block x={32} y={40} label="Testis" />
      <Arrow x1={66} y1={40} x2={110} y2={40} />
      <HormoneAt cx={130} cy={40} hormone="T" />
      <Arrow x1={150} y1={40} x2={196} y2={40} />
      <Block x={222} y={40} label="Wolffian" />
    </g>
  );
}

function GonadalDevDiagram() {
  // TDF present → Testis (or absent → Ovary)
  return (
    <g>
      <Block x={32} y={40} label="TDF" />
      <Arrow x1={66} y1={40} x2={120} y2={40} />
      <Block x={150} y={40} label="medulla" />
      <Arrow x1={184} y1={40} x2={224} y2={40} />
      <Block x={246} y={40} label="Testis" />
    </g>
  );
}

function SexualBehaviorDiagram() {
  // T → aromatase (in brain) → E2 → masculinized brain
  return (
    <g>
      <HormoneAt cx={28} cy={40} hormone="T" />
      <Arrow x1={46} y1={40} x2={100} y2={40} />
      <Block x={128} y={40} label="aromatase" />
      <Arrow x1={162} y1={40} x2={200} y2={40} />
      <HormoneAt cx={222} cy={40} hormone="E2" />
    </g>
  );
}

const DIAGRAMS: Record<string, () => JSX.Element> = {
  wolffian: WolffianDiagram,
  external_genitalia: ExternalGenitaliaDiagram,
  five_alpha_reductase: FiveAlphaReductaseDiagram,
  amh: AMHDiagram,
  mullerian: MullerianDiagram,
  local_testosterone: LocalTestosteroneDiagram,
  gonadal_dev: GonadalDevDiagram,
  sexual_behavior: SexualBehaviorDiagram,
};
