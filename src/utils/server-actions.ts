'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import SublinksApi from '@/utils/api-client/server';

export const revalidateAll = () => {
  revalidatePath('/', 'layout');
};

export const revalidateAllAndRedirect = (redirectPath: string) => {
  revalidateAll();
  redirect(redirectPath);
};

export const saveAuthOnServer = (jwt: string) => SublinksApi.Instance().saveAndSetJwt(jwt);

export const removeAuthOnServer = () => {
  SublinksApi.Instance().authCookieStore?.remove();
  SublinksApi.Instance().logout();
};
