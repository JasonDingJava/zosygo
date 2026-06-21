import type { Article } from "./articles";

// ═══ ELDEN RING — BOSSES (Malenia) ═══
const maleniaArticle: Article = {
  slug: "malenia-healing-mechanic-explained",
  category: "bosses",
  gameSlug: "elden-ring",
  difficulty: "intermediate",
  readTimeMinutes: 10,
  order: 15,
  title: "Why Malenia Heals When She Hits You (2026) \u2013 The Mechanic Most Players Misunderstand",
  metaDescription: "A deep explanation of Malenia\u2019s healing mechanic in Elden Ring. Learn why she heals, how her recovery system works, and the best ways to reduce her sustain.",
  keyTakeaways: [
    { label: "\uD83E\uDE78 Healing Trigger", value: "Malenia heals on every hit that connects \u2014 not based on damage dealt" },
    { label: "\uD83D\uDEE1\uFE0F Blocking Still Heals", value: "Blocking with a shield prevents damage but still triggers her healing" },
    { label: "\uD83D\uDC7B Summons Can Backfire", value: "Spirit Ashes give Malenia more targets \u2014 more hits = more healing" },
    { label: "\uD83C\uDFAF Best Strategy", value: "Prioritize dodging over blocking \u2014 dodging prevents both damage and healing" },
    { label: "\u26A0\uFE0F Waterfowl Dance Myth", value: "Her healing mechanic often has a bigger impact on long fights than Waterfowl" },
    { label: "\uD83D\uDCC8 Consistency > Damage", value: "Reducing hits taken is more impactful than increasing damage output" },
  ],
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "Malenia, Blade of Miquella, is widely considered the most difficult boss in Elden Ring.\n\nMost players blame Waterfowl Dance for their failed attempts.\n\nWhile Waterfowl Dance is certainly dangerous, it is not the mechanic that causes most players to lose.\n\nThe real reason many fights spiral out of control is Malenia\u2019s healing ability.\n\nEvery successful hit gives her a chance to recover health, turning small mistakes into major setbacks.\n\nUnderstanding exactly how this system works is one of the fastest ways to improve your chances of victory.",
      image: "malenia-boss-fight.webp",
      imageAlt: "Malenia Blade of Miquella boss fight arena in Elden Ring"
    },
    {
      heading: "Does Malenia Heal Based on Damage?",
      level: 2,
      content:
        "No.\n\nThis is one of the biggest misconceptions surrounding the fight.\n\nMalenia does not heal based on how much damage she deals.\n\nInstead, she heals whenever one of her attacks successfully connects with a valid target.\n\nThis means:\n\n- Taking a direct hit restores her health.\n- Blocking with a shield still restores her health.\n- Spirit Ashes hit by her attacks restore her health.\n- Summoned allies hit by her attacks restore her health.\n\nThe amount of damage dealt is largely irrelevant.\n\nThe hit itself triggers the healing effect.",
      image: "malenia-healing-mechanic.webp",
      imageAlt: "Malenia healing mechanic explained showing how hits restore her health"
    },
    {
      heading: "Why This Mechanic Feels So Different",
      level: 2,
      content:
        "Most Elden Ring bosses follow a simple rule:\n\n> Avoid damage and eventually win.\n\nMalenia changes that rule completely.\n\nAgainst most bosses:\n\n- Blocking is effective.\n- Trading damage can be acceptable.\n- Summons reduce overall pressure.\n\nAgainst Malenia:\n\n- Blocking still helps her heal.\n- Long fights create more healing opportunities.\n- Summons can unintentionally benefit the boss.\n\nAs a result, mistakes are punished twice.\n\nYou lose health while simultaneously restoring hers."
    },
    {
      heading: "The Hidden Cost of Using Spirit Ashes",
      level: 2,
      content:
        "Many players enter the fight expecting Spirit Ashes to make everything easier.\n\nSometimes they do.\n\nSometimes they make the fight significantly longer.\n\nWhy?\n\nBecause every successful attack against your summon can restore Malenia\u2019s health.\n\nConsider a Mimic Tear surviving for several minutes.\n\nDuring that time, Malenia may land dozens of attacks.\n\nEach successful hit creates additional healing opportunities.\n\nThe summon increases your damage output.\n\nIt may also increase her total healing throughout the encounter.\n\nThis is why some players notice that Malenia\u2019s health bar seems to recover surprisingly quickly when multiple targets are present."
    },
    {
      heading: "Why Shield Builds Often Struggle",
      level: 2,
      content:
        "Shields are powerful throughout much of Elden Ring.\n\nAgainst Malenia, they become far less effective.\n\nMany players assume:\n\n> If I block the attack, I stop the problem.\n\nUnfortunately, that is not how the mechanic works.\n\nSuccessful attacks against your shield still trigger healing.\n\nThis creates a situation where:\n\n- You survive the attack.\n- Malenia gains health anyway.\n\nFor this reason, dodge-focused builds often outperform shield-focused builds in this specific encounter.",
      image: "malenia-block-shield.webp",
      imageAlt: "Malenia attacking a shield showing how blocking still triggers healing"
    },
    {
      heading: "Waterfowl Dance Is Not the Main Problem",
      level: 2,
      content:
        "Waterfowl Dance receives most of the attention because it is visually intimidating.\n\nHowever, Waterfowl Dance only becomes devastating because of the healing mechanic.\n\nImagine two players:\n\n### Player A\n\n- Avoids most attacks.\n- Gets hit only a few times.\n\n### Player B\n\n- Takes frequent small hits.\n- Blocks several attacks.\n- Uses summons aggressively.\n\nEven if both players deal similar damage, Player A will usually win more consistently.\n\nWhy?\n\nBecause Player A gives Malenia fewer opportunities to recover health.\n\nThe healing mechanic amplifies every mistake made during the fight.",
      image: "malenia-waterfowl-dance.webp",
      imageAlt: "Malenia Waterfowl Dance attack showing the devastating combo"
    },
    {
      heading: "How to Reduce Malenia\u2019s Healing",
      level: 2,
      content:
        "You cannot disable the mechanic.\n\nYou can dramatically reduce its impact."
    },
    {
      heading: "1. Prioritize Dodging Over Blocking",
      level: 3,
      content:
        "Dodging prevents:\n\n- Damage taken\n- Healing gained\n\nBlocking prevents only the damage.\n\nWhenever possible, avoid attacks entirely."
    },
    {
      heading: "2. Learn Her Recovery Windows",
      level: 3,
      content:
        "Malenia has several attacks that leave her vulnerable.\n\nRecognizing these moments allows you to:\n\n- Deal safe damage\n- End phases faster\n- Reduce overall healing opportunities\n\nPatience is often more valuable than aggression."
    },
    {
      heading: "3. Avoid Panic Healing",
      level: 3,
      content:
        "Many players heal immediately after taking damage.\n\nMalenia frequently punishes this behavior.\n\nIf she lands another hit:\n\n- You lose more health.\n- She gains more health.\n\nAlways heal during confirmed safe windows."
    },
    {
      heading: "4. Improve Consistency Instead of Damage",
      level: 3,
      content:
        "A common mistake is searching for more damage.\n\nThe real solution is often fewer mistakes.\n\nReducing the number of successful hits Malenia lands can have a larger impact than increasing your damage output."
    },
    {
      heading: "Why Some Players Suddenly Beat Her After Dozens of Attempts",
      level: 2,
      content:
        "This pattern is extremely common.\n\nPlayers may fail twenty, thirty, or even fifty times.\n\nThen suddenly:\n\n- The fight feels easier.\n- Her health seems to disappear faster.\n- The encounter becomes manageable.\n\nUsually, their build did not change.\n\nTheir consistency did.\n\nThe healing mechanic rewards precision more than raw damage.\n\nA small improvement in avoidance can produce a massive improvement in overall performance."
    },
    {
      heading: "Common Misconceptions About Malenia\u2019s Healing",
      level: 2,
      content: ""
    },
    {
      heading: "Myth: She Heals Based on Damage Dealt",
      level: 3,
      content:
        "False.\n\nShe heals when attacks successfully connect."
    },
    {
      heading: "Myth: Shields Completely Counter Her",
      level: 3,
      content:
        "False.\n\nBlocking still allows healing."
    },
    {
      heading: "Myth: More Summons Always Make the Fight Easier",
      level: 3,
      content:
        "False.\n\nAdditional targets can create additional healing opportunities."
    },
    {
      heading: "Myth: Waterfowl Dance Is the Only Dangerous Mechanic",
      level: 3,
      content:
        "False.\n\nHer healing system often has a greater impact on long fights."
    },
    {
      heading: "Frequently Asked Questions",
      level: 2,
      content:
        "## Does Malenia Heal Through Shields?\n\nYes.\n\nSuccessful attacks against a shield still restore health.\n\n## Does Malenia Heal From Spirit Ashes?\n\nYes.\n\nHits against Spirit Ashes can restore health.\n\n## Does Malenia Heal More From Stronger Attacks?\n\nNot necessarily.\n\nThe important factor is whether the attack connects.\n\n## Can You Stop Malenia From Healing?\n\nNo.\n\nThe mechanic cannot be disabled.\n\nYou can only reduce its effectiveness by avoiding attacks.\n\n## Is Dodging Better Than Blocking Against Malenia?\n\nIn most situations, yes.\n\nDodging prevents both damage and healing.\n\nBlocking prevents only the damage."
    },
    {
      heading: "The Real Lesson of the Malenia Fight",
      level: 2,
      content:
        "Most Elden Ring bosses reward aggression once players learn their patterns.\n\nMalenia rewards discipline.\n\nEvery successful hit she lands creates two problems:\n\n1. You lose health.\n2. She gains health.\n\nThe fight is not simply about dealing damage.\n\nIt is about controlling opportunities.\n\nThe fewer opportunities you give Malenia to heal, the easier the encounter becomes."
    },
    {
      heading: "Final Verdict",
      level: 2,
      content:
        "Many players focus entirely on Waterfowl Dance when discussing Malenia.\n\nWhile the attack is dangerous, it is her healing mechanic that defines the fight.\n\nUnderstanding how healing works changes the entire encounter.\n\nPlayers who defeat Malenia consistently are not always dealing more damage than everyone else.\n\nThey are simply giving her fewer chances to recover.\n\nMaster that principle, and the fight becomes significantly easier to understand, practice, and eventually conquer. "
    }
  ],
  internalLinks: [
    { href: "/elden-ring/bosses/how-to-beat-malenia", anchorText: "How to Beat Malenia (2026 Guide)" },
    { href: "/elden-ring/bosses/how-to-beat-maliketh-black-blade", anchorText: "How to Beat Maliketh" },
    { href: "/elden-ring/bosses/how-to-beat-mohg-lord-of-blood", anchorText: "How to Beat Mohg, Lord of Blood" },
    { href: "/elden-ring/weapons/rivers-of-blood", anchorText: "Rivers of Blood Katana" },
    { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds Against Malenia" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" }
  ]
};

const buildFeelsWeakArticle: Article = {
  keyTakeaways: [
    { label: "🎯 Mistake #1", value: "Vigor too low — Vigor 60 > INT 80 in practical fights" },
    { label: "📊 Mistake #2", value: "Chasing damage soft caps too early — 70 vs 80 is often <5% gain" },
    { label: "⚔️ Mistake #3", value: "Weapon under-upgraded — weapon upgrades > character levels" },
    { label: "🧩 Mistake #4", value: "No build identity — splitting stats 4 ways always underperforms" },
    { label: "📋 Mistake #5", value: "Copying endgame builds too early — mid-game needs different priorities" },
    { label: "💡 Core Truth", value: "A properly optimized Lv 100 beats a poorly optimized Lv 150" },
  ],
  slug: "why-your-build-feels-weak",
  category: "builds",
  gameSlug: "elden-ring",
  difficulty: "beginner",
  readTimeMinutes: 9,
  order: 16,
  title: "Why Your Elden Ring Build Feels Weak (Even at Level 150)",
  metaDescription: "Many Elden Ring players reach Level 150 and still struggle with damage or survivability. Learn the most common build mistakes and how to fix them.",
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "Reaching Level 150 should feel powerful.\n\nYet many Elden Ring players reach the recommended endgame level and still experience the same problems:\n\n- Bosses take too long to kill\n- Damage feels low\n- Survivability feels poor\n- Builds seem weaker than online videos\n\nThe immediate assumption is usually:\n\n> I need more levels.\n\nMost of the time, that assumption is wrong.\n\nThe problem is rarely level.\n\nThe problem is optimization."
    },
    {
      heading: "The Biggest Myth in Elden Ring",
      level: 2,
      content:
        "Many players believe:\n\n> Higher level automatically means stronger build.\n\nThis is not how Elden Ring works.\n\nA poorly optimized Level 150 character can easily perform worse than a properly optimized Level 100 character.\n\nWhy?\n\nBecause Elden Ring rewards stat efficiency more than raw stat totals."
    },
    {
      heading: "Mistake #1: Ignoring Vigor",
      level: 2,
      content:
        "This is the most common problem in the game.\n\nMany players invest heavily into:\n\n- Strength\n- Dexterity\n- Intelligence\n- Arcane\n\nwhile leaving Vigor far too low."
    },
    {
      heading: "Example",
      level: 3,
      content: ""
    },
    {
      heading: "Weak Build",
      level: 4,
      content:
        "- Vigor 35\n- Intelligence 80\n- Mind 30"
    },
    {
      heading: "Stronger Build",
      level: 4,
      content:
        "- Vigor 60\n- Intelligence 70\n- Mind 25\n\nThe second build often performs better because survivability creates more damage opportunities.\n\nDead players deal zero DPS."
    },
    {
      heading: "Mistake #2: Chasing Damage Soft Caps Too Early",
      level: 2,
      content:
        "Players often rush:\n\n- 80 Intelligence\n- 80 Strength\n- 80 Dexterity\n- 80 Arcane\n\nbefore fixing other weaknesses.\n\nThe reality is simple:\n\nThe difference between 70 and 80 in a primary damage stat is often much smaller than expected.\n\nMeanwhile:\n\n- More Vigor\n- More Endurance\n- Better talismans\n- Improved weapon upgrades\n\ncan dramatically improve overall performance.\n\nMany players are optimizing numbers instead of optimizing results."
    },
    {
      heading: "Mistake #3: Your Weapon Is Under-Upgraded",
      level: 2,
      content:
        "This is one of the biggest hidden causes of low damage.\n\nMany players focus entirely on leveling while ignoring weapon upgrades.\n\nIn Elden Ring, weapon upgrades frequently provide more damage than multiple character levels.\n\nBefore adding another point into your damage stat, ask:\n\n- Is my weapon fully upgraded?\n- Am I using the correct affinity?\n- Does the weapon scale with my primary stat?\n\nA fully upgraded weapon can completely transform a build."
    },
    {
      heading: "Mistake #4: Your Build Has No Identity",
      level: 2,
      content:
        "Weak builds often try to do everything at once.\n\nFor example:\n\n- 40 Strength\n- 40 Dexterity\n- 35 Intelligence\n- 30 Faith\n\nOn paper, this looks versatile.\n\nIn practice, it usually scales poorly.\n\nStrong builds have a clear purpose.\n\nExamples include:\n\n- Pure Strength\n- Dexterity Bleed\n- Intelligence Sorcery\n- Faith Incantation\n- Arcane Bleed\n\nSpecialization almost always outperforms indecision."
    },
    {
      heading: "Mistake #5: Copying Endgame Builds Too Early",
      level: 2,
      content:
        "Many popular YouTube builds are designed for:\n\n- Level 150\n- Level 200\n- New Game+\n- Max-upgraded weapons\n\nPlayers often copy them at Level 70 or Level 90.\n\nThe result:\n\n- Missing key stats\n- Poor survivability\n- Incomplete scaling\n- Lower damage than expected\n\nA build only works when used in the level range it was designed for."
    },
    {
      heading: "Why Damage Showcase Videos Are Misleading",
      level: 2,
      content:
        "Many players compare themselves to videos online.\n\nThis often creates unrealistic expectations.\n\nMost showcase videos use:\n\n- Fully upgraded weapons\n- Endgame talismans\n- Multiple buffs\n- Optimized conditions\n\nThe result is not typical gameplay.\n\nA build that deals massive damage in a showcase may perform very differently during normal boss fights.\n\nFocus on consistency, not highlight clips."
    },
    {
      heading: "The Hidden Importance of Talismans",
      level: 2,
      content:
        "Players spend hours adjusting stats.\n\nExperienced players spend time optimizing multipliers.\n\nTalismans often provide larger gains than a few additional levels.\n\nExamples include:\n\n- Shard of Alexander\n- Dragoncrest Greatshield Talisman\n- Magic Scorpion Charm\n- Rotten Winged Sword Insignia\n- Lord of Blood's Exultation\n\nThe right talisman setup can completely change how a build performs."
    },
    {
      heading: "Survivability Is Actually Damage",
      level: 2,
      content:
        "This sounds counterintuitive.\n\nBut consider two players.\n\n### Player A\n\n- 35 Vigor\n- Extremely high damage\n\n### Player B\n\n- 60 Vigor\n- Slightly lower damage\n\nPlayer B survives longer.\n\nPlayer B heals less frequently.\n\nPlayer B maintains pressure more consistently.\n\nOver the course of an entire fight, Player B often deals more total damage.\n\nDamage output means nothing if you spend most of the encounter recovering from mistakes."
    },
    {
      heading: "The Level 150 Optimization Checklist",
      level: 2,
      content:
        "Before assuming your build is weak, answer these questions."
    },
    {
      heading: "Is Your Weapon Fully Upgraded?",
      level: 3,
      content:
        "If not, fix this first."
    },
    {
      heading: "Do Your Stats Match Your Weapon Scaling?",
      level: 3,
      content:
        "Many players level attributes that barely affect their weapon.\n\nAlways check scaling."
    },
    {
      heading: "Do You Have Enough Vigor?",
      level: 3,
      content:
        "For most endgame players:\n\n- 50 Vigor = acceptable\n- 60 Vigor = ideal\n\nAnything significantly below this may create survivability issues."
    },
    {
      heading: "Are Your Talismans Supporting Your Build?",
      level: 3,
      content:
        "Talismans should strengthen your primary strategy.\n\nAvoid generic setups whenever possible."
    },
    {
      heading: "Are You Splitting Stats Too Much?",
      level: 3,
      content:
        "A focused build is usually stronger than a balanced build."
    },
    {
      heading: "Signs Your Build Is Actually Strong",
      level: 2,
      content:
        "A strong build is not defined by one-shot damage.\n\nA strong build can:\n\n- Survive mistakes\n- Maintain pressure\n- Adapt to different encounters\n- Produce consistent results\n\nConsistency wins more fights than peak damage."
    },
    {
      heading: "Frequently Asked Questions",
      level: 2,
      content:
        "### Is Level 150 Enough for Endgame?\n\nYes.\n\nLevel 150 is more than enough for nearly all content in Elden Ring.\n\n### Should I Level Vigor to 60?\n\nFor most players, yes.\n\nThe survivability increase is significant.\n\n### Is 80 Intelligence Worth It?\n\nFor dedicated mage builds, often yes.\n\nFor hybrid builds, not always.\n\n### Why Does My Build Feel Weak Compared to YouTube Videos?\n\nMost showcase videos use ideal conditions and extensive buff stacking.\n\nThey do not represent typical gameplay.\n\n### Should I Respec My Character?\n\nIf your stats are spread across too many attributes, a respec can dramatically improve performance."
    },
    {
      heading: "Final Verdict",
      level: 2,
      content:
        "If your Elden Ring build feels weak at Level 150, the problem is usually not your level.\n\nIt is your optimization.\n\nMost players gain more power by:\n\n- Increasing Vigor\n- Improving weapon upgrades\n- Choosing better talismans\n- Specializing their stats\n- Understanding scaling\n\nbefore investing additional levels into damage.\n\nThe strongest builds are not always the highest level.\n\nThey are the most efficient.\n\nIf your build feels weak, stop asking how to gain more levels.\n\nStart asking how to gain more value from the levels you already have. The [Damage Optimization Tool](https://www.zosygo.com/elden-ring/tools/build-calculator) can show you exactly where your stat points are being wasted. "
    }
  ],
  internalLinks: [
    { href: "/elden-ring/builds/elden-ring-damage-scaling-explained", anchorText: "Damage Scaling Explained" },
    { href: "/elden-ring/builds/elden-ring-low-damage-explained", anchorText: "Low Damage Explained" },
    { href: "/elden-ring/builds/elden-ring-build-mistakes", anchorText: "10 Build Mistakes" },
    { href: "/elden-ring/builds/soft-caps-explained-2026", anchorText: "Soft Caps Explained (2026)" },
    { href: "/elden-ring/weapons/rivers-of-blood", anchorText: "Rivers of Blood Guide" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" }
  ]
};

const softCapsV2Article: Article = {
  keyTakeaways: [
    { label: "🎯 Vigor Soft Cap", value: "40 (first cap) → 60 (hard cap) — never go above 60" },
    { label: "⚔️ STR/DEX Soft Cap", value: "55 (first cap) → 80 (second cap) — 55-60 is best efficiency" },
    { label: "🔮 INT/FAI Soft Cap", value: "60 (first cap) → 80 (second cap) — 60 is optimal for most builds" },
    { label: "🩸 ARC Soft Cap", value: "45 (bleed buildup cap) — past 45, <2 bleed per level" },
    { label: "💡 Key Insight", value: "Optimized Lv 100 > poorly optimized Lv 150 — efficiency matters" },
    { label: "📊 Stat Value Rule", value: "Before soft cap: strong returns. After: diminishing — invest elsewhere" },
  ],
  slug: "soft-caps-explained-2026",
  category: "builds",
  gameSlug: "elden-ring",
  difficulty: "beginner",
  readTimeMinutes: 9,
  order: 17,
  title: "Elden Ring Soft Caps Explained (2026) \u2013 The Stat Mistake Almost Every Player Makes",
  metaDescription: "Learn how soft caps work in Elden Ring and why investing more points doesn\u2019t always make your build stronger. Understand Vigor, Strength, Dexterity, Intelligence, Faith, and Arcane scaling.",
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "One of the biggest mistakes Elden Ring players make is assuming that more stats always mean more power.\n\nThe logic seems obvious:\n\n- More Strength should mean more damage\n- More Intelligence should mean stronger spells\n- More Vigor should mean better survivability\n\nWhile technically true, Elden Ring uses a hidden system called **soft caps**.\n\nOnce you pass these points, additional stat investment becomes less efficient.\n\nFor many players, this is the reason their Level 150 build feels weaker than expected.\n\nSee how different stat allocations affect your weapon's damage with the [Weapon AR Calculator](https://www.zosygo.com/elden-ring/tools/weapon-ar-calculator)."
    },
    {
      heading: "What Is a Soft Cap?",
      level: 2,
      content:
        "A soft cap is a point where a stat stops giving strong returns.\n\nBefore the soft cap:\n\n- Each level gives strong improvement\n\nAfter the soft cap:\n\n- Each level gives reduced value\n\nThis is known as **diminishing returns**.\n\nSo instead of gaining constant power, your progression slows down."
    },
    {
      heading: "Why Soft Caps Matter More Than Level",
      level: 2,
      content:
        "Many players think:\n\n> \"I just need more levels to get stronger.\"\n\nBut in Elden Ring:\n\n- A poorly optimized Level 150 build can feel weak\n- A well-optimized Level 100 build can feel strong\n\nBecause optimization matters more than raw level.\n\nSoft caps are the reason."
    },
    {
      heading: "Vigor Soft Caps",
      level: 2,
      content:
        "Vigor is the most important survivability stat in the game."
    },
    {
      heading: "Key Breakpoints",
      level: 3,
      content: ""
    },
    {
      heading: "40 Vigor",
      level: 4,
      content:
        "- Early major breakpoint\n- Good survivability for mid-game"
    },
    {
      heading: "60 Vigor",
      level: 4,
      content:
        "- Recommended endgame target\n- Best balance of HP and efficiency"
    },
    {
      heading: "Above 60",
      level: 4,
      content:
        "- Very low returns\n- Usually not worth investment"
    },
    {
      heading: "Strength Soft Caps",
      level: 2,
      content:
        "Strength affects heavy weapon scaling and physical damage."
    },
    {
      heading: "Key Breakpoints",
      level: 3,
      content: ""
    },
    {
      heading: "20 Strength",
      level: 4,
      content:
        "- Early scaling efficiency"
    },
    {
      heading: "55 Strength",
      level: 4,
      content:
        "- Strong mid-to-late game scaling"
    },
    {
      heading: "80 Strength",
      level: 4,
      content:
        "- Final major cap\n- Very low returns beyond this point"
    },
    {
      heading: "Dexterity Soft Caps",
      level: 2,
      content:
        "Dexterity improves weapon speed scaling and damage."
    },
    {
      heading: "Key Breakpoints",
      level: 3,
      content: ""
    },
    {
      heading: "20 Dexterity",
      level: 4,
      content:
        "- Early-game efficiency"
    },
    {
      heading: "55 Dexterity",
      level: 4,
      content:
        "- Strong scaling zone"
    },
    {
      heading: "80 Dexterity",
      level: 4,
      content:
        "- Final soft cap\n- Minimal gains after this point"
    },
    {
      heading: "Intelligence Soft Caps",
      level: 2,
      content:
        "Intelligence governs sorcery scaling."
    },
    {
      heading: "Key Breakpoints",
      level: 3,
      content: ""
    },
    {
      heading: "20 Intelligence",
      level: 4,
      content:
        "- Early unlock phase"
    },
    {
      heading: "50 Intelligence",
      level: 4,
      content:
        "- Strong scaling period"
    },
    {
      heading: "80 Intelligence",
      level: 4,
      content:
        "- Endgame cap\n- Diminishing returns become noticeable"
    },
    {
      heading: "Faith Soft Caps",
      level: 2,
      content:
        "Faith affects incantation scaling and hybrid builds."
    },
    {
      heading: "Key Breakpoints",
      level: 3,
      content: ""
    },
    {
      heading: "20 Faith",
      level: 4,
      content:
        "- Early efficiency"
    },
    {
      heading: "50 Faith",
      level: 4,
      content:
        "- Strong mid-game scaling"
    },
    {
      heading: "80 Faith",
      level: 4,
      content:
        "- Final cap zone"
    },
    {
      heading: "Arcane Soft Caps",
      level: 2,
      content:
        "Arcane affects status buildup and item discovery."
    },
    {
      heading: "Key Breakpoints",
      level: 3,
      content: ""
    },
    {
      heading: "20 Arcane",
      level: 4,
      content:
        "- Early scaling value"
    },
    {
      heading: "45 Arcane",
      level: 4,
      content:
        "- Major breakpoint for bleed builds"
    },
    {
      heading: "60 Arcane",
      level: 4,
      content:
        "- Common optimal zone"
    },
    {
      heading: "80 Arcane",
      level: 4,
      content:
        "- Maximum investment range"
    },
    {
      heading: "The Level 150 Trap",
      level: 2,
      content:
        "Many players reach Level 150 and still feel weak.\n\nA common example:"
    },
    {
      heading: "Inefficient Build",
      level: 4,
      content:
        "- Vigor 35\n- Intelligence 80\n- Endurance 20\n\nThis looks strong on paper but performs poorly in real fights."
    },
    {
      heading: "Optimized Build",
      level: 4,
      content:
        "- Vigor 60\n- Intelligence 70\n- Endurance 25\n\nThis build often performs better overall.\n\nWhy?\n\nBecause survivability and consistency matter more than raw stat maxing."
    },
    {
      heading: "How Soft Caps Affect Build Planning",
      level: 2,
      content:
        "Instead of asking:\n\n> \"How do I get more damage?\"\n\nAsk:\n\n> \"Where do I get the best value per point?\"\n\nThis shift in thinking is what separates weak builds from strong ones."
    },
    {
      heading: "Why Experienced Players Don\u2019t Chase 80 in Everything",
      level: 2,
      content:
        "High-level players usually do not max stats early.\n\nInstead, they prioritize:\n\n- Vigor (survivability)\n- Weapon upgrades (base damage)\n- Talismans (multipliers)\n- Scaling efficiency (soft caps)\n\nBecause efficiency beats raw numbers."
    },
    {
      heading: "Weapon Scaling + Soft Caps",
      level: 2,
      content:
        "Soft caps matter even more when combined with scaling weapons.\n\nFor example:\n\n- A weapon that scales with Intelligence (B scaling)\n- Will benefit more from Intelligence early\n\nBut once Intelligence passes its soft cap:\n\n- Each point becomes less valuable\n- Other stats may become more important\n\nThis is why balanced builds often outperform over-invested ones."
    },
    {
      heading: "Common Mistakes",
      level: 2,
      content: ""
    },
    {
      heading: "1. Over-investing past 60 Vigor",
      level: 3,
      content:
        "HP gains become inefficient."
    },
    {
      heading: "2. Rushing 80 in damage stats",
      level: 3,
      content:
        "Often unnecessary for most builds."
    },
    {
      heading: "3. Ignoring Endurance",
      level: 3,
      content:
        "Limits stamina and equip load."
    },
    {
      heading: "4. Spreading stats too thin",
      level: 3,
      content:
        "Reduces overall scaling efficiency."
    },
    {
      heading: "Frequently Asked Questions",
      level: 2,
      content:
        "### Do I need to stop leveling after soft caps?\n\nNo. You can still level, but efficiency decreases.\n\n### Is 60 Vigor required?\n\nNot required, but strongly recommended for endgame.\n\n### Is 80 Intelligence always best?\n\nOnly for pure caster builds. Not for hybrids.\n\n### Can I ignore soft caps?\n\nYes, but your build may become inefficient."
    },
    {
      heading: "Final Verdict",
      level: 2,
      content:
        "Soft caps are one of the most important hidden systems in Elden Ring.\n\nThey explain why:\n\n- More levels don\u2019t always mean more power\n- High-level builds can still feel weak\n- Optimization matters more than grinding\n\nThe strongest builds are not the ones with the highest stats.\n\nThey are the ones that understand when stats stop being efficient.\n\nMaster soft caps, and every future build becomes significantly stronger. Use the [Build Calculator](https://www.zosygo.com/elden-ring/tools/build-calculator) to plan your stat allocation against the soft caps."
    }
  ],
  internalLinks: [
    { href: "/elden-ring/builds/elden-ring-damage-scaling-explained", anchorText: "Damage Scaling Explained" },
    { href: "/elden-ring/builds/elden-ring-low-damage-explained", anchorText: "Low Damage Explained" },
    { href: "/elden-ring/builds/elden-ring-build-mistakes", anchorText: "10 Build Mistakes" },
    { href: "/elden-ring/builds/why-your-build-feels-weak", anchorText: "Why Your Build Feels Weak" },
    { href: "/elden-ring/bosses/how-to-beat-malenia", anchorText: "Soft Caps vs Malenia" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" },
    { href: "/elden-ring/tools/weapon-ar-calculator", anchorText: "Compare Weapon AR" },
  ]
};

const article17: Article = {
  keyTakeaways: [
    { label: "⚔️ Rule #1", value: "Weapon upgrades matter more than character levels — +25 > +10 STR" },
    { label: "📉 Rule #2", value: "Scaling is not linear — early levels strong, late levels weak (diminishing)" },
    { label: "🎯 Rule #3", value: "Scaling efficiency varies by weapon type — match weapon to your stat" },
    { label: "💡 Key Insight", value: "A +25 weapon with mediocre stats beats a +0 with perfect stats" },
    { label: "📊 Soft Cap Reality", value: "Lv 80 feels strong, Lv 150+ damage plateaus — optimization > grinding" },
    { label: "🛠️ Fix", value: "Upgrade weapon first, THEN optimize stats — not the reverse" },
  ],
  slug: "elden-ring-damage-scaling-explained",
  category: "builds",
  gameSlug: "elden-ring",
  difficulty: "beginner",
  readTimeMinutes: 9,
  order: 17,
  title: "Elden Ring Damage Scaling Explained (2026) – Why Your Build Stops Working at High Level",
  metaDescription: "A complete breakdown of how damage scaling actually works in Elden Ring, why leveling past soft caps feels useless, and how to fix weak endgame builds.",
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "---\n\nMost Elden Ring players eventually hit the same problem:\n\nYou keep leveling up, but your damage barely improves.\n\nAt Level 80, your build feels strong.\n\nAt Level 120, it still feels fine.\n\nAt Level 150+, something changes:\n\n- Damage stops increasing meaningfully  \n- Bosses feel tankier  \n- New levels feel \"useless\"  \n- Builds feel weaker than expected  \n\nThis is not a bug.\n\nIt is how scaling actually works in Elden Ring.\n\nThe key system behind this is **damage scaling + soft caps + weapon dependency**.",
      image: "intelligence-build-moonveil-weapon.png",
      imageAlt: "Elden Ring damage scaling concept showing stat allocation and weapon scaling",
    },
    {
      heading: "The Real Reason Your Build Feels Weak",
      level: 2,
      content:
        "Most players think:\n\n> \"I just need more levels to do more damage.\"\n\nBut Elden Ring does not scale linearly.\n\nInstead, it uses three hidden rules:\n\n- Weapon upgrades matter more than stats\n- Stats have diminishing returns (soft caps)\n- Scaling efficiency varies by weapon type\n\nOnce you understand this, the entire game changes.",
      image: "202cbf1646fbde075d5d60db094fd856.jpeg",
      imageAlt: "Elden Ring level up screen showing stat investment and soft cap effects",
    },
    {
      heading: "Rule #1: Weapon Upgrades Matter More Than Levels",
      level: 2,
      content:
        "One of the biggest misconceptions is that leveling your character is the main source of damage.\n\nIt is not.\n\nIn most builds:\n\n- +0 → +10 weapon = massive damage increase  \n- +10 → +25 weapon = build-defining power spike  \n\nMeanwhile:\n\n- +10 Strength at high level = small gain\n\n### Simple truth:\n\n> A +25 weapon with mediocre stats beats a low-upgrade weapon with perfect stats.",
      image: "soft-caps-vigor.png",
      imageAlt: "Elden Ring vigor stat soft caps and damage scaling relationship",
    },
    {
      heading: "Rule #2: Scaling Is Not Linear",
      level: 2,
      content:
        "Every stat in Elden Ring has hidden efficiency zones.\n\nFor example:\n\n- Early levels = strong gains  \n- Mid levels = decent gains  \n- High levels = weak gains  \n\nThis is why builds \"feel strong early\" but \"stagnate late\".\n\nThe game is designed to reward optimization, not infinite scaling.",
    },
    {
      heading: "Rule #3: Soft Caps Decide Your Real Power",
      level: 2,
      content:
        "Soft caps are the turning point where leveling stops being efficient.\n\nOnce you pass them:\n\n- Damage per level drops sharply  \n- Survivability gains slow down  \n- Build improvement becomes minimal  \n\nThis is why Level 150 often feels weaker than expected.\n\nYou are investing points where they no longer matter much.",
    },
    {
      heading: "The Most Important Soft Cap Zones",
      level: 2,
      content:
        "### Vigor\n- 40 → good baseline  \n- 60 → optimal endgame zone  \n- 60+ → diminishing returns  \n\n### Damage Stats (Strength / Dexterity / Intelligence / Faith)\n- 20–55 → strong scaling zone  \n- 55–80 → reduced efficiency  \n- 80+ → minimal gains  \n\n### Arcane\n- 45–60 → strongest value range for status builds",
    },
    {
      heading: "Why Level 150 Builds Often Feel Weak",
      level: 2,
      content:
        "A typical weak endgame build looks like this:\n\n- Vigor: 35  \n- Damage stat: 80  \n- Endurance: low  \n- Weapon: not fully optimized  \n\nOn paper, this looks strong.\n\nIn practice, it fails because:\n\n- Too much investment beyond soft caps  \n- Not enough survivability  \n- Poor scaling efficiency balance  \n\nNow compare:\n\n### Optimized Build\n\n- Vigor: 60  \n- Damage stat: 60–70  \n- Proper weapon upgrade  \n- Balanced endurance  \n\nResult:\n\n> Higher real DPS over time + fewer deaths + more consistent fights",
    },
    {
      heading: "Hidden Factor #1: Survivability = Damage",
      level: 2,
      content:
        "This is often misunderstood.\n\nMore survivability means:\n\n- Fewer healing breaks  \n- More uptime in fights  \n- More consistent DPS output  \n\nA \"high damage build\" that dies often does less total damage than a balanced build.",
    },
    {
      heading: "Hidden Factor #2: Talismans Matter More Than Extra Levels",
      level: 2,
      content:
        "Talismans often provide:\n\n- Multiplicative damage boosts  \n- Survivability spikes  \n- Build-defining effects  \n\nExamples:\n\n- Shard of Alexander  \n- Rotten Winged Sword Insignia  \n- Dragoncrest Greatshield Talisman  \n\nIn many builds:\n\n> A good talisman setup = more power than 10–15 levels.",
    },
    {
      heading: "Hidden Factor #3: Scaling Type Matters",
      level: 2,
      content:
        "Not all weapons scale the same.\n\nSome weapons:\n\n- Scale heavily with one stat  \n- Others split scaling across multiple stats  \n- Some rely more on base damage than scaling  \n\nThis is why two Level 150 players can feel completely different in power. Simulate different stat allocations to see their impact on damage with the [Build Calculator](https://www.zosygo.com/elden-ring/tools/build-calculator).",
    },
    {
      heading: "How to Fix a Weak Build (Practical Checklist)",
      level: 2,
      content:
        "Before blaming the game, check this:\n\n### 1. Is your weapon fully upgraded?\nIf not, this is your biggest problem.",
    },
    {
      heading: "2. Are you past soft caps?",
      level: 3,
      content:
        "If yes, stop over-investing in that stat.",
    },
    {
      heading: "3. Is your Vigor at least 50–60?",
      level: 3,
      content:
        "If not, survivability is limiting your damage.",
    },
    {
      heading: "4. Are your stats focused or scattered?",
      level: 3,
      content:
        "Specialization usually wins.",
    },
    {
      heading: "5. Are your talismans synergizing?",
      level: 3,
      content:
        "Random talismans = weak scaling efficiency.",
    },
    {
      heading: "Why High-Level Builds Don't Feel Like \"Endgame Power\"",
      level: 2,
      content:
        "Players expect:\n\n> More levels = more power\n\nBut Elden Ring is built differently:\n\n> More optimization = more power\n\nThis is why:\n\n- Level 100 optimized build can beat Level 150 messy build  \n- \"Meta builds\" are efficient, not max-level  \n- Damage depends more on structure than raw numbers",
    },
    {
      heading: "Final Verdict",
      level: 2,
      content:
        "If your build feels weak in Elden Ring, the problem is rarely your level.\n\nIt is almost always:\n\n- Poor scaling efficiency  \n- Wrong stat distribution  \n- Ignoring soft caps  \n- Weak weapon optimization  \n\nOnce you understand how scaling actually works, leveling becomes secondary.\n\nThe strongest builds are not the highest level.\n\nThey are the most efficient within the system.\n\nAnd efficiency is what decides real power in Elden Ring. Check how different stat allocations affect your weapon's damage output with the [Weapon AR Calculator](https://www.zosygo.com/elden-ring/tools/weapon-ar-calculator). ",
    },
  ],
  internalLinks: [
    { href: "/elden-ring/builds/elden-ring-low-damage-explained", anchorText: "Low Damage Explained" },
    { href: "/elden-ring/builds/elden-ring-build-mistakes", anchorText: "10 Build Mistakes" },
    { href: "/elden-ring/builds/soft-caps-explained-2026", anchorText: "Soft Caps Explained (2026)" },
    { href: "/elden-ring/builds/why-your-build-feels-weak", anchorText: "Why Your Build Feels Weak" },
    { href: "/elden-ring/bosses/how-to-beat-maliketh-black-blade", anchorText: "Damage Scaling vs Maliketh" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" }
  ]
};

const article18: Article = {
  keyTakeaways: [
    { label: "🎯 Quick Answer", value: "Low damage = weak weapon upgrade + past soft caps + wrong talisman synergy" },
    { label: "⚔️ Fix #1", value: "Upgrade your weapon fully — weapon levels > character levels" },
    { label: "📊 Fix #2", value: "Check soft caps — Vigor 60, STR/DEX 55-60, INT/FAI 60, ARC 45" },
    { label: "🛡️ Fix #3", value: "Use multiplicative buffs — talismans + physick + armor sets stack" },
    { label: "🎮 Fix #4", value: "Match weapon affinity to your stat — Heavy for STR, Keen for DEX" },
    { label: "💡 Core Rule", value: "Problem is rarely your level — it's almost always build efficiency" },
  ],
  slug: "elden-ring-low-damage-explained",
  category: "builds",
  gameSlug: "elden-ring",
  difficulty: "beginner",
  readTimeMinutes: 9,
  order: 18,
  title: "Elden Ring Low Damage Explained (2026) – Why Your Build Feels Weak and How to Fix It",
  metaDescription: "A complete breakdown of why your damage is low in Elden Ring, covering weapon scaling, soft caps, talismans, and stat mistakes that ruin endgame builds.",
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "---",
      image: "u=1904568550,1900617044&fm=253&fmt=auto&app=120&f=JPEG.webp",
      imageAlt: "Elden Ring low damage build example showing stat screen",
    },
    {
      heading: "Quick Answer (Featured Snippet)",
      level: 2,
      content:
        "If your damage is low in Elden Ring, it is usually caused by:\n\n- Not upgrading your weapon fully  \n- Investing past soft caps (wasted stats)  \n- Using poor scaling weapons for your build  \n- Weak talisman synergy  \n- Low Vigor causing survival downtime  \n\nIn most cases, the issue is **not your level**, but **your build efficiency**.",
      image: "build-planner-calc.png",
      imageAlt: "Elden Ring build planner showing damage optimization",
    },
    {
      heading: "Why Your Damage Feels Low in Elden Ring",
      level: 2,
      content:
        "Many players reach mid or late game in Elden Ring and suddenly feel weaker instead of stronger.\n\nThis is confusing because they assume:\n\n> More levels = more damage\n\nBut Elden Ring does not scale that way.\n\nThe game uses a combination of:\n\n- Weapon upgrade scaling  \n- Stat soft caps  \n- Multiplicative buffs  \n- Hidden efficiency curves  \n\nOnce these systems are ignored, damage stagnates. See how much damage your weapon gains per upgrade level with the [Weapon AR Calculator](https://www.zosygo.com/elden-ring/tools/weapon-ar-calculator).",
      image: "bloodhound-fang-stats.jpg",
      imageAlt: "Elden Ring Bloodhound Fang stats screen showing weapon scaling",
    },
    {
      heading: "Reason #1: Your Weapon Is Doing Most of the Work (or Not Doing It)",
      level: 2,
      content:
        "Weapon upgrades matter more than character level.\n\n### Damage impact comparison:\n\n| Upgrade Type | Damage Increase |\n|--------------|----------------|\n| +0 → +10 weapon | Massive increase |\n| +10 → +25 weapon | Endgame scaling core |\n| +10 STR | Small increase |\n\n> If your weapon is not fully upgraded, your build will always feel weak.",
    },
    {
      heading: "Reason #2: You Are Past Soft Caps (Wasted Stats)",
      level: 2,
      content:
        "Soft caps are where stat efficiency drops sharply.\n\n### Key Soft Caps\n\n| Stat | Early Cap | Hard Cap |\n|------|----------|----------|\n| Vigor | 40 | 60 |\n| STR / DEX / INT / FTH | 55 | 80 |\n| Arcane | 45 | 60 |\n\n### What happens after soft caps:\n\n- Damage gain per level drops significantly  \n- Build feels \"stuck\" even after leveling  \n\n> This is the #1 reason Level 120+ builds feel weak.",
    },
    {
      heading: "Reason #3: Wrong Stat Distribution (Most Common Mistake)",
      level: 2,
      content:
        "A typical weak endgame build:\n\n- Vigor: 30–40  \n- Damage stat: 80  \n- Endurance: low  \n\nThis looks strong on paper but performs poorly.\n\n### Why?\n\nBecause:\n\n- Too much investment past soft caps  \n- Not enough survivability  \n- No balanced scaling structure",
    },
    {
      heading: "Better Endgame Build Example",
      level: 2,
      content:
        "- Vigor: 55–60  \n- Main damage stat: 60–70  \n- Endurance: 20–30  \n- Weapon fully upgraded  \n\n> This build does **more real DPS over time**, not just burst damage.",
    },
    {
      heading: "Reason #4: Talismans Are Doing Nothing for You",
      level: 2,
      content:
        "Talismans are multiplicative power sources.\n\n### Strong talismans:\n\n- Shard of Alexander  \n- Rotten Winged Sword Insignia  \n- Dragoncrest Greatshield Talisman  \n- Lord of Blood's Exultation  \n\n### Weak builds often use:\n\n- Random defensive mix  \n- No synergy with weapon type  \n\n> This alone can reduce damage output by 20–40%.",
    },
    {
      heading: "Reason #5: Survivability Is Hidden Damage",
      level: 2,
      content:
        "Low Vigor = more healing = less DPS uptime.\n\n### Example:\n\n| Build Type | Result |\n|------------|--------|\n| High damage / low Vigor | Constant interruptions |\n| Balanced build (60 Vigor) | Stable DPS uptime |\n\n> Over time, the \"tankier\" build deals more total damage.",
    },
    {
      heading: "Damage Fix Checklist (Fast Diagnosis)",
      level: 2,
      content:
        "Before assuming your build is bad, check this:\n\n### 1. Is your weapon fully upgraded?\nIf not → this is your main problem.",
    },
    {
      heading: "2. Are you over soft caps?",
      level: 3,
      content:
        "If yes → you are wasting levels.",
    },
    {
      heading: "3. Is your Vigor at least 50?",
      level: 3,
      content:
        "If not → survivability is limiting DPS.",
    },
    {
      heading: "4. Are your talismans synergized?",
      level: 3,
      content:
        "If not → you are missing multiplicative damage.",
    },
    {
      heading: "5. Is your build focused?",
      level: 3,
      content:
        "Hybrid builds often underperform in endgame.",
    },
    {
      heading: "Why Level 150 Feels Weak for Many Players",
      level: 2,
      content:
        "At Level 150, most players expect:\n\n- Max damage  \n- Easy boss fights  \n- High scaling returns  \n\nBut what they actually get is:\n\n- Diminishing returns from stats  \n- Poor efficiency from hybrid builds  \n- Unoptimized talismans  \n\n> The problem is not the level cap.  \n> The problem is build structure. Run your own numbers through the [Build Calculator](https://www.zosygo.com/elden-ring/tools/build-calculator) to find where your build is wasting damage.",
    },
    {
      heading: "How to Actually Increase Damage",
      level: 2,
      content:
        "There are only 4 real ways:\n\n### 1. Upgrade weapon fully\nMost important factor.\n\n### 2. Fix stat efficiency\nStay within soft caps.\n\n### 3. Optimize talismans\nUse multiplicative synergy.\n\n### 4. Improve uptime\nMore survival = more DPS. ",
    },
    {
      heading: "Final Verdict",
      level: 2,
      content:
        "Low damage in Elden Ring is almost never a \"level problem\".\n\nIt is a **build efficiency problem**.\n\nOnce you understand:\n\n- Weapon scaling  \n- Soft caps  \n- Talisman synergy  \n- Survivability impact  \n\nYou will realize:\n\n> Strong builds are not higher level — they are better structured.\n\nAnd that is what actually defines damage in Elden Ring.",
    },
  ],
  internalLinks: [
    { href: "/elden-ring/builds/elden-ring-damage-scaling-explained", anchorText: "Damage Scaling Explained" },
    { href: "/elden-ring/builds/elden-ring-build-mistakes", anchorText: "10 Build Mistakes" },
    { href: "/elden-ring/builds/soft-caps-explained-2026", anchorText: "Soft Caps Explained (2026)" },
    { href: "/elden-ring/builds/why-your-build-feels-weak", anchorText: "Why Your Build Feels Weak" },
    { href: "/elden-ring/bosses/how-to-beat-starscourge-radahn", anchorText: "Low Damage vs Radahn" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" }
  ]
};

const article19: Article = {
  keyTakeaways: [
    { label: "🎯 Mistake #1", value: "Under-upgraded weapon — weapon level > character level for damage" },
    { label: "📊 Mistake #2", value: "Stats past soft caps — wasted levels that don't improve DPS" },
    { label: "🩸 Mistake #3", value: "Low Vigor — dead players deal 0 damage (target 55-60)" },
    { label: "⚔️ Mistake #4", value: "No build identity — hybrid builds with 4 stats spread always underperform" },
    { label: "🛡️ Mistake #5", value: "Wrong weapon affinity — Heavy for STR, Keen for DEX, Magic for INT" },
    { label: "💡 Core Rule", value: "Build structure matters more than level — 10 fixes in article" },
  ],
  slug: "elden-ring-build-mistakes",
  category: "builds",
  gameSlug: "elden-ring",
  difficulty: "beginner",
  readTimeMinutes: 9,
  order: 19,
  title: "Elden Ring Build Mistakes (2026) – 10 Reasons Your Character Feels Weak (And How to Fix Them)",
  metaDescription: "A deep breakdown of the most common build mistakes in Elden Ring, including scaling errors, stat distribution issues, weapon upgrades, and optimization fixes.",
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "---\n\nIf your character feels weak in Elden Ring, the problem is almost never \"not enough level\".\n\nIn most cases, players are making **fundamental build mistakes** that completely break damage scaling, survivability, or efficiency.\n\nThis guide breaks down the **10 most common build mistakes** and how to fix them. Test your current build with the [Build Calculator](https://www.zosygo.com/elden-ring/tools/build-calculator) to identify inefficiencies before making changes.",
      image: "u=3949170640,2849213860&fm=253&fmt=auto&app=120&f=JPEG.webp",
      imageAlt: "Elden Ring build mistakes stat distribution example",
    },
    {
      heading: "Quick Diagnosis (Featured Snippet Answer)",
      level: 1,
      content:
        "Your build feels weak because of one or more of the following:\n\n- Weapon not fully upgraded  \n- Stats past soft caps  \n- Poor scaling weapon choice  \n- Weak talisman synergy  \n- Low Vigor causing downtime  \n- Hybrid builds with no focus  \n- Wrong infusion / affinity  \n- Ignoring buff stacking  \n- Poor stamina management  \n- No multiplicative damage setup  \n\n> In Elden Ring, **build structure matters more than level.**",
      image: "u=3796080820,3234011768&fm=253&app=138&f=JPEG.jpeg",
      imageAlt: "Elden Ring character screen showing poor build structure",
    },
    {
      heading: "Mistake #1: Under-Upgraded Weapon (Biggest Damage Killer)",
      level: 1,
      content:
        "Your weapon upgrade level is the single most important damage factor.\n\n### Damage reality:\n\n| Weapon Level | Impact |\n|--------------|--------|\n| +0 → +10 | Huge jump |\n| +10 → +25 | Core endgame scaling |\n| Stats alone | Minor impact |\n\n> If your weapon is not maxed, your build is fundamentally incomplete.",
      image: "u=3832350217,2889219095&fm=253&app=138&f=JPEG.jpeg",
      imageAlt: "Elden Ring weapon selection and scaling mismatch example",
    },
    {
      heading: "Mistake #2: Ignoring Soft Caps",
      level: 1,
      content:
        "Soft caps define where leveling stops being efficient.\n\n### Key soft caps:\n\n| Stat | Soft Cap |\n|------|----------|\n| Vigor | 40 / 60 |\n| STR / DEX / INT / FTH | 55 / 80 |\n| Arcane | 45 / 60 |\n\nAfter these points:\n\n- Damage growth slows dramatically  \n- Leveling becomes inefficient  \n\n> Most \"weak builds\" are actually **over-leveled in the wrong stats**.",
    },
    {
      heading: "Mistake #3: Hybrid Builds With No Identity",
      level: 1,
      content:
        "Example of weak build:\n\n- STR + DEX + INT all spread evenly  \n\nProblem:\n\n- No stat reaches effective scaling range  \n- No synergy with weapons  \n\n> Elden Ring rewards specialization, not balance.",
    },
    {
      heading: "Mistake #4: Wrong Weapon for Your Stats",
      level: 1,
      content:
        "A common issue:\n\n- High STR build using DEX weapon  \n- INT build using non-scaling weapon  \n\nResult:\n\n- Base damage only  \n- Scaling ignored  \n\n> Weapon choice must match stat identity. Check your weapon's AR against common alternatives with the [Weapon AR Calculator](https://www.zosygo.com/elden-ring/tools/weapon-ar-calculator).",
    },
    {
      heading: "Mistake #5: Weak Talisman Setup",
      level: 1,
      content:
        "Talismans are **multipliers**, not bonuses.\n\n### Strong synergy example:\n\n- Shard of Alexander  \n- Rotten Winged Sword Insignia  \n- Lord of Blood's Exultation  \n\n### Weak setup:\n\n- Random defense mix  \n- No synergy  \n\n> A bad talisman setup can reduce DPS by 30%+.",
    },
    {
      heading: "Mistake #6: Low Vigor (Hidden DPS Loss)",
      level: 1,
      content:
        "Low Vigor doesn't just make you fragile.\n\nIt reduces damage indirectly:\n\n- More healing interruptions  \n- Less uptime in boss fights  \n- More panic dodging  \n\n> Effective DPS drops even if stats are high.",
    },
    {
      heading: "Mistake #7: Ignoring Buff Stacking",
      level: 1,
      content:
        "Many players don't stack:\n\n- Physick buffs  \n- Weapon buffs  \n- Talismans  \n- Temporary boosts  \n\nProper stacking = massive burst difference.",
    },
    {
      heading: "Mistake #8: Poor Endurance Management",
      level: 1,
      content:
        "Endurance affects:\n\n- Armor load  \n- Stamina pool  \n\nLow stamina means:\n\n- Fewer attacks  \n- Less dodging  \n- Lower DPS uptime",
    },
    {
      heading: "Mistake #9: Wrong Infusion / Affinity Choice",
      level: 1,
      content:
        "Examples:\n\n- Bleed build without Arcane scaling  \n- STR build using quality infusion incorrectly  \n\n> Infusion mismatch destroys scaling efficiency.",
    },
    {
      heading: "Mistake #10: No Build Direction",
      level: 1,
      content:
        "Weak builds usually have:\n\n- Random weapons  \n- Random stats  \n- No core strategy  \n\nStrong builds always have:\n\n- Clear damage type  \n- Clear stat focus  \n- Clear synergy system",
    },
    {
      heading: "How to Fix Any Weak Build (Universal Method)",
      level: 1,
      content:
        "Follow this 5-step reset:\n\n## Step 1: Max your weapon\nThis is non-negotiable.",
    },
    {
      heading: "Step 2: Identify your main damage stat",
      level: 2,
      content:
        "Pick ONE primary scaling stat.",
    },
    {
      heading: "Step 3: Respect soft caps",
      level: 2,
      content:
        "Stop over-investing after efficiency drops.",
    },
    {
      heading: "Step 4: Fix talisman synergy",
      level: 2,
      content:
        "Choose multipliers, not random stats.",
    },
    {
      heading: "Step 5: Increase Vigor to 50–60",
      level: 2,
      content:
        "Stability = higher real DPS.",
    },
    {
      heading: "Why Most Players Misunderstand Builds",
      level: 1,
      content:
        "The biggest misconception is:\n\n> \"Higher level = stronger character\"\n\nBut Elden Ring does not work like that.\n\nIt works like this:\n\n> \"Better efficiency = stronger character\"\n\nThat means:\n\n- Better scaling  \n- Better synergy  \n- Better uptime  \n- Better structure",
    },
    {
      heading: "Final Verdict",
      level: 1,
      content:
        "Most weak builds in Elden Ring are not under-leveled.\n\nThey are **poorly structured systems**.\n\nOnce you fix:\n\n- Weapon upgrade path  \n- Stat efficiency  \n- Scaling identity  \n- Talisman synergy  \n\nYour damage increases instantly—without needing more levels can help you find the optimal stat distribution for any build.",
    },
    {
      heading: "Conclusion",
      level: 2,
      content:
        "A strong build is not about stats.\n\nIt is about **how efficiently every system works together**.\n\nAnd that is what truly defines power in Elden Ring.",
    },
  ],
  internalLinks: [
    { href: "/elden-ring/builds/elden-ring-damage-scaling-explained", anchorText: "Damage Scaling Explained" },
    { href: "/elden-ring/builds/elden-ring-low-damage-explained", anchorText: "Low Damage Explained" },
    { href: "/elden-ring/builds/soft-caps-explained-2026", anchorText: "Soft Caps Explained (2026)" },
    { href: "/elden-ring/builds/why-your-build-feels-weak", anchorText: "Why Your Build Feels Weak" },
    { href: "/elden-ring/bosses/how-to-beat-mohg-lord-of-blood", anchorText: "Build Mistakes vs Mohg" },
    { href: "/elden-ring/weapons/rivers-of-blood", anchorText: "Rivers of Blood Guide" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" }
  ]
};

const article20: Article = {
  keyTakeaways: [
    { label: "🎯 Recommended", value: "Level 120-150, Vigor 55-60, +25/+10 weapon, 12+ flasks" },
    { label: "⚔️ Best Weapons", value: "Bleed or Frost — Rivers of Blood, Hand of Malenia, Frost Pots" },
    { label: "🛡️ Best Spirit Ash", value: "Mimic Tear +10 or Black Knife Tiche +10" },
    { label: "💡 Core Strategy", value: "Medium distance, never panic roll backward, save stamina for Waterfowl" },
    { label: "⚠️ Key Warning", value: "She heals on hit (even blocked) — don't trade hits, dodge instead" },
    { label: "🎮 Punish Rule", value: "One jump attack or weapon skill per combo — greed is #1 death cause" },
  ],
  slug: "how-to-beat-malenia",
  category: "bosses",
  gameSlug: "elden-ring",
  difficulty: "intermediate",
  readTimeMinutes: 10,
  order: 20,
  title: "How to Beat Malenia in Elden Ring (2026 Guide) – Every Attack, Weakness, and Punish Window Explained",
  metaDescription: "Complete Malenia boss guide covering Phase 1, Phase 2, Waterfowl Dance, weaknesses, recommended builds, and every punish opportunity.",
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "---",
      image: "u=3301460746,907473116&fm=253&fmt=auto&app=138&f=JPEG.webp",
      imageAlt: "Elden Ring Malenia boss fight arena in Elphael Brace of the Haligtree",
    },
    {
      heading: "Quick Answer",
      level: 2,
      content:
        "If you're struggling against Malenia:\n\n- Stay at medium distance\n- Never panic roll backward\n- Save stamina for Waterfowl Dance\n- Punish only after specific combos\n- Prioritize survivability over damage\n\nMost deaths happen because players become greedy after dodging one attack.\n\nMalenia punishes greed more than any other boss in Elden Ring.",
      image: "u=3415387228,3002342741&fm=253&app=138&f=JPEG.jpeg",
      imageAlt: "Elden Ring combat preparation for Malenia boss encounter",
    },
    {
      heading: "Recommended Level and Preparation",
      level: 2,
      content:
        "| Category | Recommendation |\n|-----------|---------------|\n| Character Level | 120–150 |\n| Weapon Upgrade | +25 / +10 Somber |\n| Vigor | 55–60 |\n| Flask Charges | 12+ |\n| Spirit Ash | Mimic Tear or Tiche |\n\nBefore entering the arena:\n\n- Equip Bleed or Frost weapons\n- Bring high physical defense armor\n- Use a fully upgraded weapon\n- Avoid glass cannon builds",
      image: "u=3987413922,1148627239&fm=253&fmt=auto&app=120&f=JPEG.webp",
      imageAlt: "Elden Ring gameplay showing boss fight strategy and positioning",
    },
    {
      heading: "Understanding Malenia's Biggest Advantage",
      level: 2,
      content:
        "Most bosses punish mistakes with damage.\n\nMalenia punishes mistakes twice.\n\nFirst, she damages you.\n\nSecond, she heals herself.\n\nEven blocked attacks restore health.\n\nThis means every mistake extends the fight.",
    },
    {
      heading: "Phase 1 Attack Breakdown",
      level: 2,
      content:
        "### Basic Sword Combo\n\nMalenia slowly walks forward before attacking.\n\nThe combo may contain:\n\n- 2 hits\n- 3 hits\n- 4 hits\n\ndepending on distance.\n\n#### Punish Window\n\nAfter the final slash.\n\nOne jump attack or one weapon skill is usually safe.\n\nDo not overcommit.",
    },
    {
      heading: "Dash Slash",
      level: 3,
      content:
        "One of her fastest attacks.\n\n**Tell:**\n\n- Brief pause\n- Sudden forward movement\n\n#### Counter Strategy\n\nRoll toward her.\n\nRolling backward often gets clipped.",
    },
    {
      heading: "Grab Attack",
      level: 3,
      content:
        "One of Malenia's deadliest moves.\n\n**Tell:**\n\n- She lowers her stance\n- Left arm extends\n\n#### Counter Strategy\n\nRoll sideways.\n\nNever backward.\n\nIf grabbed, expect massive damage.",
    },
    {
      heading: "Waterfowl Dance Explained",
      level: 2,
      content:
        "This attack causes more player deaths than any other move in the fight.\n\n### Tell\n\nMalenia jumps into the air.\n\nShe briefly hovers.\n\nEverything pauses for about a second.\n\nThe moment you see this animation:\n\n- Stop attacking\n- Prepare to react",
    },
    {
      heading: "First Flurry",
      level: 3,
      content:
        "Sprint away immediately.\n\nDo not panic roll.\n\nDistance matters more than timing.",
    },
    {
      heading: "Second Flurry",
      level: 3,
      content:
        "Roll through Malenia.\n\nDo not roll away.",
    },
    {
      heading: "Final Flurry",
      level: 3,
      content:
        "Roll through the attack.\n\nThen move away and reset positioning.",
    },
    {
      heading: "Phase 2 Begins",
      level: 2,
      content:
        "When Malenia reaches zero HP, the fight enters Phase 2.\n\nShe transforms into Goddess of Rot.\n\nNew threats include:\n\n- Scarlet Rot\n- Larger AoE attacks\n- More aggression",
    },
    {
      heading: "Scarlet Aeonia",
      level: 2,
      content:
        "Phase 2 always begins with this move.\n\n### Counter Strategy\n\nSprint away immediately.\n\nDo not attack.\n\nDo not heal.\n\nAfter the flower explodes, you gain one of the largest punish windows in the fight.",
    },
    {
      heading: "Clone Attack",
      level: 2,
      content:
        "Malenia sends multiple phantom copies toward the player.\n\n### Counter Strategy\n\nKeep moving.\n\nRoll only when necessary.\n\nPanic rolling often causes more deaths than the attack itself.",
    },
    {
      heading: "Best Damage Opportunities",
      level: 2,
      content:
        "The safest damage windows are:\n\n1. After Scarlet Aeonia\n2. After grab recovery\n3. After long combo finishers\n4. After missed thrust attacks\n5. During stagger animations",
    },
    {
      heading: "Best Builds Against Malenia",
      level: 2,
      content:
        "### Bleed Builds\n\nAdvantages:\n\n- High percentage damage\n- Frequent staggers\n- Fast pressure\n\nExcellent for first clears. Fine-tune your build against Malenia with the [Build Calculator](https://www.zosygo.com/elden-ring/tools/build-calculator) — the right stat balance makes a huge difference in this fight.",
    },
    {
      heading: "Frost Builds",
      level: 3,
      content:
        "Advantages:\n\n- Burst damage\n- Defense reduction\n\nVery effective throughout both phases.",
    },
    {
      heading: "Strength Builds",
      level: 3,
      content:
        "Advantages:\n\n- Stance breaks\n- High stagger potential\n\nHarder to master, but extremely powerful.",
    },
    {
      heading: "Common Mistakes",
      level: 2,
      content:
        "### Greedy Attacking\n\nMost deaths happen because players attempt one extra hit.",
    },
    {
      heading: "Healing At Close Range",
      level: 3,
      content:
        "Always create space before healing.",
    },
    {
      heading: "Rolling Backward",
      level: 3,
      content:
        "Many attacks track backward movement.\n\nForward and diagonal rolls are safer.",
    },
    {
      heading: "Ignoring Waterfowl Dance",
      level: 3,
      content:
        "Every successful Malenia strategy begins with understanding Waterfowl Dance.",
    },
    {
      heading: "Final Strategy",
      level: 2,
      content:
        "Think of Malenia as a discipline test.\n\nMost bosses reward aggression.\n\nMalenia rewards patience.\n\nPlayers who defeat her consistently:\n\n- Wait for openings\n- Respect Waterfowl Dance\n- Preserve stamina\n- Avoid greed\n\nMaster these fundamentals and the fight becomes dramatically more manageable.",
    },
    {
      heading: "FAQ",
      level: 2,
      content:
        "### What is Malenia weak to?\n\nBleed and Frost are generally her biggest weaknesses.\n\n### Can you stagger Malenia?\n\nYes. Heavy weapons and jump attacks can break her stance.\n\n### What level should I fight Malenia?\n\nMost players succeed between Level 120 and 150.\n\n### Is Malenia harder than DLC bosses?\n\nFor many players, yes.\n\n### What kills players most often?\n\nWaterfowl Dance and greedy attacks. Use the [Rune Level Calculator](https://www.zosygo.com/elden-ring/tools/rune-level-calculator) to plan how many runes you need to reach the recommended level for Malenia.",
    },
  ],
  internalLinks: [
    { href: "/elden-ring/bosses/malenia-healing-mechanic-explained", anchorText: "Malenia Healing Mechanic Explained" },
    { href: "/elden-ring/bosses/how-to-beat-maliketh-black-blade", anchorText: "Maliketh vs Malenia: Difficulty Comparison" },
    { href: "/elden-ring/bosses/how-to-beat-mohg-lord-of-blood", anchorText: "How to Beat Mohg (Bleed Comparison)" },
    { href: "/elden-ring/weapons/rivers-of-blood", anchorText: "Rivers of Blood — Best Weapon for Malenia" },
    { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds Guide" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" }
  ]
};


const article21: Article = {
  keyTakeaways: [
    { label: "🎯 Recommended", value: "Level 60-80, Vigor 30+, weapon +12 to +18, 8+ flasks" },
    { label: "⚔️ Key Strategy", value: "Summon ALL NPCs, stay mounted, re-summon when they die" },
    { label: "🩸 Best Damage Type", value: "Scarlet Rot (best), Bleed — Rot makes Phase 2 much shorter" },
    { label: "💡 Phase 1", value: "Stay on Torrent, hit-and-run, let NPCs tank" },
    { label: "💡 Phase 2", value: "Don't fight directly — run, dodge meteor, let NPCs rebuild" },
    { label: "⚠️ Key Warning", value: "Treat it as a battlefield, not a duel — re-summon is the core mechanic" },
  ],
  slug: "how-to-beat-starscourge-radahn",
  category: "bosses",
  gameSlug: "elden-ring",
  difficulty: "intermediate",
  readTimeMinutes: 10,
  order: 21,
  title: "How to Beat Starscourge Radahn in Elden Ring (2026 Guide) – Festival Strategy, Weaknesses, and Phase Breakdown",
  metaDescription: "Complete Starscourge Radahn guide covering Festival mechanics, best summons, weaknesses, Phase 1 and Phase 2 strategies, rewards, and common mistakes.",
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "---",
    },
    {
      heading: "Quick Answer",
      level: 2,
      content:
        "If you are struggling against Radahn:\n\n- Summon every available NPC\n- Stay mounted whenever possible\n- Use Scarlet Rot if available\n- Avoid fighting directly in Phase 2\n- Re-summon allies throughout the battle\n\nThe fight becomes significantly easier once you treat it like a battlefield instead of a traditional boss duel.",
      image: "u=2174566074,2385001868&fm=253&app=138&f=JPEG.jpeg",
      imageAlt: "Elden Ring Starscourge Radahn boss fight in Caelid Wailing Dunes",
    },
    {
      heading: "Where to Find Radahn",
      level: 2,
      content:
        "Radahn is located in:\n\n**Redmane Castle, Caelid**\n\nThe fight becomes available after the Radahn Festival begins.\n\nOnce the festival starts:\n\n- Speak to the announcer\n- Use the lift\n- Activate the portal\n- Enter the Wailing Dunes\n\nThis transports you to one of the largest boss arenas in Elden Ring.",
      image: "u=2766246958,169596608&fm=253&fmt=auto&app=138&f=JPEG.webp",
      imageAlt: "Elden Ring Radahn Festival with NPC summons in Redmane Castle",
    },
    {
      heading: "Recommended Level",
      level: 2,
      content:
        "| Category | Recommendation |\n|-----------|---------------|\n| Character Level | 60–80 |\n| Weapon Upgrade | +12 to +18 |\n| Vigor | 30+ |\n| Flask Charges | 8+ |\n| Mount | Required |\n\nPlayers can defeat Radahn earlier, but this range provides the most consistent experience.",
      image: "u=4080150195,2786421708&fm=253&fmt=auto&app=138&f=JPEG.webp",
      imageAlt: "Elden Ring Radahn Phase 2 meteor crash attack strategy",
    },
    {
      heading: "Radahn's Weaknesses",
      level: 2,
      content:
        "### Scarlet Rot\n\nScarlet Rot is Radahn's biggest weakness.\n\nEven a single successful application can remove a large percentage of his health.\n\nPopular choices include:\n\n- Rotten Breath\n- Ekzykes's Decay\n- Rot Pots\n\nMany players defeat Radahn almost entirely through Rot damage.",
    },
    {
      heading: "Bleed",
      level: 3,
      content:
        "Bleed performs well due to Radahn's large health pool.\n\nRecommended weapons include:\n\n- Bloodhound's Fang\n- Uchigatana\n- Nagakiba",
    },
    {
      heading: "Summons",
      level: 3,
      content:
        "Unlike most bosses, Radahn is designed around NPC summons.\n\nIgnoring them makes the fight dramatically harder.",
    },
    {
      heading: "Understanding the Festival Mechanic",
      level: 2,
      content:
        "The battlefield contains multiple summon signs.\n\nThese signs allow you to call warriors into the battle.\n\nImportant NPCs include:\n\n- Blaidd\n- Alexander\n- Okina\n- Patches\n- Lionel\n\nThe key mechanic many players miss:\n\n**Summons can be called again after they die.**\n\nThis means the festival never truly ends.\n\nYour allies can continuously pressure Radahn throughout the fight.",
    },
    {
      heading: "Phase 1 Strategy",
      level: 2,
      content:
        "Phase 1 begins at extreme range.\n\nRadahn immediately starts firing enormous gravity arrows.\n\nMost first-time players die before reaching him.",
    },
    {
      heading: "Dodging the Opening Arrows",
      level: 3,
      content:
        "There are three options:\n\n#### Option 1: Use Terrain\n\nWeapon piles and debris can block arrows.\n\nThis is the safest method.\n\n#### Option 2: Dodge on Foot\n\nRoll at the last moment.\n\nRequires timing but is reliable.\n\n#### Option 3: Mounted Approach\n\nPossible but less forgiving.\n\nMistakes often result in death.",
    },
    {
      heading: "Closing the Distance",
      level: 3,
      content:
        "As you advance:\n\n- Activate every summon sign\n- Allow NPCs to engage first\n- Avoid rushing ahead\n\nYour goal is reaching melee range with maximum support.",
    },
    {
      heading: "Radahn's Melee Attacks",
      level: 3,
      content:
        "Once engaged, Radahn uses massive sweeping attacks.\n\nCommon attacks include:\n\n- Double sword sweep\n- Spinning combo\n- Gravity slam\n\nMost attacks have long windups.\n\nWatch his shoulders rather than the weapons themselves.",
    },
    {
      heading: "Best Punish Windows",
      level: 3,
      content:
        "The safest opportunities occur after:\n\n- Gravity slam recovery\n- Long spinning combo finish\n- Missed leap attacks\n\nDo not stay in front of Radahn for extended periods.\n\nHis follow-up attacks are extremely dangerous.",
    },
    {
      heading: "The Phase 2 Transition",
      level: 2,
      content:
        "At roughly 50% health:\n\nRadahn suddenly disappears.\n\nMany players think the fight has bugged.\n\nIt has not.\n\nHe is preparing one of the most iconic attacks in Elden Ring.",
    },
    {
      heading: "Meteor Crash Explained",
      level: 3,
      content:
        "After disappearing:\n\nRadahn launches himself into the sky.\n\nSeconds later he returns as a living meteor.\n\nThis attack can instantly kill many builds.",
    },
    {
      heading: "How to Survive",
      level: 3,
      content:
        "The moment Radahn leaves:\n\n- Get on Torrent\n- Sprint continuously\n- Watch the sky\n\nDo not stop moving.\n\nThe impact zone tracks your position.\n\nConstant movement makes the attack easy to avoid.",
    },
    {
      heading: "Phase 2 Strategy",
      level: 2,
      content:
        "Phase 2 introduces:\n\n- Stronger gravity magic\n- Faster aggression\n- Larger AoE attacks\n\nMany players try to fight aggressively here.\n\nThat is usually a mistake.",
    },
    {
      heading: "Safer Strategy",
      level: 3,
      content:
        "Continue using summons.\n\nAllow NPCs to distract Radahn.\n\nAttack only when opportunities appear.\n\nThis dramatically reduces risk.",
    },
    {
      heading: "Best Builds Against Radahn",
      level: 2,
      content:
        "### Strength Builds\n\nAdvantages:\n\n- High stagger potential\n- Excellent posture damage\n\nStrong but requires confidence in melee.",
    },
    {
      heading: "Bleed Builds",
      level: 3,
      content:
        "Advantages:\n\n- Fast health removal\n- Consistent damage\n\nOne of the easiest approaches.",
    },
    {
      heading: "Faith Builds",
      level: 3,
      content:
        "Advantages:\n\n- Rot access\n- Ranged options\n- Strong support tools\n\nExcellent for newer players.",
    },
    {
      heading: "Common Mistakes",
      level: 2,
      content:
        "### Ignoring Summons\n\nThis is the biggest mistake.\n\nThe fight was designed around them.",
    },
    {
      heading: "Fighting Alone",
      level: 3,
      content:
        "Trying to duel Radahn often makes the encounter harder than necessary.",
    },
    {
      heading: "Staying Stationary During Meteor Crash",
      level: 3,
      content:
        "Standing still almost guarantees death.",
    },
    {
      heading: "Forgetting To Re-Summon NPCs",
      level: 3,
      content:
        "Dead allies can be summoned again.\n\nMany players never realize this.",
    },
    {
      heading: "Rewards",
      level: 2,
      content:
        "Defeating Radahn grants:\n\n- Remembrance of the Starscourge\n- Large number of Runes\n- Progression toward Nokron\n\nMost importantly:\n\nA falling star crashes into Limgrave.\n\nThis event unlocks access to one of Elden Ring's most important areas.",
    },
    {
      heading: "Why Radahn Is One of Elden Ring's Best Bosses",
      level: 2,
      content:
        "Radahn is not remembered because he is the hardest boss.\n\nHe is remembered because the fight feels like a war.\n\nThe combination of:\n\n- Massive battlefield\n- Dozens of warriors\n- Gravity magic\n- Meteor attacks\n- Epic soundtrack\n\ncreates one of the most cinematic encounters in modern gaming.",
    },
    {
      heading: "FAQ",
      level: 2,
      content:
        "### What level should I be for Radahn?\n\nMost players succeed between Level 60 and 80.\n\n### Is Radahn weak to Scarlet Rot?\n\nYes. Scarlet Rot is one of his biggest weaknesses.\n\n### Can I use Torrent during the fight?\n\nYes. Torrent is available throughout the encounter.\n\n### Are summons required?\n\nNo, but they make the fight significantly easier.\n\n### What happens after defeating Radahn?\n\nA star crashes into Limgrave, unlocking access to Nokron, Eternal City. Check if your build is ready for Radahn with the [Build Calculator](https://www.zosygo.com/elden-ring/tools/build-calculator).",
    },
  ],
  internalLinks: [
    { href: "/elden-ring/bosses/starscourge-radahn-guide", anchorText: "Starscourge Radahn Guide" },
    { href: "/elden-ring/bosses/how-to-beat-mohg-lord-of-blood", anchorText: "Radahn vs Mohg: Late Game Comparison" },
    { href: "/elden-ring/bosses/how-to-beat-malenia", anchorText: "How to Beat Malenia" },
    { href: "/elden-ring/weapons/rivers-of-blood", anchorText: "Rivers of Blood — Best Bleed Build" },
    { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds Against Radahn" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" }
  ]
};

const article22: Article = {
  keyTakeaways: [
    { label: "🎯 Must-Have Item", value: "Purifying Crystal Tear — nullifies Nihil's damage" },
    { label: "⚔️ Best Damage", value: "Bleed or Frost — Mohg is weak to both (ironically)" },
    { label: "🛡️ Recommended", value: "Level 80-100, Vigor 40+, weapon +15/+18" },
    { label: "💡 Phase 1", value: "Stay close, dodge through bloodflame, punish after spear thrust" },
    { label: "💡 Phase 2", value: "Stay close (don't create distance), avoid bloodflame pools on ground" },
    { label: "⚠️ Common Mistake", value: "Forgetting Purifying Tear, panic rolling through bloodflame" },
  ],
  slug: "how-to-beat-mohg-lord-of-blood",
  category: "bosses",
  gameSlug: "elden-ring",
  difficulty: "intermediate",
  readTimeMinutes: 10,
  order: 22,
  title: "How to Beat Mohg, Lord of Blood in Elden Ring (2026 Guide) – Nihil Counter, Weaknesses, and Phase 2 Strategy",
  metaDescription: "Complete Mohg boss guide covering Nihil, Purifying Crystal Tear, weaknesses, best builds, Phase 2 mechanics, and common mistakes.",
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "---",
    },
    {
      heading: "Quick Answer",
      level: 2,
      content:
        "If you're struggling against Mohg:\n\n- Use Purifying Crystal Tear\n- Bring Bleed or Frost damage\n- Save healing flasks for Nihil\n- Stay close during Phase 2\n- Avoid panic rolling through bloodflame\n\nMost deaths happen because players don't understand Nihil or underestimate bloodflame area control.",
      image: "u=4193108178,2266110672&fm=253&app=138&f=JPEG.jpeg",
      imageAlt: "Elden Ring Mohg Lord of Blood boss fight in Mohgwyn Palace",
    },
    {
      heading: "Where to Find Mohg",
      level: 2,
      content:
        "Mohg, Lord of Blood is located in:\n\n**Mohgwyn Palace**\n\nThere are two main ways to reach the area.\n\n### Option 1: White Mask Varre Questline\n\nThe fastest method.\n\nCompleting Varre's quest grants access to:\n\n- Pureblood Knight's Medal\n\nThis teleports you directly to Mohgwyn Palace.",
      image: "u=412340321,4085897314&fm=253&fmt=auto&app=138&f=JPEG.webp",
      imageAlt: "Elden Ring Mohg Phase 1 bloodflame attacks and trident combat",
    },
    {
      heading: "Option 2: Consecrated Snowfield Portal",
      level: 3,
      content:
        "Late-game route.\n\nRequires:\n\n- Secret Haligtree Medallion\n- Consecrated Snowfield access\n\nA hidden portal transports players to Mohgwyn Palace.",
      image: "u=4229126849,996013759&fm=253&app=138&f=JPEG.jpeg",
      imageAlt: "Elden Ring Mohg Phase 2 Nihil ritual and winged form strategy",
    },
    {
      heading: "Recommended Level",
      level: 2,
      content:
        "| Category | Recommendation |\n|-----------|---------------|\n| Character Level | 100–130 |\n| Weapon Upgrade | +20 to +25 |\n| Vigor | 50+ |\n| Flask Charges | 10+ |\n| Purifying Crystal Tear | Strongly Recommended |\n\nMohg hits extremely hard.\n\nUnderleveled players often die during Phase 2 before learning the mechanics.",
    },
    {
      heading: "Mohg's Biggest Weaknesses",
      level: 2,
      content:
        "### Bleed\n\nIronically, Mohg is vulnerable to Bleed.\n\nRecommended weapons:\n\n- Rivers of Blood\n- Bloodhound's Fang\n- Nagakiba\n\nBleed allows players to shorten the fight dramatically.",
    },
    {
      heading: "Frost",
      level: 3,
      content:
        "Frostbite works exceptionally well.\n\nAdvantages:\n\n- Percentage damage\n- Temporary defense reduction\n\nThis remains one of the safest approaches.",
    },
    {
      heading: "Spirit Ashes",
      level: 3,
      content:
        "Popular choices:\n\n- Mimic Tear\n- Black Knife Tiche\n\nBoth create valuable openings throughout the fight.",
    },
    {
      heading: "Understanding Bloodflame",
      level: 2,
      content:
        "Bloodflame is Mohg's signature mechanic.\n\nMany attacks leave burning blood on the ground.\n\nThis causes:\n\n- Fire damage\n- Bleed buildup\n- Area denial\n\nThe longer the fight lasts, the more dangerous the arena becomes.\n\nYour positioning matters just as much as your dodging.",
    },
    {
      heading: "Phase 1 Strategy",
      level: 2,
      content:
        "Phase 1 focuses on blood magic and trident attacks.\n\nMost attacks are slower than they appear.\n\nPlayers who panic often get hit more frequently than those who stay calm.",
    },
    {
      heading: "Blood Slash Combo",
      level: 3,
      content:
        "One of Mohg's most common attacks.\n\n#### Tell\n\n- Trident raised\n- Delayed swing\n\n#### Counter\n\nRoll slightly later than expected.\n\nMohg uses many delayed attacks designed to punish early dodges.",
    },
    {
      heading: "Blood Claw",
      level: 3,
      content:
        "Mohg slashes through the air, creating blood explosions.\n\n#### Counter\n\nRoll through the claw itself.\n\nMany players focus on the projectile and get caught by the explosion.",
    },
    {
      heading: "Blood Toss",
      level: 3,
      content:
        "Mohg throws bloodflame across the arena.\n\n#### Counter\n\nMaintain awareness of where blood pools land.\n\nPositioning mistakes become much more dangerous later.",
    },
    {
      heading: "The Three Rings Mechanic",
      level: 2,
      content:
        "During Phase 1, Mohg may mark the player with blood rings.\n\nThese appear in sequence:\n\n- Tres\n- Duo\n- Unus\n\nMany players don't understand their purpose.\n\nThese marks are preparing for Nihil.",
    },
    {
      heading: "What Is Nihil?",
      level: 2,
      content:
        "Nihil is Mohg's most famous mechanic.\n\nAt roughly 50% health:\n\nMohg begins a ritual.\n\nHe chants:\n\n**\"Nihil.\"**\n\nThree times.\n\nEach chant:\n\n- Damages the player\n- Heals Mohg\n- Applies blood loss pressure\n\nThis attack cannot be rolled.\n\nIt cannot be blocked.\n\nMost first-time players die here.",
    },
    {
      heading: "How to Counter Nihil",
      level: 2,
      content:
        "The easiest solution is:\n\n### Purifying Crystal Tear\n\nThis item is specifically designed to counter Nihil.\n\nWhen mixed into your Flask of Wondrous Physick:\n\n- Nihil damage becomes manageable\n- Blood buildup is reduced\n- The transition becomes much safer\n\nWithout this item, Mohg becomes significantly harder.",
    },
    {
      heading: "How to Get Purifying Crystal Tear",
      level: 3,
      content:
        "Obtained from:\n\n**Eleonora, Violet Bloody Finger**\n\nLocation:\n\nSecond Church of Marika\n\nAltus Plateau\n\nThis is one of the most valuable preparations for the fight.",
    },
    {
      heading: "Surviving Nihil Without the Tear",
      level: 3,
      content:
        "If you don't have Purifying Crystal Tear:\n\n- Enter the transition with full health\n- Spam healing flasks during the ritual\n- Accept that Mohg will heal significantly\n\nThe fight remains possible but becomes much less forgiving.",
    },
    {
      heading: "Phase 2 Begins",
      level: 2,
      content:
        "After Nihil, everything changes.\n\nMohg gains:\n\n- Wings\n- Faster movement\n- More bloodflame attacks\n- Larger area control\n\nThis is where most attempts fail.",
    },
    {
      heading: "The Biggest Phase 2 Mistake",
      level: 3,
      content:
        "Most players create distance.\n\nThis feels logical.\n\nIt is also wrong.\n\nMohg's bloodflame attacks become more dangerous at range.",
    },
    {
      heading: "Why Staying Close Is Safer",
      level: 3,
      content:
        "At close range:\n\n- Attacks become easier to read\n- Bloodflame spreads less effectively\n- Punish opportunities increase\n\nMany experienced players stay aggressively near Mohg throughout Phase 2.",
    },
    {
      heading: "Best Damage Windows",
      level: 3,
      content:
        "The safest opportunities occur after:\n\n#### Wing Slam\n\nLarge recovery animation.",
    },
    {
      heading: "Blood Explosion Finishers",
      level: 4,
      content:
        "Several attacks leave Mohg briefly vulnerable.",
    },
    {
      heading: "Trident Thrust Recovery",
      level: 4,
      content:
        "One of the easiest punish windows in the fight.",
    },
    {
      heading: "Arena Management",
      level: 2,
      content:
        "The real challenge of Phase 2 is not Mohg himself.\n\nIt's the arena.\n\nBloodflame gradually restricts movement.\n\nGood players constantly reposition.\n\nBad players get trapped.\n\nAlways fight toward clean sections of the arena.",
    },
    {
      heading: "Common Mistakes",
      level: 2,
      content:
        "### Ignoring Purifying Crystal Tear\n\nThis is the single biggest mistake.\n\nThe item exists specifically for this encounter.",
    },
    {
      heading: "Healing During Combos",
      level: 3,
      content:
        "Mohg punishes panic healing aggressively.",
    },
    {
      heading: "Rolling Too Early",
      level: 3,
      content:
        "Many attacks are delayed.\n\nPatience is essential.",
    },
    {
      heading: "Fighting At Long Range",
      level: 3,
      content:
        "Phase 2 becomes significantly harder when Mohg controls the battlefield.",
    },
    {
      heading: "Standing In Bloodflame",
      level: 3,
      content:
        "Even small positioning errors add up over time.",
    },
    {
      heading: "Rewards",
      level: 2,
      content:
        "Defeating Mohg grants:\n\n- Remembrance of the Blood Lord\n- Large Rune reward\n- Progression toward one of the game's most important story locations\n\nMohg also guards access to content closely connected to Miquella's storyline.",
    },
    {
      heading: "Why Mohg Is One of Elden Ring's Best Bosses",
      level: 2,
      content:
        "Mohg succeeds because he forces players to prepare.\n\nMost bosses test reflexes.\n\nMohg tests knowledge.\n\nPlayers who understand:\n\n- Nihil\n- Bloodflame\n- Arena control\n- Purifying Crystal Tear\n\noften defeat him quickly.\n\nPlayers who ignore those mechanics struggle regardless of level.",
    },
    {
      heading: "FAQ",
      level: 2,
      content:
        "### What level should I fight Mohg?\n\nMost players succeed between Level 100 and 130.\n\n### Is Mohg weak to Bleed?\n\nYes. Bleed performs extremely well against Mohg.\n\n### What does Nihil do?\n\nNihil damages the player, heals Mohg, and applies blood loss pressure.\n\n### Do I need Purifying Crystal Tear?\n\nNo, but it makes the fight dramatically easier.\n\n### Is Mohg harder than Radahn?\n\nFor many players, yes. Nihil and bloodflame mechanics create a much steeper learning curve.\n\n### Can Spirit Ashes help?\n\nAbsolutely. Mimic Tear and Black Knife Tiche are particularly effective. Check the [Rune Level Calculator](https://www.zosygo.com/elden-ring/tools/rune-level-calculator) to see how many runes you need to reach the recommended level for Mohg.",
    },
  ],
  internalLinks: [
    { href: "/elden-ring/weapons/rivers-of-blood", anchorText: "Rivers of Blood — Best Bleed Weapon for Mohg" },
    { href: "/elden-ring/bosses/how-to-beat-malenia", anchorText: "Malenia vs Mohg: Endgame Boss Comparison" },
    { href: "/elden-ring/bosses/how-to-beat-messmer-the-impaler", anchorText: "How to Beat Messmer (DLC Entry)" },
    { href: "/elden-ring/bosses/how-to-beat-starscourge-radahn", anchorText: "How to Beat Radahn" },
    { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds Against Mohg" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" }
  ]
};


const article23: Article = {
  keyTakeaways: [
    { label: "🎯 Recommended", value: "Level 100-130, Vigor 50+, weapon +20/+24" },
    { label: "⚔️ Key Item", value: "Blasphemous Claw — parries Destined Death attacks in Phase 2" },
    { label: "💡 Phase 1 (Beast Clergyman)", value: "Stay close, dodge left on his melee combos, punish after charge" },
    { label: "💡 Phase 2 (Maliketh)", value: "Counterintuitive — stay CLOSE, not far. Roll INTO attacks" },
    { label: "⚠️ Destined Death", value: "Reduces max HP by 50% — use Blasphemous Claw to counter" },
    { label: "🛡️ Best Strategy", value: "Use pillars for positioning, be aggressive, avoid creating distance" },
  ],
  slug: "how-to-beat-maliketh-black-blade",
  category: "bosses",
  gameSlug: "elden-ring",
  difficulty: "intermediate",
  readTimeMinutes: 10,
  order: 23,
  title: "How to Beat Maliketh, the Black Blade in Elden Ring (2026 Guide) – Destined Death Explained, Best Strategy, and Every Punish Window",
  metaDescription: "Complete Maliketh boss guide covering Beast Clergyman, Destined Death, Blasphemous Claw, weaknesses, attack breakdowns, and Phase 2 survival strategies.",
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "---",
    },
    {
      heading: "Quick Answer",
      level: 2,
      content:
        "If you're struggling against Maliketh:\n\n- Stay aggressive in Phase 2\n- Fight close instead of far away\n- Use pillars for positioning\n- Learn Destined Death attacks\n- Use Blasphemous Claw if available\n\nMost players die because they create distance.\n\nCounterintuitively, Maliketh becomes easier when you're closer to him.",
      image: "u=3358615771,1066161144&fm=253&fmt=auto&app=138&f=JPEG.webp",
      imageAlt: "Elden Ring Maliketh the Black Blade boss fight in Crumbling Farum Azula",
    },
    {
      heading: "Boss Overview",
      level: 2,
      content:
        "| Category | Details |\n|-----------|----------|\n| Location | Crumbling Farum Azula |\n| Boss Type | Mandatory Story Boss |\n| Recommended Level | 120–150 |\n| Weapon Upgrade | +25 / +10 Somber |\n| Weakness | Bleed, Frost |\n| Special Mechanic | Destined Death |\n| Optional Counter | Blasphemous Claw |",
      image: "u=3891078662,661951665&fm=253&fmt=auto&app=138&f=JPEG.webp",
      imageAlt: "Elden Ring Beast Clergyman Phase 1 combat against Maliketh",
    },
    {
      heading: "Why Maliketh Is So Difficult",
      level: 2,
      content:
        "Most Elden Ring bosses follow a familiar pattern:\n\n- Dodge attack\n- Counterattack\n- Heal if necessary\n\nMaliketh breaks that rhythm.\n\nHis attacks apply:\n\n### Destined Death\n\nThis effect does two things:\n\n1. Immediately reduces health\n2. Continues draining health afterward\n\nMany players survive the initial hit but die moments later.\n\nThis is why Maliketh often feels unfair.\n\nIn reality, the mechanic simply punishes mistakes harder than any previous boss.",
      image: "u=658320079,408270614&fm=253&fmt=auto&app=138&f=JPEG.webp",
      imageAlt: "Elden Ring Maliketh Phase 2 Destined Death attacks and strategy",
    },
    {
      heading: "Preparation Checklist",
      level: 2,
      content:
        "Before entering the arena:\n\n### Recommended Vigor\n\nAt least:\n\n**55–60 Vigor**\n\nBelow that, many Destined Death combinations become lethal.",
    },
    {
      heading: "Best Spirit Ashes",
      level: 3,
      content:
        "#### Mimic Tear\n\nStill one of the safest options.\n\n#### Black Knife Tiche\n\nExcellent mobility.\n\nCan keep pressure on Maliketh throughout Phase 2.",
    },
    {
      heading: "Best Damage Types",
      level: 3,
      content:
        "#### Bleed\n\nVery effective.\n\nMaliketh has relatively low health compared to many late-game bosses.\n\nBleed removes large portions quickly.",
    },
    {
      heading: "Frost",
      level: 4,
      content:
        "Strong burst damage.\n\nAlso creates additional stagger opportunities.",
    },
    {
      heading: "Phase 1: Beast Clergyman",
      level: 2,
      content:
        "Many players focus entirely on Maliketh.\n\nThat is a mistake.\n\nPhase 1 kills almost as many players.",
    },
    {
      heading: "Understanding Beast Clergyman",
      level: 3,
      content:
        "Unlike Phase 2:\n\n- Extremely aggressive\n- Fast recovery animations\n- Constant pressure\n\nHowever:\n\nMost attacks have predictable endings.\n\nLearning those endings is the key.",
    },
    {
      heading: "Best Opportunity #1: Beast Claw",
      level: 3,
      content:
        "One of the most common attacks.\n\n#### Tell\n\nHe drags his dagger along the ground.\n\nA shockwave follows.\n\n#### Counter\n\nRoll through the shockwave.\n\nDo not retreat.",
    },
    {
      heading: "Punish Rating",
      level: 4,
      content:
        "★★★★☆\n\nOne or two attacks are usually safe.",
    },
    {
      heading: "Best Opportunity #2: Boulder Throw",
      level: 3,
      content:
        "Beast Clergyman grabs debris.\n\n#### Counter\n\nSprint sideways.\n\nAfter the throw:\n\nHe briefly pauses.",
    },
    {
      heading: "Punish Rating",
      level: 4,
      content:
        "★★★★★\n\nOne of the safest openings in Phase 1.",
    },
    {
      heading: "Best Opportunity #3: Dagger Combo Finish",
      level: 3,
      content:
        "Many combos end with a noticeable recovery.\n\nWatch for:\n\n- Final slam\n- Final swipe\n\nDo not attack during the combo.\n\nAttack after it ends.",
    },
    {
      heading: "Phase Transition",
      level: 2,
      content:
        "At roughly 50% health:\n\nThe fight changes dramatically.\n\nThis is one of the most cinematic transitions in Elden Ring.\n\nThe Beast Clergyman reveals his true identity:\n\n**Maliketh, the Black Blade.**\n\nThe real fight begins.",
    },
    {
      heading: "Phase 2: Understanding Maliketh",
      level: 2,
      content:
        "Most players immediately make a critical mistake.\n\nThey retreat.\n\nThis feels natural.\n\nIt is also why they die.",
    },
    {
      heading: "Why Distance Gets You Killed",
      level: 3,
      content:
        "At long range Maliketh gains access to:\n\n- Projectile slashes\n- Leap attacks\n- Arena-crossing movement\n- Destined Death waves\n\nThese attacks are far more dangerous than his close-range options.",
    },
    {
      heading: "The Secret Strategy",
      level: 3,
      content:
        "Stay near him.\n\nNot underneath him.\n\nNot far away.\n\nNear him.\n\nThis reduces the frequency of his most dangerous attacks.",
    },
    {
      heading: "Destined Death Explained",
      level: 3,
      content:
        "Certain attacks leave:\n\n- Black-and-red energy trails\n- Lingering damage\n- Maximum health reduction\n\nThese attacks define the entire fight.\n\nWhen you see black-red energy:\n\nPrioritize survival.\n\nDamage comes second.",
    },
    {
      heading: "The Most Dangerous Attack",
      level: 3,
      content:
        "#### Destined Death Explosion\n\nTell:\n\nMaliketh leaps into the air.\n\nThe sword glows.\n\nMultiple slashes explode outward.",
    },
    {
      heading: "Counter Strategy",
      level: 4,
      content:
        "Roll toward the attack.\n\nNot away.\n\nRolling backward often keeps you inside the damage zone.",
    },
    {
      heading: "The Most Important Punish Window",
      level: 3,
      content:
        "#### Grounded Sword Slam\n\nAfter several aerial attacks:\n\nMaliketh crashes into the ground.\n\nThis creates one of the longest recovery animations in the fight.",
    },
    {
      heading: "Punish Rating",
      level: 4,
      content:
        "★★★★★\n\nHeavy attacks are often safe here.\n\nThis is where most successful runs gain damage.",
    },
    {
      heading: "Blasphemous Claw Explained",
      level: 3,
      content:
        "One of the least understood items in Elden Ring.\n\nObtained from:\n\n**Recusant Bernahl's invasion questline**",
    },
    {
      heading: "What It Does",
      level: 4,
      content:
        "Blasphemous Claw can parry specific Destined Death attacks.\n\nWhen successful:\n\n- Maliketh is staggered\n- Massive punish window appears",
    },
    {
      heading: "When To Use It",
      level: 4,
      content:
        "Look for:\n\n- Golden glow\n- Overhead Destined Death attacks\n\nTiming matters.\n\nPractice is required.",
    },
    {
      heading: "Is Blasphemous Claw Required?",
      level: 4,
      content:
        "No.\n\nMany players defeat Maliketh without it.\n\nHowever:\n\nLearning the item makes the fight significantly easier.",
    },
    {
      heading: "Arena Positioning Guide",
      level: 3,
      content:
        "The arena contains large stone pillars.\n\nThese pillars are incredibly important.",
    },
    {
      heading: "What Pillars Do",
      level: 4,
      content:
        "They can:\n\n- Block projectiles\n- Interrupt movement\n- Create healing opportunities\n\nMany successful players use pillars constantly.",
    },
    {
      heading: "Healing Strategy",
      level: 4,
      content:
        "Do not heal immediately after taking damage.\n\nThis is a common trap.\n\nInstead:\n\n1. Create distance\n2. Move behind a pillar\n3. Heal safely\n\nPanic healing usually leads to another hit.",
    },
    {
      heading: "Common Mistakes",
      level: 2,
      content:
        "### Rolling Backward\n\nOne of the biggest causes of death.\n\nMany attacks punish retreating.",
    },
    {
      heading: "Fighting At Maximum Range",
      level: 3,
      content:
        "Triggers Maliketh's most dangerous moves.",
    },
    {
      heading: "Ignoring Pillars",
      level: 3,
      content:
        "The arena was designed around them.\n\nUse them.",
    },
    {
      heading: "Greedy Punishes",
      level: 3,
      content:
        "Many openings look larger than they actually are.\n\nTake one safe hit.\n\nNot three risky ones.",
    },
    {
      heading: "Panic During Destined Death",
      level: 3,
      content:
        "The health drain effect causes players to rush.\n\nStay calm.\n\nFocus on positioning.",
    },
    {
      heading: "Best Builds Against Maliketh",
      level: 2,
      content:
        "### Bleed Builds\n\nAdvantages:\n\n- Fast health removal\n- Shortens Phase 2\n\nExcellent choice. Test your build against Maliketh's Phase 2 speed with the [Build Calculator](https://www.zosygo.com/elden-ring/tools/build-calculator) — survivability matters as much as damage in this fight.",
    },
    {
      heading: "Strength Builds",
      level: 3,
      content:
        "Advantages:\n\n- Large stagger damage\n- Strong punish windows\n\nWorks well if timing is solid.",
    },
    {
      heading: "Frost Builds",
      level: 3,
      content:
        "Advantages:\n\n- Burst damage\n- Consistent pressure\n\nOne of the strongest overall approaches.",
    },
    {
      heading: "Rewards",
      level: 2,
      content:
        "Defeating Maliketh grants:\n\n- Remembrance of the Black Blade\n- Massive Rune reward\n- Story progression toward the final section of Elden Ring\n\nMore importantly:\n\nThe world itself changes after this fight.\n\nFew bosses have greater narrative significance.",
    },
    {
      heading: "Why Maliketh Is One of Elden Ring's Best Bosses",
      level: 2,
      content:
        "Many bosses test:\n\n- Damage output\n- Build quality\n- Patience\n\nMaliketh tests mastery.\n\nHe forces players to understand:\n\n- Positioning\n- Timing\n- Arena usage\n- Risk management\n\nEvery mistake matters.\n\nEvery opening matters.\n\nAnd that is exactly why the fight remains one of the most memorable encounters in Elden Ring.",
    },
    {
      heading: "FAQ",
      level: 2,
      content:
        "### What level should I fight Maliketh?\n\nMost players succeed between Level 120 and 150.\n\n### Is Maliketh weak to Bleed?\n\nYes. Bleed is one of the most effective damage types against him.\n\n### What does Destined Death do?\n\nIt deals damage, drains health over time, and reduces maximum HP temporarily.\n\n### Is Blasphemous Claw worth using?\n\nAbsolutely. It creates some of the largest punish windows in the fight.\n\n### Why do I keep dying in Phase 2?\n\nMost players stay too far away. Maliketh's ranged attacks are often more dangerous than his melee attacks.\n\n### Is Maliketh harder than Mohg?\n\nFor many players, yes. His speed and Destined Death mechanics create a much smaller margin for error. Use the [Rune Level Calculator](https://www.zosygo.com/elden-ring/tools/rune-level-calculator) to plan the rune cost to reach the recommended level for Maliketh.",
    },
  ],
  internalLinks: [
    { href: "/elden-ring/bosses/how-to-beat-malenia", anchorText: "Malenia vs Maliketh: Reaction Boss Comparison" },
    { href: "/elden-ring/bosses/how-to-beat-mohg-lord-of-blood", anchorText: "Mohg vs Maliketh: Mechanic Comparison" },
    { href: "/elden-ring/weapons/blasphemous-blade", anchorText: "Blasphemous Blade — Best Weapon for Maliketh" },
    { href: "/elden-ring/bosses/how-to-beat-messmer-the-impaler", anchorText: "How to Beat Messmer" },
    { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds Against Maliketh" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" }
  ]
};


const article24: Article = {
  keyTakeaways: [
    { label: "🎯 Recommended", value: "Level 130-150 (DLC boss), Vigor 55+, weapon fully upgraded" },
    { label: "⚔️ Best Damage", value: "Frost or Bleed — fire-resistant, don't use fire weapons" },
    { label: "💡 Phase 1 (Human)", value: "Stay close to limit fire projectiles, punish after flame dash" },
    { label: "🐍 Phase 2 (Serpent)", value: "Watch for large AoE fire attacks, extended hitboxes" },
    { label: "⚠️ Key Warning", value: "Never heal in open space — wait for punish windows" },
    { label: "🎮 Best Builds", value: "Frost builds and high-damage-per-hit weapons work best" },
  ],
  slug: "how-to-beat-messmer-the-impaler",
  category: "bosses",
  gameSlug: "elden-ring",
  difficulty: "intermediate",
  readTimeMinutes: 8,
  order: 24,
  title: "How to Beat Messmer the Impaler in Elden Ring DLC (2026 Guide)",
  metaDescription: "Complete Messmer boss guide covering serpent phase mechanics, fire attacks, DLC arena strategy, weaknesses, and punish windows.",
  sections: [
    {
      heading: "",
      level: 2,
      content:
        "---",
    },
    {
      heading: "Quick Answer",
      level: 2,
      content:
        "To beat Messmer:\n\n- Stay close to limit fire projectile spam\n- Learn serpent phase timing\n- Use Frost or Bleed damage\n- Punish after flame dash recovery\n- Avoid healing in open space",
      image: "u=2668367525,768214399&fm=253&fmt=auto&app=120&f=JPEG.webp",
      imageAlt: "Elden Ring Messmer the Impaler boss fight in Shadow of the Erdtree DLC",
    },
    {
      heading: "Boss Overview",
      level: 2,
      content:
        "Messmer has two core identities:\n\n### Human Form\n- Fast melee combos\n- Fire-infused spear attacks\n- High mobility\n\n### Serpent Form\n- Large AoE fire attacks\n- Extended hitboxes\n- Arena pressure control",
      image: "u=1067614621,3217285792&fm=253&fmt=auto&app=120&f=JPEG.webp",
      imageAlt: "Elden Ring DLC Messmer serpent form fire attacks and arena strategy",
    },
    {
      heading: "Phase 1 Strategy",
      level: 2,
      content:
        "### Spear Combo\n\nMessmer uses delayed thrust attacks.\n\n**Counter:**\n- Roll slightly later than expected\n- Punish after final stab",
      image: "u=2047388663,2032917454&fm=225&app=113&f=JPEG.jpeg",
      imageAlt: "Elden Ring Shadow of the Erdtree Messmer Phase 2 combat positioning",
    },
    {
      heading: "Fire Dash",
      level: 3,
      content:
        "One of his most dangerous openers.\n\n**Counter:**\n- Roll diagonally toward him\n- Avoid rolling backward",
    },
    {
      heading: "Flame Zones",
      level: 3,
      content:
        "Messmer creates fire zones on the ground.\n\n**Rule:**\n- Do not heal inside fire zones\n- Reposition before recovery",
    },
    {
      heading: "Phase Transition: Serpent Form",
      level: 2,
      content:
        "Messmer transforms into a serpent-like entity.\n\nArena becomes significantly more dangerous.",
    },
    {
      heading: "Phase 2 Strategy",
      level: 2,
      content:
        "### Core Problem\n\nFire coverage increases dramatically.\n\nAt long range:\n\n- Projectile spam increases\n- Visibility decreases\n- Reaction time is reduced",
    },
    {
      heading: "Best Strategy",
      level: 3,
      content:
        "Stay mid-range:\n\n- Close enough to force melee\n- Far enough to react to flame bursts",
    },
    {
      heading: "Serpent Bite Attack",
      level: 3,
      content:
        "Massive forward lunge.\n\n**Counter:**\n- Roll into the attack\n- Punish during recovery",
    },
    {
      heading: "Fire Explosion Combo",
      level: 3,
      content:
        "Multiple delayed explosions.\n\n**Counter:**\n- Do not panic roll early\n- Wait for full sequence end",
    },
    {
      heading: "Best Damage Windows",
      level: 2,
      content:
        "- After serpent slam recovery\n- After flame dash miss\n- After combo ender explosion",
    },
    {
      heading: "Best Damage Types",
      level: 2,
      content:
        "### Frost\n\n- Strong burst + control\n\n### Bleed\n\n- Effective due to repeated hits",
    },
    {
      heading: "Common Mistakes",
      level: 2,
      content:
        "- Fighting at maximum distance\n- Healing inside fire zones\n- Panic rolling serpent attacks\n- Ignoring delayed timing mechanics",
    },
    {
      heading: "Rewards",
      level: 2,
      content:
        "Defeating Messmer grants:\n\n- Major DLC progression\n- Unique remembrance item\n- Access to deeper Shadow of the Erdtree zones",
    },
    {
      heading: "FAQ",
      level: 2,
      content:
        "### Is Messmer harder than Malenia?\n\nFor many players, yes due to fire zoning and serpent phase complexity.\n\n### What level should I fight Messmer?\n\nDLC recommended scaling level applies (high endgame level).\n\n### What is Messmer weak to?\n\nFrost and Bleed are most effective. ",
    },
  ],
  internalLinks: [
    { href: "/elden-ring/bosses/how-to-beat-maliketh-black-blade", anchorText: "Maliketh vs Messmer: Speed Boss Comparison" },
    { href: "/elden-ring/bosses/how-to-beat-malenia", anchorText: "Malenia vs Messmer: Difficulty Comparison" },
    { href: "/elden-ring/bosses/how-to-beat-mohg-lord-of-blood", anchorText: "How to Beat Mohg (DLC Entry Requirement)" },
    { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds for DLC" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" }
  ]
};

const article25: Article = {
  keyTakeaways: [
    { label: "🎯 Recommended", value: "Level 120-140, Vigor 50-60, Bleed or Frost weapons" },
    { label: "⚔️ Phase 1 (Godfrey)", value: "Stay near him, jump over stomps instead of rolling" },
    { label: "🦍 Phase 2 (Hoarah Loux)", value: "No panic rolling — watch for grab animations, punish after stomps" },
    { label: "💡 Core Strategy", value: "Positioning > damage — tests core combat mechanics, not gimmicks" },
    { label: "🛡️ Best Spirit Ash", value: "Mimic Tear or Black Knife Tiche — Godfrey's large hitbox helps" },
    { label: "⚠️ Common Mistake", value: "Treating Hoarah Loux like a normal boss — he's a grappler, not a knight" },
  ],
  slug: "how-to-beat-godfrey",
  category: "bosses",
  gameSlug: "elden-ring",
  difficulty: "intermediate",
  readTimeMinutes: 9,
  order: 25,
  title: "How to Beat Godfrey, First Elden Lord in Elden Ring (2026 Guide)",
  metaDescription: "Complete Godfrey boss guide covering Phase 1 axe attacks, Hoarah Loux wrestling mechanics, stomp counters, weaknesses, and best strategies.",
  sections: [
    {
      heading: "",
      level: 2,
      content: "Godfrey, First Elden Lord, is one of the most important boss fights in Elden Ring.\n\nUnlike many late-game bosses that rely on magic, status effects, or complex gimmicks, Godfrey tests a player's understanding of core combat mechanics.\n\nPositioning, timing, jump dodges, and patience matter far more than raw damage.\n\nMany players enter the fight expecting a traditional knight battle.\n\nInstead, they encounter two completely different bosses in a single encounter.\n\nThe first half is a disciplined warrior wielding a massive axe.\n\nThe second half transforms into Hoarah Loux, a savage grappler capable of killing players in seconds.\n\nUnderstanding this transition is the key to victory."
    },
    {
      heading: "Quick Answer",
      level: 2,
      content: "If you're struggling against Godfrey:\n\n* Jump over ground stomps instead of rolling\n* Stay near him during Phase 1\n* Avoid panic rolling during Phase 2\n* Watch for grab attack animations\n* Punish after stomp recovery and combo finishers\n\nMost deaths happen because players treat Hoarah Loux like a normal boss.\n\nHe is not."
    },
    {
      heading: "Boss Overview",
      level: 2,
      content: "| Category | Details |\n| ----------------- | ----------------------- |\n| Location | Leyndell, Ashen Capital |\n| Boss Type | Mandatory Story Boss |\n| Recommended Level | 120–140 |\n| Recommended Vigor | 50–60 |\n| Weaknesses | Bleed, Frost |\n| Phases | Godfrey / Hoarah Loux |\n\nGodfrey serves as one of the final skill checks before the end of Elden Ring."
    },
    {
      heading: "Recommended Preparation",
      level: 2,
      content: "Before entering the arena:\n\n### Vigor\n\nAim for at least:\n\n* 50 Vigor minimum\n* 60 Vigor recommended\n\nSeveral Phase 2 attacks can instantly punish low-health builds.\n\n### Spirit Ashes\n\nStrong options include:\n\n* Mimic Tear\n* Black Knife Tiche\n\nBoth perform well due to Godfrey's large hitbox.\n\n### Damage Types\n\nThe most effective options are:\n\n* Bleed\n* Frostbite\n\nThese help shorten the dangerous second phase."
    },
    {
      heading: "Understanding Godfrey's Design",
      level: 2,
      content: "Many bosses punish panic.\n\nGodfrey punishes hesitation.\n\nThe fight constantly asks one question:\n\nCan you recognize the difference between a roll mechanic and a jump mechanic?\n\nThis becomes especially important against his stomp attacks."
    },
    {
      heading: "Phase 1: Godfrey, First Elden Lord",
      level: 2,
      content: "The first phase focuses on:\n\n* Axe attacks\n* Ground shockwaves\n* Area control\n* Delayed timing\n\nMany players dodge too early.\n\nGodfrey is designed to punish that habit."
    },
    {
      heading: "Ground Stomp",
      level: 3,
      content: "This is the defining attack of Phase 1.\n\nGodfrey stomps the ground and creates a shockwave.\n\n#### Best Counter\n\nJump.\n\nDo not roll.\n\nJumping avoids the shockwave and often creates a free attack opportunity.\n\n#### Common Mistake\n\nMany players repeatedly roll backward.\n\nThis wastes stamina and often results in additional damage."
    },
    {
      heading: "Axe Slam",
      level: 3,
      content: "Godfrey raises his axe high before striking.\n\n#### Best Counter\n\nWait for the downward motion before rolling.\n\nThe attack is intentionally delayed.\n\n#### Punish Window\n\nAfter the slam, Godfrey remains vulnerable briefly.\n\nThis is one of the safest damage opportunities in Phase 1."
    },
    {
      heading: "Multi-Stomp Combo",
      level: 3,
      content: "As the fight progresses, Godfrey chains several stomps together.\n\n#### Best Counter\n\nFocus on rhythm.\n\nThe usual mistake is they react to the first stomp and lose timing on the following attacks."
    },
    {
      heading: "Phase Transition",
      level: 2,
      content: "At approximately 50% health, Godfrey abandons his identity as the First Elden Lord.\n\nThe lion Serosh is removed.\n\nThe fight changes completely.\n\nGodfrey becomes Hoarah Loux.\n\nThis is one of the most dramatic transitions in Elden Ring."
    },
    {
      heading: "Phase 2: Hoarah Loux",
      level: 2,
      content: "Everything changes.\n\nThe axe disappears.\n\nThe aggression increases dramatically.\n\nHoarah Loux relies on:\n\n* Grabs\n* Rush attacks\n* Area pressure\n* Chain combos\n\nPlayers who succeeded in Phase 1 often die immediately after the transition."
    },
    {
      heading: "Understanding Hoarah Loux Grab Attacks",
      level: 2,
      content: "Grab attacks define Phase 2.\n\nThey deal massive damage and frequently kill players outright."
    },
    {
      heading: "Single Grab",
      level: 3,
      content: "Hoarah Loux lunges forward.\n\n#### Best Counter\n\nRoll toward his side.\n\nRolling backward often fails because of the attack's reach."
    },
    {
      heading: "Leap Grab",
      level: 3,
      content: "One of the most dangerous attacks in the encounter.\n\n#### Tell\n\nHoarah Loux crouches before launching forward.\n\n#### Best Counter\n\nWait.\n\nRoll at the last possible moment.\n\nEarly rolls are heavily punished."
    },
    {
      heading: "Earthshaker Attacks",
      level: 2,
      content: "Several attacks create arena-wide shockwaves.\n\n### Best Counter\n\nJump whenever possible.\n\nMany players continue rolling because that worked against earlier bosses.\n\nJumping is often the intended solution."
    },
    {
      heading: "Positioning Strategy",
      level: 2,
      content: "Positioning is more important than damage output.\n\n### Phase 1\n\nStay close.\n\nMid-range often triggers additional stomp attacks.\n\n### Phase 2\n\nRemain near Hoarah Loux.\n\nCreating too much distance encourages aggressive gap-closing attacks."
    },
    {
      heading: "Best Damage Windows",
      level: 2,
      content: "The safest opportunities occur after:\n\n### Axe Slam Recovery\n\nReliable throughout Phase 1.\n\n### Stomp Recovery\n\nEspecially effective when using jump attacks.\n\n### Grab Misses\n\nLarge punish windows exist after failed grabs in Phase 2.\n\n### Earthshaker Recovery\n\nSeveral seconds of vulnerability can appear after large area attacks."
    },
    {
      heading: "Best Builds Against Godfrey",
      level: 2,
      content: "### Bleed Builds\n\nAdvantages:\n\n* Fast damage\n* Excellent Phase 2 performance\n\nRecommended for aggressive players.\n\n### Frost Builds\n\nAdvantages:\n\n* Burst damage\n* Defensive reduction\n\nConsistently effective throughout the fight.\n\n### Strength Builds\n\nAdvantages:\n\n* High stagger potential\n* Strong jump attacks\n\nParticularly useful during stomp punish windows.\n\nFine-tune your Godfrey build with the [Build Calculator](https://www.zosygo.com/elden-ring/tools/build-calculator) — the right Vigor and damage balance makes a big difference in Phase 2."
    },
    {
      heading: "Common Mistakes",
      level: 2,
      content: "### Rolling Instead of Jumping\n\nThe most common mistake in the fight.\n\nMany shockwaves are intended to be jumped.\n\n### Panic Rolling\n\nGodfrey uses delayed attacks specifically to punish panic rolls.\n\n### Fighting at Long Range\n\nDistance often triggers more dangerous attacks.\n\n### Overcommitting Damage\n\nOne extra attack frequently results in losing an entire attempt."
    },
    {
      heading: "Rewards",
      level: 2,
      content: "Defeating Godfrey grants:\n\n* Remembrance of Hoarah Loux\n* Large Rune reward\n* Access to the final sequence of Elden Ring\n\nThis victory marks the beginning of the game's endgame climax."
    },
    {
      heading: "Why Godfrey Is One of Elden Ring's Best Bosses",
      level: 2,
      content: "Godfrey succeeds because he rewards mastery of Elden Ring's combat system.\n\nThe fight tests:\n\n* Timing\n* Positioning\n* Jump mechanics\n* Discipline\n\nUnlike bosses that rely on overwhelming spectacle, Godfrey focuses on pure gameplay fundamentals.\n\nPlayers who learn those fundamentals often discover that the fight becomes surprisingly fair."
    },
    {
      heading: "FAQ",
      level: 2,
      content: "### What level should I fight Godfrey?\n\nMost players succeed between Level 120 and 140.\n\n### Is Godfrey weak to Bleed?\n\nYes. Bleed remains one of the strongest damage types against him.\n\n### Should I roll or jump over stomps?\n\nJumping is usually the safer and more effective option.\n\n### Is Hoarah Loux harder than Godfrey?\n\nFor most players, yes. The grab attacks and aggression create a much smaller margin for error.\n\n### What is the biggest mistake against Godfrey?\n\nTreating every shockwave as a roll mechanic instead of a jump mechanic.  Check the [Rune Level Calculator](https://www.zosygo.com/elden-ring/tools/rune-level-calculator) to see how many runes you need to reach the recommended level for Godfrey."
    },
  ],
  internalLinks: [
    { href: "/elden-ring/bosses/how-to-beat-maliketh-black-blade", anchorText: "Maliketh vs Godfrey: Endgame Boss Comparison" },
    { href: "/elden-ring/bosses/how-to-beat-malenia", anchorText: "Malenia vs Godfrey: Difficulty Comparison" },
    { href: "/elden-ring/bosses/how-to-beat-mohg-lord-of-blood", anchorText: "How to Beat Mohg" },
    { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds for Godfrey" },
    { href: "/elden-ring/builds/level-150-builds", anchorText: "Level 150 Builds" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" },
  ]
};


const article26: Article = {
  keyTakeaways: [
    { label: "🎯 Core Problem", value: "You're dodging too EARLY — Morgott delays attacks to punish reflex rolls" },
    { label: "💡 Key Insight", value: "Morgott is a timing check, not a damage check" },
    { label: "🎮 How to Beat", value: "Watch the weapon, not the wind-up. Wait, then roll at the last moment" },
    { label: "⚠️ Why He's Hard", value: "Breaks muscle memory from earlier bosses — designed to punish habits" },
    { label: "🛡️ Recommended", value: "Level 80-100, Vigor 35+, weapon +15/+18" },
    { label: "📊 Stat Check", value: "Delayed attacks + roll catching + combo extensions = death for impatient" },
  ],
  slug: "why-morgott-feels-so-hard",
  category: "bosses",
  gameSlug: "elden-ring",
  difficulty: "beginner",
  readTimeMinutes: 8,
  order: 26,
  title: "Why Morgott Feels So Hard in Elden Ring (And Why You Keep Dodging Too Early)",
  metaDescription: "Struggling against Morgott? Learn why Morgott's delayed attacks, roll catches, and combo extensions make him one of Elden Ring's most misunderstood bosses.",
  sections: [
    {
      heading: "",
      level: 2,
      content: "Many Elden Ring players reach Morgott, the Omen King expecting a familiar fight.\n\nAfter all, they've already defeated Margit.\n\nThe weapon looks similar.\n\nThe arena is similar.\n\nThe animations look familiar.\n\nYet many players suddenly find themselves dying repeatedly.\n\nWhat's happening?\n\nThe answer is surprisingly simple.\n\nMorgott is not a damage check.\n\nHe's a timing check.\n\nMost players lose to Morgott because they react too quickly."
    },
    {
      heading: "The Real Reason Morgott Feels Unfair",
      level: 2,
      content: "When players describe Morgott as unfair, they usually point to one thing:\n\n> \"I dodged that.\"\n\nIn reality, they didn't dodge too late.\n\nThey dodged too early.\n\nUnlike many bosses in Elden Ring, Morgott frequently delays his attacks after beginning an animation.\n\nThis creates a mismatch between what players expect and what actually happens.\n\nYour eyes see movement.\n\nYour brain expects impact.\n\nThe impact comes later."
    },
    {
      heading: "Morgott Is Designed to Punish Muscle Memory",
      level: 2,
      content: "By the time players reach Leyndell, they have already defeated dozens of bosses.\n\nA habit begins to form.\n\nThe moment a boss moves:\n\n* Roll\n* Roll again\n* Attack\n\nThis works surprisingly well against many early encounters.\n\nMorgott exists specifically to break that habit.\n\nSeveral of his strongest attacks contain intentional pauses.\n\nThe pause is not visual flair.\n\nThe pause is the attack."
    },
    {
      heading: "Understanding Delayed Attacks",
      level: 2,
      content: "Most action games teach players to react immediately.\n\nMorgott reverses this expectation.\n\n### What New Players See\n\nSword raised.\n\nRoll.\n\nGet hit.\n\n### What Experienced Players See\n\nSword raised.\n\nWait.\n\nWait.\n\nRoll.\n\nNo damage.\n\nThe difference is often less than half a second.\n\nYet that half second determines the entire fight."
    },
    {
      heading: "The Hidden Trap Behind Morgott's Combos",
      level: 2,
      content: "Another reason players struggle is that Morgott rarely commits to predictable combo lengths.\n\nMany bosses have:\n\n* Three attacks\n* Recovery\n* Punish window\n\nMorgott often has:\n\n* Three attacks\n* Possible fourth attack\n* Possible holy weapon summon\n* Possible dagger throw\n\nThis uncertainty causes hesitation.\n\nPlayers attack too soon.\n\nMorgott punishes them immediately."
    },
    {
      heading: "Why Panic Rolling Fails Against Morgott",
      level: 2,
      content: "Panic rolling works against some enemies.\n\nIt performs terribly against Morgott.\n\n### The Problem\n\nMost players roll backward repeatedly.\n\nMorgott's attacks are specifically designed to catch retreating movement.\n\nSeveral weapon swings extend farther than expected.\n\nHis holy weapons also cover surprising distances.\n\n### Better Strategy\n\nInstead of retreating constantly:\n\n* Stay close\n* Roll through attacks\n* Circle toward his left side\n\nThis reduces the number of dangerous follow-up attacks you will see."
    },
    {
      heading: "The Mistake Nearly Everyone Makes",
      level: 2,
      content: "The biggest mistake is trying to maximize damage.\n\nPlayers finally survive a combo.\n\nThey see an opening.\n\nThey attempt:\n\n* Light attack\n* Light attack\n* Jump attack\n\nThen Morgott starts another sequence.\n\nThe punishment is immediate.\n\nThe fight becomes dramatically easier when you accept a simple rule:\n\nOne safe hit is better than three risky hits."
    },
    {
      heading: "Why Morgott Punishes Healing",
      level: 2,
      content: "Many bosses allow healing after distance is created.\n\nMorgott often does not.\n\nThe moment players back away to drink a Flask, Morgott can respond with:\n\n* Holy daggers\n* Gap closers\n* Extended pressure\n\nThis creates the illusion that the boss is reading inputs.\n\nIn reality, he is simply designed to punish predictable behavior.\n\n### Safer Healing Windows\n\nThe best healing opportunities occur:\n\n* After long combo finishers\n* After missed leap attacks\n* During large recovery animations\n\nNever heal simply because you created distance.\n\nHeal because you created time."
    },
    {
      heading: "The Mental Shift That Makes Morgott Easy",
      level: 2,
      content: "Most players approach Morgott like a reaction test.\n\nIt is actually a patience test.\n\nThe goal is not:\n\n\"How quickly can I respond?\"\n\nThe goal is:\n\n\"Can I wait long enough to respond correctly?\"\n\nOnce players understand this distinction, the fight changes completely.\n\nThe same attacks that felt impossible suddenly become readable.\n\nThe same combos become predictable.\n\nThe same boss becomes manageable."
    },
    {
      heading: "Best Builds Against Morgott",
      level: 2,
      content: "Although timing matters most, some builds perform particularly well.\n\n### Bleed Builds\n\nBleed remains one of the strongest options.\n\nAdvantages include:\n\n* Fast phase progression\n* Consistent damage\n* Shorter exposure to dangerous combos\n\n### Frost Builds\n\nFrost provides:\n\n* Burst damage\n* Additional survivability through defense reduction\n\n### Strength Builds\n\nHeavy weapons perform surprisingly well because Morgott offers several clear punish windows after full combo sequences.\n\nFine-tune your Morgott build with the [Build Calculator](https://www.zosygo.com/elden-ring/tools/build-calculator) — the right Vigor and damage balance makes a big difference against his delayed attacks."
    },
    {
      heading: "What Morgott Teaches About Elden Ring",
      level: 2,
      content: "Morgott represents a turning point in Elden Ring's design.\n\nBefore Morgott, many encounters can be overcome through aggression.\n\nAfter Morgott, patience becomes essential.\n\nThe fight teaches:\n\n* Delayed reactions\n* Observation\n* Positioning\n* Discipline\n\nThese skills remain valuable throughout the rest of the game.\n\nPlayers who master Morgott often find later bosses significantly easier to understand."
    },
    {
      heading: "FAQ",
      level: 2,
      content: "### Why do I keep getting hit by Morgott?\n\nMost players roll too early rather than too late.\n\n### Is Morgott harder than Margit?\n\nYes. Morgott has longer combos, more weapon variations, and stronger punishments.\n\n### What is Morgott's biggest weakness?\n\nBleed and Frost builds perform particularly well.\n\n### Should I stay close or far away?\n\nClose to medium range is generally safer than long range.\n\n### What is the most important lesson for this fight?\n\nStop reacting to movement.\n\nStart reacting to impact. "
    },
  ],
  internalLinks: [
    { href: "/elden-ring/bosses/godrick-phase-2-guide", anchorText: "Godrick vs Morgott: Boss Comparison" },
    { href: "/elden-ring/bosses/margit-guide", anchorText: "How to Beat Margit the Fell Omen" },
    { href: "/elden-ring/bosses/starscourge-radahn-guide", anchorText: "How to Beat Starscourge Radahn" },
    { href: "/elden-ring/builds/best-builds-guide", anchorText: "Best Builds for Morgott" },
    { href: "/elden-ring/builds/why-your-bleed-build-feels-weak", anchorText: "Optimizing Bleed Builds" },
    { href: "/elden-ring/tools/build-calculator", anchorText: "Elden Ring Build Calculator" },
  ]
};

const extraArticles = [maleniaArticle, buildFeelsWeakArticle, softCapsV2Article, article17, article18, article19, article20, article21, article22, article23, article24, article25, article26];

export default extraArticles;
