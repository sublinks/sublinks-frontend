import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import SublinksApi from '@/utils/api-client/server';
import { AUTH_COOKIE_NAME } from '@/utils/api-client/base';

const RestrictedPage = async (page: React.JSX.Element) => {
  const authCookie = cookies().get(AUTH_COOKIE_NAME);
  if (!authCookie?.value) {
    redirect('/login');
  }

  const validation = await SublinksApi.Instance().Client().validateAuth();
  if (!validation.success) {
    redirect('/login');
  }

  return page;
};

export default RestrictedPage;
