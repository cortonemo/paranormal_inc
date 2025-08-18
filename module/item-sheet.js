// module/item-sheet.js
export class PINItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["paranormal-inc", "sheet", "item"],
      template: "systems/paranormal_inc/templates/item-sheet.html"
    });
  }

  async getData(options) {
    const data = await super.getData(options);
    return data;
  }
}