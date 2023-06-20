// index.js
// index.js

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import { Spinner } from "@material-tailwind/react";
import { Fragment } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter,} from "@material-tailwind/react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillFolder } from 'react-icons/ai';
import Image from 'next/image';
import { useSession, getSession } from 'next-auth/react';
import Login from '../components/Login';
import db, { storeUserEmail } from '../firebase';
import firebase from "firebase/compat/app";
import {
  useCollectionOnce,
} from 'react-firebase-hooks/firestore'
import DocumentRow from '@/components/DocumentRow';

export default function Home() {
  const { data: session, status } = useSession();
  const[input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [snapshot] = useCollectionOnce(
    db.collection('userDocs').doc(session?.user?.email).collection('docs').orderBy('timestamp', 'desc')
  );


  if (status === 'loading') {
    return (
      <div>
        <div className="flex items-center justify-center min-h-screen">
          <Spinner className="h-12 w-12" />
        </div>
      </div>
    );
  }

  if (!session) {
    return <Login />;
  } 

  storeUserEmail(session?.user?.email);

  const createDocument = () => {
    if(!input) return;
    
    db.collection('userDocs').doc(session?.user?.email).collection('docs').add({
      filename: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userImage: session?.user?.image
    });

    setInput('');
    setOpen(false);
  };
 
  const handleOpen = () => {
    setOpen(!open)
  };
    const modal = (
      <Fragment>
      <Dialog size='xs'  open={open} handler={handleOpen}>
        {/* <DialogHeader>Create new document</DialogHeader> */}
        <DialogBody divider>
        <input 
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          type='text'
          className='outline-none w-full text-blue-gray-700 text-xl'
          placeholder='Enter name of document...'
          onKeyDown={(e) => e.key == "Enter" && createDocument()}  
        />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={createDocument}>
            <span>Create</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
    )

  return (
    <div>
    {/* {userEmail && <UpdateUserEmail email={userEmail} />} */}
      <Head>
        <title>iDoc</title>
        <link rel="icon" href="/favicon.ico " />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Header />
      {modal}

      <section className="bg-[#F8F9FA] pb-10 px-10">
      <div className='max-w-3xl mx-auto'>
          <div className='flex items-center justify-between py-6'>
            <h2 className='text-gray-700 text-lg'>Start a new document</h2>

            <Button
              color='gray'
              // buttonType="outline"
              // iconOnly={true}
              // ripple="dark"
              className='border-0 shadow-none rounded-full'
              style={{ backgroundColor: '#F8F9FA' }}
            >
              <BsThreeDotsVertical className='options-3dots-icon' size={19} />
            </Button>
          </div>
          <div onClick={handleOpen}className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700'>
            <Image 
              src='https://links.papareact.com/pju'
              height={1000}
              width={1000}
              // priority={false}
            />
          </div>
          <p className='ml-2 mt-2 font-semibold text-sm text-gray-700' >Blank</p>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
      <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
          <div className='flex items-center justify-between px-5'>
            <h2 className='font-medium flex-grow' >My Document</h2>
            <p className='mr-12' >Date Created</p>
            <AiFillFolder name='folder' className='folder-icon' size={19} />
          </div>

        {snapshot?.docs.map(doc => (
          <DocumentRow 
            key={doc.id}
            id={doc.id}
            filename={doc.data().filename}
            date={doc.data().timestamp}
          />
        ))}

        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}