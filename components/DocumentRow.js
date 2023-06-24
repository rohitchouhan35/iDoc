import React from 'react';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { BsFileEarmarkTextFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md'
import db from '../firebase';
import { useSession, getSession } from 'next-auth/react';

export default function DocumentRow({ id, filename, date }) {
  const { data: session, status } = useSession();
  const router = useRouter(); 

  function handleOptions() {
    alert('option is clicked');
    db.collection('userDocs').doc(session?.user?.email).collection('docs')
      .doc(id)
      .delete()
      .then(() => {
        console.log('File deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
  }

  return (
    <div className='main flex items-center'>
    <div 
    onClick={() => router.push(`/doc/${id}`)}
    className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer'>
      <BsFileEarmarkTextFill name="article" size={24} color="#4285F4" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{filename}</p>
      <p className="pr-5 text-sm ml-60">
        {date?.toDate().toLocaleDateString()}
      </p>
      <Button
        color='white'
        variant="outlined"
        rounded={true}
        ripple={true}
        className='border-0 '
      >
      </Button>
    </div>
    <div onClick={handleOptions}>
          <MdDelete 
            className='hover:bg-red-500 cursor-pointer'
            size={20} />
        </div>
    </div>
  );
}
