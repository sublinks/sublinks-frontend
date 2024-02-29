import Cookies from 'js-cookie';

import SublinksApiBase, { AUTH_COOKIE_NAME, CookieStore } from './base';
import logger from '../logger';

class SublinksApiClientSide extends SublinksApiBase {
  private static instance: SublinksApiClientSide;

  constructor() {
    super();

    const cookieStore = {
      get: () => {
        try {
          return Cookies.get(AUTH_COOKIE_NAME);
        } catch (e) {
          logger.error('Failed to get client auth cookie', e);
          return undefined;
        }
      },
      set: (value: string, options?: object) => {
        try {
          Cookies.set(AUTH_COOKIE_NAME, value, options);
        } catch (e) {
          logger.error('Failed to set client auth cookie', e);
        }
      },
      remove: () => {
        try {
          Cookies.remove(AUTH_COOKIE_NAME);
        } catch (e) {
          logger.error('Failed to remove client auth cookie', e);
        }
      }
    } as CookieStore;

    this.setAuthCookieStore(cookieStore);
  }

  public static Instance() {
    return SublinksApiClientSide.instance ?? new SublinksApiClientSide();
  }
}

export default SublinksApiClientSide;
