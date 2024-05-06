import React from 'react';

import { H1 } from '@/components/text';
import PostForm from '@/components/form/post';

const PostCreate = () => (
  <div className="flex flex-col items-center p-24 md:p-56 w-full">
    <div className="w-full md:w-500 overflow-x-hidden">
      <H1>Create a New Post</H1>
      <div className="mt-32 pb-24">
        <PostForm />
      </div>
    </div>
  </div>
);

export default PostCreate;
