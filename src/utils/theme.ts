'use client';

import { useLocalStorage } from './localstorage';


export function useTheme() {
  return useLocalStorage('theme', typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
