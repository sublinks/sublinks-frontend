import { cookies } from 'next/headers';

const cookieStore = cookies();

export default {
  ...cookieStore,
  get: (cookieName: string) => cookieStore.get(cookieName)?.value
};
