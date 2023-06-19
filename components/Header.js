// Header.js file
import React, { useState } from 'react';
import { Button } from "@material-tailwind/react/components/Button";
import * as ReactIcons from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faGridRound } from '@fortawesome/free-solid-svg-icons';
import { MdApps } from 'react-icons/md';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
    
  const { data: session } = useSession();

  return (
    <>
    <header className='sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white'>
      <Button
        color="white"
        // buttonType="outline"
        // rounded={true}
        // iconOnly={true}
        className='ml-2 md:ml-5 h-20 w-20 border-0 shadow-none rounded-full'        
      >
         <ReactIcons.FiMenu className='menu-icon' size={30} />
      </Button>

      <img src='googledocs.png'alt="Google Docs Icon" className='description' />

      <h2 className='flex text-gray-700 text-2xl'>Docs</h2>

      <div className='mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md ' >
        <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
        <input type='text' placeholder='Search'
          className='flex-grow px-5 text-base bg-transparent outline-none'
         />
      </div>

      <Button
        color="white"
        // buttonType="outline"
        // rounded={true}
        // iconOnly={true}
        // ripple={true}
        className='hidden md:inline-flex ml-5 md:ml-20 h-20 w-20 border-0 rounded-full shadow-none'        
      >
        <MdApps className='app-grid-icon' size={35} />
      </Button>

      <img 
      onClick={signOut}
        loading='lazy'
        className='md:inline-flex cursor-pointer h-12 w-12 rounded-full ml-2'
        src={session?.user?.image}
        // src='bw-profile.png'
        alt="oo"
       />

    </header>
    </>
  );
}