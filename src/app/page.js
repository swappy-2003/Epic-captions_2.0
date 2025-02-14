import DemoSection from "@/components/DemoSection";
import PageHeaders from "@/components/PageHeaders";
import UploadForm from "@/components/UploadForm";
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <>
      <PageHeaders
        h1Text={'Add epic captions to your videos'}
        h2Text={'Just upload your video and we will do the rest'}
      />
      <div className="text-center">
        <SignedOut>
          <p>Please sign in to upload your video.</p>
        </SignedOut>
        <SignedIn>
          <UploadForm />
        </SignedIn>
      </div>
      <DemoSection />
    </>
  )
}
