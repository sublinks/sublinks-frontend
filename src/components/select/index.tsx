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


interface OptionProps extends React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement> {
}

const Option = ({ children, ...rest }: OptionProps) => (
  <option {...rest}>
    {children}
  </option>
)

export default Select;
export { Option }