import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: "SECRET",
  callbacks: {
    async session({ token, session }) {
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.picture = token.picture;

      return session;
    },
    async jwt({ token, account }) {
      return token;
    },

    async signIn({ profile }) {
      if (profile.email) {
        console.log(profile.email);
        return true;
      }
      return false;
    },
    redirect() {
      return "/";
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
