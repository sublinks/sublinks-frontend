'use client';

import { ListingType, SortType } from 'sublinks-js-client';
import React from 'react';
import { ButtonGroup } from '../TailwindMaterial';
import Button from '../button';
import Select from '../select';

interface PostFeedTypeProps {
  currentType?: ListingType
  onTypeChange: (type: ListingType) => void
}

const buttonGroupClass = 'px-12 py-4';

const PostFeedType = ({ currentType, onTypeChange }: PostFeedTypeProps) => (
  <ButtonGroup>
    <Button id="post-feed-type-all" type="button" onClick={() => onTypeChange('All')} className={`${currentType === 'All' ? 'bg-blue-300 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-400'} ${buttonGroupClass}`}>All</Button>
    <Button id="post-feed-type-local" type="button" onClick={() => onTypeChange('Local')} className={`${currentType === 'Local' ? 'bg-blue-300 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-400'} ${buttonGroupClass}`}>Local</Button>
    <Button id="post-feed-type-modview" type="button" onClick={() => onTypeChange('ModeratorView')} className={`${currentType === 'ModeratorView' ? 'bg-blue-300 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-400'} ${buttonGroupClass}`}>Moderator View</Button>
    <Button id="post-feed-type-subscribed" type="button" onClick={() => onTypeChange('Subscribed')} className={`${currentType === 'Subscribed' ? 'bg-blue-300 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-400'} ${buttonGroupClass}`}>Subscribed</Button>
  </ButtonGroup>
);

interface PostFeedSortProps {
  currentSort?: SortType
  onSortChange: (type: SortType) => void
}

const PostFeedSort = ({ currentSort, onSortChange: onTypeChange }: PostFeedSortProps) => (
  <Select value={currentSort} aria-label="Sort Select" className="h-full rounded-md bg-gray-200 dark:bg-gray-400 pl-4" onChange={newValue => onTypeChange(newValue.currentTarget.value as SortType)}>
    <option value="Active">Active</option>
    <option value="Hot">Hot</option>
    <option value="New">New</option>
    <option value="Old">Old</option>
    <option value="TopDay">Top Day</option>
    <option value="TopWeek">Top Week</option>
    <option value="TopMonth">Top Month</option>
    <option value="TopYear">Top Year</option>
    <option value="TopAll">Top All</option>
    <option value="MostComments">Most Comments</option>
    <option value="NewComments">New Comments</option>
    <option value="TopHour">Top Hour</option>
    <option value="TopSixHour">Top Six Hour</option>
    <option value="TopTwelveHour">Top Twelve Hour</option>
    <option value="TopThreeMonths">Top Three Months</option>
    <option value="TopSixMonths">Top Six Months</option>
    <option value="TopNineMonths">Top Nine Months</option>
    <option value="Controversial">Controversial</option>
    <option value="Scaled">Scaled</option>
  </Select>
);

interface PostFeedoptionProps {
  currentType?: ListingType
  onTypeChange: (type: ListingType) => void
  currentSort?: SortType
  onSortChange: (type: SortType) => void
}

const PostFeedoptions = ({
  currentType, onTypeChange, currentSort, onSortChange
}: PostFeedoptionProps) => (
  <div className="flex">
    <PostFeedType currentType={currentType} onTypeChange={onTypeChange} />
    <div className="ml-4">
      <PostFeedSort currentSort={currentSort} onSortChange={onSortChange} />
    </div>
  </div>
);

export default PostFeedoptions;
export { PostFeedType, PostFeedSort };
