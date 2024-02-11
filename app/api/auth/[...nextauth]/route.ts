import User from "@/models/User";
import { ConnectToDB } from "@/utils/connectToDB";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},

      //@ts-ignore
      async authorize(credentials) {
        //@ts-ignore
        const { email, password } = credentials;
        try {
          await ConnectToDB();
          const user = await User.findOne({ email }).lean();
          const is_correct_password = bcrypt.compare(password, user?.password);
          if (!is_correct_password) return null;
          delete user?.password;
          return user;
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
            return null;
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.user = {
            ...user,
          };
        }

        return token;
      } catch (error) {
        console.error("JWT Callback Error:", error);
        return token;
      }
    },
    //@ts-ignore
    async session({ session, token, user }) {
      return {
        ...session,
        user: token.user,
        ...token,
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
