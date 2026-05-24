import { useMemo } from "react";
import type {
  CellRef,
  ChartCell,
  ChartEdge,
  ChartLayout,
  ChartRow,
} from "./types";
import { cellKey } from "./types";

// ─────────────────────────────────────────────────────────────
// Visual system, in shorthand:
//   • Cells are 180×54 rounded-rect; mono text inside.
//   • DIM   → low-contrast border, paper fill, text behind a 3px Gaussian blur.
//   • LIT   → amber border + amber-tint fill, sharp mono text, entrance animation.
//   • WRONG → brick border + brick-tint fill, same entrance animation.
//   • HINT  → ink outline, paper fill, sharp text (the "you are here" affordance).
//   • Edges follow analogous dim→lit logic; dashed cross-pathway edges stay dashed.
// All animations are CSS keyframes defined in tailwind.config + scoped <style>.
// ─────────────────────────────────────────────────────────────

const CELL_W = 208;
const CELL_H = 72;

type Kind = "dim" | "lit" | "retried" | "wrong" | "hint";

interface ChartSVGProps {
  rows: ChartRow[];
  edges: ChartEdge[];
  layout: ChartLayout;
  traversedCells: ReadonlySet<string>;
  retriedCells?: ReadonlySet<string>;
  wrongWalkCell?: CellRef | null;
  currentCellHint?: CellRef | null;
  // Tutorial / easy mode / recap: render dim cells without blur, so students
  // can read ahead while still seeing the lit path build up.
  revealDimText?: boolean;
}

function CellRect({
  cell,
  kind,
  animate,
  revealDimText,
}: {
  cell: ChartCell;
  kind: Kind;
  animate?: boolean;
  revealDimText?: boolean;
}) {
  const x = cell.layout.x - CELL_W / 2;
  const y = cell.layout.y - CELL_H / 2;

  const palette: Record<Kind, { fill: string; stroke: string; strokeW: number; opacity: number }> = {
    dim:     { fill: "#fbfaf5", stroke: "#c8c3b1", strokeW: 1,   opacity: revealDimText ? 0.92 : 0.7 },
    lit:     { fill: "#dff3d8", stroke: "#5a8a3a", strokeW: 1.5, opacity: 1   },
    retried: { fill: "#fbedc6", stroke: "#c08418", strokeW: 1.5, opacity: 1   },
    wrong:   { fill: "#fadfd3", stroke: "#b04c34", strokeW: 1.5, opacity: 1   },
    hint:    { fill: "#faf8f3", stroke: "#1a1d22", strokeW: 1.5, opacity: 1   },
  };
  const p = palette[kind];
  const blurry = kind === "dim" && !revealDimText;

  const lines = cell.display.split("\n");
  const lineHeight = 20;
  const startY = cell.layout.y - ((lines.length - 1) * lineHeight) / 2;
  const singleShort = lines.length === 1 && lines[0].length <= 7;
  const fontSize = singleShort ? 22 : 18;

  return (
    <g
      opacity={p.opacity}
      className={animate ? "animate-cell-light" : undefined}
      style={{ transformOrigin: `${cell.layout.x}px ${cell.layout.y}px` }}
    >
      {(kind === "lit" || kind === "retried") && animate && (
        <rect
          x={x - 3} y={y - 3} width={CELL_W + 6} height={CELL_H + 6}
          rx={11} ry={11}
          fill="none"
          stroke={kind === "lit" ? "#5a8a3a" : "#c08418"}
          strokeOpacity={0.18}
          strokeWidth={6}
          className="animate-cell-glow"
        />
      )}
      <rect
        x={x} y={y} width={CELL_W} height={CELL_H}
        rx={8} ry={8}
        fill={p.fill}
        stroke={p.stroke}
        strokeWidth={p.strokeW}
      />
      <g filter={blurry ? "url(#cell-blur)" : undefined}>
        {lines.map((line, i) => (
          <text
            key={i}
            className="cell-text"
            x={cell.layout.x}
            y={startY + i * lineHeight}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={fontSize}
            fontWeight={kind === "dim" ? 400 : 600}
            fill="#1a1d22"
          >
            {line}
          </text>
        ))}
      </g>
    </g>
  );
}

function edgePath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  curved: boolean,
  loopBack: boolean,
  layout: ChartLayout,
): string {
  if (loopBack) {
    const midX = (from.x + to.x) / 2 + 130;
    const midY = (from.y + to.y) / 2;
    return `M ${from.x + CELL_W / 2 - 6} ${from.y} Q ${midX} ${midY} ${to.x + CELL_W / 2 - 6} ${to.y}`;
  }
  if (curved) {
    const sameColumn = from.x === to.x;
    if (sameColumn) {
      const offsetX = from.x === layout.xMale ? 130 : -130;
      const ctrl1 = { x: from.x + offsetX, y: from.y + (to.y - from.y) * 0.35 };
      const ctrl2 = { x: from.x + offsetX, y: from.y + (to.y - from.y) * 0.65 };
      const sx = from.x + (from.x === layout.xMale ? CELL_W / 2 : -CELL_W / 2);
      const ex = to.x   + (to.x   === layout.xMale ? CELL_W / 2 : -CELL_W / 2);
      return `M ${sx} ${from.y} C ${ctrl1.x} ${ctrl1.y}, ${ctrl2.x} ${ctrl2.y}, ${ex} ${to.y}`;
    }
  }
  return `M ${from.x} ${from.y + CELL_H / 2} L ${to.x} ${to.y - CELL_H / 2}`;
}

export function ChartSVG({
  rows,
  edges,
  layout,
  traversedCells,
  retriedCells,
  wrongWalkCell,
  currentCellHint,
  revealDimText,
}: ChartSVGProps) {
  const retriedSet = retriedCells ?? (new Set<string>() as ReadonlySet<string>);
  const rowsById = useMemo(
    () => Object.fromEntries(rows.map((r) => [r.id, r])) as Record<string, ChartRow>,
    [rows],
  );
  const getCell = (ref: CellRef): ChartCell =>
    ref.pathway === "female" ? rowsById[ref.rowId].cells.female : rowsById[ref.rowId].cells.male;

  // Find the most-recently lit row so we only animate THAT one (avoids the
  // whole chart re-animating on prop changes).
  const latestOrder = useMemo(() => {
    let max = 0;
    for (const key of traversedCells) {
      const rowId = key.split("::")[0];
      const r = rowsById[rowId];
      if (r && r.order > max) max = r.order;
    }
    return max;
  }, [traversedCells, rowsById]);

  const litEdges = useMemo(() => {
    return edges.filter(
      (e) => !e.loopBack && traversedCells.has(cellKey(e.from)) && traversedCells.has(cellKey(e.to)),
    );
  }, [edges, traversedCells]);

  // Edges whose destination cell is in the most recently lit row — these get
  // a one-shot hormone particle animation to make causal flow visible.
  const newestEdgeIndices = useMemo(() => {
    if (latestOrder === 0) return [] as number[];
    const idxs: number[] = [];
    litEdges.forEach((e, i) => {
      const destRow = rowsById[e.to.rowId];
      if (destRow && destRow.order === latestOrder) idxs.push(i);
    });
    return idxs;
  }, [litEdges, latestOrder, rowsById]);

  const LABEL_X = layout.labelRightEdge;

  return (
    <svg
      viewBox={`0 0 ${layout.viewBoxWidth} ${layout.viewBoxHeight}`}
      preserveAspectRatio="xMidYMin meet"
      className="block h-full w-full"
    >
      <defs>
        <filter id="cell-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7.8" />
        </filter>
        <marker id="arrow-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#c8c3b1" />
        </marker>
        <marker id="arrow-lit" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#c08418" />
        </marker>
        <marker id="arrow-wrong" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#b04c34" />
        </marker>
      </defs>

      {/* Column heads + center title */}
      <g>
        <text x={LABEL_X / 2 + 60} y={34} className="col-head" fontSize={13.5} fontWeight={600} fill="#8a8d93" textAnchor="middle" letterSpacing="0.12em">
          SEX DIFFERENTIATION
        </text>
        <text x={layout.xFemale} y={34} className="col-head" fontSize={13.5} fontWeight={600} fill="#8a8d93" textAnchor="middle" letterSpacing="0.12em">
          FEMALE PATHWAY
        </text>
        <text x={layout.xMale} y={34} className="col-head" fontSize={13.5} fontWeight={600} fill="#8a8d93" textAnchor="middle" letterSpacing="0.12em">
          MALE PATHWAY
        </text>
        <line x1={60} y1={48} x2={layout.viewBoxWidth - 60} y2={48} stroke="#e1ddd2" strokeWidth={1} />
      </g>

      {/* Row labels in gutter */}
      <g>
        {rows.map((row) => {
          const litRow =
            traversedCells.has(cellKey(row.cells.female)) || traversedCells.has(cellKey(row.cells.male));
          const isLatest = row.order === latestOrder && litRow;
          return (
            <g key={row.id}>
              <text
                x={56}
                y={row.cells.female.layout.y}
                fontSize={13}
                fill={litRow ? "#1a1d22" : "#b8b3a1"}
                textAnchor="start"
                dominantBaseline="central"
                fontFamily="IBM Plex Mono, monospace"
                fontWeight={isLatest ? 600 : 400}
              >
                {String(row.order).padStart(2, "0")}
              </text>
              <text
                className="row-label"
                x={LABEL_X}
                y={row.cells.female.layout.y}
                fontSize={16}
                fill={litRow ? "#1a1d22" : "#6b6e75"}
                fontWeight={isLatest ? 600 : 400}
                textAnchor="end"
                dominantBaseline="central"
              >
                {row.label.split("\n").map((line, i, arr) => (
                  <tspan key={i} x={LABEL_X} dy={i === 0 ? -((arr.length - 1) * 8) : 16}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </g>

      {/* Dim edges (structural hairline) */}
      <g opacity={0.5}>
        {edges.map((edge, i) => {
          const from = getCell(edge.from).layout;
          const to = getCell(edge.to).layout;
          const d = edgePath(from, to, edge.curved ?? false, edge.loopBack ?? false, layout);
          return (
            <path
              key={`dim-${i}`}
              d={d}
              fill="none"
              stroke="#c8c3b1"
              strokeWidth={1}
              strokeDasharray={edge.style === "dashed" ? "3 3" : undefined}
              markerEnd={edge.loopBack ? undefined : "url(#arrow-dim)"}
            />
          );
        })}
      </g>

      {/* Dim cells */}
      <g>
        {rows.flatMap((r) => [r.cells.female, r.cells.male]).map((cell) => {
          const k = cellKey(cell);
          if (traversedCells.has(k)) return null;
          if (wrongWalkCell && cellKey(wrongWalkCell) === k) return null;
          if (currentCellHint && cellKey(currentCellHint) === k) return null;
          return <CellRect key={`dim-${k}`} cell={cell} kind="dim" revealDimText={revealDimText} />;
        })}
      </g>

      {/* Lit edges overlay + hormone-particle motion paths */}
      <g>
        {litEdges.map((edge, i) => {
          const from = getCell(edge.from).layout;
          const to = getCell(edge.to).layout;
          const d = edgePath(from, to, edge.curved ?? false, false, layout);
          return (
            <path
              key={`lit-${i}`}
              id={`hormone-path-${i}`}
              d={d}
              fill="none"
              stroke="#c08418"
              strokeWidth={2}
              strokeDasharray={edge.style === "dashed" ? "4 4" : undefined}
              markerEnd="url(#arrow-lit)"
            />
          );
        })}
      </g>

      {/* Hormone particle(s) — one-shot animation on the newest-lit edge(s).
          Keyed by latestOrder so React remounts on each new row and the SMIL
          animation restarts from t=0. Halo renders first (under), bright
          particle renders on top. */}
      <g key={`particles-${latestOrder}`}>
        {newestEdgeIndices.map((i) => (
          <circle
            key={`particle-glow-${latestOrder}-${i}`}
            r={11}
            fill="#fbedc6"
            opacity={0}
          >
            <animateMotion dur="0.85s" repeatCount="1" fill="freeze">
              <mpath href={`#hormone-path-${i}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;0.55;0"
              dur="0.85s"
              repeatCount="1"
              fill="freeze"
            />
            <animate
              attributeName="r"
              values="6;13;6"
              dur="0.85s"
              repeatCount="1"
              fill="freeze"
            />
          </circle>
        ))}
        {newestEdgeIndices.map((i) => (
          <circle
            key={`particle-${latestOrder}-${i}`}
            r={5}
            fill="#c08418"
            opacity={0}
          >
            <animateMotion dur="0.85s" repeatCount="1" fill="freeze">
              <mpath href={`#hormone-path-${i}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;0.95;0"
              keyTimes="0;0.15;1"
              dur="0.85s"
              repeatCount="1"
              fill="freeze"
            />
          </circle>
        ))}
      </g>

      {/* Lit cells — green for first-try correct, yellow ("retried") for correct after a wrong pick on this row */}
      <g>
        {rows.flatMap((r) => [r.cells.female, r.cells.male]).map((cell) => {
          const k = cellKey(cell);
          if (!traversedCells.has(k)) return null;
          const row = rowsById[cell.rowId];
          const animate = row.order === latestOrder;
          const kind: Kind = retriedSet.has(k) ? "retried" : "lit";
          return <CellRect key={`lit-${k}`} cell={cell} kind={kind} animate={animate} />;
        })}
      </g>

      {/* Hint outline */}
      {currentCellHint && <CellRect cell={getCell(currentCellHint)} kind="hint" />}

      {/* Wrong-walk reveal */}
      {wrongWalkCell && <CellRect cell={getCell(wrongWalkCell)} kind="wrong" animate />}
    </svg>
  );
}
