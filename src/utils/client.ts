import { GetSiteResponse, SublinksClient } from 'sublinks-js-client';

interface Cache {
  [key: string]: CacheData;
}

interface CacheData {
  timestamp: number;
  data: any;
}

let client: SublinksClient;
let cacheTime = 5000;
let cache: Cache = {}

class OverridenSublinksClient extends SublinksClient {
  constructor(baseUrl: string, options: { insecure: boolean }) {
    super(baseUrl, options);
  }

  getSite() { // should be handled in the client itself ideally, prevents massive amounts of calls
    if (cache['site'] && cache['site'].timestamp > Date.now() - cacheTime) {
      return cache['site'].data;
    }

    const data = super.getSite();
    cache['site'] = { timestamp: Date.now(), data };
    return data;
  }
}

const sublinksClient = () => {
  if (!client) {
    client = new OverridenSublinksClient(process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL || 'localhost:8080', { insecure: process.env.NODE_ENV !== 'production' });
  }

  

  return client;
};

export default sublinksClient;
