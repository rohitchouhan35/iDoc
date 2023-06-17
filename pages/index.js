import Head from 'next/head'
import Header from '@/components/Header'
import { Button } from '@material-tailwind/react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillFolder } from 'react-icons/ai'; 
import Image from 'next/image';
import { SessionProvider, useSession, getSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  <SessionProvider>
    const [session] = useSession();
  </SessionProvider>

  return (
    <div> 
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/favicon.ico "/>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Header />

      <section className='bg-[#F8F9FA] pb-10 px-10' >
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
          <div className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700'>
            <Image 
              src='https://links.papareact.com/pju'
              height={1000}
              width={1000}
            />
          </div>
          <p className='ml-2 mt-2 font-semibold text-sm text-gray-700' >Blank</p>
        </div>
      </section>
      
      <section className='bg-white px-10 md:px-0' >
        <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
          <div className='flex items-center justify-between px-5'>
            <h2 className='font-medium flex-grow' >My Document</h2>
            <p className='mr-12' >Date Created</p>
            <AiFillFolder name='folder' className='folder-icon' size={19} />
          </div>
        </div>
      </section>

    </div>
  )
}
