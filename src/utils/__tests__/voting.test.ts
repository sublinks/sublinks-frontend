import { CommentResponse, GetPostResponse, SublinksClient } from 'sublinks-js-client';

import logger from '../logger';
import { handleCommentVote, handlePostVote } from '../voting';

afterEach(() => jest.clearAllMocks());

describe('handlePostVote', () => {
  it('sends API request to vote on post and triggers callback', async () => {
    const postView = {
      post: {
        id: 999
      },
      counts: {
        score: 10
      },
      my_vote: 1
    };
    const mockDispatchFn = jest.fn();

    jest.spyOn(SublinksClient.prototype, 'likePost').mockResolvedValue({
      post_view: postView
    } as GetPostResponse);

    await handlePostVote(postView.post.id, 1, mockDispatchFn);

    expect(mockDispatchFn).toHaveBeenCalledWith(postView);
  });

  it('logs error on API request error', async () => {
    const errorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {});
    const mockDispatchFn = jest.fn();

    jest.spyOn(SublinksClient.prototype, 'likePost').mockRejectedValue('401');

    await handlePostVote(99, 1, mockDispatchFn);

    expect(mockDispatchFn).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });
});

describe('handleCommentVote', () => {
  it('sends API request to vote on comment and triggers callback', async () => {
    const commentView = {
      comment: {
        id: 999
      },
      counts: {
        score: 10
      },
      my_vote: 1
    };
    const mockDispatchFn = jest.fn();

    jest.spyOn(SublinksClient.prototype, 'likeComment').mockResolvedValue({
      comment_view: commentView
    } as CommentResponse);

    await handleCommentVote(commentView.comment.id, 1, mockDispatchFn);

    expect(mockDispatchFn).toHaveBeenCalledWith(commentView);
  });

  it('logs error on API request error', async () => {
    const errorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {});
    const mockDispatchFn = jest.fn();

    jest.spyOn(SublinksClient.prototype, 'likeComment').mockRejectedValue('401');

    await handleCommentVote(99, 1, mockDispatchFn);

    expect(mockDispatchFn).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });
});
