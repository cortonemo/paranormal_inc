// Paranormal Inc — Handlebars helpers & preloader — HOTFIX
export const registerHandlebarsHelpers = () => {
  Handlebars.registerHelper("join", (arr, sep) => Array.isArray(arr) ? arr.join(sep) : "");
  Handlebars.registerHelper("eq", (a, b) => a === b);
};

export const preloadHandlebarsTemplates = async () => {
  const base = `systems/${game.system?.id ?? "paranormal_inc"}/templates`;
  const list = [
    `${base}/actor-sheet.html`,
    `${base}/npc-sheet.html`
  ];

  // Optionally include item sheet if it exists in your system
  try {
    const res = await fetch(`${base}/item-sheet.html`, { method: "HEAD" });
    if (res.ok) list.push(`${base}/item-sheet.html`);
  } catch (e) {
    // ignore
  }

  // Archetype partials
  const partials = CONFIG?.PIN?.archetypes
    ? Object.values(CONFIG.PIN.archetypes).map(a => a?.partial).filter(Boolean)
    : [];

  return loadTemplates([...list, ...partials]);
};
