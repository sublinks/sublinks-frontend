'use client';

import React, { useEffect, useState } from 'react';
import {
  GetPostsResponse, GetSiteResponse, ListingType, SortType
} from 'sublinks-js-client';

import PostFeed from '@/components/post-feed';
import SublinksApi from '@/utils/api-client/client';
import PostFeedOptions from '@/components/post-feed-sort';
import * as testData from '../../../test-data.json';
import Sidebar from '../sidebar';

interface FeedProps {
  posts: GetPostsResponse,
  site: GetSiteResponse
}

const Feed = ({ posts, site }: FeedProps) => {
  const [postFeed, setPostFeed] = useState<GetPostsResponse>(posts);

  // @todo: Set this to the users default feed type
  const [postFeedType, setPostFeedType] = useState<ListingType>();
  const [postFeedSort, setPostFeedSort] = useState<SortType>();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleSidebarSwitch = (newState: boolean) => {
    setSidebarOpen(newState);
  };

  // @todo: Allow test data when in non-docker dev env
  // as Sublinks Core doesn't yet handle all post features
  useEffect(() => {
    async function getPosts() {
      setPostFeed(process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
        ? await SublinksApi.Instance().Client().getPosts({
          type_: postFeedType,
          sort: postFeedSort
        }) : testData as unknown as GetPostsResponse);
    }
    getPosts();
  }, [postFeedSort, postFeedType]);

  return (
    <div className="relative">
      <div className="float-none md:float-right">
        <Sidebar
          site={site.site_view.site}
          admins={site.admins}
          onSwitch={handleSidebarSwitch}
          open={sidebarOpen}
        />
      </div>
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
  );
};

export default Feed;
