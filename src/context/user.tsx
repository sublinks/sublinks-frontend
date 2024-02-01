'use client';

import React, { createContext, useMemo, useState } from 'react';
import { MyUserInfo } from 'sublinks-js-client';

interface UserContextState {
  myUser?: MyUserInfo,
  setMyUser: React.Dispatch<React.SetStateAction<MyUserInfo | undefined>>
}

export const UserContext = createContext<UserContextState>({
  setMyUser: () => {}
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [myUser, setMyUser] = useState<MyUserInfo>();

  const providerValue = useMemo((): UserContextState => ({
    myUser,
    setMyUser
  }), [myUser]);

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};

export default UserProvider;
