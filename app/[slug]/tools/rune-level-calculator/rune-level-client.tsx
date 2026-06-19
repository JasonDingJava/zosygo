"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

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

// ─── Formatting ───

function fmtRunes(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

// ─── Farming presets ───

const FARMING_METHODS = [
  { name: "Mohgwyn Bird (early)", runesPerMin: 11000, description: "Shoot the bird off the cliff with a bow" },
  { name: "Mohgwyn Albinaurics", runesPerMin: 35000, description: "Wave of Gold / Sacred Relic Sword farm" },
  { name: "Mohgwyn Albinaurics (optimized)", runesPerMin: 60000, description: "NG+ setup with max buffs" },
  { name: "Varre's Quest Skip (early)", runesPerMin: 5000, description: "Pre-Mohgwyn early farm" },
  { name: "Palace Approach Ledge", runesPerMin: 25000, description: "Early access via Varre's quest" },
];

const TARGET_PRESETS = [50, 100, 125, 150, 200, 300, 713];

// ─── Section component ───

function Section({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-gray-800 bg-gray-900/60 p-4 ${className}`}>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
      {children}
    </div>
  );
}

// ─── Main Component ───

export default function RuneLevelClient() {
  const searchParams = useSearchParams();

  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetLevel, setTargetLevel] = useState(150);
  const [farmingIndex, setFarmingIndex] = useState(1);

  // Restore from URL
  useEffect(() => {
    const c = searchParams.get("current");
    const t = searchParams.get("target");
    const f = searchParams.get("farm");
    if (c) { const n = parseInt(c, 10); if (n >= 1 && n < MAX_LEVEL) setCurrentLevel(n); }
    if (t) { const n = parseInt(t, 10); if (n > 1 && n <= MAX_LEVEL) setTargetLevel(n); }
    if (f) { const n = parseInt(f, 10); if (n >= 0 && n < FARMING_METHODS.length) setFarmingIndex(n); }
  }, []);

  const costToTarget = useMemo(() => targetLevel <= currentLevel ? 0 : totalCost(currentLevel, targetLevel), [currentLevel, targetLevel]);
  const costToNext = useMemo(() => currentLevel >= MAX_LEVEL ? 0 : costForLevel(currentLevel), [currentLevel]);
  const costToMax = useMemo(() => currentLevel >= MAX_LEVEL ? 0 : totalCost(currentLevel, MAX_LEVEL), [currentLevel]);

  const farmingMethod = FARMING_METHODS[farmingIndex];
  const farmingMinutes = farmingMethod ? Math.ceil(costToTarget / farmingMethod.runesPerMin) : 0;
  const farmingHours = Math.floor(farmingMinutes / 60);
  const farmingMins = farmingMinutes % 60;

  const presetCosts = useMemo(() => TARGET_PRESETS.map((t) => ({ level: t, cost: currentLevel >= t ? 0 : totalCost(currentLevel, t) })), [currentLevel]);

  const costCurveData = useMemo(() => {
    const points: { level: number; cost: number }[] = [];
    for (let lv = 1; lv <= MAX_LEVEL; lv += 5) points.push({ level: lv, cost: costForLevel(lv) });
    return points;
  }, []);

  const maxPerLevel = Math.max(...costCurveData.map((p) => p.cost), 1);
  const progressPct = (currentLevel / MAX_LEVEL) * 100;

  // URL share
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (currentLevel !== 1) params.set("current", String(currentLevel));
    if (targetLevel !== 150) params.set("target", String(targetLevel));
    if (farmingIndex !== 1) params.set("farm", String(farmingIndex));
    const qs = params.toString();
    const base = "https://www.zosygo.com/elden-ring/tools/rune-level-calculator";
    return qs ? `${base}?${qs}` : base;
  }, [currentLevel, targetLevel, farmingIndex]);

  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(shareUrl); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl]);

  const clampLevel = (v: number, isTarget: boolean) => {
    const min = isTarget ? 2 : 1;
    const max = isTarget ? MAX_LEVEL : MAX_LEVEL - 1;
    return Math.max(min, Math.min(max, v || min));
  };

  // ─── Render ───

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-100">Elden Ring Rune Level Calculator</h1>
        <p className="mt-1 text-sm text-gray-400">
          Calculate runes needed for any level range, estimate farming time, and view the complete cost curve from level 1 to 713.
        </p>

        {/* Quick guide */}
        <div className="mt-4 grid gap-3 rounded-lg border border-gray-800 bg-gray-900/80 p-4 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-700 text-xs font-bold text-yellow-200">1</span>
            <div>
              <div className="text-xs font-semibold text-gray-300">Set Your Current Level</div>
              <div className="mt-0.5 text-[11px] text-gray-500">Use the +/- buttons or type directly.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-700 text-xs font-bold text-yellow-200">2</span>
            <div>
              <div className="text-xs font-semibold text-gray-300">Choose a Target Level</div>
              <div className="mt-0.5 text-[11px] text-gray-500">Click a Quick Target button or type a custom level.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-700 text-xs font-bold text-yellow-200">3</span>
            <div>
              <div className="text-xs font-semibold text-gray-300">Read Your Results</div>
              <div className="mt-0.5 text-[11px] text-gray-500">Rune cost, farming time, and cost curve update instantly.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Section title="Current Level">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-2xl font-bold text-yellow-400">{currentLevel}</span>
            </div>
            <input type="range" min={1} max={MAX_LEVEL - 1} value={currentLevel}
              onChange={(e) => setCurrentLevel(parseInt(e.target.value, 10))}
              className="w-full accent-yellow-500" />
            <div className="mt-1 flex justify-between text-[10px] text-gray-600">
              <span>Lv 1</span>
              <span>Lv {MAX_LEVEL - 1}</span>
            </div>
          </div>
        </Section>
        <Section title="Target Level">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-2xl font-bold text-yellow-400">{targetLevel}</span>
            </div>
            <input type="range" min={2} max={MAX_LEVEL} value={targetLevel}
              onChange={(e) => setTargetLevel(parseInt(e.target.value, 10))}
              className="w-full accent-yellow-500" />
            <div className="mt-1 flex justify-between text-[10px] text-gray-600">
              <span>Lv 2</span>
              <span>Lv {MAX_LEVEL}</span>
            </div>
          </div>
        </Section>
      </div>

      {/* Quick Targets */}
      <Section title="Quick Targets" className="mb-6">
        <div className="flex flex-wrap gap-2">
          {TARGET_PRESETS.map((t) => (
            <button key={t} onClick={() => setTargetLevel(t)}
              className={`rounded border px-3 py-1.5 text-xs transition ${
                targetLevel === t
                  ? "border-yellow-600 bg-yellow-900/20 text-yellow-300"
                  : "border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:text-gray-200"
              }`}>
              Lv {t} <span className="ml-1 opacity-60">{currentLevel >= t ? "✓" : `(${fmtRunes(totalCost(currentLevel, t))})`}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Results Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4 text-center">
          <div className="text-xs text-gray-500">Runes to Next Level</div>
          <div className="mt-1 text-2xl font-bold text-green-400">{currentLevel >= MAX_LEVEL ? "MAX" : fmtRunes(costToNext)}</div>
          {currentLevel < MAX_LEVEL && <div className="mt-0.5 text-[10px] text-gray-600">Level {currentLevel} → {currentLevel + 1}</div>}
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4 text-center">
          <div className="text-xs text-gray-500">Runes to Target</div>
          <div className="mt-1 text-2xl font-bold text-yellow-400">{targetLevel <= currentLevel ? "—" : fmtRunes(costToTarget)}</div>
          {targetLevel > currentLevel && <div className="mt-0.5 text-[10px] text-gray-600">Level {currentLevel} → {targetLevel}</div>}
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4 text-center">
          <div className="text-xs text-gray-500">Runes to Max (713)</div>
          <div className="mt-1 text-2xl font-bold text-purple-400">{currentLevel >= MAX_LEVEL ? "MAX" : fmtRunes(costToMax)}</div>
          {currentLevel < MAX_LEVEL && <div className="mt-0.5 text-[10px] text-gray-600">{((currentLevel / MAX_LEVEL) * 100).toFixed(1)}% complete</div>}
        </div>
      </div>

      {/* Progress Bar */}
      <Section title="Level Progress" className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">Lv 1</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-800">
            <div className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-purple-500 transition-all" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-xs text-gray-500">Lv 713</span>
        </div>
        <div className="mt-1 text-center text-xs text-gray-600">Current: Level {currentLevel}</div>
      </Section>

      {/* Cost Curve Chart */}
      <Section title="Cost Per Level Curve" className="mb-6">
        <div className="relative h-48 w-full">
          <div className="absolute -left-1 top-0 text-[10px] text-gray-600">{fmtRunes(maxPerLevel)}</div>
          <div className="absolute -left-1 bottom-0 text-[10px] text-gray-600">0</div>
          <div className="ml-12 flex h-full items-end gap-px">
            {costCurveData.map((point, i) => {
              const h = (point.cost / maxPerLevel) * 100;
              const isCurrentRange = point.level >= currentLevel && point.level < targetLevel;
              return (
                <div key={i} className="flex-1 rounded-t transition-all"
                  style={{ height: `${Math.max(h, 0.5)}%`, backgroundColor: isCurrentRange ? "rgb(250 204 21 / 0.6)" : "rgb(75 85 99 / 0.4)" }}
                  title={`Level ${point.level}: ${fmtRunes(point.cost)} runes`} />
              );
            })}
          </div>
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-gray-600">
          <span>Level 1</span>
          <span>Level 713</span>
        </div>
        <div className="mt-1 text-center text-xs text-gray-600">
          <span className="inline-block h-2 w-2 rounded-sm bg-yellow-400/60" /> Selected range ({currentLevel} → {targetLevel})
          <span className="ml-3 inline-block h-2 w-2 rounded-sm bg-gray-600/40" /> Other levels
        </div>
      </Section>

      {/* Farming Time */}
      <Section title="Farming Time Estimate" className="mb-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {FARMING_METHODS.map((m, i) => (
            <button key={i} onClick={() => setFarmingIndex(i)}
              className={`rounded border px-2.5 py-1.5 text-xs transition ${
                farmingIndex === i
                  ? "border-yellow-600 bg-yellow-900/20 text-yellow-300"
                  : "border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:text-gray-200"
              }`}>
              {m.name}
            </button>
          ))}
        </div>
        {targetLevel > currentLevel && (
          <div className="rounded bg-gray-800/40 p-3 text-center">
            <div className="text-sm text-gray-400">Estimated time to reach Level {targetLevel}</div>
            <div className="mt-1 text-xl font-bold text-green-400">
              {farmingMinutes < 60 ? `${farmingMinutes} min` : `${farmingHours}h ${farmingMins}m`}
            </div>
            <div className="mt-0.5 text-[10px] text-gray-600">
              ~{fmtRunes(farmingMethod.runesPerMin)}/min × {farmingMinutes} min = {fmtRunes(costToTarget)} runes
            </div>
          </div>
        )}
      </Section>

      {/* Preset Costs Table */}
      <Section title="Cost by Level Target" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-left text-xs text-gray-500">
                <th className="pb-2 pr-4">Target</th>
                <th className="pb-2 pr-4">Total Runes (from Lv 1)</th>
                <th className="pb-2">Runes from Lv {currentLevel}</th>
              </tr>
            </thead>
            <tbody>
              {presetCosts.map((p) => (
                <tr key={p.level} className="border-b border-gray-800/50">
                  <td className="py-2 pr-4 font-medium text-gray-200">Level {p.level}</td>
                  <td className="py-2 pr-4 font-mono text-yellow-400">{fmtRunes(totalCost(1, p.level))}</td>
                  <td className="py-2 font-mono text-gray-400">{currentLevel >= p.level ? "✓" : fmtRunes(p.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* URL Share */}
      <Section title="Share Build" className="mb-6">
        <div className="flex items-center gap-2">
          <input type="text" readOnly value={shareUrl}
            className="flex-1 rounded bg-gray-800 px-3 py-2 text-xs text-gray-400 outline-none" />
          <button onClick={handleCopy}
            className="shrink-0 rounded bg-yellow-700 px-4 py-2 text-xs font-semibold text-yellow-200 transition hover:bg-yellow-600">
            {copied ? "Copied!" : "Copy URL"}
          </button>
        </div>
      </Section>
    </div>
  );
}