/* eslint-disable no-await-in-loop */

const { SublinksClient } = require('sublinks-js-client');
const { entities, users } = require('./seed');

const apiClient = new SublinksClient(process.env.SUBLINKS_API_BASE_URL, { insecure: true });

const ENTITY_TYPE_TO_API_FUNCTION = {
  'community': apiClient.createCommunity,
  'post': apiClient.createPost,
  'site': apiClient.createSite
};

const MAX_RETRIES = 20;
const RETRY_DELAY = 5000;
let attempt = 1;

const waitForApi = async () => {
  try {
    await apiClient.getSite();
    console.log('API connection OK!');
  } catch (e) {
    if (attempt < MAX_RETRIES) {
      attempt++;
      console.log('API not yet available. Waiting some more...');
      setTimeout(waitForApi, RETRY_DELAY);
    } else {
      console.error('Unable to connect to API', e);
    }
  }
}

const saveSeedData = async () => {
  try {
    const userKeys = Object.keys(users);

    for (let i = 0; i < userKeys.length; i++) {
      const userKey = userKeys[i];
      const user = users[userKey];

      let userDetails = await apiClient.getPersonDetails({ username: user.data.username });
      const existingUserId = userDetails?.person_view?.person?.id;
      const userExists = Boolean(existingUserId);

      if (!userExists) {
        userDetails = await apiClient.register(user.data);
      }

      if (user.isAdmin) {
        const userId = userDetails.person_id || existingUserId;
        console.log({
          person_id: userId,
          added: true
        })
        await apiClient.addAdmin({
          person_id: userId,
          added: true
        });
      }
    }

    // for (let i = 0; i < entities.length; i++) {
    //   const apiFn = ENTITY_TYPE_TO_API_FUNCTION[entity.type];
    // }
  } catch (e) {
    console.log(e);
  }
};


(async () => {
  await waitForApi();
  // saveSeedData();
})();
