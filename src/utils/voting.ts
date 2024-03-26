import { PostView } from 'sublinks-js-client';

import SublinksApi from '@/utils/api-client/client';
import logger from './logger';

export const handlePostVote = async (
  postId: number,
  vote: number,
  postDataCallback: React.Dispatch<React.SetStateAction<PostView>>
) => {
  try {
    const updatedPost = await SublinksApi.Instance().Client().likePost({
      post_id: postId,
      score: vote
    });

    postDataCallback(updatedPost.post_view);
  } catch (e) {
    logger.error(`Failed to like post with ID ${postId} and score ${vote}`, e);
  }
};
