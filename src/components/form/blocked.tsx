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
import { CommunityBlockView, InstanceBlockView, PersonBlockView } from 'sublinks-js-client';
import { revalidateAll } from '@/utils/server-actions';
import { Selector } from '../input/select';

type TargetType = 'community' | 'instance' | 'user';

type BlockedTargets = {
  id: number;
  name: string;
  avatar?: string;
}[];

interface BlockedTargetsProps {
  blocked: CommunityBlockView[] | InstanceBlockView[] | PersonBlockView[];
  type: TargetType;
}

const BLOCK_FIELD_IDS = {
  BLOCK_TARGET: 'blockTarget'
};

const normalizeBlockedList = (blockedList: BlockedTargetsProps['blocked'], type: TargetType): BlockedTargets => blockedList.map(target => {
  switch (type) {
    case 'community': {
      const communityTarget = target as CommunityBlockView;
      const { id: comId, icon, name } = communityTarget.community;

      return {
        id: comId,
        avatar: icon,
        name
      };
    }
    case 'instance': {
      const instanceTarget = target as InstanceBlockView;
      const { id: instId, domain } = instanceTarget.instance;

      return {
        id: instId,
        name: domain
      };
    }
    // Assume user type
    default: {
      const userTarget = target as PersonBlockView;
      const { id: userId, avatar, name: username } = userTarget.target;

      return {
        id: userId,
        avatar,
        name: username
      };
    }
  }
});

const BlockedTargetsForm = ({ blocked, type }: BlockedTargetsProps) => {
  const normalizedBlocked = normalizeBlockedList(blocked, type);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blockedTargets, setBlockedTargets] = useState(normalizedBlocked);

  const handleTargetSelected = async (event: ChangeEvent<HTMLSelectElement>) => {
    const targetIdToBlock = parseInt(event.target.value, 10);

    setIsSubmitting(true);

    try {
      await SublinksApi.Instance().Client().blockPerson({
        person_id: targetIdToBlock,
        block: true
      });
      SublinksApi.Instance().clearCache();
      await revalidateAll();

      toast.success('Person was blocked');
    } catch (e) {
      toast.error('Block failed');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col max-lg:w-full">
      <Selector
        id={BLOCK_FIELD_IDS.BLOCK_TARGET}
        label={type.toUpperCase()}
        options={[{
          value: 2,
          label: 'joy'
        },
        {
          value: 3,
          label: 'max'
        },
        {
          value: 4,
          label: 'mia'
        }]}
        placeholder={{
          value: undefined,
          label: `Search ${type}`
        }}
        onChange={handleTargetSelected}
        disabled={isSubmitting}
      />
      <ul>
        {blockedTargets.map(target => <li key={target.id}>{target.name}</li>)}
      </ul>
    </div>
  );
};

export default BlockedTargetsForm;
