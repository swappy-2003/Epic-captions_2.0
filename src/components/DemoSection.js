import SparklesIcon from "@/components/SparklesIcon";
import prisma from "@/lib/db";

export default async function DemoSection() {
  const users = await prisma.user.findMany();
  return (
    <section className="flex justify-around mt-8 sm:mt-12 items-center">
      <div className="  ">
        {JSON.stringify(users)}
      </div>
      <div className="hidden sm:block bg-gray-800/50 w-[240px] rounded-xl overflow-hidden">
        <video src="https://dawid-epic-captions.s3.us-east-1.amazonaws.com/without-captions.mp4" preload muted autoPlay loop></video>
      </div>
      <div className="hidden sm:block">
        <SparklesIcon />
      </div>
      <div className="bg-gray-800/50 w-[240px] rounded-xl overflow-hidden">
        <video src="https://dawid-epic-captions.s3.us-east-1.amazonaws.com/with-captions.mp4" preload muted autoPlay loop></video>
      </div>
    </section>
  );
}