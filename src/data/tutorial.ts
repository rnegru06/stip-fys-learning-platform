// Per-row tutorial content for the Tutorial module.
//
// Imported by the controller and forwarded to the Tutorial UI component.
// The UI layer never imports this file directly (layering rule:
// ui/* may only import React + ui/types).
//
// All prose here is DRAFT pedagogical copy. Lindsay should review before
// the v2 demo — the verifier emits this content into the encoding-review doc.

import type { RowId } from "./chart.types";

export interface TutorialRowContent {
  rowId: RowId;
  // 1–2 sentences: what is this question actually asking?
  questionMeaning: string;
  // Keyed by AnswerOption.id (from scenarios.ts ROW_DEFAULTS).
  // Each value: 1–2 sentences on what this answer means biologically.
  optionMeanings: Record<string, string>;
  // 1 sentence: how does this row follow from the previous row's answer?
  // Omitted on row 1 (no previous row).
  connectionToPrevious?: string;
}

export const TUTORIAL_ROWS: TutorialRowContent[] = [
  {
    rowId: "chromosomal_sex",
    questionMeaning:
      "Every individual starts with a chromosomal makeup set at conception. This row asks which 23rd-pair configuration the zygote inherited — the upstream variable that everything else in the chart conditions on.",
    optionMeanings: {
      xx: "Two X chromosomes. The default mammalian configuration. The Y-only gene SRY is absent.",
      xy: "One X, one Y. The Y carries SRY, the master switch that can trigger the cascade toward male development.",
    },
  },
  {
    rowId: "sry",
    questionMeaning:
      "SRY (Sex-determining Region Y) is the gene that initiates the male pathway. This row asks whether it is present AND expressed in the developing gonad.",
    optionMeanings: {
      sry_no: "Either there's no Y chromosome to carry SRY, or the gene is present but non-functional. Either way, the trigger for the male cascade is absent.",
      sry_yes: "SRY is on the Y chromosome and is being transcribed in the gonadal ridge. It drives the testis-construction program in the next step.",
    },
    connectionToPrevious:
      "Whether SRY can even be expressed depends on what happened upstream: in XX the gene typically isn't there at all; in XY it usually is, but mutations can silence it (Swyer Syndrome).",
  },
  {
    rowId: "gonadal_dev",
    questionMeaning:
      "Differentiation commits the early gonad to one of two outcomes. This row asks which structure has actually developed — the first anatomical-level output of the chart, and the source of every hormonal signal downstream.",
    optionMeanings: {
      ovary: "An ovary. It produces estrogens (mostly later) but very little testosterone during fetal development. The downstream pathway is hormone-quiet for most of the chart.",
      testis: "A testis. It contains Leydig cells (testosterone) and Sertoli cells (AMH) — the two hormonal sources that drive everything from row 4 on.",
    },
    connectionToPrevious:
      "SRY (row 2) flips development from the default ovarian pathway into the testis pathway. No SRY = ovary; SRY expressed = testis.",
  },
  {
    rowId: "local_testosterone",
    questionMeaning:
      "Testes secrete testosterone locally (right around the gonad) starting around week 8. This row asks whether that nearby-tissue T is present — the signal that the adjacent Wolffian ducts will need in row 5.",
    optionMeanings: {
      loc_test_no: "Either no testes formed, or they can't synthesize T. Either way, the adjacent Wolffian ducts get no androgen signal.",
      loc_test_yes: "Functional testes (Leydig cells) produce testosterone in a small zone right around the gonad. Very high local concentrations bathe the Wolffian ducts.",
    },
    connectionToPrevious:
      "Only testes (row 3) produce significant testosterone in fetal development. Ovaries don't.",
  },
  {
    rowId: "wolffian",
    questionMeaning:
      "The Wolffian ducts can develop into the male internal duct system (vas deferens, epididymis, seminal vesicles) — but only if a specific signal arrives. This row asks whether they do.",
    optionMeanings: {
      wolff_no: "Without sustained local testosterone acting through a functional androgen receptor, the Wolffian ducts regress. No male internal ducts form.",
      wolff_yes: "Local T binds the androgen receptor in Wolffian-duct cells, maintaining them and driving their differentiation into vas deferens, epididymis, and seminal vesicles.",
    },
    connectionToPrevious:
      "Local T from row 4 is the upstream signal — but the androgen receptor must also be functional. This is where AIS branches: T is there, but the receptor can't respond.",
  },
  {
    rowId: "amh",
    questionMeaning:
      "Sertoli cells in the developing testis secrete AMH (Müllerian Inhibitory Hormone). This row asks whether AMH is being produced — the signal that will suppress the Müllerian ducts in the next row.",
    optionMeanings: {
      amh_no: "No testes, or testes without functional Sertoli cells. Müllerian ducts won't get the regression signal.",
      amh_yes: "Sertoli cells in functional testes secrete AMH. Crucially, AMH signaling is independent of the androgen receptor — so it still works in AIS.",
    },
    connectionToPrevious:
      "AMH is made by Sertoli cells in the testis (row 3). Note: AMH production is independent of the AR pathway used by the Wolffian ducts in row 5.",
  },
  {
    rowId: "mullerian",
    questionMeaning:
      "The Müllerian ducts develop into uterus, fallopian tubes, and upper vagina BY DEFAULT — unless suppressed. This row asks whether the suppression signal (AMH) prevented that default.",
    optionMeanings: {
      mull_yes: "No AMH = no suppression = Müllerian ducts develop. Uterus and fallopian tubes form. This is the default outcome.",
      mull_no: "AMH from Sertoli cells caused the Müllerian ducts to regress. No uterus, no fallopian tubes.",
    },
    connectionToPrevious:
      "AMH (row 6) is the suppression signal. Its absence is what allows Müllerian development — Müllerian formation is the default, not an active program.",
  },
  {
    rowId: "blood_testosterone",
    questionMeaning:
      "Testosterone can either stay local (rows 6–7) or enter the bloodstream and reach distant tissues like genital skin and brain. This row asks about the systemic signal — the messenger for peripheral masculinization downstream.",
    optionMeanings: {
      blood_t_no: "Without testes (or with adrenals not overproducing), peripheral tissues don't get an androgen signal. The default female pattern proceeds in genital skin and brain.",
      blood_t_yes: "Testes (or in CAH, adrenals) release T into circulation. It reaches genital skin (for row 9–10) and the brain (for rows 11–12).",
    },
    connectionToPrevious:
      "Internal duct development (rows 5–7) used local hormone signals. From here on the chart, the same testosterone source becomes systemic — different distance, different tissues, same hormone.",
  },
  {
    rowId: "five_alpha_reductase",
    questionMeaning:
      "5α-reductase is an enzyme in genital skin that converts testosterone into DHT, a more potent androgen. This row asks whether that conversion is happening — DHT, not T, is what masculinizes external genitalia.",
    optionMeanings: {
      fivear_no: "No 5α-reductase activity. Without conversion to DHT, peripheral T can't drive external masculinization. (5α-reductase deficiency lands here.)",
      fivear_yes: "5α-reductase is active in genital-skin tissue, converting circulating T into DHT — the specific androgen that the next row needs.",
    },
    connectionToPrevious:
      "Blood-borne T (row 8) is the substrate. 5α-reductase is the enzyme that turns it into the more potent DHT that genital skin actually responds to.",
  },
  {
    rowId: "external_genitalia",
    questionMeaning:
      "External genitalia develop from a single bipotential primordium that becomes either male or female structures. This row asks which way it went — and DHT acting on a functional androgen receptor is what tips the balance toward male.",
    optionMeanings: {
      ext_female: "Without DHT action on AR, the default external pattern emerges: clitoris and labia. This is what XX individuals develop, and also what XY individuals develop if DHT or AR is missing.",
      ext_male: "DHT binds AR on genital-skin cells, masculinizing the bipotential primordium: the genital tubercle becomes penis, labioscrotal folds fuse into scrotum.",
    },
    connectionToPrevious:
      "DHT (made in row 9) binds AR here. Both DHT and a functional AR must be present — break either, and the default female pattern emerges (AIS and 5α-reductase deficiency are the two routes).",
  },
  {
    rowId: "sexual_behavior",
    questionMeaning:
      "In rats, perinatal hormones organize male- or female-typical brain circuits. This row asks which pattern develops. The key surprise: in rats, this depends on AROMATIZATION (T → estradiol) and the estrogen receptor — NOT the androgen receptor.",
    optionMeanings: {
      behav_female: "No brain masculinization. The default female-typical pattern emerges (e.g., lordosis in rats).",
      behav_male: "Testosterone enters brain cells, is aromatized to estradiol, and estradiol acts on estrogen receptors to organize male-typical circuits. This pathway is AR-independent — AIS individuals still masculinize the brain.",
    },
    connectionToPrevious:
      "Same T from row 8 is the substrate, but inside brain cells it's aromatized to estradiol — and acts through the estrogen receptor. This is why AIS shows a 'female body, male brain' dissociation.",
  },
  {
    rowId: "gnrh_pattern",
    questionMeaning:
      "GnRH (gonadotropin-releasing hormone) is secreted from the hypothalamus in patterns: cyclic (default) or tonic (male-typical). This row asks which pattern develops — and like sexual behavior, it runs through aromatization, not AR.",
    optionMeanings: {
      gnrh_cyclic: "The default female-typical pattern. GnRH pulses fluctuate cyclically; later in life this supports the menstrual cycle.",
      gnrh_tonic: "Steady, tonic GnRH secretion. Develops when fetal T is aromatized to estradiol in the hypothalamus, organizing male-typical pulse architecture.",
    },
    connectionToPrevious:
      "Same logic as row 11: aromatization in the hypothalamus, estrogen receptor as the actual mediator. AR-deficient XY individuals still develop the tonic male pattern.",
  },
];

export const TUTORIAL_ROW_BY_ID: Record<RowId, TutorialRowContent> = Object.fromEntries(
  TUTORIAL_ROWS.map((r) => [r.rowId, r])
) as Record<RowId, TutorialRowContent>;

// Per-row narration for the optional AIS walkthrough that follows the tutorial.
// Lindsay should review — especially rows 7, 8, 12 (the AIS-specific divergences).
export const AIS_NARRATION: Record<RowId, string> = {
  chromosomal_sex:
    "AIS individuals are chromosomally XY — same starting point as the Typical Pathway (XY). The chromosomes are fine; the divergence is downstream.",
  sry:
    "SRY is present and functional. AIS doesn't break the gene that triggers male development — that part runs normally.",
  gonadal_dev:
    "Testes form normally. AIS individuals have testes (often undescended). This is the body's last 'normal male' step before the AR-dependent steps break.",
  local_testosterone:
    "Testes produce testosterone — full normal level. AIS is NOT about hormone production. The hormones are there; the receptor is broken.",
  wolffian:
    "FIRST DIVERGENCE. Wolffian duct development requires testosterone to act THROUGH the androgen receptor. In AIS, the AR is non-functional — so even with normal T, the ducts regress. No vas deferens, no epididymis, no seminal vesicles. This is where the AIS chart visibly forks from Normal XY.",
  amh:
    "AMH is still produced normally — Sertoli cells don't need AR to make it. So AMH suppresses the Müllerian ducts as usual. The result: AIS individuals end up with NEITHER Wolffian-derived structures (broken AR) NOR Müllerian-derived structures (intact AMH). Internal genitalia are largely absent.",
  mullerian:
    "Müllerian ducts regress (AMH did its job). So no uterus or fallopian tubes either.",
  blood_testosterone:
    "Blood-borne T is normal — testes are happily releasing it. But again, peripheral tissues that need AR to respond will be stuck.",
  five_alpha_reductase:
    "5α-reductase is fine. DHT is produced in genital skin as usual. The enzyme works; the receptor is the problem.",
  external_genitalia:
    "SECOND DIVERGENCE. External masculinization requires DHT acting on AR. DHT is there, but AR doesn't respond — so the default external pattern (clitoris, labia) develops. This is the most visible AIS phenotype: XY individual with female-appearing external genitalia.",
  sexual_behavior:
    "Brain masculinization runs through AROMATIZATION (T → estradiol → estrogen receptor) — AR-INDEPENDENT. So even with broken AR, the brain still masculinizes. This is the famous AIS dissociation: female-appearing body, male-typical brain organization.",
  gnrh_pattern:
    "Same aromatization logic — tonic GnRH pattern develops. The hypothalamus ends up male-typical even though the body looks female. This is the v1 'whole chart' insight: a single broken receptor explains body/brain dissociation, and the chart makes it walkable rather than mysterious.",
};
