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
