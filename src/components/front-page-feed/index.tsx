'use client';

import React, { useEffect, useState } from 'react';
import {
  GetPostsResponse, GetSiteResponse, ListingType, SortType
} from 'sublinks-js-client';

import PostFeed from '@/components/post-feed';
import PostFeedOptions from '@/components/post-feed-sort';
import SublinksApi from '@/utils/api-client/client';
import logger from '@/utils/logger';
import { ErrorText } from '../text';
import Sidebar from '../sidebar';
import * as testData from '../../../test-data.json';

interface FeedProps {
  posts?: GetPostsResponse,
  site?: GetSiteResponse
}

const Feed = ({ posts, site }: FeedProps) => {
  const [postFeed, setPostFeed] = useState<GetPostsResponse | undefined>(posts);

  // @todo: Set this to the users default feed type
  const [postFeedType, setPostFeedType] = useState<ListingType>();
  const [postFeedSort, setPostFeedSort] = useState<SortType>();
  const [showPostsError, setShowPostsError] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleSidebarSwitch = (newState: boolean) => {
    setSidebarOpen(newState);
  };

  // @todo: Allow test data when in non-docker dev env
  // as Sublinks Core doesn't yet handle all post features
  const getPosts = async () => {
    try {
      setPostFeed(process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
        ? await SublinksApi.Instance().Client().getPosts({
          type_: postFeedType,
          sort: postFeedSort
        }) : testData as unknown as GetPostsResponse);

      setShowPostsError(false);
    } catch (e) {
      setShowPostsError(true);
      logger.error('Failed to retrieve posts', e);
    }
  }

  useEffect(() => {
    if (!postFeed) {
      getPosts();
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [postFeedSort, postFeedType]);

  return (
    <div className="relative">
      <div className="float-none md:float-right">
        <Sidebar
          site={site?.site_view.site}
          admins={site?.admins}
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
        {postFeed && <PostFeed data={postFeed.posts} />}
        {showPostsError && <ErrorText>Unable to show posts. Please reload the page to try again.</ErrorText>}
      </div>
    </div>
  );
};

export default Feed;
