'use client';

import { Button } from "@nextui-org/react";
import React from 'react';
import { H2 } from '../text';

const Switch = ({
  active, onSwitch, icon, label
}:
{
  active: boolean, onSwitch: (newState: boolean) => void, icon: React.JSX.Element, label: string
}) => (
  <Button
    onClick={() => {
      onSwitch(!active);
    }}
    className="w-full h-full bg-transparent dark:text-gray-200 text-gray-800 relative flex justify-center items-center py-8 z-10"
  >
    <div className="w-32 bg-gray-500 rounded-xl mr-8">
      {icon}
    </div>
    <H2 className="text-gray-600 dark:text-gray-200 text-md">
      {label}
    </H2>
  </Button>
);

export default Switch;
