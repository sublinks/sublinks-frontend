import React from 'react';
import Link from 'next/link';

import MainCard from '@/components/main-card';
import PostVotes from '@/components/post-votes';
import { PaleBodyText, PaleLinkText } from '@/components/text';
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

  const { body, name: postName } = post.post;
  const { name: authorName, actor_id: authorUrl } = post.creator;
  const { actor_id: communityUrl } = post.community;
  const { score } = post.counts;

  const SubTitle = (
    <PostSubTitle
      authorName={authorName}
      authorUrl={authorUrl}
      community={readableSlug}
      communityUrl={communityUrl}
    />
  );
  const Votes = <PostVotes points={score} />;

  return (
    <div>
      <MainCard LeftHeaderComponent={Votes} title={postName} SubTitle={SubTitle} body={body} />
    </div>
  );
};

export default PostView;
