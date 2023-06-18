import React from 'react';
import { Button } from '@material-tailwind/react';
import { signIn } from 'next-auth/react';

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
