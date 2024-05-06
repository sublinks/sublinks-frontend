'use client';

import { MyUserInfo } from 'sublinks-js-client';

import SublinksApi from '@/utils/api-client/client';
import React, {
  createContext, useEffect, useMemo, useState
} from 'react';
import logger from '@/utils/logger';

interface UserData {
  auth?: boolean;
  myUser?: MyUserInfo;
}

interface UserContextState {
  userData: UserData;
  clearMyUser: () => void;
  saveMyUserFromSite: () => void;
}

// Placeholders to make sure TS always considers the props defined
export const UserContext = createContext<UserContextState>({
  userData: {},
  clearMyUser: () => {},
  saveMyUserFromSite: () => {}
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({});

  const saveMyUserFromSite = async () => {
    try {
      const site = await SublinksApi.Instance().Client().getSite();
      setUserData({
        auth: Boolean(site.my_user),
        myUser: site.my_user
      });
    } catch (e) {
      logger.error('Failed to get site for user context', e);
    }
  };

  const clearMyUser = () => setUserData({
    auth: false,
    myUser: undefined
  });

  useEffect(() => {
    saveMyUserFromSite();
  }, []);

  const providerValue = useMemo((): UserContextState => ({
    userData,
    clearMyUser,
    saveMyUserFromSite
  }), [userData]);

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};

export default UserProvider;
