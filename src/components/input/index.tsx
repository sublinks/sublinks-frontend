import React from 'react';
import cx from 'classnames';

import Icon, { ICON_SIZE } from '../icon';
import { PaleBodyText } from '../text';

interface InputFieldProps {
  type: string;
  label: string;
  name: string;
  id: string;
  placeholder: string;
  LeftIcon?: React.FunctionComponent;
  className?: string;
  inputClassName?: string;
  showBorderPlaceholder?: boolean;
}

const InputField = ({
  type, label, name, id, placeholder, LeftIcon, className, inputClassName, showBorderPlaceholder
}: InputFieldProps) => (
  <div className={cx('bg-primary dark:bg-gray-800 rounded-md', className)}>
    <label htmlFor={name} className="sr-only">
      {label}
    </label>
    <div className="relative flex items-center border-2 border-gray-300 dark:border-gray-900 rounded-md px-8">
      {LeftIcon && (
        <span className="aria-hidden">
          <Icon IconType={LeftIcon} size={ICON_SIZE.SMALL} />
        </span>
      )}
      <input
        type={type}
        name={name}
        id={id}
        className={cx('peer block w-full rounded-md border-0 py-4 px-8 text-gray-900 dark:text-white bg-primary dark:bg-gray-800 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6', inputClassName)}
        placeholder={placeholder}
      />
      {showBorderPlaceholder && <PaleBodyText className="absolute text-xs bg-primary dark:bg-gray-800 -top-12 px-4 peer-placeholder-shown:hidden rounded-t-md border-t-2 border-x-2 dark:dark:border-gray-900">{placeholder}</PaleBodyText>}
    </div>
  </div>
);

export {
  InputField
};
