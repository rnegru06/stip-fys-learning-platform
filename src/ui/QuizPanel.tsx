import type { AnswerOption, ChartRow } from "./types";

interface QuizPanelProps {
  row: ChartRow;
  options: AnswerOption[];
  onPick(optionId: string): void;
  disabled?: boolean;
  totalRows: number;
}

export function QuizPanel({ row, options, onPick, disabled, totalRows }: QuizPanelProps) {
  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-1.5">
        <div className="eyebrow">
          Step {String(row.order).padStart(2, "0")} / {totalRows} · {row.label.replace(/\n/g, " ")}
        </div>
        {/* progress dashes — walked, current, remaining */}
        <div className="flex gap-[3px] mt-0.5">
          {Array.from({ length: totalRows }).map((_, i) => (
            <span
              key={i}
              className={
                "flex-1 h-0.5 rounded-sm " +
                (i < row.order - 1
                  ? "bg-amber"
                  : i === row.order - 1
                    ? "bg-ink"
                    : "bg-rule-2")
              }
            />
          ))}
        </div>
      </header>

      <h2 className="display text-[26px] leading-[1.25] m-0 text-pretty">
        {row.question}
      </h2>

      <div className="flex flex-col gap-2.5 mt-1">
        {options.map((opt, i) => (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onPick(opt.id)}
            className={
              "group flex items-center gap-3.5 px-[18px] py-4 " +
              "bg-paper border border-rule-2 rounded-[10px] " +
              "text-left transition-colors duration-100 " +
              "hover:bg-white hover:border-ink " +
              "disabled:cursor-default disabled:opacity-60"
            }
          >
            <span className="font-mono inline-flex items-center justify-center w-6 h-6 rounded-[5px] bg-paper-2 border border-rule text-[11px] font-medium text-ink-2 group-hover:bg-paper-3">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-[15px] leading-snug text-ink">{opt.label}</span>
          </button>
        ))}
      </div>

      <p className="text-xs italic text-ink-3 m-0 mt-1 font-serif">
        Recognition ≠ recall. Commit to an answer before checking the chart.
      </p>
    </section>
  );
}
