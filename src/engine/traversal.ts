import type { AnswerOption, CellRef, OutcomeCell, RowId, Scenario } from "../data/chart.types";
import { ROWS } from "../data/chart";

export interface TraversalStep {
  rowId: RowId;
  order: number;
  question: string;
  correctOption: AnswerOption;
  litCell: CellRef;
  outcomeWrite?: { cell: OutcomeCell; value: string };
}

export interface TraversalResult {
  scenarioId: string;
  steps: TraversalStep[];
  outcomeCells: Record<OutcomeCell, string>;
}

export function traverse(scenario: Scenario): TraversalResult {
  const steps: TraversalStep[] = [];
  const outcomeCells: Record<OutcomeCell, string> = {
    gonads: "",
    internal: "",
    external: "",
    brain: "",
  };

  for (const row of ROWS) {
    const options = scenario.rowOptions[row.id];
    if (!options) {
      throw new Error(`Scenario ${scenario.id} is missing rowOptions for row ${row.id}`);
    }
    const correct = options.find((opt) => opt.isCorrect);
    if (!correct) {
      throw new Error(`Scenario ${scenario.id} has no correct option for row ${row.id}`);
    }
    if (!correct.lightsCell) {
      throw new Error(
        `Scenario ${scenario.id} correct option ${correct.id} for row ${row.id} is missing lightsCell`
      );
    }

    const step: TraversalStep = {
      rowId: row.id,
      order: row.order,
      question: row.question,
      correctOption: correct,
      litCell: correct.lightsCell,
    };

    if (row.populates && correct.cellWrite) {
      step.outcomeWrite = { cell: row.populates, value: correct.cellWrite };
      outcomeCells[row.populates] = correct.cellWrite;
    }

    steps.push(step);
  }

  return { scenarioId: scenario.id, steps, outcomeCells };
}
