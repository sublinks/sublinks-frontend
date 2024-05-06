'use client';

import React, {
  FormEvent, useContext, useEffect, useState
} from 'react';
import { useRouter } from 'next/navigation';
import { CommunityView } from 'sublinks-js-client';
import { Spinner } from '@material-tailwind/react';

import { Checkbox, InputField, MarkdownTextarea } from '@/components/input';
import Button from '@/components/button';
import { Selector } from '@/components/input/select';
import { BodyTitleInverse, ErrorText, PaleBodyText } from '@/components/text';
import SublinksApi from '@/utils/api-client/client';
import logger from '@/utils/logger';
import { UserContext } from '@/context/user';
import { isImage } from '@/utils/links';
import { getCommunitySlugFromUrl } from '@/utils/communities';

interface PostFormProps {
  communities: CommunityView[];
}

const INPUT_IDS = {
  COMMUNITY: 'community',
  TITLE: 'title',
  URL: 'url',
  MEDIA: 'media',
  ALT: 'alt',
  BODY: 'body',
  NSFW: 'nsfw'
};

const REQUIRED_FIELDS = [
  INPUT_IDS.COMMUNITY,
  INPUT_IDS.TITLE
];

const PostForm = ({ communities }: PostFormProps) => {
  const router = useRouter();
  const { userData } = useContext(UserContext);
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMediaPost, setIsMediaPost] = useState(false);

  useEffect(() => {
    if (userData.auth === false) {
      router.push('/login');
    }
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

  const validateRequiredFields = (fieldValues: Record<string, string | number | File>) => {
    const emptyFields: string[] = [];

    REQUIRED_FIELDS.forEach(fieldKey => {
      const key = fieldKey as keyof typeof fieldValues;

      if (!fieldValues[key]) {
        emptyFields.push(key);
      }
    });

    return emptyFields;
  };

  const uploadPostImage = async (postImage: File) => {
    try {
      const { url } = await SublinksApi.Instance().Client().uploadImage({
        image: postImage
      });
      return url;
    } catch (e) {
      logger.error('Unable to upload image for post', postImage, e);
    }

    return undefined;
  };

  const handleCreationAttempt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setErroneousFields([]);

    const formData = new FormData(event.currentTarget);
    const fieldValues = {
      community: parseInt(formData.get(INPUT_IDS.COMMUNITY) as string, 10),
      title: formData.get(INPUT_IDS.TITLE) as string,
      url: formData.get(INPUT_IDS.URL) as string,
      media: formData.get(INPUT_IDS.MEDIA) as File,
      alt: formData.get(INPUT_IDS.ALT) as string,
      body: formData.get(INPUT_IDS.BODY) as string,
      nsfw: formData.get(INPUT_IDS.NSFW) as string
    };
    let imageUrl;

    const emptyFields = validateRequiredFields(fieldValues);
    if (emptyFields.length > 0) {
      setErroneousFields(emptyFields);
      setErrorMessage('Please enter all required information');
      setIsSubmitting(false);
      return;
    }

    if (fieldValues.media && isImage(fieldValues.media.name)) {
      imageUrl = await uploadPostImage(fieldValues.media);
    }

    try {
      const { post_view: postView } = await SublinksApi.Instance().Client().createPost({
        community_id: fieldValues.community,
        name: fieldValues.title,
        url: imageUrl || fieldValues.url,
        body: fieldValues.body,
        alt_text: fieldValues.alt,
        nsfw: Boolean(fieldValues.nsfw)
      });

      const { community, post } = postView;
      const { actor_id: nativeCommunityUrl } = community;
      const { id } = post;
      const comSlug = getCommunitySlugFromUrl(nativeCommunityUrl, true);

      router.push(`/c/${comSlug}/${id}`);
    } catch (e) {
      logger.error('Post creation attempt failed', e);
      setErrorMessage('Could not create post. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleFieldValueChange = async (event: FormEvent<HTMLFormElement>) => {
    const field = event.target as HTMLInputElement;
    const fieldKey = field.id;
    const fieldIndexInErrors = erroneousFields.indexOf(fieldKey);

    if (fieldIndexInErrors !== -1) {
      const newErroneousFields = [...erroneousFields];
      newErroneousFields.splice(fieldIndexInErrors, 1);
      setErroneousFields(newErroneousFields);

      if (newErroneousFields.length === 0) {
        setErrorMessage('');
      }
    }
  };

  const communityOptions = communities.map(view => ({
    value: view.community.id,
    label: getCommunitySlugFromUrl(view.community.actor_id, false) || view.community.name
  }));

  return (
    <form onSubmit={handleCreationAttempt} onChange={handleFieldValueChange} className="flex flex-col">
      <div className="flex flex-col gap-16">
        <Selector
          id={INPUT_IDS.COMMUNITY}
          label="Community selector"
          options={communityOptions}
          placeholder={{
            value: undefined,
            label: 'Select community'
          }}
          disabled={isSubmitting}
          hasError={erroneousFields.includes(INPUT_IDS.COMMUNITY)}
        />
        <InputField
          type="text"
          label="Title"
          name={INPUT_IDS.TITLE}
          id={INPUT_IDS.TITLE}
          placeholder="Title"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(INPUT_IDS.TITLE)}
        />
        <div>
          <InputField
            type="text"
            label="URL"
            name={INPUT_IDS.URL}
            id={INPUT_IDS.URL}
            placeholder="Url"
            showBorderPlaceholder
            disabled={isSubmitting || isMediaPost}
            hasError={erroneousFields.includes(INPUT_IDS.URL)}
          />
          <PaleBodyText className="text-sm">Will be overridden by the image URL if one is submitted.</PaleBodyText>
        </div>
        <InputField
          type="file"
          label="Image"
          name={INPUT_IDS.MEDIA}
          id={INPUT_IDS.MEDIA}
          placeholder="Image"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(INPUT_IDS.MEDIA)}
          onChange={e => setIsMediaPost(Boolean(e.currentTarget.value))}
        />
        {isMediaPost && (
          <div>
            <InputField
              type="text"
              label="Image Description"
              name={INPUT_IDS.ALT}
              id={INPUT_IDS.ALT}
              placeholder="Image Description"
              showBorderPlaceholder
              disabled={isSubmitting}
              hasError={erroneousFields.includes(INPUT_IDS.ALT)}
            />
            <PaleBodyText className="text-sm">Used by screen readers to inform what the image depicts.</PaleBodyText>
          </div>
        )}
        <MarkdownTextarea id={INPUT_IDS.BODY} label="Content" initialValue="**Content**" />
        <Checkbox label="Is NSFW" name={INPUT_IDS.NSFW} id={INPUT_IDS.NSFW} />
      </div>
      <div aria-live="polite" className="h-32">
        {errorMessage && <ErrorText className="text-sm">{errorMessage}</ErrorText>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="flex justify-center">
        {/*
        // @ts-expect-error MT isn't up to date with their React types as of 2.1.9 */}
        {isSubmitting ? <Spinner className="h-24 w-24" /> : <BodyTitleInverse>Create Post</BodyTitleInverse>}
      </Button>
    </form>
  );
};

export default PostForm;
