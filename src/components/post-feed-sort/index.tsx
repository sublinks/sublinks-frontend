'use client';

import { ListingType, SortType } from 'sublinks-js-client';
import React from 'react';
import { ButtonGroup } from '../TailwindMaterial';
import Button from '../button';
import Select, { Option } from '../select';
import { Bars3Icon, ChartBarIcon, ChevronDownIcon, DocumentIcon, HomeIcon } from '@heroicons/react/24/outline';
import { ChartBarSquareIcon } from '@heroicons/react/24/solid';

interface PostFeedTypeProps {
  currentType?: ListingType
  onTypeChange: (type: ListingType) => void
}

const buttonGroupClass = 'px-12 py-4 bg-transparent';

const PostFeedType = ({ currentType, onTypeChange }: PostFeedTypeProps) => (
  <ButtonGroup className="flex">
    <Button id="post-feed-type-all" type="button" active={currentType === 'All'} onClick={() => onTypeChange('All')} className={buttonGroupClass}>All</Button>
    <Button id="post-feed-type-local" type="button" active={currentType === 'Local'} onClick={() => onTypeChange('Local')} className={buttonGroupClass}>Local</Button>
    <Button id="post-feed-type-modview" type="button" active={currentType === 'ModeratorView'} onClick={() => onTypeChange('ModeratorView')} className={buttonGroupClass}>Moderator View</Button>
    <Button id="post-feed-type-subscribed" type="button" active={currentType === 'Subscribed'} onClick={() => onTypeChange('Subscribed')} className={buttonGroupClass}>Subscribed</Button>
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
  <Select value={currentSort} aria-label="Sort Select" className="h-full rounded-md bg-gray-200 dark:bg-gray-400 pl-4" onChange={newValue => onTypeChange(newValue.currentTarget.value as SortType)}>
    {sortOptions.map(({ label, value }) => (
      <Option key={value} value={value}>{label}</Option>
    ))}
  </Select>
);

interface PostFeedOptionProps {
  currentType?: ListingType
  onTypeChange: (type: ListingType) => void
  currentSort?: SortType
  onSortChange: (type: SortType) => void
  sidebarOpen?: boolean
  onSidebarSwitch?: (newState: boolean) => void;
}

const PostFeedOptions = () => (
  <div className='flex justify-between'>
    <div className='text-white flex items-center gap-8'>
      <HomeIcon className='w-24' />
      <Button type='button' className='flex items-center gap-4 px-8 !bg-opacity-0'>
        <Bars3Icon className='w-16' />
        <p>Local</p>
        <ChevronDownIcon className='w-16' />
      </Button>
      <p className='text-slate-600'>{'>'}</p>
      <Button type='button' className='flex items-center gap-4 px-8 !bg-opacity-0'>
        <ChartBarSquareIcon className='w-16' />
        <p>Active</p>
        <ChevronDownIcon className='w-16' />
      </Button>
    </div>
    <div className='text-white flex items-center gap-8'>
      <Button type='button' className='flex items-center gap-4 px-8 !bg-opacity-0'>
        
        <DocumentIcon className='w-16' />
        <p>Compact</p>
        <ChevronDownIcon className='w-16' />
      </Button>
    </div>
  </div>
);

/*
const PostFeedOptions = ({
  currentType, onTypeChange, currentSort, onSortChange, sidebarOpen, onSidebarSwitch
}: PostFeedOptionProps) => (
  <div className="flex flex-col md:flex-row mt-8 md:mt-0">
    <PostFeedType currentType={currentType} onTypeChange={onTypeChange} />
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
);*/

export default PostFeedOptions;
export { PostFeedType, PostFeedSort };
