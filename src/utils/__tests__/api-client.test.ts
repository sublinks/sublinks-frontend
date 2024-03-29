import 'cross-fetch/polyfill';
import { GetSiteResponse, LoginResponse, SublinksClient } from 'sublinks-js-client';

import SublinksApiBase from '../api-client/base';
import SublinksApiClientSide from '../api-client/client';
import logger from '../logger';

let errorSpy: jest.SpyInstance;

beforeEach(() => {
  jest.spyOn(SublinksClient.prototype, 'getSite').mockResolvedValue({
    my_user: {}
  } as GetSiteResponse);
  jest.spyOn(SublinksClient.prototype, 'login').mockResolvedValue({
    jwt: 'test-jwt-token'
  } as LoginResponse);
  jest.spyOn(SublinksClient.prototype, 'getPosts').mockRejectedValue(new Error('Unauthorized'));

  errorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {});
  jest.spyOn(logger, 'debug').mockImplementation(() => {});
});

afterEach(() => jest.clearAllMocks());

describe('SublinksApiBase', () => {
  it('creates the base class with expected public properties', () => {
    const apiClient = new SublinksApiBase();

    expect(apiClient.authCookieStore).toBeNull();
    expect(apiClient.Client).toBeDefined();
    expect(apiClient.login).toBeDefined();
    expect(apiClient.logout).toBeDefined();
    expect(apiClient.setAuthCookieStore).toBeDefined();
    expect(apiClient.setAuthHeader).toBeDefined();
  });

  it('can set auth cookie store', () => {
    const apiClient = new SublinksApiBase();
    const cookieStore = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn()
    };

    apiClient.setAuthCookieStore(cookieStore);

    expect(apiClient.authCookieStore).not.toBeNull();
  });

  it('can set auth header', () => {
    const apiClient = new SublinksApiBase();

    apiClient.setAuthHeader('test-jwt-token');

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('returns the Sublinks API client', () => {
    const apiClient = new SublinksApiBase();

    const client = apiClient.Client();

    expect(client).toBeDefined();
    expect(client.getSite).toBeDefined();
  });

  it('makes API request and updates authorization on login', async () => {
    const apiClient = new SublinksApiBase();
    const cookieStore = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn()
    };

    apiClient.setAuthCookieStore(cookieStore);
    await apiClient.login('bill', 'password123');

    expect(SublinksClient.prototype.login).toHaveBeenCalled();
    expect(cookieStore.set).toHaveBeenCalled();
  });

  it('throws error if API login request fails', async () => {
    jest.clearAllMocks();
    expect.assertions(1);

    jest.spyOn(SublinksClient.prototype, 'login').mockRejectedValue(new Error('request failed'));

    const apiClient = new SublinksApiBase();
    const cookieStore = {
      get: jest.fn(),
      set: jest.fn().mockImplementation(() => {
        throw new Error('cookie set failed');
      }),
      remove: jest.fn()
    };

    apiClient.setAuthCookieStore(cookieStore);

    try {
      await apiClient.login('bill', 'password123');
    } catch (e) {
      const error = e as Error;
      expect(error.message).toBe('request failed');
    }
  });

  it('throws error if failing to set auth cookie', async () => {
    expect.assertions(1);
    const apiClient = new SublinksApiBase();
    const cookieStore = {
      get: jest.fn(),
      set: jest.fn().mockImplementation(() => {
        throw new Error('cookie set failed');
      }),
      remove: jest.fn()
    };

    apiClient.setAuthCookieStore(cookieStore);

    try {
      await apiClient.login('bill', 'password123');
    } catch (e) {
      const error = e as Error;
      expect(error.message).toBe('cookie set failed');
    }
  });

  it('clears authorization on logout', () => {
    const apiClient = new SublinksApiBase();
    const cookieStore = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn()
    };

    apiClient.setAuthCookieStore(cookieStore);
    apiClient.logout();

    expect(cookieStore.remove).toHaveBeenCalled();
  });

  describe('wrapped client', () => {
    it('wraps the API client function properties', async () => {
      const apiClient = new SublinksApiBase();

      await apiClient.Client().getSite();

      // @ts-expect-error Accessing private property
      expect(apiClient.rawClient.getSite).toHaveBeenCalledTimes(1);
    });

    it('validates and sets auth when user is logged in but the auth header is not set', async () => {
      const apiClient = new SublinksApiBase();
      const cookieStore = {
        get: jest.fn().mockReturnValue('test-jwt-cookie'),
        set: jest.fn(),
        remove: jest.fn()
      };

      apiClient.setAuthCookieStore(cookieStore);

      await apiClient.login('bill', 'password123');
      // @ts-expect-error Accessing private property
      apiClient.rawClient.setHeader('Authorization', undefined);

      // @ts-expect-error Accessing private property
      expect(apiClient.rawClient.headers.Authorization).toBeUndefined();

      await apiClient.Client().getSite();

      // @ts-expect-error Accessing private property
      expect(apiClient.rawClient.headers.Authorization).not.toBeUndefined();

      // Once for user auth validation, second time for actual API request
      // @ts-expect-error Accessing private property
      expect(apiClient.rawClient.getSite).toHaveBeenCalledTimes(2);
    });

    it('validates and clears auth on Unauthorized API error', async () => {
      const apiClient = new SublinksApiBase();
      const cookieStore = {
        get: jest.fn(),
        set: jest.fn(),
        remove: jest.fn()
      };

      apiClient.setAuthCookieStore(cookieStore);
      // @ts-expect-error Accessing private property
      apiClient.rawClient.setHeader('Authorization', 'test-jwt-cookie');

      try {
        await apiClient.Client().getPosts();
      } catch (e) {
        // Ignoring error
      }

      // @ts-expect-error Accessing private property
      expect(apiClient.rawClient.getPosts).toHaveBeenCalled();
      expect(cookieStore.remove).toHaveBeenCalled();
    });

    it('throws error on API error', async () => {
      expect.assertions(1);
      const apiClient = new SublinksApiBase();

      try {
        await apiClient.Client().getPosts();
      } catch (e) {
        const error = e as Error;
        expect(error.message).toBe('Unauthorized');
      }
    });
  });
});

describe('SublinksApiClientSide', () => {
  it('extends the base class with expected public properties', () => {
    const apiClient = new SublinksApiClientSide();

    expect(apiClient.Client).toBeDefined();
    expect(apiClient.login).toBeDefined();
    expect(apiClient.logout).toBeDefined();
    expect(apiClient.setAuthCookieStore).toBeDefined();
    expect(apiClient.setAuthHeader).toBeDefined();
  });

  it('sets the auth cookie store on initialization', () => {
    const apiClient = new SublinksApiClientSide();

    expect(apiClient.authCookieStore).not.toBeNull();
  });

  it('returns singleton instance', () => {
    const firstInstance = SublinksApiClientSide.Instance();
    const secondInstance = SublinksApiClientSide.Instance();

    expect(firstInstance).toBe(secondInstance);
  });
});
