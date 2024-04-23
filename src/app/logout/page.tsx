'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import SublinksApi from '@/utils/api-client/client';
import { UserContext } from '@/context/user';
import { Spinner } from '@material-tailwind/react';
import { BodyTitle } from '@/components/text';

const Logout = () => {
  const router = useRouter();
  const { userData, clearMyUser } = useContext(UserContext);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const logout = async () => {
      await SublinksApi.Instance().logout();
      clearMyUser();
      router.replace('/');
    };

    if (isProcessing) {
      return;
    }

    if (userData.auth) {
      setIsProcessing(true);
      logout();
    } else if (userData.auth === false) {
      setIsProcessing(true);
      router.replace('/');
    }

    logout();
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full mt-56 flex flex-col gap-8 items-center justify-center">
      <BodyTitle>Logging out...</BodyTitle>
      <Spinner className="h-48 w-48" />
    </div>
  );
};

export default Logout;
