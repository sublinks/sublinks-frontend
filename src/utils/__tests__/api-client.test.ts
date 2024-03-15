import { LoginResponse, SublinksClient } from 'sublinks-js-client';

import SublinksApiBase from '../api-client/base';
import logger from '../logger';

beforeAll(() => {
  jest.spyOn(SublinksClient.prototype, 'login').mockResolvedValue({
    jwt: 'test-jwt-token'
  } as LoginResponse);
});

afterAll(() => jest.clearAllMocks());

describe.only('base class', () => {
  it('creates the base class with expected public properties', () => {
    const apiClient = new SublinksApiBase();

    expect(apiClient.authCookieStore).toBeDefined();
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
    const errorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {});
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
});
