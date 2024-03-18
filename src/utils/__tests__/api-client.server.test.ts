import SublinksApiServerSide from '../api-client/server';

jest.mock('next/headers');

describe('SublinksApiServerSide', () => {
  it('extends the base class with expected public properties', () => {
    const apiClient = new SublinksApiServerSide();

    expect(apiClient.Client).toBeDefined();
    expect(apiClient.login).toBeDefined();
    expect(apiClient.logout).toBeDefined();
    expect(apiClient.setAuthCookieStore).toBeDefined();
    expect(apiClient.setAuthHeader).toBeDefined();
  });

  it('sets the auth cookie store on initialization', () => {
    const apiClient = new SublinksApiServerSide();

    expect(apiClient.authCookieStore).not.toBeNull();
  });

  it('returns singleton instance', () => {
    const firstInstance = SublinksApiServerSide.Instance();
    const secondInstance = SublinksApiServerSide.Instance();

    expect(firstInstance).toBe(secondInstance);
  });
});
