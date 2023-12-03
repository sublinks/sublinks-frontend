import React from 'react';
import Image from 'next/image';

const PostThumbnail = ({ postThumbnailUrl }: { postThumbnailUrl?: string }) => (postThumbnailUrl ? (
  <Image
    src={postThumbnailUrl}
    alt="Post thumbnail"
    sizes="160px" // Any smaller gives blurred image
    fill
    className="object-cover"
  />
) : (
  <Image
    src="/logo.png"
    alt="Post default thumbnail"
    sizes="160px" // Any smaller gives blurred image
    fill
    className="object-contain"
  />
));

export default PostThumbnail;
