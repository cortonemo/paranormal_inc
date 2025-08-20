// Paranormal Inc — Actor Sheet (PC + NPC) — HOTFIX
export class PINActorSheet extends ActorSheet {
  static get defaultOptions() {
    const base = super.defaultOptions;
    return foundry.utils.mergeObject(base, {
      classes: ["paranormal-inc", "sheet", "actor"],
      // default fallback; real selection happens in get template()
      template: `systems/${game.system?.id ?? "paranormal_inc"}/templates/actor-sheet.html`,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "playbook" }],
      resizable: true,
      width: 720,
      height: 810
    });
  }

  // Choose the template by actor type using the actual system id
  get template() {
    const base = `systems/${game.system?.id ?? "paranormal_inc"}/templates`;
    return this.actor.type === "npc" ? `${base}/npc-sheet.html` : `${base}/actor-sheet.html`;
  }

  async getData(options) {
    const data = await super.getData(options);
    const sys = this.actor.system ?? {};

    // NPC normalization
    if (this.actor.type === "npc") {
      sys.role ??= "";
      sys.look ??= [];
      if (typeof sys.lookCsv === "string" && sys.lookCsv.trim().length) {
        sys.look = sys.lookCsv.split(",").map(s => s.trim()).filter(Boolean);
      }
      sys.quote ??= "";
      sys.where ??= "";
      sys.status ??= "neutral";
      sys.connections ??= [];
      sys.notesGM ??= "";
    }

    // PC normalization & archetype logic
    if (this.actor.type !== "npc") {
      sys.archetype ??= "scientist";
      sys.pronouns ??= "";
      sys.stats ??= { science: 0, wits: 0, vigour: 0, intuition: 0 };
      sys.vibe ??= "";
      sys.backpack ??= "";
      sys.conditions ??= "";
      sys.moves ??= { selected: [] };
      sys.hauntings ??= {};
      sys.hauntings.marked ??= [];
      sys.biography ??= "";
      sys.archetypeImage ??= "";

      data.config = CONFIG.PIN ?? { archetypes: {} };
      const arch = data.config.archetypes?.[sys.archetype] ?? {};
      data.arch = arch;

      const entries = Object.entries(data.config.archetypes ?? {});
      entries.sort(([, a], [, b]) =>
        (a?.label ?? "").localeCompare(b?.label ?? "", game?.i18n?.lang || "en", { sensitivity: "base" })
      );
      data.sortedArchetypes = entries.map(([key, a]) => ({ key, label: a.label }));

      const availMoveKeys = (arch.moves ?? []).map(m => m.key);
      sys.moves.selected = Array.from(new Set((sys.moves.selected ?? []).filter(k => availMoveKeys.includes(k)))).slice(0, 2);
      data.arch.moveMap = Object.fromEntries((arch.moves ?? []).map(m => [m.key, m]));

      const availHauntingKeys = (arch.hauntings ?? []).map(h => h.key);
      sys.hauntings.marked = (sys.hauntings.marked ?? []).filter(k => availHauntingKeys.includes(k));
      for (const k of availHauntingKeys) {
        if (typeof sys.hauntings[k] !== "boolean") sys.hauntings[k] = false;
        if (sys.hauntings[k] && !sys.hauntings.marked.includes(k)) sys.hauntings.marked.push(k);
        if (!sys.hauntings[k] && sys.hauntings.marked.includes(k)) sys.hauntings.marked = sys.hauntings.marked.filter(x => x !== k);
      }
      for (const k of Object.keys(sys.hauntings)) {
        if (k !== "marked" && !availHauntingKeys.includes(k)) delete sys.hauntings[k];
      }
    }

    data.system = sys;
    return data;
  }
}
