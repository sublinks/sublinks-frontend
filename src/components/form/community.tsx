'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@material-tailwind/react';

import { Checkbox, InputField, MarkdownTextarea } from '@/components/input';
import Button from '@/components/button';
import { BodyTitleInverse, ErrorText, PaleBodyText } from '@/components/text';
import SublinksApi from '@/utils/api-client/client';
import { uploadImage } from '@/utils/api-helpers';
import logger from '@/utils/logger';

const INPUT_IDS = {
  NAME: 'name',
  TITLE: 'title',
  ICON: 'icon',
  BANNER: 'banner',
  DESCRIPTION: 'description',
  NSFW: 'nsfw',
  MODS_ONLY: 'mods-only'
};

const REQUIRED_FIELDS = [
  INPUT_IDS.NAME,
  INPUT_IDS.TITLE
];

const CommunityForm = () => {
  const router = useRouter();
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateRequiredFields = (fieldValues: Record<string, string | File>) => {
    const emptyFields: string[] = [];

    REQUIRED_FIELDS.forEach(fieldKey => {
      const key = fieldKey as keyof typeof fieldValues;

      if (!fieldValues[key]) {
        emptyFields.push(key);
      }
    });

    return emptyFields;
  };

  const communityCreateAction = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setErroneousFields([]);

    const fieldValues = {
      name: formData.get(INPUT_IDS.NAME) as string,
      title: formData.get(INPUT_IDS.TITLE) as string,
      icon: formData.get(INPUT_IDS.ICON) as File,
      banner: formData.get(INPUT_IDS.BANNER) as File,
      description: formData.get(INPUT_IDS.DESCRIPTION) as string,
      nsfw: formData.get(INPUT_IDS.NSFW) as string,
      modsOnly: formData.get(INPUT_IDS.MODS_ONLY) as string
    };
    let iconUrl;
    let bannerUrl;

    const emptyFields = validateRequiredFields(fieldValues);
    if (emptyFields.length > 0) {
      setErroneousFields(emptyFields);
      setErrorMessage('Please enter all required information');
      setIsSubmitting(false);
      return;
    }

    if (fieldValues.icon && fieldValues.icon.size > 0) {
      iconUrl = await uploadImage(fieldValues.icon);
    }

    if (fieldValues.banner && fieldValues.banner.size > 0) {
      bannerUrl = await uploadImage(fieldValues.banner);
    }

    try {
      await SublinksApi.Instance().Client().createCommunity({
        name: fieldValues.name,
        title: fieldValues.title,
        description: fieldValues.description,
        icon: iconUrl,
        banner: bannerUrl,
        nsfw: Boolean(fieldValues.nsfw),
        posting_restricted_to_mods: Boolean(fieldValues.modsOnly)
      });
      router.push(`/c/${fieldValues.name}`);
    } catch (e) {
      logger.error('Community creation attempt failed', e);
      setErrorMessage('Could not create community. Please try again.');
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

  return (
    <form action={communityCreateAction} onChange={handleFieldValueChange} className="flex flex-col">
      <div className="flex flex-col gap-16">
        <div>
          <InputField
            type="text"
            label="Name"
            name={INPUT_IDS.NAME}
            id={INPUT_IDS.NAME}
            placeholder="Name"
            showBorderPlaceholder
            disabled={isSubmitting}
            hasError={erroneousFields.includes(INPUT_IDS.NAME)}
            inputPattern="[a-z_]+"
          />
          <PaleBodyText className="text-sm">Only lowercase letters and underscores allowed. Cannot be changed.</PaleBodyText>
        </div>
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
        <InputField
          type="file"
          label="Icon"
          name={INPUT_IDS.ICON}
          id={INPUT_IDS.ICON}
          placeholder="Icon"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(INPUT_IDS.ICON)}
        />
        <InputField
          type="file"
          label="Banner"
          name={INPUT_IDS.BANNER}
          id={INPUT_IDS.BANNER}
          placeholder="Banner"
          showBorderPlaceholder
          disabled={isSubmitting}
          hasError={erroneousFields.includes(INPUT_IDS.BANNER)}
        />
        <MarkdownTextarea id={INPUT_IDS.DESCRIPTION} label="Description" initialValue="**Description**" />
        <Checkbox label="Allow NSFW content" name={INPUT_IDS.NSFW} id={INPUT_IDS.NSFW} />
        <Checkbox label="Only allow moderators to post" name={INPUT_IDS.MODS_ONLY} id={INPUT_IDS.MODS_ONLY} />
      </div>
      <div aria-live="polite" className="h-32">
        {errorMessage && <ErrorText className="text-sm">{errorMessage}</ErrorText>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="flex justify-center">
        {/*
        // @ts-expect-error MT isn't up to date with their React types as of 2.1.9 */}
        {isSubmitting ? <Spinner className="h-24 w-24" /> : <BodyTitleInverse>Create Community</BodyTitleInverse>}
      </Button>
    </form>
  );
};

export default CommunityForm;
