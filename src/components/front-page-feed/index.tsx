'use client';

import React, { useEffect, useState, useRef } from 'react';
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
  const initialPostType = site?.my_user?.local_user_view.local_user.default_listing_type;
  const initialPostSort = site?.my_user?.local_user_view.local_user.default_sort_type;
  const [postFeed, setPostFeed] = useState<GetPostsResponse | undefined>(posts);

  // @todo: Set this to the users default feed type,
  // temporarily setting default values to track initial state
  const [postFeedType, setPostFeedType] = useState<ListingType>(initialPostType || 'All');
  const [postFeedSort, setPostFeedSort] = useState<SortType>(initialPostSort || 'Hot');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showPostsError, setShowPostsError] = useState(false);

  // State to store the initial values of postFeedType and postFeedSort
  const initialPostFeedTypeRef = useRef<ListingType>(postFeedType);
  const initialPostFeedSortRef = useRef<SortType>(postFeedSort);

  const handleSidebarSwitch = (newState: boolean) => {
    setSidebarOpen(newState);
  };

  // @todo: Allow test data when in non-docker dev env
  // as Sublinks Core doesn't yet handle all post features
  useEffect(() => {
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
    };

    const isPostFeedTypeChanged = postFeedType !== initialPostFeedTypeRef.current;
    const isPostFeedSortChanged = postFeedSort !== initialPostFeedSortRef.current;

    // Only call getPosts if postFeedType or postFeedSort has changed from its initial value
    if (isPostFeedTypeChanged || isPostFeedSortChanged) {
      // @todo: indication posts are loading
      try {
        getPosts();

        // Update initial values to reflect the current state
        initialPostFeedTypeRef.current = postFeedType;
        initialPostFeedSortRef.current = postFeedSort;
      } catch (e) {
        // @todo: add error handling re: src/utils/logger.ts
      }
    }
  }, [postFeedSort, postFeedType]);

  return (
    <div className="relative">
      <div className="float-none md:float-right">
        <Sidebar
          site={site?.site_view?.site}
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
        {showPostsError && (
          <ErrorText>Unable to show posts. Please reload the page to try again.</ErrorText>
        )}
      </div>
    </div>
  );
};

export default Feed;
