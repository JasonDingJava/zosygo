// Starting classes data for Elden Ring Build Planner

export interface StartingClass {
  name: string;
  stats: {
    vigor: number;
    mind: number;
    endurance: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    faith: number;
    arcane: number;
  };
  runeLevel: number;
}

export const STARTING_CLASSES: Record<string, StartingClass> = {
  vagabond: {
    name: "Vagabond",
    stats: { vigor: 15, mind: 10, endurance: 11, strength: 14, dexterity: 13, intelligence: 9, faith: 9, arcane: 7 },
    runeLevel: 9,
  },
  samurai: {
    name: "Samurai",
    stats: { vigor: 12, mind: 11, endurance: 13, strength: 12, dexterity: 15, intelligence: 9, faith: 8, arcane: 8 },
    runeLevel: 9,
  },
  wretch: {
    name: "Wretch",
    stats: { vigor: 10, mind: 10, endurance: 10, strength: 10, dexterity: 10, intelligence: 10, faith: 10, arcane: 10 },
    runeLevel: 1,
  },
  hero: {
    name: "Hero",
    stats: { vigor: 14, mind: 9, endurance: 12, strength: 16, dexterity: 9, intelligence: 7, faith: 8, arcane: 11 },
    runeLevel: 7,
  },
  warrior: {
    name: "Warrior",
    stats: { vigor: 11, mind: 12, endurance: 11, strength: 10, dexterity: 16, intelligence: 10, faith: 8, arcane: 9 },
    runeLevel: 8,
  },
  prisoner: {
    name: "Prisoner",
    stats: { vigor: 11, mind: 12, endurance: 11, strength: 11, dexterity: 14, intelligence: 14, faith: 6, arcane: 9 },
    runeLevel: 9,
  },
  confessor: {
    name: "Confessor",
    stats: { vigor: 10, mind: 13, endurance: 10, strength: 12, dexterity: 12, intelligence: 9, faith: 14, arcane: 9 },
    runeLevel: 10,
  },
  astrologer: {
    name: "Astrologer",
    stats: { vigor: 9, mind: 15, endurance: 9, strength: 8, dexterity: 12, intelligence: 16, faith: 7, arcane: 9 },
    runeLevel: 6,
  },
  prophet: {
    name: "Prophet",
    stats: { vigor: 10, mind: 14, endurance: 8, strength: 11, dexterity: 10, intelligence: 7, faith: 16, arcane: 10 },
    runeLevel: 7,
  },
  bandit: {
    name: "Bandit",
    stats: { vigor: 10, mind: 11, endurance: 10, strength: 9, dexterity: 13, intelligence: 9, faith: 8, arcane: 14 },
    runeLevel: 5,
  },
};
