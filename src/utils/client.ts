import Cookies from 'js-cookie';
import { SublinksClient } from 'sublinks-js-client';

export const AUTH_COOKIE_NAME = 'auth';

const isServerSide = () => typeof window === 'undefined';

const getApiHost = () => {
  const envUrl = isServerSide()
    ? process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
    : process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_PUBLIC_URL;

  return envUrl || 'localhost:8080';
};

class SublinksApi {
  private client: SublinksClient;

  private static instance: SublinksApi;

  private hasValidAuth = false;

  constructor() {
    this.client = new SublinksClient(getApiHost(), { insecure: process.env.NODE_ENV !== 'production' });
    this.setAuthHeader();
  }

  private setAuthHeader() {
    const jwtAuth = Cookies.get(AUTH_COOKIE_NAME);

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

    Cookies.set(AUTH_COOKIE_NAME, jwt, {
      secure: window.location.protocol.includes('https'),
      path: '/',
      sameSite: 'lax'
    });
  }

  public async logout() {
    if (!this.hasValidAuth) {
      return;
    }

    await this.client.logout();

    Cookies.remove(AUTH_COOKIE_NAME);
  }

  public Client() {
    if (!this.hasValidAuth) {
      this.setAuthHeader();
    }

    return this.client;
  }

  public static Instance() {
    return SublinksApi.instance || new SublinksApi();
  }
}

export default SublinksApi;
