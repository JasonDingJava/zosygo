import armorData from "./armor-data.json";
import talismansData from "./talismans-data.json";

export interface ArmorSet {
  id: string;
  name: string;
  totalWeight: number;
  totalPoise: number;
  pieces: {
    helm: { name: string; weight: number; poise: number };
    chest: { name: string; weight: number; poise: number };
    arms: { name: string; weight: number; poise: number };
    legs: { name: string; weight: number; poise: number };
  };
}

export interface Talisman {
  id: string;
  name: string;
  weight: number;
  effect: string;
}

export const ALL_ARMOR_SETS: Record<string, ArmorSet> = {};
for (const set of (armorData as { armorSets: ArmorSet[] }).armorSets) {
  ALL_ARMOR_SETS[set.id] = set;
}

export const ALL_ARMOR_SET_IDS = Object.keys(ALL_ARMOR_SETS);
export const ALL_ARMOR_SET_LIST = Object.values(ALL_ARMOR_SETS);

export const ALL_TALISMANS: Record<string, Talisman> = {};
for (const t of (talismansData as { talismans: Talisman[] }).talismans) {
  ALL_TALISMANS[t.id] = t;
}

export const ALL_TALISMAN_IDS = Object.keys(ALL_TALISMANS);
export const ALL_TALISMAN_LIST = Object.values(ALL_TALISMANS);
