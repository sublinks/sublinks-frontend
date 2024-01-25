import React from 'react';

import { BodyText, H1, LinkText } from '@/components/text';
import Link from 'next/link';
import { InputField } from '@/components/input';
import Button from '@/components/button';

const Login = () => (
  <div className="flex flex-col p-56 max-w-500">
    <H1>Login</H1>
    <div className="text-sm mt-12 mb-24">
      <BodyText>{'Don’t have an account? '}</BodyText>
      <Link href="/register">
        <LinkText>Join</LinkText>
      </Link>
    </div>
    <div className="flex flex-col gap-16 mb-32">
      <InputField type="text" label="Username" name="username" id="username" placeholder="Username" showBorderPlaceholder />
      <InputField type="password" label="Password" name="password" id="password" placeholder="Password" showBorderPlaceholder />
    </div>
    <Button type="submit">Login</Button>
  </div>
);

export default Login;
