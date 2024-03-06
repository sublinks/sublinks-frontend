import React from 'react';
import Image from 'next/image';
import { ArrowTopRightOnSquareIcon, ChatBubbleLeftIcon, LinkIcon, PhotoIcon } from '@heroicons/react/24/outline';

const PostThumbnail = ({ postThumbnailUrl, linkPost }: { postThumbnailUrl?: string, linkPost: boolean }) => {
  if (postThumbnailUrl) {
    if (linkPost) {
      return (
        <div className='w-80 h-80 relative bg-black bg-opacity-50 rounded-lg'>
          <Image
            src={postThumbnailUrl}
            alt="Post default thumbnail"
            sizes="160px" // Any smaller gives blurred image
            fill
            className="object-contain rounded-xl hover:brightness-75 transition-all duration-200 hover:cursor-pointer"
          />
          <ArrowTopRightOnSquareIcon className='h-24 p-4 top-0 right-0 bg-black backdrop-blur bg-opacity-25 rounded-bl-lg pointer-events-none absolute text-white'/>
        </div>
      )
    } else {
      return (
        <div className='w-80 h-80 relative bg-black bg-opacity-50 rounded-lg'>
          <Image
            src={postThumbnailUrl}
            alt="Post default thumbnail"
            sizes="160px" // Any smaller gives blurred image
            fill
            className="object-contain rounded-xl hover:brightness-75 transition-all duration-200 hover:cursor-pointer"
          />
          <PhotoIcon className='scale-75 pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white'/>
        </div>
      )
    }
  } else {
    if (linkPost) {
      return (
        <div className='w-80 h-80 relative bg-black bg-opacity-50 rounded-lg'>
          <ArrowTopRightOnSquareIcon className='scale-75 pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white'/>
        </div>
      )
    } else {
      return (
        <div className='w-80 h-80 relative bg-black bg-opacity-50 hover:bg-opacity-75 rounded-lg'>
          <ChatBubbleLeftIcon className='scale-75 pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white'/>
        </div>
      )
    }
  }
};

/*
object-contain rounded-xl hover:brightness-75 transition-all duration-200 hover:cursor-pointer
*/

/*
if (postThumbnailUrl) {
    return (
      <div>
        <Image
          src="/logo.png"
          alt="Post default thumbnail"
          sizes="160px" // Any smaller gives blurred image
          fill
          className="h-160 w-160 max-h-160 max-w-160 object-contain rounded-xl hover:brightness-75 transition-all duration-200 hover:cursor-pointer"
        />
        <ArrowTopRightOnSquareIcon className='pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white'/>
      </div>
    )
  } else {
    if (linkPost) {
      return (
        <div>
          <Image
            src="/logo.png"
            alt="Post default thumbnail"
            sizes="160px" // Any smaller gives blurred image
            fill
            className="h-160 w-160 object-contain rounded-xl hover:brightness-75 transition-all duration-200 hover:cursor-pointer"
          />
          <ArrowTopRightOnSquareIcon className='pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white'/>
        </div>
      )
    } else {
      return (
        <div>
          <Image
            src="/logo.png"
            alt="Post default thumbnail"
            sizes="160px" // Any smaller gives blurred image
            fill
            className="object-contain rounded-xl hover:brightness-75 transition-all duration-200 hover:cursor-pointer"
          />
          <ChatBubbleLeftIcon className='pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white'/>
        </div>
      )
    }
  }
*/

/*
const PostThumbnail = ({ postThumbnailUrl }: { postThumbnailUrl?: string }) => (postThumbnailUrl ? (
  <ArrowTopRightOnSquareIcon />
  
  <PhotoIcon />
  <Image
    src={postThumbnailUrl}
    alt="Post thumbnail"
    sizes="160px" // Any smaller gives blurred image
    fill
    className="object-cover rounded-xl hover:brightness-75 transition-all duration-200 hover:cursor-pointer"
  />
) : (
  <Image
    src="/logo.png"
    alt="Post default thumbnail"
    sizes="160px" // Any smaller gives blurred image
    fill
    className="object-contain rounded-xl hover:brightness-75 transition-all duration-200 hover:cursor-pointer"
  />
));*/

export default PostThumbnail;
