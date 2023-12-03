"use client";
import Image from "next/image";
import Swal from "sweetalert2";
import supabase from "@/app/supabase";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

export default function ImagePage() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let all_file: Array<any> = [];

  const fetchFolders = async () => {
    const { data, error } = await supabase.storage
      .from("elec_file")
      .list("images/");

    if (error) {
      console.error("Error fetching folders:", error.message);
      return [];
    }

    return data;
  };

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    let file;

    if (event.target.files == null) return;

    file = event.target.files[0];

    const { data, error } = await supabase.storage
      .from("elec_file")
      .upload("images/" + file?.name, file as File, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error upload file:", error.message);

      return Swal.fire({
        title: "ล้มเหลว",
        text: error.message,
        icon: "error",
        confirmButtonText: "ตลลง",
        confirmButtonColor: "#5CD1FF",
      });
    }

    Swal.fire({
      title: "สำเร็จ",
      text: "อัปโหลดไฟล์เรียบร้อยแล้ว",
      icon: "success",
      confirmButtonText: "ตลลง",
      confirmButtonColor: "#5CD1FF",
    });
  };

  useEffect(() => {
    fetchFolders().then((data) => {
      all_file = data;
      setLoading(false);

      console.log("folders");
      console.log(all_file);
    });
  }, all_file);

  if (isLoading) return <p>Still loading...</p>;

  return (
    <main className="h-screen w-full flex flex-col p-24 items-center bg-[#5CD1FF]">
      <Modal
        backdrop="blur"
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="border-black border-[2.5px] rounded-md"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Select File Type
          </ModalHeader>
          <ModalBody className="flex flex-row justify-center gap-32 py-12 ">
            <label>
              <input
                type="file"
                id="myFile"
                name="filename"
                className="hidden"
                onChange={(e) => uploadFile(e)}
              />
              <div className="flex flex-col gap-2 items-center font-semibold cursor-pointer">
                <Image
                  src="/images/icons/image.png"
                  alt="picture_file_logo"
                  height={100}
                  width={100}
                />
                <span className="text-xl">Add Picture</span>
              </div>
            </label>

            <button>
              <div className="flex flex-col gap-2 items-center font-semibold">
                <Image
                  src="/images/icons/video-file.png"
                  alt="video_file_logo"
                  height={100}
                  width={100}
                />
                <span className="text-xl">Add Video</span>
              </div>
            </button>
          </ModalBody>
        </ModalContent>
      </Modal>
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
        {/* <button>
          <Image
            src="/images/icons/folder.png"
            alt="folder_logo"
            height={100}
            width={100}
          />
          <span>New Folder</span>
        </button> */}
        <p>{all_file.length}</p>
        {all_file.map((element) => (
          <button key={element}>
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
        ))}
        <button onClick={onOpen}>
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
