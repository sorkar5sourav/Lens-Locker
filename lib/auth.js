
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getDB } from "./db";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      //  'Sign in with {name} button
      name: "Email & Password",

      //form inputs
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter email" },

        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          // Get database connection
          const db = await getDB();
          const usersCollection = db.collection("users");
          
          // Find user by email
          const user = await usersCollection.findOne({ email });
          
          if (!user) {
            console.log(`❌ User not found: ${email}`);
            return null;
          }

          // Verify password using bcrypt
          const isPasswordValid = await bcrypt.compare(password, user.password);
          
          if (!isPasswordValid) {
            console.log(`❌ Invalid password for: ${email}`);
            return null;
          }

          // Password is correct, return user object
          console.log(`✅ User authenticated: ${email}`);
          return {
            id: user._id?.toString() || user._id,
            email: user.email,
            role: user.role || "user",
            name: user.name || user.email,
          };
        } catch (error) {
          console.error("❌ Auth error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (!user?.email) {
          console.log("❌ No email provided");
          return false;
        }

        // For credentials provider, user already exists and is verified
        if (account?.provider === 'credentials') {
          console.log(`✅ Credentials login: ${user.email}`);
          return true;
        }

        // For OAuth providers, check or create user
        const db = await getDB();
        const usersCollection = db.collection("users");

        const payload = {
          name: user.name || profile?.name,
          email: user.email,
          image: user.image || profile?.image,
          provider: account?.provider,
          providerId: account?.providerAccountId,
          role: "user",
          createdAt: new Date(),
        };

        const isExist = await usersCollection.findOne({
          email: user.email,
          providerId: account?.providerAccountId,
        });
        
        if (!isExist) {
          await usersCollection.insertOne(payload);
          console.log(`✅ Created OAuth user: ${user.email}`);
        } else {
          console.log(`✅ OAuth user exists: ${user.email}`);
        }
        
        return true;
      } catch (error) {
        console.error("❌ Sign in callback error:", error);
        return false;
      }
    },

    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

