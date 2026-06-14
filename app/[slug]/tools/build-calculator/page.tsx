"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_WEAPONS, ALL_WEAPON_SLUGS, WEAPON_CATEGORY_NAMES } from "@/lib/build-calculator/weapons";
import { STARTING_CLASSES } from "@/lib/build-calculator/classes";
import { calculateBuild, calculateDamage, type BuildStats, type BuildInput, type WeaponARResult } from "@/lib/build-calculator/engine";
import {
  ARMOR_PIECES,
  ARMOR_PIECE_BY_ID,
  ALL_TALISMANS_LIST,
  ALL_TALISMANS_RECORD,
  ALL_SPELLS_LIST,
  ALL_SPELLS_RECORD,
  EMPTY_PIECES,
  SOFT_CAP_DEFS,
  type ArmorSlot,
  type ArmorPiece,
  type Talisman,
  type Spell,
} from "@/lib/build-calculator/equipment";

// ─── Types ───

const STAT_KEYS = ["vigor","mind","endurance","strength","dexterity","intelligence","faith","arcane"] as const;
type StatKey = (typeof STAT_KEYS)[number];

const STAT_INFO: Record<StatKey, { label: string; short: string; icon: string }> = {
  vigor: { label: "Vigor", short: "VIG", icon: "❤️" },
  mind: { label: "Mind", short: "MND", icon: "💧" },
  endurance: { label: "Endurance", short: "END", icon: "⚡" },
  strength: { label: "Strength", short: "STR", icon: "💪" },
  dexterity: { label: "Dexterity", short: "DEX", icon: "🗡️" },
  intelligence: { label: "Intelligence", short: "INT", icon: "🔮" },
  faith: { label: "Faith", short: "FTH", icon: "✨" },
  arcane: { label: "Arcane", short: "ARC", icon: "🩸" },
};

// Soft cap map for bar colors
const SOFT_CAP_BY_KEY: Record<string, number[]> = {};
for (const def of SOFT_CAP_DEFS) {
  SOFT_CAP_BY_KEY[def.key] = def.caps;
}

interface PopularBuild {
  name: string;
  description: string;
  class: string;
  stats: Partial<BuildStats>;
  weapons: string[];
  armor: Record<string, string>;
  talismans: string[];
  spells: string[];
  upgradeLevel: number;
  twoHanding: boolean;
}

const POPULAR_BUILDS: PopularBuild[] = [
  {
    name: "Bleed Build",
    description: "Dual-wield katanas with high Arcane for massive bleed buildup. Devastating vs most bosses.",
    class: "samurai",
    stats: {vigor:50,mind:15,endurance:30,strength:14,dexterity:50,intelligence:9,faith:9,arcane:60},
    weapons: ["rivers-of-blood", "uchigatana", "moonveil"],
    armor: {helm:"white-mask",chest:"raptors-black-feathers",arms:"samurai-arm",legs:"samurai-legs"},
    talismans: ["lord-of-bloods-exultation", "shard-of-alexander", "millicents-prosthesis", "rotten-winged-sword-insignia"],
    spells: [],
    upgradeLevel: 25,
    twoHanding: false,
  },
  {
    name: "Moonveil Intelligence Build",
    description: "Moonveil katana + spells hybrid. High INT for weapon art damage and powerful sorceries.",
    class: "prisoner",
    stats: {vigor:45,mind:25,endurance:20,strength:12,dexterity:25,intelligence:80,faith:9,arcane:8},
    weapons: ["moonveil", "carian-regal-scepter", "dark-moon-greatsword"],
    armor: {helm:"lukas-helm",chest:"lukas-armor",arms:"lukas-gauntlets",legs:"lukas-greaves"},
    talismans: ["shard-of-alexander", "magic-scorpion-charm", "graven-school-talisman", "erdtrees-favor-plus-1"],
    spells: ["carian-slicer", "adulas-moonblade", "night-comet", "terra-magica", "great-glintstone-shard"],
    upgradeLevel: 25,
    twoHanding: false,
  },
  {
    name: "Strength Greatsword Build",
    description: "Pure STR with colossal greatsword. Stagger enemies with charged heavies and jump attacks.",
    class: "vagabond",
    stats: {vigor:60,mind:10,endurance:35,strength:80,dexterity:13,intelligence:9,faith:9,arcane:7},
    weapons: ["greatsword", "giants-crusher", "claymore"],
    armor: {helm:"bull-goat-helm",chest:"bull-goat-armor",arms:"bull-goat-gauntlets",legs:"bull-goat-greaves"},
    talismans: ["shard-of-alexander", "erdtrees-favor-plus-1", "great-jars-arsenal", "claw-talisman"],
    spells: [],
    upgradeLevel: 25,
    twoHanding: true,
  },
  {
    name: "Faith Blasphemous Blade",
    description: "Blasphemous Blade weapon art heals on kill. Fire damage + Faith scaling. Great for PvE.",
    class: "confessor",
    stats: {vigor:55,mind:20,endurance:30,strength:22,dexterity:15,intelligence:9,faith:60,arcane:7},
    weapons: ["blasphemous-blade", "sacred-relic-sword", "godslayers-seal"],
    armor: {helm:"radahn-helm",chest:"radahn-armor",arms:"radahn-gauntlets",legs:"radahn-greaves"},
    talismans: ["shard-of-alexander", "erdtrees-favor-plus-1", "fire-scorpion-charm", "carian-filigreed-crest"],
    spells: ["golden-vow", "flame-grant-me-strength", "black-flame"],
    upgradeLevel: 25,
    twoHanding: false,
  },
  {
    name: "Quality Build",
    description: "Equal STR/DEX for maximum weapon flexibility. Use almost any weapon effectively.",
    class: "vagabond",
    stats: {vigor:55,mind:15,endurance:35,strength:60,dexterity:60,intelligence:9,faith:9,arcane:7},
    weapons: ["claymore", "zweihander", "bastard-sword"],
    armor: {helm:"knights-helm",chest:"knights-armor",arms:"knights-gauntlets",legs:"knights-greaves"},
    talismans: ["erdtrees-favor-plus-1", "great-jars-arsenal", "claw-talisman", "green-turtle-talisman"],
    spells: [],
    upgradeLevel: 25,
    twoHanding: false,
  },
  {
    name: "Pure Mage",
    description: "Glass cannon INT build. One-shot enemies with Comet Azur + Terra Magica combo.",
    class: "astrologer",
    stats: {vigor:40,mind:60,endurance:20,strength:12,dexterity:12,intelligence:80,faith:9,arcane:9},
    weapons: ["carian-regal-scepter", "moonveil", "lorettas-greatbow"],
    armor: {helm:"queens-crescent-crown",chest:"astrologer-robe",arms:"astrologer-gloves",legs:"astrologer-trousers"},
    talismans: ["graven-school-talisman", "magic-scorpion-charm", "radagons-icon", "erdtrees-favor-plus-1"],
    spells: ["comet-azur", "terra-magica", "stars-of-ruin", "carian-slicer", "adulas-moonblade", "rennalas-full-moon"],
    upgradeLevel: 25,
    twoHanding: false,
  },
];

const CLASS_NAMES = Object.keys(STARTING_CLASSES).sort();

const CI: Record<string,string> = {
  Dagger:"🗡️", "Straight Sword":"⚔️", Greatsword:"⚔️", "Colossal Sword":"🗡️",
  "Curved Sword":"🗡️", "Curved Greatsword":"⚔️", Katana:"⚔️", Twinblade:"⚔️",
  "Thrusting Sword":"🗡️", "Heavy Thrusting Sword":"🗡️", Axe:"🪓", Greataxe:"🪓",
  Hammer:"🔨", "Great Hammer":"🔨", Flail:"⛓️", Fist:"✊", Claw:"🦅",
  Whip:"🪢", Spear:"🔱", "Great Spear":"🔱", Halberd:"🔱", Reaper:"🪶",
  "Light Bow":"🏹", Bow:"🏹", "Glintstone Staff":"🪬", "Sacred Seal":"✨", Torch:"🔥"
};

const ARMOR_SLOTS: ArmorSlot[] = ["helm", "chest", "arms", "legs"];
const ARMOR_SLOT_LABELS: Record<ArmorSlot, string> = {
  helm: "Helm", chest: "Chest", arms: "Arms", legs: "Legs",
};

// ─── Sub-components ───

function Section({title,children,className=""}:{title:string;children:React.ReactNode;className?:string}) {
  return (
    <div className={`rounded-lg border border-gray-800 bg-gray-900/60 p-4 ${className}`}>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
      {children}
    </div>
  );
}

function StatCard({label,value,color,sub}:{label:string;value:number|string;color:string;sub?:string}) {
  return (
    <div className="rounded bg-gray-800/60 px-3 py-2.5 text-center">
      <div className={"text-2xl font-bold "+color}>{value}</div>
      <div className="text-[10px] text-gray-500">{label}</div>
      {sub && <div className="text-[9px] text-gray-600 mt-0.5">{sub}</div>}
    </div>
  );
}

function StatRow({stat,value,onChange,minVal}:{stat:StatKey;value:number;onChange:(v:number)=>void;minVal:number}) {
  const info = STAT_INFO[stat];
  const caps = SOFT_CAP_BY_KEY[stat] || [];
  const canDec = value > minVal;
  const canInc = value < 99;

  // Bar color: green → blue → yellow → purple based on soft caps
  let barColor = "bg-green-500";
  if (caps.length > 0) {
    if (caps[3] && value >= caps[3]) barColor = "bg-purple-500";
    else if (caps[2] && value >= caps[2]) barColor = "bg-purple-500";
    else if (caps[1] && value >= caps[1]) barColor = "bg-yellow-500";
    else if (caps[0] && value >= caps[0]) barColor = "bg-blue-500";
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => canDec && onChange(value - 1)}
        disabled={!canDec}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-gray-800 text-sm text-gray-400 transition hover:bg-gray-700 disabled:opacity-30"
      >−</button>
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-gray-200">
            <span className="mr-1">{info.icon}</span>{info.short}
          </span>
          <span className="tabular-nums font-bold text-yellow-400">{value}</span>
        </div>
        <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
          <div className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${(value / 99) * 100}%` }} />
        </div>
        <div className="mt-[1px] flex justify-between text-[9px] text-gray-600">
          {caps[0] ? <span>sc{caps[0]}</span> : <span />}
          {caps[1] ? <span>sc{caps[1]}</span> : <span />}
          {caps[2] ? <span>sc{caps[2]}</span> : <span />}
        </div>
      </div>
      <button
        onClick={() => canInc && onChange(value + 1)}
        disabled={!canInc}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-gray-800 text-sm text-gray-400 transition hover:bg-gray-700 disabled:opacity-30"
      >+</button>
    </div>
  );
}

// ─── Main Component ───



function StatRows({ stats, baseStats, onStatChange }: {
  stats: BuildStats;
  baseStats: BuildStats | undefined;
  onStatChange: (k: StatKey, v: number) => void;
}) {
  return (
    <>
      {(STAT_KEYS as readonly StatKey[]).map(function(k) {
        return (
          <StatRow key={k} stat={k} value={stats[k]} onChange={(v) => onStatChange(k, v)} minVal={baseStats ? baseStats[k] : 1} />
        );
      })}
    </>
  );
}

function ClassCards({ sc, onSelect }: { sc: string; onSelect: (n: string) => void }) {
  return (
    <>
      {CLASS_NAMES.map(function(n) {
        const cls = STARTING_CLASSES[n];
        const isActive = sc === n;
        return (
          <button key={n} onClick={() => onSelect(n)}
            className={`rounded border px-3 py-2 text-left text-xs transition ${
              isActive
                ? "border-yellow-600 bg-yellow-900/20 text-yellow-300"
                : "border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:text-gray-200"
            }`}>
            <div className="font-semibold">{cls.name}</div>
            <div className="mt-0.5 text-[10px] opacity-70">Lv {cls.runeLevel}</div>
          </button>
        );
      })}
    </>
  );
}

function SoftCapWarnings({ warnings }: { warnings: Array<{ type: string; message: string }> }) {
  return (
    <div className="space-y-1.5">
      {warnings.map(function(sw, i) { return (
        <div key={i}
          className={`rounded px-3 py-2 text-xs ${
            sw.type === "warning" ? "bg-yellow-900/20 text-yellow-300" :
            sw.type === "info" ? "bg-blue-900/20 text-blue-300" : "bg-green-900/20 text-green-300"
          }`}>
          {sw.message}
        </div>
      );})}
    </div>
  );
}

function WeaponCards({ weapons }: { weapons: Array<{ slug: string; name: string; type: string; meetsRequirements: boolean; missingStats: string[]; totalAR: number; physicalAR: number; elementalAR: number; detailedAR?: { phys: number; magic: number; fire: number; lightning: number; holy: number } }> }) {
  return (
    <div className="space-y-3">
      {weapons.map(function(w) { return (
        <WeaponCard key={w.slug} w={w} />
      );})}
    </div>
  );
}

function WeaponCard({ w }: { w: { slug: string; name: string; type: string; meetsRequirements: boolean; missingStats: string[]; totalAR: number; physicalAR: number; elementalAR: number; detailedAR?: { phys: number; magic: number; fire: number; lightning: number; holy: number } } }) {
  return (
    <div key={w.slug} className="rounded border border-gray-800 bg-gray-900/50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold text-gray-200">{w.name}</span>
        <span className="text-xs text-gray-500">{w.type}</span>
      </div>
      {!w.meetsRequirements && (
        <div className="mb-2 rounded bg-red-900/20 px-2 py-1 text-xs text-red-400">
          Missing: {w.missingStats.join(", ")}
        </div>
      )}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded bg-gray-800/50 px-2 py-1.5">
          <div className="text-lg font-bold text-white">{w.totalAR}</div>
          <div className="text-[10px] text-gray-500">Total AR</div>
        </div>
        <div className="rounded bg-gray-800/50 px-2 py-1.5">
          <div className="text-lg font-bold text-orange-300">{w.physicalAR}</div>
          <div className="text-[10px] text-gray-500">Physical</div>
        </div>
        <div className="rounded bg-gray-800/50 px-2 py-1.5">
          <div className="text-lg font-bold text-purple-300">{w.elementalAR}</div>
          <div className="text-[10px] text-gray-500">Elemental</div>
        </div>
      </div>
      {w.detailedAR && (
        <div className="mt-2 grid grid-cols-5 gap-1 text-center text-[10px]">
          <div><span className="text-orange-300">{w.detailedAR.phys}</span><span className="text-gray-600"> phys</span></div>
          <div><span className="text-blue-300">{w.detailedAR.magic}</span><span className="text-gray-600"> mag</span></div>
          <div><span className="text-red-300">{w.detailedAR.fire}</span><span className="text-gray-600"> fire</span></div>
          <div><span className="text-yellow-300">{w.detailedAR.lightning}</span><span className="text-gray-600"> ltn</span></div>
          <div><span className="text-gray-300">{w.detailedAR.holy}</span><span className="text-gray-600"> holy</span></div>
        </div>
      )}
    </div>
  );
}


function DamageCalculatorPanel({ weapons, stats, armorPieces, talismanIds }: {
  weapons: WeaponARResult[];
  stats: BuildStats;
  armorPieces: Partial<Record<string, ArmorPiece>>;
  talismanIds: string[];
}) {
  // Calculate base defense from stats
  const level = Object.values(stats).reduce((a, b) => a + b, 0) - 79;
  const base = Math.floor(80 + level * 0.5);
  const baseDefense = {
    physical: base,
    magic: base + Math.floor(stats.intelligence * 0.2),
    fire: base + Math.floor(stats.faith * 0.2),
    lightning: base + Math.floor(stats.dexterity * 0.2),
    holy: base + Math.floor(stats.faith * 0.15),
  };

  // Approximate negation (no armor data yet)
  const negation = { phys: 0, magic: 0, fire: 0, lightning: 0, holy: 0 };

  const allResults = weapons.map(w => {
    if (!w.detailedAR) return { weapon: w.name, damages: [] };
    return {
      weapon: w.name,
      damages: calculateDamage(w.detailedAR, negation, baseDefense),
    };
  });

  return (
    <Section title="Damage Calculator">
      <div className="text-xs text-gray-400 mb-3">
        Estimated damage vs base defenses. Actual damage varies by enemy.
      </div>
      {allResults.map(function(result, wi) { return (
        <div key={wi} className="mb-3 last:mb-0">
          <div className="text-sm font-semibold text-gray-200 mb-1.5">{result.weapon}</div>
          {result.damages.length === 0 ? (
            <div className="text-xs text-gray-500">No damage data</div>
          ) : (
            <div className="space-y-1">
              {result.damages.map(function(d, di) { return (
                <div key={di} className="flex items-center justify-between rounded bg-gray-800/40 px-3 py-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-200">{d.damageType}</span>
                    <span className="text-gray-500">{d.rawAR} AR</span>
                  </div>
                  <span className="font-bold text-green-400">{d.finalDamage}</span>
                </div>
              );})}
              <div className="flex items-center justify-between rounded bg-gray-800/60 px-3 py-1.5 text-sm font-bold">
                <span className="text-gray-300">Total</span>
                <span className="text-green-400">
                  {result.damages.reduce((a, d) => a + d.finalDamage, 0)}
                </span>
              </div>
            </div>
          )}
        </div>
      );})}
    </Section>
  );
}

export default function EldenRingBuildCalculator() {
  const [sc, setSc] = useState("vagabond");
  const [stats, setStats] = useState<BuildStats>({vigor:30,mind:12,endurance:20,strength:16,dexterity:14,intelligence:10,faith:10,arcane:8});
  const [selWeapons, setSelWeapons] = useState<string[]>([]);
  const [twoHanding, setTwoHanding] = useState(false);
  const [upgradeLevel, setUpgradeLevel] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedPieces, setSelectedPieces] = useState<Partial<Record<ArmorSlot, ArmorPiece>>>({});
  const [selectedTalismans, setSelectedTalismans] = useState<string[]>([]);
  const [selectedSpells, setSelectedSpells] = useState<string[]>([]);
  const [buildName, setBuildName] = useState("");
  const [showTalismanPicker, setShowTalismanPicker] = useState(false);
  const [talismanPickerSlot, setTalismanPickerSlot] = useState(0);
  const [showSpellPicker, setShowSpellPicker] = useState(false);
  const [showWeaponPicker, setShowWeaponPicker] = useState(false);
  const [weaponPickerSlot, setWeaponPickerSlot] = useState(0);

  const updateStat = (k: StatKey, v: number) => setStats(p => ({ ...p, [k]: Math.max(1, Math.min(99, v)) }));
  const toggleWeapon = (slug: string) => setSelWeapons(p => p.includes(slug) ? p.filter(x => x !== slug) : [...p, slug].slice(0, 4));
  const applyPopularBuild = useCallback((build: PopularBuild) => {
    if (build.stats) setStats(prev => ({ ...prev, ...build.stats }));
    setSc(build.class);
    setSelWeapons(build.weapons || []);
    setUpgradeLevel(build.upgradeLevel || 15);
    setTwoHanding(build.twoHanding || false);
    setBuildName(build.name);
    // Armor
    const pieces: Partial<Record<ArmorSlot, ArmorPiece>> = {};
    if (build.armor) {
      for (const [slot, id] of Object.entries(build.armor)) {
        if (ARMOR_PIECE_BY_ID[id]) pieces[slot as ArmorSlot] = ARMOR_PIECE_BY_ID[id];
      }
    }
    setSelectedPieces(pieces);
    // Talismans
    setSelectedTalismans(build.talismans || []);
    // Spells
    setSelectedSpells(build.spells || []);
  }, []);

  const toggleSpell = (id: string) => {
    setSelectedSpells(p => p.includes(id) ? p.filter(x => x !== id) : p.length >= 12 ? p : [...p, id]);
  };

  const toggleTalisman = (id: string) => {
    setSelectedTalismans(p => p.includes(id) ? p.filter(x => x !== id) : p.length >= 4 ? p : [...p, id]);
  };

  const setArmorPiece = (slot: ArmorSlot, piece: ArmorPiece) => {
    setSelectedPieces(p => ({ ...p, [slot]: piece }));
  };

  // Build input for engine
  const buildInput: BuildInput = {
    startingClass: sc,
    stats,
    selectedWeapons: selWeapons,
    twoHanding,
    upgradeLevel,
  };

  const buildOutput = useMemo(() => {
    try { return calculateBuild(buildInput); }
    catch { return null; }
  }, [buildInput]);

  // Calculate total equip load from armor + talismans
  const totalArmorWeight = useMemo(() => {
    let w = 0;
    for (const slot of ARMOR_SLOTS) {
      const p = selectedPieces[slot];
      if (p) w += p.weight;
    }
    return w;
  }, [selectedPieces]);

  const totalTalismanWeight = useMemo(() => {
    let w = 0;
    for (const id of selectedTalismans) {
      const t = ALL_TALISMANS_RECORD[id];
      if (t) w += t.weight;
    }
    return w;
  }, [selectedTalismans]);

  const totalWeaponWeight = useMemo(() => {
    let w = 0;
    for (const slug of selWeapons) {
      const wp = ALL_WEAPONS[slug];
      if (wp) w += wp.weight;
    }
    return w;
  }, [selWeapons]);

  const totalEquipLoad = totalArmorWeight + totalTalismanWeight + totalWeaponWeight;

  // Weapon filter
  const filteredWeapons = useMemo(
    () => ALL_WEAPON_SLUGS.filter(slug => {
      const w = ALL_WEAPONS[slug];
      if (categoryFilter !== "all" && w.type !== categoryFilter) return false;
      if (searchQuery) return w.name.toLowerCase().includes(searchQuery.toLowerCase());
      return true;
    }),
    [categoryFilter, searchQuery]
  );

  const startClass = STARTING_CLASSES[sc];
  const baseStats = startClass?.stats;

  // ─── URL Share ───
  const searchParams = useSearchParams();

  useEffect(() => {
    const encoded = searchParams.get("b");
    if (!encoded) return;
    try {
      const json = JSON.parse(atob(encoded));
      if (json.bn !== undefined) setBuildName(json.bn);
      if (json.sc) setSc(json.sc);
      if (json.s) setStats(json.s);
      if (json.w) setSelWeapons(json.w);
      if (json.ul !== undefined) setUpgradeLevel(json.ul);
      if (json.th !== undefined) setTwoHanding(json.th);
      if (json.ap) {
        const pieces: Partial<Record<ArmorSlot, ArmorPiece>> = {};
        for (const slot of ARMOR_SLOTS) {
          const pid = json.ap[slot];
          if (pid && ARMOR_PIECE_BY_ID[pid]) pieces[slot] = ARMOR_PIECE_BY_ID[pid];
        }
        setSelectedPieces(pieces);
      }
      if (json.tl) setSelectedTalismans(json.tl);
      if (json.spl) setSelectedSpells(json.spl);
    } catch {}
  }, []);

  const [buildUrl, setBuildUrl] = useState("");
  useEffect(() => {
    const data = {
      bn: buildName, sc, s: stats, w: selWeapons, ul: upgradeLevel, th: twoHanding,
      ap: Object.fromEntries(ARMOR_SLOTS.map(s => [s, selectedPieces[s]?.id || null])),
      tl: selectedTalismans,
      spl: selectedSpells,
    };
    const b64 = btoa(JSON.stringify(data));
    setBuildUrl(window.location.origin + window.location.pathname + "?b=" + b64);
  }, [sc, stats, selWeapons, upgradeLevel, twoHanding, selectedPieces, selectedTalismans]);

  const [copied, setCopied] = useState(false);
  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(buildUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [buildUrl]);

  // JSON-LD SEO
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "calc-jsonld";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          name: "Elden Ring Build Calculator",
          description: "Plan and optimize Elden Ring character builds. Real-time stat calculations, weapon AR comparisons, and soft cap analysis.",
          url: "https://zosygo.com/elden-ring/tools/build-calculator",
          applicationCategory: "GameApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0" },
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How does the Elden Ring Build Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Select your starting class, adjust stats (1-99), choose up to 3 weapons with upgrade levels, and see real-time HP, FP, Stamina, equip load, and Attack Rating results." } },
            { "@type": "Question", name: "What weapons are supported?", acceptedAnswer: { "@type": "Answer", text: "The calculator supports 123 weapons including straight swords, greatswords, katanas, curved swords, spears, hammers, axes, daggers, and more." } },
            { "@type": "Question", name: "Can I share my build?", acceptedAnswer: { "@type": "Answer", text: "Yes. Click the Copy Build URL button to generate a shareable link with your build encoded in the URL." } },
          ],
        },
      ],
    });
    document.head.appendChild(script);
    return () => { const el = document.getElementById("calc-jsonld"); if (el) el.remove(); };
  }, []);

  // ─── RENDER ───
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-yellow-400">Elden Ring Build Calculator{buildName ? <span className="ml-2 text-lg font-normal text-gray-400">— {buildName}</span> : ""}</h1>
          <p className="mt-1 text-gray-400">Plan stats, pick weapons and armor, see exact Attack Rating.</p>
        </div>

        {/* Popular Builds */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-yellow-400">Popular Builds</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_BUILDS.map(function(build) { return (
              <button key={build.name} onClick={function() { applyPopularBuild(build); }}
                className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-900/20">
                {/* Theme color accent bar */}
                <div className={"absolute top-0 left-0 right-0 h-1 " + (
                  build.name === "Bleed Build" ? "bg-red-500" :
                  build.name === "Moonveil Intelligence Build" ? "bg-blue-500" :
                  build.name === "Strength Greatsword Build" ? "bg-orange-500" :
                  build.name === "Faith Blasphemous Blade" ? "bg-amber-500" :
                  build.name === "Quality Build" ? "bg-teal-500" :
                  "bg-purple-500"
                )}></div>
                {/* Icon + Name */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-100 group-hover:text-yellow-300 transition-colors">{build.name}</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-gray-500 line-clamp-2">{build.description}</p>
                  </div>
                  <span className="ml-3 text-2xl shrink-0">
                    {build.name === "Bleed Build" ? "\ud83d\udde1\ufe0f" :
                     build.name === "Moonveil Intelligence Build" ? "\ud83d\udd2e" :
                     build.name === "Strength Greatsword Build" ? "\ud83d\udc8a" :
                     build.name === "Faith Blasphemous Blade" ? "\u2728" :
                     build.name === "Quality Build" ? "\u2694\ufe0f" :
                     "\ud83e\uddd9"}
                  </span>
                </div>
                {/* Class + Level tag */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-full border border-gray-700 bg-gray-800/80 px-2.5 py-0.5 text-[10px] font-medium text-gray-400 capitalize">{build.class}</span>
                  {function() {
                    var total = 0;
                    if (build.stats) {
                      for (var k of Object.keys(build.stats)) { total += (build.stats as any)[k]; }
                    }
                    var rl = total - 79;
                    return <span className="rounded-full bg-yellow-900/30 px-2.5 py-0.5 text-[10px] font-medium text-yellow-400">RL {rl}</span>;
                  }()}
                </div>
                {/* Weapon preview chips */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {build.weapons.slice(0, 3).map(function(w) {
                    var wp = ALL_WEAPONS[w];
                    return wp ? <span key={w} className="rounded-md border border-gray-700/60 bg-gray-800/60 px-2 py-0.5 text-[10px] font-medium text-gray-300">{wp.name}</span> : null;
                  })}
                  {build.weapons.length > 3 ? <span className="rounded-md border border-gray-700/40 bg-gray-800/40 px-2 py-0.5 text-[10px] text-gray-500">+{build.weapons.length - 3}</span> : null}
                </div>
                {/* Key stats mini display */}
                {function() {
                  var s = build.stats;
                  var parts = [];
                  if (!s) return null;
                  if (s.vigor && s.vigor >= 40) parts.push("VIG " + s.vigor);
                  if (s.mind && s.mind >= 20) parts.push("MND " + s.mind);
                  if (s.endurance && s.endurance >= 25) parts.push("END " + s.endurance);
                  if (s.strength && s.strength >= 40) parts.push("STR " + s.strength);
                  if (s.dexterity && s.dexterity >= 40) parts.push("DEX " + s.dexterity);
                  if (s.intelligence && s.intelligence >= 40) parts.push("INT " + s.intelligence);
                  if (s.faith && s.faith >= 40) parts.push("FTH " + s.faith);
                  if (s.arcane && s.arcane >= 40) parts.push("ARC " + s.arcane);
                  return parts.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {parts.map(function(p, i) { return (
                        <span key={i} className="rounded-full bg-gray-800/60 px-2 py-0.5 text-[9px] font-bold text-yellow-500">{p}</span>
                      );})}
                    </div>
                  ) : null;
                }()}
                {/* Hover arrow indicator */}
                <div className="absolute bottom-3 right-3 text-xs text-yellow-600 opacity-0 transition-opacity group-hover:opacity-100">Load Build \u2192</div>
              </button>
            );})}
          </div>
        </div>
        {/* Build Name */}
        <div className="mb-4">
          <input type="text" value={buildName} onChange={e => setBuildName(e.target.value)}
            placeholder="Build name..."
            className="w-full max-w-xs rounded border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-yellow-600 focus:outline-none" />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</span>
            <button onClick={copyUrl}
              className="rounded border border-blue-700/30 bg-blue-900/10 px-3 py-1.5 text-xs text-blue-300 hover:bg-blue-900/30">{copied ? "Copied!" : "Share Build"}</button>
            <button onClick={function() {
              const url = prompt("Paste a build URL or code to load:");
              if (url) {
                try {
                  var b64 = url.includes("?b=") ? url.split("?b=")[1].split("&")[0] : url;
                  var json = JSON.parse(atob(b64));
                  if (json.sc) setSc(json.sc);
                  if (json.s) setStats(json.s);
                  if (json.w) setSelWeapons(json.w);
                  if (json.ul !== undefined) setUpgradeLevel(json.ul);
                  if (json.th !== undefined) setTwoHanding(json.th);
                  if (json.ap) {
                    var pieces: Partial<Record<ArmorSlot, ArmorPiece>> = {};
                    for (const slot of ARMOR_SLOTS) {
                      var pid = json.ap[slot];
                      if (pid && ARMOR_PIECE_BY_ID[pid]) pieces[slot] = ARMOR_PIECE_BY_ID[pid];
                    }
                    setSelectedPieces(pieces);
                  }
                  if (json.tl) setSelectedTalismans(json.tl);
                  if (json.spl) setSelectedSpells(json.spl);
                  if (json.bn) setBuildName(json.bn);
                } catch { alert("Invalid build code"); }
              }
            }}
              className="rounded border border-green-700/30 bg-green-900/10 px-3 py-1.5 text-xs text-green-300 hover:bg-green-900/30">Load Build</button>
          </div>
        </div>

        {/* ────── MAIN GRID ────── */}
        <div className="grid gap-6 lg:grid-cols-12">

          {/* ═══ LEFT PANEL (4/12) ═══ */}
          <div className="lg:col-span-4 space-y-6">

            {/* Starting Class */}
            <Section title="Starting Class">
              <div className="grid grid-cols-2 gap-2">
                <ClassCards sc={sc} onSelect={setSc} />
              </div>
            </Section>

            {/* Attributes */}
            <Section title="Attributes">
              <div className="space-y-2.5">
                <StatRows stats={stats} baseStats={baseStats} onStatChange={updateStat} />
              </div>
              {buildOutput && (
                <div className="mt-3 rounded bg-gray-800/80 px-3 py-2 text-center text-sm">
                  <span className="text-gray-400">Rune Level </span>
                  <span className="text-2xl font-bold text-yellow-400">{buildOutput.runeLevel}</span>
                </div>
              )}
            </Section>

            {/* Upgrade Level */}
            <Section title={`Upgrade Level (+${upgradeLevel})`}>
              <input type="range" min={0} max={25} value={upgradeLevel}
                onChange={e => setUpgradeLevel(parseInt(e.target.value))}
                className="w-full h-1.5 appearance-none rounded bg-gray-700 accent-yellow-500 cursor-pointer" />
              <div className="mt-1 flex justify-between text-[10px] text-gray-500"><span>+0</span><span>+25</span></div>
              <label className="mt-2 flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={twoHanding} onChange={e => setTwoHanding(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-yellow-500" />
                <span className="text-xs text-gray-300">Two-handing (1.5x STR)</span>
              </label>
            </Section>

            {/* Weapons */}
            <Section title={`Weapons (${selWeapons.length}/4)`}>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search weapons..."
                className="w-full rounded bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-yellow-500" />
              <div className="mt-2 flex flex-wrap gap-1.5">
                <button onClick={() => setCategoryFilter("all")}
                  className={`rounded px-2 py-0.5 text-[10px] ${categoryFilter==="all" ? "bg-yellow-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>All</button>
                {WEAPON_CATEGORY_NAMES.map(function(c) { return (
                  <button key={c} onClick={() => setCategoryFilter(c)}
                    className={`rounded px-2 py-0.5 text-[10px] ${categoryFilter===c ? "bg-yellow-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
                    {CI[c]||"⚔️"} {c}
                  </button>
                );})}
              </div>
              <div className="mt-2 max-h-64 overflow-y-auto space-y-0.5 rounded border border-gray-800">
                {filteredWeapons.map(function(slug) {
                  const w = ALL_WEAPONS[slug];
                  const selected = selWeapons.includes(slug);
                  return (
                    <button key={slug} onClick={() => toggleWeapon(slug)}
                      disabled={!selected && selWeapons.length >= 4}
                      className={`flex w-full items-center justify-between px-3 py-1.5 text-xs transition ${
                        selected ? "bg-yellow-900/20 text-yellow-300" : "text-gray-400 hover:bg-gray-800"
                      } ${!selected && selWeapons.length >= 4 ? "opacity-40" : ""}`}>
                      <span className="truncate">{w.name}</span>
                      <span className="ml-2 shrink-0 text-[10px] text-gray-500">{w.somber ? "🌟" : "🔧"} {w.type}</span>
                    </button>
                  );
                })}
                {filteredWeapons.length === 0 && <div className="p-3 text-center text-xs text-gray-500">No weapons found</div>}
              </div>
            </Section>

            {/* Armor (by slot) */}
            <Section title="Armor">
              {ARMOR_SLOTS.map(function(slot) { return (
                <div key={slot} className="mb-3 last:mb-0">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">{ARMOR_SLOT_LABELS[slot]}</span>
                    <span className="text-[10px] text-gray-500">
                      {selectedPieces[slot] ? `${selectedPieces[slot]!.weight}wt / ${selectedPieces[slot]!.poise} poise` : "None"}
                    </span>
                  </div>
                  <select
                    value={selectedPieces[slot]?.id || ""}
                    onChange={e => {
                      if (!e.target.value) {
                        setSelectedPieces(p => { const n = {...p}; delete n[slot]; return n; });
                      } else {
                        const piece = ARMOR_PIECE_BY_ID[e.target.value];
                        if (piece) setArmorPiece(slot, piece);
                      }
                    }}
                    className="w-full rounded bg-gray-800 px-3 py-1.5 text-xs text-gray-200"
                  >
                    <option value="">None</option>
                    {ARMOR_PIECES[slot].map(function(p) { return (
                      <option key={p.id} value={p.id}>{p.name} ({p.weight}wt)</option>
                    );})}
                  </select>
                </div>
              );})}
            </Section>

            {/* Talismans */}
            <Section title={`Talismans (${selectedTalismans.length}/4)`}>
              <div className="grid grid-cols-2 gap-1.5">
                {ALL_TALISMANS_LIST.map(function(t) {
                  const selected = selectedTalismans.includes(t.id);
                  return (
                    <button key={t.id} onClick={() => toggleTalisman(t.id)}
                      disabled={!selected && selectedTalismans.length >= 4}
                      className={`rounded border px-2 py-1.5 text-left text-xs transition ${
                        selected
                          ? "border-yellow-700 bg-yellow-900/20 text-yellow-300"
                          : "border-gray-800 text-gray-400 hover:border-gray-600"
                      } ${!selected && selectedTalismans.length >= 4 ? "opacity-40" : ""}`}>
                      <div className="truncate font-medium">{t.name}</div>
                      <div className="text-[9px] text-gray-500">{t.weight}wt</div>
                    </button>
                  );
                })}
              </div>
            </Section>
            {/* Spells (12 slots) */}
            <Section title={"Spells (" + selectedSpells.length + "/12)"}>
              <div className="grid grid-cols-4 gap-1">
                {[0,1,2,3,4,5,6,7,8,9,10,11].map(function(i) {
                  var spellId: string | undefined = selectedSpells[i];
                  var spell: (typeof ALL_SPELLS_RECORD)[string] | null = spellId ? ALL_SPELLS_RECORD[spellId] : null;
                  return (
                    <button key={i}
                      onClick={function() {
                        if (spellId) {
                          setSelectedSpells(function(p) { return p.filter(function(x) { return x !== spellId; }); });
                        }
                      }}
                      className={"rounded border px-1 py-2 text-center text-[10px] transition " + (spell
                        ? "border-purple-700 bg-purple-900/20 text-purple-300"
                        : "border-gray-800 text-gray-500 hover:border-gray-600")}>
                      {spell ? (
                        <>
                          <div className="truncate font-medium">{spell.name}</div>
                          <div className="text-[8px] text-gray-500">{spell.cost}FP</div>
                        </>
                      ) : (
                        <span className="text-gray-600">Empty</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Spell picker */}
              <div className="mt-2 max-h-48 overflow-y-auto space-y-0.5 rounded border border-gray-800">
                {ALL_SPELLS_LIST.map(function(s) {
                  var selected = selectedSpells.includes(s.id);
                  return (
                    <button key={s.id} onClick={function() { toggleSpell(s.id); }}
                      disabled={!selected && selectedSpells.length >= 12}
                      className={"flex w-full items-center justify-between px-3 py-1.5 text-xs transition " + (selected ? "bg-purple-900/20 text-purple-300" : "text-gray-400 hover:bg-gray-800") + (!selected && selectedSpells.length >= 12 ? " opacity-40" : "")}>
                      <span className="truncate">{s.name}</span>
                      <span className="ml-2 shrink-0 text-[10px] text-gray-500">{s.type === "Sorcery" ? "\ud83d\udd2e" : "\u2728"} {s.cost}FP</span>
                    </button>
                  );
                })}
              </div>
            </Section>

          </div>

          {/* ═══ RIGHT PANEL (8/12) ═══ */}
          <div className="lg:col-span-8 space-y-6">

            {buildOutput ? (
              <>
                {/* Vital Stats */}
                <Section title="Vital Stats">
                  <div className="grid grid-cols-4 gap-3">
                    <StatCard label="HP" value={buildOutput.totalHP} color="text-red-400" />
                    <StatCard label="FP" value={buildOutput.totalFP} color="text-blue-400" />
                    <StatCard label="Stamina" value={buildOutput.totalStamina} color="text-green-400" />
                    <StatCard label="Rune Level" value={buildOutput.runeLevel} color="text-yellow-400" />
                  </div>
                </Section>

                {/* Equip Load */}
                <Section title="Equip Load">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{totalEquipLoad.toFixed(1)} total weight</span>
                    <span className={`text-xs font-medium ${
                      totalEquipLoad <= stats.endurance * 1.5 * 0.3 ? "text-green-400" : 
                      totalEquipLoad <= stats.endurance * 1.5 * 0.7 ? "text-yellow-400" : "text-red-400"
                    }`}>
                      {totalEquipLoad <= stats.endurance * 1.5 * 0.3 ? "Light Roll" :
                       totalEquipLoad <= stats.endurance * 1.5 * 0.7 ? "Medium Roll" : "Heavy Roll"}
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-800">
                    <div className={`h-full rounded-full transition-all duration-300 ${
                      totalEquipLoad <= stats.endurance * 1.5 * 0.3 ? "bg-green-500" :
                      totalEquipLoad <= stats.endurance * 1.5 * 0.7 ? "bg-yellow-500" : "bg-red-500"
                    }`} style={{ width: `${Math.min(100, (totalEquipLoad / (stats.endurance * 1.5)) * 100)}%` }} />
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div><span className="text-green-400">Light</span> ≤ {(stats.endurance * 1.5 * 0.3).toFixed(1)}</div>
                    <div><span className="text-yellow-400">Medium</span> ≤ {(stats.endurance * 1.5 * 0.7).toFixed(1)}</div>
                    <div><span className="text-red-400">Heavy</span> ≤ {(stats.endurance * 1.5).toFixed(1)}</div>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-gray-500">
                    <div>Armor: {totalArmorWeight.toFixed(1)}</div>
                    <div>Weapons: {totalWeaponWeight.toFixed(1)}</div>
                    <div>Talismans: {totalTalismanWeight.toFixed(1)}</div>
                  </div>
                </Section>

                {/* Build Type */}
                <Section title={buildName ? `Build Summary — ${buildName}` : "Build Summary"}>
                  <div className="rounded bg-yellow-900/10 border border-yellow-700/20 px-4 py-3 text-center">
                    <span className="text-xl font-bold text-yellow-300">{buildOutput.buildType}</span>
                    {!buildOutput.isViable && (
                      <div className="mt-2 text-sm text-orange-400">⚠️ Weapon requirements not met</div>
                    )}
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                    <StatCard label="VIG" value={stats.vigor} color="text-red-300" />
                    <StatCard label="MND" value={stats.mind} color="text-blue-300" />
                    <StatCard label="END" value={stats.endurance} color="text-green-300" />
                    <StatCard label="Total" value={STAT_KEYS.reduce((a,k) => a + stats[k], 0)} color="text-gray-300" />
                  </div>
                </Section>

                {/* Weapon AR */}
                <Section title="Weapon Attack Rating">
                  {buildOutput.weapons.length === 0 ? (
                    <div className="text-center text-sm text-gray-500">Select weapons from the left panel</div>
                  ) : (
                    <WeaponCards weapons={buildOutput.weapons} />
                    )}
                  </Section>

                {/* Damage Calculator */}
                {buildOutput.weapons.length > 0 && buildOutput.weapons[0].detailedAR && (
                  <DamageCalculatorPanel
                    weapons={buildOutput.weapons}
                    stats={stats}
                    armorPieces={selectedPieces}
                    talismanIds={selectedTalismans}
                  />
                )}
                {/* Soft Cap Analysis */}
                  <Section title="Soft Cap Analysis">
                    <div className="space-y-1.5">
                      <SoftCapWarnings warnings={buildOutput.softCapWarnings} />
                    </div>
                  </Section>
              </>
            ) : (
              <Section title="Build Output">
                <div className="text-center py-12 text-sm text-gray-500">
                  Adjust your stats to see build results
                </div>
              </Section>
            )}

          </div>
        </div>
      </div>

      {/* ────── SEO CONTENT ────── */}
      <div className="mx-auto max-w-4xl px-4 py-16 border-t border-gray-800">
        <section className="pt-8">
          <h2 className="text-2xl font-bold text-white">What Is the Elden Ring Build Calculator?</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-400">
            The Elden Ring Build Calculator is a free online tool that lets you plan and optimize your character build.
            It uses game-accurate formulas for stat calculations, weapon scaling, and equip load so you can experiment
            without respeccing in-game. Supports all 10 starting classes, 123 weapons, and proper soft cap mechanics.
          </p>
        </section>

        {/* Talisman Picker Modal */}
        {showTalismanPicker ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={function() { setShowTalismanPicker(false); }}>
            <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-2xl" onClick={function(e) { e.stopPropagation(); }}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-200">Select Talisman — Slot {talismanPickerSlot + 1}</h3>
                <button onClick={function() { setShowTalismanPicker(false); }} className="text-xs text-gray-500 hover:text-gray-300">Close</button>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {ALL_TALISMANS_LIST.map(function(t, i) {
                  var selected = selectedTalismans.includes(t.name);
                  return (
                    <button key={i} onClick={function() {
                      var newTals = [...selectedTalismans];
                      newTals[talismanPickerSlot] = t.name;
                      setSelectedTalismans(newTals);
                      setShowTalismanPicker(false);
                    }}
                      className={"flex items-center gap-3 rounded-lg px-3 py-2 text-left text-xs transition " + (selected ? "bg-yellow-900/20 text-yellow-300" : "text-gray-400 hover:bg-gray-800/80")}>
                      <span className="text-yellow-500">{t.name}</span>
                      {selected ? <span className="ml-auto text-[10px] text-yellow-500">selected</span> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {/* Spell Picker Modal */}
        {showSpellPicker ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={function() { setShowSpellPicker(false); }}>
            <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-2xl" onClick={function(e) { e.stopPropagation(); }}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-200">Select Spells ({selectedSpells.length}/12)</h3>
                <button onClick={function() { setShowSpellPicker(false); }} className="text-xs text-gray-500 hover:text-gray-300">Done</button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {ALL_SPELLS_LIST.map(function(sp) {
                  var selected = selectedSpells.includes(sp.id);
                  return (
                    <button key={sp.id} onClick={function() {
                      var newSpells = selectedSpells.filter(function(x) { return x !== sp.id; });
                      if (!selected && newSpells.length < 12) newSpells.push(sp.id);
                      setSelectedSpells(newSpells);
                    }}
                      className={"flex items-center justify-between rounded-lg px-3 py-2 text-xs transition " + (selected ? "bg-purple-900/20 text-purple-300" : "text-gray-400 hover:bg-gray-800/80")}>
                      <span className="truncate">{sp.name}</span>
                      <span className="ml-2 shrink-0 text-[10px] text-gray-500">{sp.type === "Sorcery" ? "\ud83d\udd2e" : "\u2728"} {sp.cost}FP</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {/* Weapon Picker Modal */}
        {showWeaponPicker ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={function() { setShowWeaponPicker(false); }}>
            <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-2xl" onClick={function(e) { e.stopPropagation(); }}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-200">Select Weapon — Slot {weaponPickerSlot + 1}</h3>
                <button onClick={function() { setShowWeaponPicker(false); }} className="text-xs text-gray-500 hover:text-gray-300">Close</button>
              </div>
              <input type="text" value={searchQuery} onChange={function(e) { setSearchQuery(e.target.value); }}
                placeholder="Search weapons..."
                className="mb-3 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-xs text-gray-200 placeholder-gray-500 outline-none focus:border-yellow-600" />
              <div className="max-h-[50vh] space-y-0.5 overflow-y-auto">
                {ALL_WEAPON_SLUGS.filter(function(k) {
                  var w = ALL_WEAPONS[k];
                  if (!w) return false;
                  if (categoryFilter !== "all" && w.type !== categoryFilter) return false;
                  return searchQuery === "" || w.name.toLowerCase().includes(searchQuery.toLowerCase());
                }).map(function(k) {
                  var w = ALL_WEAPONS[k];
                  var selected = selWeapons.includes(k);
                  return (
                    <button key={k} onClick={function() {
                      var newW = [...selWeapons];
                      // If same weapon tapped, clear it
                      if (newW[weaponPickerSlot] === k) { newW[weaponPickerSlot] = ""; }
                      else { newW[weaponPickerSlot] = k; }
                      setSelWeapons(newW);
                      setShowWeaponPicker(false);
                    }}
                      className={"flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition " + (selected ? "bg-yellow-900/20 text-yellow-300" : "text-gray-400 hover:bg-gray-800/80")}>
                      <span className="truncate">{w.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        <section className="mt-12 border-t border-gray-800 pt-12">
          <h2 className="text-2xl font-bold text-white">How To Use This Calculator</h2>
          <ol className="mt-6 space-y-4">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-900/30 text-sm font-bold text-yellow-400">1</span>
              <div><h3 className="font-semibold text-white">Choose a Starting Class</h3><p className="mt-1 text-sm leading-relaxed text-gray-400">Select from Vagabond, Warrior, Hero, Bandit, Astrologer, Prophet, Samurai, Prisoner, Confessor, or Wretch.</p></div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-900/30 text-sm font-bold text-yellow-400">2</span>
              <div><h3 className="font-semibold text-white">Set Your Attributes</h3><p className="mt-1 text-sm leading-relaxed text-gray-400">Use the +/- buttons to allocate Vigor, Mind, Endurance, Strength, Dexterity, Intelligence, Faith, and Arcane from 1 to 99. The color-coded progress bars show soft cap tiers.</p></div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-900/30 text-sm font-bold text-yellow-400">3</span>
              <div><h3 className="font-semibold text-white">Select Weapons & Armor</h3><p className="mt-1 text-sm leading-relaxed text-gray-400">Pick up to 3 weapons, set upgrade levels, choose armor pieces by slot, and equip up to 4 talismans.</p></div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-900/30 text-sm font-bold text-yellow-400">4</span>
              <div><h3 className="font-semibold text-white">Review & Share</h3><p className="mt-1 text-sm leading-relaxed text-gray-400">See real-time HP, FP, Stamina, equip load, weapon AR, and share your build via URL.</p></div>
            </li>
          </ol>
        </section>

        <section className="mt-12 border-t border-gray-800 pt-12">
          <h2 className="text-2xl font-bold text-white">Recommended Builds</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a href="/elden-ring/builds/elden-ring-pure-dex-bleed-build" className="group rounded-sm border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-yellow-700/30">
              <h3 className="font-semibold text-white group-hover:text-yellow-300">Pure Dexterity Bleed Build</h3>
              <p className="mt-1 text-sm text-gray-500">High DPS bleed build. 60 Vigor, 80 Dexterity, 60 Arcane.</p>
            </a>
            <a href="/elden-ring/builds/moonveil-intelligence-build" className="group rounded-sm border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-yellow-700/30">
              <h3 className="font-semibold text-white group-hover:text-yellow-300">Moonveil Intelligence Build</h3>
              <p className="mt-1 text-sm text-gray-500">Intelligence samurai build. 50 Vigor, 80 Intelligence, 20 Dexterity.</p>
            </a>
            <a href="/elden-ring/builds" className="group rounded-sm border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-yellow-700/30 sm:col-span-2">
              <h3 className="font-semibold text-white group-hover:text-yellow-300">All Elden Ring Builds →</h3>
              <p className="mt-1 text-sm text-gray-500">Browse all builds including Strength, Faith, Arcane, and hybrid builds.</p>
            </a>
          </div>
        </section>

        <section className="mt-12 border-t border-gray-800 pt-12">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {[
              { q: "How does the Elden Ring Build Calculator work?", a: "Select your starting class, adjust stats with +/- buttons, choose up to 3 weapons with upgrade levels, pick armor pieces and talismans, and see real-time HP, FP, Stamina, equip load, and Attack Rating results." },
              { q: "What weapons are supported?", a: "The calculator supports 123 weapons including straight swords, greatswords, katanas, curved swords, spears, hammers, axes, daggers, and more." },
              { q: "Is the stat calculation accurate to Elden Ring?", a: "Yes. HP, FP, Stamina, and equip load follow Elden Ring's actual in-game formulas. Weapon Attack Rating uses correct scaling curves and soft cap mechanics." },
              { q: "Can I share my build?", a: "Yes. Click the Copy Build URL button to generate a shareable link with your build encoded in the URL." },
              { q: "What is the best starting class?", a: "Vagabond is generally the best for most builds due to high Vigor and balanced stats. For pure casters, Astrologer or Prophet are better." },
            ].map(function(item, i) { return (
              <details key={i} className="group rounded-sm border border-gray-800 bg-gray-900/50">
                <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-yellow-300">
                  {item.q}
                  <svg className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="border-t border-gray-800 px-4 py-3"><p className="text-sm leading-relaxed text-gray-400">{item.a}</p></div>
              </details>
            );})}
          </div>
        </section>

        <section className="mt-12 border-t border-gray-800 pt-12">
          <h2 className="text-xl font-bold text-white">Related Guides</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { title: "Best Dexterity Build", href: "/elden-ring/builds/elden-ring-pure-dex-bleed-build" },
              { title: "Moonveil Intelligence Build", href: "/elden-ring/builds/moonveil-intelligence-build" },
              { title: "Elden Ring Builds", href: "/elden-ring/builds" },
              { title: "Elden Ring Bosses", href: "/elden-ring/bosses" },
              { title: "Elden Ring Weapons", href: "/elden-ring/weapons" },
              { title: "Elden Ring Tools", href: "/elden-ring/tools" },
            ].map(function(link) { return (
              <a key={link.href} href={link.href}
                className="rounded-sm border border-yellow-700/20 bg-gray-900/50 px-4 py-2.5 text-sm font-medium text-yellow-300 transition-all hover:border-yellow-600/40 hover:bg-gray-800">
                {link.title}
              </a>
            );})}
          </div>
        </section>
      </div>
    </div>
  );
}

