import { SublinksClient } from 'sublinks-js-client';

import logger from '../logger';

export const AUTH_COOKIE_NAME = 'jwt';
const AUTH_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 365 days

export interface CookieStore {
  get: () => string;
  set: (value: string, options?: object) => void;
  remove: () => void;
}

const isServerSide = () => typeof window === 'undefined';

const getApiHost = () => {
  const envUrl = isServerSide()
    ? process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
    : process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_PUBLIC_URL;

  return envUrl || 'localhost:8080';
};

class SublinksApiBase {
  public authCookieStore: CookieStore | null = null;

  protected client: SublinksClient;

  private rawClient: SublinksClient;

  constructor() {
    this.rawClient = new SublinksClient(getApiHost(), {
      insecure: process.env.NEXT_PUBLIC_HTTPS_ENABLED !== 'true'
    });
    this.client = this.getWrappedClient();
  }

  public setAuthCookieStore(store: CookieStore) {
    this.authCookieStore = store;
  }

  public async setAuthHeader(jwtToken: string) {
    try {
      this.rawClient.setAuth(jwtToken);
    } catch (e) {
      logger.error('Failed to set auth header', e);
    }
  }

  public async login(username: string, password: string) {
    try {
      const { jwt } = await this.rawClient.login({
        username_or_email: username,
        password
      });

      if (!jwt) {
        throw Error('JWT not returned from server');
      }

      this.authCookieStore?.set(jwt, {
        expires: new Date(Date.now() + AUTH_TTL_MS),
        secure: process.env.NEXT_PUBLIC_HTTPS_ENABLED === 'true',
        path: '/',
        sameSite: 'Lax'
      });
      this.setAuthHeader(jwt);
    } catch (e) {
      logger.error('Failed to login user', e);
      throw e;
    }
  }

  public async logout() {
    try {
      await this.rawClient.logout();
    } catch (e) {
      logger.error('Failed to logout user', e);
    } finally {
      this.clearAuth();
    }
  }

  public Client() {
    return this.client;
  }

  private clearAuth() {
    if (!isServerSide()) {
      this.authCookieStore?.remove();
    }

    this.rawClient.setHeaders({});
  }

  private getWrappedClient() {
    const validateAndUpdateAuth = async (authCookie?: string) => {
      try {
        const site = await this.rawClient.getSite();
        const userIsAuthenticated = Boolean(site.my_user);

        if (authCookie && userIsAuthenticated) {
          this.setAuthHeader(authCookie);
        } else if (this.rawClient.headers.Authorization) {
          this.clearAuth();
        }
      } catch (e) {
        logger.debug('Failed to determine user auth status', e);
      }
    };

    const wrappedClient = {} as SublinksClient;

    Object.getOwnPropertyNames(Object.getPrototypeOf(this.rawClient)).forEach(name => {
      // @ts-expect-error: TS can't find a matching index signature
      const classProp = this.rawClient[name];

      if (typeof classProp === 'function') {
        // @ts-expect-error: TS can't find a matching index signature
        wrappedClient[name] = async (...args: unknown[]) => {
          const authCookie = this.authCookieStore?.get();

          if (authCookie && !this.rawClient.headers.Authorization) {
            await validateAndUpdateAuth(authCookie);
          }

          try {
            // @ts-expect-error: TS can't find a matching index signature
            return this.rawClient[name](...args);
          } catch (e) {
            const error = e as Error;
            if (error.message === 'Unauthorized' && this.rawClient.headers.Authorization) {
              logger.debug('Validating auth following unauthorized API response', e);
              await validateAndUpdateAuth(authCookie);
            }
            throw e;
          }
        };
      }
    });

    return wrappedClient;
  }
}

export default SublinksApiBase;
