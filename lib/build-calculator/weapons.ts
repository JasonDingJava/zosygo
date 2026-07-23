// Elden Ring weapon data — 123 core weapons from game files
// Generated from regulation-vanilla-v1.14

import weaponsData from "./weapons-data.json";
import gameData from "./game-data.json";

export interface WeaponEntry {
  slug: string;
  name: string;
  type: string;
  weight: number;
  somber: boolean;
  requirements: {
    str: number;
    dex: number;
    int: number;
    fai: number;
    arc: number;
  };
  attack: {
    phys: number;
    magic: number;
    fire: number;
    lightning: number;
    holy: number;
  };
  scaling: {
    str: number;
    dex: number;
    int: number;
    fai: number;
    arc: number;
  };
  reinforceTypeId: string;
  attackElementCorrectId: number;
  calcCorrectGraphIds?: Record<string, number>;
}

export type WeaponMap = Record<string, WeaponEntry>;

export const ALL_WEAPONS: WeaponMap = weaponsData as unknown as WeaponMap;

export const ALL_WEAPON_SLUGS = Object.keys(ALL_WEAPONS).sort(
  (a, b) => ALL_WEAPONS[a].name.localeCompare(ALL_WEAPONS[b].name)
);

// Weapon type categories
// TypeXX are old raw IDs from game data (some weapons still have them)
export const TYPE_NAME_MAP: Record<string, string> = {
  Type13: "Katana",
  Type15: "Thrusting Sword",
  Type17: "Axe",
  Type21: "Hammer",
  Type23: "Great Hammer",
  Type24: "Flail",
  Type28: "Great Spear",
  Type61: "Sacred Seal",
  Type87: "Torch",
  // Named types (after fix)
  Dagger: "Dagger",
  "Straight Sword": "Straight Sword",
  Greatsword: "Greatsword",
  "Colossal Sword": "Colossal Sword",
  "Thrusting Sword": "Thrusting Sword",
  "Heavy Thrusting Sword": "Heavy Thrusting Sword",
  "Curved Sword": "Curved Sword",
  "Curved Greatsword": "Curved Greatsword",
  Katana: "Katana",
  Twinblade: "Twinblade",
  Hammer: "Hammer",
  "Great Hammer": "Great Hammer",
  Flail: "Flail",
  Axe: "Axe",
  "Colossal Weapon": "Colossal Weapon",
  Spear: "Spear",
  "Great Spear": "Great Spear",
  Halberd: "Halberd",
  Reaper: "Reaper",
  Whip: "Whip",
  Fist: "Fist",
  Claw: "Claw",
  Torch: "Torch",
  "Glintstone Staff": "Glintstone Staff",
  "Sacred Seal": "Sacred Seal",
  Bow: "Bow",
};

export const WEAPON_CATEGORIES: Record<string, string[]> = {};
for (const slug of ALL_WEAPON_SLUGS) {
  const w = ALL_WEAPONS[slug];
  if (!WEAPON_CATEGORIES[w.type]) WEAPON_CATEGORIES[w.type] = [];
  WEAPON_CATEGORIES[w.type].push(slug);
}
export const WEAPON_CATEGORY_NAMES = Object.keys(WEAPON_CATEGORIES).sort();

// ─── Calc Correct Graphs (stat scaling curves) ───

interface CalcCorrectEntry { maxVal: number; maxGrowVal: number; adjPt: number; }
type CalcCorrectGraph = CalcCorrectEntry[];

const calcCorrectGraphs = gameData.calcCorrectGraphs as unknown as Record<string, CalcCorrectGraph>;
const reinforceTypes = gameData.reinforceTypes as unknown as Record<string, {
  attack: Record<string, number>;
  attributeScaling: Record<string, number>;
}[]>;
const attackElementCorrects = gameData.attackElementCorrects as unknown as Record<string, Record<string, Record<string, number | boolean>>>;
const scalingTiers = gameData.scalingTiers as unknown as [number, string][];

// ─── Get scaling letter from numeric value ───

export function getScalingLetter(value: number): string {
  for (const [threshold, letter] of scalingTiers) {
    if (value >= threshold) return letter;
  }
  return "E";
}

// ─── Get scaling letter after upgrade ───

export function getUpgradeScalingLetter(
  weapon: WeaponEntry,
  upgradeLevel: number,
  attribute: string
): string {
  const scalingFactor = weapon.scaling[attribute as keyof typeof weapon.scaling] ?? 0;
  if (!scalingFactor) return "-";
  const upgScalingMult = getUpgradeScalingMult(weapon.reinforceTypeId, upgradeLevel, attribute);
  const effectiveScaling = scalingFactor * upgScalingMult;
  return getScalingLetter(effectiveScaling);
}

// ─── Check if weapon is a staff or seal ───

export function isStaffOrSeal(weapon: WeaponEntry): boolean {
  return weapon.type === "Glintstone Staff" || weapon.type === "Sacred Seal";
}

// Sorcery/Incant scaling calculation for staves and seals
// Formula: base * (1 + statCorrection * effectiveScaling)
// Staves base=100, Seals base=94
// effectiveScaling = baseScaling * reinforcementScalingMultiplier

const STAFF_SCALING_BASE = 100;
const SEAL_SCALING_BASE = 94;

// Mapping from weapon type to required stat
const STAFF_STAT_MAP: Record<string, string> = {
  "Glintstone Staff": "int",
  "Sacred Seal": "fai",
};

export function calculateSorceryScaling(
  weapon: WeaponEntry,
  stats: { str: number; dex: number; int: number; fai: number; arc: number },
  upgradeLevel: number
): { scaling: number; label: string } | null {
  if (!isStaffOrSeal(weapon)) return null;

  const statKey = STAFF_STAT_MAP[weapon.type];
  if (!statKey) return null;

  const statValue = stats[statKey as keyof typeof stats] as number;

  // Base scaling from weapon data
  const baseScaling = weapon.scaling[statKey as keyof typeof weapon.scaling] as number;
  if (!baseScaling || baseScaling === 0) return null;

  // Reinforcement scaling multiplier
  const scalingMult = getUpgradeScalingMult(weapon.reinforceTypeId, upgradeLevel, statKey);
  const effectiveScaling = baseScaling * scalingMult;

  // Stat correction from calcCorrect graph
  const aecId = weapon.attackElementCorrectId;
  const aecTable = attackElementCorrects[String(aecId)];
  if (!aecTable) return null;

  // Find which graph corresponds to the stat's damage element
  // For staves (AEC 20000): all INT maps to graph 15
  // For seals (AEC 30000): all FAI maps to graph 15
  const graphId = 15; // Both use graph 15 for sorcery/incant scaling
  const graph = calcCorrectGraphs[String(graphId)];
  if (!graph) return null;

  const statCorrect = getCalcCorrectValue(graph, statValue);

  // Determine base
  const base = weapon.type === "Glintstone Staff" ? STAFF_SCALING_BASE : SEAL_SCALING_BASE;

  // Calculate scaling
  const scaling = base * (1 + statCorrect * effectiveScaling);

  // Determine label
  const label = weapon.type === "Glintstone Staff" ? "Sorcery Scaling" : "Incant Scaling";

  return { scaling: Math.round(scaling), label };
}

export function isBow(weapon: WeaponEntry): boolean {
  return weapon.type === "Bow";
}

// ─── CalcCorrect lookup ───

function getCalcCorrectValue(graph: CalcCorrectGraph, statValue: number): number {
  for (let i = 0; i < graph.length - 1; i++) {
    const seg = graph[i];
    const nextSeg = graph[i + 1];
    const maxVal = seg.maxVal;
    const maxGrowVal = seg.maxGrowVal;
    const adjPt = seg.adjPt;
    const nextMaxVal = nextSeg.maxVal;
    const nextMaxGrowVal = nextSeg.maxGrowVal;
    if (statValue >= maxVal && statValue < nextMaxVal) {
      const t = (statValue - maxVal) / (nextMaxVal - maxVal);
      const val = maxGrowVal + t * (nextMaxGrowVal - maxGrowVal);
      return Math.max(0, val * adjPt);
    }
  }
  const last = graph[graph.length - 1];
  return last.maxGrowVal * last.adjPt;
}

// ─── Get upgrade multipliers ───

function getUpgradeMultiplier(reinforceTypeId: string, upgradeLevel: number, _damageTypeIndex: number): number {
  const table = reinforceTypes[reinforceTypeId];
  if (!table || upgradeLevel >= table.length) return 1;
  const entry = table[upgradeLevel];
  return entry.attack[String(_damageTypeIndex)] ?? 1;
}

function getUpgradeScalingMult(reinforceTypeId: string, upgradeLevel: number, _attribute: string): number {
  const table = reinforceTypes[reinforceTypeId];
  if (!table || upgradeLevel >= table.length) return 1;
  const entry = table[upgradeLevel];
  return entry.attributeScaling[_attribute] ?? 1;
}

// ─── Calculate AR for a weapon ───

export function calculateWeaponAR(
  weapon: WeaponEntry,
  stats: { str: number; dex: number; int: number; fai: number; arc: number },
  upgradeLevel: number,
  twoHanding: boolean
): {
  totalAR: number;
  physicalAR: number;
  elementalAR: number;
  phys: number;
  magic: number;
  fire: number;
  lightning: number;
  holy: number;
  meetsRequirements: boolean;
  missingStats: string[];
} {
  const effectiveStr = twoHanding ? Math.floor(stats.str * 1.5) : stats.str;

  const missing: string[] = [];
  if (effectiveStr < weapon.requirements.str) missing.push(`STR ${weapon.requirements.str}`);
  if (stats.dex < weapon.requirements.dex) missing.push(`DEX ${weapon.requirements.dex}`);
  if (stats.int < weapon.requirements.int) missing.push(`INT ${weapon.requirements.int}`);
  if (stats.fai < weapon.requirements.fai) missing.push(`FAI ${weapon.requirements.fai}`);
  if (stats.arc < weapon.requirements.arc) missing.push(`ARC ${weapon.requirements.arc}`);
  const meetsReq = missing.length === 0;

  const aec = attackElementCorrects[String(weapon.attackElementCorrectId)];

  let totalAR = 0;
  let physAR = 0;
  let elemAR = 0;
  let magicAR = 0;
  let fireAR = 0;
  let lightningAR = 0;
  let holyAR = 0;

  const damageTypes = [
    { index: 0, name: "phys" as const },
    { index: 1, name: "magic" as const },
    { index: 2, name: "fire" as const },
    { index: 3, name: "lightning" as const },
    { index: 4, name: "holy" as const },
  ];

  for (const dt of damageTypes) {
    const baseAtk = weapon.attack[dt.name];
    if (!baseAtk && baseAtk !== 0) continue;

    const atkMult = getUpgradeMultiplier(weapon.reinforceTypeId, upgradeLevel, dt.index);
    const upgradedAtk = baseAtk * atkMult;
    if (!upgradedAtk) {
      totalAR += 0;
      continue;
    }

    // Default calcCorrectGraphId based on damage type
    const defaultGraphIds: Record<number, string> = { 0: "0", 1: "4", 2: "6", 3: "7", 4: "8" };
    const graphId = weapon.calcCorrectGraphIds?.[String(dt.index)] ?? defaultGraphIds[dt.index] ?? "0";
    const graph = calcCorrectGraphs[graphId];

    const attrMap: Record<string, keyof typeof weapon.scaling> = { str: "str", dex: "dex", int: "int", fai: "fai", arc: "arc" };
    let scalingMultiplier = 1;

    if (aec && dt.index >= 0) {
      const dtCorrect = aec[String(dt.index)];
      if (dtCorrect) {
        for (const [attrKey, attrName] of Object.entries(attrMap)) {
          const correct = dtCorrect[attrKey];
          if (!correct) continue;

          const scalingFactor = weapon.scaling[attrName] ?? 0;
          if (!scalingFactor) continue;

          const upgScalingMult = getUpgradeScalingMult(weapon.reinforceTypeId, upgradeLevel, attrKey);
          const effectiveScaling = scalingFactor * upgScalingMult;

          const statValue = attrKey === "str" ? effectiveStr : stats[attrKey as keyof typeof stats];

          const correctVal = graph ? getCalcCorrectValue(graph, statValue) : 0;

          let attrCorrect: number;
          if (correct === true) {
            attrCorrect = correctVal;
          } else {
            attrCorrect = correctVal * (correct as number);
          }

          scalingMultiplier += attrCorrect * effectiveScaling;
        }
      }
    }

    const finalAR = upgradedAtk * scalingMultiplier;
    totalAR += finalAR;
    if (dt.name === "phys") physAR += finalAR;
    else if (dt.name === "magic") magicAR += finalAR;
    else if (dt.name === "fire") fireAR += finalAR;
    else if (dt.name === "lightning") lightningAR += finalAR;
    else if (dt.name === "holy") holyAR += finalAR;
    else elemAR += finalAR;
  }

  return {
    totalAR: Math.round(totalAR),
    physicalAR: Math.round(physAR),
    elementalAR: Math.round(elemAR),
    phys: Math.round(physAR || 0),
    magic: Math.round(magicAR || 0),
    fire: Math.round(fireAR || 0),
    lightning: Math.round(lightningAR || 0),
    holy: Math.round(holyAR || 0),
    meetsRequirements: meetsReq,
    missingStats: missing,
  };
}
