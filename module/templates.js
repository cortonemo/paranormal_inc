import { PIN } from "./constants.js";
export const preloadHandlebarsTemplates = async () => {
  const partials = Object.values(PIN.archetypes).map(a => a.partial);
  return loadTemplates([
    "systems/paranormal_inc/templates/actor-sheet.html",
    "systems/paranormal_inc/templates/item-sheet.html",
    ...partials
  ]);
};
export const registerHandlebarsHelpers = () => {
  Handlebars.registerHelper("eq", (a,b)=>a===b);
  Handlebars.registerHelper("includes", (arr,v)=>Array.isArray(arr)&&arr.includes(v));
};
// Paranormal Inc — Handlebars helpers & preloader
export const registerHandlebarsHelpers = () => {
  Handlebars.registerHelper("join", (arr, sep) => Array.isArray(arr) ? arr.join(sep) : "");
  Handlebars.registerHelper("eq", (a, b) => a === b);
};

export const preloadHandlebarsTemplates = async () => {
  const coreTemplates = [
    "systems/paranormal_inc/templates/actor-sheet.html",
    "systems/paranormal_inc/templates/npc-sheet.html",
    "systems/paranormal_inc/templates/item-sheet.html"
  ];

  // Preload any archetype partials already defined in CONFIG.PIN
  const partials = CONFIG?.PIN?.archetypes
    ? Object.values(CONFIG.PIN.archetypes).map(a => a?.partial).filter(Boolean)
    : [];

  return loadTemplates([...coreTemplates, ...partials]);
};
