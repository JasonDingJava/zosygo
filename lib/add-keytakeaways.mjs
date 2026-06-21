// Script to add keyTakeaways to articles that don't have them
// Run with: node lib/add-keytakeaways.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Files to process
const files = [
  'articles.ts',
  'articles1.ts',
  'articles2.ts',
  'articles3.ts',
  'articles4.ts',
  'articles5.ts',
  'articles6.ts',
  'articles7.ts',
];

// Slugs that already have keyTakeaways (don't touch)
const slugsWithKeyTakeaways = [
  'best-builds-guide',
  'best-moonveil-build',
  'malenia-healing-mechanic-explained',
];

// Helper: extract clean single-line content
function cleanContent(text) {
  if (!text) return '';
  let cleaned = text
    .replace(/\\\\n/g, ' ')
    .replace(/\\n/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '')
    .replace(/"/g, "'")
    .replace(/\\"/g, "'")
    .replace(/\\u2013/g, '\u2013')
    .replace(/\\u2014/g, '\u2014')
    .replace(/\\u2019/g, '\u2019')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length > 130) cleaned = cleaned.substring(0, 127) + '...';
  return cleaned;
}

// Helper: generate keyTakeaways from sections
function generateKeyTakeaways(slug, sections, metaDescription) {
  const takeaways = [];
  const usedValues = new Set();

  function addTakeaway(label, value) {
    const clean = cleanContent(value);
    if (clean.length < 8) return;
    if (!usedValues.has(clean)) {
      usedValues.add(clean);
      takeaways.push({ label, value: clean });
    }
  }

  for (const sec of sections) {
    const h = sec.heading.toLowerCase();
    const c = sec.content;

    if (takeaways.length >= 8) break;

    if (h.includes('quick answer') || h.includes('decision') || h.includes('should you')) {
      addTakeaway('\u{1F3AF} Bottom Line', c);
    } else if ((h.includes('stat') && (h.includes('distribution') || h.includes('level') || h.includes('build') || h.includes('150'))) || h.includes('stat priority') || h.includes('stat target') || h.includes('recommended stat')) {
      addTakeaway('\u{1F4CA} Stat Priority', c);
    } else if (h.includes('common mistake') || h.includes('mistake #') || h.includes('common error') || h.match(/mistake \d+/)) {
      addTakeaway('\u26A0\uFE0F Common Pitfall', c);
    } else if (h.includes('final verdict') || h.includes('final thought') || h.includes('conclusion') || (h.includes('final ') && !h.includes('fantasy'))) {
      addTakeaway('\u{1F4A1} Verdict', c);
    } else if (h.includes('weapon') && (h.includes('overview') || h.includes('loadout') || h.includes('best') || h.includes('setup') || h.includes('core') || h.includes('comparison'))) {
      addTakeaway('\u2694\uFE0F Weapon Setup', c);
    } else if (h.includes('talisman') || h.includes('physick') || h.includes('flask') || h.includes('tear')) {
      addTakeaway('\u{1F6E1}\uFE0F Talismans/Flask', c);
    } else if (h.includes('strength') && h.includes('weakness')) {
      addTakeaway('\u2696\uFE0F Strengths/Weaknesses', c);
    } else if (h.includes('progression') || h.includes('leveling') || h.includes('early game') || h.includes('mid game') || h.includes('late game')) {
      addTakeaway('\u{1F4C8} Progression Path', c);
    } else if (h.includes('pve') || h.includes('pvp') || h.includes('strategy') || h.includes('playstyle')) {
      addTakeaway('\u{1F3AE} PvE/PvP Tips', c);
    } else if (h.includes('damage') && (h.includes('breakpoint') || h.includes('comparison') || h.includes('scaling') || h.includes('output'))) {
      addTakeaway('\u{1F4CA} Damage Scaling', c);
    } else if (h.includes('how to get') || h.includes('location') || h.includes('where to find') || h.includes('acquisition')) {
      addTakeaway('\u{1F4CD} Acquisition', c);
    } else if (h.includes('starting class') || h.includes('best class')) {
      addTakeaway('\u{1F3AE} Starting Class', c);
    } else if (h.includes('phase 1') || h.includes('phase 2') || h.includes('attack pattern')) {
      addTakeaway('\u{1f525} Phase Strategy', c);
    } else if (h.includes('comparison') || h.includes('vs ')) {
      addTakeaway('\u2694\uFE0F Comparison', c);
    }
  }

  // Fallback: use section headings as labels
  if (takeaways.length < 3) {
    for (const sec of sections) {
      if (takeaways.length >= 3) break;
      const h = sec.heading;
      const c = sec.content;
      if (h && c && c.length > 15) {
        const shortLabel = h.length > 30 ? h.substring(0, 27) + '...' : h;
        addTakeaway('\u{1F4CC} ' + shortLabel, c);
      }
    }
  }

  // Fill up to 6 with contextual fallbacks
  const fallbackPool = [
    { label: '\u{1F4CA} Stats Overview', value: metaDescription || '' },
    { label: '\u2694\uFE0F Best Weapons', value: 'See the full article for the best weapon choices and setups.' },
    { label: '\u{1F6E1}\uFE0F Talisman Setup', value: 'Talisman choices significantly impact damage output and survivability.' },
    { label: '\u{1F3AE} Playstyle Tips', value: 'Mastering the playstyle is key to getting the most out of this build.' },
    { label: '\u{1F4A1} Optimization', value: 'Use the Build Calculator to optimize stat distribution.' },
    { label: '\u2728} Key Insight', value: 'See the FAQ section for common concerns and answers.' },
  ];

  while (takeaways.length < 6) {
    const fb = fallbackPool[takeaways.length] || { label: '\u{1F4CC} Tip ' + (takeaways.length + 1), value: 'See the full article for detailed information.' };
    if (!usedValues.has(fb.value) && fb.value.length > 5) {
      usedValues.add(fb.value);
      takeaways.push(fb);
    } else {
      takeaways.push({ label: '\u{1F4CC} Tip ' + (takeaways.length + 1), value: 'See the full article for more details.' });
    }
  }

  return takeaways.slice(0, 6);
}

// Format takeaways as TS code
function formatTakeaways(takeaways) {
  const lines = ['    keyTakeaways: ['];
  for (const t of takeaways) {
    let val = t.value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    let lab = t.label.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    lines.push('      { label: "' + lab + '", value: "' + val + '" },');
  }
  lines.push('    ],');
  return lines.join('\n');
}

// Process a single file line by line
function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const lines = content.split('\n');
  const result = [];
  let i = 0;
  let processed = 0;
  let skipped = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Detect article start
    const slugMatch = line.match(/^\s*slug:\s*"([^"]+)"/);
    if (slugMatch) {
      const slug = slugMatch[1];

      if (slugsWithKeyTakeaways.includes(slug)) {
        skipped++;
        result.push(line);
        i++;
        continue;
      }

      // Read ahead to find keyTakeaways, metaDescription end, and sections start
      let hasKT = false;
      let metaDescEndIdx = -1;
      let sectionsStartIdx = -1;

      for (let j = i + 1; j < Math.min(i + 120, lines.length); j++) {
        const lj = lines[j].trim();
        if (lj.startsWith('keyTakeaways:')) {
          hasKT = true;
          break;
        }
        if (lj === 'sections: [') {
          sectionsStartIdx = j;
          break;
        }
        if (lj.startsWith('metaDescription:')) {
          metaDescEndIdx = j;
          // Check for multi-line string
          let openQuotes = (lines[j].match(/"/g) || []).length;
          // metaDescription: "..."  means 2 quotes
          if (openQuotes >= 2) {
            // Check if it has closing quote
            metaDescEndIdx = j; // single line
          }
          if (openQuotes === 1) {
            // multi-line, find closing
            for (let k = j + 1; k < Math.min(j + 10, lines.length); k++) {
              metaDescEndIdx = k;
              openQuotes += (lines[k].match(/"/g) || []).length;
              if (openQuotes >= 2) break;
            }
          }
        }
      }

      if (hasKT || sectionsStartIdx === -1 || metaDescEndIdx === -1) {
        skipped++;
        // Also check if metaDescEndIdx was found at all
        if (sectionsStartIdx === -1) {
          console.log(`  ⚠ ${slug}: could not find sections`);
        } else if (metaDescEndIdx === -1) {
          console.log(`  ⚠ ${slug}: could not find metaDescription`);
        }
        result.push(line);
        i++;
        continue;
      }

      // Extract sections content
      const sectionContents = [];
      let braceDepth = 0;
      let inSections = false;
      let currentHeading = '';

      for (let j = sectionsStartIdx; j < lines.length; j++) {
        const ln = lines[j];
        if (ln.trim() === 'sections: [') {
          inSections = true;
          braceDepth = 1;
          continue;
        }
        if (!inSections) continue;

        for (const ch of ln) {
          if (ch === '{') braceDepth++;
          if (ch === '}') braceDepth--;
        }
        if (braceDepth <= 0) break;

        const hm = ln.match(/heading:\s*"(?:\\"|[^"])*"/);
        if (hm) {
          // Extract heading content between quotes
          const innerMatch = hm[0].match(/heading:\s*"((?:\\"|[^"])*)"/);
          if (innerMatch) currentHeading = innerMatch[1];
        }

        // Look for content on this line or multi-line
        const cmLine = ln.match(/^\s*content:\s*"((?:\\"|[^"])*)"\s*$/);
        if (cmLine && currentHeading) {
          sectionContents.push({ heading: currentHeading, content: cmLine[1] });
          currentHeading = '';
        }
      }

      // Extract meta description
      let metaDesc = '';
      for (let j = i; j <= metaDescEndIdx && j < lines.length; j++) {
        const m = lines[j].match(/metaDescription:\s*"([^"]+)/);
        if (m) {
          metaDesc = m[1] || '';
          break;
        }
      }

      const takeaways = generateKeyTakeaways(slug, sectionContents, metaDesc);
      const ktCode = formatTakeaways(takeaways);

      // Push lines up to and including metaDescription end
      result.push(line); // push slug line
      i++;

      while (i <= metaDescEndIdx && i < lines.length) {
        result.push(lines[i]);
        i++;
      }

      // Insert keyTakeaways here
      result.push('');
      result.push(ktCode);

      processed++;
      console.log('  \u2713 ' + slug);
      continue;
    }

    result.push(line);
    i++;
  }

  return { content: result.join('\n'), processed, skipped };
}

// Run
let totalProcessed = 0;
let totalSkipped = 0;

for (const fname of files) {
  const fpath = path.join(__dirname, fname);
  console.log('\n📁 ' + fname);
  const result = processFile(fpath);
  fs.writeFileSync(fpath, result.content, 'utf-8');
  totalProcessed += result.processed;
  totalSkipped += result.skipped;
  console.log('  \u2192 ' + result.processed + ' processed, ' + result.skipped + ' skipped');
}

console.log('\n✅ Done! Total: ' + totalProcessed + ' articles with keyTakeaways added, ' + totalSkipped + ' skipped');