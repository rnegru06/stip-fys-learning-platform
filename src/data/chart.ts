import type { ChartLayout, ChartRow, ChartEdge, RowId } from "./chart.types";

const X_FEMALE = 460;
const X_MALE = 700;
const Y_TOP = 84;
const Y_STEP = 84;

function rowY(order: number): number {
  return Y_TOP + (order - 1) * Y_STEP;
}

export const ROWS: ChartRow[] = [
  {
    id: "chromosomal_sex",
    order: 1,
    label: "Chromosomal sex",
    question: "What is the chromosomal sex of this individual?",
    explainer:
      "Chromosomes are DNA-protein structures that carry genes. Humans have 46 chromosomes in 23 pairs. The 23rd pair sets chromosomal sex — typically XX or XY. The Y chromosome carries SRY, the gene that triggers male development.",
    cells: {
      female: { rowId: "chromosomal_sex", pathway: "female", display: "XX", layout: { x: X_FEMALE, y: rowY(1) } },
      male:   { rowId: "chromosomal_sex", pathway: "male",   display: "XY", layout: { x: X_MALE,   y: rowY(1) } },
    },
  },
  {
    id: "sry",
    order: 2,
    label: "SRY",
    question: "Is the SRY gene present and expressed?",
    explainer:
      "SRY (Sex-determining Region Y) is the master switch for male development. It sits on the Y chromosome and acts very early in fetal life to redirect gonad development toward the testis. Without SRY, the default ovarian pathway runs.",
    cells: {
      female: { rowId: "sry", pathway: "female", display: "No",  layout: { x: X_FEMALE, y: rowY(2) } },
      male:   { rowId: "sry", pathway: "male",   display: "Yes", layout: { x: X_MALE,   y: rowY(2) } },
    },
  },
  {
    id: "gonadal_dev",
    order: 3,
    label: "Gonadal development",
    question: "Which gonad develops?",
    explainer:
      "Once differentiation commits, the gonad develops into either a testis or an ovary. The gonad type is the active driver of downstream hormonal signaling for the rest of the pathway.",
    populates: "gonads",
    cells: {
      female: { rowId: "gonadal_dev", pathway: "female", display: "Ovary",  layout: { x: X_FEMALE, y: rowY(3) } },
      male:   { rowId: "gonadal_dev", pathway: "male",   display: "Testis", layout: { x: X_MALE,   y: rowY(3) } },
    },
  },
  {
    id: "local_testosterone",
    order: 4,
    label: "Local testosterone secreted?",
    question: "Is testosterone secreted locally within the gonad?",
    explainer:
      "Testes synthesize testosterone in their Leydig cells starting around gestational week 8. This locally-secreted testosterone bathes nearby tissues — especially the Wolffian ducts — at very high concentrations. Ovaries don't produce significant testosterone.",
    cells: {
      female: { rowId: "local_testosterone", pathway: "female", display: "No",  layout: { x: X_FEMALE, y: rowY(4) } },
      male:   { rowId: "local_testosterone", pathway: "male",   display: "Yes", layout: { x: X_MALE,   y: rowY(4) } },
    },
  },
  {
    id: "wolffian",
    order: 5,
    label: "Wolffian duct development?",
    question: "Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?",
    explainer:
      "The Wolffian ducts develop into the male internal duct system when sustained by local testosterone acting through a functional androgen receptor. Without that signal — no testosterone OR no working receptor — the ducts regress.",
    cells: {
      female: { rowId: "wolffian", pathway: "female", display: "No",  layout: { x: X_FEMALE, y: rowY(5) } },
      male:   { rowId: "wolffian", pathway: "male",   display: "Yes", layout: { x: X_MALE,   y: rowY(5) } },
    },
  },
  {
    id: "amh",
    order: 6,
    label: "Müllerian inhibitory hormone?",
    question: "Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?",
    explainer:
      "AMH is secreted by Sertoli cells in the developing testis. It causes the Müllerian ducts to regress. Crucially, AMH signaling works independently of the androgen receptor — so it still functions even when AR is broken (like in AIS).",
    cells: {
      female: { rowId: "amh", pathway: "female", display: "No",  layout: { x: X_FEMALE, y: rowY(6) } },
      male:   { rowId: "amh", pathway: "male",   display: "Yes", layout: { x: X_MALE,   y: rowY(6) } },
    },
  },
  {
    id: "mullerian",
    order: 7,
    label: "Development of uterus\nand fallopian tubes?",
    question: "Do the Müllerian ducts develop into a uterus and fallopian tubes?",
    explainer:
      "The Müllerian ducts develop into uterus, fallopian tubes, and upper vagina by default — unless suppressed by AMH from testes. This is the female internal duct system. Its development is the absence of a signal, not the presence of one.",
    populates: "internal",
    cells: {
      female: { rowId: "mullerian", pathway: "female", display: "Yes\n(possibly stimulated\nby adrenal estrogen)", layout: { x: X_FEMALE, y: rowY(7) } },
      male:   { rowId: "mullerian", pathway: "male",   display: "No", layout: { x: X_MALE, y: rowY(7) } },
    },
  },
  {
    id: "blood_testosterone",
    order: 8,
    label: "Blood-borne testosterone?",
    question: "Is testosterone circulating in the bloodstream and reaching peripheral target tissues?",
    explainer:
      "Testes release testosterone into the bloodstream, reaching peripheral tissues like genital skin and the brain. Blood-borne testosterone is the messenger for distant masculinization; local testosterone handled the nearby Wolffian effects upstream.",
    cells: {
      female: { rowId: "blood_testosterone", pathway: "female", display: "No",  layout: { x: X_FEMALE, y: rowY(8) } },
      male:   { rowId: "blood_testosterone", pathway: "male",   display: "Yes", layout: { x: X_MALE,   y: rowY(8) } },
    },
  },
  {
    id: "five_alpha_reductase",
    order: 9,
    label: "5α-reductase in genital skin?",
    question: "Is 5α-reductase active in the genital skin (converting testosterone to DHT)?",
    explainer:
      "5α-reductase is an enzyme in genital skin that converts testosterone into DHT, a more potent androgen. DHT acts on the androgen receptor to masculinize external genitalia. Without 5α-reductase OR functional AR, externals stay female-default.",
    cells: {
      female: { rowId: "five_alpha_reductase", pathway: "female", display: "(Yes)", layout: { x: X_FEMALE, y: rowY(9) } },
      male:   { rowId: "five_alpha_reductase", pathway: "male",   display: "Yes",   layout: { x: X_MALE,   y: rowY(9) } },
    },
  },
  {
    id: "external_genitalia",
    order: 10,
    label: "External genitalia",
    question: "What external genitalia develop?",
    explainer:
      "External genitalia develop from a single bipotential primordium. With DHT acting on a functional androgen receptor, the genital tubercle becomes penis and labioscrotal folds fuse into scrotum. Without androgen action, the default female pattern emerges.",
    populates: "external",
    cells: {
      female: { rowId: "external_genitalia", pathway: "female", display: "Clitoris,\nlabia", layout: { x: X_FEMALE, y: rowY(10) } },
      male:   { rowId: "external_genitalia", pathway: "male",   display: "Penis,\nscrotum", layout: { x: X_MALE,   y: rowY(10) } },
    },
  },
  {
    id: "sexual_behavior",
    order: 11,
    label: "Sexual behavior",
    question: "What pattern of sexual behavior develops (in rats, as the canonical example)?",
    explainer:
      "In rodents, perinatal androgen organizes male-typical brain circuits — but via AROMATIZATION: testosterone is converted to estradiol inside brain cells, which then acts on estrogen receptors. This pathway does NOT depend on the androgen receptor. So even when AR is broken (AIS), the brain can still masculinize.",
    cells: {
      female: { rowId: "sexual_behavior", pathway: "female", display: "Female-typical\n(e.g., lordosis\nin rats)", layout: { x: X_FEMALE, y: rowY(11) } },
      male:   { rowId: "sexual_behavior", pathway: "male",   display: "Male-typical\n(e.g., mounting\nin rats)", layout: { x: X_MALE,   y: rowY(11) } },
    },
  },
  {
    id: "gnrh_pattern",
    order: 12,
    label: "Pattern of GnRH secretion",
    question: "What pattern of GnRH secretion develops in the hypothalamus?",
    explainer:
      "GnRH pulses are either tonic (steady) or cyclic. Like sexual behavior, this brain-level differentiation runs through aromatization — testosterone → estradiol → estrogen receptor — and so works independently of the androgen receptor. AR-deficient XY individuals still develop the tonic male pattern.",
    populates: "brain",
    cells: {
      female: { rowId: "gnrh_pattern", pathway: "female", display: "Cyclic", layout: { x: X_FEMALE, y: rowY(12) } },
      male:   { rowId: "gnrh_pattern", pathway: "male",   display: "Tonic",  layout: { x: X_MALE,   y: rowY(12) } },
    },
  },
];

export const ROW_BY_ID: Record<RowId, ChartRow> = Object.fromEntries(
  ROWS.map((row) => [row.id, row])
) as Record<RowId, ChartRow>;

const sequentialPairs: Array<[RowId, RowId]> = [
  ["chromosomal_sex", "sry"],
  ["sry", "gonadal_dev"],
  ["gonadal_dev", "local_testosterone"],
  ["local_testosterone", "wolffian"],
  ["wolffian", "amh"],
  ["amh", "mullerian"],
  ["mullerian", "blood_testosterone"],
  ["blood_testosterone", "five_alpha_reductase"],
  ["five_alpha_reductase", "external_genitalia"],
  ["external_genitalia", "sexual_behavior"],
  ["sexual_behavior", "gnrh_pattern"],
];

const verticalEdges: ChartEdge[] = sequentialPairs.flatMap(([from, to]) => [
  { from: { rowId: from, pathway: "female" }, to: { rowId: to, pathway: "female" }, style: "solid" },
  { from: { rowId: from, pathway: "male" },   to: { rowId: to, pathway: "male" },   style: "solid" },
]);

const curvedEdges: ChartEdge[] = [
  {
    from: { rowId: "local_testosterone", pathway: "male" },
    to:   { rowId: "external_genitalia", pathway: "male" },
    style: "solid",
    curved: true,
  },
  {
    from: { rowId: "local_testosterone", pathway: "female" },
    to:   { rowId: "external_genitalia", pathway: "female" },
    style: "solid",
    curved: true,
  },
];

const dashedCrossings: ChartEdge[] = [
  {
    from: { rowId: "gonadal_dev",         pathway: "male" },
    to:   { rowId: "local_testosterone",  pathway: "female" },
    style: "dashed",
  },
  {
    from: { rowId: "gonadal_dev",         pathway: "female" },
    to:   { rowId: "local_testosterone",  pathway: "male" },
    style: "dashed",
  },
  {
    from: { rowId: "local_testosterone",  pathway: "male" },
    to:   { rowId: "wolffian",            pathway: "female" },
    style: "dashed",
  },
  {
    from: { rowId: "wolffian",            pathway: "female" },
    to:   { rowId: "amh",                 pathway: "male" },
    style: "dashed",
  },
  {
    from: { rowId: "five_alpha_reductase", pathway: "male" },
    to:   { rowId: "external_genitalia",   pathway: "female" },
    style: "dashed",
  },
  {
    from: { rowId: "external_genitalia",   pathway: "female" },
    to:   { rowId: "sexual_behavior",      pathway: "male" },
    style: "dashed",
  },
];

const adrenalEstrogenLoop: ChartEdge[] = [
  {
    from: { rowId: "mullerian",          pathway: "female" },
    to:   { rowId: "blood_testosterone", pathway: "male" },
    style: "dashed",
    curved: true,
    loopBack: true,
  },
];

export const EDGES: ChartEdge[] = [
  ...verticalEdges,
  ...curvedEdges,
  ...dashedCrossings,
  ...adrenalEstrogenLoop,
];

export const CHART_LAYOUT: ChartLayout = {
  viewBoxWidth: 900,
  viewBoxHeight: 1080,
  xFemale: X_FEMALE,
  xMale: X_MALE,
  yTop: Y_TOP,
  yStep: Y_STEP,
  labelRightEdge: 310,
};
