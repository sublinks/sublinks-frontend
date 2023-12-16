const ENGLISH = 38;

const siteSetup = {
  adminUser: {
    credentials: {
      username_or_email: 'devAdmin',
      password: 'password123',
    },
    data: {
      id: 1,
      username: 'devAdmin',
      password: 'password123',
      password_verify: 'password123',
      show_nsfw: true
    }
  },
  siteData: {
    name: 'Seeded Site',
    sidebar: "I'm a sidebar",
    description: "I'm a description",
    enable_downvotes: true,
    enable_nsfw: true,
    community_creation_admin_only: false,
    require_email_verification: false,
    application_question: 'Are you a dev?',
    private_instance: false,
    default_theme: 'light',
    default_post_listing_type: 'Local',
    legal_information: 'Property of no one',
    application_email_admins: false,
    hide_modlog_mod_names: false,
    discussion_languages: [ENGLISH],
    slur_filter_regex: '//',
    actor_name_max_length: 99,
    rate_limit_message: 99,
    rate_limit_message_per_second: 99,
    rate_limit_post: 99,
    rate_limit_post_per_second: 99,
    rate_limit_register: 99,
    rate_limit_register_per_second: 99,
    rate_limit_image: 99,
    rate_limit_image_per_second: 99,
    rate_limit_comment: 99,
    rate_limit_comment_per_second: 99,
    rate_limit_search: 99,
    rate_limit_search_per_second: 99,
    federation_enabled: true,
    federation_debug: true,
    captcha_enabled: false,
    registration_mode: 'Open'
  }
};

const users = {
  bill: {
    credentials: {
      username_or_email: 'bill',
      password: 'password123',
    },
    data: {
      id: 2,
      username: 'bill',
      password: 'password123',
      password_verify: 'password123',
      show_nsfw: false
    }
  },
  joy: {
    credentials: {
      username_or_email: 'joy',
      password: 'password123',
    },
    data: {
      id: 3,
      username: 'joy',
      password: 'password123',
      password_verify: 'password123',
      show_nsfw: false
    }
  }
};

const entities = [
  {
    type: 'createCommunity',
    creator: siteSetup.adminUser,
    data: {
      id: 1,
      name: 'seededcommunity',
      title: 'Seeded Community',
      description: 'The very first community',
      nsfw: true,
      posting_restricted_to_mods: false,
      discussion_languages: [ENGLISH]
    }
  },
  {
    type: 'createPost',
    creator: siteSetup.adminUser,
    data: {
      id: 1,
      name: 'Seeded admin post',
      community_id: 1,
      url: 'https://example.com',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      nsfw: false,
      language_id: ENGLISH
    }
  }
];

module.exports = {
  entities,
  siteSetup,
  users
};
