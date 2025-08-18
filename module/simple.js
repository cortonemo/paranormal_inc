// module/simple.js
// Paranormal Inc — system bootstrap

import { preloadHandlebarsTemplates, registerHandlebarsHelpers } from "./templates.js";
import { PIN } from "./constants.js";
import { PINActorSheet } from "./actor-sheet.js";
import { PINItemSheet } from "./item-sheet.js";
import { PINActor } from "./actor.js";
import { PINItem } from "./item.js";

Hooks.once("init", function () {
  // Expose config
  CONFIG.PIN = PIN;

  // Handlebars helpers + preload templates/partials
  registerHandlebarsHelpers();
  preloadHandlebarsTemplates();

  // Use custom document classes
  CONFIG.Actor.documentClass = PINActor;
  CONFIG.Item.documentClass  = PINItem;

  // Register our sheets (for both PCs and NPCs)
  try { Actors.unregisterSheet("core", ActorSheet); } catch (e) {}
  Actors.registerSheet("paranormal_inc", PINActorSheet, {
    types: ["character", "npc"],
    makeDefault: true
  });

  try { Items.unregisterSheet("core", ItemSheet); } catch (e) {}
  Items.registerSheet("paranormal_inc", PINItemSheet, { makeDefault: true });

  console.log("Paranormal Inc | System initialized");
});
