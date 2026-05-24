import { useMemo, useState } from "react";
import type {
  CellRef,
  ChartEdge,
  ChartLayout,
  ChartRow,
  OutcomeCell,
} from "./types";
import { cellKey } from "./types";
import { ChartSVG } from "./ChartSVG";
import { OutcomeTable } from "./OutcomeTable";
import { RowGlyph } from "./RowGlyph";

// Tutorial's stage machine. Owned locally — the controller hands us the static
// content + an exit callback, and we manage navigation between stages.
type Stage = "rowLesson" | "offerAIS" | "aisWalk" | "aisDone";

interface RowLesson {
  rowId: string;
  order: number;
  label: string;
  question: string;
  questionMeaning: string;
  options: Array<{
    id: string;
    label: string;
    meaning: string;
    isCorrectForNormalXY: boolean;
  }>;
  connectionToPrevious?: string;
  highlightCell: CellRef;
  populatesOutcome?: OutcomeCell;
}

interface AISLesson {
  rowId: string;
  order: number;
  label: string;
  narration: string;
  highlightCell: CellRef;
  pickedLabel: string;
  populatesOutcome?: OutcomeCell;
}

interface TutorialProps {
  rowLessons: RowLesson[];
  aisLessons: AISLesson[];
  normalXYScenarioName: string;
  normalXYOutcomes: Record<OutcomeCell, string>;
  aisScenarioName: string;
  aisDiagnosisName?: string;
  aisOutcomes: Record<OutcomeCell, string>;
  chartRows: ChartRow[];
  chartEdges: ChartEdge[];
  chartLayout: ChartLayout;
  onExitToHome(): void;
}

const EMPTY_OUTCOMES: Record<OutcomeCell, string> = {
  gonads: "",
  internal: "",
  external: "",
  brain: "",
};

export function Tutorial({
  rowLessons,
  aisLessons,
  normalXYScenarioName,
  normalXYOutcomes,
  aisScenarioName,
  aisDiagnosisName,
  aisOutcomes,
  chartRows,
  chartEdges,
  chartLayout,
  onExitToHome,
}: TutorialProps) {
  const [stage, setStage] = useState<Stage>("rowLesson");
  const [step, setStep] = useState(0);

  // Compute which cells are lit on the right-side chart for the current view.
  const traversedCells = useMemo(() => {
    const set = new Set<string>();
    if (stage === "rowLesson") {
      for (let i = 0; i <= step; i++) {
        set.add(cellKey(rowLessons[i].highlightCell));
      }
    } else if (stage === "offerAIS") {
      for (const lesson of rowLessons) set.add(cellKey(lesson.highlightCell));
    } else if (stage === "aisWalk" || stage === "aisDone") {
      const upTo = stage === "aisDone" ? aisLessons.length - 1 : step;
      for (let i = 0; i <= upTo; i++) {
        set.add(cellKey(aisLessons[i].highlightCell));
      }
    }
    return set as ReadonlySet<string>;
  }, [stage, step, rowLessons, aisLessons]);

  // Progressively populate the outcome table based on visited lessons.
  // Rows 5/9/12/14 each populate one of the four outcome columns.
  const outcomeCells = useMemo<Record<OutcomeCell, string>>(() => {
    const out: Record<OutcomeCell, string> = { ...EMPTY_OUTCOMES };
    if (stage === "rowLesson") {
      for (let i = 0; i <= step; i++) {
        const lesson = rowLessons[i];
        if (lesson.populatesOutcome) {
          out[lesson.populatesOutcome] = normalXYOutcomes[lesson.populatesOutcome];
        }
      }
    } else if (stage === "offerAIS") {
      return normalXYOutcomes;
    } else if (stage === "aisWalk") {
      for (let i = 0; i <= step; i++) {
        const lesson = aisLessons[i];
        if (lesson.populatesOutcome) {
          out[lesson.populatesOutcome] = aisOutcomes[lesson.populatesOutcome];
        }
      }
    } else if (stage === "aisDone") {
      return aisOutcomes;
    }
    return out;
  }, [stage, step, rowLessons, aisLessons, normalXYOutcomes, aisOutcomes]);

  // Which scenario name is being analyzed right now (drives the header subtitle
  // and the outcome-table scenario label).
  const activeScenarioName =
    stage === "rowLesson" || stage === "offerAIS"
      ? normalXYScenarioName
      : aisScenarioName;

  const currentRowLesson =
    stage === "rowLesson" ? rowLessons[step] : null;
  const currentAISLesson =
    stage === "aisWalk" ? aisLessons[step] : null;
  const currentCellHint =
    stage === "rowLesson"
      ? rowLessons[step].highlightCell
      : stage === "aisWalk"
        ? aisLessons[step].highlightCell
        : null;

  const advanceRowLesson = () => {
    if (step < rowLessons.length - 1) {
      setStep(step + 1);
    } else {
      setStage("offerAIS");
    }
  };
  const startAISWalk = () => {
    setStage("aisWalk");
    setStep(0);
  };
  const advanceAISWalk = () => {
    if (step < aisLessons.length - 1) {
      setStep(step + 1);
    } else {
      setStage("aisDone");
    }
  };

  // ─── Header ──────────────────────────────────────────────────────────
  const stepIndicator = (() => {
    if (stage === "rowLesson") {
      return `Lesson ${String(step + 1).padStart(2, "0")} / ${rowLessons.length}`;
    }
    if (stage === "offerAIS") return "Capstone";
    if (stage === "aisWalk") {
      return `AIS walk ${String(step + 1).padStart(2, "0")} / ${aisLessons.length}`;
    }
    return "Complete";
  })();

  const progressDashes = (() => {
    if (stage === "rowLesson") {
      return rowLessons.map((_, i) =>
        i < step ? "amber" : i === step ? "ink" : "dim",
      );
    }
    if (stage === "aisWalk") {
      return aisLessons.map((_, i) =>
        i < step ? "amber" : i === step ? "ink" : "dim",
      );
    }
    return rowLessons.map(() => "amber");
  })();

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between gap-4 border-b border-rule bg-paper px-6 py-3">
        <div className="flex items-center gap-3.5">
          <div className="w-[26px] h-[26px] grid place-items-center border-[1.5px] border-ink rounded-md font-mono font-semibold text-xs text-ink">
            §
          </div>
          <div className="flex flex-col">
            <span className="eyebrow text-[9.5px]">Tutorial · analyzing</span>
            <span className="font-serif text-base font-medium text-ink leading-tight">
              {activeScenarioName}
            </span>
            {stage !== "rowLesson" && stage !== "offerAIS" && aisDiagnosisName && (
              <span className="font-serif italic text-[12px] text-ink-3 leading-tight mt-0.5">
                {aisDiagnosisName}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <span className="font-mono text-[11px] text-ink-2 uppercase tracking-[0.1em]">
            {stepIndicator}
          </span>
          <button
            type="button"
            onClick={onExitToHome}
            className="px-3.5 py-2 border border-rule-2 rounded-lg text-xs font-medium text-ink-2 bg-paper hover:bg-paper-2 hover:border-ink transition-colors"
          >
            Back to home
          </button>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-5 overflow-hidden p-5 lg:grid-cols-[minmax(460px,1fr)_minmax(640px,1.5fr)]">
        {/* LEFT — narration panel */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          {currentRowLesson && (
            <RowLessonPanel
              lesson={currentRowLesson}
              totalLessons={rowLessons.length}
              progressDashes={progressDashes}
              onNext={advanceRowLesson}
              isFinal={step === rowLessons.length - 1}
            />
          )}
          {stage === "offerAIS" && (
            <OfferAISPanel
              normalXYScenarioName={normalXYScenarioName}
              aisScenarioName={aisScenarioName}
              aisDiagnosisName={aisDiagnosisName}
              onAccept={startAISWalk}
              onDecline={onExitToHome}
            />
          )}
          {currentAISLesson && (
            <AISLessonPanel
              lesson={currentAISLesson}
              totalLessons={aisLessons.length}
              progressDashes={progressDashes}
              aisScenarioName={aisScenarioName}
              onNext={advanceAISWalk}
              isFinal={step === aisLessons.length - 1}
            />
          )}
          {stage === "aisDone" && (
            <AISDonePanel
              aisScenarioName={aisScenarioName}
              normalXYScenarioName={normalXYScenarioName}
              onExit={onExitToHome}
            />
          )}
        </div>

        {/* RIGHT — chart + outcome table, building up as the tutorial advances */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="bg-paper border border-rule rounded-xl px-3.5 pt-2.5 pb-1 flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-baseline pb-1">
              <span className="eyebrow">Flowchart</span>
              <span className="font-serif italic text-ink-3 text-[12px]">
                {stage === "rowLesson" && `${normalXYScenarioName} — building, row by row`}
                {stage === "offerAIS" && `${normalXYScenarioName} — fully walked`}
                {stage === "aisWalk" && `${aisScenarioName} — walking now`}
                {stage === "aisDone" && `${aisScenarioName} — fully walked`}
              </span>
            </div>
            <div className="flex-1 min-h-0">
              <ChartSVG
                rows={chartRows}
                edges={chartEdges}
                layout={chartLayout}
                traversedCells={traversedCells}
                currentCellHint={currentCellHint}
                revealDimText
              />
            </div>
          </div>
          <OutcomeTable
            scenarioName={activeScenarioName}
            cells={outcomeCells}
          />
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

function ProgressDashes({ tokens }: { tokens: string[] }) {
  return (
    <div className="flex gap-[3px] mt-0.5">
      {tokens.map((t, i) => (
        <span
          key={i}
          className={
            "flex-1 h-0.5 rounded-sm " +
            (t === "amber" ? "bg-amber" : t === "ink" ? "bg-ink" : "bg-rule-2")
          }
        />
      ))}
    </div>
  );
}

function RowLessonPanel({
  lesson,
  totalLessons,
  progressDashes,
  onNext,
  isFinal,
}: {
  lesson: RowLesson;
  totalLessons: number;
  progressDashes: string[];
  onNext(): void;
  isFinal: boolean;
}) {
  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-1.5">
        <div className="eyebrow">
          Lesson {String(lesson.order).padStart(2, "0")} / {totalLessons}{" "}
          · {lesson.label.replace(/\n/g, " ")}
        </div>
        <ProgressDashes tokens={progressDashes} />
      </header>

      <div className="flex items-start gap-5">
        <RowGlyph rowId={lesson.rowId} pathway={lesson.highlightCell.pathway} size={88} />
        <h2 className="display text-[28px] leading-[1.22] m-0 text-pretty flex-1">
          {lesson.question}
        </h2>
      </div>

      <div className="bg-paper-2 border border-rule rounded-[10px] px-5 py-4">
        <span className="eyebrow text-[10px] mb-2 block">
          What this question is asking
        </span>
        <p className="m-0 font-serif text-[16.5px] leading-[1.55] text-ink-2 text-pretty">
          {lesson.questionMeaning}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {lesson.options.map((opt, i) => (
          <div
            key={opt.id}
            className={
              "bg-paper border rounded-[10px] px-5 py-4 flex flex-col gap-2 " +
              (opt.isCorrectForNormalXY
                ? "border-amber-border"
                : "border-rule-2")
            }
          >
            <div className="flex items-center gap-3">
              <span className="font-mono inline-flex items-center justify-center w-7 h-7 rounded-[5px] bg-paper-2 border border-rule text-[12px] font-medium text-ink-2">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-[17px] leading-snug text-ink font-medium">
                {opt.label}
              </span>
              {opt.isCorrectForNormalXY && (
                <span className="ml-auto font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-2">
                  ✓ Normal XY picks this
                </span>
              )}
            </div>
            <p className="m-0 pl-10 font-serif text-[15px] leading-[1.55] text-ink-2 text-pretty">
              {opt.meaning}
            </p>
          </div>
        ))}
      </div>

      {lesson.connectionToPrevious && (
        <div className="bg-paper border-l-[3px] border-amber pl-4 pr-2 py-2">
          <span className="eyebrow text-[10px] mb-1 block">
            How this connects to row {lesson.order - 1}
          </span>
          <p className="m-0 font-serif italic text-[14.5px] leading-[1.55] text-ink-2 text-pretty">
            {lesson.connectionToPrevious}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onNext}
        className="self-start mt-1 px-[22px] py-2.5 bg-ink text-paper rounded-lg text-[14px] font-medium inline-flex items-center gap-2 hover:bg-ink-2 transition-colors"
      >
        {isFinal ? "Finish tutorial" : "Next row"}
        <span aria-hidden className="font-mono text-[14px]">
          →
        </span>
      </button>
    </section>
  );
}

function OfferAISPanel({
  normalXYScenarioName,
  aisScenarioName,
  aisDiagnosisName,
  onAccept,
  onDecline,
}: {
  normalXYScenarioName: string;
  aisScenarioName: string;
  aisDiagnosisName?: string;
  onAccept(): void;
  onDecline(): void;
}) {
  return (
    <section className="relative bg-amber-surface border border-amber-border rounded-xl p-6 flex flex-col gap-4 overflow-hidden">
      <span aria-hidden className="absolute left-0 top-0 bottom-0 w-1 bg-amber" />

      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-2">
        ✓ Tutorial complete · {normalXYScenarioName} walked
      </span>

      <h2 className="display text-[24px] leading-[1.25] m-0 text-pretty">
        The outcome table on the right is what this chart produces.
      </h2>

      <p className="m-0 font-serif text-[16px] leading-[1.55] text-ink text-pretty">
        Four columns — <strong className="font-semibold">gonads, internal
        genitalia, external genitalia, brain</strong> — each filled by a single
        row in the chart (rows 5, 9, 12, 14). Every scenario you walk produces
        one of these four-column outcomes. That's the deliverable.
      </p>

      <p className="m-0 font-serif text-[16px] leading-[1.55] text-ink text-pretty">
        Want to walk through a more complex case? {aisScenarioName}
        {aisDiagnosisName && (
          <span className="font-serif italic text-ink-2"> — {aisDiagnosisName}</span>
        )}
        . Same chart, but the path forks twice: once at the Wolffian ducts and
        once at external genitalia. Walking it shows how a single broken
        receptor produces the body-brain dissociation you've heard about — and
        how the outcome table shifts as a result.
      </p>

      <div className="flex items-center gap-3 mt-1">
        <button
          type="button"
          onClick={onAccept}
          className="px-[22px] py-2.5 bg-ink text-paper rounded-lg text-[14px] font-medium inline-flex items-center gap-2 hover:bg-ink-2 transition-colors"
        >
          Walk through AIS
          <span aria-hidden className="font-mono text-[14px]">
            →
          </span>
        </button>
        <button
          type="button"
          onClick={onDecline}
          className="px-4 py-2.5 text-[14px] font-medium text-ink-2 hover:text-ink transition-colors"
        >
          Skip — take me home
        </button>
      </div>
    </section>
  );
}

function AISLessonPanel({
  lesson,
  totalLessons,
  progressDashes,
  aisScenarioName,
  onNext,
  isFinal,
}: {
  lesson: AISLesson;
  totalLessons: number;
  progressDashes: string[];
  aisScenarioName: string;
  onNext(): void;
  isFinal: boolean;
}) {
  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-1.5">
        <div className="eyebrow">
          AIS walk · Row {String(lesson.order).padStart(2, "0")} /{" "}
          {totalLessons} · {lesson.label.replace(/\n/g, " ")}
        </div>
        <ProgressDashes tokens={progressDashes} />
      </header>

      <p className="m-0 font-serif text-[15.5px] italic text-ink-2 leading-snug">
        {aisScenarioName} would pick{" "}
        <strong className="not-italic font-normal text-ink">
          {lesson.pickedLabel}
        </strong>
      </p>

      <div className="flex items-start gap-5">
        <RowGlyph rowId={lesson.rowId} pathway={lesson.highlightCell.pathway} size={88} />
        <p className="m-0 font-serif text-[17.5px] leading-[1.55] text-ink text-pretty flex-1">
          {lesson.narration}
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="self-start mt-1 px-[22px] py-2.5 bg-ink text-paper rounded-lg text-[14px] font-medium inline-flex items-center gap-2 hover:bg-ink-2 transition-colors"
      >
        {isFinal ? "Finish AIS walk" : "Next row"}
        <span aria-hidden className="font-mono text-[14px]">
          →
        </span>
      </button>
    </section>
  );
}

function AISDonePanel({
  aisScenarioName,
  normalXYScenarioName,
  onExit,
}: {
  aisScenarioName: string;
  normalXYScenarioName: string;
  onExit(): void;
}) {
  return (
    <section className="bg-amber-surface border border-amber-border rounded-xl p-6 flex flex-col gap-4">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-2">
        ✓ {aisScenarioName} walked
      </span>
      <h2 className="display text-[24px] leading-[1.22] m-0 text-pretty">
        That's the whole chart, twice.
      </h2>
      <p className="m-0 font-serif text-[16.5px] leading-[1.55] text-ink-2 text-pretty">
        Compare the two outcome tables in your head: {normalXYScenarioName} and{" "}
        {aisScenarioName} produce different internals, different externals,
        but the same masculinized brain — that's the body/brain dissociation
        the chart is built to make visible. Ready to try scenarios on your own?
      </p>
      <button
        type="button"
        onClick={onExit}
        className="self-start mt-1 px-[22px] py-2.5 bg-ink text-paper rounded-lg text-[14px] font-medium inline-flex items-center gap-2 hover:bg-ink-2 transition-colors"
      >
        Back to home
        <span aria-hidden className="font-mono text-[14px]">
          →
        </span>
      </button>
    </section>
  );
}
