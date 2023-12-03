"use client";

import Image from "next/image";
import Sidebar from "./components/sidebar";
import {
  Button,
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
      <main className="h-screen w-full flex">
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
        <div className="h-full max-w-7xl w-full m-auto">
          <div className="flex flex-col my-4">
            <span className="text-xl">ยินดีต้อนรับ</span>
            <span className="text-gray-400">Home - mainpage</span>
          </div>
          <div className="w-fit bg-white border-[2.5px] border-black rounded-md shadow-lg">
            <div className="flex gap-4 p-4 border-b-[2.5px] border-black">
              <Button color="primary" variant="solid" radius="sm">
                วันจันทร์
              </Button>
              <Button color="primary" variant="light" radius="sm">
                วันอังคาร
              </Button>
              <Button color="primary" variant="light" radius="sm">
                วันพุธ
              </Button>
              <Button color="primary" variant="light" radius="sm">
                วันพฤหัสบดี
              </Button>
              <Button color="primary" variant="light" radius="sm">
                วันศุกร์
              </Button>
            </div>
            <table className="w-[50rem] table-fixed m-4">
              <tbody>
                <tr className="flex justify-between items-center">
                  <td>08:43-09:43am</td>
                  <td>
                    <span className="text-gray-400">เรื่อง: </span>
                    ประชาสัมพันธ์บลาๆบลาๆ
                  </td>
                  <td>
                    <Button color="primary" variant="light">
                      ตัวอย่าง
                    </Button>
                    <Button color="danger" variant="light">
                      แก้ไข้
                    </Button>
                  </td>
                </tr>
                <tr className="flex justify-between items-center">
                  <td>09:40-11:20am</td>
                  <td>
                    <span className="text-gray-400">เรื่อง: </span>
                    ประชาสัมพันธ์บลาๆบลาๆ
                  </td>
                  <td>
                    <Button color="primary" variant="light">
                      ตัวอย่าง
                    </Button>
                    <Button color="danger" variant="light">
                      แก้ไข้
                    </Button>
                  </td>
                </tr>
                <tr className="flex justify-between items-center">
                  <td>10:35-43:09am</td>
                  <td>
                    <span className="text-gray-400">เรื่อง: </span>
                    ประชาสัมพันธ์บลาๆบลาๆ
                  </td>
                  <td>
                    <Button color="primary" variant="light">
                      ตัวอย่าง
                    </Button>
                    <Button color="danger" variant="light">
                      แก้ไข้
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pr-4 pb-4 flex justify-end">
              <Button color="primary" variant="solid" radius="sm">
                เพิ่มสื่อ
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
