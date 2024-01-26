import React from 'react';
import cx from 'classnames';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputField } from '../input';

const searchSharedClasses = 'group-focus-within:text-brand dark:group-focus-within:text-brand-dark dark:group-hover:text-brand-dark group-hover:text-brand';

const HeaderSearch = () => (
  <InputField
    type="text"
    name="search"
    id="search"
    label="Search"
    placeholder="Search"
    LeftIcon={MagnifyingGlassIcon}
    className="w-108 lg:w-200 xl:w-240 xl:hover:w-460 xl:focus-within:w-460 transition-all duration-300 group"
    iconClassName={searchSharedClasses}
    showBorderPlaceholder
    inputClassName={cx(searchSharedClasses, 'group-focus-within:placeholder-brand dark:group-focus-within:placeholder-brand-dark dark:group-hover:placeholder-brand-dark group-hover:placeholder-brand')}
    borderPlaceholderClassName={searchSharedClasses}
  />
);

export default HeaderSearch;
