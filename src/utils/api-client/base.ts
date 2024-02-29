import { SublinksClient } from 'sublinks-js-client';

import logger from '../logger';

export const AUTH_COOKIE_NAME = 'auth';
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
  private client: SublinksClient;

  protected hasValidAuth = false;

  public authCookieStore: CookieStore | null = null;

  constructor() {
    this.client = new SublinksClient(getApiHost(), { insecure: process.env.NODE_ENV !== 'production' });
  }

  public setAuthCookieStore(store: CookieStore) {
    this.authCookieStore = store;
  }

  public async setAuthHeader() {
    const jwtAuth = this.authCookieStore?.get();

    if (jwtAuth) {
      try {
        await this.client.setAuth(jwtAuth);
        this.hasValidAuth = true;
      } catch (e) {
        logger.error('Failed to set auth header', e);
      }
    }
  }

  public async login(username: string, password: string) {
    try {
      const { jwt } = await this.client.login({
        username_or_email: username,
        password
      });

      if (!jwt) {
        throw Error('JWT not returned from server');
      }

      this.authCookieStore?.set(jwt, {
        expires: new Date(Date.now() + AUTH_TTL_MS),
        secure: process.env.NEXT_PUBLIC_HTTPS_ENABLED ?? false,
        path: '/',
        sameSite: 'Lax'
      });
    } catch (e) {
      logger.error('Failed to login user', e);
    }
  }

  public async logout() {
    if (!this.hasValidAuth) {
      return;
    }

    this.hasValidAuth = false;

    try {
      await this.client.logout();
      this.authCookieStore?.remove();
    } catch (e) {
      logger.error('Failed to logout user', e);
    }
  }

  public Client() {
    if (!this.hasValidAuth) {
      this.setAuthHeader();
    }

    return this.client;
  }
}

export default SublinksApiBase;
