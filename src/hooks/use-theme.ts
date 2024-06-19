'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { handleSaveUserSettings } from '@/utils/api-helpers';

export type Theme = 'light' | 'dark';

export function useTheme(initialTheme: Theme): { theme: Theme, saveTheme: (theme: Theme) => void } {
  const originalTheme = initialTheme ?? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const [theme, setTheme] = useLocalStorage('theme', originalTheme);

  const saveTheme = async (newTheme: Theme) => {
    setTheme(newTheme);

    await handleSaveUserSettings({ theme: newTheme });
  };

  return { theme, saveTheme };
}
