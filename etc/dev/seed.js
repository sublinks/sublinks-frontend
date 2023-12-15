const users = {
  kAdmin: {
    isAdmin: true,
    credentials: {
      username_or_email: 'kAdmin',
      password: 'password123',
    },
    data: {
      username: 'kAdmin',
      password: 'password123',
      password_verify: 'password123',
      show_nsfw: true
    }
  }
};

const entities = [
  {
    type: 'site',
    auth: users.kAdmin.credentials,
    data: {
      name: 'Seeded site'
    }
  },
  {
    type: 'community',
    auth: users.kAdmin.credentials,
    data: {
      name: 'seededcommunity',
      title: 'seededcommunity'
    }
  },
  {
    type: 'post',
    auth: users.kAdmin.credentials,
    data: {
      name: "Seeded admin post",
      community_id: 1
    }
  }
];

module.exports = {
  entities,
  users
};
