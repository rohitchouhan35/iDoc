// _app.js file

import '@/styles/globals.css'
import { ThemeProvider } from "@material-tailwind/react";
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";
import "../styles.css"

export default function App({ Component, pageProps: { session, ...pageProps },
}) {
  return (<>
    <Head>
    <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
      integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
      crossOrigin="anonymous"
    />
    </Head>
    <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
    </SessionProvider>
    </>);
}