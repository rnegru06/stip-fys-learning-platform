// Reusable hormone-pill iconography. One consistent shape vocabulary for the
// hormones referenced throughout the chart (T, DHT, AMH, GnRH, E2). Used in
// RowGlyph, ConsequenceCallout micro-diagrams, and anywhere a hormone needs
// a visual badge. Render-able both inline-SVG (as a child of an outer <svg>)
// and standalone (default).

interface HormoneIconProps {
  hormone: HormoneKind;
  size?: number;
  /** When true, returns just <g>...</g> for embedding inside a parent <svg>. */
  inline?: boolean;
  /** Optional: position when inline. */
  cx?: number;
  cy?: number;
  /** Render a slash through the icon (signal blocked / absent). */
  absent?: boolean;
}

export type HormoneKind = "T" | "DHT" | "AMH" | "GnRH" | "E2";

const PALETTE: Record<HormoneKind, { fill: string; stroke: string; ink: string }> = {
  T:    { fill: "#fbedc6", stroke: "#c08418", ink: "#1a1d22" },
  DHT:  { fill: "#fce4a3", stroke: "#a86f10", ink: "#1a1d22" },
  AMH:  { fill: "#e8efe0", stroke: "#5f7548", ink: "#1a1d22" },
  GnRH: { fill: "#e6ddec", stroke: "#6c4f86", ink: "#1a1d22" },
  E2:   { fill: "#f3dcea", stroke: "#9a4a76", ink: "#1a1d22" },
};

export function HormoneIcon({
  hormone, size = 28, inline, cx = 0, cy = 0, absent,
}: HormoneIconProps) {
  const p = PALETTE[hormone];
  const r = size / 2 - 1;
  const labelSize = hormone.length > 2 ? size * 0.32 : size * 0.42;

  const body = (
    <g transform={inline ? `translate(${cx - size / 2}, ${cy - size / 2})` : undefined}>
      <ellipse
        cx={size / 2}
        cy={size / 2}
        rx={r}
        ry={r * 0.78}
        fill={p.fill}
        stroke={p.stroke}
        strokeWidth={1.5}
      />
      <text
        x={size / 2}
        y={size / 2 + labelSize * 0.32}
        textAnchor="middle"
        fontSize={labelSize}
        fontWeight={700}
        fontFamily="IBM Plex Mono, monospace"
        fill={absent ? "#9a9588" : p.ink}
      >
        {hormone}
      </text>
      {absent && (
        <line
          x1={size * 0.15}
          y1={size * 0.85}
          x2={size * 0.85}
          y2={size * 0.15}
          stroke="#b04c34"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      )}
    </g>
  );

  if (inline) return body;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={hormone}>
      {body}
    </svg>
  );
}
