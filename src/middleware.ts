import { NextResponse } from 'next/server';
import SublinksApi from '@/utils/api-client/server';

export const middleware = async () => {
  // Check auth header for server

  const site = await SublinksApi.Instance().Client().getSite();
  console.log(site);

  return NextResponse.next();
};
