import React from 'react';
import cx from 'classnames';

export const ICON_SIZE = {
  SMALL: 1,
  MEDIUM: 2
};

const wrapperSizeClassMap = {
  [ICON_SIZE.SMALL]: 'h-20 w-20',
  [ICON_SIZE.MEDIUM]: 'h-32 w-32'
};
const iconSizeClassMap = {
  [ICON_SIZE.SMALL]: 20,
  [ICON_SIZE.MEDIUM]: 32
};

interface IconProps {
  IconType: React.FunctionComponent<{
    title?: string;
    titleId?: string;
    height?: string | number;
    width?: string | number;
  }>;
  size: typeof ICON_SIZE[keyof typeof ICON_SIZE];
  title?: string;
  titleId?: string;
  className?: string;
}

const Icon = ({
  IconType, size, title, titleId, className
}: IconProps): React.ReactNode => (
  <div className={cx(wrapperSizeClassMap[size], 'text-gray-700 dark:text-white', className)}>
    <IconType
      title={title}
      titleId={titleId}
      height={iconSizeClassMap[size]}
      width={iconSizeClassMap[size]}
    />
  </div>
);

export default Icon;
