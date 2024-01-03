import React from 'react';

import {
  Person, Comment, CommentAggregates
} from 'sublinks-js-client';
import Markdown from 'react-markdown';
import { CommentHeader } from '../comment-header';
import { CommentAction } from '../comment-actions';

interface CommentCardProps {
  comment: Comment;
  creator: Person;
  counts: CommentAggregates;
  myVote?: number;
}

export const CommentCard = ({
  comment,
  creator,
  counts,
  myVote
}: CommentCardProps) => {
  const {
    id, content, ap_id: apId, published, updated
  } = comment;

  // @todo: Make our own URLs until Sublinks API connects URLs to all entities
  const commentHref = `/comment/${id}`;

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
          <CommentAction votes={counts} myVote={myVote} />
        </div>
      </div>
      <div className="border-b-2 border-secondary dark:border-secondary-dark" />
    </div>
  );
};
