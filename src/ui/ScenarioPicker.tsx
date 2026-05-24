import { useState } from "react";
import type { Difficulty } from "./types";

interface ScenarioCard {
  id: string;
  displayName: string;
  description?: string;
  chromosomalSex: "XX" | "XY";
  diagnosisName?: string;
}

interface ScenarioPickerProps {
  scenarios: ScenarioCard[];
  recommendedId: string | null;
  completedEasyIds: ReadonlySet<string>;
  completedHardIds: ReadonlySet<string>;
  difficulty: Difficulty;
  onPick(scenarioId: string): void;
  onChangeDifficulty(d: Difficulty): void;
  onBackToHome?(): void;
}

export function ScenarioPicker({
  scenarios,
  recommendedId,
  completedEasyIds,
  completedHardIds,
  difficulty,
  onPick,
  onChangeDifficulty,
  onBackToHome,
}: ScenarioPickerProps) {
  const completedNow = difficulty === "easy" ? completedEasyIds : completedHardIds;
  const doneCount = scenarios.filter((s) => completedNow.has(s.id)).length;
  const xxScenarios = scenarios.filter((s) => s.chromosomalSex === "XX");
  const xyScenarios = scenarios.filter((s) => s.chromosomalSex === "XY");

  const [xxOpen, setXxOpen] = useState(true);
  const [xyOpen, setXyOpen] = useState(true);

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-end justify-between px-10 pt-8 pb-5 border-b border-rule gap-4 flex-wrap">
        <div>
          <span className="eyebrow">Pick a scenario</span>
          <h1 className="display text-[32px] font-medium m-0 mt-1.5 tracking-[-0.014em]">
            Twenty perturbations of the same pathway.
          </h1>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <DifficultyToggle value={difficulty} onChange={onChangeDifficulty} />
          <span className="font-mono text-xs text-ink-3">
            {doneCount} / {scenarios.length} on {difficulty}
          </span>
          <div className="w-[120px] h-1 bg-rule rounded-sm overflow-hidden">
            <div
              className={difficulty === "easy" ? "h-full bg-lit" : "h-full bg-amber"}
              style={{ width: `${(doneCount / Math.max(scenarios.length, 1)) * 100}%` }}
            />
          </div>
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="px-3.5 py-2 border border-rule-2 rounded-lg text-xs font-medium text-ink-2 bg-paper hover:bg-paper-2 hover:border-ink transition-colors"
            >
              Back to home
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-10 pt-6 pb-10 flex flex-col gap-6">
        <ChromosomeSection
          title="XX scenarios"
          subtitle="Begin with two X chromosomes."
          count={xxScenarios.length}
          completedInGroup={xxScenarios.filter((s) => completedNow.has(s.id)).length}
          open={xxOpen}
          onToggle={() => setXxOpen((v) => !v)}
        >
          <ScenarioGrid
            scenarios={xxScenarios}
            recommendedId={recommendedId}
            completedEasyIds={completedEasyIds}
            completedHardIds={completedHardIds}
            onPick={onPick}
          />
        </ChromosomeSection>

        <ChromosomeSection
          title="XY scenarios"
          subtitle="Begin with one X and one Y."
          count={xyScenarios.length}
          completedInGroup={xyScenarios.filter((s) => completedNow.has(s.id)).length}
          open={xyOpen}
          onToggle={() => setXyOpen((v) => !v)}
        >
          <ScenarioGrid
            scenarios={xyScenarios}
            recommendedId={recommendedId}
            completedEasyIds={completedEasyIds}
            completedHardIds={completedHardIds}
            onPick={onPick}
          />
        </ChromosomeSection>
      </div>
    </div>
  );
}

function DifficultyToggle({
  value,
  onChange,
}: {
  value: Difficulty;
  onChange(d: Difficulty): void;
}) {
  return (
    <div className="inline-flex border border-rule-2 rounded-lg p-0.5 bg-paper-2">
      {(["easy", "hard"] as const).map((d) => {
        const active = value === d;
        return (
          <button
            key={d}
            type="button"
            onClick={() => onChange(d)}
            className={
              "px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors " +
              (active
                ? "bg-paper border border-rule shadow-[0_1px_0_rgba(0,0,0,0.04)] text-ink"
                : "text-ink-3 hover:text-ink")
            }
            aria-pressed={active}
          >
            {d === "easy" ? "Easy — chart visible" : "Hard — chart blurred"}
          </button>
        );
      })}
    </div>
  );
}

function ChromosomeSection({
  title,
  subtitle,
  count,
  completedInGroup,
  open,
  onToggle,
  children,
}: {
  title: string;
  subtitle: string;
  count: number;
  completedInGroup: number;
  open: boolean;
  onToggle(): void;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3.5">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-baseline justify-between text-left -mx-2 px-2 py-1 rounded-md hover:bg-paper-2 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-3">
          <span
            aria-hidden
            className={
              "inline-block font-mono text-[14px] text-ink-2 transition-transform " +
              (open ? "rotate-90" : "")
            }
          >
            ▸
          </span>
          <span className="font-serif text-[20px] font-medium text-ink leading-tight">
            {title}
          </span>
          <span className="font-serif italic text-[13px] text-ink-3">
            {subtitle}
          </span>
        </div>
        <span className="font-mono text-[11px] text-ink-3 tracking-wider">
          {completedInGroup} / {count} done
        </span>
      </button>

      {open && children}
    </section>
  );
}

function ScenarioGrid({
  scenarios,
  recommendedId,
  completedEasyIds,
  completedHardIds,
  onPick,
}: {
  scenarios: ScenarioCard[];
  recommendedId: string | null;
  completedEasyIds: ReadonlySet<string>;
  completedHardIds: ReadonlySet<string>;
  onPick(scenarioId: string): void;
}) {
  return (
    <div className="grid grid-cols-4 gap-3.5">
      {scenarios.map((s, idx) => {
        const isRec = s.id === recommendedId;
        const easyDone = completedEasyIds.has(s.id);
        const hardDone = completedHardIds.has(s.id);
        const anyDone = easyDone || hardDone;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onPick(s.id)}
            className={
              "relative text-left rounded-[10px] px-4 pt-4 pb-[18px] " +
              "flex flex-col gap-2.5 min-h-[120px] transition-colors duration-100 " +
              (isRec
                ? "bg-amber-surface border-[1.5px] border-amber"
                : "bg-paper border border-rule-2 hover:border-ink") +
              (anyDone ? " opacity-[0.92]" : "")
            }
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10.5px] text-ink-3 tracking-wider">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {isRec && (
                <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-amber-2">
                  ★ Recommended next
                </span>
              )}
            </div>

            <div className="font-serif text-base font-medium leading-tight text-ink tracking-[-0.005em] text-balance">
              {s.displayName}
            </div>

            {s.diagnosisName && (
              <div className="font-serif italic text-[12.5px] leading-snug text-ink-2">
                {s.diagnosisName}
              </div>
            )}

            <div className="mt-auto flex items-center gap-2 pt-1">
              <ModeBadge label="Easy" done={easyDone} />
              <ModeBadge label="Hard" done={hardDone} />
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ModeBadge({ label, done }: { label: string; done: boolean }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.06em] " +
        (done
          ? "bg-lit-bg border border-lit text-lit-2"
          : "bg-paper-2 border border-rule-2 text-ink-3")
      }
    >
      <span aria-hidden className="text-[9px]">{done ? "✓" : "○"}</span>
      {label}
    </span>
  );
}
