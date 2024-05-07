import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import SublinksApi from '@/utils/api-client/server';

export const middleware = async (request: NextRequest) => {
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
