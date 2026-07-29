// lib/articles_1.ts — extracted inline articles
import type { Article } from "./articles";

const articles: Article[] = [
  {

    keyTakeaways: [

      { label: "🎯 Core Stats (Lv 150)", value: "Vigor 55–60, Mind 20–25, Endurance 20, Dexterity 50, Intelligence 60" },

      { label: "⚔️ Weapon Skill", value: "Transient Moonlight — horizontal (L2+R1) for groups, vertical (L2+R2) for stagger" },

      { label: "📊 Int Scaling", value: "40=Excellent, 50=Excellent, 60=Strong, 70=Good, 80=Diminishing" },

      { label: "🛡️ Best Starting Class", value: "Samurai — saves levels on Dexterity for Intelligence" },

      { label: "💡 Key Insight", value: "Push Vigor 55–60 before chasing Int 80 — survivability matters more" },

      { label: "🎮 Best Talismans", value: "Magic Scorpion, Shard of Alexander, Graven-Mass, Dragoncrest Greatshield" },

    ],

    slug: "moonveil-intelligence-build",

    category: "builds",

    gameSlug: "elden-ring",

    difficulty: "intermediate",

    readTimeMinutes: 10,

    order: 1,

    h1: "Moonveil Build Elden Ring 2026 – Best Intelligence Katana Setup",

    title: "Moonveil Build Elden Ring 2026 – Best INT Katana Stats, Talismans & Spells",

    metaDescription: "The ultimate Moonveil build guide for Elden Ring. Learn the best stats, Intelligence breakpoints, talismans, damage optimization, and PvE/PvP strategies.",

    sections: [

      {

        heading: "",

        level: 2,

        content:

          "Moonveil has stayed relevant through every major patch and DLC release because it combines four mechanics that most weapons only get one or two of: a fast katana moveset, bleed buildup, Intelligence scaling, and a ranged weapon skill that deals serious posture damage. Other top-tier weapons got nerfed or outclassed by new additions, but Moonveil kept showing up in build discussions because that combination is hard to beat.\n\nThis guide covers the stat breakpoints that actually matter, the talisman setup that maximizes Transient Moonlight, and the common leveling mistakes that waste 10-15 stat points on a typical RL 150 build. Use the [Build Planner](https://www.zosygo.com/elden-ring/tools/build-calculator) to test different stat distributions before spending Larval Tears.\n\n![Elden Ring screenshot](/images/articles/u=1067614621,3217285792&fm=253&fmt=auto&app=120&f=JPEG.webp)"

      },

      {

        heading: "Why Moonveil Is Still One of the Best Weapons",

        level: 2,

        content:

          "Transient Moonlight is the reason most players pick up Moonveil, but it's not the only reason the weapon stays viable. You get burst damage from the skill, a safe ranged option, fast recovery animations so you're not locked in place, posture damage that opens bosses for crits, and bleed buildup that chips percentage-based HP. Plus Intelligence scaling means you can run sorceries without splitting your stats awkwardly. That combination is hard to replace with any single weapon.",

        image: "moonveil-build-moonveil-weapon.png",

        imageAlt: "Moonveil katana build showcase with Transient Moonlight skill"

      },

      {

        heading: "How to Get Moonveil",

        level: 2,

        content:

          "Moonveil drops from the Magma Wyrm boss in Gael Tunnel, on the Caelid side of the border with Limgrave. You'll want to be at least level 50-70 before attempting the fight — the Wyrm's fire attacks and lava pools can one-shot underleveled characters, and the confined tunnel space makes it hard to create distance. Melee builds should watch for the lingering lava AoE. Sorcery users have a noticeably easier time here since they can punish from range while the Wyrm cycles through its slow attack patterns."

      },

      {

        heading: "Moonveil Weapon Overview",

        level: 2,

        content:

          "| Attribute | Value |\n|------------|------------|\n| Weapon Type | Katana |\n| Damage Type | Physical + Magic |\n| Passive Effect | Bleed (45) |\n| Skill | Transient Moonlight (16 FP) |\n| Primary Scaling | Intelligence |\n| Weight | 6.5 |\n\nTransient Moonlight has two variants: a horizontal slash (L2 > R1) that covers a wide arc for groups and mobile enemies, and an overhead vertical slash (L2 > R2) that deals higher stagger damage to single targets. Both fire a magic projectile reaching about two-thirds of a standard sorcery's range."

      },

      {

        heading: "Moonveil Damage Breakpoints Most Players Miss",

        level: 2,

        content:

          "Most build guides tell you to level Intelligence and stop there. They don't explain where the returns drop off, which means a lot of players end up at 80 Intelligence with 40 Vigor, wondering why they die in two hits. Understanding the actual value of each stat point makes a bigger difference than chasing a high number on the stat screen."

      },

      {

        heading: "Intelligence Scaling Efficiency",

        level: 3,

        content:

          "| Intelligence | Efficiency |\n|-------------|------------|\n| 40 | Excellent |\n| 50 | Excellent |\n| 60 | Strong |\n| 70 | Good |\n| 80 | Diminishing Returns |\n\nMoonveil continues gaining damage up to 80 Intelligence.\n\nHowever, the value of each additional level gradually decreases.\n\nThis means that pushing Intelligence from 70 to 80 often provides less overall benefit than investing those levels elsewhere."

      },

      {

        heading: "The Level 150 Optimization Problem",

        level: 3,

        content:

          "Build A runs 40 Vigor and 80 Intelligence. Build B runs 60 Vigor and 70 Intelligence. On paper Build A has higher damage numbers, but Build B wins more fights because you survive hits that would flatten Build A, which means more time actually dealing damage. The community consensus for endgame content is 60 Vigor as the baseline, and Moonveil's damage at 70 Intelligence is close enough to the 80 cap that the extra survivability is almost always worth the trade."

      },

      {

        heading: "Best Moonveil Stats (Level 150)",

        level: 2,

        content:

          "| Attribute | Value | Notes |\n|------------|------------|-------|\n| Vigor | 60 | Endgame baseline |\n| Mind | 25 | 6 Transient Moonlight casts per flask |\n| Endurance | 25 | Covers medium armor + Moonveil + staff |\n| Strength | 12 | Minimum requirement |\n| Dexterity | 30 | Cast speed + weapon requirement |\n| Intelligence | 70–80 | 70 is the sweet spot |\n| Faith | Base | Not needed |\n| Arcane | Base | Not needed |\n\nThe key takeaway: 60 Vigor is the floor for comfortable endgame play. Push Intelligence to 70, then decide whether the extra 10 points are better spent on Mind, Endurance, or pushing to 80. Most players get more value from the former."

      },

      {

        heading: "Why Dexterity Is Often Overrated",

        level: 2,

        content:

          "A common trap is investing heavily in Dexterity because Moonveil has DEX scaling listed. The issue is that Moonveil's damage is overwhelmingly tied to Intelligence — the magic portion scales almost entirely off INT, and Transient Moonlight is INT-weighted too. DEX gives a small physical damage bump and slightly faster cast speeds, but the returns are mediocre compared to what you get from pushing Vigor or Intelligence. The priority order that works best: 60 Vigor first, then 70 Intelligence, then Mind if you're running low on FP, and only after those are covered should you consider adding DEX."

      },

      {

        heading: "Best Talismans for Moonveil",

        level: 2,

        content: ""

      },

      {

        heading: "Shard of Alexander",

        level: 3,

        content:

          "Boosts Transient Moonlight damage by 15%. If you're building around Moonveil's weapon skill, this is the first talisman slot you fill. The damage increase applies to both the melee hit and the projectile, so it boosts your entire burst combo."

      },

      {

        heading: "Magic Scorpion Charm",

        level: 3,

        content:

          "A 12% magic damage boost that applies to Moonveil's weapon skill and any sorceries you're running. The trade-off is reduced damage negation, so it works best when you're confident in your dodging. Pair it with Dragoncrest Greatshield Talisman to offset the defense penalty."

      },

      {

        heading: "Dragoncrest Greatshield Talisman",

        level: 3,

        content:

          "A 20% physical damage reduction that makes a noticeable difference in late-game and DLC fights where bosses hit hard. This is the defensive counterpart to Magic Scorpion Charm — running both gives you damage and survivability in one package."

      },

      {

        heading: "Carian Filigreed Crest",

        level: 3,

        content:

          "Cuts FP cost of weapon skills by 25%. If you're chugging blue flasks more than red ones, this talisman extends your combat uptime significantly. It's a quality-of-life pick that becomes more valuable the more aggressively you use Transient Moonlight.\n\n![Elden Ring screenshot](/images/articles/u=1563453329,401002841&fm=253&app=138&f=JPEG.jpeg)"

      },

      {

        heading: "Best Spells for Moonveil Builds",

        level: 2,

        content: ""

      },

      {

        heading: "Night Comet",

        level: 3,

        content:

          "A top-tier PvE spell because enemies — including bosses — don't try to dodge it. Unlike Glintstone Pebble or Comet, which trigger enemy evasion AI, Night Comet's projectile is invisible to most enemies. This means you land consistent damage without the spell whiffing due to erratic movement."

      },

      {

        heading: "Terra Magica",

        level: 3,

        content:

          "A 35% magic damage buff that stacks with other boosts. The catch is you have to stay within the sigil, which limits mobility. Best used during boss phase transitions or when a summon is holding aggro."

      },

      {

        heading: "Comet",

        level: 3,

        content:

          "High-damage single-target projectile that works well as a general-purpose ranged option. More expensive FP-wise than Night Comet, but hits harder when it lands."

      },

      {

        heading: "Carian Slicer",

        level: 3,

        content:

          "Extremely FP-efficient melee-range spell that out-damages most weapons per FP spent. Useful as a backup option when enemies close the gap and you don't want to switch off your staff."

      },

      {

        heading: "Best Physick Tears",

        level: 2,

        content:

          "**Magic-Shrouding Cracked Tear:** Boosts magic damage by roughly 20% for three minutes. Directly improves Transient Moonlight and sorcery damage.\n\n**Intelligence-Knot Crystal Tear:** Temporarily adds 10 Intelligence. Useful for meeting spell requirements or pushing past a damage breakpoint during a boss fight. Stack both in the Physick for a significant burst window."

      },

      {

        heading: "PvE Strategy",

        level: 2,

        content:

          "Moonveil's PvE strength is that it lets you fight at a distance without sacrificing damage. The general loop: open with Physick and any self-buffs, create spacing with sprint or a dodge, hit with Transient Moonlight until the enemy's stance breaks, then close in for a critical attack. Many bosses that are weak to stagger — Crucible Knights, Tree Sentinels, even some endgame bosses — can be locked into this cycle. The key is not overcommitting: one or two Transient Moonlight hits, then reposition."

      },

      {

        heading: "PvP Strategy",

        level: 2,

        content:

          "In PvP, Moonveil's threat comes from the fact that opponents have to respect the range of Transient Moonlight while also watching for normal katana attacks. The worst Moonveil players spam the weapon skill — it's predictable and easy to punish with a single roll and counter-attack. The best ones mix in running attacks, jumping attacks, and regular R1s, only using Transient Moonlight when they see an opening like a missed attack or a healing attempt. Spacing control is everything: stay just outside their melee range but inside your projectile range, and punish whiffed attacks."

      },

      {

        heading: "Moonveil vs Rivers of Blood",

        level: 2,

        content:

          "Moonveil and Rivers of Blood are often compared because they're both katanas with powerful weapon skills, but they serve different roles. Moonveil is better at range and works well with hybrid caster builds. Rivers of Blood deals higher raw damage against bleedable bosses and procs status effects faster.\n\n| Category | Moonveil | Rivers of Blood |\n|-----------|-----------|-----------|\n| Burst Damage | Excellent | Excellent |\n| Range | Excellent | Average |\n| Bleed Damage | Moderate | Exceptional |\n| Boss Consistency | Excellent | Good |\n| PvP Pressure | Excellent | Excellent |\n| Build Flexibility | High | Moderate |\n\nPick Moonveil if you want ranged pressure and flexibility to swap between melee and sorcery. Pick Rivers of Blood if you want maximum bleed procs and aggressive close-range pressure."

      },

      {

        heading: "Common Moonveil Build Mistakes",

        level: 2,

        content:

          "**Ignoring Vigor.** This is the most common mistake across all Elden Ring builds, not just Moonveil. Damage means nothing if you die in two hits. 60 Vigor should be the goal for endgame.\n\n**Chasing 80 Intelligence too early.** Rushing 80 INT while leaving Vigor at 40 creates a fragile build that falls apart against any hard-hitting boss. The extra damage from 70 to 80 INT is modest compared to the survivability gain from 40 to 60 Vigor.\n\n**Spamming Transient Moonlight.** The weapon skill is powerful but predictable. In PvE, spamming it leaves you open during recovery. In PvP, experienced opponents will roll through it and punish. Mix in normal attacks to stay unpredictable.\n\n**Neglecting sorceries.** Moonveil is part of a build, not the whole build. Running a staff in the off-hand with a few key spells — Night Comet, Terra Magica, Carian Slicer — dramatically increases your effective damage output."

      },

      {

        heading: "Frequently Asked Questions",

        level: 2,

        content:

          "**Is Moonveil still worth using in 2026?** Yes — it has survived every balance patch and remains one of the best Intelligence-scaling weapons in the game.\n\n**Is 80 Intelligence necessary?** No. 60-70 Intelligence is enough for most content. The last 10 points provide diminishing returns and are better spent on Vigor or Mind.\n\n**What level is best for Moonveil builds?** RL 150 offers the best balance between damage output and survivability. This is also the most active level range for co-op and PvP. Use the [Rune Level Calculator](https://www.zosygo.com/elden-ring/tools/rune-level-calculator) to check how many runes you need to reach 150 from your current level.\n\n**Moonveil vs Dark Moon Greatsword?** Moonveil is more flexible and easier to use. Dark Moon Greatsword has higher peak damage in optimized builds but requires more setup and commitment to each attack.\n\n**Is Moonveil beginner-friendly?** Yes — the combination of ranged attacks, bleed buildup, and straightforward stat scaling makes it one of the easiest top-tier weapons to pick up."

      },

      {

        heading: "Final Verdict",

        level: 2,

        content:

          "Moonveil is not the flashiest or hardest-hitting weapon in Elden Ring, but it is one of the most consistent. The combination of Intelligence scaling, bleed buildup, ranged pressure, and posture damage covers more situations than almost any other single weapon. Most players struggling with Moonveil don't need more damage — they need better stat allocation and a proper talisman setup. Nail the fundamentals — 60 Vigor, 70 Intelligence, the right talismans, and a few supporting sorceries — and Moonveil will carry you through every major boss in the game. Check the exact damage numbers for your weapon setup with the [Weapon AR Calculator](https://www.zosygo.com/elden-ring/tools/weapon-ar-calculator)."

      }

    ],

    internalLinks: [

      { href: "/elden-ring/builds/best-moonveil-build", anchorText: "Best Moonveil Build Guide (2026)" },

      { href: "/elden-ring/builds/moonveil-vs-rivers-of-blood", anchorText: "Moonveil vs Rivers of Blood" },

      { href: "/elden-ring/builds/best-intelligence-build", anchorText: "Best Intelligence Build" },

      { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds Guide" },

      { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Planner" }

    ]

  },
{

  keyTakeaways: [

    { label: "🎯 Core Stats (Lv 150)", value: "Vigor 50, Mind 12, Endurance 30, STR 18, DEX 55, ARC 45" },

    { label: "⚔️ Weapon Setup", value: "RoB+10 (left) + Uchigatana+25 Blood+Seppuku (right) — jump L1 > Corpse Piler" },

    { label: "💀 Boss Kill Times", value: "Malenia 18s, Mohg 12s — highest burst vs bleedable bosses" },

    { label: "⚠️ Weakness", value: "20% of bosses immune to bleed (Elden Beast, Radagon, Crystalians)" },

    { label: "🛡️ Key Talismans", value: "Lord of Blood's Exultation, Shard of Alexander, Claw Talisman" },

    { label: "📊 Comparison", value: "3500 DPS bleed > 2800 Moonveil > 2400 Bloodhound (vs bleedable)" },

  ],

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

      content: "The Pure DEX Bleed build is Elden Ring's highest burst-damage setup against bleedable bosses, but it's also the most binary build in the game. Pick this if you want to delete bosses in under 30 seconds (Malenia in 18s, Mohg in 12s) and enjoy aggressive jump attack pressure. Do NOT pick this if you're fighting bleed-immune bosses (Elden Beast, Radagon, Gargoyles, Crystalians, Rennala phase 1 — about 20% of bosses) or prefer safe ranged play. Bloodhound's Fang is a better all-rounder for first playthroughs, and Moonveil is better for hybrid ranged/melee. Test your stat distribution with the [Build Planner](https://www.zosygo.com/elden-ring/tools/build-calculator) before committing Larval Tears."

    },

    {

      heading: "Stat Distribution vs Bloodhound's Fang Build",

      level: 2,

      content: "Bleed build at RL 150: Vigor 50, Mind 12, Endurance 30, STR 18, DEX 55, ARC 45. Use the [Rune Level Calculator](https://www.zosygo.com/elden-ring/tools/rune-level-calculator) to find out how many runes you need to reach this setup. Bloodhound build: Vigor 50, Endurance 30, STR 50, DEX 60. Bleed build needs only 18 STR for RoB (12 + 2-handing), freeing 30+ points for Arcane. Bloodhound needs 40 STR. Trade-off: Bloodhound deals 700-800 AR per R1. Bleed deals 450-550 per L1 but procs 15% max HP every 4 hits. Against 10k HP bosses, bleed adds 1700 damage per proc = 30-50% higher DPS. Against bleed-immune, Bloodhound does 60% more raw da",

      image: "elden-ring-pure-dex-bleed-stats.jpg",

      imageAlt: ""

    },

    { heading: "Weapon Loadout and Talisman Synergy", level: 2, content: "Left hand Rivers of Blood +10, Right hand Uchigatana +25 with Seppuku (Blood affinity). Seppuku adds 30 bleed buildup per weapon for 60s. White Mask +10% attack on bleed proc. Lord of Blood's Exultation +20% attack for 20s after bleed. Stack: 1.1 x 1.2 = 32% increase. Talismans: Lord of Blood's Exultation, Shard of Alexander, Claw Talisman, Dragoncrest Greatshield. Rotational priority: Seppuku > jump L1 > Corpse Piler when bleed procs. Compare the bleed damage of different katanas and daggers with the [Weapon AR Calculator](https://www.zosygo.com/elden-ring/tools/weapon-ar-calculator)." },

    { heading: "Progression Path", level: 2, content: "Early (1-40): Samurai start, dual Uchigatanas with Bloody Slash. Focus VGR 25, DEX 30. Mid (40-80): Yura questline for RoB, farm White Mask at Mohgwyn. DEX 40, VGR 35. Late (80-150): DEX 55, ARC 45. Carry Cold-infused Zweihander +25 for Radagon/Elden Beast." },

    { heading: "Three-Way Comparison", level: 2, content: "Bleed build: 3500 DPS vs bleedable bosses. Bloodhound: 2400 DPS consistent. Moonveil: 2800 DPS with range safety. Malenia kill times: bleed 18s, Moonveil 60-80s, Bloodhound 90+s. First playthrough pick: Bloodhound. Boss rush pick: bleed." },

    { heading: "Common Mistakes", level: 2, content: "(1) Not using Seppuku before boss fights. (2) Dual RoB instead of RoB + Seppuku Uchi. (3) No Dragoncrest Greatshield - one mistake kills. (4) No backup for bleed-immune bosses. (5) Spamming Corpse Piler instead of jump L1s - jump L1s stagger in 3-4 hits." }

  ],

  internalLinks: [

      { href: "/elden-ring/builds/best-bleed-build", anchorText: "Best Bleed Build Guide" },

      { href: "/elden-ring/builds/best-dexterity-build", anchorText: "Best Dexterity Build" },

      { href: "/elden-ring/bosses/how-to-beat-malenia", anchorText: "Bleed Build vs Malenia" },

      { href: "/elden-ring/bosses/how-to-beat-mohg-lord-of-blood", anchorText: "Bleed Build vs Mohg" },

      { href: "/elden-ring/weapons/rivers-of-blood", anchorText: "Rivers of Blood Katana" },

      { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds Guide" },

      { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Planner" }

    ]

},
{

  keyTakeaways: [

    { label: "🎯 Recommended Level", value: "35+ with +5 weapon — easier than Margit" },

    { label: "⚔️ Weaknesses", value: "Strike damage, bleed, lightning — resists holy (40%)" },

    { label: "🛡️ Phase 1 Key Move", value: "Shockwave stomp — JUMP to avoid, don't roll" },

    { label: "🐉 Phase 2 Strategy", value: "Stay behind him always — punish after fire breath and bite lunge" },

    { label: "🎮 Best Summon", value: "Nepheli Loux (sign outside fog gate) — staggers reliably" },

    { label: "❌ Common Mistake", value: "Standing in front during phase 2 — get behind or sprint through" },

  ],

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

      content: "Godrick is easier than Margit but blocks access to Liurnia. Fight him at level 35+ with a +5 weapon. Below 30? Explore Weeping Peninsula first. Difficulty: 6/10. Weak to strike damage, bleed, and lightning. Resists holy (40% resistance). The key difference: Margit tests dodge timing, while Godrick tests positioning."

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

      { href: "/elden-ring/bosses/godrick-phase-2-guide", anchorText: "Godrick Phase 2 Guide" },

      { href: "/elden-ring/bosses/margit-guide", anchorText: "Margit Boss Guide" },

      { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds for Early Game" },

      { href: "/elden-ring/bosses/starscourge-radahn-guide", anchorText: "Starscourge Radahn Guide" },

      { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Planner" }

    ]

},
{

  keyTakeaways: [

    { label: "⚔️ Corpse Piler Variants", value: "L2+R1 = horizontal slash (groups), L2+R2 = vertical (single target, stagger)" },

    { label: "🎯 Core Stat", value: "Arcane 45 (hard cap), Dexterity 50, Vigor 55" },

    { label: "💀 Boss Kill Times", value: "Malenia ~20s, Mohg ~15s — specialist vs bleedable bosses" },

    { label: "⚠️ Do NOT Use Against", value: "Elden Beast, Radagon, gargoyles, Rennala — bleed immunity" },

    { label: "🛡️ Key Setup", value: "Lord of Blood's Exultation + White Mask = 32% attack boost on bleed" },

    { label: "📊 Comparison", value: "RoB > Moonveil vs bleedable, Moonveil > RoB vs immune and in PvP" },

  ],

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

      content: "RoB is the highest-DPS weapon against bleedable targets, but it's a specialist weapon. Use it if you want to melt bosses under 20s, have Arcane investment, and are fighting bleedable bosses (Malenia, Mohg, Godfrey). Do NOT use it against bleed-immune bosses (Elden Beast, Radagon, gargoyles, Rennala) or in PvP where Corpse Piler is easy to dodge post-nerf. Moonveil is better for range. Hand of Malenia has higher potential but is harder to land consistently."

    },

    {

      heading: "Corpse Piler - Timing and Positioning",

      level: 2,

      content: "L2 > R1 (horizontal slash, 360 arc, groups/mobile bosses). L2 > R2 (overhead vertical, single targets, stance breaks). Bleed procs on SECOND hit - always commit to 2 hits. 16 FP per cast. At 20 Mind = 6 casts per flask. Range: 2/3 of Moonveil's Transient Moonlight. The weapon art tracks slightly - if first hit misses, second re-adjusts.",

      image: "elden-ring-rivers-of-blood-corpse-piler.jpg",

      imageAlt: ""

    },

    { heading: "Comparison vs Moonveil", level: 2, content: "RoB at 50 DEX/45 ARC: 565 AR + 112 bleed. Moonveil at 70 INT: 580 AR. RoB does 30% more DPS vs bleedable bosses. Moonveil does 40% more vs magic-weak. Key: Moonveil projectile = safer range. Corpse Piler = need to be close. For Mohg: RoB wins (bleed + hits through phase transition). Rennala: Moonveil wins (distance + magic weakness). Malenia: RoB kills in 18s vs 45s for Moonveil." },

    { heading: "Stat Scaling and Arcane Cap", level: 2, content: "Scales D STR, C DEX, D ARC at +10. Bleed buildup scales with ARC up to 45 (hard cap). Past 45, +1-2 bleed per level. Physical soft caps at 50 DEX. Optimal: 50 DEX / 45 ARC at RL 150. 80 DEX / 60 ARC adds only 12% more damage for 45 stat points. Test different stat allocations with the [Build Planner](https://www.zosygo.com/elden-ring/tools/build-calculator) to find the best value for your level." },

    { heading: "Progression and Upgrades", level: 2, content: "Found in Mountaintops of Giants after capital. Complete Yura questline through Altus Plateau. Upgrade: Somber Smithing Stones to +10. Before RoB: use Bloody Slash Uchigatana. Switch to RoB as soon as obtained - outclasses every other bleed weapon for PvE boss killing." },

    { heading: "Common Mistakes", level: 2, content: "(1) Only using Corpse Piler - L1 power-stance does more stance damage. (2) No Mind investment - 10 Mind = 2 Corpse Piler casts per flask. (3) Using RoB vs bleed-immune enemies - switch weapon. (4) Not using Seppuku offhand trick - put Seppuku on left-hand Uchigatana for +30 bleed to both weapons. Check the exact damage numbers for your weapon setup with the [Weapon AR Calculator](https://www.zosygo.com/elden-ring/tools/weapon-ar-calculator)." }

  ],

  internalLinks: [

      { href: "/elden-ring/bosses/how-to-beat-mohg-lord-of-blood", anchorText: "How to Beat Mohg (Bleed Strategy)" },

      { href: "/elden-ring/bosses/how-to-beat-malenia", anchorText: "Rivers of Blood vs Malenia" },

      { href: "/elden-ring/builds/moonveil-vs-rivers-of-blood", anchorText: "Moonveil vs Rivers of Blood" },

      { href: "/elden-ring/builds/best-bleed-build", anchorText: "Best Bleed Build Guide" },

      { href: "/elden-ring/builds/elden-ring-pure-dex-bleed-build", anchorText: "Pure DEX Bleed Build" },

      { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Planner" }

    ]

  },
{

  keyTakeaways: [

    { label: "🎯 Core Stats", value: "Vigor 40 (priority), Dexterity 40–60, Endurance 15–25" },

    { label: "⚔️ Best Weapon", value: "Bloodhound's Fang — best early-mid game, bleed + mobility skill" },

    { label: "🛡️ Key Rule", value: "Do NOT over-invest DEX early — Vigor matters more in early game" },

    { label: "📊 Progression", value: "Level 1-40: Uchigatana. 40-90: Bloodhound's Fang. 90+: Hybrid builds" },

    { label: "⚡ Strengths", value: "Fast attacks, high DPS, bleed synergy, beginner-friendly" },

    { label: "⚠️ Weakness", value: "Low poise — punished heavily if hit, needs good dodging" },

  ],

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

      content: "Dexterity builds in Elden Ring are one of the most efficient and beginner-friendly playstyles for new players. They focus on fast attacks, high mobility, and consistent damage output rather than heavy armor or slow weapons. Yes — Dexterity builds are one of the strongest early-to-mid game options. They are ideal if you prefer: Fast attack speed, High mobility combat, Dodge-based survival instead of blocking. However, Dexterity builds are weaker in terms of poise and can struggle if you get hit frequently. Use the [Build Planner](https://www.zosygo.com/elden-ring/tools/build-calculator) to test different stat distributions and find the right balance for your playstyle."

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

      content: "Recommended stats: Vigor: 40 (survival priority), Dexterity: 40–60 (main damage scaling), Endurance: 15–25 (stamina + equip load), Mind: optional (for weapon skills). Key rule: Do NOT over-invest in Dexterity early. Vigor matters more in early game. Optimize your stat efficiency by testing different stat distributions."

    },

    {

      heading: "Early / Mid / Late Game Progression",

      level: 2,

      content: "Early Game (Level 1–40): Use Uchigatana or basic curved swords. Focus on upgrading survivability first. Avoid over-farming damage stats. Mid Game (Level 40–90): Switch to Bloodhound's Fang. Start scaling Dexterity properly. Begin boss-focused gameplay. Late Game (Level 90+): Hybrid Dexterity builds become stronger. Combine bleed + skill-based weapons. Optimize talismans for damage output.\n\n![Elden Ring screenshot](/images/articles/385136a80be6d8c324007b952a72aa34286431045.jpg@1192w.webp)"

    },

    {

      heading: "Strengths and Weaknesses",

      level: 2,

      content: "Strengths: High DPS output, Very fast attack animations, Strong bleed synergy, Beginner friendly once mastered. Weaknesses: Low poise defense, Punished heavily if hit, Requires good dodging skill. Test different stat setups for Godrick with the [Build Planner](https://www.zosygo.com/elden-ring/tools/build-calculator)."

    },

    {

      heading: "Dexterity vs Strength Build",

      level: 2,

      content: "In Elden Ring builds: Dexterity: Faster gameplay, Higher mobility, Lower defense. Strength: Slower attacks, Higher poise, Burst damage + stagger. Conclusion: Dexterity is better for skill-based players, Strength is better for tank-style players. Compare the actual damage numbers for fast Dexterity weapons vs slow Strength weapons with the [Weapon AR Calculator](https://www.zosygo.com/elden-ring/tools/weapon-ar-calculator). "

    },

  ],

  internalLinks: [

      { href: "/elden-ring/builds/elden-ring-pure-dex-bleed-build", anchorText: "Pure DEX Bleed Build" },

      { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds Guide" },

      { href: "/elden-ring/builds/best-bleed-build", anchorText: "Best Bleed Build" },

      { href: "/elden-ring/bosses/how-to-beat-malenia", anchorText: "Dexterity Build vs Malenia" },

      { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Planner" }

    ]

}
];

export default articles;
