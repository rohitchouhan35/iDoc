import React from 'react';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { BsFileEarmarkTextFill } from 'react-icons/bs';

export default function DocumentRow({ id, filename, date }) {

  const router = useRouter();  
  return (
    <div 
    onClick={() => router.push(`/doc/${id}`)}
    className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer'>
      <BsFileEarmarkTextFill name="article" size={24} color="#4285F4" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{filename}</p>
      <p className="pr-5 text-sm">
        {date?.toDate().toLocaleDateString()}
      </p>
    </div>
  );
}
