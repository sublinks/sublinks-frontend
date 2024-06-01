import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';

import Icon, { ICON_SIZE } from '../icon';

interface SelectorProps {
  id: string;
  label: string;
  options: {
    value: string | number;
    label: string;
  }[];
  placeholder?: {
    value: string | number | undefined;
    label: string;
  };
  disabled?: boolean;
  hasError?: boolean;
}

const Selector = ({
  id, label, options, placeholder, disabled, hasError
}: SelectorProps) => (
  <div className="relative bg-primary dark:bg-gray-800 rounded-md">
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <select
      name={id}
      id={id}
      className={cx('w-full bg-primary dark:bg-gray-800 text-gray-900 dark:text-white flex h-40 items-center border-2 rounded-md px-16 appearance-none', hasError ? 'border-red-700 dark:border-red-400' : 'border-gray-300 dark:border-gray-900')}
      disabled={disabled}
    >
      {placeholder && <option value={placeholder.value}>{placeholder.label}</option>}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <div className="absolute right-16 top-8"><Icon IconType={ChevronDownIcon} size={ICON_SIZE.SMALL} /></div>
  </div>
);

export {
  Selector
};
