import { articles } from "./articles.ts";

for (const a of articles) {
  console.log("====");
  console.log("SLUG:", a.slug);
  console.log("CATEGORY:", a.category);
  console.log("TITLE:", a.title);
  console.log("META:", a.metaDescription);

  // Print first few meaningful sections
  let printed = 0;
  for (const s of a.sections) {
    if (printed >= 4) break;
    const txt = (s.heading || "") + " " + s.content;
    if (txt.trim().length > 20) {
      console.log("---");
      console.log(txt.substring(0, 300));
      printed++;
    }
  }
  console.log();
}
