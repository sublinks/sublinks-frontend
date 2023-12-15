'use client';

import {
  Button
} from '@/components/TailwindMaterial';
import React from 'react';
import { H2 } from '../text';

const darkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-full h-full" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const ThemeSwitch = ({ mode, onSwitch }: { mode: 'dark' | 'light', onSwitch: (newState: 'dark' | 'light') => void }) => (
  <Button
    onClick={() => {
      onSwitch(mode === 'light' ? 'dark' : 'light');
    }}
    className="w-full h-full bg-transparent dark:text-gray-200 text-gray-800 relative flex justify-center items-center py-8"
  >
    <div className="w-32 bg-gray-500 rounded-xl mr-8">
      <div className="w-16 h-16 dark:translate-x-3/4 bg-gray-400 dark:bg-green-800 rounded-xl m-2 transition duration-300 p-2">
        {darkIcon}
      </div>
    </div>
    <H2 className="text-gray-600 dark:text-gray-200 text-md">
      Dark Mode
    </H2>
  </Button>
);

export default ThemeSwitch;
