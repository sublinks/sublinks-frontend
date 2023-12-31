'use client';

import React from 'react';
import cx from "classnames"
interface SortProps extends
  React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
}

const Select = ({ className, children, ...rest }: SortProps) => (
  <select {...rest} className={cx("h-full rounded-md bg-gray-200 dark:bg-gray-400 pl-4", className)}>
   {children}
  </select>
);

export default Select;
