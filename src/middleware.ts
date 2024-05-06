import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import SublinksApi from '@/utils/api-client/server';

export const middleware = async (request: NextRequest) => {
  const authCookie = SublinksApi.Instance().authCookieStore?.get();
  if (!authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const validation = await SublinksApi.Instance().Client().validateAuth();
  if (!validation.success) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

// Pages that require server-side authentication
export const config = {
  matcher: ['/p', '/c/create']
};
