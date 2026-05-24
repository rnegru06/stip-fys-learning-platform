import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { ROWS, EDGES, ROW_BY_ID } from "../data/chart";
import { CONFUSION_FRAMES } from "../data/confusion-frames";
import { SCENARIOS } from "../data/scenarios";
import { TUTORIAL_ROW_BY_ID, AIS_NARRATION } from "../data/tutorial";
import { evaluateTrigger } from "./feedback-selector";
import { traverse } from "./traversal";
import type { OutcomeCell, RowId } from "../data/chart.types";

const REPORT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "docs",
  "lindsay-encoding-review.md"
);

const ALL_ROW_IDS: RowId[] = ROWS.map((r) => r.id);
const ALL_OUTCOME_CELLS: OutcomeCell[] = ["gonads", "internal", "external", "brain"];

interface VerificationProblem {
  scope: string;
  message: string;
}

function verify(): VerificationProblem[] {
  const problems: VerificationProblem[] = [];

  const seenOrders = new Set<number>();
  for (const row of ROWS) {
    if (seenOrders.has(row.order)) {
      problems.push({ scope: `row ${row.id}`, message: `duplicate order ${row.order}` });
    }
    seenOrders.add(row.order);
  }
  for (let i = 1; i <= ROWS.length; i++) {
    if (!seenOrders.has(i)) {
      problems.push({ scope: "chart", message: `missing row order ${i}` });
    }
  }

  for (const edge of EDGES) {
    if (!ROW_BY_ID[edge.from.rowId]) {
      problems.push({ scope: "edge", message: `unknown from rowId ${edge.from.rowId}` });
    }
    if (!ROW_BY_ID[edge.to.rowId]) {
      problems.push({ scope: "edge", message: `unknown to rowId ${edge.to.rowId}` });
    }
  }

  for (const scenario of SCENARIOS) {
    if (scenario.chromosomalSex !== "XX" && scenario.chromosomalSex !== "XY") {
      problems.push({
        scope: scenario.id,
        message: `chromosomalSex must be "XX" or "XY", got ${JSON.stringify(scenario.chromosomalSex)}`,
      });
    }

    for (const rowId of ALL_ROW_IDS) {
      const options = scenario.rowOptions[rowId];
      if (!options || options.length === 0) {
        problems.push({
          scope: `${scenario.id}/${rowId}`,
          message: "no answer options",
        });
        continue;
      }
      const corrects = options.filter((o) => o.isCorrect);
      if (corrects.length !== 1) {
        problems.push({
          scope: `${scenario.id}/${rowId}`,
          message: `expected exactly 1 correct option, got ${corrects.length}`,
        });
      }
      const correct = corrects[0];
      if (correct && !correct.lightsCell) {
        problems.push({
          scope: `${scenario.id}/${rowId}`,
          message: `correct option ${correct.id} is missing lightsCell`,
        });
      }

      const wrongs = options.filter((o) => !o.isCorrect);
      for (const w of wrongs) {
        if (!w.wrongConsequenceNote) {
          problems.push({
            scope: `${scenario.id}/${rowId}/${w.id}`,
            message: "wrong option missing wrongConsequenceNote",
          });
        }
        if (w.wrongConsequenceCell && !ROW_BY_ID[w.wrongConsequenceCell.rowId]) {
          problems.push({
            scope: `${scenario.id}/${rowId}/${w.id}`,
            message: `wrongConsequenceCell references unknown rowId ${w.wrongConsequenceCell.rowId}`,
          });
        }
      }

      const row = ROW_BY_ID[rowId];
      if (row.populates && correct && !correct.cellWrite) {
        problems.push({
          scope: `${scenario.id}/${rowId}`,
          message: `row populates outcome cell "${row.populates}" but correct option has no cellWrite`,
        });
      }
    }

    const result = traverse(scenario);
    for (const cell of ALL_OUTCOME_CELLS) {
      const final = result.outcomeCells[cell];
      const expected = scenario.outcomeForCell[cell];
      if (!final) {
        problems.push({
          scope: `${scenario.id}/outcome/${cell}`,
          message: `outcome cell never populated by any populates row`,
        });
      } else if (final !== expected) {
        problems.push({
          scope: `${scenario.id}/outcome/${cell}`,
          message: `final cell text "${final}" does not match scenario.outcomeForCell["${cell}"] = "${expected}"`,
        });
      }
    }
  }

  // ─── Confusion frames ──────────────────────────────────────────────
  // Validate that each Lindsay-authored frame is well-formed and reachable.

  const seenFrameIds = new Set<string>();
  const allRowsSet: ReadonlySet<RowId> = new Set(ALL_ROW_IDS);
  for (const frame of CONFUSION_FRAMES) {
    if (!frame.id || seenFrameIds.has(frame.id)) {
      problems.push({
        scope: `frame ${frame.id || "(empty id)"}`,
        message: "duplicate or missing frame id",
      });
    }
    seenFrameIds.add(frame.id);
    if (!frame.title.trim()) {
      problems.push({ scope: `frame ${frame.id}`, message: "title is empty" });
    }
    if (!frame.lensText.trim()) {
      problems.push({ scope: `frame ${frame.id}`, message: "lensText is empty" });
    }

    const canEverMatch = SCENARIOS.some((s) =>
      evaluateTrigger(frame.trigger, allRowsSet, s.id),
    );
    if (!canEverMatch) {
      problems.push({
        scope: `frame ${frame.id}`,
        message:
          "no scenario can ever trigger this frame (even with every row missed) — trigger is unreachable",
      });
    }
  }

  for (let i = 0; i < CONFUSION_FRAMES.length; i++) {
    for (let j = i + 1; j < CONFUSION_FRAMES.length; j++) {
      const a = CONFUSION_FRAMES[i];
      const b = CONFUSION_FRAMES[j];
      if (a.priority !== b.priority) continue;
      if (JSON.stringify(a.trigger) === JSON.stringify(b.trigger)) {
        problems.push({
          scope: `frame ${a.id} vs ${b.id}`,
          message: `identical trigger and priority — selection is non-deterministic between these frames`,
        });
      }
    }
  }

  return problems;
}

function describeTrigger(t: import("../data/confusion-frames").FrameTrigger): string {
  switch (t.kind) {
    case "all_of":
      return `all_of [${t.rows.join(", ")}]`;
    case "any_of":
      return `any_of [${t.rows.join(", ")}] (≥${t.minCount})`;
    case "scenario_in":
      return `scenario_in [${t.scenarios.join(", ")}]`;
    case "and":
      return `AND( ${t.matchers.map(describeTrigger).join(" ; ")} )`;
  }
}

function buildReport(): string {
  const lines: string[] = [];
  lines.push("# Lindsay Encoding Review — Sex Differentiation Flowchart Tool");
  lines.push("");
  lines.push("This report is auto-generated from the encoded chart and scenarios.");
  lines.push("It lists the exact questions, answers, and biological explanations");
  lines.push("students will see in the v1 demo. Read it through and mark anything");
  lines.push("that needs revision — we'll regenerate after each round of edits.");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Chart structure overview");
  lines.push("");
  lines.push("| # | Row label | Female pathway | Male pathway | Outcome cell |");
  lines.push("|---|-----------|----------------|--------------|--------------|");
  for (const row of ROWS) {
    const fLabel = row.cells.female.display.replace(/\n/g, " ");
    const mLabel = row.cells.male.display.replace(/\n/g, " ");
    const outcome = row.populates ?? "—";
    lines.push(`| ${row.order} | ${row.label.replace(/\n/g, " ")} | ${fLabel} | ${mLabel} | ${outcome} |`);
  }
  lines.push("");
  lines.push("---");
  lines.push("");

  lines.push("## Scenarios — chromosomes & diagnosis names");
  lines.push("");
  lines.push("v2 adds two new metadata fields per scenario: `chromosomalSex` (XX or XY,");
  lines.push("used to group the picker) and `diagnosisName` (optional clinical/syndrome label,");
  lines.push("shown as a subtitle on cards and headers). Please confirm each diagnosis name");
  lines.push("and fill in any rows marked **TODO**.");
  lines.push("");
  const xxCount = SCENARIOS.filter((s) => s.chromosomalSex === "XX").length;
  const xyCount = SCENARIOS.filter((s) => s.chromosomalSex === "XY").length;
  lines.push(`Split: **${xxCount} XX / ${xyCount} XY** — currently skewed toward XY.`);
  lines.push("");
  lines.push("| # | Display name | Chromosomes | Diagnosis name |");
  lines.push("|---|--------------|-------------|----------------|");
  SCENARIOS.forEach((s, i) => {
    const diag = s.diagnosisName ?? "**TODO — Lindsay to fill in**";
    lines.push(`| ${i + 1} | ${s.displayName} | ${s.chromosomalSex} | ${diag} |`);
  });
  lines.push("");
  lines.push("---");
  lines.push("");

  lines.push("## Tutorial module — per-row breakdowns (v2)");
  lines.push("");
  lines.push("Each of the 14 rows in the new Tutorial module shows the student a");
  lines.push("question-meaning prose, a per-answer meaning, and a connection-to-previous-row");
  lines.push("note. Drafted from the chart explainers; please mark anything that misreads.");
  lines.push("");
  for (const row of ROWS) {
    const t = TUTORIAL_ROW_BY_ID[row.id];
    lines.push(`### Row ${row.order} — ${row.label.replace(/\n/g, " ")}`);
    lines.push("");
    lines.push(`**Question meaning:** ${t.questionMeaning}`);
    lines.push("");
    lines.push("**Option meanings:**");
    for (const [optId, prose] of Object.entries(t.optionMeanings)) {
      lines.push(`- \`${optId}\` — ${prose}`);
    }
    if (t.connectionToPrevious) {
      lines.push("");
      lines.push(`**Connection to row ${row.order - 1}:** ${t.connectionToPrevious}`);
    }
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  lines.push("## Tutorial module — AIS walkthrough narration (v2)");
  lines.push("");
  lines.push("After the 14 row-lessons, students are offered an optional walk through");
  lines.push("Complete Androgen Insensitivity Syndrome (AIS). At each row, this prose");
  lines.push("appears alongside the chart. Special focus on the row-7 (Wolffian) and");
  lines.push("row-12 (external genitalia) divergences.");
  lines.push("");
  for (const row of ROWS) {
    lines.push(`**Row ${row.order} — ${row.label.replace(/\n/g, " ")}:** ${AIS_NARRATION[row.id]}`);
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  for (const scenario of SCENARIOS) {
    lines.push(`## Scenario: ${scenario.displayName}`);
    lines.push("");
    lines.push(`**Chromosomes:** ${scenario.chromosomalSex}  `);
    lines.push(
      `**Diagnosis name:** ${scenario.diagnosisName ?? "_(none — Lindsay to confirm or leave unset)_"}`,
    );
    lines.push("");
    const result = traverse(scenario);
    lines.push("### Expected outcome table after a perfect walkthrough");
    lines.push("");
    lines.push("| Outcome cell | Final value |");
    lines.push("|--------------|-------------|");
    for (const cell of ALL_OUTCOME_CELLS) {
      lines.push(`| ${cell} | ${scenario.outcomeForCell[cell]} |`);
    }
    lines.push("");

    lines.push("### Row-by-row walkthrough");
    lines.push("");
    for (const step of result.steps) {
      const row = ROW_BY_ID[step.rowId];
      lines.push(`#### Row ${step.order}. ${row.label.replace(/\n/g, " ")}`);
      lines.push("");
      lines.push(`**Question:** ${step.question}`);
      lines.push("");
      lines.push(
        `**Correct answer:** *${step.correctOption.label}*  ` +
          `→ lights the **${step.litCell.pathway}** column cell`
      );
      if (step.outcomeWrite) {
        lines.push("");
        lines.push(
          `**Writes outcome cell** \`${step.outcomeWrite.cell}\` = *${step.outcomeWrite.value}*`
        );
      }
      const options = scenario.rowOptions[step.rowId];
      const wrongs = options.filter((o) => !o.isCorrect);
      if (wrongs.length > 0) {
        lines.push("");
        lines.push("**Wrong-answer consequence notes:**");
        lines.push("");
        for (const w of wrongs) {
          const cellDesc = w.wrongConsequenceCell
            ? ` _(briefly lights ${w.wrongConsequenceCell.rowId} / ${w.wrongConsequenceCell.pathway})_`
            : "";
          lines.push(`- **${w.label}**${cellDesc} — ${w.wrongConsequenceNote ?? "(missing note)"}`);
        }
      }
      lines.push("");
    }
    lines.push("---");
    lines.push("");
  }

  lines.push("## Confusion frames — end-of-session feedback lenses (Phase 2 draft)");
  lines.push("");
  lines.push("After a student finishes a scenario, the recap surfaces one of these");
  lines.push("frames (the highest-priority match for their miss pattern) above the");
  lines.push("missed-steps drill-down. The lens text is what students will read —");
  lines.push("**please mark any frame that needs revision**. Frame selection is");
  lines.push("deterministic; no AI is consulted at runtime.");
  lines.push("");
  for (const frame of CONFUSION_FRAMES) {
    lines.push(`### ${frame.title}`);
    lines.push("");
    lines.push(`**id:** \`${frame.id}\` · **priority:** ${frame.priority}`);
    lines.push("");
    lines.push(`**Trigger:** \`${describeTrigger(frame.trigger)}\``);
    lines.push("");
    lines.push(`**Lens text:** ${frame.lensText}`);
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  lines.push("## Flat dump: every wrong-answer consequence note");
  lines.push("");
  lines.push("For one-pass review of all hand-authored snippets.");
  lines.push("");
  for (const scenario of SCENARIOS) {
    lines.push(`### ${scenario.displayName}`);
    lines.push("");
    for (const row of ROWS) {
      const options = scenario.rowOptions[row.id];
      const wrongs = options.filter((o) => !o.isCorrect);
      if (wrongs.length === 0) continue;
      lines.push(`**Row ${row.order} — ${row.label.replace(/\n/g, " ")}:**`);
      for (const w of wrongs) {
        lines.push(`- *${w.label}:* ${w.wrongConsequenceNote ?? "(missing)"}`);
      }
      lines.push("");
    }
  }

  return lines.join("\n");
}

function main(): void {
  const problems = verify();
  if (problems.length > 0) {
    console.error("Verification FAILED:\n");
    for (const p of problems) {
      console.error(`  [${p.scope}] ${p.message}`);
    }
    console.error(`\n${problems.length} problem(s).`);
    process.exit(1);
  }

  const report = buildReport();
  const dir = dirname(REPORT_PATH);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(REPORT_PATH, report, "utf8");
  console.log(`Verification passed. Report written to ${REPORT_PATH}`);
}

main();
