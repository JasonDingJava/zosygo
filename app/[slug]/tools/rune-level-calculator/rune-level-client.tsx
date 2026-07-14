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
      <h1 className="text-2xl font-bold text-gray-100">Elden Ring Rune Level Calculator</h1>
      <p className="mt-1 text-sm text-gray-400">
        Find the exact rune cost required for any level. Plan Level 50, 100, 125, 150, and 200 builds before spending your hard-earned runes.
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
          The <strong className="text-gray-300">Elden Ring Rune Level Calculator</strong> is a free tool that shows exactly how many runes you need to reach any character level from 1 to 713.
        </p>
        <p className="text-sm leading-relaxed text-gray-400">
          Use it as a:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-400">
          <li><strong className="text-gray-300">Rune Cost Calculator</strong> to find the exact cost of your next level</li>
          <li><strong className="text-gray-300">Level Calculator</strong> to plan your character progression</li>
          <li><strong className="text-gray-300">Character Level Planner</strong> to estimate total rune requirements for your build</li>
        </ul>
        <p className="text-sm leading-relaxed text-gray-400">
          The calculator follows Elden Ring&apos;s in-game rune progression system, allowing you to plan your leveling path without wasting time farming more runes than necessary.
        </p>

        <h2 className="text-lg font-bold text-gray-100">What Can You Do With This Rune Calculator?</h2>
        <p className="text-sm leading-relaxed text-gray-400">
          With the Elden Ring Rune Level Calculator, you can:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-400">
          <li>Calculate runes required from your current level to any target level</li>
          <li>Check the rune cost for every level from 1 to 713</li>
          <li>Plan popular build levels like RL125, RL150, and RL200</li>
          <li>Estimate farming time based on your preferred rune farming method</li>
          <li>Compare different leveling milestones before committing runes</li>
          <li>Share your level calculation with a custom URL</li>
        </ul>

        <h2 className="text-lg font-bold text-gray-100">How To Use the Elden Ring Rune Level Calculator</h2>

        <h3 className="text-sm font-semibold text-gray-200">1. Set Your Current Rune Level</h3>
        <p className="text-sm leading-relaxed text-gray-400">
          Enter your current character level.
        </p>
        <p className="text-sm leading-relaxed text-gray-400">Examples:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-400">
          <li>Level 20 early-game character</li>
          <li>Level 100 story progression build</li>
          <li>Level 150 endgame character</li>
        </ul>
        <p className="text-sm leading-relaxed text-gray-400">
          The calculator will use your current level as the starting point.
        </p>

        <h3 className="text-sm font-semibold text-gray-200">2. Choose Your Target Level</h3>
        <p className="text-sm leading-relaxed text-gray-400">
          Select the level you want to reach.
        </p>
        <p className="text-sm leading-relaxed text-gray-400">Popular Elden Ring level targets:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-400">
          <li>RL100 — Main story progression</li>
          <li>RL125 — PvP meta builds</li>
          <li>RL150 — Standard endgame builds</li>
          <li>RL200 — High-level hybrid builds</li>
          <li>RL713 — Maximum level</li>
        </ul>

        <h3 className="text-sm font-semibold text-gray-200">3. Check Required Rune Cost</h3>
        <p className="text-sm leading-relaxed text-gray-400">
          The calculator displays:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-400">
          <li>Total runes required</li>
          <li>Rune cost per level</li>
          <li>Level milestones</li>
          <li>Remaining rune requirements</li>
        </ul>
        <p className="text-sm leading-relaxed text-gray-400">
          Use this information to decide whether leveling up is worth the farming time.
        </p>

        <h3 className="text-sm font-semibold text-gray-200">4. Estimate Rune Farming Requirements</h3>
        <p className="text-sm leading-relaxed text-gray-400">
          Choose a farming method to estimate:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-400">
          <li>Number of farming runs needed</li>
          <li>Approximate farming time</li>
          <li>Total rune investment</li>
        </ul>
        <p className="text-sm leading-relaxed text-gray-400">
          Popular farming locations include Mohgwyn Palace and other high-efficiency rune farming areas.
        </p>

        <hr className="border-gray-800" />

        <h2 className="text-lg font-bold text-gray-100">Elden Ring Rune Cost Explained</h2>
        <p className="text-sm leading-relaxed text-gray-400">
          Every character level in Elden Ring requires more runes than the previous level.
        </p>
        <p className="text-sm leading-relaxed text-gray-400">
          Early levels are inexpensive, but costs increase significantly after Level 100.
        </p>
        <p className="text-sm leading-relaxed text-gray-400">
          This is why many players plan around specific breakpoints:
        </p>

        <h3 className="text-sm font-semibold text-gray-200">Level 125</h3>
        <p className="text-sm leading-relaxed text-gray-400">
          Common for:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-400">
          <li>PvP dueling</li>
          <li>Competitive builds</li>
          <li>Multiplayer balance</li>
        </ul>

        <h3 className="text-sm font-semibold text-gray-200">Level 150</h3>
        <p className="text-sm leading-relaxed text-gray-400">
          The most common endgame level.
        </p>
        <p className="text-sm leading-relaxed text-gray-400">Popular for:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-400">
          <li>Shadow of the Erdtree builds</li>
          <li>PvE characters</li>
          <li>Co-op builds</li>
        </ul>

        <h3 className="text-sm font-semibold text-gray-200">Level 200</h3>
        <p className="text-sm leading-relaxed text-gray-400">Used for:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-400">
          <li>High-level PvE</li>
          <li>Hybrid builds</li>
          <li>Multiple damage stats</li>
        </ul>

      
      </div>

      {/* ═══ FAQ ═══ */}
      <div className="mt-8 space-y-6 border-t border-gray-800 pt-8">
        <h2 className="text-lg font-bold text-gray-100">Frequently Asked Questions</h2>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">How many runes do you need to reach Level 150 in Elden Ring?</h3>
          <p className="mt-1 text-sm text-gray-500">
            From Level 1, reaching Level 150 requires approximately 12.5 million runes.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            From Level 100, you need approximately 8.7 million additional runes.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            The exact amount depends on your current level, which you can calculate using the tool above.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">What is the best Elden Ring level for PvP?</h3>
          <p className="mt-1 text-sm text-gray-500">
            The most common PvP levels are:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-500">
            <li>Level 125 for competitive duels</li>
            <li>Level 150 for mixed PvE and PvP activity</li>
          </ul>
          <p className="mt-1 text-sm text-gray-500">
            Level 150 provides more flexibility for hybrid builds while maintaining active multiplayer matchmaking.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">How many runes are needed for Level 200?</h3>
          <p className="mt-1 text-sm text-gray-500">
            Reaching Level 200 requires approximately 70 million total runes from Level 1.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Going from Level 150 to Level 200 requires roughly 57 million additional runes.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">How many runes are needed for max level 713?</h3>
          <p className="mt-1 text-sm text-gray-500">
            Maximum Rune Level 713 requires more than 1.7 billion total runes.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Most players stop between Level 125 and Level 200 because those ranges provide the best build efficiency.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">How many runes does Level 100 cost?</h3>
          <p className="mt-1 text-sm text-gray-500">
            Around Level 100, each additional level costs approximately 50,000+ runes.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Rune costs continue increasing as your character level rises.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">What is the fastest rune farming method in Elden Ring?</h3>
          <p className="mt-1 text-sm text-gray-500">
            Mohgwyn Palace is one of the most efficient rune farming locations.
          </p>
          <p className="mt-1 text-sm text-gray-500">Common methods include:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-500">
            <li>Palace Approach Ledge-Road farming</li>
            <li>Albinauric farming</li>
            <li>Sacred Relic Sword Wave of Gold farming</li>
          </ul>
          <p className="mt-1 text-sm text-gray-500">
            Your required number of farming runs depends on your current level and rune bonus modifiers.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200">What rune formula does Elden Ring use?</h3>
          <p className="mt-1 text-sm text-gray-500">
            Elden Ring uses a scaling rune requirement formula where each level increases based on a tiered progression curve.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            The calculator applies the same progression pattern used by the game to estimate required runes accurately.
          </p>
        </div>
      </div>

      {/* ═══ Related Tools ═══ */}
      <div className="mt-8 space-y-4 border-t border-gray-800 pt-8">
        <h2 className="text-lg font-bold text-gray-100">Related Tools</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="/elden-ring/tools/build-calculator"
              className="text-blue-400 hover:text-blue-300"
            >
              Elden Ring Build Planner
            </a>
          </li>
          <li>
            <a
              href="/elden-ring/tools/weapon-ar-calculator"
              className="text-blue-400 hover:text-blue-300"
            >
              Elden Ring Weapon AR Calculator
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
              href="/elden-ring/builds"
              className="text-blue-400 hover:text-blue-300"
            >
              Elden Ring Build Tier List
            </a>
          </li>
          <li>
            <a
              href="/elden-ring/builds/best-builds"
              className="text-blue-400 hover:text-blue-300"
            >
              Best Elden Ring Builds
            </a>
          </li>
        </ul>
      </div>
    </div>

  );
}
