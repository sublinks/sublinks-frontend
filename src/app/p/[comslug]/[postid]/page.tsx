import React from 'react';

import MainCard from '@/components/main-card';
import * as testData from '../../../../../test-data.json';

interface PostViewProps {
  params: {
    comSlug: string;
    postId: string;
  }
}

const PostView = ({ params: { comSlug, postId } }: PostViewProps) => {
  const post = testData.posts.find(p => p.post.id === parseInt(postId, 10));

  if (!post) {
    return null;
  }

  const { body, name } = post.post;

  return (
    <div>
      <MainCard title={name} subTitle={comSlug} body={body} />
    </div>
  );
};

export default PostView;
