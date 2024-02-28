'use client';

import { MyUserInfo } from 'sublinks-js-client';

import SublinksApi from '@/utils/api-client/client';
import React, {
  createContext, useEffect, useMemo, useState
} from 'react';

interface UserContextState {
  myUser?: MyUserInfo; // Undefined when user is not logged in
  clearMyUser: () => void;
  saveMyUserFromSite: () => void;
}

// Placeholders for function to make sure TS always considers it defined
export const UserContext = createContext<UserContextState>({
  clearMyUser: () => {},
  saveMyUserFromSite: () => {}
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [myUser, setMyUser] = useState<MyUserInfo>();

  const saveMyUserFromSite = async () => {
    const site = await SublinksApi.Instance().Client().getSite();

    if (site.my_user) {
      setMyUser(site.my_user);
    }
  };

  const clearMyUser = () => setMyUser(undefined);

  useEffect(() => {
    saveMyUserFromSite();
  }, []);

  const providerValue = useMemo((): UserContextState => ({
    myUser,
    clearMyUser,
    saveMyUserFromSite
  }), [myUser]);

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};

export default UserProvider;
