import React from 'react';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import Router from 'next/router';

const handleSignIn = () => {
  console.log('Sign in clicked');
  Router.push('/index.js'); // Replace '/index' with the actual path to your index.js file
};

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <img
        src='https://play-lh.googleusercontent.com/emmbClh_hm0WpWZqJ0X59B8Pz1mKoB9HVLkYMktxhGE6_-30SdGoa-BmYW73RJ8MGZQ' // Updated path
        alt='Google Docs'
        className='h-80 w-70'
      />
      <Button className='w-44 mt-10' color='blue' onClick={signIn}>
        Login
      </Button>
    </div>
  );
}
