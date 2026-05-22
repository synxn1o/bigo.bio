globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_m9eXKdnz.mjs";
import { b9 as renderTemplate, aW as maybeRenderHead } from "./params-and-props_BhIKCyxe.mjs";
import { r as renderComponent } from "./worker-entry_D8OAs1oI.mjs";
import { $ as $$Layout, g as getTranslations, a as $$ParticleAnimation } from "./ParticleAnimation_bRggV7HS.mjs";
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const lang = "zh";
  const t = getTranslations(lang);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("site.title"), "lang": lang, "data-astro-cid-yg6xhirs": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="grid-container" style="padding-bottom: 4rem;" data-astro-cid-yg6xhirs> <div class="grid-item" style="margin-top: 10rem; display: flex; flex-direction: column; gap: 4rem;" data-astro-cid-yg6xhirs> <div style="display: flex; flex-direction: column; gap: 2rem;" data-astro-cid-yg6xhirs> <h1 class="text-swiss-red hero-title" data-astro-cid-yg6xhirs>${t("hero.title")}</h1> <p class="hero-subtitle" data-astro-cid-yg6xhirs>${t("hero.subtitle")}</p>
...
</div>  <div style="display: flex; gap: 1rem;" data-astro-cid-yg6xhirs> <button class="bg-swiss-red outline" style="padding: 1.25rem 2.5rem; font-weight: 800; cursor: pointer; letter-spacing: 0.05em; font-size: 1rem;" data-astro-cid-yg6xhirs>
立即开始
</button> <button class="outline" style="padding: 1.25rem 2.5rem; font-weight: 800; cursor: pointer; letter-spacing: 0.05em; font-size: 1rem; background: transparent;" data-astro-cid-yg6xhirs>
了解更多
</button> </div> </div> <div class="grid-item" data-astro-cid-yg6xhirs> ${renderComponent($$result2, "ParticleAnimation", $$ParticleAnimation, { "data-astro-cid-yg6xhirs": true })} </div> </main> ` })}`;
}, "/mnt/e/bigo.bio/src/pages/zh/index.astro", void 0);
const $$file = "/mnt/e/bigo.bio/src/pages/zh/index.astro";
const $$url = "/zh";
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
