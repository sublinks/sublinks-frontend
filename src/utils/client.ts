import { SublinksClient } from 'sublinks-js-client';

let client: SublinksClient;

const { NODE_ENV, NEXT_PUBLIC_SUBLINKS_API_BASE_URL } = process.env;

const sublinksClient = () => {
  if (!client) {
    client = new SublinksClient(NEXT_PUBLIC_SUBLINKS_API_BASE_URL || 'localhost:8080', { insecure: NODE_ENV !== 'production' });
  }

  return client;
};

export default sublinksClient;
