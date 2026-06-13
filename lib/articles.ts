// lib/articles.ts — Game article content definitions

export interface ArticleBase {
  slug: string;
  category: "builds" | "bosses" | "weapons" | "walkthroughs";
  gameSlug: string;
  difficulty?: "beginner" | "intermediate" | "advanced" | "expert";
  readTimeMinutes: number;
  order: number;
}

export interface ArticleContent {
  title: string;
  metaDescription: string;
  sections: ArticleSection[];
  internalLinks: InternalLink[];
}

export interface ArticleSection {
  heading: string;
  level: 1 | 2 | 3;
  content: string;
  image?: string;
  imageAlt?: string;
}

export interface InternalLink {
  href: string;
  anchorText: string;
}

export interface Article extends ArticleBase {
  title: string;
  metaDescription: string;
  sections: ArticleSection[];
  internalLinks: InternalLink[];
}

const articles: Article[] = [
  // ═══ ELDEN RING — BUILDS ═══
  {
    slug: "moonveil-intelligence-build",
    category: "builds",
    gameSlug: "elden-ring",
    difficulty: "intermediate",
    readTimeMinutes: 9,
    order: 1,
    title: "Moonveil Intelligence Build — Best Elden Ring Samurai Mage Setup",
    metaDescription:
      "Should you use the Moonveil INT build? Full comparison vs Dark Moon Greatsword and Wing of Astel. Stat spreads, armor loadouts, progression path, and when this build falls short.",
    sections: [
      {
        heading: "Decision — Should You Use This Build?",
        level: 2,
        content:
          "The Moonveil Intelligence build is Elden Ring\'s strongest hybrid option for players who want both melee pressure and ranged burst without the glass-cannon fragility of a pure mage. You should pick this build if: you like the katana moveset but want INT scaling; you want to delete bosses with Transient Moonlight from medium range; you value FP efficiency (the weapon art costs 16 FP vs 40+ for a comparable sorcery). You should NOT pick this build if: you prefer slow heavy weapons with poise trading; you want to use incantations instead of sorceries; you struggle with FP management and flask allocation; you are fighting Elden Beast or Radagon (both highly resistant to magic damage). The most common mistake is treating Moonveil as a primary melee weapon\u2014it fills the same role as a spell catalyst, not a main hand weapon. Your R1 is backup; Transient Moonlight is your primary attack."
      },
      {
        heading: "Stat Distribution vs Dark Moon Greatsword Build",
        level: 2,
        content:
          "Moonveil build at RL 150: Vigor 50, Mind 30, Endurance 20, DEX 18, INT 70. Dark Moon Greatsword build (comparison): Vigor 50, Mind 25, Endurance 25, STR 16, DEX 20, INT 68. The key difference: Moonveil reaches 70 INT faster because it needs only 18 DEX and 12 STR, saving 8 points you can put into Mind. Dark Moon Greatsword deals about 10% more raw damage per charged R2 but costs 30% more FP per use. For most PvE encounters, Moonveil\'s faster attack speed and lower FP cost give higher DPS. Dark Moon only wins against magic-resistant enemies where its magic damage still connects while your sorceries bounce off.",
        image: "elden-ring-moonveil-stats.jpg",
        imageAlt: ""
    },
      {
        heading: "Weapon and Spell Synergy",
        level: 2,
        content:
          "Your damage comes from three overlapping sources. 1) Transient Moonlight weapon art: 16 FP, 180% INT scaling, stance damage equal to a greatsword. Use the heavy input (horizontal slash) for groups and the light input (vertical slice) for single targets. 2) Carian Slicer: 8 FP, 240% INT scaling per second on dagger-speed swings. Use this for DPS windows during boss openings. 3) Night Comet: 26 FP, invisible to NPC dodgers\u2014essential for dungeons with sorcery-reading enemies. The synergy trap: players try to cast Terra Magicus + Comet Azur for one-shot kills. This wastes FP and misses 90% of the fight. Instead, weave Carian Slicer between Moonveil R2s for sustained DPS. For armor, aim for 51 poise using the Scale set + Bull-Goat Talisman, not the full Veteran set\u2014the extra equip load investment isn\'t worth the minimal defense gain.",
        image: "elden-ring-moonveil-combat.jpg",
        imageAlt: ""
    },
      {
        heading: "Progression Path \u2014 When to Transition",
        level: 2,
        content:
          "Early game (Level 25-50): Rush 18 DEX by Limgrave, then INT to 30. Cross the bridge to Caelid immediately to fight Magma Wyrm for Moonveil\u2014bring a bleed weapon and summon. Mid game (Level 50-90): INT to 50, Carian Regal Scepter, Shard of Alexander from Jar Alexander quest. Intelligence investment should outpace Vigor at this stage. Late game (Level 90-150): INT 70-80. This build peaks at 70 INT\u2014going to 80 gives only 5% more damage. Put remaining points into Mind for more weapon art casts. The build drops off after Malenia because endgame bosses (Godfrey, Radagon, Elden Beast) have high magic resistance. At that point, respec to a Cold-infused weapon build with INT/STR split, or accept the lower damage and focus on spell variety."
      },
      {
        heading: "Comparison vs Wing of Astel",
        level: 2,
        content:
          "Wing of Astel (also INT curved sword): Lower AR per hit (490 vs 580 at 70 INT) but costs 50% less FP per weapon art use. Wing of Astel excels in tight boss fights where you need sustained pressure over 90 seconds; Moonveil wins in fights under 60 seconds where burst matters more. Against Malenia, Wing of Astel\'s Nebula does 30% more stance damage. Against Mohg, Moonveil\'s range advantage lets you hit during his bloodflame pools. Trade-off summary: Moonveil for open world and invasions; Wing of Astel for boss fights where you go through 3+ FP flasks."
      },
      {
        heading: "Common Mistakes",
        level: 2,
        content:
          "Most players mess up by: (1) using Moonveil R1 as primary attack\u2014it does 30% less DPS than two-handing and weapon-arting. (2) skipping Mind investment\u2014with 15 Mind you get 4 weapon art casts per flask; with 30 Mind you get 8 casts. (3) wearing light armor for the \'mage aesthetic\'\u2014Moonveil requires you to be close to use Transient Moonlight, and low poise means any hit staggers you out of the weapon art. (4) not using the backstep version of Transient Moonlight for closing gaps\u2014the R2 follow-up has better range and stun potential than the R1 version."
      }
    ],
    internalLinks: [
      { href: "/elden-ring/builds", anchorText: "All Elden Ring Builds" },
      { href: "/elden-ring/weapons", anchorText: "All Elden Ring Weapons" },
      { href: "/elden-ring/bosses", anchorText: "All Elden Ring Boss Guides" },
      { href: "/elden-ring", anchorText: "Elden Ring Game Hub" }
    ]
  },
{
  slug: "elden-ring-pure-dex-bleed-build",
  category: "builds",
  gameSlug: "elden-ring",
  difficulty: "intermediate",
  readTimeMinutes: 9,
  order: 3,
  title: "Elden Ring Pure Dexterity Bleed Build - Samurai Arcane Setup",
  metaDescription: "Is the pure DEX bleed build worth the stat investment? Full comparison vs Bloodhound's Fang and Moonveil.",
  sections: [
    {
      heading: "Decision - Should You Use This Build?",
      level: 2,
      content: "The Pure DEX Bleed build is Elden Ring's highest burst-damage setup against bleedable bosses but the most binary build in the game. Pick this if: you want to delete bosses in under 30 seconds (Malenia in 18s, Mohg in 12s); you enjoy aggressive jump attack pressure. Do NOT pick this if: fighting bleed-immune bosses (Elden Beast, Radagon, Gargoyles, Crystalians, Rennala phase 1 - about 20% of bosses); you prefer safe ranged play. Bloodhound's Fang is a better all-rounder for first playthroughs. Moonveil is better for hybrid ranged/melee."
    },
    {
      heading: "Stat Distribution vs Bloodhound's Fang Build",
      level: 2,
      content: "Bleed build at RL 150: Vigor 50, Mind 12, Endurance 30, STR 18, DEX 55, ARC 45. Bloodhound build: Vigor 50, Endurance 30, STR 50, DEX 60. Bleed build needs only 18 STR for RoB (12 + 2-handing), freeing 30+ points for Arcane. Bloodhound needs 40 STR. Trade-off: Bloodhound deals 700-800 AR per R1. Bleed deals 450-550 per L1 but procs 15% max HP every 4 hits. Against 10k HP bosses, bleed adds 1700 damage per proc = 30-50% higher DPS. Against bleed-immune, Bloodhound does 60% more raw damage.",
      image: "elden-ring-pure-dex-bleed-stats.jpg",
      imageAlt: ""
    },
    { heading: "Weapon Loadout and Talisman Synergy", level: 2, content: "Left hand Rivers of Blood +10, Right hand Uchigatana +25 with Seppuku (Blood affinity). Seppuku adds 30 bleed buildup per weapon for 60s. White Mask +10% attack on bleed proc. Lord of Blood's Exultation +20% attack for 20s after bleed. Stack: 1.1 x 1.2 = 32% increase. Talismans: Lord of Blood's Exultation, Shard of Alexander, Claw Talisman, Dragoncrest Greatshield. Rotational priority: Seppuku > jump L1 > Corpse Piler when bleed procs." },
    { heading: "Progression Path", level: 2, content: "Early (1-40): Samurai start, dual Uchigatanas with Bloody Slash. Focus VGR 25, DEX 30. Mid (40-80): Yura questline for RoB, farm White Mask at Mohgwyn. DEX 40, VGR 35. Late (80-150): DEX 55, ARC 45. Carry Cold-infused Zweihander +25 for Radagon/Elden Beast." },
    { heading: "Three-Way Comparison", level: 2, content: "Bleed build: 3500 DPS vs bleedable bosses. Bloodhound: 2400 DPS consistent. Moonveil: 2800 DPS with range safety. Malenia kill times: bleed 18s, Moonveil 60-80s, Bloodhound 90+s. First playthrough pick: Bloodhound. Boss rush pick: bleed." },
    { heading: "Common Mistakes", level: 2, content: "(1) Not using Seppuku before boss fights. (2) Dual RoB instead of RoB + Seppuku Uchi. (3) No Dragoncrest Greatshield - one mistake kills. (4) No backup for bleed-immune bosses. (5) Spamming Corpse Piler instead of jump L1s - jump L1s stagger in 3-4 hits." }
  ],
  internalLinks: [
    { href: "/elden-ring/builds", anchorText: "All Elden Ring Builds" },
    { href: "/elden-ring/weapons", anchorText: "All Elden Ring Weapons" },
    { href: "/elden-ring/bosses", anchorText: "All Elden Ring Boss Guides" },
    { href: "/elden-ring", anchorText: "Elden Ring Hub" }
  ]
},
{
  slug: "godrick-the-grafted",
  category: "bosses",
  gameSlug: "elden-ring",
  difficulty: "beginner",
  readTimeMinutes: 7,
  order: 1,
  title: "Godrick the Grafted Boss Guide - Phase Breakdown & Attack Patterns",
  metaDescription: "Is Godrick harder than Margit? Full phase breakdown with dodge timings. Grafted dragon phase 2 explained. Best weapons, summons, level recommendations.",
  sections: [
    {
      heading: "Decision - Should You Fight Godrick First?",
      level: 2,
      content: "Godrick is easier than Margit but blocks access to Liurnia. Fight at level 35+ with +5 weapon. Below 30? Explore Weeping Peninsula first. Difficulty: 6/10. Weak to strike damage, bleed, and lightning. Resists holy (40% resistance). Margit tests dodge timing; Godrick tests positioning."
    },
    {
      heading: "Phase 1 Attack Patterns (100% to 60% HP)",
      level: 2,
      content: "Seven attacks: (1) Overhead axe slam - 2s windup, roll RIGHT at last moment, 2-hit punish. (2) Five-hit spinning combo - block first 2 with Brass Shield, roll away, 3-hit punish. (3) Shockwave stomp - JUMP to avoid, not roll. (4) Ground sweep - jump over and attack. (5) Grab - strafe left, charged R2 on back. (6) Leaping slam - roll INTO him. (7) Wind funnel - strafe sideways. All leave 2-3s windows.",
      image: "elden-ring-godrick-phase1.jpg",
      imageAlt: ""
    },
    { heading: "Phase 2 - The Grafted Dragon", level: 2, content: "At 60% HP he grafts dragon head. New moves: (1) Fire breath cone - sprint BEHIND him. (2) Dragon bite lunge - roll INTO it. (3) Fire tornado - run to max range, dont punish. (4) Ground fire lines - stand between lines. Key: stay behind him always in phase 2. Punish only after fire breath and bite lunge." },
    { heading: "Recommended Builds vs Godrick", level: 2, content: "Best: Large Club (strike damage), Bloodhound's Fang (bleed), Claymore with Lightning. Worst: holy weapons. Best summons: Nepheli Loux (sign outside fog gate). Best spells: Lightning Spear, Rock Sling. Use Dragoncrest Shield +1 for fire resist in phase 2." },
    { heading: "Common Mistakes", level: 2, content: "(1) Staying in front in phase 2 - get behind him. (2) Rolling through tornado - run away. (3) Not using Nepheli Loux. (4) Fighting before collecting Stormveil Golden Seeds. (5) Using holy damage." }
  ],
  internalLinks: [
    { href: "/elden-ring/bosses", anchorText: "All Boss Guides" },
    { href: "/elden-ring/bosses", anchorText: "All Elden Ring Boss Guides" },
    { href: "/elden-ring/builds", anchorText: "Elden Ring Builds" },
    { href: "/elden-ring", anchorText: "Elden Ring Hub" }
  ]
},
{
  slug: "rivers-of-blood",
  category: "weapons",
  gameSlug: "elden-ring",
  difficulty: "intermediate",
  readTimeMinutes: 8,
  order: 1,
  title: "Rivers of Blood Guide - Corpse Piler, Arcane Scaling & Best Builds",
  metaDescription: "Is Rivers of Blood still the best katana? Corpse Piler timing, arcane cap at 45, comparison vs Moonveil and Hand of Malenia, and when NOT to use it.",
  sections: [
    {
      heading: "Decision - Should You Use Rivers of Blood?",
      level: 2,
      content: "RoB is the highest-DPS weapon against bleedable targets but a specialist. Use if: melting bosses under 20s, you have Arcane investment, fighting bleedable bosses (Malenia, Mohg, Godfrey). Do NOT use if: fighting bleed-immune bosses (Elden Beast, Radagon, gargoyles, Rennala); you want PvP weapon (Corpse Piler is easy to dodge post-nerf). Moonveil is better for range. Hand of Malenia has higher potential but harder to land."
    },
    {
      heading: "Corpse Piler - Timing and Positioning",
      level: 2,
      content: "L2 > R1 (horizontal slash, 360 arc, groups/mobile bosses). L2 > R2 (overhead vertical, single targets, stance breaks). Bleed procs on SECOND hit - always commit to 2 hits. 16 FP per cast. At 20 Mind = 6 casts per flask. Range: 2/3 of Moonveil's Transient Moonlight. The weapon art tracks slightly - if first hit misses, second re-adjusts.",
      image: "elden-ring-rivers-of-blood-corpse-piler.jpg",
      imageAlt: ""
    },
    { heading: "Comparison vs Moonveil", level: 2, content: "RoB at 50 DEX/45 ARC: 565 AR + 112 bleed. Moonveil at 70 INT: 580 AR. RoB does 30% more DPS vs bleedable bosses. Moonveil does 40% more vs magic-weak. Key: Moonveil projectile = safer range. Corpse Piler = need to be close. For Mohg: RoB wins (bleed + hits through phase transition). Rennala: Moonveil wins (distance + magic weakness). Malenia: RoB kills in 18s vs 45s for Moonveil." },
    { heading: "Stat Scaling and Arcane Cap", level: 2, content: "Scales D STR, C DEX, D ARC at +10. Bleed buildup scales with ARC up to 45 (hard cap). Past 45, +1-2 bleed per level. Physical soft caps at 50 DEX. Optimal: 50 DEX / 45 ARC at RL 150. 80 DEX / 60 ARC adds only 12% more damage for 45 stat points." },
    { heading: "Progression and Upgrades", level: 2, content: "Found in Mountaintops of Giants after capital. Complete Yura questline through Altus Plateau. Upgrade: Somber Smithing Stones to +10. Before RoB: use Bloody Slash Uchigatana. Switch to RoB as soon as obtained - outclasses every other bleed weapon for PvE boss killing." },
    { heading: "Common Mistakes", level: 2, content: "(1) Only using Corpse Piler - L1 power-stance does more stance damage. (2) No Mind investment - 10 Mind = 2 Corpse Piler casts per flask. (3) Using RoB vs bleed-immune enemies - switch weapon. (4) Not using Seppuku offhand trick - put Seppuku on left-hand Uchigatana for +30 bleed to both weapons." }
  ],
  internalLinks: [
    { href: "/elden-ring/weapons", anchorText: "All Weapons" },
    { href: "/elden-ring/builds/elden-ring-pure-dex-bleed-build", anchorText: "Pure DEX Bleed Build" },
    { href: "/elden-ring/bosses", anchorText: "All Elden Ring Boss Guides" },
    { href: "/elden-ring", anchorText: "Elden Ring Hub" }
  ]
  },
{
  slug: "best-dexterity-build",
  category: "builds",
  gameSlug: "elden-ring",
  difficulty: "beginner",
  readTimeMinutes: 8,
  order: 2,
  title: "Best Dexterity Build in Elden Ring (2026 Guide) – Fast DPS, Early Game Power Build",
  metaDescription: "Complete Elden Ring Dexterity build guide with best weapons, stat priority, early to late game progression, and comparison vs Strength build.",
  sections: [
    {
      heading: "Is Dexterity Build Worth It?",
      level: 2,
      content: "Dexterity builds in Elden Ring are one of the most efficient and beginner-friendly playstyles for new players. They focus on fast attacks, high mobility, and consistent damage output rather than heavy armor or slow weapons. Yes — Dexterity builds are one of the strongest early-to-mid game options. They are ideal if you prefer: Fast attack speed, High mobility combat, Dodge-based survival instead of blocking. However, Dexterity builds are weaker in terms of poise and can struggle if you get hit frequently."
    },
    {
      heading: "Best Weapons for Dexterity Build",
      level: 2,
      content: "The best Dexterity weapons focus on speed, bleed buildup, and scaling efficiency. Recommended Weapons: Bloodhound's Fang (best early-mid game weapon), Uchigatana (starter katana), Nagakiba (long-range katana option). Bloodhound's Fang is best because: High base damage early game, Strong bleed buildup, Unique mobility weapon skill (Bloodhound's Finesse), Scales into late game without falling off.",
      image: "elden-ring-dexterity-build.jpg",
      imageAlt: "Dexterity combat action with katana fast attack",
    },
    {
      heading: "Stat Priority for Dexterity Build",
      level: 2,
      content: "Recommended stats: Vigor: 40 (survival priority), Dexterity: 40–60 (main damage scaling), Endurance: 15–25 (stamina + equip load), Mind: optional (for weapon skills). Key rule: Do NOT over-invest in Dexterity early. Vigor matters more in early game."
    },
    {
      heading: "Early / Mid / Late Game Progression",
      level: 2,
      content: "Early Game (Level 1–40): Use Uchigatana or basic curved swords. Focus on upgrading survivability first. Avoid over-farming damage stats. Mid Game (Level 40–90): Switch to Bloodhound's Fang. Start scaling Dexterity properly. Begin boss-focused gameplay. Late Game (Level 90+): Hybrid Dexterity builds become stronger. Combine bleed + skill-based weapons. Optimize talismans for damage output."
    },
    {
      heading: "Strengths and Weaknesses",
      level: 2,
      content: "Strengths: High DPS output, Very fast attack animations, Strong bleed synergy, Beginner friendly once mastered. Weaknesses: Low poise defense, Punished heavily if hit, Requires good dodging skill."
    },
    {
      heading: "Dexterity vs Strength Build",
      level: 2,
      content: "In Elden Ring builds: Dexterity: Faster gameplay, Higher mobility, Lower defense. Strength: Slower attacks, Higher poise, Burst damage + stagger. Conclusion: Dexterity is better for skill-based players, Strength is better for tank-style players."
    },
  ],
  internalLinks: [
    { href: "/elden-ring", anchorText: "Elden Ring Hub" },
    { href: "/elden-ring", anchorText: "Elden Ring Hub" },
    { href: "/elden-ring/weapons", anchorText: "All Elden Ring Weapons" },
    { href: "/elden-ring/builds", anchorText: "All Elden Ring Builds" }
  ]
},

  {
    slug: "margit-guide",
    category: "bosses",
    gameSlug: "elden-ring",
    difficulty: "beginner",
    readTimeMinutes: 10,
    order: 1,
    title: "How to Beat Margit the Fell Omen in Elden Ring (2026 Complete Guide)",
    metaDescription: "Learn how to beat Margit the Fell Omen in Elden Ring. Discover recommended level, weaknesses, attack patterns, and best beginner strategies.",
    sections: [
      {
        heading: "",
        level: 2,
        content: "Margit the Fell Omen is one of the first major bosses you encounter in Elden Ring, blocking your path to Stormveil Castle. While he is a tough fight for beginners, understanding his delayed attack patterns and coming prepared at the right level makes him manageable.\n\nThis guide covers recommended levels, weaknesses, attack patterns, and the best strategies to defeat Margit efficiently.",
        image: "margit-boss-fight.jpg",
        imageAlt: "Margit the Fell Omen boss fight in Elden Ring outside Stormveil Castle",
      },
      {
        heading: "Quick Answer",
        level: 2,
        content: "Margit the Fell Omen is easiest to defeat at Level 20\u201330 with a +2 to +3 weapon. Use Spirit Ashes, avoid panic rolling, and punish after his delayed attacks. Bleed weapons such as Bloodhound\u2019s Fang and Uchigatana are highly effective.\n\nCategory Recommendation:\nRecommended Level 20\u201330\nWeapon Upgrade +2 to +3\nBest Damage Type Bleed\nSpirit Ashes Recommended\nOptional Item Margit\u2019s Shackle\nDifficulty Medium"
      },
      {
        heading: "What Level Should You Be for Margit?",
        level: 2,
        content: "Most players should be Level 20\u201330 before attempting Margit.\n\nIf the fight feels too hard, you are likely under-leveled.\n\nRecommended Exploration Areas:\nLimgrave\nWeeping Peninsula\nMurkwater Cave\nMistwood\n\nThese areas provide runes and upgrade materials.\n\nRecommended Stats:\nVigor: 20+\nMain Damage Stat: 20+\nEndurance: 12\u201315\n\nVigor is more important than damage early game."
      },
      {
        heading: "Margit\u2019s Weaknesses",
        level: 2,
        content: "Margit has no major elemental weakness, but he is vulnerable to:\n\nBleed damage\nJump attacks\nStagger damage\nSpirit Ash distractions\n\nBest Early Weapons Against Margit:\n\nBloodhound\u2019s Fang:\nHigh base damage\nStrong weapon skill\nBleed buildup\nExcellent reach\n\nUchigatana:\nFast attacks\nEasy bleed application\nBeginner friendly\n\nClaymore:\nStrong stagger\nSafe jump attacks",
        image: "margit-location.jpg",
        imageAlt: "Stormveil Castle entrance where Margit the Fell Omen is encountered in Elden Ring",
      },
      {
        heading: "Margit\u2019s Attack Patterns",
        level: 2,
        content: "Understanding timing is more important than damage.\n\nStaff Combo:\nMargit delays attacks to punish panic rolling.\n\nStrategy:\nWait for swing\nRoll into attack\nPunish once\n\nJump Slam:\nHe jumps and slams the ground.\n\nStrategy:\nRoll toward him at last moment\nUse jump attack after dodge\n\nHoly Dagger Throw:\nHe summons floating daggers during pressure phases.\n\nStrategy:\nMove sideways\nDo not heal immediately"
      },
      {
        heading: "Best Strategy for Beginners",
        level: 2,
        content: "Step 1 \u2014 Summon Spirit Ashes\nCreates distraction and reduces pressure.\n\nStep 2 \u2014 Play Patiently\nDo not attack after every dodge.\n\nStep 3 \u2014 Use Safe Hits Only\nOne safe hit is better than three risky hits.\n\nStep 4 \u2014 Use Jump Attacks\nHelps build stagger quickly."
      },
      {
        heading: "Margit\u2019s Shackle Location",
        level: 2,
        content: "Margit\u2019s Shackle is sold by Patches in Murkwater Cave.\n\nEffects:\nTemporarily stuns Margit\nCan be used twice in Phase 1\nCreates free damage windows",
        image: "margit-shackle.jpg",
        imageAlt: "Patches the NPC in Murkwater Cave who sells Margit\u2019s Shackle in Elden Ring",
      },
      {
        heading: "Phase Two Guide",
        level: 2,
        content: "At ~60% HP, Margit gains:\n\nHoly hammer attacks\nLonger combos\nFaster aggression\n\nStrategy:\nStay patient\nDo not panic roll\nFocus on safe punish windows"
      },
      {
        heading: "Common Mistakes",
        level: 2,
        content: "Rolling Too Early:\nMargit punishes panic rolling heavily.\n\nIgnoring Vigor:\nSurvivability is more important than damage.\n\nFighting Under-Leveled:\nExploration is intended in Elden Ring.\n\nGreedy Attacks:\nOne hit is often optimal."
      },
      {
        heading: "Rewards",
        level: 2,
        content: "Defeating Margit grants:\n\nTalisman Pouch\nAccess to Stormveil Castle\nStory progression"
      },
      {
        heading: "Frequently Asked Questions",
        level: 2,
        content: "What level should I be for Margit?\nLevel 20\u201330 is recommended.\n\nWhat is Margit\u2019s weakness?\nBleed, stagger, and Spirit Ashes.\n\nCan I skip Margit?\nYou can explore first, but he must be defeated to progress.\n\nIs Bloodhound\u2019s Fang good?\nYes, it is one of the best early-game weapons."
      },
    ],
    internalLinks: [
      { href: "/elden-ring/builds/best-dexterity-build", anchorText: "Best Dexterity Build in Elden Ring" },
      { href: "/elden-ring", anchorText: "Elden Ring Hub" }
    ]
  },
];

export function getArticlesForGame(
  gameSlug: string,
  category?: string
): Article[] {
  return articles.filter(
    (a) =>
      a.gameSlug === gameSlug &&
      (category ? a.category === category : true)
  );
}

export function getArticleBySlug(
  slug: string,
  gameSlug: string
): Article | undefined {
  return articles.find((a) => a.slug === slug && a.gameSlug === gameSlug);
}

export function getAllArticleSlugs(): { slug: string; gameSlug: string; category: string }[] {
  return articles.map((a) => ({ slug: a.slug, gameSlug: a.gameSlug, category: a.category }));
}

export const ARTICLE_CATEGORIES = ["builds", "bosses", "weapons", "walkthroughs"] as const;
