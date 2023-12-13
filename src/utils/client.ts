import { SublinksClient } from 'sublinks-js-client';

let client: SublinksClient;

const sublinksClient = () => {
  if (!client) {
    client = new SublinksClient('localhost:8080', { insecure: true });
  }

  return client;
};

export default sublinksClient;
