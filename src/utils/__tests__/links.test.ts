import { Post } from 'sublinks-js-client';
import { getPostThumbnailUrl, isImage } from '../links';

describe('isImage', () => {
  const imageExtensions = [['jpg'], ['jpeg'], ['png'], ['webp'], ['avif'], ['gif'], ['svg']];
  const nonImageExtensions = ['doc', 'pdf', 'txt', 'psd'];

  it.each(imageExtensions)('should return true for image file extension %s', (extension: string) => {
    const fileUrl = `https://sublinks.test/cdn/images/logo.${extension}`;
    const result = isImage(fileUrl);

    expect(result).toBeTruthy();
  });

  it.each(nonImageExtensions)('should return false for non-image file extension %s', (extension: string) => {
    const fileUrl = `https://sublinks.test/cdn/images/logo.${extension}`;
    const result = isImage(fileUrl);

    expect(result).toBeFalsy();
  });
});

describe('getPostThumbnailUrl', () => {
  it('should return post thumbnail_url if present', () => {
    const mockPost = {
      thumbnail_url: 'https://example.com/funny-image.png',
      url: 'https://example.com/funny-story'
    } as Post;
    const result = getPostThumbnailUrl(mockPost);

    expect(result).toBe(mockPost.thumbnail_url);
  });

  it('should return post URL if it is an image, and thumbnail_url does not exist ', () => {
    const mockPost = {
      url: 'https://example.com/funny-image.png'
    } as Post;
    const result = getPostThumbnailUrl(mockPost);

    expect(result).toBe(mockPost.url);
  });

  it('should return undefined if post URL is not an image, and thumbnail_url does not exist ', () => {
    const mockPost = {
      url: 'https://example.com/funny-story'
    } as Post;
    const result = getPostThumbnailUrl(mockPost);

    expect(result).toBeUndefined();
  });
});
