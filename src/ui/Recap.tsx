import { useState } from "react";
import type {
  ChartEdge,
  ChartLayout,
  ChartRow,
  FeedbackViewModel,
  MissedStep,
  OutcomeCell,
} from "./types";
import { ChartSVG } from "./ChartSVG";
import { FeedbackCallout } from "./FeedbackCallout";
import { OutcomeTable } from "./OutcomeTable";
import { RowGlyph } from "./RowGlyph";
import { type StoryFrame } from "./ScenarioStory";

interface RecapProps {
  scenarioDisplayName: string;
  scenarioDiagnosisName?: string;
  chartRows: ChartRow[];
  chartEdges: ChartEdge[];
  chartLayout: ChartLayout;
  traversedCells: ReadonlySet<string>;
  retriedCells: ReadonlySet<string>;
  outcomeCells: Record<OutcomeCell, string>;
  missedSteps: MissedStep[];
  score: number;
  bestStreak: number;
  totalRows: number;
  recommendationLabel: string;
  storyFrames: StoryFrame[];
  storyDescription: string;
  feedback?: FeedbackViewModel | null;
  onAct(): void;
  onBackToHome?(): void;
}

export function Recap({
  scenarioDisplayName,
  scenarioDiagnosisName,
  chartRows,
  chartEdges,
  chartLayout,
  traversedCells,
  retriedCells,
  outcomeCells,
  missedSteps,
  score,
  bestStreak,
  totalRows,
  recommendationLabel,
  storyFrames,
  storyDescription,
  feedback,
  onAct,
  onBackToHome,
}: RecapProps) {
  const [storyOpen, setStoryOpen] = useState(false);
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between gap-4 px-8 py-5 border-b border-rule">
        <div>
          <span className="eyebrow">Recap</span>
          <h1 className="display text-[26px] font-medium m-0 mt-1 tracking-[-0.012em]">
            {scenarioDisplayName}
          </h1>
          {scenarioDiagnosisName && (
            <p className="font-serif italic text-[14px] text-ink-3 m-0 mt-0.5">
              {scenarioDiagnosisName}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3.5">
          <div className="flex flex-col items-end">
            <span className="eyebrow text-[9.5px]">First-try accuracy</span>
            <span className="font-mono text-[22px] font-medium text-ink">
              {score}
              <span className="text-ink-3 text-sm"> / {totalRows}</span>
            </span>
          </div>
          <div className="w-px h-9 bg-rule" />
          <div className="flex flex-col items-end">
            <span className="eyebrow text-[9.5px]">Best streak</span>
            <span className="font-mono text-[22px] font-medium text-ink">{bestStreak}</span>
          </div>
          {onBackToHome && (
            <>
              <div className="w-px h-9 bg-rule" />
              <button
                type="button"
                onClick={onBackToHome}
                className="px-3.5 py-2 border border-rule-2 rounded-lg text-xs font-medium text-ink-2 bg-paper hover:bg-paper-2 hover:border-ink transition-colors"
              >
                Back to home
              </button>
            </>
          )}
        </div>
      </header>

      <div className="flex-1 grid grid-cols-[1.1fr_1fr] gap-[18px] p-[18px] overflow-hidden min-h-0">
        {/* LEFT — completed chart (unblurred at recap) */}
        <div className="bg-paper border border-rule rounded-xl px-3.5 pt-2.5 pb-1 flex flex-col overflow-hidden min-h-0">
          <div className="flex justify-between items-baseline pb-1">
            <span className="eyebrow">Completed pathway</span>
            <span className="font-serif italic text-ink-3 text-[11px]">every cell lit · revealed</span>
          </div>
          <div className="flex-1 min-h-0">
            <ChartSVG
              rows={chartRows}
              edges={chartEdges}
              layout={chartLayout}
              traversedCells={traversedCells}
              retriedCells={retriedCells}
              revealDimText
            />
          </div>
        </div>

        {/* RIGHT — outcome table FIRST, then story (collapsible), then missed-steps */}
        <div className="flex flex-col gap-3.5 overflow-y-auto min-h-0 pr-1">
          <OutcomeTable scenarioName={scenarioDisplayName} cells={outcomeCells} />

          <section className="bg-paper border border-rule rounded-[10px]">
            <button
              type="button"
              onClick={() => setStoryOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-paper-2 transition-colors rounded-[10px]"
              aria-expanded={storyOpen}
            >
              <div className="flex flex-col">
                <span className="eyebrow">The story you walked</span>
                <span className="font-serif italic text-ink-3 text-[12px] mt-0.5">
                  {storyOpen ? "tap to collapse" : "tap to expand"}
                </span>
              </div>
              <span
                aria-hidden
                className={
                  "font-mono text-ink-3 text-sm shrink-0 transition-transform " +
                  (storyOpen ? "rotate-90" : "")
                }
              >
                ▸
              </span>
            </button>
            {storyOpen && (
              <div className="border-t border-rule px-4 pt-3 pb-4 flex flex-col gap-3">
                <p className="m-0 font-serif text-[14px] leading-[1.5] text-ink-2 text-pretty">
                  {storyDescription}
                </p>
                <div className="flex flex-wrap items-stretch gap-2">
                  {storyFrames.map((frame, i) => (
                    <div
                      key={i}
                      className="flex items-stretch gap-2 flex-1 min-w-[140px]"
                    >
                      <StoryFrameTile frame={frame} />
                      {i < storyFrames.length - 1 && (
                        <div className="flex items-center text-ink-3 font-mono text-lg select-none">
                          →
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="bg-paper border border-rule rounded-[10px] px-4 py-3.5">
            <div className="flex items-baseline justify-between mb-2.5">
              <span className="eyebrow">Missed steps</span>
              <span className="font-serif italic text-ink-3 text-xs">
                {missedSteps.length === 0
                  ? "perfect run — nothing to review"
                  : `${missedSteps.length} to review`}
              </span>
            </div>

            {missedSteps.length === 0 ? (
              <p className="m-0 font-serif text-sm text-ink-3 italic">
                You walked the whole chart without a wrong pick. Nice.
              </p>
            ) : (
              <ol className="m-0 p-0 list-none flex flex-col gap-2">
                {missedSteps.map((m) => (
                  <MissedStepRow key={m.rowId} step={m} />
                ))}
              </ol>
            )}
          </section>

          {feedback && <FeedbackCallout {...feedback} />}

          <section className="border-[1.5px] border-ink rounded-[10px] px-4 py-3.5 bg-paper flex flex-col gap-2.5">
            <span className="eyebrow">Recommended next</span>
            <div className="font-serif text-base font-medium text-ink leading-tight">
              {recommendationLabel}
            </div>
            <button
              type="button"
              onClick={onAct}
              className="self-start mt-0.5 px-[18px] py-2.5 bg-ink text-paper rounded-lg text-[13px] font-medium inline-flex items-center gap-2 hover:bg-ink-2 transition-colors"
            >
              Continue
              <span aria-hidden className="font-mono text-[14px]">→</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function StoryFrameTile({ frame }: { frame: StoryFrame }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1.5 px-2 py-2 bg-paper-2 rounded-lg border border-rule">
      {frame.kind === "chromosomes" && (
        <RowGlyph
          rowId="chromosomal_sex"
          pathway={frame.chromosomalSex === "XY" ? "male" : "female"}
          size={64}
        />
      )}
      {frame.kind === "glyph" && (
        <RowGlyph rowId={frame.rowId} pathway={frame.pathway} size={64} />
      )}
      {frame.kind === "diagnosis" && (
        <div className="w-[64px] h-[64px] grid place-items-center bg-amber-surface border border-amber-border rounded-lg px-1">
          <span className="font-mono text-[9.5px] font-semibold tracking-[0.06em] text-amber-2 text-center leading-tight">
            {frame.label}
          </span>
        </div>
      )}
      <span className="font-serif italic text-[11.5px] text-ink-2 leading-tight text-center text-pretty">
        {frame.caption}
      </span>
    </div>
  );
}

function MissedStepRow({ step }: { step: MissedStep }) {
  const [expanded, setExpanded] = useState(false);
  const hasNote = step.wrongOptions.some((w) => w.consequenceNote.length > 0);

  return (
    <li className="border border-rule rounded-lg bg-paper-2 overflow-hidden">
      <button
        type="button"
        onClick={() => hasNote && setExpanded((x) => !x)}
        className={
          "w-full flex items-center gap-3 px-3 py-2.5 text-left " +
          (hasNote ? "hover:bg-paper transition-colors cursor-pointer" : "cursor-default")
        }
      >
        <RowGlyph rowId={step.rowId} pathway="male" size={44} />
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-ink-3 shrink-0">
              {String(step.order).padStart(2, "0")}
            </span>
            <span className="font-serif text-[13.5px] font-medium text-ink truncate">
              {step.label.replace(/\n/g, " ")}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[12px]">
              <span
                aria-hidden
                className="inline-grid place-items-center w-4 h-4 rounded-full bg-brick-tint border border-brick-border text-brick-2 text-[10px] leading-none font-bold"
              >
                ✕
              </span>
              <span className="font-serif italic text-ink-2">
                {step.wrongOptions[0]?.label ?? "—"}
              </span>
            </span>
            <span className="text-ink-3 font-mono text-[10px]">→</span>
            <span className="inline-flex items-center gap-1.5 text-[12px]">
              <span
                aria-hidden
                className="inline-grid place-items-center w-4 h-4 rounded-full bg-amber-tint border border-amber-border text-amber-2 text-[9px] leading-none font-bold"
              >
                ✓
              </span>
              <span className="font-serif text-ink">{step.correctOptionLabel}</span>
            </span>
          </div>
        </div>
        {hasNote && (
          <span
            aria-hidden
            className={
              "font-mono text-ink-3 text-xs shrink-0 transition-transform " +
              (expanded ? "rotate-90" : "")
            }
          >
            ▸
          </span>
        )}
      </button>

      {expanded && hasNote && (
        <div className="border-t border-dashed border-rule-2 px-4 py-3 bg-paper">
          {step.wrongOptions.map((w) => (
            <div key={w.id} className="mb-2 last:mb-0">
              <p className="m-0 font-serif text-[12.5px] italic text-ink-3 mb-1">
                If you'd picked <span className="text-ink not-italic">{w.label}</span>:
              </p>
              <p className="m-0 font-serif text-[13px] text-ink-2 leading-[1.55]">
                {w.consequenceNote}
              </p>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}
