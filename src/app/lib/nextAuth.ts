import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { hd: "unai.edu", prompt: "select_account" },
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 },
  callbacks: {
    async signIn({ profile }) {
      const email = (profile as any)?.email;
      return email?.toLowerCase().endsWith("@unai.edu") ?? false;
    },
  },
};
