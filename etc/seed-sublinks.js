/* eslint-disable no-await-in-loop */

const { SublinksClient } = require('sublinks-js-client');
const seedData = require('./seed');

const apiClient = new SublinksClient('localhost:8080', { insecure: true });

const ENTITY_TYPE_TO_API_FUNCTION = {
  'community': apiClient.createCommunity,
  'post': apiClient.createPost,
  'site': apiClient.createSite,
  'user': apiClient.register
};

const saveSeedData = async () => {
  try {
    await apiClient.login({
      username_or_email: 'kAdmin',
      password: 'password123'
    });

    for (let i = 0; i < seedData.length; i++) {
      const entity = seedData[i];
      const apiFn = ENTITY_TYPE_TO_API_FUNCTION[entity.type];

      await apiFn(entity.data);

      if (entity.isAdmin) {
        await apiClient.addAdmin({
          person_id: newUser.person_id,
          added: true
        });
      }
    }

    await apiClient.logout();
  } catch (e) {
    console.log(e);
  }
};

saveSeedData();
