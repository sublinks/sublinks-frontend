import React from 'react';
import { GetPostResponse } from 'sublinks-js-client';

import MainCard from '@/components/main-card';
import PostHeader from '@/components/post-header';
import LinkedPostSubTitle from '@/components/post-subtitle';
import SublinksApi from '@/utils/api-client/server';
import logger from '@/utils/logger';

import { ErrorText } from '@/components/text';
import CommentFeed from '@/components/comment-feed';
import * as testData from '../../../../../test-data.json';

interface PostViewProps {
  params: {
    comSlug: string;
    postId: string;
  }
}

// @todo: Allow test data when in non-docker dev env
// as Sublinks Core doesn't yet handle all post features
const getPost = async (postIdInt: number) => {
  try {
    const postData = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
      ? await SublinksApi.Instance().Client().getPost({
        id: postIdInt
      }) : { post_view: testData.posts.find(post => post.post.id === postIdInt)! };

    return postData as GetPostResponse;
  } catch (e) {
    logger.error(`Failed to retrieve post with ID ${postIdInt}`, e);
    return undefined;
  }
};

const getComments = async (postIdInt: number) => {
  if (!process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL) {
    return [];
  }

  try {
    const commentData = await SublinksApi.Instance().Client().getComments({
      type_: 'All',
      sort: 'Hot',
      post_id: postIdInt
    });

    return commentData.comments;
  } catch (e) {
    logger.error(`Failed to retrieve comments for post ${postIdInt}`, e);
    return [];
  }
};

const PostView = async ({ params: { postId } }: PostViewProps) => {
  // @todo: Allow test data when in non-docker dev env
  // as Sublinks Core doesn't yet handle all post features
  const postIdInt = parseInt(postId, 10);
  const postData = await getPost(postIdInt);
  const comments = await getComments(postIdInt);

  if (!postData) {
    return <ErrorText>Unable to show post. Please reload the page to try again.</ErrorText>;
  }

  const { post_view: postView } = postData;
  const { body } = postView.post;
  const { name: authorName } = postView.creator;

  // @todo: Make our own URLs until Sublinks API connects URLs to all entities
  const authorUrl = `/user/${authorName}`;

  const SubTitle = (
    <LinkedPostSubTitle
      label="Posted by"
      linkText={authorName}
      url={authorUrl}
    />
  );
  const Header = <PostHeader postView={postData.post_view} SubTitle={SubTitle} />;

  return (
    <div className="flex flex-col gap-32 my-32">
      <MainCard Header={Header} body={body} />
      <div className="flex flex-col md:mx-40 p-12 md:border md:border-gray-300 md:dark:border-gray-900 md:rounded-md shadow-lg dark:shadow-gray-800">
        <CommentFeed data={comments} />
      </div>
    </div>
  );
};

export default PostView;
