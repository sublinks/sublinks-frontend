import React from 'react';

import SublinksApi from '@/utils/api-client/server';
import { ErrorText, H1 } from '@/components/text';
import PostForm from '@/components/form/post';
import logger from '@/utils/logger';

const getCommunities = async () => {
  try {
    const communities = await SublinksApi.Instance().Client().listCommunities();

    return communities;
  } catch (e) {
    logger.error('Failed to retrieve communities', e);
    return undefined;
  }
};

const PostCreate = async () => {
  const communityList = await getCommunities();

  if (!communityList) {
    return (
      <div className="flex justify-center mt-24">
        <ErrorText>Something went wrong. Please reload the page to try again.</ErrorText>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-24 md:p-56 w-full">
      <div className="w-full md:w-500 overflow-x-hidden">
        <H1>Create a New Post</H1>
        <div className="mt-32 pb-24">
          <PostForm communities={communityList.communities} />
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
