import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
            hd: "unai.edu",
            prompt: "select_account"
        }
      },
      client: {
        timeout: 15000
      },
      httpOptions: {
        timeout: 15000
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 // 1 jam
  },
  callbacks: {
    async signIn({profile}) {
        const email = profile?.email;
        return email.toLowerCase().endsWith("@unai.edu");
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }