import React, { useState } from 'react';
import { Button } from "@material-tailwind/react/components/Button";
import * as ReactIcons from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    
  return (
    <>
    <div className='sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white'>
      <Button
        color="white"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
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
    </div>
    </>
  );
}