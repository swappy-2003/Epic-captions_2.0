import DemoSection from "@/components/DemoSection";
import PageHeaders from "@/components/PageHeaders";
import UploadForm from "@/components/UploadForm";
import { SignedIn, SignedOut,SignInButton } from '@clerk/nextjs';
import FAQ from '@/components/Faq';

export default function Home() {
  return (
    <>
      <PageHeaders
        h1Text={'Add epic captions to your videos'}
        h2Text={'Just upload your video and we will do the rest'}
      />
      <div className="text-center">
        <SignedOut>
        
          <SignInButton>
          <span className="mt-4 px-4 py-2 bg-blue-500 text-white rounded  cursor-pointer">Get Started
       
       </span>
          </SignInButton>
        
       
        </SignedOut>
        <SignedIn>
          <UploadForm />
        </SignedIn>
       
      </div>
      <DemoSection />

     <div className="pt-12"> <FAQ  /></div>
    </>
  )
}
