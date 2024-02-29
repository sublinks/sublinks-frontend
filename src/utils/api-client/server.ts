import { cookies } from 'next/headers';

import SublinksApiBase, { AUTH_COOKIE_NAME, CookieStore } from './base';
import logger from '../logger';

class SublinksApiServerSide extends SublinksApiBase {
  private static instance: SublinksApiServerSide;

  constructor() {
    super();

    const nextCookies = cookies();
    const cookieStore = {
      get: () => {
        try {
          return nextCookies.get(AUTH_COOKIE_NAME)?.value;
        } catch (e) {
          logger.error('Failed to get server auth cookie', e);
          return undefined;
        }
      },
      set: (value: string, options?: object) => {
        try {
          nextCookies.set(AUTH_COOKIE_NAME, value, {
            ...options,
            httpOnly: true
          });
        } catch (e) {
          logger.error('Failed to set server auth cookie', e);
        }
      },
      remove: () => {
        try {
          nextCookies.delete(AUTH_COOKIE_NAME);
        } catch (e) {
          logger.error('Failed to remove server auth cookie', e);
        }
      }
    } as CookieStore;

    this.setAuthCookieStore(cookieStore);
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
