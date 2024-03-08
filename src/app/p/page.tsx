import React from 'react';

import MainCard from '@/components/main-card';
import { BodyTitleInverse, H1 } from '@/components/text';
import { Checkbox, InputField, MarkdownTextarea } from '@/components/input';
import Button from '@/components/button';

const PostCreate = () => {
  const Header = <H1>Create Post</H1>;

  return (
    <MainCard Header={Header}>
      <form className="mt-24 max-w-500">
        <div className="flex flex-col gap-16">
          <InputField type="text" label="Title" name="title" id="title" placeholder="Post Title" showBorderPlaceholder />
          <InputField type="text" label="URL" name="url" id="url" placeholder="URL" showBorderPlaceholder />
          <InputField type="file" label="Media" name="media" id="media" placeholder="Media" showBorderPlaceholder inputClassName="mt-8 file:text-gray-200 file:dark:text-black file:px-8 file:py-4 file:bg-brand dark:file:bg-brand-dark file:border file:rounded-md rounded" />
          <MarkdownTextarea label="Body" id="body" />
          <Checkbox label="NSFW" id="nsfw" name="nsfw" />
          <Button type="submit" id="create-post">
            <BodyTitleInverse>Create</BodyTitleInverse>
          </Button>
        </div>
      </form>
    </MainCard>
  );
};

export default PostCreate;
