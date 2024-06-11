import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const AuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "474389433861-1eqir91rt9hjujeqn5vnq280n2030r3d.apps.googleusercontent.com",
      clientSecret: "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",
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
