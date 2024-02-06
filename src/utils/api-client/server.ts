import { cookies } from 'next/headers';
import SublinksApiBase, { AUTH_COOKIE_NAME, CookieStore } from './base';

class SublinksApiServerSide extends SublinksApiBase {
  private static instance: SublinksApiServerSide;

  constructor() {
    super();

    const nextCookies = cookies();
    const cookieStore = {
      get: () => nextCookies.get(AUTH_COOKIE_NAME)?.value,
      set: (value: string, options?: object) => nextCookies.set(AUTH_COOKIE_NAME, value, options),
      remove: () => nextCookies.delete(AUTH_COOKIE_NAME)
    } as CookieStore;

    this.setAuthCookieStore(cookieStore);
    this.setAuthHeader();
  }

  public static Instance() {
    return SublinksApiServerSide.instance ?? new SublinksApiServerSide();
  }
}

export default SublinksApiServerSide;
