// Elden Ring build calculation engine
// Uses game-accurate formulas from regulation data

import { ALL_WEAPONS, calculateWeaponAR, calculateSorceryScaling, isStaffOrSeal, type WeaponEntry } from "./weapons";
import { STARTING_CLASSES, type StartingClass } from "./classes";
import { ALL_ARMOR_SETS, ALL_TALISMANS } from "./armor";

// Weapon art / skill names mapped by weapon slug
const WEAPON_SKILL_MAP: Record<string, string> = {
  "moonveil": "Transient Moonlight",
  "crescent-moon-axe": "Crescent Moon Axe",
  "carian-regal-scepter": "Comet Azur",
  "dark-moon-greatsword": "Dark Moon Greatsword",
  "royal-greatsword": "Carian Grandeur",
  "lusat-glintstone-staff": "Lusat's Full Moon",
  "meteorite-staff": "Gravitational Meteor",
  "hand-of-malenia": "Bloodflame Dance",
  "black-knife": "Black Blade",
  "rivers-of-blood": "Corpse Piler",
  "morgotts-cursed-sword": "Bloodboon",
  "eleonoras-pole": "Eleonora's Pole",
  "giant-crusher": "Giant's Ring",
  "sword-of-night-and-flame": "Night and Flame",
  "godslayers-greatsword": "Black Flame Tornado",
  "blasphemous-blade": "Tenebrae Mist",
  "umbilical-cord": "Miasma Burst",
  "mastodon": "Mastodon",
  "raptor-talon": "Raptor Talon",
  "mohgwyns-spear": "Seppuku",
  "bloodhound-fang": "Bloodhound's Finesse",
  "bloodhound-fang-2h": "Bloodhound's Bite",
  "dragon-king-claws": "Borealis's Mist",
  "great-jars-arsenal": "Great Jar's Arsenal",
  "sacred-relic-sword": "Golden Vow",
  "star-meteor-staff": "Stars of Ruin",
  "azurs-glintstone-staff": "Comet Azur",
  "prazys-staff": "Prelate's Charge",
  "cerulean-amulet-staff": "Cerulusian Sling",
  "scepter-of-the-all-knowing": "All-Knowing Sling",
  "alabaster-lion-greatshield": "Stalwart Shield",
  "flame-meteor-staff": "Flame Sling",
  "fingerprint-grave": "Gravitas Sling",
};

export function getWeaponSkill(slug: string): string {
  return WEAPON_SKILL_MAP[slug] || "";
}

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
  selectedArmorSet?: string;
  selectedTalismans?: string[];
  selectedSpells?: string[];
}

export interface WeaponARResult {
  slug: string;
  name: string;
  type: string;
  totalAR: number;
  physicalAR: number;
  elementalAR: number;
  detailedAR: DetailedAR;
  meetsRequirements: boolean;
  missingStats: string[];
  isStaffOrSeal: boolean;
  scalingLabel: string;
  sorceryScaling: number;
  weaponSkill: string;
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


export interface DetailedAR {
  phys: number;
  magic: number;
  fire: number;
  lightning: number;
  holy: number;
  total: number;
}

export interface DefenseStats {
  physicalNegation: number;
  magicNegation: number;
  fireNegation: number;
  lightningNegation: number;
  holyNegation: number;
  baseDefense: {
    physical: number;
    magic: number;
    fire: number;
    lightning: number;
    holy: number;
  };
}

export interface DamageResult {
  damageType: string;
  rawAR: number;
  negation: number;
  afterNegation: number;
  defense: number;
  finalDamage: number;
  totalDamage: number;
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
  defense: {
    physicalNegation: number;
    magicNegation: number;
    fireNegation: number;
    lightningNegation: number;
    holyNegation: number;
    poise: number;
  };
  transientMoonlightDamage: TransientMoonlightDamage | null;
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

  // Special case: Moonveil with high INT → Spellblade
  const hasMoonveil = weaponResults.some(w => w.slug === "moonveil");
  if (hasMoonveil && primary[0] === "intelligence" && primary[1] >= 60) {
    return "Moonveil Spellblade Build";
  }

  // Pure caster only if all equipped weapons are staff/seal
  const allCastWeapons = weaponResults.length > 0 && weaponResults.every(w => w.isStaffOrSeal);

  if (primary[1] >= 60) {
    if (primary[0] === "intelligence") return allCastWeapons ? "Pure Mage Build" : "Intelligence Hybrid Build";
    if (primary[0] === "faith") return allCastWeapons ? "Faith Caster Build" : "Faith Hybrid Build";
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
    const [firstCap, secondCap] = capInfo.caps;

    if (value >= secondCap) {
      const capLabel = stat === "intelligence" ? "Reached the main sorcery scaling cap. Further points provide reduced returns." :
                  stat === "faith" ? "Reached the main incantation scaling cap. Further points provide reduced returns." :
                  stat === "vigor" ? "Reached second HP soft cap. Further investment gives very low HP gains." :
                  stat === "endurance" ? "Reached second stamina/load soft cap. Further investment gives very low returns." :
                  `${capInfo.label} ${value} — reached second soft cap. Further points give very low returns.`;
      warnings.push({
        stat: capInfo.label,
        current: value,
        nextSoftCap: 99,
        message: capLabel,
        type: "warning",
      });
    } else if (value >= firstCap) {
      const label = stat === "dexterity" && value <= 25 ? `DEX ${value} — past first soft cap (${firstCap}). Moonveil only requires DEX 18; further DEX investment is optional.` :
                   `${capInfo.label} ${value} — past first soft cap (${firstCap}). Second cap at ${secondCap} gives diminishing returns.`;
      warnings.push({
        stat: capInfo.label,
        current: value,
        nextSoftCap: secondCap,
        message: label,
        type: "info",
      });
    } else {
      const diffToFirst = firstCap - value;
      if (diffToFirst <= 10) {
        warnings.push({
          stat: capInfo.label,
          current: value,
          nextSoftCap: firstCap,
          message: diffToFirst === 0 ? `${capInfo.label} at first soft cap (${firstCap}).` :
                   `${capInfo.label} ${value} — ${diffToFirst} pts from first soft cap (${firstCap}). Good place to invest.`,
          type: "info",
        });
      } else if (value <= 18) {
        warnings.push({
          stat: capInfo.label,
          current: value,
          nextSoftCap: firstCap,
          message: `${capInfo.label} ${value} — meets weapon requirement only. Not investing in this stat.`,
          type: "info",
        });
      } else {
        warnings.push({
          stat: capInfo.label,
          current: value,
          nextSoftCap: firstCap,
          message: `${capInfo.label} ${value} — minimal investment — only meets weapon/armor requirements.`,
          type: "info",
        });
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


// ─── Damage Negation from Armor ───

function getArmorNegation(armorPieces: Partial<Record<string, { piece: any }>>): {
  phys: number; magic: number; fire: number; lightning: number; holy: number;
} {
  // Simplified: average negation from armor pieces
  // In a full implementation, each armor piece has specific negation values
  return { phys: 0, magic: 0, fire: 0, lightning: 0, holy: 0 };
}

// ─── Base Defense from Stats ───

function getBaseDefense(stats: BuildStats): {
  physical: number; magic: number; fire: number; lightning: number; holy: number;
} {
  // Elden Ring base defense scales with level and stats
  // Physical: ~80 at lv1, scales up
  // Elemental: 50-100 base, scales with specific stats
  const level = Object.values(stats).reduce((a, b) => a + b, 0) - 79;
  const base = Math.floor(80 + level * 0.5);
  return {
    physical: base,
    magic: base + Math.floor(stats.intelligence * 0.2),
    fire: base + Math.floor(stats.faith * 0.2),
    lightning: base + Math.floor(stats.dexterity * 0.2),
    holy: base + Math.floor(stats.faith * 0.15),
  };
}

// ─── Elden Ring Defense Formula ───

function applyDefense(rawDamage: number, defense: number): number {
  if (defense <= 0) return rawDamage;
  // Simplified formula matching game behavior
  const ratio = rawDamage / defense;
  if (ratio <= 0.125) return rawDamage * 0.1;
  if (ratio <= 0.4) return rawDamage * 0.9;
  if (ratio <= 1) return rawDamage * 0.5;
  if (ratio <= 8) return rawDamage * 0.8;
  return rawDamage * 0.9;
}

// ─── Calculate detailed damage ───

export function calculateDamage(
  weaponAR: { phys: number; magic: number; fire: number; lightning: number; holy: number },
  negation: { phys: number; magic: number; fire: number; lightning: number; holy: number },
  baseDefense: { physical: number; magic: number; fire: number; lightning: number; holy: number }
): DamageResult[] {
  const damageTypes: { key: string; ar: number; neg: number; def: number }[] = [
    { key: "Physical", ar: weaponAR.phys, neg: negation.phys, def: baseDefense.physical },
    { key: "Magic", ar: weaponAR.magic, neg: negation.magic, def: baseDefense.magic },
    { key: "Fire", ar: weaponAR.fire, neg: negation.fire, def: baseDefense.fire },
    { key: "Lightning", ar: weaponAR.lightning, neg: negation.lightning, def: baseDefense.lightning },
    { key: "Holy", ar: weaponAR.holy, neg: negation.holy, def: baseDefense.holy },
  ];

  const results: DamageResult[] = [];
  let totalDamage = 0;

  for (const dt of damageTypes) {
    if (dt.ar <= 0) continue;
    const afterNegation = dt.ar * (1 - dt.neg / 100);
    const finalDamage = Math.round(applyDefense(afterNegation, dt.def));
    totalDamage += finalDamage;
    results.push({
      damageType: dt.key,
      rawAR: Math.round(dt.ar),
      negation: dt.neg,
      afterNegation: Math.round(afterNegation * 10) / 10,
      defense: dt.def,
      finalDamage,
      totalDamage,
    });
  }

  return results;
}

// ─── Transient Moonlight Damage Estimate ───
// Moonveil Ash of War damage formula (approximate, based on in-game data)
// R1 beam:  ~112 base + INT/DEX scaling (D S / S)
// R2 beam:  ~168 base + INT/DEX scaling (D S / S)
// Both scale primarily with INT at +10 Moonveil.

export interface TransientMoonlightDamage {
  r1: { rawAR: number; withNegation: number };
  r2: { rawAR: number; withNegation: number };
  poiseDamage: number;
}

export function calculateTransientMoonlightDamage(
  moonveilAR: { phys: number; magic: number },
  defense: { magic: number }
): TransientMoonlightDamage {
  // Magic portion of Moonveil AR represents the main damage scaling
  const magicAR = moonveilAR.magic;
  // R1 beam damage is roughly 0.6× of magic AR
  const r1Raw = Math.round(magicAR * 0.60);
  // R2 beam damage is roughly 0.9× of magic AR
  const r2Raw = Math.round(magicAR * 0.90);
  // Poise damage from R2 is roughly 65-80
  const poise = 72;
  const magicNeg = defense.magic / 100;
  return {
    r1: {
      rawAR: r1Raw,
      withNegation: Math.round(r1Raw * (1 - magicNeg)),
    },
    r2: {
      rawAR: r2Raw,
      withNegation: Math.round(r2Raw * (1 - magicNeg)),
    },
    poiseDamage: poise,
  };
}

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
      weapon.somber ? Math.min(input.upgradeLevel, 10) : Math.min(input.upgradeLevel, 25),
      input.twoHanding
    );

    const effectiveUpg = weapon.somber ? Math.min(input.upgradeLevel, 10) : Math.min(input.upgradeLevel, 25);
    const weaponsStats = { str: input.stats.strength, dex: input.stats.dexterity, int: input.stats.intelligence, fai: input.stats.faith, arc: input.stats.arcane };
    const scalingResult = isStaffOrSeal(weapon) ? calculateSorceryScaling(weapon, weaponsStats, effectiveUpg) : null;
    const isStaff = weapon.type === "Glintstone Staff";
    const isSeal = weapon.type === "Sacred Seal";

    weaponResults.push({
      slug,
      name: weapon.name,
      type: weapon.type,
      totalAR: ar.totalAR,
      physicalAR: ar.physicalAR,
      elementalAR: ar.elementalAR,
      detailedAR: {
        phys: ar.phys,
        magic: ar.magic,
        fire: ar.fire,
        lightning: ar.lightning,
        holy: ar.holy,
        total: ar.totalAR,
      },
      meetsRequirements: ar.meetsRequirements,
      missingStats: ar.missingStats,
      isStaffOrSeal: isStaff || isSeal,
      scalingLabel: scalingResult ? scalingResult.label : "",
      sorceryScaling: scalingResult ? scalingResult.scaling : 0,
      weaponSkill: getWeaponSkill(weapon.slug),
    });
  }

  // Armor set weight (user selected or default estimate)
  const armorSet = input.selectedArmorSet ? ALL_ARMOR_SETS[input.selectedArmorSet] : null;
  if (armorSet) {
    totalWeight += armorSet.totalWeight;
  } else {
    totalWeight += 15; // default armor estimate
  }

  // Spells weight (negligible, staff/seal counted as weapon)
  // Spells themselves don't add weight in-game

  // Talismans weight
  if (input.selectedTalismans && input.selectedTalismans.length > 0) {
    for (const tid of input.selectedTalismans) {
      const tal = ALL_TALISMANS[tid];
      if (tal) totalWeight += tal.weight;
    }
  } else {
    totalWeight += 3; // default talisman estimate
  }

  const rollType = getRollType(totalWeight, loadData.maxLoad);
  const buildType = detectBuildType(input.stats, weaponResults);
  const softCapWarnings = getSoftCapWarnings(input.stats);
  const suggestions = generateSuggestions(input.stats, weaponResults, runeLevel);
  const isViable = input.stats.vigor >= 20 && weaponResults.some((w) => w.meetsRequirements);

  // Defense from armor set (estimated from poise)
  let poise = 0;
  let physicalNegation = 0;
  let magicNegation = 0;
  let fireNegation = 0;
  let lightningNegation = 0;
  let holyNegation = 0;
  if (armorSet) {
    poise = armorSet.totalPoise;
    // Rough Elden Ring defense estimate from poise/weight
    const avgNeg = Math.min(30, Math.round(poise * 0.8));
    physicalNegation = avgNeg;
    magicNegation = Math.max(avgNeg - 2, 5);
    fireNegation = Math.max(avgNeg - 1, 5);
    lightningNegation = Math.max(avgNeg - 2, 5);
    holyNegation = Math.max(avgNeg - 1, 5);
  } else {
    poise = 10; // default light armor
    physicalNegation = 6; magicNegation = 4; fireNegation = 5;
    lightningNegation = 4; holyNegation = 5;
  }

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
    defense: {
      physicalNegation,
      magicNegation,
      fireNegation,
      lightningNegation,
      holyNegation,
      poise,
    },
    transientMoonlightDamage: null,
  };
}
