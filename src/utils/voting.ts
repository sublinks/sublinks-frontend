import { CommentView, PostView } from 'sublinks-js-client';

import SublinksApi from './api-client/client';
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

export const handleCommentVote = async (
  commentId: number,
  vote: number,
  commentDataCallback: React.Dispatch<React.SetStateAction<CommentView>>
) => {
  try {
    const updatedComment = await SublinksApi.Instance().Client().likeComment({
      comment_id: commentId,
      score: vote
    });

    commentDataCallback(updatedComment.comment_view);
  } catch (e) {
    logger.error(`Failed to like comment with ID ${commentId} and score ${vote}`, e);
  }
};
