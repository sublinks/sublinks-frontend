'use client';

import React from 'react';
import cx from 'classnames';

interface SortProps {
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

const Select = ({
  className, value, onChange, children
}: SortProps) => (
  <select onChange={onChange} value={value} className={cx('h-full rounded-md bg-gray-200 dark:bg-gray-400 pl-4', className)}>
    {children}
  </select>
);

interface OptionProps {
  value?: string;
  children: React.ReactNode;
}

const Option = ({ children, value }: OptionProps) => (
  <option value={value}>
    {children}
  </option>
);

export default Select;
export { Option };
