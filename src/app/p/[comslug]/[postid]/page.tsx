import React from 'react';
import Link from 'next/link';

import MainCard from '@/components/main-card';
import { PaleBodyText, PaleLinkText } from '@/components/text';
import PostHeader from '@/components/post-header';
import { isImage } from '@/utils/links';
import sublinksClient from '@/utils/client';

interface PostSubTitleProps {
  authorUrl: string;
  authorName: string;
  communityUrl: string;
  community: string;
}

interface PostViewProps {
  params: {
    comSlug: string;
    postId: number;
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

const PostView = async ({ params: { comSlug, postId } }: PostViewProps) => {
  const postData = await sublinksClient().getPost({
    id: postId
  });
  const readableSlug = decodeURIComponent(comSlug);

  if (!postData) {
    return null;
  }

  const { post_view: postView } = postData;
  const {
    body, name: postName, url: postUrl, thumbnail_url: thumbnailUrl
  } = postView.post;
  const { name: authorName, actor_id: authorUrl } = postView.creator;
  const { actor_id: communityUrl } = postView.community;
  const { score } = postView.counts;
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
