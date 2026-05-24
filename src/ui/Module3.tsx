import type { OutcomeCell } from "./types";

interface Question {
  scenarioId: string;
  scenarioDisplayName: string;
  scenarioDiagnosisName?: string;
  chromosomalSex: "XX" | "XY";
  index: number;
  total: number;
  picks: Partial<Record<OutcomeCell, string>>;
  onPick(cell: OutcomeCell, value: string): void;
  onSubmit(): void;
  canSubmit: boolean;
}

interface Module3Props {
  question: Question;
  onExitToHome(): void;
}

const GONAD_OPTIONS = ["Testes", "Ovaries", "Both", "None"] as const;
const INTERNAL_OPTIONS = ["Wolffian", "Müllerian", "Both", "None"] as const;
const EXTERNAL_OPTIONS = ["Male", "Female", "Male (masculinized)"] as const;
const BRAIN_OPTIONS = ["Masculinized", "Feminized"] as const;

export function Module3({ question, onExitToHome }: Module3Props) {
  const isLast = question.index === question.total - 1;
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between gap-4 border-b border-rule bg-paper px-6 py-3">
        <div className="flex items-center gap-3.5">
          <div className="w-[26px] h-[26px] grid place-items-center border-[1.5px] border-ink rounded-md font-mono font-semibold text-xs text-ink">
            §
          </div>
          <div className="flex flex-col">
            <span className="eyebrow text-[9.5px]">Module 3 · Quiz simulation</span>
            <span className="font-serif text-base font-medium text-ink leading-tight">
              Question {question.index + 1} of {question.total}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="flex gap-[3px]">
            {Array.from({ length: question.total }).map((_, i) => (
              <span
                key={i}
                className={
                  "w-8 h-1 rounded-sm " +
                  (i < question.index
                    ? "bg-amber"
                    : i === question.index
                      ? "bg-ink"
                      : "bg-rule-2")
                }
              />
            ))}
          </div>
          <button
            type="button"
            onClick={onExitToHome}
            className="px-3.5 py-2 border border-rule-2 rounded-lg text-xs font-medium text-ink-2 bg-paper hover:bg-paper-2 hover:border-ink transition-colors"
          >
            Exit to home
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-8 max-w-[1080px] w-full mx-auto">
        <section className="flex flex-col gap-6">
          <header className="flex flex-col gap-1.5">
            <span className="eyebrow">Scenario · {question.chromosomalSex}</span>
            <h1 className="display text-[28px] font-medium m-0 leading-[1.18] tracking-[-0.012em]">
              {question.scenarioDisplayName}
            </h1>
            {question.scenarioDiagnosisName && (
              <p className="font-serif italic text-[14px] text-ink-3 m-0">
                {question.scenarioDiagnosisName}
              </p>
            )}
          </header>

          <p className="m-0 font-serif text-[15px] text-ink-2 leading-[1.55] text-pretty">
            Pick the outcome-table cell for each of the four columns below.
            No chart, no walking through the rows — just commit to the answer.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <CellQuestion
              cell="gonads"
              label="Gonads"
              options={GONAD_OPTIONS as unknown as string[]}
              value={question.picks.gonads ?? null}
              onPick={(v) => question.onPick("gonads", v)}
            />
            <CellQuestion
              cell="internal"
              label="Internal genitalia"
              options={INTERNAL_OPTIONS as unknown as string[]}
              value={question.picks.internal ?? null}
              onPick={(v) => question.onPick("internal", v)}
            />
            <CellQuestion
              cell="external"
              label="External genitalia"
              options={EXTERNAL_OPTIONS as unknown as string[]}
              value={question.picks.external ?? null}
              onPick={(v) => question.onPick("external", v)}
            />
            <CellQuestion
              cell="brain"
              label="Brain"
              options={BRAIN_OPTIONS as unknown as string[]}
              value={question.picks.brain ?? null}
              onPick={(v) => question.onPick("brain", v)}
            />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={question.onSubmit}
              disabled={!question.canSubmit}
              className={
                "px-[22px] py-2.5 rounded-lg text-[14px] font-medium inline-flex items-center gap-2 transition-colors " +
                (question.canSubmit
                  ? "bg-ink text-paper hover:bg-ink-2"
                  : "bg-rule-2 text-ink-3 cursor-not-allowed")
              }
            >
              {isLast ? "Submit quiz" : "Next scenario"}
              <span aria-hidden className="font-mono text-[14px]">→</span>
            </button>
            {!question.canSubmit && (
              <span className="font-serif italic text-ink-3 text-xs">
                Pick an answer for every column to continue.
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function CellQuestion({
  label,
  options,
  value,
  onPick,
}: {
  cell: OutcomeCell;
  label: string;
  options: string[];
  value: string | null;
  onPick(v: string): void;
}) {
  return (
    <section className="bg-paper border border-rule rounded-[10px] px-4 py-3.5 flex flex-col gap-3">
      <span className="eyebrow">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onPick(opt)}
              aria-pressed={selected}
              className={
                "px-3.5 py-2 rounded-md text-[13px] font-medium transition-colors border " +
                (selected
                  ? "bg-ink text-paper border-ink"
                  : "bg-paper border-rule-2 text-ink hover:border-ink")
              }
            >
              {opt}
            </button>
          );
        })}
      </div>
    </section>
  );
}
