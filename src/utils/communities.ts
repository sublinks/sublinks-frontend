// TODO: Set up and write tests
const getCommunitySlugFromUrl = (communityUrl: string) => {
  const urlMatches = communityUrl.match(/:\/\/(.+)\/c\/(.+)/);
  const communityName = urlMatches?.[2];
  const instanceName = urlMatches?.[1];

  return `${communityName}@${instanceName}`;
};

export {
  getCommunitySlugFromUrl
};
