// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const country =
    request.geo?.country ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-vercel-ip-country') ||
    'US';

  const res = NextResponse.next();
  // expose country to the app layer
  res.headers.set('x-user-country', country);
  return res;
}

export const config = {
  matcher: ['/affiliate/:path*'],
};
