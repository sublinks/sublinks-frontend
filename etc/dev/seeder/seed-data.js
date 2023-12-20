const TEST_PASSWORD = 'password123';
const ENGLISH = 38;

const getCommunityIdByName = communityName => communities.find(com => com.data.name === communityName).data.id;

let userCounter = 0;
const buildUser = (name, options) => {
  userCounter++;

  return {
    credentials: {
      username_or_email: name,
      password: TEST_PASSWORD,
    },
    data: {
      id: userCounter,
      username: name,
      password: TEST_PASSWORD,
      password_verify: TEST_PASSWORD,
      show_nsfw: Boolean(options?.showNsfw)
    }
  };
};

let communityCounter = 0;
const buildCommunityData = ({ name, title, description, options }) => {
  communityCounter++;

  return {
    id: communityCounter,
    name,
    title,
    description,
    nsfw: Boolean(options?.nsfw),
    posting_restricted_to_mods: Boolean(options?.restrictToMods),
    discussion_languages: [ENGLISH]
  };
};

let postCounter = 0;
const buildPostData = ({ name, body, url, image_url, communityName, options }) => {
  postCounter++;

  return {
    id: postCounter,
    name,
    community_id: getCommunityIdByName(communityName),
    nsfw: Boolean(options?.nsfw),
    language_id: ENGLISH,
    ...(body && { body }),
    ...(url && { url }),
    ...(image_url && { image_url }),
  };
};

const siteSetup = {
  adminUser: buildUser('devAdmin', { showNsfw: true }),
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
  bill: buildUser('bill'),
  joy: buildUser('joy'),
  max: buildUser('max'),
  mia: buildUser('mia'),
  leo: buildUser('leo'),
  ava: buildUser('ava'),
  sam: buildUser('sam'),
  zoe: buildUser('zoe'),
  ben: buildUser('ben'),
  lily: buildUser('lily'),
  jake: buildUser('jake'),
  emma: buildUser('emma'),
  alex: buildUser('alex'),
  grace: buildUser('grace'),
  luke: buildUser('luke'),
  ivy: buildUser('ivy'),
  ryan: buildUser('ryan'),
  ella: buildUser('ella'),
  cole: buildUser('cole'),
  nora: buildUser('nora')
};

const communities = [
  {
    type: 'createCommunity',
    creator: siteSetup.adminUser,
    data: buildCommunityData({
      name: 'seededcommunity',
      title: 'Seeded Community',
      description: 'The very first community',
      options: {
        nsfw: true
      }
    })
  },
  {
    type: 'createCommunity',
    creator: users.bill,
    data: buildCommunityData({
      name: 'bloggingbill',
      title: "Bill's Blog",
      description: 'Hi and welcome to my blog. Only I, Bill, can post here.',
      options: {
        restrictToMods: true
      }
    })
  },
  {
    type: 'createCommunity',
    creator: users.mia,
    data: buildCommunityData({
      name: 'news',
      title: 'News',
      description: 'Breaking news from around the world!',
      options: {
        nsfw: true
      }
    })
  },
  {
    type: 'createCommunity',
    creator: users.sam,
    data: buildCommunityData({
      name: 'ai',
      title: 'Artificial Intelligence',
      description: 'Sharing and discussing news and reasearch around AI'
    })
  },
  {
    type: 'createCommunity',
    creator: users.sam,
    data: buildCommunityData({
      name: 'pc_gaming',
      title: 'PC Gaming',
      description: 'A community for the PC gamers of the world',
      options: {
        nsfw: true
      }
    })
  },
  {
    type: 'createCommunity',
    creator: users.sam,
    data: buildCommunityData({
      name: 'apple',
      title: 'Apple',
      description: 'Keeping up with the latest products and announcements from the tech company Apple',
    })
  },
  {
    type: 'createCommunity',
    creator: users.emma,
    data: buildCommunityData({
      name: 'carpentry',
      title: 'Carpentry / Woodworking',
      description: 'The art and trade of cutting, working, and joining timber.',
    })
  },
  {
    type: 'createCommunity',
    creator: users.ivy,
    data: buildCommunityData({
      name: 'plants',
      title: 'Plants',
      description: 'Share your plants and plant cabinets!',
    })
  },
  {
    type: 'createCommunity',
    creator: users.luke,
    data: buildCommunityData({
      name: 'exercise',
      title: 'Exercise',
      description: 'A community for sharing exercise tips and progress. Posts about nutrition and other healthiness topic are also allowed.',
      options: {
        nsfw: true
      }
    })
  },
  {
    type: 'createCommunity',
    creator: users.nora,
    data: buildCommunityData({
      name: 'sports',
      title: 'Sports',
      description: 'Hell yeah, sports!',
      options: {
        nsfw: true
      }
    })
  }
];

const posts = [
  {
    type: 'createPost',
    creator: users.ava,
    data: buildPostData({
      name: 'Humanitarian Aid Reaches Crisis Zones',
      communityName: 'news',
      url: 'https://www.icrc.org/en/document/humanitarian-needs-deepen-dozens-conflict-zones-worlds-attention-wanes'
    })
  },
  {
    type: 'createPost',
    creator: users.grace,
    data: buildPostData({
      name: "Indie Gem Set to Hit PC Platforms",
      body: "A promising indie game is set to make waves in the PC gaming scene. Developed by a passionate team, this title offers a unique blend of artistry and gameplay. With the support of crowdfunding and early access communities, the game is poised for success. As the release date approaches, players eagerly anticipate discovering the charm and innovation that this indie gem brings to the gaming world.",
      communityName: 'pc_gaming',
      url: 'https://www.pcgamer.com/best-indie-games-hidden-gems-2023/'
    })
  },
  {
    type: 'createPost',
    creator: users.jake,
    data: buildPostData({
      name: "Experimenting with Homegrown Varieties",
      body: "In my backyard garden, I'm experimenting with unique plant varieties. From heirloom tomatoes to exotic herbs, each planting is an exploration of flavors and textures. Growing my own diverse crops adds a delightful twist to culinary adventures and sparks a sense of curiosity.",
      communityName: 'plants',
      image_url: 'https://i0.wp.com/myshadeofgreen.com/wp-content/uploads/2023/02/carrot-carrots-produce-2743498.jpg?fit=1170%2C878&ssl=1'
    })
  },
  {
    type: 'createPost',
    creator: users.grace,
    data: buildPostData({
      name: "Anticipation Surrounds Upcoming RPG Release",
      communityName: 'pc_gaming',
      url: 'https://gamingbolt.com/elden-ring-shadow-of-the-erdtree-could-launch-in-february-rumour'
    })
  },
  {
    type: 'createPost',
    creator: users.ryan,
    data: buildPostData({
      name: 'Breakthrough in Medical Research',
      body: 'Scientists announce a major medical breakthrough, unveiling a groundbreaking treatment for a widespread disease. The discovery offers hope for improved health outcomes and a brighter future in global healthcare.',
      communityName: 'news',
      url: 'https://permanente.org/medical-excellence/clinical-research-drives-health-care-innovation-and-quality/'
    })
  },
  {
    type: 'createPost',
    creator: users.nora,
    data: buildPostData({
      name: "Hockey's Intense Championship Series",
      communityName: 'sports',
      url: 'https://teamusa.usahockey.com/202324rivalryseries'
    })
  },
  {
    type: 'createPost',
    creator: users.nora,
    data: buildPostData({
      name: "Surfing's World Championship Showdown",
      body: "Surfers from diverse coasts converge for the World Surfing Championship, riding the waves in a thrilling battle for supremacy. The event highlights the global appeal of surfing, with surfers showcasing their unique styles and pushing the boundaries of the sport on the world stage.",
      communityName: 'sports',
      url: 'https://beachgrit.com/2023/09/filipe-toledo-wins-san-clemente-world-title-showdown-though-glory-tarnished-over-his-inability-to-conquer-big-wave-demons-rip-curl-finals-day/'
    })
  },

  {
    type: 'createPost',
    creator: users.ava,
    data: buildPostData({
      name: "Augmented Reality Takes Center Stage in Apple Keynote",
      body: "In a game-changing announcement, Apple introduces a bold foray into augmented reality (AR). The keynote reveals AR-powered applications that seamlessly integrate with iOS devices, providing users with immersive experiences. With this leap into AR, Apple reaffirms its position as a pioneer in technology, sparking excitement and speculation about the future possibilities of augmented reality in everyday life.",
      communityName: 'apple',
      url: 'https://techcrunch.com/2023/05/23/apple-invites-media-to-wwdc-2023-keynote-where-ar-headset-is-expected-to-debut/'
    })
  },
  {
    type: 'createPost',
    creator: users.bill,
    data: buildPostData({
      name: 'New social media platform?',
      body: "# Dear Diary\n\nToday I discovered a new social media platform called Sublinks. It looks like Reddit, but better.\n\nI'm gonna give it a go.",
      communityName: 'bloggingbill'
    })
  },
  {
    type: 'createPost',
    creator: users.ben,
    data: buildPostData({
      name: "Global Soccer Tournament Showdown",
      body: "Top soccer nations face off in a prestigious international tournament. The world watches as teams showcase their talent and national pride on the grand stage. With goals, upsets, and extraordinary plays, the tournament becomes a global celebration of the beautiful game, uniting fans across continents.",
      communityName: 'sports',
      url: 'https://www.fcdallas.com/youth/tournaments/heineken'
    })
  },{
    type: 'createPost',
    creator: siteSetup.adminUser,
    data: buildPostData({
      name: 'Seeded admin post',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      communityName: 'seededcommunity'
    })
  },
  {
    type: 'createPost',
    creator: users.nora,
    data: buildPostData({
      name: "Basketball Superstar's Record-Breaking Performance",
      communityName: 'sports',
      url: 'https://www.basketballinsiders.com/news/lebron-james-wins-best-record-breaking-performance-at-2023-espys/'
    })
  },
  {
    type: 'createPost',
    creator: users.mia,
    data: buildPostData({
      name: 'Global Climate Accord Achieved',
      body: 'World leaders unite in a historic agreement to combat climate change. Bold commitments made to reduce carbon emissions and protect the environment. A crucial step toward a sustainable future for generations to come.',
      communityName: 'news',
      url: 'https://unfccc.int/process-and-meetings/the-paris-agreement'
    })
  },
  {
    type: 'createPost',
    creator: users.ava,
    data: buildPostData({
      name: "Apple Unveils Next-Gen MacBook Series",
      communityName: 'apple',
      url: 'https://www.apple.com/newsroom/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/'
    })
  },
  {
    type: 'createPost',
    creator: siteSetup.adminUser,
    data: buildPostData({
      name: "Bonsai Bliss in My Living Room",
      body: "In my living room, miniature trees tell stories of patience and artistry. Bonsai cultivation is a labor of love, a mindful practice of shaping nature into intricate forms. Each carefully pruned branch and elegantly twisted trunk reflects a personal connection to the art of bonsai.",
      communityName: 'plants',
      image_url: 'https://bonsaiforbeginners.com/image/articles/money-tree-bonsai-the-symbol-of-wealth-and-prosperity-in-your-living-room-4be9ae01-a637-4554-8080-6885da8a47dd.jpg?w=600&h=600&crop=1'
    })
  },
  {
    type: 'createPost',
    creator: users.emma,
    data: buildPostData({
      name: 'International Space Mission Success',
      communityName: 'news',
      url: 'https://www.nasa.gov/missions/station/iss-research/building-on-past-successes-of-the-international-space-station/'
    })
  },
  {
    type: 'createPost',
    creator: users.grace,
    data: buildPostData({
      name: "Apple Unveils Next-Gen iPhone",
      body: "In a much-anticipated announcement, Apple reveals its latest flagship iPhone. Boasting cutting-edge features, a powerful chipset, and advancements in camera technology, the new iPhone sets a new standard for smartphones. The unveiling event captivates audiences worldwide, generating excitement for the future of mobile technology.",
      communityName: 'apple',
      url: 'https://www.apple.com/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/'
    })
  },
  {
    type: 'createPost',
    creator: users.bill,
    data: buildPostData({
      name: 'My great day',
      body: '# Dear Diary\n\nToday I had a **great** day!',
      communityName: 'bloggingbill',
        image_url: 'https://images.pexels.com/photos/1169084/pexels-photo-1169084.jpeg?auto=compress&cs=tinysrgb&w=600'
    })
  },
  {
    type: 'createPost',
    creator: users.ivy,
    data: buildPostData({
      name: "Joyful Harvest from My Backyard Garden",
      body: "Today's harvest from my backyard garden brings pure joy. Fresh tomatoes, vibrant herbs, and crisp lettuce—all grown with care and love. Cultivating my own food connects me to the earth, fostering a sense of accomplishment and a deeper appreciation for the natural cycle of growth.",
      communityName: 'plants',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrmYksPet_m5o7l8jHDW4n0kja0Uizo6lENWRHSbAP8FIIQ3AmiLC8GruZAy8S2j712Kg&usqp=CAU'
    })
  },
  {
    type: 'createPost',
    creator: siteSetup.adminUser,
    data: buildPostData({
      name: "The Rise of AI in Healthcare",
      body: "Artificial intelligence is revolutionizing healthcare by enhancing diagnostics and treatment planning. AI algorithms analyze vast amounts of medical data, leading to more accurate diagnoses and personalized treatment options. As technology evolves, the integration of AI promises to significantly improve patient outcomes and reshape the future of healthcare delivery.",
      communityName: 'ai',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7325854/'
    })
  },
  {
    type: 'createPost',
    creator: users.bill,
    data: buildPostData({
      name: "Formula 1 Grand Prix Spectacle",
      communityName: 'sports',
      url: 'https://www.formula1.com/en/latest/article.teams-and-drivers-bring-racing-spectacle-to-la-for-f1-hollywood-festival.3SlKJXiJoV7HV39IM6msB3.html'
    })
  },
  {
    type: 'createPost',
    creator: users.mia,
    data: buildPostData({
      name: 'Global Economic Summit Addresses Challenges',
      body: 'World leaders convene to discuss pressing economic issues. Collaborative efforts and innovative solutions proposed to address challenges such as inflation and market fluctuations. A unified commitment to fostering global economic stability.',
      communityName: 'news',
      url: 'https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-davos'
    })
  },
  {
    type: 'createPost',
    creator: users.alex,
    data: buildPostData({
      name: "Greening My Home for a Breath of Fresh Air",
      body: "Introducing more greenery into my home has transformed it into a haven of freshness. Indoor plants not only add aesthetic charm but also purify the air. Taking care of these green companions brings a sense of responsibility and a daily dose of nature's calming influence to my living space.",
      communityName: 'plants',
      image_url: 'https://thursd.com/storage/media/38159/Best-Air-Purifying-Plants-for-2022---on-Thursd.jpg?1647948739683'
    })
  },
  {
    type: 'createPost',
    creator: users.ava,
    data: buildPostData({
      name: "Cricket's Clash of Titans",
      body: "Two cricket giants engage in a thrilling match, showcasing the strategic intricacies and explosive batting prowess of the sport. The match transcends borders, drawing millions of viewers globally and reinforcing cricket's status as one of the most followed and celebrated sports on the international stage.",
      communityName: 'sports',
      url: 'https://medium.com/@mohdbarkatkhan786/a-clash-of-titans-cricket-world-cup-2023-south-africa-vs-australia-3ebec6a1c0e8'
    })
  },
  {
    type: 'createPost',
    creator: users.luke,
    data: buildPostData({
      name: "Nurturing Medicinal Herbs on My Windowsill",
      body: "Cultivating medicinal herbs on my windowsill is a healing journey. From soothing chamomile to revitalizing mint, these plants offer natural remedies at my fingertips. Witnessing their growth and harnessing their therapeutic properties brings a sense of empowerment to my daily wellness routine.",
      communityName: 'plants',
      image_url: 'https://c3m7f8n5.rocketcdn.me/wp-content/uploads/2018/06/iStock-451871381-1024x443.jpg'
    })
  },
  {
    type: 'createPost',
    creator: users.alex,
    data: buildPostData({
      name: "Grand Slam Victory in Tennis",
      communityName: 'sports',
      url: 'https://www.sportingnews.com/us/tennis/news/top-grand-slam-winners-all-time-who-has-won-most-titles/wplsrohfkbipd1hv3nvaclun'
    })
  },
  {
    type: 'createPost',
    creator: users.ivy,
    data: buildPostData({
      name: "Creating a Tranquil Oasis on My Balcony",
      body: "Transforming my balcony into a lush oasis has been a rewarding journey. Potted flowers, aromatic herbs, and cascading vines create a serene retreat. Amidst the hustle of daily life, tending to my plants brings tranquility, and the beauty of nature thrives in the heart of the urban landscape.",
      communityName: 'plants',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PbP3y0I6-zK0nFwb6C-j4WVDlUS2UkZ883RaJ-BDMVdDy--Lmh84OWhWMnxDz4suFoo&usqp=CAU'
    })
  },
  {
    type: 'createPost',
    creator: users.bill,
    data: buildPostData({
      name: 'I saw a dog',
      body: '# Dear Diary\n\nToday I saw a dog! Its owner let me pet it.',
      communityName: 'bloggingbill'
    })
  },
  {
    type: 'createPost',
    creator: users.nora,
    data: buildPostData({
      name: "US Football Championship Thriller",
      communityName: 'sports',
      url: 'https://www2.cortland.edu/news/detail.dot?id=ae8ec03156e5dacf1b8f4177d4be6686'
    })
  },
  {
    type: 'createPost',
    creator: users.ava,
    data: buildPostData({
      name: "Revolutionary Software Update Revealed",
      communityName: 'apple',
      url: 'https://www.apple.com/newsroom/2008/01/15Apple-Enhances-Revolutionary-iPhone-with-Software-Update/'
    })
  },
  {
    type: 'createPost',
    creator: users.nora,
    data: buildPostData({
      name: "Olympic Triumph for Track and Field Athlete",
      communityName: 'sports',
      url: 'https://www.koaa.com/homepage-showcase/tragedy-to-triumph-an-olympic-story'
    })
  },
  {
    type: 'createPost',
    creator: users.cole,
    data: buildPostData({
      name: "Golf's Majestic Masters Tournament",
      communityName: 'sports',
      url: 'https://www.theguardian.com/sport/gallery/2013/apr/11/augusta-national-masters-2013-gallery'
    })
  },
  {
    type: 'createPost',
    creator: users.grace,
    data: buildPostData({
      name: "Ethical Considerations in AI Development",
      body: "As artificial intelligence continues to advance, ethical considerations become paramount. Developers and policymakers grapple with issues of bias, privacy, and accountability. Striking the right balance between innovation and responsible AI deployment is crucial to ensure a future where technology serves humanity without compromising fundamental values.",
      communityName: 'ai',
      url: 'https://www.linkedin.com/pulse/ethical-considerations-ai-development-deployment-abdelmoumen-chouichi/'
    })
  }
];

const allUsers = Object.values(users);
const allPosts = Object.values(posts);
const likes = [];

allPosts.forEach(post => {
  const {
    data: {
      id: postId
    },
    creator: {
      data: {
        id: postAuthorId
      }
    }
  } = post;

  // Every 4th post gets no (dis)likes
  if (postId % 4 === 0) {
    return;
  }

  allUsers.forEach(user => {
    const { id: userId } = user.data;

    // User who made the post keeps their like as-is
    if (userId === postAuthorId) {
      return;
    }

    // Arbitrary formula to get some diversity
    const likePost = userId * 1.5 < postId;
    likes.push({
      type: 'likePost',
      creator: user,
      data: {
        post_id: postId,
        score: likePost ? 1 : -1
      }
    });
  });
});

const entities = [
  ...communities,
  ...posts,
  ...likes
];

module.exports = {
  entities,
  siteSetup,
  users
};
