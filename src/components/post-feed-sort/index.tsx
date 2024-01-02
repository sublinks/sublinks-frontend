'use client';

import { ListingType, SortType } from 'sublinks-js-client';
import React from 'react';
import { ButtonGroup } from '../TailwindMaterial';
import Button from '../button';
import Select, { Option } from '../select';

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
    <Option value="Active" selected={currentSort === 'Active'}>Active</Option>
    <Option value="Hot" selected={currentSort === 'Hot'}>Hot</Option>
    <Option value="New" selected={currentSort === 'New'}>New</Option>
    <Option value="Old" selected={currentSort === 'Old'}>Old</Option>
    <Option value="TopHour" selected={currentSort === 'TopHour'}>Top Hour</Option>
    <Option value="TopSixHour" selected={currentSort === 'TopSixHour'}>Top Six Hour</Option>
    <Option value="TopTwelveHour" selected={currentSort === 'TopTwelveHour'}>Top Twelve Hour</Option>
    <Option value="TopDay" selected={currentSort === 'TopDay'}>Top Day</Option>
    <Option value="TopWeek" selected={currentSort === 'TopWeek'}>Top Week</Option>
    <Option value="TopMonth" selected={currentSort === 'TopMonth'}>Top Month</Option>
    <Option value="TopThreeMonths" selected={currentSort === 'TopThreeMonths'}>Top Three Months</Option>
    <Option value="TopSixMonths" selected={currentSort === 'TopSixMonths'}>Top Six Months</Option>
    <Option value="TopNineMonths" selected={currentSort === 'TopNineMonths'}>Top Nine Months</Option>
    <Option value="TopYear" selected={currentSort === 'TopYear'}>Top Year</Option>
    <Option value="TopAll" selected={currentSort === 'TopAll'}>Top All</Option>
    <Option value="MostComments" selected={currentSort === 'MostComments'}>Most Comments</Option>
    <Option value="NewComments" selected={currentSort === 'NewComments'}>New Comments</Option>
    <Option value="Controversial" selected={currentSort === 'Controversial'}>Controversial</Option>
    <Option value="Scaled" selected={currentSort === 'Scaled'}>Scaled</Option>
  </Select>
);

interface PostFeedOptionProps {
  currentType?: ListingType
  onTypeChange: (type: ListingType) => void
  currentSort?: SortType
  onSortChange: (type: SortType) => void
}

const PostFeedOptions = ({
  currentType, onTypeChange, currentSort, onSortChange
}: PostFeedOptionProps) => (
  <div className="flex">
    <PostFeedType currentType={currentType} onTypeChange={onTypeChange} />
    <div className="ml-4">
      <PostFeedSort currentSort={currentSort} onSortChange={onSortChange} />
    </div>
  </div>
);

export default PostFeedOptions;
export { PostFeedType, PostFeedSort };
