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
  getUpgradeScalingLetter,
  isStaffOrSeal,
  isBow,
  type WeaponEntry,
} from "@/lib/build-calculator/weapons";

type StatInputs = {
  str: number;
  dex: number;
  int: number;
  fai: number;
  arc: number;
}

type SortKey = "ar" | "phys" | "magic" | "name";

const SCALING_COLORS: Record<string, string> = {
  S: "text-red-400", A: "text-orange-400", B: "text-amber-400",
  C: "text-yellow-400", D: "text-zinc-500", E: "text-zinc-600",
};

const DEFAULT_STATS: StatInputs = {
  str: 40,
  dex: 40,
  int: 40,
  fai: 40,
  arc: 40,
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
          className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-amber-500 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(251,191,36,0.5)]"
          onTouchMove={function(e) { e.preventDefault(); }} />
      </div>
      <div className="flex flex-col gap-0.5">
        <button onClick={() => onChange(Math.min(value + 1, 99))} className="flex h-5 w-5 items-center justify-center rounded-sm bg-zinc-800 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white">+</button>
        <button onClick={() => onChange(Math.max(value - 1, 1))} className="flex h-5 w-5 items-center justify-center rounded-sm bg-zinc-800 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white">&minus;</button>
      </div>
    </div>
  );
}

function ScalingLabel({ weapon, attr }: {
  weapon: WeaponEntry; attr: string;
}) {
  const letter = getUpgradeScalingLetter(weapon, 0, attr);
  if (letter === "-") return null;
  return (
    <span className="text-[10px] leading-none">
      <span className="text-zinc-600">{attr.toUpperCase()}</span>{" "}
      <span className={`${SCALING_COLORS[letter] || "text-zinc-600"} font-medium`}>{letter}</span>
    </span>
  );
}

type WeaponRowResult = {
  slug: string;
  weapon: WeaponEntry;
  effectiveUpgrade: number;
  result: ReturnType<typeof calculateWeaponAR>;
  isCaster: boolean;
  isBowType: boolean;
};

function WeaponRow({ data, checked, onToggle }: {
  data: WeaponRowResult; checked: boolean; onToggle: () => void;
}) {
  const { weapon, effectiveUpgrade, result, isCaster, isBowType } = data;
  return (
    <tr className={`border-b border-white/5 transition-colors ${checked ? "bg-amber-500/5" : ""} hover:bg-white/[0.02]`}>
      <td className="py-2.5 pl-3"><input type="checkbox" checked={checked} onChange={onToggle} className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500/30" /></td>
      <td className="py-2.5 pr-3">
        <span className="text-sm font-medium text-white">{weapon.name}</span>
        <span className="ml-2 text-[10px] text-zinc-600">+{effectiveUpgrade}</span>
        <br />
        <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] uppercase text-zinc-500">{TYPE_NAME_MAP[weapon.type] || weapon.type}</span>
        {isCaster && <span className="ml-1.5 rounded bg-purple-900/30 px-1.5 py-0.5 text-[10px] text-purple-400">{weapon.type === "Glintstone Staff" ? "Sorcery Scaling" : "Incant Scaling"}</span>}
        {isBowType && <span className="ml-1.5 rounded bg-green-900/30 px-1.5 py-0.5 text-[10px] text-green-400">Bow</span>}
      </td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-300">
        {isCaster ? "—" : isBowType ? "—" : result.totalAR}
      </td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-500">{isCaster || isBowType ? "—" : (result.phys || "—")}</td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-500">{isCaster || isBowType ? "—" : (result.magic || "—")}</td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-500">{isCaster || isBowType ? "—" : (result.fire || "—")}</td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-500">{isCaster || isBowType ? "—" : (result.lightning || "—")}</td>
      <td className="py-2.5 pr-3 text-right font-mono text-sm text-zinc-500">{isCaster || isBowType ? "—" : (result.holy || "—")}</td>
      <td className="py-2.5 pr-3 text-right">
        <div className="flex flex-col items-end gap-0.5">
          {(["str","dex","int","fai","arc"] as const).map((s) => (
            <ScalingLabel key={s} weapon={weapon} attr={s} />
          ))}
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
  const [upgradeType, setUpgradeType] = useState<"normal" | "somber">("normal");
  const [upgradeLevel, setUpgradeLevel] = useState(25);
  const [twoHanding, setTwoHanding] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [checkedSlugs, setCheckedSlugs] = useState<Set<string>>(new Set());
  const [showCheckedOnly, setShowCheckedOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("ar");
  const [sortDesc, setSortDesc] = useState(true);

  const filteredWeapons = useMemo(() => {
    let list = ALL_WEAPON_SLUGS;
    if (selectedType !== "all") list = WEAPON_CATEGORIES[selectedType] || [];
    if (search) { const q = search.toLowerCase(); list = list.filter((s) => ALL_WEAPONS[s].name.toLowerCase().includes(q)); }
    if (showCheckedOnly) list = list.filter((s) => checkedSlugs.has(s));
    return list;
  }, [selectedType, search, showCheckedOnly, checkedSlugs]);

  const weaponRows = useMemo((): WeaponRowResult[] => {
    return filteredWeapons.map((s) => {
      const w = ALL_WEAPONS[s];
      const effUpg = upgradeType === "somber" ? (w.somber ? Math.min(upgradeLevel, 10) : 0) : (w.somber ? Math.min(upgradeLevel, 10) : Math.min(upgradeLevel, 25));
      const r = calculateWeaponAR(w, stats, effUpg, twoHanding);
      return {
        slug: s, weapon: w, effectiveUpgrade: effUpg, result: r,
        isCaster: isStaffOrSeal(w), isBowType: isBow(w),
      };
    });
  }, [filteredWeapons, stats, upgradeLevel, upgradeType, twoHanding]);

  const sortedRows = useMemo(() => {
    const rows = [...weaponRows];
    rows.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "ar") cmp = (a.result.totalAR || 0) - (b.result.totalAR || 0);
      else if (sortKey === "phys") cmp = (a.result.phys || 0) - (b.result.phys || 0);
      else if (sortKey === "magic") cmp = (a.result.magic || 0) - (b.result.magic || 0);
      else cmp = a.weapon.name.localeCompare(b.weapon.name);
      return sortDesc ? -cmp : cmp;
    });
    return rows;
  }, [weaponRows, sortKey, sortDesc]);


  const toggleWeapon = useCallback((s: string) => { setCheckedSlugs((prev) => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; }); }, []);
  const applyPreset = useCallback((s: StatInputs) => setStats(s), []);
  const comparedWeapons = useMemo(() => ALL_WEAPON_SLUGS.filter((s) => checkedSlugs.has(s)), [checkedSlugs]);



  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDesc(!sortDesc);
    else { setSortKey(key); setSortDesc(key !== "name"); }
  };
  const sortArrow = (key: SortKey) => sortKey === key ? (sortDesc ? " ↓" : " ↑") : "";



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

      <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-white">Elden Ring Weapon AR Calculator</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">Compare weapon Attack Rating, scaling, upgrades and infusions. Find the strongest weapon for your build with real-time AR calculations.</p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">

          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Stats</h2>
            <div className="space-y-3">
              {STAT_DEFS.map((d) => <StatSlider key={d.key} def={d} value={stats[d.key]} onChange={(v) => setStats((s) => ({ ...s, [d.key]: v }))} />)}
            </div>
          </div>

          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Effective Stats</h2>
            <div className="space-y-1.5">
              {STAT_DEFS.map((d) => {
                const k = d.key as keyof typeof stats;
                const effective = (k === "str" && twoHanding) ? Math.round(stats[k] * 1.5) : stats[k];
                const modifier = k === "str" && twoHanding ? " (×1.5)" : "";
                return (
                  <div key={d.key} className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{d.short}{modifier}</span>
                    <span className="font-mono text-xs font-bold text-[#e8d5a3]">{effective}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Upgrade Type</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="upgradeType" checked={upgradeType === "normal"} onChange={() => setUpgradeType("normal")}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500/30" />
                <span className="text-xs font-medium text-zinc-400">Normal <span className="text-zinc-600">(+0~+25)</span></span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="upgradeType" checked={upgradeType === "somber"} onChange={() => setUpgradeType("somber")}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500/30" />
                <span className="text-xs font-medium text-zinc-400">Somber <span className="text-zinc-600">(+0~+10, special weapons)</span></span>
              </label>
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-zinc-600">Normal weapons use Smithing Stones. Somber weapons use Somber Smithing Stones (legendary/unique weapons).</p>
          </div>

          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Upgrade Level</h2>
            <div className="flex items-center gap-3">
              <input type="range" min={0} max={upgradeType === "somber" ? 10 : 25} value={upgradeLevel}
                onChange={(e) => setUpgradeLevel(Math.min(Number(e.target.value), upgradeType === "somber" ? 10 : 25))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-amber-500 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400"
                onTouchMove={function(e) { e.preventDefault(); }} />
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
                  const effUpg = upgradeType === "somber" ? (w.somber ? Math.min(upgradeLevel, 10) : 0) : (w.somber ? Math.min(upgradeLevel, 10) : Math.min(upgradeLevel, 25));
                  const r = calculateWeaponAR(w, stats, effUpg, twoHanding);
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
                <tr className="border-b border-[#b8956a]/10 bg-[#0a0a0f] text-[10px] font-semibold uppercase tracking-wider text-zinc-500 sticky top-0 z-10">
                  <th className="py-3 pl-3 text-left w-8"></th>
                  <th className="py-3 pr-3 text-left">Weapon</th>
                  <th className="py-3 pr-3 text-right cursor-pointer hover:text-zinc-300" onClick={() => toggleSort("ar")}>Total AR{sortArrow("ar")}</th>
                  <th className="py-3 pr-3 text-right cursor-pointer hover:text-zinc-300" onClick={() => toggleSort("phys")}>Phys{sortArrow("phys")}</th>
                  <th className="py-3 pr-3 text-right cursor-pointer hover:text-zinc-300" onClick={() => toggleSort("magic")}>Mag{sortArrow("magic")}</th>
                  <th className="py-3 pr-3 text-right">Fire</th>
                  <th className="py-3 pr-3 text-right">Light</th>
                  <th className="py-3 pr-3 text-right">Holy</th>
                  <th className="py-3 pr-3 text-right">Scaling</th>
                  <th className="py-3 pr-3 text-right">Req</th>
                </tr>
              </thead>
              <tbody>
                {sortedRows.map((data) => (
                  <WeaponRow key={data.slug} data={data} checked={checkedSlugs.has(data.slug)} onToggle={() => toggleWeapon(data.slug)} />
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-zinc-700">
            Showing {sortedRows.length} of {ALL_WEAPON_SLUGS.length} weapons. &middot; Check weapons to compare &middot; Adjust stats and upgrade level in the sidebar.
          </p>
        </div>
      </div>
    </div>

    {/* SEO Content */}
    <div className="mx-auto max-w-4xl px-4 py-16 border-t border-[#b8956a]/10">

      <section className="pt-12">
        <h2 className="text-2xl font-bold text-white">What Is the Elden Ring Weapon AR Calculator?</h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          The <strong>Elden Ring Weapon AR Calculator</strong> is a free tool that helps players compare weapon damage and optimize their Attack Rating (AR). Test different Strength, Dexterity, Intelligence, Faith, and Arcane setups to find the highest-performing weapons for your build.
        </p>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          The tool calculates weapon AR using Elden Ring&apos;s actual scaling mechanics, including:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-400">
          <li>Weapon base damage</li>
          <li>Stat scaling bonuses</li>
          <li>Upgrade levels (+0 to +25)</li>
          <li>Smithing Stone upgrades</li>
          <li>Two-handed Strength bonuses</li>
          <li>Soft cap diminishing returns</li>
        </ul>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          Instead of guessing which weapon is stronger, you can instantly compare weapons and find the best option for your character level and playstyle.
        </p>
      </section>

            <section className="mt-12 border-t border-[#b8956a]/10 pt-12">
        <h2 className="text-2xl font-bold text-white">How To Use the Elden Ring Weapon AR Calculator</h2>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white">1. Adjust Your Character Stats</h3>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            Set your:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-400">
            <li>Strength (STR)</li>
            <li>Dexterity (DEX)</li>
            <li>Intelligence (INT)</li>
            <li>Faith (FAI)</li>
            <li>Arcane (ARC)</li>
          </ul>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            Each stat affects weapon damage differently depending on the weapon&apos;s scaling.
          </p>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            For example:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-400">
            <li>Greatswords usually benefit from Strength</li>
            <li>Katanas often scale with Dexterity</li>
            <li>Sorcery weapons benefit from Intelligence</li>
            <li>Bleed weapons often benefit from Arcane</li>
          </ul>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            The calculator automatically applies Elden Ring soft cap mechanics to show realistic damage gains.
          </p>
        </div>

        <hr className="my-6 border-[#b8956a]/10" />

        <div>
          <h3 className="text-lg font-semibold text-white">2. Select Weapon Upgrade Level</h3>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            Choose the weapon upgrade level:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-400">
            <li>Normal weapons: +0 to +25</li>
            <li>Special weapons: +0 to +10</li>
          </ul>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            Higher upgrade levels increase:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-400">
            <li>Base weapon damage</li>
            <li>Scaling effectiveness</li>
            <li>Final Attack Rating</li>
          </ul>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            Always compare weapons at the same upgrade level for accurate results.
          </p>
        </div>

        <hr className="my-6 border-[#b8956a]/10" />

        <div>
          <h3 className="text-lg font-semibold text-white">3. Enable Two-Handing</h3>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            Turn on the two-handed option to see how Strength affects weapon damage.
          </p>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            Two-handing increases effective Strength by 1.5x.
          </p>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            Example:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-400">
            <li>60 STR → 90 effective STR</li>
            <li>66 STR → 99 effective STR</li>
          </ul>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            This is especially powerful for:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-400">
            <li>Colossal weapons</li>
            <li>Great hammers</li>
            <li>Heavy greatswords</li>
            <li>Strength-focused builds</li>
          </ul>
        </div>

        <hr className="my-6 border-[#b8956a]/10" />

        <div>
          <h3 className="text-lg font-semibold text-white">4. Search and Compare Weapons</h3>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            Use filters to find weapons by:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-400">
            <li>Weapon name</li>
            <li>Weapon type</li>
            <li>Damage type</li>
            <li>Scaling attributes</li>
          </ul>
          <p className="mt-2 text-base leading-relaxed text-zinc-400">
            Compare multiple weapons side by side to find:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-400">
            <li>Highest AR weapon</li>
            <li>Best scaling weapon</li>
            <li>Best weapon for your build</li>
          </ul>
        </div>
      </section>



<section className="mt-12 border-t border-[#b8956a]/10 pt-12">
        <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {[
            { q: "What Is Attack Rating (AR) in Elden Ring?", a: "Attack Rating (AR) is a weapon&apos;s total damage value before enemy defenses are applied.<br/><br/>AR includes:<br/>- Base weapon damage<br/>- Upgrade level bonuses<br/>- Strength scaling<br/>- Dexterity scaling<br/>- Intelligence scaling<br/>- Faith scaling<br/>- Arcane scaling<br/><br/>A weapon with higher AR does not always deal more real damage because enemy defenses and damage types affect the final result." },
            { q: "How Does the Elden Ring Weapon AR Calculator Work?", a: "The calculator uses Elden Ring weapon scaling formulas to estimate Attack Rating.<br/><br/>The calculation considers:<br/>- Weapon base damage<br/>- Upgrade level<br/>- Scaling coefficients<br/>- Stat values<br/>- Soft cap reductions<br/>- Two-handed Strength bonus<br/><br/>This allows you to test different builds without wasting upgrade materials." },
            { q: "What Does Weapon Scaling Mean?", a: "Weapon scaling shows how much bonus damage a weapon receives from your attributes.<br/><br/>Scaling grades:<br/>- S = Excellent scaling<br/>- A = Very strong scaling<br/>- B = Good scaling<br/>- C = Average scaling<br/>- D = Weak scaling<br/>- E = Minimal scaling<br/><br/>A weapon with high Strength scaling benefits from STR investment, while a weapon with high Intelligence scaling benefits from INT." },
            { q: "Why Does Two-Handing Increase Weapon Damage?", a: "Two-handing increases your effective Strength by 50%.<br/><br/>For example:<br/>A character with 60 Strength becomes 90 effective Strength while two-handing.<br/><br/>This increases AR on Strength-scaling weapons but does not affect Dexterity, Intelligence, Faith, or Arcane scaling." },
            { q: "Is AR the Same as Actual Damage?", a: "No.<br/><br/>AR represents your weapon&apos;s raw damage before enemy defenses.<br/><br/>Actual damage depends on:<br/>- Enemy resistance<br/>- Damage type<br/>- Armor absorption<br/>- Boss weaknesses<br/><br/>For example, a weapon with high Holy AR may perform poorly against enemies with strong Holy resistance.<br/><br/>However, AR remains one of the best ways to compare weapon performance." },
            { q: "How Many Weapons Does This Tool Support?", a: "The calculator supports <strong>123 Elden Ring weapons</strong>, including:<br/>- Greatswords<br/>- Colossal swords<br/>- Katanas<br/>- Curved swords<br/>- Spears<br/>- Daggers<br/>- Axes<br/>- Hammers<br/>- Twinblades<br/>- Claws<br/>- Fists<br/>- Whips<br/>- Bows<br/>- And more" },
            { q: "Can This Be Used as an Elden Ring Damage Calculator?", a: "Yes.<br/><br/>The tool works as an Elden Ring damage comparison calculator by showing weapon Attack Rating under different stat setups.<br/><br/>Use it to compare:<br/>- Different weapons<br/>- Different builds<br/>- Different upgrade levels<br/>- Different stat distributions<br/><br/>For exact boss damage, enemy defense and damage modifiers must also be considered." },
            { q: "Why Is My Weapon Damage Low?", a: "Common reasons include:<br/><br/><strong>1. Wrong Stat Investment</strong><br/>A Strength weapon with high STR scaling will perform poorly if you invest mostly into Dexterity.<br/><br/><strong>2. Weapon Upgrade Is Too Low</strong><br/>Upgrade level has a huge impact on final AR.<br/><br/><strong>3. Ignoring Scaling</strong><br/>A weapon with lower base damage but better scaling can outperform a stronger-looking weapon later.<br/><br/><strong>4. Poor Stat Efficiency</strong><br/>Investing beyond soft caps often gives smaller damage increases." },
          ].map(function(item, i) { return (
            <details key={i} className="group rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f]">
              <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-[#e8d5a3]">
                {item.q}
                <svg className="h-4 w-4 shrink-0 text-zinc-600 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="border-t border-[#b8956a]/10 px-4 py-3"><p className="text-sm leading-relaxed text-zinc-400" dangerouslySetInnerHTML={{__html: item.a}} /></div>
            </details>
          );})}
        </div>
      </section>

      <section className="mt-12 border-t border-[#b8956a]/10 pt-12">
        <h2 className="text-2xl font-bold text-white">Weapon Scaling Guide</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h3 className="font-semibold text-white">Strength Weapons</h3>
            <p className="mt-2 text-sm text-zinc-400">Best stats:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-zinc-400">
              <li>STR</li>
              <li>END</li>
              <li>VIG</li>
            </ul>
            <p className="mt-2 text-sm text-zinc-400">Examples:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-zinc-400">
              <li>Greatsword</li>
              <li>Giant-Crusher</li>
              <li>Ruins Greatsword</li>
            </ul>
          </div>

          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h3 className="font-semibold text-white">Dexterity Weapons</h3>
            <p className="mt-2 text-sm text-zinc-400">Best stats:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-zinc-400">
              <li>DEX</li>
              <li>VIG</li>
              <li>END</li>
            </ul>
            <p className="mt-2 text-sm text-zinc-400">Examples:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-zinc-400">
              <li>Uchigatana</li>
              <li>Nagakiba</li>
              <li>Hand of Malenia</li>
            </ul>
          </div>

          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h3 className="font-semibold text-white">Intelligence Weapons</h3>
            <p className="mt-2 text-sm text-zinc-400">Best stats:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-zinc-400">
              <li>INT</li>
              <li>DEX</li>
              <li>MND</li>
            </ul>
            <p className="mt-2 text-sm text-zinc-400">Examples:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-zinc-400">
              <li>Moonveil</li>
              <li>Dark Moon Greatsword</li>
              <li>Wing of Astel</li>
            </ul>
          </div>

          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h3 className="font-semibold text-white">Faith Weapons</h3>
            <p className="mt-2 text-sm text-zinc-400">Best stats:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-zinc-400">
              <li>FTH</li>
              <li>STR/DEX depending on weapon</li>
            </ul>
            <p className="mt-2 text-sm text-zinc-400">Examples:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-zinc-400">
              <li>Blasphemous Blade</li>
              <li>Sacred Relic Sword</li>
            </ul>
          </div>

          <div className="rounded-sm border border-[#b8956a]/15 bg-[#0a0a0f] p-4">
            <h3 className="font-semibold text-white">Arcane Weapons</h3>
            <p className="mt-2 text-sm text-zinc-400">Best stats:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-zinc-400">
              <li>ARC</li>
              <li>DEX</li>
            </ul>
            <p className="mt-2 text-sm text-zinc-400">Examples:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-zinc-400">
              <li>Rivers of Blood</li>
              <li>Eleonora&apos;s Poleblade</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12 border-t border-[#b8956a]/10 pt-12">
        <div className="rounded-sm border border-[#c9a227]/20 bg-gradient-to-r from-[#0a0a0f] to-[#1a1508] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Optimize Your Complete Character</h3>
              <p className="mt-1 text-sm text-zinc-400">Plan stats, weapons, armor, talismans, and spells with real-time calculations.</p>
            </div>
            <a href="/elden-ring/tools/build-calculator"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-6 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all hover:scale-[1.02]">
              Elden Ring Build Planner →
            </a>
          </div>
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
              { title: "Elden Ring Build Planner", href: "/elden-ring/tools/build-calculator" },
              { title: "Rune Level Calculator", href: "/elden-ring/tools/rune-level-calculator" },
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
