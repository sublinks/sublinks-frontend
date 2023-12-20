import { SublinksClient } from 'sublinks-js-client';

let client: SublinksClient;

const { NODE_ENV, SUBLINKS_API_BASE_URL } = process.env;

const sublinksClient = () => {
  if (!client) {
    client = new SublinksClient(SUBLINKS_API_BASE_URL || 'localhost:8080', { insecure: NODE_ENV !== 'production' });
  }

  return client;
};

export default sublinksClient;
