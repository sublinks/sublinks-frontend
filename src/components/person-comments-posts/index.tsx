import React from 'react';
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
      
    </div>
  );
};

/*
<Tabs aria-label="Posts"></Tabs>


<TabsHeader
          indicatorProps={{
            className: "bg-gray-900/10 dark:bg-secondary-dark shadow-none",
          }}
          className="bg-secondary dark:bg-gray-900/10"
        >
          {tabs.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className="text-black dark:text-white"
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tabs.map(({ value, content }) => (
            <TabPanel key={value} value={value} className="mt-8">
              {content || `TODO: ${value}`}
            </TabPanel>
          ))}
        </TabsBody>
*/

/*
<Tabs value="posts">
        <TabsHeader
          indicatorProps={{
            className: 'bg-gray-900/10 dark:bg-secondary-dark shadow-none'
          }}
          className="bg-secondary dark:bg-gray-900/10"
        >
          {tabs.map(({ label, value }) => (
            <Tab key={value} value={value} className="text-black dark:text-white">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tabs.map(({ value, content }) => (
            <TabPanel key={value} value={value} className="mt-8">
              {content || `TODO: ${value}`}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
*/
