import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDb } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // function that retrives the data of the user that is currently online
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    session.used.id = sessionUser._id.toString();
    return session;
  },

  // signIn function creates a new user if one does not exist yet
  async signIn({ profile }) {
    try {
      await connectToDb();

      // check if a user already exists
      const userExists = await User.findOne({
        email: profile.email,
      });

      // if not create a new user
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(/\s+/g, "").toLowerCase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
