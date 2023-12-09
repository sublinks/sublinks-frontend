import React from 'react';
import Link from 'next/link';

import MainCard from '@/components/main-card';
import { PaleBodyText, PaleLinkText } from '@/components/text';
import { isImage } from '@/utils/links';
import PostHeader from '@/components/post-header';
import * as testData from '../../../../../test-data.json';

interface PostSubTitleProps {
  authorUrl: string;
  authorName: string;
  communityUrl: string;
  community: string;
}

interface PostViewProps {
  params: {
    comSlug: string;
    postId: string;
  }
}

const PostSubTitle = ({
  authorUrl, authorName, communityUrl, community
}: PostSubTitleProps) => (
  <div className="text-xs">
    <PaleBodyText>Posted by</PaleBodyText>
    {' '}
    <Link href={authorUrl} target="_blank" rel="noopener noreferrer">
      <PaleLinkText>{authorName}</PaleLinkText>
    </Link>
    {' '}
    <PaleBodyText>to</PaleBodyText>
    {' '}
    <Link href={communityUrl} target="_blank" rel="noopener noreferrer">
      <PaleLinkText>{community}</PaleLinkText>
    </Link>
  </div>
);

const PostView = ({ params: { comSlug, postId } }: PostViewProps) => {
  const post = testData.posts.find(p => p.post.id === parseInt(postId, 10));
  const readableSlug = decodeURIComponent(comSlug);

  if (!post) {
    return null;
  }

  const {
    body, name: postName, url: postUrl, thumbnail_url: thumbnailUrl
  } = post.post;
  const { name: authorName, actor_id: authorUrl } = post.creator;
  const { actor_id: communityUrl } = post.community;
  const { score } = post.counts;
  const postHasImage = postUrl ? isImage(postUrl) : false;

  const SubTitle = (
    <PostSubTitle
      authorName={authorName}
      authorUrl={authorUrl}
      community={readableSlug}
      communityUrl={communityUrl}
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
