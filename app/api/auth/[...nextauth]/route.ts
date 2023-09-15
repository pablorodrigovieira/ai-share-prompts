import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { SessionUser } from "@utils/interfaces";
import { handleError } from "@utils/errorHandler";
import { FUNCTIONS } from "@app/constants/consts";

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeDomainFromEmail(email) {
  const parts = email.split("@");
  if (parts.length > 1) {
    let localPart = parts[0];
    const maxLength = 20;
    const minLength = 8;

    if (localPart.length > maxLength) {
      // Truncate the local part to the maximum length
      localPart = localPart.slice(0, maxLength);
    } else if (localPart.length < minLength) {
      // Add random digits to reach the minimum length
      const digitsToAdd = minLength - localPart.length;
      const randomDigits = Array.from({ length: digitsToAdd }, () =>
        generateRandomNumber(0, 9),
      ).join("");

      localPart = localPart + randomDigits;
    }

    return localPart;
  }
  return email;
}

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
      try {
        const sessionUser = (await User.findOne({
          email: session.user?.email,
        })) as SessionUser;

        if (sessionUser && sessionUser?._id) {
          newSession.user = {
            ...session.user,
          };
          newSession.user["id"] = sessionUser && sessionUser?._id.toString();
        }
      } catch (e: any) {
        handleError(e, FUNCTIONS.SESSION);
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
            const username = removeDomainFromEmail(profile.email ?? "");
            await User.create({
              email: profile.email,
              username,
              image: profile.image,
            });
          }
          return true;
        }
        return false;
      } catch (e: any) {
        handleError(e, FUNCTIONS.SIGN_IN);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
