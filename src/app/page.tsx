import React from 'react';

import sublinksClient from '@/utils/client';

import { GetPostsResponse, GetSiteResponse } from 'sublinks-js-client';
import Feed from '@/components/front-page-feed';
import * as testData from '../../test-data.json';
import * as testInstanceData from '../../test-instance-data.json';
import SidebarLeft from '@/components/sidebar-left';
import PostFeed from '@/components/post-feed';
import Sidebar from '@/components/sidebar';

const RootPage = async () => {
  const posts = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL 
    ? await sublinksClient().getPosts({limit: 50})
    : JSON.stringify(testData) as unknown as GetPostsResponse;

  const site = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
    ? await sublinksClient().getSite()
    : JSON.parse(JSON.stringify(testInstanceData)) as unknown as GetSiteResponse;  

  return (
    <div className='flex'>
      <SidebarLeft />
      <div className="flex grow-1 ml-160 w-full">
        <div className='flex w-full'>
          <div className='mt-40 w-full mr-160'>
            <PostFeed data={posts.posts} />
          </div>
        </div>
      </div>
      <div className='w-360 min-w-360 order-1 md:order-6 m-20 ml-auto'>
        <Sidebar
          site={site.site_view.site}
          admins={site.admins}
        />
      </div>
    </div>
  );
};

export default RootPage;

/*
<SidebarLeft />

      <div className="flex ml-160 w-full">
        <div className='flex items-center w-full'>
          <div className='mt-40'>
            <PostFeed data={posts.posts} />
          </div>
        </div>
        <div className='w-360 min-w-360 order-1 md:order-6 m-20 ml-auto'>
          <Sidebar
            site={site.site_view.site}
            admins={site.admins}
          />
        </div>
      </div>
*/