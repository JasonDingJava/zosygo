import { articles } from "./articles.ts";

for (const a of articles.slice(0, 5)) {
  console.log("====");
  console.log("SLUG:", a.slug);
  console.log("TITLE:", a.title);
  console.log("META:", a.metaDescription);
  for (const s of a.sections.slice(0, 3)) {
    const txt = (s.heading || "") + " " + s.content;
    if (txt.trim().length > 20) {
      console.log("---");
      console.log(txt.substring(0, 400));
    }
  }
  console.log();
}
