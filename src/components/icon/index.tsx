import React from 'react';
import cx from 'classnames';

export const ICON_SIZE = {
  SMALL: 1,
  MEDIUM: 2
};

const sizeClassMap = {
  [ICON_SIZE.SMALL]: 'h-24 w-24',
  [ICON_SIZE.MEDIUM]: 'h-32 w-32'
};

interface IconProps {
  IconType: React.FunctionComponent<{ title?: string; titleId?: string; }>;
  size: typeof ICON_SIZE[keyof typeof ICON_SIZE];
  title?: string;
  titleId?: string;
}

const Icon = ({
  IconType, size, title, titleId
}: IconProps) => (
  <div className={cx(sizeClassMap[size], 'text-gray-700')}>
    <IconType title={title} titleId={titleId} />
  </div>
);

export default Icon;
