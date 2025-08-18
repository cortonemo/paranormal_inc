// module/actor-sheet.js
export class PINActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["paranormal-inc", "sheet", "actor"],
      template: "systems/paranormal_inc/templates/actor-sheet.html",
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "playbook" }]
    });
  }

  async getData(options) {
    const data = await super.getData(options);
    const sys = this.actor.system ?? {};
    sys.archetype ??= "scientist";
    sys.moves ??= { selected: [] };
    sys.stats ??= { science: 0, wits: 0, vigour: 0, intuition: 0 };
    sys.hauntings ??= { marked: [] };

    data.system = sys;
    data.config = CONFIG.PIN;
    data.arch   = CONFIG.PIN.archetypes[sys.archetype] ?? {};

    // Ensure 2 valid, unique selected moves.
    const avail = (data.arch.moves ?? []).map(m => m.key);
    let sel = Array.from(new Set((sys.moves.selected ?? []).filter(k => avail.includes(k))));
    while (sel.length < 2 && avail[sel.length]) {
      const k = avail[sel.length];
      if (!sel.includes(k)) sel.push(k); else break;
    }
    sys.moves.selected = sel;

    // Map for template lookups (name + text by key)
    data.arch.moveMap = Object.fromEntries((data.arch.moves ?? []).map(m => [m.key, m]));

    data.cssClass = `${data.cssClass ?? ""} arche-${sys.archetype}`;
	// Build alphabetically sorted archetype list for the dropdown
	const entries = Object.entries(CONFIG.PIN.archetypes);
	entries.sort(([, a], [, b]) =>
	  a.label.localeCompare(b.label, game?.i18n?.lang || "en", { sensitivity: "base" })
	);
	data.sortedArchetypes = entries.map(([key, arch]) => ({ key, label: arch.label }));
    
	return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find('[name="system.archetype"]').on("change", async ev => {
      await this.actor.update({ "system.archetype": ev.currentTarget.value });
      this.render(false);
    });

    // Two dropdowns for moves; keep them different.
    html.on("change", ".pin-move-select", async ev => {
      const idx    = Number(ev.currentTarget.dataset.index);
      const newKey = ev.currentTarget.value;
      const arch   = CONFIG.PIN.archetypes[this.actor.system.archetype] ?? {};
      const avail  = (arch.moves ?? []).map(m => m.key);

      let sel = Array.from(this.actor.system.moves?.selected ?? []);
      if (!avail.includes(newKey)) return;

      sel[idx] = newKey;

      // If both are identical, adjust the other to the first available different.
      if (sel[0] && sel[1] && sel[0] === sel[1]) {
        const replacement = avail.find(k => !sel.includes(k)) ?? "";
        sel[1 - idx] = replacement;
        ui.notifications?.warn("Moves must be different; adjusted the other slot.");
      }

      await this.actor.update({ "system.moves.selected": sel });
      this.render(false);
    });

    // Multi-select for personal hauntings. Selected = marked.
    html.on("change", ".pin-hauntings-select", async ev => {
      const values = Array.from(ev.currentTarget.selectedOptions).map(o => o.value);
      const arch   = CONFIG.PIN.archetypes[this.actor.system.archetype] ?? {};
      const updates = { "system.hauntings.marked": values };
      for (const h of (arch.hauntings ?? [])) {
        updates[`system.hauntings.${h.key}`] = values.includes(h.key);
      }
      await this.actor.update(updates);
    });
  }
}
