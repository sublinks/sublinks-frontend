import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputField } from '../input';

const HeaderSearch = () => (
  <InputField
    type="text"
    name="search"
    id="search"
    label="Search"
    placeholder="Search"
    LeftIcon={MagnifyingGlassIcon}
    className="w-108 lg:w-200 xl:w-240 xl:hover:w-460 xl:focus-within:w-460 transition-all duration-300 group"
    iconClassName="group-focus-within:placeholder:text-brand group-hover:placeholder:text-brand dark:group-focus-within:text-brand-dark dark:group-hover:text-brand-dark group-focus-within:scale-105 group-hover:scale-105"
    showBorderPlaceholder
    inputClassName="group-focus-within:text-brand group-focus-within:placeholder-brand dark:group-focus-within:text-brand-dark dark:group-focus-within:placeholder-brand-dark dark:group-hover:text-brand-dark group-hover:text-brand dark:group-hover:placeholder-brand-dark group-hover:placeholder-brand"
    borderPlaceholderClassName="group-focus-within:text-brand group-focus-within:placeholder-brand dark:group-focus-within:text-brand-dark dark:group-focus-within:placeholder-brand-dark dark:group-hover:text-brand-dark group-hover:text-brand dark:group-hover:placeholder-brand-dark group-hover:placeholder-brand"
  />
);

export default HeaderSearch;
