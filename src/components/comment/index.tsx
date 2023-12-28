import React from 'react';

import {
  Person, Comment, CommentAggregates
} from 'sublinks-js-client';
import Markdown from 'react-markdown';
import CommentVotes from '../comment-votes';
import { CommentHeader } from '../comment-header';
import { BodyText } from '../text';
import { CommentAction } from '../comment-actions';

interface CommentCardProps {
  comment: Comment;
  creator: Person;
  counts: CommentAggregates;
}

export const CommentCard = ({
  comment,
  creator,
  counts
}: CommentCardProps) => {
  const {
    id, content, ap_id, published, updated
  } = comment;
  const { display_name: authorDisplayName, name: authorName } = creator;

  // @todo: Make our own URLs until Sublinks API connects URLs to all entities
  const commentHref = `/comment/${id}`;
  const authorUrl = `/user/${authorName}`;

  return (
    <div key={id}>
      <div className="mb-4 relative">
        <div className="w-full">
          <div className="mb-4">
            <CommentHeader
              href={commentHref}
              ap_id={ap_id}
              createdAt={published}
              updatedAt={updated}
              creator={creator}
            />
          </div>
          <div>
            <Markdown className="text-gray-600 dark:text-gray-200 text-sm max-md:hidden line-clamp-2 group-visited:text-gray-500 group-visited:dark:text-gray-400">
              {content}
            </Markdown>
          </div>
        </div>
        <div className="items-center relative flex">
          <CommentAction votes={counts} />
        </div>
      </div>
      <div className="border-b-2 border-secondary dark:border-secondary-dark" />
    </div>
  );
};
