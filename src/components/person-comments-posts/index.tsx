import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from '@/components/TailwindMaterial';
import { CommentView, PostView } from 'sublinks-js-client';
import PostFeed from '../post-feed';
import CommentFeed from '../comment-feed';

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
      <Tabs value="posts">
        {/*
        // @ts-expect-error MT isn't up to date with their React types as of 2.1.9 */}
        <TabsHeader
          indicatorProps={{
            className: 'bg-gray-900/10 dark:bg-secondary-dark shadow-none'
          }}
          className="bg-secondary dark:bg-gray-900/10"
        >
          {tabs.map(({ label, value }) => (
            // @ts-expect-error MT isn't up to date with their React types as of 2.1.9
            <Tab key={value} value={value} className="text-black dark:text-white">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        {/*
        // @ts-expect-error MT isn't up to date with their React types as of 2.1.9 */}
        <TabsBody>
          {tabs.map(({ value, content }) => (
            <TabPanel key={value} value={value} className="mt-8">
              {content || `TODO: ${value}`}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};
