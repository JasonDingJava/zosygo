"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ALL_WEAPONS, ALL_WEAPON_SLUGS, WEAPON_CATEGORY_NAMES } from "@/lib/build-calculator/weapons";
import { STARTING_CLASSES } from "@/lib/build-calculator/classes";
import { calculateBuild, type BuildStats, type BuildInput } from "@/lib/build-calculator/engine";

const STAT_KEYS = ["vigor","mind","endurance","strength","dexterity","intelligence","faith","arcane"] as const;
const STAT_LABELS: Record<string,string> = {
  vigor:"Vigor", mind:"Mind", endurance:"Endurance",
  strength:"Strength", dexterity:"Dexterity",
  intelligence:"Intelligence", faith:"Faith", arcane:"Arcane",
};
const PRESETS: Record<string,Partial<BuildStats>> = {
  "Dex Samurai":{vigor:50,mind:15,endurance:25,strength:18,dexterity:60,intelligence:9,faith:9,arcane:10},
  "Pure Strength":{vigor:60,mind:10,endurance:35,strength:80,dexterity:13,intelligence:9,faith:9,arcane:7},
  "Bleed Build":{vigor:50,mind:15,endurance:30,strength:14,dexterity:50,intelligence:9,faith:9,arcane:60},
  "Pure Mage":{vigor:40,mind:60,endurance:20,strength:12,dexterity:12,intelligence:80,faith:9,arcane:9},
  "Faith Paladin":{vigor:55,mind:25,endurance:30,strength:50,dexterity:20,intelligence:9,faith:60,arcane:9},
  "Quality Build":{vigor:55,mind:15,endurance:35,strength:60,dexterity:60,intelligence:9,faith:9,arcane:7},
};
const CLASS_NAMES = Object.keys(STARTING_CLASSES).sort();
const CI:Record<string,string>={Dagger:"\u{1F5E1}\uFE0F","Straight Sword":"\u{2694}\uFE0F",Greatsword:"\u{2694}\uFE0F","Colossal Sword":"\u{1F5E1}\uFE0F","Curved Sword":"\u{1F5E1}\uFE0F","Curved Greatsword":"\u{2694}\uFE0F",Katana:"\u{2694}\uFE0F",Twinblade:"\u{2694}\uFE0F","Thrusting Sword":"\u{1F5E1}\uFE0F","Heavy Thrusting Sword":"\u{1F5E1}\uFE0F",Axe:"\u{1FA93}",Greataxe:"\u{1FA93}",Hammer:"\u{1F528}","Great Hammer":"\u{1F528}",Flail:"\u{26D3}\uFE0F",Fist:"\u{270A}",Claw:"\u{1F985}",Whip:"\u{1FAA2}",Spear:"\u{1F531}","Great Spear":"\u{1F531}",Halberd:"\u{1F531}",Reaper:"\u{1F586}","Light Bow":"\u{1F3F9}",Bow:"\u{1F3F9}","Glintstone Staff":"\u{1FAAC}","Sacred Seal":"\u{2728}",Torch:"\u{1F525}"};

function Section({title,children}:{title:string;children:React.ReactNode}){return <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4"><h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">{title}</h3>{children}</div>;}
function StatCard({label,value,color}:{label:string;value:number;color:string}){return <div className="rounded bg-gray-800/60 px-3 py-2.5 text-center"><div className={"text-2xl font-bold "+color}>{value}</div><div className="text-[10px] text-gray-500">{label}</div></div>;}

export default function EldenRingBuildCalculator(){
  const [sc,setSc]=useState("vagabond");
  const [s,setS]=useState<BuildStats>({vigor:30,mind:12,endurance:20,strength:16,dexterity:14,intelligence:10,faith:10,arcane:8});
  const [sel,setSel]=useState<string[]>([]);
  const [twoh,setTwoh]=useState(false);
  const [ul,setUl]=useState(15);
  const [q,setQ]=useState("");
  const [cf,setCf]=useState("all");
  const sa=STAT_KEYS.map(k=>({key:k,label:STAT_LABELS[k],value:s[k]}));
  const inp:BuildInput={startingClass:sc,stats:s,selectedWeapons:sel,twoHanding:twoh,upgradeLevel:ul};
  const out=useMemo(()=>{try{return calculateBuild(inp)}catch{return null}},[inp]);
  const uStat=(k:keyof BuildStats,v:number)=>setS(p=>({...p,[k]:Math.max(1,Math.min(99,v))}));
  const tog=(slug:string)=>setSel(p=>p.includes(slug)?p.filter(x=>x!==slug):[...p,slug].slice(0,3));
  const preset=(name:string)=>{const p=PRESETS[name];if(p)setS(prev=>({...prev,...p}));setSel([]);setUl(15);};
  const fs=useMemo(()=>ALL_WEAPON_SLUGS.filter(slug=>{const w=ALL_WEAPONS[slug];if(cf!=="all"&&w.type!==cf)return false;if(q)return w.name.toLowerCase().includes(q.toLowerCase());return true;}),[cf,q]);

  // ─── URL Share ───
  const searchParams = useSearchParams();
  const router = useRouter();

  // Load from URL on mount
  useEffect(() => {
    const encoded = searchParams.get("b");
    if (!encoded) return;
    try {
      const json = JSON.parse(atob(encoded));
      if (json.sc) setSc(json.sc);
      if (json.s) setS(json.s);
      if (json.w) setSel(json.w);
      if (json.ul !== undefined) setUl(json.ul);
      if (json.th !== undefined) setTwoh(json.th);
    } catch {}
  }, []);

  // Generate share URL
  const [buildUrl, setBuildUrl] = useState("");
  useEffect(() => {
    const data = { sc, s, w: sel, ul, th: twoh };
    const b64 = btoa(JSON.stringify(data));
    setBuildUrl(window.location.origin + window.location.pathname + "?b=" + b64);
  }, [sc, s, sel, ul, twoh]);

  const [copied, setCopied] = useState(false);
  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(buildUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [buildUrl]);

  // Inject JSON-LD for SEO
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "calc-jsonld";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          name: "Elden Ring Build Calculator",
          description: "Plan and optimize Elden Ring character builds. Real-time stat calculations, weapon AR comparisons, and soft cap analysis.",
          url: "https://zosygo.com/elden-ring/tools/build-calculator",
          applicationCategory: "GameApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0" },
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How does the Elden Ring Build Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Select your starting class, adjust stat sliders (1-99), choose up to 3 weapons with upgrade levels, and see real-time HP, FP, Stamina, equip load, and Attack Rating results. The calculator uses game-accurate formulas with proper soft cap mechanics." } },
            { "@type": "Question", name: "What weapons are supported?", acceptedAnswer: { "@type": "Answer", text: "The calculator supports 123 weapons including straight swords, greatswords, katanas, curved swords, spears, hammers, axes, daggers, and more. Each weapon has exact scaling coefficients and stat requirements." } },
            { "@type": "Question", name: "Is the stat calculation accurate to Elden Ring?", acceptedAnswer: { "@type": "Answer", text: "Yes. HP, FP, Stamina, and equip load follow Elden Ring's actual in-game formulas. Weapon Attack Rating uses correct scaling curves, upgrade levels, and soft cap mechanics." } },
            { "@type": "Question", name: "Can I share my build?", acceptedAnswer: { "@type": "Answer", text: "Yes. Click the Copy Build URL button to generate a shareable link with your build encoded in the URL." } },
          ],
        },
      ],
    });
    document.head.appendChild(script);
    return () => { const s = document.getElementById("calc-jsonld"); if (s) s.remove(); };
  }, []);

  return <div className="min-h-screen bg-gray-950 text-gray-200">
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">Elden Ring Build Calculator</h1>
        <p className="mt-1 text-gray-400">Plan character stats, pick weapons, see exact Attack Rating.</p>
      </div>
      <div className="mb-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">Quick Build Presets</h2>
          <button onClick={copyUrl} className="rounded border border-blue-700/30 bg-blue-900/10 px-3 py-1.5 text-xs text-blue-300 hover:bg-blue-900/30 ml-2">{copied?"Copied!":"Copy Build URL"}</button>
        <div className="flex flex-wrap gap-2">{Object.keys(PRESETS).map(n=><button key={n} onClick={()=>preset(n)} className="rounded border border-yellow-700/30 bg-yellow-900/10 px-3 py-1.5 text-xs text-yellow-300 hover:bg-yellow-900/30">{n}</button>)}</div>
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-6">
          <Section title="Starting Class">
            <div className="grid grid-cols-2 gap-1.5">{CLASS_NAMES.map(n=><button key={n} onClick={()=>setSc(n)} className={"rounded px-2 py-1.5 text-xs transition "+(sc===n?"bg-yellow-600 text-white font-medium":"bg-gray-800 text-gray-300 hover:bg-gray-700")}>{STARTING_CLASSES[n].name}</button>)}</div>
          </Section>
          <Section title="Attributes">
            <div className="space-y-2">{sa.map(({key,label,value})=><div key={key}><div className="mb-0.5 flex justify-between text-xs"><span className="font-medium text-gray-200">{label}</span><span className="text-yellow-400">{value}</span></div><input type="range" min={1} max={99} value={value} onChange={e=>uStat(key as keyof BuildStats,parseInt(e.target.value))} className="w-full h-1.5 appearance-none rounded bg-gray-700 accent-yellow-500 cursor-pointer"/></div>)}</div>
            {out&&<div className="mt-3 rounded bg-gray-800 px-3 py-2 text-center text-sm"><span className="text-gray-400">Rune Level </span><span className="text-2xl font-bold text-yellow-400">{out.runeLevel}</span></div>}
          </Section>
          <Section title={"Upgrade Level (+"+ul+")"}>
            <input type="range" min={0} max={25} value={ul} onChange={e=>setUl(parseInt(e.target.value))} className="w-full h-1.5 appearance-none rounded bg-gray-700 accent-yellow-500 cursor-pointer"/>
            <div className="mt-1 flex justify-between text-[10px] text-gray-500"><span>+0</span><span>+25</span></div>
          </Section>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={twoh} onChange={e=>setTwoh(e.target.checked)} className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-yellow-500"/><span className="text-sm text-gray-300">Two-handing (1.5x STR)</span></label>
          <Section title={"Weapons ("+sel.length+"/3)"}>
            <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search weapons..." className="w-full rounded bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-yellow-500"/>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <button onClick={()=>setCf("all")} className={"rounded px-2 py-0.5 text-[10px] "+(cf==="all"?"bg-yellow-600 text-white":"bg-gray-800 text-gray-400 hover:bg-gray-700")}>All</button>
              {WEAPON_CATEGORY_NAMES.map(c=><button key={c} onClick={()=>setCf(c)} className={"rounded px-2 py-0.5 text-[10px] "+(cf===c?"bg-yellow-600 text-white":"bg-gray-800 text-gray-400 hover:bg-gray-700")}>{CI[c]||"\u{2694}\uFE0F"} {c}</button>)}
            </div>
            <div className="mt-2 max-h-64 overflow-y-auto space-y-0.5 rounded border border-gray-800">
              {fs.map(slug=>{const w=ALL_WEAPONS[slug],sel2=sel.includes(slug);return <button key={slug} onClick={()=>tog(slug)} disabled={!sel2&&sel.length>=3} className={"flex w-full items-center justify-between px-3 py-1.5 text-xs transition "+(sel2?"bg-yellow-900/20 text-yellow-300":"text-gray-400 hover:bg-gray-800")+(sel2||sel.length<3?"":" opacity-40")}><span className="truncate">{w.name}</span><span className="ml-2 shrink-0 text-[10px] text-gray-500">{w.somber?"\u{1F31F}":"\u{1F527}"} {w.type}</span></button>;})}
              {fs.length===0&&<div className="p-3 text-center text-xs text-gray-500">No weapons found</div>}
            </div>
          </Section>
        </div>
        <div className="lg:col-span-3 space-y-6">
          {out?(<>
            <Section title="Vital Stats"><div className="grid grid-cols-3 gap-3"><StatCard label="HP" value={out.totalHP} color="text-red-400"/><StatCard label="FP" value={out.totalFP} color="text-blue-400"/><StatCard label="Stamina" value={out.totalStamina} color="text-green-400"/></div></Section>
            <Section title="Equip Load">
              <div className="mb-2 h-2.5 w-full rounded-full bg-gray-800 overflow-hidden"><div className={"h-full rounded-full transition-all duration-300 "+(out.equipLoad.rollType==="light"?"bg-green-500":out.equipLoad.rollType==="medium"?"bg-yellow-500":"bg-red-500")} style={{width:Math.min(100,(out.equipLoad.current/out.equipLoad.maxHeavy)*100)+"%"}}/></div>
              <div className="flex justify-between text-xs"><span className="text-gray-400">{out.equipLoad.current} / {out.equipLoad.maxHeavy.toFixed(1)}</span><span className={"font-medium "+(out.equipLoad.rollType==="light"?"text-green-400":out.equipLoad.rollType==="medium"?"text-yellow-400":"text-red-400")}>{out.equipLoad.rollType==="light"?"Light Roll":out.equipLoad.rollType==="medium"?"Medium Roll":"Heavy Roll"}</span></div>
            </Section>
            <Section title="Build Type"><div className="rounded bg-yellow-900/10 border border-yellow-700/20 px-4 py-3 text-center"><span className="text-xl font-bold text-yellow-300">{out.buildType}</span>{!out.isViable&&<div className="mt-2 text-sm text-orange-400">Need higher Vigor or weapon requirements not met</div>}</div></Section>
            <Section title="Weapon Attack Rating">
              {out.weapons.length===0?<div className="text-center text-sm text-gray-500">Select weapons from the left panel</div>:<div className="space-y-3">{out.weapons.map(w=><div key={w.slug} className="rounded border border-gray-800 bg-gray-900/50 p-3"><div className="mb-2 flex items-center justify-between"><span className="font-semibold text-gray-200">{w.name}</span><span className="text-xs text-gray-500">{w.type}</span></div>{!w.meetsRequirements&&<div className="mb-2 rounded bg-red-900/20 px-2 py-1 text-xs text-red-400">Missing: {w.missingStats.join(", ")}</div>}<div className="grid grid-cols-3 gap-2 text-center"><div className="rounded bg-gray-800/50 px-2 py-1.5"><div className="text-lg font-bold text-white">{w.totalAR}</div><div className="text-[10px] text-gray-500">Total AR</div></div><div className="rounded bg-gray-800/50 px-2 py-1.5"><div className="text-lg font-bold text-orange-300">{w.physicalAR}</div><div className="text-[10px] text-gray-500">Physical</div></div><div className="rounded bg-gray-800/50 px-2 py-1.5"><div className="text-lg font-bold text-purple-300">{w.elementalAR}</div><div className="text-[10px] text-gray-500">Elemental</div></div></div></div>)}</div>}
            </Section>
            {out.softCapWarnings.length>0&&<Section title="Soft Cap Analysis"><div className="space-y-1.5">{out.softCapWarnings.map((s,i)=><div key={i} className={"rounded px-3 py-2 text-xs "+(s.type==="warning"?"bg-yellow-900/20 text-yellow-300":s.type==="info"?"bg-blue-900/20 text-blue-300":"bg-green-900/20 text-green-300")}>{s.message}</div>)}</div></Section>}
          </>):<Section title="Build Output"><div className="text-center text-sm text-gray-500">Adjust your stats to see build results</div></Section>}
        </div>
      </div>
    </div>

    {/* SEO Content below calculator */}
    <div className="mx-auto max-w-4xl px-4 py-16">
      <section className="border-t border-gray-800 pt-12">
        <h2 className="text-2xl font-bold text-white">What Is the Elden Ring Build Calculator?</h2>
        <p className="mt-4 text-base leading-relaxed text-gray-400">
          The Elden Ring Build Calculator is a free online tool that lets you plan and optimize your character build for Elden Ring.
          It uses game-accurate formulas for stat calculations, weapon scaling, and equip load so you can experiment with different
          builds without respeccing in-game. The calculator supports all 10 starting classes, 123 weapons, and proper soft cap mechanics.
        </p>
        <p className="mt-3 text-base leading-relaxed text-gray-400">
          Whether you are building a Dexterity bleed build, a Moonveil Intelligence build, or a pure Strength tank,
          the calculator gives you precise numbers for HP, FP, Stamina, equip load, and weapon Attack Rating with physical and elemental damage breakdowns.
        </p>
      </section>

      <section className="mt-12 border-t border-gray-800 pt-12">
        <h2 className="text-2xl font-bold text-white">How To Use This Calculator</h2>
        <ol className="mt-6 space-y-4">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-900/30 text-sm font-bold text-yellow-400">1</span>
            <div>
              <h3 className="font-semibold text-white">Choose a Starting Class</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">Select from Vagabond, Warrior, Hero, Bandit, Astrologer, Prophet, Samurai, Prisoner, Confessor, or Wretch.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-900/30 text-sm font-bold text-yellow-400">2</span>
            <div>
              <h3 className="font-semibold text-white">Set Your Attributes</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">Use the sliders to allocate Vigor, Mind, Endurance, Strength, Dexterity, Intelligence, Faith, and Arcane from 1 to 99. Watch for soft cap warnings.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-900/30 text-sm font-bold text-yellow-400">3</span>
            <div>
              <h3 className="font-semibold text-white">Select Weapons</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">Pick up to 3 weapons, set upgrade levels (+0 to +25), and toggle two-handing for the 1.5x Strength bonus.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-900/30 text-sm font-bold text-yellow-400">4</span>
            <div>
              <h3 className="font-semibold text-white">Review Results &amp; Share</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">See real-time HP, FP, Stamina, equip load, roll type, weapon AR, and soft cap analysis. Share your build via URL.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="mt-12 border-t border-gray-800 pt-12">
        <h2 className="text-2xl font-bold text-white">Recommended Builds</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a href="/elden-ring/builds/elden-ring-pure-dex-bleed-build" className="group rounded-sm border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-yellow-700/30">
            <h3 className="font-semibold text-white group-hover:text-yellow-300">Pure Dexterity Bleed Build</h3>
            <p className="mt-1 text-sm text-gray-500">High DPS bleed build using Rivers of Blood or Bloodhound's Fang. 60 Vigor, 80 Dexterity, 60 Arcane.</p>
          </a>
          <a href="/elden-ring/builds/moonveil-intelligence-build" className="group rounded-sm border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-yellow-700/30">
            <h3 className="font-semibold text-white group-hover:text-yellow-300">Moonveil Intelligence Build</h3>
            <p className="mt-1 text-sm text-gray-500">Intelligence-based samurai build using Moonveil katana. 50 Vigor, 80 Intelligence, 20 Dexterity.</p>
          </a>
          <a href="/elden-ring/builds" className="group rounded-sm border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-yellow-700/30 sm:col-span-2">
            <h3 className="font-semibold text-white group-hover:text-yellow-300">All Elden Ring Builds →</h3>
            <p className="mt-1 text-sm text-gray-500">Browse all builds including Strength, Faith, Arcane, and hybrid builds.</p>
          </a>
        </div>
      </section>

      <section className="mt-12 border-t border-gray-800 pt-12">
        <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {[
            { q: "How does the Elden Ring Build Calculator work?", a: "Select your starting class, adjust stat sliders (1-99), choose up to 3 weapons with upgrade levels, and see real-time HP, FP, Stamina, equip load, and Attack Rating results. The calculator uses game-accurate formulas with proper soft cap mechanics." },
            { q: "What weapons are supported?", a: "The calculator supports 123 weapons including straight swords, greatswords, katanas, curved swords, spears, hammers, axes, daggers, and more. Each weapon has exact scaling coefficients and stat requirements." },
            { q: "Is the stat calculation accurate to Elden Ring?", a: "Yes. HP, FP, Stamina, and equip load follow Elden Ring's actual in-game formulas. Weapon Attack Rating uses correct scaling curves, upgrade levels, and soft cap mechanics." },
            { q: "Can I share my build?", a: "Yes. Click the Copy Build URL button to generate a shareable link with your build encoded in the URL." },
            { q: "What is the best starting class?", a: "Vagabond is generally the best starting class for most builds due to its high Vigor and balanced stats. For pure casters, Astrologer or Prophet are better choices." },
          ].map((item, i) => (
            <details key={i} className="group rounded-sm border border-gray-800 bg-gray-900/50">
              <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-white transition-colors hover:text-yellow-300">
                {item.q}
                <svg className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-gray-800 px-4 py-3">
                <p className="text-sm leading-relaxed text-gray-400">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-gray-800 pt-12">
        <h2 className="text-xl font-bold text-white">Related Guides</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { title: "Best Dexterity Build", href: "/elden-ring/builds/elden-ring-pure-dex-bleed-build" },
            { title: "Moonveil Intelligence Build", href: "/elden-ring/builds/moonveil-intelligence-build" },
            { title: "Elden Ring Builds", href: "/elden-ring/builds" },
            { title: "Elden Ring Bosses", href: "/elden-ring/bosses" },
            { title: "Elden Ring Weapons", href: "/elden-ring/weapons" },
            { title: "Elden Ring Tools", href: "/elden-ring/tools" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm border border-yellow-700/20 bg-gray-900/50 px-4 py-2.5 text-sm font-medium text-yellow-300 transition-all hover:border-yellow-600/40 hover:bg-gray-800"
            >
              {link.title}
            </a>
          ))}
        </div>
      </section>
    </div>
  </div>;
}
