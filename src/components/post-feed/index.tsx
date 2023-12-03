import React from 'react';
import Link from 'next/link';

import { getCommunitySlugFromUrl } from '@/utils/communities';
import PostVotes from '../post-votes';
import { BodyText, BodyTitle, PaleBodyText } from '../text';
import * as testData from '../../../test-data.json';
import PostThumbnail from '../post-thumbnail';

const PostFeed = (): React.ReactNode => (
  <div className="bg-primary dark:bg-primary-dark">
    {testData.posts.map(postData => {
      const {
        id, body, name: title, thumbnail_url: thumbnailUrl
      } = postData.post;
      const { actor_id: communityUrl } = postData.community;
      const { score } = postData.counts;
      const communitySlug = getCommunitySlugFromUrl(communityUrl);
      const postUrl = `/p/${communitySlug}/${id}`;

      return (
        <div key={id}>
          <div className="flex">
            <div className="flex items-center ml-8">
              <PostVotes points={score} />
            </div>
            <Link href={postUrl} className="w-full">
              <div className="flex h-100 relative hover:bg-hover dark:hover:bg-hover-dark">
                <div className="h-full flex gap-12 px-12 py-6 items-start">
                  <div className="h-80 w-80 mt-8 flex flex-shrink-0 relative">
                    <PostThumbnail postThumbnailUrl={thumbnailUrl} />
                  </div>
                  <div className="h-full w-full flex">
                    <div className="h-full flex flex-col">
                      <BodyTitle className="text-sm font-semibold line-clamp-2">{title}</BodyTitle>
                      <div className="mb-8 flex max-md:flex-col">
                        <PaleBodyText className="text-xs">
                          {`Posted to ${communitySlug}`}
                        </PaleBodyText>
                      </div>
                      {body && <BodyText className="text-xs max-md:hidden line-clamp-2">{body}</BodyText>}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="md:hidden border-b border-secondary dark:border-secondary-dark" />
        </div>
      );
    })}
  </div>
);

export default PostFeed;
