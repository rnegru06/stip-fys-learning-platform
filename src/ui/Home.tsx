import { useState } from "react";

interface HomeProps {
  onPickTutorial(): void;
  onPickPractice(): void;
  onPickModule3(): void;
  practiceCount: number;
  completedEasyCount: number;
  completedHardCount: number;
  module3Unlocked: boolean;
  module3LockReason: string;
  module3PasswordUnlocked: boolean;
  onSubmitModule3Password(password: string): boolean;
}

export function Home({
  onPickTutorial,
  onPickPractice,
  onPickModule3,
  practiceCount,
  completedEasyCount,
  completedHardCount,
  module3Unlocked,
  module3LockReason,
  module3PasswordUnlocked,
  onSubmitModule3Password,
}: HomeProps) {
  const hasCompletedAny = completedEasyCount + completedHardCount > 0;
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = onSubmitModule3Password(passwordInput);
    if (!ok) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setPasswordInput("");
    }
  };
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-end justify-between px-10 pt-10 pb-6 border-b border-rule">
        <div>
          <span className="eyebrow">Home</span>
          <h1 className="display text-[34px] font-medium m-0 mt-1.5 tracking-[-0.014em] leading-[1.1]">
            Pick where to start.
          </h1>
          <p className="font-serif italic text-[14px] text-ink-3 m-0 mt-2">
            Sex in the Brain: the Neuroscience of Hormones, Sex, and Gender
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 grid place-items-center border-[1.5px] border-ink rounded-md font-mono font-semibold text-[13px] text-ink">
            §
          </div>
          <span className="eyebrow">BIO · FYS · SEX IN THE BRAIN</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-10 py-10 overflow-y-auto">
        <div className="grid grid-cols-3 gap-5 w-full max-w-[1200px]">
          {/* Tutorial card */}
          <button
            type="button"
            onClick={onPickTutorial}
            className={
              "group text-left bg-paper border-[1.5px] border-rule-2 hover:border-ink " +
              "rounded-2xl px-7 pt-7 pb-8 flex flex-col gap-5 transition-colors duration-100 " +
              "shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_28px_-20px_rgba(0,0,0,0.18)]"
            }
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow">Module 1</span>
              {!hasCompletedAny && (
                <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-amber-2">
                  ★ Recommended first
                </span>
              )}
            </div>
            <h2 className="display text-[22px] font-medium m-0 leading-[1.15] tracking-[-0.01em] text-balance">
              Tutorial<span className="italic text-ink-2"> — walk the chart, row by row.</span>
            </h2>
            <p className="font-serif text-[14px] leading-[1.5] text-ink-2 m-0 text-pretty">
              Per-row lessons that break down what each question is asking,
              what each answer means, and how the rows link together.
            </p>
            <div className="flex items-center justify-between mt-1">
              <span className="font-serif italic text-xs text-ink-3">
                ~15 minutes
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-paper rounded-lg text-[13px] font-medium group-hover:bg-ink-2 transition-colors">
                Start
                <span aria-hidden className="font-mono text-[14px]">→</span>
              </span>
            </div>
          </button>

          {/* Practice card */}
          <button
            type="button"
            onClick={onPickPractice}
            className={
              "group text-left bg-paper border-[1.5px] border-rule-2 hover:border-ink " +
              "rounded-2xl px-7 pt-7 pb-8 flex flex-col gap-5 transition-colors duration-100 " +
              "shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_28px_-20px_rgba(0,0,0,0.18)]"
            }
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow">Module 2</span>
              <span className="font-mono text-[10px] text-ink-3 tracking-wider flex flex-col items-end gap-0.5">
                <span>Easy {completedEasyCount} / {practiceCount}</span>
                <span>Hard {completedHardCount} / {practiceCount}</span>
              </span>
            </div>
            <h2 className="display text-[22px] font-medium m-0 leading-[1.15] tracking-[-0.01em] text-balance">
              Practice<span className="italic text-ink-2"> — perturb the pathway.</span>
            </h2>
            <p className="font-serif text-[14px] leading-[1.5] text-ink-2 m-0 text-pretty">
              20 scenarios drawn from Lindsay's table. Each is a quiz that
              walks you through the chart for a specific perturbation. Easy
              mode keeps the flowchart visible; hard mode blurs it.
            </p>
            <div className="flex items-center justify-between mt-1">
              <span className="font-serif italic text-xs text-ink-3">
                ~6–8 min / scenario
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-paper rounded-lg text-[13px] font-medium group-hover:bg-ink-2 transition-colors">
                Pick a scenario
                <span aria-hidden className="font-mono text-[14px]">→</span>
              </span>
            </div>
          </button>

          {/* Module 3 card — locked until prerequisite completion OR password override */}
          <div
            className={
              "group text-left rounded-2xl px-7 pt-7 pb-8 flex flex-col gap-5 transition-colors duration-100 " +
              "shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_28px_-20px_rgba(0,0,0,0.18)] " +
              (module3Unlocked
                ? "bg-paper border-[1.5px] border-rule-2 hover:border-ink"
                : "bg-paper-2 border-[1.5px] border-rule-2")
            }
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow">Module 3</span>
              {!module3Unlocked && (
                <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">
                  🔒 Locked
                </span>
              )}
              {module3Unlocked && (
                <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-amber-2">
                  {module3PasswordUnlocked ? "★ Unlocked by code" : "★ Unlocked"}
                </span>
              )}
            </div>
            <h2 className="display text-[22px] font-medium m-0 leading-[1.15] tracking-[-0.01em] text-balance">
              Quiz simulation<span className="italic text-ink-2"> — class-style assessment.</span>
            </h2>
            <p className="font-serif text-[14px] leading-[1.5] text-ink-2 m-0 text-pretty">
              {module3Unlocked
                ? "Four random scenarios. For each, pick the four outcome-table cells (gonads, internal, external, brain) from multiple choice."
                : module3LockReason}
            </p>

            {!module3Unlocked && (
              <form
                onSubmit={handleSubmitPassword}
                className="flex flex-col gap-1.5"
              >
                <label className="eyebrow text-[9.5px]">
                  Have an unlock code?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (passwordError) setPasswordError(false);
                    }}
                    placeholder="Enter code"
                    className={
                      "flex-1 px-3 py-1.5 rounded-md border text-[13px] font-mono bg-paper " +
                      (passwordError
                        ? "border-brick text-brick-2"
                        : "border-rule-2 text-ink focus:outline-none focus:border-ink")
                    }
                    aria-invalid={passwordError}
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-ink text-paper rounded-md text-[12px] font-medium hover:bg-ink-2 transition-colors"
                  >
                    Unlock
                  </button>
                </div>
                {passwordError && (
                  <span className="font-mono text-[10.5px] text-brick-2">
                    Wrong code.
                  </span>
                )}
              </form>
            )}

            <div className="flex items-center justify-between mt-auto">
              <span className="font-serif italic text-xs text-ink-3">
                ~5 minutes
              </span>
              <button
                type="button"
                onClick={module3Unlocked ? onPickModule3 : undefined}
                disabled={!module3Unlocked}
                className={
                  "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors " +
                  (module3Unlocked
                    ? "bg-ink text-paper hover:bg-ink-2 cursor-pointer"
                    : "bg-rule-2 text-ink-3 cursor-not-allowed")
                }
              >
                {module3Unlocked ? "Start quiz" : "Locked"}
                <span aria-hidden className="font-mono text-[14px]">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
