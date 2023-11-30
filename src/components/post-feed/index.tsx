import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import * as testData from '../../../test-data.json';
import { PaleParagraph, Paragraph, ParagraphTitle } from '../text';

const getPostUrlFromCommunityActor = (communityUrl: string, id: number) => {
  const urlMatches = communityUrl.match(/:\/\/(.+)\/c\/(.+)/);
  const communityName = urlMatches?.[2];
  const instanceName = urlMatches?.[1];

  return communityName && instanceName ? `/post/${communityName}@${instanceName}/${id}` : `/post/${id}`;
};

const postThumbnail = (postThumbnailUrl?: string) => (postThumbnailUrl ? (
  <Image
    src={postThumbnailUrl}
    alt="Post thumbnail"
    sizes="64px"
    fill
    className="object-contain"
  />
) : (
  <Image
    src="/logo.png"
    alt="Post default thumbnail"
    width={64}
    height={64}
    className="object-contain"
  />
));

const PostFeed = (): React.ReactNode => (
  <div className="bg-primary dark:bg-primary-dark">
    {testData.posts.map(postData => {
      const {
        id, body, name: title, thumbnail_url: thumbnail, published
      } = postData.post;
      const { actor_id: communityUrl } = postData.community;
      const publishedDate = new Date(published);
      const postPublishedAt = `${publishedDate.toLocaleDateString()}, ${publishedDate.toLocaleTimeString()}`;
      const postUrl = getPostUrlFromCommunityActor(communityUrl, id);

      return (
        <Link key={id} href={postUrl}>
          <div className="h-72 relative hover:bg-hover dark:hover:bg-hover-dark">
            <div className="h-full flex gap-12 px-12 py-6 items-center">
              <div className="h-64 w-64 flex flex-shrink-0 relative">
                {postThumbnail(thumbnail)}
              </div>
              <div className="h-full w-full flex">
                <div className="h-full flex flex-col">
                  <ParagraphTitle className="font-semibold">{title}</ParagraphTitle>
                  <PaleParagraph className="mb-8">
                    {`Posted on ${postPublishedAt}`}
                  </PaleParagraph>
                  {body && <Paragraph className="max-md:hidden text-sm line-clamp-1">{body}</Paragraph>}
                </div>
              </div>
            </div>
            <div className="border-b border-secondary dark:border-secondary-dark" />
          </div>

        </Link>
      );
    })}
  </div>
);

export default PostFeed;
