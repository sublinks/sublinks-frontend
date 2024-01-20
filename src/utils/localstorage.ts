import React, { useDebugValue, useEffect, useState } from 'react';

const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

// Disabled exhaustive-deps because we don't want to run it if those changes

export const useLocalStorage = <S>(
  key: string,
  initialState?: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState as S);
  useDebugValue(state);
  if (!key) throw new Error('useLocalStorage key may not be falsy');


  const initial = React.useRef(true);

  useEffect(() => {
    if (initial.current) {
      const item = localStorage.getItem(key);
      console.log('localstorage', key, item);
      if (item !== null) setState(parse(item));
      initial.current = false;
      return;
    }
    console.log('useEffect', key, JSON.stringify(state));
    localStorage.setItem(key, JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, initial.current]);

  return [state, setState];
};
