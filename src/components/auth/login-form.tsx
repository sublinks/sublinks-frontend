'use client';

import React from 'react';

import { InputField } from '@/components/input';
import Button from '@/components/button';

const LoginForm = () => (
  <div className="flex flex-col">
    <div className="flex flex-col gap-16 mb-32">
      <InputField type="text" label="Username" name="username" id="username" placeholder="Username" showBorderPlaceholder />
      <InputField type="password" label="Password" name="password" id="password" placeholder="Password" showBorderPlaceholder />
    </div>
    <Button type="submit">Login</Button>
  </div>
);

export default LoginForm;
