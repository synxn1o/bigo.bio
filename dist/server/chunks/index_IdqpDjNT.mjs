globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_C9fyLOBE.mjs";
import { i as addAttribute, n as renderHead, o as renderTemplate } from "./worker-entry_DvGFab_1.mjs";
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>BIGO BDA Platform</title>${renderHead()}</head> <body> <h1>BIGO BDA Platform - Under Construction</h1> <p>Swiss Red design system initialization in progress...</p> </body></html>`;
}, "/mnt/e/bigo.bio/src/pages/index.astro", void 0);
const $$file = "/mnt/e/bigo.bio/src/pages/index.astro";
const $$url = "";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
