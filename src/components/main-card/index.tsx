import React from 'react';

import { BodyText } from '../text';

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
  <div className="flex flex-col">
    <h1>{title}</h1>
    <BodyText>{body}</BodyText>
  </div>
);

export default MainCard;
