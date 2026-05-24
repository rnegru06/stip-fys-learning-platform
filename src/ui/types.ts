// Single boundary file the UI layer imports from. UI components must not
// import directly from `data/` or `engine/` — only from this file. That way
// each component is fully prop-driven and can be lifted into a visual design
// tool (e.g. Claude Design) without dragging in business logic.

export type {
  AnswerOption,
  CellRef,
  ChartCell,
  ChartEdge,
  ChartLayout,
  ChartRow,
  ModuleThreeAnswer,
  ModuleThreeBrain,
  ModuleThreeExternal,
  ModuleThreeGonad,
  ModuleThreeInternal,
  OutcomeCell,
  Pathway,
  RowId,
  Scenario,
} from "../data/chart.types";

// Pure utility — defined here (not imported) so `ui/` has zero runtime
// dependencies on `data/`. Keep this in sync with `data/chart.types.ts`.
import type { CellRef } from "../data/chart.types";
export function cellKey(ref: CellRef): string {
  return `${ref.rowId}::${ref.pathway}`;
}

// UI-only view-model shapes (no runtime, just data the controller hands the UI).

export interface MissedStep {
  rowId: string;
  order: number;
  label: string;
  correctOptionLabel: string;
  wrongOptions: Array<{ id: string; label: string; consequenceNote: string }>;
}

export interface FeedbackViewModel {
  introLine: string;
  frameTitle: string;
  frameLensText: string;
}

export interface ChartViewState {
  traversedCells: ReadonlySet<string>;
  retriedCells: ReadonlySet<string>;
  wrongWalkCell: import("../data/chart.types").CellRef | null;
  currentCellHint: import("../data/chart.types").CellRef | null;
  revealDimText: boolean;
}

export type Difficulty = "easy" | "hard";

export type RecommendationKind = { kind: "next"; nextScenarioId: string } | { kind: "replay" };
