import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, redirect } = context;
  
  // Only redirect the root path
  if (url.pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language');
    
    if (acceptLanguage && acceptLanguage.toLowerCase().includes('zh')) {
      // Check if user has a cookie or if we should just redirect
      // For now, let's just do a simple detection
      // Note: In production, you might want to check a 'preferred-lang' cookie first
      return redirect('/zh/', 302);
    }
  }
  
  return next();
});
