// module/actor-sheet.js
// Paranormal Inc — Actor Sheet
// - Archetype dropdown (alphabetical)
// - Moves: 0–2 selected, free tick/untick
// - Personal Hauntings: independent checkboxes
// - +5% taller default sheet window

export class PINActorSheet extends ActorSheet {
  static get defaultOptions() {
    const base = super.defaultOptions;
    return foundry.utils.mergeObject(base, {
      classes: ["paranormal-inc", "sheet", "actor"],
      template: "systems/paranormal_inc/templates/actor-sheet.html",
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "playbook" }],
      resizable: true,
      width:  720,
      height: 810 // +5% taller
    });
  }

  /** @override */
  async getData(options) {
    const data = await super.getData(options);

    // Stable system shape
    const sys = this.actor.system ?? {};
    sys.archetype ??= "scientist";
    sys.pronouns ??= "";
    sys.stats ??= { science: 0, wits: 0, vigour: 0, intuition: 0 };
    sys.vibe ??= "";
    sys.backpack ??= "";
    sys.conditions ??= "";
    sys.moves ??= { selected: [] }; // string[]
    sys.hauntings ??= {};           // { [key]: boolean, marked: string[] }
    sys.hauntings.marked ??= [];
    sys.biography ??= "";
    sys.archetypeImage ??= "";

    data.system = sys;
    data.config = CONFIG.PIN ?? { archetypes: {} };

    // Current archetype config
    const arch = data.config.archetypes[sys.archetype] ?? {};
    data.arch = arch;

    // Sorted archetype list for the dropdown
    const entries = Object.entries(data.config.archetypes);
    entries.sort(([, a], [, b]) =>
      (a?.label ?? "").localeCompare(b?.label ?? "", game?.i18n?.lang || "en", { sensitivity: "base" })
    );
    data.sortedArchetypes = entries.map(([key, a]) => ({ key, label: a.label }));

    // ---- Moves: keep valid & unique, cap at 2 (no auto-fill) --------------
    const availMoveKeys = (arch.moves ?? []).map(m => m.key);
    sys.moves.selected = Array.from(
      new Set((sys.moves.selected ?? []).filter(k => availMoveKeys.includes(k)))
    ).slice(0, 2);

    // Lookup map for template
    data.arch.moveMap = Object.fromEntries((arch.moves ?? []).map(m => [m.key, m]));

    // ---- Hauntings: normalize booleans + "marked" array -------------------
    const availHauntingKeys = (arch.hauntings ?? []).map(h => h.key);
    sys.hauntings.marked = (sys.hauntings.marked ?? []).filter(k => availHauntingKeys.includes(k));

    for (const k of availHauntingKeys) {
      if (typeof sys.hauntings[k] !== "boolean") sys.hauntings[k] = false;
      if (sys.hauntings[k] && !sys.hauntings.marked.includes(k)) sys.hauntings.marked.push(k);
      if (!sys.hauntings[k] && sys.hauntings.marked.includes(k)) {
        sys.hauntings.marked = sys.hauntings.marked.filter(x => x !== k);
      }
    }
    for (const k of Object.keys(sys.hauntings)) {
      if (k === "marked") continue;
      if (!availHauntingKeys.includes(k)) delete sys.hauntings[k];
    }

    data.cssClass = `${data.cssClass ?? ""} arche-${sys.archetype}`;
    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Archetype change: reset moves to none; clear hauntings
    html.find('[name="system.archetype"]').on("change", async (ev) => {
      const newArchKey = ev.currentTarget.value;
      const newArch = CONFIG.PIN.archetypes[newArchKey] ?? { moves: [], hauntings: [] };

      const updates = {
        "system.archetype": newArchKey,
        "system.moves.selected": []   // start with none selected again
      };

      updates["system.hauntings"] = { marked: [] };
      for (const h of (newArch.hauntings ?? [])) updates[`system.hauntings.${h.key}`] = false;

      await this.actor.update(updates);
      this.render(false);
    });

    // Moves: up to 2 selected; allow uncheck any time
    html.on("change", ".pin-move-toggle", async (ev) => {
      const key = ev.currentTarget.dataset.move;
      const selected = new Set(this.actor.system.moves?.selected ?? []);
      const MAX = 2;

      if (ev.currentTarget.checked) {
        if (selected.size >= MAX) {
          ui.notifications?.warn(`You can select up to ${MAX} moves.`);
          ev.currentTarget.checked = false;
          return;
        }
        selected.add(key);
      } else {
        selected.delete(key); // no minimum
      }

      await this.actor.update({ "system.moves.selected": Array.from(selected) });
      this.render(false);
    });

    // Personal Hauntings: independent checkboxes
    html.on("change", ".pin-haunting", async (ev) => {
      const key = ev.currentTarget.dataset.key;
      const checked = ev.currentTarget.checked;

      const marked = new Set(this.actor.system.hauntings?.marked ?? []);
      if (checked) marked.add(key); else marked.delete(key);

      await this.actor.update({
        [`system.hauntings.${key}`]: checked,
        "system.hauntings.marked": Array.from(marked)
      });
    });
  }
}
