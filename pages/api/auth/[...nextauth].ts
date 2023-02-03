import NextAuth from "next-auth";
import { MoralisNextAuthProvider } from "@moralisweb3/next";
import GoogleProvider from 'next-auth/providers/google';


export default NextAuth({
  providers: [
    MoralisNextAuthProvider(),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      (session as { user: unknown }).user = token.user;
      return session;
    },
  },
});