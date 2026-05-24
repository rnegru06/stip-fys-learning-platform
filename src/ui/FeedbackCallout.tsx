import type { FeedbackViewModel } from "./types";

export function FeedbackCallout({
  introLine,
  frameTitle,
  frameLensText,
}: FeedbackViewModel) {
  return (
    <section className="relative shrink-0 bg-amber-surface border-2 border-amber-border rounded-[10px] px-4 py-3.5 flex flex-col gap-2.5">
      <span aria-hidden className="absolute left-0 top-0 bottom-0 w-1 bg-amber" />
      <div className="flex items-baseline justify-between gap-3">
        <span className="eyebrow text-amber-2">
          AI Feedback <span className="text-ink-3 normal-case tracking-normal font-normal italic">(based on your answering patterns)</span>
        </span>
      </div>
      <p className="m-0 font-serif text-[13.5px] font-medium text-ink leading-snug">
        {introLine}
      </p>
      <div className="flex flex-col gap-1.5">
        <span className="font-serif text-[14px] font-semibold text-ink leading-tight">
          {frameTitle}
        </span>
        <p className="m-0 font-serif text-[13.5px] leading-[1.55] text-ink-2 text-pretty">
          {frameLensText}
        </p>
      </div>
    </section>
  );
}
