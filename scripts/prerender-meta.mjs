// scripts/prerender-meta.mjs
// Runs AFTER `vite build`. For every route in src/seo.ts it writes dist/<route>/index.html
// with the right <title>, description, canonical, Open Graph tags, JSON-LD and a <noscript> summary,
// and generates dist/sitemap.xml. Static files win over Vercel's SPA rewrite, so crawlers and
// link previews (WhatsApp, LinkedIn) get correct meta without running JavaScript.
import { build } from "esbuild";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const DIST = "dist";
const today = new Date().toISOString().slice(0, 10);

// 1. Load route metadata from src/seo.ts (bundled on the fly, so there is only one source of truth)
const bundled = await build({
  entryPoints: ["src/seo.ts"],
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "silent",
});
const code = bundled.outputFiles[0].text;
const { getRouteMeta, abs, OG_IMAGE, SITE_URL } = await import(
  "data:text/javascript;base64," + Buffer.from(code).toString("base64")
);
const routes = getRouteMeta();

// 2. Template = the built homepage
const template = await readFile(path.join(DIST, "index.html"), "utf8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escText = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`, "i");
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `  ${tag}\n</head>`);
}

function render(r) {
  let html = template;
  const url = abs(r.path);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escText(r.title)}</title>`);
  html = setMeta(html, "name", "description", r.description);
  html = setMeta(html, "name", "robots", r.noindex ? "noindex, nofollow" : "index, follow");
  html = setMeta(html, "property", "og:title", r.title);
  html = setMeta(html, "property", "og:description", r.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:image", OG_IMAGE);
  html = setMeta(html, "name", "twitter:title", r.title);
  html = setMeta(html, "name", "twitter:description", r.description);
  html = setMeta(html, "name", "twitter:image", OG_IMAGE);
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${url}" />`);

  const ld = (r.jsonLd ?? [])
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`)
    .join("\n    ");
  if (ld) html = html.replace("</head>", `    ${ld}\n  </head>`);

  const noscript = `<noscript><h1>${escText(r.h1)}</h1><p>${escText(r.description)}</p><p><a href="${SITE_URL}/">Venzix home</a></p></noscript>`;
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscript}`);
  return html;
}

// 3. Write one HTML file per route (home keeps dist/index.html with its own tags)
let count = 0;
for (const r of routes) {
  if (r.path === "/") continue;
  const dir = path.join(DIST, r.path);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), render(r));
  count++;
}

// 4. sitemap.xml
const urls = routes
  .filter((r) => !r.noindex)
  .map(
    (r) => `  <url>
    <loc>${abs(r.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n");
await writeFile(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

console.log(`prerender-meta: wrote ${count} route pages + sitemap.xml (${routes.length} URLs)`);
