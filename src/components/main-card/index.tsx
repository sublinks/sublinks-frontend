import React from 'react';

import { BodyText, H1, PaleBodyText } from '../text';
import PostVotes from '../post-votes';

interface MainCardProps {
  title: string;
  body?: string;
  subTitle?: string;
  imageUrl?: string;
  videoUrl?: string;
}

const MainCard = ({
  title, body, subTitle, imageUrl, videoUrl
}: MainCardProps): React.ReactNode => (
  <div className="flex flex-col md:mx-40 p-12 md:border md:border-gray-300 md:dark:border-gray-900 md:rounded-md shadow-lg">
    <div className="flex items-center gap-12">
      <PostVotes points={123} />
      <div className="flex flex-col">
        <H1>{title}</H1>
        {subTitle && <PaleBodyText className="text-sm">{subTitle}</PaleBodyText>}
      </div>
    </div>
    {body && (
      <div className="mt-24">
        <BodyText>{body}</BodyText>
      </div>
    )}
  </div>
);

export default MainCard;
