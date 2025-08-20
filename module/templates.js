// module/templates.js
// Paranormal Inc — Handlebars helpers & preloader (robust, with 'includes')

export const registerHandlebarsHelpers = () => {
  // join: join arrays with a separator
  Handlebars.registerHelper("join", (arr, sep) => Array.isArray(arr) ? arr.join(sep) : "");

  // eq: strict equality
  Handlebars.registerHelper("eq", (a, b) => a === b);

  // includes: supports both subexpression and block usage
  // {{#if (includes array value)}} ... {{/if}}
  // {{#includes array value}} ... {{else}} ... {{/includes}}
  Handlebars.registerHelper("includes", function(arr, val, options) {
    const has = Array.isArray(arr)
      ? arr.includes(val)
      : (typeof arr === "string" ? arr.includes(String(val)) : false);

    // block form support
    if (options && typeof options === "object" && typeof options.fn === "function") {
      return has ? options.fn(this) : (typeof options.inverse === "function" ? options.inverse(this) : "");
    }
    // subexpression form
    return has;
  });

  // small logic helpers some templates use
  Handlebars.registerHelper("not", (v) => !v);
  Handlebars.registerHelper("and", (a, b) => a && b);
  Handlebars.registerHelper("or", (a, b) => a || b);

  // partialPath: normalize short partial paths to absolute system paths
  // Allows {{> (partialPath arch.partial) }}
  Handlebars.registerHelper("partialPath", (p) => {
    const base = `systems/${game.system?.id ?? "paranormal_inc"}/templates`;
    if (!p || typeof p !== "string") return "";
    if (p.startsWith("systems/") || p.startsWith("/")) return p;
    const clean = p.replace(/^\.?\/?templates\/?/, "");
    return `${base}/${cle
