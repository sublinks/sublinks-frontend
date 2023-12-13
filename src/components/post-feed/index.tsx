import React from 'react';
import Link from 'next/link';

import { getCommunitySlugFromUrl } from '@/utils/communities';
import PostVotes from '../post-votes';
import { BodyText, BodyTitle, PaleBodyText } from '../text';
import * as testData from '../../../test-data.json';
import PostThumbnail from '../post-thumbnail';
import Post from '../post';

const PostFeed = () => (
  <div className="bg-primary dark:bg-primary-dark flex flex-col gap-8">
    {testData.posts.map(postData => <Post community={postData.community} counts={postData.counts} creator={postData.creator} post={postData.post} />)}
  </div>
);

export default PostFeed;
