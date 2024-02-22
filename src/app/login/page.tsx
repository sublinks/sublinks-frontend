import React from 'react';

import { BodyText, H1, LinkText } from '@/components/text';
import Link from 'next/link';
import LoginForm from '@/components/auth/login-form';

const Login = () => (
  <div className="flex flex-col items-center p-24 md:p-56 w-full">
    <div className="w-full md:w-500">
      <H1>Login</H1>
      <div className="text-sm mt-12 mb-24">
        <BodyText>{'Don’t have an account? '}</BodyText>
        <Link href="/signup">
          <LinkText>Sign up</LinkText>
        </Link>
      </div>
      <LoginForm />
    </div>
  </div>
);

export default Login;
