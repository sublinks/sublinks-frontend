'use client';

import { ListingType, SortType } from 'sublinks-js-client';
import React from 'react';
import { ButtonGroup } from '../TailwindMaterial';
import Button from '../button';
import { Selector } from '../input/select';

interface PostFeedTypeProps {
  currentType?: ListingType
  onTypeChange: (type: ListingType) => void
  showModeratorOption?: boolean;
}

const buttonGroupClass = 'px-12 py-4';

const PostFeedType = ({ currentType, onTypeChange, showModeratorOption }: PostFeedTypeProps) => (
  // @ts-expect-error MT isn't up to date with their React types as of 2.1.9
  <ButtonGroup className="flex">
    <Button
      id="post-feed-type-all"
      palette="pale"
      type="button"
      active={currentType === 'All'}
      onClick={() => onTypeChange('All')}
      className={buttonGroupClass}
    >
      All
    </Button>
    <Button
      id="post-feed-type-local"
      palette="pale"
      type="button"
      active={currentType === 'Local'}
      onClick={() => onTypeChange('Local')}
      className={buttonGroupClass}
    >
      Local
    </Button>
    {showModeratorOption && (
    <Button
      id="post-feed-type-modview"
      palette="pale"
      type="button"
      active={currentType === 'ModeratorView'}
      onClick={() => onTypeChange('ModeratorView')}
      className={buttonGroupClass}
    >
      Moderator
    </Button>
    )}
    <Button
      id="post-feed-type-subscribed"
      palette="pale"
      type="button"
      active={currentType === 'Subscribed'}
      onClick={() => onTypeChange('Subscribed')}
      className={buttonGroupClass}
    >
      Subscribed
    </Button>
  </ButtonGroup>
);

const sortOptions: { label: string, value: string }[] = [
  {
    label: 'Active',
    value: 'Active'
  },
  {
    label: 'Hot',
    value: 'Hot'
  },
  {
    label: 'New',
    value: 'New'
  },
  {
    label: 'Old',
    value: 'Old'
  },
  {
    label: 'Top Hour',
    value: 'TopHour'
  },
  {
    label: 'Top Six Hour',
    value: 'TopSixHour'
  },
  {
    label: 'Top Twelve Hour',
    value: 'TopTwelveHour'
  },
  {
    label: 'Top Day',
    value: 'TopDay'
  },
  {
    label: 'Top Week',
    value: 'TopWeek'
  },
  {
    label: 'Top Month',
    value: 'TopMonth'
  },
  {
    label: 'Top Three Months',
    value: 'TopThreeMonths'
  },
  {
    label: 'Top Six Months',
    value: 'TopSixMonths'
  },
  {
    label: 'Top Nine Months',
    value: 'TopNineMonths'
  },
  {
    label: 'Top Year',
    value: 'TopYear'
  },
  {
    label: 'Top All',
    value: 'TopAll'
  },
  {
    label: 'Most Comments',
    value: 'MostComments'
  },
  {
    label: 'New Comments',
    value: 'NewComments'
  },
  {
    label: 'Controversial',
    value: 'Controversial'
  },
  {
    label: 'Scaled',
    value: 'Scaled'
  }
];

interface PostFeedSortProps {
  currentSort?: SortType
  onSortChange: (type: SortType) => void
}

const PostFeedSort = ({ currentSort, onSortChange: onTypeChange }: PostFeedSortProps) => (
  <Selector
    id="postFeedSort"
    label="Sort Select"
    options={sortOptions}
    initialValue={currentSort ?? undefined}
    onChange={e => onTypeChange(e.currentTarget.value as SortType)}
  />
);

interface PostFeedOptionProps {
  currentType?: ListingType
  onTypeChange: (type: ListingType) => void
  currentSort?: SortType
  onSortChange: (type: SortType) => void
  sidebarOpen?: boolean
  onSidebarSwitch?: (newState: boolean) => void;
}

const PostFeedOptions = ({
  currentType, onTypeChange, currentSort, onSortChange, sidebarOpen, onSidebarSwitch
}: PostFeedOptionProps) => (
  <div className="flex flex-col md:flex-row mt-8 md:mt-0">
    { /* @todo: Show moderator option only if user is moderator */ }
    <PostFeedType currentType={currentType} onTypeChange={onTypeChange} showModeratorOption />
    <div className="ml-0 md:ml-4 mt-8 md:mt-0 flex w-full md:w-auto">
      <PostFeedSort currentSort={currentSort} onSortChange={onSortChange} />
      <Button
        onClick={() => {
          if (onSidebarSwitch) {
            onSidebarSwitch(!sidebarOpen);
          }
        }}
        className="p-4 block md:hidden text-xs ml-4"
        type="button"
        active={sidebarOpen}
      >
        {`${sidebarOpen ? 'Close' : 'Open'} Sidebar`}
      </Button>
    </div>
  </div>
);

export default PostFeedOptions;
export { PostFeedType, PostFeedSort };
