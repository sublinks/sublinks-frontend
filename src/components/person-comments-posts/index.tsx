import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from '@/components/TailwindMaterial';
import { Community, Post, PostAggregates } from 'sublinks-js-client';
import PostFeed from '../post-feed';

interface PersonDetailSelectionProps {
  postViews: {
    post: Post;
    counts: PostAggregates;
    community: Community;
  }[]
}

// @todo: implement posts and comments
export const PersonDetailSelection = ({ postViews }: PersonDetailSelectionProps) => {
  const tabs: {
    label: string;
    value: string;
    content?: React.JSX.Element;
  }[] = [
    { label: 'Posts', value: 'posts', content: <PostFeed data={postViews.slice(0, 25)} /> },
    { label: 'Comments', value: 'comments' }
  ];

  return (
    <div className="mt-8 text-sm">
      <Tabs value="posts">
        <TabsHeader
          indicatorProps={{
            className: 'bg-gray-900/10 dark:bg-gray-200/10 shadow-none'
          }}
          className="bg-secondary dark:bg-secondary-dark"
        >
          {tabs.map(({ label, value }) => (
            <Tab key={value} value={value} className="text-black dark:text-white">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tabs.map(({ value, element }) => (
            <TabPanel key={value} value={value} className="mt-8">
              {element || `TODO: ${value}`}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};
