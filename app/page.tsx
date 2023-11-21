"use client";

import Image from "next/image";
import Sidebar from "./components/sidebar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const customCss =
    "border-[2.5px] border-black rounded-lg h-24 w-28 flex items-center justify-center ";

  const customPlusBtn =
    "text-white text-3xl font-bold bg-yellow-400 px-3 rounded-full cursor-pointer";

  const rowMon = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];

  return (
    <>
      <main className="h-screen w-full flex bg-[#5CD1FF]">
        <Sidebar />
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
              <button>
                <div className="flex flex-col gap-2 items-center font-semibold">
                  <Image
                    src="/images/icons/image.png"
                    alt="picture_file_logo"
                    height={100}
                    width={100}
                  />
                  <span className="text-xl">Add Picture</span>
                </div>
              </button>

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
        <div className="h-full w-[100%] flex flex-col justify-center items-center gap-4 ">
          <div className="relative border-[2.5px] border-black rounded-sm bg-yellow-50 px-12 py-2 text-center font-bold">
            <Image
              src="/images/icons/calendar.png"
              alt="calendar_logo"
              height={75}
              width={75}
              className="absolute -left-8 top-1/2 -translate-y-1/2"
            />
            <h1>TIMELINE</h1>
            <h1>MANAGE</h1>
            <h1>MENT</h1>
          </div>
          {days.map((day) => (
            <div className="grid grid-cols-10 gap-4" key={day}>
              <div className={customCss + "bg-white border-dashed"}>
                <h1 className="text-2xl">{day}</h1>
              </div>
              {rowMon.map((element) => {
                if (element == 4) {
                  return (
                    <button onClick={onOpen} key={element}>
                      <div className={customCss + "bg-orange-300"}>
                        <span className={customPlusBtn}>+</span>
                      </div>
                    </button>
                  );
                } else {
                  return (
                    <button onClick={onOpen} key={element}>
                      <div className={customCss + "bg-white"}>
                        <span className={customPlusBtn}>+</span>
                      </div>
                    </button>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
