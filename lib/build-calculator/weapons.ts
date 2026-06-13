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
export const WEAPON_CATEGORIES: Record<string, string[]> = {};
for (const slug of ALL_WEAPON_SLUGS) {
  const w = ALL_WEAPONS[slug];
  if (!WEAPON_CATEGORIES[w.type]) WEAPON_CATEGORIES[w.type] = [];
  WEAPON_CATEGORIES[w.type].push(slug);
}
export const WEAPON_CATEGORY_NAMES = Object.keys(WEAPON_CATEGORIES).sort();

// ─── Calc Correct Graphs (stat scaling curves) ───

type CalcCorrectEntry = [number, number, number];
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

// ─── CalcCorrect lookup ───

function getCalcCorrectValue(graph: CalcCorrectGraph, statValue: number): number {
  for (let i = 0; i < graph.length - 1; i++) {
    const seg = graph[i];
    const nextSeg = graph[i + 1];
    const maxVal = seg[0];
    const maxGrowVal = seg[1];
    const adjPt = seg[2];
    const nextMaxVal = nextSeg[0];
    const nextMaxGrowVal = nextSeg[1];
    if (statValue >= maxVal && statValue < nextMaxVal) {
      const t = (statValue - maxVal) / (nextMaxVal - maxVal);
      const val = maxGrowVal + t * (nextMaxGrowVal - maxGrowVal);
      return Math.max(0, val * adjPt);
    }
  }
  const last = graph[graph.length - 1];
  return last[1] * last[2];
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
    else elemAR += finalAR;
  }

  return {
    totalAR: Math.round(totalAR),
    physicalAR: Math.round(physAR),
    elementalAR: Math.round(elemAR),
    meetsRequirements: meetsReq,
    missingStats: missing,
  };
}
