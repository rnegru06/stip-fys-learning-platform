interface ScoreBarProps {
  score: number;
  streak: number;
  bestStreak: number;
  total: number;
}

function Stat({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="flex flex-col items-start leading-tight">
      <span className="eyebrow text-[9.5px] mb-1">{label}</span>
      <span className="font-mono text-base font-medium text-ink">
        {value}
        {sub && <span className="font-mono text-[11px] text-ink-3 font-normal ml-1">{sub}</span>}
      </span>
    </div>
  );
}

export function ScoreBar({ score, streak, bestStreak, total }: ScoreBarProps) {
  return (
    <div className="flex items-center gap-[22px] px-4 py-2 bg-paper border border-rule rounded-lg">
      <Stat label="First-try" value={score} sub={`/ ${total}`} />
      <div className="w-px h-[22px] bg-rule" />
      <Stat label="Streak" value={streak} />
      <div className="w-px h-[22px] bg-rule" />
      <Stat label="Best" value={bestStreak} />
    </div>
  );
}
