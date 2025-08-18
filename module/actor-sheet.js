// module/actor-sheet.js
// Paranormal Inc — Actor Sheet
// - Archetype dropdown (alphabetical)
// - Moves as checkboxes (choose exactly 2)
// - Personal Hauntings multi-select
// Requires: CONFIG.PIN.archetypes defined in module/constants.js

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

    // --- Ensure system data shape -----------------------------------------
    const sys = this.actor.system ?? {};
    sys.archetype ??= "scientist";
    sys.pronouns ??= "";
    sys.stats ??= { science: 0, wits: 0, vigour: 0, intuition: 0 };
    sys.vibe ??= "";
    sys.backpack ??= "";
    sys.conditions ??= "";
    sys.moves ??= { selected: [] };          // selected: string[]
    sys.hauntings ??= { marked: [] };        // marked: string[]
    sys.biography ??= "";
    sys.archetypeImage ??= "";

    data.system = sys;
    data.config = CONFIG.PIN ?? { archetypes: {} };

    // Current archetype config
    const arch = data.config.archetypes[sys.archetype] ?? {};
    data.arch = arch;

    // Sorted archetypes for dropdown
    const entries = Object.entries(data.config.archetypes);
    entries.sort(([, a], [, b]) =>
      (a?.label ?? "").localeCompare(b?.label ?? "", game?.i18n?.lang || "en", { sensitivity: "base" })
    );
    data.sortedArchetypes = entries.map(([key, a]) => ({ key, label: a.label }));

    // Normalize move selection to valid keys only
    const availMoveKeys = (arch.moves ?? []).map(m => m.key);
    sys.moves.selected = Array.from(
      new Set((sys.moves.selected ?? []).filter(k => availMoveKeys.includes(k)))
    );

    // Build a quick lookup for the template to show move text by key
    data.arch.moveMap = Object.fromEntries((arch.moves ?? []).map(m => [m.key, m]));

    // Normalize hauntings: strip invalid keys
    const availHauntingKeys = (arch.hauntings ?? []).map(h => h.key);
    sys.hauntings.marked = (sys.hauntings.marked ?? []).filter(k => availHauntingKeys.includes(k));

    // CSS helper
    data.cssClass = `${data.cssClass ?? ""} arche-${sys.archetype}`;

    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Change archetype
    html.find('[name="system.archetype"]').on("change", async (ev) => {
      await this.actor.update({ "system.archetype": ev.currentTarget.value });
      this.render(false);
    });

    // --- Moves: checkboxes, exactly 2 selected ----------------------------
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
      // Re-render to refresh the "Chosen Moves" text (if you show it)
      this.render(false);
    });

    // --- Personal Hauntings: multi-select ---------------------------------
    html.on("change", ".pin-hauntings-select", async (ev) => {
      const values = Array.from(ev.currentTarget.selectedOptions).map((o) => o.value);
      const arch = CONFIG.PIN.archetypes[this.actor.system.archetype] ?? {};
      const updates = { "system.hauntings.marked": values };

      // Also mirror per-haunting boolean flags if you want to query them elsewhere
      for (const h of arch.hauntings ?? []) {
        updates[`system.hauntings.${h.key}`] = values.includes(h.key);
      }

      await this.actor.update(updates);
    });
  }
}
