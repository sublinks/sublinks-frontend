'use client';

import React, {
  ChangeEvent, FormEvent, useRef, useState
} from 'react';
import { toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';

import { InputField } from '@/components/input';
import Button from '@/components/button';
import { BodyTitleInverse, ErrorText, H2 } from '@/components/text';
import SublinksApi from '@/utils/api-client/client';
import logger from '@/utils/logger';
import { Selector } from '../input/select';

const BLOCK_FIELD_IDS = {
  BLOCK_TARGET: 'blockTarget'
};

const BlockedTargetsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTargetSelected = async (event: ChangeEvent<HTMLSelectElement>) => {
    const targetToBlock = event.target.value;
    console.log({ targetToBlock });
  };

  return (
    <div className="flex flex-col max-lg:w-full">
      <Selector
        id={BLOCK_FIELD_IDS.BLOCK_TARGET}
        label="Theme"
        options={[{
          value: 'kenvald',
          label: 'kenvald'
        }]}
        placeholder={{
          value: undefined,
          label: 'Search'
        }}
        onChange={handleTargetSelected}
        disabled={isSubmitting}
      />
    </div>
  );
};

export default BlockedTargetsForm;
