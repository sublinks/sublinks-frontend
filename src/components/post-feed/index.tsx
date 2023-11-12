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
  <div className="py-4">
    {testData.posts.map(postData => (
      <div key={postData.post.id} className="h-72">
        <div className="h-full flex items-center gap-12 px-12 py-6">
          <div className="h-full w-72 flex flex-shrink-0 relative">
            {postThumbnail(postData.post.thumbnail_url)}
          </div>
          <div className="h-full flex">
            <div className="h-full flex flex-col">
              <span className="text-sm font-semibold leading-6 text-gray-900">{postData.post.name}</span>
              {postData.post.body && <span className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">{postData.post.body}</span>}
              <span className="flex-none text-xs text-gray-600">
                <time dateTime={postData.post.published}>{postData.post.published}</time>
              </span>
            </div>
          </div>
        </div>
        <div className="border-b" />
      </div>
    ))}
  </div>
);

export default PostFeed;
