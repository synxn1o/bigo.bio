globalThis.process ??= {};
globalThis.process.env ??= {};
import { a8 as defineMiddleware, aY as sequence } from "./chunks/params-and-props_D9BkWLYd.mjs";
const onRequest$1 = defineMiddleware(async (context, next) => {
  const { url, request, redirect, cookies } = context;
  if (url.pathname === "/") {
    const preferredLang = cookies.get("preferred-lang")?.value;
    if (preferredLang === "en") {
      return next();
    }
    if (preferredLang === "zh") {
      return redirect("/zh/", 302);
    }
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage && acceptLanguage.toLowerCase().includes("zh")) {
      return redirect("/zh/", 302);
    }
  }
  return next();
});
const onRequest = sequence(
  onRequest$1
);
export {
  onRequest
};
