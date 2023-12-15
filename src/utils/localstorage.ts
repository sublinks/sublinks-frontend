'use client';

import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, fallbackValue: string) {
  const [value, setValue] = useState(localStorage.getItem(key) || fallbackValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
