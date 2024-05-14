import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { AUTH_COOKIE_NAME } from '@/utils/api-client/base';
import SublinksApi from '@/utils/api-client/server';

export const middleware = async (request: NextRequest) => {
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);
  if (!authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const validation = await SublinksApi.Instance().Client().validateAuth();
  if (!validation.success) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

// Pages that require server-side user authentication
export const config = {
  matcher: ['/p', '/c/create']
};
