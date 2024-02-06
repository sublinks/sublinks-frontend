import { SublinksClient } from 'sublinks-js-client';

export const AUTH_COOKIE_NAME = 'auth';

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

  private hasValidAuth = false;

  public authCookieStore: CookieStore | null = null;

  constructor() {
    this.client = new SublinksClient(getApiHost(), { insecure: process.env.NODE_ENV !== 'production' });
  }

  public setAuthCookieStore(store: CookieStore) {
    this.authCookieStore = store;
  }

  public setAuthHeader() {
    const jwtAuth = this.authCookieStore?.get();

    if (jwtAuth) {
      this.client.setAuth(jwtAuth);
      this.hasValidAuth = true;
    }
  }

  public async login(username: string, password: string) {
    const { jwt } = await this.client.login({
      username_or_email: username,
      password
    });

    if (!jwt) {
      throw Error('JWT not returned from server');
    }

    this.authCookieStore?.set(jwt, {
      secure: window.location.protocol.includes('https'),
      path: '/',
      sameSite: 'lax'
    });
  }

  public async logout() {
    if (!this.hasValidAuth) {
      return;
    }

    this.hasValidAuth = false;
    this.authCookieStore?.remove();
    await this.client.logout();
  }

  public Client() {
    if (!this.hasValidAuth) {
      this.setAuthHeader();
    }

    return this.client;
  }
}

export default SublinksApiBase;
