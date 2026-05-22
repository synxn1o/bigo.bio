import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, redirect, cookies } = context;
  
  // Only redirect the root path '/'
  if (url.pathname === '/') {
    const preferredLang = cookies.get('preferred-lang')?.value;
    
    // If user has a manual preference, honor it
    if (preferredLang === 'en') {
      return next();
    }
    if (preferredLang === 'zh') {
      return redirect('/zh/', 302);
    }

    // No manual preference, fallback to browser headers
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage && acceptLanguage.toLowerCase().includes('zh')) {
      return redirect('/zh/', 302);
    }
  }
  
  return next();
});
