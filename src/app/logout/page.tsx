'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import SublinksApi from '@/utils/client';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      await SublinksApi.Instance().logout();
      router.replace('/');
    };

    logoutUser();
  });

  return null;
};

export default Logout;
