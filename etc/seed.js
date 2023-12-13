module.exports = [
  {
    type: 'user',
    isAdmin: true,
    data: {
      username: 'kAdmin',
      password: 'password123',
      password_verify: 'password123',
      show_nsfw: true
    }
  },
  {
    type: "site",
    data: {
      name: "Seeded site"
    }
  },
  {
    type: 'community',
    data: {
      name: 'seededcommunity',
      title: 'seededcommunity'
    }
  },
  {
    type: 'post',
    data: {
      name: "Seeded admin post",
      community_id: 1
    }
  }
];
