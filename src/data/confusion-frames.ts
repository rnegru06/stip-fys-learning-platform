// Lindsay-authored "confusion frames" for the end-of-session recap. When a
// student finishes a scenario, selectFrame() (in src/engine/feedback-selector.ts)
// matches the student's missedRows against each frame's trigger and surfaces the
// highest-priority match as a diagnostic lens above the missed-steps drill-down.
//
// NOTE: the lens text below is a starter draft. Every frame's text and trigger
// MUST be reviewed and signed off by Lindsay before this ships. Treat what's
// here as a working scaffold, the same way scenarios.ts/noteOverrides started.
// If the trigger DSL isn't expressive enough for a real confusion she names,
// extend FrameTrigger — but only with a concrete case in hand.

import type { RowId } from "./chart.types";

export type FrameTrigger =
  | { kind: "all_of"; rows: RowId[] }
  | { kind: "any_of"; rows: RowId[]; minCount: number }
  | { kind: "scenario_in"; scenarios: string[] }
  | { kind: "and"; matchers: FrameTrigger[] };

export interface ConfusionFrame {
  id: string;
  title: string;
  lensText: string;
  trigger: FrameTrigger;
  priority: number;
}

export const CONFUSION_FRAMES: readonly ConfusionFrame[] = [
  {
    id: "ar_confusion",
    title: "Androgen receptor confusion",
    lensText:
      "Wolffian ducts and external genitalia both depend on testosterone acting through a functional androgen receptor. When the receptor is broken (AIS) or absent, those structures don't masculinize even though testes and testosterone are fine. Anything upstream of the receptor (gonads, hormones in blood) is unaffected — the failure is at the tissue level, not the endocrine level.",
    trigger: {
      kind: "and",
      matchers: [
        { kind: "scenario_in", scenarios: ["ais", "ar_absent"] },
        { kind: "all_of", rows: ["wolffian", "external_genitalia"] },
      ],
    },
    priority: 30,
  },
  {
    id: "aromatization_dissociation",
    title: "Brain via aromatization",
    lensText:
      "In rats the masculinizing signal in the brain is estradiol — testosterone is aromatized inside neurons and acts on estrogen receptors. So in AIS, where the androgen receptor is non-functional, the body's androgen-dependent tissues don't masculinize, but the brain still does. This is the classic body / brain dissociation.",
    trigger: {
      kind: "and",
      matchers: [
        { kind: "scenario_in", scenarios: ["ais"] },
        { kind: "any_of", rows: ["sexual_behavior", "gnrh_pattern"], minCount: 1 },
      ],
    },
    priority: 40,
  },
  {
    id: "five_alpha_reductase_pathway",
    title: "5α-reductase and DHT",
    lensText:
      "External genital masculinization specifically requires DHT, the 5α-reductase product, acting on the androgen receptor in genital skin. Wolffian ducts and the brain are masculinized by testosterone (or its aromatized product) and so are unaffected when 5α-reductase is missing. That's why the body presents female-appearing externally despite testes, testosterone, and a functional AR.",
    trigger: {
      kind: "and",
      matchers: [
        {
          kind: "scenario_in",
          scenarios: ["five_alpha_reductase_deficiency", "dht_insensitive"],
        },
        { kind: "any_of", rows: ["external_genitalia"], minCount: 1 },
      ],
    },
    priority: 25,
  },
  {
    id: "amh_and_ducts",
    title: "AMH and duct regression",
    lensText:
      "Müllerian regression is a separate signal from Wolffian development. Sertoli cells secrete AMH, which actively regresses the Müllerian ducts; Leydig cells secrete testosterone, which supports the Wolffian ducts. Without AMH the uterus and fallopian tubes persist even when testosterone is present, which is why an XY individual can end up with both duct systems.",
    trigger: {
      kind: "and",
      matchers: [
        { kind: "scenario_in", scenarios: ["amh_absent"] },
        { kind: "any_of", rows: ["amh", "mullerian"], minCount: 1 },
      ],
    },
    priority: 25,
  },
  {
    id: "sry_vs_chromosome",
    title: "SRY, not the Y chromosome",
    lensText:
      "The signal that triggers testis development is the SRY gene, not the Y chromosome as a whole. An XY individual with a non-functional SRY (Swyer) develops along the female pathway from the gonads down. An XX individual carrying a translocated SRY develops testes despite the XX karyotype. Chromosome and gonadal-sex outcome can come apart at this step.",
    trigger: {
      kind: "and",
      matchers: [
        { kind: "scenario_in", scenarios: ["xy_missing_sry", "xx_with_sry"] },
        { kind: "any_of", rows: ["sry", "gonadal_dev"], minCount: 1 },
      ],
    },
    priority: 25,
  },
  {
    id: "no_testes_downstream",
    title: "No testes → no signals",
    lensText:
      "When the testes fail to form or produce hormones, the whole male-pathway sequence collapses: no testosterone, no AMH, so Wolffian ducts regress, Müllerian ducts persist, and external genitalia default to female. The pathway is permissive — male development is actively driven by gonadal signals, not the default.",
    trigger: {
      kind: "and",
      matchers: [
        {
          kind: "scenario_in",
          scenarios: ["xy_testes_fail", "xy_no_testosterone"],
        },
        {
          kind: "any_of",
          rows: ["wolffian", "amh", "mullerian", "external_genitalia"],
          minCount: 2,
        },
      ],
    },
    priority: 20,
  },
  {
    id: "many_misses_general",
    title: "Several steps in this pathway",
    lensText:
      "You missed several rows across the pathway, which suggests the scenario's overall logic — which signal comes from where, and which tissue responds to which signal — is still settling. Replaying with the chart's row-by-row explainers open and the tutorial module's connection-to-previous-row notes is the fastest way to get the spine of it.",
    trigger: { kind: "any_of", rows: [], minCount: 0 },
    priority: 1,
  },
];

// Special case: the "many_misses_general" frame uses an any_of with empty rows
// and minCount 0, which would trivially match every session (including perfect
// runs). The selector handles the empty-miss case separately, so this frame
// only fires when at least one row was missed AND no higher-priority frame
// matched. It's the catch-all fallback.
