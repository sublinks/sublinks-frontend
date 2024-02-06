import Cookies from 'js-cookie';
import SublinksApiBase, { AUTH_COOKIE_NAME, CookieStore } from './base';

class SublinksApiClientSide extends SublinksApiBase {
  private static instance: SublinksApiClientSide;

  constructor() {
    super();
    console.log('client constructor');
    const cookieStore = {
      get: () => Cookies.get(AUTH_COOKIE_NAME),
      set: (value: string, options?: object) => Cookies.set(AUTH_COOKIE_NAME, value, options),
      remove: () => Cookies.remove(AUTH_COOKIE_NAME)
    } as CookieStore;

    console.log('client constructor setting store');
    this.setAuthCookieStore(cookieStore);
    this.setAuthHeader();
  }

  public static Instance() {
    return SublinksApiClientSide.instance ?? new SublinksApiClientSide();
  }
}

export default SublinksApiClientSide;
