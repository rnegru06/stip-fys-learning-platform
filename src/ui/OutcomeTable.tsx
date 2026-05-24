import { useEffect, useRef, useState } from "react";
import type { OutcomeCell } from "./types";

interface OutcomeTableProps {
  scenarioName: string;
  cells: Record<OutcomeCell, string>;
}

const COLS: { key: OutcomeCell; label: string }[] = [
  { key: "gonads",   label: "Gonads" },
  { key: "internal", label: "Internal genitalia" },
  { key: "external", label: "External genitalia" },
  { key: "brain",    label: "Brain" },
];

export function OutcomeTable({ scenarioName, cells }: OutcomeTableProps) {
  // Diff against last render so a freshly-populated cell can animate its entrance.
  const prev = useRef<Record<OutcomeCell, string>>(cells);
  const [justFilled, setJustFilled] = useState<Set<OutcomeCell>>(() => new Set());

  useEffect(() => {
    const newly = new Set<OutcomeCell>();
    for (const col of COLS) {
      const was = (prev.current?.[col.key] ?? "") !== "";
      const now = (cells[col.key] ?? "") !== "";
      if (!was && now) newly.add(col.key);
    }
    if (newly.size > 0) {
      setJustFilled(newly);
      const t = window.setTimeout(() => setJustFilled(new Set()), 600);
      prev.current = cells;
      return () => window.clearTimeout(t);
    }
    prev.current = cells;
  }, [cells]);

  const filledCount = COLS.filter((c) => (cells[c.key] ?? "") !== "").length;
  const total = COLS.length;
  const empty = filledCount === 0;
  const complete = filledCount === total;

  const eyebrowText = empty
    ? "Goal — fill these in as you walk"
    : complete
      ? "Outcome table · complete"
      : `Outcome table · ${filledCount} of ${total} filled`;

  return (
    <section
      className={
        "bg-paper border rounded-[10px] px-4 py-3.5 transition-colors " +
        (empty ? "border-amber-border" : complete ? "border-amber" : "border-rule")
      }
    >
      <div className="flex items-baseline justify-between mb-2.5">
        <span
          className={
            "eyebrow " +
            (empty ? "text-amber-2" : complete ? "text-amber-2" : "")
          }
        >
          {eyebrowText}
        </span>
        <span className="font-serif italic text-ink-3 text-xs">{scenarioName}</span>
      </div>
      <div className="grid grid-cols-4">
        {COLS.map((col, i) => {
          const value = cells[col.key];
          const filled = value && value.length > 0;
          const animate = justFilled.has(col.key);
          return (
            <div
              key={col.key}
              className={
                "px-3.5 py-2.5 min-h-[82px] flex flex-col gap-1.5 " +
                (i === 0 ? "" : "border-l border-rule")
              }
            >
              <div className="eyebrow text-[9.5px]">{col.label}</div>
              {filled ? (
                <div
                  className={
                    "font-serif leading-snug text-pretty text-[13px] text-ink " +
                    (animate ? " animate-outcome" : "")
                  }
                >
                  {value}
                </div>
              ) : (
                <div
                  className={
                    "flex-1 rounded-md border border-dashed flex items-center " +
                    "justify-center font-mono text-[10px] uppercase tracking-[0.1em] " +
                    "text-ink-3 italic " +
                    (empty ? "border-amber-border/70 bg-amber-surface/40" : "border-rule-2")
                  }
                >
                  to fill
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
