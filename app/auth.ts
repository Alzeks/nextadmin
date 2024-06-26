import NextAuth, { DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from "bcrypt";
import { userType, UserT } from "./types";

import { JWT } from "next-auth/jwt"

const login = async (credentials: { username: string, password: string }) => {
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });
    //For bcrypt hashing------------------------------------------------------------------
    //if (!user || !user.isAdmin) throw new Error("Wrong credentials!");
    // const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
    //if (!isPasswordCorrect) throw new Error("Wrong credentials!");
    //------------------------------------------------------------------------------------
    return user
  } catch (err) {
    throw new Error("Failed to login!");
  }
};
//NextAuth
export const { signIn, signOut, auth, handlers: { GET, POST } } =
  NextAuth({
    ...authConfig,
    providers: [
      CredentialsProvider({
        async authorize(credentials: { username: string, password: string }): Promise<any> {
          try {
            const user: { username: string, image: string, password: string } = await login(credentials)

            return user

          } catch (err) { return null; }
        },
      }),
    ],
    secret: process.env.AUTH_SECRET,
    // ADD ADDITIONAL INFORMATION TO SESSION
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          //@ts-ignore
          return { ...token, username: user.username, image: user.img }
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          //@ts-ignore
          session.user = { username: token.username, image: token.image, email: token.email }
        }
        return session;
      },
    },
  });
