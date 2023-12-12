import React from 'react';
import Link from 'next/link';
import { Components } from 'react-markdown';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@/utils/TailwindMaterial";

import { LinkText } from '../text';

const tabs = [
  { label: 'Posts', value: 'posts' },
  { label: 'Comments', value: 'comments' },
]

// @todo: implement posts and comments
export const PersonDetailSelection = ({ posts, comments }: { posts: {}[], comments: {}[] }) => 
(<div className="mt-24 text-gray-600 dark:text-gray-200 text-sm">
  <Tabs value="posts" >
    <TabsHeader
      indicatorProps={{
        className: "bg-gray-900/10 shadow-none !text-gray-900",
      }}>
      {tabs.map(({ label, value }) => (
        <Tab key={value} value={value}>
          {label}
        </Tab>
      ))}
    </TabsHeader>
    <TabsBody>
      {tabs.map(({ value }) => (
        <TabPanel key={value} value={value} className="">
          TODO: {value}
        </TabPanel>
      ))}
    </TabsBody>
  </Tabs>
</div>)