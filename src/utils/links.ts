import { Post } from 'sublinks-js-client';

const isImage = (url: string) => {
  const splitUrl = url.split('?');
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(splitUrl?.[0] || url);
};

const getPostThumbnailUrl = (post: Post) => post.thumbnail_url
  || (post.url && isImage(post.url) ? post.url : undefined);

const extractDomain = (url: string) => {
  const domain = url.split('/')[2];
  return domain.startsWith('www.') ? domain.substring(4) : domain;
};

export {
  getPostThumbnailUrl,
  isImage,
  extractDomain
};
