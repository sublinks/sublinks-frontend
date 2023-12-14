import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from '@/components/TailwindMaterial';
import { Community, Post, PostAggregates } from 'sublinks-js-client';
import { PersonPostFeed } from '../person-post-feed';

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
    element?: React.JSX.Element;
  }[] = [
    { label: 'Posts', value: 'posts', element: <PersonPostFeed data={postViews.slice(0, 25)} /> },
    { label: 'Comments', value: 'comments' }
  ];

  return (
    <div className="mt-24 text-gray-600 dark:text-gray-200 text-sm">
      <Tabs value="posts">
        <TabsHeader
          indicatorProps={{
            className: 'bg-gray-900/10 shadow-none !text-gray-900'
          }}
        >
          {tabs.map(({ label, value }) => (
            <Tab key={value} value={value}>
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
