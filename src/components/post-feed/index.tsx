import React from 'react';
import Image from 'next/image';

import * as testData from '../../../test-data.json';

const postThumbnail = (postThumbnailUrl?: string) => (postThumbnailUrl ? (
  <Image
    src={postThumbnailUrl}
    alt="Post thumbnail"
    sizes="72px"
    fill
    style={{
      objectFit: 'contain'
    }}
  />
) : (
  <Image
    src="/logo.png"
    alt="Post default thumbnail"
    width={72}
    height={72}
  />
));

const PostFeed = (): React.ReactNode => (
  <div>
    {testData.posts.map(postData => {
      const {
        id, body, name: title, thumbnail_url: thumbnail, published
      } = postData.post;
      const publishedDate = new Date(published);
      const postPublishedAt = `${publishedDate.toLocaleDateString()}, ${publishedDate.toLocaleTimeString()}`;

      return (
        <div key={id} className="min-h-72 relative hover:bg-gray-100">
          <div className="h-full flex gap-12 px-12 py-6">
            <div className="h-72 w-72 flex flex-shrink-0 relative">
              {postThumbnail(thumbnail)}
            </div>
            <div className="h-full w-full flex">
              <div className="h-full flex flex-col">
                <span className="text-sm font-semibold text-gray-900">{title}</span>
                <span className="mb-8 text-xs text-gray-500">
                  {`Posted on ${postPublishedAt}`}
                </span>
                {body && <span className="max-md:hidden text-sm text-gray-600 line-clamp-2">{body}</span>}
              </div>
            </div>
          </div>
          <div className="border-b" />
        </div>
      );
    })}
  </div>
);

export default PostFeed;
