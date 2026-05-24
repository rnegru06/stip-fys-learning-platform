import { ConsequenceDiagram } from "./ConsequenceDiagram";

interface ConsequenceCalloutProps {
  rowId: string;
  pickedLabel: string;
  note: string;
  onBackUp(): void;
}

export function ConsequenceCallout({ rowId, pickedLabel, note, onBackUp }: ConsequenceCalloutProps) {
  return (
    <section className="relative bg-brick-surface border border-brick-border rounded-xl p-[20px] pl-[22px] pr-[22px] pb-[22px] flex flex-col gap-3.5 overflow-hidden">
      <span aria-hidden className="absolute left-0 top-0 bottom-0 w-1 bg-brick" />

      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brick-2">
        ✕ Wrong walk · this is what would happen
      </span>

      <p className="m-0 font-serif text-sm italic text-ink-2 leading-snug">
        you picked <strong className="not-italic font-normal text-ink">{pickedLabel}</strong>
      </p>

      <ConsequenceDiagram rowId={rowId} />

      <p className="m-0 font-serif text-base leading-relaxed text-ink text-pretty">
        {note}
      </p>

      <button
        type="button"
        onClick={onBackUp}
        className="self-start mt-1 px-[18px] py-2.5 bg-ink text-paper rounded-lg text-[13px] font-medium inline-flex items-center gap-2 hover:bg-ink-2 transition-colors"
      >
        <span aria-hidden className="font-mono text-[14px]">←</span>
        Back up and retry
      </button>
    </section>
  );
}
