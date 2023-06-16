import Head from 'next/head'
import Header from '@/components/Header'

export default function Home() {
  return (
    <div> 
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/favicon.ico "/>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Header />
    </div>
  )
}