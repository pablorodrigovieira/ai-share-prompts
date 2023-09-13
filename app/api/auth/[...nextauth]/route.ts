import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { SessionUser } from "@utils/interfaces";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      let newSession: any = {
        ...session,
      };
      const sessionUser = (await User.findOne({
        email: session.user?.email,
      })) as SessionUser;

      if (sessionUser && sessionUser?._id) {
        newSession.user = {
          ...session.user,
        };
        newSession.user["id"] = sessionUser && sessionUser?._id.toString();
      }
      return newSession;
    },
    async signIn({ profile }) {
      try {
        if (profile) {
          await connectToDB();

          // check if a user already exists
          const userExists = await User.findOne({
            email: profile.email,
          });
          // if not create a new user
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name
                ? profile.name.replace(" ", "").toLowerCase()
                : "",
              image: profile.image,
            });
          }
          return true;
        }
        return false;
      } catch (e) {
        console.log("e", e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
