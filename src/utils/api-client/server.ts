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

    // If user auth has been invalidate client-side we're also logging them out server-side
    // @todo: validateAuth is not yet supported by Sublinks backend. Re-test this when backend is updated.
    if (!authCookie && currentInstance.hasValidAuth) {
      currentInstance.client.validateAuth().catch(() => {
        console.info('User auth has been invalidated. Logging user out server-side.');
        currentInstance.logout();
      });
    }

    return currentInstance;
  }
}

export default SublinksApiServerSide;
