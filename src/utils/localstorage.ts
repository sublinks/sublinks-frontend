import React, { useDebugValue, useEffect, useState } from 'react';
import getLocalstorage from './getLocalstorage';

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
  initialState: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<S>>] => {
  const [state, setState] = useState(getLocalstorage('sidebar', initialState));
  useDebugValue(state);
  if (!key) throw new Error('useLocalStorage key may not be falsy');

  const initialStateRef = React.useRef(true);

  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value !== null) setState(parse(value));
    setTimeout(() => {
      // Workaround for that the other useEffect does not run on first render
      initialStateRef.current = false;
    }, 0);
  }, [key]);

  useEffect(() => {
    if (initialStateRef.current) return;
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
