// Pure selection logic for the end-of-session feedback callout. Maps a
// student's miss pattern (missedRows + scenarioId) onto a Lindsay-authored
// ConfusionFrame, and produces the deterministic intro line that appears
// above the lens text. No model calls — selection is fully rule-based.

import type { RowId } from "../data/chart.types";
import type { ConfusionFrame, FrameTrigger } from "../data/confusion-frames";

export interface IntroRow {
  order: number;
  label: string;
}

export function selectFrame(
  missedRows: ReadonlySet<RowId>,
  scenarioId: string,
  frames: readonly ConfusionFrame[],
): ConfusionFrame | null {
  if (missedRows.size === 0) return null;
  const matches = frames
    .filter((f) => evaluateTrigger(f.trigger, missedRows, scenarioId))
    .sort((a, b) => b.priority - a.priority);
  return matches[0] ?? null;
}

export function evaluateTrigger(
  t: FrameTrigger,
  missed: ReadonlySet<RowId>,
  scenarioId: string,
): boolean {
  switch (t.kind) {
    case "all_of":
      return t.rows.length > 0 && t.rows.every((r) => missed.has(r));
    case "any_of":
      return t.rows.filter((r) => missed.has(r)).length >= t.minCount;
    case "scenario_in":
      return t.scenarios.includes(scenarioId) && missed.size > 0;
    case "and":
      return t.matchers.every((m) => evaluateTrigger(m, missed, scenarioId));
  }
}

// Builds the bolded first line of the callout from the same missedSteps
// shape the controller already computes. Picks the first 2–3 missed rows
// in chart order. Same miss pattern always yields the same intro line.
export function buildIntroLine(missed: readonly IntroRow[]): string {
  if (missed.length === 0) return "";
  const sorted = [...missed].sort((a, b) => a.order - b.order);
  const top = sorted.slice(0, 3);
  const phrases = top.map((m) => `row ${m.order} (${cleanLabel(m.label)})`);
  const remaining = sorted.length - top.length;
  const list = joinWithAnd(phrases);
  const suffix = remaining > 0 ? ` and ${remaining} more` : "";
  return `You stumbled on ${list}${suffix}.`;
}

function cleanLabel(label: string): string {
  return label.replace(/\n/g, " ").replace(/\?$/, "").trim();
}

function joinWithAnd(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
