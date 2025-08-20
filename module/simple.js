// module/simple.js
// Paranormal Inc — system bootstrap

import { PIN } from "./constants.js";
import { registerHandlebarsHelpers, preloadHandlebarsTemplates } from "./templates.js";
import { PINActor } from "./actor.js";
import { PINItem } from "./item.js";
import { PINActorSheet } from "./actor-sheet.js";
import { PINItemSheet } from "./item-sheet.js";

Hooks.once("init", () => {
  // Expose config
  CONFIG.PIN = PIN;

  // Handlebars helpers
  registerHandlebarsHelpers();

  // Use custom document classes
  CONFIG.Actor.documentClass = PINActor;
  CONFIG.Item.documentClass  = PINItem;

  // Register our sheets (PCs + NPCs)
  try { Actors.unregisterSheet("core", ActorSheet); } catch (_) {}
  Actors.registerSheet("paranormal_inc", PINActorSheet, { types: ["character","npc"], makeDefault: true });

  try { Items.unregisterSheet("core", ItemSheet); } catch (_) {}
  Items.registerSheet("paranormal_inc", PINItemSheet, { makeDefault: true });

  console.log("Paranormal Inc | init complete");
});

Hooks.once("ready", async () => {
  await preloadHandlebarsTemplates();
  console.log("Paranormal Inc | templates preloaded");
});
