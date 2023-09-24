import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { connectToDatabase } from "@/utils/database";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
        }),
        CredentialsProvider({
            name: 'Login',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials: any): Promise<any> {
                try {
                    await connectToDatabase();
    
                    const user = await User.findOne({email: credentials.email});
                    if(!user)
                    throw new Error('No user found.');
                    
                    const isValid = await bcrypt.compare(credentials.password, user.password!);

                    if(!isValid)
                    throw new Error('Wrong email or password.');

                    return user;
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({account, profile}) {
            await connectToDatabase();
            if(account?.provider === 'google'){
      
              const user = await User.findOne({ email: profile?.email });
              if(user) return true;
      
              await User.create({
                fullName: profile?.name,
                email: profile?.email,
                password: '',
                provider: 'google'
              });
            }

            return true;
          },
          async jwt({token, user}){
            if(user){
                token.isAdmin = user.isAdmin;
                token._id = user._id
            } 
                
            return token;
          },
          async session({session, token}){
            if(session?.user){
                session.user.isAdmin = token.isAdmin;
                session.user._id = token._id;
            }
            
            return session;
          }
    },
    pages: {
        signIn: '/',
        signOut: '/'
    }
}