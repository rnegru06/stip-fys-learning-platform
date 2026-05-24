import type {
  AnswerOption,
  ModuleThreeAnswer,
  OutcomeCell,
  Pathway,
  RowId,
  Scenario,
} from "./chart.types";
import { ROWS } from "./chart";

interface OptionDef {
  id: string;
  label: string;
}

const ROW_DEFAULTS: Record<RowId, { female: OptionDef; male: OptionDef }> = {
  chromosomal_sex: {
    female: { id: "xx", label: "XX" },
    male: { id: "xy", label: "XY" },
  },
  sry: {
    female: { id: "sry_no", label: "No — SRY is absent or silent" },
    male: { id: "sry_yes", label: "Yes — SRY is expressed" },
  },
  gonadal_dev: {
    female: { id: "ovary", label: "Ovary" },
    male: { id: "testis", label: "Testis" },
  },
  local_testosterone: {
    female: { id: "loc_test_no", label: "No — no local testosterone" },
    male: { id: "loc_test_yes", label: "Yes — testosterone is secreted locally" },
  },
  wolffian: {
    female: { id: "wolff_no", label: "No — Wolffian ducts regress" },
    male: { id: "wolff_yes", label: "Yes — Wolffian ducts develop" },
  },
  amh: {
    female: { id: "amh_no", label: "No — no AMH" },
    male: { id: "amh_yes", label: "Yes — Sertoli cells secrete AMH" },
  },
  mullerian: {
    female: { id: "mull_yes", label: "Yes — uterus and fallopian tubes form" },
    male: { id: "mull_no", label: "No — Müllerian ducts regress" },
  },
  blood_testosterone: {
    female: { id: "blood_t_no", label: "No — no blood-borne testosterone" },
    male: { id: "blood_t_yes", label: "Yes — testosterone circulates to peripheral tissues" },
  },
  five_alpha_reductase: {
    female: { id: "fivear_no", label: "No — 5α-reductase is absent or inactive" },
    male: { id: "fivear_yes", label: "Yes — 5α-reductase converts T to DHT" },
  },
  external_genitalia: {
    female: { id: "ext_female", label: "Clitoris, labia" },
    male: { id: "ext_male", label: "Penis, scrotum" },
  },
  sexual_behavior: {
    female: { id: "behav_female", label: "Female-typical (e.g., lordosis in rats)" },
    male: { id: "behav_male", label: "Male-typical (e.g., mounting in rats)" },
  },
  gnrh_pattern: {
    female: { id: "gnrh_cyclic", label: "Cyclic" },
    male: { id: "gnrh_tonic", label: "Tonic" },
  },
};

// UI option ordering: male first on odd rows, female first on even rows.
// Keeps the correct answer roughly 50/50 in position across scenarios.
const FIRST_SIDE_BY_ROW: Record<RowId, Pathway> = {
  chromosomal_sex: "male",
  sry: "female",
  gonadal_dev: "male",
  local_testosterone: "female",
  wolffian: "male",
  amh: "female",
  mullerian: "male",
  blood_testosterone: "female",
  five_alpha_reductase: "male",
  external_genitalia: "female",
  sexual_behavior: "male",
  gnrh_pattern: "female",
};

// Generic wrong-answer note shown when the correct trajectory is male and the student picks female.
const WRONG_NOTE_IF_CORRECT_IS_MALE: Record<RowId, string> = {
  chromosomal_sex:
    "Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.",
  sry:
    "Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.",
  gonadal_dev:
    "Without testes there are no testicular hormones to drive male development. But in this scenario testes form.",
  local_testosterone:
    "No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.",
  wolffian:
    "If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.",
  amh:
    "Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.",
  mullerian:
    "If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.",
  blood_testosterone:
    "Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.",
  five_alpha_reductase:
    "Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.",
  external_genitalia:
    "Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.",
  sexual_behavior:
    "Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.",
  gnrh_pattern:
    "A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.",
};

// Generic wrong-answer note shown when the correct trajectory is female and the student picks male.
const WRONG_NOTE_IF_CORRECT_IS_FEMALE: Record<RowId, string> = {
  chromosomal_sex:
    "Picking XY would put the path on the male trajectory. But this individual's chromosomes don't trigger male development in this scenario.",
  sry:
    "If SRY were expressed, the testis program would run and the pathway would head toward testis. But SRY isn't expressed (or isn't effective) here.",
  gonadal_dev:
    "Testes produce testosterone and AMH, driving male development. But in this scenario testes don't form (or don't function).",
  local_testosterone:
    "Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.",
  wolffian:
    "Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.",
  amh:
    "AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.",
  mullerian:
    "Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.",
  blood_testosterone:
    "Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.",
  five_alpha_reductase:
    "5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.",
  external_genitalia:
    "Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.",
  sexual_behavior:
    "Male-typical behavior requires brain masculinization (via aromatization). Without it, the default female-typical pattern emerges.",
  gnrh_pattern:
    "Tonic GnRH is the male-typical pattern. Without brain masculinization, the cyclic female-typical pattern develops.",
};

interface ScenarioSpec {
  id: string;
  displayName: string;
  description?: string;
  chromosomalSex: "XX" | "XY";
  diagnosisName?: string;
  recommendedAfter?: string[];
  pathway: Record<RowId, Pathway>;
  outcomes: Record<OutcomeCell, string>;
  // Canonical 4-tuple used by the Module 3 multiple-choice quiz. Tightened
  // from the prose outcomes so the same scenario can be auto-graded.
  moduleThreeAnswer: ModuleThreeAnswer;
  // Per-row overrides for the wrong-answer consequence note (when a generic doesn't fit the perturbation).
  noteOverrides?: Partial<Record<RowId, string>>;
}

function buildScenario(spec: ScenarioSpec): Scenario {
  const rowOptions: Record<RowId, AnswerOption[]> = {} as Record<RowId, AnswerOption[]>;

  for (const row of ROWS) {
    const correctSide = spec.pathway[row.id];
    const wrongSide: Pathway = correctSide === "male" ? "female" : "male";
    const firstSide = FIRST_SIDE_BY_ROW[row.id];
    const sides: Pathway[] = firstSide === "male" ? ["male", "female"] : ["female", "male"];

    const options: AnswerOption[] = sides.map((side) => {
      const def = ROW_DEFAULTS[row.id][side];
      if (side === correctSide) {
        const opt: AnswerOption = {
          id: def.id,
          label: def.label,
          isCorrect: true,
          lightsCell: { rowId: row.id, pathway: side },
        };
        if (row.populates) {
          opt.cellWrite = spec.outcomes[row.populates];
        }
        return opt;
      }
      const nextRow = ROWS.find((r) => r.order === row.order + 1);
      const consequenceCell = nextRow
        ? { rowId: nextRow.id, pathway: wrongSide }
        : undefined;
      const generic =
        correctSide === "male"
          ? WRONG_NOTE_IF_CORRECT_IS_MALE[row.id]
          : WRONG_NOTE_IF_CORRECT_IS_FEMALE[row.id];
      const override = spec.noteOverrides?.[row.id];
      return {
        id: def.id,
        label: def.label,
        isCorrect: false,
        wrongConsequenceCell: consequenceCell,
        wrongConsequenceNote: override ?? generic,
      };
    });

    rowOptions[row.id] = options;
  }

  return {
    id: spec.id,
    displayName: spec.displayName,
    description: spec.description,
    chromosomalSex: spec.chromosomalSex,
    diagnosisName: spec.diagnosisName,
    recommendedAfter: spec.recommendedAfter,
    rowOptions,
    outcomeForCell: spec.outcomes,
    moduleThreeAnswer: spec.moduleThreeAnswer,
  };
}

// Shorthand: pathway-by-row using a 12-letter string of "m"/"f".
function p(s: string): Record<RowId, Pathway> {
  if (s.length !== ROWS.length) throw new Error(`pathway string must be ${ROWS.length} chars, got ${s.length}`);
  const result = {} as Record<RowId, Pathway>;
  ROWS.forEach((row, i) => {
    const c = s[i].toLowerCase();
    if (c !== "m" && c !== "f") throw new Error(`bad pathway char "${s[i]}" at row ${row.id}`);
    result[row.id] = c === "m" ? "male" : "female";
  });
  return result;
}

// =============================================================================
// Scenario catalogue — 20 scenarios from Lindsay's table (scenario 4 and 13
// are the same biology; we encode it once as `xy_testes_fail`).
// =============================================================================

const SCENARIO_SPECS: ScenarioSpec[] = [
  {
    id: "normal_xy",
    displayName: "Typical Pathway (XY)",
    description: "An XY individual with all pathway components intact — the male-typical baseline.",
    chromosomalSex: "XY",
    pathway: p("mmmmmmmmmmmm"),
    outcomes: {
      gonads: "Testes",
      internal: "Wolffian-derived (vas deferens, epididymis, seminal vesicles); no uterus",
      external: "Penis, scrotum",
      brain: "Masculinized — male-typical behavior; tonic GnRH",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "Wolffian", external: "Male", brain: "Masculinized" },
  },
  {
    id: "ais",
    displayName: "Androgen insensitivity syndrome (XY)",
    description: "XY individual whose androgen receptor doesn't respond to testosterone or DHT. Wolffian ducts regress and external genitalia feminize, but AMH and aromatization still work — so no uterus, and brain is masculinized.",
    chromosomalSex: "XY",
    diagnosisName: "Complete Androgen Insensitivity Syndrome (CAIS)",
    recommendedAfter: ["normal_xy"],
    // Path: m,m,m,m,F(wolff No),m,m,m,m,F(ext female),m,m  (12 rows)
    pathway: p("mmmmfmmmmfmm"),
    outcomes: {
      gonads: "Testes (often undescended)",
      internal: "Neither Wolffian nor Müllerian structures; short blind-ending vagina",
      external: "Clitoris, labia (female-appearing)",
      brain: "Masculinized — male-typical behavior; tonic GnRH (brain via aromatization, dissociated from feminized externals)",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "None", external: "Female", brain: "Masculinized" },
    noteOverrides: {
      wolffian:
        "Wolffian duct development requires testosterone to act through the androgen receptor. In AIS the receptor is non-functional, so Wolffian ducts regress despite normal testosterone production.",
      external_genitalia:
        "Masculinization of external genitalia requires DHT acting through a functional AR. In AIS the receptor doesn't respond, so genital skin develops along the default (female-appearing) pathway.",
      sexual_behavior:
        "Brain masculinization in rats runs via AROMATIZATION — testosterone is converted to estradiol inside brain cells, which acts on estrogen receptors. AIS individuals have functional aromatase and ERs, so the brain still masculinizes. This is the famous body/brain dissociation.",
      gnrh_pattern:
        "GnRH pattern follows the same aromatization logic. Even with broken AR, the hypothalamus develops the tonic male pattern.",
    },
  },
  {
    id: "five_alpha_reductase_deficiency",
    displayName: "5α-reductase deficiency (XY)",
    description: "XY individual without functional 5α-reductase. Testosterone can act directly on Wolffian (so internal male ducts develop), but DHT can't form — external genitalia stay female-default. Brain masculinizes via aromatization.",
    chromosomalSex: "XY",
    diagnosisName: "5α-Reductase 2 deficiency",
    recommendedAfter: ["ais"],
    // m × 8, F (5αR No), F (external female), m, m  (12 rows)
    pathway: p("mmmmmmmmffmm"),
    outcomes: {
      gonads: "Testes",
      internal: "Wolffian-derived (vas deferens, epididymis, seminal vesicles); no uterus",
      external: "Clitoris, labia (female-appearing) — DHT can't form",
      brain: "Masculinized — male-typical behavior; tonic GnRH (aromatization is intact)",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "Wolffian", external: "Female", brain: "Masculinized" },
    noteOverrides: {
      five_alpha_reductase:
        "5α-reductase is the enzyme missing in this scenario. Without it, testosterone can't be converted to DHT in genital skin.",
      external_genitalia:
        "External masculinization requires DHT (not testosterone) acting on the AR. Without 5α-reductase, there's no DHT, so externals stay female-default — even though testosterone and the AR are both functional.",
    },
  },
  {
    id: "amh_absent",
    displayName: "AMH absent (XY)",
    description: "XY individual whose Sertoli cells don't produce AMH. Wolffian ducts develop normally AND Müllerian ducts persist — so this individual has BOTH internal duct systems. Externals and brain develop male-typically.",
    chromosomalSex: "XY",
    diagnosisName: "Persistent Müllerian Duct Syndrome (PMDS)",
    recommendedAfter: ["five_alpha_reductase_deficiency"],
    // m × 5, F (AMH No), F (Müllerian Yes), m × 5  (12 rows)
    pathway: p("mmmmmffmmmmm"),
    outcomes: {
      gonads: "Testes",
      internal: "BOTH Wolffian-derived (vas deferens etc.) AND Müllerian-derived (uterus, fallopian tubes)",
      external: "Penis, scrotum",
      brain: "Masculinized — male-typical behavior; tonic GnRH",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "Both", external: "Male", brain: "Masculinized" },
    noteOverrides: {
      amh:
        "AMH is missing in this scenario — that's the perturbation. Without Sertoli AMH, Müllerian ducts won't be suppressed.",
      mullerian:
        "Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — even alongside functional testes and Wolffian ducts. The result: both duct systems coexist.",
    },
  },
  {
    id: "xy_testes_fail",
    displayName: "XY with testes that fail to develop",
    description: "XY individual where the testes don't form (effective absence of TDF). With no testes, no testosterone and no AMH — the pathway defaults to ovary-pattern Müllerian, female external genitalia, and feminized brain. Lindsay listed this scenario twice (#4 and #13).",
    chromosomalSex: "XY",
    diagnosisName: "46,XY pure gonadal dysgenesis",
    recommendedAfter: ["amh_absent"],
    // m, m, then all f  (12 rows)
    pathway: p("mmffffffffff"),
    outcomes: {
      gonads: "None — gonads fail to develop",
      internal: "Müllerian-derived (uterus, fallopian tubes); no Wolffian structures",
      external: "Clitoris, labia",
      brain: "Feminized — female-typical behavior; cyclic GnRH",
    },
    moduleThreeAnswer: { gonads: "None", internal: "Müllerian", external: "Female", brain: "Feminized" },
    noteOverrides: {
      gonadal_dev:
        "Even with SRY present, the testes fail to develop in this scenario. The chart's female-side cell shows 'Ovary,' but the actual outcome here is no functional gonad at all. Either way, the path defaults onto the female trajectory downstream.",
    },
  },
  {
    id: "xy_missing_sry",
    displayName: "XY with missing SRY",
    description: "XY individual where the SRY gene is missing or non-functional. Without SRY, no TDF, no testes — the cortex develops into ovaries even with XY chromosomes. The rest of the female pathway follows.",
    chromosomalSex: "XY",
    diagnosisName: "Swyer Syndrome (46,XY complete gonadal dysgenesis)",
    recommendedAfter: ["xy_testes_fail"],
    // m, then all f  (12 rows)
    pathway: p("mfffffffffff"),
    outcomes: {
      gonads: "Ovaries",
      internal: "Müllerian-derived (uterus, fallopian tubes); no Wolffian structures",
      external: "Clitoris, labia",
      brain: "Feminized — female-typical behavior; cyclic GnRH",
    },
    moduleThreeAnswer: { gonads: "Ovaries", internal: "Müllerian", external: "Female", brain: "Feminized" },
    noteOverrides: {
      sry:
        "SRY is the perturbation here — the gene is missing or non-functional. Without it, the default ovary pathway runs even though the individual is chromosomally XY.",
    },
  },
  {
    id: "xx_cah",
    displayName: "XX with congenital adrenal hyperplasia (CAH)",
    description: "XX individual whose adrenal glands overproduce androgens. Internal genitalia develop female-typically (no local testicular testosterone, so no Wolffian; no AMH, so Müllerian develops). But adrenal androgens reach the genital skin and brain — externals masculinize and brain masculinizes.",
    chromosomalSex: "XX",
    diagnosisName: "Congenital Adrenal Hyperplasia (CAH, 21-hydroxylase deficiency)",
    recommendedAfter: ["xy_missing_sry"],
    // f × 7, m (blood T Yes from adrenal), m × 4  (12 rows)
    pathway: p("fffffffmmmmm"),
    outcomes: {
      gonads: "Ovaries",
      internal: "Müllerian-derived (uterus, fallopian tubes); no Wolffian structures",
      external: "Masculinized — penis-like clitoris, fused labia (clitoromegaly + labial fusion)",
      brain: "Masculinized — male-typical behavior; tonic GnRH (adrenal androgens reach brain)",
    },
    moduleThreeAnswer: { gonads: "Ovaries", internal: "Müllerian", external: "Male (masculinized)", brain: "Masculinized" },
    noteOverrides: {
      blood_testosterone:
        "In CAH, the adrenal glands overproduce androgens (no testes are needed). High blood-borne androgens reach genital skin and the brain.",
      external_genitalia:
        "Adrenal androgens → DHT in genital skin → external masculinization, even in an XX individual.",
    },
  },
  {
    id: "xy_no_testosterone",
    displayName: "XY with no testosterone synthesis",
    description: "XY individual whose testes form but can't synthesize testosterone (e.g., enzyme block in the steroidogenesis pathway). AMH is still produced by Sertoli cells, so Müllerian ducts regress. But without T, no Wolffian, no external masculinization, no brain masculinization.",
    chromosomalSex: "XY",
    diagnosisName: "17β-HSD3 deficiency (steroidogenesis block — Lindsay to confirm enzyme)",
    recommendedAfter: ["xx_cah"],
    // m × 3, f (no local T), f (no Wolffian), m (AMH yes), m (Müllerian no), f × 5  (12 rows)
    pathway: p("mmmffmmfffff"),
    outcomes: {
      gonads: "Testes",
      internal: "Neither Wolffian nor Müllerian structures (no T → no Wolffian; AMH suppresses Müllerian)",
      external: "Clitoris, labia",
      brain: "Feminized — female-typical behavior; cyclic GnRH (no T → no aromatization → no brain masculinization)",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "None", external: "Female", brain: "Feminized" },
    noteOverrides: {
      local_testosterone:
        "Testosterone synthesis is blocked in this scenario — the testes form but can't make T. Without local T, no Wolffian maintenance.",
      amh:
        "AMH is produced by Sertoli cells independently of testosterone synthesis. Testes here still secrete AMH normally, so Müllerian ducts are suppressed.",
    },
  },
  {
    id: "xx_high_androgens",
    displayName: "XX exposed to high androgens at 12 weeks gestation",
    description: "XX individual whose mother is exposed to an endocrine disruptor flooding the fetus with androgens at the critical period. Ovaries form (no SRY). With high systemic androgens, Wolffian ducts develop (alongside Müllerian, since no AMH), externals masculinize, and brain masculinizes.",
    chromosomalSex: "XX",
    diagnosisName: "Prenatal androgen exposure (iatrogenic / maternal virilization)",
    recommendedAfter: ["xy_no_testosterone"],
    // f × 4, m (Wolffian yes), f (AMH no), f (Müllerian yes), m × 5  (12 rows)
    pathway: p("ffffmffmmmmm"),
    outcomes: {
      gonads: "Ovaries",
      internal: "BOTH Wolffian-derived AND Müllerian-derived (high androgens drive Wolffian; no AMH lets Müllerian persist)",
      external: "Masculinized — male-like external genitalia",
      brain: "Masculinized — male-typical behavior; tonic GnRH (androgens at critical period)",
    },
    moduleThreeAnswer: { gonads: "Ovaries", internal: "Both", external: "Male (masculinized)", brain: "Masculinized" },
    noteOverrides: {
      wolffian:
        "High systemic androgens reaching Wolffian tissue can drive its development, even without local testicular testosterone. AR is functional, so the signal goes through.",
    },
  },
  {
    id: "xy_high_androgens",
    displayName: "XY exposed to high androgens at 12 weeks gestation",
    description: "XY individual whose mother is exposed to an endocrine disruptor flooding the fetus with extra androgens. The male pathway is already running on androgens — extra reinforcement, but the phenotype matches normal XY.",
    chromosomalSex: "XY",
    recommendedAfter: ["xx_high_androgens"],
    pathway: p("mmmmmmmmmmmm"),
    outcomes: {
      gonads: "Testes",
      internal: "Wolffian-derived; no uterus",
      external: "Penis, scrotum",
      brain: "Masculinized — male-typical behavior; tonic GnRH",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "Wolffian", external: "Male", brain: "Masculinized" },
  },
  {
    id: "xy_high_estrogens",
    displayName: "XY exposed to high estrogens at 12 weeks gestation (fuzzy)",
    description:
      "XY individual whose mother is exposed to high estrogens at the critical period. The male pathway runs largely as usual (testes form, T produced, Wolffian and AMH OK). Lindsay's notes mark externals and brain as 'maybe' affected — this is a fuzzy-biology case worth flagging.",
    chromosomalSex: "XY",
    diagnosisName: "Prenatal estrogen exposure (e.g. DES)",
    recommendedAfter: ["xy_high_androgens"],
    pathway: p("mmmmmmmmmmmm"),
    outcomes: {
      gonads: "Testes",
      internal: "Wolffian-derived; no uterus",
      external: "Penis, scrotum (but Lindsay notes this MAY be partially feminized — open question)",
      brain: "Masculinized — male-typical behavior; tonic GnRH (Lindsay notes this MAY be less so — open question)",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "Wolffian", external: "Male", brain: "Masculinized" },
  },
  {
    id: "xx_with_sry",
    displayName: "XX with translocated SRY",
    description: "XX individual carrying a translocated SRY gene (typically on an X chromosome from a paternal recombination event). SRY triggers TDF, testes form, and the male pathway runs.",
    chromosomalSex: "XX",
    diagnosisName: "46,XX testicular DSD (de la Chapelle syndrome)",
    recommendedAfter: ["xy_high_estrogens"],
    // f (XX), then all m  (12 rows)
    pathway: p("fmmmmmmmmmmm"),
    outcomes: {
      gonads: "Testes",
      internal: "Wolffian-derived; no uterus",
      external: "Penis, scrotum",
      brain: "Masculinized — male-typical behavior; tonic GnRH",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "Wolffian", external: "Male", brain: "Masculinized" },
    noteOverrides: {
      chromosomal_sex:
        "Chromosomally this individual is XX — but they carry a translocated SRY gene that triggers male development downstream.",
    },
  },
  {
    id: "dht_insensitive",
    displayName: "XY with insensitive DHT receptors",
    description: "XY individual whose androgen receptor doesn't respond to DHT specifically (rare partial AR insensitivity). Wolffian ducts respond to testosterone via AR (so internal male ducts form), but external masculinization requires DHT — that fails. Brain masculinizes via aromatization.",
    chromosomalSex: "XY",
    diagnosisName: "Partial Androgen Insensitivity Syndrome (PAIS)",
    recommendedAfter: ["xx_with_sry"],
    // m × 9, f (external female), m × 2  (12 rows)
    pathway: p("mmmmmmmmmfmm"),
    outcomes: {
      gonads: "Testes",
      internal: "Wolffian-derived; no uterus",
      external: "Clitoris, labia (female-appearing) — DHT can't act",
      brain: "Masculinized — male-typical behavior; tonic GnRH",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "Wolffian", external: "Female", brain: "Masculinized" },
    noteOverrides: {
      external_genitalia:
        "Masculinization of external genitalia specifically requires DHT acting on the AR. With insensitive DHT receptors, externals default to female pattern even though Wolffian (T-driven) developed normally.",
    },
  },
  {
    id: "ar_absent",
    displayName: "XY with androgen receptors absent",
    description:
      "XY individual whose androgen receptor is entirely absent (more severe than AIS). Lindsay's table records internal genitalia as 'Müllerian' here — note this differs from her AIS row (which says 'None'). Worth verifying with her: biologically, AMH from Sertoli cells should be AR-independent, suppressing Müllerian. Encoded as Lindsay wrote.",
    chromosomalSex: "XY",
    diagnosisName: "Complete Androgen Insensitivity Syndrome (CAIS) — severe form; Lindsay to disambiguate from scenario #2",
    recommendedAfter: ["dht_insensitive"],
    // m × 4, f (Wolffian no), f (AMH no per Lindsay), f (Müllerian yes), m × 2 (blood T yes, 5αR yes), f (ext female), m × 2 (brain masc via aromatization)  (12 rows)
    pathway: p("mmmmfffmmfmm"),
    outcomes: {
      gonads: "Testes",
      internal: "Müllerian-derived (uterus, fallopian tubes)",
      external: "Clitoris, labia (female-appearing)",
      brain: "Masculinized — male-typical behavior; tonic GnRH (aromatization is intact)",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "Müllerian", external: "Female", brain: "Masculinized" },
    noteOverrides: {
      amh:
        "Lindsay's table for this scenario records AMH as absent (which would let Müllerian ducts persist). Biologically, AMH is normally AR-independent — worth a check with Lindsay about whether AR-absent fundamentally differs from AIS here.",
    },
  },
  {
    id: "xy_one_testicle_fails",
    displayName: "XY with one testicle that fails to develop",
    description: "XY individual where one testicle fails to develop (the other works normally). One functional testis is enough to produce testosterone and AMH systemically — the pathway runs male-typical, just with one testis instead of two.",
    chromosomalSex: "XY",
    diagnosisName: "Unilateral testicular dysgenesis",
    recommendedAfter: ["ar_absent"],
    pathway: p("mmmmmmmmmmmm"),
    outcomes: {
      gonads: "One testis (one functional, one absent)",
      internal: "Wolffian-derived; no uterus",
      external: "Penis, scrotum",
      brain: "Masculinized — male-typical behavior; tonic GnRH",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "Wolffian", external: "Male", brain: "Masculinized" },
  },
  {
    id: "xx_no_ovaries",
    displayName: "XX with ovaries that fail to develop",
    description: "XX individual where both ovaries fail to develop. Female internal and external structures don't actually require ovarian hormones during fetal development — they're the default. So body and brain still develop female-typically.",
    chromosomalSex: "XX",
    diagnosisName: "46,XX gonadal dysgenesis",
    recommendedAfter: ["xy_one_testicle_fails"],
    pathway: p("ffffffffffff"),
    outcomes: {
      gonads: "None — ovaries fail to develop",
      internal: "Müllerian-derived (uterus, fallopian tubes)",
      external: "Clitoris, labia",
      brain: "Feminized — female-typical behavior; cyclic GnRH",
    },
    moduleThreeAnswer: { gonads: "None", internal: "Müllerian", external: "Female", brain: "Feminized" },
    noteOverrides: {
      gonadal_dev:
        "Female fetal development is the default pathway — it doesn't require ovarian hormones. Without ovaries, the rest of the female pathway still runs.",
    },
  },
  {
    id: "xy_aromatase_defective",
    displayName: "XY with defective aromatase",
    description:
      "XY individual whose aromatase enzyme doesn't function. Body develops male-typically (T and DHT work fine — aromatase isn't needed for genital development). But brain masculinization in rats REQUIRES aromatization of testosterone to estradiol — without it, the brain stays female-typical.",
    chromosomalSex: "XY",
    diagnosisName: "Aromatase deficiency (CYP19A1)",
    recommendedAfter: ["xx_no_ovaries"],
    // m × 10, f (brain behavior), f (GnRH)  (12 rows)
    pathway: p("mmmmmmmmmmff"),
    outcomes: {
      gonads: "Testes",
      internal: "Wolffian-derived; no uterus",
      external: "Penis, scrotum",
      brain: "Feminized — female-typical behavior; cyclic GnRH (aromatization fails, no E2 reaches brain ERs)",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "Wolffian", external: "Male", brain: "Feminized" },
    noteOverrides: {
      sexual_behavior:
        "This is the inverse of AIS: in aromatase deficiency, the body masculinizes normally (AR and DHT work), but the brain CAN'T masculinize because the T→E2 conversion needed inside brain cells fails. Result: male body, female brain.",
      gnrh_pattern:
        "GnRH pattern follows the same logic. Without aromatization, the hypothalamus doesn't get the estradiol signal needed for masculinization.",
    },
  },
  {
    id: "xx_afp_nonfunctional",
    displayName: "XX with non-functional maternal α-fetoprotein (AFP)",
    description:
      "XX individual whose mother's AFP is non-functional. Normally AFP binds maternal estrogen in fetal circulation, keeping it out of the fetal brain. Without AFP, maternal estrogen reaches the fetal brain and masculinizes it (via the estrogen receptor pathway). Body develops female-typically (no T to drive male body), but brain ends up masculinized.",
    chromosomalSex: "XX",
    recommendedAfter: ["xy_aromatase_defective"],
    // f × 10, m (behavior), m (GnRH)  (12 rows)
    pathway: p("ffffffffffmm"),
    outcomes: {
      gonads: "Ovaries",
      internal: "Müllerian-derived (uterus, fallopian tubes)",
      external: "Clitoris, labia",
      brain: "Masculinized — male-typical behavior; tonic GnRH (maternal E2 reaches brain via failed AFP)",
    },
    moduleThreeAnswer: { gonads: "Ovaries", internal: "Müllerian", external: "Female", brain: "Masculinized" },
    noteOverrides: {
      sexual_behavior:
        "Without AFP buffering, maternal estradiol crosses into the fetal brain and acts on estrogen receptors — the same pathway that masculinizes the brain in male fetuses. Result: female body, male brain.",
    },
  },
  {
    id: "xy_afp_nonfunctional",
    displayName: "XY with non-functional maternal α-fetoprotein (AFP)",
    description: "XY individual whose mother's AFP is non-functional. Brain masculinization was going to happen anyway (via local aromatization). Extra maternal estrogen reaching the brain doesn't change much — the result still looks like normal XY.",
    chromosomalSex: "XY",
    recommendedAfter: ["xx_afp_nonfunctional"],
    pathway: p("mmmmmmmmmmmm"),
    outcomes: {
      gonads: "Testes",
      internal: "Wolffian-derived; no uterus",
      external: "Penis, scrotum",
      brain: "Masculinized — male-typical behavior; tonic GnRH",
    },
    moduleThreeAnswer: { gonads: "Testes", internal: "Wolffian", external: "Male", brain: "Masculinized" },
  },
  {
    id: "xx_in_xx_xy_twin",
    displayName: "XX twin in an XX/XY twin pair",
    description:
      "XX individual sharing fetal circulation with an XY twin (in cattle this is the 'freemartin' scenario where XX twins masculinize). Lindsay's table treats this case as developing normally female-typical for human twins — encoded as such.",
    chromosomalSex: "XX",
    diagnosisName: "Freemartin effect (rare in humans)",
    recommendedAfter: ["xy_afp_nonfunctional"],
    pathway: p("ffffffffffff"),
    outcomes: {
      gonads: "Ovaries",
      internal: "Müllerian-derived (uterus, fallopian tubes)",
      external: "Clitoris, labia",
      brain: "Feminized — female-typical behavior; cyclic GnRH",
    },
    moduleThreeAnswer: { gonads: "Ovaries", internal: "Müllerian", external: "Female", brain: "Feminized" },
  },
];

export const SCENARIOS: Scenario[] = SCENARIO_SPECS.map(buildScenario);

export const SCENARIO_BY_ID: Record<string, Scenario> = Object.fromEntries(
  SCENARIOS.map((s) => [s.id, s])
);

// Backwards-compat named exports (used by older imports).
export const SCENARIO_NORMAL_XY = SCENARIO_BY_ID["normal_xy"];
export const SCENARIO_AIS = SCENARIO_BY_ID["ais"];
