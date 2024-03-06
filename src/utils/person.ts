const getPersonSlugFromUrl = (personUrl: string) => {
  const urlMatches = personUrl.match(/:\/\/(.+)\/u\/(.+)/);
  const communityName = urlMatches?.[2];
  const instanceName = urlMatches?.[1];

  return `${communityName}@${instanceName}`;
};

const getPersonNameFromUrl = (personUrl: string) => personUrl.split('/')[4];
const getPersonInstanceFromUrl = (personUrl: string) => personUrl.split('/')[2];

export {
  getPersonSlugFromUrl,
  getPersonNameFromUrl,
  getPersonInstanceFromUrl
};
