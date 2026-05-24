// Pure state machine for a play-through. No React, no DOM. The React hook
// in `session.ts` is a thin adapter around this.

import type {
  AnswerOption,
  CellRef,
  OutcomeCell,
  RowId,
} from "../data/chart.types";
import { cellKey } from "../data/chart.types";

export type SessionStatus = "asking" | "wrong_walk" | "showing_explainer" | "done";

export interface WrongWalkState {
  rowId: RowId;
  pickedOption: AnswerOption;
  consequenceCell?: CellRef;
  note: string;
}

export interface ExplainerState {
  rowId: RowId;
  rowLabel: string;
  pickedOption: AnswerOption;
  explainer: string;
}

export interface SessionState {
  scenarioId: string;
  currentIndex: number;
  status: SessionStatus;
  traversedCells: ReadonlySet<string>;
  outcomeCells: Record<OutcomeCell, string>;
  missedRows: ReadonlySet<RowId>;
  score: number;
  streak: number;
  bestStreak: number;
  wrongWalk: WrongWalkState | null;
  wrongWalkCell: CellRef | null;
  explainer: ExplainerState | null;
}

export type Action =
  | {
      type: "submit_correct";
      option: AnswerOption;
      rowId: RowId;
      rowLabel: string;
      rowExplainer: string;
      populates?: OutcomeCell;
      firstTry: boolean;
    }
  | { type: "submit_wrong"; option: AnswerOption; rowId: RowId }
  | { type: "back_up" }
  | { type: "continue_after_explainer" }
  | { type: "reset"; scenarioId: string };

export function initialState(scenarioId: string): SessionState {
  return {
    scenarioId,
    currentIndex: 0,
    status: "asking",
    traversedCells: new Set(),
    outcomeCells: { gonads: "", internal: "", external: "", brain: "" },
    missedRows: new Set(),
    score: 0,
    streak: 0,
    bestStreak: 0,
    wrongWalk: null,
    wrongWalkCell: null,
    explainer: null,
  };
}

export interface ReducerConfig {
  totalRows: number;
}

export function makeReducer(config: ReducerConfig) {
  return function reducer(state: SessionState, action: Action): SessionState {
    switch (action.type) {
      case "submit_correct": {
        const lit = action.option.lightsCell!;
        const traversed = new Set(state.traversedCells);
        traversed.add(cellKey(lit));
        const outcomeCells = { ...state.outcomeCells };
        if (action.populates && action.option.cellWrite) {
          outcomeCells[action.populates] = action.option.cellWrite;
        }
        const newStreak = action.firstTry ? state.streak + 1 : state.streak;
        const newScore = action.firstTry ? state.score + 1 : state.score;
        return {
          ...state,
          status: "showing_explainer",
          traversedCells: traversed,
          outcomeCells,
          streak: newStreak,
          bestStreak: Math.max(state.bestStreak, newStreak),
          score: newScore,
          wrongWalk: null,
          wrongWalkCell: null,
          explainer: {
            rowId: action.rowId,
            rowLabel: action.rowLabel,
            pickedOption: action.option,
            explainer: action.rowExplainer,
          },
        };
      }
      case "submit_wrong": {
        const missed = new Set(state.missedRows);
        missed.add(action.rowId);
        return {
          ...state,
          status: "wrong_walk",
          streak: 0,
          missedRows: missed,
          wrongWalk: {
            rowId: action.rowId,
            pickedOption: action.option,
            consequenceCell: action.option.wrongConsequenceCell,
            note: action.option.wrongConsequenceNote ?? "",
          },
          wrongWalkCell: action.option.wrongConsequenceCell ?? null,
        };
      }
      case "back_up": {
        return {
          ...state,
          status: "asking",
          wrongWalk: null,
          wrongWalkCell: null,
        };
      }
      case "continue_after_explainer": {
        const nextIndex = state.currentIndex + 1;
        const status: SessionStatus = nextIndex >= config.totalRows ? "done" : "asking";
        return {
          ...state,
          currentIndex: nextIndex,
          status,
          explainer: null,
        };
      }
      case "reset": {
        return initialState(action.scenarioId);
      }
      default:
        return state;
    }
  };
}
