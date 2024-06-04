'use client';

type Theme = 'light' | 'dark';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { handleSaveUserSettings } from '@/utils/settings';

export function useTheme(initialTheme?: Theme ) {
   initialTheme = initialTheme ?? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

   const [theme, setTheme] = useLocalStorage('theme', initialTheme);

   const saveTheme = async (newTheme) => {
      const oldTheme = theme;
      setTheme(newTheme);
      
      const newUserSettings = await handleSaveUserSettings({ theme: newTheme });
   }

   return [theme, saveTheme];
}
