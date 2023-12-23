import React from 'react';
import Link from 'next/link';

import { PaleBodyText, PaleLinkText } from '@/components/text';

interface LinkedPostSubTitleProps {
  label: string;
  url: string;
  linkText: string;
}

const LinkedPostSubTitle = ({ label, linkText, url }: LinkedPostSubTitleProps) => (
  <div className="text-xs">
    <PaleBodyText>{label}</PaleBodyText>
    {' '}
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <PaleLinkText>{linkText}</PaleLinkText>
    </Link>
  </div>
);

export default LinkedPostSubTitle;
