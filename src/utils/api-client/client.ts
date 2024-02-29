import Cookies from 'js-cookie';
import SublinksApiBase, { AUTH_COOKIE_NAME, CookieStore } from './base';

class SublinksApiClientSide extends SublinksApiBase {
  private static instance: SublinksApiClientSide;

  constructor() {
    super();

    const cookieStore = {
      get: () => Cookies.get(AUTH_COOKIE_NAME),
      set: (value: string, options?: object) => Cookies.set(AUTH_COOKIE_NAME, value, options),
      remove: () => Cookies.remove(AUTH_COOKIE_NAME)
    } as CookieStore;

    this.setAuthCookieStore(cookieStore);
  }

  public static Instance() {
    return SublinksApiClientSide.instance ?? new SublinksApiClientSide();
  }
}

export default SublinksApiClientSide;
