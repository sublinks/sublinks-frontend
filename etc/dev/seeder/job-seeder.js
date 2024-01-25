/* eslint-disable no-await-in-loop */

const { SublinksClient } = require('sublinks-js-client');
const { entities, siteSetup, users } = require('./seed-data');

const { NEXT_PUBLIC_SUBLINKS_API_BASE_URL } = process.env;

const apiClient = new SublinksClient(NEXT_PUBLIC_SUBLINKS_API_BASE_URL, { insecure: true });

const MAX_ATTEMPTS = 20;
const RETRY_DELAY = 5000;
let attempt = 1;

const waitForApi = async seedFn => {
  try {
    await apiClient.getSite();
    console.log('API connection OK!');
    seedFn();
  } catch (e) {
    if (attempt < MAX_ATTEMPTS) {
      attempt++;
      console.log('API not yet available. Waiting some more...');

      await new Promise(res => setTimeout(res, RETRY_DELAY));
      await waitForApi(seedFn);
    } else {
      console.error('Unable to connect to API', e);
    }
  }
};

const doesEntityAlreadyExist = async entity => {
  const { data, type } = entity;

  switch(type) {
    case 'createCommunity':
      try {
        await apiClient.getCommunity({
          id: data.id
        });
        return true;
      } catch (e) {
        return false;
      }
    case 'createPost':
      try {
        await apiClient.getPost({
          id: data.id
        });
        return true;
      } catch (e) {
        return false;
      }
    default:
      return false;
  }
};

const createUser = async user => {
  try {
    await apiClient.getPersonDetails({ username: user.data.username });
  } catch (e) {
    // Reaching this means the user doesn't exist
    console.log(`Creating user with ID ${user.data.id}`);
    await apiClient.register(user.data);
  }
};

const runInitialSiteSetup = async () => {
  console.log('Configuring site...');
  const { adminUser, siteData } = siteSetup;
  const site = await apiClient.getSite();
  const isSiteSetUp = site.site_view.local_site.site_setup;

  await createUser(adminUser);
  const { jwt } = await apiClient.login(adminUser.credentials);
  await apiClient.setAuth(jwt);

  if (!isSiteSetUp) {
    await apiClient.createSite(siteData);
  }

  console.log('Site configuration completed!');
};

const insertSeedData = async () => {
  try {
    await runInitialSiteSetup();

    const userKeys = Object.keys(users);
    const entityKeys = Object.keys(entities);

    console.log('Seeding users...');
    for (let i = 0; i < userKeys.length; i++) {
      const userKey = userKeys[i];
      const user = users[userKey];

      await createUser(user);
    }
    console.log('User seeding completed!');

    console.log('Seeding entities...');
    for (let i = 0; i < entityKeys.length; i++) {
      const entityKey = entityKeys[i];
      const entity = entities[entityKey];

      if (!await doesEntityAlreadyExist(entity)) {
        const { creator, data, type } = entity;
        console.log(`Running ${type}() for entity with ID ${data.id || data.post_id}`);

        const { jwt } = await apiClient.login(creator.credentials);
        await apiClient.setAuth(jwt);

        if (data.image_url) {
          const fileRes = await fetch(data.image_url);
          const fileBuffer = Buffer.from(await fileRes.arrayBuffer());
          const upload = await apiClient.uploadImage({ image: fileBuffer });

          if (upload.url) {
            data.url = upload.url;
          }
        }

        await apiClient[type](data);
      }
    }
    console.log('Entity seeding completed!');
  } catch (e) {
    console.log('Failed seeding data', e);
  } 
};

waitForApi(insertSeedData);
