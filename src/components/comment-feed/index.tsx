import React from 'react';

import { CommentView } from 'sublinks-js-client';
import { H1 } from '../text';
import { CommentCard } from '../comment';

interface CommentFeedProps {
  data: CommentView[];
}

const CommentFeed = ({ data: comments }: CommentFeedProps) => (
  <div className="bg-primary dark:bg-primary-dark flex flex-col gap-8">
    {comments && comments.length > 0 ? comments.map(commentData => (
      <div key={commentData.comment.ap_id} className="mb-8">
        <CommentCard
          comment={commentData.comment}
          creator={commentData.creator}
          counts={commentData.counts}
        />
      </div>
    )) : (<H1 className="text-center">No comments available!</H1>)}
  </div>
);

export default CommentFeed;
