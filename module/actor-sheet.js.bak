// module/actor-sheet.js
// Paranormal Inc — Actor Sheet
// - Archetype dropdown (alphabetical)
// - Moves as checkboxes (choose EXACTLY 2)
// - Personal Hauntings as checkboxes (start at 0, any order)
// - Works for Actor types: "character" and "npc"
// Requires: CONFIG.PIN.archetypes from module/constants.js

export class PINActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["paranormal-inc", "sheet", "actor"],
      template: "systems/paranormal_inc/templates/actor-sheet.html",
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "playbook" }]
    });
  }

  /** @override */
  async getData(options) {
    const data = await super.getData(options);

    // ---- Ensure a stable system data shape --------------------------------
    const sys = this.actor.system ?? {};
    sys.archetype ??= "scientist";
    sys.pronouns ??= "";
    sys.stats ??= { science: 0, wits: 0, vigour: 0, intuition: 0 };
    sys.vibe ??= "";
    sys.backpack ??= "";
    sys.conditions ??= "";
    sys.moves ??= { selected: [] };      // string[]
    sys.hauntings ??= {};                // { [key: string]: boolean, marked?: string[] }
    sys.hauntings.marked ??= [];
    sys.biography ??= "";
    sys.archetypeImage ??= "";

    data.system = sys;
    data.config = CONFIG.PIN ?? { archetypes: {} };

    // Current archetype config
    const arch = data.config.archetypes[sys.archetype] ?? {};
    data.arch = arch;

    // ---- Build alphabetically sorted archetype list for the dropdown ------
    const entries = Object.entries(data.config.archetypes);
    entries.sort(([, a], [, b]) =>
      (a?.label ?? "").localeCompare(b?.label ?? "", game?.i18n?.lang || "en", { sensitivity: "base" })
    );
    data.sortedArchetypes = entries.map(([key, a]) => ({ key, label: a.label }));

    // ---- Normalize move selection: EXACTLY two, valid, unique -------------
    const availMoveKeys = (arch.moves ?? []).map(m => m.key);
    let sel = Array.from(new Set((sys.moves.selected ?? []).filter(k => availMoveKeys.includes(k))));
    // Autoselect first two if fewer than 2
    for (const key of availMoveKeys) {
      if (sel.length >= 2) break;
      if (!sel.includes(key)) sel.push(key);
    }
    // If more than two somehow, trim.
    sel = sel.slice(0, 2);
    sys.moves.selected = sel;

    // Lookup map so templates can show name/text by key
    data.arch.moveMap = Object.fromEntries((arch.moves ?? []).map(m => [m.key, m]));

    // ---- Normalize hauntings: booleans + "marked" array stay in sync ------
    const availHauntingKeys = (arch.hauntings ?? []).map(h => h.key);

    // Drop stale keys from marked
    sys.hauntings.marked = (sys.hauntings.marked ?? []).filter(k => availHauntingKeys.includes(k));

    // Ensure every valid key has a boolean (default false)
    for (const k of availHauntingKeys) {
      if (typeof sys.hauntings[k] !== "boolean") sys.hauntings[k] = false;
      // Keep "marked" in sync from booleans
      if (sys.hauntings[k] && !sys.hauntings.marked.includes(k)) sys.hauntings.marked.push(k);
      if (!sys.hauntings[k] && sys.hauntings.marked.includes(k)) {
        sys.hauntings.marked = sys.hauntings.marked.filter(x => x !== k);
      }
    }
    // Remove booleans for keys not in this archetype
    for (const k of Object.keys(sys.hauntings)) {
      if (k === "marked") continue;
      if (!availHauntingKeys.includes(k)) delete sys.hauntings[k];
    }

    // CSS helper
    data.cssClass = `${data.cssClass ?? ""} arche-${sys.archetype}`;

    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // ---- Archetype change --------------------------------------------------
    html.find('[name="system.archetype"]').on("change", async (ev) => {
      const newArchKey = ev.currentTarget.value;
      const newArch = CONFIG.PIN.archetypes[newArchKey] ?? { moves: [], hauntings: [] };

      // Reset moves to first two of the new archetype
      const firstTwo = (newArch.moves ?? []).slice(0, 2).map(m => m.key);
      const updates = {
        "system.archetype": newArchKey,
        "system.moves.selected": firstTwo
      };

      // Clear all hauntings when switching archetype
      updates["system.hauntings"] = { marked: [] };
      for (const h of (newArch.hauntings ?? [])) updates[`system.hauntings.${h.key}`] = false;

      await this.actor.update(updates);
      this.render(false);
    });

    // ---- Moves: checkboxes, EXACTLY 2 selected ----------------------------
    html.on("change", ".pin-move-toggle", async (ev) => {
      const key = ev.currentTarget.dataset.move;
      const selected = new Set(this.actor.system.moves?.selected ?? []);
      const MIN = 2, MAX = 2;

      if (ev.currentTarget.checked) {
        if (selected.size >= MAX) {
          ui.notifications?.warn(`You can select exactly ${MAX} moves.`);
          ev.currentTarget.checked = false;
          return;
        }
        selected.add(key);
      } else {
        if (selected.size <= MIN) {
          ui.notifications?.warn(`You must keep ${MIN} moves selected.`);
          ev.currentTarget.checked = true;
          return;
        }
        selected.delete(key);
      }

      await this.actor.update({ "system.moves.selected": Array.from(selected) });
      this.render(false);
    });

    // ---- Personal Hauntings: independent checkboxes (start at 0) ----------
    html.on("change", ".pin-haunting", async (ev) => {
      const key = ev.currentTarget.dataset.key;
      const checked = ev.currentTarget.checked;

      // Update boolean and maintain the "marked" array for convenience
      const marked = new Set(this.actor.system.hauntings?.marked ?? []);
      if (checked) marked.add(key); else marked.delete(key);

      await this.actor.update({
        [`system.hauntings.${key}`]: checked,
        "system.hauntings.marked": Array.from(marked)
      });
    });
  }
}
