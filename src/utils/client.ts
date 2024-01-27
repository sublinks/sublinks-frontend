import { SublinksClient } from 'sublinks-js-client';

let client: SublinksClient;

const isServerSide = () => typeof window === 'undefined';

const getApiHost = () => {
  const envUrl = isServerSide()
    ? process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
    : process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_PUBLIC_URL;

  return envUrl || 'localhost:8080';
};

const sublinksClient = () => {
  const apiHost = getApiHost();

  if (!client) {
    client = new SublinksClient(apiHost, { insecure: process.env.NODE_ENV !== 'production' });
  }

  return client;
};

export default sublinksClient;
