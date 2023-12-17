import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const el = ref?.current;
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      callback();
    }

    window?.addEventListener('mousedown', handleClick, { capture: true });
    return () => {
      window?.removeEventListener('mousedown', handleClick, { capture: true });
    };
  }, [callback, ref]);

  return ref;
}
