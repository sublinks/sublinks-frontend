import React from 'react';

import MainCard from '@/components/main-card';
import { H1 } from '@/components/text';
import { InputField } from '@/components/input';

const PostCreate = () => {
  const Header = <H1>Create Post</H1>;

  return (
    <MainCard Header={Header}>
      <form className="mt-24 max-w-500">
        <div className="flex flex-col gap-12">
          <InputField type="text" label="Title" name="title" id="title" placeholder="Post Title" showBorderPlaceholder />
          <InputField type="text" label="URL" name="url" id="url" placeholder="URL" showBorderPlaceholder />
          <InputField type="file" label="Image" name="image" id="image" placeholder="Image" inputClassName="file:text-gray-200 file:px-8 file:py-4 file:bg-secondary-dark file:border file:rounded-md rounded" />
        </div>
      </form>
    </MainCard>
  );
};

export default PostCreate;
