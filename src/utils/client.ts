import { SublinksClient } from 'sublinks-js-client';

let client: SublinksClient;

const sublinksClient = () => {
  if (!client) {
    client = new SublinksClient(process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL || 'localhost:8080', { insecure: process.env.NODE_ENV !== 'production' });
  }

  return client;
};

export default sublinksClient;
