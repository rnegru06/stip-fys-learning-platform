// Composition root logic. The controller is the ONE place that imports both
// `data/` (runtime values like ROWS, EDGES, SCENARIOS) and `ui/` types. It
// produces a complete view-model that App renders. UI components never
// import from `data/` or `engine/` directly.

import { useCallback, useEffect, useMemo, useState } from "react";
import { CHART_LAYOUT, EDGES, ROWS, ROW_BY_ID } from "./data/chart";
import { CONFUSION_FRAMES } from "./data/confusion-frames";
import { SCENARIOS, SCENARIO_BY_ID } from "./data/scenarios";
import { TUTORIAL_ROW_BY_ID, AIS_NARRATION } from "./data/tutorial";
import { buildIntroLine, selectFrame } from "./engine/feedback-selector";
import { useSession } from "./engine/session";
import type {
  AnswerOption,
  CellRef,
  ChartEdge,
  ChartLayout,
  ChartRow,
  Difficulty,
  FeedbackViewModel,
  MissedStep,
  ModuleThreeAnswer,
  OutcomeCell,
  RecommendationKind,
  Scenario,
} from "./ui/types";
import { cellKey } from "./ui/types";

export type Screen =
  | "onboarding"
  | "home"
  | "tutorial"
  | "picker"
  | "play"
  | "recap"
  | "module3"
  | "module3recap";

const NORMAL_XY_ID = "normal_xy";
const AIS_ID = "ais";

const TOTAL_ROWS = ROWS.length;
const REPLAY_THRESHOLD = 3;
const MODULE_THREE_QUESTION_COUNT = 4;
const MODULE_THREE_UNLOCK_PASSWORD = "test123";

interface ChartConstants {
  rows: ChartRow[];
  edges: ChartEdge[];
  layout: ChartLayout;
}

interface ChartViewState {
  traversedCells: ReadonlySet<string>;
  retriedCells: ReadonlySet<string>;
  wrongWalkCell: CellRef | null;
  currentCellHint: CellRef | null;
  revealDimText: boolean;
}

export type StoryFrame =
  | { kind: "chromosomes"; chromosomalSex: "XX" | "XY"; caption: string }
  | { kind: "glyph"; rowId: string; pathway: "female" | "male"; caption: string }
  | { kind: "diagnosis"; label: string; caption: string };

export interface ScenarioStoryVM {
  scenarioName: string;
  diagnosisName?: string;
  description: string;
  frames: StoryFrame[];
}

export type PlayPanel =
  | { kind: "quiz"; row: ChartRow; options: AnswerOption[]; onPick(optionId: string): void }
  | { kind: "wrong"; rowId: string; pickedLabel: string; note: string; onBackUp(): void }
  | {
      kind: "explainer";
      rowId: string;
      rowLabel: string;
      pickedLabel: string;
      pickedPathway: "female" | "male";
      explainer: string;
      isFinalRow: boolean;
      onContinue(): void;
    };

export interface PlayViewModel {
  scenarioDisplayName: string;
  scenarioDiagnosisName?: string;
  difficulty: Difficulty;
  score: number;
  streak: number;
  bestStreak: number;
  totalRows: number;
  chartState: ChartViewState;
  outcomeCells: Record<OutcomeCell, string>;
  activePanel: PlayPanel | null;
  story: ScenarioStoryVM;
  onSwitchScenario(): void;
}

export interface RecapViewModel {
  scenarioDisplayName: string;
  scenarioDiagnosisName?: string;
  difficulty: Difficulty;
  traversedCells: ReadonlySet<string>;
  retriedCells: ReadonlySet<string>;
  outcomeCells: Record<OutcomeCell, string>;
  missedSteps: MissedStep[];
  score: number;
  bestStreak: number;
  totalRows: number;
  recommendation: RecommendationKind;
  recommendationLabel: string;
  story: ScenarioStoryVM;
  feedback: FeedbackViewModel | null;
  onAct(): void;
}

export interface PickerViewModel {
  scenarios: Scenario[];
  recommendedId: string | null;
  completedEasyIds: ReadonlySet<string>;
  completedHardIds: ReadonlySet<string>;
  difficulty: Difficulty;
  onPick(scenarioId: string): void;
  onChangeDifficulty(d: Difficulty): void;
  onBackToHome(): void;
}

export interface HomeViewModel {
  onPickTutorial(): void;
  onPickPractice(): void;
  onPickModule3(): void;
  practiceCount: number;
  completedEasyCount: number;
  completedHardCount: number;
  module3Unlocked: boolean;
  module3LockReason: string;
  module3PasswordUnlocked: boolean;
  // Returns true if the password was correct; false otherwise.
  onSubmitModule3Password(password: string): boolean;
}

export interface TutorialRowLessonVM {
  rowId: string;
  order: number;
  label: string;
  question: string;
  questionMeaning: string;
  options: Array<{ id: string; label: string; meaning: string; isCorrectForNormalXY: boolean }>;
  connectionToPrevious?: string;
  highlightCell: CellRef;
  populatesOutcome?: OutcomeCell;
}

export interface TutorialAISLessonVM {
  rowId: string;
  order: number;
  label: string;
  narration: string;
  highlightCell: CellRef;
  pickedLabel: string;
  populatesOutcome?: OutcomeCell;
}

export interface TutorialViewModel {
  rowLessons: TutorialRowLessonVM[];
  aisLessons: TutorialAISLessonVM[];
  normalXYScenarioName: string;
  normalXYOutcomes: Record<OutcomeCell, string>;
  aisScenarioName: string;
  aisDiagnosisName?: string;
  aisOutcomes: Record<OutcomeCell, string>;
  onExitToHome(): void;
}

export interface ModuleThreeQuestionVM {
  scenarioId: string;
  scenarioDisplayName: string;
  scenarioDiagnosisName?: string;
  chromosomalSex: "XX" | "XY";
  index: number;
  total: number;
  // Already-picked answers (so the form stays sticky as the student fills it in).
  picks: Partial<ModuleThreeAnswer>;
  onPick(cell: OutcomeCell, value: string): void;
  onSubmit(): void;
  canSubmit: boolean;
}

export interface ModuleThreeResultRowVM {
  scenarioId: string;
  scenarioDisplayName: string;
  scenarioDiagnosisName?: string;
  correctAnswer: ModuleThreeAnswer;
  studentAnswer: ModuleThreeAnswer;
  perCellCorrect: Record<OutcomeCell, boolean>;
  allFourCorrect: boolean;
}

export interface ModuleThreeRecapVM {
  rows: ModuleThreeResultRowVM[];
  totalQuestions: number;
  perfectScenarios: number;
  totalCells: number;
  correctCells: number;
  onRetry(): void;
  onBackToHome(): void;
}

export interface ModuleThreeViewModel {
  currentQuestion: ModuleThreeQuestionVM | null;
  onExitToHome(): void;
}

export interface AppViewModel {
  screen: Screen;
  chart: ChartConstants;
  onContinueOnboarding(): void;
  home: HomeViewModel;
  tutorial: TutorialViewModel;
  picker: PickerViewModel;
  play: PlayViewModel;
  recap: RecapViewModel;
  module3: ModuleThreeViewModel;
  module3recap: ModuleThreeRecapVM;
  onBackToHomeFromPlay(): void;
  onBackToHomeFromRecap(): void;
}

// Pick `count` distinct scenario IDs at random from the catalogue, with no
// duplicates within the set.
function pickRandomScenarios(count: number): string[] {
  const pool = SCENARIOS.map((s) => s.id);
  // Fisher-Yates shuffle and take the first N.
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

export function useAppController(): AppViewModel {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [scenarioId, setScenarioId] = useState<string>(SCENARIOS[0].id);
  const [difficulty, setDifficulty] = useState<Difficulty>("hard");
  const [completedEasy, setCompletedEasy] = useState<Set<string>>(new Set());
  const [completedHard, setCompletedHard] = useState<Set<string>>(new Set());
  const [module3PasswordUnlocked, setModule3PasswordUnlocked] = useState(false);

  // Module 3 state — the selected 4 scenarios and the student's picks so far.
  const [m3ScenarioIds, setM3ScenarioIds] = useState<string[]>([]);
  const [m3Index, setM3Index] = useState(0);
  const [m3Picks, setM3Picks] = useState<Array<Partial<ModuleThreeAnswer>>>([]);
  const [m3Submitted, setM3Submitted] = useState<ModuleThreeAnswer[] | null>(null);

  const scenario = SCENARIO_BY_ID[scenarioId];
  const session = useSession(scenario);

  const allDoneEasy = completedEasy.size === SCENARIOS.length;
  const allDoneHard = completedHard.size === SCENARIOS.length;
  const module3Unlocked =
    module3PasswordUnlocked ||
    allDoneHard ||
    (allDoneEasy && completedHard.size >= 1);
  const module3LockReason = (() => {
    if (module3Unlocked) return "";
    if (!allDoneEasy && completedHard.size === 0) {
      return `Complete all ${SCENARIOS.length} scenarios on easy, then at least one on hard — or all on hard — to unlock the quiz simulation.`;
    }
    if (!allDoneEasy) {
      return `Finish the remaining ${SCENARIOS.length - completedEasy.size} easy scenario(s) to unlock.`;
    }
    return `Complete one scenario on hard mode to unlock.`;
  })();

  const recommendation = useMemo(() => {
    const missedCount = session.state.missedRows.size;
    if (missedCount >= REPLAY_THRESHOLD) {
      return {
        kind: "replay" as const,
        label: `You missed ${missedCount} steps — replaying this scenario will help lock it in before moving on.`,
      };
    }
    const completedNow = difficulty === "easy" ? completedEasy : completedHard;
    const next = SCENARIOS.find(
      (s) => s.id !== scenarioId && (s.recommendedAfter ?? []).includes(scenarioId)
    );
    if (next) {
      return {
        kind: "next" as const,
        nextScenarioId: next.id,
        label: `Nice work — try "${next.displayName}" next to see how a perturbation reroutes the chart.`,
      };
    }
    const fresh = SCENARIOS.find((s) => !completedNow.has(s.id) && s.id !== scenarioId);
    if (fresh) {
      return {
        kind: "next" as const,
        nextScenarioId: fresh.id,
        label: `Try "${fresh.displayName}" next.`,
      };
    }
    return {
      kind: "replay" as const,
      label: "You've finished every scenario in this mode. Replay any one to reinforce the chart.",
    };
  }, [session.state.missedRows.size, scenarioId, completedEasy, completedHard, difficulty]);

  const recommendedIdForPicker = useMemo(() => {
    const completedNow = difficulty === "easy" ? completedEasy : completedHard;
    if (completedNow.size === 0) return SCENARIOS[0].id;
    const next = SCENARIOS.find(
      (s) =>
        !completedNow.has(s.id) &&
        (s.recommendedAfter ?? []).some((req) => completedNow.has(req))
    );
    if (next) return next.id;
    const fresh = SCENARIOS.find((s) => !completedNow.has(s.id));
    return fresh ? fresh.id : null;
  }, [completedEasy, completedHard, difficulty]);

  const startScenario = useCallback(
    (id: string) => {
      setScenarioId(id);
      session.reset(id);
      setScreen("play");
    },
    [session]
  );

  useEffect(() => {
    if (screen === "play" && session.state.status === "done") {
      const setter = difficulty === "easy" ? setCompletedEasy : setCompletedHard;
      setter((prev) => {
        if (prev.has(scenarioId)) return prev;
        const next = new Set(prev);
        next.add(scenarioId);
        return next;
      });
      setScreen("recap");
    }
  }, [screen, session.state.status, scenarioId, difficulty]);

  const chart: ChartConstants = useMemo(
    () => ({ rows: ROWS, edges: EDGES, layout: CHART_LAYOUT }),
    []
  );

  const retriedCells = useMemo(() => {
    // A cell counts as "retried" if the row was ever wrong AND has now been
    // walked (the lit cell on the correct path of a previously-missed row).
    const set = new Set<string>();
    for (const key of session.state.traversedCells) {
      const rowId = key.split("::")[0];
      if (session.state.missedRows.has(rowId as never)) set.add(key);
    }
    return set as ReadonlySet<string>;
  }, [session.state.traversedCells, session.state.missedRows]);

  const chartState: ChartViewState = useMemo(
    () => ({
      traversedCells: session.state.traversedCells,
      retriedCells,
      wrongWalkCell: session.state.wrongWalkCell,
      currentCellHint: null,
      // Easy mode reveals chart text from the start; hard mode keeps the blur.
      revealDimText: difficulty === "easy",
    }),
    [session.state.traversedCells, session.state.wrongWalkCell, retriedCells, difficulty]
  );

  const activePanel: PlayPanel | null = useMemo(() => {
    if (session.state.status === "asking" && session.currentRow) {
      return {
        kind: "quiz",
        row: session.currentRow,
        options: session.options,
        onPick: session.submit,
      };
    }
    if (session.state.status === "wrong_walk" && session.state.wrongWalk) {
      return {
        kind: "wrong",
        rowId: session.state.wrongWalk.rowId,
        pickedLabel: session.state.wrongWalk.pickedOption.label,
        note: session.state.wrongWalk.note,
        onBackUp: session.backUp,
      };
    }
    if (session.state.status === "showing_explainer" && session.state.explainer) {
      return {
        kind: "explainer",
        rowId: session.state.explainer.rowId,
        rowLabel: session.state.explainer.rowLabel,
        pickedLabel: session.state.explainer.pickedOption.label,
        pickedPathway:
          session.state.explainer.pickedOption.lightsCell?.pathway ?? "male",
        explainer: session.state.explainer.explainer,
        isFinalRow: session.state.currentIndex >= TOTAL_ROWS - 1,
        onContinue: session.continueAfterExplainer,
      };
    }
    return null;
  }, [session]);

  // Derive the scenario story strip (3 frames) from the scenario's pathway.
  const story: ScenarioStoryVM = useMemo(() => {
    const sx = scenario.chromosomalSex;
    const typicalSide: "male" | "female" = sx === "XY" ? "male" : "female";
    let perturbationRow: ChartRow | null = null;
    let perturbationPathway: "male" | "female" = typicalSide;
    for (const row of ROWS) {
      const correct = scenario.rowOptions[row.id].find((o) => o.isCorrect);
      const side = correct?.lightsCell?.pathway;
      if (side && side !== typicalSide) {
        perturbationRow = row;
        perturbationPathway = side;
        break;
      }
    }

    const chromosomesFrame: StoryFrame = {
      kind: "chromosomes",
      chromosomalSex: sx,
      caption: sx,
    };

    let middleFrame: StoryFrame;
    if (perturbationRow) {
      middleFrame = {
        kind: "glyph",
        rowId: perturbationRow.id,
        pathway: perturbationPathway,
        caption: `${perturbationRow.label.replace(/\n/g, " ")} forks`,
      };
    } else {
      middleFrame = {
        kind: "glyph",
        rowId: "gonadal_dev",
        pathway: typicalSide,
        caption: typicalSide === "male" ? "Testes form" : "Ovaries form",
      };
    }

    const diagnosisFrame: StoryFrame = {
      kind: "diagnosis",
      label: scenario.diagnosisName ?? "Typical development",
      caption: scenario.diagnosisName ? "diagnosis" : "no perturbation",
    };

    return {
      scenarioName: scenario.displayName,
      diagnosisName: scenario.diagnosisName,
      description:
        scenario.description ??
        "Walk the chart to see how this case maps onto the differentiation pathway.",
      frames: [chromosomesFrame, middleFrame, diagnosisFrame],
    };
  }, [scenario]);

  const missedSteps: MissedStep[] = useMemo(() => {
    return Array.from(session.state.missedRows).map((rowId) => {
      const row = ROW_BY_ID[rowId];
      const opts = scenario.rowOptions[rowId];
      const correct = opts.find((o) => o.isCorrect)!;
      const wrongs = opts.filter((o) => !o.isCorrect);
      return {
        rowId,
        order: row.order,
        label: row.label.replace(/\n/g, " "),
        correctOptionLabel: correct.label,
        wrongOptions: wrongs.map((w) => ({
          id: w.id,
          label: w.label,
          consequenceNote: w.wrongConsequenceNote ?? "",
        })),
      };
    });
  }, [session.state.missedRows, scenario]);

  const feedback: FeedbackViewModel | null = useMemo(() => {
    if (session.state.status !== "done") return null;
    const frame = selectFrame(
      session.state.missedRows,
      scenario.id,
      CONFUSION_FRAMES,
    );
    if (!frame) return null;
    return {
      introLine: buildIntroLine(missedSteps),
      frameTitle: frame.title,
      frameLensText: frame.lensText,
    };
  }, [session.state.status, session.state.missedRows, scenario.id, missedSteps]);

  const onSubmitModule3Password = useCallback((password: string): boolean => {
    if (password.trim() === MODULE_THREE_UNLOCK_PASSWORD) {
      setModule3PasswordUnlocked(true);
      return true;
    }
    return false;
  }, []);

  const onContinueOnboarding = useCallback(() => setScreen("home"), []);
  const onSwitchScenario = useCallback(() => setScreen("picker"), []);
  const onPickTutorial = useCallback(() => setScreen("tutorial"), []);
  const onPickPractice = useCallback(() => setScreen("picker"), []);
  const onExitTutorialToHome = useCallback(() => setScreen("home"), []);
  const onBackToHomeFromPicker = useCallback(() => setScreen("home"), []);
  const onBackToHomeFromPlay = useCallback(() => setScreen("home"), []);
  const onBackToHomeFromRecap = useCallback(() => setScreen("home"), []);
  const onChangeDifficulty = useCallback((d: Difficulty) => setDifficulty(d), []);

  const startModuleThree = useCallback(() => {
    const ids = pickRandomScenarios(MODULE_THREE_QUESTION_COUNT);
    setM3ScenarioIds(ids);
    setM3Index(0);
    setM3Picks(ids.map(() => ({})));
    setM3Submitted(null);
    setScreen("module3");
  }, []);

  const onAct = useCallback(() => {
    if (recommendation.kind === "next") {
      startScenario(recommendation.nextScenarioId);
    } else {
      startScenario(scenarioId);
    }
  }, [recommendation, startScenario, scenarioId]);

  // Build the tutorial view-model.
  const tutorialVM: TutorialViewModel = useMemo(() => {
    const normalXY = SCENARIO_BY_ID[NORMAL_XY_ID];
    const ais = SCENARIO_BY_ID[AIS_ID];

    const rowLessons: TutorialRowLessonVM[] = ROWS.map((row) => {
      const tut = TUTORIAL_ROW_BY_ID[row.id];
      const opts = normalXY.rowOptions[row.id];
      const correct = opts.find((o) => o.isCorrect)!;
      const highlightCell: CellRef = correct.lightsCell ?? {
        rowId: row.id,
        pathway: "male",
      };
      return {
        rowId: row.id,
        order: row.order,
        label: row.label,
        question: row.question,
        questionMeaning: tut.questionMeaning,
        options: opts.map((o) => ({
          id: o.id,
          label: o.label,
          meaning: tut.optionMeanings[o.id] ?? "",
          isCorrectForNormalXY: o.isCorrect,
        })),
        connectionToPrevious: tut.connectionToPrevious,
        highlightCell,
        populatesOutcome: row.populates,
      };
    });

    const aisLessons: TutorialAISLessonVM[] = ROWS.map((row) => {
      const opts = ais.rowOptions[row.id];
      const correct = opts.find((o) => o.isCorrect)!;
      const highlightCell: CellRef = correct.lightsCell ?? {
        rowId: row.id,
        pathway: "male",
      };
      return {
        rowId: row.id,
        order: row.order,
        label: row.label,
        narration: AIS_NARRATION[row.id] ?? "",
        highlightCell,
        pickedLabel: correct.label,
        populatesOutcome: row.populates,
      };
    });

    return {
      rowLessons,
      aisLessons,
      normalXYScenarioName: normalXY.displayName,
      normalXYOutcomes: normalXY.outcomeForCell,
      aisScenarioName: ais.displayName,
      aisDiagnosisName: ais.diagnosisName,
      aisOutcomes: ais.outcomeForCell,
      onExitToHome: onExitTutorialToHome,
    };
  }, [onExitTutorialToHome]);

  const homeVM: HomeViewModel = useMemo(
    () => ({
      onPickTutorial,
      onPickPractice,
      onPickModule3: startModuleThree,
      practiceCount: SCENARIOS.length,
      completedEasyCount: completedEasy.size,
      completedHardCount: completedHard.size,
      module3Unlocked,
      module3LockReason,
      module3PasswordUnlocked,
      onSubmitModule3Password,
    }),
    [
      onPickTutorial,
      onPickPractice,
      startModuleThree,
      completedEasy,
      completedHard,
      module3Unlocked,
      module3LockReason,
      module3PasswordUnlocked,
      onSubmitModule3Password,
    ],
  );

  // ─── Module 3 view-model ────────────────────────────────────────────
  const onPickM3 = useCallback((cell: OutcomeCell, value: string) => {
    setM3Picks((prev) => {
      const next = prev.map((p, i) => (i === m3Index ? { ...p, [cell]: value } : p));
      return next;
    });
  }, [m3Index]);

  const onSubmitM3 = useCallback(() => {
    const isFinal = m3Index >= m3ScenarioIds.length - 1;
    if (isFinal) {
      // Materialize picks into full ModuleThreeAnswer objects (assume complete).
      const finals: ModuleThreeAnswer[] = m3Picks.map((p) => ({
        gonads: (p.gonads ?? "None") as ModuleThreeAnswer["gonads"],
        internal: (p.internal ?? "None") as ModuleThreeAnswer["internal"],
        external: (p.external ?? "Female") as ModuleThreeAnswer["external"],
        brain: (p.brain ?? "Feminized") as ModuleThreeAnswer["brain"],
      }));
      setM3Submitted(finals);
      setScreen("module3recap");
    } else {
      setM3Index((x) => x + 1);
    }
  }, [m3Index, m3ScenarioIds.length, m3Picks]);

  const currentM3Question: ModuleThreeQuestionVM | null = useMemo(() => {
    if (m3ScenarioIds.length === 0) return null;
    const sid = m3ScenarioIds[m3Index];
    if (!sid) return null;
    const s = SCENARIO_BY_ID[sid];
    const picks = m3Picks[m3Index] ?? {};
    const canSubmit =
      picks.gonads != null &&
      picks.internal != null &&
      picks.external != null &&
      picks.brain != null;
    return {
      scenarioId: sid,
      scenarioDisplayName: s.displayName,
      scenarioDiagnosisName: s.diagnosisName,
      chromosomalSex: s.chromosomalSex,
      index: m3Index,
      total: m3ScenarioIds.length,
      picks,
      onPick: onPickM3,
      onSubmit: onSubmitM3,
      canSubmit,
    };
  }, [m3ScenarioIds, m3Index, m3Picks, onPickM3, onSubmitM3]);

  const m3RecapVM: ModuleThreeRecapVM = useMemo(() => {
    if (!m3Submitted || m3ScenarioIds.length === 0) {
      return {
        rows: [],
        totalQuestions: 0,
        perfectScenarios: 0,
        totalCells: 0,
        correctCells: 0,
        onRetry: startModuleThree,
        onBackToHome: onBackToHomeFromRecap,
      };
    }
    const rows: ModuleThreeResultRowVM[] = m3ScenarioIds.map((sid, i) => {
      const s = SCENARIO_BY_ID[sid];
      const correct = s.moduleThreeAnswer;
      const student = m3Submitted[i];
      const perCellCorrect: Record<OutcomeCell, boolean> = {
        gonads: student.gonads === correct.gonads,
        internal: student.internal === correct.internal,
        external: student.external === correct.external,
        brain: student.brain === correct.brain,
      };
      const allFour =
        perCellCorrect.gonads &&
        perCellCorrect.internal &&
        perCellCorrect.external &&
        perCellCorrect.brain;
      return {
        scenarioId: sid,
        scenarioDisplayName: s.displayName,
        scenarioDiagnosisName: s.diagnosisName,
        correctAnswer: correct,
        studentAnswer: student,
        perCellCorrect,
        allFourCorrect: allFour,
      };
    });
    const perfectScenarios = rows.filter((r) => r.allFourCorrect).length;
    const totalCells = rows.length * 4;
    const correctCells = rows.reduce(
      (n, r) =>
        n +
        (r.perCellCorrect.gonads ? 1 : 0) +
        (r.perCellCorrect.internal ? 1 : 0) +
        (r.perCellCorrect.external ? 1 : 0) +
        (r.perCellCorrect.brain ? 1 : 0),
      0,
    );
    return {
      rows,
      totalQuestions: rows.length,
      perfectScenarios,
      totalCells,
      correctCells,
      onRetry: startModuleThree,
      onBackToHome: onBackToHomeFromRecap,
    };
  }, [m3Submitted, m3ScenarioIds, startModuleThree, onBackToHomeFromRecap]);

  const onExitM3 = useCallback(() => setScreen("home"), []);

  const moduleThreeVM: ModuleThreeViewModel = useMemo(
    () => ({ currentQuestion: currentM3Question, onExitToHome: onExitM3 }),
    [currentM3Question, onExitM3],
  );

  // For the recap screen, traversed cells should fully visible — no blur.
  const recapChartState: ChartViewState = useMemo(
    () => ({
      traversedCells: session.state.traversedCells,
      retriedCells,
      wrongWalkCell: null,
      currentCellHint: null,
      revealDimText: true,
    }),
    [session.state.traversedCells, retriedCells],
  );
  // (suppress unused — kept here for potential future use)
  void recapChartState;
  void cellKey;

  return {
    screen,
    chart,
    onContinueOnboarding,
    home: homeVM,
    tutorial: tutorialVM,
    picker: {
      scenarios: SCENARIOS,
      recommendedId: recommendedIdForPicker,
      completedEasyIds: completedEasy,
      completedHardIds: completedHard,
      difficulty,
      onPick: startScenario,
      onChangeDifficulty,
      onBackToHome: onBackToHomeFromPicker,
    },
    play: {
      scenarioDisplayName: scenario.displayName,
      scenarioDiagnosisName: scenario.diagnosisName,
      difficulty,
      score: session.state.score,
      streak: session.state.streak,
      bestStreak: session.state.bestStreak,
      totalRows: TOTAL_ROWS,
      chartState,
      outcomeCells: session.state.outcomeCells,
      activePanel,
      story,
      onSwitchScenario,
    },
    recap: {
      scenarioDisplayName: scenario.displayName,
      scenarioDiagnosisName: scenario.diagnosisName,
      difficulty,
      traversedCells: session.state.traversedCells,
      retriedCells,
      outcomeCells: session.state.outcomeCells,
      missedSteps,
      score: session.state.score,
      bestStreak: session.state.bestStreak,
      totalRows: TOTAL_ROWS,
      recommendation:
        recommendation.kind === "next"
          ? { kind: "next", nextScenarioId: recommendation.nextScenarioId }
          : { kind: "replay" },
      recommendationLabel: recommendation.label,
      story,
      feedback,
      onAct,
    },
    module3: moduleThreeVM,
    module3recap: m3RecapVM,
    onBackToHomeFromPlay,
    onBackToHomeFromRecap,
  };
}
