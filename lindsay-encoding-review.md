# Lindsay Encoding Review — Sex Differentiation Flowchart Tool

This report is auto-generated from the encoded chart and scenarios.
It lists the exact questions, answers, and biological explanations
students will see in the v1 demo. Read it through and mark anything
that needs revision — we'll regenerate after each round of edits.

---

## Chart structure overview

| # | Row label | Female pathway | Male pathway | Outcome cell |
|---|-----------|----------------|--------------|--------------|
| 1 | Chromosomal sex | XX | XY | — |
| 2 | SRY | No | Yes | — |
| 3 | Gonadal development | Ovary | Testis | gonads |
| 4 | Local testosterone secreted? | No | Yes | — |
| 5 | Wolffian duct development? | No | Yes | — |
| 6 | Müllerian inhibitory hormone? | No | Yes | — |
| 7 | Development of uterus and fallopian tubes? | Yes (possibly stimulated by adrenal estrogen) | No | internal |
| 8 | Blood-borne testosterone? | No | Yes | — |
| 9 | 5α-reductase in genital skin? | (Yes) | Yes | — |
| 10 | External genitalia | Clitoris, labia | Penis, scrotum | external |
| 11 | Sexual behavior | Female-typical (e.g., lordosis in rats) | Male-typical (e.g., mounting in rats) | — |
| 12 | Pattern of GnRH secretion | Cyclic | Tonic | brain |

---

## Scenarios — chromosomes & diagnosis names

v2 adds two new metadata fields per scenario: `chromosomalSex` (XX or XY,
used to group the picker) and `diagnosisName` (optional clinical/syndrome label,
shown as a subtitle on cards and headers). Please confirm each diagnosis name
and fill in any rows marked **TODO**.

Split: **6 XX / 14 XY** — currently skewed toward XY.

| # | Display name | Chromosomes | Diagnosis name |
|---|--------------|-------------|----------------|
| 1 | Typical Pathway (XY) | XY | **TODO — Lindsay to fill in** |
| 2 | Androgen insensitivity syndrome (XY) | XY | Complete Androgen Insensitivity Syndrome (CAIS) |
| 3 | 5α-reductase deficiency (XY) | XY | 5α-Reductase 2 deficiency |
| 4 | AMH absent (XY) | XY | Persistent Müllerian Duct Syndrome (PMDS) |
| 5 | XY with testes that fail to develop | XY | 46,XY pure gonadal dysgenesis |
| 6 | XY with missing SRY | XY | Swyer Syndrome (46,XY complete gonadal dysgenesis) |
| 7 | XX with congenital adrenal hyperplasia (CAH) | XX | Congenital Adrenal Hyperplasia (CAH, 21-hydroxylase deficiency) |
| 8 | XY with no testosterone synthesis | XY | 17β-HSD3 deficiency (steroidogenesis block — Lindsay to confirm enzyme) |
| 9 | XX exposed to high androgens at 12 weeks gestation | XX | Prenatal androgen exposure (iatrogenic / maternal virilization) |
| 10 | XY exposed to high androgens at 12 weeks gestation | XY | **TODO — Lindsay to fill in** |
| 11 | XY exposed to high estrogens at 12 weeks gestation (fuzzy) | XY | Prenatal estrogen exposure (e.g. DES) |
| 12 | XX with translocated SRY | XX | 46,XX testicular DSD (de la Chapelle syndrome) |
| 13 | XY with insensitive DHT receptors | XY | Partial Androgen Insensitivity Syndrome (PAIS) |
| 14 | XY with androgen receptors absent | XY | Complete Androgen Insensitivity Syndrome (CAIS) — severe form; Lindsay to disambiguate from scenario #2 |
| 15 | XY with one testicle that fails to develop | XY | Unilateral testicular dysgenesis |
| 16 | XX with ovaries that fail to develop | XX | 46,XX gonadal dysgenesis |
| 17 | XY with defective aromatase | XY | Aromatase deficiency (CYP19A1) |
| 18 | XX with non-functional maternal α-fetoprotein (AFP) | XX | **TODO — Lindsay to fill in** |
| 19 | XY with non-functional maternal α-fetoprotein (AFP) | XY | **TODO — Lindsay to fill in** |
| 20 | XX twin in an XX/XY twin pair | XX | Freemartin effect (rare in humans) |

---

## Tutorial module — per-row breakdowns (v2)

Each of the 14 rows in the new Tutorial module shows the student a
question-meaning prose, a per-answer meaning, and a connection-to-previous-row
note. Drafted from the chart explainers; please mark anything that misreads.

### Row 1 — Chromosomal sex

**Question meaning:** Every individual starts with a chromosomal makeup set at conception. This row asks which 23rd-pair configuration the zygote inherited — the upstream variable that everything else in the chart conditions on.

**Option meanings:**
- `xx` — Two X chromosomes. The default mammalian configuration. The Y-only gene SRY is absent.
- `xy` — One X, one Y. The Y carries SRY, the master switch that can trigger the cascade toward male development.

### Row 2 — SRY

**Question meaning:** SRY (Sex-determining Region Y) is the gene that initiates the male pathway. This row asks whether it is present AND expressed in the developing gonad.

**Option meanings:**
- `sry_no` — Either there's no Y chromosome to carry SRY, or the gene is present but non-functional. Either way, the trigger for the male cascade is absent.
- `sry_yes` — SRY is on the Y chromosome and is being transcribed in the gonadal ridge. It drives the testis-construction program in the next step.

**Connection to row 1:** Whether SRY can even be expressed depends on what happened upstream: in XX the gene typically isn't there at all; in XY it usually is, but mutations can silence it (Swyer Syndrome).

### Row 3 — Gonadal development

**Question meaning:** Differentiation commits the early gonad to one of two outcomes. This row asks which structure has actually developed — the first anatomical-level output of the chart, and the source of every hormonal signal downstream.

**Option meanings:**
- `ovary` — An ovary. It produces estrogens (mostly later) but very little testosterone during fetal development. The downstream pathway is hormone-quiet for most of the chart.
- `testis` — A testis. It contains Leydig cells (testosterone) and Sertoli cells (AMH) — the two hormonal sources that drive everything from row 4 on.

**Connection to row 2:** SRY (row 2) flips development from the default ovarian pathway into the testis pathway. No SRY = ovary; SRY expressed = testis.

### Row 4 — Local testosterone secreted?

**Question meaning:** Testes secrete testosterone locally (right around the gonad) starting around week 8. This row asks whether that nearby-tissue T is present — the signal that the adjacent Wolffian ducts will need in row 5.

**Option meanings:**
- `loc_test_no` — Either no testes formed, or they can't synthesize T. Either way, the adjacent Wolffian ducts get no androgen signal.
- `loc_test_yes` — Functional testes (Leydig cells) produce testosterone in a small zone right around the gonad. Very high local concentrations bathe the Wolffian ducts.

**Connection to row 3:** Only testes (row 3) produce significant testosterone in fetal development. Ovaries don't.

### Row 5 — Wolffian duct development?

**Question meaning:** The Wolffian ducts can develop into the male internal duct system (vas deferens, epididymis, seminal vesicles) — but only if a specific signal arrives. This row asks whether they do.

**Option meanings:**
- `wolff_no` — Without sustained local testosterone acting through a functional androgen receptor, the Wolffian ducts regress. No male internal ducts form.
- `wolff_yes` — Local T binds the androgen receptor in Wolffian-duct cells, maintaining them and driving their differentiation into vas deferens, epididymis, and seminal vesicles.

**Connection to row 4:** Local T from row 4 is the upstream signal — but the androgen receptor must also be functional. This is where AIS branches: T is there, but the receptor can't respond.

### Row 6 — Müllerian inhibitory hormone?

**Question meaning:** Sertoli cells in the developing testis secrete AMH (Müllerian Inhibitory Hormone). This row asks whether AMH is being produced — the signal that will suppress the Müllerian ducts in the next row.

**Option meanings:**
- `amh_no` — No testes, or testes without functional Sertoli cells. Müllerian ducts won't get the regression signal.
- `amh_yes` — Sertoli cells in functional testes secrete AMH. Crucially, AMH signaling is independent of the androgen receptor — so it still works in AIS.

**Connection to row 5:** AMH is made by Sertoli cells in the testis (row 3). Note: AMH production is independent of the AR pathway used by the Wolffian ducts in row 5.

### Row 7 — Development of uterus and fallopian tubes?

**Question meaning:** The Müllerian ducts develop into uterus, fallopian tubes, and upper vagina BY DEFAULT — unless suppressed. This row asks whether the suppression signal (AMH) prevented that default.

**Option meanings:**
- `mull_yes` — No AMH = no suppression = Müllerian ducts develop. Uterus and fallopian tubes form. This is the default outcome.
- `mull_no` — AMH from Sertoli cells caused the Müllerian ducts to regress. No uterus, no fallopian tubes.

**Connection to row 6:** AMH (row 6) is the suppression signal. Its absence is what allows Müllerian development — Müllerian formation is the default, not an active program.

### Row 8 — Blood-borne testosterone?

**Question meaning:** Testosterone can either stay local (rows 6–7) or enter the bloodstream and reach distant tissues like genital skin and brain. This row asks about the systemic signal — the messenger for peripheral masculinization downstream.

**Option meanings:**
- `blood_t_no` — Without testes (or with adrenals not overproducing), peripheral tissues don't get an androgen signal. The default female pattern proceeds in genital skin and brain.
- `blood_t_yes` — Testes (or in CAH, adrenals) release T into circulation. It reaches genital skin (for row 9–10) and the brain (for rows 11–12).

**Connection to row 7:** Internal duct development (rows 5–7) used local hormone signals. From here on the chart, the same testosterone source becomes systemic — different distance, different tissues, same hormone.

### Row 9 — 5α-reductase in genital skin?

**Question meaning:** 5α-reductase is an enzyme in genital skin that converts testosterone into DHT, a more potent androgen. This row asks whether that conversion is happening — DHT, not T, is what masculinizes external genitalia.

**Option meanings:**
- `fivear_no` — No 5α-reductase activity. Without conversion to DHT, peripheral T can't drive external masculinization. (5α-reductase deficiency lands here.)
- `fivear_yes` — 5α-reductase is active in genital-skin tissue, converting circulating T into DHT — the specific androgen that the next row needs.

**Connection to row 8:** Blood-borne T (row 8) is the substrate. 5α-reductase is the enzyme that turns it into the more potent DHT that genital skin actually responds to.

### Row 10 — External genitalia

**Question meaning:** External genitalia develop from a single bipotential primordium that becomes either male or female structures. This row asks which way it went — and DHT acting on a functional androgen receptor is what tips the balance toward male.

**Option meanings:**
- `ext_female` — Without DHT action on AR, the default external pattern emerges: clitoris and labia. This is what XX individuals develop, and also what XY individuals develop if DHT or AR is missing.
- `ext_male` — DHT binds AR on genital-skin cells, masculinizing the bipotential primordium: the genital tubercle becomes penis, labioscrotal folds fuse into scrotum.

**Connection to row 9:** DHT (made in row 9) binds AR here. Both DHT and a functional AR must be present — break either, and the default female pattern emerges (AIS and 5α-reductase deficiency are the two routes).

### Row 11 — Sexual behavior

**Question meaning:** In rats, perinatal hormones organize male- or female-typical brain circuits. This row asks which pattern develops. The key surprise: in rats, this depends on AROMATIZATION (T → estradiol) and the estrogen receptor — NOT the androgen receptor.

**Option meanings:**
- `behav_female` — No brain masculinization. The default female-typical pattern emerges (e.g., lordosis in rats).
- `behav_male` — Testosterone enters brain cells, is aromatized to estradiol, and estradiol acts on estrogen receptors to organize male-typical circuits. This pathway is AR-independent — AIS individuals still masculinize the brain.

**Connection to row 10:** Same T from row 8 is the substrate, but inside brain cells it's aromatized to estradiol — and acts through the estrogen receptor. This is why AIS shows a 'female body, male brain' dissociation.

### Row 12 — Pattern of GnRH secretion

**Question meaning:** GnRH (gonadotropin-releasing hormone) is secreted from the hypothalamus in patterns: cyclic (default) or tonic (male-typical). This row asks which pattern develops — and like sexual behavior, it runs through aromatization, not AR.

**Option meanings:**
- `gnrh_cyclic` — The default female-typical pattern. GnRH pulses fluctuate cyclically; later in life this supports the menstrual cycle.
- `gnrh_tonic` — Steady, tonic GnRH secretion. Develops when fetal T is aromatized to estradiol in the hypothalamus, organizing male-typical pulse architecture.

**Connection to row 11:** Same logic as row 11: aromatization in the hypothalamus, estrogen receptor as the actual mediator. AR-deficient XY individuals still develop the tonic male pattern.

---

## Tutorial module — AIS walkthrough narration (v2)

After the 14 row-lessons, students are offered an optional walk through
Complete Androgen Insensitivity Syndrome (AIS). At each row, this prose
appears alongside the chart. Special focus on the row-7 (Wolffian) and
row-12 (external genitalia) divergences.

**Row 1 — Chromosomal sex:** AIS individuals are chromosomally XY — same starting point as the Typical Pathway (XY). The chromosomes are fine; the divergence is downstream.

**Row 2 — SRY:** SRY is present and functional. AIS doesn't break the gene that triggers male development — that part runs normally.

**Row 3 — Gonadal development:** Testes form normally. AIS individuals have testes (often undescended). This is the body's last 'normal male' step before the AR-dependent steps break.

**Row 4 — Local testosterone secreted?:** Testes produce testosterone — full normal level. AIS is NOT about hormone production. The hormones are there; the receptor is broken.

**Row 5 — Wolffian duct development?:** FIRST DIVERGENCE. Wolffian duct development requires testosterone to act THROUGH the androgen receptor. In AIS, the AR is non-functional — so even with normal T, the ducts regress. No vas deferens, no epididymis, no seminal vesicles. This is where the AIS chart visibly forks from Normal XY.

**Row 6 — Müllerian inhibitory hormone?:** AMH is still produced normally — Sertoli cells don't need AR to make it. So AMH suppresses the Müllerian ducts as usual. The result: AIS individuals end up with NEITHER Wolffian-derived structures (broken AR) NOR Müllerian-derived structures (intact AMH). Internal genitalia are largely absent.

**Row 7 — Development of uterus and fallopian tubes?:** Müllerian ducts regress (AMH did its job). So no uterus or fallopian tubes either.

**Row 8 — Blood-borne testosterone?:** Blood-borne T is normal — testes are happily releasing it. But again, peripheral tissues that need AR to respond will be stuck.

**Row 9 — 5α-reductase in genital skin?:** 5α-reductase is fine. DHT is produced in genital skin as usual. The enzyme works; the receptor is the problem.

**Row 10 — External genitalia:** SECOND DIVERGENCE. External masculinization requires DHT acting on AR. DHT is there, but AR doesn't respond — so the default external pattern (clitoris, labia) develops. This is the most visible AIS phenotype: XY individual with female-appearing external genitalia.

**Row 11 — Sexual behavior:** Brain masculinization runs through AROMATIZATION (T → estradiol → estrogen receptor) — AR-INDEPENDENT. So even with broken AR, the brain still masculinizes. This is the famous AIS dissociation: female-appearing body, male-typical brain organization.

**Row 12 — Pattern of GnRH secretion:** Same aromatization logic — tonic GnRH pattern develops. The hypothalamus ends up male-typical even though the body looks female. This is the v1 'whole chart' insight: a single broken receptor explains body/brain dissociation, and the chart makes it walkable rather than mysterious.

---

## Scenario: Typical Pathway (XY)

**Chromosomes:** XY  
**Diagnosis name:** _(none — Lindsay to confirm or leave unset)_

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes |
| internal | Wolffian-derived (vas deferens, epididymis, seminal vesicles); no uterus |
| external | Penis, scrotum |
| brain | Masculinized — male-typical behavior; tonic GnRH |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *Yes — Wolffian ducts develop*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — Wolffian ducts regress** _(briefly lights amh / female)_ — If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *Yes — Sertoli cells secrete AMH*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no AMH** _(briefly lights mullerian / female)_ — Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *No — Müllerian ducts regress*  → lights the **male** column cell

**Writes outcome cell** `internal` = *Wolffian-derived (vas deferens, epididymis, seminal vesicles); no uterus*

**Wrong-answer consequence notes:**

- **Yes — uterus and fallopian tubes form** _(briefly lights blood_testosterone / female)_ — If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Penis, scrotum*  → lights the **male** column cell

**Writes outcome cell** `external` = *Penis, scrotum*

**Wrong-answer consequence notes:**

- **Clitoris, labia** _(briefly lights sexual_behavior / female)_ — Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: Androgen insensitivity syndrome (XY)

**Chromosomes:** XY  
**Diagnosis name:** Complete Androgen Insensitivity Syndrome (CAIS)

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes (often undescended) |
| internal | Neither Wolffian nor Müllerian structures; short blind-ending vagina |
| external | Clitoris, labia (female-appearing) |
| brain | Masculinized — male-typical behavior; tonic GnRH (brain via aromatization, dissociated from feminized externals) |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes (often undescended)*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *No — Wolffian ducts regress*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Wolffian ducts develop** _(briefly lights amh / male)_ — Wolffian duct development requires testosterone to act through the androgen receptor. In AIS the receptor is non-functional, so Wolffian ducts regress despite normal testosterone production.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *Yes — Sertoli cells secrete AMH*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no AMH** _(briefly lights mullerian / female)_ — Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *No — Müllerian ducts regress*  → lights the **male** column cell

**Writes outcome cell** `internal` = *Neither Wolffian nor Müllerian structures; short blind-ending vagina*

**Wrong-answer consequence notes:**

- **Yes — uterus and fallopian tubes form** _(briefly lights blood_testosterone / female)_ — If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Clitoris, labia*  → lights the **female** column cell

**Writes outcome cell** `external` = *Clitoris, labia (female-appearing)*

**Wrong-answer consequence notes:**

- **Penis, scrotum** _(briefly lights sexual_behavior / male)_ — Masculinization of external genitalia requires DHT acting through a functional AR. In AIS the receptor doesn't respond, so genital skin develops along the default (female-appearing) pathway.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Brain masculinization in rats runs via AROMATIZATION — testosterone is converted to estradiol inside brain cells, which acts on estrogen receptors. AIS individuals have functional aromatase and ERs, so the brain still masculinizes. This is the famous body/brain dissociation.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH (brain via aromatization, dissociated from feminized externals)*

**Wrong-answer consequence notes:**

- **Cyclic** — GnRH pattern follows the same aromatization logic. Even with broken AR, the hypothalamus develops the tonic male pattern.

---

## Scenario: 5α-reductase deficiency (XY)

**Chromosomes:** XY  
**Diagnosis name:** 5α-Reductase 2 deficiency

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes |
| internal | Wolffian-derived (vas deferens, epididymis, seminal vesicles); no uterus |
| external | Clitoris, labia (female-appearing) — DHT can't form |
| brain | Masculinized — male-typical behavior; tonic GnRH (aromatization is intact) |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *Yes — Wolffian ducts develop*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — Wolffian ducts regress** _(briefly lights amh / female)_ — If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *Yes — Sertoli cells secrete AMH*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no AMH** _(briefly lights mullerian / female)_ — Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *No — Müllerian ducts regress*  → lights the **male** column cell

**Writes outcome cell** `internal` = *Wolffian-derived (vas deferens, epididymis, seminal vesicles); no uterus*

**Wrong-answer consequence notes:**

- **Yes — uterus and fallopian tubes form** _(briefly lights blood_testosterone / female)_ — If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *No — 5α-reductase is absent or inactive*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — 5α-reductase converts T to DHT** _(briefly lights external_genitalia / male)_ — 5α-reductase is the enzyme missing in this scenario. Without it, testosterone can't be converted to DHT in genital skin.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Clitoris, labia*  → lights the **female** column cell

**Writes outcome cell** `external` = *Clitoris, labia (female-appearing) — DHT can't form*

**Wrong-answer consequence notes:**

- **Penis, scrotum** _(briefly lights sexual_behavior / male)_ — External masculinization requires DHT (not testosterone) acting on the AR. Without 5α-reductase, there's no DHT, so externals stay female-default — even though testosterone and the AR are both functional.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH (aromatization is intact)*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: AMH absent (XY)

**Chromosomes:** XY  
**Diagnosis name:** Persistent Müllerian Duct Syndrome (PMDS)

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes |
| internal | BOTH Wolffian-derived (vas deferens etc.) AND Müllerian-derived (uterus, fallopian tubes) |
| external | Penis, scrotum |
| brain | Masculinized — male-typical behavior; tonic GnRH |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *Yes — Wolffian ducts develop*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — Wolffian ducts regress** _(briefly lights amh / female)_ — If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *No — no AMH*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Sertoli cells secrete AMH** _(briefly lights mullerian / male)_ — AMH is missing in this scenario — that's the perturbation. Without Sertoli AMH, Müllerian ducts won't be suppressed.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *Yes — uterus and fallopian tubes form*  → lights the **female** column cell

**Writes outcome cell** `internal` = *BOTH Wolffian-derived (vas deferens etc.) AND Müllerian-derived (uterus, fallopian tubes)*

**Wrong-answer consequence notes:**

- **No — Müllerian ducts regress** _(briefly lights blood_testosterone / male)_ — Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — even alongside functional testes and Wolffian ducts. The result: both duct systems coexist.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Penis, scrotum*  → lights the **male** column cell

**Writes outcome cell** `external` = *Penis, scrotum*

**Wrong-answer consequence notes:**

- **Clitoris, labia** _(briefly lights sexual_behavior / female)_ — Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: XY with testes that fail to develop

**Chromosomes:** XY  
**Diagnosis name:** 46,XY pure gonadal dysgenesis

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | None — gonads fail to develop |
| internal | Müllerian-derived (uterus, fallopian tubes); no Wolffian structures |
| external | Clitoris, labia |
| brain | Feminized — female-typical behavior; cyclic GnRH |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Ovary*  → lights the **female** column cell

**Writes outcome cell** `gonads` = *None — gonads fail to develop*

**Wrong-answer consequence notes:**

- **Testis** _(briefly lights local_testosterone / male)_ — Even with SRY present, the testes fail to develop in this scenario. The chart's female-side cell shows 'Ovary,' but the actual outcome here is no functional gonad at all. Either way, the path defaults onto the female trajectory downstream.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *No — no local testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone is secreted locally** _(briefly lights wolffian / male)_ — Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *No — Wolffian ducts regress*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Wolffian ducts develop** _(briefly lights amh / male)_ — Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *No — no AMH*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Sertoli cells secrete AMH** _(briefly lights mullerian / male)_ — AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *Yes — uterus and fallopian tubes form*  → lights the **female** column cell

**Writes outcome cell** `internal` = *Müllerian-derived (uterus, fallopian tubes); no Wolffian structures*

**Wrong-answer consequence notes:**

- **No — Müllerian ducts regress** _(briefly lights blood_testosterone / male)_ — Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *No — no blood-borne testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone circulates to peripheral tissues** _(briefly lights five_alpha_reductase / male)_ — Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *No — 5α-reductase is absent or inactive*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — 5α-reductase converts T to DHT** _(briefly lights external_genitalia / male)_ — 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Clitoris, labia*  → lights the **female** column cell

**Writes outcome cell** `external` = *Clitoris, labia*

**Wrong-answer consequence notes:**

- **Penis, scrotum** _(briefly lights sexual_behavior / male)_ — Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Female-typical (e.g., lordosis in rats)*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Male-typical (e.g., mounting in rats)** _(briefly lights gnrh_pattern / male)_ — Male-typical behavior requires brain masculinization (via aromatization). Without it, the default female-typical pattern emerges.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Cyclic*  → lights the **female** column cell

**Writes outcome cell** `brain` = *Feminized — female-typical behavior; cyclic GnRH*

**Wrong-answer consequence notes:**

- **Tonic** — Tonic GnRH is the male-typical pattern. Without brain masculinization, the cyclic female-typical pattern develops.

---

## Scenario: XY with missing SRY

**Chromosomes:** XY  
**Diagnosis name:** Swyer Syndrome (46,XY complete gonadal dysgenesis)

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Ovaries |
| internal | Müllerian-derived (uterus, fallopian tubes); no Wolffian structures |
| external | Clitoris, labia |
| brain | Feminized — female-typical behavior; cyclic GnRH |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *No — SRY is absent or silent*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — SRY is expressed** _(briefly lights gonadal_dev / male)_ — SRY is the perturbation here — the gene is missing or non-functional. Without it, the default ovary pathway runs even though the individual is chromosomally XY.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Ovary*  → lights the **female** column cell

**Writes outcome cell** `gonads` = *Ovaries*

**Wrong-answer consequence notes:**

- **Testis** _(briefly lights local_testosterone / male)_ — Testes produce testosterone and AMH, driving male development. But in this scenario testes don't form (or don't function).

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *No — no local testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone is secreted locally** _(briefly lights wolffian / male)_ — Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *No — Wolffian ducts regress*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Wolffian ducts develop** _(briefly lights amh / male)_ — Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *No — no AMH*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Sertoli cells secrete AMH** _(briefly lights mullerian / male)_ — AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *Yes — uterus and fallopian tubes form*  → lights the **female** column cell

**Writes outcome cell** `internal` = *Müllerian-derived (uterus, fallopian tubes); no Wolffian structures*

**Wrong-answer consequence notes:**

- **No — Müllerian ducts regress** _(briefly lights blood_testosterone / male)_ — Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *No — no blood-borne testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone circulates to peripheral tissues** _(briefly lights five_alpha_reductase / male)_ — Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *No — 5α-reductase is absent or inactive*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — 5α-reductase converts T to DHT** _(briefly lights external_genitalia / male)_ — 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Clitoris, labia*  → lights the **female** column cell

**Writes outcome cell** `external` = *Clitoris, labia*

**Wrong-answer consequence notes:**

- **Penis, scrotum** _(briefly lights sexual_behavior / male)_ — Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Female-typical (e.g., lordosis in rats)*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Male-typical (e.g., mounting in rats)** _(briefly lights gnrh_pattern / male)_ — Male-typical behavior requires brain masculinization (via aromatization). Without it, the default female-typical pattern emerges.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Cyclic*  → lights the **female** column cell

**Writes outcome cell** `brain` = *Feminized — female-typical behavior; cyclic GnRH*

**Wrong-answer consequence notes:**

- **Tonic** — Tonic GnRH is the male-typical pattern. Without brain masculinization, the cyclic female-typical pattern develops.

---

## Scenario: XX with congenital adrenal hyperplasia (CAH)

**Chromosomes:** XX  
**Diagnosis name:** Congenital Adrenal Hyperplasia (CAH, 21-hydroxylase deficiency)

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Ovaries |
| internal | Müllerian-derived (uterus, fallopian tubes); no Wolffian structures |
| external | Masculinized — penis-like clitoris, fused labia (clitoromegaly + labial fusion) |
| brain | Masculinized — male-typical behavior; tonic GnRH (adrenal androgens reach brain) |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XX*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **XY** _(briefly lights sry / male)_ — Picking XY would put the path on the male trajectory. But this individual's chromosomes don't trigger male development in this scenario.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *No — SRY is absent or silent*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — SRY is expressed** _(briefly lights gonadal_dev / male)_ — If SRY were expressed, the testis program would run and the pathway would head toward testis. But SRY isn't expressed (or isn't effective) here.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Ovary*  → lights the **female** column cell

**Writes outcome cell** `gonads` = *Ovaries*

**Wrong-answer consequence notes:**

- **Testis** _(briefly lights local_testosterone / male)_ — Testes produce testosterone and AMH, driving male development. But in this scenario testes don't form (or don't function).

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *No — no local testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone is secreted locally** _(briefly lights wolffian / male)_ — Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *No — Wolffian ducts regress*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Wolffian ducts develop** _(briefly lights amh / male)_ — Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *No — no AMH*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Sertoli cells secrete AMH** _(briefly lights mullerian / male)_ — AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *Yes — uterus and fallopian tubes form*  → lights the **female** column cell

**Writes outcome cell** `internal` = *Müllerian-derived (uterus, fallopian tubes); no Wolffian structures*

**Wrong-answer consequence notes:**

- **No — Müllerian ducts regress** _(briefly lights blood_testosterone / male)_ — Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — In CAH, the adrenal glands overproduce androgens (no testes are needed). High blood-borne androgens reach genital skin and the brain.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Penis, scrotum*  → lights the **male** column cell

**Writes outcome cell** `external` = *Masculinized — penis-like clitoris, fused labia (clitoromegaly + labial fusion)*

**Wrong-answer consequence notes:**

- **Clitoris, labia** _(briefly lights sexual_behavior / female)_ — Adrenal androgens → DHT in genital skin → external masculinization, even in an XX individual.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH (adrenal androgens reach brain)*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: XY with no testosterone synthesis

**Chromosomes:** XY  
**Diagnosis name:** 17β-HSD3 deficiency (steroidogenesis block — Lindsay to confirm enzyme)

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes |
| internal | Neither Wolffian nor Müllerian structures (no T → no Wolffian; AMH suppresses Müllerian) |
| external | Clitoris, labia |
| brain | Feminized — female-typical behavior; cyclic GnRH (no T → no aromatization → no brain masculinization) |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *No — no local testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone is secreted locally** _(briefly lights wolffian / male)_ — Testosterone synthesis is blocked in this scenario — the testes form but can't make T. Without local T, no Wolffian maintenance.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *No — Wolffian ducts regress*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Wolffian ducts develop** _(briefly lights amh / male)_ — Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *Yes — Sertoli cells secrete AMH*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no AMH** _(briefly lights mullerian / female)_ — AMH is produced by Sertoli cells independently of testosterone synthesis. Testes here still secrete AMH normally, so Müllerian ducts are suppressed.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *No — Müllerian ducts regress*  → lights the **male** column cell

**Writes outcome cell** `internal` = *Neither Wolffian nor Müllerian structures (no T → no Wolffian; AMH suppresses Müllerian)*

**Wrong-answer consequence notes:**

- **Yes — uterus and fallopian tubes form** _(briefly lights blood_testosterone / female)_ — If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *No — no blood-borne testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone circulates to peripheral tissues** _(briefly lights five_alpha_reductase / male)_ — Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *No — 5α-reductase is absent or inactive*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — 5α-reductase converts T to DHT** _(briefly lights external_genitalia / male)_ — 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Clitoris, labia*  → lights the **female** column cell

**Writes outcome cell** `external` = *Clitoris, labia*

**Wrong-answer consequence notes:**

- **Penis, scrotum** _(briefly lights sexual_behavior / male)_ — Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Female-typical (e.g., lordosis in rats)*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Male-typical (e.g., mounting in rats)** _(briefly lights gnrh_pattern / male)_ — Male-typical behavior requires brain masculinization (via aromatization). Without it, the default female-typical pattern emerges.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Cyclic*  → lights the **female** column cell

**Writes outcome cell** `brain` = *Feminized — female-typical behavior; cyclic GnRH (no T → no aromatization → no brain masculinization)*

**Wrong-answer consequence notes:**

- **Tonic** — Tonic GnRH is the male-typical pattern. Without brain masculinization, the cyclic female-typical pattern develops.

---

## Scenario: XX exposed to high androgens at 12 weeks gestation

**Chromosomes:** XX  
**Diagnosis name:** Prenatal androgen exposure (iatrogenic / maternal virilization)

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Ovaries |
| internal | BOTH Wolffian-derived AND Müllerian-derived (high androgens drive Wolffian; no AMH lets Müllerian persist) |
| external | Masculinized — male-like external genitalia |
| brain | Masculinized — male-typical behavior; tonic GnRH (androgens at critical period) |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XX*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **XY** _(briefly lights sry / male)_ — Picking XY would put the path on the male trajectory. But this individual's chromosomes don't trigger male development in this scenario.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *No — SRY is absent or silent*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — SRY is expressed** _(briefly lights gonadal_dev / male)_ — If SRY were expressed, the testis program would run and the pathway would head toward testis. But SRY isn't expressed (or isn't effective) here.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Ovary*  → lights the **female** column cell

**Writes outcome cell** `gonads` = *Ovaries*

**Wrong-answer consequence notes:**

- **Testis** _(briefly lights local_testosterone / male)_ — Testes produce testosterone and AMH, driving male development. But in this scenario testes don't form (or don't function).

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *No — no local testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone is secreted locally** _(briefly lights wolffian / male)_ — Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *Yes — Wolffian ducts develop*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — Wolffian ducts regress** _(briefly lights amh / female)_ — High systemic androgens reaching Wolffian tissue can drive its development, even without local testicular testosterone. AR is functional, so the signal goes through.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *No — no AMH*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Sertoli cells secrete AMH** _(briefly lights mullerian / male)_ — AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *Yes — uterus and fallopian tubes form*  → lights the **female** column cell

**Writes outcome cell** `internal` = *BOTH Wolffian-derived AND Müllerian-derived (high androgens drive Wolffian; no AMH lets Müllerian persist)*

**Wrong-answer consequence notes:**

- **No — Müllerian ducts regress** _(briefly lights blood_testosterone / male)_ — Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Penis, scrotum*  → lights the **male** column cell

**Writes outcome cell** `external` = *Masculinized — male-like external genitalia*

**Wrong-answer consequence notes:**

- **Clitoris, labia** _(briefly lights sexual_behavior / female)_ — Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH (androgens at critical period)*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: XY exposed to high androgens at 12 weeks gestation

**Chromosomes:** XY  
**Diagnosis name:** _(none — Lindsay to confirm or leave unset)_

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes |
| internal | Wolffian-derived; no uterus |
| external | Penis, scrotum |
| brain | Masculinized — male-typical behavior; tonic GnRH |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *Yes — Wolffian ducts develop*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — Wolffian ducts regress** _(briefly lights amh / female)_ — If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *Yes — Sertoli cells secrete AMH*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no AMH** _(briefly lights mullerian / female)_ — Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *No — Müllerian ducts regress*  → lights the **male** column cell

**Writes outcome cell** `internal` = *Wolffian-derived; no uterus*

**Wrong-answer consequence notes:**

- **Yes — uterus and fallopian tubes form** _(briefly lights blood_testosterone / female)_ — If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Penis, scrotum*  → lights the **male** column cell

**Writes outcome cell** `external` = *Penis, scrotum*

**Wrong-answer consequence notes:**

- **Clitoris, labia** _(briefly lights sexual_behavior / female)_ — Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: XY exposed to high estrogens at 12 weeks gestation (fuzzy)

**Chromosomes:** XY  
**Diagnosis name:** Prenatal estrogen exposure (e.g. DES)

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes |
| internal | Wolffian-derived; no uterus |
| external | Penis, scrotum (but Lindsay notes this MAY be partially feminized — open question) |
| brain | Masculinized — male-typical behavior; tonic GnRH (Lindsay notes this MAY be less so — open question) |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *Yes — Wolffian ducts develop*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — Wolffian ducts regress** _(briefly lights amh / female)_ — If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *Yes — Sertoli cells secrete AMH*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no AMH** _(briefly lights mullerian / female)_ — Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *No — Müllerian ducts regress*  → lights the **male** column cell

**Writes outcome cell** `internal` = *Wolffian-derived; no uterus*

**Wrong-answer consequence notes:**

- **Yes — uterus and fallopian tubes form** _(briefly lights blood_testosterone / female)_ — If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Penis, scrotum*  → lights the **male** column cell

**Writes outcome cell** `external` = *Penis, scrotum (but Lindsay notes this MAY be partially feminized — open question)*

**Wrong-answer consequence notes:**

- **Clitoris, labia** _(briefly lights sexual_behavior / female)_ — Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH (Lindsay notes this MAY be less so — open question)*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: XX with translocated SRY

**Chromosomes:** XX  
**Diagnosis name:** 46,XX testicular DSD (de la Chapelle syndrome)

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes |
| internal | Wolffian-derived; no uterus |
| external | Penis, scrotum |
| brain | Masculinized — male-typical behavior; tonic GnRH |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XX*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **XY** _(briefly lights sry / male)_ — Chromosomally this individual is XX — but they carry a translocated SRY gene that triggers male development downstream.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *Yes — Wolffian ducts develop*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — Wolffian ducts regress** _(briefly lights amh / female)_ — If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *Yes — Sertoli cells secrete AMH*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no AMH** _(briefly lights mullerian / female)_ — Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *No — Müllerian ducts regress*  → lights the **male** column cell

**Writes outcome cell** `internal` = *Wolffian-derived; no uterus*

**Wrong-answer consequence notes:**

- **Yes — uterus and fallopian tubes form** _(briefly lights blood_testosterone / female)_ — If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Penis, scrotum*  → lights the **male** column cell

**Writes outcome cell** `external` = *Penis, scrotum*

**Wrong-answer consequence notes:**

- **Clitoris, labia** _(briefly lights sexual_behavior / female)_ — Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: XY with insensitive DHT receptors

**Chromosomes:** XY  
**Diagnosis name:** Partial Androgen Insensitivity Syndrome (PAIS)

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes |
| internal | Wolffian-derived; no uterus |
| external | Clitoris, labia (female-appearing) — DHT can't act |
| brain | Masculinized — male-typical behavior; tonic GnRH |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *Yes — Wolffian ducts develop*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — Wolffian ducts regress** _(briefly lights amh / female)_ — If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *Yes — Sertoli cells secrete AMH*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no AMH** _(briefly lights mullerian / female)_ — Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *No — Müllerian ducts regress*  → lights the **male** column cell

**Writes outcome cell** `internal` = *Wolffian-derived; no uterus*

**Wrong-answer consequence notes:**

- **Yes — uterus and fallopian tubes form** _(briefly lights blood_testosterone / female)_ — If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Clitoris, labia*  → lights the **female** column cell

**Writes outcome cell** `external` = *Clitoris, labia (female-appearing) — DHT can't act*

**Wrong-answer consequence notes:**

- **Penis, scrotum** _(briefly lights sexual_behavior / male)_ — Masculinization of external genitalia specifically requires DHT acting on the AR. With insensitive DHT receptors, externals default to female pattern even though Wolffian (T-driven) developed normally.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: XY with androgen receptors absent

**Chromosomes:** XY  
**Diagnosis name:** Complete Androgen Insensitivity Syndrome (CAIS) — severe form; Lindsay to disambiguate from scenario #2

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes |
| internal | Müllerian-derived (uterus, fallopian tubes) |
| external | Clitoris, labia (female-appearing) |
| brain | Masculinized — male-typical behavior; tonic GnRH (aromatization is intact) |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *No — Wolffian ducts regress*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Wolffian ducts develop** _(briefly lights amh / male)_ — Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *No — no AMH*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Sertoli cells secrete AMH** _(briefly lights mullerian / male)_ — Lindsay's table for this scenario records AMH as absent (which would let Müllerian ducts persist). Biologically, AMH is normally AR-independent — worth a check with Lindsay about whether AR-absent fundamentally differs from AIS here.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *Yes — uterus and fallopian tubes form*  → lights the **female** column cell

**Writes outcome cell** `internal` = *Müllerian-derived (uterus, fallopian tubes)*

**Wrong-answer consequence notes:**

- **No — Müllerian ducts regress** _(briefly lights blood_testosterone / male)_ — Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Clitoris, labia*  → lights the **female** column cell

**Writes outcome cell** `external` = *Clitoris, labia (female-appearing)*

**Wrong-answer consequence notes:**

- **Penis, scrotum** _(briefly lights sexual_behavior / male)_ — Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH (aromatization is intact)*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: XY with one testicle that fails to develop

**Chromosomes:** XY  
**Diagnosis name:** Unilateral testicular dysgenesis

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | One testis (one functional, one absent) |
| internal | Wolffian-derived; no uterus |
| external | Penis, scrotum |
| brain | Masculinized — male-typical behavior; tonic GnRH |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *One testis (one functional, one absent)*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *Yes — Wolffian ducts develop*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — Wolffian ducts regress** _(briefly lights amh / female)_ — If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *Yes — Sertoli cells secrete AMH*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no AMH** _(briefly lights mullerian / female)_ — Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *No — Müllerian ducts regress*  → lights the **male** column cell

**Writes outcome cell** `internal` = *Wolffian-derived; no uterus*

**Wrong-answer consequence notes:**

- **Yes — uterus and fallopian tubes form** _(briefly lights blood_testosterone / female)_ — If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Penis, scrotum*  → lights the **male** column cell

**Writes outcome cell** `external` = *Penis, scrotum*

**Wrong-answer consequence notes:**

- **Clitoris, labia** _(briefly lights sexual_behavior / female)_ — Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: XX with ovaries that fail to develop

**Chromosomes:** XX  
**Diagnosis name:** 46,XX gonadal dysgenesis

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | None — ovaries fail to develop |
| internal | Müllerian-derived (uterus, fallopian tubes) |
| external | Clitoris, labia |
| brain | Feminized — female-typical behavior; cyclic GnRH |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XX*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **XY** _(briefly lights sry / male)_ — Picking XY would put the path on the male trajectory. But this individual's chromosomes don't trigger male development in this scenario.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *No — SRY is absent or silent*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — SRY is expressed** _(briefly lights gonadal_dev / male)_ — If SRY were expressed, the testis program would run and the pathway would head toward testis. But SRY isn't expressed (or isn't effective) here.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Ovary*  → lights the **female** column cell

**Writes outcome cell** `gonads` = *None — ovaries fail to develop*

**Wrong-answer consequence notes:**

- **Testis** _(briefly lights local_testosterone / male)_ — Female fetal development is the default pathway — it doesn't require ovarian hormones. Without ovaries, the rest of the female pathway still runs.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *No — no local testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone is secreted locally** _(briefly lights wolffian / male)_ — Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *No — Wolffian ducts regress*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Wolffian ducts develop** _(briefly lights amh / male)_ — Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *No — no AMH*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Sertoli cells secrete AMH** _(briefly lights mullerian / male)_ — AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *Yes — uterus and fallopian tubes form*  → lights the **female** column cell

**Writes outcome cell** `internal` = *Müllerian-derived (uterus, fallopian tubes)*

**Wrong-answer consequence notes:**

- **No — Müllerian ducts regress** _(briefly lights blood_testosterone / male)_ — Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *No — no blood-borne testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone circulates to peripheral tissues** _(briefly lights five_alpha_reductase / male)_ — Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *No — 5α-reductase is absent or inactive*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — 5α-reductase converts T to DHT** _(briefly lights external_genitalia / male)_ — 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Clitoris, labia*  → lights the **female** column cell

**Writes outcome cell** `external` = *Clitoris, labia*

**Wrong-answer consequence notes:**

- **Penis, scrotum** _(briefly lights sexual_behavior / male)_ — Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Female-typical (e.g., lordosis in rats)*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Male-typical (e.g., mounting in rats)** _(briefly lights gnrh_pattern / male)_ — Male-typical behavior requires brain masculinization (via aromatization). Without it, the default female-typical pattern emerges.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Cyclic*  → lights the **female** column cell

**Writes outcome cell** `brain` = *Feminized — female-typical behavior; cyclic GnRH*

**Wrong-answer consequence notes:**

- **Tonic** — Tonic GnRH is the male-typical pattern. Without brain masculinization, the cyclic female-typical pattern develops.

---

## Scenario: XY with defective aromatase

**Chromosomes:** XY  
**Diagnosis name:** Aromatase deficiency (CYP19A1)

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes |
| internal | Wolffian-derived; no uterus |
| external | Penis, scrotum |
| brain | Feminized — female-typical behavior; cyclic GnRH (aromatization fails, no E2 reaches brain ERs) |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *Yes — Wolffian ducts develop*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — Wolffian ducts regress** _(briefly lights amh / female)_ — If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *Yes — Sertoli cells secrete AMH*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no AMH** _(briefly lights mullerian / female)_ — Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *No — Müllerian ducts regress*  → lights the **male** column cell

**Writes outcome cell** `internal` = *Wolffian-derived; no uterus*

**Wrong-answer consequence notes:**

- **Yes — uterus and fallopian tubes form** _(briefly lights blood_testosterone / female)_ — If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Penis, scrotum*  → lights the **male** column cell

**Writes outcome cell** `external` = *Penis, scrotum*

**Wrong-answer consequence notes:**

- **Clitoris, labia** _(briefly lights sexual_behavior / female)_ — Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Female-typical (e.g., lordosis in rats)*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Male-typical (e.g., mounting in rats)** _(briefly lights gnrh_pattern / male)_ — This is the inverse of AIS: in aromatase deficiency, the body masculinizes normally (AR and DHT work), but the brain CAN'T masculinize because the T→E2 conversion needed inside brain cells fails. Result: male body, female brain.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Cyclic*  → lights the **female** column cell

**Writes outcome cell** `brain` = *Feminized — female-typical behavior; cyclic GnRH (aromatization fails, no E2 reaches brain ERs)*

**Wrong-answer consequence notes:**

- **Tonic** — GnRH pattern follows the same logic. Without aromatization, the hypothalamus doesn't get the estradiol signal needed for masculinization.

---

## Scenario: XX with non-functional maternal α-fetoprotein (AFP)

**Chromosomes:** XX  
**Diagnosis name:** _(none — Lindsay to confirm or leave unset)_

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Ovaries |
| internal | Müllerian-derived (uterus, fallopian tubes) |
| external | Clitoris, labia |
| brain | Masculinized — male-typical behavior; tonic GnRH (maternal E2 reaches brain via failed AFP) |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XX*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **XY** _(briefly lights sry / male)_ — Picking XY would put the path on the male trajectory. But this individual's chromosomes don't trigger male development in this scenario.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *No — SRY is absent or silent*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — SRY is expressed** _(briefly lights gonadal_dev / male)_ — If SRY were expressed, the testis program would run and the pathway would head toward testis. But SRY isn't expressed (or isn't effective) here.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Ovary*  → lights the **female** column cell

**Writes outcome cell** `gonads` = *Ovaries*

**Wrong-answer consequence notes:**

- **Testis** _(briefly lights local_testosterone / male)_ — Testes produce testosterone and AMH, driving male development. But in this scenario testes don't form (or don't function).

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *No — no local testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone is secreted locally** _(briefly lights wolffian / male)_ — Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *No — Wolffian ducts regress*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Wolffian ducts develop** _(briefly lights amh / male)_ — Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *No — no AMH*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Sertoli cells secrete AMH** _(briefly lights mullerian / male)_ — AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *Yes — uterus and fallopian tubes form*  → lights the **female** column cell

**Writes outcome cell** `internal` = *Müllerian-derived (uterus, fallopian tubes)*

**Wrong-answer consequence notes:**

- **No — Müllerian ducts regress** _(briefly lights blood_testosterone / male)_ — Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *No — no blood-borne testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone circulates to peripheral tissues** _(briefly lights five_alpha_reductase / male)_ — Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *No — 5α-reductase is absent or inactive*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — 5α-reductase converts T to DHT** _(briefly lights external_genitalia / male)_ — 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Clitoris, labia*  → lights the **female** column cell

**Writes outcome cell** `external` = *Clitoris, labia*

**Wrong-answer consequence notes:**

- **Penis, scrotum** _(briefly lights sexual_behavior / male)_ — Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Without AFP buffering, maternal estradiol crosses into the fetal brain and acts on estrogen receptors — the same pathway that masculinizes the brain in male fetuses. Result: female body, male brain.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH (maternal E2 reaches brain via failed AFP)*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: XY with non-functional maternal α-fetoprotein (AFP)

**Chromosomes:** XY  
**Diagnosis name:** _(none — Lindsay to confirm or leave unset)_

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Testes |
| internal | Wolffian-derived; no uterus |
| external | Penis, scrotum |
| brain | Masculinized — male-typical behavior; tonic GnRH |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XY*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **XX** _(briefly lights sry / female)_ — Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *Yes — SRY is expressed*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — SRY is absent or silent** _(briefly lights gonadal_dev / female)_ — Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Testis*  → lights the **male** column cell

**Writes outcome cell** `gonads` = *Testes*

**Wrong-answer consequence notes:**

- **Ovary** _(briefly lights local_testosterone / female)_ — Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *Yes — testosterone is secreted locally*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no local testosterone** _(briefly lights wolffian / female)_ — No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *Yes — Wolffian ducts develop*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — Wolffian ducts regress** _(briefly lights amh / female)_ — If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *Yes — Sertoli cells secrete AMH*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no AMH** _(briefly lights mullerian / female)_ — Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *No — Müllerian ducts regress*  → lights the **male** column cell

**Writes outcome cell** `internal` = *Wolffian-derived; no uterus*

**Wrong-answer consequence notes:**

- **Yes — uterus and fallopian tubes form** _(briefly lights blood_testosterone / female)_ — If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *Yes — testosterone circulates to peripheral tissues*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — no blood-borne testosterone** _(briefly lights five_alpha_reductase / female)_ — Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *Yes — 5α-reductase converts T to DHT*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **No — 5α-reductase is absent or inactive** _(briefly lights external_genitalia / female)_ — Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Penis, scrotum*  → lights the **male** column cell

**Writes outcome cell** `external` = *Penis, scrotum*

**Wrong-answer consequence notes:**

- **Clitoris, labia** _(briefly lights sexual_behavior / female)_ — Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Male-typical (e.g., mounting in rats)*  → lights the **male** column cell

**Wrong-answer consequence notes:**

- **Female-typical (e.g., lordosis in rats)** _(briefly lights gnrh_pattern / female)_ — Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Tonic*  → lights the **male** column cell

**Writes outcome cell** `brain` = *Masculinized — male-typical behavior; tonic GnRH*

**Wrong-answer consequence notes:**

- **Cyclic** — A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

---

## Scenario: XX twin in an XX/XY twin pair

**Chromosomes:** XX  
**Diagnosis name:** Freemartin effect (rare in humans)

### Expected outcome table after a perfect walkthrough

| Outcome cell | Final value |
|--------------|-------------|
| gonads | Ovaries |
| internal | Müllerian-derived (uterus, fallopian tubes) |
| external | Clitoris, labia |
| brain | Feminized — female-typical behavior; cyclic GnRH |

### Row-by-row walkthrough

#### Row 1. Chromosomal sex

**Question:** What is the chromosomal sex of this individual?

**Correct answer:** *XX*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **XY** _(briefly lights sry / male)_ — Picking XY would put the path on the male trajectory. But this individual's chromosomes don't trigger male development in this scenario.

#### Row 2. SRY

**Question:** Is the SRY gene present and expressed?

**Correct answer:** *No — SRY is absent or silent*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — SRY is expressed** _(briefly lights gonadal_dev / male)_ — If SRY were expressed, the testis program would run and the pathway would head toward testis. But SRY isn't expressed (or isn't effective) here.

#### Row 3. Gonadal development

**Question:** Which gonad develops?

**Correct answer:** *Ovary*  → lights the **female** column cell

**Writes outcome cell** `gonads` = *Ovaries*

**Wrong-answer consequence notes:**

- **Testis** _(briefly lights local_testosterone / male)_ — Testes produce testosterone and AMH, driving male development. But in this scenario testes don't form (or don't function).

#### Row 4. Local testosterone secreted?

**Question:** Is testosterone secreted locally within the gonad?

**Correct answer:** *No — no local testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone is secreted locally** _(briefly lights wolffian / male)_ — Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

#### Row 5. Wolffian duct development?

**Question:** Do the Wolffian ducts develop into vas deferens, epididymis, and seminal vesicles?

**Correct answer:** *No — Wolffian ducts regress*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Wolffian ducts develop** _(briefly lights amh / male)_ — Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

#### Row 6. Müllerian inhibitory hormone?

**Question:** Is Müllerian Inhibitory Hormone (AMH) secreted by Sertoli cells?

**Correct answer:** *No — no AMH*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — Sertoli cells secrete AMH** _(briefly lights mullerian / male)_ — AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

#### Row 7. Development of uterus and fallopian tubes?

**Question:** Do the Müllerian ducts develop into a uterus and fallopian tubes?

**Correct answer:** *Yes — uterus and fallopian tubes form*  → lights the **female** column cell

**Writes outcome cell** `internal` = *Müllerian-derived (uterus, fallopian tubes)*

**Wrong-answer consequence notes:**

- **No — Müllerian ducts regress** _(briefly lights blood_testosterone / male)_ — Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

#### Row 8. Blood-borne testosterone?

**Question:** Is testosterone circulating in the bloodstream and reaching peripheral target tissues?

**Correct answer:** *No — no blood-borne testosterone*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — testosterone circulates to peripheral tissues** _(briefly lights five_alpha_reductase / male)_ — Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

#### Row 9. 5α-reductase in genital skin?

**Question:** Is 5α-reductase active in the genital skin (converting testosterone to DHT)?

**Correct answer:** *No — 5α-reductase is absent or inactive*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Yes — 5α-reductase converts T to DHT** _(briefly lights external_genitalia / male)_ — 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

#### Row 10. External genitalia

**Question:** What external genitalia develop?

**Correct answer:** *Clitoris, labia*  → lights the **female** column cell

**Writes outcome cell** `external` = *Clitoris, labia*

**Wrong-answer consequence notes:**

- **Penis, scrotum** _(briefly lights sexual_behavior / male)_ — Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

#### Row 11. Sexual behavior

**Question:** What pattern of sexual behavior develops (in rats, as the canonical example)?

**Correct answer:** *Female-typical (e.g., lordosis in rats)*  → lights the **female** column cell

**Wrong-answer consequence notes:**

- **Male-typical (e.g., mounting in rats)** _(briefly lights gnrh_pattern / male)_ — Male-typical behavior requires brain masculinization (via aromatization). Without it, the default female-typical pattern emerges.

#### Row 12. Pattern of GnRH secretion

**Question:** What pattern of GnRH secretion develops in the hypothalamus?

**Correct answer:** *Cyclic*  → lights the **female** column cell

**Writes outcome cell** `brain` = *Feminized — female-typical behavior; cyclic GnRH*

**Wrong-answer consequence notes:**

- **Tonic** — Tonic GnRH is the male-typical pattern. Without brain masculinization, the cyclic female-typical pattern develops.

---

## Confusion frames — end-of-session feedback lenses (Phase 2 draft)

After a student finishes a scenario, the recap surfaces one of these
frames (the highest-priority match for their miss pattern) above the
missed-steps drill-down. The lens text is what students will read —
**please mark any frame that needs revision**. Frame selection is
deterministic; no AI is consulted at runtime.

### Androgen receptor confusion

**id:** `ar_confusion` · **priority:** 30

**Trigger:** `AND( scenario_in [ais, ar_absent] ; all_of [wolffian, external_genitalia] )`

**Lens text:** Wolffian ducts and external genitalia both depend on testosterone acting through a functional androgen receptor. When the receptor is broken (AIS) or absent, those structures don't masculinize even though testes and testosterone are fine. Anything upstream of the receptor (gonads, hormones in blood) is unaffected — the failure is at the tissue level, not the endocrine level.

### Brain via aromatization

**id:** `aromatization_dissociation` · **priority:** 40

**Trigger:** `AND( scenario_in [ais] ; any_of [sexual_behavior, gnrh_pattern] (≥1) )`

**Lens text:** In rats the masculinizing signal in the brain is estradiol — testosterone is aromatized inside neurons and acts on estrogen receptors. So in AIS, where the androgen receptor is non-functional, the body's androgen-dependent tissues don't masculinize, but the brain still does. This is the classic body / brain dissociation.

### 5α-reductase and DHT

**id:** `five_alpha_reductase_pathway` · **priority:** 25

**Trigger:** `AND( scenario_in [five_alpha_reductase_deficiency, dht_insensitive] ; any_of [external_genitalia] (≥1) )`

**Lens text:** External genital masculinization specifically requires DHT, the 5α-reductase product, acting on the androgen receptor in genital skin. Wolffian ducts and the brain are masculinized by testosterone (or its aromatized product) and so are unaffected when 5α-reductase is missing. That's why the body presents female-appearing externally despite testes, testosterone, and a functional AR.

### AMH and duct regression

**id:** `amh_and_ducts` · **priority:** 25

**Trigger:** `AND( scenario_in [amh_absent] ; any_of [amh, mullerian] (≥1) )`

**Lens text:** Müllerian regression is a separate signal from Wolffian development. Sertoli cells secrete AMH, which actively regresses the Müllerian ducts; Leydig cells secrete testosterone, which supports the Wolffian ducts. Without AMH the uterus and fallopian tubes persist even when testosterone is present, which is why an XY individual can end up with both duct systems.

### SRY, not the Y chromosome

**id:** `sry_vs_chromosome` · **priority:** 25

**Trigger:** `AND( scenario_in [xy_missing_sry, xx_with_sry] ; any_of [sry, gonadal_dev] (≥1) )`

**Lens text:** The signal that triggers testis development is the SRY gene, not the Y chromosome as a whole. An XY individual with a non-functional SRY (Swyer) develops along the female pathway from the gonads down. An XX individual carrying a translocated SRY develops testes despite the XX karyotype. Chromosome and gonadal-sex outcome can come apart at this step.

### No testes → no signals

**id:** `no_testes_downstream` · **priority:** 20

**Trigger:** `AND( scenario_in [xy_testes_fail, xy_no_testosterone] ; any_of [wolffian, amh, mullerian, external_genitalia] (≥2) )`

**Lens text:** When the testes fail to form or produce hormones, the whole male-pathway sequence collapses: no testosterone, no AMH, so Wolffian ducts regress, Müllerian ducts persist, and external genitalia default to female. The pathway is permissive — male development is actively driven by gonadal signals, not the default.

### Several steps in this pathway

**id:** `many_misses_general` · **priority:** 1

**Trigger:** `any_of [] (≥0)`

**Lens text:** You missed several rows across the pathway, which suggests the scenario's overall logic — which signal comes from where, and which tissue responds to which signal — is still settling. Replaying with the chart's row-by-row explainers open and the tutorial module's connection-to-previous-row notes is the fastest way to get the spine of it.

---

## Flat dump: every wrong-answer consequence note

For one-pass review of all hand-authored snippets.

### Typical Pathway (XY)

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *No — Wolffian ducts regress:* If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

**Row 6 — Müllerian inhibitory hormone?:**
- *No — no AMH:* Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

**Row 7 — Development of uterus and fallopian tubes?:**
- *Yes — uterus and fallopian tubes form:* If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Clitoris, labia:* Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### Androgen insensitivity syndrome (XY)

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *Yes — Wolffian ducts develop:* Wolffian duct development requires testosterone to act through the androgen receptor. In AIS the receptor is non-functional, so Wolffian ducts regress despite normal testosterone production.

**Row 6 — Müllerian inhibitory hormone?:**
- *No — no AMH:* Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

**Row 7 — Development of uterus and fallopian tubes?:**
- *Yes — uterus and fallopian tubes form:* If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Penis, scrotum:* Masculinization of external genitalia requires DHT acting through a functional AR. In AIS the receptor doesn't respond, so genital skin develops along the default (female-appearing) pathway.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Brain masculinization in rats runs via AROMATIZATION — testosterone is converted to estradiol inside brain cells, which acts on estrogen receptors. AIS individuals have functional aromatase and ERs, so the brain still masculinizes. This is the famous body/brain dissociation.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* GnRH pattern follows the same aromatization logic. Even with broken AR, the hypothalamus develops the tonic male pattern.

### 5α-reductase deficiency (XY)

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *No — Wolffian ducts regress:* If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

**Row 6 — Müllerian inhibitory hormone?:**
- *No — no AMH:* Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

**Row 7 — Development of uterus and fallopian tubes?:**
- *Yes — uterus and fallopian tubes form:* If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *Yes — 5α-reductase converts T to DHT:* 5α-reductase is the enzyme missing in this scenario. Without it, testosterone can't be converted to DHT in genital skin.

**Row 10 — External genitalia:**
- *Penis, scrotum:* External masculinization requires DHT (not testosterone) acting on the AR. Without 5α-reductase, there's no DHT, so externals stay female-default — even though testosterone and the AR are both functional.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### AMH absent (XY)

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *No — Wolffian ducts regress:* If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

**Row 6 — Müllerian inhibitory hormone?:**
- *Yes — Sertoli cells secrete AMH:* AMH is missing in this scenario — that's the perturbation. Without Sertoli AMH, Müllerian ducts won't be suppressed.

**Row 7 — Development of uterus and fallopian tubes?:**
- *No — Müllerian ducts regress:* Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — even alongside functional testes and Wolffian ducts. The result: both duct systems coexist.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Clitoris, labia:* Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### XY with testes that fail to develop

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Testis:* Even with SRY present, the testes fail to develop in this scenario. The chart's female-side cell shows 'Ovary,' but the actual outcome here is no functional gonad at all. Either way, the path defaults onto the female trajectory downstream.

**Row 4 — Local testosterone secreted?:**
- *Yes — testosterone is secreted locally:* Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

**Row 5 — Wolffian duct development?:**
- *Yes — Wolffian ducts develop:* Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

**Row 6 — Müllerian inhibitory hormone?:**
- *Yes — Sertoli cells secrete AMH:* AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

**Row 7 — Development of uterus and fallopian tubes?:**
- *No — Müllerian ducts regress:* Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

**Row 8 — Blood-borne testosterone?:**
- *Yes — testosterone circulates to peripheral tissues:* Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

**Row 9 — 5α-reductase in genital skin?:**
- *Yes — 5α-reductase converts T to DHT:* 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

**Row 10 — External genitalia:**
- *Penis, scrotum:* Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

**Row 11 — Sexual behavior:**
- *Male-typical (e.g., mounting in rats):* Male-typical behavior requires brain masculinization (via aromatization). Without it, the default female-typical pattern emerges.

**Row 12 — Pattern of GnRH secretion:**
- *Tonic:* Tonic GnRH is the male-typical pattern. Without brain masculinization, the cyclic female-typical pattern develops.

### XY with missing SRY

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *Yes — SRY is expressed:* SRY is the perturbation here — the gene is missing or non-functional. Without it, the default ovary pathway runs even though the individual is chromosomally XY.

**Row 3 — Gonadal development:**
- *Testis:* Testes produce testosterone and AMH, driving male development. But in this scenario testes don't form (or don't function).

**Row 4 — Local testosterone secreted?:**
- *Yes — testosterone is secreted locally:* Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

**Row 5 — Wolffian duct development?:**
- *Yes — Wolffian ducts develop:* Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

**Row 6 — Müllerian inhibitory hormone?:**
- *Yes — Sertoli cells secrete AMH:* AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

**Row 7 — Development of uterus and fallopian tubes?:**
- *No — Müllerian ducts regress:* Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

**Row 8 — Blood-borne testosterone?:**
- *Yes — testosterone circulates to peripheral tissues:* Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

**Row 9 — 5α-reductase in genital skin?:**
- *Yes — 5α-reductase converts T to DHT:* 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

**Row 10 — External genitalia:**
- *Penis, scrotum:* Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

**Row 11 — Sexual behavior:**
- *Male-typical (e.g., mounting in rats):* Male-typical behavior requires brain masculinization (via aromatization). Without it, the default female-typical pattern emerges.

**Row 12 — Pattern of GnRH secretion:**
- *Tonic:* Tonic GnRH is the male-typical pattern. Without brain masculinization, the cyclic female-typical pattern develops.

### XX with congenital adrenal hyperplasia (CAH)

**Row 1 — Chromosomal sex:**
- *XY:* Picking XY would put the path on the male trajectory. But this individual's chromosomes don't trigger male development in this scenario.

**Row 2 — SRY:**
- *Yes — SRY is expressed:* If SRY were expressed, the testis program would run and the pathway would head toward testis. But SRY isn't expressed (or isn't effective) here.

**Row 3 — Gonadal development:**
- *Testis:* Testes produce testosterone and AMH, driving male development. But in this scenario testes don't form (or don't function).

**Row 4 — Local testosterone secreted?:**
- *Yes — testosterone is secreted locally:* Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

**Row 5 — Wolffian duct development?:**
- *Yes — Wolffian ducts develop:* Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

**Row 6 — Müllerian inhibitory hormone?:**
- *Yes — Sertoli cells secrete AMH:* AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

**Row 7 — Development of uterus and fallopian tubes?:**
- *No — Müllerian ducts regress:* Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* In CAH, the adrenal glands overproduce androgens (no testes are needed). High blood-borne androgens reach genital skin and the brain.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Clitoris, labia:* Adrenal androgens → DHT in genital skin → external masculinization, even in an XX individual.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### XY with no testosterone synthesis

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *Yes — testosterone is secreted locally:* Testosterone synthesis is blocked in this scenario — the testes form but can't make T. Without local T, no Wolffian maintenance.

**Row 5 — Wolffian duct development?:**
- *Yes — Wolffian ducts develop:* Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

**Row 6 — Müllerian inhibitory hormone?:**
- *No — no AMH:* AMH is produced by Sertoli cells independently of testosterone synthesis. Testes here still secrete AMH normally, so Müllerian ducts are suppressed.

**Row 7 — Development of uterus and fallopian tubes?:**
- *Yes — uterus and fallopian tubes form:* If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

**Row 8 — Blood-borne testosterone?:**
- *Yes — testosterone circulates to peripheral tissues:* Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

**Row 9 — 5α-reductase in genital skin?:**
- *Yes — 5α-reductase converts T to DHT:* 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

**Row 10 — External genitalia:**
- *Penis, scrotum:* Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

**Row 11 — Sexual behavior:**
- *Male-typical (e.g., mounting in rats):* Male-typical behavior requires brain masculinization (via aromatization). Without it, the default female-typical pattern emerges.

**Row 12 — Pattern of GnRH secretion:**
- *Tonic:* Tonic GnRH is the male-typical pattern. Without brain masculinization, the cyclic female-typical pattern develops.

### XX exposed to high androgens at 12 weeks gestation

**Row 1 — Chromosomal sex:**
- *XY:* Picking XY would put the path on the male trajectory. But this individual's chromosomes don't trigger male development in this scenario.

**Row 2 — SRY:**
- *Yes — SRY is expressed:* If SRY were expressed, the testis program would run and the pathway would head toward testis. But SRY isn't expressed (or isn't effective) here.

**Row 3 — Gonadal development:**
- *Testis:* Testes produce testosterone and AMH, driving male development. But in this scenario testes don't form (or don't function).

**Row 4 — Local testosterone secreted?:**
- *Yes — testosterone is secreted locally:* Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

**Row 5 — Wolffian duct development?:**
- *No — Wolffian ducts regress:* High systemic androgens reaching Wolffian tissue can drive its development, even without local testicular testosterone. AR is functional, so the signal goes through.

**Row 6 — Müllerian inhibitory hormone?:**
- *Yes — Sertoli cells secrete AMH:* AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

**Row 7 — Development of uterus and fallopian tubes?:**
- *No — Müllerian ducts regress:* Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Clitoris, labia:* Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### XY exposed to high androgens at 12 weeks gestation

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *No — Wolffian ducts regress:* If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

**Row 6 — Müllerian inhibitory hormone?:**
- *No — no AMH:* Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

**Row 7 — Development of uterus and fallopian tubes?:**
- *Yes — uterus and fallopian tubes form:* If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Clitoris, labia:* Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### XY exposed to high estrogens at 12 weeks gestation (fuzzy)

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *No — Wolffian ducts regress:* If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

**Row 6 — Müllerian inhibitory hormone?:**
- *No — no AMH:* Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

**Row 7 — Development of uterus and fallopian tubes?:**
- *Yes — uterus and fallopian tubes form:* If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Clitoris, labia:* Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### XX with translocated SRY

**Row 1 — Chromosomal sex:**
- *XY:* Chromosomally this individual is XX — but they carry a translocated SRY gene that triggers male development downstream.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *No — Wolffian ducts regress:* If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

**Row 6 — Müllerian inhibitory hormone?:**
- *No — no AMH:* Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

**Row 7 — Development of uterus and fallopian tubes?:**
- *Yes — uterus and fallopian tubes form:* If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Clitoris, labia:* Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### XY with insensitive DHT receptors

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *No — Wolffian ducts regress:* If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

**Row 6 — Müllerian inhibitory hormone?:**
- *No — no AMH:* Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

**Row 7 — Development of uterus and fallopian tubes?:**
- *Yes — uterus and fallopian tubes form:* If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Penis, scrotum:* Masculinization of external genitalia specifically requires DHT acting on the AR. With insensitive DHT receptors, externals default to female pattern even though Wolffian (T-driven) developed normally.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### XY with androgen receptors absent

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *Yes — Wolffian ducts develop:* Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

**Row 6 — Müllerian inhibitory hormone?:**
- *Yes — Sertoli cells secrete AMH:* Lindsay's table for this scenario records AMH as absent (which would let Müllerian ducts persist). Biologically, AMH is normally AR-independent — worth a check with Lindsay about whether AR-absent fundamentally differs from AIS here.

**Row 7 — Development of uterus and fallopian tubes?:**
- *No — Müllerian ducts regress:* Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Penis, scrotum:* Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### XY with one testicle that fails to develop

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *No — Wolffian ducts regress:* If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

**Row 6 — Müllerian inhibitory hormone?:**
- *No — no AMH:* Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

**Row 7 — Development of uterus and fallopian tubes?:**
- *Yes — uterus and fallopian tubes form:* If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Clitoris, labia:* Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### XX with ovaries that fail to develop

**Row 1 — Chromosomal sex:**
- *XY:* Picking XY would put the path on the male trajectory. But this individual's chromosomes don't trigger male development in this scenario.

**Row 2 — SRY:**
- *Yes — SRY is expressed:* If SRY were expressed, the testis program would run and the pathway would head toward testis. But SRY isn't expressed (or isn't effective) here.

**Row 3 — Gonadal development:**
- *Testis:* Female fetal development is the default pathway — it doesn't require ovarian hormones. Without ovaries, the rest of the female pathway still runs.

**Row 4 — Local testosterone secreted?:**
- *Yes — testosterone is secreted locally:* Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

**Row 5 — Wolffian duct development?:**
- *Yes — Wolffian ducts develop:* Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

**Row 6 — Müllerian inhibitory hormone?:**
- *Yes — Sertoli cells secrete AMH:* AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

**Row 7 — Development of uterus and fallopian tubes?:**
- *No — Müllerian ducts regress:* Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

**Row 8 — Blood-borne testosterone?:**
- *Yes — testosterone circulates to peripheral tissues:* Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

**Row 9 — 5α-reductase in genital skin?:**
- *Yes — 5α-reductase converts T to DHT:* 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

**Row 10 — External genitalia:**
- *Penis, scrotum:* Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

**Row 11 — Sexual behavior:**
- *Male-typical (e.g., mounting in rats):* Male-typical behavior requires brain masculinization (via aromatization). Without it, the default female-typical pattern emerges.

**Row 12 — Pattern of GnRH secretion:**
- *Tonic:* Tonic GnRH is the male-typical pattern. Without brain masculinization, the cyclic female-typical pattern develops.

### XY with defective aromatase

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *No — Wolffian ducts regress:* If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

**Row 6 — Müllerian inhibitory hormone?:**
- *No — no AMH:* Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

**Row 7 — Development of uterus and fallopian tubes?:**
- *Yes — uterus and fallopian tubes form:* If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Clitoris, labia:* Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

**Row 11 — Sexual behavior:**
- *Male-typical (e.g., mounting in rats):* This is the inverse of AIS: in aromatase deficiency, the body masculinizes normally (AR and DHT work), but the brain CAN'T masculinize because the T→E2 conversion needed inside brain cells fails. Result: male body, female brain.

**Row 12 — Pattern of GnRH secretion:**
- *Tonic:* GnRH pattern follows the same logic. Without aromatization, the hypothalamus doesn't get the estradiol signal needed for masculinization.

### XX with non-functional maternal α-fetoprotein (AFP)

**Row 1 — Chromosomal sex:**
- *XY:* Picking XY would put the path on the male trajectory. But this individual's chromosomes don't trigger male development in this scenario.

**Row 2 — SRY:**
- *Yes — SRY is expressed:* If SRY were expressed, the testis program would run and the pathway would head toward testis. But SRY isn't expressed (or isn't effective) here.

**Row 3 — Gonadal development:**
- *Testis:* Testes produce testosterone and AMH, driving male development. But in this scenario testes don't form (or don't function).

**Row 4 — Local testosterone secreted?:**
- *Yes — testosterone is secreted locally:* Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

**Row 5 — Wolffian duct development?:**
- *Yes — Wolffian ducts develop:* Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

**Row 6 — Müllerian inhibitory hormone?:**
- *Yes — Sertoli cells secrete AMH:* AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

**Row 7 — Development of uterus and fallopian tubes?:**
- *No — Müllerian ducts regress:* Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

**Row 8 — Blood-borne testosterone?:**
- *Yes — testosterone circulates to peripheral tissues:* Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

**Row 9 — 5α-reductase in genital skin?:**
- *Yes — 5α-reductase converts T to DHT:* 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

**Row 10 — External genitalia:**
- *Penis, scrotum:* Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Without AFP buffering, maternal estradiol crosses into the fetal brain and acts on estrogen receptors — the same pathway that masculinizes the brain in male fetuses. Result: female body, male brain.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### XY with non-functional maternal α-fetoprotein (AFP)

**Row 1 — Chromosomal sex:**
- *XX:* Picking XX would steer the path toward ovary development. But this individual is chromosomally XY — start with that.

**Row 2 — SRY:**
- *No — SRY is absent or silent:* Without SRY, the pathway defaults to ovary/female development. But in this scenario SRY is expressed.

**Row 3 — Gonadal development:**
- *Ovary:* Without testes there are no testicular hormones to drive male development. But in this scenario testes form.

**Row 4 — Local testosterone secreted?:**
- *No — no local testosterone:* No local testosterone would mean the Wolffian ducts can't be maintained. But testes here produce testosterone locally.

**Row 5 — Wolffian duct development?:**
- *No — Wolffian ducts regress:* If Wolffian ducts regress, the male internal duct system never forms. But here testosterone AND a functional androgen receptor are both present.

**Row 6 — Müllerian inhibitory hormone?:**
- *No — no AMH:* Without AMH from Sertoli cells, Müllerian ducts persist — uterus would form. But Sertoli cells in functional testes do secrete AMH.

**Row 7 — Development of uterus and fallopian tubes?:**
- *Yes — uterus and fallopian tubes form:* If Müllerian ducts persisted, the individual would have a uterus and fallopian tubes. But AMH from testes suppresses them in this scenario.

**Row 8 — Blood-borne testosterone?:**
- *No — no blood-borne testosterone:* Without blood-borne testosterone, peripheral tissues (genital skin, brain) don't get the masculinization signal. But testes release T into circulation here.

**Row 9 — 5α-reductase in genital skin?:**
- *No — 5α-reductase is absent or inactive:* Without 5α-reductase, testosterone can't be converted to DHT in genital skin, and external genitalia default to female. But the enzyme IS active here.

**Row 10 — External genitalia:**
- *Clitoris, labia:* Female-appearing externals would mean no DHT action on a functional androgen receptor. But both are present in this scenario.

**Row 11 — Sexual behavior:**
- *Female-typical (e.g., lordosis in rats):* Female-typical behavior would mean no brain masculinization. But aromatization is occurring in this scenario, so the brain is being masculinized.

**Row 12 — Pattern of GnRH secretion:**
- *Cyclic:* A cyclic GnRH pattern is female-typical. With brain masculinization (via aromatization), the tonic male pattern develops.

### XX twin in an XX/XY twin pair

**Row 1 — Chromosomal sex:**
- *XY:* Picking XY would put the path on the male trajectory. But this individual's chromosomes don't trigger male development in this scenario.

**Row 2 — SRY:**
- *Yes — SRY is expressed:* If SRY were expressed, the testis program would run and the pathway would head toward testis. But SRY isn't expressed (or isn't effective) here.

**Row 3 — Gonadal development:**
- *Testis:* Testes produce testosterone and AMH, driving male development. But in this scenario testes don't form (or don't function).

**Row 4 — Local testosterone secreted?:**
- *Yes — testosterone is secreted locally:* Local testosterone drives Wolffian development. But here, no functional testosterone signal reaches the Wolffian ducts.

**Row 5 — Wolffian duct development?:**
- *Yes — Wolffian ducts develop:* Wolffian development gives vas deferens, epididymis, seminal vesicles. But here the testosterone-AR signal fails, so they regress.

**Row 6 — Müllerian inhibitory hormone?:**
- *Yes — Sertoli cells secrete AMH:* AMH from Sertoli cells suppresses Müllerian ducts. But in this scenario there's no functional AMH signal.

**Row 7 — Development of uterus and fallopian tubes?:**
- *No — Müllerian ducts regress:* Without AMH suppression, Müllerian ducts develop into uterus and fallopian tubes — and that's what happens here.

**Row 8 — Blood-borne testosterone?:**
- *Yes — testosterone circulates to peripheral tissues:* Blood-borne testosterone masculinizes peripheral tissues. But here it's effectively absent.

**Row 9 — 5α-reductase in genital skin?:**
- *Yes — 5α-reductase converts T to DHT:* 5α-reductase makes DHT for external masculinization. But here it's missing or has no testosterone substrate.

**Row 10 — External genitalia:**
- *Penis, scrotum:* Penis and scrotum form when DHT acts on a functional AR. Neither condition is met here, so externals default to clitoris/labia.

**Row 11 — Sexual behavior:**
- *Male-typical (e.g., mounting in rats):* Male-typical behavior requires brain masculinization (via aromatization). Without it, the default female-typical pattern emerges.

**Row 12 — Pattern of GnRH secretion:**
- *Tonic:* Tonic GnRH is the male-typical pattern. Without brain masculinization, the cyclic female-typical pattern develops.
