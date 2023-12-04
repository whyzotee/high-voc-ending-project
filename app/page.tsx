"use client";

import Image from "next/image";
import QRCode from "qrcode.react";
import supabase from "@/app/supabase";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chevron_down from "heroicons/24/outline/chevron-down.svg";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Switch,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const days = ["วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์"];
const timeline = [
  [
    {
      time: "07:00-09:00",
      lession: "dummy lession1",
    },
    {
      time: "11:00-13:00",
      lession: "dummy lession2",
    },
    {
      time: "15:00-17:00",
      lession: "dummy lession3",
    },
  ],
];

type image = {
  id: number;
  name: string;
  topic: string;
  description: string;
  href: string;
  social_link: string | null;
};

export default function Home() {
  const newDate = new Date();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [allImage, setAllImage] = useState<image[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [bannerIndex, setbannerIndex] = useState(0);
  const [nowDay, setDay] = useState(newDate.getDay() - 1);
  const [animation, setAnimation] = useState(-1); // 0 fade, -1 left -> right, 1 right -> left

  var delayForNext = 5000; // milisec
  let animationDuration: number = 1; // sec

  const fetchData = async () => {
    const { data, error } = await supabase.from("monday_images").select();

    if (error) {
      console.error("Error fetching folders:", error.message);
      return undefined;
    }

    return data;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setbannerIndex((prevIndex) => (prevIndex + 1) % allImage.length);
    }, delayForNext);

    if (isLoading) {
      fetchData().then((element: image[] | undefined) => {
        if (element) setAllImage(element);
        setLoading(false);
      });
    }

    return () => clearInterval(interval);
  }, [allImage]);

  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/signin");
    router.refresh();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="w-full flex flex-col">
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
      <nav className="w-full flex items-center justify-between bg-white">
        <h1 className="ml-4 text-xl">ระบบประชาสัมพันธ์ แผนกอิเล็กทรอนิกส์</h1>

        <Dropdown>
          <DropdownTrigger>
            <div className="flex gap-4 m-2 mr-4 px-2 py-1 hover:bg-gray-200 rounded-lg transition-colors">
              <Image
                src={"/images/anya.png"}
                alt="profile"
                className="rounded-full bg-white"
                height={50}
                width={50}
              />
              <Image
                src={chevron_down}
                alt="arrow_down"
                height={20}
                width={20}
              />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="profile">
            <DropdownItem key="signin_as">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">elec@cmtc.ac.th</p>
            </DropdownItem>
            <DropdownItem key="profile">โปรไฟล์</DropdownItem>
            <DropdownItem key="edit" showDivider>
              แก้ไขไฟล์
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="text-danger"
              onClick={handleSignOut}
              color="danger"
            >
              ออกจากระบบ
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>
      <div className="h-full max-w-7xl w-full flex gap-12 m-auto pt-12 px-4">
        <div className="flex flex-col">
          <span className="text-2xl">ยินดีต้อนรับ</span>
          <span className="text-gray-400">Home - mainpage</span>

          <div className="w-fit bg-white border-[2.5px] border-black rounded-md shadow-lg mt-4">
            <div className="flex gap-4 p-4 border-b-[2.5px] border-black">
              {days.map((element, index) => (
                <Button
                  color="primary"
                  variant={nowDay == index ? "solid" : "light"}
                  radius="sm"
                  key={index}
                  onClick={() => setDay(index)}
                >
                  {element}
                </Button>
              ))}
              <div className="flex gap-2 items-center">
                <span>Animation</span>
                <Switch
                  onValueChange={(isselect) => setAnimation(isselect ? 1 : -1)}
                >
                  ขวาไปซ้าย
                </Switch>
              </div>
            </div>
            <Table className="p-4" removeWrapper hideHeader>
              <TableHeader>
                <TableColumn>Time</TableColumn>
                <TableColumn>Topic</TableColumn>
                <TableColumn>Button</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"ยังไม่มีข้อมูลที่แสดง"}>
                {timeline[nowDay]?.map((element, index) => (
                  <TableRow key={index}>
                    <TableCell>{element.time}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <span className="text-gray-400">เรื่อง: </span>
                      {element.lession}
                    </TableCell>
                    <TableCell style={{ textAlign: "end" }}>
                      <Button color="primary" variant="light">
                        ตัวอย่าง
                      </Button>
                      <Button color="danger" variant="light">
                        แก้ไข้
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="pr-4 pb-4 flex justify-end">
              <Button color="primary" variant="solid" radius="sm">
                เพิ่มสื่อ
              </Button>
            </div>
          </div>
          <div className="w-full bg-white border-[2.5px] border-black rounded-md shadow-lg mt-6 p-4">
            <h1 className="text-2xl">ไฟล์ที่นำเสนอขณะนี้</h1>
            <div className="flex flex-col gap-2">
              <Table removeWrapper>
                <TableHeader>
                  <TableColumn>หัวข้อ</TableColumn>
                  <TableColumn>รายละเอียด</TableColumn>
                </TableHeader>
                <TableBody>
                  {allImage.map((element) => (
                    <TableRow key="element.id">
                      <TableCell>{element.topic}</TableCell>
                      <TableCell>{element.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="max-w-full w-full flex flex-col gap-4">
          <h1 className="text-end text-3xl">ตัวอย่างการนำเสนอ</h1>

          <div className="relative h-fit w-full flex flex-col gap-6 rounded-lg border-[2.5px] border-black p-4 shadow-lg">
            <div className="relative flex items-center">
              <div className="title w-[95%] border-[2.5px] border-black rounded-md bg-[#2FA8FF] p-4 text-2xl text-white">
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={bannerIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: animationDuration }}
                  >
                    {allImage[bannerIndex].topic}
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
            <div className="h-52 relative flex justify-center items-center overflow-hidden ">
              <AnimatePresence initial={false}>
                <motion.img
                  className="absolute h-full w-full object-top object-cover border-[2.5px] border-black rounded-md"
                  key={bannerIndex}
                  src={allImage[bannerIndex].href}
                  initial={{ x: animation > 0 ? 1000 : -1000, opacity: 0 }}
                  animate={{ zIndex: 1, x: 0, opacity: 1 }}
                  exit={{
                    zIndex: 0,
                    x: animation < 0 ? 1000 : -1000,
                    opacity: 0,
                  }}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                ></motion.img>
              </AnimatePresence>
              {/* <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={bannerIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: animationDuration,
                    }}
                    className="h-full w-full bg-top bg-cover border-[2.5px] border-black rounded-md"
                    style={{
                      backgroundImage: `url(${allImage[bannerIndex].href})`,
                    }}
                  ></motion.div>
                </AnimatePresence> */}
            </div>
            <div className="border-[2.5px] h-36 border-black rounded-md p-2">
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={bannerIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: animationDuration,
                  }}
                >
                  ประกาศ: {allImage[bannerIndex].description}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="h-fit w-fit text-center border-[2.5px] border-black rounded-md p-2 flex flex-col items-center">
              <span>สแกนเพื่อดูเพิ่มเติม</span>
              <QRCode
                value={allImage[bannerIndex].social_link ?? ""}
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
    </section>
  );
}
