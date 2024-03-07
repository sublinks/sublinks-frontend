import React from 'react';
import cx from 'classnames';

export const ICON_SIZE = {
  VERYSMALL: 0,
  SMALL: 1,
  MEDIUM: 2
};

const wrapperSizeClassMap = {
  [ICON_SIZE.VERYSMALL]: 'h-20 w-20',
  [ICON_SIZE.SMALL]: 'h-24 w-24',
  [ICON_SIZE.MEDIUM]: 'h-32 w-32'
};
const iconSizeClassMap = {
  [ICON_SIZE.SMALL]: 24,
  [ICON_SIZE.MEDIUM]: 32
};

interface IconProps {
  IconType: React.FunctionComponent<{
    title?: string;
    titleId?: string;
    height?: string | number;
    width?: string | number;
    className?: string;
  }>;
  size: typeof ICON_SIZE[keyof typeof ICON_SIZE];
  title?: string;
  titleId?: string;
  className?: string;
  textClassName?: string;
  isInteractable?: boolean;
  onAnimationEnd?: () => void;
}

const Icon = ({
  IconType, size, title, titleId, className, isInteractable, textClassName, onAnimationEnd
}: IconProps) => (
  <span onAnimationEnd={onAnimationEnd} className={cx(wrapperSizeClassMap[size], {
    'text-gray-700 dark:text-white': !textClassName,
    'hover:text-brand dark:hover:text-brand-dark transition-text duration-200': isInteractable && !textClassName
  }, className, textClassName, 'block')}
  >
    <IconType
      title={title}
      titleId={titleId}
      height={iconSizeClassMap[size]}
      width={iconSizeClassMap[size]}
    />
  </span>
);

export default Icon;
