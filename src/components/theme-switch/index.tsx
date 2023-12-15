'use client';

import {
  Button
} from '@/components/TailwindMaterial';
import React from 'react';

const ThemeSwitch = ({ mode, onSwitch }: { mode: 'dark' | 'light', onSwitch: (newState: 'dark' | 'light') => void }) => (
  <Button
    onClick={() => {
      onSwitch(mode === 'dark' ? 'light' : 'dark');
    }}
    className="w-full h-full rounded-b-none rounded-t-md md:rounded-b-md md:rounded-t-none bg-gray-200 dark:bg-primary-dark dark:text-gray-200 text-gray-800"
  >
    {mode === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
  </Button>
);

export default ThemeSwitch;
