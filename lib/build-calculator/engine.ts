// Elden Ring build calculation engine
// Uses game-accurate formulas from regulation data

import { ALL_WEAPONS, calculateWeaponAR, type WeaponEntry } from "./weapons";
import { STARTING_CLASSES, type StartingClass } from "./classes";

export interface BuildStats {
  vigor: number;
  mind: number;
  endurance: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  faith: number;
  arcane: number;
}

export interface BuildInput {
  startingClass: string;
  stats: BuildStats;
  selectedWeapons: string[];
  twoHanding: boolean;
  upgradeLevel: number;
}

export interface WeaponARResult {
  slug: string;
  name: string;
  type: string;
  totalAR: number;
  physicalAR: number;
  elementalAR: number;
  meetsRequirements: boolean;
  missingStats: string[];
}

export interface SoftCapInfo {
  stat: string;
  current: number;
  nextSoftCap: number;
  message: string;
  type: "warning" | "info" | "success";
}

export interface Suggestion {
  type: "stat" | "weapon" | "build";
  message: string;
  priority: "high" | "medium" | "low";
}

export interface BuildOutput {
  runeLevel: number;
  totalHP: number;
  totalFP: number;
  totalStamina: number;
  equipLoad: {
    current: number;
    maxLight: number;
    maxMedium: number;
    maxHeavy: number;
    rollType: "light" | "medium" | "heavy";
  };
  weapons: WeaponARResult[];
  buildType: string;
  softCapWarnings: SoftCapInfo[];
  suggestions: Suggestion[];
  isViable: boolean;
}

// ─── HP Formula (game-accurate) ───

function calculateHP(vigor: number): number {
  if (vigor <= 25) return 300 + 30 * vigor;
  if (vigor <= 40) return Math.floor(1050 + 19 * (vigor - 25));
  if (vigor <= 60) return Math.floor(1335 + 12.5 * (vigor - 40));
  if (vigor <= 99) return Math.floor(1585 + 3 * (vigor - 60));
  return 300 + 30 * vigor;
}

// ─── FP Formula (game-accurate) ───

function calculateFP(mind: number): number {
  if (mind <= 15) return 50 + 6 * mind;
  if (mind <= 35) return Math.floor(140 + 6.7 * (mind - 15));
  if (mind <= 60) return Math.floor(274 + 3.4 * (mind - 35));
  if (mind <= 99) return Math.floor(359 + 1.2 * (mind - 60));
  return 50 + 6 * mind;
}

// ─── Stamina Formula (game-accurate) ───

function calculateStamina(endurance: number): number {
  if (endurance <= 30) return 80 + 2.5 * endurance;
  if (endurance <= 50) return Math.floor(155 + 1.5 * (endurance - 30));
  if (endurance <= 99) return Math.floor(185 + 0.5 * (endurance - 50));
  return 80 + 2.5 * endurance;
}

// ─── Equip Load ───

function calculateEquipLoad(endurance: number) {
  let maxLoad: number;
  if (endurance <= 30) maxLoad = 30 + 1.5 * endurance;
  else if (endurance <= 60) maxLoad = 75 + 1.0 * (endurance - 30);
  else maxLoad = 105 + 0.5 * (endurance - 60);

  return {
    maxLight: maxLoad * 0.3,
    maxMedium: maxLoad * 0.7,
    maxHeavy: maxLoad,
    maxLoad,
  };
}

function getRollType(weight: number, maxLoad: number): "light" | "medium" | "heavy" {
  const ratio = weight / maxLoad;
  if (ratio <= 0.3) return "light";
  if (ratio <= 0.7) return "medium";
  return "heavy";
}

// ─── Build Type Detection ───

function detectBuildType(stats: BuildStats, weaponResults: WeaponARResult[]): string {
  const damageStats: [string, number][] = ([
    ["strength", stats.strength],
    ["dexterity", stats.dexterity],
    ["intelligence", stats.intelligence],
    ["faith", stats.faith],
    ["arcane", stats.arcane],
  ] as [string, number][]).sort(([, a], [, b]) => b - a);

  const [primary, secondary] = damageStats;

  if (primary[1] >= 60) {
    if (primary[0] === "intelligence") return "Pure Mage Build";
    if (primary[0] === "faith") return "Faith Caster Build";
    if (primary[0] === "dexterity") return "Pure Dex Build";
    if (primary[0] === "strength") return "Pure Strength Build";
    if (primary[0] === "arcane") return "Arcane Build";
  }

  if (primary[1] >= 40 && secondary[1] >= 30) {
    if (primary[0] === "dexterity" && secondary[0] === "strength") return "Quality Build (Dex/Str)";
    if (primary[0] === "intelligence" && secondary[0] === "dexterity") return "Spellblade Build (Int/Dex)";
    if (primary[0] === "faith" && secondary[0] === "strength") return "Paladin Build (Fth/Str)";
    if (primary[0] === "arcane" && secondary[0] === "dexterity") return "Bleed Build (Arc/Dex)";
  }

  if (primary[1] >= 30) return `${capitalize(primary[0])} Hybrid Build`;
  return "Balanced Build";
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── Soft Cap Warnings ───

const SOFT_CAPS: Record<string, { caps: number[]; label: string }> = {
  vigor: { caps: [40, 60], label: "Vigor" },
  mind: { caps: [35, 60], label: "Mind" },
  endurance: { caps: [30, 50], label: "Endurance" },
  strength: { caps: [55, 80], label: "Strength" },
  dexterity: { caps: [55, 80], label: "Dexterity" },
  intelligence: { caps: [55, 80], label: "Intelligence" },
  faith: { caps: [55, 80], label: "Faith" },
  arcane: { caps: [45, 60], label: "Arcane" },
};

function getSoftCapWarnings(stats: BuildStats): SoftCapInfo[] {
  const warnings: SoftCapInfo[] = [];
  const entries: [string, number][] = [
    ["vigor", stats.vigor],
    ["mind", stats.mind],
    ["endurance", stats.endurance],
    ["strength", stats.strength],
    ["dexterity", stats.dexterity],
    ["intelligence", stats.intelligence],
    ["faith", stats.faith],
    ["arcane", stats.arcane],
  ];

  for (const [stat, value] of entries) {
    const capInfo = SOFT_CAPS[stat];
    if (!capInfo) continue;

    for (const cap of capInfo.caps) {
      if (value < cap) {
        const diff = cap - value;
        if (diff <= 10) {
          warnings.push({
            stat: capInfo.label,
            current: value,
            nextSoftCap: cap,
            message: `${capInfo.label} is ${diff} points below the ${cap} soft cap. Consider increasing for better returns.`,
            type: "warning",
          });
        }
      } else if (value >= cap) {
        const nextCap = cap === capInfo.caps[0] ? capInfo.caps[1] : 99;
        if (value < nextCap) {
          warnings.push({
            stat: capInfo.label,
            current: value,
            nextSoftCap: nextCap,
            message: `${capInfo.label} has reached ${cap} soft cap. Diminishing returns beyond this point.`,
            type: "info",
          });
        }
      }
    }
  }

  return warnings;
}

// ─── Suggestions Engine ───

function generateSuggestions(stats: BuildStats, weapons: WeaponARResult[], runeLevel: number): Suggestion[] {
  const suggestions: Suggestion[] = [];

  if (stats.vigor < 40 && runeLevel > 40) {
    suggestions.push({
      type: "stat",
      message: `Vigor ${stats.vigor} is below the 40 survival threshold. Increase to at least 40 for mid-game viability.`,
      priority: "high",
    });
  }

  for (const w of weapons) {
    if (!w.meetsRequirements) {
      suggestions.push({
        type: "weapon",
        message: `${w.name}: missing ${w.missingStats.join(", ")}. Increase stats to meet requirements.`,
        priority: "high",
      });
    }
  }

  const damageStats = ["strength", "dexterity", "intelligence", "faith", "arcane"] as const;
  let hasDamage = false;
  for (const stat of damageStats) {
    if (stats[stat] >= 40) hasDamage = true;
  }
  if (!hasDamage && runeLevel > 50) {
    suggestions.push({
      type: "build",
      message: "No damage stat above 40. Consider specializing in one damage type for better output.",
      priority: "medium",
    });
  }

  return suggestions;
}

// ─── Level Cost Calculation ───

const LEVEL_COST_TABLE: number[] = [];
for (let i = 1; i <= 99; i++) {
  if (i <= 12) LEVEL_COST_TABLE.push(673 + i * 108);
  else if (i <= 37) LEVEL_COST_TABLE.push(2336 + i * 130);
  else if (i <= 70) LEVEL_COST_TABLE.push(6246 + i * 161);
  else LEVEL_COST_TABLE.push(14166 + i * 199);
}

export function calculateLevelCost(currentLevel: number, targetLevel: number): number {
  let cost = 0;
  for (let i = currentLevel; i < targetLevel; i++) {
    cost += LEVEL_COST_TABLE[Math.min(i, 98)];
  }
  return cost;
}

export function calculateRuneLevel(startingClass: StartingClass, stats: BuildStats): number {
  const baseStats = startingClass.stats;
  let totalLevels = startingClass.runeLevel;
  const statKeys = ["vigor", "mind", "endurance", "strength", "dexterity", "intelligence", "faith", "arcane"] as const;
  for (const key of statKeys) {
    const diff = stats[key] - baseStats[key];
    if (diff > 0) totalLevels += diff;
  }
  return totalLevels;
}

// ─── Main Build Function ───

export function calculateBuild(input: BuildInput): BuildOutput {
  const startingClass = STARTING_CLASSES[input.startingClass];
  if (!startingClass) {
    throw new Error(`Unknown starting class: ${input.startingClass}`);
  }

  const runeLevel = calculateRuneLevel(startingClass, input.stats);
  const totalHP = calculateHP(input.stats.vigor);
  const totalFP = calculateFP(input.stats.mind);
  const totalStamina = calculateStamina(input.stats.endurance);
  const loadData = calculateEquipLoad(input.stats.endurance);

  // Calculate weapon ARs
  let totalWeight = 0;
  const weaponResults: WeaponARResult[] = [];

  for (const slug of input.selectedWeapons) {
    const weapon = ALL_WEAPONS[slug];
    if (!weapon) continue;

    totalWeight += weapon.weight;

    const ar = calculateWeaponAR(
      weapon,
      {
        str: input.stats.strength,
        dex: input.stats.dexterity,
        int: input.stats.intelligence,
        fai: input.stats.faith,
        arc: input.stats.arcane,
      },
      input.upgradeLevel,
      input.twoHanding
    );

    weaponResults.push({
      slug,
      name: weapon.name,
      type: weapon.type,
      totalAR: ar.totalAR,
      physicalAR: ar.physicalAR,
      elementalAR: ar.elementalAR,
      meetsRequirements: ar.meetsRequirements,
      missingStats: ar.missingStats,
    });
  }

  // Estimate armor + talismans weight
  totalWeight += 15; // armor set
  totalWeight += 3;  // talismans

  const rollType = getRollType(totalWeight, loadData.maxLoad);
  const buildType = detectBuildType(input.stats, weaponResults);
  const softCapWarnings = getSoftCapWarnings(input.stats);
  const suggestions = generateSuggestions(input.stats, weaponResults, runeLevel);
  const isViable = input.stats.vigor >= 20 && weaponResults.some((w) => w.meetsRequirements);

  return {
    runeLevel,
    totalHP: Math.round(totalHP),
    totalFP: Math.round(totalFP),
    totalStamina: Math.round(totalStamina),
    equipLoad: {
      current: Math.round(totalWeight * 10) / 10,
      maxLight: Math.round(loadData.maxLight * 10) / 10,
      maxMedium: Math.round(loadData.maxMedium * 10) / 10,
      maxHeavy: Math.round(loadData.maxHeavy * 10) / 10,
      rollType,
    },
    weapons: weaponResults,
    buildType,
    softCapWarnings,
    suggestions,
    isViable,
  };
}
