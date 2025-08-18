export class PINActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["paranormal-inc", "sheet", "actor"],
      template: "systems/paranormal_inc/templates/actor-sheet.html",
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "playbook"}]
    });
  }
  async getData(options) {
    const data = await super.getData(options);
    const sys = this.actor.system ?? {};
    sys.archetype ??= "scientist";
    sys.moves ??= { selected: [] };
    sys.stats ??= { science: 0, wits: 0, vigour: 0, intuition: 0 };
    sys.hauntings ??= {};
    data.system = sys;
    data.config = CONFIG.PIN;
    data.arch = CONFIG.PIN.archetypes[sys.archetype] ?? {};
    data.cssClass = `${data.cssClass ?? ""} arche-${sys.archetype}`;
    return data;
  }
  activateListeners(html) {
    super.activateListeners(html);
    html.find('[name="system.archetype"]').on("change", async ev => {
      await this.actor.update({"system.archetype": ev.currentTarget.value});
      this.render(false);
    });
    html.on("change", ".pin-move-toggle", async ev => {
      const key = ev.currentTarget.dataset.move;
      const selected = new Set(this.actor.system.moves?.selected ?? []);
      const max = 2;
      if (ev.currentTarget.checked) {
        if (selected.size >= max) {
          ui.notifications?.warn(`You can only choose ${max} moves.`);
          ev.currentTarget.checked = false;
          return;
        }
        selected.add(key);
      } else selected.delete(key);
      await this.actor.update({"system.moves.selected": Array.from(selected)});
    });
    html.on("change", ".pin-haunting", async ev => {
      const key = ev.currentTarget.dataset.key;
      await this.actor.update({[`system.hauntings.${key}`]: ev.currentTarget.checked});
    });
  }
}
