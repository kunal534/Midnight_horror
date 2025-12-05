import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Try multiple sources for country detection
  const country = 
    request.geo?.country || // Vercel geo
    request.headers.get('cf-ipcountry') || // Cloudflare
    request.headers.get('x-vercel-ip-country') || // Vercel header
    'US'; // Fallback
  
  // If already on /in route, continue
  if (url.pathname.startsWith('/in')) {
    return NextResponse.next();
  }
  
  // Redirect Indian users to /in version
  if (country === 'IN' && url.pathname.startsWith('/affiliate')) {
    url.pathname = '/in' + url.pathname;
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/affiliate/:path*'],
};
