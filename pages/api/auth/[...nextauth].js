import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { db } from "../../../firebase"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  adapter: FirebaseAdapter(db),
}

export default NextAuth(authOptions)