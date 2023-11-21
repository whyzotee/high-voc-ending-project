"use client";
import Image from "next/image";
import QRCode from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const imageList = [
  {
    title: "รับสมัครนักศึกษา",
    img: "/images/test_image1.jpeg",
  },
  {
    title: "การประชุมผู้ปกครอง",
    img: "/images/test_image2.jpeg",
  },
  {
    title: "ประกาศรางวัล",
    img: "/images/test_image3.jpeg",
  },
];

export default function StreamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  var delayForNext = 5000; // milisec
  let animationDuration: number = 1; // sec

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, delayForNext);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="max-h-screen h-screen w-full flex flex-col">
      <div className="relative w-full flex items-center p-8">
        <div className="title w-[98%] border-[2.5px] border-black rounded-md bg-[#2FA8FF] p-8">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: animationDuration,
              }}
              className="text-6xl text-white"
            >
              {imageList[currentIndex].title}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="absolute w-[98%] flex justify-end">
          <Image
            src="/images/elec_logo.svg"
            alt="elec_logo"
            height={200}
            width={200}
            className="right-0"
          />
        </div>
      </div>

      <div className="relative max-h-full h-full mt-4 overflow-hidden px-8 mb-8">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: animationDuration,
            }}
            className="relative h-full w-full bg-top bg-cover border-[2.5px] border-black rounded-md"
            style={{ backgroundImage: `url(${imageList[currentIndex].img})` }}
          >
            <div className="absolute border-[2.5px] border-black rounded-md bg-white p-4 left-8 bottom-8">
              <span>สแกนเพื่อดูเพิ่มเติม</span>
              <QRCode
                value="https://www.facebook.com/share/tKwVJipancoNwMm1/?mibextid=7eNqk6"
                className="rounded-md mt-2"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/*
      <div className=" relative h-full w-full mt-12 bg-red-300 flex gap-8 rmscrollbar">
        {imageList.map((element) => (
          <div
            key={element}
            id={`silder-${imageList.indexOf(element)}`}
            className="slider relative h-full min-w-full border-[2.5px] border-black rounded-md bg-[#2FA8FF] p-8"
          >
            <Image
              src={element}
              alt={element}
              fill
              className="rounded-md object-cover object-top"
            />
            <div className="absolute border-[2.5px] border-black rounded-md bg-white p-4 bottom-8">
              <span>สแกนเพื่อดูเพิ่มเติม</span>
            </div>
          </div>
        ))}
      </div> */}
    </main>
  );
}
