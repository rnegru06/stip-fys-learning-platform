// Thin composition root. Visual treatment only; logic is in controller.

import { useAppController } from "./controller";
import { ChartSVG } from "./ui/ChartSVG";
import { ConsequenceCallout } from "./ui/ConsequenceCallout";
import { ExplainerCallout } from "./ui/ExplainerCallout";
import { Home } from "./ui/Home";
import { Module3 } from "./ui/Module3";
import { Module3Recap } from "./ui/Module3Recap";
import { Onboarding } from "./ui/Onboarding";
import { OutcomeTable } from "./ui/OutcomeTable";
import { QuizPanel } from "./ui/QuizPanel";
import { Recap } from "./ui/Recap";
import { ScenarioPicker } from "./ui/ScenarioPicker";
import { ScoreBar } from "./ui/ScoreBar";
import { Tutorial } from "./ui/Tutorial";

export default function App() {
  const vm = useAppController();

  if (vm.screen === "onboarding") {
    return (
      <div className="flex min-h-full items-center justify-center bg-paper p-6">
        <Onboarding onContinue={vm.onContinueOnboarding} />
      </div>
    );
  }

  if (vm.screen === "home") {
    return (
      <div className="h-full">
        <Home
          onPickTutorial={vm.home.onPickTutorial}
          onPickPractice={vm.home.onPickPractice}
          onPickModule3={vm.home.onPickModule3}
          practiceCount={vm.home.practiceCount}
          completedEasyCount={vm.home.completedEasyCount}
          completedHardCount={vm.home.completedHardCount}
          module3Unlocked={vm.home.module3Unlocked}
          module3LockReason={vm.home.module3LockReason}
          module3PasswordUnlocked={vm.home.module3PasswordUnlocked}
          onSubmitModule3Password={vm.home.onSubmitModule3Password}
        />
      </div>
    );
  }

  if (vm.screen === "tutorial") {
    return (
      <div className="h-full">
        <Tutorial
          rowLessons={vm.tutorial.rowLessons}
          aisLessons={vm.tutorial.aisLessons}
          normalXYScenarioName={vm.tutorial.normalXYScenarioName}
          normalXYOutcomes={vm.tutorial.normalXYOutcomes}
          aisScenarioName={vm.tutorial.aisScenarioName}
          aisDiagnosisName={vm.tutorial.aisDiagnosisName}
          aisOutcomes={vm.tutorial.aisOutcomes}
          chartRows={vm.chart.rows}
          chartEdges={vm.chart.edges}
          chartLayout={vm.chart.layout}
          onExitToHome={vm.tutorial.onExitToHome}
        />
      </div>
    );
  }

  if (vm.screen === "picker") {
    return (
      <div className="h-full">
        <ScenarioPicker
          scenarios={vm.picker.scenarios}
          recommendedId={vm.picker.recommendedId}
          completedEasyIds={vm.picker.completedEasyIds}
          completedHardIds={vm.picker.completedHardIds}
          difficulty={vm.picker.difficulty}
          onPick={vm.picker.onPick}
          onChangeDifficulty={vm.picker.onChangeDifficulty}
          onBackToHome={vm.picker.onBackToHome}
        />
      </div>
    );
  }

  if (vm.screen === "module3") {
    if (!vm.module3.currentQuestion) return null;
    return (
      <div className="h-full">
        <Module3
          question={vm.module3.currentQuestion}
          onExitToHome={vm.module3.onExitToHome}
        />
      </div>
    );
  }

  if (vm.screen === "module3recap") {
    return (
      <div className="h-full">
        <Module3Recap recap={vm.module3recap} />
      </div>
    );
  }

  if (vm.screen === "recap") {
    return (
      <div className="h-full">
        <Recap
          scenarioDisplayName={vm.recap.scenarioDisplayName}
          scenarioDiagnosisName={vm.recap.scenarioDiagnosisName}
          chartRows={vm.chart.rows}
          chartEdges={vm.chart.edges}
          chartLayout={vm.chart.layout}
          traversedCells={vm.recap.traversedCells}
          retriedCells={vm.recap.retriedCells}
          outcomeCells={vm.recap.outcomeCells}
          missedSteps={vm.recap.missedSteps}
          score={vm.recap.score}
          bestStreak={vm.recap.bestStreak}
          totalRows={vm.recap.totalRows}
          recommendationLabel={vm.recap.recommendationLabel}
          storyFrames={vm.recap.story.frames}
          storyDescription={vm.recap.story.description}
          feedback={vm.recap.feedback}
          onAct={vm.recap.onAct}
          onBackToHome={vm.onBackToHomeFromRecap}
        />
      </div>
    );
  }

  // screen === "play"
  const play = vm.play;
  if (!play.activePanel) return null;

  return (
    <div className="flex h-full flex-col bg-paper">
      <header className="flex items-center justify-between gap-4 border-b border-rule bg-paper px-6 py-3">
        <div className="flex items-center gap-3.5">
          <div className="w-[26px] h-[26px] grid place-items-center border-[1.5px] border-ink rounded-md font-mono font-semibold text-xs text-ink">
            §
          </div>
          <div className="flex flex-col">
            <span className="eyebrow text-[9.5px]">Scenario · {play.difficulty} mode</span>
            <span className="font-serif text-base font-medium text-ink leading-tight">
              {play.scenarioDisplayName}
            </span>
            {play.scenarioDiagnosisName && (
              <span className="font-serif italic text-[12px] text-ink-3 leading-tight mt-0.5">
                {play.scenarioDiagnosisName}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <ScoreBar
            score={play.score}
            streak={play.streak}
            bestStreak={play.bestStreak}
            total={play.totalRows}
          />
          <button
            type="button"
            onClick={play.onSwitchScenario}
            className="px-3.5 py-2 border border-rule-2 rounded-lg text-xs font-medium text-ink-2 bg-paper hover:bg-paper-2 hover:border-ink transition-colors"
          >
            Switch scenario
          </button>
          <button
            type="button"
            onClick={vm.onBackToHomeFromPlay}
            className="px-3.5 py-2 border border-rule-2 rounded-lg text-xs font-medium text-ink-2 bg-paper hover:bg-paper-2 hover:border-ink transition-colors"
          >
            Back to home
          </button>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-5 overflow-hidden p-5 lg:grid-cols-[minmax(420px,1fr)_minmax(640px,1.5fr)]">
        <div className="flex flex-col gap-4 overflow-y-auto">
          {play.activePanel.kind === "quiz" && (
            <div className="bg-paper border border-rule rounded-xl px-6 py-[22px]">
              <QuizPanel
                row={play.activePanel.row}
                options={play.activePanel.options}
                onPick={play.activePanel.onPick}
                totalRows={play.totalRows}
              />
            </div>
          )}
          {play.activePanel.kind === "wrong" && (
            <ConsequenceCallout
              rowId={play.activePanel.rowId}
              pickedLabel={play.activePanel.pickedLabel}
              note={play.activePanel.note}
              onBackUp={play.activePanel.onBackUp}
            />
          )}
          {play.activePanel.kind === "explainer" && (
            <ExplainerCallout
              rowId={play.activePanel.rowId}
              rowLabel={play.activePanel.rowLabel}
              pickedLabel={play.activePanel.pickedLabel}
              pickedPathway={play.activePanel.pickedPathway}
              explainer={play.activePanel.explainer}
              onContinue={play.activePanel.onContinue}
              isFinalRow={play.activePanel.isFinalRow}
            />
          )}
        </div>

        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="bg-paper border border-rule rounded-xl px-3.5 pt-2.5 pb-1 flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-baseline pb-1">
              <span className="eyebrow">Flowchart</span>
              <span className="font-serif italic text-ink-3 text-[11px]">
                {play.difficulty === "easy"
                  ? "easy mode · chart fully visible"
                  : "cells dimmed until you walk them"}
              </span>
            </div>
            <div className="flex-1 min-h-0">
              <ChartSVG
                rows={vm.chart.rows}
                edges={vm.chart.edges}
                layout={vm.chart.layout}
                traversedCells={play.chartState.traversedCells}
                retriedCells={play.chartState.retriedCells}
                wrongWalkCell={play.chartState.wrongWalkCell}
                currentCellHint={play.chartState.currentCellHint}
                revealDimText={play.chartState.revealDimText}
              />
            </div>
          </div>
          <OutcomeTable
            scenarioName={play.scenarioDisplayName}
            cells={play.outcomeCells}
          />
        </div>
      </div>
    </div>
  );
}
