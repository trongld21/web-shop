import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials;
        const user = {
          id: "21",
          email: "trongld21@gmail.com",
          password: "Default@123",
        };

        if (email !== user.email || password !== user.password) {
          throw new Error("invalid credentials");
        }
        return {
          id: "1234",
          name: "trongld",
          email: "trongld21@gmail.com",
        };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
};

export default NextAuth(authOptions);