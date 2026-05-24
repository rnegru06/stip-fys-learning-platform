import { useEffect, useState } from "react";
import { RowGlyph } from "./RowGlyph";

interface ExplainerCalloutProps {
  rowId: string;
  rowLabel: string;
  pickedLabel: string;
  pickedPathway?: "female" | "male";
  explainer: string;
  onContinue(): void;
  isFinalRow?: boolean;
}

// Vite glob — eagerly enumerates every PNG dropped into src/assets/generated/.
// The map is keyed by absolute import path; we transform keys to the bare
// "{rowId}_{pathway}" stem so lookups are direct.
const GENERATED_IMAGES = (() => {
  const mod = import.meta.glob("../assets/generated/*.png", {
    eager: true,
    import: "default",
  }) as Record<string, string>;
  const out: Record<string, string> = {};
  for (const [path, url] of Object.entries(mod)) {
    const stem = path.split("/").pop()?.replace(/\.png$/, "");
    if (stem) out[stem] = url;
  }
  return out;
})();

function findGeneratedImage(rowId: string, pathway: "female" | "male"): string | null {
  return GENERATED_IMAGES[`${rowId}_${pathway}`] ?? null;
}

export function ExplainerCallout({
  rowId,
  rowLabel,
  pickedLabel,
  pickedPathway,
  explainer,
  onContinue,
  isFinalRow,
}: ExplainerCalloutProps) {
  const pathway = pickedPathway ?? "male";
  const generatedSrc = findGeneratedImage(rowId, pathway);

  // Reveal the image after a tiny delay so it doesn't fight the panel's entry.
  const [imageReady, setImageReady] = useState(false);
  useEffect(() => {
    if (!generatedSrc) return;
    const t = window.setTimeout(() => setImageReady(true), 80);
    return () => window.clearTimeout(t);
  }, [generatedSrc]);

  return (
    <section className="relative bg-amber-surface border border-amber-border rounded-xl p-[20px] pl-[22px] pr-[22px] pb-[22px] flex flex-col gap-3.5 overflow-hidden">
      <span aria-hidden className="absolute left-0 top-0 bottom-0 w-1 bg-amber" />

      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-2">
        ✓ Correct · {rowLabel.replace(/\n/g, " ")}
      </span>

      <p className="m-0 font-serif text-sm italic text-ink-2 leading-snug">
        you picked <strong className="not-italic font-normal text-ink">{pickedLabel}</strong>
      </p>

      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-2 shrink-0">
          <RowGlyph rowId={rowId} pathway={pathway} size={96} />
          {generatedSrc && (
            <figure
              className={
                "m-0 flex flex-col gap-1 transition-opacity duration-300 " +
                (imageReady ? "opacity-100" : "opacity-0")
              }
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden border border-rule bg-paper grid place-items-center">
                <img
                  src={generatedSrc}
                  alt={`${rowLabel.replace(/\n/g, " ")} — illustrative reference`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="font-mono text-[8.5px] text-ink-3 italic tracking-[0.04em] leading-tight">
                illustrative — not a real specimen
              </figcaption>
            </figure>
          )}
        </div>
        <p className="m-0 font-serif text-base leading-relaxed text-ink text-pretty flex-1">
          {explainer}
        </p>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="self-start mt-1 px-[18px] py-2.5 bg-ink text-paper rounded-lg text-[13px] font-medium inline-flex items-center gap-2 hover:bg-ink-2 transition-colors"
      >
        {isFinalRow ? "See recap" : "Next step"}
        <span aria-hidden className="font-mono text-[14px]">→</span>
      </button>
    </section>
  );
}
