// module/templates.js
export const registerHandlebarsHelpers = () => {
  Handlebars.registerHelper("join", (arr, sep) => Array.isArray(arr) ? arr.join(sep) : "");
  Handlebars.registerHelper("eq", (a, b) => a === b);

  // Optional: convert a short partial key into a full path in templates
  Handlebars.registerHelper("partialPath", (p) => {
    const base = `systems/${game.system?.id ?? "paranormal_inc"}/templates`;
    if (!p || typeof p !== "string") return "";
    if (p.startsWith("systems/") || p.startsWith("/")) return p;
    // allow people to write "partials/scientist.html" or "scientist.html"
    const clean = p.replace(/^\.?\/?templates\/?/, "");
    return `${base}/${clean}`;
  });
};

export const preloadHandlebarsTemplates = async () => {
  const base = `systems/${game.system?.id ?? "paranormal_inc"}/templates`;
  const list = [
    `${base}/actor-sheet.html`,
    `${base}/npc-sheet.html`,
  ];

  // Archetype partials (normalize to full paths)
  const raw = Object.values(CONFIG?.PIN?.archetypes ?? {}).map(a => a?.partial).filter(Boolean);
  const partials = raw.map(p => (p.startsWith("systems/") || p.startsWith("/")) ? p : `${base}/${p.replace(/^\.?\/?templates\/?/, "")}`);

  // Try to include item sheet only if it exists (avoid 404s)
  try {
    const res = await fetch(`${base}/item-sheet.html`, { method: "HEAD" });
    if (res.ok) list.push(`${base}/item-sheet.html`);
  } catch (_) {}

  // Preload all. If a template 404s, we still want others to load.
  const toLoad = [...list, ...partials];
  const ok = [];
  for (const path of toLoad) {
    try { await loadTemplates([path]); ok.push(path); } catch (e) { console.warn("PIN preload skipped:", path, e); }
  }
  console.log("PIN preloaded templates:", ok);
};
