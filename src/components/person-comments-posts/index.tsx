'use client';

import React from 'react';
import { CommentView, PostView } from 'sublinks-js-client';
import PostFeed from '../post-feed';
import CommentFeed from '../comment-feed';
import { Tab, Tabs } from '@nextui-org/tabs';

interface PersonDetailSelectionProps {
  postViews: PostView[],
  commentViews: CommentView[]
}

export const PersonDetailSelection = ({ postViews, commentViews }: PersonDetailSelectionProps) => {
  const tabs: {
    label: string;
    value: string;
    content?: React.JSX.Element;
  }[] = [
    { label: 'Posts', value: 'posts', content: <PostFeed data={postViews.slice(0, 25)} /> },
    { label: 'Comments', value: 'comments', content: <CommentFeed data={commentViews.slice(0, 25)} /> }
  ];

  return (
    <div className="mt-8 text-sm">
      <Tabs aria-label="Posts" items={tabs}>
        {({value, label, content}) => (
          <Tab key={value} title={label}>
            {content}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};
