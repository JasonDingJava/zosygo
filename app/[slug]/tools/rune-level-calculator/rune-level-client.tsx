"use client";

import { useState, useMemo, useCallback } from "react";

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
const TARGET_PRESETS_FULL = [50, 100, 125, 150, 200, 300, 713];
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
  const [copied, setCopied] = useState(false);

  const costToNext = useMemo(() => (currentLevel >= MAX_LEVEL ? 0 : costForLevel(currentLevel)), [currentLevel]);
  const costToMax = useMemo(() => (currentLevel >= MAX_LEVEL ? 0 : totalCost(currentLevel, MAX_LEVEL)), [currentLevel]);

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

  const costCurveData = useMemo(() => {
    const points: { level: number; cost: number }[] = [];
    for (let lv = 1; lv <= MAX_LEVEL; lv += 5) points.push({ level: lv, cost: costForLevel(lv) });
    return points;
  }, []);

  const maxPerLevel = Math.max(...costCurveData.map((p) => p.cost), 1);
  const progressPct = (currentLevel / MAX_LEVEL) * 100;

  const shareUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (currentLevel !== 80) params.set("current", String(currentLevel));
    if (targetLevel !== 150) params.set("target", String(targetLevel));
    const qs = params.toString();
    const base = "https://www.zosygo.com/elden-ring/tools/rune-level-calculator";
    return qs ? `${base}?${qs}` : base;
  }, [currentLevel, targetLevel]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl]);

  const farmingMethod = FARMING_METHODS[farmingIndex];
  const farmingRuns = farmingMethod ? Math.ceil(costToTarget / farmingMethod.runesPerRun) : 0;
  const farmingMinutes = farmingMethod ? Math.ceil((farmingRuns * parseInt(farmingMethod.duration)) / 60) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100">Elden Ring Rune Level Calculator – How Many Runes to Reach Any Level</h1>
      <p className="mt-1 text-sm text-gray-400">
        Calculate how many runes you need to reach any level. Plan your build from early game to max level.
      </p>

      {/* ═══ URL Share (top) ═══ */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/40 p-3">
        <span className="text-xs text-gray-500">Share:</span>
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="flex-1 rounded bg-gray-800 px-3 py-1.5 text-xs text-gray-400 outline-none"
        />
        <button
          onClick={handleCopy}
          className="shrink-0 rounded bg-yellow-700 px-3 py-1.5 text-xs font-semibold text-yellow-200 transition hover:bg-yellow-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

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
            onTouchMove={function(e) { e.preventDefault(); }}
            style={{ touchAction: 'none' }}
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
            onTouchMove={function(e) { e.preventDefault(); }}
            style={{ touchAction: 'none' }}
          />
          <div className="mt-1 flex justify-between text-[10px] text-gray-600">
            <span>Lv 2</span>
            <span>Lv {MAX_LEVEL}</span>
          </div>
        </Section>
      </div>

      {/* ═══ Progress Bar ═══ */}
      <Section title="Level Progress" className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">Lv 1</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-purple-500 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">Lv 713</span>
        </div>
        <div className="mt-1 text-center text-xs text-gray-600">Current: Level {currentLevel}</div>
      </Section>

      {/* ═══ Results Grid ═══ */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4 text-center">
          <div className="text-xs text-gray-500">Runes to Next Level</div>
          <div className="mt-1 text-xl font-bold text-green-400">{currentLevel >= MAX_LEVEL ? "MAX" : fmtRunes(costToNext)}</div>
          <div className="mt-0.5 text-[10px] text-gray-600">
            Level {currentLevel} → {currentLevel + 1}
          </div>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4 text-center">
          <div className="text-xs text-gray-500">Runes to Target</div>
          <div className="mt-1 text-2xl font-bold text-yellow-400">
            {targetLevel <= currentLevel ? "—" : fmtRunes(costToTarget)}
          </div>
          <div className="mt-0.5 text-[10px] text-gray-600">
            Level {currentLevel} → {targetLevel}
          </div>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4 text-center">
          <div className="text-xs text-gray-500">Runes to Max (713)</div>
          <div className="mt-1 text-xl font-bold text-purple-400">{currentLevel >= MAX_LEVEL ? "MAX" : fmtRunes(costToMax)}</div>
          <div className="mt-0.5 text-[10px] text-gray-600">{((currentLevel / MAX_LEVEL) * 100).toFixed(1)}% complete</div>
        </div>
      </div>

      {/* ═══ Quick Targets ═══ */}
      <Section title="Quick Targets" className="mb-6">
        <div className="flex flex-wrap gap-2">
          {TARGET_PRESETS_FULL.map((t) => (
            <button
              key={t}
              onClick={() => setTargetLevel(t)}
              className={`rounded border px-3 py-1.5 text-xs transition ${
                targetLevel === t
                  ? "border-yellow-600 bg-yellow-900/20 text-yellow-300"
                  : "border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:text-gray-200"
              }`}
            >
              Lv {t}{" "}
              <span className="ml-1 opacity-60">
                {currentLevel >= t ? "✓" : `(${fmtRunes(totalCost(currentLevel, t))})`}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* ═══ Cost Curve Chart ═══ */}
      <Section title="Cost Per Level Curve" className="mb-6">
        <div className="relative h-48 w-full">
          <div className="absolute -left-1 top-0 text-[10px] text-gray-600">{fmtRunes(maxPerLevel)}</div>
          <div className="absolute -left-1 bottom-0 text-[10px] text-gray-600">0</div>
          <div className="ml-12 flex h-full items-end gap-px">
            {costCurveData.map((point, i) => {
              const h = (point.cost / maxPerLevel) * 100;
              const isCurrentRange = point.level >= currentLevel && point.level < targetLevel;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t transition-all"
                  style={{
                    height: `${Math.max(h, 0.5)}%`,
                    backgroundColor: isCurrentRange ? "rgb(250 204 21 / 0.6)" : "rgb(75 85 99 / 0.4)",
                  }}
                  title={`Level ${point.level}: ${fmtRunes(point.cost)} runes`}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-gray-600">
          <span>Level 1</span>
          <span>Level 713</span>
        </div>
        <div className="mt-1 text-center text-xs text-gray-600">
          <span className="inline-block h-2 w-2 rounded-sm bg-yellow-400/60" /> Selected range ({currentLevel} →{" "}
          {targetLevel})
          <span className="ml-3 inline-block h-2 w-2 rounded-sm bg-gray-600/40" /> Other levels
        </div>
      </Section>

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

      {/* ═══ Build Planner CTA ═══ */}
      <Section title="Plan Your Stats" className="mb-6">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm text-gray-300">
              Now that you know how many runes you need, use the{" "}
              <strong className="text-yellow-400">Build Planner</strong> to plan your stat allocation.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Set Vigor, Endurance, Strength, Dexterity, Intelligence — see exact damage and defense numbers.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Also compare weapon damage with the <a href="/elden-ring/tools/weapon-ar-calculator" className="text-yellow-400 underline underline-offset-2 hover:text-yellow-300">Weapon AR Calculator</a>.
            </p>
          </div>
          <a
            href="/elden-ring/tools/build-calculator"
            className="shrink-0 rounded bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-2.5 text-sm font-bold text-black transition hover:scale-[1.02]"
          >
            Open Build Planner →
          </a>
        </div>
      </Section>

      {/* ═══ SEO Content ═══ */}
      <div className="mt-8 space-y-6 border-t border-gray-800 pt-8">
        <h2 className="text-lg font-bold text-gray-100">What Is the Elden Ring Rune Level Calculator?</h2>
        <p className="text-sm leading-relaxed text-gray-400">
          The Elden Ring Rune Level Calculator is a free online tool that tells you exactly how many runes you need
          to reach any level from 1 to 713. Use it as a Level Up Calculator to check the cost for your next level, a Rune Cost Calculator
          to plan a level range, or a Character Level Planner to see the total runes required from start to your target level.
          It uses the game's official rune cost formula to calculate the exact
          number of runes required for each level, so you can plan your character's progression without wasting
          time farming blindly.
        </p>

        <h2 className="text-lg font-bold text-gray-100">What Can You Do With It?</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-400">
          <li>Calculate runes needed from your current level to any target level.</li>
          <li>See the cost per level across the entire 1–713 curve.</li>
          <li>Estimate how many farming runs you need with different farming methods.</li>
          <li>Check rune costs for popular PvP and PvE level targets (125, 150, 200).</li>
          <li>Share your exact level range via URL with one click.</li>
        </ul>

        <h2 className="text-lg font-bold text-gray-100">How to Use the Rune Level Calculator</h2>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-gray-400">
          <li>
            <strong className="text-gray-300">Set your current level</strong> — Drag the Current Level slider
            to match your character's level in-game.
          </li>
          <li>
            <strong className="text-gray-300">Choose a target level</strong> — Drag the Target Level slider,
            or click one of the Quick Target buttons (RL125, RL150, RL200) for popular breakpoints.
          </li>
          <li>
            <strong className="text-gray-300">Read your results</strong> — The Required Runes card shows the
            total cost. The Milestones table breaks down costs for multiple targets at once.
          </li>
          <li>
            <strong className="text-gray-300">Estimate farming time</strong> — Pick a farming method and see
            exactly how many runs you need.
          </li>
        </ol>
      </div>

      {/* ═══ FAQ ═══ */}

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
            Wave of Gold to clear Albinaurics in one swing for 40,000\u201360,000 runes per run.
            You can access this area early via Varre's quest.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">How many runes do I need for level 150?</h3>
          <p className="mt-1 text-sm text-gray-500">
            From level 1, you need approximately 12.5 million runes to reach level 150. From level 100, you need about 8.7 million more. Use the calculator above to get the exact number for your current level.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">What is the fastest rune farming method?</h3>
          <p className="mt-1 text-sm text-gray-500">
            The fastest method is using Sacred Relic Sword's Wave of Gold at Palace Approach Ledge-Road: about 60,000 runes per 25-second run. Early-game: Mohgwyn bird (17,500 per 15s) or Greyoll's Dragon (75,000 once).
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">How many runes to max level (713)?</h3>
          <p className="mt-1 text-sm text-gray-500">
            Reaching max level 713 (all stats 99) requires over 1.7 billion runes total.
            This is not practical for normal play — most players stop between 125 and 200.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">How many runes per level at level 100?</h3>
          <p className="mt-1 text-sm text-gray-500">
            At level 100, each level costs roughly 52,000 runes. Going from level 100 to level 101 is 52,606 runes.
            The cost increases by about 600-800 runes per level at this stage.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">What is the Elden Ring rune cost formula?</h3>
          <p className="mt-1 text-sm text-gray-500">
            The game uses a tiered formula where cost = round(0.02x³ + 3.06x² + 105.6x - 895) where x is your current level.
            This calculator uses the exact same formula from the game data, so the numbers match what you see in-game.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">How long does it take to reach level 150 from a new game?</h3>
          <p className="mt-1 text-sm text-gray-500">
            With efficient rune farming at Mohgwyn Palace, reaching level 150 from level 1 takes about
            200-250 runs (approximately 3-4 hours of dedicated farming). Without farming, it typically
            takes 40-60 hours of natural progression through the game.
          </p>
        </div>
      </div>

      {/* ═══ Related Articles ═══ */}
      <div className="mt-8 space-y-4 border-t border-gray-800 pt-8">
        <h2 className="text-lg font-bold text-gray-100">Related Guides</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="/elden-ring/builds/rune-level-calculator"
              className="text-blue-400 hover:text-blue-300"
            >
              How Many Runes to Reach Level 150? — Full Cost Breakdown
            </a>
          </li>
          <li>
            <a
              href="/elden-ring/builds/level-150-builds"
              className="text-blue-400 hover:text-blue-300"
            >
              Best Level 150 Builds (2026)
            </a>
          </li>
          <li>
            <a
              href="/elden-ring/builds/moonveil-intelligence-build"
              className="text-blue-400 hover:text-blue-300"
            >
              Moonveil Intelligence Build Guide — Optimized for RL 150
            </a>
          </li>
          <li>
            <a
              href="/elden-ring/builds/best-bleed-build"
              className="text-blue-400 hover:text-blue-300"
            >
              Best Bleed Builds in Elden Ring
            </a>
          </li>
          <li>
            <a
              href="/elden-ring/builds/soft-caps-guide"
              className="text-blue-400 hover:text-blue-300"
            >
              Elden Ring Soft Caps Guide
            </a>
          </li>
          <li>
            <a
              href="/elden-ring/builds/starting-class-guide"
              className="text-blue-400 hover:text-blue-300"
            >
              Best Starting Class Guide — Which Class Saves You Levels
            </a>
          </li>
          <li>
            <a
              href="/elden-ring/builds/build-optimization"
              className="text-blue-400 hover:text-blue-300"
            >
              How to Fix a Weak Build in Elden Ring
            </a>
          </li>
        </ul>
      </div>
    </div>

  );
}
