// Paranormal Inc — Handlebars helpers & preloader (robust)
export const registerHandlebarsHelpers = () => {
  Handlebars.registerHelper("join", (arr, sep) => Array.isArray(arr) ? arr.join(sep) : "");
  Handlebars.registerHelper("eq", (a, b) => a === b);
  Handlebars.registerHelper("partialPath", (p) => {
    const base = `systems/${game.system?.id ?? "paranormal_inc"}/templates`;
    if (!p || typeof p !== "string") return "";
    if (p.startsWith("systems/") || p.startsWith("/")) return p;
    const clean = p.replace(/^\.?\/?templates\/?/, "");
    return `${base}/${clean}`;
  });
};

export const preloadHandlebarsTemplates = async () => {
  const base = `systems/${game.system?.id ?? "paranormal_inc"}/templates`;
  const core = [`${base}/actor-sheet.html`, `${base}/npc-sheet.html`];

  // Archetype partials (normalize to full paths)
  const raw = Object.values(CONFIG?.PIN?.archetypes ?? {}).map(a => a?.partial).filter(Boolean);
  const partials = raw.map(p => (p.startsWith("systems/") || p.startsWith("/")) ? p : `${base}/${p.replace(/^\.?\/?templates\/?/, "")}`);

  // Try item-sheet.html only if it exists
  try {
    const res = await fetch(`${base}/item-sheet.html`, { method: "HEAD" });
    if (res.ok) core.push(`${base}/item-sheet.html`);
  } catch (_) {}

  // Preload all, continue on failures
  const all = [...core, ...partials];
  const ok = [];
  for (const path of all) {
    try { await loadTemplates([path]); ok.push(path); } catch (e) { console.warn("PIN preload skipped:", path, e); }
  }
  console.log("PIN preloaded templates:", ok);
};
