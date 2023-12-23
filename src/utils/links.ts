import { Post } from 'sublinks-js-client';

const isImage = (url: string) => {
  const splitUrl = url.split('?');
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(splitUrl?.[0] || url);
};

const getPostThumbnailUrl = (post: Post) => post.thumbnail_url
  || (post.url && isImage(post.url) ? post.url : undefined);

export {
  getPostThumbnailUrl,
  isImage
};
