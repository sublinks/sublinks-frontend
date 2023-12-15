import { useLocalStorage } from './localstorage';

export function useTheme() {
  return useLocalStorage<'dark' | 'light'>('theme', 'light');
}
