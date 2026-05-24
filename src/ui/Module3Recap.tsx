import type { ModuleThreeAnswer, OutcomeCell } from "./types";

interface ResultRow {
  scenarioId: string;
  scenarioDisplayName: string;
  scenarioDiagnosisName?: string;
  correctAnswer: ModuleThreeAnswer;
  studentAnswer: ModuleThreeAnswer;
  perCellCorrect: Record<OutcomeCell, boolean>;
  allFourCorrect: boolean;
}

interface RecapVM {
  rows: ResultRow[];
  totalQuestions: number;
  perfectScenarios: number;
  totalCells: number;
  correctCells: number;
  onRetry(): void;
  onBackToHome(): void;
}

interface Module3RecapProps {
  recap: RecapVM;
}

const COLS: { key: OutcomeCell; label: string }[] = [
  { key: "gonads", label: "Gonads" },
  { key: "internal", label: "Internal" },
  { key: "external", label: "External" },
  { key: "brain", label: "Brain" },
];

export function Module3Recap({ recap }: Module3RecapProps) {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-end justify-between gap-4 px-10 pt-8 pb-5 border-b border-rule">
        <div>
          <span className="eyebrow">Module 3 · Results</span>
          <h1 className="display text-[30px] font-medium m-0 mt-1.5 tracking-[-0.012em]">
            Quiz complete.
          </h1>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="flex flex-col items-end">
            <span className="eyebrow text-[9.5px]">Perfect scenarios</span>
            <span className="font-mono text-[22px] font-medium text-ink">
              {recap.perfectScenarios}
              <span className="text-ink-3 text-sm"> / {recap.totalQuestions}</span>
            </span>
          </div>
          <div className="w-px h-9 bg-rule" />
          <div className="flex flex-col items-end">
            <span className="eyebrow text-[9.5px]">Cells correct</span>
            <span className="font-mono text-[22px] font-medium text-ink">
              {recap.correctCells}
              <span className="text-ink-3 text-sm"> / {recap.totalCells}</span>
            </span>
          </div>
          <div className="w-px h-9 bg-rule" />
          <button
            type="button"
            onClick={recap.onRetry}
            className="px-3.5 py-2 border border-rule-2 rounded-lg text-xs font-medium text-ink-2 bg-paper hover:bg-paper-2 hover:border-ink transition-colors"
          >
            New 4-question set
          </button>
          <button
            type="button"
            onClick={recap.onBackToHome}
            className="px-3.5 py-2 border border-rule-2 rounded-lg text-xs font-medium text-ink-2 bg-paper hover:bg-paper-2 hover:border-ink transition-colors"
          >
            Back to home
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-10 py-8 flex flex-col gap-5 max-w-[1200px] w-full mx-auto">
        {recap.rows.map((r) => (
          <ResultCard key={r.scenarioId} row={r} />
        ))}
      </div>
    </div>
  );
}

function ResultCard({ row }: { row: ResultRow }) {
  return (
    <section
      className={
        "bg-paper border-[1.5px] rounded-xl px-5 py-4 flex flex-col gap-3.5 " +
        (row.allFourCorrect ? "border-lit" : "border-brick-border")
      }
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <h2 className="font-serif text-[18px] font-medium m-0 leading-tight text-ink">
            {row.scenarioDisplayName}
          </h2>
          {row.scenarioDiagnosisName && (
            <p className="font-serif italic text-[12.5px] text-ink-3 m-0 mt-0.5">
              {row.scenarioDiagnosisName}
            </p>
          )}
        </div>
        <span
          className={
            "font-mono text-[11px] font-semibold uppercase tracking-[0.12em] " +
            (row.allFourCorrect ? "text-lit-2" : "text-brick-2")
          }
        >
          {row.allFourCorrect ? "✓ All four correct" : "✕ Some cells wrong"}
        </span>
      </header>

      <div className="grid grid-cols-4 gap-0 border border-rule rounded-md overflow-hidden">
        {COLS.map((c, i) => {
          const ok = row.perCellCorrect[c.key];
          const yours = row.studentAnswer[c.key];
          const correct = row.correctAnswer[c.key];
          return (
            <div
              key={c.key}
              className={
                "px-3 py-2.5 flex flex-col gap-1 " +
                (i === 0 ? "" : "border-l border-rule") +
                " " +
                (ok ? "bg-lit-surface" : "bg-brick-tint/40")
              }
            >
              <div className="flex items-center gap-1.5">
                <span className="eyebrow text-[9px]">{c.label}</span>
                <span
                  aria-hidden
                  className={
                    "inline-grid place-items-center w-3.5 h-3.5 rounded-full text-[8px] font-bold leading-none " +
                    (ok
                      ? "bg-lit-bg border border-lit text-lit-2"
                      : "bg-brick-tint border border-brick-border text-brick-2")
                  }
                >
                  {ok ? "✓" : "✕"}
                </span>
              </div>
              <div className="font-serif text-[13px] text-ink leading-snug">{yours}</div>
              {!ok && (
                <div className="font-serif italic text-[11.5px] text-ink-2 leading-snug">
                  Correct: <span className="not-italic text-ink">{correct}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
