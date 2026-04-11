import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { getOrCreateUser } from "@/src/lib/user"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        // Ensure user exists in Sanity when signing in
        try {
          await getOrCreateUser(user.email, user.name || "", user.image || "")
        } catch (error) {
          console.error('Error creating user in Sanity during sign-in:', error)
          // Allow sign-in to proceed even if Sanity user creation fails
          // The user will be created later when they try to bookmark
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
        token.name = user.name
        token.picture = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.picture as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
})

export { handler as GET, handler as POST }
