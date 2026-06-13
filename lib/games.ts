/**
 * FAQ item structure for game-specific frequently asked questions.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Design/base data that stays the same across all locales.
 */
export interface GameBase {
  slug: string;
  releaseDate: string;
  accentColor: string;
  accentGlow: string;
  /** High-resolution hero/banner image URL */
  heroImage?: string;
  /** Card/thumbnail image URL (smaller format) */
  image?: string;
  /** Open Graph / social share image URL (1200x630 preferred) */
  ogImage?: string;
}

/**
 * Translatable data that changes per locale.
 */
export interface GameData {
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  developer: string;
  publisher: string;
  genres: string[];
  platforms: string[];
  keywords: string[];
  imageAlt?: string;
  faq?: FaqItem[];
}

/**
 * Fully assembled game model.
 */
export interface Game extends GameBase {
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  developer: string;
  publisher: string;
  genres: string[];
  platforms: string[];
  keywords: string[];
  imageAlt?: string;
  faq: FaqItem[];
}

const baseGames: GameBase[] = [
  {
    slug: "elden-ring",
    releaseDate: "2022-02-25",
    accentColor: "#c9a227",
    accentGlow: "rgba(201, 162, 39, 0.35)",
    heroImage: "/images/elden-ring-hero.jpg",
    image: "/images/elden-ring-card.jpg",
    ogImage: "/images/elden-ring-og.jpg",
  },
  {
    slug: "gta6",
    releaseDate: "2026-05-26",
    accentColor: "#ff006e",
    accentGlow: "rgba(255, 0, 110, 0.35)",
    heroImage: "/images/gta6-hero.jpg",
    image: "/images/gta6-card.jpg",
    ogImage: "/images/gta6-og.jpg",
  },
  {
    slug: "cyberpunk2077",
    releaseDate: "2020-12-10",
    accentColor: "#00f0ff",
    accentGlow: "rgba(0, 240, 255, 0.35)",
    heroImage: "/images/cyberpunk2077-hero.jpg",
    image: "/images/cyberpunk2077-card.jpg",
    ogImage: "/images/cyberpunk2077-og.jpg",
  },
  {
    slug: "bg3",
    releaseDate: "2023-08-03",
    accentColor: "#c44a2b",
    accentGlow: "rgba(196, 74, 43, 0.35)",
    heroImage: "/images/bg3-hero.jpg",
    image: "/images/bg3-card.jpg",
    ogImage: "/images/bg3-og.jpg",
  },
  {
    slug: "zelda-totk",
    releaseDate: "2023-05-12",
    accentColor: "#2ecc71",
    accentGlow: "rgba(46, 204, 113, 0.35)",
    heroImage: "/images/zelda-totk-hero.jpg",
    image: "/images/zelda-totk-card.jpg",
    ogImage: "/images/zelda-totk-og.jpg",
  },
  {
    slug: "god-of-war-ragnarok",
    releaseDate: "2022-11-09",
    accentColor: "#3498db",
    accentGlow: "rgba(52, 152, 219, 0.35)",
    heroImage: "/images/gow-ragnarok-hero.jpg",
    image: "/images/gow-ragnarok-card.jpg",
    ogImage: "/images/gow-ragnarok-og.jpg",
  },
  {
    slug: "red-dead-redemption-2",
    releaseDate: "2018-10-26",
    accentColor: "#e74c3c",
    accentGlow: "rgba(231, 76, 60, 0.35)",
    heroImage: "/images/rdr2-hero.jpg",
    image: "/images/rdr2-card.jpg",
    ogImage: "/images/rdr2-og.jpg",
  },
  {
    slug: "the-witcher-3",
    releaseDate: "2015-05-19",
    accentColor: "#8e44ad",
    accentGlow: "rgba(142, 68, 173, 0.35)",
    heroImage: "/images/witcher3-hero.jpg",
    image: "/images/witcher3-card.jpg",
    ogImage: "/images/witcher3-og.jpg",
  },
  {
    slug: "dark-souls-3",
    releaseDate: "2016-03-24",
    accentColor: "#e67e22",
    accentGlow: "rgba(230, 126, 34, 0.35)",
    heroImage: "/images/ds3-hero.jpg",
    image: "/images/ds3-card.jpg",
    ogImage: "/images/ds3-og.jpg",
  },
  {
    slug: "skyrim",
    releaseDate: "2011-11-11",
    accentColor: "#1abc9c",
    accentGlow: "rgba(26, 188, 156, 0.35)",
    heroImage: "/images/skyrim-hero.jpg",
    image: "/images/skyrim-card.jpg",
    ogImage: "/images/skyrim-og.jpg",
  },
  {
    slug: "sekiro",
    releaseDate: "2019-03-22",
    accentColor: "#f39c12",
    accentGlow: "rgba(243, 156, 18, 0.35)",
    heroImage: "/images/sekiro-hero.jpg",
    image: "/images/sekiro-card.jpg",
    ogImage: "/images/sekiro-og.jpg",
  },
  {
    slug: "monster-hunter-wilds",
    releaseDate: "2025-02-28",
    accentColor: "#2ecc71",
    accentGlow: "rgba(46, 204, 113, 0.35)",
    heroImage: "/images/mhwilds-hero.jpg",
    image: "/images/mhwilds-card.jpg",
    ogImage: "/images/mhwilds-og.jpg",
  },
  {
    slug: "hollow-knight",
    releaseDate: "2017-02-24",
    accentColor: "#a0522d",
    accentGlow: "rgba(160, 82, 45, 0.35)",
    heroImage: "/images/hollow-knight-hero.jpg",
    image: "/images/hollow-knight-card.jpg",
    ogImage: "/images/hollow-knight-og.jpg",
  },
];

// Fallback English data used when no translation data is provided
const fallbackData: Record<string, GameData> = {
  "elden-ring": {
    name: "Elden Ring",
    tagline: "Rise, Tarnished, and be guided by grace.",
    description:
      "Explore the Lands Between in FromSoftware's open-world action RPG. Guides, builds, bosses, and lore for every Tarnished.",
    longDescription:
      "Elden Ring combines challenging soulslike combat with a vast open world filled with legacy dungeons, hidden secrets, and unforgettable boss fights. Zosygo brings together build guides, walkthroughs, map markers, and community strategies so you can conquer the Lands Between at your own pace.",
    developer: "FromSoftware",
    publisher: "Bandai Namco Entertainment",
    genres: ["Action RPG", "Open World", "Soulslike"],
    platforms: ["PC", "PlayStation", "Xbox"],
    keywords: [
      "Elden Ring guide",
      "Elden Ring builds",
      "Elden Ring bosses",
      "Lands Between",
      "Tarnished",
      "FromSoftware",
    ],
    faq: [
      {
        question: "What is Elden Ring?",
        answer:
          "Elden Ring is an action RPG developed by FromSoftware and published by Bandai Namco Entertainment. It features challenging soulslike combat set in a vast open world called the Lands Between.",
      },
      {
        question: "What platforms is Elden Ring available on?",
        answer:
          "Elden Ring is available on PC, PlayStation 4, PlayStation 5, Xbox One, and Xbox Series X|S.",
      },
      {
        question: "What is the best starting class in Elden Ring?",
        answer:
          "The Vagabond class is widely recommended for beginners due to its high HP, strong armor, and versatile starting equipment. The Astrologer class is great for magic-focused builds.",
      },
      {
        question: "Is Elden Ring multiplayer?",
        answer:
          "Yes, Elden Ring features both cooperative and PvP multiplayer. You can summon allies for boss fights or invade other players' worlds.",
      },
    ],
  },
  "gta6": {
    name: "Grand Theft Auto VI",
    tagline: "Welcome to Leonida.",
    description:
      "Everything you need for Rockstar's next open-world crime epic — news, trailers, release updates, and Vice City coverage.",
    longDescription:
      "Grand Theft Auto VI returns to Vice City and the state of Leonida with dual protagonists, a modern open world, and Rockstar's signature storytelling. Follow Zosygo for release news, gameplay breakdowns, map speculation, and day-one guides as GTA 6 approaches launch.",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    genres: ["Action-Adventure", "Open World", "Crime"],
    platforms: ["PlayStation 5", "Xbox Series X|S"],
    keywords: [
      "GTA 6",
      "Grand Theft Auto VI",
      "Vice City",
      "Leonida",
      "Rockstar Games",
      "GTA 6 release date",
    ],
    faq: [
      {
        question: "When is GTA 6 coming out?",
        answer:
          "Grand Theft Auto VI is scheduled for release in 2026, specifically on May 26, 2026 for PlayStation 5 and Xbox Series X|S.",
      },
      {
        question: "What platforms will GTA 6 be on?",
        answer:
          "GTA 6 will launch on PlayStation 5 and Xbox Series X|S. A PC release is expected at a later date.",
      },
      {
        question: "Where is GTA 6 set?",
        answer:
          "GTA 6 returns to Vice City (a fictional Miami) and the surrounding state of Leonida, featuring a modern open world with dual protagonists.",
      },
    ],
  },
  "cyberpunk2077": {
    name: "Cyberpunk 2077",
    tagline: "Welcome to Night City.",
    description:
      "Deep dives into Night City — Phantom Liberty, builds, gigs, cyberware, and the ultimate edgerunner experience.",
    longDescription:
      "Cyberpunk 2077 drops you into Night City as V, a mercenary chasing immortality in a neon-drenched dystopia. With Phantom Liberty and ongoing updates, the game has never been stronger. Zosygo covers optimal builds, romance guides, ending paths, and every gig across Watson, Pacifica, and beyond.",
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    genres: ["Action RPG", "Open World", "Cyberpunk"],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch 2"],
    keywords: [
      "Cyberpunk 2077 guide",
      "Night City",
      "Phantom Liberty",
      "Cyberware builds",
      "CD Projekt Red",
      "Edgerunner",
    ],
    faq: [
      {
        question: "What is Cyberpunk 2077?",
        answer:
          "Cyberpunk 2077 is an open-world action RPG developed by CD Projekt Red, set in the dystopian Night City. You play as V, a mercenary on a quest for immortality.",
      },
      {
        question: "What is Phantom Liberty?",
        answer:
          "Phantom Liberty is the major expansion for Cyberpunk 2077 featuring a spy-thriller story with Idris Elba as Solomon Reed, set in the new district of Dogtown.",
      },
      {
        question: "What is the best build in Cyberpunk 2077?",
        answer:
          "The best build depends on your playstyle. Popular builds include the Netrunner (hacking-focused), the Sandevistan (time-slowing melee), and the Tech (smart weapons and cyberware).",
      },
    ],
  },
  "bg3": {
    name: "Baldur's Gate 3",
    tagline: "Forge your fate in Faerûn.",
    description:
      "The award-winning CRPG from Larian Studios. Party builds, romance guides, quest walkthroughs, and everything Baldur's Gate 3.",
    longDescription:
      "Baldur's Gate 3 redefines the CRPG genre with deep character customization, turn-based tactical combat, and narrative choices that ripple across all three acts. Zosygo covers every origin character, subclass build, romance option, and side quest from the Nautiloid crash to the final confrontation with the Netherbrain.",
    developer: "Larian Studios",
    publisher: "Larian Studios",
    genres: ["CRPG", "Fantasy", "Turn-Based Tactical"],
    platforms: ["PC", "PlayStation", "Xbox", "Mac"],
    keywords: [
      "Baldur's Gate 3 guide",
      "BG3 builds",
      "BG3 walkthrough",
      "Larian Studios",
      "Dungeons & Dragons",
      "Faerûn",
    ],
    faq: [
      {
        question: "What is Baldur's Gate 3?",
        answer:
          "Baldur's Gate 3 is a CRPG developed by Larian Studios based on Dungeons & Dragons 5th Edition rules. It features turn-based tactical combat, deep character customization, and player-driven narrative.",
      },
      {
        question: "What platforms is Baldur's Gate 3 available on?",
        answer:
          "Baldur's Gate 3 is available on PC, Mac, PlayStation 5, and Xbox Series X|S.",
      },
      {
        question: "What is the best starting class in Baldur's Gate 3?",
        answer:
          "The Fighter class is great for beginners due to its straightforward mechanics and durability. The Paladin offers a good mix of combat and charisma for dialogue checks.",
      },
    ],
  },
  "zelda-totk": {
    name: "The Legend of Zelda: Tears of the Kingdom",
    tagline: "The sky is no longer the limit.",
    description:
      "Hyrule awaits — shrines, Zonai devices, depths exploration, and everything Tears of the Kingdom.",
    longDescription:
      "The Legend of Zelda: Tears of the Kingdom expands on Breath of the Wild with sky islands, the Depths, and Zonai device crafting. Zosygo brings together shrine walkthroughs, armor guides, bubblefrog locations, and creative building tutorials for Link's latest adventure.",
    developer: "Nintendo EPD",
    publisher: "Nintendo",
    genres: ["Action-Adventure", "Open World", "Puzzle"],
    platforms: ["Nintendo Switch"],
    keywords: [
      "Tears of the Kingdom guide",
      "TotK walkthrough",
      "Zelda TotK",
      "Hyrule",
      "Zonai devices",
      "shrine locations",
    ],
    faq: [
      {
        question: "What is Tears of the Kingdom?",
        answer:
          "The Legend of Zelda: Tears of the Kingdom is the sequel to Breath of the Wild, featuring sky islands, underground Depths, and Zonai crafting mechanics.",
      },
      {
        question: "How is TotK different from BotW?",
        answer:
          "TotK adds three vertical layers (sky, surface, Depths), Zonai device building, new abilities like Recall and Ultrahand, and a more narrative-driven story.",
      },
      {
        question: "Do I need to play Breath of the Wild first?",
        answer:
          "While TotK is a direct sequel, it's designed to be accessible to new players. Playing BotW first enhances the experience but is not required.",
      },
    ],
  },
  "god-of-war-ragnarok": {
    name: "God of War Ragnarök",
    tagline: "Fate awaits the All-Father.",
    description:
      "Kratos and Atreus journey through the Nine Realms. Boss guides, armor builds, and 100% completion coverage.",
    longDescription:
      "God of War Ragnarök concludes the Norse saga with Kratos and Atreus facing Odin and Thor across the Nine Realms. Zosygo provides comprehensive boss strategy guides, armor set builds, Nornir chest solutions, and lore analysis for the epic finale.",
    developer: "Santa Monica Studio",
    publisher: "Sony Interactive Entertainment",
    genres: ["Action-Adventure", "Hack and Slash", "Norse Mythology"],
    platforms: ["PlayStation 4", "PlayStation 5", "PC"],
    keywords: [
      "God of War Ragnarok guide",
      "GoW Ragnarok",
      "Kratos build",
      "Atreus",
      "Nine Realms",
      "Santa Monica Studio",
    ],
    faq: [
      {
        question: "What is God of War Ragnarök?",
        answer:
          "God of War Ragnarök is the ninth installment in the God of War series, concluding the Norse era. It follows Kratos and Atreus as they battle against Odin and Thor during Ragnarök.",
      },
      {
        question: "What platforms is Ragnarök on?",
        answer:
          "God of War Ragnarök is available on PlayStation 4, PlayStation 5, and PC (released 2024).",
      },
      {
        question: "Is Ragnarök the end of the God of War series?",
        answer:
          "Ragnarök concludes the Norse saga, but Santa Monica Studio has hinted at future God of War games exploring different mythologies.",
      },
    ],
  },
  "red-dead-redemption-2": {
    name: "Red Dead Redemption 2",
    tagline: "Outlaws, honor, and the Wild West.",
    description:
      "Arthur Morgan's epic through America's heartland. Mission walkthroughs, treasure maps, and 100% completion.",
    longDescription:
      "Red Dead Redemption 2 is Rockstar's sprawling Wild West epic following Arthur Morgan and the Van der Linde gang. Zosygo covers every main mission, stranger encounter, legendary animal hunt, and hidden treasure location across the five states.",
    developer: "Rockstar Studios",
    publisher: "Rockstar Games",
    genres: ["Action-Adventure", "Open World", "Western"],
    platforms: ["PC", "PlayStation", "Xbox"],
    keywords: [
      "Red Dead Redemption 2 guide",
      "RDR2 walkthrough",
      "Arthur Morgan",
      "Wild West",
      "Rockstar Games",
      "legendary animals",
    ],
    faq: [
      {
        question: "What is Red Dead Redemption 2?",
        answer:
          "Red Dead Redemption 2 is an open-world Western action-adventure game set in 1899, following outlaw Arthur Morgan and the Van der Linde gang.",
      },
      {
        question: "Do I need to play RDR1 first?",
        answer:
          "RDR2 is a prequel set 12 years before the first game. It works perfectly as a standalone experience.",
      },      {
        question: "Is Red Dead Online still active?",
        answer:
          "Yes, Red Dead Online remains active with regular events, though major content updates have slowed. The single-player campaign remains the main draw.",
      },
    ],
  },
  "the-witcher-3": {
    name: "The Witcher 3: Wild Hunt",
    tagline: "The world needs a witcher — and it needs you.",
    description:
      "Geralt of Rivia's masterwork — quest guides, Gwent cards, armor builds, and both expansions covered.",
    longDescription:
      "The Witcher 3: Wild Hunt is CD Projekt Red's open-world RPG masterpiece following Geralt's search for Ciri across the war-torn Northern Kingdoms. Zosygo covers every contract, Gwent card location, grandmaster Witcher gear, and both Hearts of Stone and Blood and Wine expansions.",
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    genres: ["Action RPG", "Open World", "Dark Fantasy"],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    keywords: [
      "Witcher 3 guide",
      "Gwent guide",
      "Geralt of Rivia",
      "Witcher gear",
      "Blood and Wine",
      "Hearts of Stone",
    ],
    faq: [
      {
        question: "What is The Witcher 3?",
        answer:
          "The Witcher 3 is an open-world action RPG following Geralt of Rivia, a monster hunter searching for his adopted daughter Ciri in a war-torn fantasy world.",
      },
      {
        question: "Which expansion should I play first?",
        answer:
          "Hearts of Stone is designed for mid-to-high level characters (level 30+), while Blood and Wine is endgame content (level 35+). Play Hearts of Stone first.",
      },
      {
        question: "Is Gwent important?",
        answer:
          "Gwent is optional but many quests and achievements involve it. It's a deeply strategic card game that many players enjoy as much as the main quest.",
      },
    ],
  },
  "dark-souls-3": {
    name: "Dark Souls III",
    tagline: "The fire fades. Embers remain.",
    description:
      "The culmination of the Dark Souls trilogy — boss guides, build calculators, and lore analysis.",
    longDescription:
      "Dark Souls III closes the Dark Souls trilogy with the Lords of Cinder refusing their thrones. Zosygo brings detailed boss strategies for every Lord of Cinder, build calculators for PvE and PvP, weapon upgrade paths, and deep lore connecting Lothric to the Age of Fire.",
    developer: "FromSoftware",
    publisher: "Bandai Namco Entertainment",
    genres: ["Action RPG", "Soulslike", "Dark Fantasy"],
    platforms: ["PC", "PlayStation", "Xbox"],
    keywords: [
      "Dark Souls 3 guide",
      "DS3 builds",
      "Lords of Cinder",
      "Lothric",
      "FromSoftware",
      "Soulslike",
    ],
    faq: [
      {
        question: "What is Dark Souls III?",
        answer:
          "Dark Souls III is an action RPG and the final chapter of the Dark Souls trilogy, set in the decaying kingdom of Lothric where the Lords of Cinder have abandoned their thrones.",
      },
      {
        question: "Do I need to play DS1 and DS2 first?",
        answer:
          "While the trilogy shares connected lore, each game stands alone. DS3 has many callbacks that fans will appreciate, but new players won't be lost.",
      },
      {
        question: "What is the best starting class for DS3?",
        answer:
          "The Knight is the best starting class for beginners due to high starting HP, a 100% physical block shield, and armor that carries well into the mid-game.",
      },
    ],
  },
  "skyrim": {
    name: "The Elder Scrolls V: Skyrim",
    tagline: "Dragonborn — the fate of Tamriel rests with you.",
    description:
      "Tamriel's greatest adventure — quest guides, shouts, builds, and modding resources for Skyrim.",
    longDescription:
      "The Elder Scrolls V: Skyrim is Bethesda's open-world RPG that defined a generation. Zosygo covers the main quest, every Daedric artifact, shout locations, crafting guides, and curated mod lists for PC and console to keep your playthrough fresh.",
    developer: "Bethesda Game Studios",
    publisher: "Bethesda Softworks",
    genres: ["Open World", "Action RPG", "Fantasy"],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    keywords: [
      "Skyrim guide",
      "Skyrim builds",
      "Dragonborn",
      "Thu'um shouts",
      "Tamriel",
      "Bethesda",
    ],
    faq: [
      {
        question: "What is Skyrim?",
        answer:
          "The Elder Scrolls V: Skyrim is an open-world action RPG set in the province of Skyrim, where the player character is the Dragonborn — a mortal born with the soul of a dragon.",
      },
      {
        question: "Which version of Skyrim should I buy?",
        answer:
          "Skyrim Anniversary Edition includes all official add-ons plus Creation Club content. Special Edition is a solid base with mod support.",
      },
      {
        question: "What is the best build in Skyrim?",
        answer:
          "The Stealth Archer is famously powerful due to Sneak attack multipliers. For melee, a Two-Handed Heavy Armor build is straightforward and effective for beginners.",
      },
    ],
  },
  "sekiro": {
    name: "Sekiro: Shadows Die Twice",
    tagline: "Resurrection comes at a price.",
    description:
      "Master the blade in FromSoftware's shinobi action game — boss guides, prosthetic upgrades, and combat analysis.",
    longDescription:
      "Sekiro: Shadows Die Twice trades RPG builds for precision sword combat in Sengoku-era Japan. Zosygo breaks down every boss's posture system, prosthetic tool applications, skill tree recommendations, and secret endings for FromSoftware's unique action-adventure.",
    developer: "FromSoftware",
    publisher: "Activision",
    genres: ["Action-Adventure", "Stealth", "Soulslike"],
    platforms: ["PC", "PlayStation", "Xbox"],
    keywords: [
      "Sekiro guide",
      "Sekiro bosses",
      "Wolf",
      "Shinobi",
      "FromSoftware",
      "posture system",
    ],
    faq: [
      {
        question: "What is Sekiro?",
        answer:
          "Sekiro: Shadows Die Twice is an action-adventure game from FromSoftware set in a fictionalized Sengoku-era Japan, following a shinobi named Wolf on a mission to rescue his kidnapped lord.",
      },
      {
        question: "How is Sekiro different from Dark Souls?",
        answer:
          "Sekiro focuses on precise parry-based combat with a dedicated deflect mechanic, has no character builds or RPG stats, and features a grappling hook for vertical traversal.",
      },
      {
        question: "What is the best prosthetic tool?",
        answer:
          "The Loaded Umbrella is extremely versatile for blocking undodgeable attacks. The Firecracker is excellent for stunning beast-type enemies. Prioritize the Shinobi Firecracker early.",
      },
    ],
  },
  "monster-hunter-wilds": {
    name: "Monster Hunter Wilds",
    tagline: "The hunt evolves.",
    description:
      "Capcom's next-generation hunting game — weapon guides, monster weaknesses, armor builds, and endemic life coverage.",
    longDescription:
      "Monster Hunter Wilds is the latest entry in Capcom's beloved hunting series, bringing seamless open zones, new weapon mechanics, and a living ecosystem of monsters. Zosygo covers every weapon tree, monster weakness chart, armor set build, and endemic life location so you can hunt with confidence.",
    developer: "Capcom",
    publisher: "Capcom",
    genres: ["Action RPG", "Hunting", "Open World"],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    keywords: [
      "Monster Hunter Wilds guide",
      "MH Wilds weapons",
      "Monster Hunter Wilds builds",
      "Capcom",
      "hunting guide",
      "monster weaknesses",
    ],
    faq: [
      {
        question: "What is Monster Hunter Wilds?",
        answer:
          "Monster Hunter Wilds is the latest mainline Monster Hunter game from Capcom, featuring seamless open environments, a living ecosystem, and new weapon mechanics.",
      },
      {
        question: "What platforms is Monster Hunter Wilds on?",
        answer:
          "Monster Hunter Wilds is available on PC, PlayStation 5, and Xbox Series X|S.",
      },
      {
        question: "What is the best weapon for beginners in MH Wilds?",
        answer:
          "The Sword and Shield offers a good balance of mobility, defense, and damage. The Longsword is also beginner-friendly with its forgiving counter mechanics.",
      },
    ],
  },
  "hollow-knight": {
    name: "Hollow Knight",
    tagline: "Descend into the darkness of Hallownest.",
    description:
      "Team Cherry's masterpiece of exploration and combat — charm builds, boss guides, map progression, and lore.",
    longDescription:
      "Hollow Knight is a hand-drawn metroidvania set in the ruined kingdom of Hallownest. Zosygo guides you through every area with charm build recommendations, boss strategies for all 40+ encounters, dream warrior locations, and the deep lore behind the Pale King, the Radiance, and the infection.",
    developer: "Team Cherry",
    publisher: "Team Cherry",
    genres: ["Metroidvania", "Action-Adventure", "Dark Fantasy"],
    platforms: ["PC", "Nintendo Switch", "PlayStation", "Xbox"],
    keywords: [
      "Hollow Knight guide",
      "Hollow Knight bosses",
      "Hallownest",
      "charm builds",
      "Team Cherry",
      "Metroidvania",
    ],
    faq: [
      {
        question: "What is Hollow Knight?",
        answer:
          "Hollow Knight is a hand-drawn metroidvania set in the ruined insect kingdom of Hallownest. Players explore interconnected areas, fight over 40 unique bosses, and uncover the story of the infection.",
      },
      {
        question: "What is the best charm build in Hollow Knight?",
        answer:
          "The Mark of Pride + Quick Slash + Unbreakable Strength combo is widely considered top-tier for melee combat. For exploration, equip Wayward Compass + Gathering Swarm.",
      },
      {
        question: "Is Silksong coming out?",
        answer:
          "Hollow Knight: Silksong, the sequel starring Hornet, is still in development by Team Cherry. Release date has not been announced.",
      },
    ],
  },
};

function buildGame(base: GameBase, data: GameData): Game {
  return { ...base, ...data, faq: data.faq ?? [] };
}

export function getAllGames(data?: Record<string, GameData>): Game[] {
  const localized = data ?? fallbackData;
  return baseGames.map((base) =>
    buildGame(base, localized[base.slug] ?? fallbackData[base.slug])
  );
}

export function getGameBySlug(
  slug: string,
  data?: Record<string, GameData>
): Game | undefined {
  const localized = data ?? fallbackData;
  const base = baseGames.find((g) => g.slug === slug);
  if (!base) return undefined;
  return buildGame(base, localized[slug] ?? fallbackData[slug]);
}

export function getGameSlugs(): string[] {
  return baseGames.map((game) => game.slug);
}

export const CATEGORIES = ["builds", "bosses", "weapons", "walkthroughs"] as const;
export type Category = (typeof CATEGORIES)[number];
