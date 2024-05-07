"use client"

import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { signInUserWithEmailAndPassword } from './firebase';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    // Perform authentication logic here
    const success = await signInUserWithEmailAndPassword(email, password);
    if (success) {      // Redirect to dashboard after successful login
      console.log('Logging in with:', email, password);
      router.push('/home');
    }
    // Redirect to dashboard after successful login
  };

  return (
    <div style={{backgroundColor : "#dedcff"}} className="min-h-screen flex items-center justify-center" >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login</h2>
        <Input
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6"
        />
        <Button
          onClick={handleLogin}
          color="primary"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
