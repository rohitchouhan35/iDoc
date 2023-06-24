import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import { BsFileEarmarkTextFill, BsFillShareFill } from 'react-icons/bs';
// import { BiSolidShareAlt } from 'react-icons';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import db from '../../firebase';
import { useDocumentOnce, useCollectionOnce } from "react-firebase-hooks/firestore";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Login from "@/components/Login";
import { Spinner } from "@material-tailwind/react";
import TextEditor from "@/components/TextEditor";
import { Fragment } from "react";


export default function Doc() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const[input, setInput] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session?.user?.email).collection("docs").doc(id)
  );

  console.log(session?.user?.name);

  if(!loadingSnapshot && !snapshot?.data()?.filename) 
    router.replace('/');
  
    const handleShare = async () => {
      if (!input) return;
    
      const userEmail = input.trim(); // Extract the user email from the input and trim any whitespace
    
      try {
        // Get the user's document reference
        const userDocRef = db.collection("userDocs").doc(session.user.email).collection('docs').doc(id);
    
        // Fetch the user's document snapshot
        const userDocSnapshot = await userDocRef.get();
    
        if (userDocSnapshot.exists) {
          // Update the user's sharedFile field with the current document and session's email
          await userDocRef.update({
            sharedFile: {
              data: snapshot.data(),
              sharedBy: session.user.email,
            },
          });
    
          // Add the current document to the sharedDocs collection under the new user's email
          await db
            .collection("sharedDocs")
            .doc(userEmail)
            .collection("docs")
            .doc(id)
            .set({
              data: snapshot.data(),
              sharedBy: session.user.email,
            });
    
          alert("Sharing...");
        } else {
          // User's document doesn't exist
          console.log("User's document does not exist.");
        }
      } catch (error) {
        // Handle any errors
        console.error("Error sharing the document:", error);
      }
    
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
          onKeyDown={(e) => e.key == "Enter" && handleShare()}  
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
          <Button variant="gradient" color="blue" onClick={handleShare}>
            <span>Create</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
    )

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push('/')} className="cursor-pointer">
          <BsFileEarmarkTextFill name="article" size={40} color="#4285F4" />
        </span>

        {modal}

        <div className="flex-grow px-2"> 
          <h2 className="text-xl">{snapshot?.data()?.filename}</h2>
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>

        <Button 
          className="hidden md:inline-flex h-10 w-50">
          <div onClick={handleOpen} className="mr-3 mb-1">
          <BsFillShareFill name="people" size={20} color="white" />
          </div>
          <div className="hidden md:inline-flex">
          Share
          </div>
        </Button>

        <img
            className="cursor-pointer rounded-full h-10 w-10 ml-2"
            src={session?.user?.image}
            alt=""
        />

      </header> 

      <TextEditor />
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
