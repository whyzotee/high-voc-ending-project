"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";

export default function FilePage() {
  const router = useRouter();

  return (
    <main className="h-screen w-full flex bg-[#5CD1FF]">
      <Sidebar />
      <div className="h-full w-full flex flex-col gap-36 items-center justify-center ">
        <h1 className="text-5xl bg-yellow-300 px-4 py-2 rounded-full border-[2.5px] border-black text-orange-500 font-bold header">
          File Manager
        </h1>

        <div className="flex gap-24">
          <button onClick={() => router.push("/file/image")}>
            <div className="relative border-[2.5px] border-black rounded-sm bg-yellow-50 px-12 py-2 text-2xl text-center font-bold">
              <Image
                src="/images/icons/image.png"
                alt="image_file_logo"
                height={50}
                width={50}
                className="absolute -left-8 top-1/2 -translate-y-1/2 border-[2.5px] border-black bg-purple-300 h-16 w-16 p-1"
              />
              <h1>UPLOAD</h1>
              <h1>PICTURE</h1>
            </div>
          </button>

          <button>
            <div className="relative border-[2.5px] border-black rounded-sm bg-yellow-50 px-12 py-2 text-2xl text-center font-bold">
              <Image
                src="/images/icons/video-file.png"
                alt="video_file_logo"
                height={50}
                width={50}
                className="absolute -left-8 top-1/2 -translate-y-1/2 border-[2.5px] border-black bg-red-300 h-16 w-16 p-1"
              />
              <h1>UPLOAD</h1>
              <h1>VIDEO</h1>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}
