'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import SublinksApi from '@/utils/api-client/client';
import { UserContext } from '@/context/user';
import { Spinner } from '@nextui-org/react';
import { BodyTitle } from '@/components/text';

const Logout = () => {
  const router = useRouter();
  const { clearMyUser } = useContext(UserContext);

  useEffect(() => {
    const logout = async () => {
      await SublinksApi.Instance().logout();
      clearMyUser();
      router.replace('/');
    };

    logout();
  }, [clearMyUser, router]);

  return (
    <div className="w-full mt-56 flex flex-col gap-8 items-center justify-center">
      <BodyTitle>Logging out...</BodyTitle>
      <Spinner className="h-48 w-48" />
    </div>
  );
};

export default Logout;
