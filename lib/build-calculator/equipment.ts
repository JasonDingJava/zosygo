// Unified equipment data model
// Provides individual armor pieces (head/chest/arms/legs) and talismans
// All data indexed by slot for easy UI consumption

import armorData from "./armor-data.json";
import talismansData from "./talismans-data.json";
import spellsData from "./spells-data.json";

// ─── Types ───

export type ArmorSlot = "helm" | "chest" | "arms" | "legs";

export interface ArmorPiece {
  id: string;
  name: string;
  slot: ArmorSlot;
  weight: number;
  poise: number;
  /** Which armor set this piece belongs to */
  setId: string;
}

export interface ArmorSetSummary {
  id: string;
  name: string;
  totalWeight: number;
  totalPoise: number;
}

export interface Talisman {
  id: string;
  name: string;
  weight: number;
  effect: string;
}

export interface EquipLoadResult {
  current: number;
  maxLight: number;
  maxMedium: number;
  maxHeavy: number;
  rollType: "light" | "medium" | "heavy";
  percent: number;
}

// ─── Armor pieces indexed by slot ───

export const ARMOR_PIECES: Record<ArmorSlot, ArmorPiece[]> = {
  helm: [],
  chest: [],
  arms: [],
  legs: [],
};

/** Quick lookup by id */
export const ARMOR_PIECE_BY_ID: Record<string, ArmorPiece> = {};

/** Armor set summaries for set selection */
export const ARMOR_SET_SUMMARIES: ArmorSetSummary[] = [];

/** A "None" placeholder piece per slot */
export const EMPTY_PIECES: Record<ArmorSlot, ArmorPiece> = {
  helm: { id: "", name: "None", slot: "helm", weight: 0, poise: 0, setId: "" },
  chest: { id: "", name: "None", slot: "chest", weight: 0, poise: 0, setId: "" },
  arms: { id: "", name: "None", slot: "arms", weight: 0, poise: 0, setId: "" },
  legs: { id: "", name: "None", slot: "legs", weight: 0, poise: 0, setId: "" },
};

function buildArmorIndex() {
  const sets = (armorData as { armorSets: any[] }).armorSets;

  for (const set of sets) {
    ARMOR_SET_SUMMARIES.push({
      id: set.id,
      name: set.name,
      totalWeight: set.totalWeight,
      totalPoise: set.totalPoise,
    });

    for (const slot of ["helm", "chest", "arms", "legs"] as ArmorSlot[]) {
      const piece = set.pieces[slot];
      if (!piece) continue;

      const pieceId = `${set.id}_${slot}`;
      const entry: ArmorPiece = {
        id: pieceId,
        name: piece.name,
        slot,
        weight: piece.weight,
        poise: piece.poise,
        setId: set.id,
      };

      ARMOR_PIECES[slot].push(entry);
      ARMOR_PIECE_BY_ID[pieceId] = entry;
    }
  }

  // Sort each slot by weight (lightest first) for cleaner UI
  for (const slot of ["helm", "chest", "arms", "legs"] as ArmorSlot[]) {
    ARMOR_PIECES[slot].sort((a, b) => a.weight - b.weight);
  }
}

buildArmorIndex();

// ─── Talismans ───

export const ALL_TALISMANS_RECORD: Record<string, Talisman> = {};
export const ALL_TALISMANS_LIST: Talisman[] = [];

function buildTalismanIndex() {
  const list = (talismansData as { talismans: any[] }).talismans;
  for (const t of list) {
    const entry: Talisman = {
      id: t.id,
      name: t.name,
      weight: t.weight,
      effect: t.effect,
    };
    ALL_TALISMANS_RECORD[t.id] = entry;
    ALL_TALISMANS_LIST.push(entry);
  }
}

buildTalismanIndex();

// ─── Spells ───

export interface Spell {
  id: string;
  name: string;
  cost: number;
  slots: number;
  requirements: Record<string, number>;
  type: string;
  category: string;
}

export const ALL_SPELLS_RECORD: Record<string, Spell> = {};
export const ALL_SPELLS_LIST: Spell[] = [];

function buildSpellIndex() {
  const list = (spellsData as { spells: any[] }).spells;
  for (const s of list) {
    const entry: Spell = {
      id: s.id,
      name: s.name,
      cost: s.cost,
      slots: s.slots,
      requirements: s.requirements,
      type: s.type,
      category: s.category,
    };
    ALL_SPELLS_RECORD[s.id] = entry;
    ALL_SPELLS_LIST.push(entry);
  }
}

buildSpellIndex();

// ─── Equip Load helpers ───

export function getMaxEquipLoad(endurance: number): number {
  let maxLoad: number;
  if (endurance <= 30) maxLoad = 30 + 1.5 * endurance;
  else if (endurance <= 60) maxLoad = 75 + 1.0 * (endurance - 30);
  else maxLoad = 105 + 0.5 * (endurance - 60);
  return maxLoad;
}

export function getRollType(weight: number, maxLoad: number): "light" | "medium" | "heavy" {
  const ratio = weight / maxLoad;
  if (ratio <= 0.3) return "light";
  if (ratio <= 0.7) return "medium";
  return "heavy";
}

export function getEquipLoadResult(
  endurance: number,
  weaponWeight: number,
  armorPieces: Partial<Record<ArmorSlot, ArmorPiece>>,
  talismans: Talisman[]
): EquipLoadResult {
  const maxLoad = getMaxEquipLoad(endurance);

  let total = weaponWeight;
  for (const slot of ["helm", "chest", "arms", "legs"] as ArmorSlot[]) {
    const piece = armorPieces[slot];
    if (piece) total += piece.weight;
  }
  for (const t of talismans) {
    total += t.weight;
  }

  const percent = maxLoad > 0 ? (total / maxLoad) * 100 : 0;
  const rollType = getRollType(total, maxLoad);

  return {
    current: Math.round(total * 10) / 10,
    maxLight: Math.round(maxLoad * 0.3 * 10) / 10,
    maxMedium: Math.round(maxLoad * 0.7 * 10) / 10,
    maxHeavy: Math.round(maxLoad * 10) / 10,
    rollType,
    percent: Math.round(percent * 10) / 10,
  };
}

// ─── Soft cap definitions (for UI) ───

export interface SoftCapDef {
  label: string;
  key: string;
  caps: number[];
  color: string;
}

export const SOFT_CAP_DEFS: SoftCapDef[] = [
  { label: "VIG", key: "vigor", caps: [20, 40, 60, 80], color: "#ef4444" },
  { label: "MND", key: "mind", caps: [20, 35, 60, 80], color: "#3b82f6" },
  { label: "END", key: "endurance", caps: [20, 30, 50, 80], color: "#22c55e" },
  { label: "STR", key: "strength", caps: [20, 55, 80], color: "#f59e0b" },
  { label: "DEX", key: "dexterity", caps: [20, 55, 80], color: "#a855f7" },
  { label: "INT", key: "intelligence", caps: [20, 55, 80], color: "#06b6d4" },
  { label: "FTH", key: "faith", caps: [20, 55, 80], color: "#f97316" },
  { label: "ARC", key: "arcane", caps: [20, 45, 60], color: "#ec4899" },
];