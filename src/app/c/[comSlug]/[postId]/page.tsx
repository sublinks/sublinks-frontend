import React from 'react';

import MainCard from '@/components/main-card';
import PostHeader from '@/components/post-header';
import LinkedPostSubTitle from '@/components/post-subtitle';
import { getPostThumbnailUrl, isImage } from '@/utils/links';
import sublinksClient from '@/utils/client';

import * as testData from '../../../../../test-data.json';

interface PostViewProps {
  params: {
    comSlug: string;
    postId: string;
  }
}

const PostView = async ({ params: { postId } }: PostViewProps) => {
  // @todo: Allow test data when in non-docker dev env
  // as Sublinks Core doesn't yet handle all post features
  const postIdInt = parseInt(postId, 10);
  const postData = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL ? await sublinksClient().getPost({
    id: postIdInt
  }) : { post_view: testData.posts.find(post => post.post.id === postIdInt)! };

  if (!postData) {
    return null;
  }

  const { post_view: postView } = postData;
  const {
    body, name: postName, url: postUrl
  } = postView.post;
  const { name: authorName } = postView.creator;
  const { score } = postView.counts;
  const postHasImage = postUrl ? isImage(postUrl) : false;
  const thumbnailUrl = getPostThumbnailUrl(postView.post);

  // @todo: Make our own URLs until Sublinks API connects URLs to all entities
  const authorUrl = `/user/${authorName}`;

  const SubTitle = (
    <LinkedPostSubTitle
      label="Posted by"
      linkText={authorName}
      url={authorUrl}
    />
  );
  const Header = (
    <PostHeader
      points={score}
      title={postName}
      SubTitle={SubTitle}
      postUrl={postUrl}
      thumbnailUrl={thumbnailUrl}
      hasBody={Boolean(body)}
      hasImage={postHasImage}
    />
  );

  return <MainCard Header={Header} body={body} />;
};

export default PostView;
