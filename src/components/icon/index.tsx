import { ValueOf } from 'next/dist/shared/lib/constants';
import React from 'react';

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
  size: ValueOf<typeof ICON_SIZE>;
  title?: string;
  titleId?: string;
}

const Icon = ({
  IconType, size, title, titleId
}: IconProps) => (
  <div className={sizeClassMap[size]}>
    <IconType title={title} titleId={titleId} />
  </div>
);

export default Icon;
