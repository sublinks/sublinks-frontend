import { GetPostResponse, SublinksClient } from 'sublinks-js-client';

import logger from '../logger';
import { handlePostVote } from '../voting';

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
