"use client";

import UserProvider from "@/context/user";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </UserProvider>
  );
}
