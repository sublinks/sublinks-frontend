

import React, { useEffect, useState } from 'react';

import PostFeed from '@/components/post-feed';
import sublinksClient from '@/utils/client';
import Image from 'next/image';

import {
  GetPostsResponse, GetSiteResponse, ListingType, SortType
} from 'sublinks-js-client';
import PostFeedOptions from '@/components/post-feed-sort';
import * as testData from '../../../test-data.json';
import Sidebar from '../sidebar';
import { Button } from '@material-tailwind/react';
import { BookmarkIcon, BuildingLibraryIcon, Cog6ToothIcon, EllipsisHorizontalIcon, GlobeAltIcon, HomeIcon, MagnifyingGlassCircleIcon, MegaphoneIcon, ServerIcon } from '@heroicons/react/24/outline';
import SidebarLeft from '../sidebar-left';
import SidebarRight from '../sidebar-right';

interface FeedProps {
  posts: GetPostsResponse,
  site: GetSiteResponse
}

const Feed = ({ posts, site }: FeedProps) => {
  const postFeed = testData as unknown as GetPostsResponse;
  //const [postFeed, setPostFeed] = useState<GetPostsResponse>(posts);

  // @todo: Set this to the users default feed type
  //const [postFeedType, setPostFeedType] = useState<ListingType>();
  //const [postFeedSort, setPostFeedSort] = useState<SortType>();

  //const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  /*const handleSidebarSwitch = (newState: boolean) => {
    setSidebarOpen(newState);
  };*/

  // @todo: Allow test data when in non-docker dev env
  // as Sublinks Core doesn't yet handle all post features
  /*useEffect(() => {
    async function getPosts() {
      setPostFeed(process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL ? await sublinksClient().getPosts({
        type_: postFeedType,
        sort: postFeedSort
      }) : testData as unknown as GetPostsResponse);
    }
    getPosts();
  }, [postFeedSort, postFeedType]);*/

  return (
    <div className="flex">
      <SidebarLeft />

      <div className="flex ml-160 w-full">
        <div className='flex items-center w-full'>
          <div className='w-[90%] mt-40'>
            <PostFeed data={postFeed.posts} />
          </div>
        </div>
        <div className='w-360 min-w-360 order-1 md:order-6 m-20 ml-auto'>
          <Sidebar
            site={site.site_view.site}
            admins={site.admins}
          />
        </div>
      </div>
      
      
    </div>
  );
};

export default Feed;

/*
<div className="flex r-0">
        <PostFeed data={postFeed.posts} />
        <div className='w-360 min-w-360 order-1 md:order-6 m-20 ml-auto'>
          <SidebarRight
            site={site.site_view.site}
            admins={site.admins}
          />
        </div>
      </div>
      
*/

/*
<div className='grow order-3 pt-24 mx-40'>
        
          <div className="mb-16 ml-4">
            <PostFeedOptions
              currentType={postFeedType}
              onSortChange={setPostFeedSort}
              onTypeChange={setPostFeedType}
              currentSort={postFeedSort}
              sidebarOpen={sidebarOpen}
              onSidebarSwitch={handleSidebarSwitch}
            />
          </div>
          <div className="flex">
            <PostFeed data={postFeed.posts} />
          </div>
        
      </div>
      <div className='w-360 min-w-360 order-1 md:order-6 m-20'>
        <Sidebar
          site={site.site_view.site}
          admins={site.admins}
          onSwitch={handleSidebarSwitch}
          open={sidebarOpen}
        />
      </div>
      */