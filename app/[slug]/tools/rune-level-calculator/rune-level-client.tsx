"use client";

import { useState, useMemo } from "react";

// ─── Rune cost table ───

const LEVEL_COST_TABLE: number[] = [];
for (let i = 1; i <= 99; i++) {
  if (i <= 12) LEVEL_COST_TABLE.push(673 + i * 108);
  else if (i <= 37) LEVEL_COST_TABLE.push(2336 + i * 130);
  else if (i <= 70) LEVEL_COST_TABLE.push(6246 + i * 161);
  else LEVEL_COST_TABLE.push(14166 + i * 199);
}

function costForLevel(level: number): number {
  return LEVEL_COST_TABLE[Math.min(Math.max(level, 1), 98)];
}

function totalCost(from: number, to: number): number {
  let cost = 0;
  for (let i = from; i < to; i++) cost += costForLevel(i);
  return cost;
}

const MAX_LEVEL = 713;

function fmtRunes(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

// ─── Data ───

const FARMING_METHODS = [
  { name: "Mohgwyn Bird", runesPerRun: 17500, duration: "15s" },
  { name: "Albinaurics (Wave of Gold)", runesPerRun: 42000, duration: "20s" },
  { name: "Albinaurics (Sacred Relic)", runesPerRun: 60000, duration: "25s" },
  { name: "Palace Approach Ledge", runesPerRun: 11000, duration: "10s" },
];

const TARGET_PRESETS = [125, 150, 200];
const MILESTONES = [100, 125, 150, 200];

// ─── Section ───

function Section({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-gray-800 bg-gray-900/60 p-4 ${className}`}>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
      {children}
    </div>
  );
}

// ─── Main ───

export default function RuneLevelClient() {
  const [currentLevel, setCurrentLevel] = useState(80);
  const [targetLevel, setTargetLevel] = useState(150);
  const [farmingIndex, setFarmingIndex] = useState(0);

  const costToTarget = useMemo(
    () => (targetLevel <= currentLevel ? 0 : totalCost(currentLevel, targetLevel)),
    [currentLevel, targetLevel],
  );

  const milestoneCosts = useMemo(
    () =>
      MILESTONES.map((m) => ({
        level: m,
        cost: currentLevel >= m ? 0 : totalCost(currentLevel, m),
      })),
    [currentLevel],
  );

  const farmingMethod = FARMING_METHODS[farmingIndex];
  const farmingRuns = farmingMethod ? Math.ceil(costToTarget / farmingMethod.runesPerRun) : 0;
  const farmingMinutes = farmingMethod ? Math.ceil((farmingRuns * parseInt(farmingMethod.duration)) / 60) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100">Elden Ring Rune Level Calculator</h1>
      <p className="mt-1 text-sm text-gray-400">
        Calculate how many runes you need to reach any level. Plan your build from early game to max level.
      </p>

      {/* ═══ Level Input ═══ */}
      <div className="mb-6 mt-6 grid gap-4 sm:grid-cols-2">
        <Section title="Current Level">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-3xl font-bold text-yellow-400">{currentLevel}</span>
          </div>
          <input
            type="range"
            min={1}
            max={MAX_LEVEL - 1}
            value={currentLevel}
            onChange={(e) => setCurrentLevel(parseInt(e.target.value, 10))}
            className="w-full accent-yellow-500"
          />
          <div className="mt-1 flex justify-between text-[10px] text-gray-600">
            <span>Lv 1</span>
            <span>Lv {MAX_LEVEL - 1}</span>
          </div>
        </Section>

        <Section title="Target Level">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-3xl font-bold text-yellow-400">{targetLevel}</span>
          </div>
          <input
            type="range"
            min={2}
            max={MAX_LEVEL}
            value={targetLevel}
            onChange={(e) => setTargetLevel(parseInt(e.target.value, 10))}
            className="w-full accent-yellow-500"
          />
          <div className="mt-1 flex justify-between text-[10px] text-gray-600">
            <span>Lv 2</span>
            <span>Lv {MAX_LEVEL}</span>
          </div>
        </Section>
      </div>

      {/* ═══ Result + Quick Targets ═══ */}
      <div className="mb-6 grid gap-4 sm:grid-cols-5">
        <div className="col-span-3 rounded-lg border border-gray-800 bg-gray-900/60 p-4 text-center">
          <div className="text-xs text-gray-500">Required Runes</div>
          <div className="mt-1 text-3xl font-bold text-yellow-400">
            {targetLevel <= currentLevel ? "—" : fmtRunes(costToTarget)}
          </div>
          <div className="mt-0.5 text-xs text-gray-600">
            Level {currentLevel} → {targetLevel}
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          {TARGET_PRESETS.map((t) => (
            <button
              key={t}
              onClick={() => setTargetLevel(t)}
              className={`rounded border px-3 py-2 text-center text-sm font-semibold transition ${
                targetLevel === t
                  ? "border-yellow-600 bg-yellow-900/20 text-yellow-300"
                  : "border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:text-gray-200"
              }`}
            >
              RL{t}
              <span className="ml-2 opacity-60 text-xs">
                {currentLevel >= t ? "✓" : fmtRunes(totalCost(currentLevel, t))}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ═══ Milestones ═══ */}
      <Section title="Level Milestones" className="mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left text-xs text-gray-500">
              <th className="pb-2 pr-6">Target</th>
              <th className="pb-2">Required Runes</th>
            </tr>
          </thead>
          <tbody>
            {milestoneCosts.map((m) => {
              const isTargetOrAbove = targetLevel >= m.level;
              return (
                <tr
                  key={m.level}
                  className={`border-b border-gray-800/50 ${isTargetOrAbove ? "bg-yellow-900/10" : ""}`}
                >
                  <td className="py-2 pr-6 font-medium text-gray-200">
                    {currentLevel} → {m.level}
                  </td>
                  <td className="py-2 font-mono text-yellow-400">
                    {currentLevel >= m.level ? "✓" : fmtRunes(m.cost)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

      {/* ═══ Farming Estimator ═══ */}
      <Section title="Rune Farming Estimator" className="mb-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {FARMING_METHODS.map((m, i) => (
            <button
              key={i}
              onClick={() => setFarmingIndex(i)}
              className={`rounded border px-2.5 py-1.5 text-xs transition ${
                farmingIndex === i
                  ? "border-yellow-600 bg-yellow-900/20 text-yellow-300"
                  : "border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:text-gray-200"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
        {targetLevel > currentLevel && (
          <div className="rounded bg-gray-800/40 p-4">
            <div className="grid gap-3 text-center sm:grid-cols-3">
              <div>
                <div className="text-xs text-gray-500">Runes per Run</div>
                <div className="mt-1 text-lg font-bold text-green-400">
                  +{fmtRunes(farmingMethod.runesPerRun)}
                </div>
                <div className="text-[10px] text-gray-600">{farmingMethod.duration} per run</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Runs Needed</div>
                <div className="mt-1 text-lg font-bold text-yellow-400">{farmingRuns.toLocaleString()}</div>
                <div className="text-[10px] text-gray-600">× {fmtRunes(farmingMethod.runesPerRun)} = {fmtRunes(costToTarget)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Estimated Time</div>
                <div className="mt-1 text-lg font-bold text-purple-400">
                  {farmingMinutes < 60 ? `${farmingMinutes} min` : `${Math.floor(farmingMinutes / 60)}h ${farmingMinutes % 60}m`}
                </div>
                <div className="text-[10px] text-gray-600">≈ {farmingRuns} runs</div>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* ═══ Recommended Levels ═══ */}
      <Section title="Recommended Levels" className="mb-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded border border-gray-800 bg-gray-800/30 p-3">
            <div className="text-xs font-semibold text-green-400">Main Game</div>
            <div className="mt-1 text-lg font-bold text-gray-200">120–150</div>
            <div className="mt-0.5 text-[11px] text-gray-500">
              Standard playthrough. Most players finish the base game around this range.
            </div>
          </div>
          <div className="rounded border border-gray-800 bg-gray-800/30 p-3">
            <div className="text-xs font-semibold text-yellow-400">NG+</div>
            <div className="mt-1 text-lg font-bold text-gray-200">150–200</div>
            <div className="mt-0.5 text-[11px] text-gray-500">
              New Game Plus cycles. Enemies scale up, you scale with them.
            </div>
          </div>
          <div className="rounded border border-gray-800 bg-gray-800/30 p-3">
            <div className="text-xs font-semibold text-purple-400">NG+7</div>
            <div className="mt-1 text-lg font-bold text-gray-200">250+</div>
            <div className="mt-0.5 text-[11px] text-gray-500">
              Maximum difficulty. You need high stats to survive.
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ Build Calculator CTA ═══ */}
      <Section title="Plan Your Stats" className="mb-6">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm text-gray-300">
              Now that you know how many runes you need, use the{" "}
              <strong className="text-yellow-400">Build Calculator</strong> to plan your stat allocation.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Set Vigor, Endurance, Strength, Dexterity, Intelligence — see exact damage and defense numbers.
            </p>
          </div>
          <a
            href="/elden-ring/tools/build-calculator"
            className="shrink-0 rounded bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-2.5 text-sm font-bold text-black transition hover:scale-[1.02]"
          >
            Open Build Calculator →
          </a>
        </div>
      </Section>

      {/* ═══ FAQ ═══ */}
      <div className="mt-8 space-y-6 border-t border-gray-800 pt-8">
        <h2 className="text-lg font-bold text-gray-100">Frequently Asked Questions</h2>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">How many runes to reach level 150?</h3>
          <p className="mt-1 text-sm text-gray-500">
            From level 1, it takes approximately 12.5 million runes to reach level 150.
            From level 100, you need about 8.7 million more.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">What is the PvP meta level?</h3>
          <p className="mt-1 text-sm text-gray-500">
            The standard PvP meta level is 125 for duels and 150 for mixed PvE/PvP activity.
            Level 125 gives tighter build constraints; level 150 allows more hybrid builds.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">How many runes for level 200?</h3>
          <p className="mt-1 text-sm text-gray-500">
            From level 1, it takes approximately 70 million runes to reach level 200.
            From level 150, you need about 57 million more.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">What is the best rune farm in Elden Ring?</h3>
          <p className="mt-1 text-sm text-gray-500">
            Mohgwyn Palace is the best rune farming location. Use the Sacred Relic Sword or
            Wave of Gold to clear Albinaurics in one swing for 40,000–60,000 runes per run.
            You can access this area early via Varre's quest.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">How many runes to max level (713)?</h3>
          <p className="mt-1 text-sm text-gray-500">
            Reaching max level 713 (all stats 99) requires over 1.7 billion runes total.
            This is not practical for normal play — most players stop between 125 and 200.
          </p>
        </div>
      </div>
    </div>
  );
}