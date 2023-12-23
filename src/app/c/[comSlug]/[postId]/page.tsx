import React from 'react';
import Link from 'next/link';

import MainCard from '@/components/main-card';
import { PaleBodyText, PaleLinkText } from '@/components/text';
import PostHeader from '@/components/post-header';
import { getPostThumbnailUrl, isImage } from '@/utils/links';
import sublinksClient from '@/utils/client';

import * as testData from '../../../../../test-data.json';

interface PostSubTitleProps {
  authorUrl: string;
  authorName: string;
}

interface PostViewProps {
  params: {
    comSlug: string;
    postId: string;
  }
}

const PostSubTitle = ({ authorUrl, authorName }: PostSubTitleProps) => (
  <div className="text-xs">
    <PaleBodyText>Posted by</PaleBodyText>
    {' '}
    <Link href={authorUrl} target="_blank" rel="noopener noreferrer">
      <PaleLinkText>{authorName}</PaleLinkText>
    </Link>
  </div>
);

const PostView = async ({ params: { postId } }: PostViewProps) => {
  // @todo: Allow test data when in non-docker dev env
  // as Sublinks Core doesn't yet handle all post features
  const postIdInt = parseInt(postId, 10);
  const postData = process.env.SUBLINKS_API_BASE_URL ? await sublinksClient().getPost({
    id: postIdInt
  }) : { post_view: testData.posts.find(post => post.post.id === postIdInt)! };

  if (!postData) {
    return null;
  }

  const { post_view: postView } = postData;
  const {
    body, name: postName, url: postUrl
  } = postView.post;
  const { name: authorName, actor_id: authorUrl } = postView.creator;
  const { score } = postView.counts;
  const postHasImage = postUrl ? isImage(postUrl) : false;
  const thumbnailUrl = getPostThumbnailUrl(postView.post);

  const SubTitle = (
    <PostSubTitle
      authorName={authorName}
      authorUrl={authorUrl}
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
