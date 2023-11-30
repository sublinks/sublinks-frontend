import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import * as testData from '../../../test-data.json';
import { PaleParagraph, Paragraph, ParagraphTitle } from '../text';

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
  <div className="dark:bg-gray-700">
    {testData.posts.map(postData => {
      const {
        id, body, name: title, thumbnail_url: thumbnail, published
      } = postData.post;
      const publishedDate = new Date(published);
      const postPublishedAt = `${publishedDate.toLocaleDateString()}, ${publishedDate.toLocaleTimeString()}`;

      return (
        <Link href={`/post/${id}`}>
          <div key={id} className="min-h-72 relative hover:bg-hover dark:hover:bg-hover-dark">
            <div className="h-full flex gap-12 px-12 py-6">
              <div className="h-72 w-72 flex flex-shrink-0 relative">
                {postThumbnail(thumbnail)}
              </div>
              <div className="h-full w-full flex">
                <div className="h-full flex flex-col">
                  <ParagraphTitle className="font-semibold">{title}</ParagraphTitle>
                  <PaleParagraph className="mb-8">
                    {`Posted on ${postPublishedAt}`}
                  </PaleParagraph>
                  {body && <Paragraph className="max-md:hidden text-sm line-clamp-2">{body}</Paragraph>}
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
