"use client";

import Image from "next/image";
import QRCode from "qrcode.react";
import supabase from "@/app/supabase";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import Sidebar from "./components/sidebar";

const imageList = [
  {
    title: "รับสมัครนักศึกษา",
    img:
      process.env.NEXT_PUBLIC_SUPABASE_URL +
      "/storage/v1/object/public/elec_file/images/img_1",
  },
  {
    title: "การประชุมผู้ปกครอง",
    img:
      process.env.NEXT_PUBLIC_SUPABASE_URL +
      "/storage/v1/object/public/elec_file/images/img_2",
  },
  {
    title: "ประกาศรางวัล",
    img: "/images/test_image3.jpeg",
  },
];

const rowMon = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];

type image = {
  id: number;
  name: string;
  description: string;
  href: string;
};

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [allImage, setAllImage] = useState<image[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  var delayForNext = 5000; // milisec
  let animationDuration: number = 1; // sec

  const fetchData = async () => {
    const { data, error } = await supabase.from("images").select();

    if (error) {
      console.error("Error fetching folders:", error.message);
      return null;
    }

    return data;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allImage.length);
    }, delayForNext);

    if (isLoading) {
      fetchData().then((element: image[] | null) => {
        if (element) setAllImage(element);
        setLoading(false);
      });
    }

    return () => clearInterval(interval);
  }, [allImage]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <main className="h-full w-full flex">
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

        <div className="h-full max-w-7xl w-full flex gap-12 m-auto pt-12 px-4">
          <div className="flex flex-col my-4">
            <span className="text-2xl">ยินดีต้อนรับ</span>
            <span className="text-gray-400">Home - mainpage</span>

            <div className="w-fit bg-white border-[2.5px] border-black rounded-md shadow-lg mt-4">
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
              <table className="w-[45rem] table-fixed m-4">
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
                    <td>10:35-13:09am</td>
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
            <div className="w-full bg-white border-[2.5px] border-black rounded-md shadow-lg mt-6 p-4">
              <h1 className="text-2xl">ไฟล์ที่นำเสนอขณะนี้</h1>
              {allImage.map((element) => (
                <div key={element.id} className="flex gap-4">
                  <h1>{element.id}</h1>
                  <h1>หัวข้อ: {element.name}</h1>
                  <h1>{element.description}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-3xl">ตัวอย่างการนำเสนอ</h1>
            <div className="relative h-fit w-full flex flex-col gap-6 rounded-lg border-[2.5px] border-black p-4 shadow-lg">
              <div className="relative flex items-center">
                <div className="title w-[95%] border-[2.5px] border-black rounded-md bg-[#2FA8FF] p-4">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: animationDuration,
                      }}
                      className="text-2xl text-white"
                    >
                      {allImage[currentIndex].name}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <Image
                  src="/images/elec_logo.svg"
                  alt="elec_logo"
                  height={100}
                  width={100}
                  className="absolute -right-2"
                />
              </div>
              <div className="h-48 overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: animationDuration,
                    }}
                    className="h-full w-full bg-top bg-cover border-[2.5px] border-black rounded-md"
                    style={{
                      backgroundImage: `url(${allImage[currentIndex].href})`,
                    }}
                  ></motion.div>
                </AnimatePresence>
              </div>
              <div className="border-[2.5px] h-36 border-black rounded-md p-2">
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: animationDuration,
                    }}
                  >
                    ประกาศ: {allImage[currentIndex].description}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="h-fit w-fit text-center border-[2.5px] border-black rounded-md p-2 flex flex-col items-center">
                <span>สแกนเพื่อดูเพิ่มเติม</span>
                <QRCode
                  value="https://www.facebook.com/share/tKwVJipancoNwMm1/?mibextid=7eNqk6"
                  className="rounded-md mt-2"
                  size={100}
                />
              </div>
              <div className="absolute -bottom-2 right-2">
                <div className="relative h-[200px] w-[200px]">
                  <Image src="/images/anya.png" alt="anya" fill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
