import { Button } from "@material-tailwind/react";
import { BsFileEarmarkTextFill, BsFillShareFill } from 'react-icons/bs';
// import { BiSolidShareAlt } from 'react-icons';
import { useRouter } from "next/router";
import db from '../../firebase';
import { useDocumentOnce, useCollectionOnce } from "react-firebase-hooks/firestore";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Login from "@/components/Login";
import { Spinner } from "@material-tailwind/react";
import TextEditor from "@/components/TextEditor";


export default function Doc() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session?.user?.email).collection("docs").doc(id)
  );

  if(!loadingSnapshot && !snapshot?.data()?.filename) 
    router.replace('/');

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push('/')} className="cursor-pointer">
          <BsFileEarmarkTextFill name="article" size={40} color="#4285F4" />
        </span>

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
          <div className="mr-3 mb-1">
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
