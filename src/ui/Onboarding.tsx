interface OnboardingProps {
  onContinue(): void;
}

export function Onboarding({ onContinue }: OnboardingProps) {
  return (
    <div className="relative w-[620px] bg-paper border border-rule rounded-2xl px-12 pt-11 pb-10 flex flex-col gap-[22px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_12px_40px_-20px_rgba(0,0,0,0.18)]">
      <div className="flex items-center gap-2.5">
        <img src="/logo-mark.svg" alt="Digital Flowchart" className="w-8 h-8" />
        <span className="eyebrow">BIO · FYS · SEX IN THE BRAIN</span>
      </div>

      <h1 className="display text-[38px] font-medium m-0 leading-[1.1] tracking-[-0.018em]">
        Walk the chart,<br />
        <span className="italic text-ink-2">step by step.</span>
      </h1>

      <p className="font-serif italic text-[14px] leading-[1.4] text-ink-3 m-0 -mt-1">
        The Neuroscience of Hormones, Sex, and Gender
      </p>

      <p className="font-serif text-[17px] leading-[1.5] text-ink-2 m-0 text-pretty">
        You'll work through 12 questions per scenario, building the
        sex-differentiation flowchart one cell at a time. Correct answers light
        the path. Wrong answers walk one step down the wrong branch — so you
        can see what would happen — before you back up.
      </p>

      <div className="flex items-start gap-3 px-4 py-3.5 bg-paper-2 border border-rule rounded-[10px]">
        <span className="font-mono text-[11px] font-semibold text-amber-2 tracking-[0.08em] mt-0.5">
          NOTE
        </span>
        <p className="m-0 text-[13.5px] text-ink-2 leading-[1.5]">
          <strong className="text-ink font-semibold">Recognition ≠ recall.</strong>{" "}
          Looking at the chart and going "yes that one" feels like knowing —
          but it isn't. Commit to an answer first; then the cell lights up.
        </p>
      </div>

      <div className="flex items-center gap-4 mt-1">
        <button
          type="button"
          onClick={onContinue}
          className="px-[22px] py-3 bg-ink text-paper rounded-lg text-sm font-medium inline-flex items-center gap-2 hover:bg-ink-2 transition-colors"
        >
          Start
          <span aria-hidden className="font-mono text-[14px]">→</span>
        </button>
        <span className="font-serif italic text-xs text-ink-3">
          ~6–8 minutes per scenario · 20 scenarios in the set
        </span>
      </div>
    </div>
  );
}
