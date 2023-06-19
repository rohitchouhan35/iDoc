import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "../../../firebase";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      NEXTAUTH_URL: 'http://localhost:3000/api/auth/callback/google',
      redirectTo: '/',
      profile: {
        email: {
          read: true,
          write: true
        }
      }
    }),
  ],
  // adapter: FirebaseAdapter(db),
};

export default NextAuth(authOptions);