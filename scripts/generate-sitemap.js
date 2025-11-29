// scripts/generate-sitemap.js
import fs from "fs";
import { generators, works, contacts } from "../constants/index.js";

const BASE_URL = "https://lja-power.com";

const urls = [
  { loc: "/", priority: 1.0 },
  { loc: "/products", priority: 0.9 },
  { loc: "/about", priority: 0.8 },
  { loc: "/services", priority: 0.8 },
  { loc: "/our-works", priority: 0.9 },
  { loc: "/contacts", priority: 0.8 },
];

// Add products
generators.forEach((gen) => {
  urls.push({ loc: `/products/${gen.slug}`, priority: 0.8 });
});

// Add projects
works.forEach((work) => {
  urls.push({ loc: `/our-works/${work.slug}`, priority: 0.8 });
});

// Add branches (contacts)
contacts.forEach((branch) => {
  urls.push({ loc: `/branches/${branch.slug}`, priority: 0.8 });
});

// Build XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

// Save file to build (dist) folder
fs.writeFileSync("./dist/sitemap.xml", sitemap);
console.log("✅ Sitemap generated successfully!");
