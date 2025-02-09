import './globals.css'
import SparklesIcon from "@/components/SparklesIcon";
import { Inter } from 'next/font/google'
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AutoSub',
  description: 'Your one-stop solution for video transcription and captioning',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className + " bg-gradient-to-b from-bg-gradient-from to-bg-gradient-to min-h-screen text-white"}>
        <main className="p-4 w-full h-full">
          <header className="flex justify-between items-center my-2 sm:my-8 px-4 sm:px-8">
            <Link href="/" className="flex gap-1 items-center hover:text-purple-400 transition-colors duration-300">
              <SparklesIcon />
              <span className="text-xl font-bold">AutoSub</span>
            </Link>
            <nav className="flex items-center gap-2 sm:gap-6 text-white/80 text-sm sm:text-base">
              <Link href="/" className="hover:text-purple-400 transition-colors duration-300">Home</Link>
              <Link href="/pricing" className="hover:text-purple-400 transition-colors duration-300">Pricing</Link>
              <a href="mailto:contact@epiccaptions.com" className="hover:text-purple-400 transition-colors duration-300">Contact</a>
            </nav>
          </header>
          <div className="px-4 sm:px-8">
            {children}
            <section className="mt-8">
              <h2 className="text-2xl font-bold ">Process of Generating Transcription</h2>
              <ol className="list-decimal list-inside mt-4 space-y-2">
                <li className="hover:bg-purple-700/20 p-2 rounded transition-colors duration-300">Upload your video file using the upload form.</li>
                <li className="hover:bg-purple-700/20 p-2 rounded transition-colors duration-300">Our system processes the video and extracts the audio.</li>
                <li className="hover:bg-purple-700/20 p-2 rounded transition-colors duration-300">The audio is transcribed using advanced AI models.</li>
                <li className="hover:bg-purple-700/20 p-2 rounded transition-colors duration-300">Transcriptions are formatted and synchronized with the video.</li>
                <li className="hover:bg-purple-700/20 p-2 rounded transition-colors duration-300">Download the video with embedded captions or the transcription file.</li>
              </ol>
            </section>
            <section className="mt-8">
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              <div className="mt-4 space-y-4">
                <div className="hover:bg-purple-700/20 p-4 rounded transition-colors duration-300">
                  <h3 className="text-xl font-semibold">What file formats are supported?</h3>
                  <p>We support a variety of video formats including MP4, AVI, MOV, and more.</p>
                </div>
                <div className="hover:bg-purple-700/20 p-4 rounded transition-colors duration-300">
                  <h3 className="text-xl font-semibold">How long does it take to generate a transcription?</h3>
                  <p>The time required depends on the length of the video. Typically, it takes a few minutes for shorter videos.</p>
                </div>
                <div className="hover:bg-purple-700/20 p-4 rounded transition-colors duration-300">
                  <h3 className="text-xl font-semibold">Is there a limit on the file size?</h3>
                  <p>Yes, currently we only support video files up to 5MB in size.</p>
                </div>
                <div className="hover:bg-purple-700/20 p-4 rounded transition-colors duration-300">
                  <h3 className="text-xl font-semibold">Can I edit the transcriptions?</h3>
                  <p>Yes, you can edit the transcriptions before finalizing the video.</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </body>
    </html>
  )
}
