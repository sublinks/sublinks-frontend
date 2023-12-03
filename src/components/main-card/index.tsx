import React from 'react';

import { BodyText, H1 } from '../text';

interface MainCardProps {
  LeftHeaderComponent?: React.JSX.Element;
  title: string;
  body?: string;
  SubTitle?: React.JSX.Element;
  imageUrl?: string;
  videoUrl?: string;
}

const MainCard = ({
  LeftHeaderComponent, title, body, SubTitle, imageUrl, videoUrl
}: MainCardProps): React.ReactNode => (
  <div className="flex flex-col md:mx-40 p-12 md:border md:border-gray-300 md:dark:border-gray-900 md:rounded-md shadow-lg">
    <div className="flex items-center gap-12">
      {LeftHeaderComponent}
      <div className="flex flex-col">
        <H1>{title}</H1>
        {SubTitle}
      </div>
    </div>
    {body && (
      <div className="mt-24">
        <BodyText className="text-sm">{body}</BodyText>
      </div>
    )}
  </div>
);

export default MainCard;
