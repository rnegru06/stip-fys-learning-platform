# AI-generated illustration prompts

Every PNG in this directory is generated externally and reviewed by Lindsay
before commit. Wrong anatomy in a teaching tool is worse than no anatomy.

## Style — uniform across all assets

> Pen-and-ink scientific illustration of [subject], black on cream paper,
> fine hatching for shading, textbook style à la Gray's Anatomy or a 1950s
> histology atlas. No labels, no text. Square crop, neutral background.

Same model + style across every asset. Mixed styles read as collage.

## File naming

`{rowId}_{pathway}.png` — e.g. `gonadal_dev_male.png`, `wolffian_female.png`.

The UI looks up `{rowId}_{pickedPathway}.png` and falls back to no image
when absent. Adding an image is non-breaking; removing one is too.

## Output size

512×512 PNG, monochrome (or near-monochrome), with ~10% margin around the
subject so it crops cleanly at 80×80 in the UI.

## Per-row prompts

### chromosomal_sex
- `chromosomal_sex_female.png` — Paired XX chromosomes under microscope,
  both with clear centromeres, in pen-and-ink illustration style.
- `chromosomal_sex_male.png` — Paired XY chromosomes (X full size, Y short),
  both with clear centromeres, in pen-and-ink illustration style.

### gonadal_dev
- `gonadal_dev_female.png` — Cross-section of mammalian ovary showing
  follicles at different stages, in pen-and-ink illustration style.
- `gonadal_dev_male.png` — Cross-section of mammalian testis showing
  seminiferous tubules, in pen-and-ink illustration style.

### wolffian
- `wolffian_male.png` — Wolffian (mesonephric) duct epithelium and the
  derived vas deferens / epididymis structure, pen-and-ink illustration.
- `wolffian_female.png` — Same anatomical region with the Wolffian duct
  regressing into a thin remnant, pen-and-ink illustration.

### mullerian
- `mullerian_female.png` — Müllerian duct converging into early uterus,
  fallopian tubes, and upper vagina, pen-and-ink illustration.
- `mullerian_male.png` — Same region with Müllerian duct regressing
  (vestigial appendix testis remnant), pen-and-ink illustration.

### external_genitalia
- `external_genitalia_female.png` — Indifferent genital tubercle
  differentiating into clitoris and labia, pen-and-ink illustration.
- `external_genitalia_male.png` — Indifferent genital tubercle
  differentiating into penis and scrotum, pen-and-ink illustration.

### sexual_behavior
- `sexual_behavior_male.png` — Sagittal hypothalamus/POA region with
  arrow indicating masculinizing effect, pen-and-ink illustration.
- `sexual_behavior_female.png` — Same region without the masculinizing
  arrow (default-female), pen-and-ink illustration.

### gnrh_pattern
- `gnrh_pattern_female.png` — Cyclical/surge GnRH pulse-pattern graph,
  scientific-illustration style.
- `gnrh_pattern_male.png` — Tonic GnRH pulse-pattern graph,
  scientific-illustration style.

## Generation metadata

Record per-image: model, prompt, seed, date, reviewer. Format:

```
gonadal_dev_male.png
  model: <e.g., dall-e-3, midjourney-v6, ...>
  prompt: <verbatim prompt used>
  seed: <if applicable>
  generated: YYYY-MM-DD
  reviewed by: <name>, YYYY-MM-DD
```

(Append entries below as images land.)

---
