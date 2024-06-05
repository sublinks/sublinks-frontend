'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import SublinksApi from '@/utils/api-client/server';

export const revalidateAllAndRedirect = (redirectPath: string) => {
  revalidatePath('/', 'layout');
  redirect(redirectPath);
};

export const saveAuthOnServer = (jwt: string) => SublinksApi.Instance().saveAndSetJwt(jwt);

export const removeAuthOnServer = () => {
  SublinksApi.Instance().authCookieStore?.remove();
  SublinksApi.Instance().logout();
};
