"use client";
import Image from "next/image";
import supabase from "@/app/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ImagePage() {
  const router = useRouter();
  const [folders, setFolders] = useState<string[]>([]);

  const fetchFolders = async () => {
    const { data, error } = await supabase.storage
      .from("elec_file")
      .list("images", { offset: 0, limit: 10 });

    if (error) {
      console.error("Error fetching folders:", error.message);
      return [];
    }

    // Extract unique folder names from the list of items
    const folders = Array.from(
      new Set(data?.map((item) => item.name.split("/")[0]) || [])
    );

    setFolders(folders);
  };

  useEffect(() => {
    fetchFolders();
    console.log(folders);
  }, []);

  return (
    <main className="h-screen w-full flex flex-col p-24 items-center bg-[#5CD1FF]">
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
      <div className="mt-36 grid grid-cols-4 gap-24">
        <button>
          <Image
            src="/images/icons/folder.png"
            alt="folder_logo"
            height={100}
            width={100}
          />
          <span>New Folder</span>
        </button>
        <button>
          <div className="mb-4 flex items-center justify-center">
            <span className="text-white text-5xl font-bold bg-yellow-400 p-2 rounded-full cursor-pointer">
              <Image
                src="/images/icons/add.png"
                alt="folder_logo"
                height={50}
                width={50}
              />
            </span>
          </div>
        </button>
      </div>
      <button onClick={router.back}>
        <h1>Back</h1>
      </button>
    </main>
  );
}
