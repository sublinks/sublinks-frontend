import { cookies } from 'next/headers';
import SublinksApiBase, { AUTH_COOKIE_NAME, CookieStore } from './base';

class SublinksApiServerSide extends SublinksApiBase {
  private static instance: SublinksApiServerSide;

  constructor() {
    super();

    const nextCookies = cookies();
    const cookieStore = {
      get: () => nextCookies.get(AUTH_COOKIE_NAME)?.value,
      set: (value: string, options?: object) => nextCookies.set(AUTH_COOKIE_NAME, value, {
        ...options,
        httpOnly: true
      }),
      remove: () => nextCookies.delete(AUTH_COOKIE_NAME)
    } as CookieStore;

    this.setAuthCookieStore(cookieStore);
    this.setAuthHeader();
  }

  public static Instance() {
    const currentInstance = SublinksApiServerSide.instance ?? new SublinksApiServerSide();
    const authCookie = currentInstance.authCookieStore?.get();

    // If user has been logged out client-side we're also logging them out server-side
    if (!authCookie && currentInstance.hasValidAuth) {
      currentInstance.logout();
    }

    return currentInstance;
  }
}

export default SublinksApiServerSide;
