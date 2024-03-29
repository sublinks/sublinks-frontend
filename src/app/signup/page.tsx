import React from 'react';

import { H1 } from '@/components/text';
import SignupForm from '@/components/auth/signup-form';

const Signup = () => (
  <div className="flex flex-col items-center p-24 md:p-56 w-full">
    <div className="w-full md:w-500 overflow-x-hidden">
      <H1>Sign Up</H1>
      <div className="text-sm mt-32">
        <SignupForm />
      </div>
    </div>
  </div>
);

export default Signup;
