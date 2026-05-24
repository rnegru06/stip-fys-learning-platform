// React adapter around the pure session state machine in `session-machine.ts`.
// Keeps the React dependency confined here so the state machine itself can be
// unit-tested or reused without React.

import { useCallback, useMemo, useReducer } from "react";
import type { AnswerOption, Scenario } from "../data/chart.types";
import { ROWS, ROW_BY_ID } from "../data/chart";
import {
  initialState,
  makeReducer,
  type SessionState,
} from "./session-machine";

export type {
  SessionStatus,
  WrongWalkState,
  ExplainerState,
  SessionState,
} from "./session-machine";

const reducer = makeReducer({ totalRows: ROWS.length });

export interface SessionApi {
  state: SessionState;
  currentRow: typeof ROWS[number] | null;
  options: AnswerOption[];
  submit(optionId: string): void;
  backUp(): void;
  continueAfterExplainer(): void;
  reset(scenarioId?: string): void;
}

export function useSession(scenario: Scenario): SessionApi {
  const [state, dispatch] = useReducer(reducer, scenario.id, initialState);

  const currentRow = state.status === "done" ? null : ROWS[state.currentIndex] ?? null;
  const options = useMemo(() => {
    if (!currentRow) return [];
    return scenario.rowOptions[currentRow.id] ?? [];
  }, [currentRow, scenario]);

  const submit = useCallback(
    (optionId: string) => {
      if (!currentRow) return;
      if (state.status !== "asking") return;
      const option = options.find((o) => o.id === optionId);
      if (!option) return;
      if (option.isCorrect) {
        const firstTry = !state.missedRows.has(currentRow.id);
        dispatch({
          type: "submit_correct",
          option,
          rowId: currentRow.id,
          rowLabel: currentRow.label,
          rowExplainer: currentRow.explainer,
          populates: currentRow.populates,
          firstTry,
        });
      } else {
        dispatch({ type: "submit_wrong", option, rowId: currentRow.id });
      }
    },
    [currentRow, options, state.status, state.missedRows]
  );

  const backUp = useCallback(() => {
    dispatch({ type: "back_up" });
  }, []);

  const continueAfterExplainer = useCallback(() => {
    dispatch({ type: "continue_after_explainer" });
  }, []);

  const reset = useCallback(
    (scenarioId?: string) => {
      dispatch({ type: "reset", scenarioId: scenarioId ?? scenario.id });
    },
    [scenario.id]
  );

  return { state, currentRow, options, submit, backUp, continueAfterExplainer, reset };
}

export function lookupRow(rowId: string) {
  return ROW_BY_ID[rowId as keyof typeof ROW_BY_ID];
}
