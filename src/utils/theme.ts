'use client';

import { useLocalStorage } from './localstorage';

export function useTheme() {
  return useLocalStorage('theme', window && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
