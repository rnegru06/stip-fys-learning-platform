export type Pathway = "female" | "male";

export type OutcomeCell = "gonads" | "internal" | "external" | "brain";

export type RowId =
  | "chromosomal_sex"
  | "sry"
  | "gonadal_dev"
  | "local_testosterone"
  | "wolffian"
  | "amh"
  | "mullerian"
  | "blood_testosterone"
  | "five_alpha_reductase"
  | "external_genitalia"
  | "sexual_behavior"
  | "gnrh_pattern";

export interface CellRef {
  rowId: RowId;
  pathway: Pathway;
}

export interface ChartCell {
  rowId: RowId;
  pathway: Pathway;
  display: string;
  layout: { x: number; y: number };
}

export interface ChartRow {
  id: RowId;
  order: number;
  label: string;
  question: string;
  explainer: string;
  populates?: OutcomeCell;
  cells: { female: ChartCell; male: ChartCell };
}

export interface ChartEdge {
  from: CellRef;
  to: CellRef;
  style: "solid" | "dashed";
  curved?: boolean;
  loopBack?: boolean;
}

export interface AnswerOption {
  id: string;
  label: string;
  isCorrect: boolean;
  lightsCell?: CellRef;
  cellWrite?: string;
  wrongConsequenceCell?: CellRef;
  wrongConsequenceNote?: string;
}

export type ModuleThreeGonad = "Testes" | "Ovaries" | "Both" | "None";
export type ModuleThreeInternal = "Wolffian" | "Müllerian" | "Both" | "None";
export type ModuleThreeExternal = "Male" | "Female" | "Male (masculinized)";
export type ModuleThreeBrain = "Masculinized" | "Feminized";

export interface ModuleThreeAnswer {
  gonads: ModuleThreeGonad;
  internal: ModuleThreeInternal;
  external: ModuleThreeExternal;
  brain: ModuleThreeBrain;
}

export interface Scenario {
  id: string;
  displayName: string;
  description?: string;
  chromosomalSex: "XX" | "XY";
  diagnosisName?: string;
  rowOptions: Record<RowId, AnswerOption[]>;
  outcomeForCell: Record<OutcomeCell, string>;
  moduleThreeAnswer: ModuleThreeAnswer;
  recommendedAfter?: string[];
}

export interface ChartLayout {
  viewBoxWidth: number;
  viewBoxHeight: number;
  xFemale: number;
  xMale: number;
  yTop: number;
  yStep: number;
  labelRightEdge: number;
}

export function cellKey(ref: CellRef): string {
  return `${ref.rowId}::${ref.pathway}`;
}
