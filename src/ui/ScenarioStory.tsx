// Scenario story strip — a 3-frame visual hook shown above the quiz panel
// at scenario start. Composed from existing RowGlyph pieces. Dismissible.
// Frames are derived in the controller and handed in as props.

import { useState } from "react";
import { RowGlyph } from "./RowGlyph";

export type StoryFrame =
  | { kind: "chromosomes"; chromosomalSex: "XX" | "XY"; caption: string }
  | { kind: "glyph"; rowId: string; pathway: "female" | "male"; caption: string }
  | { kind: "diagnosis"; label: string; caption: string };

interface ScenarioStoryProps {
  scenarioName: string;
  diagnosisName?: string;
  description: string;
  frames: StoryFrame[];
  /** Overrides the default eyebrow label (default: "The story you're walking"). */
  eyebrow?: string;
  /** When true, show an × button that hides the strip. Default false. */
  dismissible?: boolean;
}

export function ScenarioStory({
  scenarioName,
  diagnosisName,
  description,
  frames,
  eyebrow = "The story you're walking",
  dismissible = false,
}: ScenarioStoryProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <section className="relative bg-paper border border-rule rounded-xl p-5 pl-6 flex flex-col gap-3 overflow-hidden animate-story">
      <span aria-hidden className="absolute left-0 top-0 bottom-0 w-1 bg-ink" />

      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="eyebrow">{eyebrow}</span>
          <h3 className="display text-[19px] leading-[1.25] m-0">
            {scenarioName}
            {diagnosisName && (
              <span className="italic text-ink-2"> — {diagnosisName}</span>
            )}
          </h3>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss story"
            className="shrink-0 w-7 h-7 grid place-items-center rounded-md border border-rule-2 text-ink-3 hover:text-ink hover:border-ink transition-colors text-sm"
          >
            ×
          </button>
        )}
      </header>

      <p className="m-0 font-serif text-[14.5px] leading-[1.5] text-ink-2 text-pretty">
        {description}
      </p>

      <div className="flex flex-wrap items-stretch gap-2 mt-1">
        {frames.map((frame, i) => (
          <div key={i} className="flex items-stretch gap-2 flex-1 min-w-[120px]">
            <FrameTile frame={frame} delayMs={120 * i} />
            {i < frames.length - 1 && (
              <div className="flex items-center text-ink-3 font-mono text-lg select-none">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function FrameTile({ frame, delayMs }: { frame: StoryFrame; delayMs: number }) {
  return (
    <div
      className="flex-1 flex flex-col items-center gap-1.5 px-2 py-2 bg-paper-2 rounded-lg border border-rule animate-frame-reveal"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {frame.kind === "chromosomes" && (
        <RowGlyph rowId="chromosomal_sex"
          pathway={frame.chromosomalSex === "XY" ? "male" : "female"}
          size={72}
        />
      )}
      {frame.kind === "glyph" && (
        <RowGlyph rowId={frame.rowId} pathway={frame.pathway} size={72} />
      )}
      {frame.kind === "diagnosis" && (
        <div className="w-[72px] h-[72px] grid place-items-center bg-amber-surface border border-amber-border rounded-lg">
          <span className="font-mono text-[10px] font-semibold tracking-[0.08em] text-amber-2 text-center px-1 leading-tight">
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
