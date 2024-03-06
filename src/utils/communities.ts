const getCommunitySlugFromUrl = (communityUrl: string, isLocal: boolean) => {
  const urlMatches = communityUrl.match(/:\/\/(.+)\/c\/(.+)/);
  const communityName = urlMatches?.[2];
  const instanceName = urlMatches?.[1];

  if (isLocal) {
    return communityName;
  }

  return `${communityName}@${instanceName}`;
};

const getCommunityNameFromSlug = (communitySlug: string) => communitySlug.split('@')[0];

const getCommunityNameFromUrl = (communityUrl: string) => communityUrl.split('/')[4];
const getCommunityInstanceFromUrl = (communityUrl: string) => communityUrl.split('/')[2];

export {
  getCommunitySlugFromUrl,
  getCommunityNameFromSlug,
  getCommunityNameFromUrl,
  getCommunityInstanceFromUrl
};
