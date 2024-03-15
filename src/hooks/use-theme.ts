'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';

export function useTheme() {
  return useLocalStorage('theme', typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
