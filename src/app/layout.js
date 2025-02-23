import FAQ from '@/components/Faq';
import './globals.css'
import SparklesIcon from "@/components/SparklesIcon";
import { dark,shadesOfPurple,neobrutalism } from '@clerk/themes';
import { Inter } from 'next/font/google'
import Link from "next/link";
import {
  ClerkProvider,
  ClerkLoading,
  ClerkLoaded,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AutoSub',
  description: 'Your one-stop solution for video transcription and captioning',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme:[dark,shadesOfPurple],
    }}>
      <ClerkLoading>
        <html>
        <body>
          <div className="flex justify-center items-center h-screen bg-inherit" >
          <span class="loader"></span>
          </div>
        </body>
        
        </html>
      </ClerkLoading>
      <ClerkLoaded>
        <html lang="en">
          <head>
            <link rel="icon" href="/favicon.ico" />
          </head>
          <body className={inter.className + " bg-gradient-to-b from-bg-gradient-from to-bg-gradient-to min-h-screen text-white"}>
            <main className="p-4 w-full h-full">
              <header className="flex justify-between items-center my-2 sm:my-8 px-4 sm:px-8">
                <Link href="/" className="flex gap-1 items-center hover:text-purple-400 transition-colors duration-300">
                  <SparklesIcon className='h-9' />
                  <span className="text-xl font-bold">AutoSub</span>
                </Link>
                <nav className="flex items-center gap-2 sm:gap-6 text-white/80 text-sm sm:text-base ">
                  <Link href="/" className="hover:text-purple-400 transition-colors duration-300">Home</Link>
                  <Link href="/pricing" className="hover:text-purple-400 transition-colors duration-300">Pricing</Link>
                  <a href="mailto:contact@epiccaptions.com" className="hover:text-purple-400 transition-colors duration-300">Contact</a>
                  <SignedOut>
                    <SignInButton>
                      <span className=" px-4 py-2 bg-indigo-600 hover:bg-indigo-400 ease-in-out text-white rounded  cursor-pointer">Sign In
                      </span>
                    </SignInButton>
                  </SignedOut>  
                  <SignedIn>
                    <Link href="/profile" className="hover:text-purple-400 transition-colors duration-300">Profile </Link>
                    <UserButton />
                  </SignedIn>
                </nav>
              </header>
              <div className="px-4 sm:px-8">
                {children}
                <section className="mt-8 ">
                  <FAQ />
                </section>
              </div>
            </main>
          </body>
        </html>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
