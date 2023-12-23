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

export {
  getCommunitySlugFromUrl,
  getCommunityNameFromSlug
};
