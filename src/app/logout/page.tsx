'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import SublinksApi from '@/utils/api-client/client';
import { UserContext } from '@/context/user';

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

  return <div />;
};

export default Logout;
