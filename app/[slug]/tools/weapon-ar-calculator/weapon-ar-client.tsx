"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { getGameBySlug } from "@/lib/games";
import {
  ALL_WEAPONS,
  ALL_WEAPON_SLUGS,
  WEAPON_CATEGORIES,
  WEAPON_CATEGORY_NAMES,
  TYPE_NAME_MAP,
  calculateWeaponAR,
  getScalingLetter,
} from "@/lib/build-calculator/weapons";

type StatInputs = {
  str: number;
  dex: number;
  int: number;
  fai: number;
  arc: number;
}

const DEFAULT_STATS: StatInputs = {
  str: 50,
  dex: 50,
  int: 50,
  fai: 50,
  arc: 50,
};

const STAT_DEFS = [
  { key: "str" as const, label: "Strength", short: "STR", icon: "💪" },
  { key: "dex" as const, label: "Dexterity", short: "DEX", icon: "🗡️" },
  { key: "int" as const, label: "Intelligence", short: "INT", icon: "🔮" },
  { key: "fai" as const, label: "Faith", short: "FAI", icon: "✨" },
  { key: "arc" as const, label: "Arcane", short: "ARC", icon: "🩸" },
];

function StatSlider({ def, value, onChange }: { def: typeof STAT_DEFS[number]; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 text-center text-base">{def.icon}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{def.short}</span>
          <span className="font-mono text-sm font-bold text-[#e8d5a3]">{value}</span>
        </div>
        <input type="range" min={1} max={99} value={value} onChange={(e) => onChange(Number(e.target.value))}
          className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-amber-500 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
      </div>
      <div className="flex flex-col gap-0.5">
        <button onClick={() => onChange(Math.min(value + 1, 99))} className="flex h-5 w-5 items-center justify-center rounded-sm bg-zinc-800 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white">+</button>
        <button onClick={() => onChange(Math.max(value - 1, 1))} className="flex h-5 w-5 items-center justify-center rounded-sm bg-zinc-800 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white">&minus;</button>
      </div>
    </div>
  );
}

function WeaponRow({ slug, stats, upgradeLevel, twoHanding, checked, onToggle }: {
  slug: string; stats: StatInputs; upgradeLevel: number; twoHanding: boolean; checked: boolean; onToggle: () => void;
}) {
  const weapon = ALL_WEAPONS[slug];
  const result = useMemo(() => calculateWeaponAR(weapon, stats, upgradeLevel, twoHanding), [weapon, stats, upgradeLevel, twoHanding]);
  return (
    <tr className={`border-b border-white/5 transition-colors ${checked ? "bg-amber-500/5" : ""} hover:bg-white/[0.02]`}>
      <td className="py-2.5 pl-3"><input type="checkbox" checked={checked} onChange={onToggle} className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500/30" /></td>
      <td className="py-2.5 pr-3"><span className="text-sm font-medium text-white">{weapon.name}</span><span className="ml-2 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] uppercase text-zinc-500">{TYPE_NAME_MAP[weapon.type] || weapon.type}</span></td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-300">{result.totalAR}</td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-500">{result.phys || "—"}</td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-500">{result.magic || "—"}</td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-500">{result.fire || "—"}</td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-500">{result.lightning || "—"}</td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-500">{result.holy || "—"}</td>
      <td className="py-2.5 pr-3 text-right">
        <div className="flex gap-1 text-[10px] font-medium">
          {(["str","dex","int","fai","arc"] as const).map((s) => {
            const val = weapon.scaling[s];
            if (!val) return null;
            const letter = getScalingLetter(val);
            const colors: Record<string, string> = { S: "text-red-400", A: "text-orange-400", B: "text-amber-400", C: "text-yellow-400", D: "text-zinc-500", E: "text-zinc-600" };
            return <span key={s} className={`${colors[letter] || "text-zinc-600"} uppercase`}>{letter}</span>;
          })}
        </div>
      </td>
      <td className="py-2.5 pr-3 text-right">
        <div className="flex gap-1 text-[10px] text-zinc-600">
          {(["str","dex","int","fai","arc"] as const).map((s) => {
            const req = weapon.requirements[s];
            if (!req) return null;
            return <span key={s}>{s.toUpperCase()}{req}</span>;
          })}
        </div>
      </td>
    </tr>
  );
}

function PresetBuild({ name, stats, onApply }: { name: string; stats: Partial<StatInputs>; onApply: (s: StatInputs) => void }) {
  return <button onClick={() => onApply({ ...DEFAULT_STATS, ...stats })} className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] px-3 py-2 text-xs font-medium text-[#e8d5a3] transition-all hover:border-[#c9a227]/30 hover:bg-[#12121a]">{name}</button>;
}

export default function WeaponARPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const [stats, setStats] = useState<StatInputs>(DEFAULT_STATS);
  const [upgradeLevel, setUpgradeLevel] = useState(25);
  const [twoHanding, setTwoHanding] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [checkedSlugs, setCheckedSlugs] = useState<Set<string>>(new Set());
  const [showCheckedOnly, setShowCheckedOnly] = useState(false);

  const filteredWeapons = useMemo(() => {
    let list = ALL_WEAPON_SLUGS;
    if (selectedType !== "all") list = WEAPON_CATEGORIES[selectedType] || [];
    if (search) { const q = search.toLowerCase(); list = list.filter((s) => ALL_WEAPONS[s].name.toLowerCase().includes(q)); }
    if (showCheckedOnly) list = list.filter((s) => checkedSlugs.has(s));
    return list;
  }, [selectedType, search, showCheckedOnly, checkedSlugs]);

  const toggleWeapon = useCallback((s: string) => { setCheckedSlugs((prev) => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; }); }, []);
  const applyPreset = useCallback((s: StatInputs) => setStats(s), []);
  const comparedWeapons = useMemo(() => ALL_WEAPON_SLUGS.filter((s) => checkedSlugs.has(s)), [checkedSlugs]);

  return (
    <>
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
          <li><Link href="/" className="text-[#b8956a]/80 hover:text-[#c9a227]">Home</Link></li>
          <li aria-hidden className="text-zinc-700">/</li>
          <li><Link href={"/"+slug} className="hover:underline" style={{ color: game.accentColor }}>{game.name}</Link></li>
          <li aria-hidden className="text-zinc-700">/</li>
          <li><Link href={"/"+slug+"/tools"} className="text-[#b8956a]/80 hover:text-[#c9a227]">Tools</Link></li>
          <li aria-hidden className="text-zinc-700">/</li>
          <li className="text-zinc-500">Weapon AR Calculator</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Weapon AR Calculator</h1>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">Compare Attack Rating across all weapons. Set your stats, upgrade level, and see instant results.</p>
          </div>

          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Stats</h2>
            <div className="space-y-3">
              {STAT_DEFS.map((d) => <StatSlider key={d.key} def={d} value={stats[d.key]} onChange={(v) => setStats((s) => ({ ...s, [d.key]: v }))} />)}
            </div>
          </div>

          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Upgrade Level</h2>
            <div className="flex items-center gap-3">
              <input type="range" min={0} max={25} value={upgradeLevel} onChange={(e) => setUpgradeLevel(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-amber-500 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400" />
              <span className="w-10 text-right font-mono text-sm font-bold text-[#e8d5a3]">+{upgradeLevel}</span>
            </div>
            <label className="mt-3 flex items-center gap-2">
              <input type="checkbox" checked={twoHanding} onChange={(e) => setTwoHanding(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500/30" />
              <span className="text-xs font-medium text-zinc-400">Two-handing (STR &times;1.5)</span>
            </label>
          </div>

          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Quick Presets</h2>
            <div className="flex flex-wrap gap-2">
              <PresetBuild name="Pure STR" stats={{ str: 80 }} onApply={applyPreset} />
              <PresetBuild name="Pure DEX" stats={{ dex: 80 }} onApply={applyPreset} />
              <PresetBuild name="Quality" stats={{ str: 55, dex: 55 }} onApply={applyPreset} />
              <PresetBuild name="Pure INT" stats={{ int: 80 }} onApply={applyPreset} />
              <PresetBuild name="Pure FAI" stats={{ fai: 80 }} onApply={applyPreset} />
              <PresetBuild name="Bleed" stats={{ dex: 50, arc: 60 }} onApply={applyPreset} />
              <PresetBuild name="STR/FAI" stats={{ str: 50, fai: 60 }} onApply={applyPreset} />
            </div>
          </div>

          {comparedWeapons.length > 0 && (
            <div className="rounded-sm border border-amber-500/20 bg-amber-500/5 p-4">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Comparing {comparedWeapons.length}</h2>
              <div className="space-y-1">
                {comparedWeapons.map((s) => (
                  <div key={s} className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">{ALL_WEAPONS[s].name}</span>
                    <button onClick={() => toggleWeapon(s)} className="text-[10px] text-zinc-600 hover:text-red-400">&times;</button>
                  </div>
                ))}
              </div>
              <button onClick={() => setCheckedSlugs(new Set())} className="mt-3 text-[10px] font-medium uppercase tracking-wider text-zinc-600 hover:text-white">Clear all</button>
            </div>
          )}
          
          {comparedWeapons.length >= 2 && (
            <div className="rounded-sm border border-amber-500/30 bg-[#0a0a0f] p-4">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Comparison</h2>
              <div className="space-y-2">
                {comparedWeapons.map((s) => {
                  const w = ALL_WEAPONS[s];
                  const r = calculateWeaponAR(w, stats, upgradeLevel, twoHanding);
                  return (
                    <div key={s} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{w.name}</span>
                        <span className="font-mono text-sm font-bold text-amber-400">{r.totalAR}</span>
                      </div>
                      <div className="mt-1 flex gap-1.5 text-[10px] text-zinc-600">
                        {r.phys > 0 && <span>Phys {r.phys}</span>}
                        {r.magic > 0 && <span>Mag {r.magic}</span>}
                        {r.fire > 0 && <span>Fire {r.fire}</span>}
                        {r.lightning > 0 && <span>Lit {r.lightning}</span>}
                        {r.holy > 0 && <span>Holy {r.holy}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        <div className="min-w-0 flex flex-col" style={{ minHeight: "calc(100vh - 180px)" }}>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search weapons..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#c9a227]/40" />
            </div>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] px-3 py-2 text-xs text-zinc-400 outline-none focus:border-[#c9a227]/40">
              <option value="all">All Types</option>
              {WEAPON_CATEGORY_NAMES.map((t) => <option key={t} value={t}>{TYPE_NAME_MAP[t] || t}</option>)}
            </select>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={showCheckedOnly} onChange={(e) => setShowCheckedOnly(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500/30" />
              <span className="text-xs text-zinc-500">Checked only</span>
            </label>
          </div>

          <div className="overflow-y-auto rounded-sm border border-[#b8956a]/10" style={{ maxHeight: "calc(100vh - 220px)" }}>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#b8956a]/10 bg-[#0a0a0f] text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  <th className="py-3 pl-3 text-left w-8"></th>
                  <th className="py-3 pr-3 text-left">Weapon</th>
                  <th className="py-3 pr-3 text-right">Total AR</th>
                  <th className="py-3 pr-3 text-right">Phys</th>
                  <th className="py-3 pr-3 text-right">Mag</th>
                  <th className="py-3 pr-3 text-right">Fire</th>
                  <th className="py-3 pr-3 text-right">Light</th>
                  <th className="py-3 pr-3 text-right">Holy</th>
                  <th className="py-3 pr-3 text-right">Scaling</th>
                  <th className="py-3 pr-3 text-right">Req</th>
                </tr>
              </thead>
              <tbody>
                {filteredWeapons.map((s) => (
                  <WeaponRow key={s} slug={s} stats={stats} upgradeLevel={upgradeLevel} twoHanding={twoHanding} checked={checkedSlugs.has(s)} onToggle={() => toggleWeapon(s)} />
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-zinc-700">
            Showing {filteredWeapons.length} of {ALL_WEAPON_SLUGS.length} weapons. &middot; Check weapons to compare &middot; Adjust stats and upgrade level in the sidebar.
          </p>
        </div>
      </div>
    </div>

    {/* SEO Content */}
    <div className="mx-auto max-w-4xl px-4 py-16 border-t border-[#b8956a]/10">

      <section className="pt-12">
        <h2 className="text-2xl font-bold text-white">What Is the Elden Ring Weapon AR Calculator?</h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          The Elden Ring Weapon AR Calculator is a free online tool that shows you the Attack Rating (AR) for every
          weapon in the game. AR represents a weapon&apos;s raw damage output before enemy defenses, damage negation,
          and absorption. By adjusting your character&apos;s stats, upgrade level, and two-handing status, you can
          instantly see how much physical, magic, fire, lightning, and holy damage each weapon deals. This makes
          it easy to compare weapons side by side and find the best option for your build without respeccing
          in-game. It uses game-accurate formulas including correct scaling curves, soft caps, and upgrade
          multipliers for all 123 weapons.
        </p>
      </section>

      <section className="mt-12 border-t border-[#b8956a]/10 pt-12">
        <h2 className="text-2xl font-bold text-white">How Does Weapon Scaling Work?</h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          Each weapon in Elden Ring has scaling values for Strength (STR), Dexterity (DEX), Intelligence (INT),
          Faith (FAI), and Arcane (ARC). The scaling letter grade (S/A/B/C/D/E) tells you how much bonus damage you
          get from that stat. S scaling gives the highest bonus (up to 175% at 99), E the lowest. When you level up
          a stat, the weapon&apos;s AR increases based on its scaling coefficient for that stat. Two-handing
          multiplies your STR by 1.5x, which can significantly boost damage for STR-scaling weapons and even let
          you meet strength requirements with fewer points invested. The calculator applies all these formulas in
          real time using the same data mined from the game files.
        </p>
      </section>

      <section className="mt-12 border-t border-[#b8956a]/10 pt-12">
        <h2 className="text-2xl font-bold text-white">How to Use This Tool</h2>
        <ol className="mt-6 space-y-4">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/30 text-sm font-bold text-[#e8d5a3]">1</span>
            <div><h3 className="font-semibold text-white">Adjust Your Stats</h3><p className="mt-1 text-sm leading-relaxed text-zinc-400">Use the sliders in the sidebar to set STR, DEX, INT, FAI, and ARC from 1 to 99. Each stat shows a progress bar with color-coded soft cap tiers.</p></div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/30 text-sm font-bold text-[#e8d5a3]">2</span>
            <div><h3 className="font-semibold text-white">Set Upgrade Level</h3><p className="mt-1 text-sm leading-relaxed text-zinc-400">Choose from +0 to +25 using the slider. The weapon&apos;s base damage and scaling both improve with each upgrade level.</p></div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/30 text-sm font-bold text-[#e8d5a3]">3</span>
            <div><h3 className="font-semibold text-white">Two-Handing Toggle</h3><p className="mt-1 text-sm leading-relaxed text-zinc-400">Toggle two-handing to see how STR ×1.5 affects your AR. This is especially useful for weapons with high STR scaling.</p></div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/30 text-sm font-bold text-[#e8d5a3]">4</span>
            <div><h3 className="font-semibold text-white">Search, Filter & Compare</h3><p className="mt-1 text-sm leading-relaxed text-zinc-400">Search by weapon name, filter by weapon type, or use Quick Presets for common builds. Check weapons to compare their AR side by side in the sidebar.</p></div>
          </li>
        </ol>
      </section>

      <section className="mt-12 border-t border-[#b8956a]/10 pt-12">
        <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {[
            { q: "What is Attack Rating (AR) in Elden Ring?", a: "Attack Rating (AR) is a weapon's raw damage output before enemy defenses are applied. It combines base damage, scaling bonuses from stats, and upgrade level. AR is shown split by damage type: Physical, Magic, Fire, Lightning, and Holy. The actual damage dealt to an enemy will be lower after their damage negation and absorption are applied." },
            { q: "How does the AR Calculator calculate damage?", a: "The calculator uses the same formulas as Elden Ring. For each damage type, it takes the weapon's base damage at the selected upgrade level, then adds a scaling bonus based on the relevant stat(s) and the weapon's scaling letter grade. It uses correct soft cap mechanics where returns diminish past certain stat thresholds (20, 55, 80). Two-handing correctly multiplies Strength by 1.5 before calculating STR scaling." },
            { q: "What does the scaling letter grade (S/A/B/C/D/E) mean?", a: "The letter grade indicates how much bonus damage a weapon gets from a stat. S is the highest (strongest scaling), followed by A, B, C, D, and E (weakest). The exact multiplier depends on the stat value and soft cap tier. For example, a weapon with S scaling in STR at 99 STR will get roughly 175% of the base damage as bonus, while E scaling might only give 25%." },
            { q: "Why does two-handing increase my AR?", a: "Two-handing a weapon multiplies your effective Strength by 1.5. If you have 60 STR, two-handing treats it as 90 STR for damage calculation. This not only increases AR for weapons with STR scaling but also lets you meet strength requirements you normally couldn't. It does not affect Dexterity, Intelligence, Faith, or Arcane scaling." },
            { q: "Is AR the same as actual damage?", a: "No. AR is the weapon's raw damage output before enemy defenses. Actual damage dealt to an enemy is AR multiplied by damage type-specific multipliers based on the enemy's damage negation and absorption. For example, a boss with high Holy resistance will take much less Holy damage than the AR suggests. However, AR is still the best metric for comparing weapons against each other." },
            { q: "How many weapons does this tool support?", a: "The calculator includes all 123 weapons from Elden Ring covering all weapon types: straight swords, greatswords, colossal swords, katanas, curved swords, daggers, spears, hammers, great hammers, axes, claws, fists, whips, thrusting swords, twinblades, bows, ballistas, and more." },
            { q: "Can I use this as an Elden Ring damage calculator?", a: "Yes. While this tool shows Attack Rating (AR) rather than actual damage dealt to enemies, AR is the most reliable way to compare weapons against each other. You can compare any two weapons side by side by selecting them in the weapon list — the Comparison section shows their AR split by damage type." },
            { q: "How much does two-handing increase damage?", a: "Two-handing increases your effective Strength by 50% (×1.5). For example, at 66 STR, two-handing gives you 99 effective STR, which is the soft cap for STR scaling. The actual AR increase depends on the weapon's STR scaling grade — weapons with S or A scaling in STR get the biggest boost." },
          ].map(function(item, i) { return (
            <details key={i} className="group rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f]">
              <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-[#e8d5a3]">
                {item.q}
                <svg className="h-4 w-4 shrink-0 text-zinc-600 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="border-t border-[#b8956a]/10 px-4 py-3"><p className="text-sm leading-relaxed text-zinc-400">{item.a}</p></div>
            </details>
          );})}
        </div>
      </section>

      <section className="mt-12 border-t border-[#b8956a]/10 pt-12">
        <h2 className="text-xl font-bold text-white">Related Guides</h2>

        {/* Weapon Guides */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Weapon Guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { title: "Moonveil Katana Guide", href: "/elden-ring/weapons/moonveil-katana-explained" },
              { title: "Blasphemous Blade Guide", href: "/elden-ring/weapons/blasphemous-blade-explained" },
              { title: "Dark Moon Greatsword Guide", href: "/elden-ring/weapons/dark-moon-greatsword-explained" },
              { title: "River of Blood Guide", href: "/elden-ring/weapons/rivers-of-blood-explained" },
              { title: "Nagakiba Guide", href: "/elden-ring/weapons/nagakiba-explained" },
              { title: "Bleed Explained", href: "/elden-ring/weapons/bleed-explained" },
              { title: "All Elden Ring Weapons", href: "/elden-ring/weapons" },
            ].map(function(link) { return (
              <a key={link.href} href={link.href}
                className="rounded-sm border border-[#c9a227]/20 bg-[#0a0a0f] px-3 py-1.5 text-xs font-medium text-[#e8d5a3] transition-all hover:border-[#c9a227]/40 hover:bg-[#12121a]">
                {link.title}
              </a>
            );})}
          </div>
        </div>

        {/* Stat Guides */}
        <div className="mt-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Stat & Build Guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { title: "Soft Caps Explained", href: "/elden-ring/weapons/soft-caps-explained" },
              { title: "Weapon Scaling Guide", href: "/elden-ring/walkthroughs/weapon-scaling-guide" },
              { title: "Best Starting Class Guide", href: "/elden-ring/walkthroughs/best-starting-class-guide" },
              { title: "Elden Ring Build Calculator", href: "/elden-ring/tools/build-calculator" },
              { title: "Best Dexterity Build", href: "/elden-ring/builds/best-dexterity-build" },
              { title: "Poise Explained", href: "/elden-ring/walkthroughs/poise-explained" },
              { title: "Status Effects Explained", href: "/elden-ring/weapons/status-effects-explained" },
            ].map(function(link) { return (
              <a key={link.href} href={link.href}
                className="rounded-sm border border-[#c9a227]/20 bg-[#0a0a0f] px-3 py-1.5 text-xs font-medium text-[#e8d5a3] transition-all hover:border-[#c9a227]/40 hover:bg-[#12121a]">
                {link.title}
              </a>
            );})}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
