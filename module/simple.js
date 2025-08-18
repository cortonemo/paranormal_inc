import { preloadHandlebarsTemplates, registerHandlebarsHelpers } from "./templates.js";
import { PIN } from "./constants.js";
import { PINActorSheet } from "./actor-sheet.js";
import { PINItemSheet } from "./item-sheet.js";
import { PINActor } from "./actor.js";
import { PINItem } from "./item.js";

Hooks.once("init", function() {
  CONFIG.PIN = PIN;
  registerHandlebarsHelpers();
  preloadHandlebarsTemplates();
  CONFIG.Actor.documentClass = PINActor;
  CONFIG.Item.documentClass = PINItem;
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("paranormal_inc", PINActorSheet, { types: ["character"], makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("paranormal_inc", PINItemSheet, { makeDefault: true });
});
