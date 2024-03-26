'use client';

import React, { useState } from 'react';
import { CommentView } from 'sublinks-js-client';
import Markdown from 'react-markdown';

import { handleCommentVote } from '@/utils/voting';
import { CommentHeader } from '../comment-header';
import { CommentAction } from '../comment-actions';

interface CommentCardProps {
  comment: CommentView;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const [commentData, setCommentData] = useState(comment);
  const {
    id, content, ap_id: apId, published, updated
  } = commentData.comment;
  const { my_vote: myVote, creator, counts } = comment;

  // @todo: Make our own URLs until Sublinks API connects URLs to all entities
  const commentHref = `/comment/${id}`;

  const onCommentVote = (vote: number) => {
    const voteScore = vote === myVote ? 0 : vote;
    handleCommentVote(id, voteScore, setCommentData);
  };

  return (
    <div key={id}>
      <div className="mb-4 relative">
        <div className="w-full mb-4">
          <div className="mb-4">
            <CommentHeader
              href={commentHref}
              apId={apId}
              createdAt={published}
              updatedAt={updated}
              creator={creator}
            />
          </div>
          <div className="pl-8">
            <Markdown className="text-gray-600 dark:text-gray-200 text-sm line-clamp-2">
              {content}
            </Markdown>
          </div>
        </div>
        <div className="items-center relative flex">
          <CommentAction votes={counts} onVote={onCommentVote} myVote={myVote} />
        </div>
      </div>
      <div className="border-b-2 border-secondary dark:border-secondary-dark" />
    </div>
  );
};
