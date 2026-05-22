globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_m9eXKdnz.mjs";
import { aj as createRenderInstruction, aW as maybeRenderHead, a4 as addAttribute, b9 as renderTemplate, b5 as renderHead, b6 as renderSlot } from "./params-and-props_BhIKCyxe.mjs";
import { r as renderComponent } from "./worker-entry_D8OAs1oI.mjs";
async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}<\/script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}
const en = {
  "site.title": "BIGO BDA Platform",
  "hero.title": "Universal AGI Solution for Programmable Biomaterials",
  "hero.subtitle": "From Protein Therapeutics to Programmable Biomaterials",
  "nav.blog": "Blog",
  "nav.studio": "Protein Design Studio"
};
const zh = {
  "site.title": "BIGO BDA 平台",
  "hero.title": "可编程生物材料的通用 AGI 解决方案",
  "hero.subtitle": "从蛋白质药物到可编程生物材料",
  "nav.blog": "博客",
  "nav.studio": "蛋白质设计工作室"
};
const translations = {
  en,
  zh
};
function getTranslations(lang) {
  const t = translations[lang] || translations.en;
  return (key) => {
    return t[key] || key;
  };
}
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Navbar;
  const { lang } = Astro2.props;
  const t = getTranslations(lang);
  return renderTemplate`${maybeRenderHead()}<nav class="navbar outline" data-astro-cid-5blmo7yk> <div class="grid-container" data-astro-cid-5blmo7yk> <div class="nav-content" data-astro-cid-5blmo7yk> <div class="nav-logo" data-astro-cid-5blmo7yk> <a${addAttribute(lang === "en" ? "/" : "/zh/", "href")} class="logo-link" data-astro-cid-5blmo7yk>BIGO BDA</a> </div> <div class="nav-links desktop-only" data-astro-cid-5blmo7yk> <a href="#" class="nav-item" data-astro-cid-5blmo7yk>${t("nav.blog")}</a> <a href="#" class="nav-item" data-astro-cid-5blmo7yk>${t("nav.studio")}</a> </div> <div class="nav-actions" data-astro-cid-5blmo7yk> <div class="lang-toggle outline" data-astro-cid-5blmo7yk> <a href="/"${addAttribute(`lang-link ${lang === "en" ? "active" : ""}`, "class")} data-lang="en" data-astro-cid-5blmo7yk>EN</a> <span class="separator" data-astro-cid-5blmo7yk></span> <a href="/zh/"${addAttribute(`lang-link ${lang === "zh" ? "active" : ""}`, "class")} data-lang="zh" data-astro-cid-5blmo7yk>中文</a> </div> <button id="mobile-toggle" class="mobile-only outline" aria-label="Toggle Menu" data-astro-cid-5blmo7yk> <span class="hamburger-line" data-astro-cid-5blmo7yk></span> <span class="hamburger-line" data-astro-cid-5blmo7yk></span> <span class="hamburger-line" data-astro-cid-5blmo7yk></span> </button> </div> </div> </div> </nav> <div id="nav-overlay" data-astro-cid-5blmo7yk></div> <div id="mobile-panel" class="outline" data-astro-cid-5blmo7yk> <button id="close-panel" aria-label="Close Menu" data-astro-cid-5blmo7yk>✕</button> <div class="mobile-links" data-astro-cid-5blmo7yk> <a href="#" class="mobile-nav-item" data-astro-cid-5blmo7yk>${t("nav.blog")}</a> <a href="#" class="mobile-nav-item" data-astro-cid-5blmo7yk>${t("nav.studio")}</a> </div> </div>  ${renderScript($$result, "/mnt/e/bigo.bio/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/e/bigo.bio/src/components/Navbar.astro", void 0);
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, lang } = Astro2.props;
  return renderTemplate`<html${addAttribute(lang, "lang")}> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, { "lang": lang })} ${renderSlot($$result, $$slots["default"])} ${renderScript($$result, "/mnt/e/bigo.bio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/mnt/e/bigo.bio/src/layouts/Layout.astro", void 0);
const $$ParticleAnimation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ParticleAnimation;
  return renderTemplate`${maybeRenderHead()}<div id="particle-container" class="outline" data-astro-cid-bgcmjbfc> <canvas id="particle-canvas" data-astro-cid-bgcmjbfc></canvas> </div>  ${renderScript($$result, "/mnt/e/bigo.bio/src/components/ParticleAnimation.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/e/bigo.bio/src/components/ParticleAnimation.astro", void 0);
export {
  $$Layout as $,
  $$ParticleAnimation as a,
  getTranslations as g
};
