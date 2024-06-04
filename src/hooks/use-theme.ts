'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { handleSaveUserSettings } from '@/utils/settings';

export function useTheme() {

   const [theme, setTheme] = useLocalStorage('theme', typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

   const saveTheme = async (newTheme) => {
      const oldTheme = theme;
      setTheme(newTheme);
      
      const newUserSettings = await handleSaveUserSettings({ theme: newTheme });
   }

   return [theme, saveTheme];
}
