import type { Article } from "./articles";

// ═══ ELDEN RING — WALKTHROUGHS ═══
const article52: Article = {
  slug: "best-starting-class-guide",
  category: "walkthroughs",
  gameSlug: "elden-ring",
  difficulty: "beginner",
  readTimeMinutes: 12,
  order: 52,
  title: "Elden Ring Best Starting Class Guide (2026): Which Class Should You Pick?",
  metaDescription:
    "Complete Elden Ring starting class guide for 2026. Compare all 10 classes with stat efficiency math, best picks for each build, and which class saves you wasted levels at RL 150. Use the [Rune Level Calculator](https://www.zosygo.com/elden-ring/tools/rune-level-calculator) to plan your leveling path.",
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "Your starting class in Elden Ring determines your stat spread, starting equipment, and the first few hours of gameplay.\n\nHere's the truth most guides won't tell you:\n\nFor most builds, one or two classes are mathematically superior, and picking wrong costs you 5\u201310 wasted levels by endgame.\n\nThis guide ranks every class for different build types, shows you the exact stat efficiency math, and tells you which class to pick whether you're a new player or planning a level 150 meta build.",
    },
    {
      heading: "Quick Decision Tree: Pick Your Starting Class in 30 Seconds",
      level: 2,
      content:
        "**New player who doesn\u2019t know their build?**\n\u2192 **Vagabond** \u2014 Best shield, best HP, flexible into most physical builds.\n\n**Want to be a mage?**\n\u2192 Pure Int: **Astrologer** / Int/Dex spellblade: **Prisoner**\n\n**Want big weapons?**\n\u2192 Pure Strength: **Hero** / Str/Faith: **Confessor**\n\n**Want fast weapons and bleed?**\n\u2192 Dex: **Samurai** or **Warrior** / Arcane bleed: **Bandit**\n\n**Want Faith casting?**\n\u2192 Pure Faith: **Prophet** / Faith hybrid: **Confessor**\n\n**Building a PvP meta character (RL 125\u2013150)?**\n\u2192 Use a build calculator to check stat efficiency. Most versatile: **Samurai**.\n\nTest your class choice with the [Build Calculator](https://www.zosygo.com/elden-ring/tools/build-calculator) before committing.",
    },
    {
      heading: "Should You Worry About Your Starting Class?",
      level: 2,
      content:
        "**For casual playthroughs:** Pick whatever looks fun. You can beat the game with any class.\n\n**For PvP meta builds (RL 125\u2013150):** Your starting class matters a lot. A bad pick wastes 3\u20138 stat points you can never recover.\n\n**For challenge runs / low-level builds:** Your starting class is critical. A wasted point at RL 1 or RL 30 is a permanent handicap.\n\nThe math is simple: every class starts with a fixed sum of 79 stat points (except Wretch at 80), but those points are distributed differently. If your build dumps stats like Faith or Arcane, you want a class that puts minimal points there.",
    },
    {
      heading: "The Stat Efficiency Problem Explained",
      level: 2,
      content:
        "Here\u2019s the key insight most starting class guides miss:\n\n**Optimal starting class is about minimizing wasted points, not maximizing starting stats.**\n\nEvery class has \u201cdumped\u201d stats \u2014 points in attributes you won\u2019t use. The Wretch technically has the most total points (80), but its even spread means most builds waste more points than they save.\n\n**Example:** A pure Strength build at RL 150 needs:\n- 60 Vigor, 25 Mind, 30 Endurance, 80 Strength\n- 15 Dexterity (minimum for most str weapons)\n- Base Intelligence, Faith, Arcane\n\n**Best class for pure Strength:** Hero (7 Int, 8 Fth, 11 Arc \u2192 9 points \u201cwasted\u201d in unusable stats)\n**Worst class for pure Strength:** Astrologer (16 Int you\u2019ll never use = 7 points wasted vs Hero)\n\nThat 7-point difference at RL 150 means you either lose damage or HP. In PvP, that\u2019s a loss. Use the [Rune Level Calculator](https://www.zosygo.com/elden-ring/tools/rune-level-calculator) to plan how many runes you need to reach your target build."    },
    {
      heading: "The 10 Starting Classes: Quick Reference Table",
      level: 2,
      content: "",
      table: {
        headers: ["Class", "Total Stats", "Best For", "Worst For"],
        rows: [
          ["Vagabond", "79", "Quality, Pure Str, Str/Fth", "Pure Int, Arcane"],
          ["Samurai", "79", "Dex, Quality, Bleed", "Pure caster builds"],
          ["Hero", "79", "Pure Str, Str/Arc", "Any caster build"],
          ["Warrior", "79", "Dex, Power-stancing", "Low-Dex builds"],
          ["Astrologer", "79", "Pure Int, Int/Dex", "Faith or Arcane builds"],
          ["Prisoner", "79", "Int/Dex, Spellblade", "Pure physical builds"],
          ["Confessor", "79", "Str/Fth, Dex/Fth", "Pure Int builds"],
          ["Prophet", "79", "Pure Fth, Fth/Str", "Arcane or Int builds"],
          ["Bandit", "79", "Arc/Dex, Bleed", "Faith or Int builds"],
          ["Wretch", "80", "Nothing (flexible)", "Anything optimized"],
        ],
      },
    },
    {
      heading: "Class-by-Class Breakdown",
      level: 2,
      content:
        "Each class is analyzed below with its strengths, weaknesses, starting gear, stat efficiency, and the builds it optimizes for.",
    },
    {
      heading: "Vagabond \u2014 Best All-Rounder for New Players",
      level: 3,
      content:
        "**Best for:** Quality builds, pure Strength, first playthrough\n**Stats that matter:** 15 VGR, 14 STR, 13 DEX \u2014 the most HP of any starting class\n**Starting gear:** Longsword, halberd, heater shield (100% physical block)\n**Wasted stats:** 9 Faith and 9 Int (fine for most physical builds)\n\nThe Vagabond is the safest pick for anyone unsure what build they want. It starts with the best shield in the game (heater shield), solid early weapons, and enough HP to survive mistakes. The stat spread favors quality/strength builds, and you can respec later if you change your mind.\n\n**Pick Vagabond if:** You\u2019re a new player, unsure about your build, or building Quality/Strength.\n**Skip if:** You\u2019re building a pure caster.",
    },
    {
      heading: "Samurai \u2014 Best for Dex and Bleed Builds",
      level: 3,
      content:
        "**Best for:** Dexterity builds, bleed builds, katanas\n**Stats that matter:** 12 STR, 15 DEX, high starting damage\n**Starting gear:** Uchigatana, longbow, iron round shield\n**Wasted stats:** Minimal \u2014 the most \u201cefficient\u201d physical class for bleed builds\n\nThe Samurai starts with the Uchigatana \u2014 one of the best weapons in the game that can carry you to the final boss. The 15 Dexterity and 12 Strength are perfectly positioned for most dex weapons. The longbow gives you ranged options from minute one.\n\n**Pick Samurai if:** You want a Dex build, a bleed build, or a katana playthrough.\n**Skip if:** You\u2019re a pure caster (but Moonveil users can justify it).",
    },
    {
      heading: "Hero \u2014 Pure Strength King",
      level: 3,
      content:
        "**Best for:** Pure Strength, Strength/Arcane\n**Stats that matter:** 16 STR \u2014 highest starting Strength\n**Starting gear:** Battle axe, leather shield\n**Wasted stats:** 7 Int (lowest caster stat of any class)\n\nThe Hero has the most extreme stat spread \u2014 very high Strength, very low everything else. For a pure Strength build that never touches Faith, Int, or Arcane, this is mathematically the best class. The battle axe is serviceable until you find your real weapon.\n\n**Pick Hero if:** You\u2019re building pure Strength (colossal weapons, greatshields) or Str/Arc (Marais Executioner\u2019s Sword).\n**Skip if:** Your build uses Faith, Int, or Dex above base requirements.",
    },
    {
      heading: "Warrior \u2014 Dual-Wield Specialist",
      level: 3,
      content:
        "**Best for:** Dual-wielding, high Dex, status effect builds\n**Stats that matter:** 16 DEX \u2014 highest starting Dexterity\n**Starting gear:** Dual scimitars (power-stanced from the start)\n**Wasted stats:** Very efficient for pure Dex\n\nThe Warrior is the only class that starts with two weapons power-stanced. If you want to dual-wield katanas, curved swords, or thrusting swords, this is your class. The 16 Dexterity is the highest of any class, meaning you reach dex soft caps faster.\n\n**Pick Warrior if:** You\u2019re building pure Dex (especially dual-wield) or status effect builds.\n**Skip if:** You\u2019re building Strength (only 8 STR requires heavy investment).",
    },
    {
      heading: "Astrologer \u2014 The Mage\u2019s Choice",
      level: 3,
      content:
        "**Best for:** Pure Intelligence, Intelligence/Dexterity\n**Stats that matter:** 16 INT \u2014 highest starting Intelligence\n**Starting gear:** Astrologer\u2019s Staff, Glintstone Pebble spell\n**Wasted stats:** Only 7 Faith, but 11 Dex is fine for Moonveil builds\n\nThe Astrologer is the best pure mage start. The 16 Intelligence lets you cast most early spells immediately, and Glintstone Pebble is one of the best FP-efficient spells in the game. The staff is usable until you find Meteorite Staff or Carian Regal Scepter.\n\n**Pick Astrologer if:** You\u2019re building pure Intelligence or Int/Dex spellblade (Moonveil, Wing of Astel).\n**Skip if:** You\u2019re building Faith or Arcane.",
    },
    {
      heading: "Prisoner \u2014 The Spellblade Starter",
      level: 3,
      content:
        "**Best for:** Intelligence/Dexterity hybrid, spellblade\n**Stats that matter:** 14 INT, 14 DEX \u2014 the best hybrid caster spread\n**Starting gear:** Estoc, Glintstone Staff, magic sorcery\n**Wasted stats:** Relatively balanced, but 6 Arc is the lowest\n\nThe Prisoner is the optimized pick for the Moonveil spellblade build that dominates PvE and PvP. The 14 Int and 14 Dex hit the early requirements for most int/dex weapons, and the Estoc is a strong thrusting sword with excellent reach.\n\n**Pick Prisoner if:** You\u2019re building Int/Dex spellblade (Moonveil).\n**Skip if:** You\u2019re a pure caster (Astrologer has higher Int) or pure physical.",
    },
    {
      heading: "Confessor \u2014 Stealth Faith Knight",
      level: 3,
      content:
        "**Best for:** Strength/Faith, Dexterity/Faith, paladin builds\n**Stats that matter:** 12 STR, 12 DEX, 14 FTH \u2014 the most balanced Faith start\n**Starting gear:** Broadsword, finger seal, heal incantation\n**Wasted stats:** Only 6 Arc, but 10 Int is slightly annoying for pure Fth builds\n\nThe Confessor starts with both a solid melee weapon and a seal, meaning you can cast incantations from minute one. It\u2019s the best pick for any build that blends melee combat with Faith buffs or offensive incantations.\n\n**Pick Confessor if:** You\u2019re building a paladin (Blasphemous Blade, Golden Halberd) or Dex/Faith build.\n**Skip if:** You\u2019re building pure Int (wastes 10 Int).",
    },
    {
      heading: "Prophet \u2014 Pure Faith Specialist",
      level: 3,
      content:
        "**Best for:** Pure Faith, Faith/Strength\n**Stats that matter:** 16 FTH \u2014 highest starting Faith\n**Starting gear:** Finger seal, heal incantation, spear\n**Wasted stats:** 10 Int is painful for pure Fth builds\n\nThe Prophet has the highest starting Faith, making it the optimal pick for pure Faith casters. However, the 10 Intelligence is a minor waste for most Faith builds. The Confessor is often better for hybrid builds, but Prophet wins for pure caster Faith.\n\n**Pick Prophet if:** You\u2019re building pure Faith caster or Faith/Arc (Dragon Communion).\n**Skip if:** You\u2019re building Int or pure Strength (10 Int wasted hurts).",
    },
    {
      heading: "Bandit \u2014 Arcane Bleed Machine",
      level: 3,
      content:
        "**Best for:** Arcane builds, bleed builds, bow builds\n**Stats that matter:** 14 ARC \u2014 highest starting Arcane\n**Starting gear:** Buckler (best parry shield), shortbow, knife\n**Wasted stats:** Very efficient for Arc builds; 9 Fth and 8 Int are fine\n\nThe Bandit is the king of arcane builds. The 14 Arcane is the highest in the game, and the buckler is the best parry tool available. If you\u2019re building around bleed, the Bandit is mathematically the best starting class for any build that pushes Arcane past 40.\n\n**Pick Bandit if:** You\u2019re building Arcane/Dragon Communion, bleed (Rivers of Blood, Mohgwyn\u2019s Spear), or bow builds.\n**Skip if:** You\u2019re building Faith or Intelligence.",
    },
    {
      heading: "Wretch \u2014 The Challenge Start",
      level: 3,
      content:
        "**Best for:** Nothing specific, total flexibility\n**Stats that matter:** All 10s \u2014 perfectly even\n**Starting gear:** Club, wooden shield (no armor)\n**Wasted stats:** Every build wastes some points\n\nThe Wretch is NOT for optimization. It\u2019s for players who want the purest experience or a challenge start. The club is surprisingly effective (good stagger damage), but having no armor means you\u2019ll take significantly more damage in the early game.\n\n**Pick Wretch if:** You want a challenge run, or you\u2019re fashion-first and want full wardrobe freedom.\n**Skip if:** You\u2019re optimizing a PvP build or a new player (the early game will be brutal).",
    },
    {
      heading: "The Best Starting Class for Each Major Build (RL 150 Optimal)",
      level: 2,
      content:
        "After understanding each class individually, here is how they map to specific builds. This table assumes a level 150 meta build with optimized stat efficiency.",
      table: {
        headers: ["Build", "Best Starting Class", "Why"],
        rows: [
          ["Pure Strength (80 Str)", "Hero", "Lowest Int/Fth/Arc waste"],
          ["Quality (55/55 Str/Dex)", "Vagabond", "Perfect Str/Dex balance"],
          ["Pure Dexterity (80 Dex)", "Warrior", "Highest Dex, lowest waste"],
          ["Pure Intelligence (80 Int)", "Astrologer", "Highest Int, lowest Fth/Arc"],
          ["Pure Faith (80 Fth)", "Prophet", "Highest Fth"],
          ["Int/Dex Spellblade", "Prisoner", "Best Int/Dex balance"],
          ["Str/Fth Paladin", "Confessor", "Best Str/Fth/Dex balance"],
          ["Bleed/Arcane", "Bandit", "Highest Arc, lowest Int/Fth"],
          ["Dragon Communion", "Prophet", "16 Fth + 7 Arc combo"],
          ["Moonveil Build", "Prisoner", "Perfect 14/14 Int/Dex split"],
        ],
      },
    },
    {
      heading: "How the DLC Changed Starting Class Recommendations",
      level: 2,
      content:
        "Shadow of the Erdtree added new weapons that shifted some optimal starting class picks:\n\n- **Backhand Blades** (10 Str / 13 Dex) \u2192 Warrior or Samurai optimal\n- **Milady** (13 Str / 15 Dex) \u2192 Vagabond or Samurai\n- **Dryleaf Arts** (13 Str / 16 Dex) \u2192 Warrior is the optimal pick\n- **Great Katana** (18 Str / 22 Dex) \u2192 Vagabond is best for this stat spread\n\nThe big shift: DLC weapon requirements tend to favor quality builds (balanced Str/Dex) more than the base game. This means Vagabond has become even stronger as a starting class in the post-DLC meta.",
    },
    {
      heading: "Common Starting Class Mistakes",
      level: 2,
      content:
        "### 1. Picking Wretch for \u201coptimization\u201d\n\nThe Wretch has 80 total points vs everyone else\u2019s 79. That extra point sounds good, but the perfectly even spread means you waste 3\u20138 points in unusable stats for almost every build.\n\n### 2. Thinking class matters for endgame damage\n\nIt doesn\u2019t, really. A 5-point stat difference at level 150 translates to roughly 2\u20133% damage difference. Pick the class that makes your early game comfortable.\n\n### 3. Forgetting about Keepsakes\n\nYour starting class matters more than your keepsake, but don\u2019t waste the choice. Golden Seed is the safest pick for new players. Stonesword Key is better if you know where to use it.\n\n### 4. Assuming Samurai is always the bleed build pick\n\nThe Samurai starts with the Uchigatana, which is great for bleed. But if you\u2019re building for Arcane scaling (Occult infusion), the Bandit saves you more stat points.",
    },
    {
      heading: "Final Verdict: Which Class Should You Pick?",
      level: 2,
      content:
        "| Player Type | Pick This |\n|-------------|-----------|\n| Absolute beginner | Vagabond |\n| Returning player | Samurai |\n| PvP optimizer | Calculator-based (Samurai covers most) |\n| Challenge runner | Wretch |\n| Mage enthusiast | Astrologer |\n| Big bonk enthusiast | Hero |\n\nThe single best all-purpose starting class in Elden Ring (2026): **Vagabond**. Best HP, best starting shield, best stat spread for the widest range of builds. You won\u2019t regret it.",
    },
    {
      heading: "FAQ",
      level: 2,
      content:
        "### Does starting class matter in Elden Ring?\n\nYes, but mostly for optimization. You can beat the game with any class. Starting class matters most for PvP meta builds (RL 125\u2013150) where wasted stats permanently reduce build efficiency.\n\n### What is the best starting class for beginners?\n\nVagabond. It has the highest starting HP, the best shield (100% physical block), and flexible stats that work with most physical builds.\n\n### What is the best starting class for Strength builds?\n\nHero for pure Strength. Vagabond for Quality (Str/Dex). Confessor for Str/Faith.\n\n### What is the best starting class for Dexterity builds?\n\nWarrior for pure Dex (highest starting Dex). Samurai for bleed builds. Bandit for Arcane/Dex.\n\n### What is the best starting class for Intelligence builds?\n\nAstrologer for pure Int. Prisoner for Int/Dex spellblade builds.\n\n### What is the best starting class for Faith builds?\n\nProphet for pure Faith. Confessor for Faith hybrid builds.\n\n### What is the best starting class for bleed builds?\n\nBandit for Arcane-scaling bleed. Samurai if you want the Uchigatana start.\n\n### Does the Wretch have any advantage?\n\nThe Wretch has one extra total stat point (80 vs 79), but the even spread wastes points for almost every build. It\u2019s a challenge start, not an optimization start.\n\n### Can I change my starting class later?\n\nNo. You can respec attributes using Larval Tears, but your starting class is permanent. The wasted stats from a poor class choice can never be recovered.\n\nOnce you've chosen your class, test your weapon damage potential with the [Weapon AR Calculator](https://www.zosygo.com/elden-ring/tools/weapon-ar-calculator).",
    },
  ],
  internalLinks: [
    { href: "/elden-ring/walkthroughs/best-early-game-route", anchorText: "Best Early Game Route" },
    { href: "/elden-ring/builds/soft-caps-explained", anchorText: "Elden Ring Soft Caps Explained" },
    { href: "/elden-ring/builds/elden-ring-damage-scaling-explained", anchorText: "Damage Scaling Explained" },
    { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds Guide" },
    { href: "/elden-ring/builds/best-bleed-build", anchorText: "Best Bleed Build Guide" },
    { href: "/elden-ring/builds/best-intelligence-build", anchorText: "Best Intelligence Build Guide" },
    { href: "/elden-ring/builds/why-your-build-feels-weak", anchorText: "Why Your Build Feels Weak" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" },
    { href: "/elden-ring/tools/weapon-ar-calculator", anchorText: "Weapon AR Calculator" },
  ],
};

const article52articles = [article52];

export default article52articles;
