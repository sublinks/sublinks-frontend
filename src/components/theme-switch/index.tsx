'use client';

import React from 'react';
import { MoonIcon } from '@heroicons/react/24/outline';
import { MoonIcon as MoonIconSolid } from '@heroicons/react/24/solid';
import Switch from '../switch';

const ThemeSwitch = ({ mode, onSwitch }: { mode: 'dark' | 'light', onSwitch: (newState: 'dark' | 'light') => void }) => (
  <Switch
    active={mode === 'dark'}
    icon={(
      <div className="w-16 h-16 dark:translate-x-3/4 bg-gray-400 dark:bg-green-800 rounded-xl m-2 transition duration-300 p-2">
        {mode === 'light' ? <MoonIcon className="w-full h-full" /> : <MoonIconSolid className="w-full h-full" />}
      </div>
)}
    label="Dark Mode"
    onSwitch={() => onSwitch(mode === 'dark' ? 'light' : 'dark')}
  />
);

export default ThemeSwitch;
