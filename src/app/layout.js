import FAQ from '@/components/Faq';
import './globals.css'
import SparklesIcon from "@/components/SparklesIcon";
import { Inter } from 'next/font/google'
import Link from "next/link";
import {
  ClerkProvider,
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
    <ClerkProvider>
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
                  <SignInButton />
                </SignedOut>  
                <SignedIn>
                  <UserButton className="h-15 w-20" />
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
    </ClerkProvider>
  )
}
